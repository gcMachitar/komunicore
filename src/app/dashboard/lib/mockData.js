/**
 * Philippine-contextualised seed data for KomuniCore MVP.
 * All names, supplies, and locations reflect real Filipino disaster relief scenarios.
 */

const today = new Date();
const daysFromNow = (days) => new Date(today.getTime() + days * 24 * 60 * 60 * 1000).toISOString().split('T')[0];

export const PUROKS = [
  'Purok 1 - Sampaguita',
  'Purok 2 - Rosal',
  'Purok 3 - Gumamela',
  'Purok 4 - Ilang-Ilang',
  'Purok 5 - Dahlia',
  'Purok 6 - Camia',
  'Purok 7 - Santan',
];

export const BARANGAYS = [
  'Brgy. San Jose',
  'Brgy. Poblacion',
  'Brgy. Malanday',
  'Brgy. Bagong Silang',
  'Brgy. Batasan Hills',
  'Brgy. Commonwealth',
  'Brgy. Payatas',
  'Brgy. Tatalon',
];

export const CATEGORIES = ['General', 'Senior Citizen', 'PWD', 'Pregnant', 'Solo Parent', '4Ps Member'];

export const SEED_RESIDENTS = [
  { id: 'RES-001', name: 'Maria Clara Santos', category: 'Senior Citizen', purok: 'Purok 1 - Sampaguita', barangay: 'Brgy. San Jose', pin: '1234', geohash: 'wdw5nyq', lat: 14.5995, lng: 120.9842, createdAt: daysFromNow(-5), syncStatus: 'synced' },
  { id: 'RES-002', name: 'Juan Dela Cruz', category: 'General', purok: 'Purok 2 - Rosal', barangay: 'Brgy. San Jose', pin: '5678', geohash: 'wdw5nyr', lat: 14.5998, lng: 120.9845, createdAt: daysFromNow(-5), syncStatus: 'synced' },
  { id: 'RES-003', name: 'Rosalinda Reyes', category: 'PWD', purok: 'Purok 3 - Gumamela', barangay: 'Brgy. San Jose', pin: '9012', geohash: 'wdw5nys', lat: 14.6001, lng: 120.9840, createdAt: daysFromNow(-4), syncStatus: 'synced' },
  { id: 'RES-004', name: 'Pedro Penduko', category: 'General', purok: 'Purok 4 - Ilang-Ilang', barangay: 'Brgy. San Jose', pin: '3456', geohash: 'wdw5nyt', lat: 14.5990, lng: 120.9838, createdAt: daysFromNow(-4), syncStatus: 'synced' },
  { id: 'RES-005', name: 'Lourdes Garcia', category: 'Senior Citizen', purok: 'Purok 1 - Sampaguita', barangay: 'Brgy. San Jose', pin: '7890', geohash: 'wdw5nyu', lat: 14.5993, lng: 120.9850, createdAt: daysFromNow(-3), syncStatus: 'synced' },
  { id: 'RES-006', name: 'Andres Bonifacio Jr.', category: '4Ps Member', purok: 'Purok 5 - Dahlia', barangay: 'Brgy. San Jose', pin: '2345', geohash: 'wdw5nyv', lat: 14.5988, lng: 120.9835, createdAt: daysFromNow(-3), syncStatus: 'synced' },
  { id: 'RES-007', name: 'Esperanza Villanueva', category: 'Pregnant', purok: 'Purok 6 - Camia', barangay: 'Brgy. San Jose', pin: '6789', geohash: 'wdw5nyw', lat: 14.6005, lng: 120.9855, createdAt: daysFromNow(-2), syncStatus: 'synced' },
  { id: 'RES-008', name: 'Ricardo Dalisay', category: 'General', purok: 'Purok 7 - Santan', barangay: 'Brgy. San Jose', pin: '0123', geohash: 'wdw5nyx', lat: 14.5980, lng: 120.9830, createdAt: daysFromNow(-2), syncStatus: 'synced' },
  { id: 'RES-009', name: 'Corazon Aquino', category: 'Solo Parent', purok: 'Purok 2 - Rosal', barangay: 'Brgy. San Jose', pin: '4567', geohash: 'wdw5nyp', lat: 14.6010, lng: 120.9860, createdAt: daysFromNow(-1), syncStatus: 'synced' },
  { id: 'RES-010', name: 'Jose Rizal III', category: 'General', purok: 'Purok 3 - Gumamela', barangay: 'Brgy. San Jose', pin: '8901', geohash: 'wdw5nym', lat: 14.5975, lng: 120.9825, createdAt: daysFromNow(-1), syncStatus: 'pending' },
];

