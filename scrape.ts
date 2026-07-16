#!/usr/bin/env bun
/**
 * scrape.ts — GitBook backup scraper
 *
 * Fetches the live DAMM Capital GitBook site index from llms.txt,
 * then downloads each page's public Markdown rendition and writes it
 * under pages/ mirroring the site hierarchy.
 *
 * Usage:   bun scrape.ts
 * Re-run:  safe to re-run — overwrites in place, no duplicates.
 *
 * Exit codes:
 *   0  — all pages scraped and count assertion passed
 *   1  — any HTTP error, non-200 response, empty body, or count mismatch
 */

import { mkdir, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";

const BASE_URL = "https://damm-capital.gitbook.io/damm-capital-docs";
const LLMS_TXT_URL = `${BASE_URL}/llms.txt`;
const PAGES_DIR = "pages";
const MANIFEST_FILE = "MANIFEST.md";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface PageEntry {
  title: string;
  url: string;
  /** Path relative to PAGES_DIR, e.g. "readme.md" or "funds/dammeth.md" */
  relativePath: string;
}

interface ScrapedPage {
  entry: PageEntry;
  byteCount: number;
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

async function fetchText(url: string): Promise<string> {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(
      `HTTP ${response.status} ${response.statusText} fetching ${url}`
    );
  }
  const text = await response.text();
  if (text.trim().length === 0) {
    throw new Error(`Empty body fetching ${url}`);
  }
  return text;
}

/**
 * Parse llms.txt lines of the form:
 *   - [Title](https://...base.../path.md)
 *   - [Title](https://...base.../path.md): some annotation
 *
 * Returns PageEntry[] in document order.
 */
function parseLlmsTxt(raw: string): PageEntry[] {
  const entries: PageEntry[] = [];
  const lineRegex = /^- \[([^\]]+)\]\((https?:\/\/[^)]+)\)/;

  for (const line of raw.split("\n")) {
    const match = line.match(lineRegex);
    if (!match) continue;

    const title = match[1].trim();
    const url = match[2].trim();

    // Derive relative path by stripping the base URL prefix.
    const prefix = `${BASE_URL}/`;
    if (!url.startsWith(prefix)) {
      throw new Error(
        `Unexpected URL not under base: ${url}\n(base: ${BASE_URL})`
      );
    }
    const relativePath = url.slice(prefix.length);

    entries.push({ title, url, relativePath });
  }

  return entries;
}

/**
 * Write content to disk, creating parent directories as needed.
 * Idempotent — overwrites if already exists.
 */
async function writePage(relativePath: string, content: string): Promise<void> {
  const fullPath = join(PAGES_DIR, relativePath);
  const dir = dirname(fullPath);
  await mkdir(dir, { recursive: true });
  await writeFile(fullPath, content, "utf-8");
}

function buildManifest(
  scraped: ScrapedPage[],
  scrapeTimestamp: string
): string {
  const rows = scraped
    .map(({ entry, byteCount }) => {
      const filePath = `${PAGES_DIR}/${entry.relativePath}`;
      return `| ${entry.url} | ${filePath} | ${byteCount} |`;
    })
    .join("\n");

  return [
    `# GitBook Backup Manifest`,
    ``,
    `**Scraped:** ${scrapeTimestamp}`,
    `**Source:** ${BASE_URL}`,
    `**Page count:** ${scraped.length}`,
    ``,
    `| Source URL | File Path | Bytes |`,
    `|---|---|---|`,
    rows,
  ].join("\n");
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

async function main(): Promise<void> {
  const scrapeTimestamp = new Date().toISOString();
  console.log(`[scrape] timestamp: ${scrapeTimestamp}`);
  console.log(`[scrape] fetching index: ${LLMS_TXT_URL}`);

  const llmsRaw = await fetchText(LLMS_TXT_URL);
  const entries = parseLlmsTxt(llmsRaw);

  if (entries.length === 0) {
    throw new Error("Parsed zero entries from llms.txt — check the format.");
  }

  console.log(`[scrape] found ${entries.length} pages in llms.txt`);

  const scraped: ScrapedPage[] = [];

  for (const entry of entries) {
    console.log(`[scrape] fetching [${entry.title}] → ${entry.url}`);
    const content = await fetchText(entry.url);
    await writePage(entry.relativePath, content);
    const byteCount = Buffer.byteLength(content, "utf-8");
    scraped.push({ entry, byteCount });
    console.log(`[scrape]   wrote ${PAGES_DIR}/${entry.relativePath} (${byteCount} bytes)`);
  }

  // Completeness assertion — must match before writing manifest.
  if (scraped.length !== entries.length) {
    throw new Error(
      `Completeness assertion FAILED: expected ${entries.length} pages, scraped ${scraped.length}`
    );
  }

  // Verify every file has a non-empty body (belt + suspenders — fetchText
  // already rejects empties, but we assert on the committed count).
  for (const { entry, byteCount } of scraped) {
    if (byteCount === 0) {
      throw new Error(
        `Zero-byte file after write: ${PAGES_DIR}/${entry.relativePath}`
      );
    }
  }

  const manifest = buildManifest(scraped, scrapeTimestamp);
  await writeFile(MANIFEST_FILE, manifest, "utf-8");
  console.log(`[scrape] wrote ${MANIFEST_FILE}`);

  const totalBytes = scraped.reduce((sum, p) => sum + p.byteCount, 0);
  console.log(
    `[scrape] DONE — ${scraped.length}/${entries.length} pages, ${totalBytes} total bytes`
  );
}

main().catch((err) => {
  console.error(`[scrape] FATAL: ${err instanceof Error ? err.message : String(err)}`);
  process.exit(1);
});
