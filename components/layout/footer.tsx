import Link from 'next/link';
import { Github, Mail, Rss } from 'lucide-react';
import { SITE_CONFIG } from '@/lib/constants';

const socialLinks = [
  { icon: Github, href: SITE_CONFIG.author.github, label: 'GitHub' },
  { icon: Mail, href: `mailto:${SITE_CONFIG.author.email}`, label: 'Email' },
  { icon: Rss, href: '/feed.xml', label: 'RSS' },
];

export function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto max-w-5xl px-6 py-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-1 text-sm text-muted-foreground">
            <span className="font-mono text-foreground/70">~/峰峦是否天晴</span>
            <span className="mx-2">·</span>
            <span>&copy; {new Date().getFullYear()}</span>
          </div>

          <div className="flex items-center gap-4">
            {socialLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors p-1"
                aria-label={link.label}
              >
                <link.icon className="h-4 w-4" />
              </a>
            ))}
          </div>

          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            <Link href="/blog" className="hover:text-foreground transition-colors">
              文章
            </Link>
            <Link href="/categories" className="hover:text-foreground transition-colors">
              分类
            </Link>
            <Link href="/about" className="hover:text-foreground transition-colors">
              关于
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