export const SEED_SHELTERS = [
  {
    id: 'SHL-001',
    name: 'Evacuation Center A — San Jose Elementary',
    capacity: 150,
    currentOccupants: 142,
    supplies: {
      'Instant Noodles': { current: 0, needed: 200, unit: 'packs' },
      'Rice (25kg)': { current: 15, needed: 30, unit: 'sacks' },
      'Bottled Water': { current: 50, needed: 500, unit: 'bottles' },
      'Blankets': { current: 120, needed: 150, unit: 'pcs' },
      'Face Masks': { current: 300, needed: 300, unit: 'pcs' },
    },
    status: 'critical',
    geohash: 'wdw5nyq',
  },
  {
    id: 'SHL-002',
    name: 'Annex Shelter B — Barangay Hall',
    capacity: 80,
    currentOccupants: 35,
    supplies: {
      'Instant Noodles': { current: 150, needed: 100, unit: 'packs' },
      'Rice (25kg)': { current: 20, needed: 20, unit: 'sacks' },
      'Bottled Water': { current: 200, needed: 300, unit: 'bottles' },
      'Blankets': { current: 50, needed: 80, unit: 'pcs' },
      'Face Masks': { current: 200, needed: 200, unit: 'pcs' },
    },
    status: 'stable',
    geohash: 'wdw5nyr',
  },
  {
    id: 'SHL-003',
    name: 'Relief Hub C — Covered Court',
    capacity: 200,
    currentOccupants: 98,
    supplies: {
      'Instant Noodles': { current: 80, needed: 250, unit: 'packs' },
      'Rice (25kg)': { current: 5, needed: 40, unit: 'sacks' },
      'Bottled Water': { current: 100, needed: 600, unit: 'bottles' },
      'Blankets': { current: 60, needed: 200, unit: 'pcs' },
      'Face Masks': { current: 150, needed: 400, unit: 'pcs' },
    },
    status: 'moderate',
    geohash: 'wdw5nys',
  },
  {
    id: 'SHL-004',
    name: 'Satellite Center D — Chapel',
    capacity: 40,
    currentOccupants: 12,
    supplies: {
      'Instant Noodles': { current: 60, needed: 50, unit: 'packs' },
      'Rice (25kg)': { current: 10, needed: 10, unit: 'sacks' },
      'Bottled Water': { current: 80, needed: 100, unit: 'bottles' },
      'Blankets': { current: 40, needed: 40, unit: 'pcs' },
      'Face Masks': { current: 100, needed: 100, unit: 'pcs' },
    },
    status: 'stable',
    geohash: 'wdw5nyt',
  },
];

export const SEED_INVENTORY = [
  { id: 'INV-001', name: 'Lucky Me Instant Noodles (Chicken)', category: 'Food', quantity: 500, unit: 'packs', unitCost: 13.00, expiryDate: daysFromNow(90), shelter: 'SHL-001', source: 'DSWD Donation' },
  { id: 'INV-002', name: 'NFA Rice 25kg', category: 'Food', quantity: 50, unit: 'sacks', unitCost: 1150.00, expiryDate: daysFromNow(180), shelter: 'SHL-001', source: 'LGU Purchase' },
  { id: 'INV-003', name: 'Argentina Corned Beef 260g', category: 'Food', quantity: 200, unit: 'cans', unitCost: 52.00, expiryDate: daysFromNow(15), shelter: 'SHL-002', source: 'Private Donation' },
  { id: 'INV-004', name: 'Century Tuna Flakes 155g', category: 'Food', quantity: 300, unit: 'cans', unitCost: 38.50, expiryDate: daysFromNow(-3), shelter: 'SHL-001', source: 'NGO Relief Pack' },
  { id: 'INV-005', name: 'Safeguard Soap Bar', category: 'Hygiene', quantity: 400, unit: 'bars', unitCost: 32.00, expiryDate: daysFromNow(365), shelter: 'SHL-003', source: 'Corporate Sponsor' },
  { id: 'INV-006', name: 'Zonrox Bleach 500ml', category: 'Hygiene', quantity: 100, unit: 'bottles', unitCost: 45.00, expiryDate: daysFromNow(270), shelter: 'SHL-002', source: 'LGU Purchase' },
  { id: 'INV-007', name: 'Energen Cereal Drink', category: 'Food', quantity: 150, unit: 'sachets', unitCost: 9.50, expiryDate: daysFromNow(7), shelter: 'SHL-003', source: 'Donor Pledge' },
  { id: 'INV-008', name: 'Bear Brand Milk 33g', category: 'Food', quantity: 250, unit: 'sachets', unitCost: 12.00, expiryDate: daysFromNow(60), shelter: 'SHL-001', source: 'DSWD Donation' },
  { id: 'INV-009', name: 'Emergency Blanket (Fleece)', category: 'Non-Food', quantity: 80, unit: 'pcs', unitCost: 250.00, expiryDate: daysFromNow(999), shelter: 'SHL-004', source: 'Red Cross' },
  { id: 'INV-010', name: 'N95 Face Mask', category: 'Medical', quantity: 500, unit: 'pcs', unitCost: 15.00, expiryDate: daysFromNow(200), shelter: 'SHL-002', source: 'DOH Allocation' },
  { id: 'INV-011', name: 'Kopiko Brown Coffee 3-in-1', category: 'Food', quantity: 200, unit: 'sachets', unitCost: 7.00, expiryDate: daysFromNow(25), shelter: 'SHL-003', source: 'Private Donation' },
  { id: 'INV-012', name: 'Biogesic Paracetamol 500mg', category: 'Medical', quantity: 100, unit: 'tablets', unitCost: 3.50, expiryDate: daysFromNow(-10), shelter: 'SHL-001', source: 'Barangay Health Center' },
];

