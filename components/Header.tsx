import React from 'react';
import { Menu } from 'lucide-react';
import { motion } from 'framer-motion';

interface HeaderProps {
  onNavigate: (view: 'home' | 'about' | 'contact' | 'work') => void;
}

const Header: React.FC<HeaderProps> = ({ onNavigate }) => {
  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-0 left-0 w-full px-6 py-6 md:px-12 md:py-8 flex justify-between items-center z-50 mix-blend-difference text-white"
    >
      <button onClick={() => onNavigate('home')} className="flex flex-col leading-none text-left hover:opacity-70 transition-opacity">
        <span className="font-bold text-lg tracking-tight uppercase">Ankit</span>
        <span className="font-light text-lg tracking-tight uppercase">Naik</span>
      </button>

      <nav className="hidden md:flex space-x-8 text-sm uppercase tracking-widest font-medium">
        <button onClick={() => onNavigate('work')} className="hover:text-mg-yellow transition-colors duration-300">
          Work
        </button>
        <button onClick={() => onNavigate('about')} className="hover:text-mg-pink transition-colors duration-300">
          About
        </button>
        <button onClick={() => onNavigate('contact')} className="hover:text-mg-green transition-colors duration-300">
          Contact
        </button>
      </nav>

      <button className="md:hidden">
        <Menu size={24} />
      </button>
    </motion.header>
  );
};

export default Header;