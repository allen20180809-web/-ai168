import { Article, Activity, Comment } from './types';

export const FEATURED_ARTICLES: Article[] = [
  {
    id: '1',
    title: '寂静的建筑',
    summary: '探索21世纪现代结构设计与数字宁静的交汇点。',
    category: '新发布',
    date: '2024-10-24',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD9j4elIxyePeWRxlydr_ShEi_pozSkwF7UV1RLCp3wv_pb0nG0CXxTktrpCdF9MaxzQsieMW8spUUp226CUifrmxwr2waz9cV4Fb09Oo869dL8bdkC-FWPuhrr52NVRBZGqLsEv0LDEfjuDS8nKlZZqabWubYXF9HFvr3OiSLwhujHpIbVAt63fhdEwzYDSeD4ThNdQBENquRkbnpuQlX-oqUT4uW-XdVRNEB8AG6gfI4I-KnxnsEoMPS_VA7U-FmIC7OcM9ovd1o',
    isNew: true
  },
  {
    id: '2',
    title: '作为现代艺术的神经网络',
    summary: '潜空间中的美学探索。',
    category: '研究',
    date: '2024-10-20',
  },
  {
    id: '3',
    title: '2024 技术栈报告',
    summary: '定义创意产业工具的年度回顾。',
    category: '报告',
    date: '2024-10-15',
  }
];

export const RECENT_ACTIVITIES: Activity[] = [
  {
    id: '1',
    type: 'publish',
    title: '已发布 "API设计的极简主义"',
    time: '2小时前',
    tag: '哲学'
  },
  {
    id: '2',
    type: 'update',
    title: '更新了开源框架 "Lumina"',
    time: '5小时前',
    tag: '工程'
  },
  {
    id: '3',
    type: 'gallery',
    title: '新图集：东京建筑 2024',
    time: '昨天',
    tag: '摄影'
  }
];

export const INITIAL_COMMENTS: Comment[] = [
  {
    id: 'c1',
    author: 'Marcus Thorne',
    time: '2 小时前',
    content: '向高清晰度界面的转变感觉是对 2010 年代后期视觉混乱的直接回应。我们是在看到 UI 领域向建筑极简主义的永久转变，还是这只是另一个循环？',
    likes: 24,
    replies: [
      {
        id: 'c1-r1',
        author: '艾伦Ai',
        time: '1 小时前',
        content: '观察得很好，Marcus。我认为这是一种结构性的演变。随着 AI 处理越来越多的“杂音”生成，人类的角色转向“策展”。高清晰度 UI 是这种策展角色的物理体现——它关乎意图性。',
        likes: 12,
        isAuthor: true
      }
    ]
  },
  {
    id: 'c2',
    author: 'Elena Rodriguez',
    time: '5 小时前',
    content: '使用森林绿作为主要动作色令人耳目一新。与我们在科技领域看到的电蓝色相比，它感觉更稳重。这让我想起了引入软件的亲生物设计原则。',
    likes: 8
  }
];
