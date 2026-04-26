#!/usr/bin/env node
import fs from "fs/promises";
import path from "path";
import process from "process";
import OpenAI from "openai";
import "dotenv/config";

const ROOT_DIR = process.cwd();
const DEFAULT_MODEL = "gpt-image-1";
const DEFAULT_OUTPUT_DIR = path.join(ROOT_DIR, "src/assets/images");
const DEFAULT_GPT_IMAGE_SIZE = "1536x1024";
const DEFAULT_DALLE_SIZE = "1792x1024";

const BRAND = {
  siteName: "Andrew Riefenstahl",
  siteUrl: "andrewriefenstahl.com",
  voice: [
    "thoughtful editorial illustration",
    "slightly strange but grounded",
    "human-centered technology",
    "smart, moody, contemporary",
    "clean composition that still feels warm",
  ],
  palette: [
    { name: "dust-grey", hex: "#dad7cd" },
    { name: "dry-sage", hex: "#a3b18a" },
    { name: "fern", hex: "#588157" },
    { name: "hunter-green", hex: "#3a5a40" },
    { name: "pine-teal", hex: "#344e41" },
  ],
  surfaces: [
    "deep forest background tones",
    "subtle mossy gradients",
    "earthy contrast",
    "soft atmospheric lighting",
  ],
  motifs: [
    "subtly hide a Shih Tzu as an easter egg somewhere in the composition",
    "the Shih Tzu should not dominate the frame",
    "avoid cartoon mascot energy unless the post itself is playful",
  ],
  avoid: [
    "no visible text",
    "no logos",
    "no watermark",
    "no UI chrome",
    "no code snippets rendered as text",
    "no generic corporate AI slop",
    "no stock-photo feel",
    "no direct copyrighted character references",
  ],
};

function printUsage() {
  console.error(`
Usage:
  node scripts/generate-blog-image.js <path-to-post.md>
  node scripts/generate-blog-image.js <path-to-post.md> --output <path>
  node scripts/generate-blog-image.js <path-to-post.md> --dry-run
  node scripts/generate-blog-image.js <path-to-post.md> --prompt-only

Options:
  --output <path>   Write the generated image to a specific path
  --model <name>    Image model to use (default: ${DEFAULT_MODEL})
  --dry-run         Print prompt and resolved output path without calling the API
  --prompt-only     Print the prompt only and exit
`);
}

function parseArgs(argv) {
  let postPath = "";
  let outputPath = "";
  let model = DEFAULT_MODEL;
  let dryRun = false;
  let promptOnly = false;

  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];

    if (arg === "--") {
      continue;
    }

    if (arg === "--help" || arg === "-h") {
      printUsage();
      process.exit(0);
    }

    if (arg === "--output") {
      outputPath = argv[index + 1] || "";
      index += 1;
      continue;
    }

    if (arg === "--model") {
      model = argv[index + 1] || DEFAULT_MODEL;
      index += 1;
      continue;
    }

    if (arg === "--dry-run") {
      dryRun = true;
      continue;
    }

    if (arg === "--prompt-only") {
      promptOnly = true;
      continue;
    }

    if (!postPath) {
      postPath = arg;
      continue;
    }
  }

  if (!postPath) {
    printUsage();
    process.exit(1);
  }

  return { postPath, outputPath, model, dryRun, promptOnly };
}

function slugify(value) {
  return String(value)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
}

