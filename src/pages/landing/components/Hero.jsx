export default function Hero({ onRequestAcademy }) {
  const scrollToShowcase = () => {
    const el = document.querySelector('#product');
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <section id="top" className="lp-hero">
      <div className="lp-container lp-hero-grid">
        <div className="lp-hero-text">
          <span className="lp-eyebrow"><i className="ti ti-sparkles" /> Built for Modern Sports Academies</span>
          <h1 className="lp-h1">
            From Silambam to Karate,<br />run your academy <span className="accent">better.</span>
          </h1>
          <p className="lp-hero-sub">
            Manage students, attendance, fees, batches, coaches, enquiries and academy operations —
            all from one powerful platform built for martial arts, ready for every sport.
          </p>
          <div className="lp-cta-row">
            <button className="lp-btn lp-btn--primary" onClick={onRequestAcademy}>
              Request to Create My Academy
            </button>
            <button className="lp-btn lp-btn--ghost" onClick={scrollToShowcase}>
              See How FeeZO Works
            </button>
          </div>
          <div className="lp-hero-trust">
            <span className="lp-hero-trust-item"><i className="ti ti-shield-check" /> Secure, cloud-based platform</span>
            <span className="lp-hero-trust-item"><i className="ti ti-devices" /> Works on any device</span>
            <span className="lp-hero-trust-item"><i className="ti ti-users-group" /> Role-based access</span>
          </div>
        </div>

        <div className="lp-hero-visual">
          <div className="lp-dashboard-mock">
            <div className="lp-mock-topbar">
              <span className="lp-mock-dot" /><span className="lp-mock-dot" /><span className="lp-mock-dot" />
              <span className="lp-mock-titlebar">FeeZO — Academy Dashboard</span>
            </div>
            <div className="lp-mock-body">
              <div className="lp-mock-card">
                <div className="lp-mock-stat-label">Attendance Today</div>
                <div className="lp-mock-stat-value lime">92%</div>
              </div>
              <div className="lp-mock-card">
                <div className="lp-mock-stat-label">Active Batches</div>
                <div className="lp-mock-stat-value blue">14</div>
              </div>
              <div className="lp-mock-card lp-mock-card--wide">
                <div className="lp-mock-stat-label">Weekly Attendance Trend</div>
                <div className="lp-mock-bars">
                  {[38, 52, 44, 61, 58, 70, 66].map((h, i) => (
                    <div key={i} className="lp-mock-bar" style={{ height: `${h}%`, animationDelay: `${i * 0.06}s` }} />
                  ))}
                </div>
              </div>
              <div className="lp-mock-card lp-mock-card--wide">
                <div className="lp-mock-stat-label">Recent Fees</div>
                <div style={{ marginTop: 8 }}>
                  <div className="lp-mock-list-row"><span>Aditya R. — Karate</span><span className="lp-mock-badge paid">Paid</span></div>
                  <div className="lp-mock-list-row"><span>Meera S. — Silambam</span><span className="lp-mock-badge due">Due</span></div>
                  <div className="lp-mock-list-row"><span>Rohan K. — Boxing</span><span className="lp-mock-badge paid">Paid</span></div>
                </div>
              </div>
            </div>
          </div>

          <div className="lp-hero-float-card a">
            <i className="ti ti-checkbox" /> Attendance marked
          </div>
          <div className="lp-hero-float-card b">
            <i className="ti ti-user-plus" /> New enquiry received
          </div>
        </div>
      </div>
    </section>
  );
}
