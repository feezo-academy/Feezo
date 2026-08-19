import useScrollReveal from '../useScrollReveal';

export default function FinalCTA({ onRequestAcademy }) {
  const revealRef = useScrollReveal();
  const scrollToPricing = () => {
    const el = document.querySelector('#pricing');
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <section className="lp-section">
      <div className="lp-container">
        <div className="lp-final-cta reveal" ref={revealRef}>
          <span className="lp-eyebrow"><i className="ti ti-rocket" /> Ready When You Are</span>
          <h2 className="lp-h2">Your academy deserves a better way to run.</h2>
          <p className="lp-sub">
            From Silambam and karate to every sport, FeeZO helps you manage your academy from one
            powerful platform.
          </p>
          <div className="lp-cta-row">
            <button className="lp-btn lp-btn--primary" onClick={onRequestAcademy}>
              Request to Create My Academy
            </button>
            <button className="lp-btn lp-btn--ghost" onClick={scrollToPricing}>
              View Plans
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
