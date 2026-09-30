import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { RiShieldUserLine, RiEyeLine, RiVipDiamondLine, RiTrophyLine } from 'react-icons/ri';
import './GameSection.css';

const cards = [
  {
    icon: RiShieldUserLine,
    label: 'THE FAITHFUL',
    description: 'They must uncover the Traitors before it\'s too late. Trust is their greatest weapon — and their greatest weakness.',
    accent: 'faithful',
  },
  {
    icon: RiEyeLine,
    label: 'THE TRAITORS',
    description: 'Hidden among the players, they manipulate, deceive, and eliminate. Every night, a Faithful disappears.',
    accent: 'traitor',
  },
  {
    icon: RiVipDiamondLine,
    label: 'THE BANISHMENT',
    description: 'Every roundtable vote could expose the wrong person. Innocence is no guarantee of safety.',
    accent: 'banishment',
  },
  {
    icon: RiTrophyLine,
    label: 'THE PRIZE',
    description: 'Survive the game. Claim the fortune. But first — you must know who to trust.',
    accent: 'prize',
  },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};

const cardVariant = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } },
};

export default function GameSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-10%' });
  const headRef = useRef(null);
  const headInView = useInView(headRef, { once: true, margin: '-10%' });

  return (
    <section id="game" className="game-section section-padding">
      <div className="game-section__bg" />

      <div className="section-container">
        {/* Header */}
        <div className="game-section__header" ref={headRef}>
          <motion.div
            className="section-label"
            initial={{ opacity: 0, y: 20 }}
            animate={headInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
          >
            HOW IT WORKS
          </motion.div>

          <motion.h2
            className="game-section__title"
            initial={{ opacity: 0, y: 40 }}
            animate={headInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.1 }}
          >
            THE GAME
          </motion.h2>

          <motion.p
            className="game-section__subtitle"
            initial={{ opacity: 0, y: 20 }}
            animate={headInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            TRUST NO ONE.
          </motion.p>
        </div>

        {/* Cards */}
        <motion.div
          className="game-section__grid"
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
        >
          {cards.map((card) => {
            const Icon = card.icon;
            return (
              <motion.div
                key={card.label}
                className={`game-card game-card--${card.accent}`}
                variants={cardVariant}
                whileHover={{ y: -8, transition: { duration: 0.3 } }}
              >
                <div className="game-card__top">
                  <div className="game-card__icon-wrap">
                    <Icon className="game-card__icon" />
                  </div>
                </div>
                <div className="game-card__body">
                  <h3 className="game-card__label">{card.label}</h3>
                  <div className="game-card__divider" />
                  <p className="game-card__desc">{card.description}</p>
                </div>
                <div className="game-card__corner game-card__corner--tl" />
                <div className="game-card__corner game-card__corner--tr" />
                <div className="game-card__corner game-card__corner--bl" />
                <div className="game-card__corner game-card__corner--br" />
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
