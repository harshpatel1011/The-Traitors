import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import './FinalCTA.css';

export default function FinalCTA() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-10%' });

  const handleEnter = () => {
    document.querySelector('#game')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="final-cta" ref={ref}>
      {/* Background */}
      <div className="final-cta__bg" />
      <div className="final-cta__radial" />
      <div className="final-cta__vignette" />

      {/* Particles */}
      <div className="final-cta__particles" aria-hidden="true">
        {Array.from({ length: 15 }).map((_, i) => (
          <div
            key={i}
            className="final-cta__particle"
            style={{
              left: `${(i * 7 + 5) % 100}%`,
              animationDelay: `${(i * 0.6) % 5}s`,
              animationDuration: `${5 + (i % 5)}s`,
            }}
          />
        ))}
      </div>

      <div className="section-container">
        <div className="final-cta__content">
          <motion.h2
            className="final-cta__title"
            initial={{ opacity: 0, y: 60, filter: 'blur(10px)' }}
            animate={inView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
            transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="final-cta__who">WHO</span>
            <br />
            <span className="final-cta__do">DO YOU</span>
            <br />
            <span className="final-cta__trust">TRUST?</span>
          </motion.h2>

          <motion.div
            className="final-cta__divider"
            initial={{ scaleX: 0, opacity: 0 }}
            animate={inView ? { scaleX: 1, opacity: 1 } : {}}
            transition={{ duration: 1.2, delay: 0.5 }}
          />

          <motion.p
            className="final-cta__sub"
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, delay: 0.8 }}
          >
            The game has only just begun.
          </motion.p>

          <motion.button
            className="btn-primary final-cta__btn"
            onClick={handleEnter}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, delay: 1.1 }}
            whileHover={{ scale: 1.05, boxShadow: '0 0 40px rgba(201,168,76,0.5)' }}
            whileTap={{ scale: 0.97 }}
          >
            <span>ENTER THE GAME</span>
          </motion.button>
        </div>
      </div>
    </section>
  );
}
