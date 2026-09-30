import { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { locations } from '../data/contestants';
import './Castle.css';

export default function Castle() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-10%' });
  const [activeLocation, setActiveLocation] = useState(null);

  return (
    <section className="castle section-padding" ref={ref}>
      <div className="castle__bg" />
      <div className="castle__fog" />
      <div className="castle__fog castle__fog--2" />

      <div className="section-container">
        {/* Header */}
        <div className="castle__header">
          <motion.div
            className="section-label"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
          >
            SEASON 2 FILMING LOCATION
          </motion.div>

          <motion.h2
            className="castle__title"
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.1 }}
          >
            SURYAGARH PALACE
          </motion.h2>

          <motion.p
            className="castle__desc"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Jaisalmer, Rajasthan — the majestic setting of Season 2.
            Behind these golden walls, alliances were forged, secrets were buried,
            and 21 players' fates were decided night after night.
          </motion.p>
        </div>

        {/* Castle Visual with Hotspots */}
        <motion.div
          className="castle__visual"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 1.2, delay: 0.3 }}
        >
          {/* CSS Castle illustration */}
          <div className="castle__illustration">
            {/* Palace façade via CSS */}
            <div className="castle__palace">
              {/* Central arch */}
              <div className="castle__arch castle__arch--center" />
              {/* Side arches */}
              <div className="castle__arch castle__arch--left" />
              <div className="castle__arch castle__arch--right" />
              {/* Windows */}
              <div className="castle__windows">
                {Array.from({ length: 8 }).map((_, i) => (
                  <div key={i} className="castle__window">
                    <div className="castle__window-light" />
                  </div>
                ))}
              </div>
              {/* Towers */}
              <div className="castle__tower castle__tower--left" />
              <div className="castle__tower castle__tower--right" />
              {/* Minarets */}
              <div className="castle__minaret castle__minaret--1" />
              <div className="castle__minaret castle__minaret--2" />
              <div className="castle__minaret castle__minaret--3" />
            </div>

            {/* Candle lights */}
            <div className="castle__candles">
              {[15, 35, 55, 75, 90].map((x) => (
                <div key={x} className="castle__candle" style={{ left: `${x}%` }}>
                  <div className="castle__flame" />
                </div>
              ))}
            </div>
          </div>

          {/* Hotspots */}
          {locations.map((loc, i) => (
            <motion.button
              key={loc.id}
              className={`castle__hotspot${activeLocation?.id === loc.id ? ' castle__hotspot--active' : ''}`}
              style={{ left: loc.x, top: loc.y }}
              onClick={() => setActiveLocation(activeLocation?.id === loc.id ? null : loc)}
              initial={{ scale: 0, opacity: 0 }}
              animate={inView ? { scale: 1, opacity: 1 } : {}}
              transition={{ delay: 0.6 + i * 0.12 }}
              whileHover={{ scale: 1.2 }}
              aria-label={loc.label}
            >
              <span className="castle__hotspot-dot" />
              <span className="castle__hotspot-ring" />
              <span className="castle__hotspot-label">{loc.label}</span>
            </motion.button>
          ))}

          {/* Info panel */}
          <AnimatePresence>
            {activeLocation && (
              <motion.div
                className="castle__info-panel"
                initial={{ opacity: 0, scale: 0.9, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 10 }}
                transition={{ duration: 0.3 }}
              >
                <button className="castle__info-close" onClick={() => setActiveLocation(null)} aria-label="Close">×</button>
                <h4 className="castle__info-title">{activeLocation.label}</h4>
                <div className="castle__info-divider" />
                <p className="castle__info-desc">{activeLocation.description}</p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
