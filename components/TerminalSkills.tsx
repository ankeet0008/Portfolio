import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Github, Activity, Code2, Terminal as TerminalIcon, Cpu, Globe } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const skills = [
  { name: "Python", category: "Core", power: 95 },
  { name: "PyTorch", category: "ML", power: 88 },
  { name: "TensorFlow", category: "ML", power: 82 },
  { name: "React", category: "Frontend", power: 92 },
  { name: "Next.js", category: "Frontend", power: 90 },
  { name: "TypeScript", category: "Core", power: 85 },
  { name: "Scikit-Learn", category: "ML", power: 94 },
  { name: "FastAPI", category: "Backend", power: 87 },
  { name: "OpenCV", category: "Computer Vision", power: 80 },
  { name: "GSAP", category: "Animation", power: 85 },
  { name: "Tailwind", category: "Styling", power: 95 },
  { name: "Docker", category: "DevOps", power: 78 }
];

const TerminalSkills: React.FC = () => {
    const [processedSkills, setProcessedSkills] = useState<string[]>([]);
    const [currentTraining, setCurrentTraining] = useState("");
    const sectionRef = useRef<HTMLDivElement>(null);
    const terminalRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        let index = 0;
        const interval = setInterval(() => {
            if (index < skills.length) {
                const skill = skills[index];
                setCurrentTraining(`> TRAINING_MODEL: ${skill.name}... [${skill.power}%]`);
                setTimeout(() => {
                    setProcessedSkills(prev => [...prev, skill.name]);
                    if (index === skills.length - 1) setCurrentTraining("> ALL_MODELS_OPTIMIZED. SYSTEM_READY.");
                }, 800);
                index++;
            } else {
                clearInterval(interval);
            }
        }, 1500);

        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        if (terminalRef.current) {
            gsap.fromTo(terminalRef.current, 
                { opacity: 0, y: 50, scale: 0.95 },
                { 
                    opacity: 1, y: 0, scale: 1, 
                    duration: 1, 
                    scrollTrigger: {
                        trigger: terminalRef.current,
                        start: "top 80%",
                    }
                }
            );
        }
    }, []);

    return (
        <section ref={sectionRef} className="py-24 px-6 md:px-16 bg-neutral-950 relative overflow-hidden">
            <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
                
                {/* Micro-Bento GitHub Feed */}
                <div className="lg:col-span-5 space-y-6">
                    <div className="flex items-center gap-3 mb-8">
                        <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center border border-white/10">
                            <Github size={24} className="text-white" />
                        </div>
                        <div>
                            <h2 className="text-2xl font-clash font-semibold text-white uppercase tracking-tight">System Status</h2>
                            <p className="text-xs text-neutral-500 font-sora uppercase tracking-widest">Real-time Activity</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        {/* Commit Activity */}
                        <div className="bg-white/5 border border-white/10 rounded-3xl p-6 hover:bg-white/10 transition-colors group">
                            <Activity size={20} className="text-green-500 mb-4 group-hover:scale-110 transition-transform" />
                            <h4 className="text-3xl font-clash font-bold text-white mb-1">240+</h4>
                            <p className="text-xs text-neutral-500 uppercase tracking-widest font-medium">Commits Current Year</p>
                        </div>

                        {/* Current Focus */}
                        <div className="bg-white/5 border border-white/10 rounded-3xl p-6 hover:bg-white/10 transition-colors group">
                            <Cpu size={20} className="text-blue-500 mb-4 group-hover:scale-110 transition-transform" />
                            <h4 className="text-lg font-clash font-bold text-white mb-1 leading-tight">LLM Fine-Tuning</h4>
                            <p className="text-xs text-neutral-500 uppercase tracking-widest font-medium">Current Project</p>
                        </div>

                        <div className="col-span-2 bg-gradient-to-br from-white/5 to-transparent border border-white/10 rounded-3xl p-6 flex flex-col justify-between h-40">
                           <div className="flex justify-between items-start">
                                <Globe size={20} className="text-neutral-400" />
                                <span className="px-3 py-1 bg-green-500/10 text-green-500 text-[10px] rounded-full font-bold uppercase tracking-widest">Active Now</span>
                           </div>
                           <div>
                                <h3 className="text-xl font-clash font-semibold text-white mb-2 underline decoration-white/20 underline-offset-4">Open to Collaborations</h3>
                                <p className="text-sm text-neutral-500 font-sora leading-relaxed max-w-[200px]">Building the future of AI-driven web systems.</p>
                           </div>
                        </div>
                    </div>
                </div>

                {/* Terminal Skill Cloud */}
                <div ref={terminalRef} className="lg:col-span-7">
                    <div className="bg-[#0D0D0D] border border-white/15 rounded-2xl overflow-hidden shadow-2xl">
                        {/* Terminal Header */}
                        <div className="bg-white/5 border-b border-white/10 px-6 py-4 flex items-center justify-between">
                            <div className="flex gap-2">
                                <div className="w-3 h-3 rounded-full bg-red-500/50" />
                                <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
                                <div className="w-3 h-3 rounded-full bg-green-500/50" />
                            </div>
                            <div className="flex items-center gap-2 text-neutral-500">
                                <TerminalIcon size={14} />
                                <span className="text-[10px] font-mono tracking-widest uppercase">skill_processor_v2.log</span>
                            </div>
                        </div>

                        {/* Terminal Body */}
                        <div className="p-8 font-mono min-h-[400px] flex flex-col">
                            <div className="text-neutral-500 text-xs mb-6 opacity-60">
                                [SYSTEM_BOOT_SUCCESS] <br />
                                [LOADING_CORE_RESOURCES]... OK <br />
                                [AUTHENTICATING_USER: ANKIT_NAIK]... OK
                            </div>

                            <div className="space-y-4 mb-8">
                                <AnimatePresence>
                                    {processedSkills.map((skill, i) => (
                                        <motion.div 
                                            key={skill}
                                            initial={{ opacity: 0, x: -10 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            className="flex items-center gap-4 text-sm"
                                        >
                                            <span className="text-blue-500 shrink-0">√</span>
                                            <span className="text-neutral-300 w-32 shrink-0">{skill}</span>
                                            <div className="h-[2px] bg-white/5 flex-grow relative overflow-hidden">
                                                <motion.div 
                                                    initial={{ width: 0 }}
                                                    animate={{ width: "100%" }}
                                                    transition={{ duration: 0.8, ease: "circOut" }}
                                                    className="absolute inset-y-0 left-0 bg-white opacity-40 shadow-[0_0_10px_rgba(255,255,255,0.5)]"
                                                />
                                            </div>
                                            <span className="text-[10px] text-neutral-600 shrink-0 uppercase tracking-widest">Deployed</span>
                                        </motion.div>
                                    ))}
                                </AnimatePresence>
                            </div>

                            <div className="mt-auto pt-6 border-t border-white/5">
                                <p className="text-green-500 text-sm animate-pulse font-bold tracking-tight">
                                    {currentTraining}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Quick Tags */}
                    <div className="mt-8 flex flex-wrap gap-3">
                        {['PyTorch', 'Next.js 15', 'LLMs', 'TypeScript', 'Computer Vision'].map((tag) => (
                            <span key={tag} className="px-4 py-2 bg-white/5 border border-white/10 rounded-full text-[10px] text-neutral-400 font-sora uppercase tracking-[0.2em] hover:bg-white hover:text-black transition-all cursor-crosshair">
                                {tag}
                            </span>
                        ))}
                    </div>
                </div>

            </div>
        </section>
    );
};

export default TerminalSkills;
