/**
 * LexAudit case study — Lavan's CSI4001 course project (confirmed 2026-11-01).
 * Facts below come ONLY from the project repository (branch `main`, which equals
 * `codex/lexaudit-personal-release`, commit e5436ea, 2026-10-27): README.md,
 * CONTRIBUTORS.md, docs/KNOWN_LIMITATIONS.md, docs/RESEARCH_VALIDITY_STATUS.md,
 * docs/data_governance.md, docs/system_card.md, docs/PHASE2_IMPLEMENTATION_REPORT.md.
 * https://github.com/lavan-chinna19/Legal-contract-coherence-auditor-
 * Placeholders are in [square brackets].
 */

export const courseProjectStatus = 'confirmed' as const;

export const project = {
  name: 'LexAudit',
  fullName: 'Legal Contract Coherence Auditor',
  repo: 'https://github.com/lavan-chinna19/Legal-contract-coherence-auditor-',
  image: '/images/exhibits/lavan-chinna19_legal-contract-coherence-auditor-.webp',
  summary:
    'A local legal-NLP research application. It reads a contract clause by clause and flags out-of-place clauses, broken cross-references and conflicting dates. Each flag carries a severity, an explanation and a suggested position.',
  disclaimer: 'Research decision support — not legal advice.',
  team: [
    { handle: 'GoutamNandhen', href: 'https://github.com/GoutamNandhen' },
    { handle: 'lavan-chinna19', href: 'https://github.com/lavan-chinna19' },
  ],
  status: 'DEMO_READY_WITH_LIMITATIONS',

  placeholders: {
    problem: '[Describe the problem in your own words: why is checking a contract’s internal coherence hard?]',
    motivation: '[What motivated the team to build this?]',
    contribution: '[Describe your individual contribution to the project.]',
    challenges: [
      { challenge: '[Challenge 1]', solution: '[How you addressed it]' },
      { challenge: '[Challenge 2]', solution: '[How you addressed it]' },
    ],
    future: '[List future improvements you would make.]',
    screenshots: ['[Screenshot: upload & clause preview]', '[Screenshot: flagged clause with explanation]', '[Screenshot: report]'],
  },

  /** From docs/data_governance.md and docs/system_card.md. */
  data: [
    {
      name: 'LEDGAR (via LexGLUE)',
      role: 'Clause provisions behind the semantic-centroid baseline (Channel A).',
      detail: 'About 60,000 labelled contract provisions from SEC EDGAR filings (Tuggener et al., 2020). Downloaded at ingestion time, not redistributed.',
    },
    {
      name: 'SEC EDGAR filings',
      role: 'Source contracts.',
      detail: 'Accessed through the public EDGAR full-text search API within SEC rate limits; raw filings are kept out of the repository.',
    },
    {
      name: 'CUAD',
      role: 'Out-of-distribution evaluation corpus.',
      detail: '510 contracts with 13,000+ expert annotations across 41 clause types (Hendrycks et al., 2021), CC BY 4.0.',
    },
  ],
  dataNote: '[Add anything about the data in your own words — e.g. how clauses were prepared or what you learned working with legal text.]',

  features: [
    {
      title: 'Ingestion',
      text: 'TXT, PDF and DOCX input with bounded parsing, a clause preview, and consistent clause identities and source spans.',
    },
    {
      title: 'Inference on local CPU',
      text: 'Frozen Legal-BERT embeddings, LEDGAR-derived semantic centroids (Channel A), learned adjacent-clause compatibility (Channel B), severity ranking and synthetic-shuffle conformal calibration.',
    },
    {
      title: 'Rules',
      text: 'Reference and date checks, plus an experimental dependency graph that uses explicit directional-reference evidence and abstains on ambiguous targets.',
    },
    {
      title: 'Explainability',
      text: 'Token-level Integrated Gradients (Captum) and neighbor sensitivity. Counterfactual position suggestions come with evidence and can abstain — they do not apply edits.',
    },
    {
      title: 'Robustness Lab',
      text: 'Opt-in synthetic perturbations and negative controls.',
    },
    {
      title: 'Review & reporting',
      text: 'Encrypted saved analyses (Fernet), history, clause review, analytics, PDF/DOCX reports and reviewer feedback.',
    },
  ],

  pipeline: [
    {
      id: 'ingest',
      label: 'Ingest',
      tech: 'pdfplumber · python-docx',
      text: 'A contract arrives as TXT, PDF or DOCX. Parsing is bounded, and the user sees a clause preview before analysis. Scanned PDFs need external OCR first.',
    },
    {
      id: 'segment',
      label: 'Clause segmentation',
      tech: 'clause identities · source spans',
      text: 'The document is split into clauses. Each clause keeps a consistent identity and its source span, so every later flag can point back to the exact text it is about.',
    },
    {
      id: 'embed',
      label: 'Legal-BERT embeddings',
      tech: 'nlpaueb/legal-bert-base-uncased (frozen)',
      text: 'Each clause is encoded with frozen Legal-BERT — a BERT model pre-trained on legal text — turning the clause into a dense vector. "Frozen" means the encoder weights are not fine-tuned; they are used as a fixed feature extractor on CPU.',
    },
    {
      id: 'channelA',
      label: 'Channel A · semantic centroids',
      tech: 'LEDGAR-derived',
      text: 'Clause embeddings are compared against semantic centroids derived from LEDGAR (a corpus of labelled contract provisions). A centroid is the average embedding of a clause type, so distance to centroids is a signal for what kind of clause this is.',
      branch: 'model',
    },
    {
      id: 'channelB',
      label: 'Channel B · adjacency',
      tech: 'learned adjacent-clause compatibility',
      text: 'A learned component scores how compatible each clause is with its neighbours. A clause that does not "fit" between the clauses around it is a candidate for being out of place.',
      branch: 'model',
    },
    {
      id: 'rules',
      label: 'Rules · references & dates',
      tech: 'reference & date checks · spaCy optional',
      text: 'Deterministic checks look for broken cross-references and conflicting dates. An opt-in experimental dependency graph parses explicit numeric section identities and above/below relationships, supplies source and target evidence, and abstains on unresolved or duplicate targets. Its scores are never merged into Channel A, Channel B or the ensemble.',
      branch: 'rules',
    },
    {
      id: 'severity',
      label: 'Severity + conformal calibration',
      tech: 'MAPIE · crepes · synthetic shuffles',
      text: 'Signals are combined into a severity ranking. Conformal calibration uses synthetically shuffled contracts as reference. The README is explicit: model scores are exploratory signals, not calibrated probabilities of legal defects.',
    },
    {
      id: 'explain',
      label: 'Explanations + counterfactual positions',
      tech: 'Captum Integrated Gradients · neighbor sensitivity',
      text: 'Integrated Gradients attributes a score to individual tokens; neighbor sensitivity shows how much the surrounding clauses matter. Counterfactual position suggestions propose where a clause might belong, with evidence — or abstain. Edits are never applied automatically.',
    },
    {
      id: 'report',
      label: 'Report',
      tech: 'ReportLab · python-docx',
      text: 'Flags with severity, explanation and suggested position are reviewed in the app and exported as PDF or DOCX reports. Saved analyses are encrypted (Fernet); reviewers can leave feedback.',
    },
  ],

  architecture: [
    { id: 'fe', label: 'Frontend', tech: 'Next.js · React · TypeScript' },
    { id: 'gw', label: 'Gateway', tech: 'Nginx' },
    { id: 'be', label: 'Backend API', tech: 'FastAPI · Uvicorn · Pydantic · PyTorch' },
    { id: 'db', label: 'Database', tech: 'PostgreSQL 16 (Docker) · SQLite natively' },
  ],

  stack: [
    { group: 'API', items: ['Python 3.11', 'FastAPI', 'Uvicorn', 'Pydantic'] },
    { group: 'Models & NLP', items: ['PyTorch', 'Transformers', 'sentence-transformers', 'Legal-BERT', 'spaCy', 'scikit-learn', 'NumPy', 'SciPy'] },
    { group: 'Explainability & calibration', items: ['Captum', 'MAPIE', 'crepes'] },
    { group: 'Documents', items: ['pdfplumber', 'python-docx', 'ReportLab'] },
    { group: 'Frontend', items: ['Next.js', 'React', 'TypeScript'] },
    { group: 'Storage', items: ['SQLite', 'PostgreSQL 16'] },
    { group: 'Ops & testing', items: ['Docker Compose', 'Nginx', 'pytest'] },
  ],

  verification: {
    note: 'These numbers describe software verification — tests passing — not model accuracy.',
    figures: [
      { value: '245', label: 'local regression tests passed', sub: '0 failed · 2 optional CUAD report skips' },
      { value: '103', label: 'Docker HTTP/runtime assertions', sub: 'Docker verification' },
      { value: '14', label: 'image/storage checks', sub: 'Docker verification' },
      { value: '10', label: 'browser assertions', sub: 'Docker verification' },
      { value: '20', label: 'Linux-image release tests', sub: 'Docker verification' },
    ],
    caveat:
      'No legal-accuracy claim is made. Model scores are exploratory signals, not calibrated probabilities of legal defects.',
    source: 'README · release verification (Oct 2026)',
    update:
      'A later Phase 2 revision (structural parser, 26 Oct 2026) reports 298 native regression tests passed, 0 failed, 2 documented optional skips. Docker integration was not re-verified for that revision.',
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
    'Scanned PDFs need external OCR.',
    'Runs with a single API worker: running jobs and rate limits are process-local.',
    'Practical limits: 10 MB files, 100 PDF pages, 250,000 extracted characters, 500 clauses.',
    'The experimental reference graph handles explicit numeric section identities and narrow direction markers; ambiguous targets, Roman numerals and vague references need human review.',
    'Clause locations refer to normalised extracted text, not original PDF page coordinates or DOCX layout.',
  ],
};
