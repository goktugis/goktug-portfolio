import { useState, useEffect, useCallback } from 'react';
import { PROJECTS, type Project } from './data/portfolioData';
import { GalleryLighting } from './components/GalleryLighting';
import { FlowNavbar } from './components/FlowNavbar';
import { HorizonStreamView } from './components/HorizonStreamView';
import { FilmstripDock } from './components/FilmstripDock';
import { DeepDiveModal } from './components/DeepDiveModal';
import { sound } from './utils/audio';

export function App() {
  const [activeProjectId, setActiveProjectId] = useState<string>(PROJECTS[0].id);
  const [expandedProject, setExpandedProject] = useState<Project | null>(null);
  const [isMuted, setIsMuted] = useState(sound.getMuted());

  const currentIndex = PROJECTS.findIndex((p) => p.id === activeProjectId);
  const activeProject = PROJECTS[currentIndex] || PROJECTS[0];

  const handleSelectProject = useCallback((project: Project) => {
    setActiveProjectId(project.id);
  }, []);

  const handleToggleMute = useCallback(() => {
    const muted = sound.toggleMute();
    setIsMuted(muted);
  }, []);

  // Keyboard navigation & Esc to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore if typing inside input / textarea
      const target = e.target as HTMLElement;
      if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA') {
        if (e.key === 'Escape' && expandedProject) {
          setExpandedProject(null);
        }
        return;
      }

      if (e.key === 'Escape') {
        if (expandedProject) setExpandedProject(null);
        return;
      }

      if (e.key === 'm' || e.key === 'M') {
        handleToggleMute();
        return;
      }

      // Space or Enter on active card expands to fullscreen
      if ((e.key === ' ' || e.key === 'Enter') && !expandedProject) {
        e.preventDefault();
        sound.playInspect();
        setExpandedProject(activeProject);
        return;
      }

      // Arrow navigation
      if (!expandedProject) {
        if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') {
          e.preventDefault();
          if (currentIndex < PROJECTS.length - 1) {
            sound.playTransition();
            setActiveProjectId(PROJECTS[currentIndex + 1].id);
          }
        }

        if (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A') {
          e.preventDefault();
          if (currentIndex > 0) {
            sound.playTransition();
            setActiveProjectId(PROJECTS[currentIndex - 1].id);
          }
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex, activeProject, expandedProject, handleToggleMute]);

  return (
    <div className="relative min-h-screen bg-[#090a0d] text-stone-100 overflow-x-hidden selection:bg-amber-500/30 selection:text-amber-200">
      {/* Fixed Ambient Gallery Lighting Canvas */}
      <GalleryLighting activeProject={activeProject} />

      {/* App Shell */}
      <div className="relative z-10 flex flex-col min-h-screen">
        {/* Fixed, Stable Top Navbar */}
        <FlowNavbar
          activeProject={activeProject}
          currentIndex={currentIndex}
          totalProjects={PROJECTS.length}
          isMuted={isMuted}
          onToggleMute={handleToggleMute}
        />

        {/* Main Kinetic Exhibition Runway */}
        <main className="flex-1 flex flex-col justify-center pt-20 pb-20">
          <HorizonStreamView
            projects={PROJECTS}
            activeProject={activeProject}
            onSelectProject={handleSelectProject}
            onExpandProject={(proj) => setExpandedProject(proj)}
          />
        </main>

        {/* Bottom Filmstrip Dock */}
        <FilmstripDock
          projects={PROJECTS}
          activeProject={activeProject}
          onSelectProject={handleSelectProject}
        />
      </div>

      {/* Fullscreen Expansion Animated Modal */}
      <DeepDiveModal
        project={expandedProject}
        onClose={() => setExpandedProject(null)}
      />
    </div>
  );
}

export default App;
