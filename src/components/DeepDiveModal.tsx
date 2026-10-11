import { useState, useEffect } from 'react';
import { X, ExternalLink, GitBranch, Check, Copy, Layers, Code, Terminal, Eye } from 'lucide-react';
import type { Project } from '../data/portfolioData';
import { ProjectLiveSandbox } from './ProjectLiveSandbox';
import { sound } from '../utils/audio';
import type { GalleryTheme } from './GalleryLighting';

interface DeepDiveModalProps {
  project: Project | null;
  onClose: () => void;
  theme: GalleryTheme;
}

export function DeepDiveModal({ project, onClose, theme }: DeepDiveModalProps) {
  const [copiedClone, setCopiedClone] = useState(false);
  const [activeTab, setActiveTab] = useState<'sandbox' | 'architecture' | 'code'>('sandbox');
  const isLight = theme === 'linen';

  useEffect(() => {
    if (project) {
      sound.playInspect();
      setActiveTab('sandbox');
    }
  }, [project]);

  if (!project) return null;

  const cloneCommand = `git clone ${project.githubUrl}.git`;

  const copyClone = () => {
    sound.playAction();
    navigator.clipboard.writeText(cloneCommand);
    setCopiedClone(true);
    setTimeout(() => setCopiedClone(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 md:p-10 backdrop-blur-2xl bg-black/75 transition-all">
      {/* Backdrop */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* Main Exhibition Vitrine Container */}
      <div
        className={`relative z-10 w-full max-w-5xl max-h-[92vh] overflow-y-auto rounded-2xl border flex flex-col scrollbar-thin transition-colors duration-300 ${
          isLight
            ? 'bg-[#faf9f6] border-stone-300 shadow-monolith-light text-stone-900'
            : theme === 'aluminum'
            ? 'bg-[#18191e] border-stone-700 shadow-monolith text-stone-100'
            : 'bg-[#111216] border-stone-800 shadow-monolith text-stone-100'
        }`}
      >
        {/* Header Bar */}
        <div
          className={`sticky top-0 z-20 px-6 py-4 border-b flex items-center justify-between backdrop-blur-md ${
            isLight
              ? 'bg-[#faf9f6]/95 border-stone-200'
              : 'bg-[#111216]/95 border-stone-800'
          }`}
        >
          <div className="flex items-center gap-3">
            <span
              className="text-xs font-mono font-bold px-2 py-0.5 rounded"
              style={{
                backgroundColor: `${project.accentColor}20`,
                color: project.accentColor,
                border: `1px solid ${project.accentColor}40`,
              }}
            >
              SALON [{project.index}] // {project.categoryLabel.toUpperCase()}
            </span>
            <h2 className="font-syne text-lg md:text-xl font-bold tracking-tight">{project.title}</h2>
          </div>

          <div className="flex items-center gap-2">
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => sound.playTick()}
              className={`hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded border text-xs font-mono transition-colors ${
                isLight
                  ? 'bg-stone-100 border-stone-300 hover:bg-stone-200 text-stone-800'
                  : 'bg-white/[0.04] border-white/10 hover:bg-white/10 text-stone-200'
              }`}
            >
              <GitBranch className="w-3.5 h-3.5" />
              <span>GitHub</span>
              <ExternalLink className="w-3 h-3 opacity-60" />
            </a>

            <button
              onClick={() => {
                sound.playTick();
                onClose();
              }}
              className={`p-2 rounded border transition-colors ${
                isLight
                  ? 'bg-stone-100 border-stone-300 hover:bg-stone-200 text-stone-800'
                  : 'bg-white/[0.04] border-white/10 hover:bg-white/10 text-stone-200'
              }`}
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 md:p-8 space-y-8">
          {/* Top Curatorial Artwork & Metadata */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            <div className="lg:col-span-5 relative rounded-xl overflow-hidden border border-stone-300 dark:border-stone-800 bg-stone-900 shadow-md">
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-56 sm:h-64 object-cover object-top"
                onError={(e) => {
                  (e.target as HTMLImageElement).src =
                    'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=1200&q=80';
                }}
              />
              <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between text-xs font-mono text-white">
                <span className="px-2 py-0.5 rounded bg-black/75 backdrop-blur-md">
                  {project.badge}
                </span>
                <span className="bg-black/75 px-2 py-0.5 rounded">{project.year}</span>
              </div>
            </div>

            <div className="lg:col-span-7 space-y-4">
              <div>
                <h3 className="font-syne text-xl md:text-2xl font-bold mb-1.5">{project.subtitle}</h3>
                <p className="text-sm opacity-80 leading-relaxed font-sans">{project.description}</p>
              </div>

              {/* Material & Stack Specifications */}
              <div className="flex flex-wrap gap-1.5">
                {project.techStack.map((tech) => (
                  <span
                    key={tech}
                    className={`px-2.5 py-1 rounded text-xs font-mono border ${
                      isLight
                        ? 'bg-stone-100 border-stone-300 text-stone-700'
                        : 'bg-white/[0.04] border-white/10 text-stone-300'
                    }`}
                  >
                    {tech}
                  </span>
                ))}
              </div>

              {/* Terminal Clone Command */}
              <div
                className={`flex items-center gap-2 p-2.5 rounded-lg border font-mono text-xs ${
                  isLight
                    ? 'bg-stone-100 border-stone-300 text-stone-800'
                    : 'bg-black/40 border-stone-800 text-stone-300'
                }`}
              >
                <Terminal className="w-4 h-4 opacity-50 shrink-0" />
                <span className="truncate select-all">{cloneCommand}</span>
                <button
                  onClick={copyClone}
                  className={`ml-auto shrink-0 p-1.5 rounded transition-colors ${
                    isLight ? 'hover:bg-stone-200' : 'hover:bg-white/10'
                  }`}
                  title="Klon Komutunu Kopyala"
                >
                  {copiedClone ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </div>
            </div>
          </div>

          {/* Exhibition Navigation Tabs */}
          <div className="flex items-center gap-2 border-b border-stone-200 dark:border-stone-800 pb-2">
            <button
              onClick={() => {
                sound.playTick();
                setActiveTab('sandbox');
              }}
              className={`flex items-center gap-2 px-4 py-2 rounded text-xs font-mono font-semibold transition-all ${
                activeTab === 'sandbox'
                  ? isLight
                    ? 'bg-stone-900 text-white shadow-xs'
                    : 'bg-white/15 text-white shadow-xs'
                  : 'opacity-60 hover:opacity-100'
              }`}
            >
              <Eye className="w-4 h-4" />
              <span>Canlı İnteraktif Simülatör</span>
            </button>

            <button
              onClick={() => {
                sound.playTick();
                setActiveTab('architecture');
              }}
              className={`flex items-center gap-2 px-4 py-2 rounded text-xs font-mono font-semibold transition-all ${
                activeTab === 'architecture'
                  ? isLight
                    ? 'bg-stone-900 text-white shadow-xs'
                    : 'bg-white/15 text-white shadow-xs'
                  : 'opacity-60 hover:opacity-100'
              }`}
            >
              <Layers className="w-4 h-4" />
              <span>Sistem Mimarisi & Şema</span>
            </button>

            {project.architecture.codeSnippet && (
              <button
                onClick={() => {
                  sound.playTick();
                  setActiveTab('code');
                }}
                className={`flex items-center gap-2 px-4 py-2 rounded text-xs font-mono font-semibold transition-all ${
                  activeTab === 'code'
                    ? isLight
                      ? 'bg-stone-900 text-white shadow-xs'
                      : 'bg-white/15 text-white shadow-xs'
                    : 'opacity-60 hover:opacity-100'
                }`}
              >
                <Code className="w-4 h-4" />
                <span>Çekirdek Algoritma</span>
              </button>
            )}
          </div>

          {/* Tab 1: Live Interactive Sandbox */}
          {activeTab === 'sandbox' && (
            <div className="space-y-6">
              <ProjectLiveSandbox project={project} />

              {/* Highlights */}
              <div className="space-y-3">
                <h4 className="text-xs font-mono uppercase tracking-wider opacity-60">
                  ÖNE ÇIKAN MÜHENDİSLİK BAŞARILARI
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {project.highlights.map((h, i) => (
                    <div
                      key={i}
                      className={`p-3.5 rounded-lg border text-xs flex items-start gap-2.5 ${
                        isLight
                          ? 'bg-stone-100/70 border-stone-200 text-stone-800'
                          : 'bg-white/[0.02] border-stone-800 text-stone-300'
                      }`}
                    >
                      <span
                        className="w-1.5 h-1.5 rounded-full mt-1.5 shrink-0"
                        style={{ backgroundColor: project.accentColor }}
                      />
                      <span>{h}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Tab 2: Architecture & Diagram */}
          {activeTab === 'architecture' && (
            <div className="space-y-6">
              <div
                className={`p-6 rounded-xl border space-y-4 ${
                  isLight
                    ? 'bg-stone-100/70 border-stone-200'
                    : 'bg-black/30 border-stone-800'
                }`}
              >
                <h4 className="text-xs font-mono uppercase tracking-wider opacity-60">MİMARİ GENEL BAKIŞ</h4>
                <p className="text-sm leading-relaxed">{project.architecture.overview}</p>

                {project.architecture.algorithmDetails && (
                  <div
                    className={`p-3.5 rounded-lg border font-mono text-xs ${
                      isLight
                        ? 'bg-white border-stone-300 text-stone-800'
                        : 'bg-white/[0.02] border-stone-800 text-stone-300'
                    }`}
                  >
                    <span className="opacity-60 block mb-1">// Algoritmik Detay</span>
                    {project.architecture.algorithmDetails}
                  </div>
                )}

                {project.architecture.diagram && (
                  <div className="space-y-1.5">
                    <span className="text-[11px] font-mono opacity-60">// Sistem Akış Boru Hattı Diyagramı</span>
                    <pre
                      className={`p-4 rounded-lg border font-mono text-xs overflow-x-auto leading-relaxed ${
                        isLight
                          ? 'bg-stone-900 border-stone-800 text-stone-100'
                          : 'bg-black/60 border-stone-800 text-stone-300'
                      }`}
                    >
                      {project.architecture.diagram}
                    </pre>
                  </div>
                )}
              </div>

              {/* Metrics */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {project.architecture.metrics.map((m, i) => (
                  <div
                    key={i}
                    className={`p-3.5 rounded-lg border font-mono text-center ${
                      isLight
                        ? 'bg-stone-100/70 border-stone-200'
                        : 'bg-white/[0.02] border-stone-800'
                    }`}
                  >
                    <span className="text-[11px] opacity-60 block mb-1">{m.label}</span>
                    <span className="text-sm font-bold font-syne" style={{ color: project.accentColor }}>
                      {m.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tab 3: Code Snippet */}
          {activeTab === 'code' && project.architecture.codeSnippet && (
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs font-mono opacity-60">
                <span>// TypeScript / Algoritmik Uygulama</span>
                <span>Production Ready</span>
              </div>
              <pre
                className={`p-5 rounded-xl border font-mono text-xs overflow-x-auto leading-relaxed ${
                  isLight
                    ? 'bg-stone-900 border-stone-800 text-stone-100'
                    : 'bg-black/80 border-stone-800 text-stone-300'
                }`}
              >
                {project.architecture.codeSnippet}
              </pre>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
