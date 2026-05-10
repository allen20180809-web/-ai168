import { Router, Request, Response } from 'express';
import { supabaseAdmin } from '../lib/supabase';
import { requireAdmin, verifyAdminPassword, AuthRequest } from '../middleware/auth';

const router = Router();

/**
 * POST /api/admin/login
 * 管理员登录（固定密码方式）
 */
router.post('/login', (req: Request, res: Response) => {
  const { password } = req.body;

  if (!password) {
    res.status(400).json({ error: '请输入密码' });
    return;
  }

  const token = verifyAdminPassword(password);

  if (!token) {
    res.status(401).json({ error: '密码错误' });
    return;
  }

  res.json({ token, message: '登录成功' });
});

/**
 * GET /api/admin/verify
 * 验证 token 是否有效
 */
router.get('/verify', requireAdmin, (_req: AuthRequest, res: Response) => {
  res.json({ valid: true, message: 'Token 有效' });
});

/**
 * GET /api/admin/dashboard
 * 获取仪表盘统计数据
 */
router.get('/dashboard', requireAdmin, async (_req: AuthRequest, res: Response) => {
  try {
    const [articlesResult, commentsResult, activitiesResult] = await Promise.all([
      supabaseAdmin.from('articles').select('id, published', { count: 'exact' }),
      supabaseAdmin.from('comments').select('id', { count: 'exact' }),
      supabaseAdmin.from('activities').select('id', { count: 'exact' }),
    ]);

    const totalArticles = articlesResult.count || 0;
    const publishedArticles = articlesResult.data?.filter(a => a.published).length || 0;
    const draftArticles = totalArticles - publishedArticles;
    const totalComments = commentsResult.count || 0;
    const totalActivities = activitiesResult.count || 0;

    res.json({
      data: {
        totalArticles,
        publishedArticles,
        draftArticles,
        totalComments,
        totalActivities,
      },
    });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

/**
 * GET /api/admin/site-config
 * 获取站点配置
 */
router.get('/site-config', requireAdmin, async (_req: AuthRequest, res: Response) => {
  try {
    const { data, error } = await supabaseAdmin
      .from('site_config')
      .select('*');

    if (error) throw error;

    // 将数组转为对象
    const config: Record<string, any> = {};
    data?.forEach(item => {
      config[item.key] = item.value;
    });

    res.json({ data: config });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

/**
 * PUT /api/admin/site-config/:key
 * 更新站点配置
 */
router.put('/site-config/:key', requireAdmin, async (req: AuthRequest, res: Response) => {
  try {
    const { value } = req.body;

    const { data, error } = await supabaseAdmin
      .from('site_config')
      .upsert({
        key: req.params.key,
        value,
      }, { onConflict: 'key' })
      .select()
      .single();

    if (error) throw error;
    res.json({ data });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
