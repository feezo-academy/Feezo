import useScrollReveal from '../useScrollReveal';

const STEPS = [
  {
    num: '01',
    title: 'Request Your Academy',
    desc: 'Tell us about your academy — sports, student count, and what you need FeeZO to handle.',
  },
  {
    num: '02',
    title: 'Our Team Contacts You',
    desc: 'Our admin team reviews your requirements and reaches out on your preferred channel and time.',
  },
  {
    num: '03',
    title: 'Your FeeZO Academy Is Created',
    desc: 'We configure your academy in FeeZO and hand you access — ready to run from day one.',
  },
];

export default function HowItWorks({ onRequestAcademy }) {
  const revealRef = useScrollReveal();

  return (
    <section id="how-it-works" className="lp-section">
      <div className="lp-container">
        <div className="lp-section-head reveal" ref={revealRef}>
          <span className="lp-eyebrow"><i className="ti ti-route" /> Simple Setup</span>
          <h2 className="lp-h2">From request to running academy.</h2>
          <p className="lp-sub" style={{ margin: '0 auto' }}>
            You don't self-serve a new academy — our team sets it up with you, so it's configured right.
          </p>
        </div>

        <div className="lp-steps reveal-stagger" ref={revealRef}>
          {STEPS.map((s) => (
            <div className="lp-step" key={s.num}>
              <div className="lp-step-num">{s.num}</div>
              <div className="lp-step-title">{s.title}</div>
              <div className="lp-step-desc">{s.desc}</div>
            </div>
          ))}
        </div>

        <div style={{ textAlign: 'center', marginTop: 40 }}>
          <button className="lp-btn lp-btn--primary" onClick={onRequestAcademy}>
            Request to Create My Academy
          </button>
        </div>
      </div>
    </section>
  );
}
