# Website Chinese Refactor — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Full Chinese localization of the website, new category system (Tech/Life/Food/Run), beige light theme, background image support, card hover effects, and lifestyle content additions.

**Architecture:** Bottom-up refactor — foundation (constants, utils, theme) first, then layout components, then pages, then content files. Each task produces a working, buildable state.

**Tech Stack:** Next.js 14 App Router, Tailwind CSS, TypeScript, MDX

---

### Task 1: Rewrite site constants (lib/constants.ts)

**Files:**
- Modify: `lib/constants.ts`

- [ ] **Step 1: Replace entire constants.ts with Chinese content**

Write the file with this content:

```typescript
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
```

- [ ] **Step 2: Verify the build compiles**

Run: `npm run build`
Expected: Build succeeds (pages referencing old fields will break — that's expected for now)

- [ ] **Step 3: Commit**

```bash
git add lib/constants.ts
git commit -m "refactor: rewrite constants for Chinese localization and new categories"
```

---

### Task 2: Update formatDate utility (lib/utils.ts)

**Files:**
- Modify: `lib/utils.ts`

- [ ] **Step 1: Change formatDate locale from en-US to zh-CN**

Find the `formatDate` function and change:

```typescript
export function formatDate(date: string): string {
  return new Date(date).toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}
```

- [ ] **Step 2: Commit**

```bash
git add lib/utils.ts
git commit -m "feat: switch date formatting to zh-CN locale"
```

---

### Task 3: Apply beige light theme (app/globals.css)

**Files:**
- Modify: `app/globals.css`

- [ ] **Step 1: Replace the :root CSS variables block**

Find `:root {` block (around line 8) and replace with:

```css
:root {
  --background: 40 25% 97%;
  --foreground: 30 10% 18%;
  --muted: 40 15% 93%;
  --muted-foreground: 30 8% 45%;
  --card: 0 0% 100%;
  --card-foreground: 30 10% 18%;
  --border: 35 15% 88%;
  --primary: 30 10% 18%;
  --primary-foreground: 40 25% 97%;
  --accent: 40 20% 93%;
  --accent-foreground: 30 10% 18%;
  --ring: 30 10% 18%;
  --radius: 0.5rem;
}
```

- [ ] **Step 2: Commit**

```bash
git add app/globals.css
git commit -m "style: switch to warm beige light theme"
```

---

### Task 4: Add card hover scale effect (components/ui/card.tsx)

**Files:**
- Modify: `components/ui/card.tsx`

- [ ] **Step 1: Add hover scale and shadow to Card component**

Change the Card className line from:

```typescript
'rounded-xl border border-border bg-card text-card-foreground transition-all duration-200',
```

to:

```typescript
'rounded-xl border border-border bg-card text-card-foreground transition-all duration-300 ease-out hover:scale-[1.02] hover:shadow-md',
```

- [ ] **Step 2: Commit**

```bash
git add components/ui/card.tsx
git commit -m "feat: add hover scale and shadow effect to Card component"
```

---

### Task 5: Chinese localization of Header (components/layout/header.tsx)

**Files:**
- Modify: `components/layout/header.tsx`

- [ ] **Step 1: Change logo text to Chinese**

Change line from:

```tsx
<span className="text-foreground/70 group-hover:text-foreground transition-colors">
  kaiweng
</span>
```

to:

```tsx
<span className="text-foreground/70 group-hover:text-foreground transition-colors">
  峰峦是否天晴
</span>
```

- [ ] **Step 2: Commit**

```bash
git add components/layout/header.tsx
git commit -m "feat: localize header logo to Chinese"
```

---

### Task 6: Chinese localization of Footer (components/layout/footer.tsx)

**Files:**
- Modify: `components/layout/footer.tsx`

- [ ] **Step 1: Update footer with Chinese text and simplified social links**

Replace the entire file content:

```tsx
import Link from 'next/link';
import { Github, Mail, Rss } from 'lucide-react';
import { SITE_CONFIG } from '@/lib/constants';

const socialLinks = [
  { icon: Github, href: SITE_CONFIG.author.github, label: 'GitHub' },
  { icon: Mail, href: `mailto:${SITE_CONFIG.author.email}`, label: 'Email' },
  { icon: Rss, href: '/feed.xml', label: 'RSS' },
];

export function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto max-w-5xl px-6 py-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-1 text-sm text-muted-foreground">
            <span className="font-mono text-foreground/70">~/峰峦是否天晴</span>
            <span className="mx-2">·</span>
            <span>&copy; {new Date().getFullYear()}</span>
          </div>

          <div className="flex items-center gap-4">
            {socialLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors p-1"
                aria-label={link.label}
              >
                <link.icon className="h-4 w-4" />
              </a>
            ))}
          </div>

          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            <Link href="/blog" className="hover:text-foreground transition-colors">
              文章
            </Link>
            <Link href="/categories" className="hover:text-foreground transition-colors">
              分类
            </Link>
            <Link href="/about" className="hover:text-foreground transition-colors">
              关于
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add components/layout/footer.tsx
git commit -m "feat: localize footer to Chinese, simplify social links"
```

---

### Task 7: Update root layout (app/layout.tsx)

**Files:**
- Modify: `app/layout.tsx`

- [ ] **Step 1: Update lang, defaultTheme, metadata, and add background image support**

Replace the entire file content:

```tsx
import type { Metadata } from 'next';
import { ThemeProvider } from '@/components/layout/theme-provider';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { ScrollToTop } from '@/components/shared/scroll-to-top';
import { SITE_CONFIG } from '@/lib/constants';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_CONFIG.url),
  title: {
    default: `${SITE_CONFIG.name} — ${SITE_CONFIG.title}`,
    template: `%s — ${SITE_CONFIG.name}`,
  },
  description: SITE_CONFIG.description,
  keywords: [
    '技术博客', 'RISC-V', 'FPGA', '计算机架构', 'AI芯片',
    '跑步', '美食', '生活随笔', '硬件设计', '个人博客',
  ],
  authors: [{ name: SITE_CONFIG.author.name }],
  creator: SITE_CONFIG.author.name,
  openGraph: {
    type: 'website',
    locale: 'zh_CN',
    url: SITE_CONFIG.url,
    title: `${SITE_CONFIG.name} — ${SITE_CONFIG.title}`,
    description: SITE_CONFIG.description,
    siteName: SITE_CONFIG.name,
    images: [{ url: SITE_CONFIG.ogImage, width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${SITE_CONFIG.name} — ${SITE_CONFIG.title}`,
    description: SITE_CONFIG.description,
    images: [SITE_CONFIG.ogImage],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    types: { 'application/rss+xml': `${SITE_CONFIG.url}/feed.xml` },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const bgImage = SITE_CONFIG.backgroundImage;

  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body
        className="min-h-screen bg-background font-sans antialiased"
        style={
          bgImage
            ? {
                backgroundImage: `url(${bgImage})`,
                backgroundSize: 'cover',
                backgroundAttachment: 'fixed',
                backgroundPosition: 'center',
              }
            : undefined
        }
      >
        {bgImage && (
          <div className="fixed inset-0 bg-background/80 backdrop-blur-sm -z-10" />
        )}
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
          <div className="relative flex min-h-screen flex-col">
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
          <ScrollToTop />
        </ThemeProvider>
      </body>
    </html>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add app/layout.tsx
git commit -m "feat: zh-CN layout, light theme default, background image support"
```

---

### Task 8: Rewrite homepage (app/page.tsx)

**Files:**
- Modify: `app/page.tsx`

- [ ] **Step 1: Replace entire homepage with Chinese version**

```tsx
import Link from 'next/link';
import { ArrowRight, Github, Mail, ChevronRight } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { INTEREST_TAGS, SITE_CONFIG } from '@/lib/constants';
import { getAllPosts } from '@/lib/blog';
import { formatDate } from '@/lib/utils';

export const dynamic = 'force-static';

export default function HomePage() {
  const posts = getAllPosts().slice(0, 3);

  return (
    <div className="animate-fade-in">
      {/* Hero */}
      <section className="mx-auto max-w-5xl px-6 pt-24 pb-16 md:pt-36 md:pb-24">
        <div className="max-w-2xl space-y-6">
          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-accent/50 px-3 py-1 text-xs text-muted-foreground">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500" />
            </span>
            探索世界，记录生活
          </div>

          <h1 className="text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl">
            <span className="text-foreground/60">嗨，我是 </span>
            <span className="text-foreground">峰峦是否天晴</span>
          </h1>

          <p className="text-lg text-muted-foreground leading-relaxed max-w-xl">
            数字 IC 设计工程师，热爱计算机架构与 AI 芯片。
            工作之余，喜欢跑步、探店、摄影和烹饪。
            用代码构建世界，用脚步丈量大地。
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <Link href="/blog">
              <Button size="lg" className="gap-2">
                阅读文章 <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link href="/categories">
              <Button variant="outline" size="lg" className="gap-2">
                探索分类
              </Button>
            </Link>
            <a href={SITE_CONFIG.author.github} target="_blank" rel="noopener noreferrer">
              <Button variant="ghost" size="lg" className="gap-2">
                <Github className="h-4 w-4" /> GitHub
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* Interest Tags */}
      <section className="mx-auto max-w-5xl px-6 pb-16 md:pb-24">
        <div className="flex flex-wrap gap-2">
          {INTEREST_TAGS.map((tag) => (
            <Badge key={tag} variant="outline" className="font-mono text-xs py-1.5 px-3 hover:bg-accent transition-colors cursor-default">
              {tag}
            </Badge>
          ))}
        </div>
      </section>

      <Separator className="max-w-5xl mx-auto" />

      {/* Latest Posts */}
      {posts.length > 0 && (
        <section className="mx-auto max-w-5xl px-6 py-16 md:py-24">
          <div className="flex items-center justify-between mb-10">
            <div>
              <h2 className="text-2xl font-bold tracking-tight">最新文章</h2>
              <p className="text-sm text-muted-foreground mt-1">
                技术、生活、美食与跑步的记录
              </p>
            </div>
            <Link
              href="/blog"
              className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              查看全部 <ChevronRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <Link key={post.slug} href={`/blog/${post.slug}`} className="group">
                <Card className="h-full hover:border-foreground/20 transition-all duration-300 p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <Badge variant="secondary" className="font-mono text-[10px]">
                      {post.category}
                    </Badge>
                    <span className="text-xs text-muted-foreground ml-auto">
                      {formatDate(post.date)}
                    </span>
                  </div>
                  <h3 className="font-semibold mb-2 group-hover:text-foreground/80 transition-colors line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                    {post.description}
                  </p>
                  <div className="flex gap-1.5 flex-wrap">
                    {post.tags.slice(0, 2).map((tag) => (
                      <Badge key={tag} variant="outline" className="font-mono text-[10px]">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </section>
      )}

      <Separator className="max-w-5xl mx-auto" />

      {/* Contact CTA */}
      <section className="mx-auto max-w-5xl px-6 py-16 md:py-24">
        <div className="max-w-xl">
          <h2 className="text-2xl font-bold tracking-tight mb-4">与我联系</h2>
          <p className="text-muted-foreground mb-6">
            无论是讨论芯片设计、分享跑步路线、推荐美食店铺，还是只想打个招呼——
            都很乐意收到你的消息。
          </p>
          <div className="flex flex-wrap gap-3">
            <a href={`mailto:${SITE_CONFIG.author.email}`}>
              <Button variant="outline" className="gap-2">
                <Mail className="h-4 w-4" /> Email
              </Button>
            </a>
            <a href={SITE_CONFIG.author.github} target="_blank" rel="noopener noreferrer">
              <Button variant="outline" className="gap-2">
                <Github className="h-4 w-4" /> GitHub
              </Button>
            </a>
            <Link href="/contact">
              <Button variant="ghost">更多联系方式 →</Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add app/page.tsx
git commit -m "feat: rewrite homepage with Chinese content and interest tags"
```

---

### Task 9: Chinese localization of blog list page

**Files:**
- Modify: `app/blog/page.tsx`
- Modify: `app/blog/blog-list-client.tsx`

- [ ] **Step 1: Update blog/page.tsx metadata**

Replace metadata:

```tsx
export const metadata: Metadata = {
  title: '文章',
  description:
    '技术文章、生活随笔、美食记录与跑步日志。',
  openGraph: {
    title: '文章 — 峰峦是否天晴',
    description:
      '技术文章、生活随笔、美食记录与跑步日志。',
  },
};
```

- [ ] **Step 2: Update blog-list-client.tsx — Chinese text + URL search params**

Add `useSearchParams` import from `next/navigation` and `useEffect` from `react`. Read `category` and `tag` query params on mount to pre-set filters (so `/blog?category=Tech` from categories page works).

Write the full updated file:

```tsx
'use client';

import { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { BlogCard } from '@/components/blog/blog-card';
import { BlogSearch } from '@/components/blog/search';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import type { BlogPost } from '@/types';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';

interface Props {
  posts: BlogPost[];
  tags: { tag: string; count: number }[];
  categories: { category: string; count: number }[];
}

const ITEMS_PER_PAGE = 6;

export function BlogListClient({ posts, tags, categories }: Props) {
  const searchParams = useSearchParams();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  // Read URL search params on mount for /blog?category=Tech links
  useEffect(() => {
    const cat = searchParams.get('category');
    const tag = searchParams.get('tag');
    if (cat) setSelectedCategory(cat);
    if (tag) setSelectedTag(tag);
  }, [searchParams]);

  const filteredPosts = useMemo(() => {
    let result = posts;

    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.tags.some((t) => t.toLowerCase().includes(q))
      );
    }

    if (selectedTag) {
      result = result.filter((p) => p.tags.includes(selectedTag));
    }

    if (selectedCategory) {
      result = result.filter((p) => p.category === selectedCategory);
    }

    return result;
  }, [posts, searchQuery, selectedTag, selectedCategory]);

  const totalPages = Math.max(1, Math.ceil(filteredPosts.length / ITEMS_PER_PAGE));
  const pagePosts = filteredPosts.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  // Reset page when filters change
  useMemo(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedTag, selectedCategory]);

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedTag(null);
    setSelectedCategory(null);
  };

  const hasActiveFilters = searchQuery || selectedTag || selectedCategory;

  return (
    <div className="mx-auto max-w-5xl px-6 py-12 md:py-20">
      {/* Header */}
      <div className="mb-10 space-y-4">
        <h1 className="text-3xl font-bold tracking-tight">文章</h1>
        <p className="text-muted-foreground max-w-lg">
          技术文章、生活随笔、美食记录与跑步日志。
        </p>
        <BlogSearch onSearch={setSearchQuery} className="max-w-md" />
      </div>

      <div className="flex flex-col lg:flex-row gap-10">
        {/* Sidebar */}
        <aside className="lg:w-56 shrink-0 space-y-8">
          {/* Categories */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">
              分类
            </h3>
            <div className="space-y-1">
              <button
                onClick={() => setSelectedCategory(null)}
                className={cn(
                  'block w-full text-left text-sm px-2 py-1 rounded transition-colors',
                  !selectedCategory
                    ? 'bg-accent text-foreground font-medium'
                    : 'text-muted-foreground hover:text-foreground'
                )}
              >
                全部 ({posts.length})
              </button>
              {categories.map((c) => (
                <button
                  key={c.category}
                  onClick={() =>
                    setSelectedCategory(
                      selectedCategory === c.category ? null : c.category
                    )
                  }
                  className={cn(
                    'block w-full text-left text-sm px-2 py-1 rounded transition-colors',
                    selectedCategory === c.category
                      ? 'bg-accent text-foreground font-medium'
                      : 'text-muted-foreground hover:text-foreground'
                  )}
                >
                  {c.category} ({c.count})
                </button>
              ))}
            </div>
          </div>

          {/* Tags */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">
              标签
            </h3>
            <div className="flex flex-wrap gap-1.5">
              {tags.map((t) => (
                <button
                  key={t.tag}
                  onClick={() =>
                    setSelectedTag(selectedTag === t.tag ? null : t.tag)
                  }
                >
                  <Badge
                    variant={selectedTag === t.tag ? 'default' : 'outline'}
                    className="font-mono text-[10px] cursor-pointer hover:bg-accent transition-colors"
                  >
                    {t.tag}
                  </Badge>
                </button>
              ))}
            </div>
          </div>

          {/* Active filters */}
          {hasActiveFilters && (
            <button
              onClick={clearFilters}
              className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors"
            >
              <X className="h-3 w-3" />
              清除筛选
            </button>
          )}
        </aside>

        {/* Posts grid */}
        <div className="flex-1 min-w-0">
          {pagePosts.length > 0 ? (
            <>
              <div className="grid gap-6 md:grid-cols-2">
                {pagePosts.map((post) => (
                  <BlogCard key={post.slug} post={post} />
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex items-center justify-center gap-2 mt-12">
                  <Button
                    variant="outline"
                    size="sm"
                    disabled={currentPage <= 1}
                    onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                    (page) => (
                      <button
                        key={page}
                        onClick={() => setCurrentPage(page)}
                        className={cn(
                          'w-8 h-8 rounded-md text-sm font-medium transition-colors',
                          page === currentPage
                            ? 'bg-foreground text-background'
                            : 'text-muted-foreground hover:text-foreground hover:bg-accent'
                        )}
                      >
                        {page}
                      </button>
                    )
                  )}
                  <Button
                    variant="outline"
                    size="sm"
                    disabled={currentPage >= totalPages}
                    onClick={() =>
                      setCurrentPage((p) => Math.min(totalPages, p + 1))
                    }
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              )}
            </>
          ) : (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <p className="text-muted-foreground">暂无文章</p>
              {hasActiveFilters && (
                <button
                  onClick={clearFilters}
                  className="text-sm text-foreground underline mt-2"
                >
                  清除所有筛选
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
```

- [ ] **Step 3: Commit**

```bash
git add app/blog/page.tsx app/blog/blog-list-client.tsx
git commit -m "feat: localize blog list page to Chinese"
```

---

### Task 10: Chinese localization of blog detail page (app/blog/[slug]/page.tsx)

**Files:**
- Modify: `app/blog/[slug]/page.tsx`

- [ ] **Step 1: Replace English text with Chinese**

Make these changes in `app/blog/[slug]/page.tsx`:

Line 25: `return { title: 'Post Not Found' };` → `return { title: '文章未找到' };`

Line 65: `Back to blog` → `返回文章列表`

Line 94: `{post.readingTime} min read` → `{post.readingTime} 分钟阅读`

Line 118: `Previous` → `上一篇`

Line 133: `Next` → `下一篇`

Use Edit tool for each change:

- [ ] **Step 2: Commit**

```bash
git add app/blog/[slug]/page.tsx
git commit -m "feat: localize blog detail page to Chinese"
```

---

### Task 11: Create new categories page (app/categories/page.tsx)

**Files:**
- Create: `app/categories/page.tsx`

- [ ] **Step 1: Create the categories page**

Create `app/categories/page.tsx`:

```tsx
import type { Metadata } from 'next';
import Link from 'next/link';
import { Cpu, BookOpen, UtensilsCrossed, Footprints } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { CATEGORIES } from '@/lib/constants';
import { getAllPosts } from '@/lib/blog';

export const metadata: Metadata = {
  title: '分类',
  description: '按分类浏览文章 — Tech、Life、Food、Run。',
  openGraph: {
    title: '分类 — 峰峦是否天晴',
    description: '按分类浏览文章 — Tech、Life、Food、Run。',
  },
};

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Cpu,
  BookOpen,
  UtensilsCrossed,
  Footprints,
};

export default function CategoriesPage() {
  const posts = getAllPosts();

  const categoryCounts = CATEGORIES.map((cat) => ({
    ...cat,
    count: posts.filter((p) => p.category === cat.slug).length,
  }));

  return (
    <div className="mx-auto max-w-5xl px-6 py-12 md:py-20 animate-fade-in">
      <div className="max-w-2xl mb-12">
        <h1 className="text-3xl font-bold tracking-tight mb-4">分类</h1>
        <p className="text-muted-foreground leading-relaxed">
          技术、生活、美食与跑步 — 每个分类都是我生活的一部分。
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {categoryCounts.map((cat) => {
          const Icon = iconMap[cat.icon];
          return (
            <Link key={cat.slug} href={`/blog?category=${cat.slug}`}>
              <Card className="p-6 h-full group cursor-pointer transition-all duration-300 ease-out hover:scale-[1.02] hover:shadow-md">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-accent flex items-center justify-center shrink-0 group-hover:bg-foreground/10 transition-colors">
                    <Icon className="h-6 w-6" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h2 className="text-lg font-semibold">{cat.label}</h2>
                      <span className="text-xs text-muted-foreground">
                        ({cat.count} 篇)
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {cat.description}
                    </p>
                  </div>
                </div>
              </Card>
            </Link>
          );
        })}
      </div>

      <Separator className="my-16" />

      {/* Tag cloud */}
      <div className="max-w-2xl">
        <h2 className="text-xl font-semibold mb-6">浏览标签</h2>
        <p className="text-sm text-muted-foreground mb-6">
          通过标签快速找到你感兴趣的内容。点击任意标签跳转到文章列表。
        </p>
        <div className="flex flex-wrap gap-2">
          {[
            'RISC-V', 'FPGA', 'NPU', '计算机架构', 'AI芯片',
            '处理器设计', 'Verilog', '信号处理', '生活随笔', '读书笔记',
            '摄影', '美食探店', '烹饪记录', '咖啡', '跑步记录',
            '马拉松', '运动健康', '越野跑',
          ].map((tag) => (
            <Link key={tag} href={`/blog?tag=${tag}`}>
              <span className="inline-flex items-center rounded-full border border-border px-3 py-1 text-xs font-mono text-muted-foreground hover:text-foreground hover:bg-accent transition-colors cursor-pointer">
                {tag}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add app/categories/page.tsx
git commit -m "feat: create categories page with Tech/Life/Food/Run entry cards"
```

---

### Task 12: Delete old projects page

**Files:**
- Delete: `app/projects/page.tsx`

- [ ] **Step 1: Remove the old projects page**

```bash
rm "app/projects/page.tsx"
```

If the `app/projects/` directory becomes empty, remove it too:
```bash
rmdir "app/projects" 2>/dev/null || true
```

- [ ] **Step 2: Commit**

```bash
git add -A app/projects/
git commit -m "feat: remove old projects page, replaced by categories"
```

---

### Task 13: Rewrite about page (app/about/page.tsx)

**Files:**
- Modify: `app/about/page.tsx`

- [ ] **Step 1: Replace entire about page with Chinese lifestyle version**

```tsx
import type { Metadata } from 'next';
import Link from 'next/link';
import { Github, Mail, MapPin } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { SKILLS, SITE_CONFIG } from '@/lib/constants';

export const metadata: Metadata = {
  title: '关于',
  description: '关于峰峦是否天晴 — 数字IC设计工程师，跑步爱好者，美食探索者。',
  openGraph: {
    title: '关于 — 峰峦是否天晴',
    description: '关于峰峦是否天晴 — 数字IC设计工程师，跑步爱好者，美食探索者。',
  },
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-5xl px-6 py-12 md:py-20 animate-fade-in">
      {/* Header */}
      <div className="max-w-2xl mb-16">
        <h1 className="text-3xl font-bold tracking-tight mb-4">关于</h1>
        <p className="text-lg text-muted-foreground leading-relaxed">
          数字 IC 设计工程师，热爱计算机架构与 AI 芯片。
          工作之余，跑步、探店、摄影、烹饪填满了我的生活。
          这个网站记录了我的技术探索和生活点滴。
        </p>
        <div className="flex flex-wrap items-center gap-2 mt-4 text-sm text-muted-foreground">
          <MapPin className="h-3.5 w-3.5" />
          <span>中国</span>
        </div>
      </div>

      {/* Bio */}
      <section className="mb-16 max-w-2xl">
        <h2 className="text-xl font-semibold mb-4">关于我</h2>
        <div className="space-y-4 text-muted-foreground leading-relaxed">
          <p>
            从大学时代在 FPGA 上搭建第一个 RISC-V 处理器开始，我就被芯片设计的世界深深吸引。
            从 RTL 编码到综合、布局布线、流片，每一个环节都让我着迷。
            目前专注于 NPU 架构和 AI 加速器设计，探索算法与硬件的协同优化。
          </p>
          <p>
            工作之外，我是一个马拉松爱好者，享受长跑中那种与自己对话的宁静。
            周末喜欢探索城市里的独立咖啡馆和隐藏的美食小店，用相机记录生活中的美好瞬间。
            闲暇时也会在厨房里尝试新的食谱——虽然成功率还有待提高。
          </p>
          <p>
            这个网站是我与世界的连接点。在这里，我分享技术心得、跑步记录、美食探店和日常思考。
            希望能结识志同道合的朋友。
          </p>
        </div>
      </section>

      <Separator className="mb-16" />

      {/* Skills */}
      <section className="mb-16">
        <h2 className="text-xl font-semibold mb-8">技能 & 兴趣</h2>
        <div className="grid gap-6 md:grid-cols-2">
          {SKILLS.map((skill) => (
            <Card key={skill.category} className="p-5">
              <h3 className="font-medium text-sm mb-3 text-foreground/70">
                {skill.category}
              </h3>
              <div className="flex flex-wrap gap-1.5">
                {skill.items.map((item) => (
                  <Badge key={item} variant="secondary" className="font-mono text-[10px]">
                    {item}
                  </Badge>
                ))}
              </div>
            </Card>
          ))}
        </div>
      </section>

      <Separator className="mb-16" />

      {/* Connect */}
      <section className="max-w-2xl">
        <h2 className="text-xl font-semibold mb-6">找到我</h2>
        <div className="flex flex-wrap gap-3">
          <a href={SITE_CONFIG.author.github} target="_blank" rel="noopener noreferrer">
            <Button variant="outline" className="gap-2">
              <Github className="h-4 w-4" /> GitHub
            </Button>
          </a>
          <a href={`mailto:${SITE_CONFIG.author.email}`}>
            <Button variant="outline" className="gap-2">
              <Mail className="h-4 w-4" /> Email
            </Button>
          </a>
          <Link href="/contact">
            <Button variant="outline">更多联系方式 →</Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add app/about/page.tsx
git commit -m "feat: rewrite about page with Chinese lifestyle content"
```

---

### Task 14: Chinese localization of contact page (app/contact/page.tsx)

**Files:**
- Modify: `app/contact/page.tsx`

- [ ] **Step 1: Replace entire contact page with Chinese version**

```tsx
import type { Metadata } from 'next';
import { Github, Mail, MessageSquare, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { SITE_CONFIG } from '@/lib/constants';

export const metadata: Metadata = {
  title: '联系',
  description: '与我取得联系 — 邮件或 GitHub。',
  openGraph: {
    title: '联系 — 峰峦是否天晴',
    description: '与我取得联系 — 邮件或 GitHub。',
  },
};

const contactMethods = [
  {
    title: 'Email',
    description: '最直接可靠的方式，我通常会在 24 小时内回复。',
    icon: Mail,
    href: `mailto:${SITE_CONFIG.author.email}`,
    label: SITE_CONFIG.author.email,
    cta: '发送邮件',
  },
  {
    title: 'GitHub',
    description: '在项目里提 Issue 或发起 Discussion，一起讨论技术问题。',
    icon: Github,
    href: SITE_CONFIG.author.github,
    label: 'github.com/windandwall',
    cta: '访问 GitHub',
  },
];

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-5xl px-6 py-12 md:py-20 animate-fade-in">
      <div className="max-w-2xl mb-12">
        <h1 className="text-3xl font-bold tracking-tight mb-4">联系</h1>
        <p className="text-muted-foreground leading-relaxed">
          无论是讨论芯片设计、分享跑步路线、推荐美食店铺，还是只想打个招呼——
          都欢迎通过以下方式联系我。
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 mb-16">
        {contactMethods.map((method) => (
          <Card key={method.title} className="p-6 group transition-all duration-300 ease-out hover:scale-[1.02] hover:shadow-md">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-accent flex items-center justify-center shrink-0 group-hover:bg-foreground/10 transition-colors">
                <method.icon className="h-4 w-4" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-medium mb-1">{method.title}</h3>
                <p className="text-xs text-muted-foreground mb-3">{method.description}</p>
                <p className="text-sm font-mono text-foreground/60 mb-3 truncate">
                  {method.label}
                </p>
                <a href={method.href} target="_blank" rel="noopener noreferrer">
                  <Button variant="outline" size="sm" className="gap-1.5">
                    {method.cta} <ArrowRight className="h-3 w-3" />
                  </Button>
                </a>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <Separator className="mb-16" />

      {/* Note */}
      <div className="max-w-lg">
        <div className="flex items-center gap-2 mb-3">
          <MessageSquare className="h-4 w-4 text-muted-foreground" />
          <h2 className="font-semibold text-sm">想留言评论？</h2>
        </div>
        <p className="text-sm text-muted-foreground leading-relaxed">
          博客评论使用 Giscus（基于 GitHub Discussions）。前往{' '}
          <a href="/blog" className="underline underline-offset-4 hover:text-foreground">
            文章页
          </a>{' '}
          参与讨论，或者在{' '}
          <a
            href={SITE_CONFIG.author.github}
            target="_blank"
            rel="noopener noreferrer"
            className="underline underline-offset-4 hover:text-foreground"
          >
            GitHub
          </a>
          {' '}上发起 Discussion。
        </p>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add app/contact/page.tsx
git commit -m "feat: localize contact page to Chinese, simplify contact methods"
```

---

### Task 15: Chinese localization of 404 page (app/not-found.tsx)

**Files:**
- Modify: `app/not-found.tsx`

- [ ] **Step 1: Replace English text with Chinese**

Replace the entire file content:

```tsx
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-6 text-center">
      <h1 className="text-6xl font-bold text-muted-foreground/30 mb-4">404</h1>
      <p className="text-lg text-muted-foreground mb-8 max-w-md">
        你访问的页面不存在或已被移动。
      </p>
      <Link href="/">
        <Button variant="outline" className="gap-2">
          <ArrowLeft className="h-4 w-4" /> 返回首页
        </Button>
      </Link>
    </div>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add app/not-found.tsx
git commit -m "feat: localize 404 page to Chinese"
```

---

### Task 16: Update sitemap and RSS feed

**Files:**
- Modify: `app/sitemap.ts`
- Modify: `app/feed.xml/route.ts`

- [ ] **Step 1: Update sitemap to reflect new routes**

In `app/sitemap.ts`, replace `/projects` with `/categories`:

Change:
```typescript
{ url: `${SITE_CONFIG.url}/projects`, lastModified: new Date(), changeFrequency: 'weekly' as const, priority: 0.8 },
```

to:
```typescript
{ url: `${SITE_CONFIG.url}/categories`, lastModified: new Date(), changeFrequency: 'weekly' as const, priority: 0.8 },
```

- [ ] **Step 2: Update RSS feed language**

In `app/feed.xml/route.ts`, change `<language>en</language>` to `<language>zh-CN</language>`

- [ ] **Step 3: Commit**

```bash
git add app/sitemap.ts app/feed.xml/route.ts
git commit -m "feat: update sitemap routes and RSS language to zh-CN"
```

---

### Task 17: Translate existing blog post frontmatter (4 files)

**Files:**
- Modify: `content/blog/riscv-o3-core-design.mdx`
- Modify: `content/blog/cache-coherence-primer.mdx`
- Modify: `content/blog/npu-systolic-array-design.mdx`
- Modify: `content/blog/fpga-radar-signal-processing.mdx`

- [ ] **Step 1: Update riscv-o3-core-design.mdx frontmatter**

Replace the frontmatter block (lines 1-7):

```yaml
---
title: 'RISC-V 乱序处理器设计：流水线、分支预测与内存排序'
description: '从取指到提交，手把手设计一个 RISC-V 乱序执行处理器核心。涵盖 TAGE 分支预测器、寄存器重命名、发射队列、加载存储单元与重排序缓冲区的 RTL 实现。'
date: '2024-08-22'
tags: ['RISC-V', '计算机架构', '处理器设计', 'Verilog']
category: 'Tech'
featured: true
---
```

- [ ] **Step 2: Update cache-coherence-primer.mdx frontmatter**

Replace the frontmatter block (lines 1-7):

```yaml
---
title: '缓存一致性协议：从 MSI 到 MOESI — 硬件设计师视角'
description: '深入理解多核处理器的缓存一致性协议。从简单的 MSI 到复杂的基于目录的 MOESI，逐一分析状态转换与 RTL 实现要点。'
date: '2025-03-15'
tags: ['计算机架构', 'Verilog', '缓存一致性']
category: 'Tech'
featured: true
---
```

- [ ] **Step 3: Update npu-systolic-array-design.mdx frontmatter**

Replace the frontmatter block (lines 1-7):

```yaml
---
title: '脉动阵列 NPU 设计：神经网络推理加速器架构详解'
description: '从数据流选择到内存层次结构，从 PE 微架构到时序收敛，完整解析用于神经网络推理的脉动阵列加速器设计方法。'
date: '2025-01-20'
tags: ['NPU', 'AI芯片', '计算机架构', '脉动阵列']
category: 'Tech'
featured: true
---
```

- [ ] **Step 4: Update fpga-radar-signal-processing.mdx frontmatter**

Replace the frontmatter block (lines 1-7):

```yaml
---
title: 'FPGA 实时 FMCW 雷达信号处理：信号链设计与 RTL 实现'
description: '基于 Xilinx Zynq 的 FMCW 雷达端到端 FPGA 实现：2D FFT、CFAR 检测与角度估计。包含完整 Verilog RTL 代码与 MATLAB 验证方案。'
date: '2024-11-08'
tags: ['FPGA', '信号处理', 'Verilog', '雷达']
category: 'Tech'
featured: false
---
```

- [ ] **Step 5: Commit**

```bash
git add content/blog/riscv-o3-core-design.mdx content/blog/cache-coherence-primer.mdx content/blog/npu-systolic-array-design.mdx content/blog/fpga-radar-signal-processing.mdx
git commit -m "feat: translate blog post frontmatter to Chinese, update categories"
```

---

### Task 18: Create new sample blog posts (Life, Food, Run)

**Files:**
- Create: `content/blog/sunday-run-diary.mdx` (Run)
- Create: `content/blog/cafe-exploration-notes.mdx` (Food)
- Create: `content/blog/reading-notes-2025.mdx` (Life)

- [ ] **Step 1: Create Run category sample post**

Create `content/blog/sunday-run-diary.mdx`:

```mdx
---
title: '周日晨跑日记：10公里，与自己对话的时光'
description: '清晨5点半起床，穿上跑鞋，沿着熟悉的路线跑了10公里。记录一次平凡而美好的周日晨跑。'
date: '2025-04-12'
tags: ['跑步记录', '运动健康', '训练计划']
category: 'Run'
featured: false
---

## 清晨5:30

闹钟响的时候，窗外还是一片灰蓝色。犹豫了三秒钟要不要按掉继续睡——这是每次跑步前必经的仪式感。但最终还是爬了起来。

穿上昨晚准备好的跑鞋，喝了一杯温水，做了5分钟动态拉伸，5:45出门。

## 路线

今天的路线是沿河绿道，往返刚好10公里：

- 0-3km：热身区间，配速6:00/km，身体逐渐唤醒
- 3-7km：巡航区间，配速5:30/km，心率稳定在150左右
- 7-10km：加速区间，配速5:00/km，最后1公里冲刺

## 路上的风景

6点的河边几乎没人。几只早起的白鹭在水边踱步，阳光从云层缝隙里漏下来，在水面上洒了一层碎金。

跑到7公里的时候遇到了一只橘猫，蹲在路边看风景。我停下来和它对视了三秒，它甩了甩尾巴走开了——大概觉得这个满头大汗的人类不太有趣。

## 数据

- 距离：10.02 km
- 用时：55:23
- 平均配速：5:32/km
- 平均心率：152 bpm
- 消耗：680 kcal

## 跑后

回家冲了个澡，煎了两个鸡蛋，泡了一杯咖啡。坐在阳台上晒太阳的时候想：能跑步的日子，都是好日子。

下周计划尝试跑15公里，为下个月的半马做准备。
```

- [ ] **Step 2: Create Food category sample post**

Create `content/blog/cafe-exploration-notes.mdx`:

```mdx
---
title: '探店笔记：藏在老城区巷子里的宝藏咖啡店'
description: '周末在老城区闲逛时偶然发现的一家独立咖啡馆，手冲单品、复古装修、安静的氛围——所有我喜欢的元素都在这里了。'
date: '2025-03-28'
tags: ['美食探店', '咖啡', '生活随笔']
category: 'Food'
featured: false
---

## 偶遇

周末在老城区闲逛，本来是想去找那家据说开了三十年的肠粉店。结果走错了巷子，一抬头看到了这家藏在居民楼下的咖啡店。

门口没有显眼的招牌，只有一块手写的小黑板："今日单品：埃塞俄比亚 耶加雪菲 水洗"。

## 环境

推门进去，空间不大，大概能坐十来个人。装修是复古工业风，裸露的红砖墙上挂着一些老照片，角落里有一整面墙的旧书。音乐是低沉的爵士乐，音量刚好。

最好的位置是靠窗的那张木桌，阳光从老式木窗里斜斜地照进来，斑驳的光影落在桌上，很适合发呆。

## 咖啡

点了招牌的耶加雪菲手冲。咖啡师是个戴眼镜的年轻人，磨豆、闷蒸、注水，动作不紧不慢，很好看。

咖啡端上来的时候，柑橘和花香扑面而来。入口干净明亮，酸质柔和，尾韵有一点蜂蜜的甜。配的杯子上手绘了一朵小花——这种小细节总是让我对一家店好感倍增。

## 食物

除了咖啡，还点了一份巴斯克芝士蛋糕。外表烤得微微焦黄，里面是流心的绵密芝士。不甜不腻，配手冲刚刚好。

## 感受

在店里坐了两个小时，看完了半本书。期间只有两三个客人，安安静静的。

在城市里找到这样一个小小的避风港，是件很幸运的事。下次带朋友来。
```

- [ ] **Step 3: Create Life category sample post**

Create `content/blog/reading-notes-2025.mdx`:

```mdx
---
title: '读书笔记：《计算机体系结构：量化研究方法》重新翻阅有感'
description: '时隔两年重新翻开 Hennessy 和 Patterson 的经典教材，结合工作中的实际经验，有了和读书时完全不同的感悟。'
date: '2025-02-15'
tags: ['读书笔记', '日常思考', '计算机架构']
category: 'Life'
featured: false
---

## 重读的契机

书架上的第六版已经落了些灰。上次认真读还是研究生时期，工作后再翻开，发现很多当时一知半解的内容，现在读来豁然开朗。

这大概就是理论和实践之间的差距——没有亲手写过 RTL，没有经历过流片的焦虑，对书中那些设计权衡的理解终究是浅的。

## 新感悟

### 关于流水线

书中用洗衣房的比喻解释流水线，很生动。但真正设计过后才明白，流水级的划分与其说是科学，不如说是艺术——在时序、面积和吞吐量之间反复摇摆。

### 关于缓存

以前觉得缓存就是个"快的小内存"。现在知道了，一个正确设计的一致性协议比存储单元本身复杂十倍。书中的 MSI → MESI → MOESI 演化路径，回头看就像一部微缩的技术史。

### 关于量化

书名里的"量化"二字，工作后才体会到分量。每个设计决策背后都需要数据支撑——性能计数器、面积报告、功耗分析。没有量化的设计只是在猜测。

## 一点感想

技术书籍最好的阅读方式可能是：先通读一遍建立框架，然后去实践，在踩过坑之后再回头精读。

这本书还会再翻开的。下次也许又有新的收获。
```

- [ ] **Step 4: Commit**

```bash
git add content/blog/sunday-run-diary.mdx content/blog/cafe-exploration-notes.mdx content/blog/reading-notes-2025.mdx
git commit -m "feat: add sample blog posts for Run, Food, and Life categories"
```

---

### Task 19: Build verification and final adjustments

**Files:**
- No specific files — verification task

- [ ] **Step 1: Install dependencies and run build**

```bash
cd "C:/Users/weng xinkai/Desktop/claude code/my_website" && npm run build
```

Expected: Build succeeds with no errors. If errors occur, fix them before proceeding.

- [ ] **Step 2: Run lint**

```bash
npm run lint
```

Expected: No lint errors. Fix any warnings.

- [ ] **Step 3: Start dev server and do a smoke test**

```bash
npm run dev
```

Check:
- http://localhost:3000 — homepage loads in Chinese, beige background
- http://localhost:3000/blog — blog list with Chinese text
- http://localhost:3000/categories — 4 category cards
- http://localhost:3000/about — lifestyle about page
- http://localhost:3000/contact — Chinese contact page
- http://localhost:3000/random-page — 404 in Chinese
- Toggle dark mode — works correctly

- [ ] **Step 4: Commit any final fixes**

If any fixes were needed:
```bash
git add -A
git commit -m "fix: build and lint fixes for Chinese refactor"
```

---

### Task 20: Push to GitHub and deploy to Vercel

**Files:**
- No file changes

- [ ] **Step 1: Push all commits to GitHub**

```bash
git push origin main
```

- [ ] **Step 2: Trigger Vercel deployment**

If Vercel is connected to the GitHub repo, the push will automatically trigger a deployment.
Check the Vercel dashboard or CLI for deployment status.

If using Vercel CLI:
```bash
npx vercel --prod
```

- [ ] **Step 3: Verify the live site**

Visit the production URL and confirm all pages load correctly.

---

## Summary

**20 tasks, ~18 commits.** The refactor touches every major file in the project:

| Layer | Files |
|-------|-------|
| Foundation | `lib/constants.ts`, `lib/utils.ts`, `app/globals.css` |
| Layout | `app/layout.tsx`, `components/layout/header.tsx`, `components/layout/footer.tsx` |
| UI | `components/ui/card.tsx` |
| Pages | `app/page.tsx`, `app/blog/page.tsx`, `app/blog/blog-list-client.tsx`, `app/blog/[slug]/page.tsx`, `app/categories/page.tsx`, `app/about/page.tsx`, `app/contact/page.tsx`, `app/not-found.tsx` |
| SEO | `app/sitemap.ts`, `app/feed.xml/route.ts` |
| Content | 4 existing + 3 new MDX files |
| Cleanup | Delete `app/projects/page.tsx` |
