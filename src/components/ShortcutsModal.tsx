import { X, Keyboard } from 'lucide-react';
import { sound } from '../utils/audio';
import type { GalleryTheme } from './GalleryLighting';

interface ShortcutsModalProps {
  isOpen: boolean;
  onClose: () => void;
  theme: GalleryTheme;
}

export function ShortcutsModal({ isOpen, onClose, theme }: ShortcutsModalProps) {
  if (!isOpen) return null;
  const isLight = theme === 'linen';

  const shortcuts = [
    { key: '← / →', desc: 'Sergi salonları arasında akıcı yürüyüş' },
    { key: 'A / D', desc: 'Alternatif sol / sağ sergi navigasyonu' },
    { key: '1 - 9', desc: 'İlgili salona/esere anında doğrudan geçiş' },
    { key: 'SPACE / ↵', desc: 'Odaktaki eserin canlı laboratuvarını ve simülatörünü aç' },
    { key: 'V', desc: 'Görünüm modunu değiştir (Yürüyüş ➔ Kat Planı ➔ Monografi)' },
    { key: 'M', desc: 'Akustik galeri seslerini aç / kapat' },
    { key: 'ESC', desc: 'Pencereleri ve detayları kapat' },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-2xl bg-black/75">
      <div className="absolute inset-0" onClick={onClose} />

      <div
        className={`relative z-10 w-full max-w-md rounded-2xl border p-6 shadow-2xl space-y-5 transition-colors ${
          isLight
            ? 'bg-[#faf9f6] border-stone-300 shadow-monolith-light text-stone-900'
            : 'bg-[#121316] border-stone-800 shadow-monolith text-stone-100'
        }`}
      >
        <div className="flex items-center justify-between pb-3 border-b border-stone-200 dark:border-stone-800">
          <div className="flex items-center gap-2">
            <Keyboard className="w-4 h-4 text-amber-500" />
            <h3 className="text-sm font-bold font-mono">SERGİ KONTROL KISAYOLLARI</h3>
          </div>
          <button
            onClick={() => {
              sound.playTick();
              onClose();
            }}
            className="p-1.5 rounded hover:bg-stone-200 dark:hover:bg-stone-800 opacity-60 hover:opacity-100"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="space-y-2.5">
          {shortcuts.map((s) => (
            <div
              key={s.key}
              className={`flex items-center justify-between p-2.5 rounded border text-xs font-mono ${
                isLight
                  ? 'bg-stone-100/70 border-stone-200'
                  : 'bg-white/[0.02] border-stone-800'
              }`}
            >
              <span className="opacity-80">{s.desc}</span>
              <kbd
                className={`px-2 py-0.5 rounded border font-bold shrink-0 ml-3 ${
                  isLight
                    ? 'bg-white border-stone-300 text-stone-900'
                    : 'bg-stone-800 border-stone-700 text-stone-100'
                }`}
              >
                {s.key}
              </kbd>
            </div>
          ))}
        </div>

        <div className="pt-2 text-center">
          <button
            onClick={onClose}
            className={`w-full py-2.5 rounded font-mono text-xs font-bold transition-all ${
              isLight
                ? 'bg-stone-900 text-white hover:bg-stone-800'
                : 'bg-stone-100 text-stone-950 hover:bg-white'
            }`}
          >
            Anladım, Sergiye Devam Et
          </button>
        </div>
      </div>
    </div>
  );
}
