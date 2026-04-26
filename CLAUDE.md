# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
pnpm dev          # Dev server at localhost:4321
pnpm build        # Production build to ./dist/ (also builds Pagefind search index)
pnpm preview      # Preview production build locally
pnpm generate:blog-image -- <path-to-post.md>  # Default blog image generator from post metadata and body context
pnpm generate:og -- <path-to-post.md>  # Legacy local OG card generator
pnpm generate:og:site                  # Regenerate the default site-wide OG image
```

No test runner or linter is configured. Prettier with `prettier-plugin-tailwindcss` handles formatting.

## Architecture

**Astro 5 static site** with React islands, deployed to Netlify. The site is Andrew Riefenstahl's personal portfolio and blog at andrewriefenstahl.com.

### Rendering Model

Astro components (`.astro`) render static HTML at build time. React components (`.tsx`) become interactive islands via `client:load`. The page shell, layouts, and content-heavy components are Astro; interactive UI (navigation, toasts, share button, search) is React.

### Routing

File-based routing in `src/pages/`:
- `index.astro` — Homepage
- `posts/[...page].astro` — Paginated blog listing (6 per page, uses `getStaticPaths`)
- `posts/[...slug].astro` — Individual blog posts from content collection
- `games/dragon-quest.astro` — Game page

### Content System

Blog posts live in `src/content/posts/*.md` with frontmatter validated by Zod schema in `src/content/config.ts`. The schema requires: `title`, `pubDate` (Date), `description`, `author`, `image` (object with `url` using Astro's `image()` helper and `alt`), and `tags` (string array). Post images go in `src/assets/images/`.

Static data for the homepage (projects, skills) is in `src/lib/key-projects.json` and `src/lib/professional-skills.json`.

### Blog Drafting Rule

When drafting blog posts from user-provided notes, dictation, transcripts, or "stream of thought" content, preserve the author's grammar, syntax, pronouns, cadence, and rough structure by default. Light cleanup for readability is fine, but do **not** rewrite into a more polished essay unless the user explicitly asks for that. Voice preservation is the default requirement.

### Blog Image Rule

Use `pnpm generate:blog-image` as the default workflow for blog art. The generator should use post metadata and article context, follow the site's forest palette, and subtly hide a Shih Tzu as a recurring motif when it fits the composition. `pnpm generate:og` is the legacy local OG card generator and should not be the default for new blog images.

### Styling

Tailwind CSS with the **Stone** color palette as the primary design language. Uses shadcn/ui (New York variant) — components live in `src/components/ui/`. The `cn()` utility from `src/lib/utils.ts` merges Tailwind classes. Dark mode is configured (class-based) but not actively used. CSS custom properties define the design tokens in `src/styles/globals.css`.

### Search

Pagefind integration via `astro-pagefind`. The search index is only built during `pnpm build`, so search shows a fallback message in dev mode. Blog posts use `data-pagefind-body` and `data-pagefind-meta` attributes for indexing.

### Path Aliases

`@/*` maps to `./src/*` (configured in tsconfig.json).

### Key Patterns

- Navigation: `DesktopNav.tsx` and `MobileNav.tsx` are React components (MobileNav uses Radix Sheet)
- Layouts: `Layout.astro` (base) and `MarkdownPostLayout.astro` (blog posts)
- Blog post pages compute reading time, show prev/next navigation, related posts by tags, and a share button
- `scripts/generate-blog-image.js` is the default blog-art generator
- A local Sharp-based OG renderer exists for legacy/site OG use, but it is not the default workflow for new blog art
