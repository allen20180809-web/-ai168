import React, { useState, useEffect } from 'react';
import { activitiesApi } from '../../lib/api';
import { Plus, Trash2, FileText, Terminal, Camera, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const TYPE_OPTIONS = [
  { value: 'publish', label: '发布', icon: FileText },
  { value: 'update', label: '更新', icon: Terminal },
  { value: 'gallery', label: '图集', icon: Camera },
];

export default function ActivityManager() {
  const [activities, setActivities] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ type: 'publish', title: '', tag: '' });

  useEffect(() => { loadActivities(); }, []);

  const loadActivities = async () => {
    try {
      const result = await activitiesApi.list(50);
      setActivities(result.data || []);
    } catch (err) { console.error(err); }
    finally { setLoading(false); }
  };

  const handleCreate = async () => {
    if (!form.title.trim()) return;
    try {
      await activitiesApi.create(form);
      setShowForm(false);
      setForm({ type: 'publish', title: '', tag: '' });
      loadActivities();
    } catch (err) { console.error(err); }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('确定删除？')) return;
    try { await activitiesApi.delete(id); loadActivities(); }
    catch (err) { console.error(err); }
  };

  const getTypeIcon = (type: string) => {
    const opt = TYPE_OPTIONS.find(o => o.value === type);
    return opt ? <opt.icon size={18} /> : <FileText size={18} />;
  };

  if (loading) return <div className="flex items-center justify-center h-64"><p className="text-sm text-on-surface-variant animate-pulse font-headline">加载中...</p></div>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-primary font-headline">动态管理</h1>
          <p className="text-sm text-on-surface-variant mt-1">共 {activities.length} 条动态</p>
        </div>
        <button onClick={() => setShowForm(true)} className="flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-xl text-xs font-bold font-headline hover:opacity-90 transition-all cursor-pointer">
          <Plus size={16} /> 新建动态
        </button>
      </div>

      {/* Create form */}
      <AnimatePresence>
        {showForm && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}
            className="bg-surface-container-lowest rounded-xl border border-outline-variant/10 p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold text-primary font-headline">新建动态</h3>
              <button onClick={() => setShowForm(false)} className="p-1 hover:bg-surface-container rounded-lg"><X size={18} /></button>
            </div>
            <div className="grid grid-cols-3 gap-4 mb-4">
              <div className="space-y-1">
                <label className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant font-headline">类型</label>
                <select value={form.type} onChange={e => setForm({...form, type: e.target.value})}
                  className="w-full bg-surface border border-outline-variant/50 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-primary transition-all">
                  {TYPE_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
                </select>
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant font-headline">标题</label>
                <input value={form.title} onChange={e => setForm({...form, title: e.target.value})}
                  className="w-full bg-surface border border-outline-variant/50 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-primary transition-all" />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant font-headline">标签</label>
                <input value={form.tag} onChange={e => setForm({...form, tag: e.target.value})}
                  className="w-full bg-surface border border-outline-variant/50 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-primary transition-all" />
              </div>
            </div>
            <button onClick={handleCreate} className="px-6 py-3 bg-primary text-white rounded-xl text-xs font-bold font-headline hover:opacity-90 transition-all cursor-pointer">创建</button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Activity List */}
      <div className="space-y-2">
        {activities.map(a => (
          <div key={a.id} className="flex items-center justify-between bg-surface-container-lowest rounded-xl p-5 border border-outline-variant/10 hover:border-primary/20 transition-all">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-lg bg-secondary-container flex items-center justify-center text-on-secondary-container">
                {getTypeIcon(a.type)}
              </div>
              <div>
                <h4 className="text-sm font-bold text-primary font-headline">{a.title}</h4>
                <p className="text-[10px] text-on-surface-variant">{new Date(a.created_at).toLocaleString('zh-CN')} • {a.tag}</p>
              </div>
            </div>
            <button onClick={() => handleDelete(a.id)} className="p-2 hover:bg-error-container rounded-lg text-on-surface-variant hover:text-error transition-all">
              <Trash2 size={16} />
            </button>
          </div>
        ))}
        {activities.length === 0 && <div className="text-center py-16 text-sm text-on-surface-variant">暂无动态</div>}
      </div>
    </div>
  );
}
