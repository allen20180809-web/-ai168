import React, { useState, useEffect } from 'react';
import { adminApi } from '../../lib/api';
import { Save, RefreshCw } from 'lucide-react';
import { motion } from 'motion/react';

export default function SiteSettings() {
  const [config, setConfig] = useState<any>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  // Form state
  const [contact, setContact] = useState({ email: '', wechat: '', location: '' });
  const [about, setAbout] = useState({ title: '', description: '', quote: '' });
  const [profile, setProfile] = useState({ name: '', role: '', avatar: '' });

  useEffect(() => { loadConfig(); }, []);

  const loadConfig = async () => {
    try {
      const result = await adminApi.getSiteConfig();
      const data = result.data || {};
      setConfig(data);
      if (data.contact) setContact(data.contact);
      if (data.about) setAbout(data.about);
      if (data.profile) setProfile(data.profile);
    } catch (err) { console.error(err); }
    finally { setLoading(false); }
  };

  const handleSave = async () => {
    setSaving(true);
    setMessage('');
    try {
      await Promise.all([
        adminApi.updateSiteConfig('contact', contact),
        adminApi.updateSiteConfig('about', about),
        adminApi.updateSiteConfig('profile', profile),
      ]);
      setMessage('保存成功！');
      setTimeout(() => setMessage(''), 3000);
    } catch (err) { console.error(err); setMessage('保存失败'); }
    finally { setSaving(false); }
  };

  if (loading) return <div className="flex items-center justify-center h-64"><p className="text-sm text-on-surface-variant animate-pulse font-headline">加载中...</p></div>;

  const InputField = ({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) => (
    <div className="space-y-1">
      <label className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant font-headline">{label}</label>
      <input value={value} onChange={e => onChange(e.target.value)}
        className="w-full bg-surface border border-outline-variant/50 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-primary transition-all" />
    </div>
  );

  const TextAreaField = ({ label, value, onChange, rows = 3 }: { label: string; value: string; onChange: (v: string) => void; rows?: number }) => (
    <div className="space-y-1">
      <label className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant font-headline">{label}</label>
      <textarea value={value} onChange={e => onChange(e.target.value)} rows={rows}
        className="w-full bg-surface border border-outline-variant/50 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-primary transition-all resize-none" />
    </div>
  );

  return (
    <div className="space-y-8 max-w-3xl">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-primary font-headline">站点设置</h1>
          <p className="text-sm text-on-surface-variant mt-1">管理联系信息、个人资料和关于页内容。</p>
        </div>
        <button onClick={handleSave} disabled={saving}
          className="flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-xl text-xs font-bold font-headline hover:opacity-90 transition-all cursor-pointer disabled:opacity-50">
          {saving ? <RefreshCw size={16} className="animate-spin" /> : <Save size={16} />}
          {saving ? '保存中...' : '保存所有'}
        </button>
      </div>

      {message && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          className={`p-3 rounded-lg text-xs font-bold ${message.includes('成功') ? 'bg-secondary-container text-on-secondary-container' : 'bg-error-container text-on-error-container'}`}>
          {message}
        </motion.div>
      )}

      {/* Profile */}
      <section className="bg-surface-container-lowest rounded-xl border border-outline-variant/10 p-6 space-y-4">
        <h2 className="text-lg font-bold text-primary font-headline">个人资料</h2>
        <div className="grid grid-cols-2 gap-4">
          <InputField label="姓名" value={profile.name} onChange={v => setProfile({...profile, name: v})} />
          <InputField label="角色" value={profile.role} onChange={v => setProfile({...profile, role: v})} />
        </div>
        <InputField label="头像 URL" value={profile.avatar} onChange={v => setProfile({...profile, avatar: v})} />
      </section>

      {/* Contact */}
      <section className="bg-surface-container-lowest rounded-xl border border-outline-variant/10 p-6 space-y-4">
        <h2 className="text-lg font-bold text-primary font-headline">联系信息</h2>
        <InputField label="电子邮件" value={contact.email} onChange={v => setContact({...contact, email: v})} />
        <InputField label="微信" value={contact.wechat} onChange={v => setContact({...contact, wechat: v})} />
        <InputField label="地点" value={contact.location} onChange={v => setContact({...contact, location: v})} />
      </section>

      {/* About */}
      <section className="bg-surface-container-lowest rounded-xl border border-outline-variant/10 p-6 space-y-4">
        <h2 className="text-lg font-bold text-primary font-headline">关于页面</h2>
        <InputField label="标题" value={about.title} onChange={v => setAbout({...about, title: v})} />
        <TextAreaField label="简介" value={about.description} onChange={v => setAbout({...about, description: v})} rows={4} />
        <TextAreaField label="核心理念引言" value={about.quote} onChange={v => setAbout({...about, quote: v})} rows={3} />
      </section>
    </div>
  );
}
