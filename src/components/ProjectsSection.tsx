import React, { useState } from 'react';
import { Code2 } from 'lucide-react';
import { CATEGORIES, PROJECTS } from '../data/portfolioData';
import type { Project } from '../data/portfolioData';
import { ProjectCard } from './ProjectCard';
import { sound } from '../utils/sound';

interface ProjectsSectionProps {
  onSelectProject: (project: Project) => void;
}

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({ onSelectProject }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const filteredProjects = selectedCategory === 'all'
    ? PROJECTS
    : PROJECTS.filter((p) => p.category === selectedCategory);

  return (
    <section id="projects" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-mono mb-3">
              <Code2 className="w-3.5 h-3.5" />
              <span>GITHUB AÇIK KAYNAK PORTFOLYÖSÜ</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight font-heading text-white">
              Geliştirdiğim <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-indigo-400 to-purple-400">Üretim Seviyesi</span> Projeler
            </h2>
          </div>

          <p className="max-w-md text-sm text-slate-400 leading-relaxed">
            Yapay zeka güvenlik duvarlarından otonom DAG ajanlarına, kriptografik kasalardan lüks web deneyimlerine kadar tüm projelerim GitHub üzerindedir.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-10 no-scrollbar">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => {
                sound.playClick();
                setSelectedCategory(cat.id);
              }}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-medium whitespace-nowrap transition-all cursor-pointer ${
                selectedCategory === cat.id
                  ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg shadow-indigo-600/25 border border-indigo-400/40'
                  : 'glass-panel text-slate-400 hover:text-white hover:border-white/20'
              }`}
            >
              {cat.label}
              <span className="ml-2 text-[11px] font-mono opacity-70">
                ({cat.id === 'all' ? PROJECTS.length : PROJECTS.filter((p) => p.category === cat.id).length})
              </span>
            </button>
          ))}
        </div>

        {/* Project Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredProjects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onSelect={onSelectProject}
            />
          ))}
        </div>

      </div>
    </section>
  );
};
