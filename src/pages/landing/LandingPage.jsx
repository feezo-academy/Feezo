import { useEffect, useState } from 'react';
import './landing.css';
import { getActivePlans } from '../../lib/plansService';
import LandingHeader from './components/LandingHeader';
import Hero from './components/Hero';
import SportsMarquee from './components/SportsMarquee';
import PainPoints from './components/PainPoints';
import Features from './components/Features';
import ProductShowcase from './components/ProductShowcase';
import HowItWorks from './components/HowItWorks';
import Pricing from './components/Pricing';
import FAQ from './components/FAQ';
import FinalCTA from './components/FinalCTA';
import LandingFooter from './components/LandingFooter';
import RequestAcademyModal from './components/RequestAcademyModal';

function setMetaTag(attr, key, content) {
  let el = document.querySelector(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

export default function LandingPage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [initialPlanCode, setInitialPlanCode] = useState(null);
  const [plansState, setPlansState] = useState({ loading: true, plans: [], error: null });

  useEffect(() => {
    document.title = 'FeeZO | Sports & Martial Arts Academy Management Software';
    const desc = 'FeeZO helps sports and martial arts academies manage students, attendance, fees, batches, coaches, enquiries and academy operations from one powerful platform.';
    setMetaTag('name', 'description', desc);
    setMetaTag('property', 'og:title', 'FeeZO | Sports & Martial Arts Academy Management Software');
    setMetaTag('property', 'og:description', desc);
    setMetaTag('property', 'og:type', 'website');
    let mounted = true;
    getActivePlans().then(({ plans, error }) => {
      if (mounted) setPlansState({ loading: false, plans, error });
    });
    return () => { mounted = false; };
  }, []);

  const openModal = (planCode = null) => {
    setInitialPlanCode(planCode);
    setModalOpen(true);
  };
  const closeModal = () => setModalOpen(false);

  return (
    <div className="feezo-landing">
      <LandingHeader onRequestAcademy={() => openModal(null)} />
      <Hero onRequestAcademy={() => openModal(null)} />
      <SportsMarquee />
      <PainPoints />
      <Features />
      <ProductShowcase />
      <HowItWorks onRequestAcademy={() => openModal(null)} />
      <Pricing
        plans={plansState.plans}
        loading={plansState.loading}
        error={plansState.error}
        onChoosePlan={(code) => openModal(code)}
        onRequestDemo={() => openModal(null)}
      />
      <FAQ />
      <FinalCTA onRequestAcademy={() => openModal(null)} />
      <LandingFooter />

      <RequestAcademyModal
        open={modalOpen}
        onClose={closeModal}
        plans={plansState.plans}
        initialPlanCode={initialPlanCode}
      />
    </div>
  );
}
