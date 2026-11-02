/**
 * Projects That Made Me Think — six projects from Lavan's CSI4001 NLP class.
 *
 * Project 01 (LexAudit) is Lavan's own project. Projects 02–06 were presented by
 * classmates; Lavan explored and appreciated them but did not build them.
 *
 * Source of truth: Lavan's own brief (category, the four interesting points, his
 * reflection and his NLP lesson are his words, unchanged). `overview` and
 * `takeaway` only condense those same points — no new technical facts, metrics
 * or team names. Reflections are Lavan's own words, so no draft tags are shown.
 *
 * Visuals: when a presentation cover slide is available, add `coverImage`
 * (e.g. { src: '/images/class-projects/<id>-cover.webp', alt, width, height }).
 * It is shown in place of the title-based visual and opens in a larger view.
 */
export interface ProjectCover {
  src: string;
  alt: string;
  width: number;
  height: number;
}

export interface ClassProject {
  id: string;
  /** Display number, "01"–"06". */
  num: string;
  title: string;
  /** Short name for the page index. */
  shortTitle: string;
  category: string;
  /** true only for Lavan's own project. */
  mine: boolean;
  overview: string;
  /** Exactly four points, in Lavan's words. */
  points: [string, string, string, string];
  /** "What caught my attention" — Lavan's reflection, first person. */
  reflection: string;
  /** The one NLP lesson, in Lavan's words. */
  lesson: { title: string; text: string };
  takeaway: string;
  coverImage?: ProjectCover;
}

