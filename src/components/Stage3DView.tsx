import { ChevronLeft, ChevronRight, ExternalLink, Eye } from 'lucide-react';
import type { Project } from '../data/portfolioData';
import { ProjectLiveSandbox } from './ProjectLiveSandbox';
import { sound } from '../utils/audio';
import type { GalleryTheme } from './GalleryLighting';

interface Stage3DViewProps {
  projects: Project[];
  activeProject: Project;
  onSelectProject: (project: Project) => void;
  onInspectProject: (project: Project) => void;
  theme: GalleryTheme;
}

export function Stage3DView({
  projects,
  activeProject,
  onSelectProject,
  onInspectProject,
  theme,
}: Stage3DViewProps) {
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
    <div className="relative w-full h-[calc(100vh-140px)] min-h-[640px] flex items-center justify-center p-4 md:p-8 select-none">
      {/* Editorial Dual-Page Book Container */}
      <div
        className={`relative w-full max-w-6xl h-full max-h-[620px] rounded-2xl border flex flex-col md:flex-row overflow-hidden transition-all duration-500 ${
          isLight
            ? 'bg-white border-stone-300 shadow-monolith-light text-stone-900'
            : theme === 'aluminum'
            ? 'bg-[#1b1c21] border-stone-700 shadow-monolith text-stone-100'
            : 'bg-[#121418] border-stone-800 shadow-monolith text-stone-100'
        }`}
      >
        {/* Left Page: Curated Art Monograph Page */}
        <div className="w-full md:w-1/2 p-6 md:p-10 border-b md:border-b-0 md:border-r border-stone-200 dark:border-stone-800 flex flex-col justify-between overflow-y-auto">
          <div className="space-y-4">
            {/* Catalog Top Line */}
            <div className="flex items-center justify-between text-xs font-mono tracking-widest text-stone-500 uppercase border-b border-stone-200 dark:border-stone-800 pb-2">
              <span>MONOGRAPH FOLIO [{activeProject.index} // 09]</span>
              <span>{activeProject.categoryLabel}</span>
            </div>

            {/* Title & Tagline */}
            <div className="space-y-1">
              <h2 className="font-syne text-3xl md:text-4xl font-extrabold tracking-tight">
                {activeProject.title}
              </h2>
              <p className="font-editorial-serif italic text-base md:text-lg text-stone-600 dark:text-stone-300">
                "{activeProject.subtitle}"
              </p>
            </div>

            {/* Artwork Image Frame */}
            <div className="relative h-44 sm:h-52 rounded-xl overflow-hidden bg-stone-900 border border-stone-200 dark:border-stone-800">
              <img
                src={activeProject.image}
                alt={activeProject.title}
                className="w-full h-full object-cover object-top"
                onError={(e) => {
                  (e.target as HTMLImageElement).src =
                    'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=1200&q=80';
                }}
              />
              <div className="absolute top-2 left-2 px-2 py-0.5 rounded bg-black/70 backdrop-blur-md text-[10px] font-mono text-white">
                {activeProject.badge}
              </div>
            </div>

            {/* Curatorial Text */}
            <p className="text-xs md:text-sm text-stone-600 dark:text-stone-400 leading-relaxed">
              {activeProject.description}
            </p>
          </div>

          {/* Left Page Footer: Provenance & Specs */}
          <div className="pt-4 border-t border-stone-200 dark:border-stone-800 flex items-center justify-between text-xs font-mono">
            <span className="text-stone-500">MİMARİ: {activeProject.techStack.slice(0, 3).join(' • ')}</span>
            <a
              href={activeProject.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 font-bold underline"
            >
              <span>GitHub</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>

        {/* Right Page: Live Interactive Installation Panel */}
        <div className="w-full md:w-1/2 p-6 md:p-10 flex flex-col justify-between overflow-y-auto">
          <div className="space-y-5">
            <div className="flex items-center justify-between text-xs font-mono tracking-widest text-stone-500 uppercase border-b border-stone-200 dark:border-stone-800 pb-2">
              <span>CANLI İNTERAKTİF DENEY İSTASYONU</span>
              <span>GERÇEK ZAMANLI</span>
            </div>

            {/* Live Sandbox Component */}
            <ProjectLiveSandbox project={activeProject} />

            {/* Key Spec Highlights */}
            <div className="space-y-2">
              <span className="text-[10px] font-mono tracking-wider text-stone-500 uppercase block">
                ÖNE ÇIKAN MÜHENDİSLİK SPESİFİKASYONLARI
              </span>
              <div className="space-y-1.5 text-xs text-stone-700 dark:text-stone-300">
                {activeProject.highlights.slice(0, 3).map((h, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <span className="text-stone-400 mt-0.5">•</span>
                    <span>{h}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Page Footer: Navigation Controls */}
          <div className="pt-4 border-t border-stone-200 dark:border-stone-800 flex items-center justify-between">
            <button
              onClick={() => {
                sound.playInspect();
                onInspectProject(activeProject);
              }}
              className={`px-4 py-2 rounded text-xs font-mono font-bold flex items-center gap-2 ${
                isLight
                  ? 'bg-stone-900 text-white hover:bg-stone-800'
                  : 'bg-stone-100 text-stone-950 hover:bg-white'
              }`}
            >
              <Eye className="w-3.5 h-3.5" />
              <span>Tam Ekran İncele</span>
            </button>

            {/* Monograph Page Flip Controls */}
            <div className="flex items-center gap-2">
              <button
                onClick={handlePrev}
                disabled={currentIndex <= 0}
                className={`p-2 rounded border transition-colors disabled:opacity-20 ${
                  isLight
                    ? 'bg-stone-100 border-stone-300 text-stone-900 hover:bg-stone-200'
                    : 'bg-stone-800 border-stone-700 text-stone-100 hover:bg-stone-700'
                }`}
                title="Önceki Sayfa"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              <span className="text-xs font-mono text-stone-500">
                {currentIndex + 1} / {projects.length}
              </span>

              <button
                onClick={handleNext}
                disabled={currentIndex >= projects.length - 1}
                className={`p-2 rounded border transition-colors disabled:opacity-20 ${
                  isLight
                    ? 'bg-stone-100 border-stone-300 text-stone-900 hover:bg-stone-200'
                    : 'bg-stone-800 border-stone-700 text-stone-100 hover:bg-stone-700'
                }`}
                title="Sonraki Sayfa"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
