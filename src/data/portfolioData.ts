export interface ProjectArchitecture {
  overview: string;
  algorithmDetails?: string;
  diagram?: string;
  codeSnippet?: string;
  metrics: { label: string; value: string }[];
}

export interface Project {
  id: string;
  index: string;
  title: string;
  subtitle: string;
  category: 'ai-llm' | 'security' | 'enterprise' | 'ml-data' | 'fullstack';
  categoryLabel: string;
  badge: string;
  year: string;
  featured: boolean;
  image: string;
  githubUrl: string;
  liveUrl?: string;
  accentColor: string;
  accentGlow: string;
  gradient: string;
  coords: { x: number; y: number }; // Relative position on the Galaxy map (0-1000)
  connections: string[]; // Connected project IDs on the galaxy map
  description: string;
  highlights: string[];
  techStack: string[];
  architecture: ProjectArchitecture;
}

export const CATEGORIES = [
  { id: 'all', label: 'Tüm Eserler', count: 9 },
  { id: 'ai-llm', label: 'Yapay Zeka & Ajanlar', count: 2 },
  { id: 'security', label: 'Siber Güvenlik & Kripto', count: 2 },
  { id: 'enterprise', label: 'Kurumsal & Full-Stack', count: 2 },
  { id: 'ml-data', label: 'Veri Bilimi & ML', count: 3 },
] as const;

