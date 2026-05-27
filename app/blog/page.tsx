import type { Metadata } from 'next';
import { BlogListClient } from './blog-list-client';
import { getAllPosts, getAllTags, getAllCategories } from '@/lib/blog';

export const metadata: Metadata = {
  title: 'Blog',
  description:
    'Technical articles about digital IC design, computer architecture, FPGA, NPU, and AI chips.',
  openGraph: {
    title: 'Blog — Kai Weng',
    description:
      'Technical articles about digital IC design, computer architecture, FPGA, NPU, and AI chips.',
  },
};

export default function BlogPage() {
  const posts = getAllPosts();
  const tags = getAllTags();
  const categories = getAllCategories();

  return <BlogListClient posts={posts} tags={tags} categories={categories} />;
}
