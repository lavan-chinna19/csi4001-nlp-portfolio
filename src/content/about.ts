/**
 * About page content.
 * The prose below is written ONLY from facts Lavan confirmed on 2026-11-01.
 *
 * EDITABLE FIELDS: anything set to `PLACEHOLDER` (search for `TODO(lavan)`)
 * renders as a dashed "Add your reflection here" box. Replace `PLACEHOLDER`
 * with your own words — the box disappears automatically.
 */
import { PLACEHOLDER, type Editable } from './types';

export interface AboutSection {
  id: string;
  kicker: string;
  title: string;
  body: string[];
  placeholder: boolean;
  chips?: string[];
}

export interface EditableBlock {
  id: string;
  title: string;
  body: Editable;
}

export const about = {
  title: 'The person behind the words',

  /** Confirmed fact sheet. */
  facts: [
    { k: 'Name', v: 'Lavan Kumar' },
    { k: 'Registration number', v: '23MID0108' },
    { k: 'Native place', v: 'Medak, Telangana, India' },
    { k: 'University', v: 'VIT Vellore' },
    { k: 'Degree', v: 'Data Science' },
    { k: 'Course', v: 'CSI4001 · NLP & Computational Linguistics · 4 credits' },
  ],

  /** Contact links (also used by the site footer via site.ts). */
  contact: {
    linkedin: 'https://www.linkedin.com/in/lavan-kumar/',
    email: 'lavankumar2234@gmail.com',
    github: 'https://github.com/lavan-chinna19',
  },

  sections: [
    {
      id: 'introduction',
      kicker: '—',
      title: 'Introduction',
      body: [
        'I’m Lavan Kumar, a Data Science student at VIT Vellore, originally from Medak in Telangana. This portfolio is my record of CSI4001 — Natural Language Processing and Computational Linguistics.',
      ],
      placeholder: false,
    },
    {
      id: 'academic',
      kicker: 'I.',
      title: 'Academic background',
      body: [
        'I study Data Science. Along the way I have worked on Python-based AI and machine learning projects, and I am interested in AI, machine learning, deep learning, NLP and generative AI.',
        'What keeps me going is wanting to understand how intelligent systems actually work — and using technology to solve practical problems.',
      ],
      placeholder: false,
    },
    {
      id: 'technical-interests',
      kicker: 'II.',
      title: 'Technical interests',
      body: ['The areas I am most drawn to:'],
      chips: ['Natural Language Processing', 'Machine Learning', 'Deep Learning', 'Computer Vision', 'Generative AI', 'Data Science'],
      placeholder: false,
    },
    {
      id: 'skills',
      kicker: 'III.',
      title: 'Skills & tools',
      body: ['The languages and tools I work with:'],
      chips: ['Python', 'Java', 'SQL', 'TensorFlow', 'PyTorch', 'Streamlit', 'Power BI', 'Tableau', 'GitHub'],
      placeholder: false,
    },
  ] satisfies AboutSection[],

  /** IV. How I learn — five headed sub-sections. */
  howILearn: {
    id: 'how-i-learn',
    kicker: 'IV.',
    title: 'How I learn',
    blocks: [
      // TODO(lavan): write each body in your own words.
      { id: 'fundamentals', title: 'Understanding the Fundamentals', body: PLACEHOLDER },
      { id: 'implementation', title: 'Learning Through Implementation', body: PLACEHOLDER },
      { id: 'experimenting', title: 'Experimenting with Different Approaches', body: PLACEHOLDER },
      { id: 'mistakes', title: 'Learning from Mistakes', body: PLACEHOLDER },
      { id: 'real-world', title: 'Exploring Real-World Applications', body: PLACEHOLDER },
    ] satisfies EditableBlock[],
  },

  /** V. Future aspirations — five fields. */
  aspirations: {
    id: 'aspirations',
    kicker: 'V.',
    title: 'Future aspirations',
    fields: [
      // TODO(lavan): write each body in your own words.
      { id: 'explore', title: 'Areas I Want to Explore', body: PLACEHOLDER },
      { id: 'skills', title: 'Technical Skills I Want to Develop', body: PLACEHOLDER },
      { id: 'career', title: 'My Long-Term Career Goals', body: PLACEHOLDER },
      { id: 'problems', title: 'Problems I Want to Solve', body: PLACEHOLDER },
      { id: 'build-next', title: 'What I Want to Build Next', body: PLACEHOLDER },
    ] satisfies EditableBlock[],
  },
};
