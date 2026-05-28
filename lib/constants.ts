export const SITE_CONFIG = {
  name: '峰峦是否天晴的个人空间~',
  title: '技术 · 生活 · 美食 · 跑步',
  description:
    '一直游到海水变蓝',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://windandfall.me',
  ogImage: '/images/og-image.png',
  backgroundImage: '', // 设置背景图片路径，如 '/images/background.jpg'
  author: {
    name: '峰峦是否天晴',
    email: '1300490465@qq.com',
    github: 'https://github.com/windandwall',
  },
  nav: [
    { label: '首页', href: '/' },
    { label: '文章', href: '/blog' },
    { label: '分类', href: '/categories' },
    { label: '关于', href: '/about' },
    { label: '联系', href: '/contact' },
  ],
};

export const INTEREST_TAGS = [
  'RISC-V', 'FPGA', '计算机架构', 'AI芯片',
  '跑步', '马拉松', '咖啡', '美食探店',
  '摄影', '读书笔记', '生活随笔', '烹饪记录',
];

export const SKILLS = [
  {
    category: '技术能力',
    items: ['RTL设计', 'Verilog', 'SystemVerilog', 'FPGA', '计算机架构', 'NPU架构', 'Python', 'C++'],
  },
  {
    category: '生活兴趣',
    items: ['跑步', '马拉松', '美食探店', '咖啡品鉴', '摄影', '阅读', '烹饪', '徒步'],
  },
];

export const CATEGORIES = [
  {
    slug: 'Tech',
    label: 'Tech',
    description: '技术文章、硬件设计、编程笔记',
    icon: 'Cpu',
  },
  {
    slug: 'Life',
    label: 'Life',
    description: '生活随笔、读书思考、日常记录',
    icon: 'BookOpen',
  },
  {
    slug: 'Food',
    label: 'Food',
    description: '美食探店、烹饪记录、食材探索',
    icon: 'UtensilsCrossed',
  },
  {
    slug: 'Run',
    label: 'Run',
    description: '跑步记录、马拉松、运动健康',
    icon: 'Footprints',
  },
];