export const PROJECTS: Project[] = [
  {
    id: 'neuro-shield',
    index: '01',
    title: 'NeuroShield',
    subtitle: 'Kurumsal Zero-Trust LLM Güvenlik Kalkanı & Tehdit Simülatörü',
    category: 'security',
    categoryLabel: 'Siber Güvenlik & LLM',
    badge: 'OWASP LLM01 Uyumlu',
    year: '2026',
    featured: true,
    image: '/images/neuro-shield.jpg',
    githubUrl: 'https://github.com/goktugis/neuro-shield',
    accentColor: '#06b6d4',
    accentGlow: 'rgba(6, 182, 212, 0.45)',
    gradient: 'from-cyan-500 via-sky-600 to-blue-700',
    coords: { x: 300, y: 220 },
    connections: ['synapse-flow', 'aura-cipher'],
    description: 'Büyük Dil Modelleri (LLM) için prompt injection, talimat ezme, DAN personası ve veri sızıntılarını sıfır hata toleransıyla önleyen kurumsal savunma kalkanı. Sahte pozitifleri (false-positive) sıfıra indirmek için deterministik algoritmalar ve Shannon Entropi analizi kullanır.',
    highlights: [
      'Resmi NVI Mod 10 TCKN ve ISO/IEC 7812 Luhn kredi kartı algoritmasıyla %100 kesin PII maskeleme',
      'Shannon Entropi Formülü (H(X)) ile gizlenmiş/obfuscated base64 zararlı yük tespiti',
      'Zero-Width görünmez karakter ayıklama ve ChatML belirteç süzgeci',
      '21/21 Kapsamlı Vitest birim ve entegrasyon testi doğrulaması',
      'Canary Token kontrolü ile model içi prompt ifşasını durduran Çıktı Koruma Duvarı'
    ],
    techStack: ['React 19', 'TypeScript', 'Vitest', 'Vite', 'TailwindCSS 4', 'Docker', 'OWASP Top 10'],
    architecture: {
      overview: '5 katmanlı filtreleme hattı: Girdi Normalizasyonu -> Sezgisel Heuristik Injection Tespiti -> KVKK Algoritmik Maskeleme -> Semantik Benzerlik -> Çıktı Koruma Duvarı (Canary Token & Komut Engelleme).',
      algorithmDetails: 'TC Kimlik: NVI Mod 10 ((7*Tek - Çift) mod 10 = d10). Luhn: Her 2. basamak 2 ile çarpılır, >9 ise 9 çıkarılır. Entropi: H(X) = -Σ P(x) log2 P(x), >4.85 bit şüpheli yük alarmı tetikler.',
      diagram: `[ Kullanıcı Girdisi ]
        │
        ▼ 1. Katman: Zero-Width Karakter Ayıklama & Unicode Normalizasyonu
        ▼ 2. Katman: Prompt Injection, DAN & ChatML Tag Blokajı
        ▼ 3. Katman: Algoritmik KVKK / PII Maskeleme (TCKN & Luhn Kart)
        ▼ 4. Katman: Shannon Entropi (H(X) > 4.85) Zararlı Yük Tespiti
        │
        ▼─── GÜVENLİ LLM PROXY
        │
        ▼ 5. Katman: Çıktı Koruma Duvarı (Canary Token Leakage & rm -rf Blokajı)
        ▼ [ Güvenli & Arındırılmış Yanıt ]`,
      codeSnippet: `// Shannon Entropi Hesabı
export function calculateShannonEntropy(str: string): number {
  const len = str.length;
  if (len === 0) return 0;
  const freq: Record<string, number> = {};
  for (const char of str) freq[char] = (freq[char] || 0) + 1;
  return Object.values(freq).reduce((h, count) => {
    const p = count / len;
    return h - p * Math.log2(p);
  }, 0);
}`,
      metrics: [
        { label: 'Vitest Testleri', value: '21/21 Geçti' },
        { label: 'Savunma Katmanı', value: '5 Aşamalı Hat' },
        { label: 'Veri Sızıntısı', value: '%0 (İstemci Taraflı)' },
        { label: 'OWASP Uyumu', value: 'LLM01 / LLM02 / LLM06' }
      ]
    }
  },
  {
    id: 'synapse-flow',
    index: '02',
    title: 'SynapseFlow',
    subtitle: 'Otonom Ajan & Görsel DAG İş Akışı Orkestratörü',
    category: 'ai-llm',
    categoryLabel: 'Yapay Zeka & Ajanlar',
    badge: 'Kahn DAG & React 19',
    year: '2026',
    featured: true,
    image: '/images/synapse-flow.jpg',
    githubUrl: 'https://github.com/goktugis/synapse-flow',
    accentColor: '#a855f7',
    accentGlow: 'rgba(168, 85, 247, 0.45)',
    gradient: 'from-purple-500 via-fuchsia-600 to-indigo-700',
    coords: { x: 500, y: 150 },
    connections: ['neuro-shield', 'aura-cipher', 'planpilot'],
    description: 'Karmaşık yapay zeka ajanlarını, veri boru hatlarını ve asenkron görevleri görsel bir tuval üzerinde orkestre eden yüksek performanslı Directed Acyclic Graph (DAG) yürütme motoru. Neon Cubic Bezier bağlantı hatları, Kahn algoritması ile topolojik sıralama ve derinlemesine döngü (cycle) koruması sunar.',
    highlights: [
      'Kahn Algoritması ile O(V + E) karmaşıklığında deterministik topolojik sıralama ve çalıştırma hattı',
      'Derinlemesine Arama (DFS) ile döngüsel bağımlılıkları ve sonsuz döngüleri anında tespit eden koruma mekanizması',
      'İnteraktif Cubic Bezier neon bağlantı kabloları ve serbest sürüklenebilir düğüm tuvali',
      'Canlı Ajan Simülasyonu: Beklemede, Çalışıyor, Tamamlandı ve Hata durumlarının gerçek zamanlı veri akışı görselleştirmesi',
      'Sıfır Sunucu Bağımlılığı (Zero-Leakage): Tüm grafik mantığı tamamen tarayıcı içinde yürütülür'
    ],
    techStack: ['React 19', 'TypeScript', 'Vitest', 'Vite', 'TailwindCSS 4', 'Canvas / SVG', 'Kahn Algorithm'],
    architecture: {
      overview: 'Tuval Düğüm Durumu (State Machine) -> DFS Döngü Doğrulayıcı -> Kahn Topolojik Sıralama Çözücü -> Adım Adım Ajan Yürütücüsü.',
      algorithmDetails: "Kahn Algoritması: Her düğümün giriş derecesi (in-degree) hesaplanır. Giriş derecesi 0 olan düğümler kuyruğa alınır. İşlendikçe komşuların derecesi azaltılır. Kalan derece > 0 ise döngü (cycle) mevcuttur.",
      diagram: `[ Giriş Düğümü (Trigger) ] ──▶ [ Veri Doğrulayıcı ]
                                        │
                                        ▼
                               [ Yapay Zeka Ajanı ]
                                        │
                                        ▼
                              [ Güvenlik Filtresi ] ──▶ [ Çıktı / Veritabanı ]`,
      codeSnippet: `// Kahn's Topological Sort Implementation
export function topologicalSort(nodes: Node[], edges: Edge[]): string[] {
  const inDegree = new Map<string, number>();
  nodes.forEach(n => inDegree.set(n.id, 0));
  edges.forEach(e => inDegree.set(e.target, (inDegree.get(e.target) || 0) + 1));
  
  const queue = nodes.filter(n => inDegree.get(n.id) === 0).map(n => n.id);
  const order: string[] = [];
  
  while (queue.length > 0) {
    const current = queue.shift()!;
    order.push(current);
    edges.filter(e => e.source === current).forEach(e => {
      inDegree.set(e.target, inDegree.get(e.target)! - 1);
      if (inDegree.get(e.target) === 0) queue.push(e.target);
    });
  }
  return order;
}`,
      metrics: [
        { label: 'Algoritmik Karmaşıklık', value: 'O(V + E)' },
        { label: 'Vitest Testi', value: '7/7 Geçti' },
        { label: 'Döngü Tespiti', value: 'DFS %100 Garantili' },
        { label: 'Bağlantı Türü', value: 'Cubic Bezier Neon' }
      ]
    }
  },
  {
    id: 'aura-cipher',
    index: '03',
    title: 'AuraCipher',
    subtitle: 'Zero-Knowledge Kriptografik Kasa & Görsel Steganografi Lab',
    category: 'security',
    categoryLabel: 'Kriptografi & Siber Güvenlik',
    badge: 'AES-256-GCM & LSB',
    year: '2026',
    featured: true,
    image: '/images/aura-cipher.jpg',
    githubUrl: 'https://github.com/goktugis/aura-cipher',
    accentColor: '#10b981',
    accentGlow: 'rgba(16, 185, 129, 0.45)',
    gradient: 'from-emerald-500 via-teal-600 to-green-700',
    coords: { x: 700, y: 240 },
    connections: ['neuro-shield', 'synapse-flow'],
    description: 'Askeri düzeyde kimlik doğrulamalı AES-256-GCM şifreleme, 100.000 iterasyonlu PBKDF2 anahtar türetimi ve tarayıcı içi LSB (Least Significant Bit) görsel steganografi motorunu bir araya getiren sıfır-bilgi (zero-knowledge) güvenlik laboratuvarı.',
    highlights: [
      'Görsel Steganografi (LSB): Şifrelenmiş bayt dizilerini taşıyıcı PNG piksellerinin RGB kanallarının en önemsiz bitlerine enjekte eder',
      'Web Crypto API tabanlı AES-256-GCM: Otantikasyon etiketi ile manipülasyon korumalı şifreleme',
      'PBKDF2-SHA256 (100.000 iterasyon) ile kaba kuvvet (brute-force) saldırılarına karşı tam direnç',
      'Sıfır Harici Ağ İsteği: Anahtarlar, düz metinler ve pikseller yalnızca yerel istemci RAM belleğinde işlenir',
      'Kriptografik Olay Denetim Kaydı (Audit Log) ile her adımın şeffaf doğrulanması'
    ],
    techStack: ['JavaScript', 'Web Crypto API', 'Canvas API', 'HTML5', 'CSS3 Modern UI', 'Vitest'],
    architecture: {
      overview: 'Parola -> PBKDF2 (100k iter, 16-byte Salt) -> AES-256-GCM Anahtarı -> Şifreli Yük + 12-byte IV -> Canvas LSB Piksel Dağıtıcı -> Güvenli İndirilebilir PNG.',
      algorithmDetails: 'LSB Steganografi: Her pikselin R, G, B baytlarının son biti (en anlamsız bit) mesajın 1 biti ile yer değiştirilir. Gözün algılayamayacağı renk değişimi (< 0.4% sapma).',
      diagram: `[ Gizli Mesaj ] ──▶ PBKDF2 (100k Tur) ──▶ AES-256-GCM Şifreleme
                                                    │
                                                    ▼
[ Taşıyıcı PNG ] ──▶ Canvas RGB Pikselleri ──▶ [ LSB Bit Enjeksiyonu ]
                                                    │
                                                    ▼
                                    [ Görünmez Şifreli PNG ]`,
      codeSnippet: `// Web Crypto API AES-256-GCM Entegrasyonu
export async function encryptPayload(data: Uint8Array, key: CryptoKey, iv: Uint8Array) {
  return await crypto.subtle.encrypt(
    { name: 'AES-256-GCM', iv, tagLength: 128 },
    key,
    data
  );
}`,
      metrics: [
        { label: 'Şifreleme Standardı', value: 'AES-256-GCM' },
        { label: 'Anahtar Türetimi', value: 'PBKDF2 100K Tur' },
        { label: 'Steganografi Türü', value: 'LSB (RGB Bit)' },
        { label: 'Ağ İletimi', value: '0 Bayt (İstemci)' }
      ]
    }
  },
  {
    id: 'han-kebap-steakhouse',
    index: '04',
    title: 'Han Kebap & Steakhouse',
    subtitle: 'Ultra-Lüks Gastronomi Deneyimi & Rezervasyon Platformu',
    category: 'fullstack',
    categoryLabel: 'Lüks Gastronomi & Web',
    badge: 'Charred Wood & Gold UI',
    year: '2026',
    featured: true,
    image: '/images/han-kebap.jpg',
    githubUrl: 'https://github.com/goktugis/han-kebap-steakhouse',
    accentColor: '#f59e0b',
    accentGlow: 'rgba(245, 158, 11, 0.45)',
    gradient: 'from-amber-500 via-orange-600 to-yellow-700',
    coords: { x: 800, y: 440 },
    connections: ['planpilot', 'dietitian-app'],
    description: 'Geleneksel Türk kebap mirası ile modern dry-aged steakhouse kültürünü buluşturan, yanık meşe ve altın varak estetiğiyle tasarlanmış, interaktif pişme derecesi simülatörüne sahip lüks restoran web deneyimi.',
    highlights: [
      'İnteraktif Et Pişme Derecesi Seçicisi (Rare, Medium Rare, Medium, Well-Done) ile gerçek zamanlı et görseli dönüşümü',
      'Dry-Aged özel kesimlerin (Tomahawk, T-Bone, Dallas Steak) interaktif hikaye anlatımı',
      'Entegre masa rezervasyon motoru ve dinamik VIP oda talebi',
      'Charred Wood & Dark Amber renk paletiyle Awwwards seviyesi tipografi ve görsel sunum'
    ],
    techStack: ['JavaScript', 'HTML5 Semantik', 'CSS3 Özel Animasyonlar', 'Node.js Express', 'REST API'],
    architecture: {
      overview: 'Modern animasyonlu frontend arayüzü, interaktif durum seçicileri, Express.js rezervasyon API arka yüzü ve responsive tasarım.',
      metrics: [
        { label: 'Tasarım Dili', value: 'Charred Wood & Gold' },
        { label: 'İnteraktiflik', value: 'Pişme Derecesi Simülatörü' },
        { label: 'Rezervasyon', value: 'Entegre Talep Motoru' }
      ]
    }
  },
  {
    id: 'planpilot',
    index: '05',
    title: 'PlanPilot',
    subtitle: 'KOBİ’ler İçin Akıllı Randevu & Talep Yönetim Sistemi',
    category: 'enterprise',
    categoryLabel: 'KOBİ & Talep Yönetimi',
    badge: 'Full-Stack REST & SQLite',
    year: '2026',
    featured: false,
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80',
    githubUrl: 'https://github.com/goktugis/planpilot',
    accentColor: '#6366f1',
    accentGlow: 'rgba(99, 102, 241, 0.45)',
    gradient: 'from-indigo-500 via-blue-600 to-indigo-800',
    coords: { x: 600, y: 550 },
    connections: ['synapse-flow', 'han-kebap-steakhouse', 'dietitian-app'],
    description: "KOBİ'lerin müşteri taleplerini, randevularını ve teklif isteklerini dağınık WhatsApp mesajları yerine tek bir akıllı panelde toplamalarını sağlayan uçtan uca talep orkestrasyon sistemi.",
    highlights: [
      'Dinamik talep toplama formu ve otomatik randevu zamanlama algoritması',
      'Yönetici dashboard ekranında talep durumları (Beklemede, Onaylandı, Tamamlandı) takibi',
      'SQLite veritabanı ile hafif, hızlı ve sıfır yapılandırmalı yerel veri saklama',
      'Render.com dağıtımına hazır optimize edilmiş Node.js Express arka yüzü'
    ],
    techStack: ['Node.js', 'Express', 'SQLite3', 'JavaScript', 'HTML5', 'CSS3', 'REST API'],
    architecture: {
      overview: 'Landing Page -> Form Doğrulama -> Node.js Express REST API -> SQLite3 CRUD İşlemleri -> Yönetici Paneli.',
      metrics: [
        { label: 'Veritabanı', value: 'SQLite3' },
        { label: 'Mimari', value: 'RESTful API' },
        { label: 'Kullanım Alanı', value: 'KOBİ Operasyonları' }
      ]
    }
  },
  {
    id: 'dietitian-app',
    index: '06',
    title: 'DietitianApp',
    subtitle: 'Klinik Beslenme & Hasta Yönetim Platformu (.NET MVC)',
    category: 'enterprise',
    categoryLabel: 'Sağlık & .NET Mimarisi',
    badge: 'C# .NET MVC & Docker',
    year: '2026',
    featured: false,
    image: '/images/dietitian-app.png',
    githubUrl: 'https://github.com/goktugis/DietitianApp',
    accentColor: '#14b8a6',
    accentGlow: 'rgba(20, 184, 166, 0.45)',
    gradient: 'from-teal-500 via-emerald-600 to-cyan-700',
    coords: { x: 400, y: 620 },
    connections: ['planpilot', 'hcc-survival-project'],
    description: 'Diyetisyenler ve klinikler için hasta takip, kişiselleştirilmiş beslenme programı hazırlama, makro/mikro besin hesaplama ve randevu yönetimini tek bir kurumsal çatıda birleştiren C# .NET uygulaması.',
    highlights: [
      'C# ASP.NET MVC mimarisinde kurumsal katmanlı yazılım deseni',
      'Hasta profilleri, BMI/BMR endeksi hesaplama ve dinamik yemek tarifleri kütüphanesi',
      'Docker konteynerizasyon desteği ile anında dağıtım ve taşınabilirlik',
      'Rol tabanlı yetkilendirme (Diyetisyen & Danışan arayüzleri)'
    ],
    techStack: ['C#', 'ASP.NET MVC', 'Entity Framework', 'Docker', 'SQL Server', 'Bootstrap'],
    architecture: {
      overview: 'Katmanlı Kurumsal Mimari: Controller -> Service -> Repository -> SQL Server Veritabanı ve Dockerize Edilmiş Dağıtım.',
      metrics: [
        { label: 'Backend', value: 'C# ASP.NET Core' },
        { label: 'Konteyner', value: 'Docker Destekli' },
        { label: 'Domain', value: 'Klinik Sağlık & Beslenme' }
      ]
    }
  },
  {
    id: 'hcc-survival-project',
    index: '07',
    title: 'HCC Survival Prediction',
    subtitle: 'Klinik Onkoloji Sağkalım Tahminleme Makine Öğrenimi Modeli',
    category: 'ml-data',
    categoryLabel: 'Makine Öğrenimi & Biyomedikal',
    badge: 'Python & Scikit-Learn',
    year: '2026',
    featured: false,
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1200&q=80',
    githubUrl: 'https://github.com/goktugis/machine_learning_HCC_survival_project',
    accentColor: '#f43f5e',
    accentGlow: 'rgba(244, 63, 94, 0.45)',
    gradient: 'from-rose-500 via-red-600 to-pink-700',
    coords: { x: 200, y: 550 },
    connections: ['dietitian-app', 'goruntu-isleme'],
    description: 'Hepatosellüler Karsinoma (HCC karaciğer kanseri) hastalarının klinik ve laboratuvar verileri üzerinden sağkalım olasılıklarını tahmin eden gelişmiş makine öğrenimi modeli.',
    highlights: [
      'Klinik veri ön işleme, eksik veri doldurma (imputation) ve dengesiz sınıf analizi',
      'Öznitelik seçimi (Feature Selection) ile kritik biyobelirteçlerin tespiti',
      'Random Forest, XGBoost ve Lojistik Regresyon modellerinin ROC-AUC ve F1 metrikleriyle kıyaslanması',
      'Tıbbi karar destek süreçleri için açıklanabilir yapay zeka çıkarımları'
    ],
    techStack: ['Python', 'Scikit-Learn', 'Pandas', 'NumPy', 'Matplotlib', 'Seaborn'],
    architecture: {
      overview: 'Veri Temizleme & Normalizasyon -> Özellik Seçimi -> Çapraz Doğrulama (K-Fold Cross Validation) -> Model Kıyaslama ve Karar Metrikleri.',
      metrics: [
        { label: 'Model Alanı', value: 'Onkoloji Sağkalım Analizi' },
        { label: 'Dil', value: 'Python 3' },
        { label: 'Kütüphaneler', value: 'Scikit-learn / Pandas' }
      ]
    }
  },
  {
    id: 'goruntu-isleme',
    index: '08',
    title: 'VisionTracker (Görüntü İşleme)',
    subtitle: 'Gerçek Zamanlı Renk Uzayı Segmentasyonu & Nesne Takibi',
    category: 'ml-data',
    categoryLabel: 'Bilgisayarlı Görü ve OpenCV',
    badge: 'OpenCV & Python',
    year: '2026',
    featured: false,
    image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1200&q=80',
    githubUrl: 'https://github.com/goktugis/Goruntu-Isleme',
    accentColor: '#ef4444',
    accentGlow: 'rgba(239, 68, 68, 0.45)',
    gradient: 'from-red-500 via-orange-600 to-amber-700',
    coords: { x: 150, y: 350 },
    connections: ['hcc-survival-project', 'oil-spill-project', 'neuro-shield'],
    description: 'Gerçek zamanlı video akışında kırmızı nesnelerin HSV renk uzayında morfolojik filtreleme ve kontur analiziyle yüksek FPS değerlerinde tespit ve merkez takibini gerçekleştiren bilgisayarlı görü projesi.',
    highlights: [
      'BGR -> HSV renk uzayı dönüşümü ve hassas renk eşikleme (thresholding)',
      'Morfolojik aşındırma (erosion) ve genişletme (dilation) ile gürültü arındırma',
      'Kontur momentleri ile nesne ağırlık merkezinin (centroid) canlı hesaplanması ve yörünge çizimi'
    ],
    techStack: ['Python', 'OpenCV', 'NumPy', 'Computer Vision'],
    architecture: {
      overview: 'Kamera Akışı -> HSV Filtre -> İkili Maskeleme (Binary Mask) -> Morfolojik Operatörler -> Kontur Tespiti -> Koordinat Çıktısı.',
      metrics: [
        { label: 'Motor', value: 'OpenCV 4' },
        { label: 'Metot', value: 'HSV Centroid Moment' },
        { label: 'Uygulama', value: 'Gerçek Zamanlı Takip' }
      ]
    }
  },
  {
    id: 'oil-spill-project',
    index: '09',
    title: 'Oil Spill Detection',
    subtitle: 'Uydu Radar Spektral Verileri ile Deniz Felaketi Sınıflandırma',
    category: 'ml-data',
    categoryLabel: 'Uydu Algılama & Veri Analizi',
    badge: 'Python & MATLAB',
    year: '2026',
    featured: false,
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80',
    githubUrl: 'https://github.com/goktugis/machine_learning_oill_spill_project',
    accentColor: '#0284c7',
    accentGlow: 'rgba(2, 132, 199, 0.45)',
    gradient: 'from-sky-500 via-blue-700 to-indigo-900',
    coords: { x: 180, y: 150 },
    connections: ['goruntu-isleme', 'neuro-shield'],
    description: 'Uzaktan algılama uydu radar ve spektral verilerini analiz ederek deniz yüzeyindeki petrol sızıntılarını ve çevresel kirlilik desenlerini sınıflandıran makine öğrenimi projesi.',
    highlights: [
      'Uydu spektral doku özniteliklerinin çıkarılması ve boyutsallık indirgeme',
      'MATLAB ve Python kütüphaneleriyle ortak veri boru hattı',
      'Çevresel felaketleri erken aşamada tespit eden sınıflandırma modeli'
    ],
    techStack: ['Python', 'MATLAB', 'Scikit-Learn', 'NumPy', 'Radar Feature Engineering'],
    architecture: {
      overview: 'Uydu Görüntü Girişi -> Doku ve Frekans Dönüşümü -> Özellik Vektörü Çıkarımı -> Sınıflandırma Sınıfı.',
      metrics: [
        { label: 'Veri Kaynağı', value: 'Uydu Radar Sensörleri' },
        { label: 'Teknolojiler', value: 'Python & MATLAB' },
        { label: 'Amaç', value: 'Çevresel Afet Koruması' }
      ]
    }
  }
];


