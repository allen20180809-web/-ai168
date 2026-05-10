import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import articlesRouter from './routes/articles';
import activitiesRouter from './routes/activities';
import commentsRouter from './routes/comments';
import adminRouter from './routes/admin';

// 加载环境变量
dotenv.config({ path: '.env.local' });

const app = express();
const PORT = process.env.SERVER_PORT || 3001;

// 中间件
app.use(cors({
  origin: process.env.APP_URL || 'http://localhost:3000',
  credentials: true,
}));
app.use(express.json());

// API 路由
app.use('/api/articles', articlesRouter);
app.use('/api/activities', activitiesRouter);
app.use('/api/comments', commentsRouter);
app.use('/api/admin', adminRouter);

// 健康检查
app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// 启动服务器
app.listen(PORT, () => {
  console.log(`\n🚀 艾伦Ai 后端服务已启动`);
  console.log(`   地址: http://localhost:${PORT}`);
  console.log(`   API:  http://localhost:${PORT}/api\n`);
});

export default app;
