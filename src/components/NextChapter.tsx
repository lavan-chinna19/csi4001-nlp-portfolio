import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export default function NextChapter({ to, num, label, dark = false }: { to: string; num: string; label: string; dark?: boolean }) {
  return (
    <Link
      to={to}
      className={`group block border-t ${dark ? 'border-ivory/10 hover:bg-ivory/[0.03]' : 'border-ink/15 hover:bg-ink/[0.03]'} transition-colors`}
    >
      <div className="page-x flex items-end justify-between gap-6 py-14">
        <div>
          <p className={`label ${dark ? 'text-lime' : 'text-sage-deep'}`}>Next chapter · {num}</p>
          <p className="mt-2 font-serif leading-none" style={{ fontSize: 'clamp(2.5rem, 7vw, 6rem)' }}>
            {label}
          </p>
        </div>
        <ArrowRight size={40} className="mb-2 shrink-0 transition-transform group-hover:translate-x-2" aria-hidden />
      </div>
    </Link>
  );
}
