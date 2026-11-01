import { wordTokenize, sentenceSplit, contentWords } from './text';

/* ------------------------------------------------------------------ */
/* Naive subword split (TOY): greedy longest-match, WordPiece-style    */
/* ------------------------------------------------------------------ */
const SUBWORD_VOCAB = new Set([
  'un', 're', 'pre', 'dis', 'in', 'im', 'mis', 'over', 'under', 'inter', 'trans', 'token', 'model', 'learn', 'word', 'lang', 'uage',
  'process', 'believ', 'happi', 'nation', 'write', 'writ', 'read', 'speak', 'play', 'help', 'use', 'form', 'act', 'struct', 'comput',
  'ing', 'ed', 'er', 'ers', 'est', 'ly', 'ness', 'ment', 'ments', 'able', 'ible', 'tion', 'ation', 'al', 'ize', 'ization', 'ful', 'less',
  's', 'es', 'ity', 'ive', 'ous', 'ist', 'ism', 'ance', 'ence', 'y',
]);

/** Greedy longest-match-first split. Continuation pieces are prefixed with "##" like WordPiece. */
export function naiveSubword(word: string): string[] {
  const w = word.toLowerCase();
  if (!/^[a-z]+$/.test(w)) return [word];
  const pieces: string[] = [];
  let i = 0;
  while (i < w.length) {
    let found = '';
    for (let j = w.length; j > i; j--) {
      const cand = w.slice(i, j);
      if (SUBWORD_VOCAB.has(cand) && cand.length > found.length) {
        found = cand;
        break;
      }
    }
    if (!found) found = w[i]; // fall back to a single character
    pieces.push(i === 0 ? found : '##' + found);
    i += found.length;
  }
  return pieces;
}

/* ------------------------------------------------------------------ */
/* Minimum edit distance with backtrace                                */
/* ------------------------------------------------------------------ */
export interface EditResult {
  table: number[][];
  distance: number;
  path: Set<string>; // "i,j" cells on one optimal path
  ops: { op: 'match' | 'sub' | 'ins' | 'del'; a?: string; b?: string }[];
}

export function editDistance(a: string, b: string, subCost = 1): EditResult {
  const n = a.length;
  const m = b.length;
  const D: number[][] = Array.from({ length: n + 1 }, () => new Array<number>(m + 1).fill(0));
  for (let i = 0; i <= n; i++) D[i][0] = i;
  for (let j = 0; j <= m; j++) D[0][j] = j;
  for (let i = 1; i <= n; i++) {
    for (let j = 1; j <= m; j++) {
      const s = a[i - 1] === b[j - 1] ? 0 : subCost;
      D[i][j] = Math.min(D[i - 1][j] + 1, D[i][j - 1] + 1, D[i - 1][j - 1] + s);
    }
  }
  // backtrace
  const path = new Set<string>();
  const ops: EditResult['ops'] = [];
  let i = n;
  let j = m;
  path.add(`${i},${j}`);
  while (i > 0 || j > 0) {
    if (i > 0 && j > 0) {
      const s = a[i - 1] === b[j - 1] ? 0 : subCost;
      if (D[i][j] === D[i - 1][j - 1] + s) {
        ops.unshift({ op: s === 0 ? 'match' : 'sub', a: a[i - 1], b: b[j - 1] });
        i--; j--;
        path.add(`${i},${j}`);
        continue;
      }
    }
    if (i > 0 && D[i][j] === D[i - 1][j] + 1) {
      ops.unshift({ op: 'del', a: a[i - 1] });
      i--;
    } else {
      ops.unshift({ op: 'ins', b: b[j - 1] });
      j--;
    }
    path.add(`${i},${j}`);
  }
  return { table: D, distance: D[n][m], path, ops };
}

/* ------------------------------------------------------------------ */
/* Bigram language model: MLE + Laplace, perplexity                    */
/* ------------------------------------------------------------------ */
export interface BigramModel {
  unigrams: Map<string, number>;
  bigrams: Map<string, Map<string, number>>;
  vocab: string[]; // types that can be predicted (includes </s>, excludes <s>)
  sentences: string[][];
}

export function lmTokens(sentence: string): string[] {
  return wordTokenize(sentence.toLowerCase()).filter((t) => /[a-z0-9]/.test(t));
}

