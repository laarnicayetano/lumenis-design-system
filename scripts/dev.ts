#!/usr/bin/env node
// Dev server: builds to dist/, serves it over HTTP, and rebuilds whenever
// source files change. No extra deps — plain node:http + fs.watch.
import http from 'node:http';
import { watch as fsWatch, promises as fs } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { build } from './build.ts';

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const dist = path.join(root, 'dist');
const port = Number(process.env.PORT) || 4173;

const watchDirs = ['build', 'components', 'guidelines', 'templates', 'tokens', 'ui_kits', 'assets'].map((d) =>
  path.join(root, d)
);
const watchFiles = ['styles.css', 'thumbnail.html'].map((f) => path.join(root, f));

const MIME: Record<string, string> = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.json': 'application/json',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
};

async function rebuild(reason?: string) {
  const start = Date.now();
  try {
    console.log(`\nRebuilding${reason ? ` (${reason})` : ''}...`);
    await build();
    console.log(`Rebuilt in ${Date.now() - start}ms`);
  } catch (err) {
    console.error('Build failed:', (err as Error).message);
  }
}

let pending: ReturnType<typeof setTimeout> | undefined;
function scheduleRebuild(reason?: string) {
  clearTimeout(pending);
  pending = setTimeout(() => rebuild(reason), 150);
}

function watch(target: string) {
  fs.stat(target)
    .then(() => {
      fsWatch(target, { recursive: true }, (_event, filename) => scheduleRebuild(filename?.toString() ?? path.basename(target)));
    })
    .catch(() => {});
}

const server = http.createServer(async (req, res) => {
  try {
    let urlPath = decodeURIComponent(new URL(req.url ?? '/', 'http://localhost').pathname);
    if (urlPath.endsWith('/')) urlPath += 'index.html';
    let filePath = path.join(dist, urlPath);
    if (!filePath.startsWith(dist)) {
      res.writeHead(403).end('Forbidden');
      return;
    }
    let data: Buffer;
    try {
      data = await fs.readFile(filePath);
    } catch {
      filePath = path.join(dist, urlPath, 'index.html');
      data = await fs.readFile(filePath);
    }
    const ext = path.extname(filePath);
    res.writeHead(200, { 'Content-Type': MIME[ext] ?? 'application/octet-stream' });
    res.end(data);
  } catch {
    res.writeHead(404).end('Not found');
  }
});

await rebuild();
for (const dir of watchDirs) watch(dir);
for (const file of watchFiles) watch(file);

server.listen(port, () => {
  console.log(`\nServing dist/ at http://localhost:${port}`);
  console.log('Watching for changes... (Ctrl+C to stop)');
});
