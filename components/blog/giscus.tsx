'use client';

import { useEffect, useRef } from 'react';
import { useTheme } from 'next-themes';

export function GiscusComments() {
  const ref = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();

  const repo = process.env.NEXT_PUBLIC_GISCUS_REPO;
  const repoId = process.env.NEXT_PUBLIC_GISCUS_REPO_ID;
  const category = process.env.NEXT_PUBLIC_GISCUS_CATEGORY;
  const categoryId = process.env.NEXT_PUBLIC_GISCUS_CATEGORY_ID;

  useEffect(() => {
    if (!repo || !repoId || !category || !categoryId) return;

    const script = document.createElement('script');
    script.src = 'https://giscus.app/client.js';
    script.setAttribute('data-repo', repo);
    script.setAttribute('data-repo-id', repoId);
    script.setAttribute('data-category', category);
    script.setAttribute('data-category-id', categoryId);
    script.setAttribute('data-mapping', 'pathname');
    script.setAttribute('data-strict', '0');
    script.setAttribute('data-reactions-enabled', '1');
    script.setAttribute('data-emit-metadata', '0');
    script.setAttribute('data-input-position', 'top');
    script.setAttribute('data-theme', theme === 'dark' ? 'dark_dimmed' : 'light');
    script.setAttribute('data-lang', 'en');
    script.setAttribute('crossorigin', 'anonymous');
    script.async = true;

    if (ref.current) {
      ref.current.innerHTML = '';
      ref.current.appendChild(script);
    }
  }, [theme, repo, repoId, category, categoryId]);

  if (!repo) {
    return (
      <div className="mt-12 p-8 border border-border rounded-xl text-center">
        <p className="text-sm text-muted-foreground">
          Comments are not configured yet.
          <br />
          Set <code className="bg-muted px-1 rounded">NEXT_PUBLIC_GISCUS_*</code> environment variables to enable Giscus.
        </p>
      </div>
    );
  }

  return <div ref={ref} className="mt-12" />;
}
