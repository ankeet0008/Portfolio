import React from 'react';
import { motion, Variants } from 'framer-motion';

interface SplitTextRevealProps {
    children: string;
    className?: string;
    /** 'char' splits into individual characters, 'word' splits into words */
    splitBy?: 'char' | 'word';
    /** Delay between each child element animating in (seconds) */
    staggerDelay?: number;
    /** Initial delay before the animation starts (seconds) */
    delay?: number;
    /** How far below the text starts before animating up (pixels) */
    yOffset?: number;
    /** Animation duration per element (seconds) */
    duration?: number;
    /** Whether the animation should only play once */
    once?: boolean;
    /** Viewport margin for triggering (e.g., "-100px") */
    viewportMargin?: string;
    /** HTML tag to render as */
    as?: 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span' | 'div';
}

const SplitTextReveal: React.FC<SplitTextRevealProps> = ({
    children,
    className = '',
    splitBy = 'char',
    staggerDelay = 0.03,
    delay = 0,
    yOffset = 60,
    duration = 0.6,
    once = true,
    viewportMargin = '-50px',
    as = 'div',
}) => {
    const containerVariants: Variants = {
        hidden: {},
        visible: {
            transition: {
                staggerChildren: staggerDelay,
                delayChildren: delay,
            },
        },
    };

    const itemVariants: Variants = {
        hidden: {
            y: yOffset,
            opacity: 0,
            rotateX: 45,
        },
        visible: {
            y: 0,
            opacity: 1,
            rotateX: 0,
            transition: {
                duration: duration,
                ease: [0.16, 1, 0.3, 1], // Custom cubic-bezier for a smooth, snappy feel
            },
        },
    };

    const elements = splitBy === 'char'
        ? children.split('')
        : children.split(' ');

    const MotionTag = motion[as] as any;

    return (
        <MotionTag
            className={className}
            style={{
                display: 'flex',
                flexWrap: 'wrap',
                overflow: 'hidden',
                perspective: '600px',
            }}
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once, margin: viewportMargin }}
        >
            {elements.map((element: string, index: number) => (
                <motion.span
                    key={index}
                    variants={itemVariants}
                    style={{
                        display: 'inline-block',
                        willChange: 'transform, opacity',
                        transformOrigin: 'bottom center',
                    }}
                >
                    {/* Preserve spaces: for char mode show the char, for word mode add a space after each word */}
                    {splitBy === 'char'
                        ? (element === ' ' ? '\u00A0' : element)
                        : element}
                    {splitBy === 'word' && index < elements.length - 1 && '\u00A0'}
                </motion.span>
            ))}
        </MotionTag>
    );
};

export default SplitTextReveal;
