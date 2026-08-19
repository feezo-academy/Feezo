import { useState } from 'react';
import useScrollReveal from '../useScrollReveal';

const TABS = [
  {
    key: 'dashboard',
    label: 'Dashboard',
    title: 'A clear picture of your academy, every day',
    sub: "Today's attendance, active batches and fee status at a glance.",
    rows: [
      { label: "Today's Attendance", value: '92% present' },
      { label: 'Active Batches', value: '14 running' },
      { label: 'Fees Collected (Month)', value: 'Up to date' },
    ],
  },
  {
    key: 'students',
    label: 'Students',
    title: 'One profile per student, across every sport',
    sub: 'Multi-sport, multi-batch enrollments tracked individually — no mixed-up records.',
    rows: [
      { label: 'Aditya R.', value: 'Karate · Advanced Batch' },
      { label: 'Meera S.', value: 'Silambam · Beginner Batch' },
      { label: 'Rohan K.', value: 'Boxing + Fitness · 2 enrollments' },
    ],
  },
  {
    key: 'attendance',
    label: 'Attendance',
    title: 'Mark, lock and import attendance in seconds',
    sub: 'Per-sport registers with bulk marking, month view, and locked-day protection.',
    rows: [
      { label: 'Karate — Evening Batch', value: '18/20 present' },
      { label: 'Silambam — Morning Batch', value: 'Register locked' },
      { label: 'Boxing — Weekend Batch', value: 'Import review pending' },
    ],
  },
  {
    key: 'fees',
    label: 'Fees',
    title: 'Know exactly who owes what',
    sub: 'Per-enrollment fee tracking with clear paid / due / partial status.',
    rows: [
      { label: 'Aditya R.', value: 'Paid' },
      { label: 'Meera S.', value: 'Due ₹1,500' },
      { label: 'Rohan K.', value: 'Partial' },
    ],
  },
  {
    key: 'reports',
    label: 'Reports',
    title: 'Export what you need, when you need it',
    sub: 'PDF and Excel exports for attendance, fees and performance.',
    rows: [
      { label: 'Monthly Fee Summary', value: 'PDF ready' },
      { label: 'Attendance Register', value: 'Excel ready' },
      { label: 'Performance Leaderboard', value: 'PDF ready' },
    ],
  },
];

export default function ProductShowcase() {
  const [active, setActive] = useState(TABS[0].key);
  const revealRef = useScrollReveal();
  const tab = TABS.find((t) => t.key === active);

  return (
    <section id="product" className="lp-section lp-section--light">
      <div className="lp-container">
        <div className="lp-section-head reveal" ref={revealRef}>
          <span className="lp-eyebrow" style={{ color: '#1b53c9', background: 'rgba(61,107,255,0.1)', borderColor: 'rgba(61,107,255,0.25)' }}>
            <i className="ti ti-device-desktop" /> See FeeZO In Action
          </span>
          <h2 className="lp-h2">The real FeeZO product.</h2>
        </div>

        <div className="lp-showcase-tabs">
          {TABS.map((t) => (
            <button
              key={t.key}
              className={`lp-showcase-tab ${active === t.key ? 'active' : ''}`}
              onClick={() => setActive(t.key)}
            >
              {t.label}
            </button>
          ))}
        </div>

        <div className="lp-device-frame">
          <div className="lp-device-bar">
            <span className="lp-mock-dot" style={{ background: '#3a4258' }} />
            <span className="lp-mock-dot" style={{ background: '#3a4258' }} />
            <span className="lp-mock-dot" style={{ background: '#3a4258' }} />
          </div>
          <div className="lp-device-panel" key={tab.key}>
            <div className="lp-device-panel-title">{tab.title}</div>
            <div className="lp-device-panel-sub">{tab.sub}</div>
            <div className="lp-device-rows">
              {tab.rows.map((r) => (
                <div className="lp-device-row" key={r.label}>
                  <span style={{ color: '#c7cede' }}>{r.label}</span>
                  <span style={{ fontWeight: 700, color: '#b6ff3c' }}>{r.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
