/**
 * LexAudit case study — Lavan's CSI4001 course project (Version 2 write-up).
 *
 * FACTS below come ONLY from the project repository,
 * https://github.com/lavan-chinna19/Legal-contract-coherence-auditor-
 * branch `main` at commit 7b1da3f (2026-11-01). That commit is a descendant of
 * `codex/lexaudit-personal-release` (e5436ea) and adds the research-freeze work.
 * Files used: README.md, CONTRIBUTORS.md, requirements.txt, requirements-release.txt,
 * frontend/package.json, docker-compose.yml, Dockerfile.*, deploy/nginx.conf,
 * docs/system_card.md, docs/data_governance.md, docs/THIRD_PARTY_NOTICES.md,
 * docs/KNOWN_LIMITATIONS.md, docs/RESEARCH_VALIDITY_STATUS.md,
 * docs/FINAL_SOURCE_PARSING_AND_RESEARCH_FREEZE.md, docs/PERSONAL_MAIN_RELEASE_2026_11_01.md,
 * demo_ready/FINAL_DEMO_README.md, and source under src/ (cited per item).
 *
 * OPTIONAL FIELDS: anything set to `PLACEHOLDER` (search for `TODO(lavan)`)
 * is NOT rendered. Replace `PLACEHOLDER` with your own words and it appears.
 * Image slots set to `null` render nothing until you add an image.
 */
import { PLACEHOLDER, type Editable, type ImageSlot } from './types';

export const courseProjectStatus = 'confirmed' as const;

const DECK_ID = '1_hqepQPc03hRKblkvjQvncj8B3RhQS3-';

