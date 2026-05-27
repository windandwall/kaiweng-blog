# Claude Code Instructions — Tech Blog

## Build & Development

```bash
npm install        # Install dependencies
npm run dev        # Start dev server (http://localhost:3000)
npm run build      # Production build
npm start          # Start production server
npm run lint       # Run ESLint
```

## Project Architecture

- **Framework**: Next.js 14 App Router (React Server Components)
- **Styling**: Tailwind CSS with CSS variables for dark mode
- **Content**: MDX files in `content/blog/` with frontmatter parsing
- **Components**: Server components by default, client components only where interactive
- **No external CMS**: Blog content is file-based MDX

## Key Patterns

### Layout
- Root layout (`app/layout.tsx`): metadata, theme provider, header, footer
- All pages wrapped in `ThemeProvider` with `defaultTheme="dark"`
- Sticky header with animated active nav indicator (framer-motion `layoutId`)

### Blog System
- `lib/blog.ts`: reads MDX from `content/blog/`, parses YAML frontmatter
- Blog list: server component passes data to client component for filtering/search
- Blog post: server component generates metadata, client component renders MDX
- TOC: uses IntersectionObserver for active heading tracking

### Dark Mode
- `next-themes` with `class` strategy
- CSS variables in `app/globals.css` for light/dark themes
- Tokyo Night Dark theme for code blocks

### UI Components
- shadcn/ui pattern: CVA variants, cn() utility, forwardRef
- All components accept className for Tailwind overrides

## File Structure

- `app/` — Next.js App Router pages and API routes
- `components/` — React components organized by domain
- `lib/` — Utility functions (no React)
- `content/blog/` — MDX blog posts
- `types/` — TypeScript type definitions

## Adding a Blog Post

Create `content/blog/post-slug.mdx`:

```mdx
---
title: 'Post Title'
description: 'SEO description'
date: '2025-06-15'
tags: ['Verilog', 'FPGA']
category: 'Hardware Design'
featured: false
---

Content here...
```

## Customization Points

- `lib/constants.ts` — site name, author info, nav links, tech stack, skills, education
- `app/globals.css` — color scheme (CSS variables), typography, code theme
- `tailwind.config.ts` — theme extension, animations, font families
- `components/blog/mdx-components.tsx` — MDX component overrides
