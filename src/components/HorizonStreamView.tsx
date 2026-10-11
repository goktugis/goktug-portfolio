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

  // Smooth Lerp Physics state
  const targetScrollRef = useRef(0);
  const currentScrollRef = useRef(0);
  const isDraggingRef = useRef(false);
  const dragStartXRef = useRef(0);
  const dragStartScrollRef = useRef(0);

  // Real-time animation states for parallax & 3D tilt
  const [scrollPos, setScrollPos] = useState(0);
  const [mouseTilt, setMouseTilt] = useState<{ id: string; x: number; y: number } | null>(null);

  const activeIndex = projects.findIndex((p) => p.id === activeProject.id);

  // Scroll to project center with smooth lerp
  const scrollToCardIndex = useCallback(
    (index: number) => {
      const container = containerRef.current;
      if (!container) return;
      const cards = container.querySelectorAll<HTMLElement>('[data-project-id]');
      const targetCard = cards[index];
      if (targetCard) {
        const containerWidth = container.clientWidth;
        const cardLeft = targetCard.offsetLeft;
        const cardWidth = targetCard.clientWidth;
        const targetX = cardLeft - containerWidth / 2 + cardWidth / 2;
        targetScrollRef.current = Math.max(0, Math.min(targetX, container.scrollWidth - containerWidth));
      }
    },
    []
  );

  // Whenever activeProject changes externally (e.g. from dock), smoothly glide to it
  useEffect(() => {
    scrollToCardIndex(activeIndex);
  }, [activeIndex, scrollToCardIndex]);

  // The Master Lerp Animation Loop (Ultra-Fluid Physics)
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let animId: number;

    const loop = () => {
      // Luxurious soft easing factor: 0.065
      const diff = targetScrollRef.current - currentScrollRef.current;
      if (Math.abs(diff) > 0.4) {
        currentScrollRef.current += diff * 0.068;
        container.scrollLeft = currentScrollRef.current;
        setScrollPos(currentScrollRef.current);
      }

      animId = requestAnimationFrame(loop);
    };

    animId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animId);
  }, []);

  // Naturally smooth Mouse Wheel / Trackpad listener with soft inertia dampening
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const onWheel = (e: WheelEvent) => {
      e.preventDefault();

      // Soft dampening delta multiplier for luxury glide
      const rawDelta = Math.abs(e.deltaY) > Math.abs(e.deltaX) ? e.deltaY : e.deltaX;
      const delta = rawDelta * 1.05;

      const maxScroll = el.scrollWidth - el.clientWidth;
      targetScrollRef.current = Math.max(0, Math.min(maxScroll, targetScrollRef.current + delta));

      // Determine the closest card to center and notify parent softly
      const containerCenter = targetScrollRef.current + el.clientWidth / 2;
      const cards = el.querySelectorAll<HTMLElement>('[data-project-id]');
      let closestIdx = 0;
      let minDistance = Infinity;

      cards.forEach((card, idx) => {
        const cardCenter = card.offsetLeft + card.clientWidth / 2;
        const dist = Math.abs(cardCenter - containerCenter);
        if (dist < minDistance) {
          minDistance = dist;
          closestIdx = idx;
        }
      });

      if (closestIdx !== activeIndex && projects[closestIdx]) {
        sound.playTransition();
        onSelectProject(projects[closestIdx]);
      }
    };

    el.addEventListener('wheel', onWheel, { passive: false });
    return () => el.removeEventListener('wheel', onWheel);
  }, [activeIndex, projects, onSelectProject]);

  // Drag to glide with smooth momentum
  const handleMouseDown = (e: React.MouseEvent) => {
    const el = containerRef.current;
    if (!el) return;
    isDraggingRef.current = true;
    dragStartXRef.current = e.pageX;
    dragStartScrollRef.current = targetScrollRef.current;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDraggingRef.current || !containerRef.current) return;
    e.preventDefault();
    const walk = (e.pageX - dragStartXRef.current) * 1.6;
    const maxScroll = containerRef.current.scrollWidth - containerRef.current.clientWidth;
    targetScrollRef.current = Math.max(0, Math.min(maxScroll, dragStartScrollRef.current - walk));
  };

  const handleMouseUp = () => {
    isDraggingRef.current = false;
  };

  const handlePrev = () => {
    if (activeIndex > 0) {
      sound.playTransition();
      onSelectProject(projects[activeIndex - 1]);
    }
  };

  const handleNext = () => {
    if (activeIndex < projects.length - 1) {
      sound.playTransition();
      onSelectProject(projects[activeIndex + 1]);
    }
  };

  return (
    <div className="relative w-full h-full min-h-[calc(100vh-140px)] flex flex-col justify-center overflow-hidden py-10 select-none">
      {/* Background Architectural Ambient Track Line with Subtle Glow */}
      <div className="absolute top-1/2 left-0 right-0 h-[1px] -translate-y-1/2 pointer-events-none z-0">
        <div className="w-full h-full bg-gradient-to-r from-transparent via-amber-400/20 to-transparent shadow-[0_0_15px_rgba(245,197,110,0.15)]" />
      </div>

      {/* Floating Animated Left / Right Navigation Chevrons */}
      <div className="pointer-events-none absolute inset-x-4 md:inset-x-12 top-1/2 -translate-y-1/2 z-30 flex justify-between">
        <button
          onClick={handlePrev}
          disabled={activeIndex <= 0}
          className="pointer-events-auto p-4 md:p-5 rounded-full bg-[#13141a]/85 backdrop-blur-2xl border border-white/10 text-amber-200 hover:text-white hover:bg-white/10 hover:scale-108 active:scale-95 disabled:opacity-0 disabled:pointer-events-none transition-all duration-500 shadow-[0_15px_35px_rgba(0,0,0,0.8)] group"
          title="Önceki Eser"
        >
          <ChevronLeft className="w-6 h-6 group-hover:-translate-x-1 transition-transform duration-300" />
        </button>

        <button
          onClick={handleNext}
          disabled={activeIndex >= projects.length - 1}
          className="pointer-events-auto p-4 md:p-5 rounded-full bg-[#13141a]/85 backdrop-blur-2xl border border-white/10 text-amber-200 hover:text-white hover:bg-white/10 hover:scale-108 active:scale-95 disabled:opacity-0 disabled:pointer-events-none transition-all duration-500 shadow-[0_15px_35px_rgba(0,0,0,0.8)] group"
          title="Sonraki Eser"
        >
          <ChevronRight className="w-6 h-6 group-hover:translate-x-1 transition-transform duration-300" />
        </button>
      </div>

      {/* Main Horizontal Runway Track */}
      <div
        ref={containerRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        className="relative z-10 w-full overflow-x-hidden overflow-y-hidden no-scrollbar flex items-center gap-10 md:gap-20 px-8 md:px-32 py-10 cursor-grab active:cursor-grabbing"
      >
        {projects.map((project, idx) => {
          const isActive = project.id === activeProject.id;
          const tilt = mouseTilt?.id === project.id ? mouseTilt : { x: 0, y: 0 };

          // Real-time Optical Parallax & Scaling calculation
          const container = containerRef.current;
          let parallaxOffset = 0;
          let distanceProgress = 0;

          if (container) {
            const cardEstimatedLeft = idx * 720;
            const viewportCenter = scrollPos + container.clientWidth / 2;
            const cardCenter = cardEstimatedLeft + 340;
            const dist = cardCenter - viewportCenter;
            parallaxOffset = Math.max(-50, Math.min(50, dist * -0.08));
            distanceProgress = Math.min(1, Math.abs(dist) / (container.clientWidth * 0.7));
          }

          const dynamicScale = isActive ? 1 : Math.max(0.86, 0.98 - distanceProgress * 0.12);
          const dynamicOpacity = isActive ? 1 : Math.max(0.3, 0.85 - distanceProgress * 0.55);

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
              onMouseMove={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                const x = ((e.clientY - rect.top) / rect.height - 0.5) * -10;
                const y = ((e.clientX - rect.left) / rect.width - 0.5) * 10;
                setMouseTilt({ id: project.id, x, y });
              }}
              onMouseLeave={() => setMouseTilt(null)}
              className="relative shrink-0 w-[350px] sm:w-[520px] lg:w-[720px] rounded-3xl transition-all duration-700 ease-out transform-gpu cursor-pointer group"
              style={{
                transform: `perspective(1200px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) scale(${dynamicScale})`,
                opacity: dynamicOpacity,
              }}
            >
              {/* Ambient Breathing Glow behind Active Card */}
              {isActive && (
                <div
                  className="absolute -inset-4 rounded-3xl opacity-30 blur-2xl transition-all duration-1000 pointer-events-none animate-pulse"
                  style={{
                    backgroundColor: project.accentColor,
                    boxShadow: `0 0 80px 10px ${project.accentColor}35`,
                  }}
                />
              )}

              {/* Card Body Container */}
              <div
                className={`relative rounded-3xl border transition-all duration-700 overflow-hidden flex flex-col bg-[#111319]/90 backdrop-blur-2xl shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9)] ${
                  isActive
                    ? 'border-amber-400/40 shadow-[0_30px_90px_-20px_rgba(245,197,110,0.15)] ring-1 ring-amber-400/20'
                    : 'border-white/10 group-hover:border-white/25'
                }`}
              >
                {/* Background Giant Watermark Index */}
                <div className="absolute top-2 right-4 font-syne text-[8rem] sm:text-[11rem] font-black text-white/[0.03] select-none pointer-events-none leading-none">
                  {project.index}
                </div>

                {/* Card Top Label Strip */}
                <div className="px-6 md:px-8 py-4 border-b border-white/[0.07] flex items-center justify-between text-xs font-mono relative z-10">
                  <div className="flex items-center gap-3">
                    <span
                      className="w-2.5 h-2.5 rounded-full transition-transform duration-500 group-hover:scale-130 shadow-xs"
                      style={{
                        backgroundColor: project.accentColor,
                        boxShadow: `0 0 10px ${project.accentColor}`,
                      }}
                    />
                    <span className="font-bold tracking-wider text-amber-200">
                      FOLIO [{project.index}] // {project.categoryLabel.toUpperCase()}
                    </span>
                  </div>

                  <div className="flex items-center gap-3 text-stone-400">
                    <span className="px-2 py-0.5 rounded bg-white/[0.04] border border-white/[0.06] text-[11px]">
                      {project.badge}
                    </span>
                    <span>•</span>
                    <span className="font-bold text-white">{project.year}</span>
                  </div>
                </div>

                {/* Hero Visual Area with Optical Parallax */}
                <div className="relative h-64 sm:h-76 lg:h-88 overflow-hidden bg-black/60">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover object-top transition-transform duration-1000 ease-out group-hover:scale-106"
                    style={{
                      transform: `translateX(${parallaxOffset}px) scale(1.04)`,
                    }}
                    onError={(e) => {
                      (e.target as HTMLImageElement).src =
                        'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=1200&q=80';
                    }}
                  />

                  {/* Gentle Gradient Vignette */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#111319] via-[#111319]/25 to-transparent pointer-events-none" />

                  {/* Floating Click-to-Expand Prompt Banner on Hover */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-black/45 backdrop-blur-xs">
                    <div className="px-7 py-3.5 rounded-full bg-gradient-to-r from-amber-200 to-amber-100 text-stone-950 font-syne font-extrabold text-xs tracking-wider flex items-center gap-2.5 shadow-[0_15px_40px_rgba(0,0,0,0.8)] transform translate-y-3 group-hover:translate-y-0 transition-transform duration-500">
                      <Maximize2 className="w-4 h-4 text-amber-800" />
                      <span>ESERİ GENİŞLET & CANLI SİMÜLASYON</span>
                    </div>
                  </div>
                </div>

                {/* Card Information Body */}
                <div className="p-6 md:p-8 space-y-4 relative z-10 flex-1 flex flex-col justify-between">
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between">
                      <h3 className="font-syne text-2xl md:text-3xl font-extrabold text-white tracking-tight group-hover:text-amber-200 transition-colors duration-300">
                        {project.title}
                      </h3>
                      <Maximize2 className="w-4 h-4 text-stone-500 group-hover:text-amber-300 transition-colors duration-300" />
                    </div>
                    <p className="font-editorial-serif italic text-sm md:text-base text-stone-300 leading-relaxed line-clamp-2">
                      "{project.subtitle}"
                    </p>
                  </div>

                  {/* Live Mini Preview Widget */}
                  <ProjectCardPreview project={project} />

                  {/* Tech Stack Specs */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {project.techStack.map((tech) => (
                      <span
                        key={tech}
                        className="px-2.5 py-1 rounded-lg text-[10px] font-mono bg-white/[0.04] border border-white/[0.08] text-stone-300"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Bottom Prompt Bar */}
                  <div className="pt-3 flex items-center justify-between text-xs font-mono text-stone-400 border-t border-white/[0.06]">
                    <span className="flex items-center gap-2 text-amber-300 font-semibold tracking-wide">
                      <span>Detay & canlı simülasyon için tıklayın</span>
                      <span className="group-hover:translate-x-1 transition-transform duration-300">➔</span>
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
                      title="GitHub Deposu"
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
