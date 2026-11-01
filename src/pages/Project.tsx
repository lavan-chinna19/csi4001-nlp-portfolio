import type { ReactNode } from 'react';
import { ArrowUpRight, AlertTriangle, Presentation, ChevronDown, ArrowRight } from 'lucide-react';
import Page from '../components/Page';
import SectionToc from '../components/SectionToc';
import NextChapter from '../components/NextChapter';
import { EditableText, Reveal, hasText } from '../components/Bits';
import { ArchitectureDiagram, PipelineDiagram } from '../components/Pipeline';
import { ImageSlotView, PresentationGallery } from '../components/PresentationGallery';
import { project } from '../content/project';

const TOC = [
  { id: 'title', label: 'Title' },
  { id: 'motivation', label: 'Motivation' },
  { id: 'gap', label: 'Existing gap' },
  { id: 'architecture', label: 'Architecture' },
  { id: 'stack', label: 'Tech stack' },
  { id: 'datasets', label: 'Datasets' },
  { id: 'prompts', label: 'Build prompts' },
  { id: 'pipeline', label: 'NLP pipeline' },
  { id: 'users', label: 'Users, inputs & outputs' },
  { id: 'references', label: 'References' },
];

function Section({ id, num, title, kicker, children }: { id: string; num: string; title: string; kicker?: string; children: ReactNode }) {
  return (
    <section id={id} tabIndex={-1} aria-labelledby={`${id}-h`} className="scroll-mt-32 border-t border-ivory/10 py-14 outline-none md:py-20">
      <Reveal>
        <div className="mb-10 grid gap-3 md:grid-cols-12 md:items-end">
          <p className="font-serif text-6xl leading-none text-lime/90 md:col-span-2 md:text-7xl" aria-hidden>{num}</p>
          <div className="md:col-span-10">
            {kicker && <p className="label mb-2 text-sage">{kicker}</p>}
            <h2 id={`${id}-h`} className="font-serif text-4xl leading-[0.95] md:text-5xl">
              <span className="sr-only">{num}. </span>{title}
            </h2>
          </div>
        </div>
        {children}
      </Reveal>
    </section>
  );
}

function Sub({ n, title, children, className = '' }: { n: string; title: string; children: ReactNode; className?: string }) {
  return (
    <div className={`mt-12 first:mt-0 ${className}`}>
      <h3 className="mb-5 flex items-baseline gap-3 border-b border-ivory/10 pb-2">
        <span className="font-mono text-[11px] text-lime">{n}</span>
        <span className="font-serif text-2xl md:text-3xl">{title}</span>
      </h3>
      {children}
    </div>
  );
}

