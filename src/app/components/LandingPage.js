'use client';

import { useState } from 'react';
import {
  Shield, Zap, CheckCircle2, AlertTriangle, FileText, MapPin, 
  Lock, Users, Heart, ArrowRight, Activity, Database, Smartphone, 
  Layers, RefreshCw, BarChart3, Scan, ExternalLink, ChevronRight,
  Sparkles, Check, Clock, Radio, Award, Sun, Eye, Leaf, Globe
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
      ctaSecondary: 'Paano Protektado ang Lahat',
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
      ctaSecondary: 'How Everyone is Protected',
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
  const t = CONTENT[lang];

  return (
    <div className="min-h-screen bg-[#F7FAF8] text-[#132A22] selection:bg-emerald-500 selection:text-white font-sans antialiased overflow-x-hidden">
      {/* Philippine Banig Woven Border Top Ribbon */}
      <div className="banig-ribbon" />

      {/* Navigation Header */}
      <header className="sticky top-0 z-50 bg-[#F7FAF8]/95 backdrop-blur-md border-b border-[#E2ECE7] transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
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
            <a href="#protection" className="hover:text-emerald-600 transition-colors">{t.nav.trust}</a>
            <a href="#how-it-works" className="hover:text-emerald-600 transition-colors">{t.nav.howItWorks}</a>
            <a href="#causes" className="hover:text-emerald-600 transition-colors">{t.nav.causes}</a>
            <a href="#roles" className="hover:text-emerald-600 transition-colors">{t.nav.roles}</a>
          </nav>

          {/* Right Action & Language Switcher */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Language Switcher Pill Toggle */}
            <div className="flex items-center p-1 rounded-full bg-emerald-100/70 border border-emerald-300 shadow-inner">
              <button
                onClick={() => setLang('tl')}
                className={`px-2.5 py-1 rounded-full text-[11px] font-black transition-all cursor-pointer flex items-center gap-1 ${
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
                className={`px-2.5 py-1 rounded-full text-[11px] font-black transition-all cursor-pointer flex items-center gap-1 ${
                  lang === 'en'
                    ? 'bg-emerald-700 text-white shadow-sm scale-105'
                    : 'text-emerald-900 hover:text-emerald-950'
                }`}
                title="Show in English"
              >
                <span>🇺🇸 English</span>
              </button>
            </div>

            {/* Launch App Button */}
            <button
              onClick={() => onLaunchApp('admin')}
              className="px-4 sm:px-5 py-2 sm:py-2.5 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs sm:text-sm flex items-center gap-2 shadow-lg shadow-emerald-700/25 transition-all transform hover:scale-[1.03] active:scale-[0.98] cursor-pointer"
            >
              <Zap className="w-4 h-4 fill-current" />
              <span>{t.nav.launch}</span>
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section with Emerald/Mint Sunrise Arc & Floating Photos */}
      <section id="hero" className="relative pt-12 pb-20 md:pt-16 md:pb-28 overflow-hidden bg-[#EFF6F2]">
        {/* Background Emerald Glow Arc */}
        <div className="absolute left-1/2 -bottom-20 -translate-x-1/2 w-[850px] sm:w-[1100px] h-[500px] sm:h-[620px] rounded-t-full bg-gradient-to-t from-emerald-600 via-teal-500/80 to-emerald-200/30 blur-2xl opacity-40 pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          {/* Tagline Pill */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-100/90 border border-emerald-300 text-emerald-900 text-xs font-black tracking-wider uppercase mb-6 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-emerald-600 animate-ping" />
            <span>{t.hero.tag}</span>
          </div>

          {/* Main Tagline */}
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
              <ArrowRight className="w-5 h-5" />
            </button>

            <a
              href="#how-it-works"
              className="px-7 py-4 rounded-full bg-white hover:bg-emerald-50/60 text-[#063B2C] border border-[#D5E5DE] font-bold text-sm sm:text-base flex items-center gap-2 shadow-sm transition-all"
            >
              <Eye className="w-5 h-5 text-emerald-600" />
              <span>{t.hero.ctaSecondary}</span>
            </a>
          </div>

          {/* Hero Floating Photo Trio Showcase */}
          <div className="relative max-w-4xl mx-auto pt-6 pb-8">
            {/* Sunrise Arc Graphic Backdrop */}
            <div className="absolute inset-x-8 top-12 bottom-0 rounded-t-[180px] bg-gradient-to-t from-[#064E3B] via-[#059669] to-[#34D399] shadow-2xl flex items-end justify-center overflow-hidden">
              <div className="w-full h-full opacity-20 bg-[radial-gradient(#FFF_1px,transparent_1px)] [background-size:16px_16px]" />
            </div>

            {/* Photo Cards Container */}
            <div className="relative z-10 flex items-center justify-center gap-3 sm:gap-6 pt-10 sm:pt-14 px-4">
              {/* Left Photo (Volunteer Senior Aid) */}
              <div className="w-32 sm:w-56 rounded-2xl sm:rounded-3xl bg-white p-2 sm:p-2.5 shadow-2xl border border-white/70 animate-float-slow transform -rotate-3 hover:rotate-0 hover:scale-105 transition-all duration-300">
                <div className="relative w-full h-28 sm:h-44 rounded-xl sm:rounded-2xl overflow-hidden bg-slate-200">
                  <img
                    src="/volunteer_senior.jpg"
                    alt="SK Volunteer handing relief to grandmother"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-2 left-2 px-2 py-0.5 rounded-md bg-black/60 backdrop-blur-sm text-white text-[9px] sm:text-[10px] font-bold">
                    {t.hero.photoTag1}
                  </div>
                </div>
              </div>

              {/* Center Photo (Community Distribution in Gym) */}
              <div className="w-40 sm:w-68 rounded-2xl sm:rounded-3xl bg-white p-2.5 sm:p-3 shadow-2xl border-2 border-emerald-300 animate-float-center transform hover:scale-105 transition-all duration-300 z-20">
                <div className="relative w-full h-36 sm:h-52 rounded-xl sm:rounded-2xl overflow-hidden bg-slate-200">
                  <img
                    src="/hero_community.jpg"
                    alt="Philippine Barangay Disaster Relief Distribution"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-2 left-2 px-2.5 py-0.5 rounded-md bg-emerald-600 text-white text-[10px] sm:text-xs font-black shadow-md flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>{t.hero.photoTag2}</span>
                  </div>
                  <div className="absolute bottom-2 inset-x-2 p-1.5 rounded-lg bg-black/70 backdrop-blur-sm text-white text-[10px] font-medium text-center">
                    {t.hero.photoSubCenter}
                  </div>
                </div>
              </div>

              {/* Right Photo (Emergency Relief Packs) */}
              <div className="w-32 sm:w-56 rounded-2xl sm:rounded-3xl bg-white p-2 sm:p-2.5 shadow-2xl border border-white/70 animate-float-reverse transform rotate-3 hover:rotate-0 hover:scale-105 transition-all duration-300">
                <div className="relative w-full h-28 sm:h-44 rounded-xl sm:rounded-2xl overflow-hidden bg-slate-200">
                  <img
                    src="/relief_packs.jpg"
                    alt="Organized Emergency Disaster Relief Packs"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-2 right-2 px-2 py-0.5 rounded-md bg-black/60 backdrop-blur-sm text-white text-[9px] sm:text-[10px] font-bold">
                    {t.hero.photoTag3}
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Trust Badge */}
            <div className="relative z-20 mt-8 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white shadow-lg border border-[#D5E5DE] text-xs font-bold text-[#1F4135]">
              <Leaf className="w-4 h-4 text-emerald-600 fill-current animate-pulse" />
              <span>{t.hero.trustPill}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Section 1: Protektado Mula Simula Hanggang Finish (Guarantee Cards) */}
      <section id="protection" className="py-20 bg-[#F7FAF8] border-t border-b border-[#E2ECE7]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
                  {idx === 0 && <MapPin className="w-6 h-6" />}
                  {idx === 1 && <Lock className="w-6 h-6" />}
                  {idx === 2 && <FileText className="w-6 h-6" />}
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

      {/* Section 2: Paano Gumagana (How it Works) - 4 Steps */}
      <section id="how-it-works" className="py-20 bg-[#EFF6F2] relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
              <div key={idx} className="p-6 rounded-3xl bg-white border border-[#D5E5DE] shadow-sm hover:shadow-lg transition-all flex flex-col items-center text-center relative">
                <div className="w-8 h-8 rounded-full bg-emerald-600 text-white font-black text-xs flex items-center justify-center absolute -top-4 shadow-md">
                  {idx + 1}
                </div>
                <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center my-4">
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
          <div className="mt-12 p-6 sm:p-8 rounded-3xl bg-emerald-50 border-2 border-dashed border-emerald-300 max-w-4xl mx-auto flex flex-col sm:flex-row items-center gap-6">
            <div className="w-14 h-14 rounded-2xl bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-lg shadow-emerald-700/20">
              <Radio className="w-7 h-7 animate-pulse" />
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

      {/* Section 3: Mga Aktibong Relief Operations sa Purok (Ambagan Exact Reference Design) */}
      <section id="causes" className="py-20 bg-[#F7FAF8] border-t border-[#E2ECE7]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
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

          {/* Causes List matching exact Ambagan Reference */}
          <div className="space-y-4">
            {t.causes.items.map((cause) => {
              const isExceeded = cause.percentage >= 100;
              return (
                <div
                  key={cause.id}
                  onClick={() => onLaunchApp(cause.roleTarget)}
                  className="p-4 sm:p-5 rounded-3xl bg-white border border-[#E2ECE7] hover:border-emerald-400 hover:shadow-md transition-all duration-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5 cursor-pointer group"
                >
                  {/* Left: Thumbnail & Details */}
                  <div className="flex items-center gap-4 sm:gap-5 w-full sm:w-auto">
                    {/* Rounded Photo */}
                    <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden shrink-0 bg-slate-100 border border-slate-200/80 shadow-inner">
                      <img
                        src={cause.image}
                        alt={cause.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>

                    {/* Meta & Title */}
                    <div className="flex-1">
                      <div className="flex flex-wrap items-center gap-2 text-[10px] sm:text-[11px] font-bold text-emerald-800 uppercase tracking-wider mb-1">
                        <span>{cause.category}</span>
                        <span className="text-slate-300">•</span>
                        <span className="text-[#64877A] font-medium lowercase first-letter:uppercase">{cause.location}</span>
                      </div>

                      <h3 className="font-bold text-sm sm:text-base text-[#063B2C] group-hover:text-emerald-700 transition-colors leading-snug">
                        {cause.title}
                      </h3>

                      {/* Custom Ambagan Progress Bar with Round Bead Knob */}
                      <div className="mt-3.5 max-w-md">
                        <div className="w-full h-1.5 rounded-full bg-[#E5EFEA] relative overflow-visible">
                          <div
                            className={`h-full rounded-full ${
                              isExceeded ? 'bg-amber-500' : 'bg-emerald-600'
                            }`}
                            style={{ width: `${Math.min(cause.percentage, 100)}%` }}
                          />
                          {/* Indicator knob circle */}
                          <div
                            className={`w-3 h-3 rounded-full border-2 border-white shadow-sm absolute -top-[3px] -translate-x-1/2 ${
                              isExceeded ? 'bg-amber-500' : 'bg-emerald-600'
                            }`}
                            style={{ left: `${Math.min(cause.percentage, 100)}%` }}
                          />
                        </div>

                        {/* Stats line */}
                        <div className="flex items-center gap-2 text-[11px] text-[#64877A] font-medium mt-2">
                          <span>{cause.raised} of {cause.goal} {cause.unit}</span>
                          <span>•</span>
                          <span>{lang === 'tl' ? 'Beripikadong Purok' : 'Verified Purok'}</span>
                          <span>•</span>
                          <span>{lang === 'tl' ? 'Aktibong Pamamahagi' : 'Active Relief'}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Right: Percentage & Verified Pill */}
                  <div className="flex sm:flex-col items-center sm:items-end justify-between w-full sm:w-auto pt-2 sm:pt-0 border-t sm:border-t-0 border-[#E2ECE7] shrink-0">
                    <div className="text-xl sm:text-2xl font-black text-[#063B2C]">
                      {cause.percentage}%
                    </div>

                    <div className="mt-1 flex flex-col items-end gap-1">
                      <div className="inline-flex items-center gap-1 text-[11px] font-bold text-amber-900 bg-amber-100/90 px-2.5 py-0.5 rounded-full border border-amber-300/60 shadow-xs">
                        <Check className="w-3 h-3 text-amber-700 stroke-[3]" />
                        <span>{lang === 'tl' ? 'Beripikado' : 'Verified'}</span>
                      </div>

                      {isExceeded && (
                        <span className="text-[10px] font-semibold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">
                          {lang === 'tl' ? 'Lampas na sa goal - salamat!' : 'Goal reached - thank you!'}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Section 4: 4 Local Governance User Roles */}
      <section id="roles" className="py-20 bg-[#EFF6F2] border-t border-[#E2ECE7]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
              className="px-5 py-2 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs shadow-md transition-all cursor-pointer"
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
