import React, { useState } from 'react';
import { useCloudData } from '../context/CloudDataContext';
import confetti from 'canvas-confetti';
import {
  FileBarChart2,
  Download,
  Printer,
  Calendar,
  DollarSign,
  ShieldCheck,
  TrendingUp,
  Cpu,
  Database,
  Wifi,
  Sparkles,
  FileSpreadsheet,
  CheckCircle2
} from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  Legend
} from 'recharts';

export const Reports = () => {
  const { services, telemetry, totalMonthlyCost, addToast } = useCloudData();
  const [reportPeriod, setReportPeriod] = useState('weekly'); // 'daily', 'weekly', 'monthly'

  // Sample Aggregated Historical Data for charts
  const weeklyUsageData = [
    { day: 'Mon', awsCost: 45, gcpCost: 38, azureCost: 22, avgCpu: 42, avgRam: 58 },
    { day: 'Tue', awsCost: 52, gcpCost: 41, azureCost: 25, avgCpu: 48, avgRam: 64 },
    { day: 'Wed', awsCost: 48, gcpCost: 46, azureCost: 28, avgCpu: 55, avgRam: 72 },
    { day: 'Thu', awsCost: 61, gcpCost: 55, azureCost: 30, avgCpu: 68, avgRam: 78 },
    { day: 'Fri', awsCost: 74, gcpCost: 62, azureCost: 35, avgCpu: 76, avgRam: 84 },
    { day: 'Sat', awsCost: 38, gcpCost: 30, azureCost: 20, avgCpu: 35, avgRam: 50 },
    { day: 'Sun', awsCost: 34, gcpCost: 28, azureCost: 18, avgCpu: 30, avgRam: 48 },
  ];

  // Export to real CSV file
  const handleExportCSV = () => {
    try {
      const headers = ['Timestamp', 'CPU_Utilization_Pct', 'Memory_Allocation_Pct', 'Storage_Used_Pct', 'Network_Throughput_Gbps', 'Latency_ms'];
      const rows = telemetry.map(t => [
        t.time,
        t.cpu,
        t.memory,
        t.storage,
        t.network,
        t.latency
      ]);

      const csvContent = [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.setAttribute('href', url);
      link.setAttribute('download', `SmartCloud_Telemetry_Report_${new Date().toISOString().split('T')[0]}.csv`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.8 }
      });

      addToast('CSV Report Downloaded', 'Telemetry dataset successfully exported.', 'success');
    } catch (err) {
      addToast('Export Error', 'Failed to generate CSV export.', 'error');
    }
  };

  // Print / Save PDF
  const handlePrintReport = () => {
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.7 }
    });
    addToast('Opening Print Dialog', 'Preparing college report document for print/PDF...', 'info');
    setTimeout(() => {
      window.print();
    }, 500);
  };

  return (
    <div className="page-wrapper">
      {/* Page Header */}
      <div className="page-header">
        <div>
          <h1 className="page-title">
            <FileBarChart2 size={28} color="#10b981" />
            Cloud Analytics & SLA Reports
          </h1>
          <p className="page-subtitle">
            Historical consumption audits, financial projection breakdown, and college project evaluation metrics.
          </p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
          {/* Period selector */}
          <div style={{ display: 'flex', gap: '0.25rem', background: 'rgba(255,255,255,0.05)', padding: '3px', borderRadius: 'var(--radius-md)' }}>
            {['daily', 'weekly', 'monthly'].map((p) => (
              <button
                key={p}
                onClick={() => setReportPeriod(p)}
                className="btn btn-sm"
                style={{
                  padding: '4px 10px',
                  fontSize: '0.75rem',
                  background: reportPeriod === p ? 'var(--emerald)' : 'transparent',
                  color: reportPeriod === p ? '#fff' : 'var(--text-secondary)'
                }}
              >
                {p.toUpperCase()}
              </button>
            ))}
          </div>

          <button onClick={handleExportCSV} className="btn btn-secondary btn-sm">
            <FileSpreadsheet size={15} /> Export CSV
          </button>

          <button onClick={handlePrintReport} className="btn btn-emerald btn-sm">
            <Printer size={15} /> Print / PDF Report
          </button>
        </div>
      </div>

      {/* SLA & Performance Scorecard */}
      <div className="grid-cols-4" style={{ marginBottom: '1.5rem' }}>
        <div className="glass-card" style={{ padding: '1.25rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Fleet SLA Uptime</span>
            <ShieldCheck size={18} color="#34d399" />
          </div>
          <div style={{ fontSize: '1.75rem', fontWeight: 800, color: '#34d399', fontFamily: 'var(--font-mono)' }}>
            99.98%
          </div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>0 unplanned outages recorded</div>
        </div>

        <div className="glass-card" style={{ padding: '1.25rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Avg Response Time</span>
            <TrendingUp size={18} color="#22d3ee" />
          </div>
          <div style={{ fontSize: '1.75rem', fontWeight: 800, color: '#22d3ee', fontFamily: 'var(--font-mono)' }}>
            32.4 ms
          </div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>P99 threshold &lt; 80ms met</div>
        </div>

        <div className="glass-card" style={{ padding: '1.25rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Total Data Egress</span>
            <Wifi size={18} color="#fbbf24" />
          </div>
          <div style={{ fontSize: '1.75rem', fontWeight: 800, color: '#fbbf24', fontFamily: 'var(--font-mono)' }}>
            14.2 TB
          </div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Across 4 regional edges</div>
        </div>

        <div className="glass-card" style={{ padding: '1.25rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Monthly Cloud Spend</span>
            <DollarSign size={18} color="#a855f7" />
          </div>
          <div style={{ fontSize: '1.75rem', fontWeight: 800, color: '#c084fc', fontFamily: 'var(--font-mono)' }}>
            ${totalMonthlyCost}
          </div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Under $2,000 monthly budget</div>
        </div>
      </div>

      {/* Historical Consumption & Multi-Cloud Spend Charts */}
      <div className="grid-cols-2" style={{ marginBottom: '1.5rem' }}>
        {/* 1. Multi-Cloud Daily Spend Chart */}
        <div className="glass-card" style={{ padding: '1.5rem' }}>
          <div style={{ marginBottom: '1.25rem' }}>
            <h2 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--text-primary)' }}>
              Multi-Cloud Daily Cost Breakdown ($)
            </h2>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
              Aggregated expenditures across AWS, GCP, and Azure
            </div>
          </div>

          <div style={{ width: '100%', height: '260px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={weeklyUsageData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
                <XAxis dataKey="day" stroke="var(--text-muted)" fontSize={11} />
                <YAxis stroke="var(--text-muted)" fontSize={11} unit="$" />
                <Tooltip
                  contentStyle={{
                    background: 'rgba(15, 23, 42, 0.95)',
                    borderColor: 'rgba(255,255,255,0.1)',
                    borderRadius: '8px',
                    color: '#fff',
                    fontSize: '12px'
                  }}
                />
                <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }} />
                <Bar dataKey="awsCost" name="AWS Cloud" fill="#f59e0b" radius={[4, 4, 0, 0]} />
                <Bar dataKey="gcpCost" name="Google Cloud" fill="#06b6d4" radius={[4, 4, 0, 0]} />
                <Bar dataKey="azureCost" name="Azure" fill="#6366f1" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* 2. Historical Average CPU & RAM Utilization Trend */}
        <div className="glass-card" style={{ padding: '1.5rem' }}>
          <div style={{ marginBottom: '1.25rem' }}>
            <h2 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--text-primary)' }}>
              Weekly Average Load Trend (%)
            </h2>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
              Fleet-wide median CPU & Memory trends
            </div>
          </div>

          <div style={{ width: '100%', height: '260px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={weeklyUsageData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
                <XAxis dataKey="day" stroke="var(--text-muted)" fontSize={11} />
                <YAxis domain={[0, 100]} stroke="var(--text-muted)" fontSize={11} unit="%" />
                <Tooltip
                  contentStyle={{
                    background: 'rgba(15, 23, 42, 0.95)',
                    borderColor: 'rgba(255,255,255,0.1)',
                    borderRadius: '8px',
                    color: '#fff',
                    fontSize: '12px'
                  }}
                />
                <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }} />
                <Line type="monotone" dataKey="avgCpu" name="Avg CPU %" stroke="#818cf8" strokeWidth={3} dot={{ r: 4 }} />
                <Line type="monotone" dataKey="avgRam" name="Avg RAM %" stroke="#34d399" strokeWidth={3} dot={{ r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Cloud Service Cost & Inventory Summary Table */}
      <div className="glass-card" style={{ padding: '1.5rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
          <div>
            <h2 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-primary)' }}>
              Service Inventory & Cost Distribution
            </h2>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
              Active resource breakdown for financial audit
            </div>
          </div>
          <span className="badge badge-emerald">Audit Verified</span>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table className="modern-table">
            <thead>
              <tr>
                <th>Service Name</th>
                <th>Provider & Region</th>
                <th>Instances</th>
                <th>Avg Utilization</th>
                <th>Rate / Hour</th>
                <th>Est. Monthly Cost</th>
              </tr>
            </thead>
            <tbody>
              {services.map((srv) => (
                <tr key={srv.id}>
                  <td>
                    <div style={{ fontWeight: 700, color: 'var(--text-primary)' }}>{srv.name}</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{srv.type}</div>
                  </td>
                  <td>
                    <span style={{ fontWeight: 600, color: 'var(--text-secondary)' }}>{srv.provider}</span>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}> ({srv.region})</span>
                  </td>
                  <td>
                    <span style={{ fontWeight: 600 }}>{srv.instances} node(s)</span>
                  </td>
                  <td>
                    <span style={{ color: srv.cpuUsage > 80 ? '#fb7185' : '#34d399', fontWeight: 600 }}>
                      {srv.cpuUsage}% CPU • {srv.ramUsage}% RAM
                    </span>
                  </td>
                  <td>
                    <span style={{ fontFamily: 'var(--font-mono)' }}>${srv.costPerHour.toFixed(3)}/hr</span>
                  </td>
                  <td>
                    <strong style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-primary)' }}>
                      ${(srv.costPerHour * 730 * (srv.instances || 1)).toFixed(2)}
                    </strong>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Print-specific style */}
      <style>{`
        @media print {
          body {
            background: #ffffff !important;
            color: #000000 !important;
          }
          .sidebar-container, header, .btn, .sidebar-backdrop {
            display: none !important;
          }
          .page-wrapper {
            max-width: 100% !important;
            padding: 0 !important;
          }
          .glass-card {
            box-shadow: none !important;
            border: 1px solid #ccc !important;
            background: #ffffff !important;
            color: #000000 !important;
            break-inside: avoid;
          }
        }
      `}</style>
    </div>
  );
};
