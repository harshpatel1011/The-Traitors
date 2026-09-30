import { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { galleryCategories } from '../data/contestants';
import './Gallery.css';

// Generate placeholder gallery items with different sizes
const galleryItems = [
  { id: 1, category: 'THE CAST', size: 'large', label: 'THE PLAYERS ARRIVE', sub: 'Cast · Season One' },
  { id: 2, category: 'THE CASTLE', size: 'tall', label: 'GRAND CORRIDORS', sub: 'Location' },
  { id: 3, category: 'THE GAME', size: 'normal', label: 'THE ROUNDTABLE', sub: 'Game · Episode 1' },
  { id: 4, category: 'BEHIND THE SCENES', size: 'normal', label: 'BEHIND THE SCENES', sub: 'Production' },
  { id: 5, category: 'THE CAST', size: 'normal', label: 'PLAYER PORTRAIT', sub: 'Cast' },
  { id: 6, category: 'THE CASTLE', size: 'wide', label: 'THE DINING HALL', sub: 'Location' },
  { id: 7, category: 'THE GAME', size: 'normal', label: 'FIRST BANISHMENT', sub: 'Game · Episode 2' },
  { id: 8, category: 'BEHIND THE SCENES', size: 'normal', label: 'PRODUCTION TEAM', sub: 'Behind The Scenes' },
  { id: 9, category: 'THE CAST', size: 'normal', label: 'ALLIANCE MEETING', sub: 'Cast · Exclusive' },
  { id: 10, category: 'THE CASTLE', size: 'normal', label: "TRAITORS' CHAMBER", sub: 'Location · Exclusive' },
  { id: 11, category: 'THE GAME', size: 'wide', label: 'THE MISSION', sub: 'Game · Episode 3' },
  { id: 12, category: 'BEHIND THE SCENES', size: 'normal', label: 'LIGHTING SETUP', sub: 'Production' },
];

const BG_GRADIENTS = [
  'linear-gradient(135deg, #1a0505 0%, #2d0a0a 50%, #0a0510 100%)',
  'linear-gradient(135deg, #050a1a 0%, #0a1428 50%, #0a0505 100%)',
  'linear-gradient(135deg, #0a0a0a 0%, #1a140a 50%, #0d0808 100%)',
  'linear-gradient(135deg, #0a0514 0%, #14081e 50%, #050a05 100%)',
];

function GalleryItem({ item, index, active }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-5%' });
  const [hovered, setHovered] = useState(false);

  if (active !== 'ALL' && active !== item.category) return null;

  return (
    <motion.div
      ref={ref}
      className={`gallery-item gallery-item--${item.size}`}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={inView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.7, delay: (index % 4) * 0.08 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      layout
    >
      {/* Placeholder image */}
      <div
        className="gallery-item__img"
        style={{ background: BG_GRADIENTS[index % 4] }}
      >
        <div className="gallery-item__pattern" />
        <div className="gallery-item__texture">
          <span className="gallery-item__texture-label">{item.id.toString().padStart(2, '0')}</span>
        </div>
      </div>

      {/* Overlay */}
      <motion.div
        className="gallery-item__overlay"
        animate={{ opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="gallery-item__overlay-content">
          <span className="gallery-item__category">{item.category}</span>
          <h4 className="gallery-item__label">{item.label}</h4>
          <span className="gallery-item__sub">{item.sub}</span>
        </div>
      </motion.div>

      {/* Gold border */}
      <motion.div
        className="gallery-item__border"
        animate={{ opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      />
    </motion.div>
  );
}

export default function Gallery() {
  const [activeCategory, setActiveCategory] = useState('ALL');
  const headRef = useRef(null);
  const headInView = useInView(headRef, { once: true, margin: '-10%' });

  return (
    <section id="gallery" className="gallery section-padding">
      <div className="gallery__bg" />

      <div className="section-container">
        {/* Header */}
        <div className="gallery__header" ref={headRef}>
          <motion.div
            className="section-label"
            initial={{ opacity: 0, y: 20 }}
            animate={headInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
          >
            VISUAL ARCHIVE
          </motion.div>

          <motion.h2
            className="gallery__title"
            initial={{ opacity: 0, y: 40 }}
            animate={headInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.1 }}
          >
            GALLERY
          </motion.h2>
        </div>

        {/* Filter tabs */}
        <motion.div
          className="gallery__filters"
          initial={{ opacity: 0, y: 20 }}
          animate={headInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.25 }}
        >
          {galleryCategories.map((cat) => (
            <motion.button
              key={cat}
              className={`gallery__filter-btn${activeCategory === cat ? ' gallery__filter-btn--active' : ''}`}
              onClick={() => setActiveCategory(cat)}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              {cat}
            </motion.button>
          ))}
        </motion.div>

        {/* Masonry grid */}
        <motion.div className="gallery__grid" layout>
          <AnimatePresence>
            {galleryItems.map((item, i) => (
              <GalleryItem
                key={item.id}
                item={item}
                index={i}
                active={activeCategory}
              />
            ))}
          </AnimatePresence>
        </motion.div>

        <motion.p
          className="gallery__disclaimer"
          initial={{ opacity: 0 }}
          animate={headInView ? { opacity: 1 } : {}}
          transition={{ duration: 1, delay: 0.7 }}
        >
          * All gallery images are placeholder representations for this demo concept.
          No actual show imagery is used or implied.
        </motion.p>
      </div>
    </section>
  );
}
