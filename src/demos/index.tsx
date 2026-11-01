import { lazy, Suspense } from 'react';
import type { DemoId } from '../content/syllabus';

const map: Record<DemoId, React.LazyExoticComponent<() => JSX.Element>> = {
  tokenizer: lazy(() => import('./Tokenizer')),
  stemmer: lazy(() => import('./Stemmer')),
  editDistance: lazy(() => import('./EditDistance')),
  bigram: lazy(() => import('./Bigram')),
  morphology: lazy(() => import('./Morphology')),
  cfg: lazy(() => import('./Cfg')),
  pos: lazy(() => import('./Pos')),
  wordnet: lazy(() => import('./WordNet')),
  sentiment: lazy(() => import('./Sentiment')),
  summarizer: lazy(() => import('./Summarizer')),
};

export default function Demo({ id }: { id: DemoId }) {
  const C = map[id];
  return (
    <Suspense fallback={<div className="h-40 animate-pulse border border-ink/10 bg-ivory-deep/50" aria-label="Loading demo" />}>
      <C />
    </Suspense>
  );
}
