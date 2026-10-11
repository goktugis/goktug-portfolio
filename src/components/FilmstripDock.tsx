import { ChevronLeft, ChevronRight, Eye } from 'lucide-react';
import type { Project } from '../data/portfolioData';
import { sound } from '../utils/audio';
import type { GalleryTheme } from './GalleryLighting';

interface FilmstripDockProps {
  projects: Project[];
  activeProject: Project;
  onSelectProject: (project: Project) => void;
  onInspectActive: () => void;
  theme: GalleryTheme;
}

export function FilmstripDock({
  projects,
  activeProject,
  onSelectProject,
  onInspectActive,
  theme,
}: FilmstripDockProps) {
  const currentIndex = projects.findIndex((p) => p.id === activeProject.id);
  const isLight = theme === 'linen';

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
      {/* Floating Gallery Curatorial Index Bar */}
      <div
        className={`pointer-events-auto p-1.5 md:p-2 rounded-xl border shadow-xl flex items-center gap-2 sm:gap-4 max-w-full overflow-x-auto no-scrollbar transition-colors duration-500 ${
          isLight
            ? 'bg-[#ffffff]/90 backdrop-blur-xl border-stone-300 text-stone-900 shadow-monolith-light'
            : theme === 'aluminum'
            ? 'bg-[#1b1c21]/90 backdrop-blur-xl border-stone-700 text-stone-100 shadow-monolith'
            : 'bg-[#111216]/90 backdrop-blur-xl border-stone-800 text-stone-100 shadow-monolith'
        }`}
      >
        {/* Curatorial Catalog Counter */}
        <div
          className={`flex items-center gap-2 px-3 py-1.5 rounded border font-mono text-xs shrink-0 ${
            isLight
              ? 'bg-stone-100 border-stone-200 text-stone-800'
              : 'bg-white/[0.04] border-white/10 text-stone-300'
          }`}
        >
          <span className="font-bold font-syne" style={{ color: activeProject.accentColor }}>
            [{activeProject.index}]
          </span>
          <span className="opacity-40">/</span>
          <span className="opacity-70 font-mono">0{projects.length}</span>
        </div>

        {/* Prev Button */}
        <button
          onClick={handlePrev}
          disabled={currentIndex <= 0}
          className={`p-1.5 rounded border disabled:opacity-20 transition-colors shrink-0 ${
            isLight
              ? 'bg-stone-100 border-stone-200 hover:bg-stone-200 text-stone-800'
              : 'bg-white/[0.04] border-white/10 hover:bg-white/10 text-stone-300'
          }`}
          title="Önceki Eser (←)"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        {/* Filmstrip Catalog Thumbnails */}
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
                title={`[${project.index}] ${project.title}`}
                className={`group relative transition-all duration-300 rounded overflow-hidden flex items-center justify-center shrink-0 ${
                  isActive
                    ? isLight
                      ? 'w-10 sm:w-14 h-8 ring-2 ring-stone-900 shadow-xs'
                      : 'w-10 sm:w-14 h-8 ring-2 ring-white shadow-xs'
                    : 'w-7 sm:w-8 h-8 opacity-40 hover:opacity-90'
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
          className={`p-1.5 rounded border disabled:opacity-20 transition-colors shrink-0 ${
            isLight
              ? 'bg-stone-100 border-stone-200 hover:bg-stone-200 text-stone-800'
              : 'bg-white/[0.04] border-white/10 hover:bg-white/10 text-stone-300'
          }`}
          title="Sonraki Eser (→)"
        >
          <ChevronRight className="w-4 h-4" />
        </button>

        {/* Deep Dive Action Pill */}
        <button
          onClick={() => {
            sound.playInspect();
            onInspectActive();
          }}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded font-mono text-xs font-bold transition-all shadow-xs shrink-0 ${
            isLight
              ? 'bg-stone-900 text-white hover:bg-stone-800'
              : 'bg-stone-100 text-stone-950 hover:bg-white'
          }`}
        >
          <Eye className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">İncele</span>
          <span className="text-[10px] opacity-70 font-mono hidden md:inline">[SPACE]</span>
        </button>
      </div>

      {/* Keyboard Hint */}
      <div
        className={`hidden lg:flex items-center gap-3 mt-1.5 text-[10px] font-mono tracking-wider ${
          isLight ? 'text-stone-500' : 'text-stone-500'
        }`}
      >
        <span>[← / →] SALON GEZİNTİSİ</span>
        <span>•</span>
        <span>[SPACE] LABORATUVAR</span>
        <span>•</span>
        <span>[1-9] DOĞRUDAN SALON</span>
      </div>
    </div>
  );
}
