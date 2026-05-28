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
