import { useMemo, useState } from 'react';
import DemoFrame, { inputCls } from './DemoFrame';
import { porterStem } from '../lib/porter';

/** Small hand-written lemma table (TOY): a real lemmatizer uses a full lexicon + POS. */
const LEMMAS: Record<string, string> = {
  running: 'run', ran: 'run', runs: 'run', better: 'good', best: 'good', was: 'be', were: 'be', is: 'be', are: 'be', been: 'be',
  mice: 'mouse', geese: 'goose', children: 'child', feet: 'foot', studies: 'study', studying: 'study', happiness: 'happiness',
  relational: 'relational', universities: 'university', university: 'university', universe: 'universe', went: 'go', gone: 'go',
  caring: 'care', cars: 'car', generalizations: 'generalization', wolves: 'wolf', leaves: 'leaf', ponies: 'pony', agreed: 'agree',
  meeting: 'meeting', organization: 'organization', flies: 'fly', hopping: 'hop', ate: 'eat', eaten: 'eat',
};

export default function StemmerDemo() {
  const [text, setText] = useState('running ran better mice studies happiness relational university universe generalizations caring ponies');
  const rows = useMemo(
    () =>
      text
        .toLowerCase()
        .split(/[^a-z]+/)
        .filter(Boolean)
        .slice(0, 30)
        .map((w) => ({ w, ...porterStem(w), lemma: LEMMAS[w] })),
    [text]
  );
  const [open, setOpen] = useState<string | null>('generalizations');

  return (
    <DemoFrame
      title="Porter stemmer vs. lemmatizer"
      toy="Lemma table is a toy"
      note="The stemmer is a full implementation of Porter’s 1980 algorithm (steps 1a–5b). The lemmatizer column is a small lookup table for demonstration — words outside it show “—”. Click a row to see which Porter steps fired."
    >
      <label className="sr-only" htmlFor="stem-in">Words to stem</label>
      <input id="stem-in" className={inputCls} value={text} onChange={(e) => setText(e.target.value)} />
      <div className="mt-4 overflow-x-auto">
        <table className="w-full text-left text-[13px] sm:text-sm">
          <thead className="font-mono text-[10px] uppercase tracking-wider text-sage-deep sm:text-[11px]">
            <tr className="border-b border-ink/20">
              <th className="py-2 pr-3 font-medium">word</th>
              <th className="py-2 pr-3 font-medium">porter stem</th>
              <th className="py-2 pr-3 font-medium">lemma (toy)</th>
              <th className="py-2 font-medium">steps</th>
            </tr>
          </thead>
          <tbody className="font-mono [overflow-wrap:anywhere]">
            {rows.map((r, i) => (
              <tr key={r.w + i} className="border-b border-ink/10 align-top">
                <td className="py-1.5 pr-3">{r.w}</td>
                <td className="py-1.5 pr-3 font-semibold text-sage-deep">{r.stem}</td>
                <td className="py-1.5 pr-3">{r.lemma ?? <span className="text-ink/50">—</span>}</td>
                <td className="py-1.5">
                  <button type="button" className="underline decoration-dotted underline-offset-4" aria-expanded={open === r.w} onClick={() => setOpen(open === r.w ? null : r.w)}>
                    {r.trace.length} {r.trace.length === 1 ? 'step' : 'steps'}
                  </button>
                  {open === r.w && r.trace.length > 0 && (
                    <ol className="mt-1 space-y-0.5 text-[11px] text-ink/75">
                      {r.trace.map((t, k) => (
                        <li key={k}>
                          {t.step}: {t.before} → <b>{t.after}</b>
                        </li>
                      ))}
                    </ol>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </DemoFrame>
  );
}
