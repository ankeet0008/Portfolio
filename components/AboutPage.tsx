import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Code2, Cpu, Globe, ArrowUpRight } from 'lucide-react';

interface AboutPageProps {
  onBack: () => void;
  onNavigateContact: () => void;
}

const AboutPage: React.FC<AboutPageProps> = ({ onBack, onNavigateContact }) => {

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const experiences = [
    {
      year: '2023 - Present',
      role: 'Senior Frontend Engineer',
      company: 'TechFlow Solutions',
      description: 'Leading the frontend architecture for enterprise-scale AI applications.'
    },
    {
      year: '2021 - 2023',
      role: 'Creative Developer',
      company: 'Studio Pulse',
      description: 'Award-winning immersive web experiences for fashion and lifestyle brands.'
    },
    {
      year: '2019 - 2021',
      role: 'Full Stack Developer',
      company: 'Freelance',
      description: 'Delivered 20+ projects ranging from e-commerce to SaaS dashboards.'
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="bg-[#f0f2f5] min-h-screen text-[#1f2937] relative z-50 pt-24"
    >
      {/* Navigation */}
      <div className="fixed top-0 left-0 w-full px-6 py-6 md:px-12 md:py-8 flex justify-between items-center z-50 bg-[#f0f2f5]/90 backdrop-blur-md border-b border-[#d1d5db]">
        <button
          onClick={onBack}
          className="flex items-center gap-3 text-sm font-sora font-medium uppercase tracking-widest text-[#9ca3af] hover:text-[#1f2937] transition-colors group"
        >
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform duration-300" />
          Back Home
        </button>
        <span className="text-xs font-mono text-[#9ca3af] uppercase hidden md:block">Personal Archive</span>
      </div>

      <div className="px-6 md:px-12 pb-24 max-w-[1400px] mx-auto">
        {/* Header */}
        <div className="mb-16 md:mb-24">
          <motion.h1
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="text-[12vw] leading-[0.85] font-clash font-semibold uppercase tracking-tight text-[#1f2937]"
          >
            About <span className="text-[#BFA18F] italic font-serif">Me.</span>
          </motion.h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-24">
          {/* Image Column */}
          <div className="md:col-span-5">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="w-full h-[60vh] bg-[#e4e7ec] rounded-2xl overflow-hidden relative"
            >
              <img src="/about-me.png" alt="Profile" className="w-full h-full object-cover grayscale transition-all duration-500 ease-in-out hover:grayscale-0" />
            </motion.div>

            <div className="mt-8 flex justify-between items-end border-t border-[#d1d5db] pt-6">
              <div>
                <span className="block text-[10px] font-sora font-bold uppercase tracking-[0.2em] text-[#9ca3af] mb-2">Location</span>
                <span className="text-lg font-clash font-medium">Odisha, India</span>
              </div>
              <div>
                <span className="block text-[10px] font-sora font-bold uppercase tracking-[0.2em] text-[#9ca3af] mb-2">Status</span>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                  <span className="text-lg font-clash font-medium">Available</span>
                </div>
              </div>
            </div>
          </div>

          {/* Content Column */}
          <div className="md:col-span-7 flex flex-col gap-16">
            {/* Bio */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
            >
              <h3 className="text-xs font-sora font-bold uppercase tracking-[0.2em] text-[#9ca3af] mb-8">The Story</h3>
              <p className="text-2xl md:text-4xl leading-relaxed font-light text-[#1f2937]">
                I'm Ankit, a creative developer sitting at the intersection of <span className="font-serif italic text-[#BFA18F]">design</span> and <span className="font-serif italic text-[#BFA18F]">technology</span>.
                <br /><br />
                With a background in computer science and a passion for brutalist aesthetics, I build digital products that feel solid, performant, and distinctly human. I believe the web should be an extension of our creative minds, not just a utility.
              </p>
            </motion.div>

            {/* Services */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
            >
              <h3 className="text-xs font-sora font-bold uppercase tracking-[0.2em] text-[#9ca3af] mb-8">What I Do</h3>
              <div className="grid grid-cols-1 gap-6">
                {[
                  { icon: Code2, title: "Frontend Engineering", desc: "Pixel-perfect implementation using React, Next.js, and WebGL." },
                  { icon: Cpu, title: "AI Integration", desc: "Leveraging LLMs to build intelligent, context-aware applications." },
                  { icon: Globe, title: "Interactive Design", desc: "Creating immersive web experiences with smooth motion and depth." }
                ].map((service, i) => (
                  <div key={i} className="flex items-start gap-6 p-6 border border-[#d1d5db] rounded-xl hover:bg-white transition-colors duration-300">
                    <div className="w-12 h-12 bg-[#1f2937] text-[#f0f2f5] rounded-full flex items-center justify-center shrink-0">
                      <service.icon size={20} />
                    </div>
                    <div>
                      <h4 className="text-xl font-clash font-medium mb-2">{service.title}</h4>
                      <p className="text-[#6B6B65] font-sora font-light">{service.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>



            {/* Footer CTA */}
            <div
              onClick={onNavigateContact}
              className="w-full bg-[#1f2937] text-[#f0f2f5] py-16 px-8 rounded-2xl flex flex-col items-center text-center cursor-pointer group hover:bg-black transition-colors"
            >
              <span className="text-xs font-sora font-bold uppercase tracking-[0.2em] text-neutral-500 mb-6">Ready to start?</span>
              <h2 className="text-5xl md:text-7xl font-clash font-semibold mb-8 group-hover:scale-105 transition-transform duration-500">
                Let's work together.
              </h2>
              <div className="flex items-center gap-2 text-[#BFA18F] border-b border-[#BFA18F] pb-1 uppercase tracking-widest text-sm font-bold">
                Get in Touch <ArrowUpRight size={16} />
              </div>
            </div>

          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default AboutPage;