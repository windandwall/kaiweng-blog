import type { Metadata } from 'next';
import { Github, Mail, Linkedin, Twitter, MessageSquare, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { SITE_CONFIG } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Get in touch — email, GitHub, LinkedIn, or leave a message.',
  openGraph: {
    title: 'Contact — Kai Weng',
    description: 'Get in touch — email, GitHub, LinkedIn, or leave a message.',
  },
};

const contactMethods = [
  {
    title: 'Email',
    description: 'Direct and reliable. I typically respond within 24 hours.',
    icon: Mail,
    href: `mailto:${SITE_CONFIG.author.email}`,
    label: SITE_CONFIG.author.email,
    cta: 'Send email',
  },
  {
    title: 'GitHub',
    description: 'Open an issue or start a discussion on any of my projects.',
    icon: Github,
    href: SITE_CONFIG.author.github,
    label: 'github.com/kaiweng',
    cta: 'View GitHub',
  },
  {
    title: 'LinkedIn',
    description: 'Connect with me professionally and see my full experience.',
    icon: Linkedin,
    href: SITE_CONFIG.author.linkedin,
    label: 'linkedin.com/in/kaiweng',
    cta: 'Connect',
  },
  {
    title: 'Twitter',
    description: 'Follow me for updates on my work and chip design thoughts.',
    icon: Twitter,
    href: SITE_CONFIG.author.twitter,
    label: 'twitter.com/kaiweng',
    cta: 'Follow',
  },
];

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-5xl px-6 py-12 md:py-20 animate-fade-in">
      <div className="max-w-2xl mb-12">
        <h1 className="text-3xl font-bold tracking-tight mb-4">Contact</h1>
        <p className="text-muted-foreground leading-relaxed">
          Whether you have a question about chip design, want to collaborate on
          a project, or just want to say hi — feel free to reach out through
          any of the channels below.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 mb-16">
        {contactMethods.map((method) => (
          <Card key={method.title} className="p-6 group hover:border-foreground/20 transition-all duration-300">
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
          <h2 className="font-semibold text-sm">Looking for comments?</h2>
        </div>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Blog comments are powered by Giscus (GitHub Discussions). Head over to the{' '}
          <a href="/blog" className="underline underline-offset-4 hover:text-foreground">
            blog
          </a>{' '}
          to join the conversation, or open a discussion on{' '}
          <a
            href={SITE_CONFIG.author.github}
            target="_blank"
            rel="noopener noreferrer"
            className="underline underline-offset-4 hover:text-foreground"
          >
            GitHub
          </a>
          .
        </p>
      </div>
    </div>
  );
}
