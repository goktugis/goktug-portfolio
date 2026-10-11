import React, { useState, useEffect, useRef } from 'react';
import { X, Sparkles } from 'lucide-react';
import { sound } from '../utils/sound';
import { PROJECTS, PROFILE_INFO } from '../data/portfolioData';
import confetti from 'canvas-confetti';

interface TerminalModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface CommandLog {
  command: string;
  output: React.ReactNode;
}

export const TerminalModal: React.FC<TerminalModalProps> = ({ isOpen, onClose }) => {
  const [input, setInput] = useState('');
  const [logs, setLogs] = useState<CommandLog[]>([
    {
      command: 'sysinfo',
      output: (
        <div className="space-y-1 text-slate-300">
          <p className="text-cyan-400 font-bold">GÖKTUĞ İŞERİ CYBER TERMINAL v2.6 [ONLINE]</p>
          <p className="text-slate-400">Deterministik Algoritmalar, Zero-Trust LLM Güvenliği & React 19 Mimari Çekirdeği.</p>
          <p className="text-indigo-400">Komut listesi için <span className="text-white font-bold">'help'</span> yazın.</p>
        </div>
      ),
    },
  ]);

  const inputRef = useRef<HTMLInputElement | null>(null);
  const bottomRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [logs]);

  if (!isOpen) return null;

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = input.trim().toLowerCase();
    if (!cmd) return;

    sound.playClick();
    let response: React.ReactNode = null;

    switch (cmd) {
      case 'help':
        response = (
          <div className="space-y-1 text-slate-300">
            <p className="text-cyan-400 font-semibold">Kullanılabilir Komutlar:</p>
            <p>• <span className="text-indigo-400">bio</span> - Göktuğ İşeri hakkında özet ve mühendislik vizyonu</p>
            <p>• <span className="text-indigo-400">projects</span> - GitHub projelerinin listesi ve detayları</p>
            <p>• <span className="text-indigo-400">skills</span> - Teknik yetkinlikler ve algoritmalar</p>
            <p>• <span className="text-indigo-400">neuro</span> - NeuroShield güvenlik mimarisi özeti</p>
            <p>• <span className="text-indigo-400">synapse</span> - SynapseFlow DAG motoru detayları</p>
            <p>• <span className="text-indigo-400">contact</span> - İletişim bilgileri ve GitHub profili</p>
            <p>• <span className="text-emerald-400">sudo hire</span> - İşe alım teklifi / Mülakat bağlantısı</p>
            <p>• <span className="text-indigo-400">clear</span> - Terminal çıktısını temizler</p>
            <p>• <span className="text-indigo-400">exit</span> - Terminali kapatır</p>
          </div>
        );
        break;

      case 'bio':
        response = (
          <div className="space-y-1.5 text-slate-300">
            <p className="text-white font-bold">{PROFILE_INFO.name} ({PROFILE_INFO.title})</p>
            <p className="text-slate-400">{PROFILE_INFO.bio}</p>
            <p className="text-cyan-400">Konum: {PROFILE_INFO.location} | Durum: Projelere & Fırsatlara Açık</p>
          </div>
        );
        break;

      case 'projects':
        response = (
          <div className="space-y-2">
            <p className="text-cyan-400 font-semibold">Aktif GitHub Sistemleri ({PROJECTS.length}):</p>
            {PROJECTS.map((p) => (
              <div key={p.id} className="text-xs">
                <span className="text-white font-bold">[{p.title}]</span> - <span className="text-slate-400">{p.subtitle}</span> ({p.badge})
              </div>
            ))}
          </div>
        );
        break;

      case 'skills':
        response = (
          <div className="space-y-1 text-slate-300">
            <p className="text-cyan-400 font-semibold">Çekirdek Beceriler:</p>
            <p>• Diller: TypeScript, JavaScript, Python, C#, HTML5, CSS3, SQL</p>
            <p>• Framework & UI: React 19, Vite, TailwindCSS, ASP.NET MVC, Express.js</p>
            <p>• AI & Algoritma: DAG (Kahn Algorithm), OWASP LLM01 Guardrails, Shannon Entropy, DFS Cycle Detection</p>
            <p>• Güvenlik: AES-256-GCM, PBKDF2, LSB Steganography, Zero-Knowledge, NVI Mod 10</p>
          </div>
        );
        break;

      case 'neuro':
        response = (
          <div className="space-y-1 text-slate-300">
            <p className="text-indigo-400 font-bold">NeuroShield Güvenlik Kalkanı</p>
            <p>OWASP LLM01, Shannon Entropisi ($H(X) &gt; 4.85$), NVI Mod 10 ve ISO/IEC 7812 Luhn algoritmalarıyla prompt injection ve veri sızıntılarını sıfıra indirir.</p>
            <p className="text-cyan-400">Depo: https://github.com/goktugis/neuro-shield</p>
          </div>
        );
        break;

      case 'synapse':
        response = (
          <div className="space-y-1 text-slate-300">
            <p className="text-purple-400 font-bold">SynapseFlow Otonom DAG Motoru</p>
            <p>Kahn Topolojik Sıralama algoritmasıyla O(V+E) karmaşıklığında otonom yapay zeka ajanlarını ve veri boru hatlarını görsel tuvalde yürütür.</p>
            <p className="text-cyan-400">Depo: https://github.com/goktugis/synapse-flow</p>
          </div>
        );
        break;

      case 'contact':
        response = (
          <div className="space-y-1 text-slate-300">
            <p>GitHub: <a href="https://github.com/goktugis" target="_blank" rel="noopener noreferrer" className="text-cyan-400 underline">github.com/goktugis</a></p>
            <p>E-Posta: <a href="mailto:goktugis@users.noreply.github.com" className="text-cyan-400 underline">goktugis@users.noreply.github.com</a></p>
          </div>
        );
        break;

      case 'sudo hire':
        sound.playSuccess();
        confetti({
          particleCount: 120,
          spread: 90,
          origin: { y: 0.6 },
          colors: ['#06b6d4', '#6366f1', '#a855f7', '#22c55e'],
        });
        response = (
          <div className="p-3 bg-emerald-950/40 border border-emerald-500/40 rounded-lg text-emerald-300 space-y-1">
            <p className="font-bold flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-emerald-400" />
              Tebrikler! Güvenlik yetkilendirmesi onaylandı.
            </p>
            <p className="text-xs">
              Göktuğ İşeri ile çalışmak veya teknik bir mülakat organize etmek için GitHub üzerinden iletişime geçebilirsiniz.
            </p>
          </div>
        );
        break;

      case 'clear':
        setLogs([]);
        setInput('');
        return;

      case 'exit':
        onClose();
        setInput('');
        return;

      default:
        response = (
          <p className="text-rose-400">
            Komut bulunamadı: '{cmd}'. Kullanılabilir komutlar için <span className="text-white font-bold">'help'</span> yazın.
          </p>
        );
    }

    setLogs((prev) => [...prev, { command: input, output: response }]);
    setInput('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="w-full max-w-3xl h-[520px] bg-[#070a12] border border-cyan-500/30 rounded-xl shadow-2xl shadow-cyan-950/60 flex flex-col font-mono text-xs overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Terminal Title Bar */}
        <div className="flex items-center justify-between px-4 py-2.5 bg-[#0d1220] border-b border-white/10 select-none">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-rose-500/80 cursor-pointer" onClick={onClose} />
            <div className="w-3 h-3 rounded-full bg-amber-500/80" />
            <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
            <span className="ml-2 text-slate-400 text-[11px]">goktug@cyber-host: ~ (zsh)</span>
          </div>

          <button
            onClick={() => {
              sound.playClick();
              onClose();
            }}
            className="p-1 rounded text-slate-400 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Terminal Body */}
        <div 
          onClick={() => inputRef.current?.focus()}
          className="flex-1 p-4 overflow-y-auto space-y-4 cursor-text"
        >
          {logs.map((log, idx) => (
            <div key={idx} className="space-y-1">
              <div className="flex items-center gap-2 text-cyan-400">
                <span className="text-indigo-400">goktug@cyber-host:~$</span>
                <span className="text-white font-semibold">{log.command}</span>
              </div>
              <div className="pl-4">{log.output}</div>
            </div>
          ))}

          {/* Active Input Line */}
          <form onSubmit={handleCommand} className="flex items-center gap-2 text-cyan-400 pt-1">
            <span className="text-indigo-400 shrink-0">goktug@cyber-host:~$</span>
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-1 bg-transparent text-white focus:outline-none caret-cyan-400"
              autoFocus
            />
          </form>

          <div ref={bottomRef} />
        </div>

        {/* Terminal Footer */}
        <div className="px-4 py-1.5 bg-[#0a0d17] border-t border-white/5 text-[11px] text-slate-400 flex items-center justify-between">
          <span>Kısayol: <kbd className="px-1 py-0.5 rounded bg-white/10 text-slate-300">help</kbd></span>
          <span>Tip: <kbd className="px-1 py-0.5 rounded bg-white/10 text-slate-300">sudo hire</kbd> ile teklif simülasyonu</span>
        </div>
      </div>
    </div>
  );
};
