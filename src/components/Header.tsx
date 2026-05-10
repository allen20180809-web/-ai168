import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { Bell, Settings, User } from 'lucide-react';

export default function Header() {
  return (
    <header className="bg-surface/80 backdrop-blur-md border-b border-outline-variant/30 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 md:px-16 py-4 flex justify-between items-center">
        <div className="flex items-center gap-8">
          <Link to="/" className="text-2xl font-bold text-primary tracking-tight font-headline">
            艾伦Ai
          </Link>
          <nav className="hidden md:flex items-center gap-8">
            <NavLink 
              to="/" 
              className={({ isActive }) => 
                `text-sm font-semibold font-headline transition-colors ${isActive ? 'text-primary' : 'text-on-surface-variant/70 hover:text-primary'}`
              }
            >
              最新文章
            </NavLink>
            <NavLink 
              to="/messages" 
              className={({ isActive }) => 
                `text-sm font-semibold font-headline transition-colors ${isActive ? 'text-primary' : 'text-on-surface-variant/70 hover:text-primary'}`
              }
            >
              留言板
            </NavLink>
            <NavLink 
              to="/contact" 
              className={({ isActive }) => 
                `text-sm font-semibold font-headline transition-colors ${isActive ? 'text-primary' : 'text-on-surface-variant/70 hover:text-primary'}`
              }
            >
              联系我
            </NavLink>
          </nav>
        </div>

        <div className="flex items-center gap-4">
          <button className="p-2 hover:bg-surface-container rounded-full transition-colors text-on-surface-variant">
            <Bell size={20} />
          </button>
          <button className="p-2 hover:bg-surface-container rounded-full transition-colors text-on-surface-variant">
            <Settings size={20} />
          </button>
          <Link to="/about" className="w-10 h-10 rounded-full overflow-hidden border border-outline-variant/50">
            <img 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBWSfaXoAZHa2aj2FXmF5cO8cfsI9Mq0jE7y_iant_DqiI3F9TETqQ_U9HoSirH7xEbrgko8utaN3WiACiIO68RHbaPuepO0TM31Jd49HRjfUERUDNQGXdkT1jSORamcYQHF8OrBCcJriyHLrRzD8vHRa_WmJNaRFrynTQ4piOtACG5P_fga2DKwAGChavAX_3NdIm6h0Fe9TjIVtHt6tVtmx-nz_9dWL8PQ5sqrAzd2kPlIUB0gMLIyhMyC5oY-XLpLdd3OjmwUUQ" 
              alt="Avatar"
              className="w-full h-full object-cover"
            />
          </Link>
        </div>
      </div>
    </header>
  );
}
