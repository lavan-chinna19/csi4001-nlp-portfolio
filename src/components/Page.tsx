import { type ReactNode, useEffect } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import { pageMeta } from '../content/site';

export function usePageMeta(path: string) {
  useEffect(() => {
    const meta = pageMeta[path] ?? { title: 'Not found — Beyond Words', description: 'This page does not exist.' };
    document.title = meta.title;
    const set = (sel: string, val: string) => document.querySelector(sel)?.setAttribute('content', val);
    set('meta[name="description"]', meta.description);
    set('meta[property="og:title"]', meta.title);
    set('meta[property="og:description"]', meta.description);
  }, [path]);
}

export default function Page({ children, className = '' }: { children: ReactNode; className?: string }) {
  const { pathname } = useLocation();
  const reduce = useReducedMotion();
  usePageMeta(pathname);
  const { hash } = useLocation();
  useEffect(() => {
    if (!hash) {
      window.scrollTo(0, 0);
      return;
    }
    const t = window.setTimeout(() => document.getElementById(hash.slice(1))?.scrollIntoView({ block: 'start' }), 120);
    return () => window.clearTimeout(t);
  }, [pathname, hash]);
  return (
    <motion.main
      className={className}
      initial={reduce ? { opacity: 0 } : { opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      exit={reduce ? { opacity: 0 } : { opacity: 0, y: -12 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.main>
  );
}
