import React from 'react';
import { motion } from 'framer-motion';

const SuperBadassMarquee: React.FC = () => {
  return (
    <section className="w-full bg-neutral-950 py-12 md:py-24 flex items-center justify-center overflow-hidden relative z-20">
      {/* The Box/Strip */}
      <motion.div
        initial={{ clipPath: "inset(45% 0 45% 0)" }}
        whileInView={{ clipPath: "inset(0% 0 0% 0)" }}
        viewport={{ once: false, margin: "-5%" }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="w-[110%] bg-white border-y-4 border-neutral-200 py-6 md:py-10 relative overflow-hidden flex transform -rotate-1 shadow-[0_0_50px_rgba(255,255,255,0.1)] origin-center"
      >
        <motion.div
          className="flex whitespace-nowrap min-w-full items-center will-change-transform"
          initial={{ x: "-50%" }}
          animate={{ x: "0%" }}
          transition={{
            repeat: Infinity,
            ease: "linear",
            duration: 12,
          }}
        >
          {/* First Set */}
          <div className="flex shrink-0 items-center justify-around min-w-full">
             {[...Array(8)].map((_, i) => (
                <div key={i} className="flex items-center mx-8 md:mx-16">
                    <span className="text-6xl md:text-9xl font-black font-clash uppercase tracking-tighter text-black leading-none whitespace-nowrap">SUPER BADASS</span>
                    <span className="text-5xl md:text-8xl ml-8 md:ml-12 drop-shadow-md filter saturate-150">🔥</span>
                </div>
             ))}
          </div>
          {/* Second Set (Duplicate for loop) */}
          <div className="flex shrink-0 items-center justify-around min-w-full">
             {[...Array(8)].map((_, i) => (
                <div key={`dup-${i}`} className="flex items-center mx-8 md:mx-16">
                    <span className="text-6xl md:text-9xl font-black font-clash uppercase tracking-tighter text-black leading-none whitespace-nowrap">SUPER BADASS</span>
                    <span className="text-5xl md:text-8xl ml-8 md:ml-12 drop-shadow-md filter saturate-150">🔥</span>
                </div>
             ))}
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default SuperBadassMarquee;