export function trainBigram(corpus: string): BigramModel {
  const sentences = corpus
    .split(/\n+/)
    .map((l) => l.trim())
    .filter(Boolean)
    .map((l) => ['<s>', ...lmTokens(l), '</s>']);
  const unigrams = new Map<string, number>();
  const bigrams = new Map<string, Map<string, number>>();
  for (const s of sentences) {
    for (let i = 0; i < s.length; i++) {
      unigrams.set(s[i], (unigrams.get(s[i]) ?? 0) + 1);
      if (i > 0) {
        const row = bigrams.get(s[i - 1]) ?? new Map<string, number>();
        row.set(s[i], (row.get(s[i]) ?? 0) + 1);
        bigrams.set(s[i - 1], row);
      }
    }
  }
  const vocab = [...unigrams.keys()].filter((w) => w !== '<s>').sort();
  return { unigrams, bigrams, vocab, sentences };
}

/** Count of the context word as a bigram history (i.e. how often it is followed by something). */
function historyCount(model: BigramModel, prev: string): number {
  let total = 0;
  model.bigrams.get(prev)?.forEach((c) => (total += c));
  return total;
}

export function bigramProb(model: BigramModel, prev: string, w: string, laplace: boolean): number {
  const c = model.bigrams.get(prev)?.get(w) ?? 0;
  const h = historyCount(model, prev);
  if (laplace) return (c + 1) / (h + model.vocab.length);
  return h === 0 ? 0 : c / h;
}

export interface SentenceScore {
  steps: { prev: string; w: string; count: number; history: number; mle: number; laplace: number }[];
  ppMle: number; // Infinity if any zero
  ppLaplace: number;
  oov: string[];
}

export function scoreSentence(model: BigramModel, sentence: string): SentenceScore {
  const toks = ['<s>', ...lmTokens(sentence), '</s>'];
  const steps: SentenceScore['steps'] = [];
  let logMle = 0;
  let logLap = 0;
  let zero = false;
  for (let i = 1; i < toks.length; i++) {
    const prev = toks[i - 1];
    const w = toks[i];
    const mle = bigramProb(model, prev, w, false);
    const lap = bigramProb(model, prev, w, true);
    steps.push({ prev, w, count: model.bigrams.get(prev)?.get(w) ?? 0, history: historyCount(model, prev), mle, laplace: lap });
    if (mle === 0) zero = true;
    else logMle += Math.log(mle);
    logLap += Math.log(lap);
  }
  const N = toks.length - 1;
  const oov = toks.filter((t) => t !== '<s>' && !model.unigrams.has(t));
  return {
    steps,
    ppMle: zero ? Infinity : Math.exp(-logMle / N),
    ppLaplace: Math.exp(-logLap / N),
    oov,
  };
}

/* ------------------------------------------------------------------ */
/* Tiny CFG + all-parses recursive descent (TOY grammar)               */
/* ------------------------------------------------------------------ */
export interface Tree {
  label: string;
  children: Tree[];
  word?: string;
}

export const GRAMMAR: Record<string, string[][]> = {
  S: [['NP', 'VP']],
  NP: [['Det', 'N'], ['Det', 'Adj', 'N'], ['Det', 'N', 'PP'], ['Pro']],
  VP: [['V', 'NP'], ['V', 'NP', 'PP'], ['V', 'PP'], ['V']],
  PP: [['P', 'NP']],
};

export const LEXICON: Record<string, string[]> = {
  Det: ['the', 'a', 'an', 'my'],
  N: ['cat', 'dog', 'mouse', 'man', 'telescope', 'student', 'book', 'park', 'mat', 'girl', 'sentence', 'model', 'garden'],
  Adj: ['small', 'old', 'clever', 'quiet', 'long', 'new'],
  Pro: ['i', 'she', 'he', 'they', 'we'],
  V: ['saw', 'chased', 'reads', 'read', 'sat', 'slept', 'parsed', 'liked', 'walked'],
  P: ['with', 'in', 'on', 'near', 'under'],
};

const POS_OF = new Map<string, string[]>();
for (const [pos, words] of Object.entries(LEXICON)) {
  for (const w of words) POS_OF.set(w, [...(POS_OF.get(w) ?? []), pos]);
}

