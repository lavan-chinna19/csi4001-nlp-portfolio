import { Star } from 'lucide-react';
import { PresentationGallery } from './PresentationGallery';
import { recognitionCategories, type RecognitionCategory, type RecognitionEntry } from '../content/contributions';
import { figure, formatIsoDate, type RecognitionSummary } from '../lib/recognition';

/** Small star glyphs + the exact number. Shows at most `max` glyphs; the number is always exact. */
export function StarGlyphs({ count, max = 5, className = '' }: { count: number; max?: number; className?: string }) {
  const shown = Math.min(count, max);
  return (
    <span className={`inline-flex items-center gap-1.5 ${className}`} aria-label={`${count} ${count === 1 ? 'star' : 'stars'}`}>
      <span className="inline-flex gap-0.5" aria-hidden>
        {Array.from({ length: shown }).map((_, i) => (
          <Star key={i} size={13} className="fill-current" strokeWidth={1.5} />
        ))}
      </span>
      <span aria-hidden className="font-mono text-xs">{count}</span>
    </span>
  );
}

/** A category chip. Interactive when `onClick` is given. */
export function CategoryChip({
  category,
  count,
  active = false,
  onClick,
  tone = 'ivory',
}: {
  category: RecognitionCategory | 'all';
  count?: number;
  active?: boolean;
  onClick?: () => void;
  tone?: 'ivory' | 'dark';
}) {
  const label = category === 'all' ? 'All' : recognitionCategories[category].label;
  const base = 'inline-flex items-center gap-2 border px-2.5 py-1 font-mono text-[11px] uppercase tracking-[0.12em] transition-colors';
  const colours =
    tone === 'ivory'
      ? active
        ? 'border-sage-deep bg-sage-deep text-ivory'
        : 'border-ink/25 text-ink/75 hover:border-sage-deep hover:text-ink'
      : active
        ? 'border-lime text-lime'
        : 'border-ivory/25 text-ivory/75 hover:border-lime';
  const content = (
    <>
      {label}
      {count !== undefined && <span className="opacity-70">{count}</span>}
    </>
  );
  if (!onClick) return <span className={`${base} ${colours}`}>{content}</span>;
  return (
    <button type="button" onClick={onClick} aria-pressed={active} className={`${base} ${colours}`}>
      {content}
    </button>
  );
}

/** Three derived figures. Shows an em dash for any figure without data. */
export function RecognitionOverview({ summary }: { summary: RecognitionSummary }) {
  const items = [
    { k: 'Stars received', v: summary.totalStars },
    { k: 'Recorded contributions', v: summary.totalEntries },
    { k: 'Class sessions', v: summary.sessionDates },
  ];
  return (
    <dl className="grid grid-cols-3 border-y border-ivory/15" data-testid="recognition-overview">
      {items.map((it, i) => (
        <div key={it.k} className={`py-5 pr-3 sm:py-6 ${i > 0 ? 'border-l border-ivory/15 pl-3 sm:pl-6' : ''}`}>
          <dt className="font-mono text-[10px] uppercase leading-snug tracking-[0.14em] text-ivory/60">{it.k}</dt>
          <dd className="mt-2 font-serif text-5xl leading-none text-ivory sm:text-6xl" aria-label={it.v === null ? 'none recorded yet' : undefined}>
            {figure(it.v)}
          </dd>
        </div>
      ))}
    </dl>
  );
}

/** One journal entry in the timeline (designed for the ivory journal surface). */
export function RecognitionEntryCard({ entry }: { entry: RecognitionEntry }) {
  return (
    <article className="relative grid gap-3 pb-10 pl-6 sm:grid-cols-[8.5rem_1fr] sm:gap-8 sm:pl-0" aria-labelledby={`rec-${entry.id}`} data-testid="recognition-entry">
      {/* rule + dot */}
      <span aria-hidden className="absolute bottom-0 left-0 top-1 w-px bg-ink/15 sm:left-[9.75rem]" />
      <span aria-hidden className="absolute left-[-3.5px] top-1.5 h-2 w-2 rounded-full bg-sage-dark sm:left-[calc(9.75rem-3.5px)]" />

      <p className="font-mono text-xs uppercase tracking-[0.12em] text-sage-deep sm:pt-0.5 sm:text-right">
        <time dateTime={entry.date}>{formatIsoDate(entry.date)}</time>
      </p>

      <div className="min-w-0 sm:pl-8">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
          <StarGlyphs count={entry.stars} className="text-sage-deep" />
          <CategoryChip category={entry.category} />
        </div>
        <h3 id={`rec-${entry.id}`} className="mt-3 font-serif text-2xl leading-tight md:text-3xl">{entry.activity}</h3>
        <p className="mt-1 text-sm text-ink/70">
          <span className="label mr-2 text-sage-deep">Topic</span>
          {entry.topic}
        </p>
        {entry.facultyFeedback && (
          <blockquote className="mt-4 border-l-2 border-sage-dark pl-4">
            <p className="font-serif text-lg italic leading-snug text-ink/85">“{entry.facultyFeedback}”</p>
            <footer className="mt-1 font-mono text-[10px] uppercase tracking-[0.14em] text-ink/55">Faculty feedback</footer>
          </blockquote>
        )}
        {entry.evidence && entry.evidence.length > 0 && (
          <div className="mt-5">
            <PresentationGallery images={entry.evidence} variant="thumbs" />
          </div>
        )}
      </div>
    </article>
  );
}
