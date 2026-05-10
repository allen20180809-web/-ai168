import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

export default function ArticleDetail() {
  const { id } = useParams();

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
        <h1 className="text-5xl font-bold text-primary mb-6 leading-tight font-headline">构建“活着的实验室”：我的数字化策展实验</h1>
        <div className="text-[10px] font-bold text-on-surface-variant/60 tracking-widest uppercase font-headline">2024年10月24日</div>
      </header>

      <section className="mb-20">
        <p className="text-2xl italic text-on-surface-variant/80 border-l-4 border-primary pl-8 py-2 font-headline">
          策展不仅仅是陈列，而是一种动态的观察。在这个数字化时代，如何将传统的工程思维与现代的极简主义美学相结合，构建一个真正能够自我演进的“活着的实验室”？
        </p>
      </section>

      <article className="space-y-12 text-sm text-on-surface leading-loose">
        <p>
          在过去的十年中，我们的数字化环境变得越来越复杂。作为一名数字策展人，我发现传统的静态存档方式已经无法满足快速迭代的技术需求。我们需要一种新的范式——一种将精密的系统架构与柔性的视觉语言相融合的实验空间。
        </p>

        <figure className="my-20">
          <div className="bg-white p-8 rounded-xl shadow-ambient border border-outline-variant/10">
            <img 
              className="w-full rounded-lg object-cover aspect-video mb-4" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuACIdHx9MpBEO8SMz0b5P2XGHMVXE3EG_affHmIzv5cnj7_FAiiYmndektuUozKg12UrLOEfqDwBqPT0h4cy8fjkUXTsEYJ-ZhJ7XuJ77GATMQCrsrD9p5Xe_Cbei6rFV0jHrzbLsU4uzYVAbt4XIY2tshPLXzZ0ZJre5VtHXZprgU--Jnk9nM6zanNtBRditfBP1iU3K97rqz1mypONLNLJDpY6Ne4HVCmVFhjGNfzdSJ8KylfYbfWq-crO_cNDB5bQmbJtQ2ukHY" 
              alt="Workspace"
            />
            <figcaption className="text-center text-[10px] text-on-surface-variant/60 italic font-headline">
              实验室核心：极简主义与技术精准度的交汇点
            </figcaption>
          </div>
        </figure>

        <h2 className="text-3xl font-bold text-primary mt-16 mb-6 font-headline">工程思维的颗粒度</h2>
        <p>
          工程思维的核心在于解构。当我们审视一个策展空间时，不再仅仅看它的视觉呈现，而是看它背后的数据流动。每一个交互节点、每一条网格线，都是经过精密计算的结果。这种“可计算的美学”正是现代设计与传统工艺的分水岭。
        </p>

        <div className="bg-primary-container p-8 rounded-xl overflow-x-auto shadow-ambient my-12 text-on-primary-container font-mono text-xs">
          <pre>{`{
  "experiment_id": "LIVING_LAB_01",
  "philosophy": "Precision x Breathability",
  "active_modules": ["VisualEngine", "SemanticLayer"],
  "status": "evolving",
  "update_frequency": "real-time"
}`}</pre>
        </div>

        <p>
          与此同时，极简主义并非简单的“少”，而是对“多”的克制与重构。在大面积的留白中，每一个细节都被赋予了更沉重的权力和更清晰的意义。这就是所谓的“呼吸感”，它让用户在信息的海洋中找到一个静谧的锚点。
        </p>
      </article>

      <section className="mt-32 border-t border-outline-variant/30 pt-16">
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
