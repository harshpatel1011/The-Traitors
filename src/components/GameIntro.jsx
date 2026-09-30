import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import './GameIntro.css';

const lines = [
  { text: 'EVERYONE HAS A SECRET.', delay: 0 },
  { text: 'SOME CAME TO WIN.', delay: 0.2 },
  { text: 'SOME CAME TO BETRAY.', delay: 0.4 },
];

function RevealLine({ text, delay }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-15%' });

  return (
    <div className="intro__line-wrapper" ref={ref}>
      <motion.div
        className="intro__line"
        initial={{ opacity: 0, y: 50, filter: 'blur(6px)' }}
        animate={inView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
        transition={{ duration: 1.2, delay, ease: [0.16, 1, 0.3, 1] }}
      >
        {text}
      </motion.div>
    </div>
  );
}

export default function GameIntro() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-10%' });

  return (
    <section className="game-intro" ref={ref}>
      {/* Background effects */}
      <div className="game-intro__bg" />
      <div className="game-intro__vignette" />

      <div className="section-container">
        <div className="game-intro__content">
          {lines.map((l) => (
            <RevealLine key={l.text} text={l.text} delay={l.delay} />
          ))}

          <motion.div
            className="game-intro__ornament"
            initial={{ opacity: 0, scaleX: 0 }}
            animate={inView ? { opacity: 1, scaleX: 1 } : {}}
            transition={{ duration: 1.4, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="game-intro__ornament-line" />
            <span className="game-intro__ornament-diamond">◆</span>
            <span className="game-intro__ornament-line" />
          </motion.div>

          <motion.p
            className="game-intro__body"
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, delay: 1.2, ease: [0.16, 1, 0.3, 1] }}
          >
            In Suryagarh Palace, Jaisalmer, 21 of India's most recognisable faces
            were thrown into the ultimate psychological game — hosted by Karan Johar.
            Among them, hidden in plain sight, were the Traitors.
          </motion.p>
        </div>
      </div>
    </section>
  );
}
