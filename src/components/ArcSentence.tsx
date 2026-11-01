import { useMemo, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

/**
 * Generative cover visual: one sentence with its Universal Dependencies arcs
 * drawn above (accurate UD analysis) and illustrative "attention" threads below.
 * The attention weights are decorative, not output from a real model — the caption says so.
 */
const WORDS = ['The', 'model', 'reads', 'between', 'the', 'lines'];
// head → dependent (UD v2): reads is root
const DEPS: { h: number; d: number; rel: string }[] = [
  { h: 1, d: 0, rel: 'det' },
  { h: 2, d: 1, rel: 'nsubj' },
  { h: 2, d: 5, rel: 'obl' },
  { h: 5, d: 3, rel: 'case' },
  { h: 5, d: 4, rel: 'det' },
];
// illustrative attention threads (from → to, weight)
const ATTN: { a: number; b: number; w: number }[] = [
  { a: 2, b: 1, w: 0.9 },
  { a: 2, b: 5, w: 0.75 },
  { a: 5, b: 3, w: 0.6 },
  { a: 1, b: 0, w: 0.35 },
  { a: 0, b: 5, w: 0.2 },
  { a: 3, b: 1, w: 0.25 },
  { a: 4, b: 5, w: 0.45 },
];

const W = 1000;
const BASE = 240;

export default function ArcSentence() {
  const reduce = useReducedMotion();
  const [hover, setHover] = useState<number | null>(null);

  const xs = useMemo(() => {
    const widths = WORDS.map((w) => w.length * 21 + 46);
    const total = widths.reduce((a, b) => a + b, 0);
    let x = (W - total) / 2;
    return widths.map((wd) => {
      const c = x + wd / 2;
      x += wd;
      return c;
    });
  }, []);

  const arcPath = (x1: number, x2: number, up: boolean) => {
    const dist = Math.abs(x2 - x1);
    const h = up ? Math.min(34 + dist * 0.36, 200) : Math.min(30 + dist * 0.3, 120);
    const y = up ? BASE - 52 : BASE + 46;
    const cy = up ? y - h : y + h * 0.75;
    return { d: `M ${x1} ${y} C ${x1} ${cy}, ${x2} ${cy}, ${x2} ${y}`, apexY: up ? y - h * 0.75 : y + h * 0.56 };
  };

  const lit = (i: number, j: number) => hover === null || hover === i || hover === j;
  const draw = (delay: number) =>
    reduce
      ? { initial: false as const }
      : {
          initial: { pathLength: 0, opacity: 0 },
          animate: { pathLength: 1, opacity: 1 },
          transition: { duration: 1.1, delay, ease: [0.65, 0, 0.35, 1] as const },
        };

  return (
    <figure className="relative w-full">
      <svg viewBox={`0 0 ${W} 400`} className="h-auto w-full overflow-visible" role="img" aria-labelledby="arc-title arc-desc">
        <title id="arc-title">The sentence “The model reads between the lines” with its dependency structure</title>
        <desc id="arc-desc">
          Arcs above the words show grammatical dependencies: reads is the root, model is its subject, lines is an oblique modifier, between is a case marker and the two determiners attach to their nouns. Fainter lime threads below suggest attention between words.
        </desc>
        <defs>
          <marker id="arrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
            <path d="M 0 0 L 10 5 L 0 10 z" fill="#9DAA8C" />
          </marker>
        </defs>

        {/* dependency arcs */}
        {DEPS.map((e, k) => {
          const siblings = DEPS.filter((o) => o.h === e.h && Math.sign(o.d - o.h) === Math.sign(e.d - e.h)).sort((a, b) => Math.abs(a.d - a.h) - Math.abs(b.d - b.h));
          const rank = siblings.length - siblings.indexOf(e);
          const x1 = xs[e.h] + Math.sign(e.d - e.h) * 9 * rank;
          const { d, apexY } = arcPath(x1, xs[e.d], true);
          const on = lit(e.h, e.d);
          return (
            <g key={`dep-${k}`} style={{ opacity: on ? 1 : 0.18, transition: 'opacity .3s' }}>
              <motion.path d={d} fill="none" stroke="#9DAA8C" strokeWidth={1.4} markerEnd="url(#arrow)" {...draw(0.9 + k * 0.18)} />
              <motion.text
                x={(x1 + xs[e.d]) / 2}
                y={apexY - 6}
                textAnchor="middle"
                className="font-mono"
                fontSize="15"
                fill="#9DAA8C"
                initial={reduce ? false : { opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.6 + k * 0.18 }}
              >
                {e.rel}
              </motion.text>
            </g>
          );
        })}
        {/* root marker */}
        <motion.g initial={reduce ? false : { opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }}>
          <line x1={xs[2]} x2={xs[2]} y1={BASE - 52} y2={BASE - 230} stroke="#D4FF3A" strokeWidth={1.4} markerEnd="url(#arrow)" />
          <text x={xs[2] + 8} y={BASE - 218} className="font-mono" fontSize="15" fill="#D4FF3A">root</text>
        </motion.g>

        {/* words */}
        {WORDS.map((w, i) => (
          <motion.g
            key={w + i}
            onMouseEnter={() => setHover(i)}
            onMouseLeave={() => setHover(null)}
            initial={reduce ? false : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 + i * 0.09, ease: [0.22, 1, 0.36, 1] }}
            style={{ cursor: 'default' }}
          >
            <text x={xs[i]} y={BASE} textAnchor="middle" fontFamily="'Instrument Serif', Georgia, serif" fontSize="46" fill={hover === i ? '#D4FF3A' : '#F2EDE3'}>
              {w}
            </text>
            <text x={xs[i]} y={BASE + 30} textAnchor="middle" className="font-mono" fontSize="12" fill="#8E8F8A">
              {['DET', 'NOUN', 'VERB', 'ADP', 'DET', 'NOUN'][i]}
            </text>
          </motion.g>
        ))}

        {/* illustrative attention threads */}
        {ATTN.map((t, k) => {
          const { d } = arcPath(xs[t.a], xs[t.b], false);
          const on = lit(t.a, t.b);
          return (
            <g key={`att-${k}`} style={{ opacity: on ? 1 : 0.1, transition: 'opacity .3s' }}>
              <motion.path d={d} fill="none" stroke="#D4FF3A" strokeOpacity={0.15 + t.w * 0.6} strokeWidth={0.8 + t.w * 2.2} {...draw(1.8 + k * 0.12)} />
              {!reduce && (
                <motion.path
                  d={d}
                  fill="none"
                  stroke="#D4FF3A"
                  strokeWidth={2.4}
                  strokeLinecap="round"
                  pathLength={1}
                  strokeDasharray="0.03 0.97"
                  initial={{ strokeDashoffset: 1, opacity: 0 }}
                  animate={{ strokeDashoffset: [1, 0], opacity: [0, 0.9, 0.9, 0] }}
                  transition={{ duration: 2.6, delay: 3.2 + k * 0.7, repeat: Infinity, repeatDelay: 5, ease: 'easeInOut' }}
                />
              )}
            </g>
          );
        })}
      </svg>
      <figcaption className="mt-2 flex flex-wrap gap-x-5 gap-y-1 font-mono text-[10px] uppercase tracking-[0.16em] text-ink-mute">
        <span><span className="mr-1.5 inline-block h-px w-5 bg-sage align-middle" />dependency arcs · UD</span>
        <span><span className="mr-1.5 inline-block h-[2px] w-5 bg-lime align-middle" />attention threads · illustrative</span>
        <span className="hidden sm:inline">hover a word</span>
      </figcaption>
    </figure>
  );
}
