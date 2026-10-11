import React from 'react';
import { Cpu, Lock, Globe, Database, CheckCircle2, Award } from 'lucide-react';
import { SKILL_CATEGORIES } from '../data/portfolioData';
import { sound } from '../utils/sound';

export const TechStackSection: React.FC = () => {
  const getCategoryIcon = (index: number) => {
    switch (index) {
      case 0: return <Cpu className="w-5 h-5 text-cyan-400" />;
      case 1: return <Lock className="w-5 h-5 text-purple-400" />;
      case 2: return <Globe className="w-5 h-5 text-emerald-400" />;
      default: return <Database className="w-5 h-5 text-amber-400" />;
    }
  };

  return (
    <section id="skills" className="py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs font-mono mb-4">
            <Award className="w-3.5 h-3.5" />
            <span>MÜHENDİSLİK KAPASİTESİ</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight font-heading text-white mb-4">
            Teknoloji Yığını & <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-indigo-400 to-cyan-400">Temel Yetkinlikler</span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
            Yapay zeka güvenlik katmanlarından dağıtık mikroservis mimarilerine kadar her katmanda temiz, test edilebilir ve güvenilir kod üretiyorum.
          </p>
        </div>

        {/* Skill Matrix Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 mb-16">
          {SKILL_CATEGORIES.map((cat, idx) => (
            <div
              key={idx}
              onMouseEnter={() => sound.playHover()}
              className="glass-panel p-6 sm:p-8 rounded-2xl border border-white/10 hover:border-indigo-500/30 transition-all duration-300 relative group"
            >
              <div className="flex items-center gap-3 mb-6 pb-4 border-b border-white/5">
                <div className="p-2.5 rounded-xl bg-white/5 border border-white/10">
                  {getCategoryIcon(idx)}
                </div>
                <h3 className="text-lg font-bold font-heading text-white">
                  {cat.title}
                </h3>
              </div>

              <div className="space-y-5">
                {cat.skills.map((skill, sIdx) => (
                  <div key={sIdx} className="space-y-1.5">
                    <div className="flex items-center justify-between text-xs sm:text-sm">
                      <span className="font-semibold text-slate-200">
                        {skill.name}
                      </span>
                      <span className="font-mono text-cyan-400 font-bold">
                        %{skill.level}
                      </span>
                    </div>

                    <div className="h-2 w-full bg-[#0a0d17] rounded-full overflow-hidden p-[1px] border border-white/5">
                      <div
                        style={{ width: `${skill.level}%` }}
                        className={`h-full rounded-full bg-gradient-to-r ${cat.color} transition-all duration-1000`}
                      />
                    </div>

                    <div className="text-[11px] font-mono text-slate-400">
                      ↳ {skill.note}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Engineering Principles Ribbon */}
        <div className="glass-panel p-8 rounded-2xl border border-white/10 relative overflow-hidden bg-gradient-to-r from-indigo-950/20 via-purple-950/20 to-cyan-950/20">
          <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-2 text-center md:text-left">
              <span className="text-xs font-mono uppercase tracking-wider text-cyan-400 font-bold">
                Mühendislik Felsefem
              </span>
              <h4 className="text-xl sm:text-2xl font-bold font-heading text-white">
                "Sıfır Varsayım, Deterministik Güvenlik ve Kesintisiz Performans."
              </h4>
              <p className="text-xs sm:text-sm text-slate-400">
                Geliştirdiğim sistemlerde istemci gizliliği esastır. Verileriniz sunuculara sızdırılmaz, algoritmalar matematiksel olarak kanıtlanabilir sınırlar dahilinde yürütülür.
              </p>
            </div>

            <div className="flex flex-col gap-2 shrink-0 w-full sm:w-auto">
              <div className="flex items-center gap-2 text-xs font-mono text-slate-300 bg-white/5 px-3 py-2 rounded-lg border border-white/10">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>%100 Test Odaklı Geliştirme (TDD)</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-mono text-slate-300 bg-white/5 px-3 py-2 rounded-lg border border-white/10">
                <CheckCircle2 className="w-4 h-4 text-cyan-400" />
                <span>OWASP & ISO/IEC Standartları</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
