import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { RiPlayFill, RiArrowDownLine } from 'react-icons/ri';
import './Hero.css';

const PARTICLES = Array.from({ length: 40 }, (_, i) => ({
  id: i,
  x: Math.random() * 100,
  y: Math.random() * 100,
  size: Math.random() * 3 + 1,
  duration: Math.random() * 8 + 6,
  delay: Math.random() * 5,
}));

const titleVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.6 },
  },
};

const wordVariant = {
  hidden: { opacity: 0, y: 60, filter: 'blur(8px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] },
  },
};

export default function Hero({ onTrailerClick }) {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const bgScale = useTransform(scrollYProgress, [0, 1], [1, 1.18]);
  const bgOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0.3]);
  const textY = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);

  return (
    <section id="hero" className="hero" ref={heroRef}>
      {/* Background */}
      <motion.div
        className="hero__bg"
        style={{ scale: bgScale, opacity: bgOpacity }}
      >
        {/* SVG palace silhouette background */}
        <div className="hero__palace-bg" />
        {/* Cinematic gradients */}
        <div className="hero__gradient-overlay" />
        <div className="hero__fog" />
        <div className="hero__fog hero__fog--2" />
      </motion.div>

      {/* Particles */}
      <div className="hero__particles" aria-hidden="true">
        {PARTICLES.map((p) => (
          <motion.div
            key={p.id}
            className="hero__particle"
            style={{ left: `${p.x}%`, top: `${p.y}%`, width: p.size, height: p.size }}
            animate={{
              y: [0, -60, 0],
              opacity: [0, 0.8, 0],
              scale: [0.8, 1.2, 0.8],
            }}
            transition={{
              duration: p.duration,
              delay: p.delay,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        ))}
      </div>

      {/* Content */}
      <motion.div className="hero__content" style={{ y: textY }}>
        {/* Pre-label */}
        <motion.div
          className="hero__prelabel"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
        >
          <span className="hero__prelabel-line" />
          <span>SEASON TWO · NOW STREAMING</span>
          <span className="hero__prelabel-line" />
        </motion.div>

        {/* Title */}
        <motion.div
          className="hero__title-block"
          variants={titleVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div className="hero__title-the" variants={wordVariant}>
            THE
          </motion.div>
          <motion.div className="hero__title-main" variants={wordVariant}>
            TRAITORS
          </motion.div>
          <motion.div className="hero__title-india" variants={wordVariant}>
            INDIA
          </motion.div>
        </motion.div>

        {/* Gold divider */}
        <motion.div
          className="hero__divider"
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ delay: 1.6, duration: 1, ease: [0.16, 1, 0.3, 1] }}
        />

        {/* Tagline */}
        <motion.p
          className="hero__tagline"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.9, duration: 0.9 }}
        >
          TRUST IS THE DEADLIEST GAME.
        </motion.p>

        {/* Supporting text */}
        <motion.p
          className="hero__subtext"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.1, duration: 0.9 }}
        >
          Rise and shine… it's <em>dhoka time</em>, again. Karan Johar returns as gamemaster<br className="hero__br" />
          for the most deceptive season yet — filmed at Suryagarh Palace, Jaisalmer.
        </motion.p>

        {/* Buttons */}
        <motion.div
          className="hero__buttons"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.4, duration: 0.9 }}
        >
          <motion.button
            className="btn-primary hero__btn-primary"
            onClick={onTrailerClick}
            whileHover={{ scale: 1.04, boxShadow: '0 0 30px rgba(201,168,76,0.4)' }}
            whileTap={{ scale: 0.97 }}
          >
            <RiPlayFill />
            <span>WATCH TRAILER</span>
          </motion.button>

          <motion.button
            className="btn-secondary hero__btn-secondary"
            onClick={() => document.querySelector('#game')?.scrollIntoView({ behavior: 'smooth' })}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
          >
            <span>ENTER THE GAME</span>
          </motion.button>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="hero__scroll-indicator"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3, duration: 1 }}
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="hero__scroll-inner"
        >
          <RiArrowDownLine className="hero__scroll-arrow" />
          <span>SCROLL TO DISCOVER</span>
        </motion.div>
      </motion.div>
    </section>
  );
}
