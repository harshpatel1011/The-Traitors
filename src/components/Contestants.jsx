import { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { contestants } from '../data/contestants';
import './Contestants.css';

const ROLE_COLORS = {
  TRAITOR: '#8b0000',
  INNOCENT: '#1a2a3a',
};

function getInitials(name) {
  return name.replace(/["']/g, '').split(/\s+/).slice(0, 2).map(w => w[0]).join('');
}

function getRoleClass(role, winner) {
  if (winner) return 'winner';
  if (role === 'TRAITOR') return 'traitor';
  return 'innocent';
}

function ContestantCard({ contestant, index }) {
  const [hovered, setHovered] = useState(false);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-5%' });
  const roleClass = getRoleClass(contestant.role, contestant.winner);

  return (
    <motion.div
      ref={ref}
      className={`contestant-card contestant-card--${roleClass}`}
      initial={{ opacity: 0, y: 60 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay: (index % 5) * 0.07, ease: [0.16, 1, 0.3, 1] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      whileHover={{ y: -8 }}
    >
      {/* Image / Avatar */}
      <div className="contestant-card__image-wrap">
        <div
          className="contestant-card__avatar"
          style={{
            background: `radial-gradient(ellipse at 30% 30%, ${ROLE_COLORS[contestant.role] || '#1a2a3a'}66, ${ROLE_COLORS[contestant.role] || '#1a2a3a'}11)`,
          }}
        >
          <span className="contestant-card__initials">{getInitials(contestant.name)}</span>
          {contestant.role === 'TRAITOR' && (
            <div className="contestant-card__traitor-glow" />
          )}
        </div>

        {/* Hover overlay */}
        <AnimatePresence>
          {hovered && (
            <motion.div
              className="contestant-card__overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
            >
              <div className="contestant-card__overlay-info">
                <p className="contestant-card__age">Age: {contestant.age}</p>
                <p className="contestant-card__overlay-desc">{contestant.description}</p>
                {contestant.note && (
                  <p className="contestant-card__note">⚑ {contestant.note}</p>
                )}
                <div className={`contestant-card__finish-badge contestant-card__finish-badge--${roleClass}`}>
                  {contestant.finish}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Gold/red border on hover */}
        <motion.div
          className={`contestant-card__border contestant-card__border--${roleClass}`}
          animate={{ opacity: hovered ? 1 : 0 }}
          transition={{ duration: 0.25 }}
        />

        {/* Player number */}
        <div className="contestant-card__num">PLAYER {contestant.number}</div>

        {/* Role badge */}
        {(contestant.winner || contestant.role === 'TRAITOR') && (
          <div className={`contestant-card__role-badge contestant-card__role-badge--${roleClass}`}>
            {contestant.winner ? '🏆 WINNER' : '⚔ TRAITOR'}
          </div>
        )}
      </div>

      {/* Info */}
      <div className="contestant-card__info">
        <h3 className="contestant-card__name">
          {contestant.displayName || contestant.name}
          {contestant.displayName && (
            <span className="contestant-card__alias">
              {contestant.name.split(' ')[0]} {contestant.name.split(' ')[1]}
            </span>
          )}
        </h3>
        <p className="contestant-card__profession">{contestant.profession}</p>
        <div className={`contestant-card__status-badge contestant-card__status-badge--${roleClass}`}>
          <span className="contestant-card__status-dot" />
          {contestant.role === 'TRAITOR' ? (contestant.winner ? 'WINNER · TRAITOR' : 'TRAITOR') : 'INNOCENT'}
        </div>
      </div>
    </motion.div>
  );
}

export default function Contestants() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-10%' });

  // Sort: winners first, then by id
  const sorted = [...contestants].sort((a, b) => {
    if (a.winner && !b.winner) return -1;
    if (!a.winner && b.winner) return 1;
    if (a.role === 'TRAITOR' && b.role !== 'TRAITOR') return -1;
    if (a.role !== 'TRAITOR' && b.role === 'TRAITOR') return 1;
    return a.id - b.id;
  });

  const traitorCount = contestants.filter(c => c.role === 'TRAITOR').length;
  const winnerCount = contestants.filter(c => c.winner).length;

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
            SEASON 2 · 21 PLAYERS · {traitorCount} TRAITORS CONFIRMED
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
            EVERYONE HAD SOMETHING TO HIDE.
          </motion.p>

          {/* Stats row */}
          <motion.div
            className="contestants__stats"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <div className="contestants__stat">
              <span className="contestants__stat-num">21</span>
              <span className="contestants__stat-label">Contestants</span>
            </div>
            <div className="contestants__stat-sep" />
            <div className="contestants__stat">
              <span className="contestants__stat-num contestants__stat-num--red">{traitorCount}</span>
              <span className="contestants__stat-label">Traitors</span>
            </div>
            <div className="contestants__stat-sep" />
            <div className="contestants__stat">
              <span className="contestants__stat-num contestants__stat-num--gold">{winnerCount}</span>
              <span className="contestants__stat-label">Winners</span>
            </div>
            <div className="contestants__stat-sep" />
            <div className="contestants__stat">
              <span className="contestants__stat-num">10</span>
              <span className="contestants__stat-label">Episodes</span>
            </div>
          </motion.div>

          {/* Source note */}
          <motion.p
            className="contestants__source"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            Data sourced from{' '}
            <a
              href="https://en.wikipedia.org/wiki/The_Traitors_(Indian_TV_series)_season_2"
              target="_blank"
              rel="noopener noreferrer"
            >
              Wikipedia
            </a>
            . Hover cards to see elimination details.
          </motion.p>
        </div>

        {/* Grid */}
        <div className="contestants__grid">
          {sorted.map((c, i) => (
            <ContestantCard key={c.id} contestant={c} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
