import { useMemo, useState } from 'react';
import DemoFrame, { inputCls } from './DemoFrame';
import { PENN_GLOSS, posTag } from '../lib/nlp';

export default function PosDemo() {
  const [s, setS] = useState('I can book a flight to Delhi.');
  const tags = useMemo(() => posTag(s), [s]);
  const [sel, setSel] = useState<number | null>(2);
  return (
    <DemoFrame title="Part-of-speech tagger" toy="Toy lexicon + rules" note="A small lexicon lists possible Penn Treebank tags per word; simple context rules choose among them (e.g. VB after TO or MD, a noun after a determiner); unknown words fall back to suffix rules. Try: “Book the flight”, “They can fish”.">
      <label className="block">
        <span className="sr-only">Sentence to tag</span>
        <input className={inputCls} value={s} onChange={(e) => setS(e.target.value)} />
      </label>
      <ol className="mt-4 flex flex-wrap gap-2" aria-label="Tagged tokens">
        {tags.map((t, i) => (
          <li key={i}>
            <button type="button" aria-pressed={sel === i} onClick={() => setSel(i)} className={`border px-2.5 py-1.5 text-left transition-colors ${sel === i ? 'border-sage-deep bg-sage-deep text-ivory' : 'border-ink/20 bg-ivory hover:border-ink/50'}`}>
              <span className="block font-serif text-xl leading-none">{t.word}</span>
              <span className="mt-1 block font-mono text-[11px] font-semibold">{t.tag}</span>
            </button>
          </li>
        ))}
      </ol>
      {sel !== null && tags[sel] && (
        <p className="mt-4 font-mono text-xs text-ink/80" aria-live="polite">
          <b>{tags[sel].word}</b> → {tags[sel].tag} ({PENN_GLOSS[tags[sel].tag] ?? 'punctuation'}) · why: {tags[sel].why}
        </p>
      )}
    </DemoFrame>
  );
}
