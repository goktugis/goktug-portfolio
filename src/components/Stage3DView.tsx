import { ChevronLeft, ChevronRight, ExternalLink, ArrowRight } from 'lucide-react';
import type { Project } from '../data/portfolioData';
import { ProjectCardPreview } from './ProjectCardPreview';
import { sound } from '../utils/audio';

interface Stage3DViewProps {
  projects: Project[];
  activeProject: Project;
  onSelectProject: (project: Project) => void;
  onInspectProject: (project: Project) => void;
}

export function Stage3DView({
  projects,
  activeProject,
  onSelectProject,
  onInspectProject,
}: Stage3DViewProps) {
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
    <div className="relative w-full h-[calc(100vh-140px)] min-h-[620px] flex items-center justify-center overflow-hidden py-10 select-none">
      {/* 3D Stage Carousel Floor */}
      <div className="absolute bottom-10 w-[700px] h-[200px] rounded-[100%] bg-gradient-to-t from-cyan-500/15 to-transparent blur-3xl pointer-events-none" />

      {/* Navigation Buttons */}
      <div className="absolute inset-x-8 top-1/2 -translate-y-1/2 z-30 flex justify-between pointer-events-none">
        <button
          onClick={handlePrev}
          disabled={currentIndex <= 0}
          className="pointer-events-auto p-4 rounded-2xl bg-black/70 backdrop-blur-xl border border-white/10 text-white hover:bg-white/15 disabled:opacity-20 disabled:pointer-events-none transition-all shadow-xl"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        <button
          onClick={handleNext}
          disabled={currentIndex >= projects.length - 1}
          className="pointer-events-auto p-4 rounded-2xl bg-black/70 backdrop-blur-xl border border-white/10 text-white hover:bg-white/15 disabled:opacity-20 disabled:pointer-events-none transition-all shadow-xl"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>

      {/* 3D Perspective Stage */}
      <div
        className="relative w-full max-w-4xl h-[560px] flex items-center justify-center"
        style={{ perspective: '1400px' }}
      >
        {projects.map((project, idx) => {
          const offset = idx - currentIndex;
          if (Math.abs(offset) > 2) return null; // Only render nearby cards for performance

          const isActive = offset === 0;
          const translateX = offset * 320;
          const translateZ = -Math.abs(offset) * 220;
          const rotateY = offset * -28;
          const opacity = isActive ? 1 : Math.abs(offset) === 1 ? 0.6 : 0.2;
          const scale = isActive ? 1 : 0.85;

          return (
            <div
              key={project.id}
              onClick={() => {
                if (!isActive) {
                  sound.playTransition();
                  onSelectProject(project);
                }
              }}
              className={`absolute top-0 w-[340px] sm:w-[480px] md:w-[580px] rounded-3xl transition-all duration-700 ease-out cursor-pointer ${
                isActive ? 'z-20' : 'z-10 hover:opacity-85'
              }`}
              style={{
                transform: `translateX(${translateX}px) translateZ(${translateZ}px) rotateY(${rotateY}deg) scale(${scale})`,
                opacity,
              }}
            >
              {/* Outer Glow Halo */}
              <div
                className="absolute -inset-1 rounded-3xl blur-xl transition-opacity duration-500 pointer-events-none"
                style={{
                  backgroundColor: project.accentColor,
                  opacity: isActive ? 0.35 : 0.05,
                }}
              />

              {/* Card Surface */}
              <div
                className="relative rounded-3xl bg-[#0b0f1c]/90 backdrop-blur-2xl border transition-all duration-500 overflow-hidden shadow-2xl flex flex-col"
                style={{
                  borderColor: isActive ? `${project.accentColor}80` : 'rgba(255, 255, 255, 0.08)',
                  boxShadow: isActive
                    ? `0 25px 60px -10px ${project.accentColor}30, 0 0 0 1px ${project.accentColor}40`
                    : '0 15px 35px rgba(0,0,0,0.6)',
                }}
              >
                {/* Image */}
                <div className="relative h-48 sm:h-56 overflow-hidden bg-black/60">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover object-top"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src =
                        'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=1200&q=80';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0b0f1c] via-transparent to-transparent pointer-events-none" />
                  <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-black/70 border border-white/20 font-mono text-[11px] text-white">
                    {project.index} // {project.badge}
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 space-y-3">
                  <div>
                    <h3 className="text-xl font-bold text-white">{project.title}</h3>
                    <p className="text-xs text-slate-400 line-clamp-1">{project.subtitle}</p>
                  </div>

                  <ProjectCardPreview project={project} />

                  {/* Actions */}
                  {isActive && (
                    <div className="pt-2 flex items-center gap-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          sound.playInspect();
                          onInspectProject(project);
                        }}
                        className="flex-1 py-2.5 px-4 rounded-xl text-xs font-mono font-bold flex items-center justify-center gap-2 text-white shadow-md"
                        style={{ backgroundColor: project.accentColor }}
                      >
                        <span>Projeyi İncele & Simülatör</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>

                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => {
                          e.stopPropagation();
                          sound.playTick();
                        }}
                        className="p-2.5 rounded-xl bg-white/[0.05] hover:bg-white/15 border border-white/10 text-white"
                        title="GitHub"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
