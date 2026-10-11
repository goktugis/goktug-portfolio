import { X, Keyboard } from 'lucide-react';
import { sound } from '../utils/audio';

interface ShortcutsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ShortcutsModal({ isOpen, onClose }: ShortcutsModalProps) {
  if (!isOpen) return null;

  const shortcuts = [
    { key: '← / →', desc: 'Projeler arasında yatay akış ve geçiş yap' },
    { key: 'A / D', desc: 'Alternatif sol / sağ akış yön tuşları' },
    { key: '1 - 9', desc: 'Projelere doğrudan sayı tuşuyla anında ışınlan' },
    { key: 'SPACE / ↵', desc: 'Odaktaki projenin canlı laboratuvarını ve simülatörünü aç' },
    { key: 'V', desc: 'Görünüm modunu değiştir (Horizon Akış ➔ Galaksi ➔ 3D Sahne)' },
    { key: 'M', desc: 'Web Audio prosedürel ses efektlerini aç / kapat' },
    { key: 'ESC', desc: 'Açık olan tüm pencereleri ve modalları kapat' },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-2xl bg-black/80">
      <div className="absolute inset-0" onClick={onClose} />

      <div className="relative z-10 w-full max-w-md rounded-3xl bg-[#090d16] border border-white/15 p-6 shadow-2xl space-y-5">
        <div className="flex items-center justify-between pb-3 border-b border-white/10">
          <div className="flex items-center gap-2 text-white">
            <Keyboard className="w-4 h-4 text-cyan-400" />
            <h3 className="text-sm font-bold font-mono">KLAVYE KONTROL & KISAYOLLAR</h3>
          </div>
          <button
            onClick={() => {
              sound.playTick();
              onClose();
            }}
            className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="space-y-2.5">
          {shortcuts.map((s) => (
            <div
              key={s.key}
              className="flex items-center justify-between p-2.5 rounded-xl bg-white/[0.02] border border-white/[0.06] text-xs font-mono"
            >
              <span className="text-slate-300">{s.desc}</span>
              <kbd className="px-2.5 py-1 rounded-lg bg-white/10 border border-white/20 text-white font-bold shrink-0 ml-3">
                {s.key}
              </kbd>
            </div>
          ))}
        </div>

        <div className="pt-2 text-center">
          <button
            onClick={onClose}
            className="w-full py-2.5 rounded-xl bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-500/40 text-cyan-300 font-mono text-xs font-bold transition-all"
          >
            Anladım, Gezintiye Devam Et
          </button>
        </div>
      </div>
    </div>
  );
}
