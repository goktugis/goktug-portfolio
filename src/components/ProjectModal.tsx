import React, { useState } from 'react';
import { X, ExternalLink, ShieldCheck, Copy, Check, Cpu, Layers, Terminal } from 'lucide-react';
import { GithubIcon } from './GithubIcon';
import type { Project } from '../data/portfolioData';
import { sound } from '../utils/sound';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  const [copied, setCopied] = useState(false);

  if (!project) return null;

  const handleCopyCode = () => {
    if (project.architecture.codeSnippet) {
      navigator.clipboard.writeText(project.architecture.codeSnippet);
      setCopied(true);
      sound.playSuccess();
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/80 backdrop-blur-xl animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-4xl my-auto bg-[#0a0d17] border border-white/10 rounded-2xl shadow-2xl shadow-indigo-950/50 overflow-hidden flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-[#0d1220]/90">
          <div className="flex items-center gap-3">
            <span className="px-2.5 py-1 rounded-md text-xs font-mono font-medium bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
              {project.categoryLabel}
            </span>
            <h3 className="text-lg font-bold font-heading text-white">{project.title}</h3>
          </div>

          <button
            onClick={() => {
              sound.playClick();
              onClose();
            }}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-8">
          
          {/* Main Visual Banner */}
          <div className="relative rounded-xl overflow-hidden border border-white/10 bg-black/50 group max-h-72">
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0d17] via-transparent to-transparent opacity-80" />
            
            <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
              <span className="text-xs font-mono px-3 py-1 rounded-full bg-black/70 backdrop-blur-md text-cyan-300 border border-cyan-500/30">
                {project.badge}
              </span>
              <span className="text-xs font-mono text-slate-300 bg-black/70 backdrop-blur-md px-2.5 py-1 rounded-full">
                {project.year}
              </span>
            </div>
          </div>

          {/* Subtitle & Description */}
          <div>
            <h4 className="text-xl font-bold text-white mb-2">{project.subtitle}</h4>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              {project.description}
            </p>
          </div>

          {/* Metrics Ribbon */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {project.architecture.metrics.map((m, idx) => (
              <div key={idx} className="p-3 rounded-xl bg-[#0f1424] border border-white/5">
                <div className="text-[11px] text-slate-400 font-mono mb-0.5">{m.label}</div>
                <div className="text-sm font-bold text-indigo-300 font-mono">{m.value}</div>
              </div>
            ))}
          </div>

          {/* Highlights */}
          <div>
            <h5 className="text-sm font-bold font-mono text-cyan-400 uppercase tracking-wider mb-3 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4" />
              Öne Çıkan Mühendislik Yetenekleri
            </h5>
            <ul className="space-y-2">
              {project.highlights.map((h, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-2 shrink-0" />
                  <span>{h}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Architecture & Formula */}
          {project.architecture.algorithmDetails && (
            <div className="bg-[#0f1424] border border-indigo-500/20 rounded-xl p-5">
              <h5 className="text-xs font-mono font-bold text-indigo-300 uppercase tracking-wider mb-2 flex items-center gap-2">
                <Cpu className="w-4 h-4" />
                Algoritmik & Matematiksel Temel
              </h5>
              <p className="text-xs sm:text-sm text-slate-300 font-mono leading-relaxed">
                {project.architecture.algorithmDetails}
              </p>
            </div>
          )}

          {/* Diagram */}
          {project.architecture.diagram && (
            <div>
              <h5 className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-2">
                <Layers className="w-4 h-4 text-purple-400" />
                Sistem Akış Şeması
              </h5>
              <pre className="p-4 rounded-xl bg-black/60 border border-white/10 text-[11px] sm:text-xs font-mono text-cyan-300 overflow-x-auto leading-relaxed">
                {project.architecture.diagram}
              </pre>
            </div>
          )}

          {/* Code Snippet */}
          {project.architecture.codeSnippet && (
            <div>
              <div className="flex items-center justify-between mb-2">
                <h5 className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2">
                  <Terminal className="w-4 h-4 text-indigo-400" />
                  Kaynak Kod / İmplementasyon Kesiti
                </h5>
                <button
                  onClick={handleCopyCode}
                  className="flex items-center gap-1.5 text-xs font-mono text-slate-400 hover:text-white px-2 py-1 rounded bg-white/5 border border-white/10 transition-colors cursor-pointer"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? 'Kopyalandı' : 'Kopyala'}</span>
                </button>
              </div>
              <pre className="p-4 rounded-xl bg-[#05070c] border border-white/10 text-xs font-mono text-emerald-400 overflow-x-auto">
                {project.architecture.codeSnippet}
              </pre>
            </div>
          )}

          {/* Tech Stack Badges */}
          <div>
            <h5 className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider mb-2.5">
              Kullanılan Teknolojiler
            </h5>
            <div className="flex flex-wrap gap-2">
              {project.techStack.map((tech, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-1 rounded-lg text-xs font-mono bg-white/5 border border-white/10 text-slate-200"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

        </div>

        {/* Footer Actions */}
        <div className="px-6 py-4 border-t border-white/10 bg-[#0d1220]/90 flex items-center justify-between">
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => sound.playClick()}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-white font-semibold text-xs transition-colors cursor-pointer"
          >
            <GithubIcon className="w-4 h-4" />
            <span>GitHub Deposuna Git</span>
            <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
          </a>

          <button
            onClick={() => {
              sound.playClick();
              onClose();
            }}
            className="px-4 py-2 rounded-xl text-xs font-medium text-slate-400 hover:text-white transition-colors cursor-pointer"
          >
            Kapat
          </button>
        </div>

      </div>
    </div>
  );
};
