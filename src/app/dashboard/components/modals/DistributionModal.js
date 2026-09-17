'use client';

import { useState } from 'react';
import { X, KeyRound, Package, Check, AlertCircle, Loader } from 'lucide-react';
import { SUPPLY_TYPES } from '../../lib/mockData';

export default function DistributionModal({ onClose, onSubmit, residents, isOffline }) {
  const [pin, setPin] = useState('');
  const [verifiedResident, setVerifiedResident] = useState(null);
  const [selectedItem, setSelectedItem] = useState(SUPPLY_TYPES[0]);
  const [quantity, setQuantity] = useState(1);
  const [pinError, setPinError] = useState('');
  const [verifying, setVerifying] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handlePinInput = (digit) => {
    if (pin.length < 4) {
      const newPin = pin + digit;
      setPin(newPin);
      setPinError('');

      if (newPin.length === 4) {
        setVerifying(true);
        // Simulate verification delay
        setTimeout(() => {
          const resident = residents.find(r => r.pin === newPin);
          if (resident) {
            setVerifiedResident(resident);
          } else {
            setPinError('PIN not found. Check resident\'s offline badge.');
          }
          setVerifying(false);
        }, 600);
      }
    }
  };

  const handlePinClear = () => {
    setPin('');
    setVerifiedResident(null);
    setPinError('');
  };

  const handlePinBackspace = () => {
    setPin(prev => prev.slice(0, -1));
    setPinError('');
  };

  const handleDistribute = () => {
    if (!verifiedResident) return;
    onSubmit({
      residentId: verifiedResident.id,
      residentName: verifiedResident.name,
      itemName: selectedItem,
      quantity: parseInt(quantity) || 1,
      unit: 'pcs',
      unitCost: 0,
      verifiedByPin: true,
      shelter: 'SHL-001',
    });
    setSubmitted(true);
    setTimeout(() => onClose(), 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: 'rgba(0,0,0,0.7)', animation: 'fade-in 0.2s ease-out' }}>
      <div className="w-full max-w-md rounded-xl overflow-hidden" style={{
        background: 'var(--color-surface)',
        border: '1px solid var(--color-border)',
        animation: 'slide-up 0.3s ease-out',
      }}>
        {/* Header */}
        <div className="flex items-center justify-between p-4" style={{ borderBottom: '1px solid var(--color-border)', background: 'var(--color-surface-elevated)' }}>
          <div className="flex items-center gap-2">
            <KeyRound size={20} style={{ color: 'var(--color-cyan-400)' }} />
            <h2 className="text-lg font-bold">PIN Handshake — Distribution</h2>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-lg cursor-pointer" style={{ color: 'var(--color-muted)' }}>
            <X size={18} />
          </button>
        </div>

        {/* Offline Badge */}
        {isOffline && (
          <div className="mx-4 mt-3 flex items-center gap-2 rounded-lg px-3 py-2 text-xs font-medium" style={{
            background: 'var(--color-amber-900)',
            border: '1px solid var(--color-amber-600)',
            color: 'var(--color-amber-400)',
          }}>
            <div className="w-2 h-2 rounded-full" style={{ background: 'var(--color-amber-500)', animation: 'pulse-amber 2s infinite' }} />
            Offline Mode — Record will be queued for sync
          </div>
        )}

        <div className="p-5 space-y-4">
          {submitted ? (
            <div className="text-center py-8" style={{ animation: 'count-up 0.3s ease-out' }}>
              <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3" style={{
                background: 'var(--color-emerald-900)',
                border: '2px solid var(--color-emerald-500)',
              }}>
                <Check size={32} style={{ color: 'var(--color-emerald-400)' }} />
              </div>
              <p className="font-semibold text-lg">Distribution Logged!</p>
              <p className="text-sm mt-1" style={{ color: 'var(--color-muted)' }}>
                {isOffline ? 'Queued locally — will sync when online' : 'Record synced to server'}
              </p>
            </div>
          ) : !verifiedResident ? (
            <>
              {/* PIN Display */}
              <div className="text-center">
                <p className="text-sm mb-3" style={{ color: 'var(--color-muted)' }}>
                  Enter resident&apos;s 4-digit offline PIN
                </p>
                <div className="flex items-center justify-center gap-3 mb-2">
                  {[0, 1, 2, 3].map(i => (
                    <div key={i} className="w-14 h-16 rounded-lg flex items-center justify-center text-2xl font-bold transition-all"
                      style={{
                        background: pin[i] ? 'var(--color-emerald-900)' : 'var(--color-background)',
                        border: `2px solid ${pin[i] ? 'var(--color-emerald-500)' : verifying ? 'var(--color-cyan-400)' : 'var(--color-border-bright)'}`,
                        color: 'var(--color-emerald-400)',
                      }}>
                      {pin[i] ? '•' : ''}
                    </div>
                  ))}
                </div>
                {verifying && (
                  <div className="flex items-center justify-center gap-2 text-sm" style={{ color: 'var(--color-cyan-400)' }}>
                    <Loader size={14} className="animate-spin" /> Verifying...
                  </div>
                )}
                {pinError && (
                  <div className="flex items-center justify-center gap-2 text-sm mt-1" style={{ color: 'var(--color-red-400)' }}>
                    <AlertCircle size={14} /> {pinError}
                  </div>
                )}
              </div>

              {/* Keypad */}
              <div className="grid grid-cols-3 gap-2">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(num => (
                  <button key={num} onClick={() => handlePinInput(String(num))}
                    className="py-3.5 rounded-lg text-lg font-semibold cursor-pointer transition-all active:scale-95"
                    style={{ background: 'var(--color-surface-elevated)', border: '1px solid var(--color-border)', color: 'var(--color-foreground)' }}>
                    {num}
                  </button>
                ))}
                <button onClick={handlePinClear}
                  className="py-3.5 rounded-lg text-sm font-medium cursor-pointer transition-all"
                  style={{ background: 'var(--color-red-900)', border: '1px solid var(--color-red-600)', color: 'var(--color-red-400)' }}>
                  Clear
                </button>
                <button onClick={() => handlePinInput('0')}
                  className="py-3.5 rounded-lg text-lg font-semibold cursor-pointer transition-all active:scale-95"
                  style={{ background: 'var(--color-surface-elevated)', border: '1px solid var(--color-border)', color: 'var(--color-foreground)' }}>
                  0
                </button>
                <button onClick={handlePinBackspace}
                  className="py-3.5 rounded-lg text-sm font-medium cursor-pointer transition-all"
                  style={{ background: 'var(--color-surface-elevated)', border: '1px solid var(--color-border)', color: 'var(--color-muted)' }}>
                  ←
                </button>
              </div>
            </>
          ) : (
            <>
              {/* Verified Resident */}
              <div className="rounded-lg p-4" style={{
                background: 'linear-gradient(135deg, var(--color-emerald-900), var(--color-surface-elevated))',
                border: '1px solid var(--color-emerald-700)',
                animation: 'slide-up 0.3s ease-out',
              }}>
                <div className="flex items-center gap-2 mb-2">
                  <Check size={16} style={{ color: 'var(--color-emerald-400)' }} />
                  <span className="text-sm font-semibold" style={{ color: 'var(--color-emerald-400)' }}>Identity Verified</span>
                </div>
                <p className="font-bold text-lg">{verifiedResident.name}</p>
                <p className="text-sm" style={{ color: 'var(--color-muted)' }}>
                  {verifiedResident.category} • {verifiedResident.purok}
                </p>
                <p className="text-xs font-mono mt-1" style={{ color: 'var(--color-emerald-400)' }}>
                  Geohash: {verifiedResident.geohash}
                </p>
              </div>

              {/* Supply Selection */}
              <div>
                <label className="block text-sm font-medium mb-1.5" style={{ color: 'var(--color-muted)' }}>Supply Item</label>
                <select value={selectedItem} onChange={e => setSelectedItem(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-lg text-sm outline-none cursor-pointer"
                  style={{ background: 'var(--color-background)', border: '1px solid var(--color-border)', color: 'var(--color-foreground)' }}>
                  {SUPPLY_TYPES.map(item => (
                    <option key={item} value={item}>{item}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1.5" style={{ color: 'var(--color-muted)' }}>Quantity</label>
                <input type="number" min={1} max={100} value={quantity} onChange={e => setQuantity(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-lg text-sm outline-none"
                  style={{ background: 'var(--color-background)', border: '1px solid var(--color-border)', color: 'var(--color-foreground)' }} />
              </div>

              <div className="flex gap-3">
                <button onClick={handlePinClear} className="flex-1 py-2.5 rounded-lg font-medium text-sm cursor-pointer"
                  style={{ background: 'var(--color-border)', color: 'var(--color-foreground)' }}>
                  ← Re-enter PIN
                </button>
                <button onClick={handleDistribute}
                  className="flex-1 py-2.5 rounded-lg font-semibold text-sm flex items-center justify-center gap-2 cursor-pointer"
                  style={{ background: 'linear-gradient(135deg, var(--color-emerald-600), var(--color-emerald-700))', color: 'white' }}>
                  <Package size={16} /> Log Distribution
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
