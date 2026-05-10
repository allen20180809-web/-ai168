-- ============================================
-- 艾伦Ai 博客平台 - Supabase 数据库 Schema
-- ============================================

-- 启用 UUID 扩展
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================
-- 1. 文章表 (articles)
-- ============================================
CREATE TABLE IF NOT EXISTS articles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  summary TEXT,
  content TEXT,                -- 文章正文 (Markdown)
  category TEXT,
  image TEXT,                  -- 封面图 URL
  is_featured BOOLEAN DEFAULT false,
  is_new BOOLEAN DEFAULT false,
  tags TEXT[] DEFAULT '{}',
  published BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- 文章表索引
CREATE INDEX IF NOT EXISTS idx_articles_published ON articles(published);
CREATE INDEX IF NOT EXISTS idx_articles_is_featured ON articles(is_featured);
CREATE INDEX IF NOT EXISTS idx_articles_created_at ON articles(created_at DESC);

-- ============================================
-- 2. 动态/活动表 (activities)
-- ============================================
CREATE TABLE IF NOT EXISTS activities (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  type TEXT NOT NULL CHECK (type IN ('publish', 'update', 'gallery')),
  title TEXT NOT NULL,
  tag TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_activities_created_at ON activities(created_at DESC);

-- ============================================
-- 3. 留言/评论表 (comments)
-- ============================================
CREATE TABLE IF NOT EXISTS comments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  author TEXT NOT NULL,
  avatar TEXT,
  content TEXT NOT NULL,
  likes INTEGER DEFAULT 0,
  is_author BOOLEAN DEFAULT false,
  parent_id UUID REFERENCES comments(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_comments_parent_id ON comments(parent_id);
CREATE INDEX IF NOT EXISTS idx_comments_created_at ON comments(created_at DESC);

-- ============================================
-- 4. 站点配置表 (site_config)
-- ============================================
CREATE TABLE IF NOT EXISTS site_config (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  key TEXT UNIQUE NOT NULL,
  value JSONB NOT NULL DEFAULT '{}',
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- ============================================
-- RLS 策略 (Row Level Security)
-- ============================================

-- 文章表：公开读取已发布文章，管理员可完全操作
ALTER TABLE articles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "公开读取已发布文章" ON articles
  FOR SELECT USING (published = true);

CREATE POLICY "Service role 完全访问文章" ON articles
  USING (auth.role() = 'service_role');

-- 动态表：公开读取
ALTER TABLE activities ENABLE ROW LEVEL SECURITY;

CREATE POLICY "公开读取动态" ON activities
  FOR SELECT USING (true);

CREATE POLICY "Service role 完全访问动态" ON activities
  USING (auth.role() = 'service_role');

-- 留言表：公开读取，允许插入
ALTER TABLE comments ENABLE ROW LEVEL SECURITY;

CREATE POLICY "公开读取留言" ON comments
  FOR SELECT USING (true);

CREATE POLICY "允许插入留言" ON comments
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Service role 完全访问留言" ON comments
  USING (auth.role() = 'service_role');

-- 站点配置：公开读取
ALTER TABLE site_config ENABLE ROW LEVEL SECURITY;

CREATE POLICY "公开读取站点配置" ON site_config
  FOR SELECT USING (true);

CREATE POLICY "Service role 完全访问站点配置" ON site_config
  USING (auth.role() = 'service_role');

-- ============================================
-- 自动更新 updated_at 触发器
-- ============================================
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER articles_updated_at
  BEFORE UPDATE ON articles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER site_config_updated_at
  BEFORE UPDATE ON site_config
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();
