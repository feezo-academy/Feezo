import { useEffect, useRef } from 'react';

/**
 * Adds `.is-visible` to the ref'd element the first time it scrolls into
 * view. All animation is driven by CSS (see landing.css .reveal rules),
 * and CSS handles prefers-reduced-motion — this hook just toggles a class.
 */
export default function useScrollReveal(options) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === 'undefined') {
      el.classList.add('is-visible');
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, ...options }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [options]);

  return ref;
}
