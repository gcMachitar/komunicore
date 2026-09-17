'use client';

import {
  Shield, ChevronDown, Wifi, WifiOff, RefreshCw,
  LayoutDashboard, UserCheck, User, Heart, Zap,
} from 'lucide-react';
import { useState, useRef, useEffect } from 'react';

const ROLES = [
  { id: 'admin', label: 'Admin / Barangay Official', icon: LayoutDashboard, color: 'var(--color-cyan-400)' },
  { id: 'worker', label: 'SK Tech / Relief Worker', icon: UserCheck, color: 'var(--color-emerald-400)' },
  { id: 'resident', label: 'Resident / Evacuee', icon: User, color: 'var(--color-amber-400)' },
  { id: 'donor', label: 'Donor / Volunteer', icon: Heart, color: 'var(--color-red-400)' },
];

export default function TopBar({ activeRole, onRoleChange, isOffline, onToggleOffline, syncStats, onSync, onBackToHome }) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const currentRole = ROLES.find(r => r.id === activeRole) || ROLES[0];
  const RoleIcon = currentRole.icon;

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="sticky top-0 z-40 no-print" style={{
      background: 'rgba(244, 249, 246, 0.95)',
      backdropFilter: 'blur(12px)',
      borderBottom: '1px solid #D5E5DE',
    }}>
      {/* Offline banner */}
      {isOffline && (
        <div className="flex items-center justify-center gap-2 py-1.5 text-xs font-bold" style={{
          background: '#FEF3C7',
          color: '#92400E',
          borderBottom: '1px solid #FCD34D'
        }}>
          <div className="w-2 h-2 rounded-full bg-amber-600 animate-ping" />
          DISASTER MODE — OFFLINE OPERATIONS ACTIVE
          <div className="w-2 h-2 rounded-full bg-amber-600 animate-ping" />
        </div>
      )}

      <div className="flex items-center justify-between px-4 py-2.5 max-w-screen-2xl mx-auto">
        {/* Brand / Home link */}
        <div 
          onClick={onBackToHome}
          className="flex items-center gap-2.5 cursor-pointer group transition-opacity hover:opacity-90"
          title="Return to Landing Page"
        >
          <div className="w-9 h-9 rounded-xl flex items-center justify-center shadow-md shadow-emerald-700/20" style={{
            background: 'linear-gradient(135deg, var(--color-emerald-500), var(--color-emerald-700))',
          }}>
            <Shield size={20} color="white" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <h1 className="text-base font-black tracking-tight leading-tight text-[#063B2C]">
                Komuni<span style={{ color: 'var(--color-emerald-400)' }}>Core</span>
              </h1>
              {onBackToHome && (
                <span className="hidden sm:inline-block text-[10px] px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-900 border border-emerald-300 font-bold group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                  ← Landing Page
                </span>
              )}
            </div>
            <p className="text-[10px] font-bold leading-tight tracking-wide text-[#4E7164]">
              DISASTER RELIEF OS
            </p>
          </div>
        </div>

        {/* Role Selector */}
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium cursor-pointer transition-all"
            style={{
              background: 'var(--color-surface-elevated)',
              border: '1px solid var(--color-border)',
              color: 'var(--color-foreground)',
            }}
            onMouseEnter={e => e.currentTarget.style.borderColor = currentRole.color}
            onMouseLeave={e => { if (!dropdownOpen) e.currentTarget.style.borderColor = 'var(--color-border)'; }}
          >
            <RoleIcon size={16} style={{ color: currentRole.color }} />
            <span className="hidden md:inline">{currentRole.label}</span>
            <ChevronDown size={14} style={{
              color: 'var(--color-muted)',
              transform: dropdownOpen ? 'rotate(180deg)' : 'rotate(0)',
              transition: 'transform 0.2s',
            }} />
          </button>

          {dropdownOpen && (
            <div className="absolute right-0 top-full mt-1.5 w-64 rounded-lg overflow-hidden shadow-2xl" style={{
              background: 'var(--color-surface)',
              border: '1px solid var(--color-border)',
              animation: 'slide-up 0.15s ease-out',
            }}>
              {ROLES.map(role => {
                const Icon = role.icon;
                const isActive = role.id === activeRole;
                return (
                  <button
                    key={role.id}
                    onClick={() => { onRoleChange(role.id); setDropdownOpen(false); }}
                    className="w-full flex items-center gap-3 px-4 py-3 text-sm text-left cursor-pointer transition-colors"
                    style={{
                      background: isActive ? 'var(--color-surface-elevated)' : 'transparent',
                      borderLeft: isActive ? `3px solid ${role.color}` : '3px solid transparent',
                      color: isActive ? 'var(--color-foreground)' : 'var(--color-muted)',
                    }}
                    onMouseEnter={e => { if (!isActive) e.currentTarget.style.background = 'var(--color-surface-elevated)'; }}
                    onMouseLeave={e => { if (!isActive) e.currentTarget.style.background = 'transparent'; }}
                  >
                    <Icon size={18} style={{ color: role.color }} />
                    <span className="font-medium">{role.label}</span>
                    {isActive && <Zap size={12} style={{ color: role.color, marginLeft: 'auto' }} />}
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-2">
          {/* Sync Badge */}
          {syncStats.pending > 0 && (
            <button onClick={onSync}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium cursor-pointer transition-all"
              style={{
                background: 'var(--color-amber-900)',
                border: '1px solid var(--color-amber-600)',
                color: 'var(--color-amber-400)',
              }}>
              <RefreshCw size={12} />
              <span>{syncStats.pending} Pending</span>
            </button>
          )}

          {/* Online/Offline Toggle */}
          <button
            onClick={onToggleOffline}
            className="flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-semibold cursor-pointer transition-all"
            style={{
              background: isOffline
                ? 'linear-gradient(135deg, var(--color-amber-900), var(--color-red-900))'
                : 'linear-gradient(135deg, var(--color-emerald-900), var(--color-emerald-700))',
              border: `1px solid ${isOffline ? 'var(--color-amber-600)' : 'var(--color-emerald-600)'}`,
              color: isOffline ? 'var(--color-amber-400)' : 'var(--color-emerald-400)',
            }}
          >
            {isOffline ? <WifiOff size={14} /> : <Wifi size={14} />}
            <span className="hidden sm:inline">{isOffline ? 'OFFLINE' : 'ONLINE'}</span>
            {/* Toggle dot */}
            <div className="w-8 h-4 rounded-full relative" style={{
              background: isOffline ? 'var(--color-amber-600)' : 'var(--color-emerald-600)',
            }}>
              <div className="absolute top-0.5 w-3 h-3 rounded-full transition-all" style={{
                background: 'white',
                left: isOffline ? '2px' : '18px',
              }} />
            </div>
          </button>
        </div>
      </div>
    </header>
  );
}
