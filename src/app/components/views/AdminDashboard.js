'use client';

import { useState } from 'react';
import {
  Users, Home, Package, TrendingUp, AlertTriangle,
  FileText, BarChart3, ShieldCheck, Clock, ArrowUpRight,
  Boxes, Activity,
} from 'lucide-react';
import { getTriageStatus } from '../../lib/expiryTriage';
import { formatPHP } from '../../lib/coaGenerator';
import COAReportModal from '../modals/COAReportModal';

export default function AdminDashboard({ residents, shelters, inventory, distributions, isOffline }) {
  const [showCOAModal, setShowCOAModal] = useState(false);

  const totalResidents = residents.length;
  const totalShelters = shelters.length;
  const totalEvacuees = shelters.reduce((sum, s) => sum + s.currentOccupants, 0);
  const totalDistributed = distributions.length;
  const pendingSync = distributions.filter(d => d.syncStatus === 'pending').length;

  const stats = [
    { label: 'Registered Residents', value: totalResidents, icon: Users, color: 'var(--color-cyan-400)', bg: 'var(--color-blue-900)' },
    { label: 'Active Evacuees', value: totalEvacuees, icon: Home, color: 'var(--color-amber-400)', bg: 'var(--color-amber-900)' },
    { label: 'Evacuation Shelters', value: totalShelters, icon: ShieldCheck, color: 'var(--color-emerald-400)', bg: 'var(--color-emerald-900)' },
    { label: 'Distributions Logged', value: totalDistributed, icon: Package, color: 'var(--color-red-400)', bg: 'var(--color-red-900)' },
  ];

  return (
    <div className="space-y-5" style={{ animation: 'fade-in 0.3s ease-out' }}>
      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {stats.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <div key={i} className="rounded-xl p-4 transition-all" style={{
              background: 'var(--color-surface)',
              border: '1px solid var(--color-border)',
              animation: `slide-up 0.3s ease-out ${i * 0.05}s both`,
            }}>
              <div className="flex items-center justify-between mb-3">
                <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ background: stat.bg }}>
                  <Icon size={18} style={{ color: stat.color }} />
                </div>
                <ArrowUpRight size={14} style={{ color: 'var(--color-muted-dim)' }} />
              </div>
              <p className="text-2xl font-bold" style={{ animation: 'count-up 0.4s ease-out' }}>{stat.value}</p>
              <p className="text-xs mt-0.5" style={{ color: 'var(--color-muted)' }}>{stat.label}</p>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Shelter Capacity Chart */}
        <div className="lg:col-span-2 rounded-xl p-5" style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)' }}>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <BarChart3 size={18} style={{ color: 'var(--color-emerald-400)' }} />
              <h3 className="font-semibold">Shelter Capacity Overview</h3>
            </div>
            <span className="text-xs px-2 py-1 rounded-full font-medium" style={{
              background: 'var(--color-emerald-900)',
              color: 'var(--color-emerald-400)',
            }}>Live</span>
          </div>
          <div className="space-y-3">
            {shelters.map((shelter, i) => {
              const pct = Math.round((shelter.currentOccupants / shelter.capacity) * 100);
              const barColor = pct >= 90 ? 'var(--color-red-500)' : pct >= 70 ? 'var(--color-amber-500)' : 'var(--color-emerald-500)';
              return (
                <div key={shelter.id} style={{ animation: `slide-in-right 0.3s ease-out ${i * 0.08}s both` }}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium truncate flex-1 mr-2">{shelter.name}</span>
                    <span className="text-xs font-mono whitespace-nowrap" style={{ color: barColor }}>
                      {shelter.currentOccupants}/{shelter.capacity} ({pct}%)
                    </span>
                  </div>
                  <div className="w-full h-2.5 rounded-full overflow-hidden" style={{ background: 'var(--color-background)' }}>
                    <div className="h-full rounded-full transition-all duration-700" style={{
                      width: `${pct}%`,
                      background: barColor,
                      boxShadow: `0 0 8px ${barColor}40`,
                    }} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="rounded-xl p-5 space-y-3" style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)' }}>
          <div className="flex items-center gap-2 mb-1">
            <Activity size={18} style={{ color: 'var(--color-cyan-400)' }} />
            <h3 className="font-semibold">Quick Actions</h3>
          </div>

          <button onClick={() => setShowCOAModal(true)}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg cursor-pointer transition-all text-left"
            style={{
              background: 'linear-gradient(135deg, var(--color-cyan-500), var(--color-blue-500))',
              color: 'white',
            }}
            onMouseEnter={e => e.currentTarget.style.opacity = '0.9'}
            onMouseLeave={e => e.currentTarget.style.opacity = '1'}
          >
            <FileText size={20} />
            <div>
              <p className="text-sm font-semibold">Generate COA Report</p>
              <p className="text-xs opacity-80">SSMI w/ Geotag Metadata</p>
            </div>
          </button>

          <div className="rounded-lg p-3 space-y-2" style={{ background: 'var(--color-background)', border: '1px solid var(--color-border)' }}>
            <div className="flex items-center justify-between text-sm">
              <span style={{ color: 'var(--color-muted)' }}>Sync Status</span>
              {pendingSync > 0 ? (
                <span className="flex items-center gap-1 text-xs font-medium" style={{ color: 'var(--color-amber-400)' }}>
                  <Clock size={12} /> {pendingSync} pending
                </span>
              ) : (
                <span className="flex items-center gap-1 text-xs font-medium" style={{ color: 'var(--color-emerald-400)' }}>
                  <ShieldCheck size={12} /> All synced
                </span>
              )}
            </div>
            <div className="flex items-center justify-between text-sm">
              <span style={{ color: 'var(--color-muted)' }}>Network</span>
              <span className="text-xs font-semibold" style={{ color: isOffline ? 'var(--color-amber-400)' : 'var(--color-emerald-400)' }}>
                {isOffline ? 'OFFLINE' : 'CONNECTED'}
              </span>
            </div>
          </div>

          {isOffline && (
            <div className="flex items-center gap-2 rounded-lg px-3 py-2 text-xs" style={{
              background: 'var(--color-amber-900)',
              border: '1px solid var(--color-amber-600)',
              color: 'var(--color-amber-400)',
            }}>
              <AlertTriangle size={14} />
              <span>Operating in cached offline mode</span>
            </div>
          )}
        </div>
      </div>

      {/* Inventory Table with Expiry Triage */}
      <div className="rounded-xl overflow-hidden" style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)' }}>
        <div className="flex items-center justify-between px-5 py-4" style={{ borderBottom: '1px solid var(--color-border)' }}>
          <div className="flex items-center gap-2">
            <Boxes size={18} style={{ color: 'var(--color-emerald-400)' }} />
            <h3 className="font-semibold">Inventory & AI Expiry Triage</h3>
          </div>
          <div className="flex gap-2">
            {['Safe', 'Near Expiry', 'Expired'].map((label, i) => {
              const colors = ['var(--color-emerald-400)', 'var(--color-amber-400)', 'var(--color-red-400)'];
              return (
                <span key={label} className="flex items-center gap-1.5 text-xs" style={{ color: colors[i] }}>
                  <div className="w-2 h-2 rounded-full" style={{ background: colors[i] }} />
                  {label}
                </span>
              );
            })}
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr style={{ background: 'var(--color-surface-elevated)' }}>
                {['Supply Item', 'Category', 'Qty', 'Unit Cost', 'Expiry', 'AI Triage', 'Source'].map(h => (
                  <th key={h} className="text-left px-4 py-2.5 font-medium text-xs whitespace-nowrap" style={{ color: 'var(--color-muted)' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {inventory.map((item, i) => {
                const triage = getTriageStatus(item.expiryDate);
                const triageColors = {
                  emerald: { bg: 'var(--color-emerald-900)', text: 'var(--color-emerald-400)', border: 'var(--color-emerald-700)' },
                  amber: { bg: 'var(--color-amber-900)', text: 'var(--color-amber-400)', border: 'var(--color-amber-600)' },
                  red: { bg: 'var(--color-red-900)', text: 'var(--color-red-400)', border: 'var(--color-red-600)' },
                };
                const tc = triageColors[triage.color];
                return (
                  <tr key={item.id} style={{
                    borderTop: '1px solid var(--color-border)',
                    animation: `fade-in 0.2s ease-out ${i * 0.03}s both`,
                  }}
                    onMouseEnter={e => e.currentTarget.style.background = 'var(--color-surface-elevated)'}
                    onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                  >
                    <td className="px-4 py-2.5 font-medium">{item.name}</td>
                    <td className="px-4 py-2.5" style={{ color: 'var(--color-muted)' }}>{item.category}</td>
                    <td className="px-4 py-2.5 font-mono">{item.quantity} {item.unit}</td>
                    <td className="px-4 py-2.5 font-mono" style={{ color: 'var(--color-muted)' }}>{formatPHP(item.unitCost)}</td>
                    <td className="px-4 py-2.5 font-mono text-xs">{item.expiryDate}</td>
                    <td className="px-4 py-2.5">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold whitespace-nowrap" style={{
                        background: tc.bg,
                        color: tc.text,
                        border: `1px solid ${tc.border}`,
                      }}>
                        <div className="w-1.5 h-1.5 rounded-full" style={{
                          background: tc.text,
                          animation: triage.color === 'red' ? 'pulse-red 1.5s infinite' : triage.color === 'amber' ? 'pulse-amber 2s infinite' : 'none',
                        }} />
                        {triage.status}
                      </span>
                    </td>
                    <td className="px-4 py-2.5 text-xs" style={{ color: 'var(--color-muted)' }}>{item.source}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {showCOAModal && (
        <COAReportModal
          onClose={() => setShowCOAModal(false)}
          distributions={distributions}
        />
      )}
    </div>
  );
}
