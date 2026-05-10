import { Router, Request, Response } from 'express';
import { supabaseAdmin } from '../lib/supabase';
import { requireAdmin, AuthRequest } from '../middleware/auth';

const router = Router();

/**
 * GET /api/comments
 * 获取留言列表（含嵌套回复）
 */
router.get('/', async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 20;
    const offset = (page - 1) * limit;

    // 获取顶层留言（parent_id 为 null）
    const { data: topLevelComments, error: topError, count } = await supabaseAdmin
      .from('comments')
      .select('*', { count: 'exact' })
      .is('parent_id', null)
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1);

    if (topError) throw topError;

    // 获取所有回复
    const commentIds = topLevelComments?.map(c => c.id) || [];

    let replies: any[] = [];
    if (commentIds.length > 0) {
      const { data: replyData, error: replyError } = await supabaseAdmin
        .from('comments')
        .select('*')
        .in('parent_id', commentIds)
        .order('created_at', { ascending: true });

      if (replyError) throw replyError;
      replies = replyData || [];
    }

    // 组装嵌套结构
    const commentsWithReplies = topLevelComments?.map(comment => ({
      ...comment,
      replies: replies.filter(r => r.parent_id === comment.id),
    }));

    res.json({
      data: commentsWithReplies,
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
 * POST /api/comments
 * 发布留言（公开）
 */
router.post('/', async (req: Request, res: Response) => {
  try {
    const { author, content, parent_id } = req.body;

    if (!author || !content) {
      res.status(400).json({ error: '姓名和内容为必填项' });
      return;
    }

    const { data, error } = await supabaseAdmin
      .from('comments')
      .insert({
        author,
        content,
        parent_id: parent_id || null,
        is_author: false,
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
 * POST /api/comments/:id/like
 * 点赞留言
 */
router.post('/:id/like', async (req: Request, res: Response) => {
  try {
    // 先获取当前点赞数
    const { data: current, error: getError } = await supabaseAdmin
      .from('comments')
      .select('likes')
      .eq('id', req.params.id)
      .single();

    if (getError) throw getError;

    const { data, error } = await supabaseAdmin
      .from('comments')
      .update({ likes: (current?.likes || 0) + 1 })
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
 * POST /api/comments/:id/reply
 * 管理员回复留言
 */
router.post('/:id/reply', requireAdmin, async (req: AuthRequest, res: Response) => {
  try {
    const { content } = req.body;

    if (!content) {
      res.status(400).json({ error: '回复内容为必填项' });
      return;
    }

    const { data, error } = await supabaseAdmin
      .from('comments')
      .insert({
        author: '艾伦Ai',
        content,
        parent_id: req.params.id,
        is_author: true,
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
 * DELETE /api/comments/:id
 * 删除留言（需管理员权限）
 */
router.delete('/:id', requireAdmin, async (req: AuthRequest, res: Response) => {
  try {
    const { error } = await supabaseAdmin
      .from('comments')
      .delete()
      .eq('id', req.params.id);

    if (error) throw error;
    res.json({ message: '留言已删除' });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
