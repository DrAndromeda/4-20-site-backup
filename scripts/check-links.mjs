// Usage: node scripts/check-links.mjs  (after `npm run build`). Checks internal links, hreflang targets, and per-page SEO basics.
import { readdirSync, readFileSync, existsSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';

const DIST = 'dist';
const walk = (d) => readdirSync(d).flatMap((f) => { const p = join(d, f); return statSync(p).isDirectory() ? walk(p) : [p]; });
const htmlFiles = walk(DIST).filter((f) => f.endsWith('.html'));
const exists = (url) => {
  const clean = url.split('#')[0].split('?')[0];
  if (!clean) return true;
  const p = join(DIST, decodeURIComponent(clean));
  return existsSync(p) && (statSync(p).isFile() || existsSync(join(p, 'index.html')));
};
let errors = 0;
const err = (f, m) => { errors++; console.error(`✗ ${relative(DIST, f)}: ${m}`); };
for (const f of htmlFiles) {
  const h = readFileSync(f, 'utf8');
  for (const m of h.matchAll(/(?:href|src)="(\/[^"]*)"/g)) if (!m[1].startsWith('//') && !exists(m[1])) err(f, `broken link ${m[1]}`);
  for (const m of h.matchAll(/hreflang="[^"]+" href="https:\/\/4-20\.com\.ua([^"]*)"/g)) if (!exists(m[1])) err(f, `hreflang target missing ${m[1]}`);
  if (f.endsWith('index.html') && !/<meta name="robots" content="noindex/.test(h)) {
    if (!/<title>[^<]{10,}/.test(h)) err(f, 'missing/short title');
    if (!/<meta name="description" content="[^"]{50,}/.test(h)) err(f, 'missing/short description');
    if ((h.match(/<h1[ >]/g) ?? []).length !== 1) err(f, 'must have exactly one h1');
    if (!/rel="canonical"/.test(h)) err(f, 'missing canonical');
    for (const m of h.matchAll(/<img\b[^>]*>/g)) if (!/\balt=/.test(m[0])) err(f, 'img without alt');
  }
}
console.log(`${htmlFiles.length} pages checked, ${errors} problem(s).`);
process.exit(errors ? 1 : 0);
