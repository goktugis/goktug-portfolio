import React, { useState, useEffect } from 'react';
import { Terminal, Volume2, VolumeX, Sparkles } from 'lucide-react';
import { GithubIcon } from './GithubIcon';
import { sound } from '../utils/sound';

interface NavbarProps {
  onOpenTerminal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenTerminal }) => {
  const [scrolled, setScrolled] = useState(false);
  const [soundActive, setSoundActive] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleSound = () => {
    sound.enabled = !sound.enabled;
    setSoundActive(sound.enabled);
    if (sound.enabled) {
      sound.playSuccess();
    }
  };

  const navLinks = [
    { name: 'Projeler', href: '#projects' },
    { name: 'Algoritma Laboratuvarı', href: '#algorithms' },
    { name: 'Yetenekler', href: '#skills' },
    { name: 'İletişim', href: '#contact' },
  ];

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled 
        ? 'py-3 bg-[#07090e]/85 backdrop-blur-md border-b border-white/10 shadow-2xl shadow-black/50' 
        : 'py-5 bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Logo */}
          <a 
            href="#" 
            onMouseEnter={() => sound.playHover()}
            onClick={() => sound.playClick()}
            className="flex items-center gap-3 group"
          >
            <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 via-purple-600 to-cyan-500 p-[1.5px] shadow-lg shadow-indigo-500/25 group-hover:shadow-indigo-500/40 transition-shadow">
              <div className="w-full h-full bg-[#0d111b] rounded-[10px] flex items-center justify-center">
                <span className="font-mono font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-indigo-400 text-lg">
                  Gİ
                </span>
              </div>
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-400 rounded-full border-2 border-[#07090e] animate-ping" />
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-400 rounded-full border-2 border-[#07090e]" />
            </div>

            <div className="flex flex-col">
              <span className="font-heading font-bold text-base sm:text-lg tracking-tight text-white group-hover:text-cyan-400 transition-colors flex items-center gap-1.5">
                Göktuğ İşeri
                <span className="text-[10px] font-mono font-medium px-1.5 py-0.5 rounded bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 hidden sm:inline-block">
                  v2.6
                </span>
              </span>
              <span className="text-[11px] font-mono text-slate-400">
                AI & Systems Engineer
              </span>
            </div>
          </a>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-1 bg-[#101422]/70 border border-white/5 rounded-full px-4 py-1.5 backdrop-blur-md">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onMouseEnter={() => sound.playHover()}
                onClick={() => sound.playClick()}
                className="px-3.5 py-1.5 text-xs font-medium text-slate-300 hover:text-white rounded-full hover:bg-white/5 transition-all"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Right Action Controls */}
          <div className="flex items-center gap-2.5">
            {/* Terminal Trigger */}
            <button
              onClick={() => {
                sound.playClick();
                onOpenTerminal();
              }}
              onMouseEnter={() => sound.playHover()}
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-indigo-950/40 border border-indigo-500/30 text-indigo-300 hover:bg-indigo-900/50 hover:text-white hover:border-indigo-400 transition-all text-xs font-mono group cursor-pointer shadow-sm shadow-indigo-950"
              title="Terminal Konsolunu Aç (~)"
            >
              <Terminal className="w-3.5 h-3.5 text-cyan-400 group-hover:rotate-6 transition-transform" />
              <span className="hidden sm:inline">CLI</span>
              <kbd className="px-1.5 py-0.2 rounded bg-black/40 text-[10px] border border-indigo-400/20 text-slate-400">~</kbd>
            </button>

            {/* Sound Toggle */}
            <button
              onClick={toggleSound}
              className={`p-2 rounded-lg border transition-all cursor-pointer ${
                soundActive 
                  ? 'bg-white/5 border-white/10 text-cyan-400 hover:bg-white/10 hover:border-cyan-500/30' 
                  : 'bg-white/5 border-white/10 text-slate-500 hover:text-slate-400'
              }`}
              title={soundActive ? 'Ses Efektlerini Kapat' : 'Ses Efektlerini Aç'}
            >
              {soundActive ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
            </button>

            {/* GitHub Button */}
            <a
              href="https://github.com/goktugis"
              target="_blank"
              rel="noopener noreferrer"
              onMouseEnter={() => sound.playHover()}
              onClick={() => sound.playClick()}
              className="flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white text-xs font-semibold shadow-lg shadow-indigo-600/30 hover:shadow-indigo-600/50 transition-all cursor-pointer"
            >
              <GithubIcon className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">GitHub</span>
              <Sparkles className="w-3 h-3 text-cyan-200" />
            </a>
          </div>

        </div>
      </div>
    </header>
  );
};
