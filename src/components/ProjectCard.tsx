import React, { useRef, useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { GithubIcon } from './GithubIcon';
import type { Project } from '../data/portfolioData';
import { sound } from '../utils/sound';

interface ProjectCardProps {
  project: Project;
  onSelect: (project: Project) => void;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project, onSelect }) => {
  const cardRef = useRef<HTMLDivElement | null>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [glarePos, setGlarePos] = useState({ x: 50, y: 50, opacity: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotX = ((y - centerY) / centerY) * -7;
    const rotY = ((x - centerX) / centerX) * 7;

    setRotateX(rotX);
    setRotateY(rotY);

    setGlarePos({
      x: (x / rect.width) * 100,
      y: (y / rect.height) * 100,
      opacity: 0.15,
    });
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
    setGlarePos((prev) => ({ ...prev, opacity: 0 }));
  };

  return (
    <div
      style={{ perspective: '1000px' }}
      className="h-full"
    >
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onMouseEnter={() => sound.playHover()}
        style={{
          transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
          transition: 'transform 0.15s ease-out',
        }}
        className="relative h-full flex flex-col rounded-2xl glass-panel border border-white/10 hover:border-indigo-500/40 overflow-hidden group shadow-xl transition-shadow duration-300 hover:shadow-indigo-500/15"
      >
        {/* Specular Glare Overlay */}
        <div
          style={{
            background: `radial-gradient(circle at ${glarePos.x}% ${glarePos.y}%, rgba(255, 255, 255, ${glarePos.opacity}) 0%, transparent 60%)`,
          }}
          className="absolute inset-0 pointer-events-none z-20 transition-opacity duration-200"
        />

        {/* Visual Banner */}
        <div className="relative h-52 w-full overflow-hidden bg-black/40">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0d17] via-transparent to-transparent opacity-90" />

          {/* Badges */}
          <div className="absolute top-3 left-3 right-3 flex items-center justify-between z-10">
            <span className="text-[11px] font-mono font-medium px-2.5 py-1 rounded-full bg-black/70 backdrop-blur-md text-cyan-300 border border-cyan-500/30">
              {project.badge}
            </span>
            <span className="text-[11px] font-mono text-slate-400 bg-black/70 backdrop-blur-md px-2 py-0.5 rounded-md border border-white/10">
              {project.year}
            </span>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 flex-1 flex flex-col justify-between relative z-10">
          <div>
            <div className="flex items-center justify-between gap-2 mb-1.5">
              <span className="text-xs font-mono text-indigo-400">
                {project.categoryLabel}
              </span>
              {project.featured && (
                <span className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                  Öne Çıkan
                </span>
              )}
            </div>

            <h3 className="text-xl font-bold font-heading text-white group-hover:text-cyan-300 transition-colors mb-2">
              {project.title}
            </h3>

            <p className="text-xs sm:text-sm text-slate-300/90 line-clamp-2 leading-relaxed mb-4">
              {project.description}
            </p>

            {/* Quick Metrics */}
            <div className="grid grid-cols-2 gap-2 mb-4 p-2.5 rounded-xl bg-black/30 border border-white/5">
              {project.architecture.metrics.slice(0, 2).map((m, idx) => (
                <div key={idx} className="text-[11px]">
                  <span className="text-slate-400 block font-mono">{m.label}:</span>
                  <span className="text-indigo-300 font-bold font-mono">{m.value}</span>
                </div>
              ))}
            </div>

            {/* Tech Stack Chips */}
            <div className="flex flex-wrap gap-1.5 mb-6">
              {project.techStack.slice(0, 4).map((tech, idx) => (
                <span
                  key={idx}
                  className="px-2 py-0.5 rounded text-[11px] font-mono bg-white/5 border border-white/10 text-slate-300"
                >
                  {tech}
                </span>
              ))}
              {project.techStack.length > 4 && (
                <span className="px-1.5 py-0.5 rounded text-[10px] font-mono bg-white/5 text-slate-400">
                  +{project.techStack.length - 4}
                </span>
              )}
            </div>
          </div>

          {/* Action Row */}
          <div className="pt-4 border-t border-white/5 flex items-center justify-between gap-2">
            <button
              onClick={() => {
                sound.playClick();
                onSelect(project);
              }}
              className="flex items-center gap-1.5 text-xs font-semibold text-white bg-indigo-600/80 hover:bg-indigo-600 px-3.5 py-2 rounded-lg transition-colors cursor-pointer group/btn"
            >
              <span>Derinlemesine İncele</span>
              <ArrowUpRight className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
            </button>

            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => {
                e.stopPropagation();
                sound.playClick();
              }}
              className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
              title="GitHub Deposunu Aç"
            >
              <GithubIcon className="w-4 h-4" />
            </a>
          </div>
        </div>

      </div>
    </div>
  );
};
