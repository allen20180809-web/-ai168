import React, { useState, useEffect } from 'react';
import { articlesApi, activitiesApi } from '../lib/api';
import { FEATURED_ARTICLES, RECENT_ACTIVITIES } from '../constants';
import Sidebar from '../components/Sidebar';
import { FeaturedCard, SmallCard } from '../components/ArticleCards';
import { ChevronRight, FileText, Terminal, Camera } from 'lucide-react';
import { motion } from 'motion/react';
import { Article, Activity } from '../types';

export default function Home() {
  const [featuredArticles, setFeaturedArticles] = useState<any[]>(FEATURED_ARTICLES);
  const [recentActivities, setRecentActivities] = useState<any[]>(RECENT_ACTIVITIES);
  const [articles, setArticles] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    loadArticles();
  }, [page]);

  const loadData = async () => {
    try {
      const [featuredResult, activitiesResult] = await Promise.all([
        articlesApi.featured(),
        activitiesApi.list(5),
      ]);
      if (featuredResult.data?.length) setFeaturedArticles(featuredResult.data);
      if (activitiesResult.data?.length) setRecentActivities(activitiesResult.data);
    } catch (err) {
      console.warn('API 未连接，使用本地数据:', err);
    }
  };

  const loadArticles = async () => {
    try {
      const result = await articlesApi.list(page, 5);
      if (result.data) {
        setArticles(result.data);
        setTotalPages(result.pagination.totalPages);
      }
    } catch {
      // fallback to static data already set
    } finally {
      setLoading(false);
    }
  };

  const formatTime = (dateStr: string) => {
    const date = new Date(dateStr);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffH = Math.floor(diffMs / 3600000);
    if (diffH < 1) return '刚刚';
    if (diffH < 24) return `${diffH}小时前`;
    const diffD = Math.floor(diffH / 24);
    if (diffD < 7) return diffD === 1 ? '昨天' : `${diffD}天前`;
    return date.toLocaleDateString('zh-CN');
  };

  return (
    <div className="max-w-7xl mx-auto px-6 md:px-16 py-12 gap-8 flex">
      <Sidebar />
      
      <main className="flex-1 space-y-20">
        {/* Editor's Choice */}
        <section className="space-y-8">
          <div>
            <p className="text-[10px] font-bold text-primary tracking-[0.2em] uppercase mb-2 font-headline">精选推荐</p>
            <h2 className="text-4xl font-bold text-primary font-headline">文章精选</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 grid-rows-2 gap-6 md:h-[640px]">
            {featuredArticles[0] && <FeaturedCard article={featuredArticles[0]} />}
            <SmallCard 
              title={featuredArticles[1]?.title || '作为现代艺术的神经网络'} 
              link={`/article/${featuredArticles[1]?.id || '2'}`}
              icon={<Terminal size={32} />}
            />
            <SmallCard 
              title={featuredArticles[2]?.title || '2024 技术栈报告'} 
              subtitle={featuredArticles[2]?.summary || '定义创意产业工具的年度回顾。'}
              link={`/article/${featuredArticles[2]?.id || '3'}`}
              dark
            />
          </div>
        </section>

        {/* Latest Activity */}
        <section className="space-y-8 pb-12">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-primary font-headline">最近文章</h2>
            <a href="#" className="text-xs font-bold font-headline text-primary underline underline-offset-4 decoration-primary/30">查看全部</a>
          </div>

          <div className="space-y-2">
            {recentActivities.map((activity, idx) => (
              <motion.div 
                key={activity.id || idx}
                whileHover={{ x: 4 }}
                className="group flex items-center justify-between p-6 bg-surface-container-lowest hover:bg-surface-container-low transition-all border-b border-outline-variant/10 rounded-xl cursor-pointer"
              >
                <div className="flex items-center gap-6">
                  <div className="w-12 h-12 rounded-lg bg-secondary-container flex items-center justify-center">
                    {activity.type === 'publish' && <FileText className="text-on-secondary-container" size={20} />}
                    {activity.type === 'update' && <Terminal className="text-on-secondary-container" size={20} />}
                    {activity.type === 'gallery' && <Camera className="text-on-secondary-container" size={20} />}
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-primary font-headline">{activity.title}</h4>
                    <p className="text-xs text-on-surface-variant">
                      {activity.created_at ? formatTime(activity.created_at) : activity.time} • {activity.tag}
                    </p>
                  </div>
                </div>
                <ChevronRight size={18} className="text-outline group-hover:text-primary transition-colors" />
              </motion.div>
            ))}
          </div>

          {/* Pagination */}
          <div className="flex justify-center items-center gap-4 mt-8">
            <button 
              onClick={() => setPage(Math.max(1, page - 1))}
              disabled={page <= 1}
              className="flex items-center gap-2 px-4 py-2 text-primary font-bold text-xs font-headline hover:bg-surface-container transition-colors rounded-full disabled:opacity-30"
            >
              上一页
            </button>
            <div className="flex gap-2">
              {Array.from({ length: totalPages }, (_, i) => i + 1).slice(0, 5).map(p => (
                <span 
                  key={p}
                  onClick={() => setPage(p)}
                  className={`w-8 h-8 flex items-center justify-center rounded-full text-[10px] font-bold cursor-pointer transition-colors ${
                    p === page ? 'bg-primary text-white' : 'text-on-surface-variant hover:bg-surface-container'
                  }`}
                >
                  {p}
                </span>
              ))}
            </div>
            <button 
              onClick={() => setPage(Math.min(totalPages, page + 1))}
              disabled={page >= totalPages}
              className="flex items-center gap-2 px-4 py-2 text-primary font-bold text-xs font-headline hover:bg-surface-container transition-colors rounded-full disabled:opacity-30"
            >
              下一页
            </button>
          </div>
        </section>
      </main>
    </div>
  );
}