export const SEED_DISTRIBUTIONS = [
  { id: 'DIST-001', residentId: 'RES-001', residentName: 'Maria Clara Santos', itemName: 'Lucky Me Instant Noodles', quantity: 5, unit: 'packs', unitCost: 13.00, verifiedByPin: true, shelter: 'SHL-001', timestamp: new Date(today.getTime() - 4 * 24 * 60 * 60 * 1000).toISOString(), syncStatus: 'synced' },
  { id: 'DIST-002', residentId: 'RES-002', residentName: 'Juan Dela Cruz', itemName: 'NFA Rice 25kg', quantity: 1, unit: 'sacks', unitCost: 1150.00, verifiedByPin: true, shelter: 'SHL-001', timestamp: new Date(today.getTime() - 4 * 24 * 60 * 60 * 1000).toISOString(), syncStatus: 'synced' },
  { id: 'DIST-003', residentId: 'RES-003', residentName: 'Rosalinda Reyes', itemName: 'Argentina Corned Beef 260g', quantity: 3, unit: 'cans', unitCost: 52.00, verifiedByPin: true, shelter: 'SHL-002', timestamp: new Date(today.getTime() - 3 * 24 * 60 * 60 * 1000).toISOString(), syncStatus: 'synced' },
  { id: 'DIST-004', residentId: 'RES-005', residentName: 'Lourdes Garcia', itemName: 'Bear Brand Milk 33g', quantity: 10, unit: 'sachets', unitCost: 12.00, verifiedByPin: true, shelter: 'SHL-001', timestamp: new Date(today.getTime() - 2 * 24 * 60 * 60 * 1000).toISOString(), syncStatus: 'synced' },
  { id: 'DIST-005', residentId: 'RES-007', residentName: 'Esperanza Villanueva', itemName: 'Safeguard Soap Bar', quantity: 2, unit: 'bars', unitCost: 32.00, verifiedByPin: true, shelter: 'SHL-003', timestamp: new Date(today.getTime() - 1 * 24 * 60 * 60 * 1000).toISOString(), syncStatus: 'synced' },
  { id: 'DIST-006', residentId: 'RES-004', residentName: 'Pedro Penduko', itemName: 'Lucky Me Instant Noodles', quantity: 5, unit: 'packs', unitCost: 13.00, verifiedByPin: true, shelter: 'SHL-001', timestamp: new Date(today.getTime() - 1 * 24 * 60 * 60 * 1000).toISOString(), syncStatus: 'pending' },
];

export const SUPPLY_TYPES = [
  'Lucky Me Instant Noodles',
  'NFA Rice 25kg',
  'Argentina Corned Beef 260g',
  'Century Tuna Flakes 155g',
  'Bear Brand Milk 33g',
  'Energen Cereal Drink',
  'Safeguard Soap Bar',
  'Zonrox Bleach 500ml',
  'Kopiko Brown Coffee',
  'Emergency Blanket',
  'N95 Face Mask',
  'Biogesic Paracetamol',
  'Bottled Water 500ml',
];
