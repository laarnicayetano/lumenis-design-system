// Renders every @dsCard page and checks it fits its declared viewport.
// Needs: npm i -D playwright && npx playwright install chromium
// Run:   node scripts/check-cards.ts
//
// Cards load ../../../_ds_bundle.js, which Claude Design generates and
// .gitignore excludes. Point BUNDLE at a built copy to run this in CI:
//   BUNDLE=dist/lumenis.js node scripts/check-cards.ts
import {
  readFileSync,
  readdirSync,
  existsSync,
  copyFileSync,
  unlinkSync,
} from "node:fs";
import { createServer } from "node:http";
import { join, relative, extname } from "node:path";
import { chromium } from "playwright";

const ROOT = process.cwd();
const PORT = 4319;
const SLACK = 8; // px of overflow tolerated before it counts as clipping
const WASTE = 0.4; // warn when a card uses less than this share of its height

const MIME: Record<string, string> = {
  ".html": "text/html",
  ".js": "text/javascript",
  ".mjs": "text/javascript",
  ".jsx": "text/javascript",
  ".css": "text/css",
  ".json": "application/json",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".woff2": "font/woff2",
};

// Directories that never hold real @dsCard source: build output, and
// ds-bundle/ — a local, gitignored /design-sync build artifact whose
// per-component .html files aren't real cards and have no viewport, so
// scanning them just produces noise.
const SKIP_DIRS = new Set([
  "node_modules",
  "dist",
  "storybook-static",
  "generated",
  "ds-bundle",
]);

function walk(dir: string, out: string[] = []): string[] {
  for (const e of readdirSync(dir, { withFileTypes: true })) {
    if (e.name.startsWith(".") || SKIP_DIRS.has(e.name)) continue;
    const p = join(dir, e.name);
    if (e.isDirectory()) walk(p, out);
    else if (e.name.endsWith(".html"))
      out.push(relative(ROOT, p).split("\\").join("/"));
  }
  return out;
}

async function main() {
  const bundle = join(ROOT, "_ds_bundle.js");
  let borrowed = false;
  if (!existsSync(bundle)) {
    const from = process.env.BUNDLE;
    if (!from || !existsSync(join(ROOT, from))) {
      // The bundle is generated and gitignored, so a fresh checkout never has
      // one. Skip rather than fail, unless someone explicitly demands it.
      const msg =
        "_ds_bundle.js is absent (generated, not committed) — card render check skipped.\n" +
        "Run inside Claude Design, or build one and pass BUNDLE=<path>.";
      if (process.env.REQUIRE_BUNDLE) {
        console.error(msg);
        process.exitCode = 2;
      } else console.warn(`skip  ${msg}`);
      return;
    }
    copyFileSync(join(ROOT, from), bundle);
    borrowed = true;
  }

  const cards = walk(ROOT).filter((f) =>
    readFileSync(join(ROOT, f), "utf8").startsWith("<!-- @dsCard"),
  );

  const server = createServer((req, res) => {
    const p = join(ROOT, decodeURIComponent((req.url ?? "").split("?")[0]));
    if (!p.startsWith(ROOT) || !existsSync(p)) return void res.writeHead(404).end();
    res.writeHead(200, {
      "content-type": MIME[extname(p)] ?? "application/octet-stream",
    });
    res.end(readFileSync(p));
  });
  server.listen(PORT);

  const browser = await chromium.launch();
  const errors: string[] = [];
  const warnings: string[] = [];

  for (const card of cards) {
    const head = readFileSync(join(ROOT, card), "utf8").split("\n", 1)[0];
    const vp = head.match(/viewport="(\d+)x(\d+)"/);
    if (!vp) {
      warnings.push(`${card}: no viewport declared`);
      continue;
    }
    const w = +vp[1];
    const h = +vp[2];
    const page = await browser.newPage({ viewport: { width: w, height: h } });
    const logged: string[] = [];
    page.on("console", (m) => m.type() === "error" && logged.push(m.text()));
    page.on("pageerror", (e) => logged.push(String(e)));

    await page.goto(`http://localhost:${PORT}/${card}`, { waitUntil: "load" });
    await page.waitForTimeout(1200);

    const box = await page.evaluate(() => {
      const r = document.getElementById("root") ?? document.body;
      return {
        w: r.scrollWidth,
        h: r.scrollHeight,
        children: r.children.length,
        ink:
          r.innerText.trim().length +
          r.querySelectorAll("svg,img,i,input,button,canvas").length,
      };
    });
    await page.close();

    const tag = `${card} (declared ${w}x${h}, rendered ${box.w}x${box.h})`;
    if (logged.length) errors.push(`${tag}\n    console: ${logged[0]}`);
    if (!box.children || !box.ink) errors.push(`${tag}\n    renders nothing`);
    if (box.w > w + SLACK)
      errors.push(`${tag}\n    clipped ${box.w - w}px horizontally`);
    if (box.h > h + SLACK)
      errors.push(`${tag}\n    clipped ${box.h - h}px vertically`);
    else if (box.h < h * (1 - WASTE))
      warnings.push(
        `${tag}\n    ${h - box.h}px of dead space — declare height ~${box.h + 20}`,
      );
  }

  await browser.close();
  server.close();
  if (borrowed) unlinkSync(bundle);

  for (const w of warnings) console.warn(`warn  ${w}`);
  for (const e of errors) console.error(`ERROR ${e}`);
  console.log(
    `\n${cards.length} cards checked — ${errors.length} error(s), ${warnings.length} warning(s)`,
  );
  if (errors.length) process.exitCode = 1;
}

main();
