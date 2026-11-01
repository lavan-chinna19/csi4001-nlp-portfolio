# BEYOND WORDS — CSI4001 NLP Portfolio

*An Exploration of Natural Language Processing and Computational Linguistics.*

An interactive academic portfolio for **CSI4001 · Natural Language Processing and Computational Linguistics** (4 credits, 45 lecture hours) by **Lavan Kumar** (Reg. no. 23MID0108), Data Science, VIT Vellore. It is designed as a digital magazine: a cover, then four chapters.

| Route | Page | Character |
| --- | --- | --- |
| `/` | Home — magazine cover with an animated dependency/attention visual | charcoal |
| `/about` | About Me — *The person behind the words* | charcoal + ivory fact sheet |
| `/project` | My Project — LexAudit case file, interactive pipeline + architecture | charcoal technical file |
| `/learning` | My Learning — *How my understanding of language changed*, 8 modules, 10 live demos | charcoal header + ivory notebook |
| `/exhibits` | Projects That Made Me Think — 9 real NLP projects + connection map | charcoal gallery, lime highlights |
| `*` | 404 | charcoal |

**Stack:** React 18 · TypeScript · Vite 5 · Tailwind CSS 3 · Framer Motion · lucide-react · react-router-dom. No other UI libraries. Fonts (Instrument Serif, Manrope, IBM Plex Mono — SIL OFL) are self-hosted in `public/fonts/`.

---

## Folder structure

```
csi4001-nlp-portfolio/
├── index.html              # static meta, OG tags, font preloads
├── vercel.json             # SPA rewrite → /index.html
├── public/
│   ├── favicon.svg
│   ├── og-cover.jpg        # social preview (screenshot of the cover)
│   ├── fonts/              # self-hosted woff2 files
│   └── images/
│       ├── project/*.webp               # LexAudit presentation photos (gallery)
│       └── exhibits/*.webp              # GitHub OpenGraph cards of each repo
└── src/
    ├── content/            # ALL text lives here — edit these, not the UI
    │   ├── site.ts         # name, reg. no., tagline, links, nav, per-page meta, showDraftTags
    │   ├── about.ts        # About page facts, sections, placeholders
    │   ├── project.ts      # LexAudit case study (facts from the repo docs only)
    │   ├── syllabus.ts     # 8 CSI4001 modules → concepts → reflections + demo ids
    │   ├── exhibits.ts     # 9 external projects
    │   ├── conceptMap.ts   # concepts for the connection map (+ module links)
    │   └── types.ts        # Reflection type + draft() helper
    ├── components/         # Layout, Page, SectionToc, ArcSentence, Pipeline, ConnectionMap…
    ├── demos/              # 10 in-browser demos (lazy-loaded)
    ├── lib/                # porter.ts (Porter stemmer), nlp.ts (edit distance, bigram LM,
    │                       #   CFG parser, toy POS tagger, sentiment, summarizer), text.ts
    ├── pages/              # Cover, About, Project, Learning, Exhibits, NotFound
    ├── fonts.css · index.css · App.tsx · main.tsx
```

## Install, develop, build

Requires Node 18+ (built with Node 22).

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # tsc --noEmit && vite build → dist/
npm run preview    # serve the production build locally
npx tsc --noEmit   # type-check only
```

## Editing content

Everything you read on the site comes from `src/content/`. The UI never needs to change to add content.

- **Add a learning note:** add a `Concept` object to a module in `syllabus.ts`. Optional `demo: 'tokenizer' | 'stemmer' | …` attaches a demo (shown once per module).
- **Add an exhibit:** add an object to `exhibits.ts` (verify the repo URL first), drop its image into `public/images/exhibits/`, and list its `concepts` ids from `conceptMap.ts`. The connection map updates automatically.
- **Add a map concept:** add it to `conceptMap.ts` (and to the `ConceptId` union); set `module` to a syllabus module id or `null`.
- **Page titles/descriptions:** `pageMeta` in `site.ts`.

## Replacing placeholders

Two kinds of placeholder exist:

- **`PLACEHOLDER` fields (Version 2).** Editable fields set to the `PLACEHOLDER` constant (an empty string, defined in `src/content/types.ts`) render as a subtle dashed **“Add your … here”** box. Replace `PLACEHOLDER` with your own text and the box disappears. Every one is marked with a `TODO(lavan)` comment — search for it.
- **`[square brackets]`** in older text render with a dashed outline.

| What | Where |
| --- | --- |
| How I Learn (5 sub-sections), Future Aspirations (5 fields) | `about.ts` → `howILearn.blocks[].body`, `aspirations.fields[].body` |
| LinkedIn, email, GitHub | `about.ts` → `contact` (site footer reads the same values via `site.ts`; `mailto:` is added for email) |
| Project: full description, motivation, gap (3 fields) | `project.ts` → `fullDescription`, `motivation`, `gap` |
| Project: website prompts — actual prompt text, changes after generation | `project.ts` → `prompts[].actualPrompt`, `prompts[].changesAfter` |
| Project: gallery captions / intro | `project.ts` → `gallery.images[].caption`, `gallery.intro` |
| Project: architecture diagram image, technical-overview image | `project.ts` → `architectureDiagramImage`, `technicalOverviewImage` (`null` shows an “Add image” box; set to `{ src, alt, caption, width, height }` and put the file in `public/images/project/`) |
| Project: optional notes (stack, data, users, own example) | `project.ts` → `techStackNote`, `datasetsNote`, `users.note`, `example.ownExample` |
| Presentation embed | `project.ts` → `presentation.embedPresentation` (keep `false` until the Google Slides deck is shared as “Anyone with the link can view”; then `true` shows the `/embed` viewer) |
| Topic list confirmation | `syllabus.ts` → each module's `topicsConfirmed` (data only) |

## Approving draft reflections

Every first-person reflection (what I knew before, what I learned, what surprised me, what caught my attention, why I liked it, my takeaway, perspectives) is a **draft** written as a starting point — not a statement of what Lavan actually thinks. Drafts show a small mono tag **DRAFT · AWAITING REVIEW**.

To approve one, rewrite it in your own words and change

```ts
whatILearned: draft('…'),
```
to
```ts
whatILearned: { text: 'My own words…', status: 'approved' },
```

When every reflection is reviewed, you can also hide all tags at once with `showDraftTags: false` in `src/content/site.ts`.

## Honesty notes

- **LexAudit** facts come only from the repository (`main` = `codex/lexaudit-personal-release`, commit `e5436ea`): README, CONTRIBUTORS.md and docs/ (KNOWN_LIMITATIONS, RESEARCH_VALIDITY_STATUS, data_governance, system_card, PHASE2_IMPLEMENTATION_REPORT). Test counts are software verification, not accuracy. Individual contribution is a placeholder.
- **Demos** run fully client-side. The Porter stemmer and edit distance are complete algorithms; the tokenizer subword mode, lemma table, POS tagger, morphology set, CFG, sentiment lexicon and WordNet data are small and labelled as toys / static.
- **Exhibit** URLs were checked (HTTP 200) on 2026-11-01; images are each repo's own GitHub social card.

## Deploy to Vercel (not yet deployed)

1. Push this folder to a new GitHub repository (e.g. `csi4001-nlp-portfolio`).
2. In Vercel: **Add New → Project → Import** the repository.
3. Framework preset: **Vite**. Build command: `npm run build`. Output directory: `dist`.
4. Deploy. `vercel.json` already rewrites all routes to `/index.html`, so `/about`, `/learning` etc. work on refresh.
5. Optionally update `og:image` in `index.html` to the absolute deployed URL.
