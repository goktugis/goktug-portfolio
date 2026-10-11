import { useState, useEffect } from 'react';
import { X, ExternalLink, GitBranch, Check, Copy, Layers, Code, Terminal, Sparkles } from 'lucide-react';
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
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (project) {
      sound.playInspect();
      setActiveTab('sandbox');
      // Slower, cinematic entrance
      const timer = setTimeout(() => setIsVisible(true), 30);
      return () => clearTimeout(timer);
    } else {
      setIsVisible(false);
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

  const handleClose = () => {
    sound.playTick();
    setIsVisible(false);
    setTimeout(onClose, 450);
  };

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center p-0 md:p-6 backdrop-blur-3xl bg-black/85 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
        isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}
    >
      {/* Backdrop click */}
      <div className="absolute inset-0" onClick={handleClose} />

      {/* Fullscreen Expansion Monolith Window */}
      <div
        className={`relative z-10 w-full h-full max-w-[1600px] max-h-screen md:max-h-[96vh] rounded-none md:rounded-3xl border-0 md:border border-amber-400/20 bg-[#0e0f15]/95 text-stone-100 shadow-[0_0_100px_rgba(0,0,0,0.98)] flex flex-col overflow-hidden transform transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          isVisible ? 'scale-100 translate-y-0 opacity-100' : 'scale-90 translate-y-12 opacity-0'
        }`}
      >
        {/* Fixed Header Bar */}
        <div className="shrink-0 px-6 md:px-10 py-4.5 bg-[#12141c] border-b border-white/[0.08] flex items-center justify-between">
          <div className="flex items-center gap-3 md:gap-4">
            <span
              className="text-xs font-mono font-bold px-3 py-1 rounded-full text-amber-200"
              style={{
                backgroundColor: `${project.accentColor}25`,
                border: `1px solid ${project.accentColor}50`,
              }}
            >
              FOLIO [{project.index}] // {project.categoryLabel.toUpperCase()}
            </span>
            <h2 className="font-syne text-xl md:text-2xl font-extrabold tracking-tight text-white">
              {project.title}
            </h2>
          </div>

          <div className="flex items-center gap-3">
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => sound.playTick()}
              className="hidden sm:flex items-center gap-1.5 px-4 py-2 rounded-full bg-white/[0.06] hover:bg-white/12 border border-white/10 text-xs font-mono text-white transition-colors"
            >
              <GitBranch className="w-3.5 h-3.5 text-amber-400" />
              <span>GitHub</span>
              <ExternalLink className="w-3 h-3 opacity-60" />
            </a>

            <button
              onClick={handleClose}
              className="px-4 py-2 rounded-full bg-gradient-to-r from-amber-200 to-amber-100 hover:from-white hover:to-amber-200 text-stone-950 text-xs font-mono font-extrabold transition-all duration-300 flex items-center gap-2 shadow-lg group"
            >
              <span>KAPAT</span>
              <X className="w-4 h-4 group-hover:rotate-90 transition-transform duration-300" />
            </button>
          </div>
        </div>

        {/* Scrollable Exhibition Content */}
        <div className="flex-1 overflow-y-auto p-6 md:p-10 space-y-10 scrollbar-thin">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            {/* Left Column: Narrative, Visual & Highlights */}
            <div
              className={`lg:col-span-5 space-y-6 transition-all duration-700 delay-100 ease-out ${
                isVisible ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
              }`}
            >
              {/* Artwork Visual */}
              <div className="relative rounded-2xl overflow-hidden border border-white/10 bg-black/60 shadow-2xl group">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-64 sm:h-80 object-cover object-top transition-transform duration-1000 group-hover:scale-104"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src =
                      'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=1200&q=80';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-xs font-mono text-white">
                  <span className="px-2.5 py-1 rounded bg-black/70 backdrop-blur-md border border-white/20 text-amber-200">
                    {project.badge}
                  </span>
                  <span className="text-stone-300 font-bold">Yıl: {project.year}</span>
                </div>
              </div>

              {/* Title & Narrative Description */}
              <div className="space-y-2.5">
                <h3 className="font-syne text-2xl font-bold text-white tracking-tight">
                  {project.subtitle}
                </h3>
                <p className="text-sm text-stone-300 leading-relaxed font-sans">
                  {project.description}
                </p>
              </div>

              {/* Engineering Highlights */}
              <div className="space-y-3 pt-3 border-t border-white/[0.08]">
                <h4 className="text-xs font-mono uppercase tracking-wider text-amber-300 font-bold">
                  ÖNE ÇIKAN MÜHENDİSLİK ÖZELLİKLERİ
                </h4>
                <div className="space-y-2">
                  {project.highlights.map((h, i) => (
                    <div
                      key={i}
                      className="p-3.5 rounded-xl bg-white/[0.03] border border-white/[0.06] text-xs text-stone-300 flex items-start gap-3"
                    >
                      <span
                        className="w-1.5 h-1.5 rounded-full mt-1.5 shrink-0 shadow-xs"
                        style={{ backgroundColor: project.accentColor }}
                      />
                      <span className="leading-relaxed">{h}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tech Stack Pills */}
              <div className="space-y-2 pt-2 border-t border-white/[0.08]">
                <h4 className="text-xs font-mono uppercase tracking-wider text-stone-400">
                  TEKNOLOJİ YIĞINI & KÜTÜPHANELER
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {project.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="px-2.5 py-1 rounded-lg text-xs font-mono bg-white/[0.04] border border-white/[0.08] text-stone-200"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Terminal Clone Command */}
              <div className="flex items-center gap-2 p-3 rounded-xl bg-black/60 border border-white/10 font-mono text-xs">
                <Terminal className="w-4 h-4 text-amber-400 shrink-0" />
                <span className="text-stone-300 truncate select-all">{cloneCommand}</span>
                <button
                  onClick={copyClone}
                  className="ml-auto shrink-0 p-1.5 rounded-lg bg-white/[0.08] hover:bg-white/15 text-stone-300 hover:text-white transition-colors"
                  title="Klon Komutunu Kopyala"
                >
                  {copiedClone ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </div>
            </div>

            {/* Right Column: Live Interactive Sandbox & Blueprint */}
            <div
              className={`lg:col-span-7 space-y-6 transition-all duration-700 delay-200 ease-out ${
                isVisible ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
              }`}
            >
              {/* Tab Navigation */}
              <div className="flex items-center gap-2 border-b border-white/[0.08] pb-3">
                <button
                  onClick={() => {
                    sound.playTick();
                    setActiveTab('sandbox');
                  }}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all ${
                    activeTab === 'sandbox'
                      ? 'bg-amber-300 text-stone-950 shadow-md'
                      : 'text-stone-400 hover:text-white hover:bg-white/[0.05]'
                  }`}
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Canlı İnteraktif Simülatör</span>
                </button>

                <button
                  onClick={() => {
                    sound.playTick();
                    setActiveTab('architecture');
                  }}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all ${
                    activeTab === 'architecture'
                      ? 'bg-amber-300 text-stone-950 shadow-md'
                      : 'text-stone-400 hover:text-white hover:bg-white/[0.05]'
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
                    className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all ${
                      activeTab === 'code'
                        ? 'bg-amber-300 text-stone-950 shadow-md'
                        : 'text-stone-400 hover:text-white hover:bg-white/[0.05]'
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
                  {/* Sandbox Execution Station */}
                  <ProjectLiveSandbox project={project} />

                  {/* Benchmark & Verification Metrics */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
                    {project.architecture.metrics.map((m, i) => (
                      <div
                        key={i}
                        className="p-4 rounded-xl bg-white/[0.03] border border-white/[0.08] font-mono text-center"
                      >
                        <span className="text-[11px] text-stone-400 block mb-1">{m.label}</span>
                        <span className="text-sm font-bold text-amber-200" style={{ color: project.accentColor }}>
                          {m.value}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Tab 2: Architectural Overview & Pipeline */}
              {activeTab === 'architecture' && (
                <div className="space-y-6">
                  <div className="p-6 rounded-2xl bg-[#0a0c12] border border-white/[0.08] space-y-4">
                    <h4 className="text-xs font-mono uppercase tracking-wider text-amber-300 font-bold">
                      MİMARİ GENEL BAKIŞ
                    </h4>
                    <p className="text-sm text-stone-200 leading-relaxed font-sans">
                      {project.architecture.overview}
                    </p>

                    {project.architecture.algorithmDetails && (
                      <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06] font-mono text-xs text-stone-300">
                        <span className="text-amber-300 block mb-1 font-bold">// Algoritmik Detay</span>
                        {project.architecture.algorithmDetails}
                      </div>
                    )}

                    {project.architecture.diagram && (
                      <div className="space-y-1.5">
                        <span className="text-[11px] font-mono text-stone-400">// Sistem Akış Boru Hattı Diyagramı</span>
                        <pre className="p-5 rounded-xl bg-black/80 border border-white/10 font-mono text-xs text-cyan-200/95 overflow-x-auto leading-relaxed">
                          {project.architecture.diagram}
                        </pre>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Tab 3: Code Snippet */}
              {activeTab === 'code' && project.architecture.codeSnippet && (
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-xs font-mono text-stone-400">
                    <span>// TypeScript / Algoritmik Uygulama</span>
                    <span>Production Ready</span>
                  </div>
                  <pre className="p-6 rounded-2xl bg-black/90 border border-white/10 font-mono text-xs text-emerald-300 overflow-x-auto leading-relaxed">
                    {project.architecture.codeSnippet}
                  </pre>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
