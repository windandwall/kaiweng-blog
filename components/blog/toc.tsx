'use client';

import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import type { TocEntry } from '@/types';

export function TableOfContents() {
  const [headings, setHeadings] = useState<TocEntry[]>([]);
  const [activeId, setActiveId] = useState<string>('');

  useEffect(() => {
    const elements = Array.from(document.querySelectorAll('article h2, article h3'));
    const items: TocEntry[] = elements.map((el) => ({
      id: el.id,
      text: el.textContent || '',
      level: Number(el.tagName[1]),
    }));
    setHeadings(items);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: '-80px 0% -80% 0%' }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  if (headings.length < 2) return null;

  return (
    <nav className="text-sm">
      <h4 className="font-semibold mb-3 text-xs uppercase tracking-wider text-muted-foreground">
        On this page
      </h4>
      <ul className="space-y-1.5 border-l border-border pl-3">
        {headings.map((heading) => (
          <li key={heading.id}>
            <a
              href={`#${heading.id}`}
              className={cn(
                'block py-0.5 text-muted-foreground hover:text-foreground transition-colors',
                heading.level === 3 && 'pl-3 text-xs',
                activeId === heading.id && 'text-foreground font-medium border-l-2 border-foreground -ml-[13px] pl-3'
              )}
            >
              {heading.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