export const SKILL_CATEGORIES = [
  {
    title: 'Yapay Zeka & Ajan Sistemleri',
    color: 'from-cyan-500 to-blue-600',
    skills: [
      { name: 'Directed Acyclic Graph (DAG) Motorları', level: 98, note: 'Kahn Algoritması & DFS Topolojik Sıralama' },
      { name: 'OWASP LLM Top 10 Savunma Mimarisi', level: 95, note: 'Prompt Injection, DAN, Jailbreak Filtreleri' },
      { name: 'Deterministik Guardrail Boru Hatları', level: 96, note: 'Shannon Entropisi, Zero-Width Temizliği' },
      { name: 'Otonom LLM Ajan Orkestrasyonu', level: 92, note: 'Çoklu Ajan İş Akışları, ReAct Döngüleri' },
    ]
  },
  {
    title: 'Kriptografi & Siber Güvenlik',
    color: 'from-purple-500 to-indigo-600',
    skills: [
      { name: 'AES-256-GCM & PBKDF2 Anahtar Türetimi', level: 96, note: '100K Tur, Otantikasyon Etiketi' },
      { name: 'Görsel Steganografi (LSB)', level: 94, note: 'RGB Piksel Seviyesi Sıfır Bozulmalı Gizleme' },
      { name: 'Zero-Knowledge İstemci Mimarisi', level: 95, note: '0 Harici Ağ İsteği, RAM-Only Güvenliği' },
      { name: 'Algoritmik Veri Maskeleme & KVKK/PII', level: 98, note: 'Resmi NVI Mod 10 TCKN, Luhn ISO/IEC 7812' },
    ]
  },
  {
    title: 'Modern Web & Full-Stack Mimarisi',
    color: 'from-emerald-500 to-teal-600',
    skills: [
      { name: 'React 19 & TypeScript', level: 97, note: 'Strict Mode, Modern Hooks, Custom State' },
      { name: 'Node.js, Express & RESTful APIs', level: 94, note: 'Mikroservisler, Güvenli Middleware Mimarisi' },
      { name: 'C# & ASP.NET Core MVC', level: 88, note: 'Katmanlı Kurumsal Mimari, Docker Desteği' },
      { name: 'Tailwind CSS & Canvas / WebGL UI', level: 96, note: 'Awwwards Seviyesi Cam Efektleri, Neon Estetik' },
    ]
  },
  {
    title: 'Veri Bilimi & Makine Öğrenimi',
    color: 'from-amber-500 to-orange-600',
    skills: [
      { name: 'Python, NumPy & Pandas', level: 92, note: 'Büyük Veri İşleme, İstatistiksel Analiz' },
      { name: 'Scikit-Learn & Klinik Tahminleme', level: 89, note: 'Kanser Sağkalım, ROC-AUC Optimizasyonu' },
      { name: 'OpenCV & Bilgisayarlı Görü', level: 88, note: 'Gerçek Zamanlı Renk Eşikleme & Takip' },
      { name: 'Docker, Git & CI/CD Pipeline', level: 91, note: 'Konteyner Dağıtımı, Otomatik Testler' },
    ]
  }
];

export const PROFILE_INFO = {
  name: 'Göktuğ İşeri',
  title: 'Full-Stack & AI Systems Architect',
  location: 'Türkiye',
  bio: 'Deterministik algoritmalar, sıfır-güven yapay zeka savunma hatları, interaktif görsel DAG motorları ve yüksek performanslı modern web mimarileri inşa eden yazılım mühendisi.',
  stats: [
    { label: 'Açık Kaynak Sistem', value: '9+' },
    { label: 'İstemci Sıfır-Bilgi', value: '%100' },
    { label: 'Kapsamlı Test Başarısı', value: '28/28' },
    { label: 'OWASP LLM Uyumluluğu', value: 'LLM01-10' }
  ],
  socials: {
    github: 'https://github.com/goktugis',
    linkedin: 'https://linkedin.com/in/goktugis',
    email: 'mailto:goktugis@users.noreply.github.com'
  }
};
