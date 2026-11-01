import { useMemo, useState } from 'react';
import DemoFrame, { inputCls, segBtn } from './DemoFrame';
import { bigramProb, scoreSentence, trainBigram } from '../lib/nlp';

const DEFAULT = `I am Sam
Sam I am
I do not like green eggs and ham
I like Sam
Sam does not like ham`;

const fmt = (x: number) => (x === 0 ? '0' : x < 0.001 ? x.toExponential(1) : x.toFixed(3));

export default function BigramDemo() {
  const [corpus, setCorpus] = useState(DEFAULT);
  const [test, setTest] = useState('I like green ham');
  const model = useMemo(() => trainBigram(corpus), [corpus]);
  const contexts = useMemo(() => ['<s>', ...model.vocab.filter((w) => w !== '</s>')], [model]);
  const [ctx, setCtx] = useState('i');
  const context = contexts.includes(ctx) ? ctx : contexts[0];
  const score = useMemo(() => scoreSentence(model, test), [model, test]);
  const [laplace, setLaplace] = useState(false);

  const rows = useMemo(
    () =>
      model.vocab
        .map((w) => ({ w, c: model.bigrams.get(context)?.get(w) ?? 0, mle: bigramProb(model, context, w, false), lap: bigramProb(model, context, w, true) }))
        .sort((a, b) => b.c - a.c || a.w.localeCompare(b.w)),
    [model, context]
  );

  return (
    <DemoFrame
      title="Bigram language model"
      toy="Tiny editable corpus"
      note="One sentence per line; each is padded with <s> and </s>. V = number of word types that can follow (including </s>). MLE = C(prev, w) / C(prev). Laplace = (C(prev, w) + 1) / (C(prev) + V). Perplexity = exp(−(1/N) Σ log P)."
    >
      <div className="grid gap-4 md:grid-cols-2">
        <label className="block">
          <span className="label mb-1 block text-sage-deep">training corpus</span>
          <textarea className={`${inputCls} min-h-[150px] resize-y`} value={corpus} onChange={(e) => setCorpus(e.target.value)} />
          <span className="mt-1 block font-mono text-[11px] text-ink/65">{model.sentences.length} sentences · V = {model.vocab.length}</span>
        </label>
        <div>
          <label className="block">
            <span className="label mb-1 block text-sage-deep">P( w | previous word )</span>
            <select className={inputCls} value={context} onChange={(e) => setCtx(e.target.value)}>
              {contexts.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </label>
          <div className="mt-2 flex gap-2" role="group" aria-label="Estimator">
            <button type="button" aria-pressed={!laplace} className={segBtn(!laplace)} onClick={() => setLaplace(false)}>MLE</button>
            <button type="button" aria-pressed={laplace} className={segBtn(laplace)} onClick={() => setLaplace(true)}>Laplace (add-1)</button>
          </div>
          <ul className="mt-3 max-h-[150px] space-y-1 overflow-auto pr-1" aria-label="Next-word probabilities">
            {rows.map((r) => {
              const p = laplace ? r.lap : r.mle;
              return (
                <li key={r.w} className="grid grid-cols-[80px_1fr_56px] items-center gap-2 font-mono text-xs">
                  <span className="min-w-0 break-words">{r.w}</span>
                  <span className="h-2 bg-ink/10"><span className="block h-full bg-sage-dark" style={{ width: `${Math.min(100, p * 100)}%` }} /></span>
                  <span className="text-right">{fmt(p)}</span>
                </li>
              );
            })}
          </ul>
        </div>
      </div>

      <label className="mt-5 block">
        <span className="label mb-1 block text-sage-deep">test sentence</span>
        <input className={inputCls} value={test} onChange={(e) => setTest(e.target.value)} />
      </label>
      <div className="mt-3 overflow-x-auto">
        <table className="w-full font-mono text-[11px] sm:text-xs">
          <thead className="text-left text-sage-deep">
            <tr className="border-b border-ink/20"><th className="py-1.5 font-medium">bigram</th><th className="font-medium">count</th><th className="font-medium">MLE</th><th className="font-medium">Laplace</th></tr>
          </thead>
          <tbody>
            {score.steps.map((s, i) => (
              <tr key={i} className="border-b border-ink/10">
                <td className="break-words py-1 pr-2">{s.prev} → {s.w}</td>
                <td>{s.count}/{s.history}</td>
                <td className={s.mle === 0 ? 'font-semibold text-[#9a3412]' : ''}>{fmt(s.mle)}</td>
                <td>{fmt(s.laplace)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        <div className="border border-ink/15 bg-ivory p-3">
          <p className="label text-sage-deep">perplexity · MLE</p>
          <p className="mt-1 font-mono text-2xl">{Number.isFinite(score.ppMle) ? score.ppMle.toFixed(2) : '∞'}</p>
          {!Number.isFinite(score.ppMle) && <p className="mt-1 text-xs text-ink/70">An unseen bigram has probability 0, so the whole sentence does.</p>}
        </div>
        <div className="border border-ink/15 bg-ivory p-3">
          <p className="label text-sage-deep">perplexity · Laplace</p>
          <p className="mt-1 font-mono text-2xl">{score.ppLaplace.toFixed(2)}</p>
          {score.oov.length > 0 && <p className="mt-1 text-xs text-ink/70">Out-of-vocabulary: {score.oov.join(', ')} (treated as a type with zero counts — a simplification).</p>}
        </div>
      </div>
    </DemoFrame>
  );
}
