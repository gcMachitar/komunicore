'use client';

import { useState, useEffect } from 'react';
import {
  Shield, Zap, CheckCircle2, AlertTriangle, FileText, MapPin, 
  Lock, Users, Heart, ArrowRight, Activity, Database, Smartphone, 
  Layers, RefreshCw, BarChart3, Scan, ExternalLink, ChevronRight,
  Sparkles, Check, Clock, Radio, Award, Sun, Eye, Leaf, Globe,
  Terminal, ShieldCheck, Cpu, ArrowUpRight, CheckCircle, Play, Menu, X
} from 'lucide-react';

const CONTENT = {
  tl: {
    nav: {
      crisis: 'Kalamidad Response',
      trust: 'Tiwala at Resibo',
      howItWorks: 'Paano Gumagana',
      causes: 'Purok Operations',
      roles: '4 User Roles',
      launch: 'Launch Live OS',
    },
    hero: {
      tag: 'HANDA KA NA BA SA SAKUNA?',
      title1: 'Bayanihan sa bawat Purok.',
      title2: 'Tulong na may resibo.',
      subhead: 'Bridging the critical 72-hour disaster relief gap for Philippine Barangays. Zero-connectivity Level-7 Geohashing, 4-digit PIN handshakes, at 100% compliant sa COA Circular No. 2014-002.',
      ctaPrimary: 'Subukan ang Live OS',
      ctaSecondary: 'Subukan ang Interactive Demo',
      photoTag1: 'Purok 4 Senior Aid',
      photoTag2: 'Active Bayanihan',
      photoTag3: 'COA Annex A/B Ready',
      photoSubCenter: 'Level-7 Geohash Verified',
      trustPill: 'Diretso sa ating mga kababayan — bawat pamilya may PIN handshake, bawat lata may resibo.',
    },
    protection: {
      badge: 'MAGBIGAY AT MAMAHAGI NANG MAY TIWALA',
      title: 'Protektado mula simula hanggang liquidation.',
      subtitle: 'Bago pa man maipamahagi ang kahit isang supot ng bigas, may mga pananggalang nang nakatayo laban sa pandaraya, pagka-bulok, at audit disallowance.',
      cards: [
        {
          title: 'Level-7 Geohash Checks First',
          desc: 'Bawat resident intake ay automatically naka-link sa ~150-meter purok coordinate hash. Walang nakakalusot na cross-boundary duplicate claiming mula sa ibang baranggay o purok.'
        },
        {
          title: '4-Digit Cryptographic Handshake',
          desc: 'Kahit walang internet o kuryente sa evacuation center, ang distribution ay double-checked gamit ang one-time 4-digit PIN ng evacuee. Zero chance para sa ghost beneficiaries.'
        },
        {
          title: 'Everything Stays in the Open (COA Ready)',
          desc: 'Bawat donasyon, relief pack, at release ay naka-record sa public ledger. Instant 1-click export sa certified COA Annex A at Annex B liquidation formats. Lahat, may resibo.'
        }
      ]
    },
    howItWorks: {
      badge: 'PAANO GUMAGANA',
      title: 'Mula ebidensya hanggang pamamahagi — walang shortcut.',
      subtitle: 'Apat na simpleng hakbang na gumagana nang 100% offline sa bawat evacuation gym at relief desk.',
      steps: [
        {
          title: 'Multimodal ID Intake',
          desc: 'I-scan o i-type ang Barangay / PhilID ng residente. Auto-flagging para sa Senior, PWD, at buntis.'
        },
        {
          title: 'Purok Geohash Lock',
          desc: 'Awtomatikong kino-compute ang Level-7 geohash upang masigurong bawat pamilya ay sa tamang purok kukuha.'
        },
        {
          title: '4-Digit PIN Handshake',
          desc: 'Ipapakita ng evacuee ang 4-digit PIN badge. Itutugma ito ng SK volunteer para ma-release ang relief pack.'
        },
        {
          title: 'Verified COA Payout',
          desc: 'Lahat ng datos ay nagiging certified Relief Distribution Sheet (RDS) na handa para sa audit ng COA.'
        }
      ],
      resilienceTitle: 'Hindi kailanman hahawakan ang datos nang walang offline backup',
      resilienceDesc: 'Kahit mawalan ng signal ang buong isla, ang KomuniCore ay tumatakbo sa lokal na device storage (IndexedDB/SQLite). Awtomatikong nag-si-sync ang records sa pamamagitan ng mesh network pagbalik ng signal.'
    },
    causes: {
      title: 'Aktibong operasyon sa bawat Purok.',
      subtitle: 'Tunay na relief status mula sa mga evacuation shelters na naghihintay ng inyong ambag at suporta.',
      viewAll: 'Tingnan ang lahat ng donasyon at pangangailangan',
      btnTry: 'Subukan',
      items: [
        {
          id: 'purok-3',
          category: 'DISASTER RELIEF',
          location: 'Purok 3 Mabini, Evacuation Gym',
          title: 'Family Food Packs & Clean Drinking Water',
          image: '/hero_community.jpg',
          raised: '318',
          goal: '350',
          unit: 'packs',
          percentage: 91,
          status: 'Verified Purok',
          roleTarget: 'admin'
        },
        {
          id: 'purok-4',
          category: 'MEDICAL & VULNERABLE',
          location: 'Purok 4 Ilaya, Chapel Shelter',
          title: 'Elderly Maintenance Medicine & Senior First-Aid Kits',
          image: '/volunteer_senior.jpg',
          raised: '96',
          goal: '100',
          unit: 'kits',
          percentage: 96,
          status: 'Verified Purok',
          roleTarget: 'worker'
        },
        {
          id: 'purok-1',
          category: 'COMMUNITY & NUTRITION',
          location: 'Purok 1 Riverside, Daycare Center',
          title: 'Emergency Rice Sacks & Infant Care Packs',
          image: '/relief_packs.jpg',
          raised: '55',
          goal: '150',
          unit: 'packs',
          percentage: 37,
          status: 'Verified Purok',
          roleTarget: 'donor'
        },
        {
          id: 'purok-2',
          category: 'SHELTER SUPPORT',
          location: 'Purok 2 Centro, Elementary School',
          title: 'Emergency Flood Survival Kits & Hygiene Packs',
          image: '/hero_aerial.jpg',
          raised: '216',
          goal: '200',
          unit: 'packs',
          percentage: 108,
          status: 'Verified Purok',
          roleTarget: 'resident'
        }
      ]
    },
    roles: {
      badge: 'ROLE-BASED GOVERNANCE',
      title: 'Isang sistema para sa bawat sektor.',
      subtitle: 'Subukan ang alinman sa 4 na live role views sa KomuniCore simulator:',
      adminTitle: 'Barangay Official',
      adminDesc: 'Analytics dashboard, shelter capacity management, inventory triage, at 1-click COA Annex A & B PDF generator.',
      adminBtn: 'Launch Admin Command',
      workerTitle: 'SK Tech Brigade',
      workerDesc: 'Offline resident intake desk, on-device OCR camera scanner, auto-geohashing, at PIN handshake verification logger.',
      workerBtn: 'Launch Worker Desk',
      residentTitle: 'Resident / Evacuee',
      residentDesc: 'Digital evacuation badge, verified Level-7 Purok Geohash, offline 4-digit claiming PIN, at real-time aid status.',
      residentBtn: 'Launch Resident Portal',
      donorTitle: 'Donor / NGO Volunteer',
      donorDesc: 'Real-time barangay relief deficit feed, pledge pledges tracker, at shelf-life monitor (OK, Expiring <3d, Expired).',
      donorBtn: 'Launch Donor Hub',
    },
    comparison: {
      badge: 'TRADITIONAL VS KOMUNICORE',
      title: 'Bakit Mas Ligtas at Mabilis sa KomuniCore?',
      subtitle: 'Pagkakaiba ng lumang sistema sa bagong digital disaster operating system:',
      oldTitle: 'Lumang Manual System',
      newTitle: 'KomuniCore Disaster OS',
      points: [
        {
          old: 'Papel na listahan na madaling mabasa o mawala sa baha',
          new: 'Offline-first encrypted database sa mobile & laptop'
        },
        {
          old: 'Mataas na posibilidad ng double claiming at ghost list',
          new: 'Level-7 Geohash (~150m) & 4-digit PIN verification'
        },
        {
          old: 'Linggo bago makabuo ng COA liquidation report',
          new: '1-click Instant export sa COA Annex A & B formats'
        },
        {
          old: 'Mabagal na koordinasyon kapag walang signal o kuryente',
          new: 'Lokal mesh-sync automatic back-fill pagbalik ng signal'
        }
      ]
    },
    footer: {
      title: 'KomuniCore Operating System',
      subtitle: 'Offline-First Barangay Disaster Relief & Civic Governance',
      btn: 'Pumasok sa Live System →',
      tagline: 'KomuniCore • Binuo para sa Sambayanang Pilipino at Lokal na Pamahalaan.'
    }
  },
  en: {
    nav: {
      crisis: 'Disaster Response',
      trust: 'Trust & Verification',
      howItWorks: 'How It Works',
      causes: 'Purok Operations',
      roles: '4 User Roles',
      launch: 'Launch Live OS',
    },
    hero: {
      tag: 'ARE YOU DISASTER-READY?',
      title1: 'Community Aid for Every Purok.',
      title2: 'Relief with Audit Proof.',
      subhead: 'Bridging the critical 72-hour disaster relief gap for Philippine Barangays. Zero-connectivity Level-7 Geohashing, 4-digit PIN handshakes, and 100% compliant with COA Circular No. 2014-002.',
      ctaPrimary: 'Launch Live OS Simulator',
      ctaSecondary: 'Try Interactive Demo',
      photoTag1: 'Purok 4 Senior Aid',
      photoTag2: 'Active Bayanihan',
      photoTag3: 'COA Annex A/B Ready',
      photoSubCenter: 'Level-7 Geohash Verified',
      trustPill: 'Direct to our citizens — every family verified with PIN handshake, every item accounted with audit trail.',
    },
    protection: {
      badge: 'DISTRIBUTE WITH INTEGRITY & TRUST',
      title: 'Protected from intake to final liquidation.',
      subtitle: 'Before a single bag of rice is distributed, robust safeguards prevent fraud, donation spoilage, and COA audit disallowances.',
      cards: [
        {
          title: 'Level-7 Geohash Checks First',
          desc: 'Every resident intake is automatically mapped to ~150-meter purok coordinate hash. Prevents cross-boundary duplicate claims between neighboring barangays or puroks.'
        },
        {
          title: '4-Digit Cryptographic Handshake',
          desc: 'Even with zero cellular connectivity in evacuation gyms, relief distribution is double-checked via the resident’s one-time 4-digit PIN. Zero ghost beneficiaries.'
        },
        {
          title: 'Everything Stays in the Open (COA Ready)',
          desc: 'Every pledge, relief pack, and release is immutably recorded. Instant 1-click export into certified COA Annex A and Annex B liquidation formats with full audit trails.'
        }
      ]
    },
    howItWorks: {
      badge: 'HOW IT WORKS',
      title: 'From intake to distribution — zero shortcuts.',
      subtitle: 'Four straightforward steps operating 100% offline across every evacuation gym and disaster relief desk.',
      steps: [
        {
          title: 'Multimodal ID Intake',
          desc: 'Scan or input resident Barangay ID / PhilID with automated priority flags for Seniors, PWDs, and pregnant mothers.'
        },
        {
          title: 'Purok Geohash Lock',
          desc: 'Automatically computes Level-7 geohash to ensure each household receives relief strictly at their assigned Purok.'
        },
        {
          title: '4-Digit PIN Handshake',
          desc: 'Evacuee presents their 4-digit PIN badge. The SK volunteer matches and confirms to safely log the transaction.'
        },
        {
          title: 'Verified COA Payout',
          desc: 'All distribution logs compile into official Relief Distribution Sheets (RDS) ready for immediate Commission on Audit submission.'
        }
      ],
      resilienceTitle: 'Data is never lost during blackouts or typhoons',
      resilienceDesc: 'Even if cellular towers fail across the island, KomuniCore runs completely on local device storage (IndexedDB/SQLite). Records automatically mesh-sync once signal returns.'
    },
    causes: {
      title: 'Active Operations in Every Purok.',
      subtitle: 'Live relief status from evacuation shelters awaiting community pledges and resource allocations.',
      viewAll: 'View all donation deficits & active needs',
      btnTry: 'Test View',
      items: [
        {
          id: 'purok-3',
          category: 'DISASTER RELIEF',
          location: 'Purok 3 Mabini, Evacuation Gym',
          title: 'Family Food Packs & Clean Drinking Water',
          image: '/hero_community.jpg',
          raised: '318',
          goal: '350',
          unit: 'packs',
          percentage: 91,
          status: 'Verified Purok',
          roleTarget: 'admin'
        },
        {
          id: 'purok-4',
          category: 'MEDICAL & VULNERABLE',
          location: 'Purok 4 Ilaya, Chapel Shelter',
          title: 'Elderly Maintenance Medicine & Senior First-Aid Kits',
          image: '/volunteer_senior.jpg',
          raised: '96',
          goal: '100',
          unit: 'kits',
          percentage: 96,
          status: 'Verified Purok',
          roleTarget: 'worker'
        },
        {
          id: 'purok-1',
          category: 'COMMUNITY & NUTRITION',
          location: 'Purok 1 Riverside, Daycare Center',
          title: 'Emergency Rice Sacks & Infant Care Packs',
          image: '/relief_packs.jpg',
          raised: '55',
          goal: '150',
          unit: 'packs',
          percentage: 37,
          status: 'Verified Purok',
          roleTarget: 'donor'
        },
        {
          id: 'purok-2',
          category: 'SHELTER SUPPORT',
          location: 'Purok 2 Centro, Elementary School',
          title: 'Emergency Flood Survival Kits & Hygiene Packs',
          image: '/hero_aerial.jpg',
          raised: '216',
          goal: '200',
          unit: 'packs',
          percentage: 108,
          status: 'Verified Purok',
          roleTarget: 'resident'
        }
      ]
    },
    roles: {
      badge: 'ROLE-BASED GOVERNANCE',
      title: 'One system tailored for every stakeholder.',
      subtitle: 'Test any of the 4 live role views in the KomuniCore interactive simulator:',
      adminTitle: 'Barangay Official',
      adminDesc: 'Analytics dashboard, shelter capacity management, inventory triage, and 1-click COA Annex A & B PDF generator.',
      adminBtn: 'Launch Admin Command',
      workerTitle: 'SK Tech Brigade',
      workerDesc: 'Offline resident intake desk, on-device OCR camera scanner, auto-geohashing, and PIN handshake verification logger.',
      workerBtn: 'Launch Worker Desk',
      residentTitle: 'Resident / Evacuee',
      residentDesc: 'Digital evacuation badge, verified Level-7 Purok Geohash, offline 4-digit claiming PIN, and real-time aid status.',
      residentBtn: 'Launch Resident Portal',
      donorTitle: 'Donor / NGO Volunteer',
      donorDesc: 'Real-time barangay relief deficit feed, pledge tracker, and shelf-life monitor (OK, Expiring <3d, Expired).',
      donorBtn: 'Launch Donor Hub',
    },
    comparison: {
      badge: 'TRADITIONAL VS KOMUNICORE',
      title: 'Why KomuniCore is Safer & Faster',
      subtitle: 'Comparison between legacy paper relief distribution vs modern civic disaster OS:',
      oldTitle: 'Legacy Paper System',
      newTitle: 'KomuniCore Disaster OS',
      points: [
        {
          old: 'Paper lists prone to water damage or loss in floods',
          new: 'Offline-first encrypted database on phone & laptop'
        },
        {
          old: 'High vulnerability to ghost lists and double claims',
          new: 'Level-7 Geohash (~150m) & 4-digit PIN verification'
        },
        {
          old: 'Takes weeks to compile COA liquidation audit reports',
          new: '1-click Instant export to certified COA Annex A & B'
        },
        {
          old: 'Halted operations when power or internet fails',
          new: 'Local mesh-sync auto back-fills data when signal returns'
        }
      ]
    },
    footer: {
      title: 'KomuniCore Operating System',
      subtitle: 'Offline-First Barangay Disaster Relief & Civic Governance',
      btn: 'Enter Live System →',
      tagline: 'KomuniCore • Engineered for Philippine Local Government Units and Communities.'
    }
  }
};

