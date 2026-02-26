import React from 'react';
import { motion, Variants } from 'framer-motion';
import SplitTextReveal from './SplitTextReveal';
import WordRevealParagraph from './WordRevealParagraph';
import MaskReveal from './MaskReveal';

const listContainerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.3,
    },
  },
};

const listItemVariants: Variants = {
  hidden: {
    x: -20,
    opacity: 0,
    filter: 'blur(4px)',
  },
  visible: {
    x: 0,
    opacity: 1,
    filter: 'blur(0px)',
    transition: {
      duration: 0.5,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

const About: React.FC = () => {
  return (
    <section id="about" className="py-24 px-6 md:px-12 bg-[#F5F2EB] text-neutral-900 min-h-[80vh] flex items-center">
      <div className="w-full">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
          <div className="md:col-span-4">
            {/* Animated "About Me" label */}
            <SplitTextReveal
              className="text-[10px] uppercase tracking-[0.14em] font-sora font-semibold text-[#A89F91] mb-8"
              splitBy="char"
              staggerDelay={0.04}
              yOffset={20}
              duration={0.4}
              as="h2"
            >
              About Me
            </SplitTextReveal>

            {/* Image with scroll-triggered mask reveal */}
            <MaskReveal delay={0.2} duration={1.0}>
              <motion.div
                className="w-full h-[400px] bg-[#EBE7E0] overflow-hidden relative grayscale hover:grayscale-0 transition-[filter] duration-700 rounded-lg"
              >
                <img src="/about-me.png" alt="Ankit Naik Portrait" className="w-full h-full object-cover" />
              </motion.div>
            </MaskReveal>
          </div>

          <div className="md:col-span-8 flex flex-col justify-center">
            {/* Word-by-word paragraph reveal with blur effect */}
            <WordRevealParagraph
              className="text-2xl md:text-4xl leading-tight font-light mb-12 text-[#2D2D2A]"
              staggerDelay={0.03}
              delay={0.15}
              yOffset={30}
              duration={0.5}
            >
              {"I'm a curious developer exploring the future of software through "}
              <span className="text-[#BFA18F] italic font-medium">AI</span>
              {" and "}
              <span className="text-[#BFA18F] italic font-medium">intelligent systems</span>
              {". I enjoy building practical tools using "}
              <span className="text-[#BFA18F] italic font-medium">modern web stacks</span>
              {", "}
              <span className="text-[#BFA18F] italic font-medium">large language models</span>
              {", and creative problem-solving — turning ideas into "}
              <span className="text-[#BFA18F] italic font-medium">real, usable products</span>
              {"."}
            </WordRevealParagraph>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Services list — staggered slide-in from left */}
              <div>
                <motion.h3
                  className="text-[10px] uppercase tracking-[0.14em] font-sora font-semibold text-[#A89F91] mb-4 border-b border-[#DCD6CC] pb-2"
                  initial={{ opacity: 0, width: '0%' }}
                  whileInView={{ opacity: 1, width: '100%' }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                >
                  Services
                </motion.h3>
                <motion.ul
                  className="space-y-2 text-base font-sora font-semibold tracking-[0.14em] text-[#4A4A45]"
                  variants={listContainerVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: '-50px' }}
                >
                  <motion.li variants={listItemVariants}>AI Application Development</motion.li>
                  <motion.li variants={listItemVariants}>LLM Integrations &amp; RAG Systems</motion.li>
                  <motion.li variants={listItemVariants}>Full-Stack Web Development</motion.li>
                  <motion.li variants={listItemVariants}>Developer Tools &amp; Experiments</motion.li>
                </motion.ul>
              </div>

              {/* Tech Stack list — staggered slide-in from left */}
              <div>
                <motion.h3
                  className="text-[10px] uppercase tracking-[0.14em] font-sora font-semibold text-[#A89F91] mb-4 border-b border-[#DCD6CC] pb-2"
                  initial={{ opacity: 0, width: '0%' }}
                  whileInView={{ opacity: 1, width: '100%' }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
                >
                  Tech Stack
                </motion.h3>
                <motion.ul
                  className="space-y-2 text-base font-sora font-semibold tracking-[0.14em] text-[#4A4A45]"
                  variants={listContainerVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: '-50px' }}
                >
                  <motion.li variants={listItemVariants}>Next.js / React</motion.li>
                  <motion.li variants={listItemVariants}>Node.js</motion.li>
                  <motion.li variants={listItemVariants}>Python (AI/ML)</motion.li>
                  <motion.li variants={listItemVariants}>LLM APIs &amp; RAG</motion.li>
                  <motion.li variants={listItemVariants}>Git / Linux</motion.li>
                </motion.ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;