import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Copy, Check, Mail, ArrowUpRight, MapPin, Clock } from 'lucide-react';
import PageTransition from './PageTransition';

interface ContactPageProps {
  onBack: () => void;
}

const ContactPage: React.FC<ContactPageProps> = ({ onBack }) => {
  const [copied, setCopied] = useState(false);
  const [time, setTime] = useState<string>("");

  useEffect(() => {
    window.scrollTo(0, 0);
    const updateTime = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
      }));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('ankeetnaikk@gmail.com');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const socials = [
    { name: 'Instagram', link: 'https://www.instagram.com/ankiitt_0008/' },
    { name: 'LinkedIn', link: 'https://www.linkedin.com/in/ankit-naik-387092321/' },
    { name: 'GitHub', link: 'https://github.com/ankeet0008' },
    { name: 'Twitter', link: 'https://x.com/AnkeetNaikk' }
  ];

  return (
    <PageTransition
      className="bg-white min-h-screen text-black relative z-50 pt-24"
    >
      {/* Navigation */}
      <div className="fixed top-0 left-0 w-full px-6 py-6 md:px-12 md:py-8 flex justify-between items-center z-50 bg-white/90 backdrop-blur-md border-b border-neutral-100">
        <div />
        <div className="hidden md:flex items-center gap-2">
          <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
          <span className="text-xs font-mono text-neutral-500 uppercase">Open for new projects</span>
        </div>
      </div>

      <div className="px-6 md:px-12 pb-24 max-w-[1400px] mx-auto">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="flex flex-col md:flex-row justify-between items-start md:items-end mb-24 gap-8"
        >
          <h1 className="text-[12vw] leading-[0.85] font-clash font-semibold uppercase tracking-tight text-black">
            Get in <br />
            <span className="text-neutral-400 font-serif italic">Touch.</span>
          </h1>

          <div className="flex flex-col gap-6 md:mb-6">
            <div className="flex items-center gap-4 text-lg font-sora text-neutral-600">
              <Clock size={20} />
              <span>{time || "--:--"} (IST)</span>
            </div>
            <div className="flex items-center gap-4 text-lg font-sora text-neutral-600">
              <MapPin size={20} />
              <span>Odisha, India</span>
            </div>
          </div>
        </motion.div>

        {/* Email Section */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mb-24"
        >
          <span className="block text-xs font-sora font-bold uppercase tracking-[0.2em] text-neutral-400 mb-8">Direct Email</span>
          <div className="group relative w-full border-y border-black py-12 md:py-20 cursor-pointer overflow-hidden" onClick={handleCopyEmail}>
            <div className="absolute inset-0 bg-black translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-in-out z-0"></div>
            <div className="relative z-10 flex justify-between items-center group-hover:text-white transition-colors duration-300">
              <span className="text-4xl md:text-7xl font-clash font-medium truncate pr-4">ankeetnaikk@gmail.com</span>
              <div className="hidden md:flex items-center gap-2 px-4 py-2 border border-black group-hover:border-white rounded-full text-xs font-bold uppercase tracking-widest">
                {copied ? <Check size={14} /> : <Copy size={14} />}
                <span>{copied ? 'Copied' : 'Copy'}</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Socials Grid */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <span className="block text-xs font-sora font-bold uppercase tracking-[0.2em] text-neutral-400 mb-8">Social Connect</span>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {socials.map((social) => (
              <a
                key={social.name}
                href={social.link}
                target="_blank"
                rel="noopener noreferrer"
                className="group border border-neutral-200 p-8 md:p-12 rounded-2xl flex justify-between items-center hover:bg-neutral-50 transition-colors duration-300"
              >
                <span className="text-2xl md:text-3xl font-clash font-medium">{social.name}</span>
                <div className="w-12 h-12 rounded-full border border-neutral-300 flex items-center justify-center group-hover:bg-black group-hover:text-white group-hover:border-black transition-all duration-300">
                  <ArrowUpRight size={20} />
                </div>
              </a>
            ))}
          </div>
        </motion.div>

      </div>
    </PageTransition>
  );
};

export default ContactPage;