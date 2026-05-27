import Link from 'next/link';
import { ArrowRight, Github, Mail, ChevronRight } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { TECH_STACK, SITE_CONFIG } from '@/lib/constants';
import { getAllPosts } from '@/lib/blog';
import { formatDate } from '@/lib/utils';

export const dynamic = 'force-static';

export default function HomePage() {
  const posts = getAllPosts().slice(0, 3);

  return (
    <div className="animate-fade-in">
      {/* Hero */}
      <section className="mx-auto max-w-5xl px-6 pt-24 pb-16 md:pt-36 md:pb-24">
        <div className="max-w-2xl space-y-6">
          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-accent/50 px-3 py-1 text-xs text-muted-foreground">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500" />
            </span>
            Available for opportunities
          </div>

          <h1 className="text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl">
            <span className="text-foreground/60">Hi, I&apos;m </span>
            <span className="text-foreground">Kai Weng</span>
          </h1>

          <p className="text-lg text-muted-foreground leading-relaxed max-w-xl">
            Digital IC design engineer focused on computer architecture, NPU design,
            and high-performance chip implementation. Building the future of AI
            hardware, one tape-out at a time.
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <Link href="/blog">
              <Button size="lg" className="gap-2">
                Read Blog <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link href="/projects">
              <Button variant="outline" size="lg" className="gap-2">
                View Projects
              </Button>
            </Link>
            <a href={SITE_CONFIG.author.github} target="_blank" rel="noopener noreferrer">
              <Button variant="ghost" size="lg" className="gap-2">
                <Github className="h-4 w-4" /> GitHub
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* Tech Stack */}
      <section className="mx-auto max-w-5xl px-6 pb-16 md:pb-24">
        <div className="flex flex-wrap gap-2">
          {TECH_STACK.map((tech) => (
            <Badge key={tech} variant="outline" className="font-mono text-xs py-1.5 px-3 hover:bg-accent transition-colors cursor-default">
              {tech}
            </Badge>
          ))}
        </div>
      </section>

      <Separator className="max-w-5xl mx-auto" />

      {/* Latest Posts */}
      {posts.length > 0 && (
        <section className="mx-auto max-w-5xl px-6 py-16 md:py-24">
          <div className="flex items-center justify-between mb-10">
            <div>
              <h2 className="text-2xl font-bold tracking-tight">Latest Articles</h2>
              <p className="text-sm text-muted-foreground mt-1">
                Thoughts on chip design and computer architecture
              </p>
            </div>
            <Link
              href="/blog"
              className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              View all <ChevronRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <Link key={post.slug} href={`/blog/${post.slug}`} className="group">
                <Card className="h-full hover:border-foreground/20 transition-all duration-300 p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <Badge variant="secondary" className="font-mono text-[10px]">
                      {post.category}
                    </Badge>
                    <span className="text-xs text-muted-foreground ml-auto">
                      {formatDate(post.date)}
                    </span>
                  </div>
                  <h3 className="font-semibold mb-2 group-hover:text-foreground/80 transition-colors line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                    {post.description}
                  </p>
                  <div className="flex gap-1.5 flex-wrap">
                    {post.tags.slice(0, 2).map((tag) => (
                      <Badge key={tag} variant="outline" className="font-mono text-[10px]">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </section>
      )}

      <Separator className="max-w-5xl mx-auto" />

      {/* Contact CTA */}
      <section className="mx-auto max-w-5xl px-6 py-16 md:py-24">
        <div className="max-w-xl">
          <h2 className="text-2xl font-bold tracking-tight mb-4">Get in touch</h2>
          <p className="text-muted-foreground mb-6">
            Whether you want to discuss chip design, collaborate on open-source
            hardware projects, or just say hi — I&apos;m always open to connecting.
          </p>
          <div className="flex flex-wrap gap-3">
            <a href={`mailto:${SITE_CONFIG.author.email}`}>
              <Button variant="outline" className="gap-2">
                <Mail className="h-4 w-4" /> Email
              </Button>
            </a>
            <a href={SITE_CONFIG.author.github} target="_blank" rel="noopener noreferrer">
              <Button variant="outline" className="gap-2">
                <Github className="h-4 w-4" /> GitHub
              </Button>
            </a>
            <Link href="/contact">
              <Button variant="ghost">More ways to connect →</Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
