import React from 'react';
import { motion } from 'framer-motion';
import ParticleBackground from './ParticleBackground';

const Hero: React.FC = () => {
  return (
    <section className="h-screen w-full fixed top-0 left-0 flex flex-col items-center justify-center overflow-hidden bg-mg-black z-0">
      {/* Interactive Particle Background */}
      <ParticleBackground />

      {/* Top Left Text - Positioned below the main header */}
      <div className="absolute top-32 left-6 md:left-12 max-w-[200px] text-[10px] md:text-xs uppercase tracking-widest text-mg-white opacity-80 font-medium z-20 leading-relaxed hidden md:block">
        Creative Developer<br />
        Designing Intelligent<br />
        Digital Systems.
      </div>

      {/* Top Right Status - Positioned below the main header area */}
      <div className="absolute top-32 right-6 md:right-12 z-20 hidden md:flex items-center gap-2 px-4 py-2 border border-mg-gray-dark rounded-full bg-mg-black/50 backdrop-blur-sm">
        <span className="w-2 h-2 bg-mg-green rounded-full animate-pulse shadow-[0_0_8px_rgba(0,255,136,0.6)]"></span>
        <span className="text-[10px] uppercase tracking-widest font-bold text-mg-white">Open to Work</span>
      </div>

      {/* Marquee Text - Background Layer */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-full overflow-hidden z-0 select-none opacity-30 md:opacity-40 mix-blend-color-dodge pointer-events-none text-mg-gray-light">
        <motion.div
          className="flex whitespace-nowrap"
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            repeat: Infinity,
            ease: "linear",
            duration: 8 // Faster animation speed
          }}
        >
          {/* Repeated text for seamless loop - using the stylish Pinyon Script font */}
          <div className="flex items-center">
            <span className="text-[35vw] md:text-[25vw] leading-none font-cursive text-neutral-300 tracking-tighter pr-12">ANKIT</span>
            <span className="text-[35vw] md:text-[25vw] leading-none font-cursive text-neutral-300 tracking-tighter pr-12">ANKIT</span>
            <span className="text-[35vw] md:text-[25vw] leading-none font-cursive text-neutral-300 tracking-tighter pr-12">ANKIT</span>
            <span className="text-[35vw] md:text-[25vw] leading-none font-cursive text-neutral-300 tracking-tighter pr-12">ANKIT</span>
          </div>
          <div className="flex items-center">
            <span className="text-[35vw] md:text-[25vw] leading-none font-cursive text-neutral-300 tracking-tighter pr-12">ANKIT</span>
            <span className="text-[35vw] md:text-[25vw] leading-none font-cursive text-neutral-300 tracking-tighter pr-12">ANKIT</span>
            <span className="text-[35vw] md:text-[25vw] leading-none font-cursive text-neutral-300 tracking-tighter pr-12">ANKIT</span>
            <span className="text-[35vw] md:text-[25vw] leading-none font-cursive text-neutral-300 tracking-tighter pr-12">ANKIT</span>
          </div>
        </motion.div>
      </div>



      {/* Bottom Left Scroll - ENHANCED */}
      <div className="absolute bottom-8 left-6 md:left-12 z-20 flex items-center gap-4 group cursor-pointer mix-blend-difference">
        <div className="relative flex flex-col items-center">
          {/* Mouse Body */}
          <div className="w-[26px] h-[42px] border-[1.5px] border-mg-gray-light rounded-full flex justify-center pt-2 group-hover:border-mg-yellow transition-colors duration-300 backdrop-blur-sm bg-black/10 shadow-[0_4px_12px_rgba(0,0,0,0.2)]">
            {/* Scroll Wheel */}
            <motion.div
              animate={{ y: [0, 8, 0], opacity: [1, 0, 1] }}
              transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
              className="w-1 h-1.5 bg-mg-gray-light rounded-full group-hover:bg-mg-yellow"
            />
          </div>
        </div>

        <div className="overflow-hidden hidden md:block">
          <span className="block text-[10px] uppercase tracking-[0.2em] font-bold text-mg-white opacity-60 group-hover:opacity-100 group-hover:text-mg-yellow transition-all duration-300">
            Scroll Down
          </span>
        </div>
      </div>

      {/* Bottom Right Copyright */}
      <div className="absolute bottom-8 right-6 md:right-12 z-20">
        <span className="text-[10px] font-mono uppercase tracking-widest text-mg-white opacity-50 border border-mg-gray-dark px-3 py-1 rounded-full bg-mg-black/50 backdrop-blur-sm shadow-[0_4px_12px_rgba(0,0,0,0.5)]">© {new Date().getFullYear()}</span>
      </div>
    </section>
  );
};

export default Hero;