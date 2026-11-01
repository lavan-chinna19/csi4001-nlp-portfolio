import { useEffect, useState } from 'react';

export interface TocItem {
  id: string;
  label: string;
}

/** Tracks which section is in view (IntersectionObserver). */
export function useActiveSection(ids: string[]) {
  const [active, setActive] = useState(ids[0]);
  useEffect(() => {
    const els = ids.map((id) => document.getElementById(id)).filter((e): e is HTMLElement => !!e);
    const obs = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: '-25% 0px -65% 0px', threshold: 0 }
    );
    els.forEach((e) => obs.observe(e));
    return () => obs.disconnect();
  }, [ids.join('|')]); // eslint-disable-line react-hooks/exhaustive-deps
  return active;
}

function go(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  el.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' });
  el.focus({ preventScroll: true });
}

/** Desktop: sticky vertical list. Mobile: sticky horizontal chips. */
export default function SectionToc({ items, dark, title = 'On this page' }: { items: TocItem[]; dark: boolean; title?: string }) {
  const active = useActiveSection(items.map((i) => i.id));
  const accent = dark ? 'text-lime' : 'text-sage-deep';
  return (
    <>
      <nav aria-label={title} className="sticky top-24 hidden lg:block">
        <p className={`label mb-4 ${dark ? 'text-ink-mute' : 'text-sage-deep'}`}>{title}</p>
        <ol className="space-y-1.5">
          {items.map((it, idx) => {
            const on = active === it.id;
            return (
              <li key={it.id}>
                <a
                  href={`#${it.id}`}
                  onClick={(e) => { e.preventDefault(); go(it.id); }}
                  aria-current={on ? 'true' : undefined}
                  className={`group flex items-baseline gap-3 py-0.5 text-[13px] transition-colors ${on ? accent : 'opacity-60 hover:opacity-100'}`}
                >
                  <span className="w-5 font-mono text-[10px]">{String(idx + 1).padStart(2, '0')}</span>
                  <span className={`h-px transition-all ${on ? 'w-6 bg-current' : 'w-2 bg-current opacity-40'}`} aria-hidden />
                  <span>{it.label}</span>
                </a>
              </li>
            );
          })}
        </ol>
      </nav>
      <nav
        aria-label={`${title} (compact)`}
        className={`scrollbar-thin sticky top-14 z-40 -mx-5 overflow-x-auto border-b px-5 py-2.5 backdrop-blur-md sm:-mx-8 sm:px-8 lg:hidden ${
          dark ? 'border-ivory/10 bg-ink/85' : 'border-ink/10 bg-ivory/90'
        }`}
      >
        <ol className="flex w-max gap-2">
          {items.map((it) => {
            const on = active === it.id;
            return (
              <li key={it.id}>
                <a
                  href={`#${it.id}`}
                  onClick={(e) => { e.preventDefault(); go(it.id); }}
                  aria-current={on ? 'true' : undefined}
                  className={`block whitespace-nowrap border px-2.5 py-1 font-mono text-[11px] ${
                    on ? (dark ? 'border-lime text-lime' : 'border-sage-deep bg-sage-deep text-ivory') : 'border-current opacity-60'
                  }`}
                >
                  {it.label}
                </a>
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
}
