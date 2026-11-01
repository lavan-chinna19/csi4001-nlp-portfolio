import type { ReactNode } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { site } from '../content/site';
import type { Reflection as R } from '../content/types';

/** Small mono tag shown on draft reflections (toggle in site.ts → showDraftTags). */
export function DraftTag({ className = '' }: { className?: string }) {
  if (!site.showDraftTags) return null;
  return (
    <span
      className={`inline-flex items-center gap-1.5 border border-current px-1.5 py-[1px] font-mono text-[10px] uppercase tracking-[0.14em] opacity-70 ${className}`}
      title="Drafted for review — to be rewritten in Lavan’s own words"
    >
      <span aria-hidden className="h-1 w-1 rounded-full bg-current" />
      Draft · awaiting review
    </span>
  );
}

/** A first-person reflection with optional label and draft tag. */
export function Reflection({ label, r, className = '', textClass = '' }: { label?: string; r: R; className?: string; textClass?: string }) {
  return (
    <div className={className}>
      {(label || r.status === 'draft') && (
        <div className="mb-2 flex flex-wrap items-center gap-2">
          {label && <span className="label opacity-70">{label}</span>}
          {r.status === 'draft' && <DraftTag />}
        </div>
      )}
      <p className={textClass}>{r.text}</p>
    </div>
  );
}

export function Reveal({ children, delay = 0, className = '' }: { children: ReactNode; delay?: number; className?: string }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -60px 0px' }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

export function Kicker({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <p className={`label ${className}`}>{children}</p>;
}

/** True when an optional content field has real text. */
export const hasText = (v: string | null | undefined): v is string => !!v && v.trim().length > 0;

/**
 * Renders an optional content field written by Lavan. Empty fields
 * (`PLACEHOLDER`) render NOTHING — fill the field in src/content/ and it appears.
 * Blank lines split the text into paragraphs.
 */
export function EditableText({
  value,
  className = '',
  textClass = '',
}: {
  value: string;
  className?: string;
  textClass?: string;
}) {
  if (!hasText(value)) return null;
  return (
    <div className={className}>
      {value.split(/\n{2,}/).map((p, i) => (
        <p key={i} className={`mb-3 last:mb-0 ${textClass}`}>{p}</p>
      ))}
    </div>
  );
}
