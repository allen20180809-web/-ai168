import React, { useState, useEffect } from 'react';
import { commentsApi } from '../../lib/api';
import { Trash2, MessageSquare, Reply, Send, User as UserIcon } from 'lucide-react';
import { motion } from 'motion/react';

export default function CommentManager() {
  const [comments, setComments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [replyContent, setReplyContent] = useState('');

  useEffect(() => { loadComments(); }, []);

  const loadComments = async () => {
    try {
      const result = await commentsApi.list(1, 50);
      setComments(result.data || []);
    } catch (err) { console.error(err); }
    finally { setLoading(false); }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('确定删除这条留言？')) return;
    try { await commentsApi.delete(id); loadComments(); }
    catch (err) { console.error(err); }
  };

  const handleReply = async (parentId: string) => {
    if (!replyContent.trim()) return;
    try {
      await commentsApi.reply(parentId, replyContent);
      setReplyingTo(null);
      setReplyContent('');
      loadComments();
    } catch (err) { console.error(err); }
  };

  if (loading) return <div className="flex items-center justify-center h-64"><p className="text-sm text-on-surface-variant animate-pulse font-headline">加载中...</p></div>;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-primary font-headline">留言管理</h1>
        <p className="text-sm text-on-surface-variant mt-1">共 {comments.length} 条留言</p>
      </div>

      <div className="space-y-6">
        {comments.map(comment => (
          <div key={comment.id} className="bg-surface-container-lowest rounded-xl border border-outline-variant/10 overflow-hidden">
            {/* Main comment */}
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-secondary-container flex items-center justify-center">
                    <UserIcon size={18} className="text-on-secondary-container" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-primary font-headline">{comment.author}</h4>
                    <p className="text-[10px] text-on-surface-variant/50">{new Date(comment.created_at).toLocaleString('zh-CN')}</p>
                  </div>
                </div>
                <div className="flex gap-1">
                  <button onClick={() => { setReplyingTo(replyingTo === comment.id ? null : comment.id); setReplyContent(''); }}
                    className="p-2 hover:bg-surface-container rounded-lg text-on-surface-variant hover:text-primary transition-all">
                    <Reply size={16} />
                  </button>
                  <button onClick={() => handleDelete(comment.id)}
                    className="p-2 hover:bg-error-container rounded-lg text-on-surface-variant hover:text-error transition-all">
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
              <p className="text-sm text-on-surface-variant leading-relaxed">{comment.content}</p>
              <p className="text-[10px] text-on-surface-variant/40 mt-2">❤️ {comment.likes}</p>
            </div>

            {/* Replies */}
            {comment.replies?.length > 0 && (
              <div className="border-t border-outline-variant/10 bg-surface-container-low/30">
                {comment.replies.map((reply: any) => (
                  <div key={reply.id} className="px-6 py-4 ml-8 border-l-2 border-primary/20">
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-bold text-primary font-headline">{reply.author}</span>
                        {reply.is_author && <span className="bg-primary text-white text-[8px] px-2 py-0.5 rounded-full font-bold">作者</span>}
                        <span className="text-[10px] text-on-surface-variant/50">{new Date(reply.created_at).toLocaleString('zh-CN')}</span>
                      </div>
                      <button onClick={() => handleDelete(reply.id)}
                        className="p-1 hover:bg-error-container rounded text-on-surface-variant/30 hover:text-error transition-all">
                        <Trash2 size={14} />
                      </button>
                    </div>
                    <p className="text-sm text-on-surface-variant">{reply.content}</p>
                  </div>
                ))}
              </div>
            )}

            {/* Reply form */}
            {replyingTo === comment.id && (
              <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }}
                className="border-t border-outline-variant/10 p-4">
                <div className="flex gap-3">
                  <input value={replyContent} onChange={e => setReplyContent(e.target.value)} placeholder="以「艾伦Ai」身份回复..."
                    className="flex-1 bg-surface border border-outline-variant/50 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-primary transition-all"
                    onKeyDown={e => e.key === 'Enter' && handleReply(comment.id)} />
                  <button onClick={() => handleReply(comment.id)}
                    className="px-4 py-2 bg-primary text-white rounded-lg text-xs font-bold hover:opacity-90 transition-all flex items-center gap-2 cursor-pointer">
                    <Send size={14} /> 回复
                  </button>
                </div>
              </motion.div>
            )}
          </div>
        ))}
        {comments.length === 0 && <div className="text-center py-16 text-sm text-on-surface-variant">暂无留言</div>}
      </div>
    </div>
  );
}
