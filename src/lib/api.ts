const API_BASE = '/api';

/**
 * 获取存储的管理员 token
 */
function getToken(): string | null {
  return localStorage.getItem('admin_token');
}

/**
 * 通用请求封装
 */
async function request<T>(
  path: string,
  options: RequestInit = {}
): Promise<T> {
  const token = getToken();
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(options.headers as Record<string, string> || {}),
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const response = await fetch(`${API_BASE}${path}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ error: '请求失败' }));
    throw new Error(error.error || `HTTP ${response.status}`);
  }

  return response.json();
}

// ============================================
// 文章 API
// ============================================
export const articlesApi = {
  /** 获取已发布文章列表 */
  list: (page = 1, limit = 10, category?: string) => {
    const params = new URLSearchParams({ page: String(page), limit: String(limit) });
    if (category) params.set('category', category);
    return request<{ data: any[]; pagination: any }>(`/articles?${params}`);
  },

  /** 获取精选文章 */
  featured: () =>
    request<{ data: any[] }>('/articles/featured'),

  /** 获取所有文章（管理员） */
  all: () =>
    request<{ data: any[] }>('/articles/all'),

  /** 获取文章详情 */
  get: (id: string) =>
    request<{ data: any }>(`/articles/${id}`),

  /** 创建文章（管理员） */
  create: (article: any) =>
    request<{ data: any }>('/articles', {
      method: 'POST',
      body: JSON.stringify(article),
    }),

  /** 更新文章（管理员） */
  update: (id: string, article: any) =>
    request<{ data: any }>(`/articles/${id}`, {
      method: 'PUT',
      body: JSON.stringify(article),
    }),

  /** 删除文章（管理员） */
  delete: (id: string) =>
    request<{ message: string }>(`/articles/${id}`, {
      method: 'DELETE',
    }),
};

// ============================================
// 动态 API
// ============================================
export const activitiesApi = {
  /** 获取最近动态 */
  list: (limit = 10) =>
    request<{ data: any[] }>(`/activities?limit=${limit}`),

  /** 创建动态（管理员） */
  create: (activity: any) =>
    request<{ data: any }>('/activities', {
      method: 'POST',
      body: JSON.stringify(activity),
    }),

  /** 删除动态（管理员） */
  delete: (id: string) =>
    request<{ message: string }>(`/activities/${id}`, {
      method: 'DELETE',
    }),
};

// ============================================
// 留言 API
// ============================================
export const commentsApi = {
  /** 获取留言列表（含嵌套回复） */
  list: (page = 1, limit = 20) =>
    request<{ data: any[]; pagination: any }>(`/comments?page=${page}&limit=${limit}`),

  /** 发布留言 */
  create: (comment: { author: string; content: string; parent_id?: string }) =>
    request<{ data: any }>('/comments', {
      method: 'POST',
      body: JSON.stringify(comment),
    }),

  /** 点赞 */
  like: (id: string) =>
    request<{ data: any }>(`/comments/${id}/like`, {
      method: 'POST',
    }),

  /** 管理员回复 */
  reply: (id: string, content: string) =>
    request<{ data: any }>(`/comments/${id}/reply`, {
      method: 'POST',
      body: JSON.stringify({ content }),
    }),

  /** 删除留言（管理员） */
  delete: (id: string) =>
    request<{ message: string }>(`/comments/${id}`, {
      method: 'DELETE',
    }),
};

// ============================================
// 管理 API
// ============================================
export const adminApi = {
  /** 登录 */
  login: (password: string) =>
    request<{ token: string; message: string }>('/admin/login', {
      method: 'POST',
      body: JSON.stringify({ password }),
    }),

  /** 验证 token */
  verify: () =>
    request<{ valid: boolean }>('/admin/verify'),

  /** 获取仪表盘统计 */
  dashboard: () =>
    request<{ data: any }>('/admin/dashboard'),

  /** 获取站点配置 */
  getSiteConfig: () =>
    request<{ data: any }>('/admin/site-config'),

  /** 更新站点配置 */
  updateSiteConfig: (key: string, value: any) =>
    request<{ data: any }>(`/admin/site-config/${key}`, {
      method: 'PUT',
      body: JSON.stringify({ value }),
    }),

  /** 退出登录 */
  logout: () => {
    localStorage.removeItem('admin_token');
  },

  /** 是否已登录 */
  isLoggedIn: () => !!getToken(),

  /** 存储 token */
  setToken: (token: string) => {
    localStorage.setItem('admin_token', token);
  },
};
