import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

const MARQUEE_SPEED = 400; // pixels per second

const Hero: React.FC = () => {
  const marqueeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = marqueeRef.current;
    if (!el) return;

    // Wait for images to load before measuring
    const images = el.querySelectorAll('img');
    let loadedCount = 0;
    const totalImages = images.length;

    const startAnimation = () => {
      const totalWidth = el.scrollWidth;
      const halfWidth = totalWidth / 2; // We have 2 identical groups
      const duration = halfWidth / MARQUEE_SPEED; // seconds = pixels / (pixels/second)

      // Remove any existing style tag
      const existingStyle = document.getElementById('marquee-keyframes');
      if (existingStyle) existingStyle.remove();

      // Create keyframes with exact pixel values
      const style = document.createElement('style');
      style.id = 'marquee-keyframes';
      style.textContent = `
        @keyframes marquee-scroll {
          0% { transform: translateX(0px); }
          100% { transform: translateX(-${halfWidth}px); }
        }
      `;
      document.head.appendChild(style);

      el.style.animation = `marquee-scroll ${duration}s linear infinite`;
    };

    const onImageLoad = () => {
      loadedCount++;
      if (loadedCount >= totalImages) {
        startAnimation();
      }
    };

    images.forEach((img) => {
      if (img.complete) {
        loadedCount++;
      } else {
        img.addEventListener('load', onImageLoad);
      }
    });

    if (loadedCount >= totalImages) {
      startAnimation();
    }

    return () => {
      images.forEach((img) => img.removeEventListener('load', onImageLoad));
      const existingStyle = document.getElementById('marquee-keyframes');
      if (existingStyle) existingStyle.remove();
    };
  }, []);
  return (
    <section className="h-screen w-full fixed top-0 left-0 flex flex-col items-center justify-center overflow-hidden z-0"
      style={{ backgroundColor: '#f0f2f5' }}
    >
      {/* Grid Background */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `
            linear-gradient(rgba(0,0,0,0.06) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,0,0,0.06) 1px, transparent 1px)
          `,
          backgroundSize: '24px 24px',
        }}
      />

      {/* Top Left Text - Letter Reveal Animation */}
      <div className="absolute top-32 left-6 md:left-12 max-w-[260px] z-20 hidden md:block">
        {['Creative Developer', 'Designing Intelligent', 'ML Engineer.'].map((line, lineIdx) => (
          <div key={lineIdx} className="overflow-hidden">
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: '0%' }}
              transition={{
                duration: 0.5,
                delay: 2.9 + lineIdx * 0.1,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="text-sm md:text-[15px] uppercase tracking-[0.18em] text-neutral-900 font-semibold leading-relaxed"
            >
              {line}
            </motion.div>
          </div>
        ))}
      </div>



      {/* Marquee Text - Background Layer */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-full overflow-hidden z-0 select-none pointer-events-none">
        <div
          ref={marqueeRef}
          className="flex whitespace-nowrap"
          style={{
            opacity: 0.6,
            willChange: 'transform',
          }}
        >
          {/* Group A - 5 copies */}
          <img src="/ankit.svg" alt="" className="shrink-0 w-auto h-[60vh] md:h-[85vh] max-w-none mx-4" />
          <img src="/ankit.svg" alt="" className="shrink-0 w-auto h-[60vh] md:h-[85vh] max-w-none mx-4" />
          <img src="/ankit.svg" alt="" className="shrink-0 w-auto h-[60vh] md:h-[85vh] max-w-none mx-4" />
          <img src="/ankit.svg" alt="" className="shrink-0 w-auto h-[60vh] md:h-[85vh] max-w-none mx-4" />
          <img src="/ankit.svg" alt="" className="shrink-0 w-auto h-[60vh] md:h-[85vh] max-w-none mx-4" />
          {/* Group B - 5 identical copies for seamless loop */}
          <img src="/ankit.svg" alt="" className="shrink-0 w-auto h-[60vh] md:h-[85vh] max-w-none mx-4" />
          <img src="/ankit.svg" alt="" className="shrink-0 w-auto h-[60vh] md:h-[85vh] max-w-none mx-4" />
          <img src="/ankit.svg" alt="" className="shrink-0 w-auto h-[60vh] md:h-[85vh] max-w-none mx-4" />
          <img src="/ankit.svg" alt="" className="shrink-0 w-auto h-[60vh] md:h-[85vh] max-w-none mx-4" />
          <img src="/ankit.svg" alt="" className="shrink-0 w-auto h-[60vh] md:h-[85vh] max-w-none mx-4" />
        </div>
      </div>



      {/* Bottom Left Scroll - ENHANCED */}
      <div className="absolute bottom-8 left-6 md:left-12 z-20 flex items-center gap-4 group cursor-pointer">
        <div className="relative flex flex-col items-center">
          {/* Mouse Body */}
          <div className="w-[26px] h-[42px] border-[1.5px] border-neutral-400 rounded-full flex justify-center pt-2 group-hover:border-neutral-800 transition-colors duration-300">
            {/* Scroll Wheel */}
            <motion.div
              animate={{ y: [0, 8, 0], opacity: [1, 0, 1] }}
              transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
              className="w-1 h-1.5 bg-neutral-400 rounded-full group-hover:bg-neutral-800"
            />
          </div>
        </div>

        <div className="overflow-hidden hidden md:block group-hover:hidden">
          <span className="block text-[10px] uppercase tracking-[0.2em] font-bold text-neutral-500 transition-all duration-300">
            Scroll Down
          </span>
        </div>
        <div className="hidden md:flex gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 absolute left-[50px]">
          <a
            href="/AnkitNaikresume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[10px] uppercase tracking-[0.2em] font-bold text-neutral-800 bg-white/50 backdrop-blur-sm border border-neutral-300 px-3 py-2 rounded-full hover:bg-white transition-colors whitespace-nowrap"
          >
            View Resume
          </a>
          <a
            href="/AnkitNaikresume.pdf"
            download
            className="text-[10px] uppercase tracking-[0.2em] font-bold text-white bg-neutral-900 border border-neutral-900 px-3 py-2 rounded-full hover:bg-black transition-colors whitespace-nowrap"
          >
            Download
          </a>
        </div>
      </div>

      {/* Bottom Right Copyright */}
      <div className="absolute bottom-8 right-6 md:right-12 z-20">
        <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-500 border border-neutral-300 px-3 py-1 rounded-full bg-white/50 backdrop-blur-sm">© {new Date().getFullYear()}</span>
      </div>
    </section>
  );
};

export default Hero;