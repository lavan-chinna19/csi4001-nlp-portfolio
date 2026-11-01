import { useEffect, useMemo, useState } from 'react';
import Page from '../components/Page';
import NextChapter from '../components/NextChapter';
import { Reveal } from '../components/Bits';
import { PresentationGallery } from '../components/PresentationGallery';
import { CategoryChip, RecognitionEntryCard, RecognitionOverview } from '../components/Recognition';
import {
  contributionsPage as cp,
  recognitionCategories,
  recognitionEntries,
  type RecognitionCategory,
} from '../content/contributions';
import { allDated, collectEvidence, countByCategory, entryLabel, numberEntries, sameSession, summarize, timelineOrder } from '../lib/recognition';

const CATEGORY_KEYS = Object.keys(recognitionCategories) as RecognitionCategory[];

export default function Contributions() {
  const entries = useMemo(() => numberEntries(recognitionEntries), []);
  const summary = useMemo(() => summarize(entries), [entries]);
  const sorted = useMemo(() => timelineOrder(entries), [entries]);
  const counts = useMemo(() => countByCategory(entries), [entries]);
  const evidence = useMemo(
    () => collectEvidence(entries).map((ev) => ({ ...ev, href: `#entry-${ev.entryId}`, linkLabel: entryLabel(ev.entryNo) })),
    [entries]
  );
  const [filter, setFilter] = useState<RecognitionCategory | 'all'>('all');

  // In-page links to an entry (#entry-<id>) clear the filter so the entry is visible, then scroll to it.
  useEffect(() => {
    const go = () => {
      const h = window.location.hash;
      if (!h.startsWith('#entry-')) return;
      setFilter('all');
      window.setTimeout(() => document.getElementById(h.slice(1))?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 60);
    };
    window.addEventListener('hashchange', go);
    go();
    return () => window.removeEventListener('hashchange', go);
  }, []);

  const present = CATEGORY_KEYS.filter((k) => counts[k]);
  const visible = filter === 'all' ? sorted : sorted.filter((e) => e.category === filter);
  const empty = entries.length === 0;

  return (
    <Page>
      {/* A · hero + recognition overview (charcoal) */}
      <header className="page-x pb-14 pt-12 lg:pt-20">
        <p className="label text-sage">05 — Classroom Contributions · Journal</p>
        <div className="mt-6 grid grid-cols-12 gap-x-6 gap-y-8">
          <div className="col-span-12 lg:col-span-8">
            <h1 className="font-serif uppercase leading-[0.88] tracking-tight" style={{ fontSize: 'clamp(3rem, 8vw, 7.4rem)' }}>
              Beyond the <span className="italic normal-case text-sage">Classroom</span>
            </h1>
            <p className="mt-5 font-serif text-2xl italic leading-snug text-lime md:text-3xl">{cp.subtitle}</p>
          </div>
          <p className="col-span-12 self-end text-ivory/80 lg:col-span-4">{cp.purpose}</p>
        </div>
        <section aria-labelledby="overview-h" className="mt-12">
          <h2 id="overview-h" className="label mb-3 text-ink-mute">Recognition overview</h2>
          <RecognitionOverview summary={summary} />
        </section>
      </header>

      {/* journal surface (ivory, lined) */}
      <div
        className="theme-ivory bg-ivory text-ink"
        style={{ backgroundImage: 'repeating-linear-gradient(0deg, transparent 0 31px, rgba(79,92,65,.08) 31px 32px)' }}
      >
        <div className="page-x py-14 lg:py-20">
          {empty ? (
            <Reveal>
              <div className="mx-auto max-w-2xl text-center" data-testid="contributions-empty">
                <span aria-hidden className="mx-auto mb-6 block h-px w-16 bg-sage-dark" />
                <p className="font-serif text-3xl italic leading-snug md:text-4xl">{cp.emptyMessage}</p>
                <span aria-hidden className="mx-auto mt-6 block h-px w-16 bg-sage-dark" />
              </div>
              <div className="mx-auto mt-14 max-w-3xl">
                <p className="label mb-4 text-center text-sage-deep">What gets recorded</p>
                <ul className="grid gap-x-8 gap-y-3 sm:grid-cols-2">
                  {CATEGORY_KEYS.map((k) => (
                    <li key={k} className="border-t border-ink/10 pt-3">
                      <p className="text-sm font-semibold">{recognitionCategories[k].label}</p>
                      <p className="mt-0.5 text-sm text-ink/65">{recognitionCategories[k].description}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ) : (
            <div className="grid grid-cols-12 gap-x-6 gap-y-10">
              {/* C · categories (filter) */}
              <section aria-labelledby="categories-h" className="col-span-12 lg:col-span-3">
                <h2 id="categories-h" className="font-serif text-3xl leading-none">Contribution categories</h2>
                <div className="mt-5 flex flex-wrap gap-2 lg:flex-col lg:items-start" role="group" aria-label="Filter the timeline by category">
                  <CategoryChip category="all" count={entries.length} active={filter === 'all'} onClick={() => setFilter('all')} />
                  {present.map((k) => (
                    <CategoryChip key={k} category={k} count={counts[k]} active={filter === k} onClick={() => setFilter(k)} />
                  ))}
                </div>
              </section>

              {/* B · timeline */}
              <section aria-labelledby="timeline-h" className="col-span-12 min-w-0 lg:col-span-9">
                <div className="mb-8 flex flex-wrap items-baseline justify-between gap-3 border-b-2 border-ink pb-3">
                  <h2 id="timeline-h" className="font-serif text-4xl leading-none md:text-5xl">Recognition timeline</h2>
                  <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-ink/60">{allDated(entries) ? 'Oldest first' : 'In entry order'}</p>
                </div>
                <div aria-live="polite">
                  {visible.map((e) => (
                    <RecognitionEntryCard key={e.id} entry={e} sessionWith={sameSession(e, entries)} />
                  ))}
                </div>
              </section>
            </div>
          )}
        </div>
      </div>

      {/* D · evidence gallery (only when there is evidence) */}
      {evidence.length > 0 && (
        <section aria-labelledby="evidence-h" className="page-x py-14 lg:py-20">
          <div className="mb-6 flex flex-wrap items-baseline justify-between gap-3 border-t border-ivory/15 pt-8">
            <h2 id="evidence-h" className="font-serif text-3xl md:text-4xl">Evidence gallery</h2>
            <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-ink-mute">Handwritten notebook recognitions · click to enlarge</p>
          </div>
          <PresentationGallery images={evidence} cols={1} className="max-w-5xl" />
        </section>
      )}

      <NextChapter to="/" num="00" label="Back to the cover" kicker="Close the portfolio" dark />
    </Page>
  );
}
