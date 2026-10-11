import React, { useRef, useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight, ExternalLink, Sparkles, ArrowRight } from 'lucide-react';
import type { Project } from '../data/portfolioData';
import { ProjectCardPreview } from './ProjectCardPreview';
import { sound } from '../utils/audio';

interface HorizonStreamViewProps {
  projects: Project[];
  activeProject: Project;
  onSelectProject: (project: Project) => void;
  onInspectProject: (project: Project) => void;
}

export function HorizonStreamView({
  projects,
  activeProject,
  onSelectProject,
  onInspectProject,
}: HorizonStreamViewProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  // Mouse tilt states for cards
  const [mouseTilt, setMouseTilt] = useState<{ id: string; x: number; y: number } | null>(null);

  // Scroll active project into view when activeProject changes
  useEffect(() => {
    if (!containerRef.current) return;
    const cardEl = containerRef.current.querySelector(`[data-project-id="${activeProject.id}"]`);
    if (cardEl) {
      cardEl.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
    }
  }, [activeProject.id]);

  // Handle horizontal mouse drag
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
    const walk = (x - startX) * 1.6;
    containerRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Convert vertical wheel to horizontal wheel smoothly
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const onWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
        e.preventDefault();
        el.scrollLeft += e.deltaY * 1.2;
      }
    };

    el.addEventListener('wheel', onWheel, { passive: false });
    return () => el.removeEventListener('wheel', onWheel);
  }, []);

  const handlePrev = () => {
    sound.playTransition();
    const currIdx = projects.findIndex((p) => p.id === activeProject.id);
    if (currIdx > 0) {
      onSelectProject(projects[currIdx - 1]);
    }
  };

  const handleNext = () => {
    sound.playTransition();
    const currIdx = projects.findIndex((p) => p.id === activeProject.id);
    if (currIdx < projects.length - 1) {
      onSelectProject(projects[currIdx + 1]);
    }
  };

  const activeIndex = projects.findIndex((p) => p.id === activeProject.id);

  return (
    <div className="relative w-full h-full min-h-[calc(100vh-140px)] flex flex-col justify-center overflow-hidden py-14">
      {/* Background Continuous Flow Conduit (Glow Wire) */}
      <div className="absolute top-1/2 left-0 right-0 h-[2px] -translate-y-1/2 pointer-events-none z-0">
        <div
          className="w-full h-full opacity-30 transition-all duration-1000"
          style={{
            background: `linear-gradient(90deg, transparent 0%, ${activeProject.accentColor} 50%, transparent 100%)`,
            boxShadow: `0 0 20px 2px ${activeProject.accentColor}`,
          }}
        />
      </div>

      {/* Floating Left / Right Nav Chevrons */}
      <div className="pointer-events-none absolute inset-x-4 md:inset-x-8 top-1/2 -translate-y-1/2 z-30 flex justify-between">
        <button
          onClick={handlePrev}
          disabled={activeIndex <= 0}
          className="pointer-events-auto p-3.5 md:p-4 rounded-2xl bg-black/60 backdrop-blur-xl border border-white/10 text-white hover:bg-white/15 disabled:opacity-20 disabled:pointer-events-none transition-all shadow-xl group"
          title="Önceki Proje (←)"
        >
          <ChevronLeft className="w-5 h-5 group-hover:-translate-x-0.5 transition-transform" />
        </button>

        <button
          onClick={handleNext}
          disabled={activeIndex >= projects.length - 1}
          className="pointer-events-auto p-3.5 md:p-4 rounded-2xl bg-black/60 backdrop-blur-xl border border-white/10 text-white hover:bg-white/15 disabled:opacity-20 disabled:pointer-events-none transition-all shadow-xl group"
          title="Sonraki Proje (→)"
        >
          <ChevronRight className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" />
        </button>
      </div>

      {/* Horizontal Runway Track */}
      <div
        ref={containerRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        className={`relative z-10 w-full overflow-x-auto overflow-y-hidden no-scrollbar flex items-center gap-8 md:gap-14 px-8 md:px-24 py-10 select-none ${
          isDragging ? 'cursor-grabbing' : 'cursor-grab'
        }`}
        style={{ scrollBehavior: isDragging ? 'auto' : 'smooth' }}
      >
        {projects.map((project) => {
          const isActive = project.id === activeProject.id;
          const tilt = mouseTilt?.id === project.id ? mouseTilt : { x: 0, y: 0 };

          return (
            <div
              key={project.id}
              data-project-id={project.id}
              onClick={() => {
                if (!isActive) {
                  sound.playTransition();
                  onSelectProject(project);
                }
              }}
              onMouseEnter={() => sound.playHover()}
              onMouseMove={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                const x = ((e.clientY - rect.top) / rect.height - 0.5) * -12;
                const y = ((e.clientX - rect.left) / rect.width - 0.5) * 12;
                setMouseTilt({ id: project.id, x, y });
              }}
              onMouseLeave={() => setMouseTilt(null)}
              className={`relative shrink-0 w-[340px] sm:w-[480px] lg:w-[680px] rounded-3xl transition-all duration-500 transform-gpu group ${
                isActive
                  ? 'scale-100 opacity-100 z-20'
                  : 'scale-95 opacity-60 hover:opacity-90 hover:scale-97 z-10'
              }`}
              style={{
                transform: `perspective(1200px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) scale(${
                  isActive ? 1 : 0.95
                })`,
              }}
            >
              {/* Outer Glow Halo */}
              <div
                className="absolute -inset-1 rounded-3xl opacity-0 group-hover:opacity-75 transition-opacity duration-700 blur-xl pointer-events-none"
                style={{
                  backgroundColor: project.accentColor,
                  opacity: isActive ? 0.35 : 0.1,
                }}
              />

              {/* Card Container */}
              <div
                className="relative rounded-3xl bg-[#0b0f1c]/85 backdrop-blur-2xl border transition-all duration-500 overflow-hidden shadow-2xl flex flex-col"
                style={{
                  borderColor: isActive ? `${project.accentColor}80` : 'rgba(255, 255, 255, 0.08)',
                  boxShadow: isActive
                    ? `0 20px 50px -10px ${project.accentColor}30, 0 0 0 1px ${project.accentColor}40`
                    : '0 15px 35px rgba(0,0,0,0.5)',
                }}
              >
                {/* Background Giant Watermark Index */}
                <div className="absolute -top-6 -right-4 font-mono text-[9rem] md:text-[11rem] font-black text-white/[0.03] select-none pointer-events-none leading-none">
                  {project.index}
                </div>

                {/* Card Header Strip */}
                <div className="p-5 md:p-6 pb-3 flex items-center justify-between border-b border-white/[0.06] relative z-10">
                  <div className="flex items-center gap-3">
                    <span
                      className="text-xs font-mono font-bold px-2.5 py-1 rounded-full text-white"
                      style={{
                        backgroundColor: `${project.accentColor}30`,
                        border: `1px solid ${project.accentColor}60`,
                      }}
                    >
                      {project.index} // {project.categoryLabel}
                    </span>
                    <span className="text-[11px] font-mono text-slate-400">{project.badge}</span>
                  </div>

                  <span className="text-xs font-mono text-slate-500">{project.year}</span>
                </div>

                {/* Card Hero Image Area */}
                <div className="relative h-52 sm:h-64 lg:h-72 overflow-hidden bg-black/60 group/img">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover object-top transition-transform duration-700 group-hover/img:scale-105"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src =
                        'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=1200&q=80';
                    }}
                  />
                  {/* Glass Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0b0f1c] via-[#0b0f1c]/40 to-transparent pointer-events-none" />

                  {/* Scanline Effect */}
                  <div className="absolute inset-0 bg-repeat-y opacity-15 pointer-events-none [background-image:linear-gradient(rgba(255,255,255,0.06)_1px,transparent_1px)] [background-size:100%_4px]" />

                  {/* Quick Inspect Hover Banner */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover/img:opacity-100 transition-opacity duration-300 bg-black/50 backdrop-blur-xs">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        sound.playInspect();
                        onInspectProject(project);
                      }}
                      className="px-5 py-2.5 rounded-2xl bg-white text-black font-semibold text-xs tracking-wider flex items-center gap-2 shadow-2xl hover:scale-105 transition-all"
                    >
                      <Sparkles className="w-4 h-4 fill-current text-indigo-600" />
                      <span>İNCELE & SİMÜLATÖR</span>
                    </button>
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-5 md:p-7 space-y-4 relative z-10 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-xl md:text-2xl font-bold text-white tracking-tight mb-1">
                      {project.title}
                    </h3>
                    <p className="text-xs md:text-sm text-slate-400 line-clamp-2 leading-relaxed">
                      {project.subtitle}
                    </p>
                  </div>

                  {/* Live Mini Preview Widget */}
                  <ProjectCardPreview project={project} />

                  {/* Tech Stack Badges */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {project.techStack.slice(0, 5).map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-0.5 rounded-md text-[10px] font-mono bg-white/[0.04] border border-white/[0.08] text-slate-300"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.techStack.length > 5 && (
                      <span className="px-1.5 py-0.5 rounded-md text-[10px] font-mono text-slate-500">
                        +{project.techStack.length - 5}
                      </span>
                    )}
                  </div>

                  {/* Bottom Action Triggers */}
                  <div className="pt-2 flex items-center gap-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        sound.playInspect();
                        onInspectProject(project);
                      }}
                      className="flex-1 py-2.5 px-4 rounded-xl text-xs font-mono font-bold flex items-center justify-center gap-2 text-white transition-all shadow-md group/btn"
                      style={{
                        backgroundColor: `${project.accentColor}25`,
                        borderColor: `${project.accentColor}60`,
                        borderWidth: 1,
                      }}
                    >
                      <span>Projeyi İncele & Simülatör</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
                    </button>

                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => {
                        e.stopPropagation();
                        sound.playTick();
                      }}
                      className="p-2.5 rounded-xl bg-white/[0.05] hover:bg-white/12 border border-white/10 text-slate-300 hover:text-white transition-colors"
                      title="GitHub Deposu"
                    >
                      <ExternalLink className="w-4 h-4" />
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
