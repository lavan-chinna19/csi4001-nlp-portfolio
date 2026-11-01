import Page from '../components/Page';
import SectionToc from '../components/SectionToc';
import NextChapter from '../components/NextChapter';
import { EditableText, Reveal, hasText } from '../components/Bits';
import InterestConstellation from '../components/InterestConstellation';
import { about, lessons } from '../content/about';
import { site } from '../content/site';

/** href + link attributes for a contact link. Email → mailto (same tab); others → new tab. */
function linkProps(key: keyof typeof site.links, href: string) {
  if (key === 'email') return { href: `mailto:${href}`, 'aria-label': `Email Lavan Kumar at ${href}` };
  return {
    href,
    target: '_blank',
    rel: 'noopener noreferrer',
    'aria-label': `Lavan Kumar on ${site.links[key].label} (opens in a new tab)`,
  };
}

export default function About() {
  const body = about.sections.filter((s) => s.id !== 'introduction');
  const learn = about.howILearn;
  const asp = about.aspirations;
  const learnBlocks = learn.blocks.filter((b) => hasText(b.body));
  const toc = [
    ...body.map((s) => ({ id: s.id, label: s.title })),
    ...(learnBlocks.length ? [{ id: learn.id, label: learn.title }] : []),
    { id: asp.id, label: asp.title },
  ];
  const intro = about.sections[0].body[0];
  const [introFirst, ...introWords] = intro.split(' ');
  const introRest = introWords.join(' ');
  const contactOrder: (keyof typeof site.links)[] = ['linkedin', 'email', 'github'];

  return (
    <Page>
      {/* hero */}
      <section className="page-x grid grid-cols-12 gap-x-6 gap-y-12 pb-16 pt-12 lg:pt-20">
        <div className="col-span-12 lg:col-span-7">
          <p className="label text-sage">01 — About Me · Profile</p>
          <h1 className="mt-6 font-serif uppercase leading-[0.88] tracking-tight" style={{ fontSize: 'clamp(3rem, 8vw, 7.4rem)' }}>
            The person <span className="italic normal-case text-sage">behind</span> the words
          </h1>
          <p className="mt-10 max-w-xl text-lg leading-relaxed text-ivory/80">
            <span className="float-left mr-3 mt-1 font-serif text-6xl leading-[0.8] text-lime">{introFirst}</span>
            {introRest}
          </p>
        </div>

        {/* ivory fact sheet: the page's editorial variation */}
        <div className="col-span-12 lg:col-span-5 lg:pt-10">
          <div className="relative mr-3 mt-3">
          <div aria-hidden className="absolute -right-3 -top-3 h-full w-full border border-sage/50" />
          <dl className="theme-ivory relative bg-ivory p-6 text-ink md:p-8">
            <div className="mb-4 flex items-baseline justify-between">
              <p className="label text-sage-deep">Fact sheet</p>
              <p className="font-mono text-[10px] text-ink/50">{site.registrationNumber}</p>
            </div>
            {about.facts.map((f) => (
              <div key={f.k} className="grid grid-cols-[9.5rem_1fr] gap-3 border-t border-ink/15 py-2.5">
                <dt className="pt-0.5 font-mono text-[10px] uppercase tracking-[0.14em] text-ink/60">{f.k}</dt>
                <dd className="text-sm font-medium">{f.v}</dd>
              </div>
            ))}
            {contactOrder.map((k) => {
              const l = site.links[k];
              if (!l.href) return null;
              return (
                <div key={k} className="grid grid-cols-[9.5rem_1fr] gap-3 border-t border-ink/15 py-2.5">
                  <dt className="pt-0.5 font-mono text-[10px] uppercase tracking-[0.14em] text-ink/60">{l.label}</dt>
                  <dd className="min-w-0 text-sm font-medium">
                    <a {...linkProps(k, l.href)} className="link-u break-all">
                      {k === 'email' ? l.href : l.href.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, '')}
                    </a>
                  </dd>
                </div>
              );
            })}
          </dl>
          </div>
        </div>
      </section>

      <div className="page-x"><div className="border-t border-ivory/15" /></div>

      <div className="page-x grid grid-cols-12 gap-x-6 py-12 lg:py-20">
        <aside className="col-span-12 lg:col-span-3">
          <SectionToc items={toc} dark />
        </aside>
        <div className="col-span-12 min-w-0 lg:col-span-8 lg:col-start-5">
          {body.map((s, i) => (
            <section key={s.id} id={s.id} tabIndex={-1} className="scroll-mt-32 border-b border-ivory/10 py-12 outline-none first:pt-4">
              <Reveal>
                <div className="grid gap-4 md:grid-cols-8">
                  <div className={`md:col-span-3 ${i % 2 ? 'md:order-2 md:col-start-6' : ''}`}>
                    <p className="font-serif text-5xl italic text-sage">{s.kicker}</p>
                    <h2 className="mt-2 font-serif text-3xl leading-tight md:text-4xl">{s.title}</h2>
                  </div>
                  <div className={`md:col-span-5 ${i % 2 ? 'md:order-1 md:col-start-1 md:row-start-1' : ''}`}>
                    {s.body.map((b, k) => (
                      <p key={k} className="mb-3 text-[17px] leading-relaxed text-ivory/85">
                        {b}
                      </p>
                    ))}
                    {'chips' in s && s.chips && (
                      <ul className="mt-4 flex flex-wrap gap-2">
                        {s.chips.map((c, ci) => (
                          <li key={c} className={`border px-2.5 py-1 font-mono text-xs ${ci === 0 && s.id === 'technical-interests' ? 'border-lime text-lime' : 'border-ivory/25'}`}>
                            {c}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              </Reveal>
            </section>
          ))}

          {/* IV. How I learn — five numbered sub-sections, method-list layout */}
          {learnBlocks.length > 0 && (
            <section id={learn.id} tabIndex={-1} className="scroll-mt-32 border-b border-ivory/10 py-12 outline-none">
              <Reveal>
                <p className="font-serif text-5xl italic text-sage">{learn.kicker}</p>
                <h2 className="mt-2 font-serif text-3xl leading-tight md:text-4xl">{learn.title}</h2>
                <ol className="mt-8 border-t border-ivory/15">
                  {learnBlocks.map((b, i) => (
                    <li key={b.id} className="grid gap-3 border-b border-ivory/10 py-6 md:grid-cols-12 md:gap-6">
                      <span className="font-mono text-xs text-lime md:col-span-1 md:pt-1">{String(i + 1).padStart(2, '0')}</span>
                      <h3 className="font-serif text-2xl leading-tight md:col-span-4">{b.title}</h3>
                      <div className="md:col-span-7">
                        <EditableText value={b.body} textClass="text-[16px] leading-relaxed text-ivory/85" />
                      </div>
                    </li>
                  ))}
                </ol>
              </Reveal>
            </section>
          )}

          {/* V. Future aspirations — one paragraph + interest constellation */}
          <section id={asp.id} tabIndex={-1} className="scroll-mt-32 py-12 outline-none">
            <Reveal>
              <div className="grid gap-6 md:grid-cols-8">
                <div className="md:col-span-3">
                  <p className="font-serif text-5xl italic text-sage">{asp.kicker}</p>
                  <h2 className="mt-2 font-serif text-3xl leading-tight md:text-4xl">{asp.title}</h2>
                </div>
                <p className="text-[17px] leading-relaxed text-ivory/85 md:col-span-5 md:pt-3">{asp.intro}</p>
              </div>
              <div className="mt-10">
                <InterestConstellation centre={asp.centre} centreSub={asp.centreSub} areas={asp.areas} />
              </div>
              {hasText(asp.closing) && (
                <p className="mt-8 border-l-2 border-lime pl-4 font-serif text-xl italic leading-snug text-ivory/80">{asp.closing}</p>
              )}
            </Reveal>
          </section>
        </div>
      </div>

      {/* Closing — "Some Lessons Stay With Us." editorial list, muted sage accents */}
      <section id={lessons.id} aria-labelledby="lessons-title" className="page-x scroll-mt-32 pb-20 pt-4 lg:pb-28">
        <div className="border-t border-sage/30 pt-14 lg:pt-20">
          <div className="grid grid-cols-12 gap-x-6 gap-y-6">
            <Reveal className="col-span-12 lg:sticky lg:top-32 lg:col-span-4 lg:self-start">
              <p className="label text-sage">{lessons.eyebrow}</p>
              <h2 id="lessons-title" className="mt-5 font-serif leading-[0.95] tracking-tight text-ivory" style={{ fontSize: 'clamp(2.4rem, 5vw, 4.25rem)' }}>
                {lessons.title}
              </h2>
              <p className="mt-6 max-w-sm font-sans text-[16px] leading-relaxed text-ivory/70">{lessons.subtitle}</p>
            </Reveal>

            <ol className="col-span-12 border-t border-sage/25 lg:col-span-8 lg:mt-2">
              {lessons.items.map((text, i) => {
                const long = text.length > 50;
                const indent = ['', 'md:pl-[16%]', 'md:pl-[6%]', 'md:pl-[22%]', 'md:pl-[10%]'][i];
                return (
                  <li key={i} className="border-b border-sage/20">
                    <Reveal delay={i * 0.06}>
                      <div className={`grid grid-cols-[2.75rem_minmax(0,1fr)] items-baseline gap-x-4 py-8 sm:grid-cols-[3.5rem_minmax(0,1fr)] md:py-10 ${indent}`}>
                        <span className="font-mono text-xs tracking-[0.18em] text-sage">
                          {String(i + 1).padStart(2, '0')}
                        </span>
                        <p
                          className={`font-serif leading-[1.08] text-ivory ${long ? 'max-w-[26ch]' : 'max-w-[22ch]'} ${i % 2 ? 'italic' : ''}`}
                          style={{ fontSize: long ? 'clamp(1.6rem, 3.2vw, 2.6rem)' : 'clamp(1.85rem, 4vw, 3.25rem)' }}
                        >
                          {text}
                        </p>
                      </div>
                    </Reveal>
                  </li>
                );
              })}
            </ol>

            <Reveal className="col-span-12 lg:col-span-8 lg:col-start-5" delay={0.1}>
              <p className="mt-10 flex flex-wrap items-baseline justify-end gap-x-4 gap-y-2 text-right">
                <span aria-hidden className="hidden h-px w-16 self-center bg-sage/50 sm:block" />
                <span className="font-mono text-[12px] tracking-[0.08em] text-sage">{lessons.attributionLead}</span>{' '}
                <span className="font-serif text-2xl italic text-ivory md:text-3xl">{lessons.attributionName}</span>
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      <NextChapter to="/project" num="02" label="My Project" dark />
    </Page>
  );
}
