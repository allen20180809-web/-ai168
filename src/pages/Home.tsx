import React from 'react';
import { FEATURED_ARTICLES, RECENT_ACTIVITIES } from '../constants';
import Sidebar from '../components/Sidebar';
import { FeaturedCard, SmallCard } from '../components/ArticleCards';
import { ChevronRight, FileText, Terminal, Camera } from 'lucide-react';
import { motion } from 'motion/react';

export default function Home() {
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
            <FeaturedCard article={FEATURED_ARTICLES[0]} />
            <SmallCard 
              title="作为现代艺术的神经网络" 
              link="/article/2"
              icon={<Terminal size={32} />}
            />
            <SmallCard 
              title="2024 技术栈报告" 
              subtitle="定义创意产业工具的年度回顾。"
              link="/article/3"
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
            {RECENT_ACTIVITIES.map(activity => (
              <motion.div 
                key={activity.id}
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
                    <p className="text-xs text-on-surface-variant">{activity.time} • {activity.tag}</p>
                  </div>
                </div>
                <ChevronRight size={18} className="text-outline group-hover:text-primary transition-colors" />
              </motion.div>
            ))}
          </div>

          {/* Pagination */}
          <div className="flex justify-center items-center gap-4 mt-8">
            <button className="flex items-center gap-2 px-4 py-2 text-primary font-bold text-xs font-headline hover:bg-surface-container transition-colors rounded-full transition-all">
              上一页
            </button>
            <div className="flex gap-2">
              <span className="w-8 h-8 flex items-center justify-center rounded-full bg-primary text-white text-[10px] font-bold">1</span>
              <span className="w-8 h-8 flex items-center justify-center rounded-full text-on-surface-variant hover:bg-surface-container transition-colors cursor-pointer text-[10px] font-bold">2</span>
              <span className="w-8 h-8 flex items-center justify-center rounded-full text-on-surface-variant hover:bg-surface-container transition-colors cursor-pointer text-[10px] font-bold">3</span>
            </div>
            <button className="flex items-center gap-2 px-4 py-2 text-primary font-bold text-xs font-headline hover:bg-surface-container transition-colors rounded-full transition-all">
              下一页
            </button>
          </div>
        </section>
      </main>
    </div>
  );
}
