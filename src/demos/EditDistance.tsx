import { useMemo, useState } from 'react';
import DemoFrame, { inputCls, segBtn } from './DemoFrame';
import { editDistance } from '../lib/nlp';

export default function EditDistanceDemo() {
  const [a, setA] = useState('intention');
  const [b, setB] = useState('execution');
  const [sub, setSub] = useState(1);
  const A = a.slice(0, 14);
  const B = b.slice(0, 14);
  const r = useMemo(() => editDistance(A, B, sub), [A, B, sub]);

  return (
    <DemoFrame title="Minimum edit distance" note="Each cell D[i][j] is the cheapest way to turn the first i letters of the source into the first j letters of the target. Highlighted cells trace one optimal alignment back from the bottom-right. Inputs are capped at 14 characters.">
      <div className="grid gap-3 sm:grid-cols-[1fr_1fr_auto]">
        <label className="block">
          <span className="label mb-1 block text-sage-deep">source</span>
          <input className={inputCls} value={a} onChange={(e) => setA(e.target.value)} />
        </label>
        <label className="block">
          <span className="label mb-1 block text-sage-deep">target</span>
          <input className={inputCls} value={b} onChange={(e) => setB(e.target.value)} />
        </label>
        <div>
          <span className="label mb-1 block text-sage-deep">substitution cost</span>
          <div className="flex gap-2" role="group" aria-label="Substitution cost">
            {[1, 2].map((c) => (
              <button key={c} type="button" aria-pressed={sub === c} className={segBtn(sub === c)} onClick={() => setSub(c)}>
                {c === 1 ? '1 · Levenshtein' : '2'}
              </button>
            ))}
          </div>
        </div>
      </div>

      <p className="mt-4 font-serif text-3xl">
        distance = <span className="font-mono text-2xl font-semibold text-sage-deep">{r.distance}</span>
      </p>

      <div className="mt-3 overflow-x-auto">
        <table className="border-collapse font-mono text-xs" aria-label="Dynamic programming table">
          <thead>
            <tr>
              <th className="h-7 w-7" />
              <th className="h-7 w-7 text-ink/50">#</th>
              {[...B].map((ch, j) => (
                <th key={j} className="h-7 w-7 font-semibold">{ch}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {r.table.map((row, i) => (
              <tr key={i}>
                <th className="h-7 w-7 font-semibold">{i === 0 ? <span className="text-ink/50">#</span> : A[i - 1]}</th>
                {row.map((v, j) => {
                  const on = r.path.has(`${i},${j}`);
                  return (
                    <td key={j} className={`h-7 w-7 border border-ink/10 text-center ${on ? 'bg-sage-deep font-semibold text-ivory' : ''}`}>
                      {v}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <ol className="mt-4 flex flex-wrap gap-1 font-mono text-[11px]" aria-label="Alignment operations">
        {r.ops.map((o, i) => (
          <li key={i} className={`border px-1.5 py-0.5 ${o.op === 'match' ? 'border-ink/15 text-ink/60' : 'border-sage-deep bg-ivory text-sage-deep'}`}>
            {o.op === 'match' && `${o.a}`}
            {o.op === 'sub' && `${o.a}→${o.b}`}
            {o.op === 'ins' && `+${o.b}`}
            {o.op === 'del' && `−${o.a}`}
          </li>
        ))}
      </ol>
    </DemoFrame>
  );
}
