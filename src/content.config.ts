import { z, defineCollection } from "astro:content";
import { glob } from "astro/loaders";

const postsCollection = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/posts" }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      pubDate: z.date(),
      description: z.string(),
      author: z.string(),
      image: z.object({
        url: image(),
        alt: z.string(),
        // Compression quality for the generated webp variants (default 90).
        // Grainy or photographic images can go lower to save bytes.
        quality: z.number().min(0).max(100).optional(),
      }),
      tags: z.array(z.string()),
    }),
});

export const collections = {
  posts: postsCollection,
};
