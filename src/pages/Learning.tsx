import { useMemo } from 'react';
import Page from '../components/Page';
import SectionToc from '../components/SectionToc';
import NextChapter from '../components/NextChapter';
import { Reflection, Reveal } from '../components/Bits';
import Demo from '../demos';
import { syllabus, totalHours, type Concept, type DemoId } from '../content/syllabus';

function jump(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  el.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });
  el.focus({ preventScroll: true });
}

function HoursBar() {
  return (
    <figure>
      <div className="flex h-24 w-full items-end gap-[3px] sm:h-28" role="list" aria-label={`Lecture hours per module, ${totalHours} in total`}>
        {syllabus.map((m) => (
          <a
            key={m.id}
            role="listitem"
            href={`#${m.id}`}
            onClick={(e) => { e.preventDefault(); jump(m.id); }}
            className="group relative flex h-full flex-col justify-end"
            style={{ flex: m.hours }}
            aria-label={`Module ${m.number}, ${m.title}: ${m.hours} hours`}
          >
            <span className="mb-1 font-mono text-[10px] text-ivory/70 group-hover:text-lime">{m.hours}h</span>
            <span className="block border-t-2 border-sage bg-sage/25 transition-colors group-hover:border-lime group-hover:bg-lime/30" style={{ height: `${(m.hours / 8) * 70}%` }} />
            <span className="mt-1 font-mono text-[10px] text-ivory/60">M{m.number}</span>
          </a>
        ))}
      </div>
      <figcaption className="mt-3 font-mono text-[11px] text-ivory/60">Width and height ∝ lecture hours · {totalHours} hours across 8 modules · click a module to jump</figcaption>
    </figure>
  );
}

function ConceptBlock({ c, index }: { c: Concept; index: string }) {
  return (
    <article className="border-t border-ink/15 py-10" aria-labelledby={`c-${c.id}`}>
      <div className="grid gap-6 md:grid-cols-12">
        <header className="md:col-span-4">
          <p className="font-mono text-[11px] text-sage-deep">{index}</p>
          <h4 id={`c-${c.id}`} className="mt-1 font-serif text-3xl leading-tight">{c.name}</h4>
        </header>
        <div className="md:col-span-8">
          {/* before → after */}
          <div className="grid gap-4 sm:grid-cols-2">
            <Reflection label="What I knew before" r={c.whatIKnewBefore} className="border-l-2 border-ink/20 pl-4" textClass="text-[15px] leading-relaxed text-ink/80" />
            <Reflection label="What I learned" r={c.whatILearned} className="border-l-2 border-sage-dark pl-4" textClass="text-[15px] leading-relaxed" />
          </div>
          <div className="mt-6 grid gap-6 lg:grid-cols-2">
            <div>
              <p className="label text-sage-deep">In plain words</p>
              <p className="mt-2 font-serif text-xl leading-snug">{c.simple}</p>
            </div>
            <div>
              <p className="label text-sage-deep">Technically</p>
              <p className="mt-2 text-sm leading-relaxed text-ink/85">{c.technical}</p>
            </div>
          </div>
          <dl className="mt-6 grid gap-4 border-y border-ink/10 py-4 text-sm sm:grid-cols-2">
            <div><dt className="label text-sage-deep">Example</dt><dd className="mt-1 text-ink/85">{c.example}</dd></div>
            <div><dt className="label text-sage-deep">Where it is used</dt><dd className="mt-1 text-ink/85">{c.whereUsed}</dd></div>
          </dl>
          <Reflection label="What surprised me" r={c.whatSurprisedMe} className="mt-5" textClass="font-serif text-lg italic text-ink/85" />
        </div>
      </div>
    </article>
  );
}

export default function Learning() {
  const toc = useMemo(() => syllabus.map((m) => ({ id: m.id, label: `${m.number}. ${m.title}` })), []);
  return (
    <Page>
      {/* hero on charcoal */}
      <header className="page-x pb-16 pt-12 lg:pt-20">
        <p className="label text-sage">03 — My Learning · CSI4001 notebook</p>
        <div className="mt-6 grid grid-cols-12 gap-x-6 gap-y-10">
          <h1 className="col-span-12 font-serif uppercase leading-[0.88] tracking-tight lg:col-span-8" style={{ fontSize: 'clamp(2.8rem, 7.4vw, 7rem)' }}>
            How my understanding of <span className="italic normal-case text-sage">language</span> changed
          </h1>
          <div className="col-span-12 self-end lg:col-span-4">
            <p className="text-ivory/80">
              Eight modules, {totalHours} lecture hours. For each idea: what I thought before, what I learned, a plain and a technical explanation — and, where it helps, a small demo that runs in your browser.
            </p>
            <p className="mt-3 font-mono text-[11px] text-ivory/60">Demos marked “toy” are deliberately small implementations, labelled honestly.</p>
          </div>
          <div className="col-span-12"><HoursBar /></div>
        </div>
      </header>

      {/* notebook on ivory */}
      <div className="theme-ivory bg-ivory text-ink" style={{ backgroundImage: 'repeating-linear-gradient(0deg, transparent 0 31px, rgba(79,92,65,.08) 31px 32px)' }}>
        <div className="page-x grid grid-cols-12 gap-x-6 py-12 lg:py-20">
          <aside className="col-span-12 lg:col-span-3">
            <SectionToc items={toc} dark={false} title="Modules" />
          </aside>
          <div className="col-span-12 lg:col-span-9">
            {syllabus.map((m) => {
              const demos = [...new Set(m.concepts.map((c) => c.demo).filter((d): d is DemoId => !!d))];
              return (
                <section key={m.id} id={m.id} tabIndex={-1} className="scroll-mt-32 pb-16 outline-none">
                  <Reveal>
                    <div className="flex flex-wrap items-end justify-between gap-4 border-b-2 border-ink pb-4">
                      <div>
                        <p className="font-mono text-xs text-sage-deep">MODULE {String(m.number).padStart(2, '0')}</p>
                        <h2 className="mt-1 font-serif text-4xl leading-none md:text-6xl">{m.title}</h2>
                      </div>
                      <div className="flex items-center gap-2" aria-label={`${m.hours} lecture hours`}>
                        <span className="flex gap-1" aria-hidden>
                          {Array.from({ length: m.hours }).map((_, i) => (
                            <span key={i} className="h-3 w-3 rounded-full bg-sage-dark" />
                          ))}
                        </span>
                        <span className="font-mono text-xs">{m.hours}h</span>
                      </div>
                    </div>
                  </Reveal>
                  {m.perspective && (
                    <Reflection label="Perspective" r={m.perspective} className="mt-8 max-w-3xl" textClass="font-serif text-2xl leading-snug" />
                  )}
                  {m.concepts.map((c, i) => (
                    <ConceptBlock key={c.id} c={c} index={`${m.number}.${i + 1}`} />
                  ))}
                  {demos.length > 0 && (
                    <div className="mt-2 space-y-6">
                      {demos.map((d) => (
                        <Demo key={d} id={d} />
                      ))}
                    </div>
                  )}
                </section>
              );
            })}
          </div>
        </div>
      </div>

      <NextChapter to="/exhibits" num="04" label="Projects That Made Me Think" dark />
    </Page>
  );
}
