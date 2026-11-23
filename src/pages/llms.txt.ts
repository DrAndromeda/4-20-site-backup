import { getCollection } from 'astro:content';
import type { APIRoute } from 'astro';

export const GET: APIRoute = async ({ site }) => {
  const entries = (await getCollection('pages', (e) => !e.data.draft)).sort((a, b) => a.id.localeCompare(b.id));
  const origin = site!.origin;
  const byLang: Record<string, typeof entries> = {};
  for (const e of entries) (byLang[e.id.split('/')[0]] ??= []).push(e);
  const lines = [
    '# 4-20',
    '',
    '> Fact-based, multilingual (ru, uk, en, es) educational reference about cannabis: cannabinoids, terpenes, cultivation, consumption harm-reduction, law. Not medical advice. No promotion of use.',
    '',
    'Each language is written natively (not machine-translated). Full text of all pages: ' + origin + '/llms-full.txt',
  ];
  for (const [lang, list] of Object.entries(byLang)) {
    lines.push('', `## ${lang}`);
    for (const e of list) lines.push(`- [${e.data.title}](${origin}/${e.id}/): ${e.data.description}`);
  }
  return new Response(lines.join('\n') + '\n', { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
