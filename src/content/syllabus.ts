import { draft, type Reflection } from './types';

/**
 * CSI4001 learning notebook — 8 modules.
 *
 * `topicsConfirmed: false` means the concept list was chosen as standard topics that
 * clearly belong to the module title, and still needs checking against the official
 * syllabus. Flip to `true` once confirmed.
 *
 * Every first-person field (whatIKnewBefore, whatILearned, whatSurprisedMe, perspective)
 * is a DRAFT. Rewrite in your own words and change `draft(...)` to
 * `{ text: '...', status: 'approved' }`.
 *
 * `demo` links a concept to an interactive demo component (see src/demos/index.tsx).
 */
export type DemoId =
  | 'tokenizer'
  | 'stemmer'
  | 'editDistance'
  | 'bigram'
  | 'morphology'
  | 'cfg'
  | 'pos'
  | 'wordnet'
  | 'sentiment'
  | 'summarizer';

export interface Concept {
  id: string;
  name: string;
  whatIKnewBefore: Reflection;
  whatILearned: Reflection;
  simple: string;
  technical: string;
  example: string;
  whatSurprisedMe: Reflection;
  whereUsed: string;
  demo?: DemoId;
}

export interface Module {
  id: string;
  number: number;
  title: string;
  hours: number;
  topicsConfirmed: boolean;
  concepts: Concept[];
  /** Optional draft perspective paragraph for the whole module. */
  perspective?: Reflection;
}

