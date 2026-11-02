import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowDownRight, ArrowRight, Plus } from 'lucide-react';
import Page from '../components/Page';
import NextChapter from '../components/NextChapter';
import { Reveal } from '../components/Bits';
import { PresentationGallery } from '../components/PresentationGallery';
import { classProjects, type ClassProject } from '../content/exhibits';

const mine = classProjects.filter((p) => p.mine);
const classmates = classProjects.filter((p) => !p.mine);
const CLASSMATE_LABEL = 'Classmate project · CSI4001';

function go(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  el.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' });
  el.focus({ preventScroll: true });
}

/** Small numbered section label: "01  Project overview". */
function SectionLabel({ n, children, className = '' }: { n: string; children: string; className?: string }) {
  return (
    <p className={`label flex items-baseline gap-3 text-ink-mute ${className}`}>
      <span className="text-sage">{n}</span>
      <span aria-hidden className="h-px w-6 translate-y-[-3px] bg-ivory/20" />
      <span>{children}</span>
    </p>
  );
}

/**
 * Restrained project header: small mono label, serif title, muted category.
 * When a presentation cover slide exists it shows as a modest thumbnail
 * under the header (opens larger in the gallery lightbox).
 */
function ProjectHeader({ p, headingId, featured = false }: { p: ClassProject; headingId: string; featured?: boolean }) {
  return (
    <div data-project-header>
      <p className={`font-mono text-[11px] uppercase tracking-[0.18em] ${featured ? 'text-lime/90' : 'text-sage'}`}>
        {featured ? 'My project · CSI4001' : `${p.num} · ${CLASSMATE_LABEL}`}
      </p>
      <h3
        id={headingId}
        className="mt-3 break-words font-serif leading-[1.08] text-ivory"
        style={{ fontSize: featured ? 'clamp(2.25rem, 4vw, 3.25rem)' : 'clamp(1.75rem, 3vw, 2.5rem)' }}
      >
        {p.title}
      </h3>
      <p className="mt-3 font-mono text-[11px] uppercase leading-relaxed tracking-[0.12em] text-ivory/55">{p.category}</p>
      {p.coverImage && (
        <div className="mt-6 w-full max-w-sm">
          <PresentationGallery cols={1} images={[{ ...p.coverImage, caption: `${p.title} — presentation cover` }]} />
        </div>
      )}
    </div>
  );
}

function Points({ p }: { p: ClassProject }) {
  return (
    <ol className="mt-5 divide-y divide-ivory/10 border-y border-ivory/10" data-points>
      {p.points.map((pt, i) => (
        <li key={i} className="grid grid-cols-[2.25rem_1fr] gap-3 py-4">
          <span className="pt-0.5 font-mono text-[11px] text-sage">{String(i + 1).padStart(2, '0')}</span>
          <span className="text-[15px] leading-relaxed text-ivory/85">{pt}</span>
        </li>
      ))}
    </ol>
  );
}

function Attention({ p }: { p: ClassProject }) {
  return (
    <blockquote className="mt-5 border-l border-sage/50 pl-5">
      <p className="font-serif text-[1.45rem] italic leading-snug text-ivory/90 md:text-[1.65rem]">{p.reflection}</p>
    </blockquote>
  );
}

function Lesson({ p }: { p: ClassProject }) {
  return (
    <aside data-lesson-panel aria-label={`One NLP lesson: ${p.lesson.title}`} className="relative overflow-hidden border border-sage/40 bg-sage/[0.08] p-6 sm:p-8 md:p-10">
      <span aria-hidden className="absolute left-0 top-0 h-full w-1 bg-lime" />
      <div className="grid gap-6 md:grid-cols-12">
        <div className="md:col-span-5">
          <p className="label flex items-center gap-2 text-lime">
            <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-lime" />
            04 · One NLP lesson
          </p>
          <p className="mt-4 break-words font-serif uppercase leading-[1.02] text-ivory" style={{ fontSize: 'clamp(1.6rem, 2.6vw, 2.35rem)' }}>
            {p.lesson.title}
          </p>
        </div>
        <p className="text-base leading-relaxed text-ivory/85 md:col-span-7 md:pt-8 md:text-[17px]">{p.lesson.text}</p>
      </div>
    </aside>
  );
}

function Takeaway({ p }: { p: ClassProject }) {
  return (
    <div className="grid gap-4 border-t border-ivory/10 pt-8 md:grid-cols-12">
      <SectionLabel n="05" className="md:col-span-4">My takeaway</SectionLabel>
      <p className="font-serif text-2xl leading-snug text-ivory md:col-span-8 md:text-[1.9rem]">{p.takeaway}</p>
    </div>
  );
}

