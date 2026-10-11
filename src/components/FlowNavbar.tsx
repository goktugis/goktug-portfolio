import { Volume2, VolumeX, ExternalLink } from 'lucide-react';
import type { Project } from '../data/portfolioData';
import { sound } from '../utils/audio';

interface FlowNavbarProps {
  activeProject: Project;
  currentIndex: number;
  totalProjects: number;
  isMuted: boolean;
  onToggleMute: () => void;
}

export function FlowNavbar({
  activeProject,
  currentIndex,
  totalProjects,
  isMuted,
  onToggleMute,
}: FlowNavbarProps) {
  const progressPercent = ((currentIndex + 1) / totalProjects) * 100;

  return (
    <header className="fixed top-0 left-0 right-0 z-40 px-6 md:px-12 py-4 backdrop-blur-xl bg-[#0c0d10]/90 border-b border-white/[0.07] text-stone-100 transition-none select-none">
      <div className="max-w-[1700px] mx-auto flex items-center justify-between gap-4">
        {/* Left: Fixed Brand */}
        <div className="flex items-center gap-3">
          <div className="w-2 h-2 rounded-full bg-amber-400 shadow-[0_0_10px_rgba(251,191,36,0.6)]" />
          <div className="leading-tight">
            <span className="font-syne text-sm uppercase tracking-wider font-extrabold block text-white">
              GÖKTUĞ İŞERİ
            </span>
            <span className="font-mono text-[10px] tracking-widest text-stone-400 block">
              PROJECT EXHIBITION // 09 WORKS
            </span>
          </div>
        </div>

        {/* Center: Fixed Active Index & Clean Scrubber */}
        <div className="flex items-center gap-3 px-4 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.08] font-mono text-xs">
          <span className="text-stone-400">ESER:</span>
          <span className="font-bold text-white tracking-wider">
            [{activeProject.index} / 0{totalProjects}]
          </span>
          <div className="w-20 md:w-28 h-1 bg-white/10 rounded-full overflow-hidden hidden sm:block">
            <div
              className="h-full bg-gradient-to-r from-amber-400 to-amber-200 transition-all duration-500 ease-out rounded-full"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
          <span className="text-stone-300 font-syne font-semibold hidden md:inline truncate max-w-[140px]">
            {activeProject.title}
          </span>
        </div>

        {/* Right: Sound & GitHub */}
        <div className="flex items-center gap-3">
          <button
            onClick={onToggleMute}
            title={isMuted ? 'Sesi Aç' : 'Sesi Kapat'}
            className="p-2 rounded-full bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] text-stone-300 hover:text-white transition-colors"
          >
            {isMuted ? (
              <VolumeX className="w-4 h-4 text-stone-500" />
            ) : (
              <Volume2 className="w-4 h-4 text-amber-400" />
            )}
          </button>

          <a
            href="https://github.com/goktugis"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => sound.playTick()}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-mono font-medium bg-white/[0.06] hover:bg-white/[0.12] border border-white/12 text-white transition-all shadow-xs"
          >
            <span>GitHub</span>
            <ExternalLink className="w-3 h-3 opacity-60" />
          </a>
        </div>
      </div>
    </header>
  );
}