export const syllabus: Module[] = [
  {
    id: 'm1',
    number: 1,
    title: 'Overview of NLP',
    hours: 4,
    topicsConfirmed: false,
    concepts: [
      {
        id: 'levels',
        name: 'Levels of linguistic analysis',
        whatIKnewBefore: draft('I thought of NLP mostly as "getting a computer to understand text", without thinking about the layers underneath.'),
        whatILearned: draft('Language can be studied at separate levels — word structure, sentence structure, meaning, and meaning in context — and many NLP tasks sit at one specific level.'),
        simple:
          'Understanding a sentence happens in layers: how words are built, how they are arranged, what they mean, and what the speaker intends in context.',
        technical:
          'The classical stack is phonology → morphology (word formation) → syntax (grammatical structure) → semantics (literal meaning) → pragmatics (meaning in context/intent) → discourse (relations across sentences). Pipelines historically mirrored these levels (tokenize, tag, parse, interpret); end-to-end neural models learn many of them implicitly.',
        example:
          '"Can you pass the salt?" — syntactically a yes/no question, semantically about ability, pragmatically a polite request.',
        whatSurprisedMe: draft('That a sentence can be grammatically a question but actually work as a request — the pragmatic level changes what the "right" answer is.'),
        whereUsed: 'Designing NLP pipelines; deciding which level a task (e.g. tagging vs. intent detection) operates on.',
      },
      {
        id: 'ambiguity',
        name: 'Ambiguity in natural language',
        whatIKnewBefore: draft('I knew some words have more than one meaning, but I did not realise how often whole sentences are ambiguous.'),
        whatILearned: draft('Ambiguity shows up at every level — lexical, structural, referential — and resolving it is one of the core problems of NLP.'),
        simple: 'The same words can often be read in more than one way, and people use context to choose the right reading without noticing.',
        technical:
          'Lexical ambiguity: one word form, multiple senses (bank). Structural/syntactic ambiguity: multiple valid parse trees (PP-attachment). Referential ambiguity: unclear pronoun antecedents (coreference). Systems resolve it with probabilities over analyses, context features, or contextual embeddings.',
        example: '"I saw the man with the telescope" — did I use the telescope, or did the man have it? Both parses are grammatical.',
        whatSurprisedMe: draft('How many parse trees a short, normal-looking sentence can have.'),
        whereUsed: 'Parsing, word sense disambiguation, coreference resolution, machine translation.',
      },
    ],
  },
  {
    id: 'm2',
    number: 2,
    title: 'Text Processing',
    hours: 6,
    topicsConfirmed: false,
    concepts: [
      {
        id: 'tokenization',
        name: 'Tokenization',
        whatIKnewBefore: draft('I assumed tokenizing meant splitting on spaces.'),
        whatILearned: draft('Even splitting text into words needs decisions about punctuation, contractions and numbers, and modern models split words into subword pieces.'),
        simple: 'Tokenization cuts raw text into units — sentences, words, characters, or word pieces — that a program can count and process.',
        technical:
          'Rule-based tokenizers use regular expressions for punctuation, clitics ("don\'t" → "do" + "n\'t" in Penn style) and abbreviations. Sentence segmentation must handle periods in "Dr." or "3.5". Subword tokenizers (BPE, WordPiece, SentencePiece) learn a vocabulary of frequent fragments so rare words become sequences of known pieces, avoiding out-of-vocabulary tokens.',
        example: '"unbelievable" might become ["un", "believ", "able"] in a subword vocabulary, so a model can still represent it even if it never saw the whole word.',
        whatSurprisedMe: draft('That the very first step of the pipeline already involves this many choices.'),
        whereUsed: 'The first step of almost every NLP system, including every transformer model’s input.',
        demo: 'tokenizer',
      },
      {
        id: 'stemming',
        name: 'Stemming vs. lemmatization',
        whatIKnewBefore: draft('I had heard the two terms but thought they were basically the same thing.'),
        whatILearned: draft('Stemming chops suffixes with rules and can produce non-words; lemmatization maps to a real dictionary form using vocabulary and part of speech.'),
        simple: 'Both reduce different forms of a word to a common base, so "running" and "runs" can be counted together.',
        technical:
          'The Porter stemmer applies ordered suffix-rewriting rules in five steps, conditioned on the "measure" m of the stem (the number of vowel–consonant sequences). It is fast but crude: "university" and "universe" both stem to "univers". A lemmatizer uses a lexicon plus morphological analysis and POS: "better" (adj) → "good", "was" → "be".',
        example: 'Porter: "relational" → "relat", "happiness" → "happi". Lemmatizer: "mice" → "mouse".',
        whatSurprisedMe: draft('That a stemmer’s output does not need to be a real word to be useful for search.'),
        whereUsed: 'Search engines and information retrieval, text normalisation before counting words.',
        demo: 'stemmer',
      },
      {
        id: 'edit-distance',
        name: 'Minimum edit distance',
        whatIKnewBefore: draft('I knew spell-checkers suggest close words, but not how "close" was measured.'),
        whatILearned: draft('Edit distance is computed with dynamic programming, filling a table where each cell reuses answers for smaller prefixes.'),
        simple: 'Edit distance counts the fewest insertions, deletions and substitutions needed to turn one word into another.',
        technical:
          'D[i][j] = min(D[i-1][j] + 1 (deletion), D[i][j-1] + 1 (insertion), D[i-1][j-1] + (0 if a_i = b_j else sub_cost)). With sub_cost = 1 it is Levenshtein distance; some textbooks use sub_cost = 2. Complexity O(nm); backtracing through the table gives an alignment.',
        example: '"intention" → "execution" has Levenshtein distance 5.',
        whatSurprisedMe: draft('How a small table makes a problem with huge numbers of possible edit sequences easy.'),
        whereUsed: 'Spelling correction, fuzzy search, DNA sequence alignment, evaluating speech recognition (word error rate).',
        demo: 'editDistance',
      },
    ],
  },
  {
    id: 'm3',
    number: 3,
    title: 'N-Gram Language Models',
    hours: 8,
    topicsConfirmed: false,
    concepts: [
      {
        id: 'ngram',
        name: 'N-gram models & maximum likelihood estimation',
        whatIKnewBefore: draft('I knew phone keyboards predict the next word, but I had never seen the probability behind it.'),
        whatILearned: draft('An n-gram model approximates the probability of a word using only the previous n−1 words, estimated by counting.'),
        simple: 'A language model guesses how likely the next word is, given the words before it — here, just by counting how often word pairs appear.',
        technical:
          'By the chain rule P(w1..wn) = Π P(wi | w1..wi−1). The Markov assumption truncates history: a bigram model uses P(wi | wi−1). The MLE estimate is P(wi | wi−1) = C(wi−1 wi) / C(wi−1). Sentences are padded with <s> and </s> markers.',
        example: 'If "I am" appears 2 times and "I" appears 3 times, P(am | I) = 2/3.',
        whatSurprisedMe: draft('That such a simple counting idea is the ancestor of today’s large language models, which also predict the next token.'),
        whereUsed: 'Predictive keyboards, speech recognition and spelling correction (as a prior), baseline language models.',
        demo: 'bigram',
      },
      {
        id: 'smoothing',
        name: 'Smoothing (Laplace)',
        whatIKnewBefore: draft('I had not thought about what happens when a word pair never appears in the training text.'),
        whatILearned: draft('Unseen n-grams get probability zero under MLE, which breaks the whole sentence probability, so smoothing moves some probability mass to them.'),
        simple: 'Smoothing pretends every word pair was seen at least a little, so nothing gets a probability of exactly zero.',
        technical:
          'Add-one (Laplace): P(wi | wi−1) = (C(wi−1 wi) + 1) / (C(wi−1) + V), where V is the vocabulary size. It is simple but moves too much mass to unseen events; add-k, Good–Turing, interpolation, backoff and Kneser–Ney are better alternatives.',
        example: 'With V = 10, an unseen bigram after a word seen 3 times gets (0 + 1) / (3 + 10) ≈ 0.077 instead of 0.',
        whatSurprisedMe: draft('How much Laplace smoothing lowers the probabilities of the pairs that were actually seen.'),
        whereUsed: 'Any count-based model: language models, Naive Bayes text classifiers.',
        demo: 'bigram',
      },
      {
        id: 'perplexity',
        name: 'Perplexity',
        whatIKnewBefore: draft('I did not know how a language model is evaluated without a downstream task.'),
        whatILearned: draft('Perplexity is the inverse probability of the test text, normalised by its length — lower is better.'),
        simple: 'Perplexity measures how "surprised" a model is by new text; a less surprised model is a better model.',
        technical:
          'PP(W) = P(w1..wN)^(−1/N) = exp(−(1/N) Σ log P(wi | history)). It can be read as the weighted average branching factor. Perplexities are only comparable across models with the same vocabulary and test set.',
        example: 'A model that is uniformly unsure among 10 words at every step has perplexity 10.',
        whatSurprisedMe: draft('That a single unseen bigram without smoothing makes perplexity infinite.'),
        whereUsed: 'Intrinsic evaluation of language models, from n-grams to transformers.',
        demo: 'bigram',
      },
    ],
  },
  {
    id: 'm4',
    number: 4,
    title: 'Morphology and Context-Free Grammar',
    hours: 7,
    topicsConfirmed: false,
    concepts: [
      {
        id: 'morphology',
        name: 'Inflectional & derivational morphology',
        whatIKnewBefore: draft('I knew words have prefixes and suffixes from school grammar, but not the formal terms.'),
        whatILearned: draft('Morphemes are the smallest meaningful units; inflection changes grammatical features while derivation can create a new word, often of a new class.'),
        simple: 'Words are built from pieces: a root plus prefixes and suffixes, each adding a bit of meaning.',
        technical:
          'Inflectional morphemes mark tense, number, case, etc. without changing the word class (walk → walked). Derivational morphemes create new lexemes and may change class (happy[adj] → happiness[noun]). Morphological parsing is classically done with finite-state transducers mapping surface forms to stem + features (e.g. cats → cat +N +PL).',
        example: '"unhappiness" = un- (prefix, negation) + happy (root) + -ness (suffix, adjective → noun).',
        whatSurprisedMe: draft('That spelling changes like happy → happi- need their own rules (orthographic rules).'),
        whereUsed: 'Morphological analysers for morphologically rich languages (e.g. many Indian languages), lemmatizers, subword modelling.',
        demo: 'morphology',
      },
      {
        id: 'cfg',
        name: 'Context-free grammars & parse trees',
        whatIKnewBefore: draft('I had seen grammars in a compilers or theory-of-computation context, not for English.'),
        whatILearned: draft('The same idea of production rules can describe the phrase structure of natural language sentences, though natural language is much more ambiguous.'),
        simple: 'A grammar is a set of rules that says how words combine into phrases and phrases into sentences; a parse tree shows that structure.',
        technical:
          'A CFG is G = (N, Σ, R, S): non-terminals (S, NP, VP, PP), terminals (words), rules A → β, and a start symbol. Parsing algorithms include CKY (requires Chomsky Normal Form, O(n³)) and Earley. Probabilistic CFGs attach a probability to each rule to choose among ambiguous parses.',
        example: 'S → NP VP; NP → Det N; VP → V NP. "the cat chased a mouse" fits these rules.',
        whatSurprisedMe: draft('That a theory-of-computation tool turned out to be directly useful for describing English.'),
        whereUsed: 'Syntactic parsing, grammar checking, and as a foundation for treebanks used to train parsers.',
        demo: 'cfg',
      },
    ],
  },
  {
    id: 'm5',
    number: 5,
    title: 'Part of Speech Tagging',
    hours: 7,
    topicsConfirmed: false,
    concepts: [
      {
        id: 'pos-tags',
        name: 'POS tags & the Penn Treebank tagset',
        whatIKnewBefore: draft('I knew nouns, verbs and adjectives, but not that taggers use 36+ fine-grained tags.'),
        whatILearned: draft('Tagsets like Penn Treebank distinguish forms such as VBD (past tense) and VBZ (3rd person singular present), and many words are ambiguous between tags.'),
        simple: 'POS tagging labels each word with its grammatical role — noun, verb, adjective — based on the word and its context.',
        technical:
          'The Penn Treebank tagset has 36 word tags (plus punctuation tags), e.g. NN, NNS, NNP, VB, VBD, VBG, VBZ, JJ, RB, DT, IN, PRP. Tagging is sequence labelling: assign a tag to every token. Approaches: rule-based, HMM, CRF, and neural (BiLSTM / transformer) taggers.',
        example: '"book" is NN in "read the book" but VB in "book a flight".',
        whatSurprisedMe: draft('How often a common word can take more than one tag depending on the sentence.'),
        whereUsed: 'A feature for parsing, named entity recognition, lemmatization and text-to-speech (e.g. "record" noun vs. verb pronunciation).',
        demo: 'pos',
      },
      {
        id: 'hmm',
        name: 'HMM tagging & the Viterbi algorithm',
        whatIKnewBefore: draft('I had not met hidden Markov models before this course.'),
        whatILearned: draft('An HMM treats tags as hidden states and words as observations, and Viterbi finds the single most likely tag sequence efficiently.'),
        simple: 'The tagger asks: which sequence of tags best explains these words, considering both how likely each word is for a tag and how tags usually follow each other?',
        technical:
          'argmax over t1..tn of Π P(wi | ti) · P(ti | ti−1). Emission probabilities P(w|t) and transition probabilities P(t|t−1) are estimated by counting a tagged corpus. Viterbi is dynamic programming over a states × positions lattice, O(N·T²) for T tags and N words, with backpointers to recover the best path.',
        example: 'For "they can fish", Viterbi weighs "can" as MD vs. VB using the transition from PRP and the following word.',
        whatSurprisedMe: draft('That Viterbi uses the same dynamic-programming idea as edit distance.'),
        whereUsed: 'Classic POS taggers, speech recognition, and as the inference step in CRF-based sequence labellers.',
      },
    ],
  },
  {
    id: 'm6',
    number: 6,
    title: 'Lexical Semantics',
    hours: 6,
    topicsConfirmed: false,
    concepts: [
      {
        id: 'wordnet',
        name: 'Word senses & WordNet relations',
        whatIKnewBefore: draft('I used a thesaurus for synonyms but did not know there was a structured lexical database behind NLP tools.'),
        whatILearned: draft('WordNet groups words into synsets (sets of synonyms for one sense) and links them by relations like hypernymy and meronymy.'),
        simple: 'Words can have several meanings (senses). WordNet lists each sense separately and connects it to broader, narrower and related meanings.',
        technical:
          'Synset: a set of lemmas sharing one sense, with a gloss. Relations: hypernym (is-a, more general), hyponym (more specific), meronym/holonym (part-whole), antonym (between lemmas). Homonymy = unrelated senses sharing a form (bank: river side vs. financial institution); polysemy = related senses (bank the institution vs. the building).',
        example: 'bank (sloping land) → hypernym "slope"; bank (financial institution) → hypernym "financial institution".',
        whatSurprisedMe: draft('How many separate senses WordNet lists for a common word like "bank".'),
        whereUsed: 'Word sense disambiguation, query expansion in search, semantic similarity measures.',
        demo: 'wordnet',
      },
      {
        id: 'wsd',
        name: 'Word sense disambiguation (Lesk)',
        whatIKnewBefore: draft('I assumed context makes the meaning obvious, without thinking about how a program would use that context.'),
        whatILearned: draft('The simplified Lesk algorithm picks the sense whose dictionary definition shares the most words with the surrounding context.'),
        simple: 'To decide which meaning of a word is intended, compare the words around it with each meaning’s definition and pick the best overlap.',
        technical:
          'Simplified Lesk: for each sense s of the target word, score = |context words ∩ (gloss(s) ∪ examples(s))| (excluding stopwords), and choose argmax. Supervised WSD trains classifiers on sense-tagged corpora (e.g. SemCor); modern systems use contextual embeddings and nearest sense embeddings.',
        example: 'In "deposit money in the bank", "money" and "deposit" overlap the financial sense’s gloss, not the river sense.',
        whatSurprisedMe: draft('That a simple overlap count works reasonably often.'),
        whereUsed: 'Machine translation, information retrieval, lexical simplification.',
      },
    ],
  },
  {
    id: 'm7',
    number: 7,
    title: 'Application of NLP',
    hours: 5,
    topicsConfirmed: false,
    concepts: [
      {
        id: 'sentiment',
        name: 'Sentiment analysis',
        whatIKnewBefore: draft('I thought sentiment analysis just counted happy and sad words.'),
        whatILearned: draft('Even lexicon methods need rules for negation, intensifiers and contrast, and learned classifiers handle context better.'),
        simple: 'Sentiment analysis decides whether a piece of text expresses a positive, negative or neutral opinion.',
        technical:
          'Lexicon-based: sum word valences, flip or dampen after negators ("not good"), scale for intensifiers ("very"), weight clauses after "but". Supervised: Naive Bayes / logistic regression on bag-of-words or n-grams; neural: fine-tuned transformers. Aspect-based variants attach sentiment to specific targets.',
        example: '"The food was not bad" is mildly positive, even though "bad" is negative.',
        whatSurprisedMe: draft('How much "but" changes the overall feeling of a sentence.'),
        whereUsed: 'Product review mining, social media monitoring, customer feedback triage.',
        demo: 'sentiment',
      },
      {
        id: 'summarization',
        name: 'Text summarization',
        whatIKnewBefore: draft('I mainly knew summarization from AI chat tools that write new sentences.'),
        whatILearned: draft('There are two families: extractive systems pick existing sentences, abstractive systems generate new text.'),
        simple: 'Summarization shortens a document while keeping its main points — either by picking key sentences or by rewriting.',
        technical:
          'Extractive: score sentences (word frequency, TF-IDF, position, graph centrality as in TextRank) and select the top-k. Abstractive: sequence-to-sequence models (e.g. PEGASUS, BART) generate a summary token by token. Evaluation commonly uses ROUGE overlap with reference summaries.',
        example: 'A frequency-based extractor keeps the sentences whose content words appear most often in the document.',
        whatSurprisedMe: draft('That a very simple frequency method can already produce a usable extractive summary for short texts.'),
        whereUsed: 'News digests, meeting notes, document triage.',
        demo: 'summarizer',
      },
      {
        id: 'mt',
        name: 'Machine translation',
        whatIKnewBefore: draft('I used online translators but did not know how they had changed over time.'),
        whatILearned: draft('MT moved from rule-based to statistical phrase-based systems to neural encoder–decoder models with attention.'),
        simple: 'Machine translation converts text from one language to another while trying to keep the meaning.',
        technical:
          'Rule-based MT uses bilingual dictionaries and transfer rules; statistical MT (SMT) combines a translation model and a language model learned from parallel corpora; neural MT uses encoder–decoder transformers with attention. Quality is often measured with BLEU or chrF against reference translations.',
        example: 'Word order differs between English (SVO) and Hindi or Tamil (SOV), so translation cannot be word-by-word.',
        whatSurprisedMe: draft('That a language model is part of the statistical translation recipe, linking back to n-grams.'),
        whereUsed: 'Translation tools, multilingual customer support, access to information across Indian languages.',
      },
    ],
  },
  {
    id: 'm8',
    number: 8,
    title: 'Contemporary Issues',
    hours: 2,
    topicsConfirmed: false,
    perspective: draft(
      'These issues made me realise that building an NLP system is not only a technical exercise — who the data represents, and how confidently a model speaks, matter as much as accuracy.'
    ),
    concepts: [
      {
        id: 'bias',
        name: 'Bias in language technology',
        whatIKnewBefore: draft('I had heard that AI can be biased, but thought of it as a rare bug.'),
        whatILearned: draft('Models learn statistical patterns from their training data, so social biases present in text can be reproduced or amplified.'),
        simple: 'If the text a model learns from treats groups of people unfairly, the model can repeat that unfairness.',
        technical:
          'Bias can enter via data (skewed or stereotyped corpora), representation (associations encoded in word embeddings), annotation (labeller disagreement or bias) and evaluation (test sets that do not cover all user groups). Mitigation includes data auditing, counterfactual data augmentation, debiasing representations and disaggregated evaluation.',
        example: 'An embedding model associating certain professions more strongly with one gender than another.',
        whatSurprisedMe: draft('That bias can be measured inside embeddings themselves, not just in final outputs.'),
        whereUsed: 'Responsible deployment of hiring tools, content moderation, machine translation.',
      },
      {
        id: 'hallucination',
        name: 'Hallucination in generative models',
        whatIKnewBefore: draft('I had seen chatbots give confident wrong answers without knowing there was a name for it.'),
        whatILearned: draft('Generative models produce fluent text by predicting likely tokens, which is not the same as checking facts.'),
        simple: 'A hallucination is when a model confidently writes something that sounds right but is false or unsupported by its sources.',
        technical:
          'Language models are trained to maximise the likelihood of plausible continuations; nothing in that objective guarantees factual grounding. Mitigations include retrieval-augmented generation (grounding on retrieved documents), citation/attribution checks, constrained decoding, and abstaining when uncertain.',
        example: 'A summarizer adding a date or name that does not appear anywhere in the source document.',
        whatSurprisedMe: draft('That fluency and correctness are separate properties.'),
        whereUsed: 'Evaluating chatbots, summarizers and question-answering systems; motivating RAG.',
      },
      {
        id: 'low-resource',
        name: 'Low-resource & Indian languages',
        whatIKnewBefore: draft('I assumed most languages with many speakers would have good NLP tools.'),
        whatILearned: draft('Speaker count and digital text availability are different things; many Indian languages have far less annotated data than English.'),
        simple: 'Many languages lack the large datasets that modern NLP depends on, so tools for them lag behind.',
        technical:
          'Challenges include limited parallel and annotated corpora, multiple scripts, rich morphology, and code-mixing (e.g. Hindi–English in Latin script). Approaches: multilingual pre-training with transfer learning, script unification, back-translation, and community data collection (e.g. AI4Bharat’s IndicTrans2 and its BPCC corpus).',
        example: 'Code-mixed text such as "kal meeting hai, don’t forget" mixes two languages in one sentence.',
        whatSurprisedMe: draft('How much code-mixing complicates even basic steps like tokenization and language identification.'),
        whereUsed: 'Translation and speech tools for Indian languages, government and education services.',
      },
    ],
  },
];

export const totalHours = syllabus.reduce((s, m) => s + m.hours, 0);
