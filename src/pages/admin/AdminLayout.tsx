import React, { useState, useEffect } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  FileText,
  MessageSquare,
  Activity,
  Settings,
  LogOut,
  ChevronLeft,
  Menu,
} from 'lucide-react';
import { adminApi } from '../../lib/api';
import AdminLogin from './AdminLogin';

const NAV_ITEMS = [
  { path: '/admin', icon: LayoutDashboard, label: '仪表盘', end: true },
  { path: '/admin/articles', icon: FileText, label: '文章管理' },
  { path: '/admin/comments', icon: MessageSquare, label: '留言管理' },
  { path: '/admin/activities', icon: Activity, label: '动态管理' },
  { path: '/admin/settings', icon: Settings, label: '站点设置' },
];

export default function AdminLayout() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [checking, setChecking] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    if (!adminApi.isLoggedIn()) {
      setChecking(false);
      return;
    }
    try {
      await adminApi.verify();
      setIsAuthenticated(true);
    } catch {
      adminApi.logout();
    }
    setChecking(false);
  };

  const handleLogout = () => {
    adminApi.logout();
    setIsAuthenticated(false);
  };

  if (checking) {
    return (
      <div className="min-h-screen bg-surface flex items-center justify-center">
        <div className="text-sm text-on-surface-variant animate-pulse font-headline">加载中...</div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <AdminLogin onLogin={() => setIsAuthenticated(true)} />;
  }

  return (
    <div className="min-h-screen bg-surface flex">
      {/* Sidebar */}
      <aside
        className={`${
          sidebarOpen ? 'w-64' : 'w-20'
        } bg-surface-container-lowest border-r border-outline-variant/10 flex flex-col transition-all duration-300 fixed h-full z-30`}
      >
        {/* Header */}
        <div className="px-6 py-6 border-b border-outline-variant/10 flex items-center justify-between">
          {sidebarOpen && (
            <h1 className="text-lg font-bold text-primary font-headline whitespace-nowrap">
              艾伦Ai CMS
            </h1>
          )}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 hover:bg-surface-container rounded-lg transition-colors text-on-surface-variant"
          >
            {sidebarOpen ? <ChevronLeft size={18} /> : <Menu size={18} />}
          </button>
        </div>

        {/* Nav */}
        <nav className="flex-1 py-4 px-3 space-y-1">
          {NAV_ITEMS.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.end}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                  isActive
                    ? 'bg-primary text-white shadow-lg shadow-primary/20'
                    : 'text-on-surface-variant hover:bg-surface-container hover:text-primary'
                }`
              }
            >
              <item.icon size={20} />
              {sidebarOpen && <span className="font-headline">{item.label}</span>}
            </NavLink>
          ))}
        </nav>

        {/* Footer */}
        <div className="p-3 border-t border-outline-variant/10">
          <button
            onClick={() => navigate('/')}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm text-on-surface-variant hover:bg-surface-container transition-all mb-1"
          >
            <ChevronLeft size={20} />
            {sidebarOpen && <span className="font-headline">返回前台</span>}
          </button>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm text-error hover:bg-error-container transition-all"
          >
            <LogOut size={20} />
            {sidebarOpen && <span className="font-headline">退出登录</span>}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className={`flex-1 ${sidebarOpen ? 'ml-64' : 'ml-20'} transition-all duration-300`}>
        <div className="p-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
