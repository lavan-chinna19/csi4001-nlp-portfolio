import type { MaybeLink } from './types';
import { about } from './about';

/**
 * Global site settings. Edit here; every page reads from this file.
 */
export const site = {
  /** Website identity / brand (the owner). The course stays as academic context in `course`. */
  title: 'Lavan Kumar',
  /** Full document title used for the home tab and Open Graph. */
  brandTitle: 'Lavan Kumar – NLP Portfolio',
  subtitle: 'An Exploration of Natural Language Processing and Computational Linguistics.',
  name: 'Lavan Kumar',
  registrationNumber: '23MID0108',
  /** Cover tagline (confirmed). Set to null to hide it. */
  tagline: 'A personal exploration of language, machines and meaning.' as string | null,
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
    // Edit the addresses in about.ts → contact.
    github: { label: 'GitHub', href: about.contact.github },
    linkedin: { label: 'LinkedIn', href: about.contact.linkedin },
    /** Plain address — `mailto:` is added where it is rendered. */
    email: { label: 'Email', href: about.contact.email },
  } satisfies Record<string, MaybeLink>,
};

export const nav = [
  { to: '/', label: 'Home', num: '00' },
  { to: '/about', label: 'About Me', num: '01' },
  { to: '/project', label: 'My Project', num: '02' },
  { to: '/learning', label: 'My Learning', num: '03' },
  { to: '/exhibits', label: 'Projects That Made Me Think', num: '04' },
  { to: '/contributions', label: 'Classroom Contributions', num: '05' },
] as const;

/** Per-route document titles + descriptions (applied by usePageMeta). */
export const pageMeta: Record<string, { title: string; description: string }> = {
  '/': {
    title: 'Lavan Kumar – NLP Portfolio',
    description: 'Lavan Kumar’s NLP portfolio: an interactive academic portfolio for CSI4001 Natural Language Processing and Computational Linguistics.',
  },
  '/about': {
    title: 'About Me — Lavan Kumar – NLP Portfolio',
    description: 'Lavan Kumar, Data Science student at VIT Vellore: background, interests and tools.',
  },
  '/project': {
    title: 'My Project: LexAudit — Lavan Kumar – NLP Portfolio',
    description: 'Case file: LexAudit, a local legal-NLP research application that audits contract coherence clause by clause.',
  },
  '/learning': {
    title: 'My Learning: CSI4001 Notebook — Lavan Kumar – NLP Portfolio',
    description: 'How my understanding of language changed: eight CSI4001 modules explained simply and technically, with working in-browser NLP demos.',
  },
  '/exhibits': {
    title: 'Projects That Made Me Think — Lavan Kumar – NLP Portfolio',
    description: 'Six NLP projects from my CSI4001 class: my own project, LexAudit, and five classmates’ projects I explored, each with one NLP lesson.',
  },
  '/contributions': {
    title: 'Classroom Contributions: Beyond the Classroom — Lavan Kumar – NLP Portfolio',
    description: 'A record of the stars and recognition received in CSI4001 NLP classes for participation, answering questions, presentations and other contributions.',
  },
};
