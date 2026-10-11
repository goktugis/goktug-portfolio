import React, { useRef, useEffect, useState, useCallback } from 'react';
import { ChevronLeft, ChevronRight, Maximize2, ExternalLink } from 'lucide-react';
import type { Project } from '../data/portfolioData';
import { ProjectCardPreview } from './ProjectCardPreview';
import { sound } from '../utils/audio';

interface HorizonStreamViewProps {
  projects: Project[];
  activeProject: Project;
  onSelectProject: (project: Project) => void;
  onExpandProject: (project: Project) => void;
}

export function HorizonStreamView({
  projects,
  activeProject,
  onSelectProject,
  onExpandProject,
}: HorizonStreamViewProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const activeIndex = projects.findIndex((p) => p.id === activeProject.id);

  // Smooth scroll into view when activeProject changes
  useEffect(() => {
    if (!containerRef.current) return;
    const cardEl = containerRef.current.querySelector(`[data-project-id="${activeProject.id}"]`);
    if (cardEl) {
      cardEl.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
    }
  }, [activeProject.id]);

  // Navigate next / prev
  const handlePrev = useCallback(() => {
    if (activeIndex > 0) {
      sound.playTransition();
      onSelectProject(projects[activeIndex - 1]);
    }
  }, [activeIndex, projects, onSelectProject]);

  const handleNext = useCallback(() => {
    if (activeIndex < projects.length - 1) {
      sound.playTransition();
      onSelectProject(projects[activeIndex + 1]);
    }
  }, [activeIndex, projects, onSelectProject]);

  // Wheel listener: user can scroll naturally (vertical or horizontal wheel) to slide through projects!
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    let wheelTimeout: ReturnType<typeof setTimeout> | null = null;
    let accumulatedDelta = 0;

    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      accumulatedDelta += Math.abs(e.deltaY) > Math.abs(e.deltaX) ? e.deltaY : e.deltaX;

      if (wheelTimeout) clearTimeout(wheelTimeout);

      wheelTimeout = setTimeout(() => {
        if (accumulatedDelta > 45) {
          handleNext();
        } else if (accumulatedDelta < -45) {
          handlePrev();
        }
        accumulatedDelta = 0;
      }, 50);
    };

    el.addEventListener('wheel', onWheel, { passive: false });
    return () => {
      el.removeEventListener('wheel', onWheel);
      if (wheelTimeout) clearTimeout(wheelTimeout);
    };
  }, [handleNext, handlePrev]);

  // Mouse Drag to Glide
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    setIsDragging(true);
    setStartX(e.pageX - containerRef.current.offsetLeft);
    setScrollLeft(containerRef.current.scrollLeft);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !containerRef.current) return;
    e.preventDefault();
    const x = e.pageX - containerRef.current.offsetLeft;
    const walk = (x - startX) * 1.5;
    containerRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  return (
    <div className="relative w-full h-full min-h-[calc(100vh-140px)] flex flex-col justify-center overflow-hidden py-8 select-none">
      {/* Background Architectural Track Guideline */}
      <div className="absolute top-1/2 left-0 right-0 h-[1px] -translate-y-1/2 bg-white/[0.05] pointer-events-none z-0" />

      {/* Floating Animated Left / Right Navigation Chevrons */}
      <div className="pointer-events-none absolute inset-x-4 md:inset-x-10 top-1/2 -translate-y-1/2 z-30 flex justify-between">
        <button
          onClick={handlePrev}
          disabled={activeIndex <= 0}
          className="pointer-events-auto p-4 rounded-full bg-[#131418]/90 backdrop-blur-xl border border-white/10 text-white hover:bg-white/15 hover:scale-105 active:scale-95 disabled:opacity-0 disabled:pointer-events-none transition-all shadow-2xl group"
          title="Önceki Proje"
        >
          <ChevronLeft className="w-5 h-5 group-hover:-translate-x-0.5 transition-transform" />
        </button>

        <button
          onClick={handleNext}
          disabled={activeIndex >= projects.length - 1}
          className="pointer-events-auto p-4 rounded-full bg-[#131418]/90 backdrop-blur-xl border border-white/10 text-white hover:bg-white/15 hover:scale-105 active:scale-95 disabled:opacity-0 disabled:pointer-events-none transition-all shadow-2xl group"
          title="Sonraki Proje"
        >
          <ChevronRight className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" />
        </button>
      </div>

      {/* Main Horizontal Runway */}
      <div
        ref={containerRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        className={`relative z-10 w-full overflow-x-auto overflow-y-hidden no-scrollbar flex items-center gap-8 md:gap-16 px-8 md:px-28 py-6 ${
          isDragging ? 'cursor-grabbing' : 'cursor-grab'
        }`}
        style={{ scrollBehavior: isDragging ? 'auto' : 'smooth' }}
      >
        {projects.map((project, idx) => {
          const isActive = project.id === activeProject.id;
          const offset = idx - activeIndex;

          return (
            <div
              key={project.id}
              data-project-id={project.id}
              onClick={() => {
                if (isActive) {
                  sound.playInspect();
                  onExpandProject(project);
                } else {
                  sound.playTransition();
                  onSelectProject(project);
                }
              }}
              onMouseEnter={() => sound.playHover()}
              className={`relative shrink-0 w-[350px] sm:w-[500px] lg:w-[680px] rounded-3xl transition-all duration-700 ease-out transform-gpu cursor-pointer group ${
                isActive
                  ? 'scale-100 opacity-100 z-20 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.85)]'
                  : 'scale-92 opacity-35 hover:opacity-70 hover:scale-95 z-10'
              }`}
              style={{
                transform: `perspective(1000px) rotateY(${offset * -4}deg) scale(${isActive ? 1 : 0.92})`,
              }}
            >
              {/* Card Shell */}
              <div
                className={`relative rounded-3xl border transition-all duration-500 overflow-hidden flex flex-col bg-[#131419] border-white/10 group-hover:border-white/25`}
                style={{
                  borderTopColor: isActive ? project.accentColor : 'rgba(255, 255, 255, 0.1)',
                  borderTopWidth: isActive ? '3px' : '1px',
                }}
              >
                {/* Background Giant Watermark Index */}
                <div className="absolute top-2 right-4 font-syne text-[8rem] sm:text-[10rem] font-black text-white/[0.03] select-none pointer-events-none leading-none">
                  {project.index}
                </div>

                {/* Card Top Label Strip */}
                <div className="px-6 py-4 border-b border-white/[0.06] flex items-center justify-between text-xs font-mono relative z-10">
                  <div className="flex items-center gap-2.5">
                    <span
                      className="w-2 h-2 rounded-full transition-transform group-hover:scale-125"
                      style={{ backgroundColor: project.accentColor }}
                    />
                    <span className="font-bold tracking-wider text-white">
                      [{project.index}] {project.categoryLabel.toUpperCase()}
                    </span>
                  </div>

                  <div className="flex items-center gap-3 text-stone-400">
                    <span>{project.badge}</span>
                    <span>•</span>
                    <span className="font-bold text-white">{project.year}</span>
                  </div>
                </div>

                {/* Hero Visual Area with Animated Hover Matting */}
                <div className="relative h-60 sm:h-72 lg:h-84 overflow-hidden bg-black/60">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src =
                        'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=1200&q=80';
                    }}
                  />

                  {/* Vignette Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#131419] via-[#131419]/25 to-transparent pointer-events-none" />

                  {/* Floating Click-to-Expand Prompt Banner */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/50 backdrop-blur-xs">
                    <div className="px-6 py-3 rounded-full bg-white text-stone-950 font-syne font-bold text-xs tracking-wider flex items-center gap-2.5 shadow-2xl transform translate-y-2 group-hover:translate-y-0 transition-transform">
                      <Maximize2 className="w-4 h-4 text-amber-600" />
                      <span>İNCELE & CANLI SİMÜLASYON</span>
                    </div>
                  </div>
                </div>

                {/* Card Information Body */}
                <div className="p-6 md:p-8 space-y-4 relative z-10 flex-1 flex flex-col justify-between">
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between">
                      <h3 className="font-syne text-2xl md:text-3xl font-extrabold text-white tracking-tight group-hover:text-amber-300 transition-colors">
                        {project.title}
                      </h3>
                      <Maximize2 className="w-4 h-4 text-stone-500 group-hover:text-white transition-colors" />
                    </div>
                    <p className="text-xs md:text-sm text-stone-400 leading-relaxed line-clamp-2">
                      {project.subtitle}
                    </p>
                  </div>

                  {/* Live Mini Preview Widget */}
                  <ProjectCardPreview project={project} />

                  {/* Tech Stack Specs */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {project.techStack.map((tech) => (
                      <span
                        key={tech}
                        className="px-2.5 py-0.5 rounded text-[10px] font-mono bg-white/[0.04] border border-white/[0.08] text-stone-300"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Bottom Prompt Strip */}
                  <div className="pt-2 flex items-center justify-between text-xs font-mono text-stone-400 border-t border-white/[0.06]">
                    <span className="flex items-center gap-1.5 text-amber-400 font-semibold">
                      <span>Detay & Simülasyon için karta tıklayın</span>
                      <span>➔</span>
                    </span>

                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => {
                        e.stopPropagation();
                        sound.playTick();
                      }}
                      className="p-1.5 rounded hover:text-white transition-colors flex items-center gap-1 text-[11px]"
                      title="GitHub Kaynağı"
                    >
                      <span>GitHub</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
