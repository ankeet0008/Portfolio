import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';

interface HeaderProps {
  onNavigate: (view: 'home' | 'about' | 'contact' | 'work') => void;
  isLoading?: boolean;
  curtainStarted?: boolean;
}

const SCROLL_THRESHOLD = 80;

// ─── Character Scramble Animation (Kraken-style) ─────────────────────
// Each letter scrambles through random characters, then resolves one-by-one
const SCRAMBLE_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%&*';

function useCharScramble(original: string) {
  const [display, setDisplay] = useState(original);
  const frameRef = useRef<number | null>(null);
  const timeoutsRef = useRef<number[]>([]);

  const clearAll = useCallback(() => {
    if (frameRef.current !== null) {
      cancelAnimationFrame(frameRef.current);
      frameRef.current = null;
    }
    timeoutsRef.current.forEach(clearTimeout);
    timeoutsRef.current = [];
  }, []);

  const onHoverStart = useCallback(() => {
    clearAll();
    const len = original.length;
    const resolved = new Array(len).fill(false);
    let startTime: number | null = null;
    const totalDuration = 600; // ms total scramble
    const resolveDelay = 300; // start resolving chars after this

    const animate = (timestamp: number) => {
      if (startTime === null) startTime = timestamp;
      const elapsed = timestamp - startTime;

      // Build display string
      const chars = [];
      for (let i = 0; i < len; i++) {
        if (original[i] === ' ') {
          chars.push(' ');
        } else if (resolved[i]) {
          chars.push(original[i]);
        } else {
          // Check if this char should resolve
          const charResolveTime = resolveDelay + (i / len) * (totalDuration - resolveDelay);
          if (elapsed >= charResolveTime) {
            resolved[i] = true;
            chars.push(original[i]);
          } else {
            chars.push(SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)]);
          }
        }
      }
      setDisplay(chars.join(''));

      if (elapsed < totalDuration) {
        frameRef.current = requestAnimationFrame(animate);
      } else {
        setDisplay(original);
      }
    };

    frameRef.current = requestAnimationFrame(animate);
  }, [original, clearAll]);

  const onHoverEnd = useCallback(() => {
    clearAll();
    setDisplay(original);
  }, [original, clearAll]);

  useEffect(() => {
    return () => clearAll();
  }, [clearAll]);

  return { display, onHoverStart, onHoverEnd };
}

// ─── ScrambleNavLink (Kraken-style vertical nav link) ────────────────
interface ScrambleNavLinkProps {
  label: string;
  onClick: () => void;
}

