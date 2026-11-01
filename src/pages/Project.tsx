import type { ReactNode } from 'react';
import { ArrowUpRight, AlertTriangle, Image as ImageIcon } from 'lucide-react';
import Page from '../components/Page';
import SectionToc from '../components/SectionToc';
import NextChapter from '../components/NextChapter';
import { Ph, Reveal } from '../components/Bits';
import { ArchitectureDiagram, PipelineDiagram } from '../components/Pipeline';
import { project } from '../content/project';

const TOC = [
  { id: 'overview', label: 'Overview' },
  { id: 'problem', label: 'Problem & motivation' },
  { id: 'capabilities', label: 'Capabilities' },
  { id: 'pipeline', label: 'Pipeline' },
  { id: 'architecture', label: 'Architecture' },
  { id: 'stack', label: 'Stack' },
  { id: 'data', label: 'Data' },
  { id: 'verification', label: 'Verification' },
  { id: 'contribution', label: 'My contribution' },
  { id: 'challenges', label: 'Challenges' },
  { id: 'limitations', label: 'Limitations' },
  { id: 'screens', label: 'Screenshots' },
  { id: 'future', label: 'Future work' },
];

function Section({ id, num, title, children }: { id: string; num: string; title: string; children: ReactNode }) {
  return (
    <section id={id} tabIndex={-1} className="scroll-mt-32 border-t border-ivory/10 py-14 outline-none md:py-20">
      <Reveal>
        <div className="mb-8 flex items-baseline gap-4">
          <span className="font-mono text-xs text-lime">§{num}</span>
          <h2 className="font-serif text-4xl leading-none md:text-5xl">{title}</h2>
        </div>
        {children}
      </Reveal>
    </section>
  );
}

