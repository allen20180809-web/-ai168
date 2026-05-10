import React from 'react';
import { User, CheckCircle, Quote, Palette, Zap, Code } from 'lucide-react';
import { motion } from 'motion/react';

export default function About() {
  const milestones = [
    {
      year: '2022 — 至今',
      title: '首席数字策展人 @ AiLabs',
      desc: '主导全球首个自主界面生成器的设计系统。管理一支由 12 名设计师 and 研究员组成的团队。',
      active: true
    },
    {
      year: '2018 — 2022',
      title: '高级界面架构师 @ Horizon',
      desc: '开发了高频交易平台的核心 UI 框架，专注于降低关键决策环境下的视觉干扰。',
      active: false
    },
    {
      year: '2015 — 2018',
      title: '前端开发人员 @ Studio Prism',
      desc: '与全球品牌合作，使用实验性的 WebGL 和 React 模式构建沉浸式、叙事驱动的网络体验。',
      active: false
    }
  ];

  return (
    <main className="max-w-7xl mx-auto px-6 md:px-16 py-20 overflow-hidden">
      <section className="mb-32 grid md:grid-cols-2 gap-16 items-center">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-8"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary-container text-on-secondary-container">
            <CheckCircle size={16} fill="currentColor" className="text-secondary" />
            <span className="text-[10px] font-bold font-headline uppercase tracking-wider">数字策展人</span>
          </div>
          <h1 className="text-6xl font-bold text-primary leading-tight font-headline">在智慧与优雅的交汇处进行创作。</h1>
          <p className="text-base text-on-surface-variant max-w-lg">
            我是一位多领域的创作者，致力于弥合先进人工智能与以人为本的设计之间的鸿沟。我的工作围绕着创造那些与其说是软件，不如说更像合作伙伴的工具而展开。
          </p>
          <div className="flex gap-4">
            <button className="px-8 py-3 bg-primary text-white rounded-xl text-xs font-bold font-headline hover:opacity-90 transition-all cursor-pointer">下载作品集</button>
            <button className="px-8 py-3 border border-primary text-primary rounded-xl text-xs font-bold font-headline hover:bg-primary/5 transition-all cursor-pointer">联系我</button>
          </div>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="relative"
        >
          <div className="aspect-[4/5] rounded-xl overflow-hidden shadow-ambient">
            <img 
              className="w-full h-full object-cover" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuC7QDZOpcrFhc3V-NqOOoYMVb6MYxi28k8D9T-nS-VOyiA4faql9JJun_LzMCkIT5slbb0OiE16g3CtVzn4Y6mG6nkwe9klnkTVGBgDdaS6EhIWQJvKQuvqZEuRJ4XwsTOdwDlRlg574PE-r0NJgB3Pl0ZMiPtcNT1zvRDhJYHIgqJ2mcvKWv8KIQfYPAvn_28G0WZU_VpnHr9xueKccZBXhkuYn57utHbz29A7aC6gKpEH2-jPkk4FE7_CpnzAMJJog9K1uPfH-6E" 
              alt="Portrait"
            />
          </div>
          <div className="absolute -bottom-6 -left-6 bg-surface-container-high p-6 rounded-xl shadow-ambient max-w-[200px]">
            <p className="text-4xl font-bold text-primary font-headline">12+</p>
            <p className="text-[10px] font-bold font-headline text-on-surface-variant uppercase tracking-wider">深耕数字架构领域的精准度</p>
          </div>
        </motion.div>
      </section>

      <section className="py-24 mb-32 border-y border-outline-variant/30 flex flex-col items-center text-center">
        <Quote size={40} className="text-primary-container mb-8" />
        <blockquote className="max-w-3xl">
          <p className="text-4xl italic text-primary leading-relaxed font-headline">
            “真正的创新不仅在于机器能做什么，更在于我们如何设计人类意图与数字执行之间的留白。”
          </p>
          <cite className="block mt-8 text-[10px] font-bold text-on-surface-variant not-italic font-headline uppercase tracking-widest">— 核心理念，艾伦Ai</cite>
        </blockquote>
      </section>

      <section className="mb-40">
        <div className="mb-16">
          <h2 className="text-[10px] font-bold text-primary-container uppercase tracking-[0.2em] mb-4 font-headline">职业历程</h2>
          <p className="text-4xl font-bold text-primary font-headline">专业里程碑</p>
        </div>
        <div className="space-y-12">
          {milestones.map((m, idx) => (
            <motion.div 
              key={idx} 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex gap-8 group"
            >
              <div className="hidden md:block w-32 shrink-0 pt-1">
                <span className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest font-headline">{m.year}</span>
              </div>
              <div className="relative flex flex-col items-center">
                <div className={`w-3 h-3 rounded-full ${m.active ? 'bg-primary ring-4 ring-primary-container/20' : 'bg-outline-variant'}`}></div>
                {idx !== milestones.length - 1 && <div className="w-[1px] h-full bg-outline-variant/30 mt-4"></div>}
              </div>
              <div className="pb-12">
                <span className="md:hidden block text-[10px] font-bold text-on-surface-variant mb-2 uppercase font-headline">{m.year}</span>
                <h4 className="text-2xl font-bold text-primary mb-2 font-headline">{m.title}</h4>
                <p className="text-sm text-on-surface-variant max-w-2xl">{m.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </main>
  );
}