const ScrambleNavLink: React.FC<ScrambleNavLinkProps> = ({ label, onClick }) => {
  const { display, onHoverStart, onHoverEnd } = useCharScramble(label.toUpperCase());
  const isScrambling = display !== label.toUpperCase();

  return (
    <button
      onClick={onClick}
      onMouseEnter={onHoverStart}
      onMouseLeave={onHoverEnd}
      className="block text-right transition-all duration-200 group"
      style={{
        fontFamily: "'Clash Display', sans-serif",
        fontWeight: 600,
        fontSize: '14px',
        letterSpacing: '0.15em',
        lineHeight: '2',
        color: isScrambling ? 'rgba(255,255,255,1)' : 'rgba(255,255,255,0.7)',
        textTransform: 'uppercase',
        background: 'none',
        border: 'none',
        padding: '0',
        cursor: 'pointer',
        position: 'relative',
      }}
    >
      {/* Scramble underline that sweeps in */}
      <span
        style={{
          position: 'absolute',
          bottom: '4px',
          right: '0',
          height: '1px',
          backgroundColor: 'rgba(255,255,255,0.5)',
          width: isScrambling ? '100%' : '0%',
          transition: 'width 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      />
      <span style={{ display: 'inline-block', minWidth: `${label.length}ch` }}>
        {display}
      </span>
    </button>
  );
};

// ─── Header Component (Kraken-style) ─────────────────────────────────
const Header: React.FC<HeaderProps> = ({ onNavigate, isLoading = false, curtainStarted = false }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const ticking = useRef(false);

  const handleScroll = useCallback(() => {
    setScrolled(window.scrollY > SCROLL_THRESHOLD);
    ticking.current = false;
  }, []);

  useEffect(() => {
    const onScroll = () => {
      if (!ticking.current) {
        ticking.current = true;
        requestAnimationFrame(handleScroll);
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [handleScroll]);

  const showNav = curtainStarted || !isLoading;

  return (
    <>
      {/* ── Fixed Header — Transparent, no background bar ── */}
      <motion.header
        initial={{ opacity: 0 }}
        animate={showNav ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.8, delay: curtainStarted && isLoading ? 0.15 : 0, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-0 left-0 w-full z-[100] pointer-events-none"
        style={{ mixBlendMode: 'difference' }}
      >
        {/* Inner container with padding */}
        <div className="w-full flex items-start justify-between px-6 md:px-10 pt-6 md:pt-8">

          {/* ── Left: Logo + Collapsing Name ── */}
          <button
            onClick={() => onNavigate('home')}
            className="flex items-center pointer-events-auto group"
            style={{
              gap: scrolled ? '0px' : '12px',
              transition: 'gap 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
            }}
          >
            {/* Favicon — always visible */}
            <motion.img
              src="/anfavicon.png"
              alt="AN"
              className="flex-shrink-0 invert"
              initial={{ opacity: 0, y: -20 }}
              animate={showNav ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
              transition={{ duration: 0.5, delay: curtainStarted && isLoading ? 0.3 : 0, ease: [0.16, 1, 0.3, 1] }}
              style={{
                width: scrolled ? '34px' : '42px',
                height: scrolled ? '34px' : '42px',
                transition: 'width 0.5s cubic-bezier(0.16, 1, 0.3, 1), height 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
                filter: 'invert(1)',
              }}
            />

            {/* "Design by Ankit" — collapses on scroll */}
            <div
              style={{
                overflow: 'hidden',
                maxWidth: scrolled ? '0px' : '250px',
                opacity: scrolled ? 0 : 1,
                transition: 'max-width 0.6s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.35s ease',
              }}
            >
              <span className="font-clash font-semibold tracking-[0.15em] text-white uppercase flex items-center gap-[0.4em] whitespace-nowrap text-sm">
                {['Design', 'by', 'Ankit'].map((word, i) => (
                  <span key={word} className="overflow-hidden inline-flex">
                    <motion.span
                      initial={{ y: '-110%', opacity: 0 }}
                      animate={showNav ? { y: '0%', opacity: 1 } : { y: '-110%', opacity: 0 }}
                      transition={{
                        duration: 0.5,
                        delay: curtainStarted && isLoading ? 0.6 + i * 0.08 : i * 0.08,
                        ease: [0.16, 1, 0.3, 1],
                      }}
                      className={word === 'Ankit' ? 'font-bold' : 'font-medium'}
                    >
                      {word}
                    </motion.span>
                  </span>
                ))}
              </span>
            </div>
          </button>

          {/* ── Right: Vertical Nav Links (Desktop) — Kraken-style ── */}
          <nav className="hidden md:flex flex-col items-end pointer-events-auto" style={{ gap: '0px' }}>
            {[
              { label: 'Home', view: 'home' as const, delay: 0 },
              { label: 'About', view: 'about' as const, delay: 0.06 },
              { label: 'Work', view: 'work' as const, delay: 0.12 },
              { label: 'Contact', view: 'contact' as const, delay: 0.18 },
            ].map((item) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, x: 30 }}
                animate={showNav ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
                transition={{
                  duration: 0.5,
                  delay: curtainStarted && isLoading ? 0.4 + item.delay : item.delay,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                <ScrambleNavLink
                  label={item.label}
                  onClick={() => {
                    onNavigate(item.view);
                  }}
                />
              </motion.div>
            ))}
          </nav>

          {/* ── Mobile Menu Toggle ── */}
          <button
            className="md:hidden pointer-events-auto p-1 text-white"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </motion.header>

      {/* ── Mobile Menu Overlay ── */}
      {mobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[99] bg-neutral-950/95 backdrop-blur-xl flex flex-col items-center justify-center"
        >
          <button
            className="absolute top-6 right-6 text-white p-2"
            onClick={() => setMobileMenuOpen(false)}
          >
            <X size={28} />
          </button>
          <nav className="flex flex-col items-center gap-8">
            {[
              { label: 'Home', view: 'home' as const },
              { label: 'About', view: 'about' as const },
              { label: 'Work', view: 'work' as const },
              { label: 'Contact', view: 'contact' as const },
            ].map((item, i) => (
              <motion.button
                key={item.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                onClick={() => {
                  onNavigate(item.view);
                  setMobileMenuOpen(false);
                }}
                className="text-2xl font-clash font-semibold uppercase tracking-[0.2em] text-white hover:text-neutral-400 transition-colors"
              >
                {item.label}
              </motion.button>
            ))}
          </nav>
        </motion.div>
      )}
    </>
  );
};

export default Header;