import React, { useState, useEffect } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { motion } from 'framer-motion';

const Contact: React.FC = () => {
  const [time, setTime] = useState<string>("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
      }));
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const socials = [
    { name: 'Instagram', link: 'https://www.instagram.com/ankiitt_0008/' },
    { name: 'LinkedIn', link: 'https://www.linkedin.com/in/ankit-naik-387092321/' },
    { name: 'GitHub', link: 'https://github.com/ankeet0008' },
    { name: 'Twitter', link: 'https://x.com/AnkeetNaikk' }
  ];

  return (
    <section id="contact" className="relative z-10 py-12 md:py-24 px-6 md:px-12 bg-[#f0f2f5] text-black min-h-screen flex flex-col justify-between rounded-t-[2.5rem] md:rounded-t-[5rem] shadow-[0_-50px_100px_rgba(0,0,0,0.5)]">

      {/* Large Name Banner with Animation */}
      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 50 }}
        whileInView={{ scale: 1, opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="w-full border border-neutral-300 rounded-xl md:rounded-2xl py-12 md:py-20 flex justify-center items-center overflow-hidden mb-12 md:mb-24 group hover:bg-neutral-50 transition-colors duration-500 cursor-default"
      >
        <h1 className="text-[15vw] md:text-[14vw] leading-none font-normal font-cursive text-center group-hover:scale-105 transition-transform duration-700 select-none">
          Ankit Naik
        </h1>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24 items-start">
        {/* Left Column: Info */}
        <div className="flex flex-col gap-12">
          <div>
            <p className="text-xl md:text-2xl font-medium font-clash">
              Made with love in India.
            </p>
          </div>

          <div className="flex flex-col gap-2">
            <span className="text-neutral-400 text-lg md:text-xl font-medium font-clash">Local time</span>
            <span className="text-5xl md:text-7xl font-bold font-clash tabular-nums tracking-tighter text-neutral-900">
              {time || "--:-- AM"}
            </span>
          </div>
        </div>

        {/* Right Column: Links Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
          {socials.map((social, index) => (
            <motion.a
              key={social.name}
              href={social.link}
              target={social.link !== '#' ? "_blank" : undefined}
              rel={social.link !== '#' ? "noopener noreferrer" : undefined}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="group relative border border-neutral-300 rounded-lg p-6 md:p-8 flex justify-between items-center overflow-hidden hover:border-black transition-colors duration-300"
            >
              <div className="absolute top-0 left-0 w-full h-0 bg-black transition-all duration-500 ease-in-out group-hover:h-full"></div>
              <span className="relative z-10 text-lg font-medium font-sora group-hover:text-white transition-colors duration-300">{social.name}</span>
              <ArrowUpRight size={20} className="relative z-10 transform group-hover:rotate-45 group-hover:text-white transition-all duration-300" />
            </motion.a>
          ))}
          <motion.a
            href="mailto:ankeetnaikk@gmail.com"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="md:col-span-2 group relative border border-neutral-300 rounded-lg p-6 md:p-8 flex justify-between items-center overflow-hidden hover:border-black transition-colors duration-300"
          >
            <div className="absolute top-0 left-0 w-full h-0 bg-black transition-all duration-500 ease-in-out group-hover:h-full"></div>
            <span className="relative z-10 text-lg font-medium font-sora group-hover:text-white transition-colors duration-300">Email Me</span>
            <ArrowUpRight size={20} className="relative z-10 transform group-hover:rotate-45 group-hover:text-white transition-all duration-300" />
          </motion.a>
        </div>
      </div>

      <div className="mt-24 border-t border-neutral-200 pt-8 flex flex-col md:flex-row justify-between items-end md:items-center gap-4">
        <div className="flex gap-4 mb-4 md:mb-0">
          <a
            href="/AnkitNaikresume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[10px] md:text-xs uppercase tracking-[0.2em] font-bold text-black border border-black px-4 py-2 hover:bg-black hover:text-white transition-colors"
          >
            View Resume
          </a>
          <a
            href="/AnkitNaikresume.pdf"
            download
            className="text-[10px] md:text-xs uppercase tracking-[0.2em] font-bold text-white bg-black border border-black px-4 py-2 hover:bg-neutral-800 transition-colors"
          >
            Download
          </a>
        </div>
        <div className="text-[10px] uppercase tracking-widest text-neutral-500 font-sora font-semibold flex flex-col md:flex-row gap-4">
          <span>© {new Date().getFullYear()} Ankit Naik. All Right Reserved.</span>
          <span className="hidden md:block text-neutral-300">|</span>
          <span className="hidden md:block">Designed & Developed by Ankit</span>
        </div>
      </div>
    </section>
  );
};

export default Contact;