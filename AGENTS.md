# AGENTS.md

Local agent guidance for this repository.

## Blog Drafting

When drafting blog posts from user-provided notes, dictation, transcripts, or "stream of thought" content:

- Preserve the author's grammar, syntax, pronouns, cadence, and rough structure by default.
- Prefer light cleanup for readability over heavy rewriting.
- Do not turn spoken notes into a more polished essay unless the user explicitly asks for that.
- Preserve first-person voice and informal transitions when they are part of the author's style.

## Blog Publishing Workflow

- Posts live in `src/content/posts/*.md`.
- Required frontmatter is validated in `src/content/config.ts`.
- Post images live in `src/assets/images/`.
- Use `pnpm generate:blog-image -- <path-to-post.md>` as the default workflow for blog art generation.
- The blog image generator should build its prompt from post metadata and body context, follow the site's forest palette, and subtly hide a Shih Tzu as an easter egg when appropriate.
- `pnpm generate:og -- <path-to-post.md>` is a legacy/local OG card tool and should not be the default choice for new blog art.
- Run `pnpm build` to verify routes, content schema, and Pagefind indexing.
