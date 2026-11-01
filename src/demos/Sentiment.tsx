import { useMemo, useState } from 'react';
import DemoFrame, { inputCls, segBtn } from './DemoFrame';
import { sentiment } from '../lib/nlp';

const EXAMPLES = ['The lecture was not bad at all.', 'The demo is VERY useful, but the setup was confusing.', 'I really love this course!', 'The model is slightly slow.'];

export default function SentimentDemo() {
  const [t, setT] = useState(EXAMPLES[1]);
  const r = useMemo(() => sentiment(t), [t]);
  const pct = ((r.compound + 1) / 2) * 100;
  return (
    <DemoFrame title="Lexicon-based sentiment" toy="Toy lexicon (~40 words)" note="Word valences (−4…+4) are a small hand-made set. The rules follow the ideas in VADER: negation within three words (× −0.74), intensifiers, ALL-CAPS emphasis, “but” (× 0.5 before, × 1.5 after), and normalisation compound = x / √(x² + 15).">
      <div className="flex flex-wrap gap-2" role="group" aria-label="Examples">
        {EXAMPLES.map((e) => (
          <button key={e} type="button" aria-pressed={t === e} className={segBtn(t === e)} onClick={() => setT(e)}>{e}</button>
        ))}
      </div>
      <label className="mt-3 block">
        <span className="sr-only">Text to score</span>
        <input className={inputCls} value={t} onChange={(e) => setT(e.target.value)} />
      </label>
      <ol className="mt-4 flex flex-wrap gap-1.5" aria-label="Token scores">
        {r.tokens.map((tk, i) => (
          <li key={i} className={`border px-2 py-1 ${tk.base ? (tk.final >= 0 ? 'border-sage-deep bg-sage/30' : 'border-[#9a3412] bg-[#9a3412]/10') : 'border-ink/10'}`}>
            <span className="block font-serif text-lg leading-none">{tk.word}</span>
            {tk.base !== 0 && (
              <span className="mt-1 block font-mono text-[10px]">
                {tk.base.toFixed(1)} → <b>{tk.final.toFixed(2)}</b>
              </span>
            )}
            {tk.notes.length > 0 && <span className="block font-mono text-[9px] text-ink/70">{tk.notes.join(' · ')}</span>}
          </li>
        ))}
      </ol>
      <div className="mt-5">
        <div className="relative h-2 bg-gradient-to-r from-[#9a3412]/50 via-ink/10 to-sage-dark/70" aria-hidden>
          <span className="absolute -top-1.5 h-5 w-[3px] bg-ink" style={{ left: `calc(${pct}% - 1px)` }} />
        </div>
        <div className="mt-1 flex justify-between font-mono text-[10px] text-ink/60"><span>−1</span><span>0</span><span>+1</span></div>
        <p className="mt-2 font-mono text-sm">compound = <b>{r.compound.toFixed(3)}</b> · <span className="uppercase">{r.label}</span></p>
      </div>
    </DemoFrame>
  );
}