function stripMarkdown(value) {
  return String(value)
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/`([^`]+)`/g, "$1")
    .replace(/!\[([^\]]*)\]\([^)]+\)/g, "$1")
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replace(/^#{1,6}\s+/gm, "")
    .replace(/[*_~>-]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function parseFrontmatterBlock(markdown) {
  const match = markdown.match(/^---\s*([\s\S]*?)\s*---/);
  return match ? match[1] : "";
}

function parseBody(markdown) {
  const match = markdown.match(/^---\s*[\s\S]*?\s*---\s*([\s\S]*)$/);
  return match ? match[1].trim() : markdown.trim();
}

function extractScalar(frontmatter, key) {
  const regex = new RegExp(`^${key}:\\s*(.+)$`, "m");
  const match = frontmatter.match(regex);
  if (!match) return "";
  return match[1].trim().replace(/^["']|["']$/g, "");
}

function extractNestedScalar(frontmatter, parentKey, childKey) {
  const regex = new RegExp(`${parentKey}:\\s*\\n(?:\\s+.*\\n)*?\\s+${childKey}:\\s*(.+)$`, "m");
  const match = frontmatter.match(regex);
  if (!match) return "";
  return match[1].trim().replace(/^["']|["']$/g, "");
}

function extractTags(frontmatter) {
  const inlineMatch = frontmatter.match(/^tags:\s*\[(.*?)\]\s*$/m);
  if (inlineMatch) {
    return inlineMatch[1]
      .split(",")
      .map((tag) => tag.replace(/["']/g, "").trim())
      .filter(Boolean);
  }

  const blockMatch = frontmatter.match(/tags:\s*\[([\s\S]*?)\]/m);
  if (!blockMatch) return [];

  return blockMatch[1]
    .split(",")
    .map((tag) => tag.replace(/["'\n\r]/g, "").trim())
    .filter(Boolean);
}

function resolveAssetPath(imageUrl, fallbackSlug, outputOverride) {
  if (outputOverride) {
    return path.resolve(ROOT_DIR, outputOverride);
  }

  if (!imageUrl) {
    return path.join(DEFAULT_OUTPUT_DIR, `${fallbackSlug}-og.jpg`);
  }

  const normalized = imageUrl
    .replace(/^@\/assets\//, "src/assets/")
    .replace(/^\.\.\/\.\.\/assets\//, "src/assets/");

  return path.resolve(ROOT_DIR, normalized);
}

function truncate(value, maxChars) {
  if (value.length <= maxChars) return value;
  return `${value.slice(0, Math.max(0, maxChars - 1)).trimEnd()}…`;
}

function buildPrompt(metadata) {
  const paletteSummary = BRAND.palette
    .map((entry) => `${entry.name} ${entry.hex}`)
    .join(", ");

  const bodyExcerpt = truncate(stripMarkdown(metadata.body), 2400);
  const tags = metadata.tags.length > 0 ? metadata.tags.join(", ") : "none";
  const altHint = metadata.imageAlt || "not provided";

  return [
    `Create a custom landscape blog image for ${BRAND.siteName} (${BRAND.siteUrl}).`,
    "",
    "Post metadata:",
    `- Title: ${metadata.title}`,
    `- Description: ${metadata.description || "none"}`,
    `- Author: ${metadata.author || "Andrew Riefenstahl"}`,
    `- Publish date: ${metadata.pubDate || "unknown"}`,
    `- Tags: ${tags}`,
    `- Existing alt hint: ${altHint}`,
    "",
    "Article excerpt for thematic context:",
    bodyExcerpt || "No article body was available.",
    "",
    "Art direction:",
    `- Use a ${BRAND.voice.join(", ")} visual language.`,
    `- Use the site's forest palette: ${paletteSummary}.`,
    `- Build around ${BRAND.surfaces.join(", ")}.`,
    `- ${BRAND.motifs.join("; ")}.`,
    "- The image should feel like a premium editorial header illustration for a personal blog by a software engineer, writer, and musician.",
    "- Composition should read clearly on the web and at smaller thumbnail sizes.",
    "- Prefer symbolic or scene-based storytelling over literal text poster design.",
    "- If the topic is technical, imply the ideas visually without brand logos or product screenshots.",
    `- ${BRAND.avoid.join("; ")}.`,
  ].join("\n");
}

async function ensureDir(filePath) {
  await fs.mkdir(path.dirname(filePath), { recursive: true });
}

async function downloadUrl(url) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to download generated image: ${response.status} ${response.statusText}`);
  }
  return Buffer.from(await response.arrayBuffer());
}

async function generateImage(client, prompt, model) {
  const isGptImage = model === "gpt-image-1";

  const response = await client.images.generate({
    prompt,
    model,
    n: 1,
    ...(isGptImage
      ? {
          background: "opaque",
          moderation: "low",
          output_compression: 92,
          output_format: "jpeg",
          quality: "high",
          size: DEFAULT_GPT_IMAGE_SIZE,
        }
      : {
          quality: "hd",
          response_format: "url",
          size: DEFAULT_DALLE_SIZE,
          style: "natural",
        }),
  });

  const image = response.data?.[0];
  if (!image) {
    throw new Error("Image API returned no image data.");
  }

  if (image.b64_json) {
    return {
      buffer: Buffer.from(image.b64_json, "base64"),
      revisedPrompt: image.revised_prompt || "",
    };
  }

  if (image.url) {
    return {
      buffer: await downloadUrl(image.url),
      revisedPrompt: image.revised_prompt || "",
    };
  }

  throw new Error("Image API response did not include b64_json or url.");
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  const absolutePostPath = path.resolve(ROOT_DIR, args.postPath);
  const markdown = await fs.readFile(absolutePostPath, "utf8");
  const frontmatter = parseFrontmatterBlock(markdown);
  const body = parseBody(markdown);

  const title = extractScalar(frontmatter, "title") || path.basename(args.postPath, ".md");
  const description = extractScalar(frontmatter, "description");
  const author = extractScalar(frontmatter, "author");
  const pubDate = extractScalar(frontmatter, "pubDate");
  const imageUrl = extractNestedScalar(frontmatter, "image", "url");
  const imageAlt = extractNestedScalar(frontmatter, "image", "alt");
  const tags = extractTags(frontmatter);

  const slug = slugify(title);
  const outputPath = resolveAssetPath(imageUrl, slug, args.outputPath);

  const metadata = {
    title,
    description,
    author,
    pubDate,
    imageAlt,
    tags,
    body,
  };

  const prompt = buildPrompt(metadata);

  if (args.promptOnly) {
    console.log(prompt);
    return;
  }

  if (args.dryRun) {
    console.log(`Post: ${absolutePostPath}`);
    console.log(`Output: ${outputPath}`);
    console.log(`Model: ${args.model}`);
    console.log("");
    console.log(prompt);
    return;
  }

  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    throw new Error("OPENAI_API_KEY is not set. Add it to your environment before generating blog images.");
  }

  const client = new OpenAI({ apiKey });
  const { buffer, revisedPrompt } = await generateImage(client, prompt, args.model);

  await ensureDir(outputPath);
  await fs.writeFile(outputPath, buffer);

  console.log(`Blog image written to ${outputPath}`);
  if (revisedPrompt) {
    console.log("");
    console.log("Revised prompt:");
    console.log(revisedPrompt);
  }
}

main().catch((error) => {
  console.error("Failed to generate blog image:", error);
  process.exit(1);
});
