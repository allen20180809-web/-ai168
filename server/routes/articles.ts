import { Router, Request, Response } from 'express';
import { supabaseAdmin } from '../lib/supabase';
import { requireAdmin, AuthRequest } from '../middleware/auth';

const router = Router();

/**
 * GET /api/articles
 * 获取已发布文章列表（支持分页、分类筛选）
 */
router.get('/', async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const category = req.query.category as string;
    const offset = (page - 1) * limit;

    let query = supabaseAdmin
      .from('articles')
      .select('id, title, summary, category, image, is_featured, is_new, tags, created_at, updated_at', { count: 'exact' })
      .eq('published', true)
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1);

    if (category) {
      query = query.eq('category', category);
    }

    const { data, error, count } = await query;

    if (error) throw error;

    res.json({
      data,
      pagination: {
        page,
        limit,
        total: count || 0,
        totalPages: Math.ceil((count || 0) / limit),
      },
    });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

/**
 * GET /api/articles/featured
 * 获取精选文章
 */
router.get('/featured', async (_req: Request, res: Response) => {
  try {
    const { data, error } = await supabaseAdmin
      .from('articles')
      .select('id, title, summary, category, image, is_featured, is_new, tags, created_at')
      .eq('published', true)
      .eq('is_featured', true)
      .order('created_at', { ascending: false })
      .limit(5);

    if (error) throw error;
    res.json({ data });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

/**
 * GET /api/articles/all
 * 获取所有文章（管理员，含未发布）
 */
router.get('/all', requireAdmin, async (_req: AuthRequest, res: Response) => {
  try {
    const { data, error } = await supabaseAdmin
      .from('articles')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    res.json({ data });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

/**
 * GET /api/articles/:id
 * 获取文章详情
 */
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const { data, error } = await supabaseAdmin
      .from('articles')
      .select('*')
      .eq('id', req.params.id)
      .single();

    if (error) throw error;
    if (!data) {
      res.status(404).json({ error: '文章不存在' });
      return;
    }
    res.json({ data });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

/**
 * POST /api/articles
 * 创建文章（需管理员权限）
 */
router.post('/', requireAdmin, async (req: AuthRequest, res: Response) => {
  try {
    const { title, summary, content, category, image, is_featured, is_new, tags, published } = req.body;

    const { data, error } = await supabaseAdmin
      .from('articles')
      .insert({
        title,
        summary,
        content,
        category,
        image,
        is_featured: is_featured || false,
        is_new: is_new || false,
        tags: tags || [],
        published: published || false,
      })
      .select()
      .single();

    if (error) throw error;
    res.status(201).json({ data });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

/**
 * PUT /api/articles/:id
 * 更新文章（需管理员权限）
 */
router.put('/:id', requireAdmin, async (req: AuthRequest, res: Response) => {
  try {
    const { title, summary, content, category, image, is_featured, is_new, tags, published } = req.body;

    const { data, error } = await supabaseAdmin
      .from('articles')
      .update({
        title,
        summary,
        content,
        category,
        image,
        is_featured,
        is_new,
        tags,
        published,
      })
      .eq('id', req.params.id)
      .select()
      .single();

    if (error) throw error;
    res.json({ data });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

/**
 * DELETE /api/articles/:id
 * 删除文章（需管理员权限）
 */
router.delete('/:id', requireAdmin, async (req: AuthRequest, res: Response) => {
  try {
    const { error } = await supabaseAdmin
      .from('articles')
      .delete()
      .eq('id', req.params.id);

    if (error) throw error;
    res.json({ message: '文章已删除' });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