function parseSym(sym: string, toks: string[], i: number): { tree: Tree; end: number }[] {
  if (LEXICON[sym]) {
    if (i < toks.length && POS_OF.get(toks[i])?.includes(sym)) {
      return [{ tree: { label: sym, children: [], word: toks[i] }, end: i + 1 }];
    }
    return [];
  }
  const results: { tree: Tree; end: number }[] = [];
  for (const rhs of GRAMMAR[sym] ?? []) {
    let partial: { kids: Tree[]; end: number }[] = [{ kids: [], end: i }];
    for (const part of rhs) {
      const next: { kids: Tree[]; end: number }[] = [];
      for (const p of partial) {
        for (const r of parseSym(part, toks, p.end)) next.push({ kids: [...p.kids, r.tree], end: r.end });
      }
      partial = next;
      if (!partial.length) break;
    }
    for (const p of partial) results.push({ tree: { label: sym, children: p.kids }, end: p.end });
  }
  return results;
}

export function parseCfg(sentence: string): { tokens: string[]; parses: Tree[]; unknown: string[] } {
  const tokens = sentence.toLowerCase().replace(/[.,!?]/g, ' ').split(/\s+/).filter(Boolean);
  const unknown = tokens.filter((t) => !POS_OF.has(t));
  if (unknown.length || tokens.length > 14) return { tokens, parses: [], unknown };
  const parses = parseSym('S', tokens, 0).filter((r) => r.end === tokens.length).map((r) => r.tree);
  return { tokens, parses, unknown };
}

/* ------------------------------------------------------------------ */
/* Toy POS tagger: lexicon + suffix rules + context rules (Penn tags)  */
/* ------------------------------------------------------------------ */
const POS_LEXICON: Record<string, string[]> = {
  the: ['DT'], a: ['DT'], an: ['DT'], this: ['DT'], that: ['DT', 'IN'], these: ['DT'], every: ['DT'],
  i: ['PRP'], you: ['PRP'], he: ['PRP'], she: ['PRP'], it: ['PRP'], we: ['PRP'], they: ['PRP'], him: ['PRP'], them: ['PRP'],
  my: ['PRP$'], your: ['PRP$'], his: ['PRP$'], her: ['PRP$', 'PRP'], our: ['PRP$'], their: ['PRP$'],
  is: ['VBZ'], are: ['VBP'], am: ['VBP'], was: ['VBD'], were: ['VBD'], be: ['VB'], been: ['VBN'], has: ['VBZ'], have: ['VBP', 'VB'], had: ['VBD'],
  do: ['VBP', 'VB'], does: ['VBZ'], did: ['VBD'],
  can: ['MD', 'NN', 'VB'], will: ['MD', 'NN'], would: ['MD'], should: ['MD'], could: ['MD'], must: ['MD'], may: ['MD'],
  to: ['TO'], of: ['IN'], in: ['IN'], on: ['IN'], at: ['IN'], with: ['IN'], for: ['IN'], from: ['IN'], by: ['IN'], about: ['IN'],
  and: ['CC'], or: ['CC'], but: ['CC'], not: ['RB'], "n't": ['RB'], very: ['RB'], quickly: ['RB'], always: ['RB'], never: ['RB'],
  book: ['NN', 'VB'], flight: ['NN'], fish: ['NN', 'VB'], run: ['VB', 'NN'], walk: ['VB', 'NN'], play: ['VB', 'NN'], record: ['NN', 'VB'],
  time: ['NN'], flies: ['VBZ', 'NNS'], like: ['IN', 'VB', 'VBP'], arrow: ['NN'], man: ['NN'], dog: ['NN'], cat: ['NN'], model: ['NN', 'VB'],
  language: ['NN'], text: ['NN'], word: ['NN'], student: ['NN'], professor: ['NN'], park: ['NN', 'VB'], saw: ['VBD', 'NN'],
  read: ['VB', 'VBD', 'VBP'], reads: ['VBZ'], good: ['JJ'], new: ['JJ'], old: ['JJ'], big: ['JJ'], small: ['JJ'], happy: ['JJ'], natural: ['JJ'],
  '.': ['.'], ',': [','], '?': ['.'], '!': ['.'],
};

