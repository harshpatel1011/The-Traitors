import { useRef, useEffect, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import './Prize.css';

function useCountUp(target, duration, inView) {
  const [count, setCount] = useState(0);
  const startedRef = useRef(false);

  useEffect(() => {
    if (!inView || startedRef.current) return;
    startedRef.current = true;

    const start = performance.now();
    const step = (timestamp) => {
      const elapsed = timestamp - start;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(step);
      else setCount(target);
    };
    requestAnimationFrame(step);
  }, [inView, target, duration]);

  return count;
}

function formatIndian(n) {
  // Format as Indian numbering: XX,XX,XX,XXX
  const str = n.toString().padStart(9, '0');
  return `${str.slice(0, 2)},${str.slice(2, 4)},${str.slice(4, 6)},${str.slice(6)}`;
}

export default function Prize() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-15%' });
  const count = useCountUp(10_00_00_000, 2800, inView);

  return (
    <section className="prize section-padding" ref={ref}>
      <div className="prize__bg" />
      <div className="prize__vignette" />

      {/* Gold particle rain */}
      <div className="prize__particles" aria-hidden="true">
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className="prize__particle"
            style={{
              left: `${(i * 5.2) % 100}%`,
              animationDelay: `${(i * 0.3) % 4}s`,
              animationDuration: `${3 + (i % 4)}s`,
            }}
          />
        ))}
      </div>

      <div className="section-container">
        <div className="prize__content">
          <motion.div
            className="section-label prize__label"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
          >
            THE ULTIMATE REWARD
          </motion.div>

          <motion.h2
            className="prize__heading"
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.1 }}
          >
            ONE PRIZE.<br />
            <span className="prize__heading-sub">COUNTLESS BETRAYALS.</span>
          </motion.h2>

          <motion.div
            className="prize__ornament"
            initial={{ opacity: 0, scaleX: 0 }}
            animate={inView ? { opacity: 1, scaleX: 1 } : {}}
            transition={{ duration: 1, delay: 0.4 }}
          >
            <span className="prize__ornament-line" />
            <span className="prize__ornament-diamond">◆</span>
            <span className="prize__ornament-line" />
          </motion.div>

          {/* Prize amount */}
          <motion.div
            className="prize__amount-wrap"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 1.2, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="prize__currency">₹</div>
            <div className="prize__amount">{formatIndian(count)}</div>
          </motion.div>

          <motion.p
            className="prize__disclaimer"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.9 }}
          >
            * Prize amount shown is a fictional placeholder for this demo concept.
          </motion.p>

          <motion.p
            className="prize__quote"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, delay: 1 }}
          >
            At the end of the game, only the cleverest — or the most ruthless — will walk away.
          </motion.p>
        </div>
      </div>
    </section>
  );
}
