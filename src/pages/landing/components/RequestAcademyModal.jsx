import { useEffect, useMemo, useState } from 'react';
import { SPORTS, FLAGSHIP_SPORTS } from '../../../config/sports';
import { formatPrice } from '../../../lib/plansService';
import { submitAcademyRequest } from '../../../lib/academyRequestService';

const STEPS = ['About You', 'About Your Academy', 'Current Management', 'What Do You Need?', 'Plan & Contact'];

const STUDENT_COUNTS = ['Just Starting', '1–50', '51–100', '101–250', '251–500', '500+'];
const BRANCH_COUNTS = ['1', '2–3', '4–10', '10+'];
const MANAGEMENT_OPTIONS = [
  { value: 'notebook', label: 'Notebook / Register' },
  { value: 'excel', label: 'Excel / Google Sheets' },
  { value: 'whatsapp', label: 'WhatsApp' },
  { value: 'other_software', label: 'Another Software' },
  { value: 'multiple_tools', label: 'Multiple Tools' },
  { value: 'not_digital', label: 'Not Managing Digitally Yet' },
  { value: 'other', label: 'Other' },
];
const FEATURE_OPTIONS = [
  'Student Management', 'Attendance', 'Fees & Payments', 'Batches / Classes',
  'Coaches / Staff', 'Enquiries', 'Reports', 'Student Performance',
  'Notifications', 'Multiple Branches', 'Other',
];
const CONTACT_METHODS = [
  { value: 'phone', label: 'Phone' },
  { value: 'whatsapp', label: 'WhatsApp' },
  { value: 'email', label: 'Email' },
];
const CONTACT_TIMES = [
  { value: 'morning', label: 'Morning' },
  { value: 'afternoon', label: 'Afternoon' },
  { value: 'evening', label: 'Evening' },
  { value: 'anytime', label: 'Anytime' },
];

const sortedSports = [...FLAGSHIP_SPORTS, ...SPORTS.filter((s) => !FLAGSHIP_SPORTS.includes(s))];

const EMPTY_FORM = {
  fullName: '', academyName: '', mobile: '', whatsapp: '', whatsappSame: true, email: '', city: '',
  sports: [], otherSport: '',
  studentCount: '', branchCount: '',
  currentManagement: '', currentManagementOther: '',
  requiredFeatures: [], requiredFeaturesOther: '',
  interestedPlanCode: '', notSurePlan: false,
  preferredContactMethod: '', preferredContactTime: '', message: '',
};

