# Blog Authoring

This repo uses Astro content collections for blog posts in `src/content/posts/*.md`.

## Voice Preservation Rule

When turning notes, voice memos, dictation, transcripts, or "stream of thought" content into a post:

- Preserve the author's grammar, syntax, pronouns, cadence, and rough structure by default.
- Prefer minimal cleanup for readability.
- Do not automatically rewrite into a more polished essay.
- Keep first-person voice and informal transitions when they are part of the point.
- Only do a heavier rewrite when the author explicitly asks for one.

## Post Workflow

1. Add a Markdown file in `src/content/posts/`.
2. Include required frontmatter:
   - `title`
   - `pubDate`
   - `description`
   - `author`
   - `image.url`
   - `image.alt`
   - `tags`
3. Use an image from `src/assets/images/`.
4. Generate new blog art with `pnpm generate:blog-image -- <path-to-post.md>`.
5. The blog image generator uses post metadata and article context, follows the forest-green brand palette, and subtly hides a Shih Tzu as a recurring motif when it fits.
6. `pnpm generate:og -- <path-to-post.md>` is the legacy/local OG card tool and should not be the default workflow for new blog images.
7. Run `pnpm build` to verify content schema, routes, images, and Pagefind indexing.

## Image Workflow

- Default: `pnpm generate:blog-image -- <path-to-post.md>`
- Legacy: `pnpm generate:og -- <path-to-post.md>`
- The blog image prompt should reflect the article's title, description, tags, body themes, site palette, and the subtle Shih Tzu easter egg.

## URL Convention

- The post URL slug comes from the filename.
- `pubDate` controls ordering, but the filename controls the route.
- Dated filenames are preferred for new posts to keep chronology and URLs aligned.
