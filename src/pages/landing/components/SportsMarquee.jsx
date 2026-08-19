import { SPORTS, SPORT_ICONS, FLAGSHIP_SPORTS } from '../../../config/sports';
import useScrollReveal from '../useScrollReveal';

export default function SportsMarquee() {
  const revealRef = useScrollReveal();
  // duplicate the list once so the CSS keyframe (translateX -50%) loops seamlessly
  const loopSports = [...SPORTS, ...SPORTS];

  return (
    <section id="sports" className="lp-section lp-section--tight">
      <div className="lp-container">
        <div className="lp-section-head reveal" ref={revealRef}>
          <span className="lp-eyebrow"><i className="ti ti-world" /> One Platform. Every Sport.</span>
          <h2 className="lp-h2">Built for martial arts. Ready for every sport.</h2>
          <p className="lp-sub" style={{ margin: '0 auto' }}>
            FeeZO was shaped by Silambam, martial arts and karate academies first — and it scales
            cleanly to every sport your academy teaches.
          </p>
        </div>
      </div>

      <div className="lp-sports-marquee-wrap">
        <div className="lp-sports-track">
          {loopSports.map((sport, i) => (
            <span
              key={`${sport}-${i}`}
              className={`lp-sport-chip ${FLAGSHIP_SPORTS.includes(sport) ? 'flagship' : ''}`}
            >
              <i className={`ti ${SPORT_ICONS[sport] || 'ti-trophy'}`} />
              {sport}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
