import React, { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';
import { sound } from '../utils/sound';

export const Footer: React.FC = () => {
  const [time, setTime] = useState<string>('');

  useEffect(() => {
    const update = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString('tr-TR', {
          timeZone: 'Europe/Istanbul',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
        })
      );
    };
    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, []);

  const scrollToTop = () => {
    sound.playClick();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="py-12 border-t border-white/5 bg-[#05070c] relative z-10 text-xs font-mono text-slate-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-white/5">
          
          {/* Left info */}
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
            <div>
              <span className="text-white font-bold font-sans">Göktuğ İşeri</span>
              <span className="text-slate-400 ml-2">İSTANBUL / UTC+3</span>
            </div>
            <span className="text-cyan-400 font-mono px-2 py-0.5 rounded bg-white/5 border border-white/10">
              {time || '00:00:00'} TRT
            </span>
          </div>

          {/* Middle badges */}
          <div className="flex flex-wrap items-center justify-center gap-2 text-[11px] text-slate-400">
            <span className="px-2.5 py-1 rounded-full bg-white/5 border border-white/10">React 19</span>
            <span className="px-2.5 py-1 rounded-full bg-white/5 border border-white/10">TypeScript</span>
            <span className="px-2.5 py-1 rounded-full bg-white/5 border border-white/10">TailwindCSS 4</span>
            <span className="px-2.5 py-1 rounded-full bg-white/5 border border-white/10">Zero-Leakage</span>
          </div>

          {/* Right Back to top */}
          <button
            onClick={scrollToTop}
            onMouseEnter={() => sound.playHover()}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 hover:text-white transition-colors cursor-pointer"
          >
            <span>Başa Dön</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>

        </div>

        {/* Bottom copyright */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <p>© 2026 Göktuğ İşeri. Tüm hakları saklıdır. Yüksek güvenlikli ve deterministik mimari ile tasarlanmıştır.</p>
          <div className="flex items-center gap-4">
            <a
              href="https://github.com/goktugis"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-400 hover:text-cyan-400 transition-colors"
            >
              github.com/goktugis
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
};
