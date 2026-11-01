import { Mail, Link2, Code2 } from 'lucide-react';
import Page from '../components/Page';
import SectionToc from '../components/SectionToc';
import NextChapter from '../components/NextChapter';
import { Ph, Reveal } from '../components/Bits';
import { about } from '../content/about';
import { site } from '../content/site';

const LINK_ICONS = { github: Code2, linkedin: Link2, email: Mail } as const;

export default function About() {
  const body = about.sections.filter((s) => s.id !== 'introduction');
  const toc = [...body.map((s) => ({ id: s.id, label: s.title })), { id: 'links', label: 'Elsewhere' }];

  return (
    <Page>
      {/* hero */}
      <section className="page-x grid grid-cols-12 gap-x-6 gap-y-10 pb-16 pt-12 lg:pt-20">
        <div className="col-span-12 lg:col-span-7">
          <p className="label text-sage">01 — About Me · Profile</p>
          <h1 className="mt-6 font-serif uppercase leading-[0.88] tracking-tight" style={{ fontSize: 'clamp(3rem, 8vw, 7.4rem)' }}>
            The person <span className="italic normal-case text-sage">behind</span> the words
          </h1>
          <p className="mt-10 max-w-xl text-lg leading-relaxed text-ivory/80">
            <span className="float-left mr-2 mt-1 font-serif text-6xl leading-[0.8] text-lime">L</span>
            {about.sections[0].body[0]}
          </p>
        </div>
        <div className="col-span-12 grid gap-6 sm:grid-cols-2 lg:col-span-5 lg:grid-cols-1 xl:grid-cols-[1fr_1fr]">
          <figure>
            <div className="relative">
              <div aria-hidden className="absolute -right-3 -top-3 h-full w-full border border-sage/50" />
              <img src={about.photo.src} alt={about.photo.alt} width={480} height={600} className="relative aspect-[4/5] w-full object-cover" />
            </div>
            <figcaption className="mt-3 flex items-baseline justify-between gap-2 font-mono text-[11px] text-ivory/60">
              <span>Fig. 1 — {site.name}</span>
              {about.photo.isPlaceholder && <span>[photo placeholder]</span>}
            </figcaption>
          </figure>
          {/* ivory fact card: the page's editorial variation */}
          <dl className="theme-ivory self-end bg-ivory p-5 text-ink">
            <p className="label mb-3 text-sage-deep">Fact sheet</p>
            {about.facts.map((f) => (
              <div key={f.k} className="border-t border-ink/15 py-2">
                <dt className="font-mono text-[10px] uppercase tracking-[0.14em] text-ink/60">{f.k}</dt>
                <dd className="mt-0.5 text-sm font-medium">{f.v}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <div className="page-x"><div className="border-t border-ivory/15" /></div>

      <div className="page-x grid grid-cols-12 gap-x-6 py-12 lg:py-20">
        <aside className="col-span-12 lg:col-span-3">
          <SectionToc items={toc} dark />
        </aside>
        <div className="col-span-12 lg:col-span-8 lg:col-start-5">
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

          <section id="links" tabIndex={-1} className="scroll-mt-32 py-12 outline-none">
            <p className="label text-sage">Elsewhere</p>
            <ul className="mt-6 grid gap-px bg-ivory/10 sm:grid-cols-3">
              {(Object.keys(site.links) as (keyof typeof site.links)[]).map((k) => {
                const l = site.links[k];
                const Icon = LINK_ICONS[k];
                const href = l.href ? (k === 'email' ? `mailto:${l.href}` : l.href) : null;
                return (
                  <li key={k} className="bg-ink p-5">
                    <Icon size={18} className="text-sage" aria-hidden />
                    <p className="mt-6 font-serif text-2xl">{l.label}</p>
                    {href ? (
                      <a href={href} target="_blank" rel="noreferrer" className="link-u mt-1 inline-block break-all font-mono text-xs text-ivory/80">
                        {l.href!.replace(/^https?:\/\//, '')} ↗
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
