import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-surface w-full py-12 mt-20 border-t border-outline-variant/20">
      <div className="max-w-7xl mx-auto px-6 md:px-16 flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="flex flex-col items-center md:items-start gap-2">
          <span className="text-sm font-bold uppercase tracking-widest text-primary font-headline">艾伦Ai</span>
          <p className="text-xs text-on-surface-variant/60">© 2024 艾伦Ai. 数字策展人。</p>
        </div>
        
        <nav className="flex gap-8">
          <Link to="/" className="text-xs font-semibold font-headline text-on-surface-variant/60 hover:text-primary transition-colors">最新文章</Link>
          <Link to="/messages" className="text-xs font-semibold font-headline text-on-surface-variant/60 hover:text-primary transition-colors">留言板</Link>
          <Link to="/contact" className="text-xs font-semibold font-headline text-on-surface-variant/60 hover:text-primary transition-colors">联系我</Link>
        </nav>
        
        <div className="text-xs text-on-surface-variant/60">
          Digital Architecture & Curation
        </div>
      </div>
    </footer>
  );
}
