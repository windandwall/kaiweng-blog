import fs from 'fs';
import path from 'path';
import { BlogPost } from '@/types';
import { estimateReadingTime } from './utils';

const BLOG_DIR = path.join(process.cwd(), 'content/blog');

export interface BlogPostWithContent extends BlogPost {
  content: string;
}

function parseFrontmatter(content: string): {
  data: Record<string, unknown>;
  body: string;
} {
  const match = content.match(/^---\s*\n([\s\S]*?)\n---\s*\n([\s\S]*)$/);
  if (!match) {
    return { data: {}, body: content };
  }

  const frontmatterStr = match[1];
  const body = match[2];
  const data: Record<string, unknown> = {};

  frontmatterStr.split('\n').forEach((line) => {
    const colonIdx = line.indexOf(':');
    if (colonIdx === -1) return;

    const key = line.slice(0, colonIdx).trim();
    let value: unknown = line.slice(colonIdx + 1).trim();

    // Parse YAML array: [a, b, c]
    if (typeof value === 'string' && value.startsWith('[') && value.endsWith(']')) {
      value = value
        .slice(1, -1)
        .split(',')
        .map((s) => s.trim().replace(/^['"]|['"]$/g, ''));
    }
    // Parse quoted strings
    else if (typeof value === 'string') {
      value = value.replace(/^['"]|['"]$/g, '');
    }

    data[key] = value;
  });

  return { data, body };
}

function parseBlogPost(slug: string, rawContent: string): BlogPostWithContent {
  const { data, body } = parseFrontmatter(rawContent);

  return {
    slug,
    title: (data.title as string) || slug,
    description: (data.description as string) || '',
    date: (data.date as string) || new Date().toISOString().split('T')[0],
    tags: (data.tags as string[]) || [],
    category: (data.category as string) || 'Uncategorized',
    readingTime: estimateReadingTime(body),
    coverImage: data.coverImage as string | undefined,
    featured: (data.featured as boolean) || false,
    draft: (data.draft as boolean) || false,
    content: body,
  };
}

export function getAllPosts(): BlogPostWithContent[] {
  if (!fs.existsSync(BLOG_DIR)) return [];

  const files = fs.readdirSync(BLOG_DIR).filter((f) => f.endsWith('.mdx'));

  const posts = files.map((file) => {
    const slug = file.replace(/\.mdx$/, '');
    const rawContent = fs.readFileSync(path.join(BLOG_DIR, file), 'utf-8');
    return parseBlogPost(slug, rawContent);
  });

  return posts
    .filter((p) => !p.draft)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getPostBySlug(slug: string): BlogPostWithContent | null {
  const filePath = path.join(BLOG_DIR, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return null;

  const rawContent = fs.readFileSync(filePath, 'utf-8');
  return parseBlogPost(slug, rawContent);
}

export function getAllTags(): { tag: string; count: number }[] {
  const posts = getAllPosts();
  const tagMap = new Map<string, number>();

  posts.forEach((post) => {
    post.tags.forEach((tag) => {
      tagMap.set(tag, (tagMap.get(tag) || 0) + 1);
    });
  });

  return Array.from(tagMap.entries())
    .map(([tag, count]) => ({ tag, count }))
    .sort((a, b) => b.count - a.count);
}

export function getAllCategories(): { category: string; count: number }[] {
  const posts = getAllPosts();
  const catMap = new Map<string, number>();

  posts.forEach((post) => {
    catMap.set(post.category, (catMap.get(post.category) || 0) + 1);
  });

  return Array.from(catMap.entries())
    .map(([category, count]) => ({ category, count }))
    .sort((a, b) => b.count - a.count);
}

export function getAdjacentPosts(slug: string): {
  prev: BlogPost | null;
  next: BlogPost | null;
} {
  const posts = getAllPosts();
  const idx = posts.findIndex((p) => p.slug === slug);

  return {
    prev: idx > 0 ? posts[idx - 1] : null,
    next: idx < posts.length - 1 ? posts[idx + 1] : null,
  };
}

export function getRelatedPosts(slug: string, limit = 3): BlogPost[] {
  const posts = getAllPosts();
  const current = posts.find((p) => p.slug === slug);
  if (!current) return [];

  return posts
    .filter((p) => p.slug !== slug)
    .map((p) => {
      const commonTags = p.tags.filter((t) => current.tags.includes(t));
      return { ...p, _score: commonTags.length };
    })
    .sort((a, b) => (b as any)._score - (a as any)._score)
    .slice(0, limit)
    .map(({ _score, ...post }) => post as BlogPost);
}
