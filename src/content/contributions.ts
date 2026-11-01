/**
 * Classroom Contributions — "Beyond the Classroom".
 *
 * A record of stars and recognition received in CSI4001 NLP classes.
 * Everything on the /contributions page (totals, timeline, filters, gallery)
 * is computed from `recognitionEntries` below. Nothing is hard-coded, so an
 * empty list shows dashes and a single empty-state message.
 *
 * ── HOW TO ADD AN ENTRY ─────────────────────────────────────────────────────
 * 1. Copy the example entry at the bottom of this file into the
 *    `recognitionEntries` array and remove the comment markers.
 * 2. Give it a unique `id` (e.g. '2026-11-12-pos-tagging').
 * 3. `date` is the class date as an ISO date string: 'YYYY-MM-DD'.
 * 4. `stars` is the number of stars you received in that class (a whole number).
 * 5. `category` must be one of the keys in `recognitionCategories` below.
 * 6. `facultyFeedback` is optional — only add words the faculty actually said or wrote.
 * 7. `evidence` is optional. Put images in  public/images/contributions/
 *    (WebP or JPG, ideally ≤ 1600 px wide) and reference them as
 *    '/images/contributions/<file-name>'. Every image needs `alt` text
 *    (what the photo shows) and a short `caption`.
 *
 * Record only what actually happened — never estimate or round up.
 * Entries can be in any order; the page sorts them by date (newest first).
 */

export type RecognitionCategory =
  | 'answering-questions'
  | 'class-participation'
  | 'technical-explanations'
  | 'project-presentations'
  | 'discussions'
  | 'helping-peers';

export interface RecognitionEvidence {
  /** Path under /public, e.g. '/images/contributions/2026-11-12-board.webp'. */
  src: string;
  alt: string;
  caption: string;
}

export interface RecognitionEntry {
  id: string;
  /** ISO date of the class session, 'YYYY-MM-DD'. */
  date: string;
  /** Stars received for this contribution. */
  stars: number;
  /** What you did, e.g. 'Answered a question on smoothing'. */
  activity: string;
  /** The NLP topic of the session, e.g. 'N-gram language models'. */
  topic: string;
  category: RecognitionCategory;
  /** Optional — the faculty's actual words, if any. */
  facultyFeedback?: string;
  /** Optional — photos or screenshots as evidence. */
  evidence?: RecognitionEvidence[];
}

/** Category labels + one-line descriptions (used for chips and the category list). */
export const recognitionCategories: Record<RecognitionCategory, { label: string; description: string }> = {
  'answering-questions': { label: 'Answering questions', description: 'Responding to questions raised by the faculty during class.' },
  'class-participation': { label: 'Class participation', description: 'Active involvement in class activities and exercises.' },
  'technical-explanations': { label: 'Technical explanations', description: 'Explaining a concept or method to the class.' },
  'project-presentations': { label: 'Project presentations', description: 'Presenting project work in class.' },
  discussions: { label: 'Discussions', description: 'Contributing to class discussions on NLP topics.' },
  'helping-peers': { label: 'Helping peers', description: 'Helping classmates understand or work through a problem.' },
};

export const contributionsPage = {
  title: 'Beyond the Classroom',
  subtitle: 'Small contributions. Meaningful recognition.',
  purpose:
    'This page documents the stars and recognition I received in CSI4001 NLP classes — for participation, answering questions, presentations and other contributions.',
  emptyMessage: 'Your classroom contributions will be recorded here.',
};

export const recognitionEntries: RecognitionEntry[] = [
  // TODO(lavan): add real entries here (see the instructions at the top of this file).
];

/*
 * ── EXAMPLE ENTRY (illustration only — NOT real data) ──────────────────────
 * Copy into `recognitionEntries` above and replace every value with what
 * actually happened.
 *
 * {
 *   id: '2026-11-12-smoothing',
 *   date: '2026-11-12',
 *   stars: 1,
 *   activity: 'Answered a question on Laplace smoothing',
 *   topic: 'N-gram language models',
 *   category: 'answering-questions',
 *   facultyFeedback: 'Optional — the faculty’s actual words.',
 *   evidence: [
 *     {
 *       src: '/images/contributions/2026-11-12-smoothing.webp',
 *       alt: 'Describe what the photo shows',
 *       caption: 'Short caption',
 *     },
 *   ],
 * },
 */
