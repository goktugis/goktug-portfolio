import { ChevronLeft, ChevronRight } from 'lucide-react';
import type { Project } from '../data/portfolioData';
import { sound } from '../utils/audio';

interface FilmstripDockProps {
  projects: Project[];
  activeProject: Project;
  onSelectProject: (project: Project) => void;
}

export function FilmstripDock({
  projects,
  activeProject,
  onSelectProject,
}: FilmstripDockProps) {
  const currentIndex = projects.findIndex((p) => p.id === activeProject.id);

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
    <div className="fixed bottom-4 inset-x-0 z-40 flex flex-col items-center pointer-events-none px-4 select-none">
      {/* Floating Gallery Index Dock */}
      <div className="pointer-events-auto p-1.5 md:p-2 rounded-2xl bg-[#0e0f14]/90 backdrop-blur-2xl border border-white/10 shadow-[0_15px_35px_rgba(0,0,0,0.8)] flex items-center gap-2 sm:gap-4 max-w-full overflow-x-auto no-scrollbar">
        {/* Prev Arrow */}
        <button
          onClick={handlePrev}
          disabled={currentIndex <= 0}
          className="p-2 rounded-xl bg-white/[0.04] hover:bg-white/10 border border-white/10 text-white disabled:opacity-20 disabled:pointer-events-none transition-colors shrink-0"
          title="Önceki Eser"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        {/* Filmstrip Project Thumbnails */}
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
                className={`group relative transition-all duration-300 rounded-lg overflow-hidden flex items-center justify-center shrink-0 ${
                  isActive
                    ? 'w-10 sm:w-14 h-8 ring-2 ring-amber-400 scale-105 shadow-md'
                    : 'w-7 sm:w-8 h-8 opacity-40 hover:opacity-90 hover:scale-102'
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

        {/* Next Arrow */}
        <button
          onClick={handleNext}
          disabled={currentIndex >= projects.length - 1}
          className="p-2 rounded-xl bg-white/[0.04] hover:bg-white/10 border border-white/10 text-white disabled:opacity-20 disabled:pointer-events-none transition-colors shrink-0"
          title="Sonraki Eser"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
