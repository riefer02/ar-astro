#!/usr/bin/env node
import fs from "fs/promises";
import path from "path";
import process from "process";
import sharp from "sharp";

const OG_WIDTH = 1200;
const OG_HEIGHT = 630;
const JPEG_QUALITY = 84;

const ROOT_DIR = process.cwd();
const DEFAULT_SITE_OUTPUT = path.join(
  ROOT_DIR,
  "src/assets/ar-ogimage-optimized.jpg",
);
const DEFAULT_POST_OUTPUT_DIR = path.join(ROOT_DIR, "src/assets/images");

const BRAND = {
  siteName: "Andrew Riefenstahl",
  siteUrl: "andrewriefenstahl.com",
  siteEyebrow: "Senior Software Engineer • AI Specialist • Writer",
  siteTitle: "Forging the Future of Digital Intelligence",
  siteDescription:
    "Resilient systems, thoughtful architecture, and human-centered work at the edge of software and AI.",
  palette: {
    background: "#0f1f19",
    backgroundDeep: "#122820",
    panel: "#173126",
    panelBorder: "#385b4f",
    accent: "#4f7a63",
    accentSoft: "#7f9f8c",
    glow: "#a4c67f",
    text: "#f2ebdc",
    muted: "#c0c8bb",
    mutedSoft: "#91a596",
    line: "#28453a",
  },
};

function printUsage() {
  console.error(`
Usage:
  node scripts/generate-og-image.js --site
  node scripts/generate-og-image.js <path-to-post.md>
  node scripts/generate-og-image.js <path-to-post.md> --output <path>
`);
}

function slugify(value) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
}

