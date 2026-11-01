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

/** A link that may still be missing. `href: null` renders a visible placeholder. */
export interface MaybeLink {
  label: string;
  href: string | null;
  placeholder: string;
}
