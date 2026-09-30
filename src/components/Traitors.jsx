import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import './Traitors.css';

const SILHOUETTES = [
  { id: 1, label: 'TRAITOR I', x: '20%', delay: 0 },
  { id: 2, label: 'TRAITOR II', x: '50%', delay: 0.15 },
  { id: 3, label: 'TRAITOR III', x: '80%', delay: 0.3 },
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
            CLASSIFIED INTELLIGENCE
          </motion.div>

          <motion.h2
            className="traitors__title"
            initial={{ opacity: 0, y: 50 }}
            animate={headInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1.2, delay: 0.1 }}
          >
            THEY ARE<br />
            <span className="traitors__title-accent">AMONG YOU.</span>
          </motion.h2>
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
                  {/* Head */}
                  <ellipse cx="60" cy="30" rx="22" ry="26" fill="rgba(5,2,2,0.95)" />
                  {/* Shoulders */}
                  <path
                    d="M10 120 Q20 80 60 70 Q100 80 110 120 L110 200 L10 200 Z"
                    fill="rgba(5,2,2,0.95)"
                  />
                  {/* Glow */}
                  <ellipse cx="60" cy="30" rx="22" ry="26" fill="none"
                    stroke="rgba(139,0,0,0.3)" strokeWidth="1" />
                  <path
                    d="M10 120 Q20 80 60 70 Q100 80 110 120"
                    fill="none" stroke="rgba(139,0,0,0.2)" strokeWidth="1"
                  />
                </svg>

                {/* Red eye glow */}
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
          {CLASSIFIED_LINES.map((line, i) => (
            <div key={line.label} className="traitors__data-row">
              <span className="traitors__data-label">{line.label}</span>
              <span className="traitors__data-sep">——</span>
              <span className={`traitors__data-value traitors__data-value--${line.value.toLowerCase().replace(' ', '-')}`}>
                {line.value}
              </span>
            </div>
          ))}
        </motion.div>

        {/* Bottom text */}
        <motion.p
          className="traitors__bottom-text"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 1, delay: 1.2 }}
        >
          The Traitors are watching. The Faithful must find them — before it's too late.
        </motion.p>
      </div>
    </section>
  );
}
