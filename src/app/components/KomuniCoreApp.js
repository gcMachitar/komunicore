'use client';

import { useState, useEffect, useCallback } from 'react';
import TopBar from './TopBar';
import AdminDashboard from './views/AdminDashboard';
import ReliefWorkerDesk from './views/ReliefWorkerDesk';
import ResidentPortal from './views/ResidentPortal';
import DonorHub from './views/DonorHub';

import {
  getResidents, addResident, getDistributions, addDistribution,
  getShelters, setShelters, getInventory, setInventory,
  getPledges, addPledge, getSyncStats, simulateSync, initializeIfEmpty,
} from '../lib/offlineStore';

import {
  SEED_RESIDENTS, SEED_SHELTERS, SEED_INVENTORY, SEED_DISTRIBUTIONS,
} from '../lib/mockData';

export default function KomuniCoreApp({ initialRole = 'admin', onBackToHome }) {
  const [activeRole, setActiveRole] = useState(initialRole);
  const [isOffline, setIsOffline] = useState(false);
  const [residents, setResidents] = useState([]);
  const [distributions, setDistributions] = useState([]);
  const [shelters, setSheltersState] = useState([]);
  const [inventory, setInventoryState] = useState([]);
  const [syncStats, setSyncStatsState] = useState({ pending: 0, synced: 0, total: 0 });
  const [loaded, setLoaded] = useState(false);

  // Sync role if prop changes
  useEffect(() => {
    if (initialRole) {
      setActiveRole(initialRole);
    }
  }, [initialRole]);

  // Initialize on mount
  useEffect(() => {
    initializeIfEmpty({
      residents: SEED_RESIDENTS,
      shelters: SEED_SHELTERS,
      inventory: SEED_INVENTORY,
      distributions: SEED_DISTRIBUTIONS,
    });

    refreshData();
    setLoaded(true);
  }, []);

  const refreshData = useCallback(() => {
    setResidents(getResidents());
    setDistributions(getDistributions());
    setSheltersState(getShelters());
    setInventoryState(getInventory());
    setSyncStatsState(getSyncStats());
  }, []);

  const handleAddResident = (data) => {
    addResident(data);
    refreshData();
  };

  const handleAddDistribution = (data) => {
    addDistribution(data);
    refreshData();
  };

  const handleAddPledge = (data) => {
    addPledge(data);
    refreshData();
  };

  const handleToggleOffline = () => {
    const goingOnline = isOffline;
    setIsOffline(!isOffline);

    if (goingOnline) {
      // Simulate sync when going back online
      setTimeout(() => {
        const count = simulateSync();
        refreshData();
      }, 800);
    }
  };

  const handleSync = () => {
    if (!isOffline) {
      const count = simulateSync();
      refreshData();
    }
  };

  if (!loaded) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: 'var(--color-background)' }}>
        <div className="text-center" style={{ animation: 'fade-in 0.5s ease-out' }}>
          <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4" style={{
            background: 'linear-gradient(135deg, var(--color-emerald-600), var(--color-emerald-700))',
            animation: 'pulse-emerald 1.5s infinite',
          }}>
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
            </svg>
          </div>
          <p className="text-lg font-bold">
            Komuni<span style={{ color: 'var(--color-emerald-400)' }}>Core</span>
          </p>
          <p className="text-xs mt-1" style={{ color: 'var(--color-muted)' }}>Initializing disaster relief OS...</p>
        </div>
      </div>
    );
  }

  const renderView = () => {
    switch (activeRole) {
      case 'admin':
        return (
          <AdminDashboard
            residents={residents}
            shelters={shelters}
            inventory={inventory}
            distributions={distributions}
            isOffline={isOffline}
          />
        );
      case 'worker':
        return (
          <ReliefWorkerDesk
            residents={residents}
            distributions={distributions}
            onAddResident={handleAddResident}
            onAddDistribution={handleAddDistribution}
            isOffline={isOffline}
          />
        );
      case 'resident':
        return (
          <ResidentPortal
            residents={residents}
            distributions={distributions}
            isOffline={isOffline}
          />
        );
      case 'donor':
        return (
          <DonorHub
            shelters={shelters}
            onAddPledge={handleAddPledge}
            isOffline={isOffline}
          />
        );
      default:
        return null;
    }
  };

  const roleLabels = {
    admin: 'Admin Dashboard',
    worker: 'Relief Worker Desk',
    resident: 'Resident Portal',
    donor: 'Donor Hub',
  };

  return (
    <div className="min-h-screen flex flex-col" style={{ background: 'var(--color-background)' }}>
      <TopBar
        activeRole={activeRole}
        onRoleChange={setActiveRole}
        isOffline={isOffline}
        onToggleOffline={handleToggleOffline}
        syncStats={syncStats}
        onSync={handleSync}
        onBackToHome={onBackToHome}
      />

      <main className="flex-1 p-4 md:p-6 max-w-screen-2xl mx-auto w-full">
        {/* View Title */}
        <div className="mb-5" style={{ animation: 'slide-up 0.2s ease-out' }}>
          <h2 className="text-xl font-bold">{roleLabels[activeRole]}</h2>
          <p className="text-sm mt-0.5" style={{ color: 'var(--color-muted)' }}>
            {activeRole === 'admin' && 'Analytics overview, inventory triage, and COA report generation'}
            {activeRole === 'worker' && 'Resident intake, verification desk, and PIN handshake distribution'}
            {activeRole === 'resident' && 'Your profile, assistance tracker, and offline PIN badge'}
            {activeRole === 'donor' && 'Active relief needs, shelter map, and resource pledge forms'}
          </p>
        </div>

        {renderView()}
      </main>

      {/* Footer */}
      <footer className="no-print py-3 px-4 text-center text-xs" style={{
        borderTop: '1px solid var(--color-border)',
        color: 'var(--color-muted-dim)',
      }}>
        KomuniCore v0.1.0 — Offline-First Barangay Disaster Relief OS • COA Circular No. 2020-003 Compliant
      </footer>
    </div>
  );
}
