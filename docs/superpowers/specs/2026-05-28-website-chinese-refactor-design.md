# Website Chinese Refactor — Design Spec

## Overview

全面重构个人网站：全站中文化、分类改为 Tech/Life/Food/Run、默认浅色主题、支持背景图片、增加生活化内容。

## 1. 身份与元数据 (SITE_CONFIG)

| 字段 | 当前值 | 新值 |
|------|--------|------|
| name | 翁新凯的个人空间~ | **峰峦是否天晴的个人空间~** |
| title | Life & Tech Blog | **技术 · 生活 · 美食 · 跑步** |
| description | (英文诗句) | **用代码构建世界，用脚步丈量大地。技术、生活、美食与跑步的记录。** |
| author.name | Xinkai Weng | **峰峦是否天晴** |
| author.email | 1300490465@qq.com | (不变) |
| author.github | github.com/windandwall | (不变) |
| author.linkedin | linkedin.com/in/kaiweng | (移除) |
| author.twitter | twitter.com/kaiweng | (移除) |
| nav | Blog, Projects, About, Contact | **首页(/), 文章(/blog), 分类(/categories), 关于(/about), 联系(/contact)** |
| backgroundImage | (新增) | 空字符串，用户填写本地图片路径 |

## 2. 分类与标签

### 分类 (Categories)

| 分类 | 含义 |
|------|------|
| **Tech** | 技术文章、硬件设计、编程 |
| **Life** | 生活随笔、读书、思考 |
| **Food** | 美食探店、烹饪、食材 |
| **Run** | 跑步记录、马拉松、运动 |

### 标签 (Tags)

- Tech: RISC-V, FPGA, NPU, 计算机架构, AI芯片, 处理器设计, Verilog, 信号处理
- Life: 生活随笔, 读书笔记, 日常思考, 摄影, 旅行
- Food: 美食探店, 烹饪记录, 咖啡, 食材探索
- Run: 跑步记录, 马拉松, 运动健康, 越野跑, 训练计划

## 3. 页面改动

### 3.1 首页 (app/page.tsx)

- Hero: 中文介绍"嗨，我是峰峦是否天晴"；描述为多维度个人介绍
- 可用状态标签从"Available for opportunities"改为中文
- 技能标签云 → 混合展示技术+生活兴趣标签
- "Read Blog" → "阅读文章", "View Projects" → "探索分类"
- 最新文章区域标题中文化
- "Get in touch" → "与我联系"
- 社交链接简化（移除 LinkedIn/Twitter，保留 GitHub + Email）

### 3.2 文章列表页 (app/blog/page.tsx)

- Blog → 文章
- 搜索、筛选区域中文化
- "Categories" → "分类", "Tags" → "标签"
- "Clear filters" → "清除筛选", "No posts found" → "暂无文章"

### 3.3 文章详情页 (app/blog/[slug]/page.tsx)

- "Back to blog" → "返回文章列表"
- "Previous" → "上一篇", "Next" → "下一篇"
- "min read" → "分钟阅读"

### 3.4 关于页 (app/about/page.tsx)

- 重构为立体化自我介绍
- 移除纯技术技能列表，改为技术+生活双板块
- 教育经历中文化
- 增加"关于我"生活化描述段落
- "Connect" → "找到我"

### 3.5 分类页 (新 app/categories/page.tsx)

- 替换原 Projects 页面
- 四个分类入口卡片（Tech/Life/Food/Run）
- 每张卡片：图标 + 描述 + 文章计数 + 链接到 /blog?category=xxx
- 卡片 hover 放大特效

### 3.6 联系页 (app/contact/page.tsx)

- 中文改写所有描述文字
- 移除 LinkedIn/Twitter 联系方式
- 增加更生活化的表达

### 3.7 404 页 (app/not-found.tsx)

- "The page you're looking for..." → "你访问的页面不存在或已被移动"
- "Back to home" → "返回首页"

## 4. 组件改动

### 4.1 Header (components/layout/header.tsx)

- Logo 文字: ~/kaiweng → ~/峰峦是否天晴
- 导航链接文本中文化

### 4.2 Footer (components/layout/footer.tsx)

- ~/kaiweng → ~/峰峦是否天晴
- 社交链接简化
- Footer 导航中文化

