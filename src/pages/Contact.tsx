import React from 'react';
import { Mail, Globe, MapPin, Share2, Palette, Instagram, Github, ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';

export default function Contact() {
  return (
    <main className="max-w-7xl mx-auto px-6 md:px-16 py-20">
      <section className="mb-24 flex flex-col md:flex-row items-end justify-between gap-12">
        <div className="max-w-2xl">
          <span className="text-[10px] font-bold text-secondary uppercase tracking-[0.2em] mb-4 block font-headline">保持联系</span>
          <h1 className="text-6xl font-bold text-primary mb-6 font-headline leading-tight">让我们共同探索数字新视界。</h1>
          <p className="text-base text-on-surface-variant leading-relaxed max-w-lg">
            无论您是在寻求合作、策划展览，还是仅仅想探讨艺术与人工智能的交汇，我的大门永远为您敞开。
          </p>
        </div>
        <div className="relative w-full md:w-1/3 aspect-square rounded-xl overflow-hidden shadow-2xl">
          <img 
            className="w-full h-full object-cover" 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBnvGVVy5VD3hDgqU3nB8u6xc-2NgCtoLRpdzuazJEbwKRz1mQqXct1qOCM4uqRj7EoYLi3f5970BygGMfMfU_EOYNk6d3mNw1u7xp2RdRGpFRpM0M5wXGHv4rawvalVrTDEUtrkG6L5gF1HqXqRCRSdIw8YlP6NeTYNz2mH2afd06pzBkyPafTd9gmMQtd2-V5NOs4kQB-KjPBa_e-4SEfEDyDNnU7vHVlQIVToSMRuIY8prRhXmVQ7tr3BG0qV2Fuw0Cc7jmW5KE" 
            alt="Office"
          />
          <div className="absolute inset-0 bg-primary/10 mix-blend-overlay"></div>
        </div>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mb-24">
        {/* Email */}
        <div className="col-span-12 md:col-span-4 airy-card rounded-xl p-10 flex flex-col justify-between min-h-[320px]">
          <div>
            <h3 className="text-2xl font-bold font-headline text-primary mb-2">电子邮件</h3>
            <p className="text-xs text-on-surface-variant">一般咨询和项目提案。</p>
          </div>
          <a className="text-xs font-bold font-headline text-primary underline decoration-primary/30 hover:decoration-primary transition-all" href="mailto:hello@alan-ai.com">hello@alan-ai.com</a>
        </div>

        {/* WeChat */}
        <div className="col-span-12 md:col-span-4 airy-card rounded-xl p-10 flex flex-col justify-between min-h-[320px]">
          <div>
            <h3 className="text-2xl font-bold font-headline text-primary mb-2">微信</h3>
            <p className="text-xs text-on-surface-variant">针对活跃合作伙伴的直接沟通。</p>
          </div>
          <p className="text-xs font-bold font-headline text-primary">alan_ai_curator</p>
        </div>

        {/* Location */}
        <div className="col-span-12 md:col-span-4 airy-card rounded-xl p-10 flex flex-col justify-between min-h-[320px]">
          <div>
            <h3 className="text-2xl font-bold font-headline text-primary mb-2">办公地点</h3>
            <p className="text-xs text-on-surface-variant">位于上海创意枢纽的数字化工作室。</p>
          </div>
          <p className="text-xs font-bold font-headline text-primary">中国，上海，西岸</p>
        </div>
      </div>

      <section className="border-t border-outline-variant/30 pt-20 flex flex-col items-center text-center">
        <h2 className="text-3xl font-bold text-primary mb-4 font-headline uppercase tracking-widest text-sm opacity-50">联系</h2>
      </section>
    </main>
  );
}