export default function RequestAcademyModal({ open, onClose, plans, initialPlanCode }) {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState(EMPTY_FORM);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (open) {
      setStep(0);
      setErrors({});
      setSubmitError(null);
      setSuccess(false);
      setForm((f) => ({
        ...EMPTY_FORM,
        interestedPlanCode: initialPlanCode || '',
        notSurePlan: !initialPlanCode,
      }));
    }
  }, [open, initialPlanCode]);

  const set = (patch) => setForm((f) => ({ ...f, ...patch }));

  const toggleFromList = (key, value) => {
    setForm((f) => {
      const list = f[key];
      const next = list.includes(value) ? list.filter((v) => v !== value) : [...list, value];
      return { ...f, [key]: next };
    });
  };

  const validateStep = (idx) => {
    const e = {};
    if (idx === 0) {
      if (!form.fullName.trim()) e.fullName = 'Full name is required';
      if (!form.academyName.trim()) e.academyName = 'Academy name is required';
      if (!/^[0-9+\-\s]{7,15}$/.test(form.mobile.trim())) e.mobile = 'Enter a valid mobile number';
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) e.email = 'Enter a valid email address';
      if (!form.city.trim()) e.city = 'City / location is required';
    }
    if (idx === 1) {
      if (form.sports.length === 0) e.sports = 'Select at least one sport';
      if (form.sports.includes('Other') && !form.otherSport.trim()) e.otherSport = 'Tell us the sport / activity';
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const goNext = () => {
    if (!validateStep(step)) return;
    setStep((s) => Math.min(s + 1, STEPS.length - 1));
  };
  const goBack = () => setStep((s) => Math.max(s - 1, 0));

  const handleSubmit = async () => {
    setSubmitError(null);
    setSubmitting(true);
    const { error } = await submitAcademyRequest(form);
    setSubmitting(false);
    if (error) {
      setSubmitError("We couldn't submit your request right now. Please try again in a moment.");
      console.error('submitAcademyRequest failed:', error.message);
      return;
    }
    setSuccess(true);
  };

  const activePlans = useMemo(() => [...plans].sort((a, b) => a.sortOrder - b.sortOrder), [plans]);

  if (!open) return null;

  return (
    <div className="lp-modal-overlay" onMouseDown={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="lp-modal" role="dialog" aria-modal="true">
        <button className="lp-modal-close" onClick={onClose} aria-label="Close">
          <i className="ti ti-x" />
        </button>

        {success ? (
          <div className="lp-success">
            <div className="lp-success-icon"><i className="ti ti-check" /></div>
            <h3>Request Received ✓</h3>
            <p>Thanks for telling us about {form.academyName || 'your academy'}.</p>
            <p>Our FeeZO team will review your requirements and contact you shortly.</p>
            <div className="lp-success-next">
              <div className="lp-success-next-label">Next Step</div>
              <div style={{ fontSize: 14, color: '#dfe4ee' }}>
                Our team will contact you to understand your academy and help create your FeeZO account.
              </div>
            </div>
            <button className="lp-btn lp-btn--primary lp-btn--block" onClick={onClose}>
              Back to Home
            </button>
          </div>
        ) : (
          <>
            <div className="lp-modal-head">
              <div className="lp-modal-step-label">Step {step + 1} of {STEPS.length}</div>
              <div className="lp-modal-title">{STEPS[step]}</div>
            </div>
            <div className="lp-progress">
              {STEPS.map((_, i) => (
                <div key={i} className={`lp-progress-seg ${i < step ? 'done' : ''} ${i === step ? 'active' : ''}`}>
                  <div className="fill" />
                </div>
              ))}
            </div>

            {submitError && <div className="lp-submit-error">{submitError}</div>}

            {step === 0 && (
              <StepAboutYou form={form} set={set} errors={errors} />
            )}
            {step === 1 && (
              <StepAboutAcademy form={form} set={set} toggleFromList={toggleFromList} errors={errors} />
            )}
            {step === 2 && (
              <StepCurrentManagement form={form} set={set} />
            )}
            {step === 3 && (
              <StepNeeds form={form} toggleFromList={toggleFromList} set={set} />
            )}
            {step === 4 && (
              <StepPlanContact form={form} set={set} plans={activePlans} />
            )}

            <div className="lp-modal-nav">
              {step > 0 && (
                <button className="lp-btn lp-btn--ghost" onClick={goBack} disabled={submitting}>
                  Back
                </button>
              )}
              {step < STEPS.length - 1 ? (
                <button className="lp-btn lp-btn--primary" onClick={goNext}>
                  Next
                </button>
              ) : (
                <button className="lp-btn lp-btn--primary" onClick={handleSubmit} disabled={submitting}>
                  {submitting ? 'Submitting…' : 'Submit Request'}
                </button>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

function Field({ label, required, error, children }) {
  return (
    <div className="lp-field">
      <label>{label}{required && <span className="req"> *</span>}</label>
      {children}
      {error && <div className="lp-error-text">{error}</div>}
    </div>
  );
}

function StepAboutYou({ form, set, errors }) {
  return (
    <>
      <Field label="Full Name" required error={errors.fullName}>
        <input className={`lp-input ${errors.fullName ? 'error' : ''}`} placeholder="Your name"
          value={form.fullName} onChange={(e) => set({ fullName: e.target.value })} />
      </Field>
      <Field label="Academy Name" required error={errors.academyName}>
        <input className={`lp-input ${errors.academyName ? 'error' : ''}`} placeholder="e.g. Champion Silambam Academy"
          value={form.academyName} onChange={(e) => set({ academyName: e.target.value })} />
      </Field>
      <Field label="Mobile Number" required error={errors.mobile}>
        <input className={`lp-input ${errors.mobile ? 'error' : ''}`} placeholder="10-digit mobile number" inputMode="tel"
          value={form.mobile} onChange={(e) => {
            const mobile = e.target.value;
            set({ mobile, whatsapp: form.whatsappSame ? mobile : form.whatsapp });
          }} />
      </Field>
      <div className="lp-checkbox-row">
        <input type="checkbox" id="wa-same" checked={form.whatsappSame}
          onChange={(e) => set({ whatsappSame: e.target.checked, whatsapp: e.target.checked ? form.mobile : form.whatsapp })} />
        <label htmlFor="wa-same" style={{ margin: 0 }}>WhatsApp number is same as mobile</label>
      </div>
      {!form.whatsappSame && (
        <Field label="WhatsApp Number">
          <input className="lp-input" placeholder="WhatsApp number" inputMode="tel"
            value={form.whatsapp} onChange={(e) => set({ whatsapp: e.target.value })} />
        </Field>
      )}
      <Field label="Email Address" required error={errors.email}>
        <input className={`lp-input ${errors.email ? 'error' : ''}`} type="email" placeholder="you@example.com"
          value={form.email} onChange={(e) => set({ email: e.target.value })} />
      </Field>
      <Field label="City / Location" required error={errors.city}>
        <input className={`lp-input ${errors.city ? 'error' : ''}`} placeholder="e.g. Chennai"
          value={form.city} onChange={(e) => set({ city: e.target.value })} />
      </Field>
    </>
  );
}

function StepAboutAcademy({ form, toggleFromList, set, errors }) {
  const sportsWithOther = [...sortedSports, 'Other'];
  return (
    <>
      <Field label="Sports / Activities" required error={errors.sports}>
        <div className="lp-chip-grid">
          {sportsWithOther.map((sport) => (
            <button type="button" key={sport}
              className={`lp-chip ${form.sports.includes(sport) ? 'selected' : ''}`}
              onClick={() => toggleFromList('sports', sport)}>
              {sport}
            </button>
          ))}
        </div>
      </Field>
      {form.sports.includes('Other') && (
        <Field label="Other Sport / Activity" required error={errors.otherSport}>
          <input className={`lp-input ${errors.otherSport ? 'error' : ''}`} placeholder="Tell us what you teach"
            value={form.otherSport} onChange={(e) => set({ otherSport: e.target.value })} />
        </Field>
      )}
      <Field label="Student Count">
        <div className="lp-chip-grid">
          {STUDENT_COUNTS.map((v) => (
            <button type="button" key={v} className={`lp-chip ${form.studentCount === v ? 'selected' : ''}`}
              onClick={() => set({ studentCount: v })}>{v}</button>
          ))}
        </div>
      </Field>
      <Field label="Number of Branches">
        <div className="lp-chip-grid">
          {BRANCH_COUNTS.map((v) => (
            <button type="button" key={v} className={`lp-chip ${form.branchCount === v ? 'selected' : ''}`}
              onClick={() => set({ branchCount: v })}>{v}</button>
          ))}
        </div>
      </Field>
    </>
  );
}

function StepCurrentManagement({ form, set }) {
  return (
    <>
      <Field label="How do you currently manage your academy?">
        <div className="lp-option-list">
          {MANAGEMENT_OPTIONS.map((opt) => (
            <div key={opt.value} className={`lp-option-row ${form.currentManagement === opt.value ? 'selected' : ''}`}
              onClick={() => set({ currentManagement: opt.value })}>
              <span className="lp-radio-dot" />
              {opt.label}
            </div>
          ))}
        </div>
      </Field>
      {form.currentManagement === 'other' && (
        <Field label="Please specify">
          <input className="lp-input" value={form.currentManagementOther}
            onChange={(e) => set({ currentManagementOther: e.target.value })} />
        </Field>
      )}
    </>
  );
}

function StepNeeds({ form, toggleFromList, set }) {
  return (
    <>
      <Field label="What do you need?">
        <div className="lp-chip-grid">
          {FEATURE_OPTIONS.map((f) => (
            <button type="button" key={f} className={`lp-chip ${form.requiredFeatures.includes(f) ? 'selected' : ''}`}
              onClick={() => toggleFromList('requiredFeatures', f)}>{f}</button>
          ))}
        </div>
      </Field>
      {form.requiredFeatures.includes('Other') && (
        <Field label="Please specify">
          <input className="lp-input" value={form.requiredFeaturesOther}
            onChange={(e) => set({ requiredFeaturesOther: e.target.value })} />
        </Field>
      )}
    </>
  );
}

function StepPlanContact({ form, set, plans }) {
  return (
    <>
      <Field label="Interested Plan">
        <div className="lp-plan-pick">
          {plans.map((p) => (
            <div key={p.code}
              className={`lp-plan-pick-row ${!form.notSurePlan && form.interestedPlanCode === p.code ? 'selected' : ''}`}
              onClick={() => set({ interestedPlanCode: p.code, notSurePlan: false })}>
              <span className="lp-plan-pick-name">{p.name}</span>
              <span className="lp-plan-pick-price">{formatPrice(p.priceMonthly, p.currency)}/mo</span>
            </div>
          ))}
          <div className={`lp-plan-pick-row ${form.notSurePlan ? 'selected' : ''}`}
            onClick={() => set({ notSurePlan: true, interestedPlanCode: '' })}>
            <span className="lp-plan-pick-name">Not sure — help me choose</span>
          </div>
        </div>
      </Field>
      <Field label="Preferred Contact Method">
        <div className="lp-chip-grid">
          {CONTACT_METHODS.map((m) => (
            <button type="button" key={m.value} className={`lp-chip ${form.preferredContactMethod === m.value ? 'selected' : ''}`}
              onClick={() => set({ preferredContactMethod: m.value })}>{m.label}</button>
          ))}
        </div>
      </Field>
      <Field label="Preferred Contact Time">
        <div className="lp-chip-grid">
          {CONTACT_TIMES.map((t) => (
            <button type="button" key={t.value} className={`lp-chip ${form.preferredContactTime === t.value ? 'selected' : ''}`}
              onClick={() => set({ preferredContactTime: t.value })}>{t.label}</button>
          ))}
        </div>
      </Field>
      <Field label="Anything else about your academy?">
        <textarea className="lp-textarea" placeholder="Optional message"
          value={form.message} onChange={(e) => set({ message: e.target.value })} />
      </Field>
    </>
  );
}
