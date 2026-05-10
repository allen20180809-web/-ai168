import React, { useState, useEffect } from 'react';
import { articlesApi } from '../../lib/api';
import { Plus, Edit, Trash2, Eye, EyeOff, Search, X, Save } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function ArticleManager() {
  const [articles, setArticles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showEditor, setShowEditor] = useState(false);
  const [editingArticle, setEditingArticle] = useState<any>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [form, setForm] = useState({
    title: '', summary: '', content: '', category: '',
    image: '', is_featured: false, is_new: false, tags: '',
    published: false,
  });

  useEffect(() => { loadArticles(); }, []);

  const loadArticles = async () => {
    try {
      const result = await articlesApi.all();
      setArticles(result.data || []);
    } catch (err) { console.error(err); }
    finally { setLoading(false); }
  };

  const openEditor = (article?: any) => {
    if (article) {
      setEditingArticle(article);
      setForm({
        title: article.title || '', summary: article.summary || '',
        content: article.content || '', category: article.category || '',
        image: article.image || '', is_featured: article.is_featured || false,
        is_new: article.is_new || false,
        tags: (article.tags || []).join(', '),
        published: article.published || false,
      });
    } else {
      setEditingArticle(null);
      setForm({ title: '', summary: '', content: '', category: '', image: '', is_featured: false, is_new: false, tags: '', published: false });
    }
    setShowEditor(true);
  };

  const handleSave = async () => {
    try {
      const payload = { ...form, tags: form.tags.split(',').map(t => t.trim()).filter(Boolean) };
      if (editingArticle) {
        await articlesApi.update(editingArticle.id, payload);
      } else {
        await articlesApi.create(payload);
      }
      setShowEditor(false);
      loadArticles();
    } catch (err) { console.error(err); }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('确定删除这篇文章？')) return;
    try {
      await articlesApi.delete(id);
      loadArticles();
    } catch (err) { console.error(err); }
  };

  const filtered = articles.filter(a =>
    a.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    a.category?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) return <div className="flex items-center justify-center h-64"><p className="text-sm text-on-surface-variant animate-pulse font-headline">加载中...</p></div>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-primary font-headline">文章管理</h1>
          <p className="text-sm text-on-surface-variant mt-1">共 {articles.length} 篇文章</p>
        </div>
        <button onClick={() => openEditor()} className="flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-xl text-xs font-bold font-headline hover:opacity-90 transition-all cursor-pointer">
          <Plus size={16} /> 新建文章
        </button>
      </div>

      {/* Search */}
      <div className="relative">
        <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant/50" />
        <input value={searchQuery} onChange={e => setSearchQuery(e.target.value)} placeholder="搜索文章标题或分类..."
          className="w-full bg-surface-container-lowest border border-outline-variant/20 rounded-xl pl-12 pr-4 py-3 text-sm focus:outline-none focus:border-primary transition-all" />
      </div>

      {/* Table */}
      <div className="bg-surface-container-lowest rounded-xl border border-outline-variant/10 overflow-hidden">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-outline-variant/10 text-[10px] font-bold uppercase tracking-widest text-on-surface-variant font-headline">
              <th className="px-6 py-4">标题</th>
              <th className="px-6 py-4">分类</th>
              <th className="px-6 py-4">状态</th>
              <th className="px-6 py-4">精选</th>
              <th className="px-6 py-4">日期</th>
              <th className="px-6 py-4 text-right">操作</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(article => (
              <tr key={article.id} className="border-b border-outline-variant/5 hover:bg-surface-container-low transition-colors">
                <td className="px-6 py-4 text-sm font-bold text-primary font-headline max-w-[300px] truncate">{article.title}</td>
                <td className="px-6 py-4"><span className="text-[10px] font-bold bg-secondary-container text-on-secondary-container px-2 py-1 rounded-full">{article.category}</span></td>
                <td className="px-6 py-4">
                  {article.published
                    ? <span className="flex items-center gap-1 text-[10px] font-bold text-primary"><Eye size={14} /> 已发布</span>
                    : <span className="flex items-center gap-1 text-[10px] font-bold text-on-surface-variant/50"><EyeOff size={14} /> 草稿</span>}
                </td>
                <td className="px-6 py-4 text-xs">{article.is_featured ? '⭐' : '—'}</td>
                <td className="px-6 py-4 text-xs text-on-surface-variant">{new Date(article.created_at).toLocaleDateString('zh-CN')}</td>
                <td className="px-6 py-4">
                  <div className="flex justify-end gap-2">
                    <button onClick={() => openEditor(article)} className="p-2 hover:bg-surface-container rounded-lg text-on-surface-variant hover:text-primary transition-all"><Edit size={16} /></button>
                    <button onClick={() => handleDelete(article.id)} className="p-2 hover:bg-error-container rounded-lg text-on-surface-variant hover:text-error transition-all"><Trash2 size={16} /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filtered.length === 0 && <div className="text-center py-12 text-sm text-on-surface-variant">暂无文章</div>}
      </div>

      {/* Editor Modal */}
      <AnimatePresence>
        {showEditor && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-start justify-center pt-12 px-4 overflow-y-auto">
            <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 40 }}
              className="bg-surface-container-lowest rounded-2xl p-8 w-full max-w-3xl border border-outline-variant/10 shadow-2xl mb-12">
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-2xl font-bold text-primary font-headline">{editingArticle ? '编辑文章' : '新建文章'}</h2>
                <button onClick={() => setShowEditor(false)} className="p-2 hover:bg-surface-container rounded-lg transition-all"><X size={20} /></button>
              </div>
              <div className="space-y-5">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant font-headline">标题</label>
                  <input value={form.title} onChange={e => setForm({...form, title: e.target.value})} className="w-full bg-surface border border-outline-variant/50 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-primary transition-all" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant font-headline">分类</label>
                    <input value={form.category} onChange={e => setForm({...form, category: e.target.value})} className="w-full bg-surface border border-outline-variant/50 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-primary transition-all" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant font-headline">标签（逗号分隔）</label>
                    <input value={form.tags} onChange={e => setForm({...form, tags: e.target.value})} className="w-full bg-surface border border-outline-variant/50 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-primary transition-all" />
                  </div>
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant font-headline">摘要</label>
                  <textarea value={form.summary} onChange={e => setForm({...form, summary: e.target.value})} rows={2} className="w-full bg-surface border border-outline-variant/50 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-primary transition-all resize-none" />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant font-headline">正文 (Markdown)</label>
                  <textarea value={form.content} onChange={e => setForm({...form, content: e.target.value})} rows={10} className="w-full bg-surface border border-outline-variant/50 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-primary transition-all font-mono resize-none" />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant font-headline">封面图 URL</label>
                  <input value={form.image} onChange={e => setForm({...form, image: e.target.value})} className="w-full bg-surface border border-outline-variant/50 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-primary transition-all" />
                </div>
                <div className="flex gap-6 items-center">
                  <label className="flex items-center gap-2 text-sm cursor-pointer">
                    <input type="checkbox" checked={form.published} onChange={e => setForm({...form, published: e.target.checked})} className="accent-primary w-4 h-4" />
                    <span className="font-headline text-on-surface-variant">发布</span>
                  </label>
                  <label className="flex items-center gap-2 text-sm cursor-pointer">
                    <input type="checkbox" checked={form.is_featured} onChange={e => setForm({...form, is_featured: e.target.checked})} className="accent-primary w-4 h-4" />
                    <span className="font-headline text-on-surface-variant">精选</span>
                  </label>
                  <label className="flex items-center gap-2 text-sm cursor-pointer">
                    <input type="checkbox" checked={form.is_new} onChange={e => setForm({...form, is_new: e.target.checked})} className="accent-primary w-4 h-4" />
                    <span className="font-headline text-on-surface-variant">新发布标签</span>
                  </label>
                </div>
                <div className="flex justify-end gap-3 pt-4">
                  <button onClick={() => setShowEditor(false)} className="px-6 py-3 border border-outline-variant text-on-surface-variant rounded-xl text-xs font-bold font-headline hover:bg-surface-container transition-all cursor-pointer">取消</button>
                  <button onClick={handleSave} className="flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-xl text-xs font-bold font-headline hover:opacity-90 transition-all cursor-pointer"><Save size={16} /> 保存</button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
