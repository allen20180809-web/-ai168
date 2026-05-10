import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Star, Database, MoveUpRight } from 'lucide-react';
import { Article } from '../types';

export function FeaturedCard({ article }: { article: Article }) {
  return (
    <div className="md:col-span-8 md:row-span-2 relative group overflow-hidden rounded-xl bg-surface-container-lowest ambient-shadow border border-outline-variant/10 h-full">
      <img 
        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
        src={article.image} 
        alt={article.title}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-primary/95 via-primary/30 to-transparent flex flex-col justify-end p-10 space-y-4">
        <span className="w-fit px-3 py-1 bg-inverse-primary text-primary font-bold text-[10px] uppercase tracking-wider rounded-full">新发布</span>
        <h3 className="text-4xl font-bold text-white font-headline leading-tight">{article.title}</h3>
        <p className="text-base text-white/80 max-w-lg">{article.summary}</p>
        <Link to={`/article/${article.id}`} className="flex items-center gap-2 text-white text-xs font-bold font-headline group/link">
          阅读文章 <ArrowRight size={16} className="group-hover/link:translate-x-2 transition-transform" />
        </Link>
      </div>
    </div>
  );
}

export function SmallCard({ title, subtitle, icon, link, dark = false }: { title: string, subtitle?: string, icon?: React.ReactNode, link: string, dark?: boolean }) {
  if (dark) {
    return (
      <div className="md:col-span-4 md:row-span-1 bg-primary text-white p-8 rounded-xl shadow-lg shadow-primary/10 flex flex-col justify-between group">
        <div className="space-y-4">
          <div className="flex gap-1 text-secondary-container">
            <Star size={20} fill="currentColor" />
            <Star size={20} fill="currentColor" />
            <Star size={20} fill="currentColor" />
          </div>
          <h4 className="text-2xl font-bold font-headline leading-tight">{title}</h4>
        </div>
        <p className="text-xs text-white/60">{subtitle}</p>
      </div>
    );
  }

  return (
    <div className="md:col-span-4 md:row-span-1 bg-surface-container-lowest p-8 rounded-xl shadow-ambient border border-outline-variant/10 flex flex-col justify-between group">
      <div className="space-y-4">
        <div className="text-primary">
          {icon || <Database size={32} />}
        </div>
        <h4 className="text-2xl font-bold text-primary font-headline leading-tight">{title}</h4>
      </div>
      <Link to={link || "#"} className="text-primary text-[10px] font-bold font-headline uppercase tracking-widest flex items-center gap-2 group-hover:gap-4 transition-all">
        查看研究 <MoveUpRight size={14} />
      </Link>
    </div>
  );
}
