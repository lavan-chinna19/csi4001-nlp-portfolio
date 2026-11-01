import { useMemo, useState } from 'react';
import DemoFrame, { chip, inputCls, segBtn } from './DemoFrame';
import { sentenceSplit, wordTokenize } from '../lib/text';
import { naiveSubword } from '../lib/nlp';

type Mode = 'word' | 'sentence' | 'char' | 'subword';

export default function TokenizerDemo() {
  const [text, setText] = useState("Dr. Rao didn't expect tokenization to be unbelievably tricky. It's 3.5x harder than it looks!");
  const [mode, setMode] = useState<Mode>('word');
  const tokens = useMemo(() => {
    if (mode === 'sentence') return sentenceSplit(text);
    if (mode === 'char') return [...text].map((c) => (c === ' ' ? '␣' : c));
    if (mode === 'subword') return wordTokenize(text).flatMap((t) => naiveSubword(t));
    return wordTokenize(text);
  }, [text, mode]);

  return (
    <DemoFrame
      title="Tokenizer"
      toy={mode === 'subword' ? 'Toy subword vocabulary' : 'Regex rules'}
      note={
        mode === 'subword'
          ? 'Naive greedy longest-match split against a tiny hand-written vocabulary (## marks a word-internal piece, as in WordPiece). Real BPE/WordPiece vocabularies are learned from data and hold tens of thousands of pieces.'
          : 'Word mode splits clitics Penn-style (did + n’t) and keeps known abbreviations like “Dr.” together. Sentence mode skips periods after abbreviations.'
      }
    >
      <label className="sr-only" htmlFor="tok-in">Text to tokenize</label>
      <textarea id="tok-in" className={`${inputCls} min-h-[84px] resize-y font-sans`} value={text} onChange={(e) => setText(e.target.value)} />
      <div className="mt-3 flex flex-wrap gap-2" role="group" aria-label="Tokenization mode">
        {(['word', 'sentence', 'char', 'subword'] as Mode[]).map((m) => (
          <button key={m} type="button" aria-pressed={mode === m} className={segBtn(mode === m)} onClick={() => setMode(m)}>
            {m}
          </button>
        ))}
        <span className="ml-auto self-center font-mono text-xs text-ink/70">{tokens.length} tokens</span>
      </div>
      <ol className="mt-4 flex max-h-56 flex-wrap gap-1.5 overflow-auto" aria-label="Tokens">
        {tokens.map((t, i) => (
          <li key={i} className={mode === 'sentence' ? 'w-full border-l-2 border-sage-dark bg-ivory px-3 py-1.5 text-sm' : chip}>
            {mode === 'sentence' && <span className="mr-2 font-mono text-[10px] text-sage-deep">S{i + 1}</span>}
            {t}
          </li>
        ))}
      </ol>
    </DemoFrame>
  );
}
