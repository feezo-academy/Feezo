import useScrollReveal from '../useScrollReveal';

const BEFORE = [
  { icon: 'ti-notebook', text: 'Notebook registers for attendance' },
  { icon: 'ti-table', text: 'Excel spreadsheets scattered everywhere' },
  { icon: 'ti-brand-whatsapp', text: 'WhatsApp follow-ups for fee reminders' },
  { icon: 'ti-cash', text: 'Manual fee tracking, no clear dues' },
  { icon: 'ti-users', text: 'Student records spread across notebooks' },
  { icon: 'ti-clock-hour-4', text: 'Time-consuming, error-prone reports' },
];

const AFTER = [
  { icon: 'ti-user-check', text: 'Students — one profile per student, per sport' },
  { icon: 'ti-checkbox', text: 'Attendance — mark and lock registers in seconds' },
  { icon: 'ti-receipt', text: 'Fees — dues, payments and receipts, always current' },
  { icon: 'ti-category', text: 'Batches — organized by sport and level' },
  { icon: 'ti-clipboard-list', text: 'Enquiries — never lose a walk-in lead' },
  { icon: 'ti-report', text: 'Reports — export in one tap' },
];

export default function PainPoints() {
  const revealRef = useScrollReveal();

  return (
    <section className="lp-section">
      <div className="lp-container">
        <div className="lp-section-head reveal" ref={revealRef}>
          <span className="lp-eyebrow"><i className="ti ti-alert-triangle" /> The Problem</span>
          <h2 className="lp-h2">Still running your academy manually?</h2>
          <p className="lp-sub" style={{ margin: '0 auto' }}>
            Most academies start with notebooks and spreadsheets — and outgrow them fast.
          </p>
        </div>

        <div className="lp-before-after reveal" ref={revealRef}>
          <div className="lp-ba-col lp-ba-before">
            <div className="lp-ba-title">Before FeeZO</div>
            {BEFORE.map((item) => (
              <div className="lp-ba-item" key={item.text}>
                <i className={`ti ${item.icon}`} />
                {item.text}
              </div>
            ))}
          </div>
          <div className="lp-ba-arrow"><i className="ti ti-arrow-right" /></div>
          <div className="lp-ba-col lp-ba-after">
            <div className="lp-ba-title">With FeeZO</div>
            {AFTER.map((item) => (
              <div className="lp-ba-item" key={item.text}>
                <i className={`ti ${item.icon}`} />
                {item.text}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
