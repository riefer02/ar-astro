#!/usr/bin/env node
import fs from "fs/promises";
import path from "path";
import process from "process";
import { fileURLToPath } from "url";
import OpenAI from "openai";
import sharp from "sharp";
import "dotenv/config";

// --- CONFIG ---
// Generation size from the model (more detail; we'll downscale after)
const GENERATION_WIDTH = 1792;
const GENERATION_HEIGHT = 1024;
const IMAGE_SIZE = `${GENERATION_WIDTH}x${GENERATION_HEIGHT}`;

// Target OG dimensions and compression
const OG_WIDTH = 1200;
const OG_HEIGHT = 630;
const JPEG_QUALITY = 70; // aim for a few hundred KB
const IMAGE_DIR = path.join(process.cwd(), "src/assets/images");

// --- UTILS ---
function slugify(str) {
  return str
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
}

function extractFrontmatter(md) {
  const match = md.match(/^---([\s\S]*?)---/);
  if (!match) return {};
  const fm = {};
  match[1].split("\n").forEach((line) => {
    const m = line.match(/^([a-zA-Z0-9_]+):\s*["']?(.+?)["']?$/);
    if (m) fm[m[1]] = m[2];
  });
  return fm;
}

// --- MAIN ---
(async () => {
  const [, , postPath] = process.argv;
  if (!postPath) {
    console.error("Usage: node generate-og-image.js <path-to-post.md>");
    process.exit(1);
  }

  const absPostPath = path.resolve(postPath);
  const md = await fs.readFile(absPostPath, "utf8");
  const frontmatter = extractFrontmatter(md);
  const title = frontmatter.title || path.basename(postPath, ".md");
  const description = frontmatter.description || "";
  const slug = slugify(title);

  // Compose prompt for OpenAI image generation
  const prompt = `Create a visually striking, web-optimized Open Graph image for a blog post titled: "${title}".\n\nDescription: ${description}\n\nThe image should be suitable for social sharing and visually represent the themes and concepts from the blog post. Include a cute Shih Tzu dog somewhere in the composition as a central visual element. Avoid text in the image. Use vibrant, inviting colors and a modern, clean style. Optimize for clarity and impact at small sizes. Do not include any human faces or copyrighted content.`;

  // OpenAI API setup
  const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

  // Generate image
  let imageUrl;
  try {
    const response = await openai.images.generate({
      prompt,
      model: "dall-e-3",
      n: 1,
      size: IMAGE_SIZE,
      response_format: "url",
    });
    imageUrl = response.data[0].url;
  } catch (err) {
    console.error("OpenAI image generation failed:", err);
    process.exit(1);
  }

  // Download image
  const outPath = path.join(IMAGE_DIR, `${slug}-og.jpg`);
  const res = await fetch(imageUrl);
  if (!res.ok) {
    console.error("Failed to download generated image:", res.statusText);
    process.exit(1);
  }
  const originalBuffer = Buffer.from(await res.arrayBuffer());

  // Optimize: resize to OG size and compress JPEG
  let optimizedBuffer;
  try {
    optimizedBuffer = await sharp(originalBuffer)
      .resize(OG_WIDTH, OG_HEIGHT, { fit: "cover", position: "attention" })
      .jpeg({
        quality: JPEG_QUALITY,
        progressive: true,
        mozjpeg: true,
        chromaSubsampling: "4:2:0",
      })
      .toBuffer();
  } catch (e) {
    console.error("Image optimization failed, writing original buffer:", e);
    optimizedBuffer = originalBuffer;
  }

  await fs.writeFile(outPath, optimizedBuffer);

  const kb = (optimizedBuffer.length / 1024).toFixed(0);
  console.log(`OG image saved to: ${outPath} (${kb} KB)`);

  // TODO: Add background image generation logic here
})();
