import { useState, useEffect } from 'react';
import { CyberBackground } from './components/CyberBackground';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { InteractivePlayground } from './components/InteractivePlayground';
import { ProjectsSection } from './components/ProjectsSection';
import { TechStackSection } from './components/TechStackSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { ProjectModal } from './components/ProjectModal';
import { TerminalModal } from './components/TerminalModal';
import type { Project } from './data/portfolioData';

export function App() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isTerminalOpen, setIsTerminalOpen] = useState(false);

  // Keyboard shortcut listener for terminal (~ key)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === '`' || e.key === '~') {
        e.preventDefault();
        setIsTerminalOpen((prev) => !prev);
      }
      if (e.key === 'Escape') {
        if (selectedProject) setSelectedProject(null);
        if (isTerminalOpen) setIsTerminalOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedProject, isTerminalOpen]);

  return (
    <div className="relative min-h-screen bg-[#07090e] text-slate-100 selection:bg-indigo-500/30 selection:text-indigo-200">
      {/* Interactive Background Canvas */}
      <CyberBackground />

      {/* Cyber Grid Pattern Overlay */}
      <div className="fixed inset-0 bg-cyber-grid pointer-events-none opacity-40 z-0" />

      {/* App Container */}
      <div className="relative z-10 flex flex-col min-h-screen">
        <Navbar onOpenTerminal={() => setIsTerminalOpen(true)} />

        <main className="flex-1">
          <Hero onOpenTerminal={() => setIsTerminalOpen(true)} />
          <InteractivePlayground />
          <ProjectsSection onSelectProject={(project) => setSelectedProject(project)} />
          <TechStackSection />
          <ContactSection onOpenTerminal={() => setIsTerminalOpen(true)} />
        </main>

        <Footer />
      </div>

      {/* Project Deep Dive Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />

      {/* Hacker CLI Modal */}
      <TerminalModal
        isOpen={isTerminalOpen}
        onClose={() => setIsTerminalOpen(false)}
      />
    </div>
  );
}

export default App;