/** Sections 02–05, shared by the featured block and the collection. */
function Details({ p }: { p: ClassProject }) {
  return (
    <div className="space-y-12">
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-x-10">
        <div className="lg:col-span-7">
          <SectionLabel n="02">What makes it interesting</SectionLabel>
          <Points p={p} />
        </div>
        <div className="lg:col-span-5">
          <SectionLabel n="03">What caught my attention</SectionLabel>
          <Attention p={p} />
        </div>
      </div>
      <Lesson p={p} />
      <Takeaway p={p} />
    </div>
  );
}

/* ───────────────────────── Featured: LexAudit ───────────────────────── */

function Featured({ p }: { p: ClassProject }) {
  const hid = `h-${p.id}`;
  return (
    <section id={`p-${p.id}`} tabIndex={-1} aria-labelledby={hid} data-project={p.id} className="scroll-mt-28 outline-none">
      <Reveal>
        <div className="border border-ivory/15 bg-ink-soft/40">
          <div className="grid gap-8 p-5 sm:p-8 lg:grid-cols-12 lg:gap-x-12 lg:p-10">
            <div className="lg:col-span-5">
              <ProjectHeader p={p} headingId={hid} featured />
            </div>
            <div className="flex flex-col gap-8 lg:col-span-7">
              <div>
                <SectionLabel n="01">Project overview</SectionLabel>
                <p className="mt-5 font-serif text-[1.7rem] leading-snug md:text-[2.1rem]">{p.overview}</p>
              </div>
              <Link
                to="/project"
                className="group inline-flex w-fit items-center gap-3 border border-lime/50 px-5 py-3 font-mono text-xs uppercase tracking-[0.14em] text-lime transition-colors hover:bg-lime hover:text-ink"
              >
                Read the full LexAudit case file
                <ArrowRight size={14} aria-hidden className="transition-transform group-hover:translate-x-1 motion-reduce:transition-none" />
              </Link>
            </div>
          </div>
          <div className="border-t border-ivory/10 p-5 sm:p-8 lg:p-12">
            <Details p={p} />
          </div>
        </div>
      </Reveal>
    </section>
  );
}

/* ───────────────────────── Collection: classmates ───────────────────────── */

function CollectionItem({ p }: { p: ClassProject }) {
  const [open, setOpen] = useState(false);
  const reduce = useReducedMotion();
  const hid = `h-${p.id}`;
  const did = `d-${p.id}`;
  return (
    <article id={`p-${p.id}`} tabIndex={-1} aria-labelledby={hid} data-project={p.id} className="scroll-mt-28 border-t border-ivory/10 py-10 outline-none md:py-14">
      <Reveal>
        <div className="grid grid-cols-12 gap-x-6 gap-y-8 lg:gap-x-12">
          <div className="col-span-12 lg:col-span-5">
            <ProjectHeader p={p} headingId={hid} />
            <p className="mt-4 font-mono text-[11px] uppercase tracking-[0.12em] text-ivory/45">Not my project · explored and appreciated</p>
          </div>
          <div className="col-span-12 flex flex-col lg:col-span-7">
            <div>
              <SectionLabel n="01">Project overview</SectionLabel>
              <p className="mt-4 text-lg leading-relaxed text-ivory/85 md:text-xl">{p.overview}</p>
            </div>
            <p className="mt-8 flex flex-wrap items-baseline gap-x-3 gap-y-1 border-l border-lime/60 pl-4">
              <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-mute">Lesson</span>
              <span className="font-mono text-xs uppercase tracking-[0.08em] text-lime/90">{p.lesson.title}</span>
            </p>
            <div className="mt-auto pt-8">
              <button
                type="button"
                aria-expanded={open}
                aria-controls={did}
                onClick={() => setOpen((o) => !o)}
                className="group inline-flex items-center gap-3 border-b border-ivory/30 pb-1 font-mono text-xs uppercase tracking-[0.14em] text-ivory transition-colors hover:border-lime hover:text-lime focus-visible:border-lime"
              >
                <span aria-hidden className="inline-flex h-7 w-7 items-center justify-center border border-current">
                  <Plus size={14} className={`transition-transform duration-300 motion-reduce:transition-none ${open ? 'rotate-45' : ''}`} />
                </span>
                {open ? 'Hide details' : 'Show details'}
                <span className="sr-only"> for {p.title}</span>
              </button>
            </div>
          </div>
        </div>
      </Reveal>
      <div id={did} role="region" aria-labelledby={hid} hidden={!open} className="mt-10">
        <motion.div
          key={open ? 'open' : 'closed'}
          initial={open && !reduce ? { opacity: 0, y: 12 } : false}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        >
          <Details p={p} />
        </motion.div>
      </div>
    </article>
  );
}

