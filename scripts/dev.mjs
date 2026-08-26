import http from "node:http";
import { watch as fsWatch, promises as fs } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { build } from "./build.mjs";
const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const dist = path.join(root, "dist");
const port = Number(process.env.PORT) || 4173;
const watchDirs = [
  "build",
  "components",
  "guidelines",
  "templates",
  "tokens",
  "ui_kits",
  "assets",
].map((d) => path.join(root, d));
const watchFiles = ["styles.css", "thumbnail.html"].map((f) =>
  path.join(root, f),
);
const MIME = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".json": "application/json",
  ".woff": "font/woff",
  ".woff2": "font/woff2",
};
async function rebuild(reason) {
  const start = Date.now();
  try {
    console.log(`
Rebuilding${reason ? ` (${reason})` : ""}...`);
    await build();
    console.log(`Rebuilt in ${Date.now() - start}ms`);
  } catch (err) {
    console.error("Build failed:", err.message);
  }
}
let pending;
function scheduleRebuild(reason) {
  clearTimeout(pending);
  pending = setTimeout(() => rebuild(reason), 150);
}
function watch(target) {
  fs.stat(target)
    .then(() => {
      fsWatch(target, { recursive: true }, (_event, filename) =>
        scheduleRebuild(filename?.toString() ?? path.basename(target)),
      );
    })
    .catch(() => {});
}
const server = http.createServer(async (req, res) => {
  try {
    let urlPath = decodeURIComponent(
      new URL(req.url ?? "/", "http://localhost").pathname,
    );
    if (urlPath.endsWith("/")) urlPath += "index.html";
    let filePath = path.join(dist, urlPath);
    if (!filePath.startsWith(dist)) {
      res.writeHead(403).end("Forbidden");
      return;
    }
    let data;
    try {
      data = await fs.readFile(filePath);
    } catch {
      filePath = path.join(dist, urlPath, "index.html");
      data = await fs.readFile(filePath);
    }
    const ext = path.extname(filePath);
    res.writeHead(200, {
      "Content-Type": MIME[ext] ?? "application/octet-stream",
    });
    res.end(data);
  } catch {
    res.writeHead(404).end("Not found");
  }
});
async function main() {
  await rebuild();
  for (const dir of watchDirs) watch(dir);
  for (const file of watchFiles) watch(file);
  server.listen(port, () => {
    console.log(`
  Serving dist/ at http://localhost:${port}`);
    console.log("Watching for changes... (Ctrl+C to stop)");
  });
}

main();
