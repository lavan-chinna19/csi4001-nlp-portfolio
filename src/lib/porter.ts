/**
 * Porter stemming algorithm (M.F. Porter, 1980, "An algorithm for suffix stripping").
 * A faithful TypeScript port of Martin Porter's reference JavaScript implementation
 * (tartarus.org/martin/PorterStemmer), extended to record which step changed the word.
 */

const step2list: Record<string, string> = {
  ational: 'ate', tional: 'tion', enci: 'ence', anci: 'ance', izer: 'ize', bli: 'ble',
  alli: 'al', entli: 'ent', eli: 'e', ousli: 'ous', ization: 'ize', ation: 'ate',
  ator: 'ate', alism: 'al', iveness: 'ive', fulness: 'ful', ousness: 'ous', aliti: 'al',
  iviti: 'ive', biliti: 'ble', logi: 'log',
};

const step3list: Record<string, string> = {
  icate: 'ic', ative: '', alize: 'al', iciti: 'ic', ical: 'ic', ful: '', ness: '',
};

const c = '[^aeiou]';
const v = '[aeiouy]';
const C = c + '[^aeiouy]*';
const V = v + '[aeiou]*';
const mgr0 = new RegExp('^(' + C + ')?' + V + C); // measure > 0
const meq1 = new RegExp('^(' + C + ')?' + V + C + '(' + V + ')?$'); // measure == 1
const mgr1 = new RegExp('^(' + C + ')?' + V + C + V + C); // measure > 1
const sV = new RegExp('^(' + C + ')?' + v); // stem contains a vowel
const cvc = new RegExp('^' + C + v + '[^aeiouwxy]$');

export interface StemTrace {
  step: string;
  before: string;
  after: string;
}

export function porterStem(input: string): { stem: string; trace: StemTrace[] } {
  let w = input.toLowerCase();
  const trace: StemTrace[] = [];
  if (w.length < 3 || !/^[a-z]+$/.test(w)) return { stem: w, trace };

  const record = (step: string, before: string) => {
    if (before !== w) trace.push({ step, before: before.replace(/^Y/, 'y'), after: w.replace(/^Y/, 'y') });
  };

  const firstch = w.charAt(0);
  if (firstch === 'y') w = 'Y' + w.slice(1);

  // Step 1a
  let before = w;
  let m: RegExpExecArray | null;
  if (/^(.+?)(ss|i)es$/.test(w)) w = w.replace(/^(.+?)(ss|i)es$/, '$1$2');
  else if (/^(.+?)([^s])s$/.test(w)) w = w.replace(/^(.+?)([^s])s$/, '$1$2');
  record('1a · plurals', before);

  // Step 1b
  before = w;
  if ((m = /^(.+?)eed$/.exec(w))) {
    if (mgr0.test(m[1])) w = w.slice(0, -1);
  } else if ((m = /^(.+?)(ed|ing)$/.exec(w))) {
    const stem = m[1];
    if (sV.test(stem)) {
      w = stem;
      if (/(at|bl|iz)$/.test(w)) w = w + 'e';
      else if (/([^aeiouylsz])\1$/.test(w)) w = w.slice(0, -1);
      else if (cvc.test(w)) w = w + 'e';
    }
  }
  record('1b · -ed / -ing', before);

  // Step 1c
  before = w;
  if ((m = /^(.+?)y$/.exec(w))) {
    if (sV.test(m[1])) w = m[1] + 'i';
  }
  record('1c · y → i', before);

  // Step 2
  before = w;
  if ((m = /^(.+?)(ational|tional|enci|anci|izer|bli|alli|entli|eli|ousli|ization|ation|ator|alism|iveness|fulness|ousness|aliti|iviti|biliti|logi)$/.exec(w))) {
    if (mgr0.test(m[1])) w = m[1] + step2list[m[2]];
  }
  record('2 · double suffixes', before);

  // Step 3
  before = w;
  if ((m = /^(.+?)(icate|ative|alize|iciti|ical|ful|ness)$/.exec(w))) {
    if (mgr0.test(m[1])) w = m[1] + step3list[m[2]];
  }
  record('3 · -ic-, -ful, -ness', before);

  // Step 4
  before = w;
  if ((m = /^(.+?)(al|ance|ence|er|ic|able|ible|ant|ement|ment|ent|ou|ism|ate|iti|ous|ive|ize)$/.exec(w))) {
    if (mgr1.test(m[1])) w = m[1];
  } else if ((m = /^(.+?)(s|t)(ion)$/.exec(w))) {
    const stem = m[1] + m[2];
    if (mgr1.test(stem)) w = stem;
  }
  record('4 · remove suffix (m > 1)', before);

  // Step 5a
  before = w;
  if ((m = /^(.+?)e$/.exec(w))) {
    const stem = m[1];
    if (mgr1.test(stem) || (meq1.test(stem) && !cvc.test(stem))) w = stem;
  }
  record('5a · final -e', before);

  // Step 5b
  before = w;
  if (/ll$/.test(w) && mgr1.test(w)) w = w.slice(0, -1);
  record('5b · -ll → -l', before);

  if (firstch === 'y') w = 'y' + w.slice(1);
  return { stem: w, trace };
}
