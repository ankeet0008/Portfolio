import React, { useRef } from 'react';
import { Project } from '../types';
import { ArrowUpRight, LayoutTemplate } from 'lucide-react';
import { motion, useScroll, useTransform } from 'framer-motion';
import SplitTextReveal from './SplitTextReveal';
import MaskReveal from './MaskReveal';
import { projects } from '../utils/projectData';

interface SelectedWorkProps {
  onProjectSelect: (project: Project) => void;
}

interface ProjectItemProps {
  project: Project;
  onClick: (e: React.MouseEvent, p: Project) => void;
  index?: number;
}

const ProjectItem: React.FC<ProjectItemProps> = ({
  project,
  onClick,
  index = 0,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40, filter: 'blur(4px)' }}
      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{
        duration: 0.6,
        delay: index * 0.08,
        ease: [0.16, 1, 0.3, 1],
      }}
      onClick={(e) => onClick(e, project)}
      className="group relative flex items-center justify-between py-10 px-6 border-b border-neutral-800 cursor-pointer overflow-hidden w-full"
    >
      {/* Hover Background Animation - Left to Right Wipe */}
      <div className="absolute inset-0 bg-white w-0 group-hover:w-full transition-[width] duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] z-0" />

      {/* Left Content */}
      <div className="relative z-10 flex items-center gap-6 md:gap-12">
        <div className="w-8 h-8 flex items-center justify-center">
          {/* Using a monogram or icon style */}
          <span className="font-clash text-xs font-bold text-neutral-500 group-hover:text-black transition-colors duration-300">
            <LayoutTemplate size={18} />
          </span>
        </div>

        <div className="flex flex-col md:flex-row md:items-baseline md:gap-6">
          <h3 className="text-2xl md:text-3xl font-medium font-clash tracking-tight text-white group-hover:text-black transition-colors duration-300">{project.title}</h3>
          <span className="hidden md:inline-block text-neutral-600 group-hover:text-neutral-400 font-light transition-colors duration-300">—</span>
          <span className="text-sm md:text-lg text-neutral-500 font-sora font-light group-hover:text-neutral-800 transition-colors duration-300">
            {project.category}
          </span>
        </div>
      </div>

      {/* Right Content - Button Style */}
      <div className="relative z-10 flex items-center">
        <div className="px-5 py-2 border border-neutral-700 rounded text-[10px] font-bold uppercase tracking-widest text-neutral-400 group-hover:border-black group-hover:text-black transition-colors duration-300 flex items-center gap-3">
          <span className="hidden md:inline">View Case Study</span>
          <span className="md:hidden">View</span>
          <ArrowUpRight size={14} />
        </div>
      </div>

    </motion.div>
  );
};

const SelectedWork: React.FC<SelectedWorkProps> = ({ onProjectSelect }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const headerOpacity = useTransform(scrollYProgress, [0.85, 1], [1, 0]);
  const headerScale = useTransform(scrollYProgress, [0.85, 1], [1, 0.95]);

  const handleProjectClick = (e: React.MouseEvent, project: Project) => {
    e.stopPropagation();
    onProjectSelect(project);
  };

  return (
    <section id="work" ref={containerRef} className="relative bg-neutral-950 text-white pb-0">
      <div className="w-full">
        {/* Sticky Header Section */}
        <motion.div
          style={{ opacity: headerOpacity, scale: headerScale }}
          className="sticky top-0 z-30 bg-neutral-950/95 backdrop-blur-md w-full px-6 md:px-12 border-b border-neutral-900"
        >
          <div className="pt-24 pb-6 md:pt-28 md:pb-8 flex flex-col md:flex-row md:items-end justify-between">
            <div className="relative inline-block">
              <MaskReveal direction="left" duration={1.0}>
                <SplitTextReveal
                  className="text-4xl md:text-7xl font-semibold uppercase tracking-tight text-white font-clash"
                  splitBy="char"
                  staggerDelay={0.04}
                  yOffset={80}
                  duration={0.7}
                  as="h2"
                >
                  PROJECTS
                </SplitTextReveal>
              </MaskReveal>
            </div>
            <MaskReveal delay={0.3} duration={0.7}>
              <span className="mt-6 md:mt-0 text-sm font-clash font-medium text-neutral-500 uppercase tracking-widest">2022 — 2024</span>
            </MaskReveal>
          </div>
        </motion.div>

        {/* Scrollable Content */}
        <div className="px-6 md:px-12 pt-12 md:pt-20">
          {/* Info Grid */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-24 w-full">
            {/* Timeframe */}
            <div className="flex flex-col gap-6">
              <span className="text-[10px] font-sora font-semibold uppercase tracking-[0.2em] text-neutral-500">Timeframe</span>
              <span className="text-sm font-clash font-medium text-neutral-300">YEAR 2024-26</span>
            </div>
            {/* Discipline */}
            <div className="flex flex-col gap-6">
              <span className="text-[10px] font-sora font-semibold uppercase tracking-[0.2em] text-neutral-500">Discipline</span>
              <div className="flex flex-col gap-1 text-sm font-clash font-medium text-neutral-300">
                <span>No code development</span>
                <span>UI design</span>
                <span>UX research</span>
                <span>Art Direction</span>
              </div>
            </div>
            {/* Tools */}
            <div className="flex flex-col gap-6">
              <span className="text-[10px] font-sora font-semibold uppercase tracking-[0.2em] text-neutral-500">Tools</span>
              <div className="flex flex-col gap-1 text-sm font-clash font-medium text-neutral-300">
                <span>Docker</span>
                <span>Git</span>
                <span>LLM Models</span>
                <span>Python</span>
                <span>Next.js</span>
              </div>
            </div>
            {/* Industry */}
            <div className="flex flex-col gap-6">
              <span className="text-[10px] font-sora font-semibold uppercase tracking-[0.2em] text-neutral-500">Industry</span>
              <div className="flex flex-wrap gap-2">
                {['#GENAI', '#SAAS', '#AUTOMATION', '#DEVTOOLS', '#LLM', '#AGENTS'].map(tag => (
                  <span key={tag} className="px-3 py-2 border border-neutral-800 rounded-lg text-[10px] font-bold uppercase tracking-wider text-neutral-400 hover:border-neutral-600 hover:text-white transition-colors cursor-default">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Projects List - Full Width */}
          <div className="flex flex-col border-t border-neutral-800 w-full relative z-10">
            {projects.map((project, index) => (
              <ProjectItem
                key={project.id}
                project={project}
                index={index}
                onClick={handleProjectClick}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SelectedWork;