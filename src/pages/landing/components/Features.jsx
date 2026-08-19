import useScrollReveal from '../useScrollReveal';

const GROUPS = [
  {
    icon: 'ti-users-group',
    title: 'Student Management',
    items: ['Attendance tracking', 'Student profiles', 'Batch management'],
  },
  {
    icon: 'ti-building-store',
    title: 'Academy Operations',
    items: ['Fees & payments', 'Coaches & staff', 'Schedules', 'Enquiries'],
  },
  {
    icon: 'ti-chart-line',
    title: 'Growth & Insights',
    items: ['Performance & leaderboard', 'PDF / Excel reports', 'Activity log'],
  },
  {
    icon: 'ti-shield-lock',
    title: 'Access & Control',
    items: ['Role-based access (admin/staff)', 'Staff leave management', 'In-app notifications'],
  },
];

export default function Features() {
  const headRef = useScrollReveal();
  const gridRef = useScrollReveal();

  return (
    <section id="features" className="lp-section">
      <div className="lp-container">
        <div className="lp-section-head reveal" ref={headRef}>
          <span className="lp-eyebrow"><i className="ti ti-stack-2" /> Everything In One Place</span>
          <h2 className="lp-h2">An all-in-one academy management platform.</h2>
          <p className="lp-sub" style={{ margin: '0 auto' }}>
            Not just fee collection — FeeZO runs the day-to-day of your academy end to end.
          </p>
        </div>

        <div className="lp-feature-groups reveal-stagger" ref={gridRef}>
          {GROUPS.map((g) => (
            <div className="lp-feature-card" key={g.title}>
              <div className="lp-feature-icon"><i className={`ti ${g.icon}`} /></div>
              <div className="lp-feature-card-title">{g.title}</div>
              <ul className="lp-feature-list">
                {g.items.map((item) => (
                  <li key={item}><i className="ti ti-circle-check" />{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
