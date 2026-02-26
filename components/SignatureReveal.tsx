import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const SignatureReveal: React.FC = () => {
    const containerRef = useRef<HTMLDivElement>(null);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ['start end', 'end start'],
    });

    // Each stroke reveals in a gentle sequence as you scroll
    const s1 = useTransform(scrollYProgress, [0.05, 0.40], [0, 1]); // A + crossbar
    const s2 = useTransform(scrollYProgress, [0.18, 0.52], [0, 1]); // nkit
    const s3 = useTransform(scrollYProgress, [0.32, 0.64], [0, 1]); // N
    const s4 = useTransform(scrollYProgress, [0.44, 0.76], [0, 1]); // aik
    const s5 = useTransform(scrollYProgress, [0.62, 0.88], [0, 1]); // underline

    // Fade the whole section in/out
    const opacity = useTransform(scrollYProgress, [0, 0.06, 0.94, 1], [0, 1, 1, 0]);
    const labelOpacity = useTransform(scrollYProgress, [0.12, 0.32], [0, 1]);

    const strokeColor = '#ffffff';
    const sw = '2'; // stroke-width

    return (
        <section
            ref={containerRef}
            className="relative min-h-[70vh] flex flex-col items-center justify-center overflow-hidden bg-neutral-950 px-6 py-28"
        >
            {/* Subtle horizontal divider lines */}
            <div className="absolute top-0 left-0 w-full h-px bg-neutral-900" />
            <div className="absolute bottom-0 left-0 w-full h-px bg-neutral-900" />

            {/* Top left label */}
            <motion.p
                style={{ opacity: labelOpacity }}
                className="absolute top-10 left-6 md:left-14 text-[9px] uppercase tracking-[0.35em] font-sora text-neutral-600"
            >
                Signature
            </motion.p>

            {/* Bottom right attribution */}
            <motion.div
                style={{ opacity: labelOpacity }}
                className="absolute bottom-10 right-6 md:right-14 text-right"
            >
                <p className="text-[9px] uppercase tracking-[0.35em] font-sora text-neutral-600">Ankit Naik</p>
                <p className="text-[9px] uppercase tracking-[0.25em] font-sora text-neutral-800 mt-1">Creative Developer</p>
            </motion.div>

            {/* Signature SVG */}
            <motion.div style={{ opacity }} className="w-full max-w-4xl mx-auto">
                <svg
                    viewBox="0 0 980 220"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-full h-auto"
                    aria-label="Ankit Naik signature"
                >
                    {/* ════════════════════════════════════════════
              STROKE 1: Capital "A"
              ════════════════════════════════════════════ */}
                    {/* Left leg */}
                    <motion.path
                        d="M 50 185 C 55 155, 80 70, 105 42 C 118 28, 138 28, 155 44"
                        stroke={strokeColor} strokeWidth={sw} strokeLinecap="round" fill="none"
                        style={{ pathLength: s1 }}
                    />
                    {/* Right leg */}
                    <motion.path
                        d="M 155 44 C 172 62, 178 100, 165 140 C 155 168, 138 185, 125 185"
                        stroke={strokeColor} strokeWidth={sw} strokeLinecap="round" fill="none"
                        style={{ pathLength: s1 }}
                    />
                    {/* Crossbar */}
                    <motion.path
                        d="M 68 122 C 95 115, 130 112, 162 115"
                        stroke={strokeColor} strokeWidth={sw} strokeLinecap="round" fill="none"
                        style={{ pathLength: s1 }}
                    />

                    {/* ════════════════════════════════════════════
              STROKE 2: "nkit" — flowing cursive
              ════════════════════════════════════════════ */}
                    {/* Connecting entry from A into 'n' */}
                    <motion.path
                        d="M 125 185 C 142 180, 162 172, 178 158"
                        stroke={strokeColor} strokeWidth={sw} strokeLinecap="round" fill="none"
                        style={{ pathLength: s2 }}
                    />
                    {/* 'n' arch */}
                    <motion.path
                        d="M 178 158 C 185 140, 188 118, 194 138 C 198 155, 198 175, 196 190"
                        stroke={strokeColor} strokeWidth={sw} strokeLinecap="round" fill="none"
                        style={{ pathLength: s2 }}
                    />
                    {/* 'k' tall stem + arms */}
                    <motion.path
                        d="M 196 190 C 210 70, 215 52, 220 54 L 220 192"
                        stroke={strokeColor} strokeWidth={sw} strokeLinecap="round" fill="none"
                        style={{ pathLength: s2 }}
                    />
                    <motion.path
                        d="M 220 130 C 234 112, 248 94, 260 104 C 268 112, 260 140, 278 192"
                        stroke={strokeColor} strokeWidth={sw} strokeLinecap="round" fill="none"
                        style={{ pathLength: s2 }}
                    />
                    {/* 'i' stem + dot */}
                    <motion.path
                        d="M 292 148 L 292 192"
                        stroke={strokeColor} strokeWidth={sw} strokeLinecap="round" fill="none"
                        style={{ pathLength: s2 }}
                    />
                    <motion.path
                        d="M 291 122 C 292 118, 294 114, 295 110"
                        stroke={strokeColor} strokeWidth={sw} strokeLinecap="round" fill="none"
                        style={{ pathLength: s2 }}
                    />
                    {/* 't' tall stem + crossbar */}
                    <motion.path
                        d="M 308 62 C 310 55, 312 52, 314 54 L 314 192"
                        stroke={strokeColor} strokeWidth={sw} strokeLinecap="round" fill="none"
                        style={{ pathLength: s2 }}
                    />
                    <motion.path
                        d="M 300 112 C 310 108, 322 106, 332 108"
                        stroke={strokeColor} strokeWidth={sw} strokeLinecap="round" fill="none"
                        style={{ pathLength: s2 }}
                    />

                    {/* ════════════════════════════════════════════
              STROKE 3: Capital "N"
              (with an elegant gap/space before it)
              ════════════════════════════════════════════ */}
                    {/* Connector from 't' to N */}
                    <motion.path
                        d="M 314 192 C 330 186, 355 180, 378 178"
                        stroke={strokeColor} strokeWidth={sw} strokeLinecap="round" fill="none"
                        style={{ pathLength: s3 }}
                    />
                    {/* N left leg */}
                    <motion.path
                        d="M 378 192 L 378 48"
                        stroke={strokeColor} strokeWidth={sw} strokeLinecap="round" fill="none"
                        style={{ pathLength: s3 }}
                    />
                    {/* N diagonal */}
                    <motion.path
                        d="M 378 48 C 402 88, 422 148, 448 192"
                        stroke={strokeColor} strokeWidth={sw} strokeLinecap="round" fill="none"
                        style={{ pathLength: s3 }}
                    />
                    {/* N right leg */}
                    <motion.path
                        d="M 448 192 L 448 48"
                        stroke={strokeColor} strokeWidth={sw} strokeLinecap="round" fill="none"
                        style={{ pathLength: s3 }}
                    />

                    {/* ════════════════════════════════════════════
              STROKE 4: "aik"
              ════════════════════════════════════════════ */}
                    {/* 'a' — teardrop circle + tail */}
                    <motion.path
                        d="M 468 140 C 468 95, 492 78, 516 88 C 540 98, 548 132, 534 162 C 520 188, 496 192, 478 182 C 462 172, 460 156, 464 144 C 468 128, 484 116, 502 118 C 522 120, 538 136, 540 158 L 540 192"
                        stroke={strokeColor} strokeWidth={sw} strokeLinecap="round" fill="none"
                        style={{ pathLength: s4 }}
                    />
                    {/* 'i' stem + dot */}
                    <motion.path
                        d="M 558 148 L 558 192"
                        stroke={strokeColor} strokeWidth={sw} strokeLinecap="round" fill="none"
                        style={{ pathLength: s4 }}
                    />
                    <motion.path
                        d="M 557 122 C 558 118, 560 114, 561 110"
                        stroke={strokeColor} strokeWidth={sw} strokeLinecap="round" fill="none"
                        style={{ pathLength: s4 }}
                    />
                    {/* 'k' tall stem + arms */}
                    <motion.path
                        d="M 576 58 C 578 52, 580 50, 582 52 L 582 192"
                        stroke={strokeColor} strokeWidth={sw} strokeLinecap="round" fill="none"
                        style={{ pathLength: s4 }}
                    />
                    <motion.path
                        d="M 582 132 C 596 112, 612 94, 624 106 C 632 115, 622 143, 642 192"
                        stroke={strokeColor} strokeWidth={sw} strokeLinecap="round" fill="none"
                        style={{ pathLength: s4 }}
                    />

                    {/* ════════════════════════════════════════════
              STROKE 5: Sweeping underline flourish
              ════════════════════════════════════════════ */}
                    <motion.path
                        d="M 44 210 C 180 222, 380 228, 600 220 C 720 215, 820 208, 920 198"
                        stroke={strokeColor} strokeWidth="1.5" strokeLinecap="round" fill="none"
                        style={{ pathLength: s5, opacity: 0.35 }}
                    />
                </svg>
            </motion.div>
        </section>
    );
};

export default SignatureReveal;
