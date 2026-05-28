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
