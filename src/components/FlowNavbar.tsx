import { Volume2, VolumeX, Keyboard, ExternalLink, GalleryHorizontal, LayoutGrid, BookOpen } from 'lucide-react';
import { CATEGORIES, type Project } from '../data/portfolioData';
import { sound } from '../utils/audio';
import type { GalleryTheme } from './GalleryLighting';

export type ViewMode = 'stream' | 'galaxy' | 'stage3d';

interface FlowNavbarProps {
  activeProject: Project;
  selectedCategory: string;
  onSelectCategory: (catId: string) => void;
  viewMode: ViewMode;
  onChangeViewMode: (mode: ViewMode) => void;
  theme: GalleryTheme;
  onChangeTheme: (theme: GalleryTheme) => void;
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
  theme,
  onChangeTheme,
  isMuted,
  onToggleMute,
  onOpenShortcuts,
}: FlowNavbarProps) {
  const isLight = theme === 'linen';

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 px-4 md:px-8 py-3.5 backdrop-blur-xl border-b transition-colors duration-500 ${
        isLight
          ? 'bg-[#f6f4ef]/85 border-stone-300/80 text-stone-900'
          : theme === 'aluminum'
          ? 'bg-[#1a1b1f]/85 border-stone-700/80 text-stone-100'
          : 'bg-[#0e0f12]/85 border-white/[0.08] text-stone-100'
      }`}
    >
      <div className="max-w-[1700px] mx-auto flex items-center justify-between gap-4">
        {/* Left: Curator / Brand & Active Exhibit Stamp */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3">
            <div
              className="w-2.5 h-2.5 rounded-sm rotate-45 transition-colors duration-700"
              style={{ backgroundColor: activeProject.accentColor }}
            />
            <div className="leading-tight">
              <span className="font-syne text-xs uppercase tracking-wider font-extrabold block">
                GÖKTUĞ İŞERİ
              </span>
              <span className="font-mono text-[10px] tracking-widest text-stone-500 block">
                WORKS EXHIBITION // 09 PIECES
              </span>
            </div>
          </div>

          <div
            className={`hidden xl:flex items-center gap-2 px-3 py-1 rounded border text-[11px] font-mono tracking-wider ${
              isLight
                ? 'bg-stone-200/50 border-stone-300 text-stone-700'
                : 'bg-white/[0.03] border-white/10 text-stone-300'
            }`}
          >
            <span className="text-stone-500">SALON:</span>
            <span className="font-bold font-syne" style={{ color: activeProject.accentColor }}>
              [{activeProject.index}] {activeProject.title.toUpperCase()}
            </span>
          </div>
        </div>

        {/* Center: Curated Domain Categories */}
        <nav
          className={`hidden md:flex items-center gap-1 p-1 rounded-lg border shadow-xs ${
            isLight
              ? 'bg-stone-200/60 border-stone-300 text-stone-700'
              : 'bg-white/[0.03] border-white/[0.07] text-stone-300'
          }`}
        >
          {CATEGORIES.map((cat) => {
            const isActive = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => {
                  sound.playTick();
                  onSelectCategory(cat.id);
                }}
                className={`relative px-3 py-1 rounded text-xs font-medium transition-all duration-300 flex items-center gap-1.5 ${
                  isActive
                    ? isLight
                      ? 'bg-stone-900 text-white font-semibold shadow-xs'
                      : 'bg-white/15 text-white font-semibold shadow-xs'
                    : isLight
                    ? 'hover:text-stone-950 hover:bg-stone-300/60'
                    : 'text-stone-400 hover:text-white hover:bg-white/[0.04]'
                }`}
              >
                <span>{cat.label}</span>
                <span
                  className={`text-[10px] px-1 rounded font-mono ${
                    isActive
                      ? isLight
                        ? 'bg-stone-700 text-stone-100'
                        : 'bg-white/20 text-white'
                      : 'opacity-60'
                  }`}
                >
                  {cat.count}
                </span>
              </button>
            );
          })}
        </nav>

        {/* Right: Mood Palette + View Modes + Sound + GitHub */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Theme Palette Switcher */}
          <div
            className={`flex items-center p-0.5 rounded border text-[11px] font-mono ${
              isLight ? 'bg-stone-200/70 border-stone-300' : 'bg-white/[0.04] border-white/10'
            }`}
          >
            <button
              onClick={() => {
                sound.playTick();
                onChangeTheme('obsidian');
              }}
              title="Atelier Obsidiyen (Sıcak Koyu Karbon)"
              className={`px-2 py-0.5 rounded transition-all ${
                theme === 'obsidian'
                  ? 'bg-stone-800 text-stone-100 font-bold shadow-xs'
                  : 'text-stone-400 hover:text-stone-200'
              }`}
            >
              Obsidiyen
            </button>
            <button
              onClick={() => {
                sound.playTick();
                onChangeTheme('linen');
              }}
              title="Traverten & Keten (Sıcak Sanat Kitabı / Editorial)"
              className={`px-2 py-0.5 rounded transition-all ${
                theme === 'linen'
                  ? 'bg-stone-900 text-stone-100 font-bold shadow-xs'
                  : 'text-stone-400 hover:text-stone-700'
              }`}
            >
              Traverten
            </button>
            <button
              onClick={() => {
                sound.playTick();
                onChangeTheme('aluminum');
              }}
              title="Ham Alüminyum (Endüstriyel Dieter Rams)"
              className={`px-2 py-0.5 rounded transition-all ${
                theme === 'aluminum'
                  ? 'bg-stone-800 text-stone-100 font-bold shadow-xs'
                  : 'text-stone-400 hover:text-stone-200'
              }`}
            >
              Alüminyum
            </button>
          </div>

          {/* Exhibition View Mode Switcher */}
          <div
            className={`flex items-center p-0.5 rounded border ${
              isLight ? 'bg-stone-200/70 border-stone-300' : 'bg-white/[0.04] border-white/10'
            }`}
          >
            <button
              onClick={() => {
                sound.playModeSwitch();
                onChangeViewMode('stream');
              }}
              title="Galeri Yürüyüşü (Yatay Sergi)"
              className={`flex items-center gap-1 px-2.5 py-1 rounded text-xs transition-all ${
                viewMode === 'stream'
                  ? isLight
                    ? 'bg-stone-900 text-white font-semibold'
                    : 'bg-white/15 text-white font-semibold'
                  : 'text-stone-400 hover:text-stone-200'
              }`}
            >
              <GalleryHorizontal className="w-3.5 h-3.5" />
              <span className="hidden lg:inline text-[11px] font-mono">Yürüyüş</span>
            </button>

            <button
              onClick={() => {
                sound.playModeSwitch();
                onChangeViewMode('galaxy');
              }}
              title="Küratör Kat Planı (Mimari Şema)"
              className={`flex items-center gap-1 px-2.5 py-1 rounded text-xs transition-all ${
                viewMode === 'galaxy'
                  ? isLight
                    ? 'bg-stone-900 text-white font-semibold'
                    : 'bg-white/15 text-white font-semibold'
                  : 'text-stone-400 hover:text-stone-200'
              }`}
            >
              <LayoutGrid className="w-3.5 h-3.5" />
              <span className="hidden lg:inline text-[11px] font-mono">Kat Planı</span>
            </button>

            <button
              onClick={() => {
                sound.playModeSwitch();
                onChangeViewMode('stage3d');
              }}
              title="Sanat Monografisi (Dual Kitap Sayfası)"
              className={`flex items-center gap-1 px-2.5 py-1 rounded text-xs transition-all ${
                viewMode === 'stage3d'
                  ? isLight
                    ? 'bg-stone-900 text-white font-semibold'
                    : 'bg-white/15 text-white font-semibold'
                  : 'text-stone-400 hover:text-stone-200'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span className="hidden lg:inline text-[11px] font-mono">Monografi</span>
            </button>
          </div>

          {/* Sound Toggle */}
          <button
            onClick={onToggleMute}
            title={isMuted ? 'Galeri Sesini Aç' : 'Galeri Sesini Sustur'}
            className={`p-2 rounded border transition-colors ${
              isLight
                ? 'bg-stone-200/60 border-stone-300 text-stone-700 hover:text-stone-900'
                : 'bg-white/[0.04] border-white/10 text-stone-300 hover:text-white'
            }`}
          >
            {isMuted ? <VolumeX className="w-4 h-4 text-stone-500" /> : <Volume2 className="w-4 h-4 text-amber-500" />}
          </button>

          {/* Keyboard Shortcuts Help */}
          <button
            onClick={() => {
              sound.playTick();
              onOpenShortcuts();
            }}
            title="Klavye Kısayolları (?)"
            className={`hidden sm:flex p-2 rounded border transition-colors ${
              isLight
                ? 'bg-stone-200/60 border-stone-300 text-stone-700 hover:text-stone-900'
                : 'bg-white/[0.04] border-white/10 text-stone-300 hover:text-white'
            }`}
          >
            <Keyboard className="w-4 h-4" />
          </button>

          {/* GitHub Direct Link */}
          <a
            href="https://github.com/goktugis"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => sound.playTick()}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-mono font-medium border transition-all ${
              isLight
                ? 'bg-stone-900 text-white border-stone-900 hover:bg-stone-800'
                : 'bg-white/[0.06] hover:bg-white/[0.12] border-white/15 text-white'
            }`}
          >
            <span>GitHub</span>
            <ExternalLink className="w-3 h-3 opacity-70" />
          </a>
        </div>
      </div>
    </header>
  );
}
