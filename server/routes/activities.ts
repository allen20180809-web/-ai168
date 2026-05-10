import { Router, Request, Response } from 'express';
import { supabaseAdmin } from '../lib/supabase';
import { requireAdmin, AuthRequest } from '../middleware/auth';

const router = Router();

/**
 * GET /api/activities
 * 获取最近动态列表
 */
router.get('/', async (req: Request, res: Response) => {
  try {
    const limit = parseInt(req.query.limit as string) || 10;

    const { data, error } = await supabaseAdmin
      .from('activities')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(limit);

    if (error) throw error;
    res.json({ data });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

/**
 * POST /api/activities
 * 创建动态（需管理员权限）
 */
router.post('/', requireAdmin, async (req: AuthRequest, res: Response) => {
  try {
    const { type, title, tag } = req.body;

    if (!type || !title) {
      res.status(400).json({ error: '类型和标题为必填项' });
      return;
    }

    const { data, error } = await supabaseAdmin
      .from('activities')
      .insert({ type, title, tag })
      .select()
      .single();

    if (error) throw error;
    res.status(201).json({ data });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

/**
 * DELETE /api/activities/:id
 * 删除动态（需管理员权限）
 */
router.delete('/:id', requireAdmin, async (req: AuthRequest, res: Response) => {
  try {
    const { error } = await supabaseAdmin
      .from('activities')
      .delete()
      .eq('id', req.params.id);

    if (error) throw error;
    res.json({ message: '动态已删除' });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
