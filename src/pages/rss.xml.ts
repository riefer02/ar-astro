import rss from "@astrojs/rss";
import { getSortedPosts } from "../lib/content";

export async function GET(context) {
  const posts = await getSortedPosts();

  return rss({
    title: "Andrew Riefenstahl — Writing & Musings",
    description:
      "Personal reflections on technology, life, music, philosophy, and the human experience.",
    site: context.site ?? "https://andrewriefenstahl.com",
    items: posts.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.pubDate,
      link: `/posts/${post.id}/`,
    })),
    customData: `<language>en-us</language>`,
  });
}
