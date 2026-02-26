import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowUpRight, Github, ExternalLink, Calendar, Layers, Code2 } from 'lucide-react';
import { Project } from '../types';
import { getProjectDetails, projects } from '../utils/projectData';

interface ProjectDetailProps {
  project: Project;
  onBack: () => void;
  onNext: (project: Project) => void;
}

const ProjectDetail: React.FC<ProjectDetailProps> = ({ project, onBack, onNext }) => {
  const details = getProjectDetails(project);
  
  // Find next project
  const currentIndex = projects.findIndex(p => p.id === project.id);
  const nextProject = projects[(currentIndex + 1) % projects.length];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [project]);

  if (!details) return null;

  return (
    <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="bg-neutral-950 min-h-screen text-white relative z-50 pt-20 md:pt-24"
    >
        {/* Navigation Bar */}
        <div className="fixed top-0 left-0 w-full px-6 py-6 md:px-12 md:py-8 flex justify-between items-center z-50 bg-neutral-950/80 backdrop-blur-md border-b border-neutral-800">
            <button 
                onClick={onBack}
                className="flex items-center gap-3 text-sm font-sora font-medium uppercase tracking-widest text-neutral-400 hover:text-white transition-colors group"
            >
                <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform duration-300" />
                Back to Work
            </button>
            
            <div className="hidden md:block text-xs font-mono text-neutral-500">
                PROJECT ID: {project.id.toString().padStart(2, '0')}
            </div>
        </div>

        {/* Hero Section */}
        <div className="px-6 md:px-12 pb-12 md:pb-24">
            <motion.div 
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="max-w-[1400px] mx-auto"
            >
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 md:mb-16 gap-6">
                    <h1 className="text-5xl md:text-8xl lg:text-9xl font-clash font-semibold uppercase tracking-tight leading-[0.9]">
                        {project.title}
                    </h1>
                    <div className="flex flex-col gap-2 mb-2 md:text-right">
                        <span className="text-neutral-400 font-sora text-sm uppercase tracking-widest">{project.category}</span>
                        <span className="text-white font-clash text-xl md:text-2xl">{project.year}</span>
                    </div>
                </div>

                {/* Hero Image */}
                <motion.div 
                    initial={{ scale: 0.95, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.3, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    className="w-full h-[50vh] md:h-[80vh] bg-neutral-900 rounded-3xl overflow-hidden relative shadow-2xl"
                >
                    <img 
                        src={project.image} 
                        alt={project.title} 
                        className="w-full h-full object-cover opacity-80"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/80 via-transparent to-transparent"></div>
                </motion.div>
            </motion.div>
        </div>

        {/* Content Section */}
        <div className="px-6 md:px-12 py-12 md:py-24 bg-neutral-900/30">
            <div className="max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-24">
                
                {/* Left: Description */}
                <div className="md:col-span-8">
                    <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        viewport={{ once: true }}
                    >
                        <h3 className="text-xs font-sora font-semibold uppercase tracking-[0.2em] text-neutral-500 mb-8">Overview</h3>
                        <p className="text-2xl md:text-4xl leading-relaxed font-light text-neutral-200 mb-12">
                            <span className="text-white font-medium">{details.descriptionPrefix}</span> {details.description}
                        </p>
                        
                        <div className="p-8 border border-neutral-800 rounded-2xl bg-neutral-950/50">
                            <div className="flex items-start gap-4 mb-4">
                                <span className="text-4xl text-neutral-600">"</span>
                                <p className="text-lg md:text-xl font-sora italic text-neutral-400 font-light">
                                    {details.quote}
                                </p>
                            </div>
                        </div>
                    </motion.div>

                    <motion.div 
                        initial={{ y: 20, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="mt-20"
                    >
                         <h3 className="text-xs font-sora font-semibold uppercase tracking-[0.2em] text-neutral-500 mb-8">Key Features</h3>
                         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {details.features.map((feature, i) => (
                                <div key={i} className="flex items-center gap-4 p-4 border border-neutral-800 rounded-xl hover:bg-neutral-800/50 transition-colors">
                                    <div className="w-2 h-2 bg-white rounded-full"></div>
                                    <span className="text-neutral-300 font-sora">{feature}</span>
                                </div>
                            ))}
                         </div>
                    </motion.div>
                </div>

                {/* Right: Meta Info */}
                <div className="md:col-span-4 flex flex-col gap-12">
                    <motion.div
                        initial={{ x: 20, opacity: 0 }}
                        whileInView={{ x: 0, opacity: 1 }}
                        viewport={{ once: true }}
                    >
                         {/* Tech Stack */}
                         <div className="mb-10">
                            <div className="flex items-center gap-2 mb-4 text-neutral-500">
                                <Code2 size={14} />
                                <h4 className="text-xs font-sora font-semibold uppercase tracking-[0.2em]">Tech Stack</h4>
                            </div>
                            <div className="flex flex-wrap gap-2">
                                {details.techStack.map(tech => (
                                    <span key={tech} className="px-3 py-1.5 border border-neutral-800 rounded-lg text-xs font-sora text-neutral-300 uppercase tracking-wider">
                                        {tech}
                                    </span>
                                ))}
                            </div>
                         </div>

                         {/* Status */}
                         <div className="mb-10">
                            <div className="flex items-center gap-2 mb-4 text-neutral-500">
                                <Layers size={14} />
                                <h4 className="text-xs font-sora font-semibold uppercase tracking-[0.2em]">Status</h4>
                            </div>
                            <div className="flex items-center gap-3">
                                <span className={`w-2.5 h-2.5 rounded-full bg-${details.statusColor}-500 animate-pulse`}></span>
                                <span className="text-lg font-clash font-medium">{details.status}</span>
                            </div>
                         </div>

                         {/* Date */}
                         <div className="mb-10">
                            <div className="flex items-center gap-2 mb-4 text-neutral-500">
                                <Calendar size={14} />
                                <h4 className="text-xs font-sora font-semibold uppercase tracking-[0.2em]">Timeline</h4>
                            </div>
                            <span className="text-lg font-clash font-medium">{project.year}</span>
                         </div>

                         {/* Action Button */}
                         {details.ctaLink && (
                             <a 
                                href={details.ctaLink}
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="w-full py-4 bg-white text-black rounded-xl font-bold font-sora uppercase tracking-widest flex items-center justify-center gap-3 hover:bg-neutral-200 transition-colors group"
                             >
                                 {details.ctaText}
                                 <ArrowUpRight size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                             </a>
                         )}
                    </motion.div>
                </div>
            </div>
        </div>

        {/* Next Project Footer */}
        <div 
            onClick={() => onNext(nextProject)}
            className="w-full h-[40vh] bg-neutral-900 border-t border-neutral-800 relative group cursor-pointer overflow-hidden flex items-center justify-center"
        >
            <div className="absolute inset-0 opacity-20 group-hover:opacity-40 transition-opacity duration-700">
                <img src={nextProject.image} alt="Next" className="w-full h-full object-cover filter grayscale group-hover:grayscale-0 transition-all duration-700 scale-105 group-hover:scale-100" />
            </div>
            <div className="relative z-10 text-center">
                <span className="text-sm font-sora uppercase tracking-[0.3em] text-neutral-400 mb-4 block">Next Project</span>
                <h2 className="text-5xl md:text-8xl font-clash font-bold uppercase tracking-tight text-white group-hover:scale-110 transition-transform duration-500">
                    {nextProject.title}
                </h2>
                <div className="mt-8 opacity-0 group-hover:opacity-100 transition-opacity duration-500 transform translate-y-4 group-hover:translate-y-0">
                    <span className="inline-flex items-center gap-2 text-white border-b border-white pb-1 font-sora uppercase tracking-widest text-sm">
                        View Case Study <ArrowUpRight size={14} />
                    </span>
                </div>
            </div>
        </div>
    </motion.div>
  );
};

export default ProjectDetail;