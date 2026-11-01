import type { MaybeLink } from './types';

/**
 * Global site settings. Edit here; every page reads from this file.
 */
export const site = {
  title: 'Beyond Words',
  subtitle: 'An Exploration of Natural Language Processing and Computational Linguistics.',
  name: 'Lavan Kumar',
  registrationNumber: '23MID0108',
  /** Cover tagline (confirmed). Set to null to show a placeholder instead. */
  tagline: 'A personal exploration of language, machines and meaning.' as string | null,
  taglinePlaceholder: '[Add a one-line tagline in your own voice]',
  course: {
    code: 'CSI4001',
    title: 'Natural Language Processing and Computational Linguistics',
    credits: 4,
    lectureHours: 45,
  },
  institution: 'VIT Vellore',
  degree: 'Data Science',
  nativePlace: 'Medak, Telangana, India',

  /**
   * Toggle the small "DRAFT · awaiting review" tags on every draft reflection.
   * Set to false only once every reflection has been reviewed/approved.
   */
  showDraftTags: true,

  links: {
    github: { label: 'GitHub', href: 'https://github.com/lavan-chinna19', placeholder: '[Add GitHub URL]' },
    linkedin: { label: 'LinkedIn', href: null, placeholder: '[Add LinkedIn URL]' },
    email: { label: 'Email', href: null, placeholder: '[Add email address]' },
  } satisfies Record<string, MaybeLink>,
};

export const nav = [
  { to: '/', label: 'Home', num: '00' },
  { to: '/about', label: 'About Me', num: '01' },
  { to: '/project', label: 'My Project', num: '02' },
  { to: '/learning', label: 'My Learning', num: '03' },
  { to: '/exhibits', label: 'Projects That Made Me Think', num: '04' },
] as const;

/** Per-route document titles + descriptions (applied by usePageMeta). */
export const pageMeta: Record<string, { title: string; description: string }> = {
  '/': {
    title: 'Beyond Words — CSI4001 NLP Portfolio · Lavan Kumar',
    description: 'An interactive academic portfolio for CSI4001 Natural Language Processing and Computational Linguistics.',
  },
  '/about': {
    title: 'About Me — Beyond Words',
    description: 'Lavan Kumar, Data Science student at VIT Vellore: background, interests and tools.',
  },
  '/project': {
    title: 'My Project: LexAudit — Beyond Words',
    description: 'Case file: LexAudit, a local legal-NLP research application that audits contract coherence clause by clause.',
  },
  '/learning': {
    title: 'My Learning: CSI4001 Notebook — Beyond Words',
    description: 'How my understanding of language changed: eight CSI4001 modules explained simply and technically, with working in-browser NLP demos.',
  },
  '/exhibits': {
    title: 'Projects That Made Me Think — Beyond Words',
    description: 'A gallery of nine real open-source NLP projects and a connection map to the concepts behind them.',
  },
};
