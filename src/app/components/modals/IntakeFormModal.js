'use client';

import { useState } from 'react';
import { X, User, Package, Hash, MapPin, AlertTriangle } from 'lucide-react';
import { PUROKS, BARANGAYS, CATEGORIES } from '../../lib/mockData';
import { generateResidentGeohash } from '../../lib/geohash';

export default function IntakeFormModal({ onClose, onSubmit }) {
  const [formData, setFormData] = useState({
    name: '',
    category: 'General',
    purok: PUROKS[0],
    barangay: BARANGAYS[0],
    idImage: null,
    idPreview: null,
  });
  const [geohashResult, setGeohashResult] = useState(null);
  const [step, setStep] = useState(1);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => {
        setFormData(prev => ({ ...prev, idImage: file.name, idPreview: ev.target.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleGenerateGeohash = () => {
    const result = generateResidentGeohash(formData.barangay);
    setGeohashResult(result);
    setStep(2);
  };

  const handleSubmit = () => {
    if (!formData.name.trim()) return;
    onSubmit({
      name: formData.name,
      category: formData.category,
      purok: formData.purok,
      barangay: formData.barangay,
      idImage: formData.idImage,
      geohash: geohashResult?.geohash || '',
      lat: geohashResult?.lat || 0,
      lng: geohashResult?.lng || 0,
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: 'rgba(0,0,0,0.7)', animation: 'fade-in 0.2s ease-out' }}>
      <div className="w-full max-w-lg rounded-xl overflow-hidden" style={{
        background: 'var(--color-surface)',
        border: '1px solid var(--color-border)',
        animation: 'slide-up 0.3s ease-out',
        maxHeight: '90vh',
        overflowY: 'auto',
      }}>
        {/* Header */}
        <div className="flex items-center justify-between p-4" style={{ borderBottom: '1px solid var(--color-border)', background: 'var(--color-surface-elevated)' }}>
          <div className="flex items-center gap-2">
            <User size={20} style={{ color: 'var(--color-emerald-400)' }} />
            <h2 className="text-lg font-bold">Resident Intake Form</h2>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-lg transition-colors cursor-pointer" style={{ color: 'var(--color-muted)' }}
            onMouseEnter={e => e.currentTarget.style.background = 'var(--color-border)'}
            onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
            <X size={18} />
          </button>
        </div>

        <div className="p-5 space-y-4">
          {step === 1 && (
            <>
              {/* Name */}
              <div>
                <label className="block text-sm font-medium mb-1.5" style={{ color: 'var(--color-muted)' }}>
                  Full Name <span style={{ color: 'var(--color-red-400)' }}>*</span>
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={e => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="e.g. Maria Clara Santos"
                  className="w-full px-3 py-2.5 rounded-lg text-sm outline-none transition-all"
                  style={{
                    background: 'var(--color-background)',
                    border: '1px solid var(--color-border)',
                    color: 'var(--color-foreground)',
                  }}
                  onFocus={e => e.target.style.borderColor = 'var(--color-emerald-500)'}
                  onBlur={e => e.target.style.borderColor = 'var(--color-border)'}
                />
              </div>

              {/* Category */}
              <div>
                <label className="block text-sm font-medium mb-1.5" style={{ color: 'var(--color-muted)' }}>
                  Demographic Category
                </label>
                <select
                  value={formData.category}
                  onChange={e => setFormData(prev => ({ ...prev, category: e.target.value }))}
                  className="w-full px-3 py-2.5 rounded-lg text-sm outline-none cursor-pointer"
                  style={{
                    background: 'var(--color-background)',
                    border: '1px solid var(--color-border)',
                    color: 'var(--color-foreground)',
                  }}
                >
                  {CATEGORIES.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>

              {/* Barangay */}
              <div>
                <label className="block text-sm font-medium mb-1.5" style={{ color: 'var(--color-muted)' }}>
                  Barangay
                </label>
                <select
                  value={formData.barangay}
                  onChange={e => setFormData(prev => ({ ...prev, barangay: e.target.value }))}
                  className="w-full px-3 py-2.5 rounded-lg text-sm outline-none cursor-pointer"
                  style={{
                    background: 'var(--color-background)',
                    border: '1px solid var(--color-border)',
                    color: 'var(--color-foreground)',
                  }}
                >
                  {BARANGAYS.map(b => (
                    <option key={b} value={b}>{b}</option>
                  ))}
                </select>
              </div>

              {/* Purok */}
              <div>
                <label className="block text-sm font-medium mb-1.5" style={{ color: 'var(--color-muted)' }}>
                  Purok
                </label>
                <select
                  value={formData.purok}
                  onChange={e => setFormData(prev => ({ ...prev, purok: e.target.value }))}
                  className="w-full px-3 py-2.5 rounded-lg text-sm outline-none cursor-pointer"
                  style={{
                    background: 'var(--color-background)',
                    border: '1px solid var(--color-border)',
                    color: 'var(--color-foreground)',
                  }}
                >
                  {PUROKS.map(p => (
                    <option key={p} value={p}>{p}</option>
                  ))}
                </select>
              </div>

              {/* ID Upload */}
              <div>
                <label className="block text-sm font-medium mb-1.5" style={{ color: 'var(--color-muted)' }}>
                  Valid ID (Mock Upload)
                </label>
                <div className="relative">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                    id="id-upload"
                  />
                  <label htmlFor="id-upload" className="flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm cursor-pointer transition-colors"
                    style={{
                      background: 'var(--color-background)',
                      border: '1px dashed var(--color-border-bright)',
                      color: 'var(--color-muted)',
                    }}>
                    <Package size={16} />
                    {formData.idImage || 'Click to upload ID image...'}
                  </label>
                </div>
                {formData.idPreview && (
                  <div className="mt-2 rounded-lg overflow-hidden" style={{ border: '1px solid var(--color-border)' }}>
                    <img src={formData.idPreview} alt="ID Preview" className="w-full h-32 object-cover" />
                  </div>
                )}
              </div>

              {/* Generate Geohash Button */}
              <button
                onClick={handleGenerateGeohash}
                disabled={!formData.name.trim()}
                className="w-full py-3 rounded-lg font-semibold text-sm flex items-center justify-center gap-2 transition-all cursor-pointer"
                style={{
                  background: formData.name.trim() ? 'linear-gradient(135deg, var(--color-emerald-600), var(--color-emerald-700))' : 'var(--color-border)',
                  color: formData.name.trim() ? 'white' : 'var(--color-muted-dim)',
                  opacity: formData.name.trim() ? 1 : 0.6,
                }}
              >
                <MapPin size={16} />
                Validate Location & Generate Geohash
              </button>
            </>
          )}

          {step === 2 && geohashResult && (
            <>
              {/* Geohash Result */}
              <div className="rounded-lg p-4 text-center" style={{
                background: 'linear-gradient(135deg, var(--color-emerald-900), var(--color-surface-elevated))',
                border: '1px solid var(--color-emerald-700)',
              }}>
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Hash size={18} style={{ color: 'var(--color-emerald-400)' }} />
                  <span className="text-sm font-medium" style={{ color: 'var(--color-emerald-400)' }}>Level-7 Geohash Generated</span>
                </div>
                <div className="text-3xl font-mono font-bold tracking-wider" style={{ color: 'var(--color-emerald-400)', animation: 'count-up 0.4s ease-out' }}>
                  {geohashResult.geohash}
                </div>
                <div className="text-xs mt-2" style={{ color: 'var(--color-muted)' }}>
                  Precision: ~1.2km grid • Lat: {geohashResult.lat} • Lng: {geohashResult.lng}
                </div>
              </div>

              {/* Verification badge */}
              <div className="flex items-center gap-2 rounded-lg p-3" style={{
                background: 'var(--color-surface-elevated)',
                border: '1px solid var(--color-border)',
              }}>
                <div className="w-2.5 h-2.5 rounded-full" style={{ background: 'var(--color-emerald-500)', animation: 'pulse-emerald 2s infinite' }} />
                <span className="text-sm" style={{ color: 'var(--color-emerald-400)' }}>
                  ✓ Resident location verified within barangay jurisdiction
                </span>
              </div>

              {/* Summary */}
              <div className="rounded-lg p-4 space-y-2" style={{ background: 'var(--color-background)', border: '1px solid var(--color-border)' }}>
                <div className="flex justify-between text-sm">
                  <span style={{ color: 'var(--color-muted)' }}>Name</span>
                  <span className="font-medium">{formData.name}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span style={{ color: 'var(--color-muted)' }}>Category</span>
                  <span className="font-medium">{formData.category}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span style={{ color: 'var(--color-muted)' }}>Purok</span>
                  <span className="font-medium">{formData.purok}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span style={{ color: 'var(--color-muted)' }}>Barangay</span>
                  <span className="font-medium">{formData.barangay}</span>
                </div>
              </div>

              <div className="flex gap-3">
                <button onClick={() => setStep(1)} className="flex-1 py-2.5 rounded-lg font-medium text-sm cursor-pointer transition-colors"
                  style={{ background: 'var(--color-border)', color: 'var(--color-foreground)' }}>
                  ← Back
                </button>
                <button onClick={handleSubmit} className="flex-1 py-2.5 rounded-lg font-semibold text-sm cursor-pointer transition-all"
                  style={{
                    background: 'linear-gradient(135deg, var(--color-emerald-600), var(--color-emerald-700))',
                    color: 'white',
                  }}>
                  Register Resident ✓
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
