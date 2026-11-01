import { useState } from 'react';
import DemoFrame, { segBtn } from './DemoFrame';

/**
 * Senses of "bank" following Princeton WordNet 3.0 (abridged: 9 of 10 noun senses, 4 of 8 verb senses).
 * Static data, transcribed — not queried live.
 */
const SENSES = [
  { id: 'bank.n.01', pos: 'noun', lemmas: ['bank'], gloss: 'sloping land (especially the slope beside a body of water)', ex: 'they pulled the canoe up on the bank', hyper: ['slope', 'geological formation', 'object', 'physical entity', 'entity'] },
  { id: 'depository_financial_institution.n.01', pos: 'noun', lemmas: ['depository financial institution', 'bank', 'banking concern', 'banking company'], gloss: 'a financial institution that accepts deposits and channels the money into lending activities', ex: 'he cashed a check at the bank', hyper: ['financial institution', 'institution', 'organization', 'social group', 'group', 'abstraction', 'entity'], hypo: ['commercial bank', 'credit union'] },
  { id: 'bank.n.03', pos: 'noun', lemmas: ['bank'], gloss: 'a long ridge or pile', ex: 'a huge bank of earth', hyper: ['ridge'] },
  { id: 'bank.n.04', pos: 'noun', lemmas: ['bank'], gloss: 'an arrangement of similar objects in a row or in tiers', ex: 'he operated a bank of switches', hyper: ['array'] },
  { id: 'bank.n.05', pos: 'noun', lemmas: ['bank'], gloss: 'a supply or stock held in reserve for future use (especially in emergencies)', hyper: ['reserve', 'backlog', 'stockpile'] },
  { id: 'bank.n.07', pos: 'noun', lemmas: ['bank', 'cant', 'camber'], gloss: 'a slope in the turn of a road or track; the outside is higher than the inside in order to reduce the effects of centrifugal force', hyper: ['slope'] },
  { id: 'savings_bank.n.02', pos: 'noun', lemmas: ['savings bank', 'coin bank', 'money box', 'bank'], gloss: 'a container (usually with a slot in the top) for keeping money at home', hyper: ['container'] },
  { id: 'bank.n.09', pos: 'noun', lemmas: ['bank', 'bank building'], gloss: 'a building in which the business of banking transacted', ex: 'the bank is on the corner of Nassau and Witherspoon', hyper: ['depository'] },
  { id: 'bank.n.10', pos: 'noun', lemmas: ['bank'], gloss: 'a flight maneuver; aircraft tips laterally about its longitudinal axis (especially in turning)', hyper: ['flight maneuver'] },
  { id: 'bank.v.01', pos: 'verb', lemmas: ['bank'], gloss: 'tip laterally', ex: 'the pilot had to bank the aircraft' },
  { id: 'deposit.v.02', pos: 'verb', lemmas: ['deposit', 'bank'], gloss: 'put into a bank account', ex: 'She deposits her paycheck every month' },
  { id: 'bank.v.07', pos: 'verb', lemmas: ['bank'], gloss: 'cover with ashes so to control the rate of burning', ex: 'bank a fire' },
  { id: 'trust.v.01', pos: 'verb', lemmas: ['trust', 'swear', 'rely', 'bank'], gloss: 'have confidence or faith in', ex: 'bank on your good education' },
] as { id: string; pos: string; lemmas: string[]; gloss: string; ex?: string; hyper?: string[]; hypo?: string[] }[];

export default function WordNetDemo() {
  const [sel, setSel] = useState(SENSES[1].id);
  const s = SENSES.find((x) => x.id === sel)!;
  return (
    <DemoFrame title="WordNet relations · “bank”" toy="Static, abridged" note="Senses, glosses and relations transcribed from Princeton WordNet 3.0 (abridged). Notice homonymy (river bank vs. financial bank) and polysemy (the institution vs. the building).">
      <div className="grid gap-4 md:grid-cols-[minmax(0,1fr)_minmax(0,1.3fr)]">
        <ol className="max-h-[320px] space-y-1 overflow-auto pr-1" aria-label="Synsets">
          {SENSES.map((x) => (
            <li key={x.id}>
              <button type="button" aria-pressed={sel === x.id} onClick={() => setSel(x.id)} className={`w-full border px-2.5 py-1.5 text-left ${sel === x.id ? 'border-sage-deep bg-sage-deep text-ivory' : 'border-ink/15 bg-ivory hover:border-ink/40'}`}>
                <span className="block font-mono text-[11px] font-semibold">{x.id}</span>
                <span className="block truncate text-xs opacity-85">{x.gloss}</span>
              </button>
            </li>
          ))}
        </ol>
        <div className="border border-ink/15 bg-ivory p-4" aria-live="polite">
          <p className="font-mono text-[11px] uppercase tracking-wider text-sage-deep">{s.pos} · synset</p>
          <p className="mt-1 font-serif text-2xl leading-tight">{s.gloss}</p>
          {s.ex && <p className="mt-2 text-sm italic text-ink/75">“{s.ex}”</p>}
          <dl className="mt-4 space-y-3 text-sm">
            <div>
              <dt className="label text-sage-deep">synonyms (lemmas)</dt>
              <dd className="mt-1 flex flex-wrap gap-1.5">{s.lemmas.map((l) => <span key={l} className="border border-ink/20 px-2 py-0.5 font-mono text-xs">{l}</span>)}</dd>
            </div>
            {s.hyper && (
              <div>
                <dt className="label text-sage-deep">hypernym chain (is-a)</dt>
                <dd className="mt-1 font-mono text-xs leading-relaxed">bank → {s.hyper.join(' → ')}</dd>
              </div>
            )}
            {s.hypo && (
              <div>
                <dt className="label text-sage-deep">hyponyms (examples)</dt>
                <dd className="mt-1 font-mono text-xs">{s.hypo.join(' · ')}</dd>
              </div>
            )}
          </dl>
        </div>
      </div>
      <div className="mt-3 flex gap-2 font-mono text-[11px] text-ink/70">
        <span className={segBtn(false)}>{SENSES.filter((x) => x.pos === 'noun').length} noun senses shown</span>
        <span className={segBtn(false)}>{SENSES.filter((x) => x.pos === 'verb').length} verb senses shown</span>
      </div>
    </DemoFrame>
  );
}
