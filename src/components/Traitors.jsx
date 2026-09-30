import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import './Traitors.css';

const traitorData = [
  {
    id: 1,
    code: 'TRAITOR — I',
    name: "KRYSTLE\nD'SOUZA",
    profession: 'Actor · Age 36',
    strategy: 'ORIGINAL TRAITOR',
    episodes: '9 eps',
    status: 'WINNER',
    story: 'Appointed from night one. Never once suspected. Memorised an eviction letter word-for-word to protect her cover. Walked away with the prize.',
    stats: [
      { label: 'Deception Rating', value: 98 },
      { label: 'Suspicion Raised', value: 10 },
      { label: 'Episodes Survived', value: 95 },
    ],
    tag: 'NEVER SUSPECTED',
    accent: 'gold',
  },
  {
    id: 2,
    code: 'TRAITOR — II',
    name: 'RIDA\nTHARANA',
    profession: 'Content Creator · Age 27',
    strategy: 'BLACKMAILED (EP 8)',
    episodes: '3 eps as Traitor',
    status: 'WINNER',
    story: 'Started as an Innocent. In Episode 8, Krystle blackmailed her — join the Traitors or be murdered. She accepted despite holding a shield. Transformed and won.',
    stats: [
      { label: 'Deception Rating', value: 90 },
      { label: 'Suspicion Raised', value: 22 },
      { label: 'Adaptability', value: 97 },
    ],
    tag: 'TURNED TRAITOR',
    accent: 'crimson',
  },
  {
    id: 3,
    code: 'TRAITOR — III',
    name: 'HARMAN\nSINGHA',
    profession: 'Actor · Age 38',
    strategy: 'ORIGINAL TRAITOR',
    episodes: '3 eps',
    status: 'BANISHED (EP 3)',
    story: 'An original Traitor who fell early. The Innocents correctly identified and banished him in Episode 3. Bold game, abrupt end.',
    stats: [
      { label: 'Deception Rating', value: 62 },
      { label: 'Suspicion Raised', value: 75 },
      { label: 'Episodes Survived', value: 30 },
    ],
    tag: 'ORIGINAL · EXPOSED',
    accent: 'dark',
  },
  {
    id: 4,
    code: 'TRAITOR — IV',
    name: 'AADITYA\n"KULLU"',
    profession: 'Stand-up Comedian · Age 29',
    strategy: 'ORIGINAL TRAITOR',
    episodes: '6 eps',
    status: 'BANISHED (EP 6)',
    story: 'Original Traitor who used humour as his armour. Survived six episodes before the Innocents finally voted him out in Episode 6.',
    stats: [
      { label: 'Deception Rating', value: 74 },
      { label: 'Suspicion Raised', value: 65 },
      { label: 'Episodes Survived', value: 60 },
    ],
    tag: 'ORIGINAL · EXPOSED',
    accent: 'dark',
  },
  {
    id: 5,
    code: 'TRAITOR — V',
    name: 'SHAHNEEL\nGILL',
    profession: 'Lifestyle Creator · Age 28',
    strategy: 'RECRUITED (EP 2)',
    episodes: '5 eps as Traitor',
    status: 'BANISHED (EP 7)',
    story: 'Started as an Innocent — secretly recruited by the original Traitors in Episode 2. Played both sides for five episodes before being exposed in Episode 7.',
    stats: [
      { label: 'Deception Rating', value: 78 },
      { label: 'Suspicion Raised', value: 60 },
      { label: 'Dual-role Skill', value: 82 },
    ],
    tag: 'RECRUITED · EXPOSED',
    accent: 'dark',
  },
];

function StatBar({ label, value, accent, delay }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  return (
    <div className="tc-stat" ref={ref}>
      <div className="tc-stat__header">
        <span className="tc-stat__label">{label}</span>
        <span className="tc-stat__val">{value}%</span>
      </div>
      <div className="tc-stat__track">
        <motion.div
          className={`tc-stat__fill tc-stat__fill--${accent}`}
          initial={{ width: 0 }}
          animate={inView ? { width: `${value}%` } : {}}
          transition={{ duration: 1.2, delay, ease: [0.16, 1, 0.3, 1] }}
        />
      </div>
    </div>
  );
}

