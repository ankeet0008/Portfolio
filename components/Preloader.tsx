import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface PreloaderProps {
  onComplete: () => void;
}

const Preloader: React.FC<PreloaderProps> = ({ onComplete }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Simulate loading time for the animation to play out smoothly
    const timeout = setTimeout(() => {
      setIsLoaded(true);
    }, 2400); // Wait for the drawing to finish

    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    if (isLoaded) {
      // Delay to let the exit animation trigger and finish
      const completionTimeout = setTimeout(() => {
        onComplete();
      }, 1200); // 1.2s to match the 'gap' split exit duration
      return () => clearTimeout(completionTimeout);
    }
  }, [isLoaded, onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-transparent cursor-wait overflow-hidden pointer-events-none"
    >
      {/* Top Half of the Split Curtain */}
      <AnimatePresence>
        {!isLoaded && (
          <motion.div
            key="curtain-top"
            className="absolute top-0 left-0 w-full h-[50dvh] bg-neutral-950 z-0 pointer-events-auto"
            initial={{ y: "0%" }}
            exit={{ y: "-100%" }}
            transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1] }}
          />
        )}
      </AnimatePresence>

      {/* Bottom Half of the Split Curtain */}
      <AnimatePresence>
        {!isLoaded && (
          <motion.div
            key="curtain-bottom"
            className="absolute bottom-0 left-0 w-full h-[50dvh] bg-neutral-950 z-0 pointer-events-auto"
            initial={{ y: "0%" }}
            exit={{ y: "100%" }}
            transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1] }}
          />
        )}
      </AnimatePresence>

      {/* Center Content: Logo and Name */}
      <AnimatePresence>
        {!isLoaded && (
          <motion.div
            key="preloader-content"
            initial={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 2.5, filter: "blur(10px)" }}
            transition={{ duration: 1.0, ease: [0.76, 0, 0.24, 1] }}
            className="absolute inset-0 flex flex-col items-center justify-center w-full z-10 pointer-events-none"
          >
            {/* Logo Drawing Animation in the Center */}
            <div className="relative w-28 h-28 sm:w-36 sm:h-36 flex items-center justify-center">
              <svg viewBox="0 0 100 100" className="w-full h-full overflow-visible">
                {/* The "A" shape */}
                <motion.path
                  d="M 30 75 L 50 25 L 70 75"
                  fill="transparent"
                  stroke="#ffffff"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1.2, ease: [0.25, 1, 0.5, 1], delay: 0.2 }}
                />

                {/* The "A" Crossbar */}
                <motion.path
                  d="M 38 55 L 62 55"
                  fill="transparent"
                  stroke="#ffffff"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.8, ease: "easeOut", delay: 1.0 }}
                />

                {/* The "N" shape overlaid */}
                <motion.path
                  d="M 35 75 L 35 35 L 65 75 L 65 35"
                  fill="transparent"
                  stroke="#a3a3a3" // neutral-400 equivalent for slight depth distinction
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1.2, ease: [0.25, 1, 0.5, 1], delay: 0.6 }}
                />
              </svg>
            </div>

            {/* Name at the Bottom */}
            <div className="absolute bottom-12 left-0 w-full flex justify-center lg:bottom-16">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: [0.76, 0, 0.24, 1], delay: 0.8 }}
                className="overflow-hidden"
              >
                <div className="text-xs md:text-sm font-sora tracking-[0.4em] uppercase text-neutral-400 font-medium">
                  Ankit Naik
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default Preloader;