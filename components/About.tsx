import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

const About: React.FC = () => {
  const description = `"Ankit Naik is a passionate ML Engineer & Developer, known for his creative problem-solving and technical depth. With a drive for building intelligent, real-world applications, Ankit combines AI expertise with modern web development to bring bold ideas to life. Whether it's training models, designing LLM-powered tools, or crafting full-stack experiences, Ankit's dedication to innovation and quality shines through in every project he undertakes."`;

  return (
    <section
      id="about"
      className="relative bg-black text-white py-24 md:py-32 px-6 md:px-16 min-h-screen overflow-hidden"
    >
      {/* Section Counter */}
      <motion.div
        className="absolute top-10 right-8 md:right-16 text-neutral-500 text-sm font-clash tracking-wider"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        02/05
      </motion.div>

      <div className="w-full max-w-[1400px] mx-auto">
        {/* Giant /ABOUT Title — spans left to ~middle of screen */}
        <h2
          className="font-clash font-extrabold text-white uppercase select-none flex"
          style={{
            fontSize: 'clamp(120px, 22vw, 360px)',
            lineHeight: '0.88',
            letterSpacing: '-0.02em',
          }}
        >
          {['/', 'A', 'B', 'O', 'U', 'T'].map((letter, i) => (
            <motion.span
              key={i}
              className={i === 0 ? 'text-neutral-500 font-light' : ''}
              initial={{ x: 120, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.5,
                delay: i * 0.1,
                ease: [0.16, 1, 0.3, 1],
              }}
              style={{ display: 'inline-block' }}
            >
              {letter}
            </motion.span>
          ))}
        </h2>

        {/* Bottom Content: Arrow + Description — clearly below the title */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 mt-16 md:mt-24">
          {/* Arrow — bigger, more towards left */}
          <motion.div
            className="md:col-span-3 flex items-start justify-start"
            initial={{ opacity: 0, x: -60, rotate: -15 }}
            whileInView={{ opacity: 1, x: 0, rotate: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <ArrowUpRight
              size={200}
              strokeWidth={1.2}
              className="text-neutral-600"
            />
          </motion.div>

          {/* Description + Currently Working */}
          <div className="md:col-span-9 flex flex-col justify-center md:pl-4">
            <motion.p
              className="text-[15px] md:text-[17px] leading-[1.8] text-neutral-300 font-light max-w-[640px] mb-10"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            >
              {description}
            </motion.p>

            <motion.div
              className="text-[10px] md:text-xs uppercase tracking-[0.2em] text-neutral-500 font-medium"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
            >
              Currently building AI-powered tools as a Freelance ML Engineer
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;