export default function Project() {
  const p = project;
  return (
    <Page>
      {/* case header */}
      <header className="page-x pb-14 pt-10 lg:pt-16">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-ivory/15 pb-3 font-mono text-[11px] uppercase tracking-[0.16em] text-ivory/60">
          <span>02 — My Project · Case file</span>
          <span>File no. LA-01 · Legal NLP</span>
        </div>
        <div className="mt-10 grid grid-cols-12 gap-x-6 gap-y-10">
          <div className="col-span-12 lg:col-span-8">
            <h1 className="font-serif leading-[0.86] tracking-tight" style={{ fontSize: 'clamp(4rem, 13vw, 11.5rem)' }}>
              {p.name}
            </h1>
            <p className="mt-4 font-mono text-sm text-sage md:text-base">{p.fullName}</p>
            <p className="mt-8 max-w-2xl text-lg leading-relaxed text-ivory/85 md:text-xl">{p.summary}</p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <a href={p.repo} target="_blank" rel="noreferrer" className="group inline-flex items-center gap-3 bg-lime px-5 py-3 font-mono text-xs uppercase tracking-[0.18em] text-ink">
                View repository <ArrowUpRight size={16} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden />
              </a>
              <span className="inline-flex items-center gap-2 border border-ivory/25 px-3 py-2 text-sm text-ivory/80">
                <AlertTriangle size={14} className="text-lime" aria-hidden /> {p.disclaimer}
              </span>
            </div>
          </div>
          <aside className="col-span-12 lg:col-span-4" aria-label="Case summary">
            <dl className="divide-y divide-ivory/10 border-y border-ivory/10 font-mono text-xs">
              <div className="flex justify-between gap-4 py-3"><dt className="text-ink-mute">STATUS</dt><dd className="text-right text-lime">{p.status}</dd></div>
              <div className="flex justify-between gap-4 py-3"><dt className="text-ink-mute">COURSE</dt><dd className="text-right">CSI4001 · team project</dd></div>
              <div className="flex justify-between gap-4 py-3">
                <dt className="text-ink-mute">TEAM</dt>
                <dd className="text-right">
                  {p.team.map((t, i) => (
                    <span key={t.handle}>
                      <a className="link-u" href={t.href} target="_blank" rel="noreferrer">{t.handle}</a>
                      {i < p.team.length - 1 && ' · '}
                    </span>
                  ))}
                </dd>
              </div>
              <div className="flex justify-between gap-4 py-3"><dt className="text-ink-mute">RUNS ON</dt><dd className="text-right">Local CPU</dd></div>
              <div className="flex justify-between gap-4 py-3"><dt className="text-ink-mute">ENCODER</dt><dd className="text-right">legal-bert-base-uncased</dd></div>
            </dl>
            <img src={p.image} alt="GitHub social card for the LexAudit repository" width={1200} height={600} loading="lazy" className="mt-6 w-full border border-ivory/10 opacity-90" />
          </aside>
        </div>
      </header>

      <div className="page-x grid grid-cols-12 gap-x-6">
        <aside className="col-span-12 lg:col-span-2">
          <SectionToc items={TOC} dark title="Case file" />
        </aside>
        <div className="col-span-12 lg:col-span-10 lg:pl-8">
          <Section id="overview" num="01" title="Overview">
            <div className="grid gap-8 md:grid-cols-2">
              <p className="text-lg leading-relaxed text-ivory/85">
                LexAudit treats a contract as a sequence of clauses and asks whether that sequence is coherent: is each clause in a sensible place, do its cross-references point somewhere real, and do its dates agree with each other?
              </p>
              <p className="text-ivory/70">
                Every flag it raises comes with a <em className="text-ivory">severity</em>, an <em className="text-ivory">explanation</em> and a <em className="text-ivory">suggested position</em>. It is built as research decision support — a reviewer stays in charge.
              </p>
            </div>
          </Section>

          <Section id="problem" num="02" title="Problem & motivation">
            <div className="grid gap-6 md:grid-cols-2">
              <div className="border border-dashed border-ivory/25 p-5"><p className="label mb-3 text-ink-mute">Problem statement</p><Ph text={p.placeholders.problem} className="text-ivory/80" /></div>
              <div className="border border-dashed border-ivory/25 p-5"><p className="label mb-3 text-ink-mute">Motivation</p><Ph text={p.placeholders.motivation} className="text-ivory/80" /></div>
            </div>
          </Section>

          <Section id="capabilities" num="03" title="Capabilities">
            <ol className="grid gap-px bg-ivory/10 md:grid-cols-2 xl:grid-cols-3">
              {p.features.map((f, i) => (
                <li key={f.title} className="bg-ink p-6">
                  <p className="font-mono text-[11px] text-lime">{String(i + 1).padStart(2, '0')}</p>
                  <h3 className="mt-3 font-serif text-2xl">{f.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ivory/75">{f.text}</p>
                </li>
              ))}
            </ol>
          </Section>

          <Section id="pipeline" num="04" title="How a contract moves through it">
            <PipelineDiagram />
          </Section>

          <Section id="architecture" num="05" title="System architecture">
            <ArchitectureDiagram />
          </Section>

          <Section id="stack" num="06" title="Stack">
            <dl className="divide-y divide-ivory/10 border-y border-ivory/10">
              {p.stack.map((g) => (
                <div key={g.group} className="grid gap-2 py-4 md:grid-cols-12">
                  <dt className="font-mono text-xs uppercase tracking-wider text-sage md:col-span-3">{g.group}</dt>
                  <dd className="flex flex-wrap gap-2 md:col-span-9">
                    {g.items.map((it) => (
                      <span key={it} className="border border-ivory/20 px-2 py-0.5 font-mono text-xs">{it}</span>
                    ))}
                  </dd>
                </div>
              ))}
            </dl>
          </Section>

          <Section id="data" num="07" title="Data">
            <ul className="divide-y divide-ivory/10 border-y border-ivory/10">
              {p.data.map((d) => (
                <li key={d.name} className="grid gap-2 py-5 md:grid-cols-12">
                  <p className="font-serif text-2xl md:col-span-4">{d.name}</p>
                  <div className="md:col-span-8">
                    <p className="font-mono text-xs text-sage">{d.role}</p>
                    <p className="mt-1 text-sm leading-relaxed text-ivory/80">{d.detail}</p>
                  </div>
                </li>
              ))}
            </ul>
            <div className="mt-6 border border-dashed border-ivory/25 p-5 text-ivory/80"><Ph text={p.dataNote} /></div>
          </Section>

          <Section id="verification" num="08" title="Verification">
            <p className="mb-8 max-w-2xl border-l-2 border-lime pl-4 text-ivory/85">{p.verification.note}</p>
            <div className="grid gap-px bg-ivory/10 sm:grid-cols-2 lg:grid-cols-5">
              {p.verification.figures.map((f) => (
                <div key={f.label} className="bg-ink p-5">
                  <p className="font-mono text-5xl font-medium tracking-tight text-lime">{f.value}</p>
                  <p className="mt-3 text-sm font-semibold leading-snug">{f.label}</p>
                  <p className="mt-1 font-mono text-[11px] text-ink-mute">{f.sub}</p>
                </div>
              ))}
            </div>
            <p className="mt-6 font-mono text-xs leading-relaxed text-ivory/70">
              Release status <span className="text-lime">{p.status}</span>. {p.verification.caveat}
            </p>
            <p className="mt-3 font-mono text-[11px] leading-relaxed text-ink-mute">Source: {p.verification.source}. Update: {p.verification.update}</p>
            <div className="mt-10 grid gap-6 md:grid-cols-12">
              <p className="text-ivory/85 md:col-span-5">{p.validity.statement}</p>
              <div className="md:col-span-7">
                <p className="label mb-3 text-sage">Still outstanding · external validation</p>
                <ol className="space-y-2">
                  {p.validity.blockers.map((b, i) => (
                    <li key={b} className="flex gap-3 border-l border-lime/60 pl-3 text-sm text-ivory/85">
                      <span className="font-mono text-xs text-lime">{i + 1}</span>{b}
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </Section>

          <Section id="contribution" num="09" title="My contribution">
            <p className="mb-4 max-w-2xl text-sm text-ivory/70">The repository’s contributor list records both authors from the original Git history and deliberately does not allocate individual roles.</p>
            <div className="border border-dashed border-ivory/25 p-5 text-ivory/80"><Ph text={p.placeholders.contribution} /></div>
          </Section>

          <Section id="challenges" num="10" title="Challenges & solutions">
            <ol className="space-y-3">
              {p.placeholders.challenges.map((c, i) => (
                <li key={i} className="grid gap-3 border border-dashed border-ivory/25 p-5 md:grid-cols-2">
                  <p><span className="label mr-2 text-ink-mute">Challenge</span><Ph text={c.challenge} /></p>
                  <p><span className="label mr-2 text-ink-mute">Solution</span><Ph text={c.solution} /></p>
                </li>
              ))}
            </ol>
          </Section>

          <Section id="limitations" num="11" title="Known limitations">
            <ul className="divide-y divide-ivory/10 border-y border-ivory/10">
              {p.limitations.map((l, i) => (
                <li key={l} className="flex gap-4 py-4">
                  <span className="font-mono text-xs text-lime">L{i + 1}</span>
                  <span className="text-ivory/85">{l}</span>
                </li>
              ))}
            </ul>
          </Section>

          <Section id="screens" num="12" title="Screenshots">
            <div className="grid gap-4 md:grid-cols-3">
              {p.placeholders.screenshots.map((s) => (
                <div key={s} className="grid aspect-[4/3] place-items-center border border-dashed border-ivory/25 p-4 text-center">
                  <div>
                    <ImageIcon className="mx-auto mb-3 text-ink-mute" size={22} aria-hidden />
                    <Ph text={s} className="text-sm text-ivory/70" />
                  </div>
                </div>
              ))}
            </div>
          </Section>

          <Section id="future" num="13" title="Future improvements">
            <div className="border border-dashed border-ivory/25 p-5 text-ivory/80"><Ph text={p.placeholders.future} /></div>
          </Section>
        </div>
      </div>

      <NextChapter to="/learning" num="03" label="My Learning" dark />
    </Page>
  );
}