### 4.3 全局布局 (app/layout.tsx)

- `<html lang="en">` → `<html lang="zh-CN">`
- defaultTheme: "dark" → "light"
- 背景图片支持：读取 SITE_CONFIG.backgroundImage，应用到 body 背景
- metadata keywords 中文化
- locale: "en_US" → "zh_CN"

### 4.4 RSS/Feed (app/feed.xml/route.ts)

- `<language>en</language>` → `<language>zh-CN</language>`

### 4.5 Card 组件 (components/ui/card.tsx)

- 增加 hover:scale-[1.02] 放大特效，transition-transform

## 5. 视觉主题

### 5.1 浅色默认主题 (globals.css)

默认 light 主题使用柔和配色：

```css
:root {
  --background: 210 20% 98%;       /* 柔和淡蓝灰背景 */
  --foreground: 220 15% 20%;        /* 深灰文字 */
  --muted: 210 15% 94%;             /* 淡灰 */
  --muted-foreground: 220 10% 50%;
  --card: 0 0% 100%;                /* 白色卡片 */
  --card-foreground: 220 15% 20%;
  --border: 210 15% 88%;            /* 淡灰边框 */
  --primary: 220 15% 20%;
  --primary-foreground: 0 0% 98%;
  --accent: 210 20% 95%;            /* 柔和淡蓝 accent */
  --accent-foreground: 220 15% 20%;
  --ring: 220 15% 20%;
}
```

暗色模式保持现有 Tokyo Night 风格。

### 5.2 背景图片支持

- `lib/constants.ts` 新增 `SITE_CONFIG.backgroundImage: string`（默认空字符串）
- 值示例: `/images/background.jpg` 或 `https://example.com/bg.jpg`
- app/layout.tsx 读取该值，非空时设置 body 背景图
- 背景图带半透明遮罩保证文字可读性

### 5.3 卡片 hover 放大特效

所有 Card 组件统一添加：
```css
transition-all duration-300 ease-out
hover:scale-[1.02] hover:shadow-md
```

## 6. 内容文件

### 现有文章处理

| 文件 | 分类 | 标签（中文化） |
|------|------|----------------|
| riscv-o3-core-design.mdx | Tech | RISC-V, 计算机架构, 处理器设计, Verilog |
| cache-coherence-primer.mdx | Tech | 计算机架构, Verilog, 缓存一致性 |
| npu-systolic-array-design.mdx | Tech | NPU, AI芯片, 计算机架构, 脉动阵列 |
| fpga-radar-signal-processing.mdx | Tech | FPGA, 信号处理, Verilog, 雷达 |

- Frontmatter 的 title 和 description 翻译为中文
- 正文技术内容保持英文
- 新增 Life/Food/Run 各一篇示例文章

## 7. formatDate 函数

`lib/utils.ts` 中的 `formatDate`:
- 从 `en-US` locale 改为 `zh-CN`
- 输出格式: "2026年5月28日"

## 8. 更新文件清单

| 文件 | 操作 |
|------|------|
| lib/constants.ts | 重写全部内容 |
| lib/utils.ts | formatDate locale 改为 zh-CN |
| app/layout.tsx | lang, defaultTheme, 背景图, metadata |
| app/page.tsx | 全中文化 + 兴趣标签 |
| app/blog/page.tsx | 中文化 |
| app/blog/blog-list-client.tsx | 中文化 |
| app/blog/[slug]/page.tsx | 中文化 |
| app/about/page.tsx | 重构为生活化介绍 |
| app/projects/page.tsx → app/categories/page.tsx | 改为分类入口页 |
| app/contact/page.tsx | 中文化 + 简化 |
| app/not-found.tsx | 中文化 |
| app/sitemap.ts | 更新路由 |
| app/feed.xml/route.ts | lang 改为 zh-CN |
| components/layout/header.tsx | Logo 中文化 |
| components/layout/footer.tsx | 中文化 |
| components/ui/card.tsx | 添加 hover 放大特效 |
| app/globals.css | 浅色主题配色 |
| content/blog/*.mdx | frontmatter 中文化 |
| content/blog/ (新增) | Life/Food/Run 各一篇示例文章 |

## 9. 部署

- git commit + push 到 GitHub main 分支
- Vercel 自动部署（关联 GitHub 仓库）
