import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Calendar, Clock, ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { TableOfContents } from '@/components/blog/toc';
import { ReadingProgress } from '@/components/shared/reading-progress';
import { BlogContent } from '@/components/blog/mdx-content';
import { SITE_CONFIG } from '@/lib/constants';
import { getPostBySlug, getAllPosts, getAdjacentPosts, getRelatedPosts } from '@/lib/blog';
import { formatDate } from '@/lib/utils';
import { GiscusComments } from '@/components/blog/giscus';

interface Props {
  params: { slug: string };
}

export function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export function generateMetadata({ params }: Props): Metadata {
  const post = getPostBySlug(params.slug);
  if (!post) return { title: '文章未找到' };

  return {
    title: post.title,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      type: 'article',
      publishedTime: post.date,
      tags: post.tags,
      url: `${SITE_CONFIG.url}/blog/${post.slug}`,
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.description,
    },
    alternates: {
      canonical: `${SITE_CONFIG.url}/blog/${post.slug}`,
    },
  };
}

export default function BlogPostPage({ params }: Props) {
  const post = getPostBySlug(params.slug);
  if (!post) notFound();

  const { prev, next } = getAdjacentPosts(params.slug);

  return (
    <>
      <ReadingProgress />
      <article className="mx-auto max-w-5xl px-6 py-12 md:py-20">
        {/* Back link */}
        <Link
          href="/blog"
          className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
        >
          <ArrowLeft className="h-3.5 w-3.5" /> 返回文章列表
        </Link>

        <div className="flex flex-col lg:flex-row gap-10">
          {/* Main content */}
          <div className="flex-1 min-w-0">
            {/* Header */}
            <header className="mb-10">
              <div className="flex items-center gap-2 mb-4">
                <Badge variant="secondary" className="font-mono text-[10px]">
                  {post.category}
                </Badge>
              </div>

              <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
                {post.title}
              </h1>

              <p className="text-lg text-muted-foreground mb-6">
                {post.description}
              </p>

              <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                <span className="flex items-center gap-1.5">
                  <Calendar className="h-4 w-4" />
                  {formatDate(post.date)}
                </span>
                <span className="flex items-center gap-1.5">
                  <Clock className="h-4 w-4" />
                  {post.readingTime} 分钟阅读
                </span>
              </div>

              <div className="flex flex-wrap gap-1.5 mt-4">
                {post.tags.map((tag) => (
                  <Link key={tag} href={`/blog?tag=${tag}`}>
                    <Badge variant="outline" className="font-mono text-[10px] hover:bg-accent cursor-pointer">
                      {tag}
                    </Badge>
                  </Link>
                ))}
              </div>
            </header>

            <Separator className="mb-10" />

            {/* Content */}
            <BlogContent content={post.content} />

            <Separator className="my-12" />

            {/* Prev/Next */}
            <nav className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {prev ? (
                <Link href={`/blog/${prev.slug}`} className="group">
                  <div className="p-4 rounded-lg border border-border hover:border-foreground/20 transition-all">
                    <span className="text-xs text-muted-foreground flex items-center gap-1 mb-1">
                      <ChevronLeft className="h-3 w-3" /> 上一篇
                    </span>
                    <span className="text-sm font-medium group-hover:text-foreground/80 transition-colors line-clamp-1">
                      {prev.title}
                    </span>
                  </div>
                </Link>
              ) : (
                <div />
              )}
              {next ? (
                <Link href={`/blog/${next.slug}`} className="group sm:text-right">
                  <div className="p-4 rounded-lg border border-border hover:border-foreground/20 transition-all">
                    <span className="text-xs text-muted-foreground flex items-center gap-1 mb-1 sm:justify-end">
                      下一篇 <ChevronRight className="h-3 w-3" />
                    </span>
                    <span className="text-sm font-medium group-hover:text-foreground/80 transition-colors line-clamp-1">
                      {next.title}
                    </span>
                  </div>
                </Link>
              ) : (
                <div />
              )}
            </nav>

            {/* Comments */}
            <GiscusComments />
          </div>

          {/* Sidebar TOC */}
          <aside className="lg:w-56 shrink-0">
            <div className="sticky top-24">
              <TableOfContents />
            </div>
          </aside>
        </div>
      </article>
    </>
  );
}
