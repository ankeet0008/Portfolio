import React, { useRef } from 'react';
import { ArrowUpRight, Music, Bot, ChefHat, Rocket, Terminal } from 'lucide-react';
import { motion, Variants } from 'framer-motion';

const Freebies: React.FC = () => {
  const containerRef = useRef<HTMLElement>(null);
  
  // Stagger container for cards
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const cardVariants: Variants = {
    hidden: { y: 100, opacity: 0, scale: 0.9 },
    show: { 
      y: 0, 
      opacity: 1, 
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 50,
        damping: 15
      }
    }
  };

  return (
    <section ref={containerRef} className="bg-[#F5F2EB] relative overflow-hidden min-h-screen pb-24">
       
       {/* Animated Header Section - Black background to transition from previous section */}
       <div className="bg-neutral-950 pt-12 pb-24 rounded-b-[3rem] md:rounded-b-[5rem] shadow-xl relative z-0">
         <motion.div
           initial={{ clipPath: "inset(45% 0 45% 0)" }}
           whileInView={{ clipPath: "inset(0% 0 0% 0)" }}
           viewport={{ once: false, margin: "-10%" }}
           transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
           className="w-full bg-neutral-900 border-y border-neutral-800 py-6 md:py-10 relative overflow-hidden flex"
         >
           <motion.div
             className="flex whitespace-nowrap min-w-full items-center"
             initial={{ x: "0%" }}
             animate={{ x: "-50%" }}
             transition={{
               repeat: Infinity,
               ease: "linear",
               duration: 20,
             }}
           >
             {[...Array(2)].map((_, setIndex) => (
                <div key={setIndex} className="flex shrink-0 items-center justify-around min-w-full">
                   {[...Array(4)].map((_, i) => (
                      <span key={i} className="text-6xl md:text-9xl font-black font-clash uppercase tracking-tighter text-white px-12 opacity-90">
                          INTERESTS ⚡
                      </span>
                   ))}
                </div>
             ))}
           </motion.div>
         </motion.div>
       </div>

       {/* Foreground Content - Cards Section on Warm White */}
       <div className="relative z-10 px-6 md:px-12 w-full max-w-[1600px] mx-auto -mt-12 md:-mt-16">
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 md:grid-cols-6 gap-4 md:gap-6"
          >
              
              {/* Box 1: Spotify Green (Music) - Span 3 */}
              <motion.div 
                variants={cardVariants}
                whileHover={{ scale: 0.98, rotate: -1 }}
                className="md:col-span-3 bg-[#1DB954] p-6 md:p-10 rounded-3xl min-h-[300px] md:min-h-[450px] flex flex-col justify-between text-black relative group overflow-hidden shadow-2xl cursor-default"
              >
                 <div className="flex justify-between items-start z-10">
                    <h3 className="text-lg md:text-2xl font-bold font-clash uppercase tracking-tight flex items-center gap-2">
                        Coding with soundtracks on loop <ArrowUpRight className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    </h3>
                 </div>
                 
                 {/* Middle Content */}
                 <div className="flex flex-col gap-2 z-10 my-6">
                     <div className="flex items-center gap-3">
                        <span className="w-1.5 h-1.5 bg-black rounded-full" />
                        <span className="text-sm md:text-lg font-sora font-medium opacity-90">Lo-fi to build, synthwave to ship</span>
                     </div>
                     <div className="flex items-center gap-3">
                        <span className="w-1.5 h-1.5 bg-black rounded-full" />
                        <span className="text-sm md:text-lg font-sora font-medium opacity-90">Music fuels my flow state</span>
                     </div>
                 </div>

                 {/* Hover Visual: Mock Player / Artists */}
                 <div className="absolute right-[-100px] top-1/2 -translate-y-1/2 translate-x-[50px] group-hover:translate-x-[-140px] md:group-hover:translate-x-[-180px] transition-transform duration-500 ease-out z-0 opacity-0 group-hover:opacity-100 pointer-events-none">
                     <div className="bg-black/80 backdrop-blur-md text-white p-4 rounded-xl w-[180px] rotate-6 group-hover:rotate-12 transition-transform duration-700 shadow-xl border border-white/10">
                         <div className="flex items-center gap-2 mb-3 border-b border-white/20 pb-2">
                             <div className="w-2 h-2 bg-[#1DB954] rounded-full animate-pulse"/>
                             <span className="text-[10px] font-bold uppercase tracking-widest">On Repeat</span>
                         </div>
                         <div className="flex flex-col gap-2">
                             {['Hans Zimmer', 'Daft Punk', 'Odesza'].map((artist, i) => (
                                 <div key={i} className="flex items-center gap-2">
                                     <div className="w-6 h-6 bg-neutral-700 rounded-full flex items-center justify-center text-[8px]">🎵</div>
                                     <span className="text-xs font-medium">{artist}</span>
                                 </div>
                             ))}
                         </div>
                     </div>
                 </div>
                 
                 {/* Decorative background element */}
                 <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-2xl pointer-events-none" />

                 <div className="flex items-center gap-4 z-10">
                    <div className="w-10 h-10 md:w-14 md:h-14 bg-black text-[#1DB954] flex items-center justify-center rounded-full font-bold text-xl md:text-2xl group-hover:scale-110 transition-transform duration-300">
                        <Music size={24} />
                    </div>
                    <span className="text-4xl md:text-6xl font-bold font-clash tracking-tight group-hover:tracking-normal transition-all duration-300">Loves music.</span>
                 </div>
              </motion.div>

              {/* Box 2: Purple (AI Experiments) - Span 3 */}
              <motion.div 
                variants={cardVariants}
                whileHover={{ scale: 0.98, rotate: 1 }}
                className="md:col-span-3 bg-[#7C3AED] p-6 md:p-10 rounded-3xl min-h-[300px] md:min-h-[450px] flex flex-col justify-between text-white relative group overflow-hidden shadow-2xl cursor-default"
              >
                 <div className="flex justify-between items-start z-10">
                    <h3 className="text-lg md:text-2xl font-bold font-clash uppercase tracking-tight flex items-center gap-2">
                        AI Experiments <ArrowUpRight className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    </h3>
                 </div>

                 {/* Middle Content - Text Ideas */}
                 <div className="flex flex-col gap-3 z-10 my-6">
                    {[
                        "Breaking models for fun",
                        "Building weird AI tools at 2AM",
                        "Turning curiosity into code"
                    ].map((item, i) => (
                        <div key={i} className="flex items-center gap-3">
                            <span className="w-2 h-2 bg-white/50 rounded-full shrink-0" />
                            <span className="text-lg md:text-xl font-sora font-medium leading-tight opacity-90">{item}</span>
                        </div>
                    ))}
                 </div>

                 {/* Background Decoration */}
                 <div className="absolute -right-10 top-1/2 -translate-y-1/2 opacity-10 rotate-12 group-hover:rotate-0 group-hover:opacity-20 transition-all duration-700 pointer-events-none">
                    <Bot size={250} />
                 </div>

                 <div className="flex items-center gap-4 z-10">
                    <div className="bg-white rounded-xl p-1 md:p-2 group-hover:-rotate-12 transition-transform duration-300 text-[#7C3AED]">
                        <Bot size={32} className="md:w-10 md:h-10" />
                    </div>
                    <span className="text-4xl md:text-6xl font-bold font-clash tracking-tight group-hover:tracking-normal transition-all duration-300">AI Tinkerer.</span>
                 </div>
              </motion.div>

              {/* Box 3: Orange (Weekend Chef) - Span 2 */}
              <motion.div 
                 variants={cardVariants}
                 whileHover={{ scale: 0.98, y: -5 }}
                 className="md:col-span-2 bg-[#FF9F0A] p-6 md:p-8 rounded-3xl min-h-[250px] md:min-h-[350px] flex flex-col justify-between text-black group overflow-hidden shadow-xl relative cursor-default"
              >
                  <div className="z-10">
                     <h3 className="text-lg md:text-xl font-bold font-clash uppercase tracking-tight flex items-center gap-2 mb-4">
                         Debugging life with recipes <ArrowUpRight className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                     </h3>
                     
                     <div className="flex flex-col gap-2 opacity-90">
                        <span className="text-xs md:text-sm font-sora font-medium flex items-center gap-2">
                           <span className="w-1.5 h-1.5 bg-black rounded-full" /> Code by day, cook by night
                        </span>
                        <span className="text-xs md:text-sm font-sora font-medium flex items-center gap-2">
                           <span className="w-1.5 h-1.5 bg-black rounded-full" /> Building flavors like systems
                        </span>
                     </div>
                  </div>

                  {/* Background Decoration */}
                  <div className="absolute -right-8 top-1/2 -translate-y-1/2 opacity-10 rotate-12 group-hover:rotate-0 group-hover:opacity-20 transition-all duration-700 pointer-events-none">
                      <ChefHat size={180} />
                  </div>

                  <div className="flex items-center gap-3 z-10 mt-8 md:mt-auto">
                      <div className="bg-black text-[#FF9F0A] p-2 rounded-lg group-hover:rotate-12 transition-transform duration-300">
                           <ChefHat size={24} />
                      </div>
                      <span className="text-2xl md:text-3xl font-bold font-clash tracking-tight group-hover:tracking-normal transition-all duration-300">Weekend Chef.</span>
                  </div>
              </motion.div>

              {/* Box 4: Cyan (Curiosity Driven) - Span 2 */}
              <motion.div 
                 variants={cardVariants}
                 whileHover={{ scale: 0.98, y: -5 }}
                 className="md:col-span-2 bg-[#06B6D4] p-6 md:p-8 rounded-3xl min-h-[250px] md:min-h-[350px] flex flex-col justify-between text-black group overflow-hidden relative shadow-xl cursor-default"
              >
                  <div className="z-10">
                     <h3 className="text-lg md:text-xl font-bold font-clash uppercase tracking-tight flex items-center gap-2 mb-4">
                         Always exploring what’s next <ArrowUpRight className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                     </h3>
                     
                     <div className="flex flex-col gap-2 opacity-90">
                        <span className="text-xs md:text-sm font-sora font-medium flex items-center gap-2">
                           <span className="w-1.5 h-1.5 bg-black rounded-full" /> Learning fast, building faster
                        </span>
                        <span className="text-xs md:text-sm font-sora font-medium flex items-center gap-2">
                           <span className="w-1.5 h-1.5 bg-black rounded-full" /> Obsessed with the future
                        </span>
                     </div>
                  </div>

                  {/* Background Decoration */}
                  <div className="absolute -right-8 top-1/2 -translate-y-1/2 opacity-10 rotate-12 group-hover:rotate-0 group-hover:opacity-20 transition-all duration-700 pointer-events-none">
                      <Rocket size={180} />
                  </div>

                  <div className="flex items-center gap-3 z-10 mt-8 md:mt-auto">
                      <div className="bg-black text-[#06B6D4] p-2 rounded-lg group-hover:-rotate-12 transition-transform duration-300">
                           <Rocket size={24} />
                      </div>
                      <span className="text-2xl md:text-3xl font-bold font-clash tracking-tight group-hover:tracking-normal transition-all duration-300">Curiosity Driven.</span>
                  </div>
              </motion.div>

              {/* Box 5: Indigo (AI Builder) - Span 2 */}
              <motion.div 
                 variants={cardVariants}
                 whileHover={{ scale: 0.98, y: -5 }}
                 className="md:col-span-2 bg-[#4F46E5] p-6 md:p-8 rounded-3xl min-h-[250px] md:min-h-[350px] flex flex-col justify-between text-white group overflow-hidden shadow-xl relative cursor-default"
              >
                  <div className="z-10">
                     <h3 className="text-lg md:text-xl font-bold font-clash uppercase tracking-tight flex items-center gap-2 mb-4">
                         AI Tools Playground <ArrowUpRight className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                     </h3>
                     
                     <div className="flex flex-col gap-2 opacity-90">
                        <span className="text-xs md:text-sm font-sora font-medium flex items-center gap-2">
                           <span className="w-1.5 h-1.5 bg-white rounded-full" /> Playing with models
                        </span>
                        <span className="text-xs md:text-sm font-sora font-medium flex items-center gap-2">
                           <span className="w-1.5 h-1.5 bg-white rounded-full" /> Building cool stuff
                        </span>
                     </div>
                  </div>

                  {/* Background Decoration */}
                  <div className="absolute -right-8 top-1/2 -translate-y-1/2 opacity-10 rotate-12 group-hover:rotate-0 group-hover:opacity-20 transition-all duration-700 pointer-events-none">
                      <Terminal size={180} />
                  </div>

                  <div className="flex items-center gap-3 z-10 mt-8 md:mt-auto">
                      <div className="bg-white text-[#4F46E5] p-2 rounded-lg group-hover:rotate-12 transition-transform duration-300">
                           <Terminal size={24} />
                      </div>
                      <span className="text-2xl md:text-3xl font-bold font-clash tracking-tight group-hover:tracking-normal transition-all duration-300">AI Builder.</span>
                  </div>
              </motion.div>

          </motion.div>
       </div>
    </section>
  );
};

export default Freebies;