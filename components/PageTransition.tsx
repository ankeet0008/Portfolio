import React from 'react';
import { motion } from 'framer-motion';

interface PageTransitionProps {
    children: React.ReactNode;
    className?: string;
}

// Smooth curtain wipe + content reveal transition wrapper
const PageTransition: React.FC<PageTransitionProps> = ({ children, className = '' }) => {
    return (
        <motion.div
            className={`relative ${className}`}
            initial="initial"
            animate="animate"
            exit="exit"
        >
            {/* Curtain overlay that wipes across the screen */}
            <motion.div
                className="fixed inset-0 z-[9998] bg-neutral-950 origin-bottom pointer-events-none"
                initial={{ scaleY: 1 }}
                animate={{ scaleY: 0 }}
                exit={{ scaleY: 1 }}
                transition={{
                    duration: 0.6,
                    ease: [0.76, 0, 0.24, 1],
                }}
                style={{ transformOrigin: 'top' }}
            />

            {/* Second curtain layer for depth — slightly delayed */}
            <motion.div
                className="fixed inset-0 z-[9997] bg-neutral-800 origin-bottom pointer-events-none"
                initial={{ scaleY: 1 }}
                animate={{ scaleY: 0 }}
                exit={{ scaleY: 1 }}
                transition={{
                    duration: 0.6,
                    delay: 0.08,
                    ease: [0.76, 0, 0.24, 1],
                }}
                style={{ transformOrigin: 'top' }}
            />

            {/* Page content with fade + slide up */}
            <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{
                    duration: 0.5,
                    delay: 0.3,
                    ease: [0.16, 1, 0.3, 1],
                }}
            >
                {children}
            </motion.div>
        </motion.div>
    );
};

export default PageTransition;
