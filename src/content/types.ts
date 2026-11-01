/**
 * Shared content types.
 *
 * A `Reflection` is any first-person statement attributed to Lavan.
 * Every reflection starts life as `status: "draft"` — written as a plain
 * starting point, NOT as a claim about what Lavan actually thinks.
 * To approve one: rewrite the text in your own words and set
 * `status: "approved"`. The "DRAFT · awaiting review" tag disappears
 * for approved items (and globally when `showDraftTags` is false in site.ts).
 */
export type ReflectionStatus = 'draft' | 'approved';

export interface Reflection {
  text: string;
  status: ReflectionStatus;
}

/** Helper so drafts are short to write in content files. */
export const draft = (text: string): Reflection => ({ text, status: 'draft' });

/** A link that may still be missing. `href: null` hides it everywhere. */
export interface MaybeLink {
  label: string;
  href: string | null;
}

/**
 * PLACEHOLDER — an optional field Lavan has not written yet.
 * Any content field set to `PLACEHOLDER` (an empty string) is simply NOT
 * rendered — no box, no hint. To show one, replace `PLACEHOLDER` with your own
 * words and it appears automatically. Search the content files for
 * `TODO(lavan)` to find every one.
 */
export const PLACEHOLDER = '';

/** A string field that may still be a PLACEHOLDER (empty). */
export type Editable = string;

/** An image (a slot typed `ImageSlot | null` renders nothing while `null`). */
export interface ImageSlot {
  src: string;
  alt: string;
  caption: string;
  width: number;
  height: number;
}
