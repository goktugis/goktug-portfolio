import { useState, useEffect, useMemo, useCallback } from 'react';
import { PROJECTS, type Project } from './data/portfolioData';
import { DynamicAuraBackground } from './components/DynamicAuraBackground';
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

  return (
    <div className="relative min-h-screen bg-[#07090e] text-slate-100 selection:bg-indigo-500/30 selection:text-indigo-200 overflow-x-hidden font-sans">
      {/* Dynamic Chromatic Aura & Particle Canvas Background */}
      <DynamicAuraBackground activeProject={activeProject} />

      {/* Cyber Grid Texture Overlay */}
      <div className="fixed inset-0 bg-cyber-grid pointer-events-none opacity-25 z-0" />

      {/* App Shell */}
      <div className="relative z-10 flex flex-col min-h-screen">
        {/* Top HUD Navbar */}
        <FlowNavbar
          activeProject={activeProject}
          selectedCategory={selectedCategory}
          onSelectCategory={(catId) => {
            setSelectedCategory(catId);
          }}
          viewMode={viewMode}
          onChangeViewMode={(mode) => setViewMode(mode)}
          isMuted={isMuted}
          onToggleMute={handleToggleMute}
          onOpenShortcuts={() => setIsShortcutsOpen(true)}
        />

        {/* Main Stage Runway */}
        <main className="flex-1 flex flex-col justify-center pt-16 pb-20">
          {viewMode === 'stream' && (
            <HorizonStreamView
              projects={filteredProjects}
              activeProject={activeProject}
              onSelectProject={handleSelectProject}
              onInspectProject={(proj) => setInspectProject(proj)}
            />
          )}

          {viewMode === 'galaxy' && (
            <GalaxyMapView
              projects={filteredProjects}
              activeProject={activeProject}
              onSelectProject={handleSelectProject}
              onInspectProject={(proj) => setInspectProject(proj)}
            />
          )}

          {viewMode === 'stage3d' && (
            <Stage3DView
              projects={filteredProjects}
              activeProject={activeProject}
              onSelectProject={handleSelectProject}
              onInspectProject={(proj) => setInspectProject(proj)}
            />
          )}
        </main>

        {/* Bottom Floating Filmstrip Dock HUD */}
        <FilmstripDock
          projects={filteredProjects}
          activeProject={activeProject}
          onSelectProject={handleSelectProject}
          onInspectActive={() => setInspectProject(activeProject)}
        />
      </div>

      {/* Deep Dive Holographic Modal */}
      <DeepDiveModal
        project={inspectProject}
        onClose={() => setInspectProject(null)}
      />

      {/* Keyboard Shortcuts Guide Modal */}
      <ShortcutsModal
        isOpen={isShortcutsOpen}
        onClose={() => setIsShortcutsOpen(false)}
      />
    </div>
  );
}

export default App;
