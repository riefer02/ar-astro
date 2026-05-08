import { getCollection, type CollectionEntry } from "astro:content";

type PostEntry = CollectionEntry<"posts">;

export async function getSortedPosts(): Promise<PostEntry[]> {
  const entries = await getCollection("posts");
  return entries.sort(
    (a, b) =>
      new Date(b.data.pubDate).getTime() - new Date(a.data.pubDate).getTime(),
  );
}
