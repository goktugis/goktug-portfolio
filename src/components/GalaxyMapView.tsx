import { useRef, useState } from 'react';
import { ExternalLink, ArrowRight, Compass } from 'lucide-react';
import type { Project } from '../data/portfolioData';
import { sound } from '../utils/audio';

interface GalaxyMapViewProps {
  projects: Project[];
  activeProject: Project;
  onSelectProject: (project: Project) => void;
  onInspectProject: (project: Project) => void;
}

export function GalaxyMapView({
  projects,
  activeProject,
  onSelectProject,
  onInspectProject,
}: GalaxyMapViewProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [hoveredProject, setHoveredProject] = useState<Project | null>(null);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[calc(100vh-140px)] min-h-[600px] flex items-center justify-center overflow-hidden p-6 select-none"
    >
      {/* Background Spatial Grid & Radar Rings */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[800px] h-[800px] rounded-full border border-white/[0.04] animate-spin [animation-duration:120s]" />
        <div className="w-[550px] h-[550px] rounded-full border border-white/[0.06]" />
        <div className="w-[300px] h-[300px] rounded-full border border-white/[0.08]" />
      </div>

      {/* SVG Connecting Constellation Lines */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
        <defs>
          <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.4" />
            <stop offset="50%" stopColor="#a855f7" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#10b981" stopOpacity="0.4" />
          </linearGradient>
        </defs>

        {projects.map((p) => {
          return p.connections.map((targetId) => {
            const target = projects.find((t) => t.id === targetId);
            if (!target) return null;

            return (
              <line
                key={`${p.id}-${target.id}`}
                x1={`${(p.coords.x / 1000) * 100}%`}
                y1={`${(p.coords.y / 800) * 100}%`}
                x2={`${(target.coords.x / 1000) * 100}%`}
                y2={`${(target.coords.y / 800) * 100}%`}
                stroke="url(#lineGrad)"
                strokeWidth="1.5"
                strokeDasharray="4 6"
                className="opacity-40"
              />
            );
          });
        })}
      </svg>

      {/* Project Celestial Nodes */}
      <div className="relative w-full max-w-[1100px] h-[650px] z-10">
        {projects.map((project) => {
          const isActive = project.id === activeProject.id;
          const isHovered = hoveredProject?.id === project.id;
          const leftPct = (project.coords.x / 1000) * 100;
          const topPct = (project.coords.y / 800) * 100;

          return (
            <div
              key={project.id}
              style={{ left: `${leftPct}%`, top: `${topPct}%` }}
              className="absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer group"
              onClick={() => {
                sound.playTransition();
                onSelectProject(project);
              }}
              onMouseEnter={() => {
                sound.playHover();
                setHoveredProject(project);
              }}
              onMouseLeave={() => setHoveredProject(null)}
            >
              {/* Outer Pulsing Ring */}
              <div
                className={`w-14 h-14 rounded-full flex items-center justify-center transition-all duration-500 ${
                  isActive || isHovered ? 'scale-125' : 'scale-100 hover:scale-110'
                }`}
                style={{
                  backgroundColor: `${project.accentColor}18`,
                  boxShadow: isActive ? `0 0 35px 8px ${project.accentColor}50` : 'none',
                }}
              >
                {/* Core Node Orb */}
                <div
                  className="w-7 h-7 rounded-full flex items-center justify-center font-mono text-[10px] font-bold text-white transition-all shadow-lg"
                  style={{
                    backgroundColor: project.accentColor,
                    boxShadow: `0 0 15px ${project.accentColor}`,
                  }}
                >
                  {project.index}
                </div>
              </div>

              {/* Node Label Pill */}
              <div className="absolute top-16 left-1/2 -translate-x-1/2 whitespace-nowrap text-center pointer-events-none">
                <span
                  className={`px-2.5 py-1 rounded-full text-[11px] font-mono font-semibold transition-all ${
                    isActive
                      ? 'bg-white text-black shadow-lg scale-105'
                      : 'bg-black/80 text-slate-300 border border-white/10 group-hover:text-white'
                  }`}
                >
                  {project.title}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Holographic Floating Preview Card on Node Hover / Select */}
      {(hoveredProject || activeProject) && (
        <div className="absolute bottom-6 right-6 z-30 w-80 md:w-96 rounded-2xl bg-[#0a0e1a]/95 backdrop-blur-2xl border border-white/15 p-5 shadow-2xl space-y-3 pointer-events-auto">
          {(() => {
            const cur = hoveredProject || activeProject;
            return (
              <>
                <div className="flex items-center justify-between text-xs font-mono">
                  <span
                    className="px-2 py-0.5 rounded font-bold text-white"
                    style={{ backgroundColor: cur.accentColor }}
                  >
                    {cur.index} // {cur.categoryLabel}
                  </span>
                  <span className="text-slate-400">{cur.badge}</span>
                </div>

                <div className="flex items-center gap-3">
                  <img
                    src={cur.image}
                    alt={cur.title}
                    className="w-14 h-14 rounded-xl object-cover border border-white/10 shrink-0"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src =
                        'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=1200&q=80';
                    }}
                  />
                  <div>
                    <h4 className="text-sm font-bold text-white">{cur.title}</h4>
                    <p className="text-xs text-slate-400 line-clamp-1">{cur.subtitle}</p>
                  </div>
                </div>

                <div className="pt-1 flex items-center gap-2">
                  <button
                    onClick={() => {
                      sound.playInspect();
                      onInspectProject(cur);
                    }}
                    className="flex-1 py-2 rounded-xl text-xs font-mono font-bold text-white flex items-center justify-center gap-1.5 transition-all shadow"
                    style={{ backgroundColor: cur.accentColor }}
                  >
                    <span>Projeyi İncele</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>

                  <a
                    href={cur.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => sound.playTick()}
                    className="p-2 rounded-xl bg-white/[0.06] hover:bg-white/15 border border-white/10 text-white"
                    title="GitHub"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </>
            );
          })()}
        </div>
      )}

      {/* Guide Banner */}
      <div className="absolute top-6 left-6 z-20 flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/60 border border-white/10 font-mono text-xs text-slate-400">
        <Compass className="w-3.5 h-3.5 text-cyan-400" />
        <span>Düğümlere tıklayarak projeler arasında uzamsal yolculuk yapın.</span>
      </div>
    </div>
  );
}