function TraitorCard({ traitor, index }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-10%' });

  return (
    <motion.div
      ref={ref}
      className={`traitor-card traitor-card--${traitor.accent}`}
      initial={{ opacity: 0, y: 70 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 1, delay: index * 0.2, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Corner ornaments */}
      <span className="traitor-card__corner traitor-card__corner--tl" />
      <span className="traitor-card__corner traitor-card__corner--tr" />
      <span className="traitor-card__corner traitor-card__corner--bl" />
      <span className="traitor-card__corner traitor-card__corner--br" />

      {/* Top row */}
      <div className="traitor-card__top">
        <span className="traitor-card__code">{traitor.code}</span>
        <span className={`traitor-card__tag traitor-card__tag--${traitor.accent}`}>{traitor.tag}</span>
      </div>

      {/* Avatar placeholder */}
      <div className={`traitor-card__avatar traitor-card__avatar--${traitor.accent}`}>
        <div className="traitor-card__avatar-inner">
          <div className="traitor-card__silhouette">
            <svg viewBox="0 0 100 140" aria-hidden="true">
              <ellipse cx="50" cy="30" rx="20" ry="24" fill="currentColor" opacity="0.15" />
              <path d="M5 100 Q15 65 50 55 Q85 65 95 100 L95 140 L5 140 Z" fill="currentColor" opacity="0.12" />
            </svg>
          </div>
          <div className="traitor-card__initials">
            {traitor.name.trim().split(/\s+/).map(w => w[0]).join('')}
          </div>
        </div>
        <div className={`traitor-card__eye traitor-card__eye--${traitor.accent}`} />
      </div>

      {/* Name */}
      <div className="traitor-card__name-block">
        <h3 className="traitor-card__name">
          {traitor.name.split('\n').map((line, i) => (
            <span key={i} className={i === 1 ? `traitor-card__name-accent traitor-card__name-accent--${traitor.accent}` : ''}>{line}</span>
          ))}
        </h3>
        <p className="traitor-card__profession">{traitor.profession}</p>
      </div>

      {/* Divider */}
      <div className={`traitor-card__divider traitor-card__divider--${traitor.accent}`} />

      {/* Story */}
      <p className="traitor-card__story">{traitor.story}</p>

      {/* Stats */}
      <div className="traitor-card__stats">
        {traitor.stats.map((s, i) => (
          <StatBar
            key={s.label}
            label={s.label}
            value={s.value}
            accent={traitor.accent}
            delay={0.4 + i * 0.15}
          />
        ))}
      </div>

      {/* Meta row */}
      <div className="traitor-card__meta">
        <div className="traitor-card__meta-item">
          <span className="traitor-card__meta-label">STRATEGY</span>
          <span className="traitor-card__meta-val">{traitor.strategy}</span>
        </div>
        <div className="traitor-card__meta-sep" />
        <div className="traitor-card__meta-item">
          <span className="traitor-card__meta-label">EPISODES</span>
          <span className="traitor-card__meta-val">{traitor.episodes}</span>
        </div>
        <div className="traitor-card__meta-sep" />
        <div className="traitor-card__meta-item">
          <span className="traitor-card__meta-label">OUTCOME</span>
          <span className={`traitor-card__meta-val traitor-card__meta-val--winner`}>🏆 {traitor.status}</span>
        </div>
      </div>
    </motion.div>
  );
}

export default function Traitors() {
  const headRef = useRef(null);
  const headInView = useInView(headRef, { once: true, margin: '-10%' });
  const prizeRef = useRef(null);
  const prizeInView = useInView(prizeRef, { once: true, margin: '-10%' });

  return (
    <section id="traitors" className="traitors section-padding">
      <div className="traitors__bg" />
      <div className="traitors__vignette" />

      <div className="section-container">
        {/* Header */}
        <div className="traitors__header" ref={headRef}>
          <motion.div
            className="section-label traitors__label"
            initial={{ opacity: 0, y: 16 }}
            animate={headInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
          >
            CLASSIFIED · SEASON 2 REVEAL
          </motion.div>

          <motion.h2
            className="traitors__title"
            initial={{ opacity: 0, y: 50 }}
            animate={headInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1.1, delay: 0.1 }}
          >
            THE TRAITORS
          </motion.h2>

          <motion.p
            className="traitors__subtitle"
            initial={{ opacity: 0, y: 24 }}
            animate={headInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.25 }}
          >
            Two players. Hidden in plain sight. Nineteen Innocents never stood a chance.
          </motion.p>
        </div>

        {/* Cards */}
        <div className="traitors__cards">
          {traitorData.map((t, i) => (
            <TraitorCard key={t.id} traitor={t} index={i} />
          ))}
        </div>

        {/* Bottom prize callout */}
        <motion.div
          className="traitors__prize-callout"
          ref={prizeRef}
          initial={{ opacity: 0, y: 30 }}
          animate={prizeInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: 0.2 }}
        >
          <span className="traitors__prize-label">COMBINED PRIZE WON</span>
          <span className="traitors__prize-amount">₹ 66,00,000</span>
          <span className="traitors__prize-sub">
            "Rise and shine… it's <em>dhoka time</em>." — Karan Johar
          </span>
        </motion.div>
      </div>
    </section>
  );
}
