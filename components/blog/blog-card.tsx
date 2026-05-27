import Link from 'next/link';
import { Calendar, Clock } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { formatDate } from '@/lib/utils';
import type { BlogPost } from '@/types';

interface BlogCardProps {
  post: BlogPost;
}

export function BlogCard({ post }: BlogCardProps) {
  return (
    <Link href={`/blog/${post.slug}`} className="group block">
      <Card className="h-full hover:border-foreground/20 transition-all duration-300 hover:shadow-sm">
        <div className="p-6 flex flex-col h-full">
          <div className="flex items-center gap-2 mb-3">
            <Badge variant="secondary" className="font-mono text-[10px]">
              {post.category}
            </Badge>
            <span className="text-xs text-muted-foreground flex items-center gap-1">
              <Calendar className="h-3 w-3" />
              {formatDate(post.date)}
            </span>
            <span className="text-xs text-muted-foreground flex items-center gap-1 ml-auto">
              <Clock className="h-3 w-3" />
              {post.readingTime} min
            </span>
          </div>

          <h3 className="text-lg font-semibold tracking-tight mb-2 group-hover:text-foreground/80 transition-colors line-clamp-2">
            {post.title}
          </h3>

          <p className="text-sm text-muted-foreground mb-4 line-clamp-2 flex-1">
            {post.description}
          </p>

          <div className="flex flex-wrap gap-1.5">
            {post.tags.slice(0, 3).map((tag) => (
              <Badge key={tag} variant="outline" className="font-mono text-[10px]">
                {tag}
              </Badge>
            ))}
            {post.tags.length > 3 && (
              <span className="text-[10px] text-muted-foreground px-1">
                +{post.tags.length - 3}
              </span>
            )}
          </div>
        </div>
      </Card>
    </Link>
  );
}
