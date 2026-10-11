import { ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';
import type { Project } from '../data/portfolioData';
import { sound } from '../utils/audio';

interface FilmstripDockProps {
  projects: Project[];
  activeProject: Project;
  onSelectProject: (project: Project) => void;
  onInspectActive: () => void;
}

export function FilmstripDock({
  projects,
  activeProject,
  onSelectProject,
  onInspectActive,
}: FilmstripDockProps) {
  const currentIndex = projects.findIndex((p) => p.id === activeProject.id);
  const progressPercent = ((currentIndex + 1) / projects.length) * 100;

  const handlePrev = () => {
    sound.playTransition();
    if (currentIndex > 0) {
      onSelectProject(projects[currentIndex - 1]);
    }
  };

  const handleNext = () => {
    sound.playTransition();
    if (currentIndex < projects.length - 1) {
      onSelectProject(projects[currentIndex + 1]);
    }
  };

  return (
    <div className="fixed bottom-3 md:bottom-5 inset-x-0 z-40 flex flex-col items-center pointer-events-none px-4">
      {/* Floating Glassmorphic HUD Bar */}
      <div className="pointer-events-auto p-1.5 md:p-2 rounded-2xl bg-[#080c16]/90 backdrop-blur-2xl border border-white/[0.12] shadow-2xl flex items-center gap-2 sm:gap-4 max-w-full overflow-x-auto no-scrollbar">
        {/* Project Counter & Progress Pill */}
        <div className="flex items-center gap-2.5 px-3 py-1.5 rounded-xl bg-white/[0.04] border border-white/[0.08] font-mono text-xs text-white shrink-0">
          <span className="font-bold tracking-wider" style={{ color: activeProject.accentColor }}>
            {activeProject.index}
          </span>
          <span className="text-slate-500">/</span>
          <span className="text-slate-400">
            {projects.length < 10 ? `0${projects.length}` : projects.length}
          </span>

          {/* Mini Progress Bar */}
          <div className="w-12 h-1 bg-white/10 rounded-full overflow-hidden hidden sm:block">
            <div
              className="h-full transition-all duration-500"
              style={{
                width: `${progressPercent}%`,
                backgroundColor: activeProject.accentColor,
              }}
            />
          </div>
        </div>

        {/* Prev Button */}
        <button
          onClick={handlePrev}
          disabled={currentIndex <= 0}
          className="p-2 rounded-xl bg-white/[0.04] hover:bg-white/[0.1] border border-white/[0.08] text-white disabled:opacity-20 disabled:pointer-events-none transition-colors shrink-0"
          title="Önceki Proje (←)"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        {/* Filmstrip Project Thumbnails / Dots */}
        <div className="flex items-center gap-1.5 shrink-0">
          {projects.map((project) => {
            const isActive = project.id === activeProject.id;
            return (
              <button
                key={project.id}
                onClick={() => {
                  sound.playTransition();
                  onSelectProject(project);
                }}
                onMouseEnter={() => sound.playHover()}
                title={`${project.index} // ${project.title}`}
                className={`group relative transition-all duration-300 rounded-xl overflow-hidden flex items-center justify-center shrink-0 ${
                  isActive
                    ? 'w-10 sm:w-16 h-8 ring-2 ring-white/80 scale-105'
                    : 'w-7 sm:w-8 h-8 opacity-50 hover:opacity-100 hover:scale-105'
                }`}
              >
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover object-center"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src =
                      'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=1200&q=80';
                  }}
                />
                <div
                  className={`absolute inset-0 transition-opacity ${
                    isActive ? 'bg-transparent' : 'bg-black/60 group-hover:bg-black/20'
                  }`}
                />
                <span className="absolute bottom-0.5 right-1 font-mono text-[9px] font-bold text-white drop-shadow">
                  {project.index}
                </span>
              </button>
            );
          })}
        </div>

        {/* Next Button */}
        <button
          onClick={handleNext}
          disabled={currentIndex >= projects.length - 1}
          className="p-2 rounded-xl bg-white/[0.04] hover:bg-white/[0.1] border border-white/[0.08] text-white disabled:opacity-20 disabled:pointer-events-none transition-colors shrink-0"
          title="Sonraki Proje (→)"
        >
          <ChevronRight className="w-4 h-4" />
        </button>

        {/* Deep Dive Action Pill */}
        <button
          onClick={() => {
            sound.playInspect();
            onInspectActive();
          }}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-mono text-xs font-bold text-white transition-all shadow-md shrink-0"
          style={{
            backgroundColor: `${activeProject.accentColor}30`,
            border: `1px solid ${activeProject.accentColor}80`,
          }}
        >
          <Sparkles className="w-3.5 h-3.5 fill-current" />
          <span className="hidden sm:inline">İncele</span>
          <span className="text-[10px] text-white/70 font-mono hidden md:inline">[SPACE]</span>
        </button>
      </div>

      {/* Keyboard Shortcuts Hint Pill */}
      <div className="hidden lg:flex items-center gap-3 mt-1.5 text-[10px] font-mono text-slate-500">
        <span>[← / →] Projeler Arasında Akış</span>
        <span>•</span>
        <span>[SPACE] Canlı Laboratuvar</span>
        <span>•</span>
        <span>[1-9] Hızlı Atlama</span>
      </div>
    </div>
  );
}
