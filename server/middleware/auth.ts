import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'ai168-default-secret-change-me';

export interface AuthRequest extends Request {
  isAdmin?: boolean;
}

/**
 * 生成管理员 JWT token
 */
export function generateToken(): string {
  return jwt.sign({ role: 'admin' }, JWT_SECRET, { expiresIn: '7d' });
}

/**
 * 验证管理员密码并返回 token
 */
export function verifyAdminPassword(password: string): string | null {
  const adminPassword = process.env.ADMIN_PASSWORD || 'admin168';
  if (password === adminPassword) {
    return generateToken();
  }
  return null;
}

/**
 * 管理员认证中间件
 * 检查请求头中的 Bearer token
 */
export function requireAdmin(req: AuthRequest, res: Response, next: NextFunction): void {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    res.status(401).json({ error: '未授权：缺少认证令牌' });
    return;
  }

  const token = authHeader.substring(7);

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { role: string };
    if (decoded.role !== 'admin') {
      res.status(403).json({ error: '权限不足' });
      return;
    }
    req.isAdmin = true;
    next();
  } catch {
    res.status(401).json({ error: '无效或过期的认证令牌' });
    return;
  }
}
