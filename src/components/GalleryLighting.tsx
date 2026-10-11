import { useEffect, useRef } from 'react';
import type { Project } from '../data/portfolioData';

export type GalleryTheme = 'obsidian' | 'linen' | 'aluminum';

interface GalleryLightingProps {
  activeProject: Project;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  alpha: number;
}

export function GalleryLighting({ activeProject }: GalleryLightingProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const mouseRef = useRef({ x: window.innerWidth / 2, y: window.innerHeight / 2 });
  const targetMouseRef = useRef({ x: window.innerWidth / 2, y: window.innerHeight / 2 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    const handleMouseMove = (e: MouseEvent) => {
      targetMouseRef.current = { x: e.clientX, y: e.clientY };
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);

    // Subtle drifting champagne ambient embers
    const particles: Particle[] = [];
    const particleCount = 28;

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.25,
        vy: -0.15 - Math.random() * 0.25, // slowly float upwards
        radius: Math.random() * 1.6 + 0.6,
        alpha: Math.random() * 0.5 + 0.15,
      });
    }

    let time = 0;

    const render = () => {
      time += 0.008;

      // Smooth mouse lerp
      mouseRef.current.x += (targetMouseRef.current.x - mouseRef.current.x) * 0.05;
      mouseRef.current.y += (targetMouseRef.current.y - mouseRef.current.y) * 0.05;

      ctx.clearRect(0, 0, width, height);

      // 1. Deep Velvet Base
      ctx.fillStyle = '#0a0b0e';
      ctx.fillRect(0, 0, width, height);

      // 2. Breathing Warm Champagne Spotlight over central stage
      const spotX = width / 2 + Math.sin(time * 0.5) * 40;
      const spotY = height * 0.46 + Math.cos(time * 0.4) * 20;
      const radius = Math.max(width, height) * 0.7;

      const trackLight = ctx.createRadialGradient(spotX, spotY * 0.6, 20, spotX, spotY, radius);
      trackLight.addColorStop(0, 'rgba(235, 198, 134, 0.075)'); // Champagne gold
      trackLight.addColorStop(0.35, 'rgba(200, 160, 110, 0.03)');
      trackLight.addColorStop(0.7, 'rgba(18, 20, 26, 0.01)');
      trackLight.addColorStop(1, 'rgba(10, 11, 14, 0)');

      ctx.fillStyle = trackLight;
      ctx.fillRect(0, 0, width, height);

      // 3. Fluid Interactive Cursor Glow
      const cursorGlow = ctx.createRadialGradient(
        mouseRef.current.x,
        mouseRef.current.y,
        0,
        mouseRef.current.x,
        mouseRef.current.y,
        340
      );
      cursorGlow.addColorStop(0, 'rgba(245, 215, 160, 0.04)');
      cursorGlow.addColorStop(1, 'rgba(0, 0, 0, 0)');

      ctx.fillStyle = cursorGlow;
      ctx.fillRect(0, 0, width, height);

      // 4. Floating Warm Micro-Embers
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx + Math.sin(time + p.y * 0.02) * 0.15;
        p.y += p.vy;

        if (p.y < 0) {
          p.y = height + 10;
          p.x = Math.random() * width;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(245, 210, 150, ${p.alpha * 0.7})`;
        ctx.shadowColor = 'rgba(235, 190, 120, 0.4)';
        ctx.shadowBlur = 6;
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      animationId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none bg-[#0a0b0e]">
      {/* Canvas Layer */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />

      {/* Tactile Fine Paper / Velvet Grain Texture */}
      <div className="absolute inset-0 bg-grain opacity-55 pointer-events-none" />

      {/* Slower, Breathing Dynamic Ambient Project Aura (1200ms transition) */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] h-[600px] rounded-full blur-[180px] opacity-15 transition-all duration-1200 ease-out pointer-events-none"
        style={{
          backgroundColor: activeProject.accentColor,
        }}
      />
    </div>
  );
}
