import type { Metadata } from 'next';
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

export default function BlogPage() {
  const posts = getAllPosts();
  const tags = getAllTags();
  const categories = getAllCategories();

  return <BlogListClient posts={posts} tags={tags} categories={categories} />;
}
