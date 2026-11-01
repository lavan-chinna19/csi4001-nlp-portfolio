import { useMemo, useState } from 'react';
import DemoFrame, { inputCls, segBtn } from './DemoFrame';
import { summarize } from '../lib/nlp';

const DEFAULT = `Natural language processing helps computers work with human language. Early language systems relied on hand-written rules written by linguists. Statistical methods later learned patterns of language from large collections of text. N-gram language models estimate the probability of a word from the words before it. Today, neural language models learn representations of words and sentences from data. These models power translation, search and summarization. However, language models can still repeat biases found in their training text. Careful evaluation of language systems remains important.`;

export default function SummarizerDemo() {
  const [text, setText] = useState(DEFAULT);
  const [k, setK] = useState(2);
  const r = useMemo(() => summarize(text, k), [text, k]);
  const max = Math.max(0.0001, ...r.scored.map((s) => s.score));
  return (
    <DemoFrame title="Extractive summarizer" toy="Frequency-based" note="Content-word frequencies (stopwords removed) are normalised by the most frequent word; each sentence’s score is the mean normalised frequency of its content words. The top-k sentences are kept in their original order.">
      <label className="block">
        <span className="sr-only">Text to summarize</span>
        <textarea className={`${inputCls} min-h-[120px] resize-y font-sans`} value={text} onChange={(e) => setText(e.target.value)} />
      </label>
      <div className="mt-3 flex flex-wrap items-center gap-2" role="group" aria-label="Summary length">
        <span className="font-mono text-xs">keep</span>
        {[1, 2, 3].map((n) => (
          <button key={n} type="button" aria-pressed={k === n} className={segBtn(k === n)} onClick={() => setK(n)}>{n}</button>
        ))}
        <span className="font-mono text-xs">sentence{k > 1 ? 's' : ''}</span>
        <span className="ml-auto font-mono text-[11px] text-ink/65">top words: {r.topWords.map(([w, c]) => `${w}(${c})`).join(' ')}</span>
      </div>
      <ol className="mt-4 space-y-1.5">
        {r.scored.map((s) => {
          const on = r.chosen.has(s.i);
          return (
            <li key={s.i} className={`grid grid-cols-[48px_1fr] gap-3 border-l-2 py-1 pl-3 text-sm ${on ? 'border-sage-deep bg-ivory' : 'border-transparent text-ink/55'}`}>
              <span className="font-mono text-[11px]">
                {s.score.toFixed(2)}
                <span className="mt-1 block h-1 bg-ink/10"><span className="block h-full bg-sage-dark" style={{ width: `${(s.score / max) * 100}%` }} /></span>
              </span>
              <span>{s.s}</span>
            </li>
          );
        })}
      </ol>
    </DemoFrame>
  );
}
