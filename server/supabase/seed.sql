-- ============================================
-- 艾伦Ai 博客平台 - 种子数据
-- 从 constants.ts 迁移
-- ============================================

-- 文章数据
INSERT INTO articles (id, title, summary, content, category, image, is_featured, is_new, tags, published, created_at) VALUES
(
  'a0000001-0001-0001-0001-000000000001',
  '寂静的建筑',
  '探索21世纪现代结构设计与数字宁静的交汇点。',
  E'## 寂静的建筑\n\n在过去的十年中，我们的数字化环境变得越来越复杂。作为一名数字策展人，我发现传统的静态存档方式已经无法满足快速迭代的技术需求。\n\n### 工程思维的颗粒度\n\n工程思维的核心在于解构。当我们审视一个策展空间时，不再仅仅看它的视觉呈现，而是看它背后的数据流动。每一个交互节点、每一条网格线，都是经过精密计算的结果。\n\n与此同时，极简主义并非简单的"少"，而是对"多"的克制与重构。在大面积的留白中，每一个细节都被赋予了更沉重的权力和更清晰的意义。',
  '新发布',
  'https://lh3.googleusercontent.com/aida-public/AB6AXuD9j4elIxyePeWRxlydr_ShEi_pozSkwF7UV1RLCp3wv_pb0nG0CXxTktrpCdF9MaxzQsieMW8spUUp226CUifrmxwr2waz9cV4Fb09Oo869dL8bdkC-FWPuhrr52NVRBZGqLsEv0LDEfjuDS8nKlZZqabWubYXF9HFvr3OiSLwhujHpIbVAt63fhdEwzYDSeD4ThNdQBENquRkbnpuQlX-oqUT4uW-XdVRNEB8AG6gfI4I-KnxnsEoMPS_VA7U-FmIC7OcM9ovd1o',
  true,
  true,
  ARRAY['建筑设计', '极简主义'],
  true,
  '2024-10-24T00:00:00Z'
),
(
  'a0000001-0001-0001-0001-000000000002',
  '作为现代艺术的神经网络',
  '潜空间中的美学探索。',
  E'## 作为现代艺术的神经网络\n\n当我们谈论神经网络时，通常会想到冰冷的数学公式和复杂的算法。但如果我们换一个角度，将这些数字化的结构视为一种新的艺术形式呢？\n\n### 潜空间中的美学\n\n在深度学习模型的潜空间中，存在着一种独特的美学。每一个维度都代表着某种抽象的特征，而这些特征的组合方式构成了一种全新的视觉语言。',
  '研究',
  NULL,
  false,
  false,
  ARRAY['人工智能', '艺术'],
  true,
  '2024-10-20T00:00:00Z'
),
(
  'a0000001-0001-0001-0001-000000000003',
  '2024 技术栈报告',
  '定义创意产业工具的年度回顾。',
  E'## 2024 技术栈报告\n\n每一年，技术生态系统都在快速演变。本报告回顾了过去一年中定义创意产业的关键工具和趋势。\n\n### 前端框架\n\nReact 仍然保持着其在前端开发中的主导地位，但 Vue.js 和 Svelte 也在持续增长。\n\n### AI 工具\n\n生成式 AI 工具的爆发式增长改变了设计和开发工作流程。',
  '报告',
  NULL,
  false,
  false,
  ARRAY['技术', '报告'],
  true,
  '2024-10-15T00:00:00Z'
);

-- 动态数据
INSERT INTO activities (id, type, title, tag, created_at) VALUES
(
  'b0000001-0001-0001-0001-000000000001',
  'publish',
  '已发布 "API设计的极简主义"',
  '哲学',
  now() - interval '2 hours'
),
(
  'b0000001-0001-0001-0001-000000000002',
  'update',
  '更新了开源框架 "Lumina"',
  '工程',
  now() - interval '5 hours'
),
(
  'b0000001-0001-0001-0001-000000000003',
  'gallery',
  '新图集：东京建筑 2024',
  '摄影',
  now() - interval '1 day'
);

-- 留言数据
INSERT INTO comments (id, author, content, likes, is_author, parent_id, created_at) VALUES
(
  'c0000001-0001-0001-0001-000000000001',
  'Marcus Thorne',
  '向高清晰度界面的转变感觉是对 2010 年代后期视觉混乱的直接回应。我们是在看到 UI 领域向建筑极简主义的永久转变，还是这只是另一个循环？',
  24,
  false,
  NULL,
  now() - interval '2 hours'
),
(
  'c0000001-0001-0001-0001-000000000002',
  '艾伦Ai',
  '观察得很好，Marcus。我认为这是一种结构性的演变。随着 AI 处理越来越多的"杂音"生成，人类的角色转向"策展"。高清晰度 UI 是这种策展角色的物理体现——它关乎意图性。',
  12,
  true,
  'c0000001-0001-0001-0001-000000000001',
  now() - interval '1 hour'
),
(
  'c0000001-0001-0001-0001-000000000003',
  'Elena Rodriguez',
  '使用森林绿作为主要动作色令人耳目一新。与我们在科技领域看到的电蓝色相比，它感觉更稳重。这让我想起了引入软件的亲生物设计原则。',
  8,
  false,
  NULL,
  now() - interval '5 hours'
);

-- 站点配置数据
INSERT INTO site_config (key, value) VALUES
(
  'contact',
  '{"email": "hello@alan-ai.com", "wechat": "alan_ai_curator", "location": "中国，上海，西岸"}'
),
(
  'about',
  '{"title": "在智慧与优雅的交汇处进行创作。", "description": "我是一位多领域的创作者，致力于弥合先进人工智能与以人为本的设计之间的鸿沟。我的工作围绕着创造那些与其说是软件，不如说更像合作伙伴的工具而展开。", "quote": "真正的创新不仅在于机器能做什么，更在于我们如何设计人类意图与数字执行之间的留白。"}'
),
(
  'profile',
  '{"name": "艾伦Ai", "role": "数字策展人 & 技术主管", "avatar": "https://lh3.googleusercontent.com/aida-public/AB6AXuBlSiFBRPYU1g5tBJYmasLeVPluTktbQRD4CsXdnaOs3xdUxWlBIlYKXB1xNO7HNmzIT0E_0bUCir5kvqCrTzA_EKk35arWZyEO0m5Wq6nSFyXyjuc0k5-Y6OJSfulgIBS5ExJruM0_EkMFdM0kfkayrsPb1U9S8Y-Z0fc_vemEodIyOAeq2BypqykSAXSjAaoBfrANUWXUDfMOZO2OnARsht-KRWio-0ED7CRhief0l7h5VT2S1d3J3EKURKksRbKNBwtResI7icE"}'
);
