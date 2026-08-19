import { useMemo, useState } from 'react';
import { formatPrice, computeAnnualSavingsPercent } from '../../../lib/plansService';
import useScrollReveal from '../useScrollReveal';

// Plans are fetched once in LandingPage.jsx and passed down here (and to
// the Request Academy modal) so we don't hit Supabase twice for the same
// data. `loading`/`error` mirror that single fetch's state.
export default function Pricing({ plans, loading, error, onChoosePlan, onRequestDemo }) {
  const [annual, setAnnual] = useState(false);
  const revealRef = useScrollReveal();

  const sorted = useMemo(
    () => [...plans].sort((a, b) => a.sortOrder - b.sortOrder),
    [plans]
  );

  return (
    <section id="pricing" className="lp-section">
      <div className="lp-container">
        <div className="lp-section-head reveal" ref={revealRef}>
          <span className="lp-eyebrow"><i className="ti ti-tag" /> Simple Pricing</span>
          <h2 className="lp-h2">Plans that grow with your academy.</h2>
        </div>

        {!loading && sorted.length > 0 && (
          <div className="lp-toggle-row">
            <span className={`lp-toggle-label ${!annual ? 'active' : ''}`}>Monthly</span>
            <button
              className={`lp-toggle ${annual ? 'on' : ''}`}
              onClick={() => setAnnual((v) => !v)}
              aria-label="Toggle monthly / annual pricing"
            >
              <span className="lp-toggle-knob" />
            </button>
            <span className={`lp-toggle-label ${annual ? 'active' : ''}`}>Annual</span>
          </div>
        )}

        {loading && (
          <div className="lp-pricing-unavailable">Loading plans…</div>
        )}

        {!loading && (error || sorted.length === 0) && (
          <div className="lp-pricing-unavailable">
            <p style={{ marginBottom: 18, fontSize: 15.5 }}>Pricing is temporarily unavailable.</p>
            <button className="lp-btn lp-btn--primary" onClick={onRequestDemo}>
              Request a Free Demo
            </button>
          </div>
        )}

        {!loading && sorted.length > 0 && (
          <div className="lp-pricing-grid">
            {sorted.map((plan) => {
              const price = annual ? plan.priceAnnual : plan.priceMonthly;
              const savePct = annual ? computeAnnualSavingsPercent(plan) : null;
              const featureList = plan.highlights.length ? plan.highlights : plan.flagFeatures;

              return (
                <div key={plan.code} className={`lp-price-card ${plan.isRecommended ? 'recommended' : ''}`}>
                  {plan.isRecommended && <span className="lp-price-badge">Most Popular</span>}
                  <div className="lp-price-name">{plan.name}</div>
                  <div className="lp-price-tagline">{plan.tagline}</div>
                  <div className="lp-price-amount">
                    <span className="num">{formatPrice(price, plan.currency)}</span>
                    {price != null && <span className="per">/ {annual ? 'year' : 'month'}</span>}
                  </div>
                  <div className="lp-price-save">
                    {savePct != null ? `Save ${savePct}% with annual billing` : '\u00A0'}
                  </div>

                  {(plan.maxStudents || plan.maxStaff || plan.maxSports || plan.maxBatches) && (
                    <div className="lp-price-limits">
                      {plan.maxStudents ? `Up to ${plan.maxStudents} students · ` : ''}
                      {plan.maxStaff ? `${plan.maxStaff} staff · ` : ''}
                      {plan.maxSports ? `${plan.maxSports} sports · ` : ''}
                      {plan.maxBatches ? `${plan.maxBatches} batches` : ''}
                    </div>
                  )}

                  <ul className="lp-price-features">
                    {featureList.map((f) => (
                      <li key={f}><i className="ti ti-check" />{f}</li>
                    ))}
                  </ul>

                  <button
                    className={`lp-btn lp-btn--block ${plan.isRecommended ? 'lp-btn--primary' : 'lp-btn--ghost'}`}
                    onClick={() => onChoosePlan(plan.code)}
                  >
                    Choose {plan.name}
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