export const PENN_GLOSS: Record<string, string> = {
  DT: 'determiner', PRP: 'personal pronoun', 'PRP$': 'possessive pronoun', NN: 'noun, singular', NNS: 'noun, plural', NNP: 'proper noun',
  VB: 'verb, base form', VBD: 'verb, past tense', VBG: 'verb, gerund/participle', VBN: 'verb, past participle', VBP: 'verb, non-3sg present',
  VBZ: 'verb, 3sg present', MD: 'modal', TO: 'to', IN: 'preposition/subord.', CC: 'coordinating conj.', RB: 'adverb', JJ: 'adjective',
  CD: 'cardinal number', '.': 'sentence-final punct.', ',': 'comma',
};

export interface TaggedToken {
  word: string;
  tag: string;
  why: string;
}

export function posTag(sentence: string): TaggedToken[] {
  const toks = wordTokenize(sentence);
  const out: TaggedToken[] = [];
  toks.forEach((word, idx) => {
    const lw = word.toLowerCase();
    const prev = out[idx - 1]?.tag;
    const cands = POS_LEXICON[lw];
    if (cands) {
      if (cands.length === 1) {
        out.push({ word, tag: cands[0], why: 'lexicon (unambiguous)' });
        return;
      }
      // context rules for ambiguous words
      if (prev === 'TO' || prev === 'MD') {
        const vb = cands.find((c) => c === 'VB');
        if (vb) return void out.push({ word, tag: vb, why: `ambiguous ${cands.join('/')} → VB after ${prev}` });
      }
      if (prev === 'DT' || prev === 'JJ' || prev === 'PRP$') {
        const n = cands.find((c) => c.startsWith('NN'));
        if (n) return void out.push({ word, tag: n, why: `ambiguous ${cands.join('/')} → ${n} after ${prev}` });
      }
      if (prev === 'PRP' || prev === 'NNS') {
        const v = cands.find((c) => c === 'VBP' || c === 'VBD' || c === 'MD');
        if (v) return void out.push({ word, tag: v, why: `ambiguous ${cands.join('/')} → ${v} after ${prev}` });
      }
      if (prev === 'NN' || prev === 'NNP') {
        const v = cands.find((c) => c === 'VBZ' || c === 'VBD' || c === 'MD');
        if (v) return void out.push({ word, tag: v, why: `ambiguous ${cands.join('/')} → ${v} after ${prev}` });
      }
      if (idx === 0) {
        const vb = cands.find((c) => c === 'VB');
        if (vb && toks.length > 1) return void out.push({ word, tag: vb, why: `ambiguous ${cands.join('/')} → VB (sentence-initial: imperative)` });
      }
      return void out.push({ word, tag: cands[0], why: `ambiguous ${cands.join('/')} → most frequent (${cands[0]})` });
    }
    // unknown-word rules
    if (/^\d+([.,]\d+)?%?$/.test(word)) return void out.push({ word, tag: 'CD', why: 'rule: number' });
    if (/^[A-Z]/.test(word) && idx > 0) return void out.push({ word, tag: 'NNP', why: 'rule: capitalised mid-sentence' });
    if (/ing$/.test(lw)) return void out.push({ word, tag: 'VBG', why: 'rule: suffix -ing' });
    if (/ed$/.test(lw)) return void out.push({ word, tag: prev === 'VBZ' || prev === 'VBP' || prev === 'VBD' ? 'VBN' : 'VBD', why: 'rule: suffix -ed' });
    if (/ly$/.test(lw)) return void out.push({ word, tag: 'RB', why: 'rule: suffix -ly' });
    if (/(ous|ful|ive|able|ible|al|ic)$/.test(lw) && lw.length > 4) return void out.push({ word, tag: 'JJ', why: 'rule: adjectival suffix' });
    if (/[^s]s$/.test(lw)) {
      if (prev === 'NN' || prev === 'NNP' || prev === 'PRP') return void out.push({ word, tag: 'VBZ', why: 'rule: -s after a singular subject' });
      return void out.push({ word, tag: 'NNS', why: 'rule: suffix -s' });
    }
    if (/^[^a-z0-9]+$/i.test(word)) return void out.push({ word, tag: word, why: 'punctuation' });
    out.push({ word, tag: 'NN', why: 'default for unknown words' });
  });
  return out;
}

