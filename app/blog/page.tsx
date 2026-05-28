import type { Metadata } from 'next';
import { Suspense } from 'react';
import { BlogListClient } from './blog-list-client';
import { getAllPosts, getAllTags, getAllCategories } from '@/lib/blog';

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

function BlogListFallback() {
  return (
    <div className="mx-auto max-w-5xl px-6 py-12 md:py-20">
      <div className="mb-10 space-y-4">
        <h1 className="text-3xl font-bold tracking-tight">文章</h1>
        <div className="h-4 w-64 bg-muted animate-pulse rounded" />
        <div className="h-10 max-w-md bg-muted animate-pulse rounded-lg" />
      </div>
      <div className="grid gap-6 md:grid-cols-2">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="h-48 rounded-xl bg-muted animate-pulse" />
        ))}
      </div>
    </div>
  );
}

export default function BlogPage() {
  const posts = getAllPosts();
  const tags = getAllTags();
  const categories = getAllCategories();

  return (
    <Suspense fallback={<BlogListFallback />}>
      <BlogListClient posts={posts} tags={tags} categories={categories} />
    </Suspense>
  );
}
