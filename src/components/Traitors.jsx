import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import './Traitors.css';

const SILHOUETTES = [
  { id: 1, label: 'TRAITOR I', delay: 0, name: '???' },
  { id: 2, label: 'TRAITOR II', delay: 0.15, name: '???' },
  { id: 3, label: 'TRAITOR III', delay: 0.3, name: '???' },
];

const CLASSIFIED_LINES = [
  { label: 'IDENTITY', value: 'CLASSIFIED' },
  { label: 'LOYALTY', value: 'UNKNOWN' },
  { label: 'THREAT LEVEL', value: 'HIGH' },
];

function GlitchText({ children }) {
  return (
    <span className="glitch-text" data-text={children}>
      {children}
    </span>
  );
}

export default function Traitors() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-10%' });
  const headRef = useRef(null);
  const headInView = useInView(headRef, { once: true, margin: '-10%' });

  return (
    <section id="traitors" className="traitors section-padding" ref={ref}>
      {/* Atmospheric backgrounds */}
      <div className="traitors__bg" />
      <div className="traitors__vignette" />
      <div className="traitors__scanlines" />

      <div className="section-container">
        {/* Header */}
        <div className="traitors__header" ref={headRef}>
          <motion.div
            className="section-label traitors__label"
            initial={{ opacity: 0 }}
            animate={headInView ? { opacity: 1 } : {}}
            transition={{ duration: 1 }}
          >
            CLASSIFIED INTELLIGENCE · SEASON 2
          </motion.div>

          <motion.h2
            className="traitors__title"
            initial={{ opacity: 0, y: 50 }}
            animate={headInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1.2, delay: 0.1 }}
          >
            THEY WERE<br />
            <span className="traitors__title-accent">AMONG YOU.</span>
          </motion.h2>

          <motion.p
            className="traitors__subtitle-text"
            initial={{ opacity: 0, y: 20 }}
            animate={headInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.4 }}
          >
            Hidden inside Suryagarh Palace, Jaisalmer — two Traitors deceived 19 Innocents
            across 9 episodes. Their identities were never exposed.
          </motion.p>
        </div>

        {/* Silhouettes row */}
        <div className="traitors__silhouettes">
          {SILHOUETTES.map((s) => (
            <motion.div
              key={s.id}
              className="traitor-sil"
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 1.2, delay: s.delay + 0.4 }}
            >
              {/* SVG Silhouette */}
              <div className="traitor-sil__figure">
                <svg viewBox="0 0 120 200" className="traitor-sil__svg" aria-hidden="true">
                  <ellipse cx="60" cy="30" rx="22" ry="26" fill="rgba(5,2,2,0.95)" />
                  <path
                    d="M10 120 Q20 80 60 70 Q100 80 110 120 L110 200 L10 200 Z"
                    fill="rgba(5,2,2,0.95)"
                  />
                  <ellipse cx="60" cy="30" rx="22" ry="26" fill="none"
                    stroke="rgba(139,0,0,0.3)" strokeWidth="1" />
                  <path
                    d="M10 120 Q20 80 60 70 Q100 80 110 120"
                    fill="none" stroke="rgba(139,0,0,0.2)" strokeWidth="1"
                  />
                </svg>
                <div className="traitor-sil__eye" />
              </div>

              <div className="traitor-sil__info">
                <span className="traitor-sil__label">
                  <GlitchText>{s.label}</GlitchText>
                </span>
                <div className="traitor-sil__line" />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Classified data */}
        <motion.div
          className="traitors__classified"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: 0.9 }}
        >
          {CLASSIFIED_LINES.map((line) => (
            <div key={line.label} className="traitors__data-row">
              <span className="traitors__data-label">{line.label}</span>
              <span className="traitors__data-sep">——</span>
              <span className={`traitors__data-value traitors__data-value--${line.value.toLowerCase().replace(' ', '-')}`}>
                {line.value}
              </span>
            </div>
          ))}
        </motion.div>

        {/* Season 2 reveal note */}
        <motion.div
          className="traitors__reveal-box"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: 1.1 }}
        >
          <p className="traitors__reveal-label">SEASON 2 WINNERS REVEALED</p>
          <div className="traitors__reveal-names">
            <div className="traitors__reveal-name">
              <span className="traitors__reveal-trophy">🏆</span>
              <span>KRYSTLE D'SOUZA</span>
              <span className="traitors__reveal-role">Television Actor · Traitor from Day 1</span>
            </div>
            <div className="traitors__reveal-divider">✦</div>
            <div className="traitors__reveal-name">
              <span className="traitors__reveal-trophy">🏆</span>
              <span>RIDA THARANA</span>
              <span className="traitors__reveal-role">Influencer · Recruited as Traitor mid-game</span>
            </div>
          </div>
          <p className="traitors__reveal-prize">Prize Won: ₹66 Lakh</p>
        </motion.div>

        {/* Bottom text */}
        <motion.p
          className="traitors__bottom-text"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 1, delay: 1.4 }}
        >
          "Rise and shine… it's dhoka time." — Karan Johar
        </motion.p>
      </div>
    </section>
  );
}
