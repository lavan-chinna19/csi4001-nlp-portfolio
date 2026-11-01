import type { RecognitionCategory, RecognitionEntry, RecognitionEvidence } from '../content/contributions';

/** Summary figures derived from the entries. `null` means "no data yet" (rendered as —). */
export interface RecognitionSummary {
  totalStars: number | null;
  totalEntries: number | null;
  sessionDates: number | null;
}

export function summarize(entries: RecognitionEntry[]): RecognitionSummary {
  if (!entries.length) return { totalStars: null, totalEntries: null, sessionDates: null };
  return {
    totalStars: entries.reduce((sum, e) => sum + e.stars, 0),
    totalEntries: entries.length,
    sessionDates: new Set(entries.map((e) => e.date)).size,
  };
}

/** Newest first; ties keep their original order. */
export function sortByDateDesc(entries: RecognitionEntry[]): RecognitionEntry[] {
  return entries
    .map((e, i) => ({ e, i }))
    .sort((a, b) => (a.e.date === b.e.date ? a.i - b.i : a.e.date < b.e.date ? 1 : -1))
    .map(({ e }) => e);
}

/** Count of entries per category (only categories that occur). */
export function countByCategory(entries: RecognitionEntry[]): Partial<Record<RecognitionCategory, number>> {
  const out: Partial<Record<RecognitionCategory, number>> = {};
  for (const e of entries) out[e.category] = (out[e.category] ?? 0) + 1;
  return out;
}

/** All evidence images across entries, in timeline order, with the entry they belong to. */
export function collectEvidence(entries: RecognitionEntry[]): (RecognitionEvidence & { entryId: string })[] {
  return sortByDateDesc(entries).flatMap((e) => (e.evidence ?? []).map((ev) => ({ ...ev, entryId: e.id })));
}

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

/** '2026-11-12' → '12 Nov 2026' (parsed without time zones, so it never shifts a day). */
export function formatIsoDate(iso: string): string {
  const m = /^(\d{4})-(\d{2})-(\d{2})/.exec(iso);
  if (!m) return iso;
  return `${Number(m[3])} ${MONTHS[Number(m[2]) - 1] ?? m[2]} ${m[1]}`;
}

/** Figure shown in the overview: the number, or an em dash when there is no data. */
export const figure = (n: number | null) => (n === null ? '—' : String(n));
