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
