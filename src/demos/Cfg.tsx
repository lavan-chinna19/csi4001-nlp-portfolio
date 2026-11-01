import { useMemo, useState } from 'react';
import DemoFrame, { inputCls, segBtn } from './DemoFrame';
import { GRAMMAR, LEXICON, parseCfg, type Tree } from '../lib/nlp';

const SAMPLES = ['the cat chased a mouse', 'I saw the man with the telescope', 'a clever student reads the book', 'the dog slept on the mat'];

interface Node { label: string; word?: string; x: number; y: number; kids: Node[] }

function layout(t: Tree): { root: Node; width: number; depth: number } {
  let leaf = 0;
  let maxDepth = 0;
  const walk = (n: Tree, d: number): Node => {
    maxDepth = Math.max(maxDepth, d);
    if (n.word) {
      const x = leaf++;
      return { label: n.label, word: n.word, x, y: d, kids: [] };
    }
    const kids = n.children.map((c) => walk(c, d + 1));
    return { label: n.label, x: (kids[0].x + kids[kids.length - 1].x) / 2, y: d, kids };
  };
  const root = walk(t, 0);
  return { root, width: leaf, depth: maxDepth };
}

function TreeSvg({ tree }: { tree: Tree }) {
  const { root, width, depth } = layout(tree);
  const COL = 92;
  const ROW = 58;
  const W = Math.max(width * COL, 300);
  const H = (depth + 1) * ROW + 40;
  const px = (x: number) => x * COL + COL / 2;
  const py = (y: number) => y * ROW + 22;
  const els: JSX.Element[] = [];
  const draw = (n: Node, key: string) => {
    n.kids.forEach((k, i) => {
      els.push(<line key={`${key}-l${i}`} x1={px(n.x)} y1={py(n.y) + 8} x2={px(k.x)} y2={py(k.y) - 14} stroke="#4F5C41" strokeWidth={1.2} />);
      draw(k, `${key}-${i}`);
    });
    els.push(
      <text key={`${key}-t`} x={px(n.x)} y={py(n.y)} textAnchor="middle" fontFamily="'IBM Plex Mono', monospace" fontSize="13" fontWeight={600} fill={n.y === 0 ? '#141517' : '#3E4934'}>
        {n.label}
      </text>
    );
    if (n.word) {
      els.push(<line key={`${key}-w`} x1={px(n.x)} y1={py(n.y) + 6} x2={px(n.x)} y2={py(depth + 1) - 18} stroke="#141517" strokeOpacity={0.25} strokeDasharray="2 3" />);
      els.push(
        <text key={`${key}-ww`} x={px(n.x)} y={py(depth + 1)} textAnchor="middle" fontFamily="'Instrument Serif', Georgia, serif" fontSize="22" fill="#141517">
          {n.word}
        </text>
      );
    }
  };
  draw(root, 'r');
  return (
    <svg viewBox={`0 0 ${W} ${H}`} style={{ minWidth: Math.min(W, 640) }} className="h-auto w-full" role="img" aria-label="Parse tree">
      {els}
    </svg>
  );
}

export default function CfgDemo() {
  const [s, setS] = useState(SAMPLES[1]);
  const [idx, setIdx] = useState(0);
  const r = useMemo(() => parseCfg(s), [s]);
  const k = Math.min(idx, Math.max(0, r.parses.length - 1));

  return (
    <DemoFrame title="Context-free grammar · parse tree" toy="Toy grammar & lexicon" note="A recursive-descent parser enumerates every parse licensed by this small grammar. The telescope sentence gets two trees — the classic PP-attachment ambiguity.">
      <div className="flex flex-wrap gap-2" role="group" aria-label="Sample sentences">
        {SAMPLES.map((x) => (
          <button key={x} type="button" aria-pressed={s === x} className={segBtn(s === x)} onClick={() => { setS(x); setIdx(0); }}>{x}</button>
        ))}
      </div>
      <label className="mt-3 block">
        <span className="sr-only">Sentence to parse</span>
        <input className={inputCls} value={s} onChange={(e) => { setS(e.target.value); setIdx(0); }} />
      </label>

      <details className="mt-3 font-mono text-[11px] text-ink/75">
        <summary className="cursor-pointer select-none text-sage-deep">grammar & lexicon</summary>
        <div className="mt-2 grid gap-3 sm:grid-cols-2">
          <ul>{Object.entries(GRAMMAR).map(([lhs, rhss]) => <li key={lhs}>{lhs} → {rhss.map((r) => r.join(' ')).join(' | ')}</li>)}</ul>
          <ul>{Object.entries(LEXICON).map(([pos, ws]) => <li key={pos}>{pos} → {ws.join(' | ')}</li>)}</ul>
        </div>
      </details>

      <div className="mt-4">
        {r.unknown.length > 0 ? (
          <p className="font-mono text-xs text-ink/80">Not in the toy lexicon: {r.unknown.join(', ')}</p>
        ) : r.parses.length === 0 ? (
          <p className="font-mono text-xs text-ink/80">No parse: this word order is not licensed by the grammar.</p>
        ) : (
          <>
            <div className="mb-2 flex items-center gap-2 font-mono text-xs">
              <span>{r.parses.length} parse{r.parses.length > 1 ? 's' : ''}</span>
              {r.parses.length > 1 &&
                r.parses.map((_, i) => (
                  <button key={i} type="button" aria-pressed={k === i} className={segBtn(k === i)} onClick={() => setIdx(i)}>
                    tree {i + 1}
                  </button>
                ))}
            </div>
            <div className="overflow-x-auto bg-ivory p-2" data-hscroll-ok="parse tree diagram"><TreeSvg tree={r.parses[k]} /></div>
          </>
        )}
      </div>
    </DemoFrame>
  );
}
