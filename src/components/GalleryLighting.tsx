import { useEffect, useRef } from 'react';
import type { Project } from '../data/portfolioData';

export type GalleryTheme = 'obsidian' | 'linen' | 'aluminum';

interface GalleryLightingProps {
  activeProject: Project;
  theme: GalleryTheme;
}

export function GalleryLighting({ activeProject, theme }: GalleryLightingProps) {
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

      // 1. Gallery Overhead Track Spotlight focused on central stage
      const spotX = width / 2;
      const spotY = height * 0.45;
      const spotlightRadius = Math.max(width, height) * 0.6;

      const trackLight = ctx.createRadialGradient(spotX, spotY * 0.6, 20, spotX, spotY, spotlightRadius);

      if (theme === 'linen') {
        // Warm natural travertine sunlight
        trackLight.addColorStop(0, 'rgba(255, 250, 240, 0.45)');
        trackLight.addColorStop(0.5, 'rgba(240, 235, 225, 0.15)');
        trackLight.addColorStop(1, 'rgba(246, 244, 239, 0)');
      } else if (theme === 'aluminum') {
        // Clean neutral white studio daylight
        trackLight.addColorStop(0, 'rgba(255, 255, 255, 0.12)');
        trackLight.addColorStop(0.6, 'rgba(200, 205, 215, 0.04)');
        trackLight.addColorStop(1, 'rgba(0, 0, 0, 0)');
      } else {
        // Atelier Obsidian: Warm halogen gallery pool
        trackLight.addColorStop(0, 'rgba(255, 236, 214, 0.08)');
        trackLight.addColorStop(0.4, 'rgba(235, 220, 200, 0.03)');
        trackLight.addColorStop(1, 'rgba(14, 15, 18, 0)');
      }

      ctx.fillStyle = trackLight;
      ctx.fillRect(0, 0, width, height);

      // 2. Interactive Visitor Loupe / Ambient Cursor Glow
      const visitorLight = ctx.createRadialGradient(
        mouseRef.current.x,
        mouseRef.current.y,
        0,
        mouseRef.current.x,
        mouseRef.current.y,
        320
      );

      if (theme === 'linen') {
        visitorLight.addColorStop(0, 'rgba(180, 83, 9, 0.04)');
        visitorLight.addColorStop(1, 'rgba(0, 0, 0, 0)');
      } else {
        visitorLight.addColorStop(0, 'rgba(255, 255, 255, 0.035)');
        visitorLight.addColorStop(1, 'rgba(0, 0, 0, 0)');
      }

      ctx.fillStyle = visitorLight;
      ctx.fillRect(0, 0, width, height);

      // 3. Subtle Architectural Floor Registration Marks
      ctx.strokeStyle = theme === 'linen' ? 'rgba(0, 0, 0, 0.08)' : 'rgba(255, 255, 255, 0.06)';
      ctx.lineWidth = 1;

      // Draw thin crosshairs at gallery margins
      const margin = 40;
      const crossSize = 8;
      const corners = [
        [margin, margin],
        [width - margin, margin],
        [margin, height - margin],
        [width - margin, height - margin],
      ];

      corners.forEach(([cx, cy]) => {
        ctx.beginPath();
        ctx.moveTo(cx - crossSize, cy);
        ctx.lineTo(cx + crossSize, cy);
        ctx.moveTo(cx, cy - crossSize);
        ctx.lineTo(cx, cy + crossSize);
        ctx.stroke();
      });

      animationId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationId);
    };
  }, [theme, activeProject]);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none">
      {/* Canvas Layer */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />

      {/* Tactile Paper / Plinth Grain Texture */}
      <div className="absolute inset-0 bg-grain pointer-events-none" />

      {/* Architectural Subtle Ambient Color Accent (Warm & Controlled, not neon) */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] rounded-full blur-[140px] opacity-15 transition-all duration-1000 ease-out pointer-events-none"
        style={{
          backgroundColor: activeProject.accentColor,
        }}
      />
    </div>
  );
}
