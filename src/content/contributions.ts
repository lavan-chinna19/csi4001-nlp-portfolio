/**
 * Classroom Contributions — "Beyond the Classroom".
 *
 * A record of stars and recognition received in CSI4001 NLP classes.
 * Everything on the /contributions page (totals, timeline, filters, gallery)
 * is computed from `recognitionEntries` below. Nothing is hard-coded: stars are
 * counted only from each entry's `stars`, never from photos.
 *
 * ── HOW TO ADD AN ENTRY ─────────────────────────────────────────────────────
 * 1. Add an object to the END of `recognitionEntries`. Its position gives its
 *    entry number (the 7th item becomes "Entry 07").
 * 2. Give it a unique `id` (e.g. 'pos-tagging').
 * 3. `title` and `description` say what you did, in your own words.
 * 4. `stars` is the number of stars you received for it (a whole number).
 * 5. `category` must be one of the keys in `recognitionCategories` below.
 * 6. Optional: `date` ('YYYY-MM-DD'), `answer` (what you said), `examples`
 *    (short words or forms you gave), `session` (the same key on entries from
 *    the same class), `facultyFeedback` (only the faculty's actual words).
 * 7. Optional `evidence`: put images in public/images/contributions/ and
 *    reference them as '/images/contributions/<file-name>' with `alt` text,
 *    a short `caption`, and the image's pixel `width` and `height`.
 *
 * Record only what actually happened — never estimate or round up.
 * The timeline keeps entry order; it sorts by date only when every entry has one.
 */

export type RecognitionCategory =
  | 'answering-questions'
  | 'class-participation'
  | 'technical-explanations'
  | 'project-presentations'
  | 'discussions'
  | 'helping-peers';

export interface RecognitionEvidence {
  /** Path under /public, e.g. '/images/contributions/entry-02-board.jpg'. */
  src: string;
  alt: string;
  caption: string;
  /** Natural pixel size, so the photo keeps its own (often very wide) aspect ratio. */
  width?: number;
  height?: number;
}

export interface RecognitionEntry {
  id: string;
  /** Short title, e.g. 'Bigram Chain Rule'. */
  title: string;
  /** One sentence on what you did. */
  description: string;
  /** Stars received for this contribution. */
  stars: number;
  /** The NLP topic, e.g. 'N-Gram Language Models'. */
  topic: string;
  category: RecognitionCategory;
  /** Optional — ISO date of the class, 'YYYY-MM-DD'. Leave out when unknown. */
  date?: string;
  /** Optional — entries from the same class session share this key. */
  session?: string;
  /** Optional — the answer you gave, in your words. */
  answer?: string;
  /** Optional — words or forms you gave as examples. */
  examples?: string[];
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
  {
    id: 'markov-rule',
    title: 'Understanding the Markov Rule',
    description: 'Answered a question about the Markov rule in language models.',
    answer: 'We do not need the whole sentence to find the probability of a word; we just need the word before it.',
    stars: 1,
    topic: 'N-Gram Language Models',
    category: 'answering-questions',
  },
  {
    id: 'bigram-chain-rule',
    title: 'Bigram Chain Rule',
    description: 'Wrote the bigram chain rule formula on the classroom board.',
    stars: 2,
    topic: 'N-Gram Language Models',
    category: 'technical-explanations',
    evidence: [
      {
        src: '/images/contributions/entry-02-bigram-chain-rule-recognition.jpg',
        alt: 'Handwritten note in a ruled notebook reading “CSI4001”, “2 ★s” and “Super star of NLP class”, with the faculty’s signature.',
        caption: 'Handwritten recognition: CSI4001 · Super Star of NLP Class',
        width: 1590,
        height: 517,
      },
    ],
  },
  {
    id: 'native-morphology',
    title: 'Morphology in My Native Language',
    description: 'Identified words containing suffixes in my native language.',
    examples: ['thinadam', 'thintunnanu', 'thinanu'],
    stars: 1,
    topic: 'Morphology',
    category: 'class-participation',
  },
  {
    id: 'types-and-tokens',
    title: 'Types and Tokens',
    description: 'Identified the number of types and tokens in a given sentence.',
    stars: 1,
    topic: 'Text Processing',
    category: 'answering-questions',
    session: 'S-mle-types',
  },
  {
    id: 'mle',
    title: 'Maximum Likelihood Estimation',
    description: 'Answered a classroom question about the Maximum Likelihood Estimation formula.',
    stars: 1,
    topic: 'N-Gram Language Models',
    category: 'answering-questions',
    session: 'S-mle-types',
    evidence: [
      {
        src: '/images/contributions/entry-05-mle-recognition.jpg',
        alt: 'Handwritten note in a ruled notebook with a star count and the faculty’s signature, written for the class session in which entries 04 and 05 took place.',
        caption: 'Handwritten recognition from this class session (covers Entries 04 and 05)',
        width: 1599,
        height: 411,
      },
    ],
  },
  {
    id: 'presentation-answers',
    title: 'Project Presentation Participation',
    description: 'Answered questions during project presentations.',
    stars: 2,
    topic: 'Project presentations',
    category: 'project-presentations',
    evidence: [
      {
        src: '/images/contributions/entry-06-presentation-answers-recognition.jpg',
        alt: 'Handwritten note in a ruled notebook reading “2 ★s” and “Presentation answers”, with the faculty’s signature.',
        caption: 'Handwritten recognition: Presentation answers',
        width: 1458,
        height: 490,
      },
    ],
  },
];
