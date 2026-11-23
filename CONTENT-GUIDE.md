# Content guide (for authors and AI writers)

Pages: `src/content/pages/<lang>/<slug>/index.mdx`, lang ∈ ru|uk|en|es. Slugs are English and identical across languages.
Each language is **written natively** for its readers — same facts, independent wording, local examples. Never translate sentence by sentence.

## Frontmatter (validated by `src/content.config.ts`)
```
title: ≤70 chars, unique per page          description: 50–165 chars, unique
h1: optional (defaults to title)           answer: 50–80 WORDS, direct answer to the page's core question
kind: hub | pillar | spoke | article | tool | legal
medical: true if the page makes any health claim (adds disclaimer + MedicalWebPage)
updated: 2026-11-23
faq: [{q, a}] — 3–6 real user questions, answers 30–80 words
sources: [{title, url, publisher, year?}]   related: ["cannabinoids/cbd", ...] (slugs that exist or will exist)
```
Quote strings containing colons. Escape nothing else; keep YAML valid.

## Length (body words, excluding frontmatter/FAQ)
pillar ≥1500 · spoke ≥800 · hub 400–700 (children are auto-listed) · legal/faq 300+

## Tone
Educational, neutral, respectful. Every paragraph adds a fact (numbers, temperatures, concentrations, mechanisms).
Banned: revolutionary, miracle, game-changer, holistic, transformative, "scientists proved", clickbait, encouraging use, buying/selling/dealer info, hype.
Medical claims: state evidence level honestly ("preclinical", "small trials", "approved drug X for Y"). Never promise efficacy.
Harm reduction is fine and expected (risks, interactions, who should avoid, driving, adolescents, pregnancy).
Do **not** invent facts, studies, statistics, PMIDs or laws. If unsure, say less or say "evidence is limited". Law pages: describe the position in general terms, say it changes, name the official source, never give advice on evading law.

## Sources
Only link URLs you are certain exist and are stable landing pages, e.g.:
NIDA https://nida.nih.gov/research-topics/cannabis-marijuana · NCCIH https://www.nccih.nih.gov/health/cannabis-marijuana-and-cannabinoids-what-you-need-to-know ·
PubChem compound pages (https://pubchem.ncbi.nlm.nih.gov/compound/<Name>) · EUDA https://www.euda.europa.eu/topics/cannabis_en (or the country-profile index) · WHO https://www.who.int/teams/mental-health-and-substance-use/alcohol-drugs-and-addictive-behaviours/drugs-psychoactive/cannabis ·
FDA https://www.fda.gov/consumers/consumer-updates/what-you-need-know-and-what-were-working-find-out-about-products-containing-cannabis-or-cannabis · PubMed search URLs (https://pubmed.ncbi.nlm.nih.gov/?term=...) are acceptable and stable; individual PMIDs only if you are certain.
Include 2–5 sources per page. Cite in prose ("according to NIDA…") where a figure is given.

## Structure
Intro (no "In this article") → H2 sections with a one-sentence takeaway first → tables where comparing → "Risks and who should be careful" on any health/consumption page → no conclusion fluff.
Use H2/H3 only (H1 is generated). Internal links: markdown `[text](/en/cannabinoids/cbd/)` with the page's own language prefix.

## MDX rules (important — build breaks otherwise)
- Never write a bare `<` or `{` or `}` in prose. Write "less than 5%" / "below"; use ≤ ≥ symbols.
- Components are auto-available (no imports):
  `<ComparisonTable caption="" columns={['A','B']} rows={[['x','y']]} />`
  `<TerpeneGrid lang="en" items={[{name,aroma,found,note?,color?,slug?}]} />`
  `<GrowCalendar lang="en" caption="" stages={[{label,start:3,end:5,color?}]} />`  (months 1–12)
  `<ChemicalDiagram lang="en" name="" formula="C21H30O2" molarMass="314.46" />` (no SVG child unless supplied)
- Subscripts: write ₂ ₃ characters or plain text.
- Tables: put strings with commas inside quotes, no `<`/`{` in cells.

## Brand
Green `#4bd12e`; no emoji in body copy.
