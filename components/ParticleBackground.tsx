import React, { useRef, useEffect, useCallback } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  baseVx: number;
  baseVy: number;
  size: number;
  opacity: number;
  baseOpacity: number;
  pulseSpeed: number;
  pulseOffset: number;
}

const ParticleBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -9999, y: -9999, active: false });
  const particlesRef = useRef<Particle[]>([]);
  const animationRef = useRef<number>(0);
  const dimensionsRef = useRef({ width: 0, height: 0 });

  const PARTICLE_COUNT = 120;
  const CONNECTION_DISTANCE = 130;
  const MOUSE_RADIUS = 180;
  const MOUSE_FORCE = 0.8;

  const createParticle = useCallback((width: number, height: number): Particle => {
    const angle = Math.random() * Math.PI * 2;
    const speed = 0.15 + Math.random() * 0.35;
    const vx = Math.cos(angle) * speed;
    const vy = Math.sin(angle) * speed;
    return {
      x: Math.random() * width,
      y: Math.random() * height,
      vx,
      vy,
      baseVx: vx,
      baseVy: vy,
      size: 1 + Math.random() * 2,
      opacity: 0.08 + Math.random() * 0.35,
      baseOpacity: 0.08 + Math.random() * 0.35,
      pulseSpeed: 0.005 + Math.random() * 0.015,
      pulseOffset: Math.random() * Math.PI * 2,
    };
  }, []);

  const initParticles = useCallback((width: number, height: number) => {
    const particles: Particle[] = [];
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      particles.push(createParticle(width, height));
    }
    particlesRef.current = particles;
  }, [createParticle]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    const handleResize = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
      dimensionsRef.current = { width: rect.width, height: rect.height };

      if (particlesRef.current.length === 0) {
        initParticles(rect.width, rect.height);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
        active: true,
      };
    };

    const handleMouseLeave = () => {
      mouseRef.current.active = false;
    };

    // Listen on the parent section (the hero) for mouse events
    const parentEl = canvas.parentElement;
    if (parentEl) {
      parentEl.addEventListener('mousemove', handleMouseMove);
      parentEl.addEventListener('mouseleave', handleMouseLeave);
    }

    let time = 0;

    const animate = () => {
      const { width, height } = dimensionsRef.current;
      ctx.clearRect(0, 0, width, height);
      const particles = particlesRef.current;
      const mouse = mouseRef.current;
      time++;

      // Update particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Pulse opacity
        p.opacity = p.baseOpacity + Math.sin(time * p.pulseSpeed + p.pulseOffset) * 0.08;

        // Mouse interaction
        if (mouse.active) {
          const dx = p.x - mouse.x;
          const dy = p.y - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < MOUSE_RADIUS) {
            const force = (1 - dist / MOUSE_RADIUS) * MOUSE_FORCE;
            const angle = Math.atan2(dy, dx);
            p.vx += Math.cos(angle) * force;
            p.vy += Math.sin(angle) * force;

            // Boost opacity near cursor
            p.opacity = Math.min(0.8, p.opacity + (1 - dist / MOUSE_RADIUS) * 0.3);
          }
        }

        // Friction / damping to smooth out velocity
        p.vx += (p.baseVx - p.vx) * 0.02;
        p.vy += (p.baseVy - p.vy) * 0.02;

        // Move
        p.x += p.vx;
        p.y += p.vy;

        // Wrap around edges with padding
        if (p.x < -10) p.x = width + 10;
        if (p.x > width + 10) p.x = -10;
        if (p.y < -10) p.y = height + 10;
        if (p.y > height + 10) p.y = -10;
      }

      // Draw connections
      ctx.lineWidth = 0.5;
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < CONNECTION_DISTANCE) {
            const alpha = (1 - dist / CONNECTION_DISTANCE) * 0.15;

            // Check if near mouse for highlight effect
            let lineAlpha = alpha;
            if (mouse.active) {
              const midX = (particles[i].x + particles[j].x) / 2;
              const midY = (particles[i].y + particles[j].y) / 2;
              const mouseDist = Math.sqrt(
                (midX - mouse.x) ** 2 + (midY - mouse.y) ** 2
              );
              if (mouseDist < MOUSE_RADIUS * 1.2) {
                const boost = (1 - mouseDist / (MOUSE_RADIUS * 1.2)) * 0.25;
                lineAlpha = Math.min(0.5, alpha + boost);
              }
            }

            // Subtle gradient lines: white with a hint of cyan
            const gradient = ctx.createLinearGradient(
              particles[i].x, particles[i].y,
              particles[j].x, particles[j].y
            );
            gradient.addColorStop(0, `rgba(200, 220, 255, ${lineAlpha})`);
            gradient.addColorStop(0.5, `rgba(140, 200, 255, ${lineAlpha * 0.8})`);
            gradient.addColorStop(1, `rgba(200, 220, 255, ${lineAlpha})`);

            ctx.beginPath();
            ctx.strokeStyle = gradient;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      // Draw particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Glow effect for larger particles
        if (p.size > 1.5) {
          const glowGradient = ctx.createRadialGradient(
            p.x, p.y, 0,
            p.x, p.y, p.size * 4
          );
          glowGradient.addColorStop(0, `rgba(180, 210, 255, ${p.opacity * 0.3})`);
          glowGradient.addColorStop(1, 'rgba(180, 210, 255, 0)');
          ctx.beginPath();
          ctx.fillStyle = glowGradient;
          ctx.arc(p.x, p.y, p.size * 4, 0, Math.PI * 2);
          ctx.fill();
        }

        // Core particle dot
        ctx.beginPath();
        ctx.fillStyle = `rgba(220, 230, 255, ${p.opacity})`;
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      }

      // Draw mouse glow aura
      if (mouse.active) {
        const mouseGlow = ctx.createRadialGradient(
          mouse.x, mouse.y, 0,
          mouse.x, mouse.y, MOUSE_RADIUS
        );
        mouseGlow.addColorStop(0, 'rgba(100, 180, 255, 0.04)');
        mouseGlow.addColorStop(0.5, 'rgba(100, 160, 255, 0.015)');
        mouseGlow.addColorStop(1, 'rgba(100, 160, 255, 0)');
        ctx.beginPath();
        ctx.fillStyle = mouseGlow;
        ctx.arc(mouse.x, mouse.y, MOUSE_RADIUS, 0, Math.PI * 2);
        ctx.fill();
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationRef.current);
      window.removeEventListener('resize', handleResize);
      if (parentEl) {
        parentEl.removeEventListener('mousemove', handleMouseMove);
        parentEl.removeEventListener('mouseleave', handleMouseLeave);
      }
    };
  }, [initParticles]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-[1]"
      style={{ opacity: 0.85 }}
    />
  );
};

export default ParticleBackground;
