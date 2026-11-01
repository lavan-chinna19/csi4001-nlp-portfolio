import type { ReactNode } from 'react';
import { ArrowUpRight, AlertTriangle, Presentation, ChevronDown, ArrowRight } from 'lucide-react';
import Page from '../components/Page';
import SectionToc from '../components/SectionToc';
import NextChapter from '../components/NextChapter';
import { EditableText, Reveal } from '../components/Bits';
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
  { id: 'prompts', label: 'Website prompts' },
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
              <div className="flex justify-between gap-4 py-3"><dt className="text-ink-mute">SOURCE</dt><dd className="text-right">{p.repoCommit}</dd></div>
            </dl>
            <img src={p.image} alt="GitHub social card for the LexAudit repository" width={1200} height={600} loading="lazy" className="mt-6 w-full border border-ivory/10 opacity-90" />
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
            {p.gallery.intro && <p className="mb-6 max-w-2xl text-ivory/80">{p.gallery.intro}</p>}
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
              <div className="md:col-span-5">
                <p className="label mb-3 text-ink-mute">Short summary · from the README</p>
                <p className="text-lg leading-relaxed text-ivory/85">{p.summary}</p>
              </div>
              <div className="md:col-span-7">
                <p className="label mb-3 text-ink-mute">Full description</p>
                <EditableText value={p.fullDescription} hint="Add the full project description here" className="text-ivory/80" textClass="text-[17px] leading-relaxed text-ivory/85" />
              </div>
            </div>
          </Section>

          {/* 02 */}
          <Section id="motivation" num="02" title="Motivation">
            <div className="border-l-2 border-lime pl-6">
              <EditableText value={p.motivation} hint="Add the motivation behind LexAudit here" className="text-ivory/80" textClass="font-serif text-2xl leading-snug text-ivory md:text-3xl" />
            </div>
          </Section>

          {/* 03 */}
          <Section id="gap" num="03" title="Existing gap / event that motivated the project">
            <ol className="grid gap-px bg-ivory/10 md:grid-cols-3">
              {[
                { k: 'a', t: 'Existing challenges', v: p.gap.existingChallenges },
                { k: 'b', t: 'Limitations of existing approaches', v: p.gap.limitationsOfExistingApproaches },
                { k: 'c', t: 'Why our approach is needed', v: p.gap.whyOurApproachIsNeeded },
              ].map((g) => (
                <li key={g.k} className="flex flex-col bg-ink p-6">
                  <p className="font-serif text-4xl italic text-sage">{g.k}.</p>
                  <h3 className="mb-4 mt-2 text-sm font-semibold uppercase tracking-wide">{g.t}</h3>
                  <EditableText value={g.v} hint="Add your text here" className="text-ivory/80" textClass="text-sm leading-relaxed text-ivory/85" />
                </li>
              ))}
            </ol>
          </Section>

          {/* 04 */}
          <Section id="architecture" num="04" title="Architecture">
            <Sub n="4.1" title="System architecture">
              <ArchitectureDiagram />
              <div className="mt-6">
                <ImageSlotView image={p.architectureDiagramImage} label="Add architecture diagram" hint="project.ts → architectureDiagramImage" />
              </div>
            </Sub>

            <Sub n="4.2" title="Components">
              <dl className="divide-y divide-ivory/10 border-y border-ivory/10">
                {p.components.map((c) => (
                  <div key={c.name} className="grid gap-2 py-4 md:grid-cols-12">
                    <dt className="md:col-span-3">
                      <p className="font-semibold">{c.name}</p>
                      <p className="mt-1 break-words font-mono text-[10px] text-sage">{c.path}</p>
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
              <p className="mt-3 font-mono text-[11px] text-ink-mute">From the README’s launch and UI-workflow sections.</p>
            </Sub>

            <Sub n="4.4" title="Model architecture details">
              <div className="overflow-x-auto">
                <table className="w-full border-collapse text-left text-sm">
                  <thead>
                    <tr className="border-b border-ivory/20 font-mono text-[10px] uppercase tracking-[0.14em] text-ink-mute">
                      <th scope="col" className="py-2 pr-4 font-normal">Part</th>
                      <th scope="col" className="py-2 pr-4 font-normal">Detail</th>
                      <th scope="col" className="hidden py-2 font-normal md:table-cell">Source in repo</th>
                    </tr>
                  </thead>
                  <tbody>
                    {p.modelDetails.map((m) => (
                      <tr key={m.k} className="border-b border-ivory/10 align-top">
                        <th scope="row" className="py-3 pr-4 font-semibold">{m.k}</th>
                        <td className="py-3 pr-4 leading-relaxed text-ivory/85">
                          {m.v}
                          <span className="mt-1 block break-all font-mono text-[10px] text-sage md:hidden">{m.src}</span>
                        </td>
                        <td className="hidden py-3 font-mono text-[10px] leading-relaxed text-sage md:table-cell">{m.src}</td>
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
                Each stage is mapped to real repository components in <a href="#pipeline" className="link-u text-sage">§08 NLP pipeline</a>.
              </p>
            </Sub>

            <Sub n="4.6" title="Technical overview">
              <ImageSlotView image={p.technicalOverviewImage} label="Add technical overview image" hint="project.ts → technicalOverviewImage" />
            </Sub>

            <Sub n="4.7" title="Capabilities, status & verification">
              <p className="mb-2 border-l-2 border-lime pl-4 text-ivory/90" data-testid="repo-status">{p.repositoryStatus.line}</p>
              <p className="mb-6 pl-4 text-sm leading-relaxed text-ivory/65">{p.repositoryStatus.detail}</p>
              <div className="border-t border-ivory/10">
                <Expand title="Capabilities" meta={`${p.features.length} areas · README`}>
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
                  <p className="mt-2 font-mono text-[11px] leading-relaxed text-ink-mute">Source: {p.verification.source}.</p>
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
                    <th scope="col" className="hidden w-[22%] py-2 font-normal md:table-cell">Verified in</th>
                  </tr>
                </thead>
                <tbody>
                  {p.techStack.map((g) => (
                    <tr key={g.category} className="border-b border-ivory/10 align-top">
                      <th scope="row" className="w-[34%] py-4 pr-4 font-mono text-[11px] font-normal uppercase tracking-wider text-sage md:w-auto md:text-xs">{g.category}</th>
                      <td className="py-4 pr-4">
                        {g.items.length ? (
                          <ul className="flex flex-wrap gap-2">
                            {g.items.map((it) => (
                              <li key={it} className="max-w-full break-words border border-ivory/20 px-2 py-0.5 font-mono text-xs">{it}</li>
                            ))}
                          </ul>
                        ) : (
                          <EditableText value="" hint="Add technologies" />
                        )}
                        <span className="mt-2 block font-mono text-[10px] text-ink-mute md:hidden">{g.source}</span>
                      </td>
                      <td className="hidden py-4 font-mono text-[10px] leading-relaxed text-ink-mute md:table-cell">{g.source}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="mt-6">
              <EditableText value={p.techStackNote} hint="Optional: add a note on the stack in your own words" />
            </div>
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
                    ).map(([k, v]) => (
                      <div key={k} className="bg-ink p-4">
                        <dt className="label mb-2 text-ink-mute">{k}</dt>
                        <dd>
                          <EditableText value={v} hint="Add detail" textClass="text-sm leading-relaxed text-ivory/85" />
                        </dd>
                      </div>
                    ))}
                  </dl>
                </Expand>
              ))}
            </div>
            <p className="mt-4 font-mono text-[11px] text-ink-mute">From docs/data_governance.md, docs/system_card.md, docs/THIRD_PARTY_NOTICES.md and the ingestion scripts. Raw datasets are not stored in the repository.</p>
            <div className="mt-6">
              <EditableText value={p.datasetsNote} hint="Optional: add your own notes on the data" />
            </div>
          </Section>

          {/* 07 */}
          <Section id="prompts" num="07" title="Prompts used for construction of the website">
            <p className="mb-8 max-w-3xl border border-dashed border-sage/50 p-4 text-sm leading-relaxed text-ivory/80">
              <span className="label mr-2 text-sage">Note</span>
              {p.promptsNote}
            </p>
            <ol className="space-y-10">
              {p.prompts.map((pr, i) => (
                <li key={pr.title} className="grid gap-6 md:grid-cols-12">
                  <div className="md:col-span-4">
                    <p className="font-mono text-[11px] text-lime">P{i + 1} · {pr.version}</p>
                    <h3 className="mt-2 break-words font-mono text-sm font-semibold uppercase leading-snug tracking-wide">{pr.title}</h3>
                    <p className="mt-3 text-sm text-ivory/75">{pr.summary}</p>
                  </div>
                  <dl className="divide-y divide-ivory/10 border-y border-ivory/10 md:col-span-8">
                    {(
                      [
                        ['Purpose', pr.purpose, ''],
                        ['Actual prompt', pr.actualPrompt, 'Paste the full prompt text here'],
                        ['Tool used', pr.tool, ''],
                        ['What it generated', pr.generated, ''],
                        ['Changes made after generation', pr.changesAfter, 'Add the changes you made here'],
                      ] as const
                    ).map(([k, v, hint]) => (
                      <div key={k} className="grid gap-2 py-3 sm:grid-cols-[11rem_1fr]">
                        <dt className="label pt-0.5 text-ink-mute">{k}</dt>
                        <dd>
                          <EditableText value={v} hint={hint || 'Add detail'} textClass={`text-sm leading-relaxed text-ivory/85 ${k === 'Actual prompt' ? 'whitespace-pre-wrap font-mono text-xs' : ''}`} />
                        </dd>
                      </div>
                    ))}
                  </dl>
                </li>
              ))}
            </ol>
          </Section>

          {/* 08 */}
          <Section id="pipeline" num="08" title="NLP pipeline">
            <p className="mb-8 max-w-3xl text-ivory/75">
              The eight stages below are mapped to what the repository actually does. A dashed stage is not a separate step in LexAudit’s own code.
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
                  <p className="label mb-3 text-sage">Out of scope · system card</p>
                  <ul className="space-y-2">
                    {p.users.outOfScope.map((o) => (
                      <li key={o} className="flex gap-2 text-sm text-ivory/80"><span aria-hidden className="text-ink-mute">×</span>{o}</li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="mt-6">
                <EditableText value={p.users.note} hint="Optional: who you think would benefit" />
              </div>
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
                    <div key={l.k} className="bg-ink p-4">
                      <dt className="label text-ink-mute">{l.k}</dt>
                      <dd className="mt-2 font-mono text-2xl text-ivory">{l.v}</dd>
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
              <div className="mt-6">
                <EditableText value={p.example.ownExample} hint="Optional: add an example from your own run" />
              </div>
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
