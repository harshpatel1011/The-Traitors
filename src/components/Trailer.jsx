import { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { RiPlayFill, RiCloseLine } from 'react-icons/ri';
import './Trailer.css';

export default function Trailer({ onOpen }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-10%' });

  return (
    <section className="trailer section-padding" ref={ref}>
      <div className="trailer__bg" />

      <div className="section-container">
        {/* Header */}
        <motion.div
          className="trailer__header"
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9 }}
        >
          <div className="section-label" style={{ justifyContent: 'center' }}>OFFICIAL TRAILER</div>
          <h2 className="trailer__title">WATCH THE TRAILER</h2>
        </motion.div>

        {/* Cinematic video area */}
        <motion.div
          className="trailer__video-area"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 1.1, delay: 0.2 }}
          onClick={onOpen}
        >
          {/* Poster - cinematic placeholder */}
          <div className="trailer__poster">
            {/* Architectural pattern via CSS */}
            <div className="trailer__poster-bg" />
            <div className="trailer__poster-overlay" />

            {/* Center text overlay */}
            <div className="trailer__poster-text">
              <div className="trailer__poster-title">THE TRAITORS</div>
              <div className="trailer__poster-india">INDIA</div>
              <div className="trailer__poster-season">SEASON ONE · 2026</div>
            </div>

            {/* Letterbox bars */}
            <div className="trailer__letterbox trailer__letterbox--top" />
            <div className="trailer__letterbox trailer__letterbox--bottom" />
          </div>

          {/* Play button */}
          <motion.div
            className="trailer__play-btn"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="trailer__play-circle">
              <RiPlayFill className="trailer__play-icon" />
            </div>
            <div className="trailer__play-ring" />
          </motion.div>

          {/* Corner ornaments */}
          <div className="trailer__corner trailer__corner--tl" />
          <div className="trailer__corner trailer__corner--tr" />
          <div className="trailer__corner trailer__corner--bl" />
          <div className="trailer__corner trailer__corner--br" />
        </motion.div>

        <motion.p
          className="trailer__note"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.7 }}
        >
          * This is a concept demo. No actual video content is embedded.
        </motion.p>
      </div>
    </section>
  );
}
