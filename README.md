# Andrew Riefenstahl — Personal Site

Personal website, blog, and portfolio at [andrewriefenstahl.com](https://andrewriefenstahl.com).

Built with **Astro 5** + **Tailwind CSS** + **shadcn/ui** (New York variant), deployed to Netlify.

## Commands

```sh
pnpm install
pnpm dev          # Dev server at localhost:4321
pnpm build        # Production build to ./dist (also builds Pagefind search index)
pnpm preview      # Preview production build locally
```

## Blog art

```sh
pnpm generate:blog-image -- <path-to-post.md>          # Generate blog art (default workflow)
pnpm generate:blog-image -- <path> --prompt-only       # Inspect the prompt without calling the API
pnpm generate:blog-image -- <path> --scene "<desc>"    # Inject scene direction
pnpm generate:og -- <path-to-post.md>                  # Legacy local OG card tool
```

## Structure

```
src/
├── components/   # Astro (.astro) and React islands (.tsx)
├── content/posts # Blog posts (markdown, Zod-validated frontmatter)
├── layouts/      # Layout.astro (shell) + MarkdownPostLayout.astro (posts)
├── lib/          # content helpers, key-projects.json, professional-skills.json
└── pages/        # File-based routes (index, services, posts, games, rss)
```

## Content

- Blog posts live in `src/content/posts/*.md` with frontmatter validated in `src/content.config.ts`.
- Post images live in `src/assets/images/`.
- Homepage project/stack data lives in `src/lib/key-projects.json` and `src/lib/professional-skills.json`.

## Authoring

- Agent guidance: `AGENTS.md`
- Blog authoring workflow: `docs/blog-authoring.md`
- Theme tokens: `src/styles/globals.css` (see `docs/theme-system.md`)
