import React, { useState } from 'react';
import { adminApi } from '../../lib/api';
import { Lock, Eye, EyeOff, ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';

interface AdminLoginProps {
  onLogin: () => void;
}

export default function AdminLogin({ onLogin }: AdminLoginProps) {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const result = await adminApi.login(password);
      adminApi.setToken(result.token);
      onLogin();
    } catch (err: any) {
      setError(err.message || '登录失败');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-surface flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        {/* Logo Area */}
        <div className="text-center mb-12">
          <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-primary flex items-center justify-center shadow-lg shadow-primary/20">
            <Lock className="text-white" size={32} />
          </div>
          <h1 className="text-3xl font-bold text-primary font-headline">管理后台</h1>
          <p className="text-sm text-on-surface-variant mt-2">艾伦Ai · 内容管理系统</p>
        </div>

        {/* Login Form */}
        <div className="bg-surface-container-lowest rounded-2xl p-8 border border-outline-variant/10 shadow-lg">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label
                className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant font-headline"
                htmlFor="admin-password"
              >
                管理密码
              </label>
              <div className="relative">
                <input
                  id="admin-password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="输入管理密码"
                  className="w-full bg-surface border border-outline-variant/50 rounded-xl px-4 py-4 pr-12 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all text-sm"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-on-surface-variant/50 hover:text-primary transition-colors"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-error-container text-on-error-container text-xs p-3 rounded-lg font-medium"
              >
                {error}
              </motion.div>
            )}

            <button
              type="submit"
              disabled={loading || !password}
              className="w-full bg-primary text-white py-4 rounded-xl text-xs font-bold tracking-wider uppercase hover:opacity-90 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <span className="animate-pulse">验证中...</span>
              ) : (
                <>
                  <span>进入管理后台</span>
                  <ArrowRight size={16} />
                </>
              )}
            </button>
          </form>
        </div>

        {/* Footer */}
        <p className="text-center text-[10px] text-on-surface-variant/40 mt-8 uppercase tracking-widest font-headline">
          仅限授权管理员访问
        </p>
      </motion.div>
    </div>
  );
}
