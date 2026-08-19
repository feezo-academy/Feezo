import { useState } from 'react';
import useScrollReveal from '../useScrollReveal';

const FAQS = [
  { q: 'What is FeeZO?', a: 'FeeZO is an all-in-one academy management platform for sports and martial arts academies — covering students, attendance, fees, batches, coaches, enquiries and reporting in one place.' },
  { q: 'Who can use FeeZO?', a: 'Any sports academy — from a single-coach Silambam or karate studio to a multi-sport academy with several coaches and batches.' },
  { q: 'Is FeeZO only for martial arts academies?', a: "No. FeeZO was shaped by martial arts academies first, but it's built to run any sport — from cricket and swimming to chess and dance." },
  { q: 'Can I manage a Silambam academy?', a: 'Yes — Silambam is one of the core sports FeeZO was designed around.' },
  { q: 'Can I manage a Karate academy?', a: 'Yes — karate, taekwondo, kung fu and other martial arts are core to FeeZO.' },
  { q: 'Can I manage multiple sports?', a: 'Yes. Students can be enrolled across multiple sports and batches, tracked individually per enrollment.' },
  { q: 'Can I manage student attendance?', a: 'Yes — mark attendance per batch, lock completed registers, and bulk-import attendance from spreadsheets.' },
  { q: 'Can I manage fees?', a: 'Yes — track dues, payments and status per student per enrollment, with a clear paid / due / partial view.' },
  { q: 'Can I manage batches?', a: 'Yes — organize students into batches by sport and level.' },
  { q: 'Can I manage coaches?', a: 'Yes — staff/coach accounts with role-based access to the relevant sports and batches.' },
  { q: 'How do I create my academy?', a: 'Submit a "Request to Create My Academy" — our team reviews your requirements and sets up your academy for you.' },
  { q: 'How does the academy setup process work?', a: 'You submit a request, our admin team contacts you to confirm details, then we configure your academy and hand you access.' },
  { q: 'Can I change my plan later?', a: 'Yes — reach out to our team and we\u2019ll help you move to a different plan as your academy grows.' },
];

export default function FAQ() {
  const [openIdx, setOpenIdx] = useState(0);
  const revealRef = useScrollReveal();

  return (
    <section id="faq" className="lp-section lp-section--light">
      <div className="lp-container">
        <div className="lp-section-head reveal" ref={revealRef}>
          <span className="lp-eyebrow" style={{ color: '#1b53c9', background: 'rgba(61,107,255,0.1)', borderColor: 'rgba(61,107,255,0.25)' }}>
            <i className="ti ti-help-circle" /> FAQ
          </span>
          <h2 className="lp-h2" style={{ color: '#0c1120' }}>Questions, answered.</h2>
        </div>

        <div className="lp-faq-list">
          {FAQS.map((item, i) => (
            <div key={item.q} className={`lp-faq-item ${openIdx === i ? 'open' : ''}`} style={{ borderColor: 'rgba(12,17,32,0.1)' }}>
              <button
                className="lp-faq-q"
                style={{ color: '#0c1120' }}
                onClick={() => setOpenIdx(openIdx === i ? -1 : i)}
              >
                {item.q}
                <i className="ti ti-plus" />
              </button>
              <div className="lp-faq-a">
                <p style={{ color: '#5b6577' }}>{item.a}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
