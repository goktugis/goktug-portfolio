import { Sparkles, Compass, Box, Volume2, VolumeX, Keyboard, ExternalLink } from 'lucide-react';
import { CATEGORIES, type Project } from '../data/portfolioData';
import { sound } from '../utils/audio';

export type ViewMode = 'stream' | 'galaxy' | 'stage3d';

interface FlowNavbarProps {
  activeProject: Project;
  selectedCategory: string;
  onSelectCategory: (catId: string) => void;
  viewMode: ViewMode;
  onChangeViewMode: (mode: ViewMode) => void;
  isMuted: boolean;
  onToggleMute: () => void;
  onOpenShortcuts: () => void;
}

export function FlowNavbar({
  activeProject,
  selectedCategory,
  onSelectCategory,
  viewMode,
  onChangeViewMode,
  isMuted,
  onToggleMute,
  onOpenShortcuts,
}: FlowNavbarProps) {
  return (
    <header className="fixed top-0 left-0 right-0 z-40 px-4 md:px-8 py-3 backdrop-blur-xl bg-[#07090e]/75 border-b border-white/[0.07] transition-all">
      <div className="max-w-[1700px] mx-auto flex items-center justify-between gap-4">
        {/* Left: Brand & Active Project Status */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2.5">
            <div
              className="w-3 h-3 rounded-full transition-colors duration-700 animate-pulse"
              style={{ backgroundColor: activeProject.accentColor, boxShadow: `0 0 14px ${activeProject.accentColor}` }}
            />
            <span className="font-mono text-xs uppercase tracking-widest text-slate-300 font-semibold hidden sm:inline">
              WORKS <span className="text-slate-600">//</span> GÖKTUĞ İŞERİ
            </span>
          </div>

          <div className="hidden lg:flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.03] border border-white/[0.08] text-[11px] font-mono">
            <span className="text-slate-500">ODAK:</span>
            <span
              className="font-bold tracking-wider transition-colors duration-500"
              style={{ color: activeProject.accentColor }}
            >
              {activeProject.index} // {activeProject.title.toUpperCase()}
            </span>
          </div>
        </div>

        {/* Center: Category Filters */}
        <nav className="hidden md:flex items-center gap-1.5 p-1 rounded-full bg-[#0d121f]/80 border border-white/[0.06] shadow-inner">
          {CATEGORIES.map((cat) => {
            const isActive = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => {
                  sound.playTick();
                  onSelectCategory(cat.id);
                }}
                className={`relative px-3 py-1 rounded-full text-xs font-medium transition-all duration-300 flex items-center gap-1.5 ${
                  isActive
                    ? 'text-white shadow-sm'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-white/[0.04]'
                }`}
                style={
                  isActive
                    ? {
                        backgroundColor: `${activeProject.accentColor}25`,
                        borderColor: `${activeProject.accentColor}60`,
                        borderWidth: 1,
                        color: '#ffffff',
                      }
                    : {}
                }
              >
                <span>{cat.label}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
                    isActive ? 'bg-white/20 text-white' : 'bg-white/[0.06] text-slate-400'
                  }`}
                >
                  {cat.count}
                </span>
              </button>
            );
          })}
        </nav>

        {/* Right: View Mode Selector & Sound & Shortcuts & GitHub */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Mode Switcher */}
          <div className="flex items-center p-1 rounded-full bg-[#0d121f] border border-white/[0.08]">
            <button
              onClick={() => {
                sound.playModeSwitch();
                onChangeViewMode('stream');
              }}
              title="Horizon Akış (Yatay Sergi)"
              className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-xs transition-all ${
                viewMode === 'stream'
                  ? 'bg-white/15 text-white shadow font-medium'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span className="hidden xl:inline">Akış</span>
            </button>

            <button
              onClick={() => {
                sound.playModeSwitch();
                onChangeViewMode('galaxy');
              }}
              title="Galaksi Ağ Haritası (Uzamsal Düğüm Haritası)"
              className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-xs transition-all ${
                viewMode === 'galaxy'
                  ? 'bg-white/15 text-white shadow font-medium'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Compass className="w-3.5 h-3.5" />
              <span className="hidden xl:inline">Galaksi</span>
            </button>

            <button
              onClick={() => {
                sound.playModeSwitch();
                onChangeViewMode('stage3d');
              }}
              title="3D Boyutlu Sahne"
              className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-xs transition-all ${
                viewMode === 'stage3d'
                  ? 'bg-white/15 text-white shadow font-medium'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Box className="w-3.5 h-3.5" />
              <span className="hidden xl:inline">3D</span>
            </button>
          </div>

          {/* Sound Toggle */}
          <button
            onClick={onToggleMute}
            title={isMuted ? 'Sesi Aç (Web Audio)' : 'Sesi Kapat'}
            className="p-2 rounded-full bg-white/[0.04] border border-white/[0.08] text-slate-300 hover:text-white hover:bg-white/[0.08] transition-colors"
          >
            {isMuted ? <VolumeX className="w-4 h-4 text-slate-500" /> : <Volume2 className="w-4 h-4 text-emerald-400" />}
          </button>

          {/* Keyboard Help */}
          <button
            onClick={() => {
              sound.playTick();
              onOpenShortcuts();
            }}
            title="Klavye Kısayolları (?)"
            className="hidden sm:flex p-2 rounded-full bg-white/[0.04] border border-white/[0.08] text-slate-300 hover:text-white hover:bg-white/[0.08] transition-colors"
          >
            <Keyboard className="w-4 h-4" />
          </button>

          {/* GitHub Link */}
          <a
            href="https://github.com/goktugis"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => sound.playTick()}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-mono font-medium bg-white/[0.06] hover:bg-white/[0.12] border border-white/[0.12] text-white transition-all shadow-sm"
          >
            <span className="hidden sm:inline">github</span>
            <ExternalLink className="w-3 h-3 text-slate-400" />
          </a>
        </div>
      </div>
    </header>
  );
}
