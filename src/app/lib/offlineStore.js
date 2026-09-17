/**
 * Offline-First Data Store
 * Uses localStorage for persistent offline storage with sync queue management.
 */

const STORE_KEYS = {
  RESIDENTS: 'komunicore_residents',
  DISTRIBUTIONS: 'komunicore_distributions',
  PLEDGES: 'komunicore_pledges',
  SHELTERS: 'komunicore_shelters',
  INVENTORY: 'komunicore_inventory',
  SYNC_QUEUE: 'komunicore_sync_queue',
  RECEIPTS: 'komunicore_receipts',
};

/**
 * Generic localStorage helpers
 */
function getStore(key) {
  if (typeof window === 'undefined') return [];
  try {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

function setStore(key, data) {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (e) {
    console.warn('localStorage write failed:', e);
  }
}

/**
 * Residents CRUD
 */
export function getResidents() {
  return getStore(STORE_KEYS.RESIDENTS);
}

export function addResident(resident) {
  const residents = getResidents();
  const newResident = {
    ...resident,
    id: `RES-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
    pin: resident.pin || generatePin(),
    createdAt: new Date().toISOString(),
    syncStatus: 'pending',
  };
  residents.push(newResident);
  setStore(STORE_KEYS.RESIDENTS, residents);
  addToSyncQueue({ type: 'RESIDENT_ADD', data: newResident });
  return newResident;
}

export function getResidentByPin(pin) {
  return getResidents().find(r => r.pin === pin);
}

/**
 * Distributions CRUD
 */
export function getDistributions() {
  return getStore(STORE_KEYS.DISTRIBUTIONS);
}

export function addDistribution(distribution) {
  const distributions = getDistributions();
  const newDist = {
    ...distribution,
    id: `DIST-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
    timestamp: new Date().toISOString(),
    syncStatus: 'pending',
  };
  distributions.push(newDist);
  setStore(STORE_KEYS.DISTRIBUTIONS, distributions);
  addToSyncQueue({ type: 'DISTRIBUTION_ADD', data: newDist });
  return newDist;
}

/**
 * Pledges CRUD
 */
export function getPledges() {
  return getStore(STORE_KEYS.PLEDGES);
}

export function addPledge(pledge) {
  const pledges = getPledges();
  const newPledge = {
    ...pledge,
    id: `PLG-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
    timestamp: new Date().toISOString(),
    syncStatus: 'pending',
  };
  pledges.push(newPledge);
  setStore(STORE_KEYS.PLEDGES, pledges);
  addToSyncQueue({ type: 'PLEDGE_ADD', data: newPledge });
  return newPledge;
}

/**
 * Shelters
 */
export function getShelters() {
  return getStore(STORE_KEYS.SHELTERS);
}

export function setShelters(shelters) {
  setStore(STORE_KEYS.SHELTERS, shelters);
}

/**
 * Inventory
 */
export function getInventory() {
  return getStore(STORE_KEYS.INVENTORY);
}

export function setInventory(inventory) {
  setStore(STORE_KEYS.INVENTORY, inventory);
}

/**
 * Receipts
 */
export function getReceipts() {
  return getStore(STORE_KEYS.RECEIPTS);
}

export function addReceipt(receipt) {
  const receipts = getReceipts();
  receipts.push({
    ...receipt,
    id: `RCP-${Date.now()}`,
    uploadedAt: new Date().toISOString(),
  });
  setStore(STORE_KEYS.RECEIPTS, receipts);
  return receipt;
}

/**
 * Sync Queue Management
 */
export function getSyncQueue() {
  return getStore(STORE_KEYS.SYNC_QUEUE);
}

function addToSyncQueue(entry) {
  const queue = getSyncQueue();
  queue.push({
    ...entry,
    id: `SYNC-${Date.now()}`,
    queuedAt: new Date().toISOString(),
    status: 'pending',
  });
  setStore(STORE_KEYS.SYNC_QUEUE, queue);
}

/**
 * Simulate sync — marks all pending items as synced.
 * @returns {number} Number of items synced
 */
export function simulateSync() {
  const queue = getSyncQueue();
  const pendingCount = queue.filter(q => q.status === 'pending').length;

  // Mark all queue items as synced
  const synced = queue.map(q => ({ ...q, status: 'synced', syncedAt: new Date().toISOString() }));
  setStore(STORE_KEYS.SYNC_QUEUE, synced);

  // Update sync status on all records
  const residents = getResidents().map(r => r.syncStatus === 'pending' ? { ...r, syncStatus: 'synced' } : r);
  setStore(STORE_KEYS.RESIDENTS, residents);

  const distributions = getDistributions().map(d => d.syncStatus === 'pending' ? { ...d, syncStatus: 'synced' } : d);
  setStore(STORE_KEYS.DISTRIBUTIONS, distributions);

  const pledges = getPledges().map(p => p.syncStatus === 'pending' ? { ...p, syncStatus: 'synced' } : p);
  setStore(STORE_KEYS.PLEDGES, pledges);

  return pendingCount;
}

/**
 * Generate a random 4-digit PIN for offline handshake.
 * @returns {string} 4-digit PIN
 */
export function generatePin() {
  return String(Math.floor(1000 + Math.random() * 9000));
}

/**
 * Get sync statistics.
 * @returns {{ pending: number, synced: number, total: number }}
 */
export function getSyncStats() {
  const queue = getSyncQueue();
  const pending = queue.filter(q => q.status === 'pending').length;
  const synced = queue.filter(q => q.status === 'synced').length;
  return { pending, synced, total: queue.length };
}

/**
 * Initialize store with seed data if empty.
 * @param {Object} seedData
 */
export function initializeIfEmpty(seedData) {
  if (getResidents().length === 0 && seedData.residents) {
    setStore(STORE_KEYS.RESIDENTS, seedData.residents);
  }
  if (getShelters().length === 0 && seedData.shelters) {
    setStore(STORE_KEYS.SHELTERS, seedData.shelters);
  }
  if (getInventory().length === 0 && seedData.inventory) {
    setStore(STORE_KEYS.INVENTORY, seedData.inventory);
  }
  if (getDistributions().length === 0 && seedData.distributions) {
    setStore(STORE_KEYS.DISTRIBUTIONS, seedData.distributions);
  }
}
