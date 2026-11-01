import { useCallback, useEffect, useRef, useState, type KeyboardEvent as ReactKeyboardEvent } from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Maximize2, X } from 'lucide-react';
import type { ImageSlot } from '../content/types';

/** Any image the gallery can show. Width/height are optional (default 4:3). */
export interface GalleryImage {
  src: string;
  alt: string;
  caption: string;
  width?: number;
  height?: number;
}

const dims = (img: GalleryImage) => ({ width: img.width ?? 800, height: img.height ?? 600 });

/** Accessible lightbox: Esc closes, Tab is trapped, focus returns to the opener. */
function Lightbox({
  images,
  index,
  onClose,
  onIndex,
}: {
  images: GalleryImage[];
  index: number;
  onClose: () => void;
  onIndex: (i: number) => void;
}) {
  const reduce = useReducedMotion();
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const img = images[index];
  const many = images.length > 1;

  useEffect(() => {
    closeRef.current?.focus();
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prevOverflow;
    };
  }, []);

  const onKeyDown = (e: ReactKeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Escape') {
      e.preventDefault();
      onClose();
      return;
    }
    if (many && e.key === 'ArrowRight') onIndex((index + 1) % images.length);
    if (many && e.key === 'ArrowLeft') onIndex((index - 1 + images.length) % images.length);
    if (e.key === 'Tab' && dialogRef.current) {
      const f = Array.from(dialogRef.current.querySelectorAll<HTMLElement>('button, [href], [tabindex]:not([tabindex="-1"])'));
      if (!f.length) return;
      const first = f[0];
      const last = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
  };

  return createPortal(
    <motion.div
      ref={dialogRef}
      role="dialog"
      aria-modal="true"
      aria-label={`Image ${index + 1} of ${images.length}: ${img.caption}`}
      onKeyDown={onKeyDown}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-ink/95 p-4 backdrop-blur-sm sm:p-8"
      initial={reduce ? false : { opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <button
        ref={closeRef}
        type="button"
        onClick={onClose}
        aria-label="Close image viewer"
        className="absolute right-4 top-4 inline-flex h-10 w-10 items-center justify-center border border-ivory/30 text-ivory transition-colors hover:border-lime hover:text-lime"
      >
        <X size={18} aria-hidden />
      </button>
      <figure className="flex max-h-full w-full max-w-5xl flex-col items-center" onClick={(e) => e.stopPropagation()}>
        <motion.img
          key={img.src}
          src={img.src}
          alt={img.alt}
          width={dims(img).width}
          height={dims(img).height}
          initial={reduce ? false : { opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.25 }}
          className="max-h-[78vh] w-auto max-w-full border border-ivory/15 object-contain"
          style={{ aspectRatio: `${dims(img).width} / ${dims(img).height}` }}
        />
        <figcaption className="mt-4 flex w-full flex-wrap items-center justify-between gap-3 font-mono text-xs text-ivory/75">
          <span>
            <span className="text-lime">Fig. {String(index + 1).padStart(2, '0')}</span> — {img.caption}
          </span>
          {many && (
            <span className="flex items-center gap-2">
              <button type="button" onClick={() => onIndex((index - 1 + images.length) % images.length)} aria-label="Previous image" className="inline-flex h-9 w-9 items-center justify-center border border-ivory/30 hover:border-lime hover:text-lime">
                <ChevronLeft size={16} aria-hidden />
              </button>
              <span aria-live="polite">{index + 1} / {images.length}</span>
              <button type="button" onClick={() => onIndex((index + 1) % images.length)} aria-label="Next image" className="inline-flex h-9 w-9 items-center justify-center border border-ivory/30 hover:border-lime hover:text-lime">
                <ChevronRight size={16} aria-hidden />
              </button>
            </span>
          )}
        </figcaption>
      </figure>
    </motion.div>,
    document.body
  );
}

/**
 * Gallery with click-to-enlarge lightbox.
 * `plate` (default): two-up figures with captions. `thumbs`: compact thumbnail row.
 * Renders nothing when `images` is empty.
 */
export function PresentationGallery({
  images,
  variant = 'plate',
  className = '',
}: {
  images: GalleryImage[];
  variant?: 'plate' | 'thumbs';
  className?: string;
}) {
  const [open, setOpen] = useState<number | null>(null);
  const openers = useRef<(HTMLButtonElement | null)[]>([]);
  const lastOpened = useRef<number>(0);

  const close = useCallback(() => {
    setOpen(null);
    window.setTimeout(() => openers.current[lastOpened.current]?.focus(), 0);
  }, []);

  if (!images.length) return null;
  const thumbs = variant === 'thumbs';

  return (
    <>
      <ul className={`${thumbs ? 'flex flex-wrap gap-2' : 'grid gap-6 md:grid-cols-2'} ${className}`}>
        {images.map((img, i) => {
          const d = dims(img);
          return (
            <li key={img.src} className={thumbs ? 'w-24 sm:w-28' : ''}>
              <figure>
                <button
                  ref={(el) => {
                    openers.current[i] = el;
                  }}
                  type="button"
                  onClick={() => {
                    lastOpened.current = i;
                    setOpen(i);
                  }}
                  aria-label={`Enlarge image: ${img.caption}`}
                  className="group relative block w-full overflow-hidden border border-ivory/15 bg-ink-soft"
                  style={{ aspectRatio: thumbs ? '4 / 3' : `${d.width} / ${d.height}` }}
                >
                  <img
                    src={img.src}
                    alt={img.alt}
                    width={d.width}
                    height={d.height}
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
                  />
                  <span aria-hidden className="pointer-events-none absolute inset-0 bg-ink/0 transition-colors duration-300 group-hover:bg-ink/15" />
                  {!thumbs && (
                    <span aria-hidden className="absolute bottom-3 right-3 inline-flex items-center gap-1.5 border border-ivory/30 bg-ink/80 px-2 py-1 font-mono text-[10px] uppercase tracking-[0.14em] text-ivory opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100">
                      <Maximize2 size={12} /> Enlarge
                    </span>
                  )}
                </button>
                {!thumbs && (
                  <figcaption className="mt-3 flex items-baseline gap-3 font-mono text-xs text-ivory/70">
                    <span className="text-lime">Fig. {String(i + 1).padStart(2, '0')}</span>
                    <span>{img.caption}</span>
                  </figcaption>
                )}
              </figure>
            </li>
          );
        })}
      </ul>
      <AnimatePresence>
        {open !== null && <Lightbox images={images} index={open} onClose={close} onIndex={setOpen} />}
      </AnimatePresence>
    </>
  );
}

/** An optional image slot: renders the image when set, and nothing at all while it is `null`. */
export function ImageSlotView({ image }: { image: ImageSlot | null }) {
  if (!image) return null;
  return (
    <figure>
      <img
        src={image.src}
        alt={image.alt}
        width={image.width}
        height={image.height}
        loading="lazy"
        className="w-full border border-ivory/15"
        style={{ aspectRatio: `${image.width} / ${image.height}` }}
      />
      <figcaption className="mt-3 font-mono text-xs text-ivory/70">{image.caption}</figcaption>
    </figure>
  );
}
