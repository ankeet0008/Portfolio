import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { RefreshCw, Heart } from 'lucide-react';

interface ThankYouPageProps {
  onRestart: () => void;
}

const ThankYouPage: React.FC<ThankYouPageProps> = ({ onRestart }) => {
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="bg-neutral-950 min-h-screen text-white relative z-50 flex flex-col items-center justify-center overflow-hidden px-6"
    >
        {/* Background Gradients */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
            <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-indigo-900/20 rounded-full blur-[100px] animate-pulse"></div>
            <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-purple-900/20 rounded-full blur-[100px] animate-pulse delay-700"></div>
        </div>

        <motion.div 
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="relative z-10 text-center max-w-4xl mx-auto"
        >
            <div className="mb-8 flex justify-center">
                <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-neutral-800 bg-neutral-900/50 backdrop-blur-sm text-xs font-sora font-medium uppercase tracking-widest text-neutral-400">
                    <Heart size={12} className="text-red-500 fill-red-500" />
                    <span>End of Broadcast</span>
                </span>
            </div>

            <h1 className="text-5xl md:text-8xl lg:text-9xl font-clash font-semibold uppercase tracking-tight leading-[0.9] mb-12">
                Thank You <br />
                <span className="text-neutral-500 italic font-serif">For Your Time.</span>
            </h1>

            {/* The Leo Gif */}
            <motion.div 
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                className="w-full max-w-[500px] aspect-video mx-auto rounded-2xl overflow-hidden border border-neutral-800 shadow-2xl relative group"
            >
                <div className="absolute inset-0 bg-neutral-900 animate-pulse z-0"></div>
                <img 
                    src="https://media.giphy.com/media/OWxyg9g639l6M/giphy.gif" 
                    alt="Leonardo DiCaprio Dancing" 
                    className="relative z-10 w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                />
                
                {/* Overlay Text */}
                <div className="absolute bottom-4 left-4 z-20 mix-blend-difference text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span className="text-[10px] font-mono uppercase">Wolf of Wall Street © 2013</span>
                </div>
            </motion.div>

            <motion.div 
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 1 }}
                className="mt-16"
            >
                <button 
                    onClick={onRestart}
                    className="group relative px-8 py-4 bg-white text-black rounded-full font-bold font-sora uppercase tracking-widest overflow-hidden hover:scale-105 transition-transform duration-300"
                >
                    <span className="relative z-10 flex items-center gap-3">
                        <RefreshCw size={18} className="group-hover:rotate-180 transition-transform duration-500" />
                        Restart Experience
                    </span>
                    <div className="absolute inset-0 bg-neutral-200 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out z-0"></div>
                </button>
            </motion.div>
        </motion.div>

        {/* Footer Copyright */}
        <div className="absolute bottom-8 left-0 w-full text-center">
            <span className="text-[10px] font-mono uppercase text-neutral-600">
                Have a wonderful day
            </span>
        </div>
    </motion.div>
  );
};

export default ThankYouPage;