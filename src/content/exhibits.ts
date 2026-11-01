import { draft, type Reflection } from './types';
import type { ConceptId } from './conceptMap';

/**
 * Exhibits: real open-source NLP projects. Every project URL was checked (HTTP 200)
 * on 2026-11-01. Images are the GitHub OpenGraph cards for each project, saved locally.
 * Factual fields are based on each project's own published description (and the papers it links).
 * First-person fields are DRAFTS until rewritten and set to status "approved".
 */
export interface Exhibit {
  id: string;
  name: string;
  repo: string; // owner/name
  href: string;
  image: string;
  imageAlt: string;
  field: string;
  whatItDoes: string;
  whatCaughtMyAttention: Reflection;
  whyILikedIt: Reflection;
  whatMakesItDifferent: string;
  whatILearned: Reflection;
  nlp: {
    representation: string;
    technique: string;
    ambiguity: string;
    output: string;
    problem: string;
  };
  takeaway: Reflection;
  concepts: ConceptId[];
  /** Optional factual status note from the project's own page. */
  statusNote?: string;
}

const og = (file: string) => `/images/exhibits/${file}.webp`;

export const exhibits: Exhibit[] = [
  {
    id: 'gector',
    name: 'GECToR',
    repo: 'grammarly/gector',
    href: 'https://github.com/grammarly/gector',
    image: og('grammarly_gector'),
    imageAlt: 'GitHub social card for the grammarly/gector project',
    field: 'Grammatical error correction',
    whatItDoes:
      'Corrects grammatical errors by tagging each token with an edit instead of rewriting the sentence — "Tag, Not Rewrite". Official PyTorch code for the Grammarly paper at the BEA workshop (ACL 2020).',
    whatCaughtMyAttention: draft('The title "Tag, Not Rewrite" — it turns a generation problem into a labelling problem.'),
    whyILikedIt: draft('It connects directly to sequence labelling from the POS tagging module, applied to a practical writing tool.'),
    whatMakesItDifferent:
      'Most correction systems are sequence-to-sequence "translators" from wrong to right text. GECToR keeps a transformer encoder and predicts one edit tag per token (keep, delete, append, replace, or grammatical transformations like changing verb form), applying them over a few iterations.',
    whatILearned: draft('Reframing a task can make it simpler and faster: you do not always need to generate text to change text.'),
    nlp: {
      representation: 'Subword tokens encoded by a pretrained transformer encoder (BERT, RoBERTa or XLNet in the released models).',
      technique: 'Token-level sequence tagging with a vocabulary of edit operations; iterative correction passes.',
      ambiguity: 'Contextual encoder representations decide whether a token needs an edit given its whole sentence.',
      output: 'Edit tags are applied to the input tokens to produce the corrected sentence.',
      problem: 'Automatic grammar correction for writers and language learners.',
    },
    takeaway: draft('Before building a generator, ask whether the output is really just a small set of edits to the input.'),
    concepts: ['tagging', 'embeddings', 'classification', 'tokenization'],
  },
  {
    id: 'indictrans2',
    name: 'IndicTrans2',
    repo: 'AI4Bharat/IndicTrans2',
    href: 'https://github.com/AI4Bharat/IndicTrans2',
    image: og('ai4bharat_indictrans2'),
    imageAlt: 'GitHub social card for the AI4Bharat/IndicTrans2 project',
    field: 'Machine translation · Indian languages',
    whatItDoes:
      'An open-source transformer-based multilingual neural machine translation model covering all 22 scheduled Indian languages, released with its training data (BPCC), back-translation data and the IN22 benchmark.',
    whatCaughtMyAttention: draft('That it covers all 22 scheduled languages, including ones with very little digital text.'),
    whyILikedIt: draft('It tackles the low-resource language problem from the Contemporary Issues module, specifically for Indian languages.'),
    whatMakesItDifferent:
      'It adopts script unification where feasible so related languages can share vocabulary and transfer learning, and it releases the datasets and evaluation benchmarks, not only the model.',
    whatILearned: draft('Data collection and open benchmarks are as much a part of the work as the model architecture.'),
    nlp: {
      representation: 'Subword vocabularies over unified scripts, letting related languages share tokens.',
      technique: 'Transformer encoder–decoder neural machine translation trained on large parallel corpora.',
      ambiguity: 'Attention over the full source sentence lets the decoder choose word senses and word order from context.',
      output: 'The decoder generates the target-language sentence token by token.',
      problem: 'Access to information across Indian languages, many of which are under-served by translation tools.',
    },
    takeaway: draft('Low-resource is a data problem first: sharing scripts and releasing corpora helps everyone after you.'),
    concepts: ['multilingual', 'attention', 'generation', 'seqmodel', 'tokenization'],
  },
  {
    id: 'whisper',
    name: 'Whisper',
    repo: 'openai/whisper',
    href: 'https://github.com/openai/whisper',
    image: og('openai_whisper'),
    imageAlt: 'GitHub social card for the openai/whisper project',
    field: 'Speech recognition',
    whatItDoes:
      'A general-purpose speech recognition model trained on a large, diverse audio dataset. One model performs multilingual speech recognition, speech translation and language identification.',
    whatCaughtMyAttention: draft('One model replaces several stages of a traditional speech pipeline.'),
    whyILikedIt: draft('The task is chosen by a few special tokens at the start of the output — nothing else changes.'),
    whatMakesItDifferent:
      'Tasks are represented as sequences of tokens predicted by the decoder. Special tokens act as task specifiers (transcribe vs. translate, language, timestamps), so one sequence-to-sequence transformer handles many tasks.',
    whatILearned: draft('A language model decoder can be steered to different tasks just by what you put at the start of its output.'),
    nlp: {
      representation: 'Audio converted to log-Mel spectrogram features for the encoder; text as byte-level BPE tokens for the decoder.',
      technique: 'Transformer sequence-to-sequence model with multitask training via special tokens.',
      ambiguity: 'The decoder acts as a language model, using previous tokens to resolve acoustically similar words.',
      output: 'Autoregressive decoding of text tokens, optionally with timestamps.',
      problem: 'Transcription and translation of speech across many languages and recording conditions.',
    },
    takeaway: draft('Framing tasks as tokens lets one model do many jobs without separate pipelines.'),
    concepts: ['speech', 'multilingual', 'attention', 'generation', 'lm', 'seqmodel'],
  },
  {
    id: 'gliner',
    name: 'GLiNER',
    repo: 'urchade/GLiNER',
    href: 'https://github.com/urchade/GLiNER',
    image: og('urchade_gliner'),
    imageAlt: 'GitHub social card for the urchade/GLiNER project',
    field: 'Named entity recognition',
    whatItDoes:
      'A framework for small named entity recognition models with zero-shot capabilities: you supply the entity types you want at inference time. It is designed to run on CPUs and consumer hardware.',
    whatCaughtMyAttention: draft('You can ask for entity types it was never specifically trained on, just by naming them.'),
    whyILikedIt: draft('It shows that a small bidirectional encoder can do flexible extraction without a huge generative model.'),
    whatMakesItDifferent:
      'Instead of a fixed label set, entity-type names are encoded alongside the text by a bidirectional transformer. Candidate spans are scored by matching span representations against entity-type representations.',
    whatILearned: draft('Treating labels as text to be embedded, not as fixed class IDs, is what makes zero-shot possible.'),
    nlp: {
      representation: 'Contextual token embeddings; span representations built from them; label embeddings from entity-type names.',
      technique: 'Bidirectional transformer encoder with span–label matching.',
      ambiguity: 'Bidirectional context decides whether "Apple" is an organisation or a fruit in a given sentence.',
      output: 'Spans whose match score with a requested label passes a threshold are returned as entities.',
      problem: 'Information extraction and PII detection with custom entity types and limited compute.',
    },
    takeaway: draft('If labels can be described in words, embed them — then new labels cost nothing to add.'),
    concepts: ['tagging', 'embeddings', 'classification', 'attention'],
  },
  {
    id: 'colbert',
    name: 'ColBERT',
    repo: 'stanford-futuredata/ColBERT',
    href: 'https://github.com/stanford-futuredata/ColBERT',
    image: og('stanford-futuredata_colbert'),
    imageAlt: 'GitHub social card for the stanford-futuredata/ColBERT project',
    field: 'Neural retrieval',
    whatItDoes:
      'A fast and accurate retrieval model for BERT-based search over large text collections, used for search and as the retriever in question answering and retrieval-augmented generation.',
    whatCaughtMyAttention: draft('Keeping one vector per token instead of squeezing a whole passage into a single vector.'),
    whyILikedIt: draft('It links retrieval to the hallucination problem: better retrieval gives generators better grounding.'),
    whatMakesItDifferent:
      '"Late interaction": passages are pre-encoded into a matrix of token-level embeddings; at search time each query token finds its most similar passage token (MaxSim) and those scores are summed. This is richer than single-vector similarity but still scales.',
    whatILearned: draft('Retrieval trades interaction detail against speed, and late interaction sits between the two extremes.'),
    nlp: {
      representation: 'Matrices of contextual token embeddings for queries and passages.',
      technique: 'BERT-based encoders with MaxSim late interaction and vector-similarity search.',
      ambiguity: 'Contextual token embeddings let the same word match differently depending on its surrounding text.',
      output: 'A ranked list of passages for a query.',
      problem: 'Finding relevant passages in large collections for search, QA and RAG.',
    },
    takeaway: draft('How you compare representations matters as much as how you build them.'),
    concepts: ['retrieval', 'embeddings', 'attention'],
  },
  {
    id: 'vader',
    name: 'VADER',
    repo: 'cjhutto/vaderSentiment',
    href: 'https://github.com/cjhutto/vaderSentiment',
    image: og('cjhutto_vadersentiment'),
    imageAlt: 'GitHub social card for the cjhutto/vaderSentiment project',
    field: 'Sentiment analysis',
    whatItDoes:
      'VADER (Valence Aware Dictionary and sEntiment Reasoner) is a lexicon- and rule-based sentiment analysis tool specifically attuned to sentiment expressed in social media.',
    whatCaughtMyAttention: draft('It handles ALL CAPS, slang like "sux", emoticons and "but" with explicit rules.'),
    whyILikedIt: draft('Every score can be traced back to a word rating and a rule, which makes it easy to understand.'),
    whatMakesItDifferent:
      'No training required: a human-rated lexicon (valence from −4 to +4) is combined with rules for punctuation, capitalisation, degree modifiers, negation and contrastive "but", giving positive/neutral/negative proportions and a normalised compound score.',
    whatILearned: draft('Rule-based systems are still useful when transparency and speed matter more than nuance.'),
    nlp: {
      representation: 'Tokens mapped to human-rated valence scores in a lexicon.',
      technique: 'Lexicon lookup plus heuristic rules.',
      ambiguity: 'Limited — rules for negation and contrast cover common cases; sarcasm and domain-specific meaning remain hard.',
      output: 'Positive, neutral, negative proportions and a compound score in [−1, 1].',
      problem: 'Quick, interpretable sentiment scoring for social-media-style text.',
    },
    takeaway: draft('A transparent baseline is worth having before reaching for a large model.'),
    concepts: ['lexicon', 'classification', 'tokenization'],
  },
  {
    id: 'pegasus',
    name: 'PEGASUS',
    repo: 'google-research/pegasus',
    href: 'https://github.com/google-research/pegasus',
    image: og('google-research_pegasus'),
    imageAlt: 'GitHub social card for the google-research/pegasus project',
    field: 'Abstractive summarization',
    whatItDoes:
      'Pre-training with Extracted Gap-sentences for Abstractive SUmmarization: a transformer encoder–decoder pre-trained with a self-supervised objective designed to resemble summarization (ICML 2020).',
    whatCaughtMyAttention: draft('The pre-training task itself looks like summarization.'),
    whyILikedIt: draft('It is the opposite of the extractive summarizer from the course: important sentences are hidden and regenerated, not selected.'),
    whatMakesItDifferent:
      'Gap Sentences Generation (GSG): whole important sentences are removed from a document and the model must generate them from the rest — closer to summarization than masking random words.',
    whatILearned: draft('Choosing a pre-training objective close to the downstream task can make fine-tuning more effective.'),
    nlp: {
      representation: 'Subword tokens with transformer contextual representations.',
      technique: 'Transformer encoder–decoder pre-trained with gap-sentence generation, then fine-tuned on summarization datasets.',
      ambiguity: 'Encoder attention over the whole document decides what is central enough to include.',
      output: 'An abstractive summary generated token by token.',
      problem: 'Condensing news articles and other long documents.',
    },
    takeaway: draft('Make the pre-training task look like the task you actually care about.'),
    concepts: ['generation', 'attention', 'lm', 'seqmodel'],
  },
  {
    id: 'rasa',
    name: 'Rasa',
    repo: 'RasaHQ/rasa',
    href: 'https://github.com/RasaHQ/rasa',
    image: og('rasahq_rasa'),
    imageAlt: 'GitHub social card for the RasaHQ/rasa project',
    field: 'Conversational AI',
    whatItDoes:
      'An open-source framework for building conversational assistants: NLU (intent classification and entity extraction) plus dialogue management.',
    whatCaughtMyAttention: draft('One model, DIET, predicts the intent of a message and the entities in it at the same time.'),
    whyILikedIt: draft('It shows classification and sequence labelling — two course ideas — working together in a real product.'),
    whatMakesItDifferent:
      'Its DIET classifier (Dual Intent and Entity Transformer) jointly learns intent classification and entity tagging from the same transformer representations, and dialogue policies decide the next action.',
    whatILearned: draft('Real systems often combine several NLP tasks in one model to share what they learn.'),
    nlp: {
      representation: 'Sparse and dense features of user messages fed into a transformer.',
      technique: 'Joint intent classification + entity extraction (DIET), then dialogue policies.',
      ambiguity: 'Conversation context and training stories help choose the next action when a message is unclear.',
      output: 'An intent label, extracted entities, and the assistant’s next action/response.',
      problem: 'Customer-support and task-oriented chatbots.',
    },
    takeaway: draft('Joint models can be simpler than separate ones when tasks share the same input.'),
    concepts: ['classification', 'tagging', 'attention', 'embeddings'],
    statusNote: 'Rasa Open Source is now in maintenance mode, with the company focusing on its newer CALM approach.',
  },
  {
    id: 'nanogpt',
    name: 'nanoGPT',
    repo: 'karpathy/nanoGPT',
    href: 'https://github.com/karpathy/nanoGPT',
    image: og('karpathy_nanogpt'),
    imageAlt: 'GitHub social card for the karpathy/nanoGPT project',
    field: 'Language modelling',
    whatItDoes:
      'A minimal codebase for training and fine-tuning medium-sized GPTs: a short training loop and a short GPT model definition that can load GPT-2 weights, with a small character-level Shakespeare example.',
    whatCaughtMyAttention: draft('A GPT model and its training loop fit in two short, readable files.'),
    whyILikedIt: draft('It connects the bigram counting from the n-gram module to how modern models predict the next token.'),
    whatMakesItDifferent:
      'Readability and minimalism: the training script and the model definition are each roughly 300 lines, making the full next-token-prediction training process inspectable.',
    whatILearned: draft('Next-token prediction is the same goal as an n-gram model; what changes is how much context and how the probabilities are computed.'),
    nlp: {
      representation: 'Token embeddings plus positional embeddings (characters or GPT-2 BPE tokens).',
      technique: 'Decoder-only transformer with causal self-attention, trained with cross-entropy on next-token prediction.',
      ambiguity: 'Self-attention over the preceding context weights which earlier tokens matter for the next one.',
      output: 'Sampling one token at a time from the predicted distribution.',
      problem: 'Understanding and experimenting with how GPT-style language models are trained.',
    },
    takeaway: draft('Read the smallest working version of a big idea before reading the big version.'),
    concepts: ['lm', 'generation', 'attention', 'tokenization', 'embeddings'],
    statusNote: 'Since a November 2025 update, nanoGPT is marked as old and deprecated, with nanochat as its successor.',
  },
];
