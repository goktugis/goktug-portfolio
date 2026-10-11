import { useState, useEffect, useMemo, useCallback } from 'react';
import { PROJECTS, type Project } from './data/portfolioData';
import { GalleryLighting, type GalleryTheme } from './components/GalleryLighting';
import { FlowNavbar, type ViewMode } from './components/FlowNavbar';
import { HorizonStreamView } from './components/HorizonStreamView';
import { GalaxyMapView } from './components/GalaxyMapView';
import { Stage3DView } from './components/Stage3DView';
import { FilmstripDock } from './components/FilmstripDock';
import { DeepDiveModal } from './components/DeepDiveModal';
import { ShortcutsModal } from './components/ShortcutsModal';
import { sound } from './utils/audio';

export function App() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [viewMode, setViewMode] = useState<ViewMode>('stream');
  const [theme, setTheme] = useState<GalleryTheme>('obsidian');
  const [activeProjectId, setActiveProjectId] = useState<string>(PROJECTS[0].id);
  const [inspectProject, setInspectProject] = useState<Project | null>(null);
  const [isShortcutsOpen, setIsShortcutsOpen] = useState(false);
  const [isMuted, setIsMuted] = useState(sound.getMuted());

  // Filtered projects list based on category
  const filteredProjects = useMemo(() => {
    if (selectedCategory === 'all') return PROJECTS;
    return PROJECTS.filter((p) => p.category === selectedCategory);
  }, [selectedCategory]);

  // Ensure activeProject is valid within filtered list
  const activeProject = useMemo(() => {
    const found = filteredProjects.find((p) => p.id === activeProjectId);
    return found || filteredProjects[0] || PROJECTS[0];
  }, [filteredProjects, activeProjectId]);

  const handleSelectProject = useCallback((project: Project) => {
    setActiveProjectId(project.id);
  }, []);

  const handleToggleMute = useCallback(() => {
    const muted = sound.toggleMute();
    setIsMuted(muted);
  }, []);

  // Keyboard navigation & shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore if typing inside input / textarea
      const target = e.target as HTMLElement;
      if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA') {
        if (e.key === 'Escape' && inspectProject) {
          setInspectProject(null);
        }
        return;
      }

      if (e.key === 'Escape') {
        if (inspectProject) setInspectProject(null);
        if (isShortcutsOpen) setIsShortcutsOpen(false);
        return;
      }

      if (e.key === '?' || (e.shiftKey && e.key === '/')) {
        e.preventDefault();
        sound.playTick();
        setIsShortcutsOpen((prev) => !prev);
        return;
      }

      if (e.key === 'm' || e.key === 'M') {
        handleToggleMute();
        return;
      }

      if (e.key === 'v' || e.key === 'V') {
        e.preventDefault();
        sound.playModeSwitch();
        setViewMode((prev) => {
          if (prev === 'stream') return 'galaxy';
          if (prev === 'galaxy') return 'stage3d';
          return 'stream';
        });
        return;
      }

      // Space or Enter opens deep dive
      if ((e.key === ' ' || e.key === 'Enter') && !inspectProject && !isShortcutsOpen) {
        e.preventDefault();
        sound.playInspect();
        setInspectProject(activeProject);
        return;
      }

      // Arrow navigation
      const currIdx = filteredProjects.findIndex((p) => p.id === activeProject.id);

      if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') {
        e.preventDefault();
        if (currIdx < filteredProjects.length - 1) {
          sound.playTransition();
          setActiveProjectId(filteredProjects[currIdx + 1].id);
        }
      }

      if (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A') {
        e.preventDefault();
        if (currIdx > 0) {
          sound.playTransition();
          setActiveProjectId(filteredProjects[currIdx - 1].id);
        }
      }

      // Number keys 1-9
      if (e.key >= '1' && e.key <= '9') {
        const targetIdx = parseInt(e.key, 10) - 1;
        if (targetIdx < filteredProjects.length) {
          e.preventDefault();
          sound.playTransition();
          setActiveProjectId(filteredProjects[targetIdx].id);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [
    activeProject,
    filteredProjects,
    inspectProject,
    isShortcutsOpen,
    handleToggleMute,
  ]);

  const rootBgClass =
    theme === 'linen'
      ? 'bg-[#f6f4ef] text-stone-900 selection:bg-stone-900 selection:text-white'
      : theme === 'aluminum'
      ? 'bg-[#191a1e] text-stone-100 selection:bg-amber-500/30 selection:text-amber-200'
      : 'bg-[#0e0f12] text-stone-100 selection:bg-stone-100/20 selection:text-white';

  return (
    <div className={`relative min-h-screen ${rootBgClass} overflow-x-hidden transition-colors duration-700`}>
      {/* Architectural Gallery Lighting Canvas & Floor Texture */}
      <GalleryLighting activeProject={activeProject} theme={theme} />

      {/* App Shell */}
      <div className="relative z-10 flex flex-col min-h-screen">
        {/* Top Curator Navbar */}
        <FlowNavbar
          activeProject={activeProject}
          selectedCategory={selectedCategory}
          onSelectCategory={(catId) => {
            setSelectedCategory(catId);
          }}
          viewMode={viewMode}
          onChangeViewMode={(mode) => setViewMode(mode)}
          theme={theme}
          onChangeTheme={(t) => setTheme(t)}
          isMuted={isMuted}
          onToggleMute={handleToggleMute}
          onOpenShortcuts={() => setIsShortcutsOpen(true)}
        />

        {/* Main Exhibition Promenade / Floorplan / Monograph */}
        <main className="flex-1 flex flex-col justify-center pt-16 pb-20">
          {viewMode === 'stream' && (
            <HorizonStreamView
              projects={filteredProjects}
              activeProject={activeProject}
              onSelectProject={handleSelectProject}
              onInspectProject={(proj) => setInspectProject(proj)}
              theme={theme}
            />
          )}

          {viewMode === 'galaxy' && (
            <GalaxyMapView
              projects={filteredProjects}
              activeProject={activeProject}
              onSelectProject={handleSelectProject}
              onInspectProject={(proj) => setInspectProject(proj)}
              theme={theme}
            />
          )}

          {viewMode === 'stage3d' && (
            <Stage3DView
              projects={filteredProjects}
              activeProject={activeProject}
              onSelectProject={handleSelectProject}
              onInspectProject={(proj) => setInspectProject(proj)}
              theme={theme}
            />
          )}
        </main>

        {/* Bottom Curatorial Tape & Filmstrip Dock */}
        <FilmstripDock
          projects={filteredProjects}
          activeProject={activeProject}
          onSelectProject={handleSelectProject}
          onInspectActive={() => setInspectProject(activeProject)}
          theme={theme}
        />
      </div>

      {/* Deep Dive Exhibition Vitrine Modal */}
      <DeepDiveModal
        project={inspectProject}
        onClose={() => setInspectProject(null)}
        theme={theme}
      />

      {/* Keyboard Shortcuts Modal */}
      <ShortcutsModal
        isOpen={isShortcutsOpen}
        onClose={() => setIsShortcutsOpen(false)}
        theme={theme}
      />
    </div>
  );
}

export default App;
