import React, { useState } from 'react';
import { Mail, Send, Copy, Check, Sparkles, MessageSquare, Terminal } from 'lucide-react';
import { GithubIcon } from './GithubIcon';
import { sound } from '../utils/sound';
import confetti from 'canvas-confetti';

interface ContactSectionProps {
  onOpenTerminal: () => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ onOpenTerminal }) => {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', message: '' });

  const emailAddress = 'goktugis@users.noreply.github.com';

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(emailAddress);
    setCopiedEmail(true);
    sound.playSuccess();
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;

    sound.playSuccess();
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.8 },
      colors: ['#06b6d4', '#6366f1', '#a855f7'],
    });

    setFormSubmitted(true);
    setTimeout(() => {
      // Trigger default mail client
      window.location.href = `mailto:${emailAddress}?subject=Portfolyo İletişimi: ${encodeURIComponent(form.name)}&body=${encodeURIComponent(form.message)}`;
    }, 1200);
  };

  return (
    <section id="contact" className="py-24 relative overflow-hidden bg-[#07090e]/80">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-mono mb-4">
            <MessageSquare className="w-3.5 h-3.5" />
            <span>BAĞLANTI KURUN</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight font-heading text-white mb-4">
            Birlikte Bir <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-indigo-400 to-purple-400">Şaheser</span> Üretelim
          </h2>
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
            Yeni bir yapay zeka sistemi, yüksek güvenlikli web mimarisi veya teknik liderlik fırsatı mı planlıyorsunuz? Doğrudan bana ulaşabilirsiniz.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-start">
          
          {/* Left Column: Direct Info Cards */}
          <div className="lg:col-span-2 space-y-4">
            
            {/* Email Card */}
            <div 
              onMouseEnter={() => sound.playHover()}
              className="glass-panel p-6 rounded-2xl border border-white/10 hover:border-indigo-500/40 transition-all space-y-3"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-indigo-400 font-bold uppercase tracking-wider">
                  E-Posta Adresi
                </span>
                <Mail className="w-4 h-4 text-indigo-400" />
              </div>

              <div className="font-mono text-sm text-white break-all">
                {emailAddress}
              </div>

              <button
                onClick={handleCopyEmail}
                className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-mono text-slate-300 hover:text-white transition-colors cursor-pointer"
              >
                {copiedEmail ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                <span>{copiedEmail ? 'Panoya Kopyalandı!' : 'E-Postayı Kopyala'}</span>
              </button>
            </div>

            {/* GitHub Profile Card */}
            <a
              href="https://github.com/goktugis"
              target="_blank"
              rel="noopener noreferrer"
              onMouseEnter={() => sound.playHover()}
              onClick={() => sound.playClick()}
              className="glass-panel p-6 rounded-2xl border border-white/10 hover:border-cyan-500/40 transition-all flex items-center justify-between group cursor-pointer block"
            >
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-white group-hover:text-cyan-400 transition-colors">
                  <GithubIcon className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-xs font-mono text-slate-400">Açık Kaynak Kodlar</div>
                  <div className="text-base font-bold text-white group-hover:text-cyan-300 transition-colors">
                    github.com/goktugis
                  </div>
                </div>
              </div>
              <Sparkles className="w-5 h-5 text-cyan-400 opacity-60 group-hover:opacity-100 group-hover:rotate-12 transition-all" />
            </a>

            {/* Terminal ShortCut Card */}
            <div 
              onClick={() => {
                sound.playClick();
                onOpenTerminal();
              }}
              onMouseEnter={() => sound.playHover()}
              className="glass-panel p-5 rounded-2xl border border-white/10 hover:border-purple-500/40 transition-all flex items-center justify-between cursor-pointer group"
            >
              <div className="flex items-center gap-3">
                <Terminal className="w-5 h-5 text-purple-400" />
                <div>
                  <div className="text-xs font-mono text-slate-400">Geliştirici Arayüzü</div>
                  <div className="text-xs font-bold text-white group-hover:text-purple-300">
                    İnteraktif CLI Konsolu
                  </div>
                </div>
              </div>
              <kbd className="px-2 py-1 rounded bg-black/50 text-xs font-mono text-purple-400 border border-purple-500/20">
                ~ Aç
              </kbd>
            </div>

          </div>

          {/* Right Column: Contact Message Form */}
          <div className="lg:col-span-3">
            <div className="glass-panel p-6 sm:p-8 rounded-2xl border border-white/10 shadow-2xl relative overflow-hidden">
              <h3 className="text-xl font-bold font-heading text-white mb-2">
                Hızlı İletişim Formu
              </h3>
              <p className="text-xs text-slate-400 font-mono mb-6">
                Mesajınız otomatik olarak hazırlanır ve doğrudan Göktuğ İşeri'ye yönlendirilir.
              </p>

              {formSubmitted ? (
                <div className="p-8 rounded-xl bg-emerald-950/30 border border-emerald-500/40 text-center space-y-3">
                  <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
                    <Check className="w-6 h-6" />
                  </div>
                  <h4 className="text-lg font-bold text-white">Mesajınız Hazırlandı!</h4>
                  <p className="text-xs text-slate-300">
                    E-posta istemciniz açılıyor... Teşekkür ederim, en kısa sürede dönüş sağlayacağım.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono text-slate-400 mb-1.5">
                        Adınız & Soyadınız
                      </label>
                      <input
                        type="text"
                        required
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        placeholder="Örn: Ahmet Yılmaz"
                        className="w-full bg-[#0a0d17] border border-white/10 rounded-xl px-4 py-3 text-xs sm:text-sm text-slate-200 focus:outline-none focus:border-indigo-500/60 transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono text-slate-400 mb-1.5">
                        E-Posta Adresiniz
                      </label>
                      <input
                        type="email"
                        required
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        placeholder="Örn: ahmet@sirket.com"
                        className="w-full bg-[#0a0d17] border border-white/10 rounded-xl px-4 py-3 text-xs sm:text-sm text-slate-200 focus:outline-none focus:border-indigo-500/60 transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-slate-400 mb-1.5">
                      Mesajınız / Proje Özeti
                    </label>
                    <textarea
                      required
                      rows={4}
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      placeholder="Görüşmek istediğiniz konu, proje veya işbirliği hakkında bilgi verin..."
                      className="w-full bg-[#0a0d17] border border-white/10 rounded-xl px-4 py-3 text-xs sm:text-sm text-slate-200 focus:outline-none focus:border-indigo-500/60 transition-colors"
                    />
                  </div>

                  <button
                    type="submit"
                    onMouseEnter={() => sound.playHover()}
                    className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-gradient-to-r from-indigo-600 via-purple-600 to-cyan-600 hover:from-indigo-500 hover:to-cyan-500 text-white font-semibold text-sm shadow-xl shadow-indigo-600/30 transition-all cursor-pointer"
                  >
                    <Send className="w-4 h-4" />
                    <span>Mesajı Gönder & İletişime Geç</span>
                  </button>
                </form>
              )}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
