#!/usr/bin/env python3
"""Lists all frontmatter problems at once (the Astro build stops at the first). Needs PyYAML."""
import glob, re, sys, yaml
bad = 0
for f in sorted(glob.glob('src/content/pages/*/**/*.mdx', recursive=True)):
    raw = open(f, encoding='utf-8').read()
    m = re.match(r'^---\n(.*?)\n---\n(.*)$', raw, re.S)
    errs = []
    if not m: print(f'✗ {f}: no frontmatter'); bad += 1; continue
    try: d = yaml.safe_load(m.group(1))
    except Exception as e: print(f'✗ {f}: YAML {str(e)[:80]}'); bad += 1; continue
    body = m.group(2)
    t, de, a = d.get('title',''), d.get('description',''), d.get('answer','')
    if len(t) > 70: errs.append(f'title {len(t)}>70')
    if not 50 <= len(de) <= 165: errs.append(f'description {len(de)}')
    n = len(a.split())
    if not 50 <= n <= 80: errs.append(f'answer {n} words')
    for i, q in enumerate(d.get('faq', []) or []):
        if not q.get('q') or not q.get('a'): errs.append(f'faq[{i}] incomplete')
    for i, s in enumerate(d.get('sources', []) or []):
        if not str(s.get('url','')).startswith('http'): errs.append(f'source[{i}] url')
    if d.get('howTo') is not None and not all(isinstance(x, dict) and 'name' in x and 'text' in x for x in d['howTo']): errs.append('howTo shape')
    if not d.get('updated'): errs.append('updated missing')
    if re.search(r'(?<![\w`\\])<(?![A-Za-z/!])', body) or re.search(r'(?<!<)\{(?!\[|\{|\'|")', re.sub(r'<[A-Z][^>]*>', '', body, flags=re.S)): errs.append('suspicious < or { in body')
    if errs: bad += 1; print(f'✗ {f}: ' + '; '.join(errs))
print(f'{bad} file(s) with problems')
sys.exit(1 if bad else 0)
