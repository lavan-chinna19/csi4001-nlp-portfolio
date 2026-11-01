import { useState } from 'react';
import DemoFrame, { segBtn } from './DemoFrame';

type Part = { form: string; kind: 'prefix' | 'root' | 'suffix'; gloss: string; type?: 'derivational' | 'inflectional' };

/** Hand-analysed word set (TOY). Spelling changes at boundaries are noted. */
const WORDS: Record<string, { parts: Part[]; note?: string; cls: string }> = {
  unhappiness: { cls: 'noun', parts: [
    { form: 'un-', kind: 'prefix', gloss: 'not', type: 'derivational' },
    { form: 'happy', kind: 'root', gloss: 'adjective' },
    { form: '-ness', kind: 'suffix', gloss: 'adj → noun (state)', type: 'derivational' },
  ], note: 'Orthographic rule: y → i before -ness (happi-ness).' },
  rewriting: { cls: 'verb (gerund/participle)', parts: [
    { form: 're-', kind: 'prefix', gloss: 'again', type: 'derivational' },
    { form: 'write', kind: 'root', gloss: 'verb' },
    { form: '-ing', kind: 'suffix', gloss: 'progressive / participle', type: 'inflectional' },
  ], note: 'Orthographic rule: silent e dropped before -ing.' },
  disagreements: { cls: 'noun, plural', parts: [
    { form: 'dis-', kind: 'prefix', gloss: 'opposite of', type: 'derivational' },
    { form: 'agree', kind: 'root', gloss: 'verb' },
    { form: '-ment', kind: 'suffix', gloss: 'verb → noun', type: 'derivational' },
    { form: '-s', kind: 'suffix', gloss: 'plural', type: 'inflectional' },
  ] },
  carelessly: { cls: 'adverb', parts: [
    { form: 'care', kind: 'root', gloss: 'noun' },
    { form: '-less', kind: 'suffix', gloss: 'noun → adj (without)', type: 'derivational' },
    { form: '-ly', kind: 'suffix', gloss: 'adj → adverb', type: 'derivational' },
  ] },
  unbelievable: { cls: 'adjective', parts: [
    { form: 'un-', kind: 'prefix', gloss: 'not', type: 'derivational' },
    { form: 'believe', kind: 'root', gloss: 'verb' },
    { form: '-able', kind: 'suffix', gloss: 'verb → adj (can be)', type: 'derivational' },
  ], note: 'Orthographic rule: silent e dropped before -able.' },
  teachers: { cls: 'noun, plural', parts: [
    { form: 'teach', kind: 'root', gloss: 'verb' },
    { form: '-er', kind: 'suffix', gloss: 'verb → noun (agent)', type: 'derivational' },
    { form: '-s', kind: 'suffix', gloss: 'plural', type: 'inflectional' },
  ] },
  nationalized: { cls: 'verb, past', parts: [
    { form: 'nation', kind: 'root', gloss: 'noun' },
    { form: '-al', kind: 'suffix', gloss: 'noun → adj', type: 'derivational' },
    { form: '-ize', kind: 'suffix', gloss: 'adj → verb', type: 'derivational' },
    { form: '-ed', kind: 'suffix', gloss: 'past tense', type: 'inflectional' },
  ], note: 'Orthographic rule: e of -ize merges with -ed.' },
  preprocessing: { cls: 'verb (gerund/participle)', parts: [
    { form: 'pre-', kind: 'prefix', gloss: 'before', type: 'derivational' },
    { form: 'process', kind: 'root', gloss: 'verb' },
    { form: '-ing', kind: 'suffix', gloss: 'progressive / participle', type: 'inflectional' },
  ] },
};

const COLORS: Record<Part['kind'], string> = {
  prefix: 'border-sage-dark bg-sage/30',
  root: 'border-ink bg-ivory',
  suffix: 'border-sage-deep bg-sage-deep text-ivory',
};

export default function MorphologyDemo() {
  const [word, setWord] = useState('unhappiness');
  const w = WORDS[word];
  return (
    <DemoFrame title="Morphology analyser" toy="Hand-analysed word set" note="Analyses are written by hand for these eight words — a real analyser uses a lexicon plus finite-state rules for affixes and spelling changes.">
      <div className="flex flex-wrap gap-2" role="group" aria-label="Choose a word">
        {Object.keys(WORDS).map((k) => (
          <button key={k} type="button" aria-pressed={word === k} className={segBtn(word === k)} onClick={() => setWord(k)}>{k}</button>
        ))}
      </div>
      <div className="mt-5 flex flex-wrap items-stretch gap-1.5">
        {w.parts.map((p, i) => (
          <div key={i} className={`min-w-[96px] border px-3 py-2 ${COLORS[p.kind]}`}>
            <p className="font-serif text-2xl leading-none">{p.form}</p>
            <p className="mt-1.5 font-mono text-[10px] uppercase tracking-wider opacity-80">{p.kind}{p.type ? ` · ${p.type}` : ''}</p>
            <p className="mt-0.5 text-xs opacity-90">{p.gloss}</p>
          </div>
        ))}
      </div>
      <p className="mt-4 font-mono text-xs text-ink/75">
        word class: <b>{w.cls}</b>
        {w.note && <> · {w.note}</>}
      </p>
    </DemoFrame>
  );
}
