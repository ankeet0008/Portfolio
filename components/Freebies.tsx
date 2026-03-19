import React, { useRef, useState, useEffect } from 'react';
import { BrainCircuit, Network, Terminal, Users, Zap, Code } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const interests = [
  {
    id: 1,
    title: "Machine Learning",
    subtitle: "Advancing AI capabilities",
    description: "Passionate about building and deploying intelligent systems that solve complex, real-world problems.",
    icon: <BrainCircuit size={32} />,
    color: "#FFFFFF",
    bgImage: "radial-gradient(circle at 60% 50%, rgba(255, 255, 255, 0.08) 0%, rgba(0,0,0,0) 60%)"
  },
  {
    id: 2,
    title: "System Architecture",
    subtitle: "Designing scalable infrastructure",
    description: "Architecting robust and efficient backend systems to support high-performance applications and data pipelines.",
    icon: <Network size={32} />,
    color: "#E5E5E5",
    bgImage: "radial-gradient(circle at 60% 50%, rgba(229, 229, 229, 0.06) 0%, rgba(0,0,0,0) 60%)"
  },
  {
    id: 3,
    title: "Open Source",
    subtitle: "Contributing to the ecosystem",
    description: "Actively engaging with the open-source community, sharing code, and collaborating on innovative developer tools.",
    icon: <Terminal size={32} />,
    color: "#CCCCCC",
    bgImage: "radial-gradient(circle at 60% 50%, rgba(204, 204, 204, 0.05) 0%, rgba(0,0,0,0) 60%)"
  },
  {
    id: 4,
    title: "Tech Leadership",
    subtitle: "Fostering knowledge sharing",
    description: "Dedicated to mentoring peers, sharing technical insights, and continuously learning within the engineering community.",
    icon: <Users size={32} />,
    color: "#B3B3B3",
    bgImage: "radial-gradient(circle at 60% 50%, rgba(179, 179, 179, 0.04) 0%, rgba(0,0,0,0) 60%)"
  },
  {
    id: 5,
    title: "UI/UX & Web Dev",
    subtitle: "Crafting digital experiences",
    description: "I am passionate about UI/UX and webdev, turning creative concepts into beautiful, interactive, and user-centric web applications.",
    icon: <Code size={32} />,
    color: "#A3A3A3",
    bgImage: "radial-gradient(circle at 60% 50%, rgba(163, 163, 163, 0.04) 0%, rgba(0,0,0,0) 60%)"
  }
];

