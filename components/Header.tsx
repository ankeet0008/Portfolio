import React from 'react';
import { motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';

interface HeaderProps {
  onNavigate: (view: 'home' | 'about' | 'contact' | 'work') => void;
  isLoading?: boolean;
  curtainStarted?: boolean;
}

const Header: React.FC<HeaderProps> = ({ onNavigate, isLoading = false, curtainStarted = false }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  return (
    <motion.header
      initial={{ opacity: 0, y: -100 }}
      animate={curtainStarted || !isLoading ? { opacity: 1, y: 0 } : { opacity: 0, y: -100 }}
      transition={{ duration: 0.8, delay: curtainStarted && isLoading ? 0.15 : 0, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-0 left-0 w-full z-[100] px-4 md:px-6 pt-4"
    >
      {/* Main Navbar — full-width rectangle */}
      <div className="w-full bg-white/80 backdrop-blur-xl rounded-xl px-6 md:px-10 py-3.5 flex items-center justify-between shadow-[0_2px_20px_rgba(0,0,0,0.08)] border border-neutral-200/60">

        {/* Left: Logo + Name */}
        <button
          onClick={() => onNavigate('home')}
          className="flex items-center gap-3 hover:opacity-70 transition-opacity duration-300"
        >
          <img
            src="/anfavicon.png"
            alt="AN"
            className="w-8 h-8 rounded-lg object-contain"
          />
          <span className="text-sm font-clash font-medium tracking-wide text-neutral-900 uppercase flex items-center gap-[0.35em]">
            {['Design', 'by', 'Ankit'].map((word, i) => (
              <span key={word} className="overflow-hidden inline-flex">
                <motion.span
                  initial={{ y: '-100%', opacity: 0 }}
                  animate={curtainStarted || !isLoading ? { y: '0%', opacity: 1 } : { y: '-100%', opacity: 0 }}
                  transition={{
                    duration: 0.45,
                    delay: curtainStarted && isLoading ? 0.6 + i * 0.08 : i * 0.08,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className={word === 'Ankit' ? 'font-bold' : ''}
                >
                  {word}
                </motion.span>
              </span>
            ))}
          </span>
        </button>

        {/* Center: Nav Links (Desktop) */}
        <nav className="hidden md:flex items-center gap-10">
          {[
            { label: 'About', view: 'about' as const },
            { label: 'Work', view: 'work' as const },
            { label: 'Contact', view: 'contact' as const },
          ].map((item) => (
            <button
              key={item.label}
              onClick={() => onNavigate(item.view)}
              className="text-[13px] font-clash font-medium uppercase tracking-[0.15em] text-neutral-600 hover:text-neutral-900 transition-colors duration-300 relative group"
            >
              {item.label}
              <span className="absolute -bottom-1 left-0 w-0 h-[1.5px] bg-neutral-900 group-hover:w-full transition-all duration-300" />
            </button>
          ))}
        </nav>

        {/* Right: Hire Me Button (Desktop) */}
        <button
          onClick={() => onNavigate('contact')}
          className="hidden md:flex items-center text-[13px] font-clash font-semibold uppercase tracking-[0.12em] text-neutral-900 border border-neutral-300 rounded-lg px-5 py-2 hover:bg-neutral-900 hover:text-white hover:border-neutral-900 transition-all duration-300"
        >
          Hire Me
        </button>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden p-1 text-neutral-700"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -10, scale: 0.97 }}
          transition={{ duration: 0.2, ease: 'easeOut' }}
          className="mt-2 bg-white/90 backdrop-blur-xl rounded-xl px-6 py-5 shadow-[0_8px_30px_rgba(0,0,0,0.12)] border border-neutral-200/60 md:hidden"
        >
          <nav className="flex flex-col gap-4">
            {[
              { label: 'About', view: 'about' as const },
              { label: 'Work', view: 'work' as const },
              { label: 'Contact', view: 'contact' as const },
            ].map((item) => (
              <button
                key={item.label}
                onClick={() => {
                  onNavigate(item.view);
                  setMobileMenuOpen(false);
                }}
                className="text-sm font-clash font-medium uppercase tracking-[0.15em] text-neutral-700 hover:text-neutral-900 transition-colors text-left py-2 border-b border-neutral-100 last:border-0"
              >
                {item.label}
              </button>
            ))}
            <button
              onClick={() => {
                onNavigate('contact');
                setMobileMenuOpen(false);
              }}
              className="mt-2 text-sm font-clash font-semibold uppercase tracking-[0.12em] text-white bg-neutral-900 rounded-lg py-3 text-center hover:bg-black transition-colors"
            >
              Hire Me
            </button>
          </nav>
        </motion.div>
      )}
    </motion.header>
  );
};

export default Header;