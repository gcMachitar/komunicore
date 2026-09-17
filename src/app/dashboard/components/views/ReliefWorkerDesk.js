'use client';

import { useState } from 'react';
import {
  UserPlus, KeyRound, ClipboardList, Search,
  Users, CheckCircle, Clock, Hash, ChevronRight,
} from 'lucide-react';
import IntakeFormModal from '../modals/IntakeFormModal';
import DistributionModal from '../modals/DistributionModal';

export default function ReliefWorkerDesk({ residents, distributions, onAddResident, onAddDistribution, isOffline }) {
  const [showIntakeModal, setShowIntakeModal] = useState(false);
  const [showDistModal, setShowDistModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredResidents = residents.filter(r =>
    r.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    r.pin?.includes(searchTerm) ||
    r.purok?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const recentDistributions = [...distributions]
    .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
    .slice(0, 8);

  return (
    <div className="space-y-5" style={{ animation: 'fade-in 0.3s ease-out' }}>
      {/* Action Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <button onClick={() => setShowIntakeModal(true)}
          className="flex items-center gap-4 p-5 rounded-xl cursor-pointer transition-all text-left"
          style={{
            background: 'linear-gradient(135deg, var(--color-emerald-900), var(--color-surface))',
            border: '1px solid var(--color-emerald-700)',
          }}
          onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--color-emerald-500)'}
          onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--color-emerald-700)'}
        >
          <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{
            background: 'var(--color-emerald-700)',
          }}>
            <UserPlus size={24} style={{ color: 'var(--color-emerald-400)' }} />
          </div>
          <div className="flex-1">
            <p className="font-bold text-base">New Resident Intake</p>
            <p className="text-xs mt-0.5" style={{ color: 'var(--color-muted)' }}>
              Register evacuee with geohash validation
            </p>
          </div>
          <ChevronRight size={18} style={{ color: 'var(--color-emerald-400)' }} />
        </button>

        <button onClick={() => setShowDistModal(true)}
          className="flex items-center gap-4 p-5 rounded-xl cursor-pointer transition-all text-left"
          style={{
            background: 'linear-gradient(135deg, var(--color-blue-900), var(--color-surface))',
            border: '1px solid var(--color-border-bright)',
          }}
          onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--color-cyan-400)'}
          onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--color-border-bright)'}
        >
          <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{
            background: 'var(--color-blue-900)',
            border: '1px solid var(--color-blue-400)',
          }}>
            <KeyRound size={24} style={{ color: 'var(--color-cyan-400)' }} />
          </div>
          <div className="flex-1">
            <p className="font-bold text-base">PIN Handshake Distribution</p>
            <p className="text-xs mt-0.5" style={{ color: 'var(--color-muted)' }}>
              Verify & log supplies with 4-digit PIN
            </p>
          </div>
          <ChevronRight size={18} style={{ color: 'var(--color-cyan-400)' }} />
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
        {/* Resident Registry */}
        <div className="lg:col-span-3 rounded-xl overflow-hidden" style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)' }}>
          <div className="px-5 py-4 flex items-center justify-between" style={{ borderBottom: '1px solid var(--color-border)' }}>
            <div className="flex items-center gap-2">
              <Users size={18} style={{ color: 'var(--color-emerald-400)' }} />
              <h3 className="font-semibold">Resident Registry</h3>
              <span className="text-xs px-2 py-0.5 rounded-full" style={{ background: 'var(--color-surface-elevated)', color: 'var(--color-muted)' }}>
                {residents.length}
              </span>
            </div>
          </div>

          {/* Search */}
          <div className="px-4 py-3" style={{ borderBottom: '1px solid var(--color-border)' }}>
            <div className="relative">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: 'var(--color-muted-dim)' }} />
              <input
                type="text"
                placeholder="Search name, PIN, or purok..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className="w-full pl-8 pr-3 py-2 rounded-lg text-sm outline-none"
                style={{
                  background: 'var(--color-background)',
                  border: '1px solid var(--color-border)',
                  color: 'var(--color-foreground)',
                }}
                onFocus={e => e.target.style.borderColor = 'var(--color-emerald-500)'}
                onBlur={e => e.target.style.borderColor = 'var(--color-border)'}
              />
            </div>
          </div>

          {/* Residents List */}
          <div className="max-h-96 overflow-y-auto">
            {filteredResidents.map((resident, i) => (
              <div key={resident.id}
                className="flex items-center gap-3 px-5 py-3 transition-colors"
                style={{
                  borderBottom: '1px solid var(--color-border)',
                  animation: `fade-in 0.2s ease-out ${i * 0.03}s both`,
                }}
                onMouseEnter={e => e.currentTarget.style.background = 'var(--color-surface-elevated)'}
                onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
              >
                <div className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold shrink-0" style={{
                  background: 'var(--color-surface-elevated)',
                  border: '1px solid var(--color-border-bright)',
                  color: 'var(--color-emerald-400)',
                }}>
                  {resident.name.charAt(0)}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{resident.name}</p>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="text-xs" style={{ color: 'var(--color-muted)' }}>{resident.category}</span>
                    <span className="text-[10px]" style={{ color: 'var(--color-muted-dim)' }}>•</span>
                    <span className="text-xs" style={{ color: 'var(--color-muted)' }}>{resident.purok}</span>
                  </div>
                </div>
                <div className="text-right shrink-0 space-y-1">
                  <div className="flex items-center gap-1 text-xs font-mono" style={{ color: 'var(--color-cyan-400)' }}>
                    <Hash size={10} />
                    {resident.geohash}
                  </div>
                  <div className="flex items-center gap-1">
                    {resident.syncStatus === 'synced' ? (
                      <span className="flex items-center gap-1 text-[10px]" style={{ color: 'var(--color-emerald-400)' }}>
                        <CheckCircle size={10} /> Synced
                      </span>
                    ) : (
                      <span className="flex items-center gap-1 text-[10px]" style={{ color: 'var(--color-amber-400)' }}>
                        <Clock size={10} /> Pending
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
            {filteredResidents.length === 0 && (
              <div className="px-5 py-8 text-center text-sm" style={{ color: 'var(--color-muted)' }}>
                No residents found matching &ldquo;{searchTerm}&rdquo;
              </div>
            )}
          </div>
        </div>

        {/* Recent Distributions */}
        <div className="lg:col-span-2 rounded-xl overflow-hidden" style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)' }}>
          <div className="px-5 py-4 flex items-center gap-2" style={{ borderBottom: '1px solid var(--color-border)' }}>
            <ClipboardList size={18} style={{ color: 'var(--color-cyan-400)' }} />
            <h3 className="font-semibold">Recent Distributions</h3>
          </div>

          <div className="max-h-96 overflow-y-auto">
            {recentDistributions.map((dist, i) => (
              <div key={dist.id}
                className="px-5 py-3 transition-colors"
                style={{
                  borderBottom: '1px solid var(--color-border)',
                  animation: `slide-in-right 0.3s ease-out ${i * 0.05}s both`,
                }}
                onMouseEnter={e => e.currentTarget.style.background = 'var(--color-surface-elevated)'}
                onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium">{dist.residentName}</span>
                  {dist.verifiedByPin && (
                    <span className="flex items-center gap-1 text-[10px] px-1.5 py-0.5 rounded-full" style={{
                      background: 'var(--color-emerald-900)',
                      color: 'var(--color-emerald-400)',
                      border: '1px solid var(--color-emerald-700)',
                    }}>
                      <KeyRound size={8} /> PIN Verified
                    </span>
                  )}
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs" style={{ color: 'var(--color-muted)' }}>
                    {dist.quantity}x {dist.itemName}
                  </span>
                  <span className="text-[10px] font-mono" style={{ color: 'var(--color-muted-dim)' }}>
                    {new Date(dist.timestamp).toLocaleDateString('en-PH', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
              </div>
            ))}
            {recentDistributions.length === 0 && (
              <div className="px-5 py-8 text-center text-sm" style={{ color: 'var(--color-muted)' }}>
                No distributions recorded yet
              </div>
            )}
          </div>
        </div>
      </div>

      {showIntakeModal && (
        <IntakeFormModal
          onClose={() => setShowIntakeModal(false)}
          onSubmit={(data) => { onAddResident(data); setShowIntakeModal(false); }}
        />
      )}

      {showDistModal && (
        <DistributionModal
          onClose={() => setShowDistModal(false)}
          onSubmit={(data) => { onAddDistribution(data); setShowDistModal(false); }}
          residents={residents}
          isOffline={isOffline}
        />
      )}
    </div>
  );
}
