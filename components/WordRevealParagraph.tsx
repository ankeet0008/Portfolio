import React from 'react';
import { motion, Variants } from 'framer-motion';

interface WordRevealParagraphProps {
    children: React.ReactNode;
    className?: string;
    staggerDelay?: number;
    delay?: number;
    yOffset?: number;
    duration?: number;
    once?: boolean;
    viewportMargin?: string;
}

/**
 * Wraps each *direct text word* and React element in a reveal animation.
 * Supports mixed content like: "Hello <span>world</span> foo"
 * Each word and each inline element is treated as a separate stagger item.
 */
const WordRevealParagraph: React.FC<WordRevealParagraphProps> = ({
    children,
    className = '',
    staggerDelay = 0.04,
    delay = 0.1,
    yOffset = 40,
    duration = 0.5,
    once = true,
    viewportMargin = '-80px',
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

    const wordVariants: Variants = {
        hidden: {
            y: yOffset,
            opacity: 0,
            filter: 'blur(4px)',
        },
        visible: {
            y: 0,
            opacity: 1,
            filter: 'blur(0px)',
            transition: {
                duration: duration,
                ease: [0.16, 1, 0.3, 1],
            },
        },
    };

    // Flatten children into an array of animatable elements
    const items: React.ReactNode[] = [];

    React.Children.forEach(children, (child) => {
        if (typeof child === 'string') {
            // Split text nodes into individual words
            const words = child.split(/(\s+)/); // Keep whitespace tokens
            words.forEach((word, i) => {
                if (word.trim() === '') {
                    // It's whitespace — just add it as-is (non-animated spacer)
                    if (word.length > 0) {
                        items.push(<span key={`ws-${items.length}`}>{' '}</span>);
                    }
                } else {
                    items.push(
                        <motion.span
                            key={`w-${items.length}`}
                            variants={wordVariants}
                            style={{
                                display: 'inline-block',
                                willChange: 'transform, opacity, filter',
                            }}
                        >
                            {word}
                        </motion.span>
                    );
                }
            });
        } else if (React.isValidElement(child)) {
            // Wrap React elements (like styled <span>) in an animation wrapper
            items.push(
                <motion.span
                    key={`el-${items.length}`}
                    variants={wordVariants}
                    style={{
                        display: 'inline',
                        willChange: 'transform, opacity, filter',
                    }}
                >
                    {child}
                </motion.span>
            );
        }
    });

    return (
        <motion.p
            className={className}
            style={{ overflow: 'hidden' }}
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once, margin: viewportMargin }}
        >
            {items}
        </motion.p>
    );
};

export default WordRevealParagraph;
