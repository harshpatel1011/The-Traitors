import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { RiPlayCircleLine } from 'react-icons/ri';
import { episodes } from '../data/contestants';
import './Episodes.css';

function EpisodeCard({ ep, index }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-5%' });

  return (
    <motion.div
      ref={ref}
      className={`ep-card${!ep.available ? ' ep-card--locked' : ''}`}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay: (index % 3) * 0.12, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -6 }}
    >
      {/* Episode visual */}
      <div className="ep-card__visual">
        <div className="ep-card__number-bg">{ep.number}</div>
        <div className="ep-card__overlay-gradient" />
        {!ep.available && <div className="ep-card__locked-badge">COMING SOON</div>}
      </div>

      <div className="ep-card__content">
        <div className="ep-card__meta">
          <span className="ep-card__ep-label">EPISODE {ep.number}</span>
          <span className="ep-card__duration">{ep.duration}</span>
        </div>

        <h3 className="ep-card__title">{ep.title}</h3>
        <div className="ep-card__divider" />
        <p className="ep-card__desc">{ep.description}</p>

        <motion.button
          className={`ep-card__btn${!ep.available ? ' ep-card__btn--disabled' : ''}`}
          disabled={!ep.available}
          whileHover={ep.available ? { scale: 1.03 } : {}}
          whileTap={ep.available ? { scale: 0.97 } : {}}
        >
          <RiPlayCircleLine />
          {ep.available ? 'WATCH NOW' : 'UNAVAILABLE'}
        </motion.button>
      </div>
    </motion.div>
  );
}

export default function Episodes() {
  const headRef = useRef(null);
  const headInView = useInView(headRef, { once: true, margin: '-10%' });

  return (
    <section id="episodes" className="episodes section-padding">
      <div className="episodes__bg" />

      <div className="section-container">
        {/* Header */}
        <div className="episodes__header" ref={headRef}>
          <motion.div
            className="section-label"
            initial={{ opacity: 0, y: 20 }}
            animate={headInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
          >
            SEASON ONE
          </motion.div>

          <motion.h2
            className="episodes__title"
            initial={{ opacity: 0, y: 40 }}
            animate={headInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.1 }}
          >
            THE JOURNEY
          </motion.h2>

          <motion.p
            className="episodes__subtitle"
            initial={{ opacity: 0, y: 20 }}
            animate={headInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Every episode, the stakes rise. Every decision changes everything.
          </motion.p>
        </div>

        {/* Grid */}
        <div className="episodes__grid">
          {episodes.map((ep, i) => (
            <EpisodeCard key={ep.id} ep={ep} index={i} />
          ))}
        </div>

        <motion.p
          className="episodes__disclaimer"
          initial={{ opacity: 0 }}
          animate={headInView ? { opacity: 1 } : {}}
          transition={{ duration: 1, delay: 0.8 }}
        >
          * Episode titles and descriptions are fictional placeholder content for this demo concept.
        </motion.p>
      </div>
    </section>
  );
}
