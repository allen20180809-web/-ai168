import React from 'react';
import { motion } from 'motion/react';

export default function Sidebar() {
  const tags = ['人工智能', '极简主义', 'Web3', '建筑设计'];

  return (
    <aside className="hidden lg:flex flex-col w-64 space-y-8 sticky top-32 h-fit">
      <div className="bg-surface-container-lowest p-8 rounded-xl ambient-shadow border border-outline-variant/10">
        <div className="flex flex-col items-center text-center space-y-4">
          <div className="w-24 h-24 rounded-full overflow-hidden bg-primary-container p-1 shadow-lg shadow-primary/10">
            <img 
              alt="艾伦Ai Avatar" 
              className="rounded-full bg-white object-cover w-full h-full" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBlSiFBRPYU1g5tBJYmasLeVPluTktbQRD4CsXdnaOs3xdUxWlBIlYKXB1xNO7HNmzIT0E_0bUCir5kvqCrTzA_EKk35arWZyEO0m5Wq6nSFyXyjuc0k5-Y6OJSfulgIBS5ExJruM0_EkMFdM0kfkayrsPb1U9S8Y-Z0fc_vemEodIyOAeq2BypqykSAXSjAaoBfrANUWXUDfMOZO2OnARsht-KRWio-0ED7CRhief0l7h5VT2S1d3J3EKURKksRbKNBwtResI7icE" 
            />
          </div>
          <div>
            <h2 className="text-xl font-bold text-primary font-headline">艾伦Ai</h2>
            <p className="text-xs text-on-surface-variant">数字策展人 & 技术主管</p>
          </div>
          <button className="w-full py-3 px-6 bg-primary text-white rounded-full text-xs font-bold font-headline hover:bg-primary-container transition-all active:scale-95 shadow-lg shadow-primary/20 cursor-pointer">
            订阅
          </button>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-xs font-bold uppercase tracking-widest text-on-surface-variant px-4 font-headline">领域标签</h3>
        <div className="flex flex-wrap gap-2 px-2">
          {tags.map(tag => (
            <span 
              key={tag} 
              className="px-4 py-2 bg-secondary-container text-on-secondary-container rounded-full text-xs font-bold font-headline"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </aside>
  );
}
