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
