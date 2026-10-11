import { useState } from 'react';
import { ExternalLink, ArrowRight, Compass } from 'lucide-react';
import type { Project } from '../data/portfolioData';
import { sound } from '../utils/audio';
import type { GalleryTheme } from './GalleryLighting';

interface GalaxyMapViewProps {
  projects: Project[];
  activeProject: Project;
  onSelectProject: (project: Project) => void;
  onInspectProject: (project: Project) => void;
  theme: GalleryTheme;
}

export function GalaxyMapView({
  projects,
  activeProject,
  onSelectProject,
  onInspectProject,
  theme,
}: GalaxyMapViewProps) {
  const [hoveredProject, setHoveredProject] = useState<Project | null>(null);
  const isLight = theme === 'linen';

  // Define four architectural gallery wings
  const wings = [
    { id: 'wing-a', name: 'WING A // YAPAY ZEKA & OTONOM MOTORLAR', projectIds: ['synapse-flow', 'neuro-shield'] },
    { id: 'wing-b', name: 'WING B // KRİPTOGRAFİK SİSTEMLER', projectIds: ['aura-cipher'] },
    { id: 'wing-c', name: 'WING C // KURUMSAL WEB & GASTRONOMİ', projectIds: ['han-kebap-steakhouse', 'planpilot', 'dietitian-app'] },
    { id: 'wing-d', name: 'WING D // BİYOMEDİKAL & OPTİK GÖRÜ', projectIds: ['hcc-survival-project', 'goruntu-isleme', 'oil-spill-project'] },
  ];

  return (
    <div className="relative w-full h-[calc(100vh-140px)] min-h-[640px] flex items-center justify-center overflow-hidden p-6 select-none">
      {/* Blueprint Grid Background Lines */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20">
        <div className="w-[900px] h-[550px] border border-dashed border-stone-500 rounded-sm" />
        <div className="absolute w-[600px] h-[350px] border border-stone-500 rounded-sm" />
      </div>

      {/* Main Architectural Floor Plan Canvas */}
      <div className="relative w-full max-w-[1200px] h-[600px] z-10 flex flex-col justify-between">
        {/* Floorplan Title Banner */}
        <div className="flex items-center justify-between pb-3 border-b border-stone-300 dark:border-stone-800">
          <div className="flex items-center gap-2 text-xs font-mono">
            <Compass className="w-4 h-4 text-amber-500" />
            <span className="font-bold">SERGİ KAT PLANI // LEVEL 01 (ARCHITECTURAL SCHEMATIC)</span>
          </div>
          <span className="text-[11px] font-mono opacity-50">ÖLÇEK: 1:100 // GÖKTUĞ İŞERİ ATELIER</span>
        </div>

        {/* 4 Gallery Wings Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-auto">
          {wings.map((wing) => (
            <div
              key={wing.id}
              className={`p-4 md:p-5 rounded-xl border transition-all ${
                isLight
                  ? 'bg-stone-100/70 border-stone-300'
                  : 'bg-[#14151a]/70 border-stone-800'
              }`}
            >
              <div className="text-[10px] font-mono tracking-widest text-stone-500 uppercase mb-3 flex items-center justify-between">
                <span>{wing.name}</span>
                <span>{wing.projectIds.length} ESER</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {wing.projectIds.map((pid) => {
                  const project = projects.find((p) => p.id === pid);
                  if (!project) return null;

                  const isActive = project.id === activeProject.id;

                  return (
                    <div
                      key={project.id}
                      onClick={() => {
                        sound.playTransition();
                        onSelectProject(project);
                      }}
                      onMouseEnter={() => {
                        sound.playHover();
                        setHoveredProject(project);
                      }}
                      onMouseLeave={() => setHoveredProject(null)}
                      className={`p-3 rounded-lg border cursor-pointer transition-all ${
                        isActive
                          ? isLight
                            ? 'bg-white border-stone-900 shadow-md scale-102'
                            : 'bg-stone-800 border-white/60 shadow-md scale-102'
                          : isLight
                          ? 'bg-stone-50/80 border-stone-200 hover:border-stone-400'
                          : 'bg-black/30 border-stone-800 hover:border-stone-600'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span
                          className="text-[10px] font-mono font-bold px-1.5 py-0.2 rounded"
                          style={{
                            backgroundColor: `${project.accentColor}25`,
                            color: project.accentColor,
                          }}
                        >
                          SALON {project.index}
                        </span>
                        <span className="text-[10px] font-mono opacity-50">{project.year}</span>
                      </div>

                      <h4 className="font-syne text-sm font-bold truncate">{project.title}</h4>
                      <p className="text-[11px] opacity-60 truncate">{project.subtitle}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Floorplan Footer Status */}
        <div className="flex items-center justify-between pt-3 border-t border-stone-300 dark:border-stone-800 text-[11px] font-mono opacity-60">
          <span>SALONLARA TIKLAYARAK İSTEDİĞİNİZ ESERİN ODASINA GEÇİŞ YAPIN</span>
          <span>AKTİF KONUM: SALON [{activeProject.index}]</span>
        </div>
      </div>

      {/* Hovered / Active Installation Float Preview Card */}
      {(hoveredProject || activeProject) && (
        <div
          className={`absolute bottom-8 right-8 z-30 w-80 rounded-xl border p-5 shadow-2xl space-y-3 pointer-events-auto ${
            isLight
              ? 'bg-white border-stone-300 shadow-monolith-light text-stone-900'
              : 'bg-[#121316] border-stone-700 shadow-monolith text-stone-100'
          }`}
        >
          {(() => {
            const cur = hoveredProject || activeProject;
            return (
              <>
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="font-bold">SALON {cur.index} // {cur.categoryLabel}</span>
                  <span className="opacity-60">{cur.badge}</span>
                </div>

                <div className="flex items-center gap-3">
                  <img
                    src={cur.image}
                    alt={cur.title}
                    className="w-14 h-14 rounded-lg object-cover border border-stone-200 dark:border-stone-800 shrink-0"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src =
                        'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=1200&q=80';
                    }}
                  />
                  <div className="overflow-hidden">
                    <h4 className="font-syne text-sm font-bold truncate">{cur.title}</h4>
                    <p className="text-xs opacity-60 truncate">{cur.subtitle}</p>
                  </div>
                </div>

                <div className="pt-1 flex items-center gap-2">
                  <button
                    onClick={() => {
                      sound.playInspect();
                      onInspectProject(cur);
                    }}
                    className={`flex-1 py-2 rounded text-xs font-mono font-bold flex items-center justify-center gap-1.5 transition-all ${
                      isLight
                        ? 'bg-stone-900 text-white hover:bg-stone-800'
                        : 'bg-stone-100 text-stone-950 hover:bg-white'
                    }`}
                  >
                    <span>Salona Gir</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>

                  <a
                    href={cur.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => sound.playTick()}
                    className={`p-2 rounded border transition-colors ${
                      isLight
                        ? 'bg-stone-100 border-stone-300 text-stone-700 hover:text-stone-950'
                        : 'bg-white/[0.04] border-white/10 text-stone-300 hover:text-white'
                    }`}
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
    </div>
  );
}
