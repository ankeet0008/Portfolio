import React from 'react';
import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';

const ThankYou: React.FC = () => {
    return (
        <section className="bg-neutral-950 text-white sticky top-0 z-0 h-screen overflow-hidden px-6 border-t border-neutral-900 flex items-center">
            {/* Background Gradients */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-neutral-800/30 rounded-full blur-[100px] animate-pulse"></div>
                <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-neutral-700/20 rounded-full blur-[100px] animate-pulse delay-700"></div>
            </div>

            {/* Top Right Small Text */}
            <div className="absolute top-24 right-6 md:right-12 z-30">
                <span className="text-[10px] font-sora font-medium uppercase tracking-[0.2em] text-neutral-500">
                    Thank You For Your Time.
                </span>
            </div>

            <div className="relative z-10 w-full max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24 items-center">

                {/* Left Column: Quote */}
                <motion.div
                    initial={{ x: -50, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="flex flex-col items-start text-left max-w-lg"
                >
                    <div className="mb-4 text-neutral-600">
                        <Quote size={32} className="rotate-180 fill-current opacity-20" />
                    </div>
                    <h2 className="text-xl md:text-3xl font-clash font-medium leading-relaxed text-neutral-200 mb-6">
                        "We are going to have something that is, for the first time, smarter than the smartest human."
                    </h2>
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-[1px] bg-neutral-500"></div>
                        <span className="text-xs font-sora font-bold uppercase tracking-widest text-neutral-400">Elon Musk</span>
                    </div>
                </motion.div>

                {/* Right Column: Minimized GIF with Excited Animation */}
                <div className="w-full flex justify-center md:justify-end overflow-hidden py-10">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        animate={{ x: [-30, 30, -30] }}
                        transition={{
                            opacity: { duration: 0.5 },
                            scale: { duration: 0.5 },
                            x: {
                                repeat: Infinity,
                                duration: 1.5,
                                ease: "easeInOut"
                            }
                        }}
                        className="w-32 md:w-40 aspect-video rounded-lg overflow-hidden border border-neutral-800 shadow-2xl relative group shrink-0"
                    >
                        <div className="absolute inset-0 bg-neutral-900 animate-pulse z-0"></div>
                        <img
                            src="/hero-portrait.gif"
                            alt="Hero Portrait"
                            className="relative z-10 w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                        />

                        {/* Overlay Text */}
                        <div className="absolute bottom-1 left-1 z-20 mix-blend-difference text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <span className="text-[8px] font-mono uppercase">© 2013</span>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default ThankYou;