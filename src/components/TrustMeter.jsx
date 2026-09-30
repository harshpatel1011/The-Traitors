import { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { contestants } from '../data/contestants';
import './TrustMeter.css';

function MeterBar({ value, color }) {
  return (
    <div className="meter-bar">
      <div className="meter-bar__track">
        <motion.div
          className="meter-bar__fill"
          style={{ background: color }}
          initial={{ width: 0 }}
          animate={{ width: `${value}%` }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        />
      </div>
      <span className="meter-bar__pct">{value}%</span>
    </div>
  );
}

export default function TrustMeter() {
  const [selected, setSelected] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-10%' });
  const headRef = useRef(null);
  const headInView = useInView(headRef, { once: true, margin: '-10%' });

  const handleSelect = (c) => {
    setSelected(c);
  };

  const handleAccuse = () => {
    if (selected) setModalOpen(true);
  };

  return (
    <section className="trust-section section-padding" ref={ref}>
      <div className="trust-section__bg" />

      <div className="section-container">
        {/* Header */}
        <div className="trust-section__header" ref={headRef}>
          <motion.div
            className="section-label"
            initial={{ opacity: 0, y: 20 }}
            animate={headInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
          >
            INTERACTIVE FEATURE
          </motion.div>

          <motion.h2
            className="trust-section__title"
            initial={{ opacity: 0, y: 40 }}
            animate={headInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.1 }}
          >
            WHO DO YOU TRUST?
          </motion.h2>

          <motion.p
            className="trust-section__subtitle"
            initial={{ opacity: 0, y: 20 }}
            animate={headInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Select a player to analyze their trust profile.
          </motion.p>
        </div>

        <div className="trust-layout">
          {/* Contestant selector */}
          <motion.div
            className="trust-selector"
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.3 }}
          >
            {contestants.slice(0, 6).map((c) => (
              <motion.button
                key={c.id}
                className={`trust-selector__card${selected?.id === c.id ? ' trust-selector__card--active' : ''}`}
                onClick={() => handleSelect(c)}
                whileHover={{ x: 6 }}
                whileTap={{ scale: 0.97 }}
              >
                <div className="trust-selector__avatar"
                  style={{ background: `radial-gradient(circle, ${c.color}66, ${c.color}22)` }}
                >
                  {c.name.split(' ').map(w => w[0]).join('')}
                </div>
                <div className="trust-selector__info">
                  <span className="trust-selector__name">{c.name}</span>
                  <span className="trust-selector__prof">{c.profession}</span>
                </div>
                <div className="trust-selector__arrow">›</div>
              </motion.button>
            ))}
          </motion.div>

          {/* Meter display */}
          <motion.div
            className="trust-display"
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.4 }}
          >
            {selected ? (
              <AnimatePresence mode="wait">
                <motion.div
                  key={selected.id}
                  className="trust-display__content"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4 }}
                >
                  {/* Header */}
                  <div className="trust-display__top">
                    <div className="trust-display__avatar"
                      style={{ background: `radial-gradient(circle, ${selected.color}88, ${selected.color}22)` }}
                    >
                      {selected.name.split(' ').map(w => w[0]).join('')}
                    </div>
                    <div>
                      <p className="trust-display__name">{selected.name}</p>
                      <p className="trust-display__prof">{selected.profession}</p>
                    </div>
                  </div>

                  {/* Meter rows */}
                  <div className="trust-display__meters">
                    <div className="trust-display__meter-row">
                      <div className="trust-display__meter-label">
                        <span>TRUST LEVEL</span>
                      </div>
                      <MeterBar
                        value={selected.trustScore}
                        color="linear-gradient(90deg, var(--gold-dim), var(--gold))"
                      />
                    </div>

                    <div className="trust-display__meter-row">
                      <div className="trust-display__meter-label">
                        <span>SUSPICION</span>
                      </div>
                      <MeterBar
                        value={selected.suspicionScore}
                        color="linear-gradient(90deg, #8b0000, #e05555)"
                      />
                    </div>
                  </div>

                  {/* Quote */}
                  <p className="trust-display__quote">"{selected.description}"</p>

                  <div className="trust-display__disclaimer">
                    * These ratings are fictional and do not represent actual show outcomes.
                  </div>

                  {/* Accuse button */}
                  <motion.button
                    className="trust-display__accuse"
                    onClick={handleAccuse}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    MAKE YOUR ACCUSATION
                  </motion.button>
                </motion.div>
              </AnimatePresence>
            ) : (
              <div className="trust-display__empty">
                <div className="trust-display__empty-icon">?</div>
                <p>Select a player to begin your analysis</p>
              </div>
            )}
          </motion.div>
        </div>
      </div>

      {/* Accusation Modal */}
      <AnimatePresence>
        {modalOpen && selected && (
          <motion.div
            className="accuse-modal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setModalOpen(false)}
          >
            <motion.div
              className="accuse-modal"
              initial={{ scale: 0.85, opacity: 0, filter: 'blur(8px)' }}
              animate={{ scale: 1, opacity: 1, filter: 'blur(0px)' }}
              exit={{ scale: 0.85, opacity: 0, filter: 'blur(8px)' }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="accuse-modal__corner accuse-modal__corner--tl" />
              <div className="accuse-modal__corner accuse-modal__corner--tr" />
              <div className="accuse-modal__corner accuse-modal__corner--bl" />
              <div className="accuse-modal__corner accuse-modal__corner--br" />

              <div className="accuse-modal__header">
                <span className="accuse-modal__label">OFFICIAL ACCUSATION</span>
              </div>

              <div className="accuse-modal__divider" />

              <p className="accuse-modal__body">
                You have formally accused
              </p>
              <h3 className="accuse-modal__name">{selected.name}</h3>
              <p className="accuse-modal__prof">{selected.profession}</p>

              <div className="accuse-modal__divider" />

              <p className="accuse-modal__question">
                Do you believe this player is a TRAITOR?
              </p>

              <div className="accuse-modal__actions">
                <motion.button
                  className="accuse-modal__confirm"
                  onClick={() => setModalOpen(false)}
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.97 }}
                >
                  I ACCUSE THEM
                </motion.button>
                <motion.button
                  className="accuse-modal__cancel"
                  onClick={() => setModalOpen(false)}
                  whileHover={{ scale: 1.04 }}
                >
                  STAND DOWN
                </motion.button>
              </div>

              <p className="accuse-modal__disclaimer">
                * This is a fictional interactive feature. It does not affect any real show.
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
