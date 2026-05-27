# Deployment Guide — Personal Tech Blog

## 1. Project Directory Structure

```
my_website/
├── app/
│   ├── layout.tsx                 # Root layout (metadata, theme, header, footer)
│   ├── page.tsx                   # Home page
│   ├── globals.css                # Global styles + CSS variables + dark mode
│   ├── not-found.tsx              # 404 page
│   ├── robots.ts                  # robots.txt generation
│   ├── sitemap.ts                 # sitemap.xml generation
│   ├── blog/
│   │   ├── page.tsx               # Blog list (server component)
│   │   ├── blog-list-client.tsx   # Blog list (client: search, filter, pagination)
│   │   └── [slug]/
│   │       └── page.tsx           # Blog post (MDX rendering, TOC, comments)
│   ├── about/
│   │   └── page.tsx               # About page
│   ├── projects/
│   │   └── page.tsx               # Projects page
│   ├── contact/
│   │   └── page.tsx               # Contact page
│   └── feed.xml/
│       └── route.ts               # RSS feed
├── components/
│   ├── layout/
│   │   ├── header.tsx             # Navigation + mobile menu
│   │   ├── footer.tsx             # Footer with social links
│   │   ├── theme-provider.tsx     # Dark mode provider
│   │   └── theme-toggle.tsx       # Dark/light toggle button
│   ├── ui/                        # shadcn/ui-style components
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── badge.tsx
│   │   ├── input.tsx
│   │   ├── separator.tsx
│   │   └── skeleton.tsx
│   ├── blog/
│   │   ├── blog-card.tsx          # Blog card for list views
│   │   ├── blog-list.tsx          # Blog list with search/filter/pagination
│   │   ├── toc.tsx                # Table of contents (intersection observer)
│   │   ├── search.tsx             # Blog search with ⌘K shortcut
│   │   ├── mdx-components.tsx     # Custom MDX component mapping
│   │   ├── mdx-content.tsx        # MDX runtime renderer
│   │   └── giscus.tsx             # Giscus comments integration
│   └── shared/
│       ├── scroll-to-top.tsx      # Scroll-to-top FAB
│       └── reading-progress.tsx   # Reading progress bar
├── content/
│   └── blog/                      # MDX blog posts
│       ├── cache-coherence-primer.mdx
│       ├── npu-systolic-array-design.mdx
│       ├── fpga-radar-signal-processing.mdx
│       └── riscv-o3-core-design.mdx
├── lib/
│   ├── utils.ts                   # cn(), formatDate(), estimateReadingTime()
│   ├── constants.ts               # Site config, tech stack, skills, education
│   └── blog.ts                    # getAllPosts, getPostBySlug, search, pagination
├── types/
│   └── index.ts                   # TypeScript type definitions
├── public/
│   └── images/                    # Static images (og-image, favicon, etc.)
├── next.config.mjs                # Next.js configuration
├── tailwind.config.ts             # Tailwind CSS configuration
├── tsconfig.json                  # TypeScript configuration
├── postcss.config.mjs             # PostCSS configuration
├── package.json                   # Dependencies and scripts
├── .gitignore
├── .env.example                   # Environment variables template
└── DEPLOYMENT.md                  # This file
```

## 2. Local Development Setup

### Prerequisites

