import { useEffect, useRef } from 'react';
import Lenis from 'lenis';

/**
 * useLenis — Sets up Lenis smooth scroll globally.
 * Call this once at the top level of your app.
 * Returns the Lenis instance in case you need to pause/resume it.
 */
export function useLenis() {
    const lenisRef = useRef<Lenis | null>(null);

    useEffect(() => {
        const lenis = new Lenis({
            duration: 1.2,           // How long the inertia lasts (in seconds). 1.2 = premium feel
            easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Expo-out easing
            smoothWheel: true,        // Smooth mouse wheel
            touchMultiplier: 1.5,    // Touch sensitivity on mobile
        });

        lenisRef.current = lenis;

        // Lenis needs a RAF loop to run its animation
        let animFrameId: number;

        function raf(time: number) {
            lenis.raf(time);
            animFrameId = requestAnimationFrame(raf);
        }

        animFrameId = requestAnimationFrame(raf);

        return () => {
            cancelAnimationFrame(animFrameId);
            lenis.destroy();
        };
    }, []);

    return lenisRef;
}
