import { useRef, useState, type KeyboardEvent } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ArrowDown, ArrowRight } from 'lucide-react';
import { project } from '../content/project';

type Stage = (typeof project.pipeline)[number];

const COLUMNS: string[][] = [['ingest'], ['segment'], ['embed'], ['channelA', 'channelB', 'rules'], ['severity'], ['explain'], ['report']];

export function PipelineDiagram() {
  const reduce = useReducedMotion();
  const stages = project.pipeline as readonly Stage[];
  const byId = Object.fromEntries(stages.map((s) => [s.id, s])) as Record<string, Stage>;
  const order = COLUMNS.flat();
  const [active, setActive] = useState('embed');
  const refs = useRef<Record<string, HTMLButtonElement | null>>({});
  const current = byId[active];

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

  const renderStage = (id: string) => {
    const s = byId[id];
    const on = active === id;
    const n = order.indexOf(id) + 1;
    return (
      <button
        key={id}
        ref={(el) => { refs.current[id] = el; }}
        type="button"
        role="tab"
        aria-selected={on}
        aria-controls="pipeline-detail"
        tabIndex={on ? 0 : -1}
        onClick={() => setActive(id)}
        onKeyDown={(e) => onKey(e, id)}
        className={`group relative w-full border px-3 py-3 text-left transition-colors ${
          on ? 'border-lime bg-lime text-ink' : 'border-ivory/20 bg-ink-soft hover:border-ivory/50'
        }`}
      >
        <span className={`block font-mono text-[10px] ${on ? 'text-ink/70' : 'text-ink-mute'}`}>{String(n).padStart(2, '0')}</span>
        <span className="mt-1 block text-[13px] font-semibold leading-snug">{s.label}</span>
      </button>
    );
  };

  return (
    <div>
      <div role="tablist" aria-label="LexAudit pipeline stages" aria-orientation="horizontal" className="grid gap-2 lg:grid-cols-[repeat(7,minmax(0,1fr))] lg:items-center lg:gap-0">
        {COLUMNS.map((col, ci) => (
          <div key={ci} className="flex flex-col items-stretch lg:flex-row lg:items-center">
            {ci > 0 && (
              <>
                <ArrowDown size={16} className="mx-auto my-1 text-ink-mute lg:hidden" aria-hidden />
                <ArrowRight size={16} className="hidden shrink-0 text-ink-mute lg:mx-1 lg:block" aria-hidden />
              </>
            )}
            {col.length === 1 ? (
              renderStage(col[0])
            ) : (
              <div className="w-full border border-dashed border-sage/50 p-2">
                <p className="mb-2 font-mono text-[9px] uppercase tracking-[0.16em] text-sage">Parallel signals</p>
                <div className="grid gap-2 sm:grid-cols-3 lg:grid-cols-1">
                  {col.map((id) => renderStage(id))}
                </div>
                <p className="mt-2 font-mono text-[9px] leading-snug text-ink-mute">A · B use embeddings; rules read clauses directly</p>
              </div>
            )}
          </div>
        ))}
      </div>

      <div id="pipeline-detail" role="tabpanel" aria-live="polite" className="mt-6 min-h-[200px] border border-ivory/15 bg-ink-soft p-6 md:p-8">
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
              <p className="font-mono text-[11px] text-lime">STAGE {String(order.indexOf(current.id) + 1).padStart(2, '0')} / {order.length}</p>
              <h3 className="mt-2 font-serif text-3xl leading-tight md:text-4xl">{current.label}</h3>
              <p className="mt-3 font-mono text-xs text-sage">{current.tech}</p>
            </div>
            <p className="text-[16px] leading-relaxed text-ivory/85 md:col-span-7 md:col-start-6">{current.text}</p>
          </motion.div>
        </AnimatePresence>
      </div>
      <p className="mt-3 font-mono text-[11px] text-ink-mute">Click a stage, or use arrow keys to move through the pipeline.</p>
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
        Frontend, gateway, backend and PostgreSQL form the default deployment; the backend and database (sage outline) sit on an internal network, and host ports bind only to loopback.
      </figcaption>
    </figure>
  );
}
