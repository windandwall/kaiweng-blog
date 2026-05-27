import type { Metadata } from 'next';
import Link from 'next/link';
import { Github, Mail, Linkedin, Download, MapPin } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { SKILLS, EDUCATION, SITE_CONFIG } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'About',
  description: 'Digital IC design engineer focused on computer architecture and AI chip design.',
  openGraph: {
    title: 'About — Kai Weng',
    description: 'Digital IC design engineer focused on computer architecture and AI chip design.',
  },
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-5xl px-6 py-12 md:py-20 animate-fade-in">
      {/* Header */}
      <div className="max-w-2xl mb-16">
        <h1 className="text-3xl font-bold tracking-tight mb-4">About</h1>
        <p className="text-lg text-muted-foreground leading-relaxed">
          I&apos;m a digital IC design engineer passionate about pushing the
          boundaries of computer architecture and AI hardware. My work spans
          RTL design, verification, and physical implementation of high-performance
          chips.
        </p>
        <div className="flex flex-wrap items-center gap-2 mt-4 text-sm text-muted-foreground">
          <MapPin className="h-3.5 w-3.5" />
          <span>China</span>
        </div>
      </div>

      {/* Bio */}
      <section className="mb-16 max-w-2xl">
        <h2 className="text-xl font-semibold mb-4">Background</h2>
        <div className="space-y-4 text-muted-foreground leading-relaxed">
          <p>
            I started my journey in hardware design during undergrad, where I
            built my first RISC-V processor on an FPGA. Since then, I&apos;ve
            been diving deep into the world of chip design — from RTL coding
            in Verilog/SystemVerilog to synthesis, place-and-route, and
            tape-out.
          </p>
          <p>
            My current research focuses on NPU (Neural Processing Unit)
            architecture and AI accelerator design. I&apos;m particularly
            interested in the co-design of algorithms and hardware, exploring
            how novel compute paradigms can make AI inference more efficient.
          </p>
          <p>
            When I&apos;m not working on chips, I contribute to open-source
            hardware projects, write about my learnings, and explore new
            technologies in the semiconductor space.
          </p>
        </div>
      </section>

      <Separator className="mb-16" />

      {/* Skills */}
      <section className="mb-16">
        <h2 className="text-xl font-semibold mb-8">Skills & Expertise</h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
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

      {/* Education */}
      <section className="mb-16 max-w-2xl">
        <h2 className="text-xl font-semibold mb-8">Education</h2>
        <div className="space-y-6">
          {EDUCATION.map((edu) => (
            <div key={edu.degree} className="flex gap-4">
              <div className="mt-1 w-2 h-2 rounded-full bg-foreground/30 shrink-0" />
              <div>
                <h3 className="font-semibold">{edu.degree}</h3>
                <p className="text-sm text-muted-foreground">
                  {edu.school} &middot; {edu.period}
                </p>
                <p className="text-sm text-muted-foreground mt-1">
                  {edu.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <Separator className="mb-16" />

      {/* Connect */}
      <section className="max-w-2xl">
        <h2 className="text-xl font-semibold mb-6">Connect</h2>
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
          <a href={SITE_CONFIG.author.linkedin} target="_blank" rel="noopener noreferrer">
            <Button variant="outline" className="gap-2">
              <Linkedin className="h-4 w-4" /> LinkedIn
            </Button>
          </a>
          <Button variant="outline" className="gap-2" disabled>
            <Download className="h-4 w-4" /> Resume (PDF)
          </Button>
        </div>
      </section>
    </div>
  );
}
