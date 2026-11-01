/**
 * Concepts used by the Connection Map on /exhibits.
 * `module` links to the related CSI4001 module id in syllabus.ts (null if none).
 * Which exhibits link to which concepts is defined on each exhibit (`concepts`).
 */
export type ConceptId =
  | 'tokenization'
  | 'lm'
  | 'seqmodel'
  | 'attention'
  | 'embeddings'
  | 'tagging'
  | 'classification'
  | 'retrieval'
  | 'lexicon'
  | 'generation'
  | 'multilingual'
  | 'speech';

export interface MapConcept {
  id: ConceptId;
  label: string;
  blurb: string;
  module: string | null;
}

export const mapConcepts: MapConcept[] = [
  { id: 'tokenization', label: 'Tokenization', blurb: 'Splitting text into units a model can process.', module: 'm2' },
  { id: 'lm', label: 'Language modelling', blurb: 'Predicting the probability of the next token.', module: 'm3' },
  { id: 'seqmodel', label: 'Sequence modelling', blurb: 'Models that map whole sequences to sequences.', module: 'm5' },
  { id: 'attention', label: 'Attention', blurb: 'Weighting other tokens when representing one token.', module: null },
  { id: 'embeddings', label: 'Embeddings', blurb: 'Dense vectors that capture meaning.', module: 'm6' },
  { id: 'tagging', label: 'Sequence labelling', blurb: 'Assigning a label to every token.', module: 'm5' },
  { id: 'classification', label: 'Classification', blurb: 'Assigning a label to a whole input.', module: 'm7' },
  { id: 'retrieval', label: 'Retrieval', blurb: 'Finding relevant text in a large collection.', module: null },
  { id: 'lexicon', label: 'Lexicons & rules', blurb: 'Hand-built word lists and rules.', module: 'm7' },
  { id: 'generation', label: 'Text generation', blurb: 'Producing new text token by token.', module: 'm7' },
  { id: 'multilingual', label: 'Multilinguality', blurb: 'Working across many languages and scripts.', module: 'm8' },
  { id: 'speech', label: 'Speech', blurb: 'Turning audio into language.', module: null },
];
