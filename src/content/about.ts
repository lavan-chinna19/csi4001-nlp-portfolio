/**
 * About page content.
 * The prose below is written ONLY from facts Lavan confirmed on 2026-11-01.
 * Anything in [square brackets] is a placeholder to replace.
 * Set a section's `placeholder: false` once you have written real text.
 */
export interface AboutSection {
  id: string;
  kicker: string;
  title: string;
  body: string[];
  placeholder: boolean;
  chips?: string[];
}

export const about = {
  title: 'The person behind the words',
  photo: {
    src: '/images/profile-placeholder.svg',
    alt: 'Placeholder for a portrait photo of Lavan Kumar',
    isPlaceholder: true,
  },

  /** Confirmed fact sheet. */
  facts: [
    { k: 'Name', v: 'Lavan Kumar' },
    { k: 'Registration no.', v: '23MID0108' },
    { k: 'Native place', v: 'Medak, Telangana, India' },
    { k: 'University', v: 'VIT Vellore' },
    { k: 'Degree', v: 'Data Science' },
    { k: 'Course', v: 'CSI4001 · NLP & Computational Linguistics · 4 credits' },
  ],

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
    {
      id: 'how-i-learn',
      kicker: 'IV.',
      title: 'How I learn',
      body: ['[Two or three honest lines about how you approach learning.]'],
      placeholder: true,
    },
    {
      id: 'aspirations',
      kicker: 'V.',
      title: 'Future aspirations',
      body: ['[Where would you like this to lead — research, industry, a particular problem?]'],
      placeholder: true,
    },
  ] satisfies AboutSection[],
};
