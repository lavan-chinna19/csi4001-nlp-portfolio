import { motion, useReducedMotion } from 'framer-motion';
import type { InterestArea } from '../content/about';

/**
 * A quiet "constellation": one central question with interest areas around it.
 * Desktop: nodes on an ellipse joined to the centre by hairlines.
 * Mobile: centre statement followed by a two-column list.
 */
export default function InterestConstellation({ centre, centreSub, areas }: { centre: string; centreSub: string; areas: InterestArea[] }) {
  const reduce = useReducedMotion();
  // Positions on an ellipse (percent of the box), starting at the top, clockwise.
  const pts = areas.map((_, i) => {
    const a = -Math.PI / 2 + (i * 2 * Math.PI) / areas.length;
    return { x: 50 + 36 * Math.cos(a), y: 50 + 37 * Math.sin(a) };
  });

  return (
    <figure aria-label={`${centre} ${centreSub}: ${areas.map((a) => a.label).join(', ')}`}>
      {/* desktop constellation */}
      <div className="relative mx-auto hidden aspect-[16/10] w-full max-w-3xl lg:my-4 md:block" aria-hidden>
        <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <ellipse cx="50" cy="50" rx="36" ry="37" fill="none" stroke="currentColor" strokeWidth="0.15" strokeDasharray="0.6 1.2" className="text-ivory/25" vectorEffect="non-scaling-stroke" />
          {pts.map((p, i) => (
            <motion.line
              key={areas[i].id}
              x1="50"
              y1="50"
              x2={p.x}
              y2={p.y}
              stroke="currentColor"
              strokeWidth="1"
              vectorEffect="non-scaling-stroke"
              className="text-sage/40"
              initial={reduce ? false : { pathLength: 0, opacity: 0 }}
              whileInView={{ pathLength: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1 + i * 0.08, ease: [0.22, 1, 0.36, 1] }}
            />
          ))}
        </svg>
        <div className="absolute left-1/2 top-1/2 z-10 w-[34%] -translate-x-1/2 -translate-y-1/2 border border-lime/50 bg-ink px-4 py-4 text-center">
          <p className="font-serif text-2xl leading-tight text-ivory lg:text-[1.7rem]">{centre}</p>
          <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.14em] text-lime">{centreSub}</p>
        </div>
        {areas.map((a, i) => (
          <div
            key={a.id}
            className="absolute w-[24%] -translate-x-1/2 -translate-y-1/2"
            style={{ left: `${pts[i].x}%`, top: `${pts[i].y}%` }}
          >
            <motion.div
              className="bg-ink px-2 py-1.5 text-center"
              initial={reduce ? false : { opacity: 0, scale: 0.92 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.35 + i * 0.08 }}
            >
              <span className="mx-auto mb-1.5 block h-2 w-2 rounded-full bg-lime shadow-[0_0_0_4px_rgba(212,255,58,0.12)]" />
              <span className="block font-serif text-xl leading-tight text-ivory">{a.label}</span>
              <span className="mt-0.5 block font-mono text-[10px] leading-snug text-ivory/60">{a.note}</span>
            </motion.div>
          </div>
        ))}
      </div>

      {/* mobile + screen-reader list */}
      <div className="md:hidden">
        <div className="border border-lime/50 px-4 py-4">
          <p className="font-serif text-2xl leading-tight">{centre}</p>
          <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.14em] text-lime">{centreSub}</p>
        </div>
      </div>
      <ul className="mt-px grid grid-cols-2 gap-px bg-ivory/10 md:sr-only">
        {areas.map((a) => (
          <li key={a.id} className="bg-ink p-4">
            <span aria-hidden className="mb-2 block h-1.5 w-1.5 rounded-full bg-lime" />
            <p className="font-serif text-lg leading-tight">{a.label}</p>
            <p className="mt-1 font-mono text-[10px] leading-snug text-ivory/60">{a.note}</p>
          </li>
        ))}
      </ul>
    </figure>
  );
}
