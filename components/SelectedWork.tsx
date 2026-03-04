import React, { useRef, useEffect, useState } from 'react';
import { Project } from '../types';
import { ArrowUpRight } from 'lucide-react';
import { motion } from 'framer-motion';
import SplitTextReveal from './SplitTextReveal';
import MaskReveal from './MaskReveal';
import { projects } from '../utils/projectData';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface SelectedWorkProps {
  onProjectSelect: (project: Project) => void;
}

const SelectedWork: React.FC<SelectedWorkProps> = ({ onProjectSelect }) => {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const cardsContainerRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    const container = cardsContainerRef.current;
    if (!section || !track || !container) return;

    // Wait for images to load for correct measurements
    const timer = setTimeout(() => {
      // Calculate scroll distance
      const totalScrollWidth = container.scrollWidth - window.innerWidth;

      // Kill any previous instances
      ScrollTrigger.getAll().forEach(st => {
        if (st.trigger === section) st.kill();
      });

      // Pin the section and horizontally scroll the cards
      gsap.to(container, {
        x: -totalScrollWidth,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: () => `+=${totalScrollWidth}`,
          pin: true,
          scrub: 1,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const progress = self.progress;
            setScrollProgress(progress);
            // Calculate which project is currently "active"
            const idx = Math.min(
              Math.floor(progress * projects.length),
              projects.length - 1
            );
            setActiveIndex(idx);
            // Directly update the progress bar width for buttery smoothness
            if (progressBarRef.current) {
              progressBarRef.current.style.width = `${progress * 100}%`;
            }
          },
        },
      });

      // Animate each card's image parallax
      const cards = container.querySelectorAll('.project-card');
      cards.forEach((card) => {
        const img = card.querySelector('.project-card-img') as HTMLElement;
        if (img) {
          gsap.to(img, {
            xPercent: -15,
            ease: 'none',
            scrollTrigger: {
              trigger: card,
              containerAnimation: gsap.getById?.('horizontal-scroll') || undefined,
              start: 'left right',
              end: 'right left',
              scrub: true,
            },
          });
        }
      });
    }, 300);

    return () => {
      clearTimeout(timer);
      ScrollTrigger.getAll().forEach((st) => {
        if (st.trigger === section) st.kill();
      });
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="work"
      className="relative bg-neutral-950 text-white overflow-hidden"
    >
      {/* Inner wrapper to be pinned */}
      <div ref={trackRef} className="relative w-full h-screen flex flex-col">
        {/* Header Section */}
        <div className="px-6 md:px-12 pt-8 pb-6 md:pt-10 md:pb-6 flex flex-col md:flex-row md:items-baseline justify-between gap-4 border-b border-neutral-800 shrink-0">
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
            <span className="mt-4 md:mt-0 text-sm font-clash font-medium text-neutral-500 uppercase tracking-widest">
              2022 — 2024
            </span>
          </MaskReveal>
        </div>

        {/* Horizontal Scroll Track */}
        <div className="flex-1 flex items-center overflow-hidden">
          <div
            ref={cardsContainerRef}
            className="flex gap-6 md:gap-8 items-stretch pl-6 md:pl-12 pr-[40vw]"
            style={{ willChange: 'transform' }}
          >
            {projects.map((project, index) => (
              <div
                key={project.id}
                data-cursor-text="View"
                className="project-card group relative flex-shrink-0 rounded-2xl overflow-hidden cursor-pointer"
                style={{
                  width: 'clamp(320px, 40vw, 600px)',
                  height: 'clamp(350px, 65vh, 550px)',
                }}
                onClick={() => onProjectSelect(project)}
              >
                {/* Image with parallax */}
                <div className="absolute inset-0 overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="project-card-img w-[130%] h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
                </div>

                {/* Content */}
                <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-8 z-10">
                  {/* Category tag */}
                  <div className="mb-4">
                    <span className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.2em] text-white/80 border border-white/20 rounded-full backdrop-blur-sm">
                      {project.category}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-3xl md:text-4xl font-clash font-semibold tracking-tight text-white mb-2 group-hover:translate-x-2 transition-transform duration-500">
                    {project.title}
                  </h3>

                  {/* Description */}
                  <p className="text-sm text-white/60 font-sora font-light leading-relaxed max-w-[400px] mb-4 opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-500">
                    {project.description}
                  </p>

                  {/* Bottom row */}
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono text-white/40 uppercase tracking-wider">
                      {project.year}
                    </span>
                    <div className="w-10 h-10 rounded-full border border-white/30 flex items-center justify-center group-hover:bg-white group-hover:text-black group-hover:border-white transition-all duration-300">
                      <ArrowUpRight size={16} />
                    </div>
                  </div>
                </div>

                {/* Index number */}
                <div className="absolute top-6 right-6 z-10">
                  <span className="text-[80px] md:text-[100px] font-clash font-bold text-white/5 leading-none select-none">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                </div>
              </div>
            ))}

            {/* End card — CTA */}
            <div
              className="flex-shrink-0 rounded-2xl overflow-hidden flex flex-col items-center justify-center bg-neutral-900 border border-neutral-800"
              style={{
                width: 'clamp(280px, 30vw, 450px)',
                height: 'clamp(350px, 65vh, 550px)',
              }}
            >
              <span className="text-xs font-sora uppercase tracking-[0.3em] text-neutral-500 mb-6">
                More Coming Soon
              </span>
              <h3 className="text-4xl md:text-5xl font-clash font-bold text-white text-center leading-tight px-8">
                Let's Build<br />
                <span className="text-neutral-500 italic font-serif font-normal">Together.</span>
              </h3>
            </div>
          </div>
        </div>

        {/* Bottom progress indicator */}
        <div className="px-6 md:px-12 py-4 border-t border-neutral-800 shrink-0">
          <div className="flex items-center justify-between mb-3">
            <span className="text-[10px] font-mono text-neutral-500 uppercase tracking-wider">
              {String(activeIndex + 1).padStart(2, '0')} / {String(projects.length).padStart(2, '0')}
            </span>
            <div className="hidden md:flex items-center gap-6">
              {projects.map((project, i) => (
                <span
                  key={project.id}
                  className="text-[10px] font-clash font-semibold uppercase tracking-[0.15em] transition-all duration-500"
                  style={{
                    color: i <= activeIndex ? 'rgba(255,255,255,0.9)' : 'rgba(255,255,255,0.2)',
                    transform: i === activeIndex ? 'scale(1.1)' : 'scale(1)',
                  }}
                >
                  {project.title}
                </span>
              ))}
            </div>
            <span className="text-[10px] font-mono text-neutral-600 uppercase">
              {Math.round(scrollProgress * 100)}%
            </span>
          </div>
          {/* Progress bar */}
          <div className="relative w-full h-[2px] bg-neutral-800 rounded-full overflow-hidden">
            <div
              ref={progressBarRef}
              className="absolute top-0 left-0 h-full rounded-full"
              style={{
                width: `${scrollProgress * 100}%`,
                background: 'linear-gradient(90deg, rgba(255,255,255,0.3) 0%, rgba(255,255,255,0.9) 100%)',
                transition: 'none',
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default SelectedWork;