import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, X } from 'lucide-react';
import { exhibits } from '../content/exhibits';
import { mapConcepts, type ConceptId } from '../content/conceptMap';
import { syllabus } from '../content/syllabus';

type Sel = { kind: 'exhibit'; id: string } | { kind: 'concept'; id: ConceptId } | null;

const ROW = 46;

export function scrollToExhibit(id: string) {
  const el = document.getElementById(`ex-${id}`);
  if (!el) return;
  el.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth', block: 'start' });
  el.focus({ preventScroll: true });
}

export default function ConnectionMap() {
  const [sel, setSel] = useState<Sel>(null);
  const H = Math.max(exhibits.length, mapConcepts.length) * ROW;

  const edges = useMemo(
    () => exhibits.flatMap((e, i) => e.concepts.map((c) => ({ e: e.id, c, i, j: mapConcepts.findIndex((m) => m.id === c) }))),
    []
  );

  const isEdgeOn = (e: string, c: ConceptId) => !sel || (sel.kind === 'exhibit' ? sel.id === e : sel.id === c);
  const exOn = (id: string) => !sel || (sel.kind === 'exhibit' ? sel.id === id : exhibits.find((x) => x.id === id)!.concepts.includes(sel.id));
  const coOn = (id: ConceptId) => !sel || (sel.kind === 'concept' ? sel.id === id : exhibits.find((x) => x.id === sel.id)!.concepts.includes(id));
  const degree = (c: ConceptId) => exhibits.filter((e) => e.concepts.includes(c)).length;

  const pickExhibit = (id: string) => {
    setSel({ kind: 'exhibit', id });
  };
  const pickConcept = (id: ConceptId) => setSel(sel?.kind === 'concept' && sel.id === id ? null : { kind: 'concept', id });

  const exBtn = (e: (typeof exhibits)[number], compact = false) => {
    const on = exOn(e.id);
    const active = sel?.kind === 'exhibit' && sel.id === e.id;
    return (
      <button
        type="button"
        aria-pressed={active}
        onClick={() => (active ? setSel(null) : pickExhibit(e.id))}
        className={`w-full min-w-0 break-words border px-3 text-left font-serif leading-[1.05] transition-all ${compact ? 'py-1.5 text-lg' : 'text-xl'} ${
          active ? 'border-lime bg-lime text-ink' : on ? 'border-ivory/25 text-ivory hover:border-ivory/60' : 'border-ivory/10 text-ivory/50'
        }`}
        style={compact ? undefined : { height: ROW - 8 }}
      >
        {e.name}
      </button>
    );
  };

  const coBtn = (c: (typeof mapConcepts)[number], compact = false) => {
    const on = coOn(c.id);
    const active = sel?.kind === 'concept' && sel.id === c.id;
    return (
      <button
        type="button"
        aria-pressed={active}
        onClick={() => pickConcept(c.id)}
        className={`flex w-full items-center justify-between gap-2 border px-3 text-left font-mono text-xs transition-all ${compact ? 'py-1.5' : ''} ${
          active ? 'border-lime bg-lime text-ink' : on ? 'border-sage/60 text-ivory hover:border-sage' : 'border-ivory/10 text-ivory/50'
        }`}
        style={compact ? undefined : { height: ROW - 8 }}
      >
        <span className="min-w-0 break-words leading-tight">{c.label}</span>
        <span className={`shrink-0 ${active ? 'text-ink/70' : 'text-ink-mute'}`}>{degree(c.id)}</span>
      </button>
    );
  };

  const selExhibit = sel?.kind === 'exhibit' ? exhibits.find((e) => e.id === sel.id)! : null;
  const selConcept = sel?.kind === 'concept' ? mapConcepts.find((c) => c.id === sel.id)! : null;
  const module = selConcept?.module ? syllabus.find((m) => m.id === selConcept.module) : null;

  return (
    <div>
      {/* desktop bipartite map */}
      <div className="hidden md:grid md:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)_minmax(0,1fr)]" style={{ height: H }}>
        <ul aria-label="Exhibits" className="relative">
          {exhibits.map((e, i) => (
            <li key={e.id} className="absolute left-0 right-0 flex items-center" style={{ top: (i + 0.5) * (H / exhibits.length) - ROW / 2, height: ROW }}>
              {exBtn(e)}
            </li>
          ))}
        </ul>
        <svg aria-hidden className="h-full w-full" viewBox={`0 0 100 ${H}`} preserveAspectRatio="none">
          {edges.map((ed, k) => {
            const y1 = (ed.i + 0.5) * (H / exhibits.length);
            const y2 = (ed.j + 0.5) * (H / mapConcepts.length);
            const on = isEdgeOn(ed.e, ed.c);
            return (
              <path
                key={k}
                d={`M 0 ${y1} C 50 ${y1}, 50 ${y2}, 100 ${y2}`}
                fill="none"
                stroke={on && sel ? '#D4FF3A' : '#9DAA8C'}
                strokeOpacity={sel ? (on ? 0.95 : 0.06) : 0.32}
                strokeWidth={on && sel ? 1.8 : 1}
                vectorEffect="non-scaling-stroke"
                style={{ transition: 'stroke-opacity .3s, stroke .3s' }}
              />
            );
          })}
        </svg>
        <ul aria-label="Concepts" className="relative">
          {mapConcepts.map((c, j) => (
            <li key={c.id} className="absolute left-0 right-0 flex items-center" style={{ top: (j + 0.5) * (H / mapConcepts.length) - ROW / 2, height: ROW }}>
              {coBtn(c)}
            </li>
          ))}
        </ul>
      </div>

      {/* mobile stacked layout */}
      <div className="space-y-6 md:hidden">
        <div>
          <p className="label mb-2 text-sage">Concepts</p>
          <ul className="grid grid-cols-2 gap-1.5" aria-label="Concepts">
            {mapConcepts.map((c) => <li key={c.id}>{coBtn(c, true)}</li>)}
          </ul>
        </div>
        <div>
          <p className="label mb-2 text-sage">Exhibits</p>
          <ul className="grid grid-cols-2 gap-1.5" aria-label="Exhibits">
            {exhibits.map((e) => <li key={e.id}>{exBtn(e, true)}</li>)}
          </ul>
        </div>
      </div>

      {/* detail panel */}
      <div className="mt-8 min-h-[120px] border border-ivory/15 bg-ink-soft p-5 md:p-6" aria-live="polite">
        {!sel && <p className="font-mono text-xs text-ivory/70">Select a concept to see which exhibits use it, or an exhibit to see its concepts.</p>}
        {selConcept && (
          <div className="grid gap-4 md:grid-cols-12">
            <div className="md:col-span-4">
              <p className="label text-lime">Concept</p>
              <p className="mt-1 font-serif text-3xl">{selConcept.label}</p>
              <p className="mt-1 text-sm text-ivory/75">{selConcept.blurb}</p>
              {module ? (
                <Link to={`/learning#${module.id}`} className="link-u mt-3 inline-flex items-center gap-1 font-mono text-xs text-sage">
                  CSI4001 · Module {module.number}: {module.title} <ArrowRight size={12} aria-hidden />
                </Link>
              ) : (
                <p className="mt-3 font-mono text-[11px] text-ink-mute">Beyond the eight module titles — met through these projects.</p>
              )}
            </div>
            <ul className="flex flex-wrap content-start gap-2 md:col-span-8" aria-label="Linked exhibits">
              {exhibits.filter((e) => e.concepts.includes(selConcept.id)).map((e) => (
                <li key={e.id}>
                  <button type="button" onClick={() => scrollToExhibit(e.id)} className="inline-flex items-center gap-2 border border-lime/60 px-3 py-1.5 font-serif text-lg hover:bg-lime hover:text-ink">
                    {e.name} <ArrowRight size={14} aria-hidden />
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
        {selExhibit && (
          <div className="grid gap-4 md:grid-cols-12">
            <div className="md:col-span-4">
              <p className="label text-lime">Exhibit</p>
              <p className="mt-1 font-serif text-3xl">{selExhibit.name}</p>
              <p className="mt-1 font-mono text-xs text-sage">{selExhibit.field}</p>
              <button type="button" onClick={() => scrollToExhibit(selExhibit.id)} className="link-u mt-3 inline-flex items-center gap-1 font-mono text-xs">
                Go to exhibit <ArrowRight size={12} aria-hidden />
              </button>
            </div>
            <ul className="flex flex-wrap content-start gap-2 md:col-span-8" aria-label="Concepts in this exhibit">
              {selExhibit.concepts.map((c) => (
                <li key={c}>
                  <button type="button" onClick={() => pickConcept(c)} className="border border-sage/60 px-2.5 py-1 font-mono text-xs hover:border-lime hover:text-lime">
                    {mapConcepts.find((m) => m.id === c)!.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
        {sel && (
          <button type="button" onClick={() => setSel(null)} className="mt-4 inline-flex items-center gap-1 font-mono text-[11px] text-ivory/60 hover:text-ivory">
            <X size={12} aria-hidden /> clear selection
          </button>
        )}
      </div>
    </div>
  );
}
