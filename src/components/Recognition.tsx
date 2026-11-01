import { Star } from 'lucide-react';
import { PresentationGallery } from './PresentationGallery';
import { recognitionCategories, type RecognitionCategory } from '../content/contributions';
import { entryLabel, figure, formatIsoDate, type NumberedEntry, type RecognitionSummary } from '../lib/recognition';

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

/** Overview figures, all derived from the entries. Shows an em dash for any figure without data. */
export function RecognitionOverview({ summary }: { summary: RecognitionSummary }) {
  const stars = summary.totalStars;
  const numeral = 'font-serif leading-[0.85] text-ivory';
  const numeralSize = { fontSize: 'clamp(4rem, 9vw, 7.5rem)' };
  const label = 'min-h-[2.75em] font-mono text-[11px] uppercase leading-snug tracking-[0.14em] text-ivory/60';
  return (
    <dl className="grid grid-cols-2 border-y border-ivory/15 sm:grid-cols-[1.35fr_1fr_1fr]" data-testid="recognition-overview">
      <div className="col-span-2 min-w-0 border-b border-ivory/15 py-6 pr-3 sm:col-span-1 sm:border-b-0 sm:py-8 sm:pr-6">
        <dt className={label}>Stars received</dt>
        <dd className="mt-3">
          <span className={`block ${numeral}`} style={numeralSize} data-testid="overview-stars" aria-label={stars === null ? 'none recorded yet' : undefined}>
            {figure(stars)}
          </span>
          {stars !== null && stars > 0 && stars <= 40 && (
            <span aria-hidden className="mt-4 flex flex-wrap gap-1.5 text-lime">
              {Array.from({ length: stars }).map((_, i) => (
                <Star key={i} size={15} strokeWidth={1.5} className="fill-current" />
              ))}
            </span>
          )}
          <span className="mt-3 block text-sm text-ivory/60">Counted from the entries below.</span>
        </dd>
      </div>
      <div className="min-w-0 py-6 pr-3 sm:border-l sm:border-ivory/15 sm:py-8 sm:pl-6">
        <dt className={label}>Contribution entries</dt>
        <dd className="mt-3">
          <span className={`block ${numeral}`} style={numeralSize} data-testid="overview-entries" aria-label={summary.totalEntries === null ? 'none recorded yet' : undefined}>
            {figure(summary.totalEntries)}
          </span>
          {summary.totalEntries !== null && (
            <span aria-hidden className="mt-4 flex flex-wrap gap-x-2 gap-y-1 font-mono text-[11px] text-sage">
              {Array.from({ length: summary.totalEntries }).map((_, i) => (
                <span key={i}>{String(i + 1).padStart(2, '0')}</span>
              ))}
            </span>
          )}
        </dd>
      </div>
      <div className="min-w-0 border-l border-ivory/15 py-6 pl-3 sm:py-8 sm:pl-6">
        <dt className={label}>Topics covered</dt>
        <dd className="mt-3">
          <span className={`block ${numeral}`} style={numeralSize} data-testid="overview-topics" aria-label={summary.topics.length ? undefined : 'none recorded yet'}>
            {summary.topics.length ? summary.topics.length : '—'}
          </span>
          {summary.topics.length > 0 && (
            <ul className="mt-4 space-y-1 text-[13px] leading-snug text-ivory/70">
              {summary.topics.map((t) => (
                <li key={t} className="break-words">{t}</li>
              ))}
            </ul>
          )}
        </dd>
      </div>
    </dl>
  );
}

/** One journal entry in the timeline (designed for the ivory journal surface). */
export function RecognitionEntryCard({ entry, sessionWith = [] }: { entry: NumberedEntry; sessionWith?: NumberedEntry[] }) {
  const label = entryLabel(entry.no);
  return (
    <article
      id={`entry-${entry.id}`}
      className="relative grid scroll-mt-28 gap-3 pb-12 pl-6 sm:grid-cols-[8.5rem_1fr] sm:gap-8 sm:pl-0"
      aria-labelledby={`rec-${entry.id}`}
      data-testid="recognition-entry"
      data-entry-no={entry.no}
    >
      {/* rule + dot */}
      <span aria-hidden className="absolute bottom-0 left-0 top-1 w-px bg-ink/15 sm:left-[9.75rem]" />
      <span aria-hidden className="absolute left-[-3.5px] top-1.5 h-2 w-2 rounded-full bg-sage-dark sm:left-[calc(9.75rem-3.5px)] sm:top-3" />

      <div className="flex items-baseline gap-3 sm:block sm:text-right">
        <p className="font-mono text-xs uppercase tracking-[0.14em] text-sage-deep">
          <span className="sm:hidden">{label}</span>
          <span className="hidden sm:inline">Entry</span>
        </p>
        <p aria-hidden className="hidden font-serif text-5xl leading-none text-ink sm:block">{String(entry.no).padStart(2, '0')}</p>
        {entry.date && (
          <p className="font-mono text-[11px] uppercase tracking-[0.12em] text-ink/60 sm:mt-2">
            <time dateTime={entry.date}>{formatIsoDate(entry.date)}</time>
          </p>
        )}
      </div>

      <div className="min-w-0 sm:pl-8">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
          <StarGlyphs count={entry.stars} className="text-sage-deep" />
          <CategoryChip category={entry.category} />
        </div>
        <h3 id={`rec-${entry.id}`} className="mt-3 break-words font-serif text-3xl leading-tight md:text-4xl">
          <span className="sr-only">{label}: </span>
          {entry.title}
        </h3>
        <p className="mt-2 max-w-2xl leading-relaxed text-ink/80">{entry.description}</p>
        {entry.answer && (
          <div className="mt-4 max-w-2xl border-l-2 border-sage-dark pl-4">
            <p className="label text-sage-deep">My answer</p>
            <p className="mt-1 font-serif text-xl italic leading-snug text-ink/85">“{entry.answer}”</p>
          </div>
        )}
        {entry.examples && entry.examples.length > 0 && (
          <div className="mt-4 flex flex-wrap items-baseline gap-x-3 gap-y-2">
            <p className="label text-sage-deep">Examples</p>
            <ul className="flex flex-wrap gap-2">
              {entry.examples.map((x) => (
                <li key={x} className="border border-ink/20 bg-ivory-deep px-2 py-0.5 font-mono text-sm [overflow-wrap:anywhere]">{x}</li>
              ))}
            </ul>
          </div>
        )}
        <p className="mt-4 text-sm text-ink/70">
          <span className="label mr-2 text-sage-deep">Topic</span>
          {entry.topic}
        </p>
        {sessionWith.length > 0 && (
          <p className="mt-1 text-sm text-ink/70">
            <span className="label mr-2 text-sage-deep">Session</span>
            Same class session as{' '}
            {sessionWith.map((o, i) => (
              <span key={o.id}>
                {i > 0 && ', '}
                <a href={`#entry-${o.id}`} className="underline decoration-sage-dark/50 underline-offset-2 hover:decoration-sage-deep">{entryLabel(o.no)}</a>
              </span>
            ))}
          </p>
        )}
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
