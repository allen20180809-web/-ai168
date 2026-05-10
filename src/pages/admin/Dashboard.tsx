import React, { useState, useEffect } from 'react';
import { adminApi } from '../../lib/api';
import { FileText, MessageSquare, Activity, Eye, PenTool } from 'lucide-react';
import { motion } from 'motion/react';

export default function Dashboard() {
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => { loadDashboard(); }, []);

  const loadDashboard = async () => {
    try {
      const result = await adminApi.dashboard();
      setStats(result.data);
    } catch (err) {
      console.error('加载仪表盘失败:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-sm text-on-surface-variant animate-pulse font-headline">加载数据...</p>
      </div>
    );
  }

  const cards = [
    { label: '文章总数', value: stats?.totalArticles ?? 0, icon: FileText, color: 'bg-primary' },
    { label: '已发布', value: stats?.publishedArticles ?? 0, icon: Eye, color: 'bg-secondary' },
    { label: '草稿', value: stats?.draftArticles ?? 0, icon: PenTool, color: 'bg-tertiary' },
    { label: '留言总数', value: stats?.totalComments ?? 0, icon: MessageSquare, color: 'bg-primary-container' },
    { label: '动态总数', value: stats?.totalActivities ?? 0, icon: Activity, color: 'bg-secondary-container' },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-primary font-headline">仪表盘</h1>
        <p className="text-sm text-on-surface-variant mt-1">欢迎回来，艾伦。以下是您的站点概览。</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        {cards.map((card, i) => (
          <motion.div key={card.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
            className="bg-surface-container-lowest rounded-xl p-6 border border-outline-variant/10">
            <div className={`w-10 h-10 rounded-lg ${card.color} shadow-lg flex items-center justify-center mb-4`}>
              <card.icon size={20} className="text-white" />
            </div>
            <p className="text-3xl font-bold text-primary font-headline">{card.value}</p>
            <p className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant mt-1 font-headline">{card.label}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
