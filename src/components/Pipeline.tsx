import { useRef, useState, type KeyboardEvent } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ArrowDown, ArrowRight } from 'lucide-react';
import { project } from '../content/project';

type Stage = (typeof project.pipeline)[number];

/** Step-by-step NLP pipeline (8 stages). Tabs: click or use arrow keys. */
export function PipelineDiagram() {
  const reduce = useReducedMotion();
  const stages = project.pipeline as readonly Stage[];
  const order = stages.map((s) => s.id);
  const [active, setActive] = useState(order[0]);
  const refs = useRef<Record<string, HTMLButtonElement | null>>({});
  const current = stages.find((s) => s.id === active) ?? stages[0];
  const idx = order.indexOf(current.id);

  const onKey = (e: KeyboardEvent<HTMLButtonElement>, id: string) => {
    const i = order.indexOf(id);
    let next: string | null = null;
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') next = order[Math.min(order.length - 1, i + 1)];
    if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') next = order[Math.max(0, i - 1)];
    if (e.key === 'Home') next = order[0];
    if (e.key === 'End') next = order[order.length - 1];
    if (next) {
      e.preventDefault();
      setActive(next);
      refs.current[next]?.focus();
    }
  };

  return (
    <div>
      <ol role="tablist" aria-label="LexAudit NLP pipeline stages" className="grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
        {stages.map((s, i) => {
          const on = active === s.id;
          return (
            <li key={s.id} role="presentation" className="relative">
              <button
                ref={(el) => { refs.current[s.id] = el; }}
                type="button"
                role="tab"
                id={`stage-tab-${s.id}`}
                aria-selected={on}
                aria-controls="pipeline-detail"
                tabIndex={on ? 0 : -1}
                onClick={() => setActive(s.id)}
                onKeyDown={(e) => onKey(e, s.id)}
                className={`group flex h-full w-full items-start gap-3 border px-3 py-3 text-left transition-colors ${
                  on ? 'border-lime bg-lime text-ink' : s.present ? 'border-ivory/20 bg-ink-soft hover:border-ivory/50' : 'border-dashed border-ivory/25 bg-transparent hover:border-ivory/50'
                }`}
              >
                <span className={`font-mono text-[10px] ${on ? 'text-ink/70' : 'text-ink-mute'}`}>{String(i + 1).padStart(2, '0')}</span>
                <span className="min-w-0">
                  <span className="block text-[13px] font-semibold leading-snug">{s.label}</span>
                  {!s.present && (
                    <span className={`mt-1 block font-mono text-[9px] uppercase tracking-[0.12em] ${on ? 'text-ink/70' : 'text-ink-mute'}`}>Not a separate stage</span>
                  )}
                </span>
                {i < stages.length - 1 && (
                  <ArrowRight size={12} aria-hidden className={`ml-auto mt-0.5 shrink-0 ${on ? 'text-ink/60' : 'text-ink-mute'}`} />
                )}
              </button>
            </li>
          );
        })}
      </ol>

      <div id="pipeline-detail" role="tabpanel" aria-labelledby={`stage-tab-${current.id}`} aria-live="polite" className="mt-4 min-h-[200px] border border-ivory/15 bg-ink-soft p-6 md:p-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={current.id}
            initial={reduce ? false : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
            className="grid gap-6 md:grid-cols-12"
          >
            <div className="md:col-span-4">
              <p className="font-mono text-[11px] text-lime">STAGE {String(idx + 1).padStart(2, '0')} / {stages.length}</p>
              <h3 className="mt-2 font-serif text-3xl leading-tight md:text-4xl">{current.label}</h3>
              <p className="mt-3 break-words font-mono text-xs leading-relaxed text-sage">{current.component}</p>
              {!current.present && (
                <p className="mt-3 inline-block border border-dashed border-ivory/30 px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.12em] text-ivory/70">Placeholder · not a separate stage</p>
              )}
            </div>
            <p className="text-[16px] leading-relaxed text-ivory/85 md:col-span-7 md:col-start-6">{current.text}</p>
          </motion.div>
        </AnimatePresence>
      </div>
      <p className="mt-3 font-mono text-[11px] text-ink-mute">Click a stage, or use arrow keys to move through the pipeline. Component names are files and classes in the repository.</p>
    </div>
  );
}

export function ArchitectureDiagram() {
  const a = project.architecture;
  const links = ['HTTP', 'reverse proxy', 'SQL'];
  return (
    <figure>
      <div className="relative border border-dashed border-ivory/25 p-4 pt-9 md:p-6 md:pt-10">
        <p className="absolute left-4 top-3 font-mono text-[10px] uppercase tracking-[0.16em] text-ink-mute">Docker Compose · default deployment</p>
        <div className="grid items-stretch gap-2 md:grid-cols-[1fr_auto_1fr_auto_1fr_auto_1fr] md:gap-0">
          {a.map((node, i) => (
            <div key={node.id} className="contents">
              {i > 0 && (
                <div className="flex items-center justify-center gap-2 py-1 md:flex-col md:px-2 md:py-0">
                  <span className="font-mono text-[10px] text-sage">{links[i - 1]}</span>
                  <ArrowDown size={16} className="text-lime md:hidden" aria-hidden />
                  <ArrowRight size={16} className="hidden text-lime md:block" aria-hidden />
                </div>
              )}
              <div className={`border p-4 ${i >= 2 ? 'border-sage/60' : 'border-ivory/25'} bg-ink-soft`}>
                <p className="font-mono text-[10px] text-ink-mute">{String(i + 1).padStart(2, '0')}</p>
                <p className="mt-1 font-serif text-2xl leading-tight">{node.label}</p>
                <p className="mt-2 font-mono text-[11px] leading-relaxed text-ivory/70">{node.tech}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <figcaption className="mt-3 font-mono text-[11px] leading-relaxed text-ink-mute">
        {project.architectureCaption}
      </figcaption>
    </figure>
  );
}