export const classProjects: ClassProject[] = [
  {
    id: 'lexaudit',
    num: '01',
    title: 'LexAudit',
    shortTitle: 'LexAudit',
    category: 'Legal NLP · Contract Coherence Analysis',
    mine: true,
    overview:
      'Contracts can fail quietly when their parts do not fit together. LexAudit reads a contract as one connected document and audits it for the places where it stops holding together.',
    points: [
      'Focuses on identifying coherence and consistency issues in legal contracts rather than simply extracting or summarizing their contents.',
      'Uses complementary analysis channels to address different aspects of contract coherence.',
      'Uses synthetic training pairs to support the unsupervised coherence-learning task.',
      'Connects NLP analysis with a practical legal-document auditing workflow.',
    ],
    reflection:
      'I like that the project approaches legal documents as connected pieces of information. Understanding whether individual clauses make sense is not enough; their relationships with the rest of the contract also matter.',
    lesson: {
      title: 'TEXTUAL COHERENCE',
      text: 'A document can contain grammatically correct sentences but still have contradictions or inconsistencies across sections. NLP needs to consider relationships between pieces of text, not just individual sentences.',
    },
    takeaway: 'Working on LexAudit taught me to judge a document by how its parts fit together, not only by how each part reads alone.',
  },
  {
    id: 'legal-case-retrieval',
    num: '02',
    title: 'Indian Legal Document Analysis and Similar Case Retrieval Using NLP',
    shortTitle: 'Indian Legal Case Retrieval',
    category: 'Semantic Search · Legal Information Retrieval',
    mine: false,
    overview:
      'Long Indian court judgments are hard to search by keywords alone. The project proposes a semantic search that breaks judgments into passages and retrieves similar cases by meaning.',
    points: [
      'Finds legally similar judgments even when they use different words to describe similar issues.',
      'Divides lengthy judgments into overlapping 500-word chunks with 100-word overlap.',
      'Converts text into 384-dimensional embeddings using all-MiniLM-L6-v2.',
      'Uses FAISS to retrieve similar passages and rank distinct judgments.',
    ],
    reflection:
      'I particularly like how it addresses the limitations of ordinary keyword search. A researcher can find relevant legal documents even when the wording is different.',
    lesson: {
      title: 'SEMANTIC EMBEDDINGS',
      text: 'Text can be represented as numerical vectors that capture aspects of meaning. This allows similarity-based retrieval beyond exact keyword matching. A similarity score does not represent the probability of legal equivalence.',
    },
    takeaway: 'It showed me that searching by meaning is powerful, but a similarity score is a signal to read carefully, not a verdict.',
  },
  {
    id: 'awareness-gap-miner',
    num: '03',
    title: 'Awareness Gap Miner',
    shortTitle: 'Awareness Gap Miner',
    category: 'Multilingual NLP · Intent and Gap Detection',
    mine: false,
    overview:
      'People can miss out on welfare schemes because the right information never reaches them. The project looks at what people write, across languages, to locate those gaps in awareness.',
    points: [
      'Identifies gaps in public awareness of welfare schemes rather than merely detecting sentiment.',
      'Works with English, Hindi and Hinglish.',
      'Groups similar complaints into themes to identify recurring information problems.',
      'Protects personal information and can return an unclear result when confidence is below 0.55 instead of guessing.',
    ],
    reflection:
      'The distinction between a normal question and an actual awareness gap is particularly interesting. It attempts to identify why people are not receiving the information or benefits they need.',
    lesson: {
      title: 'INTENT CLASSIFICATION AND MULTILINGUAL TEXT UNDERSTANDING',
      text: 'The meaning and intention behind a message matter more than simply identifying positive or negative sentiment. Similar concerns can also be expressed in different languages and wording.',
    },
    takeaway: 'It made me look past whether a message sounds positive or negative and ask what the writer actually needs.',
  },
  {
    id: 'crisis-bridge-ai',
    num: '04',
    title: 'Crisis Bridge AI',
    shortTitle: 'Crisis Bridge AI',
    category: 'Disaster Response · NLP · Retrieval-Augmented Generation',
    mine: false,
    overview:
      'During a disaster, urgent requests can be buried under a flood of messages. The project proposes turning raw disaster reports into structured, prioritised information that coordinators can question directly.',
    points: [
      'Extracts location, type of need and number of people affected from disaster reports.',
      'Calculates an urgency score to prioritize critical messages.',
      'Allows emergency coordinators to ask questions in natural language.',
      'Uses RAG to provide answers supported by actual reports, with an extractive fallback.',
    ],
    reflection:
      'I like the practical urgency of this idea. During disasters, important information can get buried among thousands of messages. This project tries to turn unstructured messages into actionable information.',
    lesson: {
      title: 'NAMED ENTITY RECOGNITION AND RAG',
      text: 'NLP can extract entities such as locations and quantities from unstructured messages. RAG can then retrieve relevant reports to support answers to natural-language questions.',
    },
    takeaway: 'It showed me how extraction and retrieval together can help people act when every minute counts.',
  },
  {
    id: 'deepshield-ai',
    num: '05',
    title: 'DeepShield AI',
    shortTitle: 'DeepShield AI',
    category: 'Audio Processing · Speech-to-Text · NLP',
    mine: false,
    overview:
      'A fake voice recording is hard to catch by listening alone. The project examines a recording through both its sound and its transcript, and brings the evidence together for review.',
    points: [
      'Combines audio-based deepfake detection with transcript-based verification.',
      'Uses Mel spectrograms and EfficientNet-B0 to examine acoustic patterns.',
      'Uses Whisper to convert speech into text for further NLP analysis.',
      'Combines linguistic evidence and acoustic evidence in one reviewable dashboard.',
    ],
    reflection:
      'I like the idea of examining the same audio from two perspectives. A voice recording can be analyzed through its sound characteristics as well as the language contained in its transcript.',
    lesson: {
      title: 'SPEECH-TO-TEXT AND LINGUISTIC FEATURE EXTRACTION',
      text: 'Transcribed speech can be examined for linguistic patterns, sentence similarity and repetition. However, repeated phrases alone cannot prove that audio is fake.',
    },
    takeaway: 'It taught me that language is one useful line of evidence, strongest when it is weighed alongside others.',
  },
  {
    id: 'smart-voice-ledger',
    num: '06',
    title: 'Smart Voice Ledger – Khata NLP',
    shortTitle: 'Smart Voice Ledger',
    category: 'Voice Interfaces · Code-Mixed Language Processing',
    mine: false,
    overview:
      'Many local business owners keep their accounts in everyday speech, not formal English. The project proposes a voice ledger that turns spoken, mixed-language transactions into records.',
    points: [
      'Allows local business owners to record transactions using their natural spoken language.',
      'Handles mixed-language expressions such as Telugu combined with English.',
      'Identifies the person, transaction amount and direction of money.',
      'Checks existing balances before updating financial records.',
    ],
    reflection:
      'I like how it considers the way people actually speak rather than expecting everyone to communicate in formal English. The distinction between money to be given and money to be received is especially important.',
    lesson: {
      title: 'CODE-MIXED LANGUAGE UNDERSTANDING AND INTENT EXTRACTION',
      text: 'Understanding a spoken sentence requires more than recognizing individual words. The system must understand transaction intent, amount, person and direction from the context.',
    },
    takeaway: 'It reminded me that useful NLP has to meet people in the language they actually speak.',
  },
];
