'use client';

import { useState } from 'react';
import { X, FileText, Upload, Printer, CheckCircle, Receipt, Hash } from 'lucide-react';
import { parseReceiptOCR, generateSSMIReport, formatPHP } from '../../lib/coaGenerator';

export default function COAReportModal({ onClose, distributions, onReceiptParsed }) {
  const [activeTab, setActiveTab] = useState('upload'); // 'upload' | 'report'
  const [parsedReceipt, setParsedReceipt] = useState(null);
  const [report, setReport] = useState(null);
  const [uploadAnimation, setUploadAnimation] = useState(false);

  const handleUpload = () => {
    setUploadAnimation(true);
    setTimeout(() => {
      const receipt = parseReceiptOCR('receipt_scan.jpg');
      setParsedReceipt(receipt);
      if (onReceiptParsed) onReceiptParsed(receipt);
      setUploadAnimation(false);
    }, 1200);
  };

  const handleGenerateReport = () => {
    const ssmi = generateSSMIReport({
      distributions: distributions || [],
      receipts: parsedReceipt ? [parsedReceipt] : [],
    });
    setReport(ssmi);
    setActiveTab('report');
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: 'rgba(0,0,0,0.7)', animation: 'fade-in 0.2s ease-out' }}>
      <div className="w-full max-w-3xl rounded-xl overflow-hidden no-print" style={{
        background: 'var(--color-surface)',
        border: '1px solid var(--color-border)',
        animation: 'slide-up 0.3s ease-out',
        maxHeight: '90vh',
        overflowY: 'auto',
      }}>
        {/* Header */}
        <div className="flex items-center justify-between p-4 sticky top-0 z-10" style={{ borderBottom: '1px solid var(--color-border)', background: 'var(--color-surface-elevated)' }}>
          <div className="flex items-center gap-2">
            <FileText size={20} style={{ color: 'var(--color-cyan-400)' }} />
            <h2 className="text-lg font-bold">COA Liquidation Generator</h2>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-lg cursor-pointer" style={{ color: 'var(--color-muted)' }}>
            <X size={18} />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b" style={{ borderColor: 'var(--color-border)' }}>
          {[
            { id: 'upload', label: 'Receipt OCR', icon: Upload },
            { id: 'report', label: 'SSMI Report', icon: FileText },
          ].map(tab => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)}
              className="flex-1 flex items-center justify-center gap-2 py-3 text-sm font-medium cursor-pointer transition-colors"
              style={{
                borderBottom: activeTab === tab.id ? '2px solid var(--color-emerald-500)' : '2px solid transparent',
                color: activeTab === tab.id ? 'var(--color-emerald-400)' : 'var(--color-muted)',
                background: activeTab === tab.id ? 'var(--color-surface-elevated)' : 'transparent',
              }}>
              <tab.icon size={16} /> {tab.label}
            </button>
          ))}
        </div>

        <div className="p-5">
          {activeTab === 'upload' && (
            <div className="space-y-4">
              {/* Upload Area */}
              <div
                onClick={handleUpload}
                className="rounded-xl p-8 text-center cursor-pointer transition-all"
                style={{
                  border: '2px dashed var(--color-border-bright)',
                  background: uploadAnimation ? 'var(--color-surface-elevated)' : 'var(--color-background)',
                }}
                onMouseEnter={e => { if (!uploadAnimation) e.currentTarget.style.borderColor = 'var(--color-emerald-500)'; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--color-border-bright)'; }}
              >
                {uploadAnimation ? (
                  <div style={{ animation: 'count-up 0.3s ease-out' }}>
                    <div className="w-12 h-12 rounded-full mx-auto mb-3 flex items-center justify-center" style={{ background: 'var(--color-emerald-900)', border: '2px solid var(--color-emerald-500)' }}>
                      <Receipt size={24} style={{ color: 'var(--color-emerald-400)', animation: 'glow-emerald 1s infinite' }} />
                    </div>
                    <p className="text-sm font-medium" style={{ color: 'var(--color-emerald-400)' }}>Processing OCR scan...</p>
                  </div>
                ) : (
                  <>
                    <Upload size={36} style={{ color: 'var(--color-muted-dim)', margin: '0 auto 12px' }} />
                    <p className="font-medium mb-1">Click to Upload Receipt Image</p>
                    <p className="text-sm" style={{ color: 'var(--color-muted)' }}>
                      Mock OCR will extract Merchant TIN, OR Number, Line Items & Total
                    </p>
                  </>
                )}
              </div>

              {/* Parsed Receipt */}
              {parsedReceipt && (
                <div className="rounded-lg overflow-hidden" style={{ border: '1px solid var(--color-border)', animation: 'slide-up 0.3s ease-out' }}>
                  <div className="px-4 py-3 flex items-center gap-2" style={{ background: 'var(--color-surface-elevated)', borderBottom: '1px solid var(--color-border)' }}>
                    <CheckCircle size={16} style={{ color: 'var(--color-emerald-400)' }} />
                    <span className="text-sm font-semibold" style={{ color: 'var(--color-emerald-400)' }}>OCR Extraction Complete</span>
                  </div>
                  <div className="p-4 space-y-3">
                    <div className="grid grid-cols-2 gap-3">
                      <div className="rounded-lg p-3" style={{ background: 'var(--color-background)', border: '1px solid var(--color-border)' }}>
                        <p className="text-xs mb-1" style={{ color: 'var(--color-muted)' }}>Merchant</p>
                        <p className="text-sm font-semibold">{parsedReceipt.merchantName}</p>
                      </div>
                      <div className="rounded-lg p-3" style={{ background: 'var(--color-background)', border: '1px solid var(--color-border)' }}>
                        <p className="text-xs mb-1" style={{ color: 'var(--color-muted)' }}>TIN</p>
                        <p className="text-sm font-mono font-semibold" style={{ color: 'var(--color-cyan-400)' }}>{parsedReceipt.merchantTIN}</p>
                      </div>
                      <div className="rounded-lg p-3" style={{ background: 'var(--color-background)', border: '1px solid var(--color-border)' }}>
                        <p className="text-xs mb-1" style={{ color: 'var(--color-muted)' }}>OR Number</p>
                        <p className="text-sm font-mono font-semibold" style={{ color: 'var(--color-amber-400)' }}>{parsedReceipt.orNumber}</p>
                      </div>
                      <div className="rounded-lg p-3" style={{ background: 'var(--color-background)', border: '1px solid var(--color-border)' }}>
                        <p className="text-xs mb-1" style={{ color: 'var(--color-muted)' }}>Date Issued</p>
                        <p className="text-sm font-semibold">{parsedReceipt.dateIssued}</p>
                      </div>
                    </div>

                    {/* Line Items Table */}
                    <div className="rounded-lg overflow-hidden" style={{ border: '1px solid var(--color-border)' }}>
                      <table className="w-full text-sm">
                        <thead>
                          <tr style={{ background: 'var(--color-surface-elevated)' }}>
                            <th className="text-left px-3 py-2 font-medium" style={{ color: 'var(--color-muted)' }}>Item</th>
                            <th className="text-right px-3 py-2 font-medium" style={{ color: 'var(--color-muted)' }}>Qty</th>
                            <th className="text-right px-3 py-2 font-medium" style={{ color: 'var(--color-muted)' }}>Unit Cost</th>
                            <th className="text-right px-3 py-2 font-medium" style={{ color: 'var(--color-muted)' }}>Total</th>
                          </tr>
                        </thead>
                        <tbody>
                          {parsedReceipt.lineItems.map((item, i) => (
                            <tr key={i} style={{ borderTop: '1px solid var(--color-border)' }}>
                              <td className="px-3 py-2">{item.description}</td>
                              <td className="px-3 py-2 text-right">{item.qty}</td>
                              <td className="px-3 py-2 text-right font-mono" style={{ color: 'var(--color-muted)' }}>{formatPHP(item.unitCost)}</td>
                              <td className="px-3 py-2 text-right font-mono font-semibold" style={{ color: 'var(--color-emerald-400)' }}>{formatPHP(item.totalCost)}</td>
                            </tr>
                          ))}
                        </tbody>
                        <tfoot>
                          <tr style={{ borderTop: '2px solid var(--color-border-bright)', background: 'var(--color-surface-elevated)' }}>
                            <td colSpan={3} className="px-3 py-2 text-right font-semibold">Grand Total</td>
                            <td className="px-3 py-2 text-right font-mono font-bold text-base" style={{ color: 'var(--color-emerald-400)' }}>{formatPHP(parsedReceipt.totalAmount)}</td>
                          </tr>
                        </tfoot>
                      </table>
                    </div>
                  </div>
                </div>
              )}

              {/* Generate SSMI */}
              <button onClick={handleGenerateReport}
                className="w-full py-3 rounded-lg font-semibold text-sm flex items-center justify-center gap-2 cursor-pointer transition-all"
                style={{
                  background: 'linear-gradient(135deg, var(--color-cyan-500), var(--color-blue-500))',
                  color: 'white',
                }}>
                <FileText size={16} /> Generate COA-Compliant SSMI Report
              </button>
            </div>
          )}

          {activeTab === 'report' && report && (
            <div className="space-y-4">
              {/* COA Compliance Badge */}
              <div className="flex items-center gap-2 rounded-lg px-3 py-2" style={{
                background: 'var(--color-emerald-900)',
                border: '1px solid var(--color-emerald-700)',
              }}>
                <CheckCircle size={16} style={{ color: 'var(--color-emerald-400)' }} />
                <span className="text-sm font-medium" style={{ color: 'var(--color-emerald-400)' }}>COA Compliant — {report.referenceCircular}</span>
              </div>

              {/* Report Content */}
              <div className="print-report rounded-lg p-6 space-y-4" style={{ background: 'var(--color-background)', border: '1px solid var(--color-border)' }}>
                <div className="text-center space-y-1">
                  <p className="text-xs" style={{ color: 'var(--color-muted)' }}>Republic of the Philippines</p>
                  <p className="text-sm font-semibold">{report.barangay}, {report.municipality}</p>
                  <p className="text-xs" style={{ color: 'var(--color-muted)' }}>{report.province}</p>
                  <h3 className="text-base font-bold mt-2" style={{ color: 'var(--color-cyan-400)' }}>{report.reportTitle}</h3>
                  <p className="text-xs font-mono" style={{ color: 'var(--color-muted)' }}>
                    Ref: {report.reportNumber} | Period: {report.datePeriod.from} to {report.datePeriod.to}
                  </p>
                </div>

                <div className="text-xs space-y-1" style={{ color: 'var(--color-muted)' }}>
                  <p><strong>Disaster Type:</strong> {report.disasterType}</p>
                  <p><strong>Total Beneficiaries:</strong> {report.totalBeneficiaries}</p>
                  <p><strong>Prepared by:</strong> {report.preparedBy}</p>
                </div>

                {/* Receipt Summary */}
                {report.receiptSummary.length > 0 && (
                  <div>
                    <p className="text-sm font-semibold mb-2">Procurement Summary</p>
                    {report.receiptSummary.map((receipt, i) => (
                      <div key={i} className="rounded-lg overflow-hidden mb-2" style={{ border: '1px solid var(--color-border)' }}>
                        <div className="px-3 py-1.5 text-xs" style={{ background: 'var(--color-surface-elevated)', color: 'var(--color-muted)' }}>
                          {receipt.merchantName} • TIN: {receipt.merchantTIN} • {receipt.orNumber}
                        </div>
                        <table className="w-full text-xs">
                          <tbody>
                            {receipt.lineItems.map((item, j) => (
                              <tr key={j} style={{ borderTop: '1px solid var(--color-border)' }}>
                                <td className="px-3 py-1.5">{item.description}</td>
                                <td className="px-3 py-1.5 text-right">{item.qty}</td>
                                <td className="px-3 py-1.5 text-right font-mono">{formatPHP(item.totalCost)}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    ))}
                  </div>
                )}

                {/* Distribution Items */}
                {report.distributionItems.length > 0 && (
                  <div>
                    <p className="text-sm font-semibold mb-2">Distribution Summary</p>
                    <div className="rounded-lg overflow-hidden" style={{ border: '1px solid var(--color-border)' }}>
                      <table className="w-full text-xs">
                        <thead>
                          <tr style={{ background: 'var(--color-surface-elevated)' }}>
                            <th className="text-left px-3 py-2 font-medium" style={{ color: 'var(--color-muted)' }}>Item</th>
                            <th className="text-right px-3 py-2 font-medium" style={{ color: 'var(--color-muted)' }}>Qty</th>
                            <th className="text-right px-3 py-2 font-medium" style={{ color: 'var(--color-muted)' }}>Total Cost</th>
                          </tr>
                        </thead>
                        <tbody>
                          {report.distributionItems.map((item, i) => (
                            <tr key={i} style={{ borderTop: '1px solid var(--color-border)' }}>
                              <td className="px-3 py-1.5">{item.description}</td>
                              <td className="px-3 py-1.5 text-right">{item.totalQty} {item.unit}</td>
                              <td className="px-3 py-1.5 text-right font-mono">{formatPHP(item.totalCost)}</td>
                            </tr>
                          ))}
                        </tbody>
                        <tfoot>
                          <tr style={{ borderTop: '2px solid var(--color-border-bright)', background: 'var(--color-surface-elevated)' }}>
                            <td colSpan={2} className="px-3 py-2 text-right text-sm font-semibold">Grand Total</td>
                            <td className="px-3 py-2 text-right font-mono font-bold" style={{ color: 'var(--color-emerald-400)' }}>{formatPHP(report.grandTotal)}</td>
                          </tr>
                        </tfoot>
                      </table>
                    </div>
                  </div>
                )}

                {/* Geotag */}
                <div className="rounded-lg p-3" style={{ background: 'var(--color-surface-elevated)', border: '1px solid var(--color-border)' }}>
                  <div className="flex items-center gap-1.5 mb-1">
                    <Hash size={12} style={{ color: 'var(--color-cyan-400)' }} />
                    <span className="text-xs font-semibold" style={{ color: 'var(--color-cyan-400)' }}>Geotag Audit Trail</span>
                  </div>
                  <p className="text-xs font-mono" style={{ color: 'var(--color-muted)' }}>
                    Lat: {report.geotag.lat} | Lng: {report.geotag.lng} | Geohash: {report.geotag.geohash}
                  </p>
                  <p className="text-xs font-mono" style={{ color: 'var(--color-muted)' }}>
                    Timestamp: {report.geotag.timestamp} | Accuracy: {report.geotag.accuracy}
                  </p>
                </div>

                {/* Certifications */}
                <div className="space-y-2 text-xs" style={{ color: 'var(--color-muted)' }}>
                  {report.certifications.map((cert, i) => (
                    <p key={i} className="italic">{cert}</p>
                  ))}
                </div>

                <div className="grid grid-cols-2 gap-8 pt-4" style={{ borderTop: '1px solid var(--color-border)' }}>
                  <div className="text-center text-xs">
                    <div className="mb-8" style={{ borderBottom: '1px solid var(--color-muted-dim)' }} />
                    <p className="font-semibold">{report.preparedBy}</p>
                    <p style={{ color: 'var(--color-muted)' }}>Prepared By</p>
                  </div>
                  <div className="text-center text-xs">
                    <div className="mb-8" style={{ borderBottom: '1px solid var(--color-muted-dim)' }} />
                    <p className="font-semibold">{report.approvedBy}</p>
                    <p style={{ color: 'var(--color-muted)' }}>Approved By</p>
                  </div>
                </div>
              </div>

              {/* Print Button */}
              <button onClick={handlePrint}
                className="w-full py-3 rounded-lg font-semibold text-sm flex items-center justify-center gap-2 cursor-pointer"
                style={{ background: 'linear-gradient(135deg, var(--color-emerald-600), var(--color-emerald-700))', color: 'white' }}>
                <Printer size={16} /> Print SSMI Report
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
