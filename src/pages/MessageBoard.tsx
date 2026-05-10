import React from 'react';
import { INITIAL_COMMENTS } from '../constants';
import { Send, User as UserIcon, Heart, MessageSquare, ShieldCheck, MoreHorizontal } from 'lucide-react';
import { motion } from 'motion/react';

export default function MessageBoard() {
  return (
    <main className="max-w-7xl mx-auto px-6 md:px-16 py-12 md:py-20">
      <section className="mb-20">
        <h1 className="text-6xl font-bold text-primary mb-4 font-headline">留言板</h1>
        <p className="text-base text-on-surface-variant max-w-2xl">
          加入对话。在充满技术杂音的环境中，分享您对数字策展、人工智能伦理以及创意精确性未来的看法。
        </p>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Form */}
        <aside className="lg:col-span-4 sticky top-28">
          <div className="bg-surface-container-lowest rounded-xl p-8 border border-outline-variant/10 shadow-ambient">
            <h2 className="text-3xl font-bold text-primary mb-8 font-headline">发布留言</h2>
            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant font-headline" htmlFor="name">姓名</label>
                <input 
                  className="w-full bg-surface border border-outline-variant/50 rounded-lg px-4 py-3 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all text-sm" 
                  id="name" 
                  placeholder="例如：Julian V." 
                  type="text"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant font-headline" htmlFor="message">内容</label>
                <textarea 
                  className="w-full bg-surface border border-outline-variant/50 rounded-lg px-4 py-3 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all text-sm resize-none" 
                  id="message" 
                  placeholder="有什么想说的？" 
                  rows={5}
                ></textarea>
              </div>
              <button 
                className="w-full bg-primary text-white py-4 rounded-lg text-xs font-bold tracking-wider uppercase hover:opacity-90 transition-all flex items-center justify-center gap-2 cursor-pointer" 
                type="submit"
              >
                <span>发布留言</span>
                <Send size={16} />
              </button>
            </form>
            <div className="mt-8 pt-8 border-t border-outline-variant/20">
              <div className="flex items-center gap-4 text-on-surface-variant/60">
                <ShieldCheck size={20} />
                <p className="text-[10px] leading-relaxed">为了社区安全，您的 IP 地址已被记录。请保持文明交流。</p>
              </div>
            </div>
          </div>
        </aside>

        {/* Threaded List */}
        <div className="lg:col-span-8 space-y-12">
          {INITIAL_COMMENTS.map((comment) => (
            <div key={comment.id} className="space-y-6">
              <div className="bg-surface-container-lowest p-8 rounded-xl border border-outline-variant/10 shadow-ambient">
                <div className="flex justify-between items-start mb-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-secondary-container flex items-center justify-center text-on-secondary-container">
                      <UserIcon size={24} />
                    </div>
                    <div>
                      <h4 className="text-xl font-bold font-headline text-primary">{comment.author}</h4>
                      <span className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant/50">{comment.time}</span>
                    </div>
                  </div>
                  <button className="text-on-surface-variant/40 hover:text-primary transition-colors">
                    <MoreHorizontal size={20} />
                  </button>
                </div>
                <p className="text-sm text-on-surface-variant leading-relaxed mb-6">{comment.content}</p>
                <div className="flex items-center gap-6">
                  <button className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-on-surface-variant hover:text-primary transition-colors">
                    <Heart size={16} />
                    <span>{comment.likes}</span>
                  </button>
                  <button className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-on-surface-variant hover:text-primary transition-colors">
                    <MessageSquare size={16} />
                    <span>回复</span>
                  </button>
                </div>
              </div>

              {comment.replies && comment.replies.map((reply) => (
                <div key={reply.id} className="ml-12 border-l-2 border-primary/20 pl-8 space-y-6">
                  <div className="bg-primary/5 p-8 rounded-xl border border-primary/10 shadow-ambient">
                    <div className="flex justify-between items-start mb-6">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full border-2 border-primary overflow-hidden">
                          <img 
                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBWSfaXoAZHa2aj2FXmF5cO8cfsI9Mq0jE7y_iant_DqiI3F9TETqQ_U9HoSirH7xEbrgko8utaN3WiACiIO68RHbaPuepO0TM31Jd49HRjfUERUDNQGXdkT1jSORamcYQHF8OrBCcJriyHLrRzD8vHRa_WmJNaRFrynTQ4piOtACG5P_fga2DKwAGChavAX_3NdIm6h0Fe9TjIVtHt6tVtmx-nz_9dWL8PQ5sqrAzd2kPlIUB0gMLIyhMyC5oY-XLpLdd3OjmwUUQ" 
                            alt={reply.author}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <h4 className="text-xl font-bold font-headline text-primary">{reply.author}</h4>
                            <span className="bg-primary-container text-white text-[8px] px-2 py-0.5 rounded-full font-bold uppercase tracking-[0.2em] font-headline">作者</span>
                          </div>
                          <span className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant/50">{reply.time}</span>
                        </div>
                      </div>
                    </div>
                    <p className="text-sm text-on-surface-variant leading-relaxed mb-6">{reply.content}</p>
                    <div className="flex items-center gap-6">
                      <button className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-primary">
                        <Heart size={16} fill="currentColor" />
                        <span>{reply.likes}</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ))}

          <div className="flex justify-center pt-8">
            <button className="px-8 py-3 border border-outline-variant text-on-surface-variant rounded-full text-[10px] font-bold uppercase tracking-widest hover:bg-surface-container transition-all cursor-pointer">
              加载历史留言
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
