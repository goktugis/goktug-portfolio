import React from 'react';
import { ArrowRight, Cpu, Terminal, Activity, Lock, GitBranch } from 'lucide-react';
import { sound } from '../utils/sound';
import { PROFILE_INFO } from '../data/portfolioData';
import confetti from 'canvas-confetti';

interface HeroProps {
  onOpenTerminal: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenTerminal }) => {
  const handleHireClick = () => {
    sound.playSuccess();
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.7 },
      colors: ['#6366f1', '#06b6d4', '#ec4899', '#a855f7'],
    });
  };

  return (
    <section className="relative min-h-screen pt-32 pb-20 flex flex-col justify-center items-center overflow-hidden">
      {/* Radial Atmospheric Background Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-indigo-600/15 rounded-full blur-[140px] pointer-events-none animate-pulse-glow" />
      <div className="absolute top-1/3 left-1/4 w-[400px] h-[400px] bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-[450px] h-[350px] bg-purple-600/10 rounded-full blur-[130px] pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center">
        
        {/* Status Chip */}
        <div 
          onMouseEnter={() => sound.playHover()}
          className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full glass-panel border border-cyan-500/20 text-xs text-slate-300 mb-8 shadow-inner shadow-cyan-500/10 hover:border-cyan-400/40 transition-colors"
        >
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
          </span>
          <span className="font-mono text-cyan-300 font-medium">ZERO-TRUST LLM ARCHITECTURE</span>
          <span className="text-slate-500">•</span>
          <span className="text-slate-400 hidden sm:inline">AUTONOMOUS DAG WORKFLOWS</span>
          <span className="text-slate-500 hidden sm:inline">•</span>
          <span className="text-indigo-400 font-mono">REACT 19</span>
        </div>

        {/* Hero Title */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight font-heading max-w-4xl leading-[1.1] mb-6">
          <span className="text-white">Geleceğin Yazılımını & </span>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-indigo-400 to-purple-400">
            Yapay Zeka Mimarilerini
          </span>
          <br className="hidden sm:inline" />
          <span className="text-white"> Sıfır Toleransla İnşa Ediyorum.</span>
        </h1>

        {/* Hero Subtitle */}
        <p className="max-w-2xl text-base sm:text-lg text-slate-300/90 leading-relaxed font-sans font-normal mb-10">
          Merhaba, ben <span className="text-white font-semibold">{PROFILE_INFO.name}</span>. 
          Otonom yapay zeka ajanları (<span className="text-cyan-400 font-mono">DAG</span>), kurumsal düzeyde <span className="text-indigo-400 font-mono">OWASP LLM Top 10</span> güvenlik duvarları, istemci taraflı kriptografi ve yüksek performanslı modern web ekosistemleri tasarlayan sistem geliştiricisiyim.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4 mb-16">
          <a
            href="#projects"
            onMouseEnter={() => sound.playHover()}
            onClick={() => sound.playClick()}
            className="group relative inline-flex items-center gap-2.5 px-7 py-3.5 rounded-xl bg-gradient-to-r from-indigo-600 via-purple-600 to-cyan-600 text-white font-semibold text-sm shadow-xl shadow-indigo-600/25 hover:shadow-indigo-600/40 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
          >
            <span>Projeleri Keşfet</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            <div className="absolute inset-0 rounded-xl bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
          </a>

          <a
            href="#algorithms"
            onMouseEnter={() => sound.playHover()}
            onClick={() => sound.playClick()}
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl glass-panel border border-white/10 hover:border-cyan-500/40 text-slate-200 hover:text-white font-medium text-sm transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
          >
            <Cpu className="w-4 h-4 text-cyan-400" />
            <span>Algoritma Laboratuvarı</span>
          </a>

          <button
            onClick={() => {
              handleHireClick();
              onOpenTerminal();
            }}
            onMouseEnter={() => sound.playHover()}
            className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl bg-indigo-950/40 border border-indigo-500/30 text-indigo-300 hover:bg-indigo-900/50 hover:text-white text-sm font-mono transition-all cursor-pointer"
          >
            <Terminal className="w-4 h-4 text-cyan-300" />
            <span>Terminal Aç [~]</span>
          </button>
        </div>

        {/* High-Tech HUD Metrics Strip */}
        <div className="w-full max-w-4xl grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 text-left">
          {PROFILE_INFO.stats.map((stat, idx) => (
            <div
              key={idx}
              onMouseEnter={() => sound.playHover()}
              className="glass-panel p-4 rounded-xl border border-white/5 hover:border-indigo-500/30 transition-all group relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-br from-indigo-500/10 to-transparent rounded-bl-full pointer-events-none" />
              <div className="text-2xl sm:text-3xl font-extrabold font-mono text-transparent bg-clip-text bg-gradient-to-r from-white via-indigo-100 to-cyan-300 mb-1">
                {stat.value}
              </div>
              <div className="text-xs text-slate-400 font-medium">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Live HUD System Telemetry Bar */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4 text-xs font-mono text-slate-400 bg-[#0d111b]/80 border border-white/5 rounded-full px-5 py-2">
          <div className="flex items-center gap-1.5">
            <Activity className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
            <span>CORE STATUS: <strong className="text-emerald-400">NOMINAL</strong></span>
          </div>
          <span className="text-slate-600 hidden sm:inline">|</span>
          <div className="flex items-center gap-1.5 hidden sm:flex">
            <Lock className="w-3.5 h-3.5 text-cyan-400" />
            <span>CRYPTO: <strong className="text-slate-200">AES-256-GCM / PBKDF2</strong></span>
          </div>
          <span className="text-slate-600 hidden sm:inline">|</span>
          <div className="flex items-center gap-1.5 hidden md:flex">
            <GitBranch className="w-3.5 h-3.5 text-purple-400" />
            <span>DAG ENGINE: <strong className="text-slate-200">KAHN TOPOLOGICAL O(V+E)</strong></span>
          </div>
        </div>

      </div>
    </section>
  );
};
