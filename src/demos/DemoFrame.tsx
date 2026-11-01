import type { ReactNode } from 'react';
import { FlaskConical } from 'lucide-react';

/** Notebook-style frame for an in-browser demo. `toy` adds an honest label. */
export default function DemoFrame({ title, toy, note, children }: { title: string; toy?: string; note?: string; children: ReactNode }) {
  return (
    <div className="border border-ink/20 bg-ivory-deep/70">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-ink/15 px-4 py-2.5">
        <p className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.16em] text-sage-deep">
          <FlaskConical size={14} aria-hidden /> Try it · {title}
        </p>
        {toy && (
          <span className="bg-ink px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.14em] text-ivory">{toy}</span>
        )}
      </div>
      <div className="p-4 md:p-5">{children}</div>
      {note && <p className="border-t border-ink/10 px-4 py-2.5 font-mono text-[11px] leading-relaxed text-ink/65">{note}</p>}
    </div>
  );
}

export const inputCls = 'field border-ink/25 bg-ivory/60 focus:border-sage-deep';
export const chip = 'border border-ink/20 bg-ivory px-2 py-0.5 font-mono text-[13px]';
export const segBtn = (on: boolean) =>
  `border px-2.5 py-1 font-mono text-xs transition-colors ${on ? 'border-sage-deep bg-sage-deep text-ivory' : 'border-ink/25 hover:border-ink/60'}`;