/* ------------------------------------------------------------------ */
/* Lexicon sentiment (TOY values, rules inspired by VADER)             */
/* ------------------------------------------------------------------ */
export const SENTIMENT_LEXICON: Record<string, number> = {
  good: 1.9, great: 3.1, excellent: 3.2, amazing: 2.8, love: 3.2, like: 1.5, enjoy: 2.2, happy: 2.7, nice: 1.8, helpful: 1.8, clear: 1.2,
  fun: 2.3, best: 3.2, beautiful: 2.9, interesting: 1.7, useful: 1.9, fast: 1.0, easy: 1.9, brilliant: 2.8, perfect: 2.7, okay: 0.9,
  bad: -2.5, terrible: -2.9, awful: -3.1, hate: -2.7, boring: -1.8, slow: -1.2, confusing: -1.6, poor: -2.1, worst: -3.1, sad: -2.1,
  wrong: -2.1, difficult: -1.5, hard: -0.8, annoying: -1.9, useless: -2.1, broken: -1.8, disappointing: -2.2, ugly: -2.3, horrible: -2.5,
};
const NEGATORS = new Set(['not', "n't", 'no', 'never', 'none', 'nobody', 'nothing', 'neither', 'nor', 'hardly', 'without']);
export const INTENSIFIERS: Record<string, number> = {
  very: 0.293, really: 0.293, extremely: 0.293, so: 0.293, incredibly: 0.293, absolutely: 0.293, quite: 0.15, too: 0.15,
  slightly: -0.293, somewhat: -0.293, barely: -0.293, kinda: -0.293,
};

export interface SentimentToken {
  word: string;
  base: number;
  final: number;
  notes: string[];
}

export function sentiment(text: string): { tokens: SentimentToken[]; sum: number; compound: number; label: string } {
  const toks = wordTokenize(text);
  const lower = toks.map((t) => t.toLowerCase());
  const butIdx = lower.indexOf('but');
  const tokens: SentimentToken[] = toks.map((word, i) => {
    const base = SENTIMENT_LEXICON[lower[i]] ?? 0;
    const notes: string[] = [];
    let v = base;
    if (base !== 0) {
      const prev = lower[i - 1];
      if (prev && INTENSIFIERS[prev] !== undefined) {
        const inc = INTENSIFIERS[prev];
        v += v > 0 ? inc : -inc;
        notes.push(`${inc > 0 ? 'boosted' : 'dampened'} by “${prev}”`);
      }
      if (word.length > 1 && word === word.toUpperCase() && /[A-Z]/.test(word)) {
        v += v > 0 ? 0.733 : -0.733;
        notes.push('ALL CAPS emphasis');
      }
      const window = lower.slice(Math.max(0, i - 3), i);
      if (window.some((w) => NEGATORS.has(w))) {
        v *= -0.74;
        notes.push('negated (× −0.74)');
      }
      if (butIdx >= 0) {
        if (i < butIdx) { v *= 0.5; notes.push('before “but” (× 0.5)'); }
        else if (i > butIdx) { v *= 1.5; notes.push('after “but” (× 1.5)'); }
      }
    }
    return { word, base, final: v, notes };
  });
  let sum = tokens.reduce((s, t) => s + t.final, 0);
  const exclaims = Math.min((text.match(/!/g) ?? []).length, 4);
  if (sum !== 0) sum += (sum > 0 ? 1 : -1) * exclaims * 0.292;
  const compound = sum / Math.sqrt(sum * sum + 15);
  const label = compound >= 0.05 ? 'positive' : compound <= -0.05 ? 'negative' : 'neutral';
  return { tokens, sum, compound, label };
}

/* ------------------------------------------------------------------ */
/* Frequency-based extractive summarizer                               */
/* ------------------------------------------------------------------ */
export function summarize(text: string, k: number) {
  const sentences = sentenceSplit(text.replace(/\s+/g, ' ').trim());
  const freq = new Map<string, number>();
  for (const s of sentences) for (const w of contentWords(s)) freq.set(w, (freq.get(w) ?? 0) + 1);
  const max = Math.max(1, ...freq.values());
  const scored = sentences.map((s, i) => {
    const words = contentWords(s);
    const score = words.length ? words.reduce((acc, w) => acc + (freq.get(w) ?? 0) / max, 0) / words.length : 0;
    return { i, s, score };
  });
  const chosen = new Set([...scored].sort((a, b) => b.score - a.score).slice(0, k).map((x) => x.i));
  const topWords = [...freq.entries()].sort((a, b) => b[1] - a[1]).slice(0, 8);
  return { scored, chosen, topWords };
}
