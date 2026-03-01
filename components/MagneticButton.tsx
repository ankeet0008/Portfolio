import React, { useRef, useState, useCallback } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

interface MagneticButtonProps {
    children: React.ReactNode;
    onClick?: () => void;
    className?: string;
    magneticStrength?: number;
    magneticRadius?: number;
}

const MagneticButton: React.FC<MagneticButtonProps> = ({
    children,
    onClick,
    className = '',
    magneticStrength = 0.35,
    magneticRadius = 150,
}) => {
    const buttonRef = useRef<HTMLDivElement>(null);
    const [isHovered, setIsHovered] = useState(false);

    const x = useMotionValue(0);
    const y = useMotionValue(0);

    // Smooth spring physics for the magnetic pull
    const springConfig = { damping: 15, stiffness: 150, mass: 0.5 };
    const springX = useSpring(x, springConfig);
    const springY = useSpring(y, springConfig);

    // Inner text moves slightly more than the button for a parallax feel
    const textX = useMotionValue(0);
    const textY = useMotionValue(0);
    const springTextX = useSpring(textX, { damping: 12, stiffness: 180, mass: 0.3 });
    const springTextY = useSpring(textY, { damping: 12, stiffness: 180, mass: 0.3 });

    const handleMouseMove = useCallback(
        (e: React.MouseEvent<HTMLDivElement>) => {
            if (!buttonRef.current) return;

            const rect = buttonRef.current.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;

            const distX = e.clientX - centerX;
            const distY = e.clientY - centerY;
            const distance = Math.sqrt(distX * distX + distY * distY);

            if (distance < magneticRadius) {
                const pull = (1 - distance / magneticRadius) * magneticStrength;
                x.set(distX * pull);
                y.set(distY * pull);
                // Inner text moves more for parallax
                textX.set(distX * pull * 1.5);
                textY.set(distY * pull * 1.5);
            }
        },
        [magneticRadius, magneticStrength, x, y, textX, textY]
    );

    const handleMouseLeave = useCallback(() => {
        x.set(0);
        y.set(0);
        textX.set(0);
        textY.set(0);
        setIsHovered(false);
    }, [x, y, textX, textY]);

    const handleMouseEnter = useCallback(() => {
        setIsHovered(true);
    }, []);

    return (
        <motion.div
            ref={buttonRef}
            className="relative inline-block cursor-pointer"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            onMouseEnter={handleMouseEnter}
            onClick={onClick}
            style={{ x: springX, y: springY }}
        >
            {/* Outer glow ring */}
            <motion.div
                className="absolute -inset-[2px] rounded-full opacity-0 blur-sm pointer-events-none"
                style={{
                    background: 'linear-gradient(135deg, rgba(100,180,255,0.6), rgba(160,120,255,0.4), rgba(100,180,255,0.6))',
                }}
                animate={{
                    opacity: isHovered ? 0.7 : 0,
                    scale: isHovered ? 1.02 : 0.95,
                }}
                transition={{ duration: 0.3 }}
            />

            {/* Background fill on hover */}
            <motion.div
                className="absolute inset-0 rounded-full pointer-events-none"
                style={{
                    background: 'linear-gradient(135deg, rgba(100,180,255,0.12), rgba(140,100,255,0.08))',
                }}
                animate={{
                    opacity: isHovered ? 1 : 0,
                }}
                transition={{ duration: 0.3 }}
            />

            {/* Main button */}
            <div
                className={`relative px-8 py-4 rounded-full border transition-colors duration-300 backdrop-blur-sm overflow-hidden ${isHovered
                        ? 'border-white/40 bg-white/[0.06]'
                        : 'border-neutral-700 bg-neutral-900/40'
                    } ${className}`}
            >
                {/* Shimmer sweep on hover */}
                <motion.div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                        background:
                            'linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.08) 45%, rgba(255,255,255,0.15) 50%, rgba(255,255,255,0.08) 55%, transparent 60%)',
                        backgroundSize: '200% 100%',
                    }}
                    animate={{
                        backgroundPosition: isHovered ? ['200% 0', '-200% 0'] : '200% 0',
                    }}
                    transition={{
                        duration: 1.2,
                        ease: 'easeInOut',
                        repeat: isHovered ? Infinity : 0,
                        repeatDelay: 0.8,
                    }}
                />

                {/* Button text with parallax */}
                <motion.div
                    className="relative flex items-center gap-3"
                    style={{ x: springTextX, y: springTextY }}
                >
                    {children}
                </motion.div>
            </div>

            {/* Radial glow beneath on hover */}
            <motion.div
                className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-3/4 h-8 rounded-full blur-xl pointer-events-none"
                style={{
                    background: 'radial-gradient(ellipse, rgba(100,170,255,0.3), transparent 70%)',
                }}
                animate={{
                    opacity: isHovered ? 0.6 : 0,
                    scaleX: isHovered ? 1.1 : 0.8,
                }}
                transition={{ duration: 0.3 }}
            />
        </motion.div>
    );
};

export default MagneticButton;
