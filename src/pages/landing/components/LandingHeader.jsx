import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const NAV_LINKS = [
  { href: '#product', label: 'Product' },
  { href: '#features', label: 'Features' },
  { href: '#sports', label: 'Sports' },
  { href: '#pricing', label: 'Pricing' },
  { href: '#how-it-works', label: 'How It Works' },
  { href: '#faq', label: 'FAQ' },
];

export default function LandingHeader({ onRequestAcademy }) {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const scrollTo = (href) => {
    setOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <header className="lp-header">
      <div className="lp-container lp-header-inner">
        <a href="#top" className="lp-logo" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>
          <span className="lp-logo-mark">FZ</span>
          FeeZO
        </a>

        <nav className="lp-nav">
          {NAV_LINKS.map((l) => (
            <a key={l.href} href={l.href} onClick={(e) => { e.preventDefault(); scrollTo(l.href); }}>
              {l.label}
            </a>
          ))}
        </nav>

        <div className="lp-header-actions">
          <a className="lp-login-link" href="/login" onClick={(e) => { e.preventDefault(); navigate('/login'); }}>
            Login
          </a>
          <button className="lp-btn lp-btn--primary" onClick={onRequestAcademy}>
            Request My Academy
          </button>
          <button className="lp-menu-btn" onClick={() => setOpen(true)} aria-label="Open menu">
            <i className="ti ti-menu-2" />
          </button>
        </div>
      </div>

      <div className={`lp-mobile-menu ${open ? 'open' : ''}`}>
        <button className="lp-modal-close" style={{ position: 'absolute', top: 22, right: 20 }} onClick={() => setOpen(false)} aria-label="Close menu">
          <i className="ti ti-x" />
        </button>
        {NAV_LINKS.map((l) => (
          <a key={l.href} href={l.href} onClick={(e) => { e.preventDefault(); scrollTo(l.href); }}>
            {l.label}
          </a>
        ))}
        <a href="/login" onClick={(e) => { e.preventDefault(); navigate('/login'); }}>Login</a>
        <div className="lp-cta-row">
          <button className="lp-btn lp-btn--primary lp-btn--block" onClick={() => { setOpen(false); onRequestAcademy(); }}>
            Request My Academy
          </button>
        </div>
      </div>
    </header>
  );
}