export const project = {
  name: 'LexAudit',
  fullName: 'Legal Contract Coherence Auditor',
  title: 'LexAudit – Legal Contract Coherence Auditor',
  repo: 'https://github.com/lavan-chinna19/Legal-contract-coherence-auditor-',
  repoCommit: 'main @ 7b1da3f (1 Nov 2026)',
  image: '/images/exhibits/lavan-chinna19_legal-contract-coherence-auditor-.webp',

  /** Headline status shown in the case header. */
  statusLabel: 'ACADEMIC PROJECT · PRESENTED',
  disclaimer: 'Research decision support — not legal advice.',
  team: [
    { handle: 'GoutamNandhen', href: 'https://github.com/GoutamNandhen' },
    { handle: 'lavan-chinna19', href: 'https://github.com/lavan-chinna19' },
  ],

  /** "View project presentation" button + optional embed. */
  presentation: {
    label: 'View project presentation',
    url: `https://docs.google.com/presentation/d/${DECK_ID}/edit?slide=id.p1#slide=id.p1`,
    /**
     * Keep `false` while the deck is private (an unauthenticated request returned 401
     * on 1 Nov 2026). After sharing it as "Anyone with the link can view", set to
     * `true` to show an embedded viewer under the button.
     */
    embedPresentation: false,
    embedUrl: `https://docs.google.com/presentation/d/${DECK_ID}/embed?start=false&loop=false&delayms=3000`,
  },

  /** Project Presentation / Demonstration gallery (images in public/images/project/). */
  gallery: {
    title: 'Project presentation / demonstration',
    // TODO(lavan): optional one-line intro for the gallery.
    intro: PLACEHOLDER as Editable,
    images: [
      {
        src: '/images/project/lexaudit-presentation-1.webp',
        alt: 'A presenter standing at a whiteboard beside a projected slide titled “The Problem”.',
        // TODO(lavan): edit caption if you like.
        caption: 'Presenting the problem LexAudit addresses',
        width: 800,
        height: 450,
      },
      {
        src: '/images/project/lexaudit-presentation-2.webp',
        alt: 'A presenter standing beside a projected slide titled “How LexAudit Works”.',
        // TODO(lavan): edit caption if you like.
        caption: 'Walking through how LexAudit works',
        width: 800,
        height: 450,
      },
    ] satisfies ImageSlot[],
  },

  /* ───────────────────────── 01 · Title ───────────────────────── */
  /** Factual short summary (from README.md "Features"). */
  summary:
    'A local legal-NLP research application. It reads a contract clause by clause and flags out-of-place clauses, broken cross-references and conflicting dates. Each flag carries a severity, an explanation and, where it can, a suggested position.',
  /** "At a glance" rows for §01 — each restates facts documented further down the page. */
  glance: [
    { k: 'Input', v: 'A contract as TXT, PDF (text-based) or DOCX.' },
    { k: 'Analysis', v: 'Frozen Legal-BERT clause embeddings, two scoring channels, and reference and date rules — on a local CPU.' },
    { k: 'Output', v: 'Flags with a severity, an explanation and, where possible, a suggested position; PDF and DOCX reports.' },
    { k: 'Positioning', v: 'Research decision support for a human reviewer — not legal advice.' },
  ],
  // TODO(lavan): optional — full project description in your own words. Shown only when filled.
  fullDescription: PLACEHOLDER as Editable,

  /* ───────────────────────── 02 · Motivation ───────────────────────── */
  /**
   * Repository-grounded framing (always shown, attributed to the repo).
   * It states what the system is FOR — not why the team personally chose it.
   */
  motivationFromRepo: {
    statement:
      'LexAudit is built to check a contract’s internal structure, clause by clause: whether each clause sits where it belongs, whether cross-references point to real sections, and whether dates contradict each other.',
    points: [
      'Primary intended use: academic and research evaluation of contract structure, clause-order anomalies, missing standard terms and dangling internal references.',
      'Outputs are research decision support for a human reviewer — not legal advice and not a replacement for licensed attorney review.',
    ],
    source: 'docs/system_card.md · README',
  },
  // TODO(lavan): optional — why the team built LexAudit, in your own words. Shown only when filled.
  motivation: PLACEHOLDER as Editable,

  /* ─────────────── 03 · Existing gap / event that motivated it ─────────────── */
  /**
   * Repository-grounded framing of the gap (always shown, attributed).
   * The repo does not compare LexAudit with other tools, so no claims about
   * "existing approaches" are made here.
   */
  gapFromRepo: [
    {
      k: 'a',
      title: 'The problem it targets',
      text: 'Coherence problems inside a single contract: clauses that are out of place, cross-references that point nowhere, and dates that conflict.',
      source: 'README · Features',
    },
    {
      k: 'b',
      title: 'Constraints it designs for',
      text: 'Contract text stays on the machine: analysis runs on a local CPU, uploads are encrypted at rest with retention defaulting to 24 hours, and no paid LLM API is used for core inference.',
      source: 'README · docs/system_card.md · docs/data_governance.md',
    },
    {
      k: 'c',
      title: 'How it responds',
      text: 'Two scoring channels (semantic and adjacent-clause coherence) plus reference and date rules. Flags come with a severity and an explanation, and position suggestions can abstain when the evidence is ambiguous.',
      source: 'README · src/scoring · src/rules · src/xai',
    },
  ],
  /** Optional, in Lavan's own words — each renders only when filled. */
  gap: {
    // TODO(lavan): optional — fill any of these three in your own words.
    existingChallenges: PLACEHOLDER as Editable,
    limitationsOfExistingApproaches: PLACEHOLDER as Editable,
    whyOurApproachIsNeeded: PLACEHOLDER as Editable,
  },

  /* ───────────────────────── 04 · Architecture ───────────────────────── */
  /** Verified in docker-compose.yml + deploy/nginx.conf. */
  architecture: [
    { id: 'fe', label: 'Frontend', tech: 'Next.js 16 · React 19 · TypeScript' },
    { id: 'gw', label: 'Gateway', tech: 'Nginx 1.28 (reverse proxy)' },
    { id: 'be', label: 'Backend API', tech: 'FastAPI · Uvicorn · PyTorch (CPU)' },
    { id: 'db', label: 'Database', tech: 'PostgreSQL 16 (Docker) · SQLite natively' },
  ],
  architectureCaption:
    'Frontend, gateway, backend and PostgreSQL form the default Docker Compose deployment. The backend and database (sage outline) sit on an internal network, and host ports bind only to loopback (README · docker-compose.yml).',
  /** Optional hand-drawn / exported architecture diagram. `null` shows an "Add diagram" box. */
  // TODO(lavan): add an architecture diagram image, e.g. { src: '/images/project/architecture.webp', alt, caption, width, height }.
  architectureDiagramImage: null as ImageSlot | null,
  /** Third presentation image slot (technical overview). `null` shows an "Add image" box. */
  // TODO(lavan): add the technical-overview image, e.g. { src: '/images/project/lexaudit-technical-overview.webp', alt, caption, width, height }.
  technicalOverviewImage: null as ImageSlot | null,

  components: [
    {
      name: 'Frontend',
      path: 'frontend/',
      text: 'Next.js App Router application with four primary sections — New Audit, Audit Results, Reports & History, Settings — plus optional Research Tools (model evaluation, compatibility maps, robustness experiments). Access keys stay in page memory only.',
    },
    {
      name: 'Gateway',
      path: 'deploy/nginx.conf',
      text: 'Nginx reverse proxy in front of the API (11 MB request bodies, 180 s read timeout). It is the only backend entry point exposed to the host.',
    },
    {
      name: 'Backend API',
      path: 'src/api/',
      text: 'FastAPI service: API-key sign-in, per-client document ownership, bounded ingestion, a single-worker analysis job queue, encrypted history, reports and reviewer feedback.',
    },
    {
      name: 'Analysis engine',
      path: 'src/segmentation · src/embeddings · src/scoring · src/rules · src/xai',
      text: 'Clause segmentation, frozen Legal-BERT embeddings, the two scoring channels, severity ranking with conformal calibration, reference/date rules, explanations and counterfactual position suggestions.',
    },
    {
      name: 'Storage',
      path: 'src/api/storage.py · docker-compose.yml',
      text: 'Uploads and completed analyses are encrypted with Fernet; reviewer feedback goes to SQLite natively or PostgreSQL 16 in Docker. Retention defaults to 24 hours.',
    },
    {
      name: 'Frozen model assets',
      path: 'models/ · fixtures/',
      text: 'The small coherence head (models/coherence_classifier.pt), LEDGAR-derived centroids (fixtures/ledgar_centroids.npz) and the conformal calibration fixture ship with the repo; Legal-BERT weights are downloaded once and then used offline.',
    },
  ],

  /** User workflow (README "Native launch" + "UI workflow update"). */
  workflow: [
    { step: 'Connect', text: 'In Settings, enter an access key and connect to the local engine.' },
    { step: 'Upload & preview', text: 'In New Audit, acknowledge the privacy notice, choose a file and preview its clauses.' },
    { step: 'Analyze', text: 'Run the analysis locally on CPU.' },
    { step: 'Review', text: 'Audit Results: flags, severity, explanations and suggested positions.' },
    { step: 'Export', text: 'Reports & History: download PDF/DOCX reports or reopen saved analyses.' },
  ],

  /** Model architecture details — each value cites the file it comes from. */
  modelDetails: [
    {
      k: 'Encoder',
      v: 'nlpaueb/legal-bert-base-uncased, loaded through sentence-transformers on CPU with all weights frozen; 768-dimensional, normalised clause embeddings, cached per clause.',
      src: 'src/embeddings/frozen.py · src/config.py',
    },
    {
      k: 'Channel A · semantic',
      v: 'Cosine distance from each clause embedding to the nearest of 66 LEDGAR-derived clause-type centroids, rescaled to a 0–1 anomaly score; top-3 nearest centroids kept as evidence.',
      src: 'src/scoring/channel_a.py · fixtures/ledgar_centroids.npz',
    },
    {
      k: 'Channel B · coherence head',
      v: 'For each adjacent clause pair (u, v), the feature vector [u, v, |u−v|, u·v] (4 × 768) goes through an MLP: Linear 3072→256 · LayerNorm · ReLU · Dropout 0.2 → Linear 256→64 · ReLU · Dropout → Linear 64→1 · sigmoid. Transition anomaly = 1 − P(coherent).',
      src: 'src/coherence/model.py · src/scoring/channel_b.py',
    },
    {
      k: 'Head training (recorded run)',
      v: 'Binary cross-entropy (BCEWithLogits), AdamW, learning rate 0.001, batch 32, 12 epochs on 894 clause pairs (716 train / 178 validation) built from SEC EDGAR contracts with positive, easy-negative and hard-negative pairs.',
      src: 'train_coherence_model.py · src/coherence/trainer.py · fixtures/coherence_training_curves.json',
    },
    {
      k: 'Ensemble & severity',
      v: 'Combined score = α·A + (1−α)·B with α = 0.5; tiers HIGH / MEDIUM / LOW / CLEAN using thresholds 0.75 / 0.50 (marked as targets in config), cross-channel agreement and conformal interval width.',
      src: 'src/scoring/pipeline.py · src/scoring/severity.py · src/config.py',
    },
    {
      k: 'Calibration',
      v: 'Split-conformal intervals (crepes) fitted only on synthetic same-document shuffles: 108 calibration samples, target coverage 0.9.',
      src: 'src/calibration/conformal.py · fixtures/conformal_calibration_fixture.json',
    },
  ],

  /** What the application does (README "Features"). */
  features: [
    { title: 'Ingestion', text: 'TXT, PDF and DOCX input with bounded parsing, a clause preview, and consistent clause identities and source spans.' },
    { title: 'Inference on local CPU', text: 'Frozen Legal-BERT embeddings, LEDGAR-derived semantic centroids (Channel A), learned adjacent-clause compatibility (Channel B), severity ranking and synthetic-shuffle conformal calibration.' },
    { title: 'Rules', text: 'Reference and date checks, plus an experimental dependency graph that uses explicit directional-reference evidence and abstains on ambiguous targets.' },
    { title: 'Explainability', text: 'Token-level Integrated Gradients (Captum) and neighbor sensitivity. Counterfactual position suggestions come with evidence and can abstain — they do not apply edits.' },
    { title: 'Robustness Lab', text: 'Opt-in synthetic perturbations and negative controls.' },
    { title: 'Review & reporting', text: 'Encrypted saved analyses (Fernet), history, clause review, analytics, PDF/DOCX reports and reviewer feedback.' },
  ],

  /** Repository maturity — shown inside the technical section, not as the headline. */
  repositoryStatus: {
    line: 'Repository status: demo-ready with documented limitations — not production-ready.',
    detail:
      'The README labels the application DEMO_READY_WITH_LIMITATIONS. The 28 Oct 2026 research freeze classifies it as a reproducible native research prototype with explicit limits. Docker runtime for that latest revision is recorded as unverified, and general distant-clause contradiction detection remains NO-GO.',
  },

  verification: {
    note: 'These numbers describe software verification — tests passing — not model accuracy.',
    figures: [
      { value: '484', label: 'native regression tests passed', sub: '0 failed · 2 optional CUAD skips · research freeze, re-run 1 Nov 2026' },
      { value: '20', label: 'frontend workflow tests passed', sub: 'plus 17 alignment assertions' },
      { value: '103', label: 'Docker HTTP/runtime assertions', sub: 'earlier application release (Oct 2026)' },
      { value: '14', label: 'image/storage checks', sub: 'earlier application release' },
      { value: '10', label: 'browser assertions', sub: 'earlier application release' },
    ],
    caveat:
      'Counts overlap and are not summed. No legal-accuracy claim is made: model scores and synthetic conformal bounds are exploratory signals, not calibrated probabilities of legal defects.',
    source: 'README · docs/FINAL_SOURCE_PARSING_AND_RESEARCH_FREEZE.md · docs/PERSONAL_MAIN_RELEASE_2026_11_01.md',
  },

  /** From docs/RESEARCH_VALIDITY_STATUS.md — external validation still outstanding. */
  validity: {
    statement: 'Application functionality and scientific validity are treated separately. Historical development metrics are labelled exploratory; they are not legal accuracy estimates.',
    blockers: [
      'Independent qualified human annotation and adjudication.',
      'Newly acquired unseen-family evaluation, with the protocol frozen before exposure.',
      'Independent security assessment and real deployment acceptance.',
    ],
  },

  limitations: [
    'Qualified legal annotation and unseen-family confirmatory evaluation are still outstanding.',
    'CPU processing can be slow.',
    'Scanned PDFs need external OCR; malformed or encrypted documents are rejected.',
    'Runs with a single API worker: running jobs and rate limits are process-local.',
    'Practical limits: 10 MB files, 100 PDF pages, 250,000 extracted characters, 500 clauses.',
    'The experimental reference graph handles explicit numeric section identities and narrow direction markers; ambiguous targets, Roman numerals and vague references need human review.',
    'Clause locations refer to normalised extracted text, not original PDF page coordinates or DOCX layout.',
    'Docker runtime for the latest (research-freeze) revision is unverified; general distant-clause contradiction detection is NO-GO.',
  ],

  /* ───────────────────────── 05 · Complete tech stack ───────────────────────── */
  /** `items: []` renders a placeholder row. Every filled item is in the repo. */
  techStack: [
    { category: 'Programming languages', items: ['Python 3.11', 'TypeScript 5', 'CSS'], source: 'README · Dockerfile.backend · frontend/package.json' },
    { category: 'Frontend', items: ['Next.js 16.4.3 (App Router)', 'React 19.3', 'lucide-react'], source: 'frontend/package.json' },
    { category: 'Backend', items: ['FastAPI', 'Uvicorn', 'Pydantic', 'python-multipart', 'HTTPX', 'cryptography (Fernet)'], source: 'requirements.txt' },
    { category: 'NLP libraries', items: ['Hugging Face Transformers 5.15.1', 'sentence-transformers 6.0.0', 'spaCy 3.8.15', 'dateparser', 'Hugging Face datasets', 'pdfplumber', 'python-docx', 'defusedxml'], source: 'requirements.txt · requirements-release.txt' },
    { category: 'ML models', items: ['Legal-BERT (nlpaueb/legal-bert-base-uncased, frozen)', 'Coherence head (models/coherence_classifier.pt)', 'LEDGAR clause-type centroids', 'scikit-learn', 'MAPIE · crepes (conformal)', 'Captum (attribution)'], source: 'src/config.py · requirements.txt · README' },
    { category: 'Deep-learning frameworks', items: ['PyTorch 2.13.0 (CPU build)'], source: 'requirements.txt · README' },
    { category: 'Database & storage', items: ['PostgreSQL 16 (Docker feedback)', 'SQLite (native feedback)', 'Fernet-encrypted file storage', 'Docker named volumes'], source: 'README · docker-compose.yml' },
    { category: 'Development tools', items: ['pytest 9.1.1', 'ESLint 9', 'TypeScript compiler', 'Git / GitHub'], source: 'requirements.txt · frontend/package.json · README' },
    { category: 'Deployment infrastructure', items: ['Docker Compose', 'python:3.11-slim-bookworm', 'node:24.13.1-alpine', 'nginx:1.28-alpine', 'postgres:16-alpine', 'Local CPU · loopback-only ports'], source: 'docker-compose.yml · Dockerfile.backend · Dockerfile.frontend' },
  ],
  // TODO(lavan): optional note on the stack in your own words.
  techStackNote: PLACEHOLDER as Editable,

  /* ───────────────────────── 06 · Datasets used ───────────────────────── */
  /** Each field is filled only where the repo states it; `PLACEHOLDER` otherwise. */
  datasets: [
    {
      name: 'LEDGAR (via LexGLUE)',
      source: 'Hugging Face lex_glue dataset, ledgar config (Tuggener et al., 2020).',
      size: 'About 60,000 labelled contract provisions from SEC EDGAR filings.',
      format: 'Hugging Face dataset with train / validation / test splits, normalised into clause records saved as JSON Lines (src/data/ingest_ledgar.py).',
      preparation: 'A label-balanced sample of the train split (at most 20 clauses per label, up to 500 clauses) is embedded with frozen Legal-BERT and averaged into unit-normalised clause-type centroids — 66 stored in fixtures/ledgar_centroids.npz (build_centroids.py).',
      usage: 'Reference centroids for Channel A semantic scoring. The system card also reports exploratory clause-order checks on shuffled LEDGAR provisions.',
      limitations: 'The LexGLUE card shows CC BY 4.0 metadata but asks for more licensing information; underlying-document terms need separate review. Downloaded at ingestion time, not redistributed.',
    },
    {
      name: 'SEC EDGAR EX-10 contracts',
      source: 'Public SEC EDGAR full-text search of 10-K filings, from which EX-10.x material-contract exhibits are downloaded (src/data/ingest_edgar.py).',
      size: 'System card: 50 clean, executed commercial agreements for false-positive estimation. Coherence-head training used 894 clause pairs from these contracts.',
      format: 'Exhibit text files in a git-ignored data/raw/sec_edgar/ folder, with a metadata-only manifest (URL, filing date, accession number).',
      preparation: 'HTML is stripped by the rule-based segmenter; contracts with 5–50 clauses are kept and turned into positive (consecutive), easy-negative (cross-document) and hard-negative (same-document) clause pairs (train_coherence_model.py, src/coherence/pair_sampler.py).',
      usage: 'Training and validation of the Channel B coherence head; false-positive-rate estimation.',
      limitations: 'Public filing access is not a blanket copyright grant; raw filings are excluded from Git and need per-document rights review. Requests stay under SEC rate limits.',
    },
    {
      name: 'CUAD',
      source: 'Contract Understanding Atticus Dataset — The Atticus Project (Hendrycks et al., 2021); CUAD_v1.json from the Atticus Hugging Face repository.',
      size: '510 contracts with 13,000+ expert annotations across 41 clause types.',
      format: 'SQuAD-style question-answering JSON (about 40 MB).',
      preparation: 'Downloaded as the canonical JSON and checked for clause order by src/data/ingest_cuad.py.',
      usage: 'Out-of-distribution evaluation corpus.',
      limitations: 'CC BY 4.0 — attribution required. Not bundled; the optional CUAD order report is absent, which is why two tests are skipped.',
    },
    {
      name: 'Synthetic shuffle calibration set',
      source: 'Generated by the project from same-document reorderings (src/calibration/synthetic_generator.py).',
      size: '108 calibration samples in fixtures/conformal_calibration_fixture.json.',
      format: 'JSON calibration state (residuals, quantile, target coverage).',
      preparation: 'Clean orderings plus block shuffles, reversed pairs and full permutations within the same document.',
      usage: 'Fitting the split-conformal calibrator used to attach intervals to combined scores.',
      limitations: 'Synthetic-only: intervals do not quantify legal certainty and are not calibrated probabilities of legal defects.',
    },
  ] as {
    name: string;
    source: Editable;
    size: Editable;
    format: Editable;
    preparation: Editable;
    usage: Editable;
    limitations: Editable;
  }[],
  // TODO(lavan): anything about the data in your own words (e.g. what you learned working with legal text).
  datasetsNote: PLACEHOLDER as Editable,

  /* ───────────── 07 · Prompts used for construction of the website ───────────── */
  promptsNote:
    'These are the prompts used to build this portfolio website. They are not prompts inside the LexAudit NLP system — LexAudit’s default inference uses local models (Legal-BERT and a small coherence head), and its data-governance notes state that no paid LLM API is used for core inference.',
  prompts: [
    {
      title: 'MASTER PROMPT: BUILD, DEPLOY AND ITERATIVELY IMPROVE MY NLP PORTFOLIO',
      version: 'Version 1',
      purpose: 'Create, deploy and iteratively improve the CSI4001 NLP portfolio website.',
      summary: 'Asked an AI agent to build this portfolio, deploy it, and keep improving it.',
      // TODO(lavan): paste the full prompt text.
      actualPrompt: PLACEHOLDER as Editable,
      tool: 'Hark (AI agent)',
      generated: 'Version 1 of this site: the cover plus About Me, My Project, My Learning and Projects That Made Me Think pages (Vite, React, TypeScript, Tailwind CSS, Framer Motion), deployed on Vercel.',
      // TODO(lavan): what you changed after generation.
      changesAfter: PLACEHOLDER as Editable,
    },
    {
      title: 'UPDATE EXISTING NLP PORTFOLIO – VERSION 2',
      version: 'Version 2',
      purpose: 'Update the existing site without redesigning it.',
      summary: 'Asked for a ten-section project write-up, a presentation gallery and button, and About page updates (fact sheet, LinkedIn and email, and editable How I Learn and Future Aspirations fields), with no invented content.',
      // TODO(lavan): paste the full prompt text.
      actualPrompt: PLACEHOLDER as Editable,
      tool: 'Hark (AI agent)',
      generated: 'This version: the restructured project page, the presentation gallery with a lightbox, the presentation button and the About page changes.',
      // TODO(lavan): what you changed after generation.
      changesAfter: PLACEHOLDER as Editable,
    },
  ],

  /* ───────────────────────── 08 · NLP pipeline ───────────────────────── */
  /**
   * The eight requested stages mapped to what the repo actually does.
   * `present: false` = not a separate stage in LexAudit's own code.
   */
  pipeline: [
    {
      id: 'input',
      label: 'Input',
      present: true,
      component: 'src/api/ingestion.py · src/api/upload_limits.py',
      text: 'A contract is uploaded as TXT, PDF or DOCX (max 10 MB). Any other extension is refused, and the upload body is size-checked before it is parsed.',
    },
    {
      id: 'extract',
      label: 'Text extraction',
      present: true,
      component: 'parse_document() · pdfplumber · defusedxml',
      text: 'TXT is decoded as UTF-8; PDF text comes from pdfplumber page by page (max 100 pages); DOCX paragraphs are read from word/document.xml with defusedxml, without running macros. Extracted text is capped at 250,000 characters. There is no OCR, so scanned PDFs are rejected.',
    },
    {
      id: 'preprocess',
      label: 'Text preprocessing',
      present: true,
      component: 'RuleBasedSegmenter (src/segmentation/rule_based.py) · src/structure/parser.py',
      text: 'HTML tags are stripped and entities unescaped. The text is split into clauses with regular expressions for “Section/Article” headings, numbered items, (a)/(i) markers and all-caps headings. Each clause keeps an identity and its source span (max 500 clauses). A separate structural parser reads headings and citations from the unchanged text.',
    },
    {
      id: 'tokenize',
      label: 'Tokenization',
      present: false,
      component: 'Inside Legal-BERT’s tokenizer (via sentence-transformers) · spaCy in the reference checker',
      text: 'There is no separate tokenization stage in LexAudit’s own code. Subword (WordPiece) tokenization and truncation happen inside the Legal-BERT tokenizer when clauses are encoded. The reference checker uses spaCy. The frontend groups word-pieces back into whole words when it displays Integrated Gradients attributions (frontend/src/components/explainability/wordpieceGrouping.ts).',
    },
    {
      id: 'represent',
      label: 'Feature representation',
      present: true,
      component: 'FrozenLegalBERTEmbedder (src/embeddings/frozen.py)',
      text: 'Each clause becomes a 768-dimensional vector from frozen Legal-BERT (weights not updated), normalised for cosine similarity and cached so identical clauses are not re-encoded.',
    },
    {
      id: 'model',
      label: 'Model processing',
      present: true,
      component: 'ChannelAScorer · ChannelBScorer · CoherenceScorerHead',
      text: 'Channel A measures distance to the nearest of 66 LEDGAR clause-type centroids. Channel B runs the coherence head on every adjacent clause pair and turns low transition probability into an anomaly score. The two are combined 50/50.',
    },
    {
      id: 'coherence',
      label: 'Coherence analysis',
      present: true,
      component: 'SeverityRanker · ConformalCalibrator · CrossReferenceChecker · temporal analysis · src/xai',
      text: 'Severity tiers (HIGH / MEDIUM / LOW / CLEAN) come from the combined score, cross-channel agreement and conformal interval width. Rule checks look for dangling cross-references and date conflicts. An opt-in dependency graph checks “above/below” references. Integrated Gradients and neighbor sensitivity explain scores, and counterfactual repositioning suggests a position or abstains.',
    },
    {
      id: 'output',
      label: 'Output generation',
      present: true,
      component: 'UnifiedAuditReport · src/api/storage.py · src/api/reports.py',
      text: 'Results are saved as an encrypted snapshot marked REVIEW_REQUIRED or NO_FINDINGS, shown in the review UI, and exported as PDF (ReportLab) or DOCX (python-docx) reports that carry a decision-support disclaimer.',
    },
  ],

  /* ───────────────────── 09 · Users, inputs and outputs ───────────────────── */
  users: {
    intended: [
      { who: 'Academic and research evaluators', why: 'Primary intended use: academic and research evaluation of contract structure, clause-order anomalies, missing standard terms and dangling internal references (docs/system_card.md).' },
      { who: 'Human reviewers', why: 'Outputs are research decision support; a reviewer stays in charge and can leave feedback on flags (README).' },
      { who: 'Faculty and project evaluators', why: 'Audience named in the demo guide (demo_ready/FINAL_DEMO_README.md).' },
    ],
    outOfScope: [
      'Automated contract execution or autonomous legal advisory decisions.',
      'Replacement for licensed attorney review.',
      'Enforceability certification or statutory compliance auditing.',
    ],
    // TODO(lavan): optional — who you personally think would benefit.
    note: PLACEHOLDER as Editable,
  },
  inputs: {
    formats: ['TXT (UTF-8)', 'PDF (text-based)', 'DOCX'],
    limits: [
      { k: 'File size', v: '10 MB' },
      { k: 'PDF pages', v: '100' },
      { k: 'Extracted text', v: '250,000 characters' },
      { k: 'Clauses analysed', v: '500' },
    ],
    notes: 'Scanned PDFs need OCR first; password-protected, damaged or unsupported files are rejected. DOCX headers, footnotes, images and layout are not preserved.',
  },
  outputs: [
    { k: 'Per-clause scores', v: 'Channel A, Channel B and combined scores with evidence (nearest centroids, transition probabilities).' },
    { k: 'Severity', v: 'HIGH / MEDIUM / LOW / CLEAN with a written justification and cross-channel agreement.' },
    { k: 'Rule findings', v: 'Dangling cross-references and date/temporal conflicts, each with source evidence and review categories.' },
    { k: 'Explanations', v: 'Token-level Integrated Gradients and neighbor sensitivity.' },
    { k: 'Suggested position', v: 'Counterfactual repositioning with evidence, or abstention. Edits are never applied.' },
    { k: 'Reports', v: 'PDF and DOCX reports generated from saved results, including empty and uncertain outcomes; encrypted history.' },
  ],
  /** Drawn from the repo's synthetic demo file and the documented demo result. */
  example: {
    inputLabel: 'demo_ready/LexAudit_Broken_Directional_Reference.txt (fictional, synthetic)',
    input:
      'Section 2. Advance Payment\nUnder Section 4 above, Example Party A must issue the payment notice before funds are transferred. …\n\nSection 4. Payment Notice\nExample Party A shall send a written payment notice confirming the amount and the due date.',
    outputLabel: 'Documented result · experimental dependency graph (demo_ready/FINAL_DEMO_README.md)',
    output: [
      { k: 'Status', v: 'FINDING' },
      { k: 'Reference', v: '“Section 4 above”' },
      { k: 'Result', v: 'VERIFIED_TEXTUAL_CONFLICT' },
      { k: 'Reason', v: 'Explicit directional reference contradicts the target’s location (Section 4 appears after Section 2).' },
    ],
    // TODO(lavan): optionally add an example from your own run.
    ownExample: PLACEHOLDER as Editable,
  },

  /* ───────────────────────── 10 · References ───────────────────────── */
  /** Each URL checked (HTTP 200) on 1 Nov 2026. `usedFor` says where the repo relies on it. */
  references: [
    { cite: 'Chalkidis, I., Fergadiotis, M., Malakasiotis, P., Aletras, N., & Androutsopoulos, I. (2020). LEGAL-BERT: The Muppets straight out of Law School. In Findings of the Association for Computational Linguistics: EMNLP 2020 (pp. 2898–2904).', url: 'https://aclanthology.org/2020.findings-emnlp.261/', usedFor: 'Encoder' },
    { cite: 'nlpaueb. (n.d.). legal-bert-base-uncased [Model card]. Hugging Face.', url: 'https://huggingface.co/nlpaueb/legal-bert-base-uncased', usedFor: 'Encoder weights (CC BY-SA 4.0)' },
    { cite: 'Tuggener, D., von Däniken, P., Peetz, T., & Cieliebak, M. (2020). LEDGAR: A Large-Scale Multi-label Corpus for Text Classification of Legal Provisions in Contracts. In Proceedings of the Twelfth Language Resources and Evaluation Conference (pp. 1235–1241).', url: 'https://aclanthology.org/2020.lrec-1.155/', usedFor: 'Channel A centroids' },
    { cite: 'Chalkidis, I., Jana, A., Hartung, D., Bommarito, M., Androutsopoulos, I., Katz, D., & Aletras, N. (2022). LexGLUE: A Benchmark Dataset for Legal Language Understanding in English. In Proceedings of the 60th Annual Meeting of the ACL (Volume 1: Long Papers) (pp. 4310–4330).', url: 'https://aclanthology.org/2022.acl-long.297/', usedFor: 'LEDGAR distribution' },
    { cite: 'coastalcph. (n.d.). lex_glue [Dataset card]. Hugging Face.', url: 'https://huggingface.co/datasets/coastalcph/lex_glue', usedFor: 'LEDGAR download' },
    { cite: 'Hendrycks, D., Burns, C., Chen, A., & Ball, S. (2021). CUAD: An Expert-Annotated NLP Dataset for Legal Contract Review. arXiv:2103.06268.', url: 'https://arxiv.org/abs/2103.06268', usedFor: 'Out-of-distribution evaluation' },
    { cite: 'The Atticus Project. (n.d.). CUAD.', url: 'https://www.atticusprojectai.org/cuad', usedFor: 'CUAD source (CC BY 4.0)' },
    { cite: 'Sundararajan, M., Taly, A., & Yan, Q. (2017). Axiomatic Attribution for Deep Networks. arXiv:1703.01365.', url: 'https://arxiv.org/abs/1703.01365', usedFor: 'Integrated Gradients' },
    { cite: 'Captum. (n.d.). Model interpretability for PyTorch.', url: 'https://captum.ai/', usedFor: 'Integrated Gradients implementation' },
    { cite: 'Boström, H. (n.d.). crepes: Python package for conformal prediction [Software]. GitHub.', url: 'https://github.com/henrikbostrom/crepes', usedFor: 'Conformal calibration' },
    { cite: 'scikit-learn-contrib. (n.d.). MAPIE [Software]. GitHub.', url: 'https://github.com/scikit-learn-contrib/MAPIE', usedFor: 'Conformal prediction' },
    { cite: 'Sentence-Transformers. (n.d.). Documentation.', url: 'https://www.sbert.net/', usedFor: 'Embedding interface' },
    { cite: 'Hugging Face. (n.d.). Transformers documentation.', url: 'https://huggingface.co/docs/transformers/index', usedFor: 'Model loading' },
    { cite: 'PyTorch. (n.d.). PyTorch.', url: 'https://pytorch.org/', usedFor: 'Deep-learning framework' },
    { cite: 'spaCy. (n.d.). Industrial-strength natural language processing in Python.', url: 'https://spacy.io/', usedFor: 'Reference checker' },
    { cite: 'FastAPI. (n.d.). FastAPI documentation.', url: 'https://fastapi.tiangolo.com/', usedFor: 'Backend API' },
    { cite: 'Next.js. (n.d.). The React framework.', url: 'https://nextjs.org/', usedFor: 'Frontend' },
    { cite: 'GoutamNandhen & lavan-chinna19. (2026). Legal-contract-coherence-auditor- [Source code]. GitHub.', url: 'https://github.com/lavan-chinna19/Legal-contract-coherence-auditor-', usedFor: 'Project repository' },
  ],
};
