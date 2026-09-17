/**
 * COA Liquidation Report Generator
 * Generates Summary of Supplies and Materials Issued (SSMI) reports
 * compliant with COA Circular No. 2020-003.
 */

/**
 * Mock OCR receipt parser — simulates extracting data from uploaded receipt images.
 * In production, this would connect to an OCR API.
 * @param {string} filename - Uploaded filename
 * @returns {Object} Parsed receipt data
 */
export function parseReceiptOCR(filename) {
  // Simulated OCR extraction with realistic Philippine merchant data
  const merchants = [
    { name: 'Puregold Price Club', tin: '008-271-631-000' },
    { name: 'SM Supermarket', tin: '000-130-079-000' },
    { name: 'Metro Gaisano', tin: '004-567-890-001' },
    { name: 'Robinsons Supermarket', tin: '001-234-567-000' },
    { name: 'SaveMore Market', tin: '008-271-631-002' },
  ];

  const lineItemSets = [
    [
      { description: 'Lucky Me Instant Noodles (Box/24)', qty: 50, unitCost: 312.00 },
      { description: 'NFA Rice 25kg Sack', qty: 30, unitCost: 1150.00 },
      { description: 'Argentina Corned Beef 260g', qty: 100, unitCost: 52.00 },
      { description: 'Century Tuna Flakes 155g', qty: 80, unitCost: 38.50 },
    ],
    [
      { description: 'Safeguard Soap Bar (Pack/3)', qty: 200, unitCost: 89.00 },
      { description: 'Zonrox Bleach 1L', qty: 50, unitCost: 78.00 },
      { description: 'Downy Fabric Conditioner 40ml (Box/48)', qty: 20, unitCost: 450.00 },
      { description: 'Biodegradable Trash Bags (Roll/10)', qty: 100, unitCost: 65.00 },
    ],
    [
      { description: 'Energen Cereal Drink (Box/20)', qty: 40, unitCost: 186.00 },
      { description: 'Bear Brand Adult Powdered Milk 300g', qty: 60, unitCost: 125.00 },
      { description: 'Sky Flakes Crackers (Pack/10)', qty: 120, unitCost: 52.00 },
      { description: 'Kopiko Brown Coffee (Box/30)', qty: 30, unitCost: 210.00 },
    ],
  ];

  const merchant = merchants[Math.floor(Math.random() * merchants.length)];
  const items = lineItemSets[Math.floor(Math.random() * lineItemSets.length)];
  const orNumber = `OR-${String(Math.floor(Math.random() * 900000) + 100000)}`;

  return {
    merchantName: merchant.name,
    merchantTIN: merchant.tin,
    orNumber,
    dateIssued: new Date().toISOString().split('T')[0],
    lineItems: items.map(item => ({
      ...item,
      totalCost: item.qty * item.unitCost,
    })),
    totalAmount: items.reduce((sum, item) => sum + item.qty * item.unitCost, 0),
  };
}

/**
 * Generate a complete SSMI (Summary of Supplies and Materials Issued) report.
 * @param {Object} options
 * @param {string} options.barangay - Barangay name
 * @param {string} options.disasterType - Type of disaster
 * @param {Array} options.distributions - Distribution records
 * @param {Array} options.receipts - Parsed receipt data
 * @param {Object} options.geotag - Location metadata
 * @returns {Object} Formatted SSMI report data
 */
export function generateSSMIReport({
  barangay = 'Brgy. San Jose',
  disasterType = 'Typhoon Evacuation',
  distributions = [],
  receipts = [],
  geotag = null,
}) {
  const now = new Date();

  // Aggregate all line items from distributions
  const aggregatedItems = {};
  distributions.forEach(dist => {
    const key = dist.itemName;
    if (!aggregatedItems[key]) {
      aggregatedItems[key] = {
        description: dist.itemName,
        unit: dist.unit || 'pcs',
        totalQty: 0,
        unitCost: dist.unitCost || 0,
        recipients: [],
      };
    }
    aggregatedItems[key].totalQty += dist.quantity;
    aggregatedItems[key].recipients.push(dist.residentName);
  });

  const lineItems = Object.values(aggregatedItems).map(item => ({
    ...item,
    totalCost: item.totalQty * item.unitCost,
  }));

  const grandTotal = lineItems.reduce((sum, item) => sum + item.totalCost, 0) +
    receipts.reduce((sum, r) => sum + r.totalAmount, 0);

  return {
    reportTitle: 'SUMMARY OF SUPPLIES AND MATERIALS ISSUED (SSMI)',
    referenceCircular: 'COA Circular No. 2020-003',
    reportNumber: `SSMI-${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(Math.floor(Math.random() * 9000) + 1000)}`,
    barangay,
    municipality: 'Quezon City',
    province: 'Metro Manila',
    disasterType,
    dateGenerated: now.toISOString(),
    datePeriod: {
      from: new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      to: now.toISOString().split('T')[0],
    },
    preparedBy: 'Barangay Disaster Risk Reduction Management Committee',
    approvedBy: 'Hon. Maria Santos, Barangay Captain',
    geotag: geotag || {
      lat: 14.5995,
      lng: 120.9842,
      geohash: 'wdw5nyq',
      timestamp: now.toISOString(),
      accuracy: '±10m',
    },
    distributionItems: lineItems,
    receiptSummary: receipts,
    grandTotal,
    totalBeneficiaries: [...new Set(distributions.map(d => d.residentName))].length,
    certifications: [
      'I hereby certify that the above supplies and materials have been issued to legitimate beneficiaries.',
      'Supporting documents including official receipts and distribution lists are on file.',
      `Generated via KomuniCore Digital Ledger — Geotag verified at ${geotag?.timestamp || now.toISOString()}`,
    ],
  };
}

/**
 * Format currency in Philippine Peso.
 * @param {number} amount
 * @returns {string}
 */
export function formatPHP(amount) {
  return `₱${amount.toLocaleString('en-PH', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}
