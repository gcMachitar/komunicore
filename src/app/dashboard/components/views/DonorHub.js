'use client';

import { useState } from 'react';
import {
  Heart, MapPin, Package, AlertTriangle, TrendingUp,
  ArrowRight, Send, CheckCircle, Building2, Boxes,
  Users, Droplets, X, ChevronRight,
} from 'lucide-react';
import { SUPPLY_TYPES } from '../../lib/mockData';

export default function DonorHub({ shelters, onAddPledge, isOffline }) {
  const [pledgeForm, setPledgeForm] = useState({ donorName: '', item: SUPPLY_TYPES[0], quantity: 10, targetShelter: '' });
  const [pledgeSubmitted, setPledgeSubmitted] = useState(false);
  const [redirectNotice, setRedirectNotice] = useState(null);

  // Compute deficit per shelter per supply
  const shelterDeficits = shelters.map(shelter => {
    const deficits = Object.entries(shelter.supplies).map(([item, data]) => ({
      item,
      current: data.current,
      needed: data.needed,
      deficit: Math.max(0, data.needed - data.current),
      pctFull: Math.round((data.current / data.needed) * 100),
      unit: data.unit,
    }));
    const totalDeficit = deficits.reduce((sum, d) => sum + d.deficit, 0);
    return { ...shelter, deficits, totalDeficit };
  });

  // Find shelter with worst deficit for auto-redirect
  const getRedirectShelter = (supplyItem) => {
    let worstShelter = null;
    let worstPct = Infinity;
    shelterDeficits.forEach(shelter => {
      const supply = shelter.deficits.find(d => d.item === supplyItem || d.item.toLowerCase().includes(supplyItem.toLowerCase()));
      if (supply && supply.pctFull < worstPct) {
        worstPct = supply.pctFull;
        worstShelter = shelter;
      }
    });
    return worstShelter;
  };

  const handlePledge = () => {
    if (!pledgeForm.donorName.trim()) return;

    // Auto-redirect to most in-need shelter
    let targetShelter = pledgeForm.targetShelter;
    let wasRedirected = false;

    if (!targetShelter) {
      const redirect = getRedirectShelter(pledgeForm.item);
      if (redirect) {
        targetShelter = redirect.id;
        wasRedirected = true;
        setRedirectNotice({
          from: 'Auto-assigned',
          to: redirect.name,
          reason: `Highest deficit for ${pledgeForm.item}`,
        });
      }
    } else {
      // Check if selected shelter is already full for this item
      const selected = shelterDeficits.find(s => s.id === targetShelter);
      const supply = selected?.deficits.find(d => d.item.toLowerCase().includes(pledgeForm.item.toLowerCase()));
      if (supply && supply.pctFull >= 100) {
        const redirect = getRedirectShelter(pledgeForm.item);
        if (redirect && redirect.id !== targetShelter) {
          wasRedirected = true;
          setRedirectNotice({
            from: selected.name,
            to: redirect.name,
            reason: `${supply.item} is at ${supply.pctFull}% capacity`,
          });
          targetShelter = redirect.id;
        }
      }
    }

    onAddPledge({
      donorName: pledgeForm.donorName,
      itemName: pledgeForm.item,
      quantity: parseInt(pledgeForm.quantity) || 10,
      targetShelter,
      wasRedirected,
    });

    setPledgeSubmitted(true);
    setTimeout(() => {
      setPledgeSubmitted(false);
      setRedirectNotice(null);
      setPledgeForm({ donorName: '', item: SUPPLY_TYPES[0], quantity: 10, targetShelter: '' });
    }, 3000);
  };

  return (
    <div className="space-y-5" style={{ animation: 'fade-in 0.3s ease-out' }}>
      {/* Active Relief Needs Feed */}
      <div className="rounded-xl overflow-hidden" style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)' }}>
        <div className="px-5 py-4 flex items-center justify-between" style={{ borderBottom: '1px solid var(--color-border)' }}>
          <div className="flex items-center gap-2">
            <AlertTriangle size={18} style={{ color: 'var(--color-amber-400)' }} />
            <h3 className="font-semibold">Active Relief Needs</h3>
          </div>
          <span className="text-xs px-2.5 py-1 rounded-full font-medium" style={{
            background: 'var(--color-red-900)',
            color: 'var(--color-red-400)',
            border: '1px solid var(--color-red-600)',
            animation: 'pulse-red 2s infinite',
          }}>
            URGENT
          </span>
        </div>

        <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-3">
          {shelterDeficits.filter(s => s.totalDeficit > 0).map((shelter, i) => {
            const topDeficits = shelter.deficits.filter(d => d.deficit > 0).sort((a, b) => a.pctFull - b.pctFull).slice(0, 3);
            const statusColor = shelter.status === 'critical' ? 'var(--color-red-400)' : shelter.status === 'moderate' ? 'var(--color-amber-400)' : 'var(--color-emerald-400)';

            return (
              <div key={shelter.id} className="rounded-lg p-4 transition-all" style={{
                background: 'var(--color-background)',
                border: '1px solid var(--color-border)',
                animation: `slide-up 0.3s ease-out ${i * 0.08}s both`,
              }}
                onMouseEnter={e => e.currentTarget.style.borderColor = statusColor}
                onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--color-border)'}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <Building2 size={16} style={{ color: statusColor }} />
                    <span className="text-sm font-semibold">{shelter.name}</span>
                  </div>
                  <span className="text-[10px] px-2 py-0.5 rounded-full font-semibold uppercase" style={{
                    background: shelter.status === 'critical' ? 'var(--color-red-900)' : shelter.status === 'moderate' ? 'var(--color-amber-900)' : 'var(--color-emerald-900)',
                    color: statusColor,
                    border: `1px solid ${statusColor}`,
                  }}>
                    {shelter.status}
                  </span>
                </div>

                <div className="flex items-center gap-3 mb-3 text-xs" style={{ color: 'var(--color-muted)' }}>
                  <span className="flex items-center gap-1"><Users size={12} /> {shelter.currentOccupants}/{shelter.capacity}</span>
                  <span className="flex items-center gap-1"><Boxes size={12} /> {shelter.totalDeficit} items needed</span>
                </div>

                <div className="space-y-2">
                  {topDeficits.map(d => (
                    <div key={d.item}>
                      <div className="flex items-center justify-between text-xs mb-0.5">
                        <span>{d.item}</span>
                        <span className="font-mono" style={{
                          color: d.pctFull >= 80 ? 'var(--color-emerald-400)' : d.pctFull >= 50 ? 'var(--color-amber-400)' : 'var(--color-red-400)',
                        }}>
                          {d.pctFull === 0 ? 'EMPTY' : `${d.pctFull}%`} ({d.deficit} {d.unit} needed)
                        </span>
                      </div>
                      <div className="w-full h-1.5 rounded-full overflow-hidden" style={{ background: 'var(--color-surface-elevated)' }}>
                        <div className="h-full rounded-full" style={{
                          width: `${d.pctFull}%`,
                          background: d.pctFull >= 80 ? 'var(--color-emerald-500)' : d.pctFull >= 50 ? 'var(--color-amber-500)' : 'var(--color-red-500)',
                        }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
        {/* Shelter Map Grid */}
        <div className="lg:col-span-3 rounded-xl overflow-hidden" style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)' }}>
          <div className="px-5 py-4 flex items-center gap-2" style={{ borderBottom: '1px solid var(--color-border)' }}>
            <MapPin size={18} style={{ color: 'var(--color-emerald-400)' }} />
            <h3 className="font-semibold">Shelter Map Grid</h3>
          </div>
          <div className="p-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
            {shelterDeficits.map((shelter, i) => {
              const occupancyPct = Math.round((shelter.currentOccupants / shelter.capacity) * 100);
              const bgGradient = shelter.status === 'critical'
                ? 'linear-gradient(135deg, var(--color-red-900), var(--color-surface-elevated))'
                : shelter.status === 'moderate'
                  ? 'linear-gradient(135deg, var(--color-amber-900), var(--color-surface-elevated))'
                  : 'linear-gradient(135deg, var(--color-emerald-900), var(--color-surface-elevated))';

              return (
                <div key={shelter.id} className="rounded-lg p-4" style={{
                  background: bgGradient,
                  border: '1px solid var(--color-border)',
                  animation: `slide-up 0.3s ease-out ${i * 0.08}s both`,
                }}>
                  <div className="flex items-center gap-2 mb-3">
                    <Building2 size={16} style={{ color: 'var(--color-foreground)' }} />
                    <span className="text-sm font-semibold">{shelter.name.split('—')[0].trim()}</span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 mb-3">
                    <div className="rounded-md p-2 text-center" style={{ background: 'rgba(0,0,0,0.3)' }}>
                      <p className="text-lg font-bold">{occupancyPct}%</p>
                      <p className="text-[10px]" style={{ color: 'var(--color-muted)' }}>Occupancy</p>
                    </div>
                    <div className="rounded-md p-2 text-center" style={{ background: 'rgba(0,0,0,0.3)' }}>
                      <p className="text-lg font-bold">{shelter.totalDeficit}</p>
                      <p className="text-[10px]" style={{ color: 'var(--color-muted)' }}>Items Needed</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-1 text-[10px] font-mono" style={{ color: 'var(--color-muted)' }}>
                    <MapPin size={10} /> Geohash: {shelter.geohash}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Resource Pledge Form */}
        <div className="lg:col-span-2 rounded-xl overflow-hidden" style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)' }}>
          <div className="px-5 py-4 flex items-center gap-2" style={{ borderBottom: '1px solid var(--color-border)' }}>
            <Heart size={18} style={{ color: 'var(--color-red-400)' }} />
            <h3 className="font-semibold">Pledge Supplies</h3>
          </div>

          <div className="p-5 space-y-4">
            {pledgeSubmitted ? (
              <div className="text-center py-6" style={{ animation: 'count-up 0.3s ease-out' }}>
                <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3" style={{
                  background: 'var(--color-emerald-900)',
                  border: '2px solid var(--color-emerald-500)',
                }}>
                  <CheckCircle size={32} style={{ color: 'var(--color-emerald-400)' }} />
                </div>
                <p className="font-bold text-lg">Pledge Recorded!</p>
                <p className="text-sm mt-1" style={{ color: 'var(--color-muted)' }}>
                  Thank you for your generosity
                </p>

                {redirectNotice && (
                  <div className="mt-3 rounded-lg p-3 text-left" style={{
                    background: 'var(--color-amber-900)',
                    border: '1px solid var(--color-amber-600)',
                  }}>
                    <div className="flex items-center gap-1.5 mb-1">
                      <TrendingUp size={12} style={{ color: 'var(--color-amber-400)' }} />
                      <span className="text-xs font-semibold" style={{ color: 'var(--color-amber-400)' }}>Redirected Demand</span>
                    </div>
                    <p className="text-xs" style={{ color: 'var(--color-amber-400)' }}>
                      {redirectNotice.reason}
                    </p>
                    <div className="flex items-center gap-2 mt-1 text-xs font-medium" style={{ color: 'var(--color-foreground)' }}>
                      {redirectNotice.from} <ArrowRight size={12} /> {redirectNotice.to}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <>
                <div>
                  <label className="block text-xs font-medium mb-1.5" style={{ color: 'var(--color-muted)' }}>Your Name</label>
                  <input type="text" value={pledgeForm.donorName}
                    onChange={e => setPledgeForm(prev => ({ ...prev, donorName: e.target.value }))}
                    placeholder="e.g. Rotary Club Manila"
                    className="w-full px-3 py-2.5 rounded-lg text-sm outline-none"
                    style={{ background: 'var(--color-background)', border: '1px solid var(--color-border)', color: 'var(--color-foreground)' }}
                    onFocus={e => e.target.style.borderColor = 'var(--color-emerald-500)'}
                    onBlur={e => e.target.style.borderColor = 'var(--color-border)'}
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium mb-1.5" style={{ color: 'var(--color-muted)' }}>Supply Item</label>
                  <select value={pledgeForm.item}
                    onChange={e => setPledgeForm(prev => ({ ...prev, item: e.target.value }))}
                    className="w-full px-3 py-2.5 rounded-lg text-sm outline-none cursor-pointer"
                    style={{ background: 'var(--color-background)', border: '1px solid var(--color-border)', color: 'var(--color-foreground)' }}>
                    {SUPPLY_TYPES.map(item => (
                      <option key={item} value={item}>{item}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium mb-1.5" style={{ color: 'var(--color-muted)' }}>Quantity</label>
                  <input type="number" min={1} value={pledgeForm.quantity}
                    onChange={e => setPledgeForm(prev => ({ ...prev, quantity: e.target.value }))}
                    className="w-full px-3 py-2.5 rounded-lg text-sm outline-none"
                    style={{ background: 'var(--color-background)', border: '1px solid var(--color-border)', color: 'var(--color-foreground)' }} />
                </div>
                <div>
                  <label className="block text-xs font-medium mb-1.5" style={{ color: 'var(--color-muted)' }}>
                    Target Shelter <span className="font-normal">(optional — auto-routes to highest need)</span>
                  </label>
                  <select value={pledgeForm.targetShelter}
                    onChange={e => setPledgeForm(prev => ({ ...prev, targetShelter: e.target.value }))}
                    className="w-full px-3 py-2.5 rounded-lg text-sm outline-none cursor-pointer"
                    style={{ background: 'var(--color-background)', border: '1px solid var(--color-border)', color: 'var(--color-foreground)' }}>
                    <option value="">Auto-route to highest need</option>
                    {shelters.map(s => (
                      <option key={s.id} value={s.id}>{s.name}</option>
                    ))}
                  </select>
                </div>

                <button onClick={handlePledge}
                  disabled={!pledgeForm.donorName.trim()}
                  className="w-full py-3 rounded-lg font-semibold text-sm flex items-center justify-center gap-2 cursor-pointer transition-all"
                  style={{
                    background: pledgeForm.donorName.trim()
                      ? 'linear-gradient(135deg, var(--color-emerald-600), var(--color-emerald-700))'
                      : 'var(--color-border)',
                    color: pledgeForm.donorName.trim() ? 'white' : 'var(--color-muted-dim)',
                    opacity: pledgeForm.donorName.trim() ? 1 : 0.6,
                  }}>
                  <Send size={16} /> Submit Pledge
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
