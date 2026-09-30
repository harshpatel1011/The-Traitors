import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RiCloseLine } from 'react-icons/ri';
import './App.css';

import Navbar from './components/Navbar';
import Hero from './components/Hero';
import GameIntro from './components/GameIntro';
import GameSection from './components/GameSection';
import Contestants from './components/Contestants';
import Traitors from './components/Traitors';
import TrustMeter from './components/TrustMeter';
import Episodes from './components/Episodes';
import Castle from './components/Castle';
import Prize from './components/Prize';
import Trailer from './components/Trailer';
import Gallery from './components/Gallery';
import FinalCTA from './components/FinalCTA';
import Footer from './components/Footer';

function TrailerModal({ open, onClose }) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="trailer-modal-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0,0,0,0.95)',
            backdropFilter: 'blur(12px)',
            zIndex: 3000,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '1.5rem',
          }}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0, filter: 'blur(10px)' }}
            animate={{ scale: 1, opacity: 1, filter: 'blur(0px)' }}
            exit={{ scale: 0.8, opacity: 0, filter: 'blur(10px)' }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
            style={{
              position: 'relative',
              width: '100%',
              maxWidth: '900px',
              background: '#000',
              border: '1px solid rgba(201,168,76,0.3)',
            }}
          >
            {/* Close */}
            <button
              onClick={onClose}
              style={{
                position: 'absolute',
                top: '-3rem',
                right: 0,
                background: 'none',
                border: '1px solid rgba(201,168,76,0.3)',
                color: 'rgba(250,245,237,0.7)',
                width: '2.5rem',
                height: '2.5rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                fontSize: '1.3rem',
                transition: 'all 0.2s',
              }}
              aria-label="Close trailer"
            >
              <RiCloseLine />
            </button>

            {/* Video placeholder */}
            <div
              style={{
                aspectRatio: '16/9',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '1.5rem',
                background: 'linear-gradient(135deg, #0a0505, #05020a)',
                padding: '3rem',
                textAlign: 'center',
              }}
            >
              <div style={{
                fontFamily: 'Cinzel, serif',
                fontSize: 'clamp(0.5rem, 1.5vw, 0.7rem)',
                letterSpacing: '0.4em',
                color: 'rgba(201,168,76,0.6)',
                textTransform: 'uppercase',
              }}>
                OFFICIAL TRAILER
              </div>
              <div style={{
                fontFamily: 'Cinzel, serif',
                fontSize: 'clamp(2rem, 6vw, 4rem)',
                fontWeight: 900,
                letterSpacing: '0.08em',
                color: 'rgba(250,245,237,0.9)',
              }}>
                THE TRAITORS INDIA
              </div>
              <div style={{
                fontFamily: 'Cormorant Garamond, serif',
                fontStyle: 'italic',
                fontSize: 'clamp(0.85rem, 2vw, 1.1rem)',
                color: 'rgba(250,245,237,0.35)',
                maxWidth: '500px',
              }}>
                Trailer video would be embedded here in a production build.
                This is a demo concept page.
              </div>
              <div style={{
                width: '8rem',
                height: '1px',
                background: 'linear-gradient(90deg, transparent, rgba(201,168,76,0.6), transparent)',
              }} />
              <div style={{
                fontFamily: 'Cinzel, serif',
                fontSize: '0.55rem',
                letterSpacing: '0.3em',
                color: 'rgba(201,168,76,0.4)',
              }}>
                SEASON ONE · 2026
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default function App() {
  const [trailerOpen, setTrailerOpen] = useState(false);

  return (
    <>
      <Navbar onTrailerClick={() => setTrailerOpen(true)} />

      <main>
        <Hero onTrailerClick={() => setTrailerOpen(true)} />
        <GameIntro />
        <GameSection />
        <Contestants />
        <Traitors />
        <TrustMeter />
        <Episodes />
        <Castle />
        <Prize />
        <Trailer onOpen={() => setTrailerOpen(true)} />
        <Gallery />
        <FinalCTA />
      </main>

      <Footer />

      <TrailerModal open={trailerOpen} onClose={() => setTrailerOpen(false)} />
    </>
  );
}
