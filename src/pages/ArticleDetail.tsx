import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { articlesApi } from '../lib/api';

export default function ArticleDetail() {
  const { id } = useParams();
  const [article, setArticle] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) loadArticle(id);
  }, [id]);

  const loadArticle = async (articleId: string) => {
    try {
      const result = await articlesApi.get(articleId);
      setArticle(result.data);
    } catch {
      // If API not connected, show fallback content
      setArticle(null);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <main className="max-w-4xl mx-auto px-6 md:px-0 pt-20">
        <div className="flex items-center justify-center h-64">
          <p className="text-sm text-on-surface-variant animate-pulse font-headline">加载中...</p>
        </div>
      </main>
    );
  }

  // Fallback for when API is not connected
  if (!article) {
    return (
      <main className="max-w-4xl mx-auto px-6 md:px-0 pt-20">
        <Link to="/" className="flex items-center gap-2 text-xs font-bold font-headline text-primary mb-12 hover:-translate-x-1 transition-transform">
          <ArrowLeft size={16} /> 返回首页
        </Link>
        
        <header className="mb-20 text-center">
          <div className="flex items-center justify-center gap-3 mb-6">
            <span className="bg-secondary-container text-on-secondary-container px-3 py-1 rounded-full text-[10px] font-bold font-headline uppercase tracking-wider">#技术演进</span>
            <span className="bg-secondary-container text-on-secondary-container px-3 py-1 rounded-full text-[10px] font-bold font-headline uppercase tracking-wider">#设计哲学</span>
          </div>
          <h1 className="text-5xl font-bold text-primary mb-6 leading-tight font-headline">构建"活着的实验室"：我的数字化策展实验</h1>
          <div className="text-[10px] font-bold text-on-surface-variant/60 tracking-widest uppercase font-headline">2024年10月24日</div>
        </header>

        <section className="mb-20">
          <p className="text-2xl italic text-on-surface-variant/80 border-l-4 border-primary pl-8 py-2 font-headline">
            策展不仅仅是陈列，而是一种动态的观察。在这个数字化时代，如何将传统的工程思维与现代的极简主义美学相结合，构建一个真正能够自我演进的"活着的实验室"？
          </p>
        </section>

        <article className="space-y-12 text-sm text-on-surface leading-loose">
          <p>在过去的十年中，我们的数字化环境变得越来越复杂。作为一名数字策展人，我发现传统的静态存档方式已经无法满足快速迭代的技术需求。</p>
          <h2 className="text-3xl font-bold text-primary mt-16 mb-6 font-headline">工程思维的颗粒度</h2>
          <p>工程思维的核心在于解构。当我们审视一个策展空间时，不再仅仅看它的视觉呈现，而是看它背后的数据流动。</p>
        </article>
      </main>
    );
  }

  return (
    <main className="max-w-4xl mx-auto px-6 md:px-0 pt-20">
      <Link to="/" className="flex items-center gap-2 text-xs font-bold font-headline text-primary mb-12 hover:-translate-x-1 transition-transform">
        <ArrowLeft size={16} /> 返回首页
      </Link>
      
      <header className="mb-20 text-center">
        {article.tags?.length > 0 && (
          <div className="flex items-center justify-center gap-3 mb-6">
            {article.tags.map((tag: string) => (
              <span key={tag} className="bg-secondary-container text-on-secondary-container px-3 py-1 rounded-full text-[10px] font-bold font-headline uppercase tracking-wider">#{tag}</span>
            ))}
          </div>
        )}
        <h1 className="text-5xl font-bold text-primary mb-6 leading-tight font-headline">{article.title}</h1>
        <div className="text-[10px] font-bold text-on-surface-variant/60 tracking-widest uppercase font-headline">
          {new Date(article.created_at).toLocaleDateString('zh-CN', { year: 'numeric', month: 'long', day: 'numeric' })}
        </div>
      </header>

      {article.summary && (
        <section className="mb-20">
          <p className="text-2xl italic text-on-surface-variant/80 border-l-4 border-primary pl-8 py-2 font-headline">
            {article.summary}
          </p>
        </section>
      )}

      {article.image && (
        <figure className="my-20">
          <div className="bg-white p-8 rounded-xl shadow-ambient border border-outline-variant/10">
            <img className="w-full rounded-lg object-cover aspect-video mb-4" src={article.image} alt={article.title} />
          </div>
        </figure>
      )}

      <article className="space-y-12 text-sm text-on-surface leading-loose">
        {/* Render markdown content as paragraphs */}
        {article.content?.split('\n\n').map((block: string, i: number) => {
          if (block.startsWith('## ')) return <h2 key={i} className="text-3xl font-bold text-primary mt-16 mb-6 font-headline">{block.replace('## ', '')}</h2>;
          if (block.startsWith('### ')) return <h3 key={i} className="text-2xl font-bold text-primary mt-12 mb-4 font-headline">{block.replace('### ', '')}</h3>;
          return <p key={i}>{block}</p>;
        })}
      </article>

      <section className="mt-32 border-t border-outline-variant/30 pt-16 pb-20">
        <h3 className="text-2xl font-bold text-primary mb-10 font-headline">相关阅读</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Link to="/article/2" className="airy-card p-8 rounded-xl group">
            <div className="text-[10px] font-bold text-secondary mb-4 uppercase tracking-widest font-headline">设计哲学</div>
            <h4 className="text-xl font-bold text-on-surface group-hover:text-primary transition-colors mb-4 font-headline">留白的艺术：在过载中寻找秩序</h4>
            <p className="text-xs text-on-surface-variant/70">探讨为什么在现代 UI 设计中，空白空间比内容本身更重要。</p>
          </Link>
          <Link to="/article/3" className="airy-card p-8 rounded-xl group">
            <div className="text-[10px] font-bold text-secondary mb-4 uppercase tracking-widest font-headline">技术演进</div>
            <h4 className="text-xl font-bold text-on-surface group-hover:text-primary transition-colors mb-4 font-headline">从静态到动态：构建响应式策展框架</h4>
            <p className="text-xs text-on-surface-variant/70">如何利用现代前端技术栈实现真正具备生命力的数字展览。</p>
          </Link>
        </div>
      </section>
    </main>
  );
}
