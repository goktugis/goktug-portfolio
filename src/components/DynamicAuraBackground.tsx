import { useEffect, useRef } from 'react';
import type { Project } from '../data/portfolioData';

interface DynamicAuraBackgroundProps {
  activeProject: Project;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  alpha: number;
  color: string;
}

export function DynamicAuraBackground({ activeProject }: DynamicAuraBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const mouseRef = useRef({ x: window.innerWidth / 2, y: window.innerHeight / 2 });
  const activeColorRef = useRef(activeProject.accentColor);

  useEffect(() => {
    activeColorRef.current = activeProject.accentColor;
  }, [activeProject.accentColor]);

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

    // Initialize particles
    const particleCount = 45;
    const particles: Particle[] = [];

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        size: Math.random() * 2 + 1,
        alpha: Math.random() * 0.6 + 0.2,
        color: activeColorRef.current,
      });
    }

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Render cosmic background aura
      const grad = ctx.createRadialGradient(
        mouseRef.current.x * 0.3 + width * 0.35,
        mouseRef.current.y * 0.3 + height * 0.35,
        50,
        width / 2,
        height / 2,
        Math.max(width, height) * 0.8
      );

      grad.addColorStop(0, `${activeColorRef.current}18`);
      grad.addColorStop(0.4, `${activeColorRef.current}08`);
      grad.addColorStop(1, '#05070c00');

      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, width, height);

      // Draw subtle interconnected constellation web
      ctx.lineWidth = 0.5;
      for (let i = 0; i < particles.length; i++) {
        const p1 = particles[i];
        p1.x += p1.vx;
        p1.y += p1.vy;

        if (p1.x < 0) p1.x = width;
        if (p1.x > width) p1.x = 0;
        if (p1.y < 0) p1.y = height;
        if (p1.y > height) p1.y = 0;

        // Draw particle
        ctx.beginPath();
        ctx.arc(p1.x, p1.y, p1.size, 0, Math.PI * 2);
        ctx.fillStyle = `${activeColorRef.current}${Math.round(p1.alpha * 255).toString(16).padStart(2, '0')}`;
        ctx.fill();

        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 130) {
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            const edgeAlpha = (1 - dist / 130) * 0.12;
            ctx.strokeStyle = `${activeColorRef.current}${Math.round(edgeAlpha * 255).toString(16).padStart(2, '0')}`;
            ctx.stroke();
          }
        }
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
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Dynamic Ambient Blur Spotlights */}
      <div
        className="absolute top-1/4 left-1/4 w-[650px] h-[650px] rounded-full blur-[140px] opacity-25 transition-all duration-1000 ease-out pointer-events-none"
        style={{
          backgroundColor: activeProject.accentColor,
          transform: 'translate(-50%, -50%)',
        }}
      />
      <div
        className="absolute bottom-1/4 right-1/4 w-[550px] h-[550px] rounded-full blur-[160px] opacity-20 transition-all duration-1000 ease-out pointer-events-none"
        style={{
          backgroundColor: activeProject.accentColor,
          transform: 'translate(50%, 50%)',
        }}
      />

      {/* Cyber Grid Layer */}
      <div className="absolute inset-0 bg-cyber-grid opacity-35" />

      {/* Canvas Elements */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
    </div>
  );
}