export default function LandingPage({ onLaunchApp }) {
  const [lang, setLang] = useState('tl'); // 'tl' | 'en'
  const [pinInput, setPinInput] = useState('');
  const [pinStatus, setPinStatus] = useState('idle'); // 'idle' | 'verifying' | 'verified' | 'failed'
  const [simulatedResident, setSimulatedResident] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const t = CONTENT[lang];

  // Interactive PIN Handshake Demo logic
  const handlePinDigit = (digit) => {
    if (pinInput.length < 4) {
      const nextPin = pinInput + digit;
      setPinInput(nextPin);
      if (nextPin.length === 4) {
        verifyDemoPin(nextPin);
      }
    }
  };

  const handleClearPin = () => {
    setPinInput('');
    setPinStatus('idle');
    setSimulatedResident(null);
  };

  const verifyDemoPin = (pin) => {
    setPinStatus('verifying');
    setTimeout(() => {
      if (pin === '4829' || pin === '1234' || pin === '8888') {
        setPinStatus('verified');
        setSimulatedResident({
          name: 'Elena Santos',
          purok: 'Purok 3 - Mabini Evacuation Center',
          geohash: 'wd77c8e (Level 7)',
          status: 'Senior Priority Verified',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        });
      } else {
        setPinStatus('verified');
        setSimulatedResident({
          name: 'Pedro Penduko',
          purok: 'Purok 1 - Riverside Daycare',
          geohash: 'wd77c9a (Level 7)',
          status: 'Evacuee Verified',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        });
      }
    }, 600);
  };

  return (
    <div className="min-h-screen bg-[#F4F9F6] text-[#063B2C] selection:bg-emerald-500 selection:text-white font-sans antialiased overflow-x-hidden">
      {/* Tactical Top Telemetry Status Bar */}
      <div className="bg-[#E8F4EE] border-b border-[#D2E7DC] px-4 py-2 text-[11px] font-mono text-[#063B2C] flex items-center justify-between overflow-x-auto no-scrollbar whitespace-nowrap">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1.5 font-bold">
            <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse" />
            TELEMETRY: ONLINE (LOCAL MESH)
          </span>
          <span className="text-emerald-500">|</span>
          <span>LEVEL-7 GEOHASH ENGINE: ACTIVE</span>
          <span className="text-emerald-500 font-sans hidden sm:inline">|</span>
          <span className="hidden sm:inline text-emerald-800 font-sans font-semibold">COA CIRCULAR 2014-002 READY</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-[#325346]">LATENCY: 0.2ms (OFFLINE CACHE)</span>
          <span className="px-2 py-0.5 rounded-full bg-emerald-200/80 text-emerald-900 text-[10px] font-bold border border-emerald-300">
            PHILIPPINES LGU DISASTER OS
          </span>
        </div>
      </div>

      {/* Philippine Banig Woven Border Top Ribbon */}
      <div className="banig-ribbon" />

      {/* Navigation Header */}
      <header className="sticky top-0 z-50 bg-[#F4F9F6]/95 backdrop-blur-md border-b border-[#E2ECE7] transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-700 flex items-center justify-center shadow-lg shadow-emerald-600/20 border border-emerald-400/40 transform hover:rotate-3 transition-transform">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-black text-xl tracking-tight text-[#063B2C]">
                  Komuni<span className="text-emerald-600">Core</span>
                </span>
                <span className="hidden sm:inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-emerald-100/80 text-emerald-800 border border-emerald-300 uppercase tracking-wider">
                  PSC Architecture
                </span>
              </div>
              <p className="text-[11px] text-[#4E7164] font-medium hidden sm:block">
                Barangay Disaster Relief & Audit OS
              </p>
            </div>
          </div>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-6 text-xs font-bold text-[#3B5B4F] tracking-wide">
            <a href="#hero" className="hover:text-emerald-600 transition-colors">{t.nav.crisis}</a>
            <a href="#handshake-demo" className="hover:text-emerald-600 transition-colors">PIN Handshake Demo</a>
            <a href="#protection" className="hover:text-emerald-600 transition-colors">{t.nav.trust}</a>
            <a href="#how-it-works" className="hover:text-emerald-600 transition-colors">{t.nav.howItWorks}</a>
            <a href="#comparison" className="hover:text-emerald-600 transition-colors">Vs Legacy</a>
            <a href="#causes" className="hover:text-emerald-600 transition-colors">{t.nav.causes}</a>
            <a href="#roles" className="hover:text-emerald-600 transition-colors">{t.nav.roles}</a>
          </nav>

          {/* Right Action & Language Switcher */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Language Switcher Pill Toggle */}
            <div className="flex items-center p-1 rounded-full bg-emerald-100/70 border border-emerald-300 shadow-inner">
              <button
                onClick={() => setLang('tl')}
                className={`px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full text-[10px] sm:text-[11px] font-black transition-all cursor-pointer flex items-center gap-1 ${
                  lang === 'tl'
                    ? 'bg-emerald-700 text-white shadow-sm scale-105'
                    : 'text-emerald-900 hover:text-emerald-950'
                }`}
                title="Ipakita sa Tagalog"
              >
                <span>🇵🇭 Tagalog</span>
              </button>
              <button
                onClick={() => setLang('en')}
                className={`px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full text-[10px] sm:text-[11px] font-black transition-all cursor-pointer flex items-center gap-1 ${
                  lang === 'en'
                    ? 'bg-emerald-700 text-white shadow-sm scale-105'
                    : 'text-emerald-900 hover:text-emerald-950'
                }`}
                title="Show in English"
              >
                <span>🇺🇸 English</span>
              </button>
            </div>

            {/* Launch App Button (Hidden on smallest screens, available in mobile menu) */}
            <button
              onClick={() => onLaunchApp('admin')}
              className="hidden sm:flex px-4 sm:px-5 py-2.5 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs sm:text-sm items-center gap-2 shadow-lg shadow-emerald-700/25 transition-all transform hover:scale-[1.03] active:scale-[0.98] cursor-pointer"
            >
              <Zap className="w-4 h-4 fill-current text-white" />
              <span>{t.nav.launch}</span>
            </button>

            {/* Mobile Hamburger Toggle Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-xl bg-emerald-100/80 text-[#063B2C] border border-emerald-300 hover:bg-emerald-200 transition-colors"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Collapsible Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-[#F4F9F6] border-b border-[#E2ECE7] px-4 pt-3 pb-6 space-y-3 animate-fadeIn shadow-xl">
            <nav className="flex flex-col gap-2.5 text-sm font-bold text-[#3B5B4F]">
              <a
                href="#hero"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 rounded-xl hover:bg-emerald-100/80 hover:text-emerald-800 transition-colors"
              >
                {t.nav.crisis}
              </a>
              <a
                href="#handshake-demo"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 rounded-xl hover:bg-emerald-100/80 hover:text-emerald-800 transition-colors"
              >
                PIN Handshake Demo
              </a>
              <a
                href="#protection"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 rounded-xl hover:bg-emerald-100/80 hover:text-emerald-800 transition-colors"
              >
                {t.nav.trust}
              </a>
              <a
                href="#how-it-works"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 rounded-xl hover:bg-emerald-100/80 hover:text-emerald-800 transition-colors"
              >
                {t.nav.howItWorks}
              </a>
              <a
                href="#comparison"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 rounded-xl hover:bg-emerald-100/80 hover:text-emerald-800 transition-colors"
              >
                Vs Legacy
              </a>
              <a
                href="#causes"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 rounded-xl hover:bg-emerald-100/80 hover:text-emerald-800 transition-colors"
              >
                {t.nav.causes}
              </a>
              <a
                href="#roles"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 rounded-xl hover:bg-emerald-100/80 hover:text-emerald-800 transition-colors"
              >
                {t.nav.roles}
              </a>
            </nav>

            <button
              onClick={() => { setMobileMenuOpen(false); onLaunchApp('admin'); }}
              className="w-full mt-2 py-3 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white font-black text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-700/20 transition-all cursor-pointer"
            >
              <Zap className="w-4 h-4 fill-current text-white" />
              <span>{t.nav.launch}</span>
            </button>
          </div>
        )}
      </header>

      {/* Hero Section: Bright Fresh Mint Backdrop & Rotating Radar Sweep Animation */}
      <section id="hero" className="relative pt-12 pb-20 md:pt-16 md:pb-28 overflow-hidden bg-[#EFF6F2] bg-grid-pattern border-b border-[#E2ECE7]">
        {/* ANIMATED BACKGROUND EFFECT: Rotating Radar Disk & Glowing Pulsing Ambient Mesh */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] pointer-events-none opacity-30">
          <div className="w-full h-full rounded-full border-2 border-dashed border-emerald-400/40 animate-radar-spin relative flex items-center justify-center">
            <div className="w-3/4 h-3/4 rounded-full border border-emerald-400/30" />
            <div className="w-1/2 h-1/2 rounded-full border border-emerald-400/20" />
            <div className="absolute top-0 left-1/2 w-1/2 h-0.5 bg-gradient-to-r from-emerald-500 to-transparent origin-left" />
          </div>
        </div>

        {/* Ambient Glowing Soft Mint Arc */}
        <div className="absolute left-1/2 -bottom-20 -translate-x-1/2 w-[850px] sm:w-[1100px] h-[500px] sm:h-[620px] rounded-t-full bg-gradient-to-t from-emerald-500/30 via-teal-400/20 to-transparent blur-3xl opacity-60 pointer-events-none animate-pulse-glow" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          {/* Tagline Pill */}
          <div className="inline-flex items-center gap-2 px-4.5 py-1.5 rounded-full bg-[#063B2C] border border-emerald-700 text-emerald-300 text-xs font-black tracking-wider uppercase mb-6 shadow-md">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
            <span>{t.hero.tag}</span>
          </div>

          {/* Main Title */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-[#063B2C] tracking-tight leading-[1.12] max-w-4xl mx-auto mb-6">
            {t.hero.title1}{' '}
            <span className="relative inline-block text-emerald-600">
              {t.hero.title2}
              <svg className="absolute left-0 -bottom-2 w-full h-3 text-emerald-400" viewBox="0 0 100 20" preserveAspectRatio="none">
                <path d="M0,15 Q50,0 100,15" stroke="currentColor" strokeWidth="4" fill="none" strokeLinecap="round" />
              </svg>
            </span>
          </h1>

          {/* Subtext */}
          <p className="text-base sm:text-lg text-[#325346] max-w-2xl mx-auto leading-relaxed mb-8 font-medium">
            {t.hero.subhead}
          </p>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 mb-14">
            <button
              onClick={() => onLaunchApp('admin')}
              className="px-8 py-4 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white font-black text-sm sm:text-base flex items-center gap-2.5 shadow-xl shadow-emerald-700/30 transition-all transform hover:scale-105 active:scale-95 cursor-pointer"
            >
              <span>{t.hero.ctaPrimary}</span>
              <ArrowRight className="w-5 h-5 text-white" />
            </button>

            <a
              href="#handshake-demo"
              className="px-7 py-4 rounded-full bg-white hover:bg-emerald-50/80 text-[#063B2C] border border-[#D5E5DE] font-bold text-sm sm:text-base flex items-center gap-2 shadow-sm transition-all"
            >
              <Zap className="w-5 h-5 text-emerald-600" />
              <span>{t.hero.ctaSecondary}</span>
            </a>
          </div>

          {/* Hero Overlapping Card Stack / "Deck of Cards" Layout */}
          <div className="relative max-w-5xl mx-auto pt-8 pb-4">
            {/* Overlapping Deck Container */}
            <div className="flex items-center justify-center -space-x-10 sm:-space-x-12 px-2 sm:px-4 relative z-10 max-w-full overflow-visible">
              {/* Left Card (Senior Aid) - Tilted Left */}
              <div className="w-48 xs:w-56 sm:w-80 rounded-2xl sm:rounded-3xl bg-white p-2 sm:p-3 shadow-xl border border-[#D5E5DE] transform -rotate-4 hover:rotate-0 hover:scale-105 hover:z-30 transition-all duration-300 shrink-0 z-10">
                <div className="relative w-full h-32 xs:h-36 sm:h-52 rounded-xl sm:rounded-2xl overflow-hidden bg-slate-100">
                  <img
                    src="/volunteer_senior.jpg"
                    alt="SK Volunteer handing relief to senior citizen"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-2 left-2 sm:top-3 sm:left-3 px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-md bg-black/75 backdrop-blur-sm text-white text-[9px] sm:text-[10px] font-bold">
                    {t.hero.photoTag1}
                  </div>
                  <div className="absolute bottom-2 left-2 right-2 sm:bottom-3 sm:left-3 sm:right-3 px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-lg bg-emerald-950/80 backdrop-blur-md text-emerald-300 text-[9px] sm:text-[10px] font-mono flex items-center justify-between border border-emerald-700/50">
                    <span className="truncate">GEOHASH: wd77c8e</span>
                    <span className="font-bold text-amber-300 hidden xs:inline">Verified</span>
                  </div>
                </div>
                <div className="p-2 sm:p-3 text-left">
                  <div className="text-[9px] sm:text-[10px] font-bold text-emerald-700 uppercase tracking-wider">PUROK 4 ILAYA</div>
                  <h4 className="font-bold text-xs sm:text-sm text-[#063B2C] mt-0.5 truncate">Senior & Vulnerable Aid</h4>
                </div>
              </div>

              {/* Center Card (Active Bayanihan) - Elevated Lifted */}
              <div className="w-52 xs:w-64 sm:w-90 rounded-2xl sm:rounded-3xl bg-white p-2 sm:p-3 shadow-2xl border-2 border-emerald-400 transform -translate-y-3 sm:-translate-y-6 hover:-translate-y-8 hover:scale-105 transition-all duration-300 shrink-0 z-20 shadow-emerald-600/15">
                <div className="relative w-full h-36 xs:h-40 sm:h-56 rounded-xl sm:rounded-2xl overflow-hidden bg-slate-100">
                  <img
                    src="/hero_community.jpg"
                    alt="Philippine Barangay Disaster Relief Distribution"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-2 left-2 sm:top-3 sm:left-3 px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-md bg-emerald-600 text-white text-[9px] sm:text-[10px] font-black shadow-md flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                    <span>{t.hero.photoTag2}</span>
                  </div>
                  <div className="absolute bottom-2 left-2 right-2 sm:bottom-3 sm:left-3 sm:right-3 px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-lg bg-black/80 backdrop-blur-md text-white text-[9px] sm:text-[10px] font-medium text-center truncate">
                    {t.hero.photoSubCenter}
                  </div>
                </div>
                <div className="p-2 sm:p-3 text-left">
                  <div className="text-[9px] sm:text-[10px] font-bold text-emerald-700 uppercase tracking-wider">PUROK 3 MABINI</div>
                  <h4 className="font-bold text-xs sm:text-sm text-[#063B2C] mt-0.5 truncate">Evacuation Gym Relief Handshake</h4>
                </div>
              </div>

              {/* Right Card (COA Ready Supplies) - Tilted Right */}
              <div className="w-48 xs:w-56 sm:w-80 rounded-2xl sm:rounded-3xl bg-white p-2 sm:p-3 shadow-xl border border-[#D5E5DE] transform rotate-4 hover:rotate-0 hover:scale-105 hover:z-30 transition-all duration-300 shrink-0 z-10">
                <div className="relative w-full h-32 xs:h-36 sm:h-52 rounded-xl sm:rounded-2xl overflow-hidden bg-slate-100">
                  <img
                    src="/relief_packs.jpg"
                    alt="Organized Emergency Disaster Relief Packs"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-2 right-2 sm:top-3 sm:right-3 px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-md bg-black/75 backdrop-blur-sm text-white text-[9px] sm:text-[10px] font-bold">
                    {t.hero.photoTag3}
                  </div>
                  <div className="absolute bottom-2 left-2 right-2 sm:bottom-3 sm:left-3 sm:right-3 px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-lg bg-emerald-950/80 backdrop-blur-md text-emerald-300 text-[9px] sm:text-[10px] font-mono flex items-center justify-between border border-emerald-700/50">
                    <span className="truncate">COA ANNEX A/B</span>
                    <span className="font-bold text-emerald-400 hidden xs:inline">Tracked</span>
                  </div>
                </div>
                <div className="p-2 sm:p-3 text-left">
                  <div className="text-[9px] sm:text-[10px] font-bold text-emerald-700 uppercase tracking-wider">PUROK 1 RIVERSIDE</div>
                  <h4 className="font-bold text-sm text-[#063B2C] mt-0.5 truncate">Emergency Relief Packs</h4>
                </div>
              </div>
            </div>

            {/* Floating Caption Banner / Trust Pill Neatly Underneath Overlapping Stack */}
            <div className="mt-8 relative z-30 flex justify-center">
              <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white shadow-xl border border-[#D5E5DE] text-xs sm:text-sm font-bold text-[#1F4135] backdrop-blur-md">
                <Leaf className="w-4 h-4 text-emerald-600 fill-current animate-pulse" />
                <span>{t.hero.trustPill}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* INTERACTIVE PIN HANDSHAKE WIDGET DEMO SECTION: Scanline & Matrix Animation */}
      <section id="handshake-demo" className="py-20 bg-[#EAF4EE] bg-dots-pattern border-t border-b border-[#E2ECE7] relative overflow-hidden">
        {/* ANIMATED BACKGROUND EFFECT: Vertical Tactical Scanline */}
        <div className="absolute inset-0 pointer-events-none opacity-30">
          <div className="w-full h-1 bg-gradient-to-r from-transparent via-emerald-500 to-transparent animate-scanline" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Description */}
            <div className="lg:col-span-6 space-y-6">
              <span className="text-[11px] font-black uppercase tracking-widest text-emerald-900 bg-emerald-100/90 px-3.5 py-1.5 rounded-full border border-emerald-300 shadow-xs">
                ⚡ INTERACTIVE LIVE WIDGET
              </span>
              <h2 className="text-3xl sm:text-4xl font-black text-[#063B2C] tracking-tight leading-tight">
                Subukan ang Offline 4-Digit Handshake Simulator.
              </h2>
              <p className="text-[#325346] text-sm sm:text-base leading-relaxed font-medium">
                Kahit walang Wi-Fi o signal sa evacuation gym, nagtitiyak ang KomuniCore ng walang duplication gamit ang zero-connectivity 4-digit PIN ng resident.
              </p>

              <div className="space-y-3 pt-2">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-emerald-600 text-white flex items-center justify-center shrink-0 font-bold text-xs mt-0.5">1</div>
                  <p className="text-xs sm:text-sm text-[#38584B]">Mag-tap ng 4-digit PIN sa ibaba (halimbawa: <span className="font-mono bg-emerald-100 px-1.5 py-0.5 rounded text-emerald-900 font-bold border border-emerald-300">4829</span> o anumang 4 digits).</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-emerald-600 text-white flex items-center justify-center shrink-0 font-bold text-xs mt-0.5">2</div>
                  <p className="text-xs sm:text-sm text-[#38584B]">Awtomatikong ire-match ang Level-7 Geohash sa local device memory.</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-emerald-600 text-white flex items-center justify-center shrink-0 font-bold text-xs mt-0.5">3</div>
                  <p className="text-xs sm:text-sm text-[#38584B]">Instant validation na may resibo nang hindi nangangailangan ng cloud server!</p>
                </div>
              </div>

              <div className="pt-4 flex items-center gap-4">
                <button
                  onClick={() => onLaunchApp('worker')}
                  className="px-6 py-3 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs uppercase tracking-wider flex items-center gap-2 shadow-lg shadow-emerald-700/20 transition-transform transform hover:scale-105 cursor-pointer"
                >
                  <span>Pumasok sa Full SK Worker Desk</span>
                  <ArrowRight className="w-4 h-4 text-white" />
                </button>
              </div>
            </div>

            {/* Right Interactive Keypad Widget */}
            <div className="lg:col-span-6">
              <div className="bg-white border-2 border-emerald-300/90 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
                {/* Header of Simulator */}
                <div className="flex items-center justify-between pb-6 border-b border-[#E2ECE7] mb-6">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500" />
                    <div className="w-3 h-3 rounded-full bg-amber-500" />
                    <div className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="ml-2 font-mono text-xs font-bold text-[#063B2C]">HANDSHAKE TERMINAL (OFFLINE)</span>
                  </div>
                  <span className="px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-900 font-mono text-[10px] font-bold border border-emerald-300">
                    GEOHASH: wd77c8e
                  </span>
                </div>

                {/* Display Screen */}
                <div className="bg-[#F0F7F3] rounded-2xl p-5 border border-[#C5E0D2] mb-6 text-center relative min-h-[110px] flex flex-col items-center justify-center shadow-inner">
                  {pinStatus === 'idle' && (
                    <>
                      <p className="text-xs font-mono text-[#38584B] font-bold mb-2">ENTER EVACUEE 4-DIGIT PIN</p>
                      <div className="flex items-center justify-center gap-3">
                        {[0, 1, 2, 3].map((idx) => (
                          <div
                            key={idx}
                            className={`w-10 h-12 rounded-xl border-2 flex items-center justify-center text-xl font-mono font-black transition-all ${
                              pinInput[idx]
                                ? 'border-emerald-600 text-emerald-900 bg-white shadow-md scale-105'
                                : 'border-[#C5E0D2] text-slate-300 bg-white/60'
                            }`}
                          >
                            {pinInput[idx] || '•'}
                          </div>
                        ))}
                      </div>
                    </>
                  )}

                  {pinStatus === 'verifying' && (
                    <div className="flex flex-col items-center gap-2 py-2">
                      <RefreshCw className="w-6 h-6 text-emerald-600 animate-spin" />
                      <span className="font-mono text-xs text-emerald-800 font-bold">COMPUTING LEVEL-7 GEOHASH...</span>
                    </div>
                  )}

                  {pinStatus === 'verified' && simulatedResident && (
                    <div className="w-full text-left space-y-1.5">
                      <div className="flex items-center justify-between">
                        <span className="inline-flex items-center gap-1.5 text-xs font-black text-emerald-900 bg-emerald-100 px-2.5 py-0.5 rounded-full border border-emerald-300">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700" /> VERIFIED HANDSHAKE
                        </span>
                        <span className="font-mono text-[10px] text-[#4E7164]">{simulatedResident.timestamp}</span>
                      </div>
                      <div className="font-bold text-base text-[#063B2C] mt-1">{simulatedResident.name}</div>
                      <div className="text-xs text-[#38584B] font-medium">{simulatedResident.purok}</div>
                      <div className="flex items-center justify-between text-[11px] font-mono text-emerald-800 pt-1 border-t border-[#D5E5DE] mt-1">
                        <span>GEOHASH: {simulatedResident.geohash}</span>
                        <span className="text-amber-800 font-bold">1x FAMILY PACK LOGGED</span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Keypad Buttons Grid */}
                <div className="grid grid-cols-3 gap-3">
                  {['1', '2', '3', '4', '5', '6', '7', '8', '9'].map((digit) => (
                    <button
                      key={digit}
                      onClick={() => handlePinDigit(digit)}
                      className="py-3.5 rounded-xl bg-[#F4F9F6] hover:bg-emerald-100 text-[#063B2C] font-mono font-bold text-lg border border-[#D5E5DE] hover:border-emerald-500 shadow-xs transition-all active:scale-95 cursor-pointer"
                    >
                      {digit}
                    </button>
                  ))}
                  <button
                    onClick={handleClearPin}
                    className="py-3.5 rounded-xl bg-red-50 hover:bg-red-100 text-red-800 font-mono font-bold text-xs border border-red-200 transition-all cursor-pointer"
                  >
                    CLEAR
                  </button>
                  <button
                    onClick={() => handlePinDigit('0')}
                    className="py-3.5 rounded-xl bg-[#F4F9F6] hover:bg-emerald-100 text-[#063B2C] font-mono font-bold text-lg border border-[#D5E5DE] hover:border-emerald-500 transition-all cursor-pointer"
                  >
                    0
                  </button>
                  <button
                    onClick={() => verifyDemoPin(pinInput || '4829')}
                    className="py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-mono font-black text-xs transition-all shadow-md shadow-emerald-700/20 cursor-pointer"
                  >
                    TEST
                  </button>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Section 1: Protektado Mula Simula (Guarantee Cards) - Ambient Glow Orbs BG */}
      <section id="protection" className="py-20 bg-[#F7FAF8] border-t border-b border-[#E2ECE7] relative overflow-hidden">
        {/* ANIMATED BACKGROUND EFFECT: Glowing Soft Light Orb */}
        <div className="absolute right-10 top-1/2 -translate-y-1/2 w-[450px] h-[450px] rounded-full bg-emerald-300/30 blur-3xl pointer-events-none animate-pulse-soft" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-[11px] font-black uppercase tracking-widest text-emerald-800 bg-emerald-100/90 px-3 py-1 rounded-full border border-emerald-300">
              {t.protection.badge}
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-[#063B2C] mt-4 mb-3 tracking-tight">
              {t.protection.title}
            </h2>
            <p className="text-sm sm:text-base text-[#416254] font-medium">
              {t.protection.subtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {t.protection.cards.map((card, idx) => (
              <div key={idx} className="p-8 rounded-3xl bg-[#EFF6F2] border border-[#D5E5DE] shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1.5 relative overflow-hidden group">
                <div className="w-14 h-1.5 rounded-full bg-gradient-to-r from-emerald-600 to-teal-400 mb-6" />
                <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                  {idx === 0 && <MapPin className="w-6 h-6 text-emerald-700" />}
                  {idx === 1 && <Lock className="w-6 h-6 text-emerald-700" />}
                  {idx === 2 && <FileText className="w-6 h-6 text-emerald-700" />}
                </div>
                <h3 className="text-lg font-bold text-[#063B2C] mb-2">
                  {card.title}
                </h3>
                <p className="text-xs sm:text-sm text-[#38584B] leading-relaxed">
                  {card.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 2: Paano Gumagana (How it Works) - 4 Steps with Animated Connector Beam */}
      <section id="how-it-works" className="py-20 bg-[#EFF6F2] border-t border-[#E2ECE7] relative overflow-hidden">
        {/* ANIMATED BACKGROUND EFFECT: Glowing Pulse Light Beam across steps */}
        <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-emerald-300 pointer-events-none hidden lg:block opacity-60">
          <div className="w-1/3 h-full bg-gradient-to-r from-transparent via-emerald-600 to-transparent animate-scanline" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-[11px] font-black uppercase tracking-widest text-emerald-800 bg-emerald-100/90 px-3 py-1 rounded-full border border-emerald-300">
              {t.howItWorks.badge}
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-[#063B2C] mt-4 mb-3 tracking-tight">
              {t.howItWorks.title}
            </h2>
            <p className="text-sm sm:text-base text-[#416254] font-medium">
              {t.howItWorks.subtitle}
            </p>
          </div>

          {/* 4 Connected Step Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative">
            {t.howItWorks.steps.map((step, idx) => (
              <div key={idx} className="p-6 rounded-3xl bg-white border border-[#D5E5DE] shadow-sm hover:shadow-lg transition-all flex flex-col items-center text-center relative group">
                <div className="w-8 h-8 rounded-full bg-emerald-600 text-white font-black text-xs flex items-center justify-center absolute -top-4 shadow-md">
                  {idx + 1}
                </div>
                <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center my-4 group-hover:scale-110 transition-transform">
                  {idx === 0 && <Scan className="w-6 h-6" />}
                  {idx === 1 && <MapPin className="w-6 h-6" />}
                  {idx === 2 && <Lock className="w-6 h-6" />}
                  {idx === 3 && <Award className="w-6 h-6" />}
                </div>
                <h3 className="font-bold text-base text-[#063B2C] mb-2">{step.title}</h3>
                <p className="text-xs text-[#416254] leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>

          {/* Offline Resilience Callout Banner */}
          <div className="mt-12 p-6 sm:p-8 rounded-3xl bg-emerald-50 border-2 border-dashed border-emerald-300 max-w-4xl mx-auto flex flex-col sm:flex-row items-center gap-6 shadow-sm">
            <div className="w-14 h-14 rounded-2xl bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-lg shadow-emerald-700/20">
              <Radio className="w-7 h-7 animate-pulse text-white" />
            </div>
            <div>
              <h4 className="font-black text-base sm:text-lg text-[#063B2C] mb-1">
                {t.howItWorks.resilienceTitle}
              </h4>
              <p className="text-xs sm:text-sm text-[#38584B] leading-relaxed">
                {t.howItWorks.resilienceDesc}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION: TRADITIONAL VS KOMUNICORE COMPARISON MATRIX: Split Glow Animation */}
      <section id="comparison" className="py-20 bg-[#F7FAF8] border-t border-b border-[#E2ECE7] relative overflow-hidden">
        {/* ANIMATED BACKGROUND EFFECT: Split Ambient Red & Emerald Glow Auras */}
        <div className="absolute left-10 top-1/2 -translate-y-1/2 w-[350px] h-[350px] rounded-full bg-rose-200/40 blur-3xl pointer-events-none animate-pulse-soft" />
        <div className="absolute right-10 top-1/2 -translate-y-1/2 w-[350px] h-[350px] rounded-full bg-emerald-300/40 blur-3xl pointer-events-none animate-pulse-glow" />

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-[11px] font-black uppercase tracking-widest text-emerald-800 bg-emerald-100/90 px-3 py-1 rounded-full border border-emerald-300">
              {t.comparison.badge}
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-[#063B2C] mt-4 mb-3 tracking-tight">
              {t.comparison.title}
            </h2>
            <p className="text-sm sm:text-base text-[#416254] font-medium">
              {t.comparison.subtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Column 1: Legacy Paper System */}
            <div className="p-8 rounded-3xl bg-rose-50/90 border border-rose-200 space-y-6 shadow-xs relative overflow-hidden">
              <div className="flex items-center gap-3 pb-4 border-b border-rose-200">
                <div className="w-10 h-10 rounded-xl bg-rose-100 text-rose-700 flex items-center justify-center border border-rose-300">
                  <AlertTriangle className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-black text-lg text-rose-950">{t.comparison.oldTitle}</h3>
                  <span className="text-xs font-mono font-bold text-rose-700">High Vulnerability & Delayed Reports</span>
                </div>
              </div>

              <div className="space-y-4">
                {t.comparison.points.map((pt, idx) => (
                  <div key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-rose-900 font-medium">
                    <span className="text-rose-600 font-black shrink-0 mt-0.5">✕</span>
                    <p>{pt.old}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Column 2: KomuniCore Disaster OS */}
            <div className="p-8 rounded-3xl bg-emerald-50/90 border-2 border-emerald-500 space-y-6 shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 px-4 py-1 bg-emerald-600 text-white font-black text-[10px] uppercase tracking-wider rounded-bl-xl shadow-sm">
                RECOMMENDED LGU OS
              </div>

              <div className="flex items-center gap-3 pb-4 border-b border-emerald-200">
                <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center shadow-md">
                  <ShieldCheck className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="font-black text-lg text-[#063B2C]">{t.comparison.newTitle}</h3>
                  <span className="text-xs font-mono font-bold text-emerald-700">Level-7 Geohash & 100% COA Compliant</span>
                </div>
              </div>

              <div className="space-y-4">
                {t.comparison.points.map((pt, idx) => (
                  <div key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-[#1F4135] font-semibold">
                    <CheckCircle2 className="w-4.5 h-4.5 text-emerald-600 shrink-0 mt-0.5" />
                    <p>{pt.new}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 3: Mga Aktibong Relief Operations sa Purok: Gradient Flow Background */}
      <section id="causes" className="py-20 bg-gradient-to-br from-[#EFF6F2] via-[#E2F0E8] to-[#F4F9F6] animate-gradient-flow border-t border-[#E2ECE7] relative overflow-hidden">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
            <div>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-[#063B2C] tracking-tight">
                {lang === 'tl' ? 'Mga operasyon para sa kapwa.' : 'More causes to carry together.'}
              </h2>
              <p className="text-sm sm:text-base text-[#4E7164] mt-2 font-medium">
                {lang === 'tl' 
                  ? 'Mga beripikadong purok na naghihintay ng tulong at relief distribution.' 
                  : 'More verified causes still waiting for relief distribution.'}
              </p>
            </div>
            <button
              onClick={() => onLaunchApp('donor')}
              className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#063B2C] hover:text-emerald-700 transition-colors self-start md:self-auto cursor-pointer group"
            >
              <span>{lang === 'tl' ? 'Tingnan lahat ng operasyon' : 'See all causes'}</span>
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </button>
          </div>

          {/* Responsive 2-Column Grid of Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {t.causes.items.map((cause) => {
              const isExceeded = cause.percentage >= 100;
              return (
                <div
                  key={cause.id}
                  onClick={() => onLaunchApp(cause.roleTarget)}
                  className="p-5 rounded-3xl bg-white border border-[#E2ECE7] hover:border-emerald-400 hover:shadow-xl transition-all duration-200 flex flex-col justify-between cursor-pointer group"
                >
                  {/* Top/Body: Thumbnail on Left, Text & Progress on Right */}
                  <div className="flex items-start gap-4 sm:gap-5">
                    {/* Left: Image Thumbnail */}
                    <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden shrink-0 bg-slate-100 border border-slate-200/80 shadow-inner">
                      <img
                        src={cause.image}
                        alt={cause.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>

                    {/* Right: Category, Title & Progress Bar */}
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-1.5 text-[10px] sm:text-[11px] font-bold text-emerald-800 uppercase tracking-wider mb-1">
                        <span>{cause.category}</span>
                        <span className="text-slate-300">•</span>
                        <span className="text-[#64877A] font-medium lowercase first-letter:uppercase truncate max-w-[160px] sm:max-w-none">{cause.location}</span>
                      </div>

                      <h3 className="font-bold text-sm sm:text-base text-[#063B2C] group-hover:text-emerald-700 transition-colors leading-snug line-clamp-2">
                        {cause.title}
                      </h3>

                      {/* Progress Bar */}
                      <div className="mt-3">
                        <div className="w-full h-1.5 rounded-full bg-[#E5EFEA] relative overflow-visible">
                          <div
                            className={`h-full rounded-full ${
                              isExceeded ? 'bg-amber-500' : 'bg-emerald-600'
                            }`}
                            style={{ width: `${Math.min(cause.percentage, 100)}%` }}
                          />
                          <div
                            className={`w-3 h-3 rounded-full border-2 border-white shadow-sm absolute -top-[3px] -translate-x-1/2 ${
                              isExceeded ? 'bg-amber-500' : 'bg-emerald-600'
                            }`}
                            style={{ left: `${Math.min(cause.percentage, 100)}%` }}
                          />
                        </div>

                        <div className="flex items-center gap-1.5 text-[11px] text-[#64877A] font-medium mt-2">
                          <span>{cause.raised} of {cause.goal} {cause.unit}</span>
                          <span>•</span>
                          <span>{lang === 'tl' ? 'Beripikadong Purok' : 'Verified Purok'}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Card Footer: Status Badge on Left, Large Percentage on Right */}
                  <div className="pt-3.5 mt-4 border-t border-[#E2ECE7] flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="inline-flex items-center gap-1 text-[11px] font-bold text-amber-900 bg-amber-100/90 px-2.5 py-1 rounded-full border border-amber-300/60 shadow-xs">
                        <Check className="w-3 h-3 text-amber-700 stroke-[3]" />
                        <span>{lang === 'tl' ? 'Beripikado' : 'Verified'}</span>
                      </div>

                      {isExceeded && (
                        <span className="hidden sm:inline-block text-[10px] font-semibold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">
                          {lang === 'tl' ? 'Lampas Goal' : 'Goal Exceeded'}
                        </span>
                      )}
                    </div>

                    <div className="text-2xl font-black text-[#063B2C] tracking-tight flex items-baseline gap-1">
                      <span>{cause.percentage}%</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Section 4: 4 Local Governance User Roles: Ambient Pulsing Ring Animations */}
      <section id="roles" className="py-20 bg-[#EFF6F2] border-t border-[#E2ECE7] relative overflow-hidden">
        {/* ANIMATED BACKGROUND EFFECT: Pulsing Ring Halo */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-emerald-400/20 blur-3xl pointer-events-none animate-pulse-soft" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-[11px] font-black uppercase tracking-widest text-emerald-800 bg-emerald-100/90 px-3 py-1 rounded-full border border-emerald-300">
              {t.roles.badge}
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-[#063B2C] mt-4 mb-3 tracking-tight">
              {t.roles.title}
            </h2>
            <p className="text-sm sm:text-base text-[#416254] font-medium">
              {t.roles.subtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Role 1: Admin */}
            <div className="p-7 rounded-3xl bg-white border border-[#D5E5DE] hover:border-emerald-500 hover:shadow-xl transition-all flex flex-col justify-between group">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-cyan-100 text-cyan-800 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <BarChart3 className="w-6 h-6" />
                </div>
                <span className="text-[10px] font-black uppercase tracking-wider text-cyan-800 bg-cyan-50 px-2 py-0.5 rounded">Role 1</span>
                <h3 className="font-bold text-lg text-[#063B2C] mt-2 mb-2">{t.roles.adminTitle}</h3>
                <p className="text-xs text-[#416254] leading-relaxed mb-6">
                  {t.roles.adminDesc}
                </p>
              </div>
              <button
                onClick={() => onLaunchApp('admin')}
                className="w-full py-3 rounded-full bg-[#063B2C] hover:bg-emerald-600 text-white font-black text-xs flex items-center justify-center gap-2 transition-all shadow-md cursor-pointer"
              >
                <span>{t.roles.adminBtn}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* Role 2: SK Worker */}
            <div className="p-7 rounded-3xl bg-white border border-[#D5E5DE] hover:border-emerald-500 hover:shadow-xl transition-all flex flex-col justify-between group">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Scan className="w-6 h-6" />
                </div>
                <span className="text-[10px] font-black uppercase tracking-wider text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded">Role 2</span>
                <h3 className="font-bold text-lg text-[#063B2C] mt-2 mb-2">{t.roles.workerTitle}</h3>
                <p className="text-xs text-[#416254] leading-relaxed mb-6">
                  {t.roles.workerDesc}
                </p>
              </div>
              <button
                onClick={() => onLaunchApp('worker')}
                className="w-full py-3 rounded-full bg-[#063B2C] hover:bg-emerald-600 text-white font-black text-xs flex items-center justify-center gap-2 transition-all shadow-md cursor-pointer"
              >
                <span>{t.roles.workerBtn}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* Role 3: Resident */}
            <div className="p-7 rounded-3xl bg-white border border-[#D5E5DE] hover:border-emerald-500 hover:shadow-xl transition-all flex flex-col justify-between group">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Users className="w-6 h-6" />
                </div>
                <span className="text-[10px] font-black uppercase tracking-wider text-amber-800 bg-amber-50 px-2 py-0.5 rounded">Role 3</span>
                <h3 className="font-bold text-lg text-[#063B2C] mt-2 mb-2">{t.roles.residentTitle}</h3>
                <p className="text-xs text-[#416254] leading-relaxed mb-6">
                  {t.roles.residentDesc}
                </p>
              </div>
              <button
                onClick={() => onLaunchApp('resident')}
                className="w-full py-3 rounded-full bg-[#063B2C] hover:bg-emerald-600 text-white font-black text-xs flex items-center justify-center gap-2 transition-all shadow-md cursor-pointer"
              >
                <span>{t.roles.residentBtn}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* Role 4: Donor */}
            <div className="p-7 rounded-3xl bg-white border border-[#D5E5DE] hover:border-emerald-500 hover:shadow-xl transition-all flex flex-col justify-between group">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-red-100 text-red-800 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Heart className="w-6 h-6" />
                </div>
                <span className="text-[10px] font-black uppercase tracking-wider text-red-800 bg-red-50 px-2 py-0.5 rounded">Role 4</span>
                <h3 className="font-bold text-lg text-[#063B2C] mt-2 mb-2">{t.roles.donorTitle}</h3>
                <p className="text-xs text-[#416254] leading-relaxed mb-6">
                  {t.roles.donorDesc}
                </p>
              </div>
              <button
                onClick={() => onLaunchApp('donor')}
                className="w-full py-3 rounded-full bg-[#063B2C] hover:bg-emerald-600 text-white font-black text-xs flex items-center justify-center gap-2 transition-all shadow-md cursor-pointer"
              >
                <span>{t.roles.donorBtn}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer with Philippine Banig Woven Border */}
      <footer className="bg-[#062D20] text-[#BCE3D5] text-xs pt-12 pb-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between pb-8 border-b border-[#0F4A37] gap-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-emerald-600 flex items-center justify-center text-white font-black">
                <Shield className="w-5 h-5" />
              </div>
              <div>
                <span className="font-black text-base text-white">{t.footer.title}</span>
                <p className="text-[11px] text-[#7FBCA7]">{t.footer.subtitle}</p>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-6 text-[#7FBCA7] font-medium">
              <span>Barangay DRRM Council</span>
              <span>Sangguniang Kabataan (SK)</span>
              <span>COA Circular No. 2014-002</span>
              <span>Level-7 Geohash Engine</span>
            </div>

            <button
              onClick={() => onLaunchApp('admin')}
              className="px-5 py-2.5 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs shadow-md transition-all cursor-pointer"
            >
              {t.footer.btn}
            </button>
          </div>

          <p className="text-center text-[11px] text-[#559480] pt-6">
            {t.footer.tagline}
          </p>
        </div>

        {/* Bottom Woven Banig Ribbon */}
        <div className="banig-ribbon mt-6" />
      </footer>
    </div>
  );
}
