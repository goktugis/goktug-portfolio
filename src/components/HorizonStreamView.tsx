import React, { useRef, useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight, ExternalLink, ArrowRight, Eye } from 'lucide-react';
import type { Project } from '../data/portfolioData';
import { ProjectCardPreview } from './ProjectCardPreview';
import { sound } from '../utils/audio';
import type { GalleryTheme } from './GalleryLighting';

interface HorizonStreamViewProps {
  projects: Project[];
  activeProject: Project;
  onSelectProject: (project: Project) => void;
  onInspectProject: (project: Project) => void;
  theme: GalleryTheme;
}

export function HorizonStreamView({
  projects,
  activeProject,
  onSelectProject,
  onInspectProject,
  theme,
}: HorizonStreamViewProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const isLight = theme === 'linen';

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
    const walk = (x - startX) * 1.5;
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
    <div className="relative w-full h-full min-h-[calc(100vh-140px)] flex flex-col justify-center overflow-hidden py-12">
      {/* Floor Track Line with Distance Measurement Markers */}
      <div className="absolute bottom-28 left-0 right-0 h-[1px] pointer-events-none z-0">
        <div
          className={`w-full h-full transition-colors duration-700 ${
            isLight ? 'bg-stone-300' : 'bg-stone-800'
          }`}
        />
        <div className="flex justify-around text-[9px] font-mono opacity-40 pt-1">
          <span>SEC. 00.0m</span>
          <span>SEC. 15.0m</span>
          <span>SEC. 30.0m</span>
          <span>SEC. 45.0m</span>
          <span>SEC. 60.0m</span>
        </div>
      </div>

      {/* Floating Left / Right Nav Buttons */}
      <div className="pointer-events-none absolute inset-x-4 md:inset-x-8 top-1/2 -translate-y-1/2 z-30 flex justify-between">
        <button
          onClick={handlePrev}
          disabled={activeIndex <= 0}
          className={`pointer-events-auto p-4 rounded-xl border backdrop-blur-xl transition-all shadow-lg group ${
            isLight
              ? 'bg-stone-100/90 border-stone-300 text-stone-900 hover:bg-white disabled:opacity-20'
              : 'bg-[#121316]/90 border-stone-800 text-stone-100 hover:bg-stone-800 disabled:opacity-20'
          }`}
          title="Önceki Eser (←)"
        >
          <ChevronLeft className="w-5 h-5 group-hover:-translate-x-0.5 transition-transform" />
        </button>

        <button
          onClick={handleNext}
          disabled={activeIndex >= projects.length - 1}
          className={`pointer-events-auto p-4 rounded-xl border backdrop-blur-xl transition-all shadow-lg group ${
            isLight
              ? 'bg-stone-100/90 border-stone-300 text-stone-900 hover:bg-white disabled:opacity-20'
              : 'bg-[#121316]/90 border-stone-800 text-stone-100 hover:bg-stone-800 disabled:opacity-20'
          }`}
          title="Sonraki Eser (→)"
        >
          <ChevronRight className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" />
        </button>
      </div>

      {/* Horizontal Promenade Runway Track */}
      <div
        ref={containerRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        className={`relative z-10 w-full overflow-x-auto overflow-y-hidden no-scrollbar flex items-center gap-10 md:gap-16 px-8 md:px-24 py-6 select-none ${
          isDragging ? 'cursor-grabbing' : 'cursor-grab'
        }`}
        style={{ scrollBehavior: isDragging ? 'auto' : 'smooth' }}
      >
        {projects.map((project) => {
          const isActive = project.id === activeProject.id;

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
              className={`relative shrink-0 w-[350px] sm:w-[500px] lg:w-[680px] rounded-2xl transition-all duration-500 transform-gpu ${
                isActive
                  ? 'scale-100 opacity-100 z-20'
                  : 'scale-96 opacity-60 hover:opacity-90 hover:scale-98 z-10'
              }`}
            >
              {/* Monolith Container */}
              <div
                className={`relative rounded-2xl border transition-all duration-500 overflow-hidden flex flex-col ${
                  isLight
                    ? 'bg-[#ffffff] border-stone-300/90 shadow-monolith-light text-stone-900'
                    : theme === 'aluminum'
                    ? 'bg-[#1d1f24] border-stone-700 shadow-monolith text-stone-100'
                    : 'bg-[#13151a] border-stone-800/90 shadow-monolith text-stone-100'
                }`}
                style={{
                  borderTopColor: isActive ? project.accentColor : undefined,
                  borderTopWidth: isActive ? '3px' : '1px',
                }}
              >
                {/* Architectural Catalog Placard Header */}
                <div
                  className={`px-6 py-4 border-b flex items-center justify-between text-xs font-mono tracking-wider ${
                    isLight ? 'border-stone-200 bg-stone-50' : 'border-stone-800 bg-black/20'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <span
                      className="w-2 h-2 rounded-xs"
                      style={{ backgroundColor: project.accentColor }}
                    />
                    <span className="font-bold">
                      CAT. REF [{project.index}] // {project.categoryLabel.toUpperCase()}
                    </span>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="opacity-60">{project.badge}</span>
                    <span className="opacity-40">•</span>
                    <span className="opacity-80 font-bold">{project.year}</span>
                  </div>
                </div>

                {/* Installation Curated Artwork Visual */}
                <div className="relative h-56 sm:h-64 lg:h-76 overflow-hidden bg-stone-900 group/img">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover object-top transition-transform duration-700 group-hover/img:scale-103"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src =
                        'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=1200&q=80';
                    }}
                  />

                  {/* Architectural Crop Marks & Vignette */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

                  {/* Inspection Trigger on Hover */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover/img:opacity-100 transition-opacity duration-300 bg-black/40 backdrop-blur-xs">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        sound.playInspect();
                        onInspectProject(project);
                      }}
                      className="px-5 py-2.5 rounded-lg bg-stone-100 text-stone-950 font-syne font-bold text-xs tracking-wider flex items-center gap-2 shadow-2xl hover:scale-105 transition-all"
                    >
                      <Eye className="w-4 h-4" />
                      <span>ESERİ İNCELE & SİMÜLASYON</span>
                    </button>
                  </div>
                </div>

                {/* Placard Body */}
                <div className="p-6 md:p-8 space-y-5 flex-1 flex flex-col justify-between">
                  <div className="space-y-1.5">
                    <h3 className="font-syne text-2xl md:text-3xl font-extrabold tracking-tight">
                      {project.title}
                    </h3>
                    <p
                      className={`text-xs md:text-sm leading-relaxed ${
                        isLight ? 'text-stone-600' : 'text-stone-400'
                      }`}
                    >
                      {project.subtitle}
                    </p>
                  </div>

                  {/* Physical Exhibit Mini-Widget Test Station */}
                  <ProjectCardPreview project={project} />

                  {/* Material & Stack Specifications */}
                  <div className="pt-1 flex flex-wrap gap-1.5">
                    {project.techStack.map((tech) => (
                      <span
                        key={tech}
                        className={`px-2 py-0.5 rounded text-[10px] font-mono border ${
                          isLight
                            ? 'bg-stone-100 border-stone-300 text-stone-700'
                            : 'bg-white/[0.03] border-white/10 text-stone-300'
                        }`}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Bottom Action Triggers */}
                  <div className="pt-3 flex items-center gap-2 border-t border-stone-200 dark:border-stone-800">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        sound.playInspect();
                        onInspectProject(project);
                      }}
                      className={`flex-1 py-2.5 px-4 rounded-lg text-xs font-mono font-bold flex items-center justify-center gap-2 transition-all shadow-xs group/btn ${
                        isLight
                          ? 'bg-stone-900 text-white hover:bg-stone-800'
                          : 'bg-stone-100 text-stone-950 hover:bg-white'
                      }`}
                    >
                      <span>İnteraktif Laboratuvar & Detay</span>
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
                      className={`p-2.5 rounded-lg border transition-colors ${
                        isLight
                          ? 'bg-stone-100 border-stone-300 text-stone-700 hover:text-stone-950'
                          : 'bg-white/[0.04] border-white/10 text-stone-300 hover:text-white'
                      }`}
                      title="GitHub Kaynak Kodu"
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
