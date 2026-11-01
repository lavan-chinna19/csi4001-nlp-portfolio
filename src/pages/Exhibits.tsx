import { ArrowUpRight } from 'lucide-react';
import Page from '../components/Page';
import ConnectionMap from '../components/ConnectionMap';
import SectionToc from '../components/SectionToc';
import NextChapter from '../components/NextChapter';
import { Reflection, Reveal, DraftTag } from '../components/Bits';
import { exhibits, type Exhibit } from '../content/exhibits';
import { mapConcepts } from '../content/conceptMap';

const NLP_ROWS: { key: keyof Exhibit['nlp']; label: string }[] = [
  { key: 'representation', label: 'How language is represented' },
  { key: 'technique', label: 'Model / technique' },
  { key: 'ambiguity', label: 'Ambiguity & context' },
  { key: 'output', label: 'From language to output' },
  { key: 'problem', label: 'Real-world problem' },
];

function ExhibitArticle({ e, i }: { e: Exhibit; i: number }) {
  const flip = i % 2 === 1;
  return (
    <article id={`ex-${e.id}`} tabIndex={-1} className="scroll-mt-32 border-t border-ivory/10 py-16 outline-none md:py-24" aria-labelledby={`h-${e.id}`}>
      <Reveal>
        <div className="grid grid-cols-12 gap-x-6 gap-y-8">
          <header className={`col-span-12 lg:col-span-5 ${flip ? 'lg:order-2 lg:col-start-8' : ''}`}>
            <p className="font-mono text-xs text-lime">EXHIBIT {String(i + 1).padStart(2, '0')} · {e.field}</p>
            <h3 id={`h-${e.id}`} className="mt-3 font-serif leading-[0.9]" style={{ fontSize: 'clamp(3rem, 6vw, 5.5rem)' }}>{e.name}</h3>
            <a href={e.href} target="_blank" rel="noreferrer" className="mt-4 inline-flex items-center gap-2 border-b border-ivory/30 pb-0.5 font-mono text-xs hover:border-lime hover:text-lime">
              github.com/{e.repo} <ArrowUpRight size={13} aria-hidden />
            </a>
            <img src={e.image} alt={e.imageAlt} width={1200} height={600} loading="lazy" className="mt-6 w-full border border-ivory/10" />
            <ul className="mt-4 flex flex-wrap gap-1.5" aria-label="Concepts">
              {e.concepts.map((c) => (
                <li key={c} className="border border-sage/50 px-2 py-0.5 font-mono text-[11px] text-sage">{mapConcepts.find((m) => m.id === c)!.label}</li>
              ))}
            </ul>
          </header>

          <div className={`col-span-12 lg:col-span-6 ${flip ? 'lg:order-1 lg:col-start-1' : 'lg:col-start-7'}`}>
            <p className="label text-ink-mute">What it does</p>
            <p className="mt-2 font-serif text-2xl leading-snug md:text-[1.7rem]">{e.whatItDoes}</p>
            <p className="label mt-8 text-ink-mute">What makes it different</p>
            <p className="mt-2 leading-relaxed text-ivory/85">{e.whatMakesItDifferent}</p>
            {e.statusNote && <p className="mt-3 border-l border-sage/60 pl-3 font-mono text-[11px] leading-relaxed text-ivory/65">Status: {e.statusNote}</p>}

            <div className="mt-8 grid gap-6 sm:grid-cols-2">
              <Reflection label="What caught my attention" r={e.whatCaughtMyAttention} textClass="text-[15px] leading-relaxed text-ivory/85" />
              <Reflection label="Why I liked it" r={e.whyILikedIt} textClass="text-[15px] leading-relaxed text-ivory/85" />
            </div>
            <Reflection label="What I learned" r={e.whatILearned} className="mt-6" textClass="text-[15px] leading-relaxed text-ivory/85" />

            <details className="group mt-8 border-y border-ivory/15">
              <summary className="flex cursor-pointer list-none items-center justify-between py-3 font-mono text-xs uppercase tracking-[0.14em] text-sage">
                NLP concepts behind it
                <span className="text-lg leading-none transition-transform group-open:rotate-45" aria-hidden>+</span>
              </summary>
              <dl className="space-y-3 pb-5">
                {NLP_ROWS.map((r) => (
                  <div key={r.key} className="grid gap-1 sm:grid-cols-[180px_1fr]">
                    <dt className="font-mono text-[11px] text-ink-mute">{r.label}</dt>
                    <dd className="text-sm text-ivory/85">{e.nlp[r.key]}</dd>
                  </div>
                ))}
              </dl>
            </details>

            <aside className="mt-8 bg-lime p-6 text-ink" aria-label="My takeaway">
              <div className="flex flex-wrap items-center gap-2">
                <p className="font-mono text-[11px] uppercase tracking-[0.16em]">My takeaway</p>
                {e.takeaway.status === 'draft' && <DraftTag />}
              </div>
              <p className="mt-2 font-serif text-2xl leading-snug md:text-3xl">{e.takeaway.text}</p>
            </aside>
          </div>
        </div>
      </Reveal>
    </article>
  );
}

export default function Exhibits() {
  const toc = [{ id: 'map', label: 'Connection map' }, ...exhibits.map((e) => ({ id: `ex-${e.id}`, label: e.name }))];
  return (
    <Page>
      <header className="page-x pb-12 pt-12 lg:pt-20">
        <p className="label text-lime">04 — Projects That Made Me Think · Gallery</p>
        <h1 className="mt-6 max-w-[16ch] font-serif uppercase leading-[0.88] tracking-tight" style={{ fontSize: 'clamp(2.8rem, 7.4vw, 7rem)' }}>
          The NLP projects that made me <span className="italic normal-case text-lime">think</span>
        </h1>
        <p className="mt-8 max-w-2xl text-lg text-ivory/80">
          Nine real, open-source projects — each one a different answer to the question of how to turn language into something a machine can act on. Every project link was checked; images are each project’s own GitHub social card.
        </p>
      </header>

      <div className="page-x grid grid-cols-12 gap-x-6">
        <aside className="col-span-12 lg:col-span-2">
          <SectionToc items={toc} dark title="Gallery" />
        </aside>
        <div className="col-span-12 lg:col-span-10 lg:pl-8">
          <section id="map" tabIndex={-1} className="scroll-mt-32 border-t border-ivory/10 py-14 outline-none">
            <div className="mb-8 grid gap-4 md:grid-cols-12">
              <h2 className="font-serif text-4xl leading-none md:col-span-5 md:text-5xl">The connection map</h2>
              <p className="text-ivory/75 md:col-span-6 md:col-start-7">
                Exhibits on the left, concepts on the right. Select either side to trace the links; concepts point back to the CSI4001 module where I first met them.
              </p>
            </div>
            <ConnectionMap />
          </section>
          {exhibits.map((e, i) => (
            <ExhibitArticle key={e.id} e={e} i={i} />
          ))}
        </div>
      </div>

      <NextChapter to="/contributions" num="05" label="Classroom Contributions" dark />
    </Page>
  );
}
