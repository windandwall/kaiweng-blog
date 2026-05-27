'use client';

import { useMemo } from 'react';

interface Props {
  content: string;
}

export function BlogContent({ content }: Props) {
  return (
    <div className="prose prose-neutral dark:prose-invert max-w-none">
      <HeadingsFromRaw raw={content} />
    </div>
  );
}

// Simple raw MDX renderer that extracts and renders content
function HeadingsFromRaw({ raw }: { raw: string }) {
  const rendered = useMemo(() => {
    // Process the raw markdown content into HTML-like blocks
    // This is a simplified renderer that handles basic markdown
    let html = raw;

    // Code blocks with language
    html = html.replace(
      /```(\w+)?\n([\s\S]*?)```/g,
      (_match, lang, code) => {
        const langClass = lang ? ` class="language-${lang}"` : '';
        return `<pre><code${langClass}>${escapeHtml(code.trim())}</code></pre>`;
      }
    );

    // Inline code
    html = html.replace(/`([^`]+)`/g, '<code>$1</code>');

    // Headings with IDs
    html = html.replace(
      /^#### (.+)$/gm,
      (_m: string, text: string) =>
        `<h4 id="${slugify(text)}">${text}</h4>`
    );
    html = html.replace(
      /^### (.+)$/gm,
      (_m: string, text: string) =>
        `<h3 id="${slugify(text)}">${text}</h3>`
    );
    html = html.replace(
      /^## (.+)$/gm,
      (_m: string, text: string) =>
        `<h2 id="${slugify(text)}">${text}</h2>`
    );
    html = html.replace(
      /^# (.+)$/gm,
      (_m: string, text: string) =>
        `<h1 id="${slugify(text)}">${text}</h1>`
    );

    // Bold
    html = html.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
    // Italic
    html = html.replace(/\*(.+?)\*/g, '<em>$1</em>');
    // Links
    html = html.replace(
      /\[([^\]]+)\]\(([^)]+)\)/g,
      '<a href="$2">$1</a>'
    );
    // Images
    html = html.replace(
      /!\[([^\]]*)\]\(([^)]+)\)/g,
      '<img src="$2" alt="$1" loading="lazy" />'
    );
    // Horizontal rules
    html = html.replace(/^---$/gm, '<hr />');
    // Blockquotes
    html = html.replace(
      /^> (.+)$/gm,
      '<blockquote><p>$1</p></blockquote>'
    );
    // Unordered lists
    html = html.replace(/^- (.+)$/gm, '<li>$1</li>');
    html = html.replace(/(<li>.*<\/li>\n?)+/g, '<ul>$&</ul>');
    // Ordered lists
    html = html.replace(/^\d+\. (.+)$/gm, '<li>$1</li>');
    // Paragraphs: wrap non-tag lines
    html = html.replace(/^(?!<[a-zA-Z/!])(.+)$/gm, '<p>$1</p>');
    // Remove empty paragraphs
    html = html.replace(/<p>\s*<\/p>/g, '');

    return html;
  }, [raw]);

  return (
    <div
      className="prose prose-neutral dark:prose-invert max-w-none"
      dangerouslySetInnerHTML={{ __html: rendered }}
    />
  );
}

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}
