import { type ReactNode, useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { AnimatePresence, motion, useScroll, useSpring } from 'framer-motion';
import { ArrowUp, Menu, X } from 'lucide-react';
import { nav, site } from '../content/site';
import { themeFor } from '../lib/theme';

function ScrollProgress({ dark }: { dark: boolean }) {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 30, mass: 0.3 });
  return (
    <motion.div
      aria-hidden
      className={`fixed left-0 right-0 top-0 z-[70] h-[2px] origin-left ${dark ? 'bg-lime' : 'bg-sage-dark'}`}
      style={{ scaleX }}
    />
  );
}

function BackToTop({ dark }: { dark: boolean }) {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const on = () => setShow(window.scrollY > 900);
    on();
    window.addEventListener('scroll', on, { passive: true });
    return () => window.removeEventListener('scroll', on);
  }, []);
  return (
    <AnimatePresence>
      {show && (
        <motion.button
          type="button"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 12 }}
          onClick={() => window.scrollTo({ top: 0, behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' })}
          className={`fixed bottom-5 right-5 z-50 grid h-11 w-11 place-items-center border transition-colors ${
            dark ? 'border-ivory/30 bg-ink/90 text-ivory hover:border-lime hover:text-lime' : 'border-ink/30 bg-ivory/90 text-ink hover:border-sage-deep'
          }`}
          aria-label="Back to top"
        >
          <ArrowUp size={18} />
        </motion.button>
      )}
    </AnimatePresence>
  );
}

export default function Layout({ children }: { children: ReactNode }) {
  const { pathname } = useLocation();
  const theme = themeFor(pathname);
  const dark = theme === 'dark';
  const [open, setOpen] = useState(false);
  const isCover = pathname === '/';

  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    document.body.style.backgroundColor = dark ? '#141517' : '#F2EDE3';
    document.body.style.color = dark ? '#F2EDE3' : '#141517';
  }, [dark]);
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const shell = dark ? 'bg-ink text-ivory' : 'theme-ivory bg-ivory text-ink';

  return (
    <div className={`min-h-screen transition-colors duration-500 ${shell}`}>
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[80] focus:bg-lime focus:px-3 focus:py-2 focus:text-ink">
        Skip to content
      </a>
      <div className="grain" aria-hidden />
      {!isCover && <ScrollProgress dark={dark} />}

      <header className={`sticky top-0 z-50 border-b backdrop-blur-md ${dark ? 'border-ivory/10 bg-ink/80' : 'border-ink/10 bg-ivory/85'}`}>
        <div className="page-x flex h-14 items-center justify-between gap-6">
          <Link to="/" className="group flex items-baseline gap-3" aria-label="Beyond Words — cover">
            <span className="font-serif text-2xl uppercase leading-none tracking-wide">Beyond Words</span>
            <span className={`label hidden sm:inline ${dark ? 'text-ink-mute' : 'text-sage-deep'}`}>{site.course.code}</span>
          </Link>
          <nav aria-label="Primary" className="hidden xl:block">
            <ul className="flex items-center gap-5 2xl:gap-7">
              {nav.map((n) => (
                <li key={n.to}>
                  <NavLink
                    to={n.to}
                    end={n.to === '/'}
                    className={({ isActive }) =>
                      `group relative flex items-baseline gap-1.5 py-1 text-[13px] font-medium tracking-wide transition-colors ${
                        isActive ? (dark ? 'text-lime' : 'text-sage-deep') : dark ? 'text-ivory/75 hover:text-ivory' : 'text-ink/70 hover:text-ink'
                      }`
                    }
                  >
                    {({ isActive }) => (
                      <>
                        <span className="font-mono text-[10px] opacity-70">{n.num}</span>
                        <span>{n.label}</span>
                        {isActive && (
                          <motion.span layoutId="nav-underline" className={`absolute -bottom-[17px] left-0 right-0 h-[2px] ${dark ? 'bg-lime' : 'bg-sage-dark'}`} />
                        )}
                      </>
                    )}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>
          <button
            type="button"
            className="grid h-10 w-10 place-items-center xl:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? 'Close menu' : 'Open menu'}
            onClick={() => setOpen((o) => !o)}
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
        <AnimatePresence>
          {open && (
            <motion.nav
              id="mobile-menu"
              aria-label="Mobile"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className={`overflow-hidden border-t xl:hidden ${dark ? 'border-ivory/10 bg-ink' : 'border-ink/10 bg-ivory'}`}
            >
              <ul className="page-x py-4">
                {nav.map((n) => (
                  <li key={n.to}>
                    <NavLink
                      to={n.to}
                      end={n.to === '/'}
                      className={({ isActive }) =>
                        `flex items-baseline gap-4 border-b py-4 ${dark ? 'border-ivory/10' : 'border-ink/10'} ${
                          isActive ? (dark ? 'text-lime' : 'text-sage-deep') : ''
                        }`
                      }
                    >
                      <span className="font-mono text-xs opacity-60">{n.num}</span>
                      <span className="font-serif text-3xl">{n.label}</span>
                    </NavLink>
                  </li>
                ))}
              </ul>
            </motion.nav>
          )}
        </AnimatePresence>
      </header>

      <div id="main">{children}</div>

      {!isCover && (
        <footer className={`border-t ${dark ? 'border-ivory/10' : 'border-ink/10'}`}>
          <div className="page-x grid gap-8 py-12 md:grid-cols-12">
            <div className="md:col-span-6">
              <p className="font-serif text-4xl uppercase leading-none">Beyond Words</p>
              <p className={`mt-2 max-w-md font-serif text-lg italic ${dark ? 'text-sage' : 'text-sage-deep'}`}>{site.subtitle}</p>
              <p className={`mt-3 max-w-md text-sm ${dark ? 'text-ivory/65' : 'text-ink/65'}`}>
                {site.course.code} portfolio · {site.name} · Reg. no. {site.registrationNumber} · {site.institution}.
              </p>
            </div>
            <nav aria-label="Footer" className="md:col-span-3">
              <ul className="space-y-2 text-sm">
                {nav.map((n) => (
                  <li key={n.to}>
                    <Link className="link-u" to={n.to}>{n.label}</Link>
                  </li>
                ))}
              </ul>
            </nav>
            <div className="md:col-span-3">
              <ul className="space-y-2 text-sm">
                {(Object.keys(site.links) as (keyof typeof site.links)[]).map((key) => {
                  const l = site.links[key];
                  if (!l.href) return null;
                  return (
                    <li key={l.label}>
                      {key === 'email' ? (
                        <a className="link-u" href={`mailto:${l.href}`} aria-label={`Email ${l.href}`}>{l.label} ↗</a>
                      ) : (
                        <a className="link-u" href={l.href} target="_blank" rel="noopener noreferrer" aria-label={`${l.label} (opens in a new tab)`}>{l.label} ↗</a>
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </footer>
      )}
      <BackToTop dark={dark} />
    </div>
  );
}
