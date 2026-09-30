import { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { contestants } from '../data/contestants';
import './Contestants.css';

const INITIALS_COLORS = [
  '#8b0000', '#4a1942', '#1a3a2a', '#2a1a3a',
  '#1a2a3a', '#3a1a1a', '#2a2a1a', '#1a3a3a',
];

function getInitials(name) {
  return name.split(' ').map(w => w[0]).join('');
}

function ContestantCard({ contestant, index }) {
  const [hovered, setHovered] = useState(false);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-5%' });

  return (
    <motion.div
      ref={ref}
      className="contestant-card"
      initial={{ opacity: 0, y: 60 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay: (index % 4) * 0.12, ease: [0.16, 1, 0.3, 1] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      whileHover={{ y: -10 }}
    >
      {/* Image / Avatar */}
      <div className="contestant-card__image-wrap">
        <div
          className="contestant-card__avatar"
          style={{ background: `radial-gradient(ellipse at 30% 30%, ${INITIALS_COLORS[index % 8]}88, ${INITIALS_COLORS[index % 8]}22)` }}
        >
          <span className="contestant-card__initials">{getInitials(contestant.name)}</span>
          <div className="contestant-card__avatar-pattern" />
        </div>

        {/* Hover overlay */}
        <AnimatePresence>
          {hovered && (
            <motion.div
              className="contestant-card__overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="contestant-card__overlay-info">
                <p className="contestant-card__city">{contestant.city}</p>
                <p className="contestant-card__age">Age {contestant.age}</p>
                <p className="contestant-card__overlay-desc">{contestant.description}</p>
                <div className="contestant-card__status-badge">
                  <span className="contestant-card__status-dot" />
                  STATUS: {contestant.status}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Gold border on hover */}
        <motion.div
          className="contestant-card__border"
          animate={{ opacity: hovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        />

        {/* Player number */}
        <div className="contestant-card__num">PLAYER {contestant.number}</div>
      </div>

      {/* Info */}
      <div className="contestant-card__info">
        <h3 className="contestant-card__name">{contestant.name}</h3>
        <p className="contestant-card__profession">{contestant.profession}</p>
      </div>
    </motion.div>
  );
}

export default function Contestants() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-10%' });

  return (
    <section id="contestants" className="contestants section-padding">
      <div className="contestants__bg" />

      <div className="section-container">
        {/* Header */}
        <div className="contestants__header" ref={ref}>
          <motion.div
            className="section-label"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
          >
            THE PLAYERS
          </motion.div>

          <motion.h2
            className="contestants__title"
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.1 }}
          >
            MEET THE PLAYERS
          </motion.h2>

          <motion.p
            className="contestants__subtitle"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            EVERYONE HAS SOMETHING TO HIDE.
          </motion.p>
        </div>

        {/* Grid */}
        <div className="contestants__grid">
          {contestants.map((c, i) => (
            <ContestantCard key={c.id} contestant={c} index={i} />
          ))}
        </div>

        {/* Disclaimer */}
        <motion.p
          className="contestants__disclaimer"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 1, delay: 1 }}
        >
          * All contestant profiles are fictional placeholder data for this demo concept.
        </motion.p>
      </div>
    </section>
  );
}
