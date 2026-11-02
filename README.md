# Lavan Kumar – NLP Portfolio (CSI4001)

*An Exploration of Natural Language Processing and Computational Linguistics.*

An interactive academic portfolio for **CSI4001 · Natural Language Processing and Computational Linguistics** (4 credits, 45 lecture hours) by **Lavan Kumar** (Reg. no. 23MID0108), Data Science, VIT Vellore. It is designed as a digital magazine: a cover, then five chapters.

| Route | Page | Character |
| --- | --- | --- |
| `/` | Home — magazine cover with an animated dependency/attention visual | charcoal |
| `/about` | About Me — *The person behind the words* | charcoal + ivory fact sheet |
| `/project` | My Project — LexAudit case file, interactive pipeline + architecture | charcoal technical file |
| `/learning` | My Learning — *How my understanding of language changed*, 8 modules, 10 live demos | charcoal header + ivory notebook |
| `/exhibits` | Projects That Made Me Think — six CSI4001 class projects: LexAudit (mine) + five classmates' projects | charcoal editorial collection, sage/lime lesson panels |
| `/contributions` | Classroom Contributions — *Beyond the Classroom*: stars and recognition received in CSI4001 classes | charcoal header + ivory journal |
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
│       ├── contributions/               # evidence images for Classroom Contributions
│       └── exhibits/*.webp              # LexAudit repository card (used by project.ts)
└── src/
    ├── content/            # ALL text lives here — edit these, not the UI
    │   ├── site.ts         # name, reg. no., tagline, links, nav, per-page meta, showDraftTags
    │   ├── about.ts        # About page facts, sections, placeholders
    │   ├── project.ts      # LexAudit case study (facts from the repo docs only)
    │   ├── syllabus.ts     # 8 CSI4001 modules → concepts → reflections + demo ids
    │   ├── exhibits.ts     # 6 CSI4001 class projects (LexAudit + 5 classmates)
    │   ├── contributions.ts # Classroom Contributions entries + categories (instructions inside)
    │   └── types.ts        # Reflection type + draft() helper
    ├── components/         # Layout, Page, SectionToc, ArcSentence, Pipeline, PresentationGallery…
    ├── demos/              # 10 in-browser demos (lazy-loaded)
    ├── lib/                # porter.ts (Porter stemmer), nlp.ts (edit distance, bigram LM,
    │                       #   CFG parser, toy POS tagger, sentiment, summarizer), text.ts
    ├── pages/              # Cover, About, Project, Learning, Exhibits, Contributions, NotFound
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
- **Class projects (/exhibits):** edit `classProjects` in `exhibits.ts`. Each entry has exactly four points, one reflection, one NLP lesson. To show a presentation cover slide, add `coverImage: { src, alt, width, height }`; it replaces the title-based visual and opens in a larger view.
- **Page titles/descriptions:** `pageMeta` in `site.ts`.

## Optional fields (nothing renders until filled)

The site never shows placeholder boxes. Optional fields are set to the `PLACEHOLDER` constant (an empty string, `src/content/types.ts`) and are simply **not rendered** while empty. Fill one in and it appears automatically. Every one is marked with a `TODO(lavan)` comment — search for it.

| What | Where |
| --- | --- |
| LinkedIn, email, GitHub | `about.ts` → `contact` (shown in the About fact sheet and the site footer; `mailto:` is added for email) |
| Future Aspirations wording | `about.ts` → `aspirations.intro`, `aspirations.closing`, `aspirations.areas` |
| Project: full description, motivation (own words), gap (3 fields, own words) | `project.ts` → `fullDescription`, `motivation`, `gap` (the factual `motivationFacts` / `gapFacts` are always shown) |
| Project §07: prompts used in building LexAudit (title, aim, outcome — no prompt text) | `project.ts` → `promptsIntro`, `prompts[]` |
| Project: gallery intro | `project.ts` → `gallery.intro` |
| Project: architecture diagram image, technical-overview image | `project.ts` → `architectureDiagramImage`, `technicalOverviewImage` (`null` renders nothing; set to `{ src, alt, caption, width, height }` and put the file in `public/images/project/`) |
| Project: optional notes (stack, data, users, own example) | `project.ts` → `techStackNote`, `datasetsNote`, `users.note`, `example.ownExample` |
| Presentation embed | `project.ts` → `presentation.embedPresentation` (keep `false` until the Google Slides deck is shared as “Anyone with the link can view”) |
| Topic list confirmation | `syllabus.ts` → each module's `topicsConfirmed` (data only, never shown) |

## Classroom Contributions

All figures on `/contributions` (total stars, entries, session dates, category counts, timeline, evidence gallery) are computed from `recognitionEntries` in `src/content/contributions.ts`. With no entries the page shows dashes and one empty-state message. To add an entry, copy the commented example at the bottom of that file, fill in real values, and put any evidence images in `public/images/contributions/`. Only record what actually happened.

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

- **LexAudit** facts come only from the repository (`main` = `codex/lexaudit-personal-release`, commit `e5436ea`): README, CONTRIBUTORS.md and docs/ (KNOWN_LIMITATIONS, RESEARCH_VALIDITY_STATUS, data_governance, system_card, PHASE2_IMPLEMENTATION_REPORT). Test counts are software verification, not accuracy. Public-facing text carries no file/path or documentation attributions (Version 4); sources are listed only in §10 References. Individual contribution is not described.
- **Demos** run fully client-side. The Porter stemmer and edit distance are complete algorithms; the tokenizer subword mode, lemma table, POS tagger, morphology set, CFG, sentiment lexicon and WordNet data are small and labelled as toys / static.
- **Projects That Made Me Think** uses only Lavan's own written notes on the six CSI4001 projects; the five classmates' projects are presented as projects he explored, not ones he built. No team names, metrics or screenshots are added.

## Deploy to Vercel (not yet deployed)

1. Push this folder to a new GitHub repository (e.g. `csi4001-nlp-portfolio`).
2. In Vercel: **Add New → Project → Import** the repository.
3. Framework preset: **Vite**. Build command: `npm run build`. Output directory: `dist`.
4. Deploy. `vercel.json` already rewrites all routes to `/index.html`, so `/about`, `/learning` etc. work on refresh.
5. Optionally update `og:image` in `index.html` to the absolute deployed URL.
