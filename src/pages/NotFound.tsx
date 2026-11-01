import { Link } from 'react-router-dom';
import Page from '../components/Page';

export default function NotFound() {
  return (
    <Page className="page-x flex min-h-[70vh] flex-col justify-center py-20">
      <p className="label text-lime">Error 404 · out of vocabulary</p>
      <h1 className="mt-4 font-serif leading-[0.9]" style={{ fontSize: 'clamp(3rem, 10vw, 8rem)' }}>
        &lt;UNK&gt;
      </h1>
      <p className="mt-6 max-w-lg text-lg text-ivory/80">This page is not in the vocabulary. The model has no probability mass left for it.</p>
      <Link to="/" className="mt-8 inline-flex w-max bg-lime px-5 py-3 font-mono text-xs uppercase tracking-[0.18em] text-ink">Back to the cover</Link>
    </Page>
  );
}