- Node.js 18+ ([nodejs.org](https://nodejs.org))
- Git ([git-scm.com](https://git-scm.com))
- VS Code (recommended)

### Install and Run

```bash
# 1. Navigate to project directory
cd my_website

# 2. Install dependencies
npm install

# 3. Create environment file
cp .env.example .env.local

# 4. Edit .env.local with your configuration
# (At minimum, set NEXT_PUBLIC_SITE_URL)

# 5. Start dev server
npm run dev

# 6. Open http://localhost:3000
```

### Build for Production

```bash
npm run build
npm start
```

## 3. GitHub Repository Setup

### Step 1: Create Repository

1. Go to [github.com/new](https://github.com/new)
2. Repository name: `kaiweng-blog` (or your preferred name)
3. Description: "Personal technical blog about digital IC design and computer architecture"
4. Set to **Public** (required for Vercel free tier, recommended for personal blog)
5. Do NOT initialize with README (we already have our code)

### Step 2: Push Code

```bash
# Initialize git repository
git init

# Stage all files
git add .

# Create first commit
git commit -m "feat: initial blog site — Next.js + Tailwind + MDX"

# Add remote (replace with your repo URL)
git remote add origin https://github.com/YOUR_USERNAME/kaiweng-blog.git

# Push to GitHub
git branch -M main
git push -u origin main
```

## 4. Vercel Deployment

### Step 1: Import Project

1. Go to [vercel.com](https://vercel.com)
2. Sign up with GitHub
3. Click **"Add New..." → "Project"**
4. Select your `kaiweng-blog` repository
5. Click **"Import"**

### Step 2: Configure Project

**Framework Preset**: Next.js (auto-detected)

**Build and Output Settings** (auto-configured, no changes needed):
- Build Command: `npm run build`
- Output Directory: `.next`
- Install Command: `npm install`

**Environment Variables** (click "Environment Variables" dropdown):

| Key | Value |
|-----|-------|
| `NEXT_PUBLIC_SITE_URL` | `https://your-domain.com` |

Optional (for Giscus comments):
| `NEXT_PUBLIC_GISCUS_REPO` | `username/repo` |
| `NEXT_PUBLIC_GISCUS_REPO_ID` | (from giscus.app) |
| `NEXT_PUBLIC_GISCUS_CATEGORY` | `Announcements` |
| `NEXT_PUBLIC_GISCUS_CATEGORY_ID` | (from giscus.app) |

### Step 3: Deploy

Click **"Deploy"**. Vercel will:
1. Clone your repository
2. Install dependencies (`npm install`)
3. Build the project (`npm run build`)
4. Deploy to `https://your-project.vercel.app`

**Every `git push` to main will trigger automatic redeployment.**

## 5. Domain Name Guide

### Domain Name Recommendations

#### Style Options

**Engineer / Geek Style:**
- `kaiweng.dev` ✅ (recommended)
- `kaiweng.tech`
- `kaiweng.io`
- `wengkai.dev`

**Personal Brand Style:**
- `kaiweng.com` (may be taken)
- `wengkai.com`
- `kai-weng.com`

**Minimal / Abstract Style:**
- `silicon.design`
- `rtlcraft.dev`
- `chiplog.dev`
- `kaiwen.dev`

**My Top Recommendation: `kaiweng.dev`**
- Short, memorable
- `.dev` TLD is associated with developers
- Good for personal brand
- Usually available and affordable

### TLD Comparison

| TLD | Price/yr | Best For | Notes |
|-----|----------|----------|-------|
| `.com` | $10-15 | Universal | Hard to find short names |
| `.dev` | $12-20 | Developers | Google registry, requires HTTPS |
| `.tech` | $5-30 | Tech blogs | Promotional first year pricing |
| `.io` | $30-50 | Tech startups | Popular but expensive, ethical concerns |
| `.me` | $15-25 | Personal sites | Less professional for tech |

### Where to Buy

| Provider | .com | .dev | DNS | Best For |
|----------|------|------|-----|----------|
| **Cloudflare** | $9.77 | $12.18 | ⭐⭐⭐⭐⭐ | Best overall (at-cost pricing) |
| **Porkbun** | $10.37 | $12.53 | ⭐⭐⭐⭐ | Best value, great UI |
| **Namecheap** | $13.98 | $14.98 | ⭐⭐⭐⭐ | Good deals, reliable |
| **阿里云 (Aliyun)** | ¥55-69 | N/A | ⭐⭐⭐ | Best for China users |
| **腾讯云 (Tencent)** | ¥55-68 | N/A | ⭐⭐⭐ | Good for China users |

### My Recommendation: Cloudflare Registrar

**Why Cloudflare:**
1. **At-cost pricing** — Cloudflare sells domains at wholesale price (no markup)
2. **Free DNS** — Best-in-class DNS with free DDoS protection
3. **Free SSL** — Automatic SSL/TLS certificates
4. **Global CDN** — Content delivered from edge locations worldwide
5. **Works for China and international** — Decent China accessibility with CDN
6. **Simple management** — Clean, fast dashboard

**For Chinese users needing best domestic access:**
- Buy domain from 阿里云
- Use 阿里云 DNS for China traffic
- Set up Vercel with custom domain

## 6. Bind Domain to Vercel

### If using Cloudflare:

1. Buy domain at [dash.cloudflare.com](https://dash.cloudflare.com)
2. In Cloudflare dashboard → DNS → add records:
   ```
   Type: CNAME
   Name: @ (or your-domain.dev)
   Target: cname.vercel-dns.com
   Proxy: Yes (orange cloud)
   ```
3. In Vercel dashboard → your project → Settings → Domains
4. Add your domain: `kaiweng.dev`
5. Add www subdomain: `www.kaiweng.dev` (redirect to root)
6. Vercel will guide you through DNS verification

### HTTPS

HTTPS is **automatic** with Vercel. They provision and renew SSL certificates via Let's Encrypt. No configuration needed.

## 7. Environment Variables Setup

Copy `.env.example` to `.env.local` and configure:

```bash
# Required
NEXT_PUBLIC_SITE_URL=https://kaiweng.dev

# Giscus Comments (Optional)
# 1. Go to https://giscus.app
# 2. Select your GitHub repo
# 3. Choose "Discussions" category
# 4. Copy the values to your .env.local
NEXT_PUBLIC_GISCUS_REPO=kaiweng/kaiweng-blog
NEXT_PUBLIC_GISCUS_REPO_ID=MDEwOlJlcG9zaXRvcnkxMjM0NTY3ODk=
NEXT_PUBLIC_GISCUS_CATEGORY=Announcements
NEXT_PUBLIC_GISCUS_CATEGORY_ID=DIC_kwDOB4W9eM4Cah6A

# Analytics (Optional)
NEXT_PUBLIC_UMAMI_WEBSITE_ID=your-website-id
NEXT_PUBLIC_UMAMI_SRC=https://analytics.your-domain.com/script.js
```

For Vercel production, add these same variables in:
**Vercel Dashboard → Project → Settings → Environment Variables**

## 8. How to Update Your Blog

### Adding a New Blog Post

1. Create a new file: `content/blog/my-new-post.mdx`
2. Add frontmatter at the top:

```yaml
---
title: 'Your Post Title'
description: 'Brief description for SEO and previews'
date: '2025-06-15'
tags: ['Verilog', 'FPGA', 'Digital Design']
category: 'Hardware Design'
featured: false
---
```

3. Write your content in Markdown below the frontmatter
4. Commit and push:

```bash
git add content/blog/my-new-post.mdx
git commit -m "post: add article about XYZ"
git push
```

5. Vercel auto-deploys. Your post is live in ~60 seconds.

### Writing MDX

Your MDX files support:

- **Standard Markdown**: headings, lists, links, images, tables
- **Code blocks with syntax highlighting**:
  ````markdown
  ```verilog
  module counter(
    input clk,
    output reg [7:0] count
  );
    always @(posedge clk) count <= count + 1;
  endmodule
  ```
  ````

- **Math (LaTeX)**:
  ```markdown
  Inline: $E = mc^2$
  Block: $$f(x) = \int_{-\infty}^{\infty} \hat{f}(\xi) e^{2\pi i \xi x} d\xi$$
  ```

- **Mermaid diagrams**:
  ````markdown
  ```mermaid
  graph TD
    A[Fetch] --> B[Decode]
    B --> C[Execute]
    C --> D[Writeback]
  ```
  ````

- **Images**: `![Alt text](/images/diagram.png)`

## 9. SEO Optimization Explained

### What's Configured

| Feature | File | Purpose |
|---------|------|---------|
| **Metadata** | `app/layout.tsx` | Site-wide title, description, keywords |
| **OG Images** | `app/layout.tsx` | Social media preview cards |
| **Twitter Cards** | `app/layout.tsx` | Twitter link previews |
| **robots.txt** | `app/robots.ts` | Search engine crawling rules |
| **sitemap.xml** | `app/sitemap.ts` | All page URLs for search engines |
| **RSS Feed** | `app/feed.xml/route.ts` | RSS reader subscriptions |
| **Canonical URLs** | `app/blog/[slug]/page.tsx` | Prevent duplicate content |
| **Per-post metadata** | `app/blog/[slug]/page.tsx` | Dynamic OG tags per article |
| **JSON-LD** | — (recommended next step) | Structured data for rich results |

### SEO Best Practices Applied

1. **Semantic HTML**: Proper `<header>`, `<nav>`, `<main>`, `<article>`, `<footer>` tags
2. **Heading hierarchy**: One `<h1>` per page, proper `h2`/`h3` nesting
3. **Alt text**: Image components include `alt` attributes
4. **Responsive design**: Mobile-friendly (Google ranking factor)
5. **Fast loading**: Static generation, no client-side JS for content
6. **Clean URLs**: `/blog/slug-name` instead of query parameters
7. **Internal linking**: Cross-links between blog posts and pages

### After Deployment — Submit to Search Engines

1. **Google Search Console**: [search.google.com/search-console](https://search.google.com/search-console)
   - Add your domain property
   - Submit sitemap: `https://your-domain.com/sitemap.xml`

2. **Bing Webmaster**: [bing.com/webmasters](https://www.bing.com/webmasters)
   - Import from Google Search Console (one click)

3. **Baidu (百度)**: [ziyuan.baidu.com](https://ziyuan.baidu.com)
   - Required if targeting Chinese readers
   - Submit sitemap manually

## 10. Git Workflow Recommendations

### Branch Strategy

```
main          ← Production branch (deploys to Vercel)
  └── dev     ← Development branch (optional, for bigger changes)
       └── feature/*  ← Feature branches
       └── fix/*      ← Bug fix branches
       └── post/*     ← New blog post branches
```

### Commit Convention

Use [Conventional Commits](https://www.conventionalcommits.org):

```bash
# Adding a blog post
git commit -m "post: cache coherence protocols deep dive"

# Adding a feature
git commit -m "feat: add dark mode toggle"

# Fixing a bug
git commit -m "fix: mobile nav not closing on route change"

# Documentation
git commit -m "docs: update deployment guide"

# Styling
git commit -m "style: adjust code block padding"
```

### Daily Workflow

```bash
# 1. Pull latest changes
git pull origin main

# 2. Write your blog post or make changes
# ...

# 3. Stage and commit
git add .
git commit -m "post: new article about SystemVerilog assertions"

# 4. Push
git push origin main
```

## 11. Blog Writing Tips

### Content Structure

1. **Start with WHY**: Explain the problem before the solution
2. **Show code early**: Engineers scan for code blocks
3. **Use diagrams**: Mermaid for architecture diagrams
4. **Be specific**: "Achieved 2.1 IPC on SPEC CPU2017" > "good performance"
5. **Include references**: Link to papers, docs, and prior work
6. **One concept per post**: Don't try to cover everything

### Post Types

- **Deep Dive** (3000+ words): Comprehensive technical explanation
- **Quick Note** (500-1500 words): Solution to a specific problem
- **Project Walkthrough**: Step-by-step build guide
- **Literature Review**: Summary of papers on a topic
- **Tool Guide**: How to use a specific EDA tool

### SEO for Each Post

- Write a descriptive title: "RISC-V OoO Core Design" not "CPU Stuff"
- Write a compelling description (shown in Google results)
- Use tags that match search intent
- Link to previous related posts
- Add alt text to all images

## 12. Future Expansion Directions

### Short-term (next month)

- [ ] **Comment system**: Set up Giscus (see Environment Variables section)
- [ ] **Analytics**: Add Umami or Plausible for privacy-friendly analytics
- [ ] **Newsletter**: Add email subscription form (ConvertKit, Buttondown)
- [ ] **Search**: Add pagefind for full-text search across all posts

### Medium-term (3-6 months)

- [ ] **Project pages**: Dynamic project pages from MDX (like blog posts)
- [ ] **Tags pages**: Dedicated pages for each tag
- [ ] **Series**: Group related posts into learning series
- [ ] **Dark mode toggle persistence**: Already works, could add system preference
- [ ] **Reading list**: Curated list of papers/books with notes
- [ ] **Interactive demos**: WebAssembly-based hardware simulations

### Long-term (6-12 months)

- [ ] **Multi-language support**: English + Chinese (i18n)
- [ ] **Webmentions**: Decentralized social reactions
- [ ] **Digital garden**: Non-linear note-taking with bidirectional links
- [ ] **Code playground**: Interactive Verilog simulator in browser
- [ ] **E-book export**: Generate PDF/ePub from series of posts
- [ ] **Custom analytics dashboard**: Track what readers actually read

## 13. Troubleshooting

### Build Fails on Vercel

1. Check build logs in Vercel dashboard
2. Common issues:
   - Missing environment variable → add to Vercel project settings
   - TypeScript error → run `npm run build` locally first
   - Node version mismatch → Vercel uses Node 20.x by default (compatible)

### Images Not Loading

- Use Next.js `<Image>` component (from `next/image`) for optimized images
- Place images in `public/images/`
- Reference as `/images/filename.png`

### MDX Not Rendering

- Check frontmatter formatting (valid YAML between `---` delimiters)
- Check tag/category arrays: `['tag1', 'tag2']`
- Run `npm run dev` locally to see errors

### Domain Not Working

1. Wait for DNS propagation (up to 48 hours, usually 5-30 minutes)
2. Check DNS records at [dnschecker.org](https://dnschecker.org)
3. Verify Vercel domain settings show "Valid Configuration"
4. Ensure Cloudflare proxy (orange cloud) is enabled for CDN benefits