const Freebies: React.FC = () => {
   const containerRef = useRef<HTMLElement>(null);
   const boxesRef = useRef<(HTMLDivElement | null)[]>([]);
   const [activeItem, setActiveItem] = useState<number>(1);
   const [isMobile, setIsMobile] = useState(false);

   useEffect(() => {
      const checkMobile = () => setIsMobile(window.innerWidth < 768);
      checkMobile();
      window.addEventListener('resize', checkMobile);
      return () => window.removeEventListener('resize', checkMobile);
   }, []);

   useEffect(() => {
      const ctx = gsap.context(() => {
         // Staggered entrance animation for all boxes
         if (boxesRef.current.length > 0) {
            gsap.fromTo(boxesRef.current, 
               { opacity: 0, y: 80 },
               {
                  opacity: 1, 
                  y: 0, 
                  duration: 0.8, 
                  stagger: 0.1, 
                  ease: "power3.out",
                  scrollTrigger: {
                     trigger: containerRef.current,
                     start: "top 60%",
                     toggleActions: "play none none reverse"
                  }
               }
            );
         }
      }, containerRef);
      return () => ctx.revert();
   }, []);

   return (
      <section ref={containerRef} className="bg-[#050505] relative min-h-screen pb-24 text-white overflow-hidden">
         {/* Animated Header Section */}
         <div className="bg-[#0a0a0a] pt-12 pb-24 rounded-b-[3rem] md:rounded-b-[5rem] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.8)] relative z-10 border-b border-white/5">
            <motion.div
               initial={{ clipPath: "inset(45% 0 45% 0)" }}
               whileInView={{ clipPath: "inset(0% 0 0% 0)" }}
               viewport={{ once: false, margin: "-10%" }}
               transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
               className="w-full bg-[#111] border-y border-white/10 py-6 md:py-10 relative flex overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.5)]"
            >
               <motion.div
                  className="flex whitespace-nowrap min-w-full items-center"
                  initial={{ x: "0%" }}
                  animate={{ x: "-50%" }}
                  transition={{ repeat: Infinity, ease: "linear", duration: 25 }}
               >
                  {[...Array(2)].map((_, setIndex) => (
                     <div key={setIndex} className="flex shrink-0 items-center justify-around min-w-full">
                        {[...Array(4)].map((_, i) => (
                           <span key={i} className="text-6xl md:text-9xl font-black font-clash uppercase tracking-tighter text-white/90 px-12 flex items-center gap-8">
                              PASSIONS <Zap className="w-12 h-12 md:w-20 md:h-20 text-neutral-400" />
                           </span>
                        ))}
                     </div>
                  ))}
               </motion.div>
            </motion.div>
         </div>

         {/* Accordion Container */}
         <div className="relative z-10 w-full max-w-[1400px] mx-auto px-4 md:px-8 mt-16 md:mt-24">
            <div className="flex flex-col md:flex-row gap-4 h-[75vh] md:h-[65vh]">
               {interests.map((item, index) => {
                  const isActive = activeItem === item.id;
                  
                  return (
                     <motion.div
                        key={item.id}
                        ref={(el) => { boxesRef.current[index] = el; }}
                        onMouseEnter={() => !isMobile && setActiveItem(item.id)}
                        onClick={() => isMobile && setActiveItem(item.id)}
                        animate={{
                           flex: isActive ? (isMobile ? 3 : 5) : 1,
                        }}
                        transition={{ duration: 0.6, ease: [0.32, 0.72, 0, 1] }}
                        className={`relative rounded-[2rem] overflow-hidden cursor-pointer flex flex-col border border-white/10 group`}
                        style={{
                           background: isActive ? item.bgImage : "rgba(20, 20, 20, 0.8)",
                           backgroundColor: isActive ? "#0d0d0d" : "#0d0d0d",
                        }}
                     >
                        {/* Dimmer overlay for inactive items */}
                        <div className={`absolute inset-0 bg-black/50 transition-opacity duration-700 ${isActive ? 'opacity-0' : 'opacity-100 group-hover:opacity-60'}`} />
                        
                        <div className={`absolute inset-0 p-6 md:p-8 flex flex-col h-full w-full justify-end z-10 ${!isActive && !isMobile ? 'items-center pb-12' : 'items-start'}`}>
                           
                           {/* Icon & Title */}
                           <div className={`flex ${!isActive && !isMobile ? 'flex-col items-center gap-8' : 'flex-row md:flex-col items-center md:items-start gap-4'} mb-2`}>
                              
                              <motion.div 
                                 className="p-3 md:p-4 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-xl shrink-0"
                                 animate={{ 
                                    color: isActive ? item.color : '#555555',
                                    scale: isActive ? 1 : 0.85
                                 }}
                                 transition={{ duration: 0.5 }}
                              >
                                 {item.icon}
                              </motion.div>
                              
                              <h3 
                                 className="text-2xl md:text-4xl font-clash font-bold tracking-tight uppercase opacity-90 transition-colors duration-500"
                                 style={{
                                    writingMode: (!isActive && !isMobile) ? 'vertical-rl' : 'horizontal-tb',
                                    transform: (!isActive && !isMobile) ? 'rotate(180deg)' : 'none',
                                    whiteSpace: 'nowrap',
                                    color: isActive ? '#fff' : '#888'
                                 }}
                              >
                                 {item.title}
                              </h3>

                           </div>

                           {/* Description Details (only visible when active) */}
                           <AnimatePresence>
                              {isActive && (
                                 <motion.div
                                    initial={{ opacity: 0, height: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, height: 'auto', scale: 1 }}
                                    exit={{ opacity: 0, height: 0, scale: 0.95 }}
                                    transition={{ duration: 0.5, ease: [0.32, 0.72, 0, 1] }}
                                    className="overflow-hidden w-full max-w-xl mt-4"
                                 >
                                    <h4 
                                       className="text-lg md:text-2xl font-sora font-semibold mb-3 tracking-wide"
                                       style={{ color: item.color }}
                                    >
                                       {item.subtitle}
                                    </h4>
                                    <p className="font-sora text-sm md:text-base text-neutral-400 leading-relaxed font-light">
                                       {item.description}
                                    </p>
                                 </motion.div>
                              )}
                           </AnimatePresence>
                        </div>

                        {/* Large Background Decorative Icon */}
                        <AnimatePresence>
                           {isActive && !isMobile && (
                              <motion.div
                                 initial={{ scale: 0.5, opacity: 0, rotate: -20, x: 50 }}
                                 animate={{ scale: 1, opacity: 0.08, rotate: 0, x: 0 }}
                                 exit={{ opacity: 0, transition: { duration: 0.2 } }}
                                 transition={{ duration: 0.8, ease: "easeOut" }}
                                 className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none"
                                 style={{ color: item.color }}
                              >
                                 {React.cloneElement(item.icon as React.ReactElement, { size: 400 })}
                              </motion.div>
                           )}
                        </AnimatePresence>
                     </motion.div>
                  );
               })}
            </div>
         </div>
      </section>
   );
};

export default Freebies;