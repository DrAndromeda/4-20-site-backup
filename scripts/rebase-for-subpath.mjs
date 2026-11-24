// Usage: node scripts/rebase-for-subpath.mjs /repo-name   (after `npm run build`)
//
// Rewrites root-absolute URLs in dist/ so the site works when served from a sub-path,
// e.g. GitHub Pages project sites (https://<user>.github.io/<repo>/). The production
// build for 4-20.com.ua does NOT run this; source and content keep plain "/ru/..." links.
//
// Also marks every page noindex: the sub-path copy is a preview mirror, and canonical
// URLs keep pointing at the production domain.
import { readdirSync, readFileSync, writeFileSync, statSync } from 'node:fs';
import { join } from 'node:path';

const DIST = 'dist';
const base = (process.argv[2] ?? '').replace(/\/+$/, '');
if (!base) { console.log('No base path given: nothing to rebase.'); process.exit(0); }
if (!/^\/[\w.-]+(\/[\w.-]+)*$/.test(base)) { console.error(`Bad base path: ${base}`); process.exit(1); }

const walk = (d) => readdirSync(d).flatMap((f) => { const p = join(d, f); return statSync(p).isDirectory() ? walk(p) : [p]; });
// "/x" but not "//cdn" and not already rebased
const root = `/(?!/|${base.slice(1).replace(/[.]/g, '\\.')}/)`;
const attr = new RegExp(`\\b(href|src|action|poster)="${root}`, 'g');
const cssUrl = new RegExp(`url\\((['"]?)${root}`, 'g');
const refresh = new RegExp(`(http-equiv="refresh" content="\\d+;\\s*url=)${root}`, 'gi');

let files = 0;
for (const f of walk(DIST)) {
  const isHtml = f.endsWith('.html'), isCss = f.endsWith('.css');
  if (!isHtml && !isCss) continue;
  let s = readFileSync(f, 'utf8');
  const before = s;
  s = s.replace(cssUrl, `url($1${base}/`);
  if (isHtml) {
    s = s.replace(attr, `$1="${base}/`).replace(refresh, `$1${base}/`);
    if (!/<meta name="robots"/.test(s)) s = s.replace('<head>', '<head><meta name="robots" content="noindex,follow">');
  }
  if (s !== before) { writeFileSync(f, s); files++; }
}
console.log(`Rebased ${files} file(s) under ${base}/`);