/** Expandable details block with a styled summary. */
function Expand({ title, meta, children, defaultOpen = false }: { title: string; meta?: string; children: ReactNode; defaultOpen?: boolean }) {
  return (
    <details open={defaultOpen} className="group border-b border-ivory/10 [&_summary::-webkit-details-marker]:hidden">
      <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-4 text-left">
        <span className="flex flex-wrap items-baseline gap-x-3">
          <span className="font-serif text-2xl leading-tight">{title}</span>
          {meta && <span className="font-mono text-[11px] text-ink-mute">{meta}</span>}
        </span>
        <ChevronDown size={18} aria-hidden className="shrink-0 text-sage transition-transform group-open:rotate-180" />
      </summary>
      <div className="pb-6">{children}</div>
    </details>
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
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a
                href={p.presentation.url}
                target="_blank"
                rel="noopener noreferrer"
                data-testid="presentation-button"
                aria-label="View project presentation (Google Slides, opens in a new tab)"
                className="group inline-flex items-center gap-3 bg-lime px-6 py-4 font-mono text-xs font-semibold uppercase tracking-[0.2em] text-ink shadow-[0_0_0_1px_rgba(212,255,58,0.4)] transition-shadow hover:shadow-[0_0_0_4px_rgba(212,255,58,0.25)]"
              >
                <Presentation size={18} aria-hidden />
                {p.presentation.label}
                <ArrowUpRight size={16} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden />
              </a>
              <a href={p.repo} target="_blank" rel="noopener noreferrer" className="group inline-flex items-center gap-2 border border-ivory/30 px-5 py-4 font-mono text-xs uppercase tracking-[0.18em] text-ivory transition-colors hover:border-lime hover:text-lime">
                View repository <ArrowUpRight size={14} aria-hidden />
              </a>
            </div>
            <p className="mt-5 inline-flex items-center gap-2 border border-ivory/25 px-3 py-2 text-sm text-ivory/80">
              <AlertTriangle size={14} className="text-lime" aria-hidden /> {p.disclaimer}
            </p>
          </div>
          <aside className="col-span-12 lg:col-span-4" aria-label="Case summary">
            <dl className="divide-y divide-ivory/10 border-y border-ivory/10 font-mono text-xs">
              <div className="flex justify-between gap-4 py-3"><dt className="text-ink-mute">STATUS</dt><dd className="text-right text-lime" data-testid="project-status">{p.statusLabel}</dd></div>
              <div className="flex justify-between gap-4 py-3"><dt className="text-ink-mute">COURSE</dt><dd className="text-right">CSI4001 · team project</dd></div>
              <div className="flex justify-between gap-4 py-3">
                <dt className="text-ink-mute">TEAM</dt>
                <dd className="text-right">
                  {p.team.map((t, i) => (
                    <span key={t.handle}>
                      <a className="link-u" href={t.href} target="_blank" rel="noopener noreferrer">{t.handle}</a>
                      {i < p.team.length - 1 && ' · '}
                    </span>
                  ))}
                </dd>
              </div>
              <div className="flex justify-between gap-4 py-3"><dt className="text-ink-mute">RUNS ON</dt><dd className="text-right">Local CPU</dd></div>
              <div className="flex justify-between gap-4 py-3"><dt className="text-ink-mute">ENCODER</dt><dd className="text-right">legal-bert-base-uncased</dd></div>
              <div className="flex justify-between gap-4 py-3"><dt className="text-ink-mute">RELEASE</dt><dd className="text-right">{p.releaseLabel}</dd></div>
            </dl>
            <img src={p.image} alt="LexAudit project social card" width={1200} height={600} loading="lazy" className="mt-6 w-full border border-ivory/10 opacity-90" />
          </aside>
        </div>

        {p.presentation.embedPresentation && (
          <div className="mt-12 aspect-video w-full border border-ivory/15">
            <iframe src={p.presentation.embedUrl} title="LexAudit project presentation" className="h-full w-full" allowFullScreen loading="lazy" />
          </div>
        )}
      </header>

      {/* presentation gallery (unnumbered plate) */}
      <section id="presentation" aria-labelledby="presentation-h" className="page-x scroll-mt-32 pb-16">
        <Reveal>
          <div className="border-t border-ivory/15 pt-8">
            <div className="mb-6 flex flex-wrap items-baseline justify-between gap-3">
              <h2 id="presentation-h" className="font-serif text-3xl md:text-4xl">{p.gallery.title}</h2>
              <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-ink-mute">Plate I · click to enlarge</p>
            </div>
            {hasText(p.gallery.intro) && <p className="mb-6 max-w-2xl text-ivory/80">{p.gallery.intro}</p>}
            <PresentationGallery images={p.gallery.images} />
          </div>
        </Reveal>
      </section>

      <div className="page-x grid grid-cols-12 gap-x-6">
        <aside className="col-span-12 lg:col-span-2">
          <SectionToc items={TOC} dark title="Case file" />
        </aside>
        <div className="col-span-12 min-w-0 lg:col-span-10 lg:pl-8">
          {/* 01 */}
          <Section id="title" num="01" title={p.title} kicker="Title">
            <div className="grid gap-8 md:grid-cols-12">
              <div className={hasText(p.fullDescription) ? 'md:col-span-5' : 'md:col-span-9'}>
                <p className="label mb-3 text-ink-mute">Summary</p>
                <p className="text-lg leading-relaxed text-ivory/85">{p.summary}</p>
                <p className="mt-4 font-mono text-[11px] text-ink-mute">Team project · {p.team.map((t) => t.handle).join(' & ')} · CSI4001</p>
                <dl className="mt-8 divide-y divide-ivory/10 border-y border-ivory/10">
                  {p.glance.map((g) => (
                    <div key={g.k} className="grid gap-1 py-3 sm:grid-cols-[8rem_1fr] sm:gap-4">
                      <dt className="label pt-0.5 text-sage">{g.k}</dt>
                      <dd className="text-sm leading-relaxed text-ivory/85">{g.v}</dd>
                    </div>
                  ))}
                </dl>
              </div>
              {hasText(p.fullDescription) && (
                <div className="md:col-span-7">
                  <p className="label mb-3 text-ink-mute">Full description</p>
                  <EditableText value={p.fullDescription} textClass="text-[17px] leading-relaxed text-ivory/85" />
                </div>
              )}
            </div>
          </Section>

          {/* 02 */}
          <Section id="motivation" num="02" title="Motivation">
            <div className="border-l-2 border-lime pl-6">
              <p className="font-serif text-2xl leading-snug text-ivory md:text-3xl">{p.motivationFacts.statement}</p>
            </div>
            <ul className="mt-8 grid gap-px bg-ivory/10 md:grid-cols-2">
              {p.motivationFacts.points.map((pt) => (
                <li key={pt} className="bg-ink p-5 text-sm leading-relaxed text-ivory/80">{pt}</li>
              ))}
            </ul>
            {hasText(p.motivation) && (
              <div className="mt-10">
                <p className="label mb-3 text-sage">In our words</p>
                <EditableText value={p.motivation} textClass="text-[17px] leading-relaxed text-ivory/85" />
              </div>
            )}
          </Section>

          {/* 03 */}
          <Section id="gap" num="03" title="Existing gap / event that motivated the project">
            <ol className="grid gap-px bg-ivory/10 md:grid-cols-3">
              {p.gapFacts.map((g) => (
                <li key={g.k} className="flex flex-col bg-ink p-6">
                  <p className="font-serif text-4xl italic text-sage">{g.k}.</p>
                  <h3 className="mb-4 mt-2 text-sm font-semibold uppercase tracking-wide">{g.title}</h3>
                  <p className="text-sm leading-relaxed text-ivory/85">{g.text}</p>
                </li>
              ))}
            </ol>
            {(() => {
              const own = [
                { t: 'Existing challenges', v: p.gap.existingChallenges },
                { t: 'Limitations of existing approaches', v: p.gap.limitationsOfExistingApproaches },
                { t: 'Why our approach is needed', v: p.gap.whyOurApproachIsNeeded },
              ].filter((g) => hasText(g.v));
              return own.length ? (
                <dl className="mt-10 divide-y divide-ivory/10 border-y border-ivory/10">
                  {own.map((g) => (
                    <div key={g.t} className="grid gap-2 py-4 md:grid-cols-12">
                      <dt className="label pt-1 text-sage md:col-span-3">{g.t}</dt>
                      <dd className="md:col-span-9"><EditableText value={g.v} textClass="text-[16px] leading-relaxed text-ivory/85" /></dd>
                    </div>
                  ))}
                </dl>
              ) : null;
            })()}
          </Section>

          {/* 04 */}
          <Section id="architecture" num="04" title="Architecture">
            <Sub n="4.1" title="System architecture">
              <ArchitectureDiagram />
              {p.architectureDiagramImage && (
                <div className="mt-6">
                  <ImageSlotView image={p.architectureDiagramImage} />
                </div>
              )}
            </Sub>

            <Sub n="4.2" title="Components">
              <dl className="divide-y divide-ivory/10 border-y border-ivory/10">
                {p.components.map((c) => (
                  <div key={c.name} className="grid gap-2 py-4 md:grid-cols-12">
                    <dt className="md:col-span-3">
                      <p className="font-semibold">{c.name}</p>
                      <p className="mt-1 break-words font-mono text-[10px] text-sage">{c.tag}</p>
                    </dt>
                    <dd className="text-sm leading-relaxed text-ivory/80 md:col-span-9">{c.text}</dd>
                  </div>
                ))}
              </dl>
            </Sub>

            <Sub n="4.3" title="Workflow">
              <ol className="grid gap-2 sm:grid-cols-2 lg:grid-cols-5">
                {p.workflow.map((w, i) => (
                  <li key={w.step} className="relative border border-ivory/15 bg-ink-soft p-4">
                    <p className="flex items-center justify-between font-mono text-[10px] text-ink-mute">
                      <span>STEP {String(i + 1).padStart(2, '0')}</span>
                      {i < p.workflow.length - 1 && <ArrowRight size={12} aria-hidden className="text-lime" />}
                    </p>
                    <p className="mt-2 font-serif text-xl">{w.step}</p>
                    <p className="mt-1 text-xs leading-relaxed text-ivory/70">{w.text}</p>
                  </li>
                ))}
              </ol>
            </Sub>

            <Sub n="4.4" title="Model architecture details">
              <div className="overflow-x-auto">
                <table className="w-full border-collapse text-left text-sm">
                  <thead>
                    <tr className="border-b border-ivory/20 font-mono text-[10px] uppercase tracking-[0.14em] text-ink-mute">
                      <th scope="col" className="py-2 pr-4 font-normal">Part</th>
                      <th scope="col" className="py-2 pr-4 font-normal">Detail</th>
                    </tr>
                  </thead>
                  <tbody>
                    {p.modelDetails.map((m) => (
                      <tr key={m.k} className="border-b border-ivory/10 align-top">
                        <th scope="row" className="break-words py-3 pr-4 font-semibold">{m.k}</th>
                        <td className="py-3 leading-relaxed text-ivory/85 [overflow-wrap:anywhere]">{m.v}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Sub>

            <Sub n="4.5" title="Input-to-output pipeline">
              <p className="flex flex-wrap items-center gap-x-2 gap-y-1 font-mono text-xs text-ivory/80">
                {p.pipeline.map((s, i) => (
                  <span key={s.id} className="inline-flex items-center gap-2">
                    <span className={s.present ? '' : 'text-ink-mute line-through decoration-dotted'}>{s.label}</span>
                    {i < p.pipeline.length - 1 && <ArrowRight size={12} aria-hidden className="text-lime" />}
                  </span>
                ))}
              </p>
              <p className="mt-3 text-sm text-ivory/70">
                Each stage is described in detail in <a href="#pipeline" className="link-u text-sage">§08 NLP pipeline</a>.
              </p>
            </Sub>

            {p.technicalOverviewImage && (
              <Sub n="4.6" title="Technical overview">
                <ImageSlotView image={p.technicalOverviewImage} />
              </Sub>
            )}

            <Sub n={p.technicalOverviewImage ? '4.7' : '4.6'} title="Capabilities, status & verification">
              <p className="mb-2 border-l-2 border-lime pl-4 text-ivory/90" data-testid="project-maturity">{p.projectStatus.line}</p>
              <p className="mb-6 pl-4 text-sm leading-relaxed text-ivory/65">{p.projectStatus.detail}</p>
              <div className="border-t border-ivory/10">
                <Expand title="Capabilities" meta={`${p.features.length} areas`}>
                  <ol className="grid gap-px bg-ivory/10 md:grid-cols-2 xl:grid-cols-3">
                    {p.features.map((f, i) => (
                      <li key={f.title} className="bg-ink p-5">
                        <p className="font-mono text-[11px] text-lime">{String(i + 1).padStart(2, '0')}</p>
                        <p className="mt-2 font-serif text-xl">{f.title}</p>
                        <p className="mt-1 text-sm leading-relaxed text-ivory/75">{f.text}</p>
                      </li>
                    ))}
                  </ol>
                </Expand>
                <Expand title="Software verification" meta="tests passing · not accuracy">
                  <p className="mb-6 max-w-2xl border-l-2 border-lime pl-4 text-ivory/85">{p.verification.note}</p>
                  <div className="grid gap-px bg-ivory/10 sm:grid-cols-2 lg:grid-cols-5">
                    {p.verification.figures.map((f) => (
                      <div key={f.label} className="bg-ink p-5">
                        <p className="font-mono text-4xl font-medium tracking-tight text-lime">{f.value}</p>
                        <p className="mt-3 text-sm font-semibold leading-snug">{f.label}</p>
                        <p className="mt-1 font-mono text-[10px] leading-relaxed text-ink-mute">{f.sub}</p>
                      </div>
                    ))}
                  </div>
                  <p className="mt-5 font-mono text-xs leading-relaxed text-ivory/70">{p.verification.caveat}</p>
                  <div className="mt-8 grid gap-6 md:grid-cols-12">
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
                </Expand>
                <Expand title="Known limitations" meta={`${p.limitations.length} documented`}>
                  <ul className="divide-y divide-ivory/10">
                    {p.limitations.map((l, i) => (
                      <li key={l} className="flex gap-4 py-3">
                        <span className="font-mono text-xs text-lime">L{i + 1}</span>
                        <span className="text-sm text-ivory/85">{l}</span>
                      </li>
                    ))}
                  </ul>
                </Expand>
              </div>
            </Sub>
          </Section>

          {/* 05 */}
          <Section id="stack" num="05" title="Complete tech stack">
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-left">
                <thead>
                  <tr className="border-b border-ivory/20 font-mono text-[10px] uppercase tracking-[0.14em] text-ink-mute">
                    <th scope="col" className="w-[22%] py-2 pr-4 font-normal">Category</th>
                    <th scope="col" className="py-2 pr-4 font-normal">Technologies</th>
                  </tr>
                </thead>
                <tbody>
                  {p.techStack.filter((g) => g.items.length > 0).map((g) => (
                    <tr key={g.category} className="border-b border-ivory/10 align-top">
                      <th scope="row" className="w-[34%] break-words py-4 pr-4 font-mono text-[11px] font-normal uppercase tracking-wider text-sage md:w-auto md:text-xs">{g.category}</th>
                      <td className="py-4 pr-4">
                        <ul className="flex flex-wrap gap-2">
                          {g.items.map((it) => (
                            <li key={it} className="max-w-full break-words border border-ivory/20 px-2 py-0.5 font-mono text-xs">{it}</li>
                          ))}
                        </ul>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <EditableText value={p.techStackNote} className="mt-6" textClass="text-[16px] leading-relaxed text-ivory/85" />
          </Section>

          {/* 06 */}
          <Section id="datasets" num="06" title="Datasets used">
            <div className="border-t border-ivory/10">
              {p.datasets.map((d, i) => (
                <Expand key={d.name} title={d.name} meta={`D${i + 1}`} defaultOpen={i === 0}>
                  <dl className="grid gap-px bg-ivory/10 md:grid-cols-2">
                    {(
                      [
                        ['Original source', d.source],
                        ['Size', d.size],
                        ['Format', d.format],
                        ['Preparation', d.preparation],
                        ['Training / evaluation usage', d.usage],
                        ['Limitations', d.limitations],
                      ] as const
                    )
                      .filter(([, v]) => hasText(v))
                      .map(([k, v]) => (
                        <div key={k} className="bg-ink p-4">
                          <dt className="label mb-2 text-ink-mute">{k}</dt>
                          <dd className="text-sm leading-relaxed text-ivory/85">{v}</dd>
                        </div>
                      ))}
                  </dl>
                </Expand>
              ))}
            </div>
            <p className="mt-4 font-mono text-[11px] text-ink-mute">Raw datasets are downloaded at ingestion time and are not redistributed with the application.</p>
            <EditableText value={p.datasetsNote} className="mt-6" textClass="text-[16px] leading-relaxed text-ivory/85" />
          </Section>

          {/* 07 */}
          <Section id="prompts" num="07" title="Prompts used in building LexAudit">
            <p className="mb-8 max-w-3xl text-ivory/75">{p.promptsIntro}</p>
            {p.prompts.length > 0 && (
              <ol className="divide-y divide-ivory/10 border-y border-ivory/10" data-testid="build-prompts">
                {p.prompts.map((pr, i) => (
                  <li key={pr.title} className="grid gap-4 py-6 md:grid-cols-12 md:gap-6">
                    <div className="md:col-span-4">
                      <p className="font-mono text-[11px] text-lime">P{String(i + 1).padStart(2, '0')}</p>
                      <h3 className="mt-2 font-serif text-2xl leading-tight">{pr.title}</h3>
                    </div>
                    <dl className="grid gap-4 sm:grid-cols-2 md:col-span-8">
                      <div>
                        <dt className="label mb-2 text-ink-mute">What it set out to do</dt>
                        <dd className="text-sm leading-relaxed text-ivory/85">{pr.aim}</dd>
                      </div>
                      <div>
                        <dt className="label mb-2 text-ink-mute">What it helped produce</dt>
                        <dd className="text-sm leading-relaxed text-ivory/85">{pr.outcome}</dd>
                      </div>
                    </dl>
                  </li>
                ))}
              </ol>
            )}
          </Section>

          {/* 08 */}
          <Section id="pipeline" num="08" title="NLP pipeline">
            <p className="mb-8 max-w-3xl text-ivory/75">
              The eight stages below are mapped to what LexAudit actually does. A dashed stage is not a separate step in LexAudit’s own code.
            </p>
            <PipelineDiagram />
          </Section>

          {/* 09 */}
          <Section id="users" num="09" title="Users, inputs and outputs">
            <Sub n="9.1" title="Users">
              <div className="grid gap-8 md:grid-cols-12">
                <ul className="space-y-4 md:col-span-7">
                  {p.users.intended.map((u) => (
                    <li key={u.who} className="border-l border-lime/60 pl-4">
                      <p className="font-semibold">{u.who}</p>
                      <p className="mt-1 text-sm leading-relaxed text-ivory/75">{u.why}</p>
                    </li>
                  ))}
                </ul>
                <div className="md:col-span-5">
                  <p className="label mb-3 text-sage">Out of scope</p>
                  <ul className="space-y-2">
                    {p.users.outOfScope.map((o) => (
                      <li key={o} className="flex gap-2 text-sm text-ivory/80"><span aria-hidden className="text-ink-mute">×</span>{o}</li>
                    ))}
                  </ul>
                </div>
              </div>
              <EditableText value={p.users.note} className="mt-6" textClass="text-[16px] leading-relaxed text-ivory/85" />
            </Sub>

            <Sub n="9.2" title="Inputs">
              <div className="grid gap-8 md:grid-cols-12">
                <div className="md:col-span-5">
                  <p className="label mb-3 text-ink-mute">Accepted formats</p>
                  <ul className="flex flex-wrap gap-2">
                    {p.inputs.formats.map((f) => (
                      <li key={f} className="border border-lime/60 px-2.5 py-1 font-mono text-xs text-lime">{f}</li>
                    ))}
                  </ul>
                  <p className="mt-4 text-sm leading-relaxed text-ivory/70">{p.inputs.notes}</p>
                </div>
                <dl className="grid grid-cols-2 gap-px self-start bg-ivory/10 md:col-span-7">
                  {p.inputs.limits.map((l) => (
                    <div key={l.k} className="min-w-0 bg-ink p-4">
                      <dt className="label text-ink-mute">{l.k}</dt>
                      <dd className="mt-2 break-words font-mono text-xl text-ivory sm:text-2xl">{l.v}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </Sub>

            <Sub n="9.3" title="Outputs">
              <dl className="divide-y divide-ivory/10 border-y border-ivory/10">
                {p.outputs.map((o) => (
                  <div key={o.k} className="grid gap-2 py-3 md:grid-cols-12">
                    <dt className="font-semibold md:col-span-3">{o.k}</dt>
                    <dd className="text-sm leading-relaxed text-ivory/80 md:col-span-9">{o.v}</dd>
                  </div>
                ))}
              </dl>
            </Sub>

            <Sub n="9.4" title="Example input and output">
              <div className="grid gap-6 lg:grid-cols-2">
                <figure className="min-w-0">
                  <figcaption className="mb-2 font-mono text-[10px] text-ink-mute">INPUT · {p.example.inputLabel}</figcaption>
                  <pre className="overflow-x-auto whitespace-pre-wrap border border-ivory/15 bg-ink-soft p-4 font-mono text-xs leading-relaxed text-ivory/85">{p.example.input}</pre>
                </figure>
                <figure className="min-w-0">
                  <figcaption className="mb-2 font-mono text-[10px] text-ink-mute">OUTPUT · {p.example.outputLabel}</figcaption>
                  <dl className="divide-y divide-ivory/10 border border-lime/40 bg-ink-soft">
                    {p.example.output.map((o) => (
                      <div key={o.k} className="grid grid-cols-[6rem_1fr] gap-3 px-4 py-2.5">
                        <dt className="label pt-0.5 text-ink-mute">{o.k}</dt>
                        <dd className={`text-sm ${o.k === 'Result' || o.k === 'Status' ? 'font-mono text-lime' : 'text-ivory/85'}`}>{o.v}</dd>
                      </div>
                    ))}
                  </dl>
                </figure>
              </div>
              <EditableText value={p.example.ownExample} className="mt-6" textClass="text-[16px] leading-relaxed text-ivory/85" />
            </Sub>
          </Section>

          {/* 10 */}
          <Section id="references" num="10" title="References">
            <ol className="space-y-4">
              {p.references.map((r, i) => (
                <li key={r.url} className="grid grid-cols-[2.5rem_1fr] gap-2 text-sm leading-relaxed">
                  <span className="font-mono text-xs text-lime">[{i + 1}]</span>
                  <span className="min-w-0">
                    <span className="text-ivory/85">{r.cite} </span>
                    <a href={r.url} target="_blank" rel="noopener noreferrer" className="link-u break-all font-mono text-xs text-sage">
                      {r.url.replace(/^https?:\/\//, '')} ↗
                    </a>
                    <span className="ml-2 font-mono text-[10px] uppercase tracking-wider text-ink-mute">· {r.usedFor}</span>
                  </span>
                </li>
              ))}
            </ol>
            <p className="mt-8 inline-flex items-center gap-2 border border-ivory/25 px-3 py-2 text-sm text-ivory/80">
              <AlertTriangle size={14} className="text-lime" aria-hidden /> {p.disclaimer}
            </p>
          </Section>
        </div>
      </div>

      <NextChapter to="/learning" num="03" label="My Learning" dark />
    </Page>
  );
}
