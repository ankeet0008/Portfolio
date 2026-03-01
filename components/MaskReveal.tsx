import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

interface MaskRevealProps {
    children: React.ReactNode;
    className?: string;
    /** Delay before the reveal starts (seconds) */
    delay?: number;
    /** Duration of the reveal (seconds) */
    duration?: number;
    /** Direction the mask wipes from: 'bottom' (default) slides up, 'left' wipes right */
    direction?: 'bottom' | 'left';
    /** How much of the element needs to be in view before triggering */
    threshold?: number;
}

/**
 * MaskReveal — Lando Norris style clip-path text reveal.
 * Wraps children in a clipping container and animates the clip-path
 * from hidden → revealed as the element scrolls into view.
 *
 * Usage:
 *   <MaskReveal><h2 className="text-6xl">Selected Work</h2></MaskReveal>
 */
const MaskReveal: React.FC<MaskRevealProps> = ({
    children,
    className = '',
    delay = 0,
    duration = 0.9,
    direction = 'bottom',
    threshold = 0.3,
}) => {
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, { once: true, amount: threshold });

    const clipInitial =
        direction === 'bottom'
            ? 'inset(100% 0% 0% 0%)' // hidden below — clip from top, reveal upward
            : 'inset(0% 100% 0% 0%)'; // hidden to the right — clip from left, reveal rightward

    const clipFinal = 'inset(0% 0% 0% 0%)'; // fully visible

    return (
        <div ref={ref} className={`overflow-hidden ${className}`}>
            <motion.div
                initial={{ clipPath: clipInitial, y: direction === 'bottom' ? 24 : 0 }}
                animate={
                    isInView
                        ? { clipPath: clipFinal, y: 0 }
                        : { clipPath: clipInitial, y: direction === 'bottom' ? 24 : 0 }
                }
                transition={{
                    duration,
                    delay,
                    ease: [0.76, 0, 0.24, 1], // The same expo-out used on landonorris.com
                }}
            >
                {children}
            </motion.div>
        </div>
    );
};

export default MaskReveal;