function escapeXml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function stripMarkdown(value) {
  return String(value)
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/`([^`]+)`/g, "$1")
    .replace(/!\[([^\]]*)\]\([^)]+\)/g, "$1")
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replace(/[*_~>#-]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function extractScalar(frontmatter, key) {
  const regex = new RegExp(`^${key}:\\s*(.+)$`, "m");
  const match = frontmatter.match(regex);
  if (!match) return "";

  return match[1].trim().replace(/^["']|["']$/g, "");
}

function extractTags(frontmatter) {
  const match = frontmatter.match(/tags:\s*\[([\s\S]*?)\]/m);
  if (!match) return [];

  return match[1]
    .split(",")
    .map((tag) => tag.replace(/["'\n\r]/g, "").trim())
    .filter(Boolean);
}

function extractImageUrl(frontmatter) {
  const match = frontmatter.match(/image:\s*\n\s*url:\s*(.+)$/m);
  if (!match) return "";
  return match[1].trim().replace(/^["']|["']$/g, "");
}

function parseFrontmatterBlock(markdown) {
  const match = markdown.match(/^---\s*([\s\S]*?)\s*---/);
  return match ? match[1] : "";
}

function resolveAssetPath(imageUrl, fallbackSlug) {
  if (!imageUrl) {
    return path.join(DEFAULT_POST_OUTPUT_DIR, `${fallbackSlug}-og.jpg`);
  }

  const normalized = imageUrl
    .replace(/^@\/assets\//, "src/assets/")
    .replace(/^\.\.\/\.\.\/assets\//, "src/assets/");

  return path.resolve(ROOT_DIR, normalized);
}

function ellipsize(text, maxChars) {
  const clean = stripMarkdown(text);
  if (clean.length <= maxChars) return clean;
  return `${clean.slice(0, Math.max(0, maxChars - 1)).trimEnd()}…`;
}

function wrapText(text, maxCharsPerLine, maxLines) {
  const words = stripMarkdown(text).split(/\s+/).filter(Boolean);
  const lines = [];
  let currentLine = "";

  for (let index = 0; index < words.length; index += 1) {
    const word = words[index];
    const candidate = currentLine ? `${currentLine} ${word}` : word;
    if (candidate.length <= maxCharsPerLine) {
      currentLine = candidate;
      continue;
    }

    if (currentLine) {
      lines.push(currentLine);
    }

    if (lines.length === maxLines - 1) {
      const remaining = [word, ...words.slice(index + 1)].join(" ");
      lines.push(ellipsize(remaining, maxCharsPerLine));
      return lines;
    }

    currentLine = word;
  }

  if (currentLine) {
    lines.push(currentLine);
  }

  return lines.slice(0, maxLines);
}

function getTitleLayout(title, variant) {
  const length = title.length;

  if (variant === "site") {
    return {
      fontSize: 68,
      lineHeight: 1.08,
      maxCharsPerLine: 20,
      maxLines: 3,
    };
  }

  if (length > 88) {
    return {
      fontSize: 48,
      lineHeight: 1.12,
      maxCharsPerLine: 24,
      maxLines: 4,
    };
  }

  if (length > 62) {
    return {
      fontSize: 56,
      lineHeight: 1.1,
      maxCharsPerLine: 22,
      maxLines: 4,
    };
  }

  if (length > 38) {
    return {
      fontSize: 64,
      lineHeight: 1.08,
      maxCharsPerLine: 20,
      maxLines: 3,
    };
  }

  return {
    fontSize: 74,
    lineHeight: 1.04,
    maxCharsPerLine: 18,
    maxLines: 3,
  };
}

function buildBadge(label, x, y, scale = 1) {
  const paddingX = 18 * scale;
  const paddingY = 10 * scale;
  const fontSize = 16 * scale;
  const width = label.length * (fontSize * 0.62) + paddingX * 2;
  const height = fontSize + paddingY * 2;

  return `
    <g transform="translate(${x} ${y})">
      <rect width="${width}" height="${height}" rx="${height / 2}" fill="rgba(18,40,32,0.78)" stroke="${BRAND.palette.panelBorder}" stroke-width="1.5" />
      <text
        x="${width / 2}"
        y="${height / 2 + fontSize * 0.34}"
        fill="${BRAND.palette.text}"
        font-size="${fontSize}"
        font-family="Avenir Next, Inter, Helvetica Neue, Arial, sans-serif"
        font-weight="600"
        text-anchor="middle"
        letter-spacing="0.4"
      >
        ${escapeXml(label)}
      </text>
    </g>
  `;
}

function buildTextLines(lines, x, y, fontSize, lineHeight, color, weight = 700) {
  return lines
    .map((line, index) => {
      const lineY = y + index * fontSize * lineHeight;
      return `
        <text
          x="${x}"
          y="${lineY}"
          fill="${color}"
          font-size="${fontSize}"
          font-family="Avenir Next, Inter, Helvetica Neue, Arial, sans-serif"
          font-weight="${weight}"
          letter-spacing="-1.2"
        >
          ${escapeXml(line)}
        </text>
      `;
    })
    .join("");
}

function buildForestCluster() {
  return `
    <g opacity="0.92">
      <g transform="translate(918 464) scale(1.12)">
        <rect x="-7" y="26" width="14" height="48" rx="3" fill="#45382c" />
        <ellipse cx="0" cy="-4" rx="46" ry="38" fill="#2f4f3f" />
        <ellipse cx="-26" cy="10" rx="24" ry="20" fill="#496d59" />
        <ellipse cx="28" cy="8" rx="22" ry="19" fill="#547d67" />
        <ellipse cx="-10" cy="-24" rx="22" ry="18" fill="#618c74" />
        <ellipse cx="18" cy="-22" rx="18" ry="16" fill="#739986" />
      </g>
      <g transform="translate(1016 486) scale(0.82)">
        <rect x="-6" y="22" width="12" height="42" rx="3" fill="#4a3a2b" />
        <ellipse cx="0" cy="-6" rx="36" ry="28" fill="#2a4637" />
        <ellipse cx="-18" cy="5" rx="20" ry="15" fill="#416551" />
        <ellipse cx="18" cy="3" rx="18" ry="14" fill="#5c856e" />
        <ellipse cx="0" cy="-22" rx="16" ry="12" fill="#7ea18c" />
      </g>
      <g transform="translate(1102 510) scale(0.62)">
        <rect x="-5" y="18" width="10" height="34" rx="2" fill="#533f2d" />
        <ellipse cx="0" cy="-8" rx="30" ry="24" fill="#264133" />
        <ellipse cx="-16" cy="2" rx="16" ry="12" fill="#4f775f" />
        <ellipse cx="16" cy="0" rx="15" ry="11" fill="#6b917a" />
        <ellipse cx="0" cy="-20" rx="13" ry="10" fill="#9ab29f" />
      </g>
    </g>
  `;
}

function buildDecorativePanel(cards) {
  const cardMarkup = cards
    .map(({ label, value }, index) => {
      const y = 150 + index * 114;

      return `
        <g transform="translate(804 ${y})">
          <rect width="304" height="86" rx="24" fill="rgba(18,40,32,0.68)" stroke="${BRAND.palette.panelBorder}" stroke-width="1.2" />
          <text
            x="24"
            y="32"
            fill="${BRAND.palette.mutedSoft}"
            font-size="14"
            font-family="Avenir Next, Inter, Helvetica Neue, Arial, sans-serif"
            font-weight="700"
            letter-spacing="1.8"
          >
            ${escapeXml(label.toUpperCase())}
          </text>
          <text
            x="24"
            y="62"
            fill="${BRAND.palette.text}"
            font-size="28"
            font-family="Avenir Next, Inter, Helvetica Neue, Arial, sans-serif"
            font-weight="600"
            letter-spacing="-0.8"
          >
            ${escapeXml(ellipsize(value, 22))}
          </text>
        </g>
      `;
    })
    .join("");

  return `
    <g>
      <rect x="764" y="42" width="396" height="546" rx="34" fill="rgba(14,29,24,0.52)" stroke="${BRAND.palette.panelBorder}" stroke-width="1.5" />
      <circle cx="962" cy="122" r="112" fill="url(#glowOrb)" opacity="0.9" />
      <circle cx="1042" cy="92" r="48" fill="rgba(164,198,127,0.18)" />
      <path d="M808 116C864 92 930 84 1000 96C1050 106 1094 126 1120 154" fill="none" stroke="rgba(192,200,187,0.18)" stroke-width="2" />
      <path d="M798 132C870 142 936 168 986 208C1022 236 1050 272 1064 312" fill="none" stroke="rgba(127,159,140,0.2)" stroke-width="1.5" />
      ${cardMarkup}
      ${buildForestCluster()}
    </g>
  `;
}

function buildBackground() {
  return `
    <rect width="${OG_WIDTH}" height="${OG_HEIGHT}" fill="url(#forestBase)" />
    <rect width="${OG_WIDTH}" height="${OG_HEIGHT}" fill="url(#topGlow)" opacity="0.92" />
    <rect width="${OG_WIDTH}" height="${OG_HEIGHT}" fill="url(#grainOverlay)" opacity="0.12" />
    <circle cx="186" cy="148" r="240" fill="rgba(79,122,99,0.16)" />
    <circle cx="388" cy="540" r="180" fill="rgba(164,198,127,0.10)" />
    <circle cx="1010" cy="522" r="210" fill="rgba(79,122,99,0.14)" />
    <rect x="36" y="36" width="1128" height="558" rx="36" fill="rgba(11,23,18,0.34)" stroke="rgba(133,163,146,0.18)" stroke-width="1.5" />
    <g opacity="0.24">
      <path d="M92 0V630" stroke="rgba(129,154,138,0.1)" stroke-width="1" />
      <path d="M254 0V630" stroke="rgba(129,154,138,0.08)" stroke-width="1" />
      <path d="M730 0V630" stroke="rgba(129,154,138,0.06)" stroke-width="1" />
      <path d="M0 128H1200" stroke="rgba(129,154,138,0.05)" stroke-width="1" />
      <path d="M0 520H1200" stroke="rgba(129,154,138,0.05)" stroke-width="1" />
    </g>
  `;
}

function buildSvg(payload) {
  const titleLayout = getTitleLayout(payload.title, payload.variant);
  const titleLines = wrapText(
    payload.title,
    titleLayout.maxCharsPerLine,
    titleLayout.maxLines,
  );
  const descriptionLines = wrapText(
    payload.description,
    42,
    payload.variant === "post" ? 2 : 3,
  );
  const titleBlockHeight =
    titleLines.length * titleLayout.fontSize * titleLayout.lineHeight;
  const descriptionY = 184 + titleBlockHeight + 44;
  const footerY = 520;

  const badgeLabels = payload.badges.slice(0, 3);
  const badgeMarkup = badgeLabels
    .map((label, index) => buildBadge(label, 72 + index * 170, footerY - 10, 0.88))
    .join("");

  const metaLabel = escapeXml(payload.metaLabel.toUpperCase());
  const metaValue = escapeXml(payload.metaValue);
  const rightCards = payload.rightCards.slice(0, 3);

  return `
    <svg width="${OG_WIDTH}" height="${OG_HEIGHT}" viewBox="0 0 ${OG_WIDTH} ${OG_HEIGHT}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="forestBase" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="${BRAND.palette.background}" />
          <stop offset="55%" stop-color="${BRAND.palette.backgroundDeep}" />
          <stop offset="100%" stop-color="#0c1814" />
        </linearGradient>
        <radialGradient id="topGlow" cx="0.14" cy="0.08" r="1.05">
          <stop offset="0%" stop-color="rgba(164,198,127,0.28)" />
          <stop offset="45%" stop-color="rgba(79,122,99,0.18)" />
          <stop offset="100%" stop-color="rgba(0,0,0,0)" />
        </radialGradient>
        <radialGradient id="glowOrb" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stop-color="rgba(245,237,222,0.96)" />
          <stop offset="28%" stop-color="rgba(164,198,127,0.88)" />
          <stop offset="64%" stop-color="rgba(79,122,99,0.34)" />
          <stop offset="100%" stop-color="rgba(79,122,99,0)" />
        </radialGradient>
        <filter id="softBlur" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="18" />
        </filter>
        <filter id="grain">
          <feTurbulence type="fractalNoise" baseFrequency="0.82" numOctaves="2" stitchTiles="stitch" />
        </filter>
        <linearGradient id="grainOverlay" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stop-color="rgba(255,255,255,0.28)" />
          <stop offset="100%" stop-color="rgba(255,255,255,0.12)" />
        </linearGradient>
      </defs>

      ${buildBackground()}
      <rect x="0" y="0" width="${OG_WIDTH}" height="${OG_HEIGHT}" filter="url(#grain)" opacity="0.045" />

      <g filter="url(#softBlur)" opacity="0.35">
        <circle cx="690" cy="74" r="92" fill="rgba(164,198,127,0.22)" />
        <circle cx="770" cy="582" r="120" fill="rgba(79,122,99,0.18)" />
      </g>

      ${buildDecorativePanel(rightCards)}

      <g>
        ${buildBadge(payload.eyebrow, 72, 64)}
        <text
          x="74"
          y="126"
          fill="${BRAND.palette.mutedSoft}"
          font-size="16"
          font-family="Avenir Next, Inter, Helvetica Neue, Arial, sans-serif"
          font-weight="700"
          letter-spacing="2.1"
        >
          ${escapeXml(payload.kicker.toUpperCase())}
        </text>
        ${buildTextLines(
          titleLines,
          72,
          184,
          titleLayout.fontSize,
          titleLayout.lineHeight,
          BRAND.palette.text,
          800,
        )}
        ${buildTextLines(
          descriptionLines,
          74,
          descriptionY,
          27,
          1.48,
          BRAND.palette.muted,
          500,
        )}

        <line x1="72" y1="${footerY - 34}" x2="676" y2="${footerY - 34}" stroke="${BRAND.palette.line}" stroke-width="1.5" />
        ${badgeMarkup}

        <text
          x="74"
          y="576"
          fill="${BRAND.palette.mutedSoft}"
          font-size="14"
          font-family="Avenir Next, Inter, Helvetica Neue, Arial, sans-serif"
          font-weight="700"
          letter-spacing="1.4"
        >
          ${metaLabel}
        </text>
        <text
          x="74"
          y="605"
          fill="${BRAND.palette.text}"
          font-size="22"
          font-family="Avenir Next, Inter, Helvetica Neue, Arial, sans-serif"
          font-weight="600"
          letter-spacing="-0.5"
        >
          ${metaValue}
        </text>

        <text
          x="676"
          y="605"
          fill="${BRAND.palette.mutedSoft}"
          font-size="17"
          font-family="Avenir Next, Inter, Helvetica Neue, Arial, sans-serif"
          font-weight="600"
          text-anchor="end"
          letter-spacing="0.3"
        >
          ${escapeXml(BRAND.siteUrl)}
        </text>
      </g>
    </svg>
  `;
}

function getSitePayload(outputPathOverride) {
  return {
    variant: "site",
    eyebrow: BRAND.siteName,
    kicker: "Open Graph",
    title: BRAND.siteTitle,
    description: BRAND.siteDescription,
    badges: ["Architecture", "AI Systems", "Thoughtful Software"],
    metaLabel: "Website",
    metaValue: "Senior engineer • AI specialist",
    rightCards: [
      { label: "Focus", value: "Resilient systems" },
      { label: "Lens", value: "Human-centered AI" },
      { label: "Reach", value: BRAND.siteUrl },
    ],
    outputPath: outputPathOverride || DEFAULT_SITE_OUTPUT,
  };
}

async function getPostPayload(postPath, outputPathOverride) {
  const absolutePostPath = path.resolve(postPath);
  const markdown = await fs.readFile(absolutePostPath, "utf8");
  const frontmatter = parseFrontmatterBlock(markdown);
  const title = extractScalar(frontmatter, "title") || path.basename(postPath, ".md");
  const description =
    extractScalar(frontmatter, "description") ||
    "A new post from Andrew Riefenstahl.";
  const pubDate = extractScalar(frontmatter, "pubDate");
  const tags = extractTags(frontmatter);
  const imageUrl = extractImageUrl(frontmatter);
  const slug = slugify(title);

  return {
    variant: "post",
    eyebrow: BRAND.siteName,
    kicker: tags[0] || "New Post",
    title,
    description,
    badges: tags.length ? tags : ["Engineering", "Writing", "AI"],
    metaLabel: pubDate ? "Published" : "Source",
    metaValue: pubDate || BRAND.siteUrl,
    rightCards: [
      { label: "Post", value: tags[0] || "Technical writing" },
      { label: "Angle", value: tags[1] || "Architecture" },
      { label: "Read", value: BRAND.siteUrl },
    ],
    outputPath:
      outputPathOverride || resolveAssetPath(imageUrl, slug),
  };
}

function parseArgs(argv) {
  const args = argv.filter((arg) => arg !== "--");
  const outputIndex = args.indexOf("--output");
  let outputPath = "";

  if (outputIndex !== -1) {
    outputPath = args[outputIndex + 1];
    args.splice(outputIndex, 2);
  }

  if (args.includes("--site")) {
    return {
      mode: "site",
      outputPath: outputPath ? path.resolve(outputPath) : "",
    };
  }

  const postPath = args[0];
  if (!postPath) {
    return null;
  }

  return {
    mode: "post",
    postPath,
    outputPath: outputPath ? path.resolve(outputPath) : "",
  };
}

async function renderToJpeg(svg, outputPath) {
  await fs.mkdir(path.dirname(outputPath), { recursive: true });

  const buffer = await sharp(Buffer.from(svg))
    .resize(OG_WIDTH, OG_HEIGHT, { fit: "cover" })
    .jpeg({
      quality: JPEG_QUALITY,
      progressive: true,
      mozjpeg: true,
      chromaSubsampling: "4:4:4",
    })
    .toBuffer();

  await fs.writeFile(outputPath, buffer);
  return buffer.length;
}

async function main() {
  const parsed = parseArgs(process.argv.slice(2));

  if (!parsed) {
    printUsage();
    process.exit(1);
  }

  const payload =
    parsed.mode === "site"
      ? getSitePayload(parsed.outputPath)
      : await getPostPayload(parsed.postPath, parsed.outputPath);

  const svg = buildSvg(payload);
  const bytes = await renderToJpeg(svg, payload.outputPath);
  const kb = (bytes / 1024).toFixed(0);

  console.log(`OG image written to ${payload.outputPath} (${kb} KB)`);
}

main().catch((error) => {
  console.error("Failed to generate OG image:", error);
  process.exit(1);
});
