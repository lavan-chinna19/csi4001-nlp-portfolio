import type { RecognitionCategory, RecognitionEntry, RecognitionEvidence } from '../content/contributions';

/** An entry with its entry number (1-based position in `recognitionEntries`). */
export interface NumberedEntry extends RecognitionEntry {
  no: number;
}

/** Summary figures derived from the entries. `null` means "no data yet" (rendered as —). */
export interface RecognitionSummary {
  /** Sum of `stars` over all entries (photos are never counted). */
  totalStars: number | null;
  totalEntries: number | null;
  /** Distinct topics, in first-appearance order. */
  topics: string[];
}

export function summarize(entries: RecognitionEntry[]): RecognitionSummary {
  if (!entries.length) return { totalStars: null, totalEntries: null, topics: [] };
  return {
    totalStars: entries.reduce((sum, e) => sum + e.stars, 0),
    totalEntries: entries.length,
    topics: Array.from(new Set(entries.map((e) => e.topic))),
  };
}

/** 'Entry 01' style label. */
export const entryLabel = (no: number) => `Entry ${String(no).padStart(2, '0')}`;

export function numberEntries(entries: RecognitionEntry[]): NumberedEntry[] {
  return entries.map((e, i) => ({ ...e, no: i + 1 }));
}

/** True only when every entry has a date. */
export const allDated = (entries: RecognitionEntry[]) => entries.length > 0 && entries.every((e) => !!e.date);

/**
 * Timeline order: entry order (01 → last). Only when every entry has a date is
 * the list sorted by date, oldest first; ties keep entry order.
 */
export function timelineOrder(entries: NumberedEntry[]): NumberedEntry[] {
  if (!allDated(entries)) return entries;
  return [...entries].sort((a, b) => (a.date === b.date ? a.no - b.no : (a.date as string) < (b.date as string) ? -1 : 1));
}

/** Other entries recorded in the same class session as `entry`. */
export function sameSession(entry: NumberedEntry, entries: NumberedEntry[]): NumberedEntry[] {
  if (!entry.session) return [];
  return entries.filter((e) => e.session === entry.session && e.id !== entry.id);
}

/** Count of entries per category (only categories that occur). */
export function countByCategory(entries: RecognitionEntry[]): Partial<Record<RecognitionCategory, number>> {
  const out: Partial<Record<RecognitionCategory, number>> = {};
  for (const e of entries) out[e.category] = (out[e.category] ?? 0) + 1;
  return out;
}

export type GalleryEvidence = RecognitionEvidence & { entryId: string; entryNo: number };

/** All evidence images across entries, in timeline order, each tagged with its entry. Captions start with "Entry NN ·". */
export function collectEvidence(entries: NumberedEntry[]): GalleryEvidence[] {
  return timelineOrder(entries).flatMap((e) =>
    (e.evidence ?? []).map((ev) => ({ ...ev, caption: `${entryLabel(e.no)} · ${ev.caption}`, entryId: e.id, entryNo: e.no }))
  );
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
