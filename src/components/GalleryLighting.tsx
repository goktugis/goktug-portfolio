import { useEffect, useRef } from 'react';
import type { Project } from '../data/portfolioData';

export type GalleryTheme = 'obsidian' | 'linen' | 'aluminum';

interface GalleryLightingProps {
  activeProject: Project;
}

export function GalleryLighting({ activeProject }: GalleryLightingProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const mouseRef = useRef({ x: window.innerWidth / 2, y: window.innerHeight / 2 });

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
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // 1. Subtle warm overhead gallery track spotlight
      const spotX = width / 2;
      const spotY = height * 0.45;
      const trackLight = ctx.createRadialGradient(spotX, spotY * 0.5, 30, spotX, spotY, Math.max(width, height) * 0.65);
      trackLight.addColorStop(0, 'rgba(255, 235, 210, 0.055)');
      trackLight.addColorStop(0.5, 'rgba(235, 220, 200, 0.02)');
      trackLight.addColorStop(1, 'rgba(11, 12, 15, 0)');

      ctx.fillStyle = trackLight;
      ctx.fillRect(0, 0, width, height);

      // 2. Interactive torch light following cursor
      const cursorLight = ctx.createRadialGradient(
        mouseRef.current.x,
        mouseRef.current.y,
        0,
        mouseRef.current.x,
        mouseRef.current.y,
        280
      );
      cursorLight.addColorStop(0, 'rgba(255, 255, 255, 0.025)');
      cursorLight.addColorStop(1, 'rgba(0, 0, 0, 0)');

      ctx.fillStyle = cursorLight;
      ctx.fillRect(0, 0, width, height);

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
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none bg-[#0b0c0f]">
      {/* Canvas Layer */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />

      {/* Tactile Grain Texture */}
      <div className="absolute inset-0 bg-grain opacity-60 pointer-events-none" />

      {/* Controlled Soft Amber Ambient Glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[550px] rounded-full blur-[160px] opacity-10 transition-colors duration-1000 ease-out pointer-events-none"
        style={{
          backgroundColor: activeProject.accentColor,
        }}
      />
    </div>
  );
}
