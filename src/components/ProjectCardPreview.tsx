import { useState, useEffect } from 'react';
import type { Project } from '../data/portfolioData';

interface ProjectCardPreviewProps {
  project: Project;
}

export function ProjectCardPreview({ project }: ProjectCardPreviewProps) {
  // Live states for dynamic mini widgets
  const [pulseIndex, setPulseIndex] = useState(0);
  const [sampleEntropy, setSampleEntropy] = useState(4.92);
  const [targetCoord, setTargetCoord] = useState({ x: 382, y: 194 });

  useEffect(() => {
    const timer = setInterval(() => {
      setPulseIndex((prev) => (prev + 1) % 4);
      setSampleEntropy(Number((4.8 + Math.random() * 0.35).toFixed(2)));
      setTargetCoord({
        x: Math.floor(340 + Math.random() * 80),
        y: Math.floor(160 + Math.random() * 60),
      });
    }, 2400);
    return () => clearInterval(timer);
  }, []);

  switch (project.id) {
    case 'neuro-shield':
      return (
        <div className="p-3 rounded-xl bg-black/40 border border-cyan-500/20 font-mono text-[11px] space-y-2">
          <div className="flex items-center justify-between text-cyan-400">
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
              SHANNON ENTROPY METER
            </span>
            <span className="text-white font-bold">{sampleEntropy} bits</span>
          </div>
          <div className="w-full bg-slate-800/80 h-1.5 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-cyan-400 to-rose-500 transition-all duration-700"
              style={{ width: `${Math.min(100, (sampleEntropy / 5.5) * 100)}%` }}
            />
          </div>
          <div className="flex justify-between text-[10px] text-slate-400">
            <span>Zararlı Yük Eşiği: &gt;4.85</span>
            <span className="text-rose-400 font-semibold">ALARM AKTİF</span>
          </div>
        </div>
      );

    case 'synapse-flow':
      return (
        <div className="p-3 rounded-xl bg-black/40 border border-purple-500/20 font-mono text-[11px]">
          <div className="flex items-center justify-between text-purple-300 mb-2">
            <span>KAHN DAG ÇALIŞTIRMA HATTI</span>
            <span className="text-[10px] text-purple-400">O(V + E)</span>
          </div>
          <div className="flex items-center justify-between gap-1 text-[10px]">
            {['Trigger', 'LLM Agent', 'Guardrail', 'Output'].map((node, i) => (
              <div key={node} className="flex items-center gap-1">
                <span
                  className={`px-2 py-0.5 rounded border transition-all ${
                    pulseIndex === i
                      ? 'bg-purple-500/30 border-purple-400 text-white shadow-sm shadow-purple-500/40'
                      : 'bg-white/[0.03] border-white/10 text-slate-400'
                  }`}
                >
                  {node}
                </span>
                {i < 3 && <span className="text-purple-500">→</span>}
              </div>
            ))}
          </div>
        </div>
      );

    case 'aura-cipher':
      return (
        <div className="p-3 rounded-xl bg-black/40 border border-emerald-500/20 font-mono text-[11px] space-y-1.5">
          <div className="flex items-center justify-between text-emerald-400">
            <span>LSB STEGANO BİT ENJEKSİYONU</span>
            <span className="text-white font-bold">AES-256-GCM</span>
          </div>
          <div className="text-[10px] text-emerald-300/80 tracking-wider truncate">
            01000001 01110101 01110010 01100001 → [RGB Pixel 0.2% dev]
          </div>
          <div className="flex justify-between text-[10px] text-slate-400">
            <span>RAM-Only Sıfır Sızıntı</span>
            <span className="text-emerald-400">PBKDF2 100K Tur</span>
          </div>
        </div>
      );

    case 'han-kebap-steakhouse':
      return (
        <div className="p-3 rounded-xl bg-black/40 border border-amber-500/20 font-mono text-[11px] space-y-1.5">
          <div className="flex items-center justify-between text-amber-400">
            <span>DRY-AGED PİŞME SİMÜLATÖRÜ</span>
            <span className="text-white font-bold">57°C // MEDIUM RARE</span>
          </div>
          <div className="w-full bg-slate-800/80 h-1.5 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-red-600 via-amber-500 to-yellow-400 w-3/5" />
          </div>
          <div className="flex justify-between text-[10px] text-slate-400">
            <span>Meşe Odunu & Altın Varak</span>
            <span className="text-amber-400 font-semibold">Dry-Aged 28 Gün</span>
          </div>
        </div>
      );

    case 'planpilot':
      return (
        <div className="p-3 rounded-xl bg-black/40 border border-indigo-500/20 font-mono text-[11px] space-y-1.5">
          <div className="flex items-center justify-between text-indigo-400">
            <span>KOBİ TALEP KUYRUĞU MOTORU</span>
            <span className="text-emerald-400 font-bold">OTOMATİK ÇAKIŞMA YOK</span>
          </div>
          <div className="flex items-center justify-between text-[10px] text-slate-300">
            <span className="px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300">#REQ-849: Onaylandı</span>
            <span className="text-slate-400">SQLite3 & Express REST</span>
          </div>
        </div>
      );

    case 'dietitian-app':
      return (
        <div className="p-3 rounded-xl bg-black/40 border border-teal-500/20 font-mono text-[11px] space-y-1.5">
          <div className="flex items-center justify-between text-teal-400">
            <span>KLİNİK MAKRO & BMR MOTORU</span>
            <span className="text-white font-bold">C# .NET & Docker</span>
          </div>
          <div className="flex items-center justify-between text-[10px] text-slate-300">
            <span>Protein: %35</span>
            <span>Karbonhidrat: %45</span>
            <span>Yağ: %20</span>
          </div>
        </div>
      );

    case 'hcc-survival-project':
      return (
        <div className="p-3 rounded-xl bg-black/40 border border-rose-500/20 font-mono text-[11px] space-y-1.5">
          <div className="flex items-center justify-between text-rose-400">
            <span>ONKOLOJİ SAĞKALIM SKORU</span>
            <span className="text-white font-bold">ROC-AUC 0.912</span>
          </div>
          <div className="w-full bg-slate-800/80 h-1.5 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-rose-500 to-pink-400 w-[91%]" />
          </div>
          <div className="flex justify-between text-[10px] text-slate-400">
            <span>Scikit-Learn Random Forest</span>
            <span className="text-rose-400 font-semibold">Yüksek Karar Hassasiyeti</span>
          </div>
        </div>
      );

    case 'goruntu-isleme':
      return (
        <div className="p-3 rounded-xl bg-black/40 border border-red-500/20 font-mono text-[11px] space-y-1.5">
          <div className="flex items-center justify-between text-red-400">
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-ping" />
              HSV RETICLE TARGETING
            </span>
            <span className="text-white font-bold">60 FPS</span>
          </div>
          <div className="flex justify-between text-[10px] text-slate-300">
            <span>Merkez Nokta (Centroid):</span>
            <span className="text-red-400 font-bold">
              X: {targetCoord.x} | Y: {targetCoord.y}
            </span>
          </div>
        </div>
      );

    case 'oil-spill-project':
      return (
        <div className="p-3 rounded-xl bg-black/40 border border-sky-500/20 font-mono text-[11px] space-y-1.5">
          <div className="flex items-center justify-between text-sky-400">
            <span>RADAR UYDU SPEKTRAL AYIKLAMA</span>
            <span className="text-white font-bold">MATLAB + Python</span>
          </div>
          <div className="flex justify-between text-[10px] text-slate-300">
            <span>Deniz Radar Anomalisi:</span>
            <span className="text-sky-400 font-bold">%94.4 Tespit Başarısı</span>
          </div>
        </div>
      );

    default:
      return null;
  }
}
