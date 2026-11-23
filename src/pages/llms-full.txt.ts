import { getCollection } from 'astro:content';
import type { APIRoute } from 'astro';

export const GET: APIRoute = async ({ site }) => {
  const entries = (await getCollection('pages', (e) => !e.data.draft)).sort((a, b) => a.id.localeCompare(b.id));
  const origin = site!.origin;
  const out = ['# 4-20 — full content', ''];
  for (const e of entries) {
    const body = (e.body ?? '').replace(/^import .*$/gm, '').replace(/<[A-Z][\s\S]*?\/>/g, '').trim();
    out.push(`# ${e.data.title}`, `URL: ${origin}/${e.id}/`, `Updated: ${e.data.updated.toISOString().slice(0, 10)}`, '', `Short answer: ${e.data.answer}`, '', body, '');
    if (e.data.faq.length) out.push('FAQ:', ...e.data.faq.map((f) => `Q: ${f.q}\nA: ${f.a}`), '');
    if (e.data.sources.length) out.push('Sources:', ...e.data.sources.map((s) => `- ${s.title}: ${s.url}`), '');
    out.push('---', '');
  }
  return new Response(out.join('\n'), { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