/* ───────────────────────── Page ───────────────────────── */

export default function Exhibits() {
  return (
    <Page>
      <header className="page-x pb-16 pt-12 lg:pt-20">
        <p className="label text-lime">04 — Projects That Made Me Think · CSI4001</p>
        <h1 className="mt-6 max-w-[16ch] font-serif uppercase leading-[0.88] tracking-tight" style={{ fontSize: 'clamp(2.8rem, 7.4vw, 7rem)' }}>
          The NLP projects that made me <span className="italic normal-case text-lime">think</span>
        </h1>
        <div className="mt-10 grid gap-8 md:grid-cols-12">
          <p className="text-lg leading-relaxed text-ivory/80 md:col-span-7">
            Six projects from my own CSI4001 NLP class. The first is LexAudit, the project I worked on. The other five were presented by my classmates —
            projects I explored and appreciated, not ones I built. Each one left me with a single NLP lesson.
          </p>
          <dl className="grid grid-cols-2 gap-4 self-end border-t border-ivory/15 pt-4 font-mono text-[11px] uppercase tracking-[0.14em] md:col-span-4 md:col-start-9">
            <div>
              <dt className="text-ink-mute">01</dt>
              <dd className="mt-1 text-lime">My project</dd>
            </div>
            <div>
              <dt className="text-ink-mute">02 – 06</dt>
              <dd className="mt-1 text-sage">Classmates’ projects</dd>
            </div>
          </dl>
        </div>

        <nav aria-label="Projects on this page" className="mt-16">
          <ol className="border-b border-ivory/10">
            {classProjects.map((p) => (
              <li key={p.id} className="border-t border-ivory/10">
                <a
                  href={`#p-${p.id}`}
                  onClick={(e) => { e.preventDefault(); go(`p-${p.id}`); }}
                  className="group grid grid-cols-[2.5rem_1fr_auto] items-baseline gap-x-4 gap-y-1 py-4 transition-colors hover:text-lime md:grid-cols-[3.5rem_minmax(0,1.1fr)_minmax(0,1fr)_auto]"
                >
                  <span className={`font-mono text-xs ${p.mine ? 'text-lime' : 'text-sage'}`}>{p.num}</span>
                  <span className="min-w-0 font-serif text-2xl leading-tight md:text-[1.7rem]">
                    {p.shortTitle}
                    {p.mine && <span className="ml-3 align-middle font-mono text-[10px] uppercase tracking-[0.16em] text-lime">Mine</span>}
                  </span>
                  <span className="col-start-2 min-w-0 font-mono text-[10px] uppercase leading-relaxed tracking-[0.12em] text-ivory/50 md:col-start-auto md:text-[11px]">
                    {p.lesson.title}
                  </span>
                  <ArrowDownRight size={16} aria-hidden className="row-start-1 col-start-3 self-center opacity-40 transition-opacity group-hover:opacity-100 md:col-start-4" />
                </a>
              </li>
            ))}
          </ol>
        </nav>
      </header>

      <div className="page-x">
        {mine.map((p) => (
          <Featured key={p.id} p={p} />
        ))}

        <section aria-labelledby="h-collection" className="mt-24 md:mt-32">
          <Reveal>
            <div className="grid gap-6 pb-6 md:grid-cols-12">
              <div className="md:col-span-6">
                <p className="label text-sage">02 – 06 · From my classmates</p>
                <h2 id="h-collection" className="mt-4 font-serif leading-[0.95]" style={{ fontSize: 'clamp(2.4rem, 5vw, 4.4rem)' }}>
                  Five projects from my CSI4001 class
                </h2>
              </div>
              <p className="self-end text-ivory/75 md:col-span-5 md:col-start-8">
                These projects were built and presented by my classmates. I did not develop them; I am writing about what I noticed in them and what each one taught me.
              </p>
            </div>
          </Reveal>
          {classmates.map((p) => (
            <CollectionItem key={p.id} p={p} />
          ))}
        </section>
      </div>

      <NextChapter to="/contributions" num="05" label="Classroom Contributions" dark />
    </Page>
  );
}
