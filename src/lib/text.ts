/** Small, honest text utilities shared by the toy demos. */

const ABBREVIATIONS = new Set(['dr', 'mr', 'mrs', 'ms', 'prof', 'st', 'vs', 'etc', 'e.g', 'i.e', 'inc', 'jr', 'sr', 'no', 'fig']);

/** Regex word tokenizer, loosely Penn-Treebank style (splits n't and 's clitics). */
export function wordTokenize(text: string): string[] {
  const out: string[] = [];
  const re = /[A-Za-z]+(?=n't)|n't|'(?:s|re|ve|ll|d|m)\b|\d+(?:[.,]\d+)*%?|[A-Za-z]+(?:[-.][A-Za-z]+)*(?:\.(?!\.))?|\.\.\.|[^\sA-Za-z\d]/g;
  for (const m of text.matchAll(re)) {
    let tok = m[0];
    // keep trailing period only for known abbreviations
    if (tok.length > 1 && tok.endsWith('.') && !/^[A-Za-z]\.$/.test(tok)) {
      const base = tok.slice(0, -1).toLowerCase();
      if (!ABBREVIATIONS.has(base) && !base.includes('.')) {
        out.push(tok.slice(0, -1), '.');
        continue;
      }
    }
    out.push(tok);
  }
  return out;
}

/** Sentence splitter: breaks after . ! ? when followed by whitespace + capital/quote/digit, skipping abbreviations. */
export function sentenceSplit(text: string): string[] {
  const sentences: string[] = [];
  let start = 0;
  const re = /[.!?]+(?=["')\]]*\s+["'(\[]?[A-Z0-9])/g;
  let m: RegExpExecArray | null;
  while ((m = re.exec(text))) {
    const end = m.index + m[0].length;
    const preceding = text.slice(start, m.index).split(/\s+/).pop() ?? '';
    if (m[0] === '.' && (ABBREVIATIONS.has(preceding.toLowerCase().replace(/\.$/, '')) || /^[A-Z]$/.test(preceding))) continue;
    sentences.push(text.slice(start, end).trim());
    start = end;
  }
  const rest = text.slice(start).trim();
  if (rest) sentences.push(rest);
  return sentences.filter(Boolean);
}

export const STOPWORDS = new Set(
  'a an the and or but if of to in on at by for with from as is are was were be been being it its this that these those i you he she we they me him her us them my your his our their not no so than then there here what which who whom when where why how all any both each few more most other some such only own same too very can will just do does did done have has had having into over under again further once about above below up down out off also would should could may might must shall'.split(' ')
);

export function contentWords(sentence: string): string[] {
  return wordTokenize(sentence.toLowerCase()).filter((t) => /^[a-z][a-z'-]*$/.test(t) && !STOPWORDS.has(t));
}
