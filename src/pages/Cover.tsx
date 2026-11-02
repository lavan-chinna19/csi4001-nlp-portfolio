import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Page from '../components/Page';
import ArcSentence from '../components/ArcSentence';
import { site } from '../content/site';

export default function Cover() {
  const reduce = useReducedMotion();
  const up = (delay: number) =>
    reduce
      ? { initial: false as const }
      : { initial: { opacity: 0, y: 26 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] as const } };

  return (
    <Page className="relative overflow-hidden">
      <div className="page-x relative flex min-h-[calc(100svh-3.5rem)] flex-col pb-8 pt-8 sm:pt-12">
        {/* technical identifier */}
        <motion.p {...up(0)} className="flex items-center gap-4 font-mono font-medium tracking-[-0.02em] text-ivory" style={{ fontSize: 'clamp(1.6rem, 3.4vw, 2.9rem)' }}>
          <span>
            CSI<span className="text-lime">4001</span>
          </span>
          <span aria-hidden className="h-px flex-1 bg-ivory/20" />
        </motion.p>

        {/* course title: the main visual focus */}
        <motion.h1
          {...up(0.12)}
          className="mt-5 font-serif uppercase leading-[0.86] tracking-[-0.01em] text-ivory"
          style={{ fontSize: 'clamp(2.9rem, 8.6vw, 9.4rem)' }}
        >
          Natural Language Processing <span className="text-sage">and</span> Computational Linguistics
        </motion.h1>

        {/* generative visual */}
        <div className="-mx-2 mt-8 flex-1 lg:mx-auto lg:w-[86%]">
          <ArcSentence />
        </div>

        {/* tagline, name, registration, CTA */}
        <motion.div {...up(0.55)} className="mt-6 grid gap-6 border-t border-ivory/15 pt-6 md:grid-cols-12 md:items-end">
          <p className="font-serif text-2xl italic leading-snug text-sage md:col-span-5 md:text-3xl">
            {site.tagline}
          </p>
          <div className="md:col-span-4">
            <p className="mb-3 font-mono text-xs uppercase tracking-[0.14em] text-sage">NLP Portfolio of</p>
            <p className="font-serif text-4xl leading-none sm:text-5xl">{site.name}</p>
            <p className="mt-2 font-mono text-xs uppercase tracking-[0.14em] text-ivory/70">Registration Number: {site.registrationNumber}</p>
          </div>
          <div className="md:col-span-3 md:flex md:justify-end">
            <Link
              to="/about"
              className="group inline-flex w-full items-center justify-between gap-6 bg-lime px-6 py-4 font-medium text-ink transition-transform hover:-translate-y-0.5 focus-visible:outline-ivory md:w-auto"
            >
              <span className="font-mono text-xs uppercase tracking-[0.2em]">Explore Portfolio</span>
              <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" aria-hidden />
            </Link>
          </div>
        </motion.div>
      </div>
    </Page>
  );
}
