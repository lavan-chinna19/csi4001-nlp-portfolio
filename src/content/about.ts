/**
 * About page content.
 * The prose below is written ONLY from facts Lavan confirmed on 2026-11-01,
 * and the How I Learn directions he gave for Version 3.
 *
 * Any block whose `body` is empty is not rendered — no placeholder box.
 * Contact details appear once in the fact sheet and once in the site footer.
 */
import type { Editable } from './types';

export interface AboutSection {
  id: string;
  kicker: string;
  title: string;
  body: string[];
  chips?: string[];
}

export interface EditableBlock {
  id: string;
  title: string;
  body: Editable;
}

/** One interest area in the Future Aspirations constellation. */
export interface InterestArea {
  id: string;
  label: string;
  /** A neutral one-line description of the field (not a claim about Lavan). */
  note: string;
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
    },
    {
      id: 'academic',
      kicker: 'I.',
      title: 'Academic background',
      body: [
        'I study Data Science. Along the way I have worked on Python-based AI and machine learning projects, and I am interested in AI, machine learning, deep learning, NLP and generative AI.',
        'What keeps me going is wanting to understand how intelligent systems actually work — and using technology to solve practical problems.',
      ],
    },
    {
      id: 'technical-interests',
      kicker: 'II.',
      title: 'Technical interests',
      body: ['The areas I am most drawn to:'],
      chips: ['Natural Language Processing', 'Machine Learning', 'Deep Learning', 'Computer Vision', 'Generative AI', 'Data Science'],
    },
    {
      id: 'skills',
      kicker: 'III.',
      title: 'Skills & tools',
      body: ['The languages and tools I work with:'],
      chips: ['Python', 'Java', 'SQL', 'TensorFlow', 'PyTorch', 'Streamlit', 'Power BI', 'Tableau', 'GitHub'],
    },
  ] satisfies AboutSection[],

  /** IV. How I learn — five headed sub-sections (Version 3 text, from Lavan's directions). */
  howILearn: {
    id: 'how-i-learn',
    kicker: 'IV.',
    title: 'How I learn',
    blocks: [
      {
        id: 'fundamentals',
        title: 'Understanding the Fundamentals',
        body: 'Before I implement something, I try to understand the idea underneath it — what problem it solves and why it works. Once the concept is clear, the code is easier to write, and much easier to reason about when something goes wrong.',
      },
      {
        id: 'implementation',
        title: 'Learning Through Implementation',
        body: 'A concept only really makes sense to me once I have applied it. I explore ideas by putting them into practical projects and small experiments. LexAudit, the team NLP project I worked on for CSI4001, is one example of this kind of hands-on work.',
      },
      {
        id: 'comparing',
        title: 'Comparing Different Approaches',
        body: 'There is rarely only one way to solve a problem. I like to look at alternative techniques, models and methods side by side, to understand where each one works well and where it falls short.',
      },
      {
        id: 'debugging',
        title: 'Learning Through Debugging',
        body: 'When an implementation does not behave the way I expect, I treat that as part of the learning. I investigate the problem, track down where the error comes from, and improve the solution through experimentation.',
      },
      {
        id: 'theory-applications',
        title: 'Connecting Theory with Applications',
        body: 'I am interested in how academic concepts turn into real-world applications. Seeing an idea from the classroom become part of a useful system helps me understand both the theory and why it matters.',
      },
    ] satisfies EditableBlock[],
  },

  /**
   * V. Future aspirations — one concise section.
   * Phrased as directions Lavan wants to keep exploring, NOT as confirmed career
   * goals or plans. TODO(lavan): edit `intro` / `closing` in your own words if you like.
   */
  aspirations: {
    id: 'aspirations',
    kicker: 'V.',
    title: 'Future aspirations',
    intro:
      'Rather than a fixed plan, these are the directions I want to keep exploring. What connects them is the question that draws me to this field: how intelligent systems actually work — and how they can be used to solve practical problems.',
    centre: 'How intelligent systems work',
    centreSub: 'and how they solve practical problems',
    areas: [
      { id: 'ai', label: 'Artificial Intelligence', note: 'systems that reason, decide and act' },
      { id: 'ml', label: 'Machine Learning', note: 'learning patterns from data' },
      { id: 'dl', label: 'Deep Learning', note: 'neural networks that learn representations' },
      { id: 'nlp', label: 'Natural Language Processing', note: 'machines working with human language' },
      { id: 'genai', label: 'Generative AI', note: 'models that produce new text and media' },
      { id: 'ds', label: 'Data Science', note: 'turning data into understanding' },
    ] satisfies InterestArea[],
    closing: 'These are interests I want to keep exploring — not finished achievements.',
  },
};
