import { Mail, Code2, ArrowUpRight } from 'lucide-react';
import Page from '../components/Page';
import SectionToc from '../components/SectionToc';
import NextChapter from '../components/NextChapter';
import { EditableText, Ph, Reveal } from '../components/Bits';
import { LinkedinIcon } from '../components/icons';
import { about } from '../content/about';
import { site } from '../content/site';

const LINK_ICONS = { github: Code2, linkedin: LinkedinIcon, email: Mail } as const;

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
  const toc = [
    ...body.map((s) => ({ id: s.id, label: s.title })),
    { id: learn.id, label: learn.title },
    { id: asp.id, label: asp.title },
    { id: 'links', label: 'Elsewhere' },
  ];
  const linkKeys = Object.keys(site.links) as (keyof typeof site.links)[];
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
            <span className="float-left mr-2 mt-1 font-serif text-6xl leading-[0.8] text-lime">L</span>
            {about.sections[0].body[0]}
          </p>
          <ul className="mt-10 flex flex-wrap gap-3" aria-label="Contact">
            {contactOrder.map((k) => {
              const l = site.links[k];
              if (!l.href) return null;
              const Icon = LINK_ICONS[k];
              return (
                <li key={k}>
                  <a
                    {...linkProps(k, l.href)}
                    data-testid={`hero-${k}`}
                    className="group inline-flex items-center gap-2 border border-ivory/25 px-3.5 py-2 font-mono text-xs text-ivory/85 transition-colors hover:border-lime hover:text-lime"
                  >
                    <Icon size={15} aria-hidden />
                    <span>{k === 'email' ? l.href : l.label}</span>
                    {k !== 'email' && <ArrowUpRight size={13} aria-hidden className="opacity-60" />}
                  </a>
                </li>
              );
            })}
          </ul>
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
                        <Ph text={b} />
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
          <section id={learn.id} tabIndex={-1} className="scroll-mt-32 border-b border-ivory/10 py-12 outline-none">
            <Reveal>
              <p className="font-serif text-5xl italic text-sage">{learn.kicker}</p>
              <h2 className="mt-2 font-serif text-3xl leading-tight md:text-4xl">{learn.title}</h2>
              <ol className="mt-8 border-t border-ivory/15">
                {learn.blocks.map((b, i) => (
                  <li key={b.id} className="grid gap-3 border-b border-ivory/10 py-5 md:grid-cols-12 md:gap-6">
                    <span className="font-mono text-xs text-lime md:col-span-1 md:pt-1">{String(i + 1).padStart(2, '0')}</span>
                    <h3 className="text-[15px] font-semibold leading-snug md:col-span-4">{b.title}</h3>
                    <div className="md:col-span-7">
                      <EditableText value={b.body} className="text-ivory/80" textClass="text-[16px] leading-relaxed text-ivory/85" />
                    </div>
                  </li>
                ))}
              </ol>
            </Reveal>
          </section>

          {/* V. Future aspirations — editorial mosaic */}
          <section id={asp.id} tabIndex={-1} className="scroll-mt-32 border-b border-ivory/10 py-12 outline-none">
            <Reveal>
              <div className="grid gap-4 md:grid-cols-8">
                <div className="md:col-span-3 md:col-start-6 md:text-right">
                  <p className="font-serif text-5xl italic text-sage">{asp.kicker}</p>
                  <h2 className="mt-2 font-serif text-3xl leading-tight md:text-4xl">{asp.title}</h2>
                </div>
              </div>
              <div className="mt-10 grid gap-px bg-ivory/10 md:grid-cols-6">
                {asp.fields.map((f, i) => {
                  const layout = [
                    'md:col-span-6 bg-ink p-6 md:p-8',
                    'md:col-span-3 bg-ink p-6',
                    'md:col-span-3 bg-ink p-6',
                    'md:col-span-2 bg-ink p-6',
                    'md:col-span-4 bg-ink-soft p-6 md:p-8',
                  ][i];
                  const big = i === 0 || i === 4;
                  return (
                    <article key={f.id} className={`flex flex-col ${layout}`}>
                      <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-ink-mute">
                        {['i', 'ii', 'iii', 'iv', 'v'][i]} ·{' '}
                        <span className={i === 4 ? 'text-lime' : ''}>{i === 4 ? 'next' : 'aspiration'}</span>
                      </p>
                      <h3 className={`mb-5 mt-3 font-serif leading-tight ${big ? 'text-3xl md:text-4xl' : 'text-2xl'} ${i === 4 ? 'italic' : ''}`}>{f.title}</h3>
                      <EditableText value={f.body} className="mt-auto text-ivory/80" textClass="text-[16px] leading-relaxed text-ivory/85" />
                    </article>
                  );
                })}
              </div>
            </Reveal>
          </section>

          <section id="links" tabIndex={-1} className="scroll-mt-32 py-12 outline-none">
            <p className="label text-sage">Elsewhere</p>
            <ul className="mt-6 grid gap-px bg-ivory/10 sm:grid-cols-3">
              {linkKeys.map((k) => {
                const l = site.links[k];
                const Icon = LINK_ICONS[k];
                return (
                  <li key={k} className="bg-ink p-5">
                    <Icon size={18} className="text-sage" aria-hidden />
                    <p className="mt-6 font-serif text-2xl">{l.label}</p>
                    {l.href ? (
                      <a {...linkProps(k, l.href)} data-testid={`links-${k}`} className="link-u mt-1 inline-block break-all font-mono text-xs text-ivory/80">
                        {l.href.replace(/^https?:\/\/(www\.)?/, '')} {k !== 'email' && '↗'}
                      </a>
                    ) : (
                      <p className="mt-1 font-mono text-xs text-ivory/70"><Ph text={l.placeholder} /></p>
                    )}
                  </li>
                );
              })}
            </ul>
          </section>
        </div>
      </div>

      <NextChapter to="/project" num="02" label="My Project" dark />
    </Page>
  );
}
