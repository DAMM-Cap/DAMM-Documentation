# GitBook Archive — 2026-07-16

Point-in-time backup of the live DAMM Capital GitBook documentation site scraped on **2026-07-16**, captured before Git Sync was enabled on this repository.

## What is this branch?

Branch `backup/gitbook-2026-07-16` is an **orphan branch** — it shares no history with `main`. It exists solely as a read-only archive and must never be merged into the Docusaurus tree.

## Contents

| Path | Description |
|------|-------------|
| `scrape.ts` | Bun script that produced this archive |
| `pages/` | Scraped Markdown pages mirroring the site hierarchy |
| `MANIFEST.md` | Source URL → file path → byte count, plus scrape timestamp |

## Re-running the scrape

Requirements: [Bun](https://bun.sh) v1+.

```bash
bun scrape.ts
```

The script is **idempotent** — re-running overwrites files in place and produces no duplicates. It exits non-zero on any HTTP error, non-200 response, empty body, or if the scraped file count does not match the `llms.txt` entry count.

## Source

- Live site: <https://damm-capital.gitbook.io/damm-capital-docs>
- Page index: <https://damm-capital.gitbook.io/damm-capital-docs/llms.txt>

## Page count

17 pages as of the scrape date (each page's Markdown rendition served at its URL with a `.md` suffix).
