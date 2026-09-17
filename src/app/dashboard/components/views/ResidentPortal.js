'use client';

import { useState } from 'react';
import {
  User, Hash, KeyRound, Package, Clock, CheckCircle,
  MapPin, ShieldCheck, ChevronDown, Calendar, Fingerprint,
} from 'lucide-react';

export default function ResidentPortal({ residents, distributions, isOffline }) {
  const [selectedResident, setSelectedResident] = useState(residents[0] || null);
  const [showPinBadge, setShowPinBadge] = useState(false);

  const residentDistributions = distributions.filter(d => d.residentId === selectedResident?.id)
    .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

  return (
    <div className="space-y-5" style={{ animation: 'fade-in 0.3s ease-out' }}>
      {/* Resident Selector */}
      <div className="rounded-xl p-4" style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)' }}>
        <label className="block text-xs font-medium mb-2" style={{ color: 'var(--color-muted)' }}>
          Select Your Profile
        </label>
        <div className="relative">
          <select
            value={selectedResident?.id || ''}
            onChange={e => {
              const r = residents.find(r => r.id === e.target.value);
              setSelectedResident(r);
              setShowPinBadge(false);
            }}
            className="w-full px-4 py-3 rounded-lg text-sm font-medium outline-none cursor-pointer appearance-none"
            style={{
              background: 'var(--color-background)',
              border: '1px solid var(--color-border)',
              color: 'var(--color-foreground)',
            }}
          >
            {residents.map(r => (
              <option key={r.id} value={r.id}>{r.name} — {r.purok}</option>
            ))}
          </select>
          <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" style={{ color: 'var(--color-muted)' }} />
        </div>
      </div>

      {selectedResident && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Profile Card */}
          <div className="lg:col-span-1 space-y-4">
            <div className="rounded-xl overflow-hidden" style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)' }}>
              {/* Header gradient */}
              <div className="h-20 relative" style={{
                background: 'linear-gradient(135deg, var(--color-emerald-700), var(--color-blue-900))',
              }}>
                <div className="absolute -bottom-8 left-5 w-16 h-16 rounded-xl flex items-center justify-center text-2xl font-bold" style={{
                  background: 'var(--color-surface)',
                  border: '3px solid var(--color-emerald-500)',
                  color: 'var(--color-emerald-400)',
                }}>
                  {selectedResident.name.charAt(0)}
                </div>
              </div>

              <div className="pt-10 px-5 pb-5 space-y-4">
                <div>
                  <h2 className="text-lg font-bold">{selectedResident.name}</h2>
                  <p className="text-sm" style={{ color: 'var(--color-muted)' }}>{selectedResident.category}</p>
                </div>

                <div className="space-y-2.5">
                  <div className="flex items-center gap-2.5">
                    <MapPin size={14} style={{ color: 'var(--color-emerald-400)' }} />
                    <span className="text-sm">{selectedResident.purok}, {selectedResident.barangay}</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <Hash size={14} style={{ color: 'var(--color-cyan-400)' }} />
                    <span className="text-sm font-mono" style={{ color: 'var(--color-cyan-400)' }}>{selectedResident.geohash}</span>
                    <span className="text-[10px] px-1.5 py-0.5 rounded-full" style={{
                      background: 'var(--color-emerald-900)',
                      color: 'var(--color-emerald-400)',
                      border: '1px solid var(--color-emerald-700)',
                    }}>
                      L7 Verified
                    </span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <Calendar size={14} style={{ color: 'var(--color-muted)' }} />
                    <span className="text-sm" style={{ color: 'var(--color-muted)' }}>
                      Registered: {new Date(selectedResident.createdAt).toLocaleDateString('en-PH')}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Offline PIN Badge */}
            <div className="rounded-xl overflow-hidden" style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)' }}>
              <div className="px-5 py-3 flex items-center gap-2" style={{ borderBottom: '1px solid var(--color-border)', background: 'var(--color-surface-elevated)' }}>
                <Fingerprint size={16} style={{ color: 'var(--color-cyan-400)' }} />
                <span className="text-sm font-semibold">Offline PIN Badge</span>
              </div>
              <div className="p-5 text-center">
                {showPinBadge ? (
                  <div style={{ animation: 'count-up 0.3s ease-out' }}>
                    <div className="flex items-center justify-center gap-3 mb-3">
                      {selectedResident.pin.split('').map((digit, i) => (
                        <div key={i} className="w-14 h-16 rounded-lg flex items-center justify-center text-2xl font-bold" style={{
                          background: 'var(--color-emerald-900)',
                          border: '2px solid var(--color-emerald-500)',
                          color: 'var(--color-emerald-400)',
                          animation: `slide-up 0.3s ease-out ${i * 0.08}s both`,
                        }}>
                          {digit}
                        </div>
                      ))}
                    </div>
                    <p className="text-xs" style={{ color: 'var(--color-muted)' }}>
                      Show this PIN to relief workers for verification
                    </p>
                    <button onClick={() => setShowPinBadge(false)}
                      className="mt-2 text-xs px-3 py-1.5 rounded-lg cursor-pointer"
                      style={{ background: 'var(--color-border)', color: 'var(--color-muted)' }}>
                      Hide PIN
                    </button>
                  </div>
                ) : (
                  <div>
                    <div className="flex items-center justify-center gap-3 mb-3">
                      {[0, 1, 2, 3].map(i => (
                        <div key={i} className="w-14 h-16 rounded-lg flex items-center justify-center text-2xl font-bold" style={{
                          background: 'var(--color-background)',
                          border: '2px solid var(--color-border-bright)',
                          color: 'var(--color-muted-dim)',
                        }}>
                          •
                        </div>
                      ))}
                    </div>
                    <button onClick={() => setShowPinBadge(true)}
                      className="text-sm px-4 py-2 rounded-lg font-medium cursor-pointer transition-all flex items-center gap-2 mx-auto"
                      style={{
                        background: 'linear-gradient(135deg, var(--color-cyan-500), var(--color-blue-500))',
                        color: 'white',
                      }}>
                      <KeyRound size={14} /> Reveal PIN
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Status Badges */}
            <div className="space-y-2">
              <div className="flex items-center gap-2 rounded-lg px-3 py-2.5" style={{
                background: isOffline ? 'var(--color-amber-900)' : 'var(--color-emerald-900)',
                border: `1px solid ${isOffline ? 'var(--color-amber-600)' : 'var(--color-emerald-700)'}`,
                color: isOffline ? 'var(--color-amber-400)' : 'var(--color-emerald-400)',
              }}>
                <div className="w-2 h-2 rounded-full" style={{
                  background: isOffline ? 'var(--color-amber-500)' : 'var(--color-emerald-500)',
                  animation: isOffline ? 'pulse-amber 2s infinite' : 'pulse-emerald 2s infinite',
                }} />
                <span className="text-xs font-semibold">
                  {isOffline ? 'Offline — Cached Locally' : 'Online — Synced'}
                </span>
              </div>
              <div className="flex items-center gap-2 rounded-lg px-3 py-2.5" style={{
                background: 'var(--color-emerald-900)',
                border: '1px solid var(--color-emerald-700)',
                color: 'var(--color-emerald-400)',
              }}>
                <ShieldCheck size={14} />
                <span className="text-xs font-semibold">COA Compliant Record</span>
              </div>
            </div>
          </div>

          {/* Assistance Tracker */}
          <div className="lg:col-span-2 rounded-xl overflow-hidden" style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)' }}>
            <div className="px-5 py-4 flex items-center justify-between" style={{ borderBottom: '1px solid var(--color-border)' }}>
              <div className="flex items-center gap-2">
                <Package size={18} style={{ color: 'var(--color-emerald-400)' }} />
                <h3 className="font-semibold">Assistance Received</h3>
              </div>
              <span className="text-xs px-2 py-0.5 rounded-full" style={{
                background: 'var(--color-surface-elevated)',
                color: 'var(--color-muted)',
              }}>
                {residentDistributions.length} records
              </span>
            </div>

            {residentDistributions.length > 0 ? (
              <div className="divide-y" style={{ '--tw-divide-color': 'var(--color-border)' }}>
                {residentDistributions.map((dist, i) => (
                  <div key={dist.id} className="px-5 py-4 flex items-center gap-4 transition-colors"
                    style={{ animation: `slide-in-right 0.3s ease-out ${i * 0.05}s both` }}
                    onMouseEnter={e => e.currentTarget.style.background = 'var(--color-surface-elevated)'}
                    onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                  >
                    <div className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0" style={{
                      background: 'var(--color-emerald-900)',
                      border: '1px solid var(--color-emerald-700)',
                    }}>
                      <Package size={18} style={{ color: 'var(--color-emerald-400)' }} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium">{dist.quantity}x {dist.itemName}</p>
                      <p className="text-xs mt-0.5" style={{ color: 'var(--color-muted)' }}>
                        {new Date(dist.timestamp).toLocaleDateString('en-PH', {
                          weekday: 'short', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit',
                        })}
                      </p>
                    </div>
                    <div className="flex flex-col items-end gap-1 shrink-0">
                      {dist.verifiedByPin && (
                        <span className="flex items-center gap-1 text-[10px] px-2 py-0.5 rounded-full" style={{
                          background: 'var(--color-emerald-900)',
                          color: 'var(--color-emerald-400)',
                          border: '1px solid var(--color-emerald-700)',
                        }}>
                          <KeyRound size={8} /> PIN Verified
                        </span>
                      )}
                      {dist.syncStatus === 'synced' ? (
                        <span className="flex items-center gap-1 text-[10px]" style={{ color: 'var(--color-emerald-400)' }}>
                          <CheckCircle size={10} /> Synced
                        </span>
                      ) : (
                        <span className="flex items-center gap-1 text-[10px]" style={{ color: 'var(--color-amber-400)' }}>
                          <Clock size={10} /> Pending Sync
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="px-5 py-12 text-center">
                <Package size={36} style={{ color: 'var(--color-muted-dim)', margin: '0 auto 12px' }} />
                <p className="text-sm font-medium" style={{ color: 'var(--color-muted)' }}>No assistance records yet</p>
                <p className="text-xs mt-1" style={{ color: 'var(--color-muted-dim)' }}>
                  Show your PIN badge to a relief worker during distribution
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
