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
  // Format as Indian numbering system (e.g. 66,00,000)
  if (n === 0) return '00,00,000';
  const s = n.toString();
  if (s.length <= 3) return s;
  if (s.length <= 5) return s.slice(0, s.length - 3) + ',' + s.slice(-3);
  // For numbers like 6600000 (7 digits) → 66,00,000
  const last3 = s.slice(-3);
  const rest = s.slice(0, -3);
  const last2 = rest.slice(-2);
  const leading = rest.slice(0, -2);
  return (leading ? leading + ',' : '') + last2 + ',' + last3;
}

export default function Prize() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-15%' });
  const count = useCountUp(66_00_000, 2500, inView);

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
            THE PRIZE WAS REAL.<br />
            <span className="prize__heading-sub">SO WAS THE BETRAYAL.</span>
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
            Prize pot: up to ₹1 Crore · Season 2 winners Krystle D'Souza & Rida Tharana claimed ₹66 Lakh
          </motion.p>

          <motion.p
            className="prize__quote"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, delay: 1 }}
          >
            Two Traitors. Nineteen Innocents. One palace. One winner's circle.
            At the end of the game — only the most ruthless walked away.
          </motion.p>
        </div>
      </div>
    </section>
  );
}
