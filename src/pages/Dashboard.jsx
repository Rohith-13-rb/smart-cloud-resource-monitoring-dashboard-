import React from 'react';
import { useCloudData } from '../context/CloudDataContext';
import { MetricCard } from '../components/MetricCard';
import { AlertSeverityBadge, AlertStatusBadge } from '../components/AlertBadge';
import {
  Server,
  Cpu,
  Database,
  DollarSign,
  Activity,
  HardDrive,
  Wifi,
  Clock,
  AlertTriangle,
  ArrowRight,
  ShieldCheck,
  Globe,
  Zap,
  CheckCircle2,
  TrendingUp,
  Layers
} from 'lucide-react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend
} from 'recharts';

export const Dashboard = ({ setActivePage }) => {
  const {
    services,
    alerts,
    telemetry,
    runningServicesCount,
    totalServicesCount,
    stoppedServicesCount,
    currentCpu,
    currentMemory,
    currentStorage,
    currentNetwork,
    currentLatency,
    totalMonthlyCost,
    selectedProviderFilter,
    triggerSimulatedLoadSpike
  } = useCloudData();

  // Filter services if a specific provider is selected in the navbar
  const filteredServices = selectedProviderFilter === 'All Providers'
    ? services
    : services.filter(s => s.provider === selectedProviderFilter);

  const activeAlerts = alerts.filter(a => a.status === 'active');

  // Multi-cloud provider distribution data for Pie Chart
  const providerCounts = [
    { name: 'AWS Cloud', value: services.filter(s => s.provider === 'AWS').length, color: '#f59e0b' },
    { name: 'Google Cloud (GCP)', value: services.filter(s => s.provider === 'GCP').length, color: '#06b6d4' },
    { name: 'Microsoft Azure', value: services.filter(s => s.provider === 'Azure').length, color: '#6366f1' }
  ];

  // Regional Availability Nodes
  const regions = [
    { name: 'US-East (N. Virginia)', provider: 'AWS / Azure', status: 'Operational', latency: '24ms', health: 99 },
    { name: 'US-West (Oregon)', provider: 'AWS', status: 'Operational', latency: '42ms', health: 100 },
    { name: 'Europe-West (Belgium)', provider: 'GCP', status: 'Operational', latency: '78ms', health: 98 },
    { name: 'US-Central (Iowa GPU)', provider: 'GCP', status: currentCpu > 85 ? 'High Load' : 'Operational', latency: '35ms', health: 95 }
  ];

  return (
    <div className="page-wrapper">
      {/* Page Header */}
      <div className="page-header">
        <div>
          <h1 className="page-title">
            <Activity size={28} color="#6366f1" />
            Executive Cloud Dashboard
          </h1>
          <p className="page-subtitle">
            Real-time multi-cloud telemetry, service orchestration, and resource telemetry stream.
          </p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
          <div className="badge badge-emerald" style={{ padding: '0.4rem 0.8rem', fontSize: '0.8rem' }}>
            <span className="status-dot status-dot-emerald" />
            Global Status: Nominal (99.98% SLA)
          </div>

          <button
            onClick={() => setActivePage('monitoring')}
            className="btn btn-secondary btn-sm"
          >
            <TrendingUp size={14} /> Telemetry View
          </button>
        </div>
      </div>

      {/* Main KPI Grid */}
      <div className="grid-cols-4" style={{ marginBottom: '1.5rem' }}>
        <MetricCard
          title="Total Cloud Compute"
          value={`${runningServicesCount}/${totalServicesCount}`}
          unit="Active Nodes"
          icon={Server}
          colorScheme="cyan"
          subtitle={`${stoppedServicesCount} offline • ${services.reduce((a, b) => a + b.instances, 0)} total instances`}
          trend={+4.2}
          onClick={() => setActivePage('services')}
        />

        <MetricCard
          title="Fleet Average CPU"
          value={currentCpu}
          unit="%"
          icon={Cpu}
          colorScheme={currentCpu > 85 ? 'rose' : currentCpu > 70 ? 'amber' : 'indigo'}
          progress={currentCpu}
          subtitle={currentCpu > 85 ? '⚠️ High Load Alert' : 'Normal Operating Envelope'}
          trend={currentCpu > 70 ? +8.5 : -2.1}
          onClick={() => setActivePage('monitoring')}
        />

        <MetricCard
          title="Memory Allocation"
          value={currentMemory}
          unit="%"
          icon={Database}
          colorScheme={currentMemory > 85 ? 'rose' : 'purple'}
          progress={currentMemory}
          subtitle={`Cluster Load: ${(currentMemory * 0.64).toFixed(1)} GB / 64 GB`}
          trend={+1.4}
          onClick={() => setActivePage('monitoring')}
        />

        <MetricCard
          title="Est. Monthly Spend"
          value={`$${totalMonthlyCost}`}
          unit="/ mo"
          icon={DollarSign}
          colorScheme="emerald"
          subtitle="Simulated runtime billing"
          trend={-0.8}
          onClick={() => setActivePage('reports')}
        />
      </div>

      {/* Secondary Metrics Bar */}
      <div className="grid-cols-4" style={{ marginBottom: '1.5rem' }}>
        <div className="glass-card" style={{ padding: '1rem 1.25rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{ padding: '10px', borderRadius: 'var(--radius-md)', background: 'rgba(16,185,129,0.12)', color: '#34d399' }}>
            <HardDrive size={22} />
          </div>
          <div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Storage Consumed</div>
            <div style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-primary)', fontFamily: 'var(--font-mono)' }}>
              {currentStorage}% <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>(4.8 TB)</span>
            </div>
          </div>
        </div>

        <div className="glass-card" style={{ padding: '1rem 1.25rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{ padding: '10px', borderRadius: 'var(--radius-md)', background: 'rgba(6,182,212,0.12)', color: '#22d3ee' }}>
            <Wifi size={22} />
          </div>
          <div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Network Throughput</div>
            <div style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-primary)', fontFamily: 'var(--font-mono)' }}>
              {currentNetwork} <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Gbps</span>
            </div>
          </div>
        </div>

        <div className="glass-card" style={{ padding: '1rem 1.25rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{ padding: '10px', borderRadius: 'var(--radius-md)', background: 'rgba(245,158,11,0.12)', color: '#fbbf24' }}>
            <Clock size={22} />
          </div>
          <div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Average Latency</div>
            <div style={{ fontSize: '1.25rem', fontWeight: 800, color: currentLatency > 60 ? '#fb7185' : '#fbbf24', fontFamily: 'var(--font-mono)' }}>
              {currentLatency} <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>ms</span>
            </div>
          </div>
        </div>

        <div
          className="glass-card glass-card-interactive"
          onClick={() => setActivePage('alerts')}
          style={{
            padding: '1rem 1.25rem',
            display: 'flex',
            alignItems: 'center',
            gap: '1rem',
            borderColor: activeAlerts.length > 0 ? 'rgba(244,63,94,0.4)' : 'var(--border-subtle)'
          }}
        >
          <div style={{ padding: '10px', borderRadius: 'var(--radius-md)', background: 'rgba(244,63,94,0.15)', color: '#fb7185' }}>
            <AlertTriangle size={22} />
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Active Incidents</div>
            <div style={{ fontSize: '1.25rem', fontWeight: 800, color: activeAlerts.length > 0 ? '#fb7185' : '#34d399', fontFamily: 'var(--font-mono)' }}>
              {activeAlerts.length} <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Unresolved</span>
            </div>
          </div>
          <ArrowRight size={16} color="var(--text-muted)" />
        </div>
      </div>

      {/* Main Charts & Breakdown Section */}
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '1.5rem', marginBottom: '1.5rem' }}>
        {/* Real-time Telemetry Graph */}
        <div className="glass-card" style={{ padding: '1.5rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
            <div>
              <h2 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                Live Rolling Telemetry Stream
              </h2>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                CPU Load (%) & Memory Usage (%) synchronized telemetry
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                Auto-updating every 3s
              </span>
              <button
                onClick={() => setActivePage('monitoring')}
                className="btn btn-ghost btn-sm"
                style={{ fontSize: '0.75rem' }}
              >
                Expand All <ArrowRight size={12} />
              </button>
            </div>
          </div>

          <div style={{ width: '100%', height: '280px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={telemetry} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="cpuGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0.0} />
                  </linearGradient>
                  <linearGradient id="memGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#06b6d4" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
                <XAxis dataKey="time" stroke="var(--text-muted)" fontSize={11} tickLine={false} />
                <YAxis domain={[0, 100]} stroke="var(--text-muted)" fontSize={11} tickLine={false} unit="%" />
                <Tooltip
                  contentStyle={{
                    background: 'rgba(15, 23, 42, 0.95)',
                    borderColor: 'rgba(255,255,255,0.1)',
                    borderRadius: '8px',
                    color: '#fff',
                    fontSize: '12px'
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="cpu"
                  name="CPU Load"
                  stroke="#818cf8"
                  strokeWidth={2.5}
                  fillOpacity={1}
                  fill="url(#cpuGradient)"
                  isAnimationActive={false}
                />
                <Area
                  type="monotone"
                  dataKey="memory"
                  name="Memory Load"
                  stroke="#22d3ee"
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#memGradient)"
                  isAnimationActive={false}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Multi-Cloud Provider Fleet Distribution */}
        <div className="glass-card" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div>
            <h2 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.25rem' }}>
              Cloud Fleet Share
            </h2>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
              Multi-cloud topology distribution
            </div>

            <div style={{ width: '100%', height: '180px' }}>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={providerCounts}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={75}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {providerCounts.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      background: 'rgba(15, 23, 42, 0.95)',
                      borderColor: 'rgba(255,255,255,0.1)',
                      borderRadius: '8px',
                      color: '#fff',
                      fontSize: '12px'
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginTop: '0.5rem' }}>
            {providerCounts.map((p, idx) => (
              <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.8rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <span style={{ width: 10, height: 10, borderRadius: '50%', background: p.color }} />
                  <span style={{ color: 'var(--text-secondary)' }}>{p.name}</span>
                </div>
                <strong style={{ color: 'var(--text-primary)' }}>{p.value} Services</strong>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Section: Availability Zones & Recent Incidents */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '1.5rem' }}>
        {/* Availability Zones */}
        <div className="glass-card" style={{ padding: '1.5rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <h2 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Globe size={18} color="#06b6d4" />
              Regional Availability & Health
            </h2>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>4 Regions Monitored</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {regions.map((reg, idx) => (
              <div
                key={idx}
                style={{
                  background: 'rgba(255,255,255,0.03)',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: 'var(--radius-md)',
                  padding: '0.75rem 1rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}
              >
                <div>
                  <div style={{ fontWeight: 600, fontSize: '0.88rem', color: 'var(--text-primary)' }}>
                    {reg.name}
                  </div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                    Provider: {reg.provider} • RTT: {reg.latency}
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Health Score</div>
                    <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#34d399' }}>{reg.health}%</div>
                  </div>
                  <span className={`badge ${reg.status === 'Operational' ? 'badge-emerald' : 'badge-amber'}`}>
                    {reg.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Live Alerts Stream */}
        <div className="glass-card" style={{ padding: '1.5rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <h2 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <AlertTriangle size={18} color="#f43f5e" />
              Recent Incidents & Alerts
            </h2>
            <button
              onClick={() => setActivePage('alerts')}
              className="btn btn-ghost btn-sm"
              style={{ fontSize: '0.75rem' }}
            >
              View All ({alerts.length})
            </button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {alerts.slice(0, 3).map((alt) => (
              <div
                key={alt.id}
                style={{
                  background: alt.status === 'active' ? 'rgba(244, 63, 94, 0.06)' : 'rgba(255,255,255,0.02)',
                  border: `1px solid ${alt.status === 'active' ? 'rgba(244, 63, 94, 0.25)' : 'var(--border-subtle)'}`,
                  borderRadius: 'var(--radius-md)',
                  padding: '0.75rem 1rem'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.35rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                    <AlertSeverityBadge severity={alt.severity} />
                    <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                      {alt.title}
                    </span>
                  </div>
                  <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>{alt.timestamp}</span>
                </div>
                <p style={{ fontSize: '0.775rem', color: 'var(--text-secondary)', margin: '0.2rem 0' }}>
                  {alt.message}
                </p>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '0.4rem', fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                  <span>Node: <strong>{alt.service}</strong></span>
                  <AlertStatusBadge status={alt.status} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 1024px) {
          div[style*="grid-template-columns: 2fr 1fr"],
          div[style*="grid-template-columns: 1.2fr 1fr"] {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
};
