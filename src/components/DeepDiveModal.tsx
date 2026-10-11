import { useState, useEffect } from 'react';
import { X, ExternalLink, GitBranch, Check, Copy, Layers, Code, Sparkles, Terminal } from 'lucide-react';
import type { Project } from '../data/portfolioData';
import { ProjectLiveSandbox } from './ProjectLiveSandbox';
import { sound } from '../utils/audio';

interface DeepDiveModalProps {
  project: Project | null;
  onClose: () => void;
}

export function DeepDiveModal({ project, onClose }: DeepDiveModalProps) {
  const [copiedClone, setCopiedClone] = useState(false);
  const [activeTab, setActiveTab] = useState<'sandbox' | 'architecture' | 'code'>('sandbox');

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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 md:p-10 backdrop-blur-2xl bg-black/85 transition-all">
      {/* Backdrop click */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* Main Container */}
      <div
        className="relative z-10 w-full max-w-5xl max-h-[92vh] overflow-y-auto rounded-3xl bg-[#0a0e1a] border border-white/[0.12] shadow-2xl flex flex-col scrollbar-thin"
        style={{
          boxShadow: `0 0 60px -10px ${project.accentColor}30`,
        }}
      >
        {/* Header Bar */}
        <div className="sticky top-0 z-20 px-6 py-4 bg-[#0a0e1a]/95 backdrop-blur-md border-b border-white/[0.08] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span
              className="text-xs font-mono font-bold px-2.5 py-1 rounded-full text-white"
              style={{ backgroundColor: `${project.accentColor}35`, border: `1px solid ${project.accentColor}60` }}
            >
              PROJE {project.index} // {project.categoryLabel.toUpperCase()}
            </span>
            <h2 className="text-lg md:text-xl font-bold text-white tracking-tight">{project.title}</h2>
          </div>

          <div className="flex items-center gap-2">
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => sound.playTick()}
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/[0.06] hover:bg-white/[0.12] border border-white/10 text-xs font-mono text-white transition-colors"
            >
              <GitBranch className="w-3.5 h-3.5" />
              <span>GitHub</span>
              <ExternalLink className="w-3 h-3 text-slate-400" />
            </a>

            <button
              onClick={() => {
                sound.playTick();
                onClose();
              }}
              className="p-2 rounded-xl bg-white/[0.06] hover:bg-white/[0.12] border border-white/10 text-slate-300 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 md:p-8 space-y-8">
          {/* Top Banner: Image & Subtitle & Quick Actions */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            <div className="lg:col-span-5 relative rounded-2xl overflow-hidden border border-white/10 bg-black/50 group shadow-lg">
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-56 sm:h-64 object-cover object-top transition-transform duration-700 group-hover:scale-105"
                onError={(e) => {
                  (e.target as HTMLImageElement).src =
                    'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=1200&q=80';
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs font-mono text-white">
                <span className="px-2 py-0.5 rounded bg-black/70 backdrop-blur-md border border-white/20">
                  {project.badge}
                </span>
                <span className="text-slate-300">Yıl: {project.year}</span>
              </div>
            </div>

            <div className="lg:col-span-7 space-y-4">
              <div>
                <h3 className="text-xl md:text-2xl font-bold text-white mb-1.5">{project.subtitle}</h3>
                <p className="text-sm text-slate-300 leading-relaxed">{project.description}</p>
              </div>

              {/* Tech Stack Pills */}
              <div className="flex flex-wrap gap-1.5">
                {project.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="px-2.5 py-1 rounded-lg text-xs font-mono bg-white/[0.04] border border-white/[0.08] text-slate-200"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              {/* Clone Command */}
              <div className="flex items-center gap-2 p-2.5 rounded-xl bg-black/60 border border-white/10 font-mono text-xs">
                <Terminal className="w-4 h-4 text-slate-400 shrink-0" />
                <span className="text-slate-300 truncate select-all">{cloneCommand}</span>
                <button
                  onClick={copyClone}
                  className="ml-auto shrink-0 p-1.5 rounded-lg bg-white/[0.08] hover:bg-white/15 text-slate-300 hover:text-white transition-colors"
                  title="Klon Komutunu Kopyala"
                >
                  {copiedClone ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </div>
            </div>
          </div>

          {/* Interactive Navigation Tabs */}
          <div className="flex items-center gap-2 border-b border-white/[0.08] pb-3">
            <button
              onClick={() => {
                sound.playTick();
                setActiveTab('sandbox');
              }}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-mono font-semibold transition-all ${
                activeTab === 'sandbox'
                  ? 'bg-white/15 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white hover:bg-white/[0.05]'
              }`}
              style={activeTab === 'sandbox' ? { color: project.accentColor } : {}}
            >
              <Sparkles className="w-4 h-4" />
              <span>Canlı Simülatör & Laboratuvar</span>
            </button>

            <button
              onClick={() => {
                sound.playTick();
                setActiveTab('architecture');
              }}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-mono font-semibold transition-all ${
                activeTab === 'architecture'
                  ? 'bg-white/15 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white hover:bg-white/[0.05]'
              }`}
              style={activeTab === 'architecture' ? { color: project.accentColor } : {}}
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
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-mono font-semibold transition-all ${
                  activeTab === 'code'
                    ? 'bg-white/15 text-white shadow-sm'
                    : 'text-slate-400 hover:text-white hover:bg-white/[0.05]'
                }`}
                style={activeTab === 'code' ? { color: project.accentColor } : {}}
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
                <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400">ÖNE ÇIKAN MÜHENDİSLİK BAŞARILARI</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {project.highlights.map((h, i) => (
                    <div
                      key={i}
                      className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.06] text-xs text-slate-300 flex items-start gap-2.5"
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
              <div className="p-5 rounded-2xl bg-[#090d16] border border-white/[0.08] space-y-4">
                <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400">MİMARİ GENEL BAKIŞ</h4>
                <p className="text-sm text-slate-200 leading-relaxed">{project.architecture.overview}</p>

                {project.architecture.algorithmDetails && (
                  <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.06] font-mono text-xs text-slate-300">
                    <span className="text-slate-400 block mb-1">// Algoritmik Detay</span>
                    {project.architecture.algorithmDetails}
                  </div>
                )}

                {project.architecture.diagram && (
                  <div className="space-y-1.5">
                    <span className="text-[11px] font-mono text-slate-400">// Sistem Akış Boru Hattı Diyagramı</span>
                    <pre className="p-4 rounded-xl bg-black/70 border border-white/10 font-mono text-xs text-cyan-300/90 overflow-x-auto leading-relaxed">
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
                    className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.06] font-mono text-center"
                  >
                    <span className="text-[11px] text-slate-400 block mb-1">{m.label}</span>
                    <span className="text-sm font-bold text-white" style={{ color: project.accentColor }}>
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
              <div className="flex items-center justify-between text-xs font-mono text-slate-400">
                <span>// TypeScript / Algoritmik Uygulama</span>
                <span>Production Ready</span>
              </div>
              <pre className="p-5 rounded-2xl bg-black/80 border border-white/10 font-mono text-xs text-emerald-300 overflow-x-auto leading-relaxed">
                {project.architecture.codeSnippet}
              </pre>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
