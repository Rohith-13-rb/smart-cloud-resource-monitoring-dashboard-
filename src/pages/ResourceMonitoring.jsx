import React, { useState } from 'react';
import { useCloudData } from '../context/CloudDataContext';
import {
  Activity,
  Cpu,
  Database,
  Wifi,
  HardDrive,
  Play,
  Pause,
  Clock,
  Zap,
  RotateCw,
  Search,
  Filter,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import {
  AreaChart,
  Area,
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine
} from 'recharts';

export const ResourceMonitoring = () => {
  const {
    services,
    telemetry,
    isLiveStreaming,
    setIsLiveStreaming,
    refreshInterval,
    setRefreshInterval,
    restartService,
    thresholds
  } = useCloudData();

  const [timeRange, setTimeRange] = useState('live'); // 'live', '1h', '24h', '7d'
  const [searchQuery, setSearchQuery] = useState('');

  // Top services sorted by CPU usage
  const sortedServices = [...services]
    .filter(s => s.name.toLowerCase().includes(searchQuery.toLowerCase()) || s.type.toLowerCase().includes(searchQuery.toLowerCase()))
    .sort((a, b) => b.cpuUsage - a.cpuUsage);

  return (
    <div className="page-wrapper">
      {/* Page Header */}
      <div className="page-header">
        <div>
          <h1 className="page-title">
            <Cpu size={28} color="#06b6d4" />
            Resource Telemetry & Observability
          </h1>
          <p className="page-subtitle">
            Synchronized high-frequency metrics across CPU cores, Memory allocations, Disk I/O, and Network ingress/egress.
          </p>
        </div>

        {/* Live Controls */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
          {/* Refresh interval selector */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', background: 'rgba(255,255,255,0.05)', padding: '4px 8px', borderRadius: 'var(--radius-md)' }}>
            <Clock size={14} color="var(--text-muted)" />
            <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Interval:</span>
            <select
              value={refreshInterval}
              onChange={(e) => setRefreshInterval(Number(e.target.value))}
              className="input-control"
              style={{ padding: '2px 6px', fontSize: '0.75rem', width: 'auto', height: '28px' }}
            >
              <option value={1000}>1s (High Freq)</option>
              <option value={3000}>3s (Standard)</option>
              <option value={5000}>5s (Eco)</option>
            </select>
          </div>

          {/* Time Window Buttons */}
          <div style={{ display: 'flex', gap: '0.25rem', background: 'rgba(255,255,255,0.05)', padding: '3px', borderRadius: 'var(--radius-md)' }}>
            {['live', '1h', '24h', '7d'].map((range) => (
              <button
                key={range}
                onClick={() => setTimeRange(range)}
                className="btn btn-sm"
                style={{
                  padding: '4px 10px',
                  fontSize: '0.75rem',
                  background: timeRange === range ? 'var(--primary)' : 'transparent',
                  color: timeRange === range ? '#fff' : 'var(--text-secondary)'
                }}
              >
                {range.toUpperCase()}
              </button>
            ))}
          </div>

          {/* Play/Pause Live Ticker */}
          <button
            onClick={() => setIsLiveStreaming(!isLiveStreaming)}
            className={`btn btn-sm ${isLiveStreaming ? 'btn-emerald' : 'btn-secondary'}`}
          >
            {isLiveStreaming ? <Pause size={14} /> : <Play size={14} />}
            <span>{isLiveStreaming ? 'Streaming' : 'Paused'}</span>
          </button>
        </div>
      </div>

      {/* 4 Synchronized Telemetry Charts (2x2 Grid) */}
      <div className="grid-cols-2" style={{ marginBottom: '1.5rem' }}>
        {/* 1. CPU Utilization Chart */}
        <div className="glass-card" style={{ padding: '1.25rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <div style={{ padding: '6px', borderRadius: 'var(--radius-sm)', background: 'rgba(99,102,241,0.15)', color: '#818cf8' }}>
                <Cpu size={16} />
              </div>
              <div>
                <h3 style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                  Cluster CPU Utilization
                </h3>
                <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Threshold Warning: {thresholds.cpuWarning}% • Critical: {thresholds.cpuCritical}%</span>
              </div>
            </div>
            <span className="badge badge-indigo" style={{ fontFamily: 'var(--font-mono)' }}>
              {telemetry[telemetry.length - 1]?.cpu || 50}% Peak
            </span>
          </div>

          <div style={{ width: '100%', height: '220px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={telemetry} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="cpuGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.45} />
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
                <XAxis dataKey="time" stroke="var(--text-muted)" fontSize={10} />
                <YAxis domain={[0, 100]} stroke="var(--text-muted)" fontSize={10} unit="%" />
                <Tooltip
                  contentStyle={{
                    background: 'rgba(15, 23, 42, 0.95)',
                    borderColor: 'rgba(255,255,255,0.1)',
                    borderRadius: '8px',
                    color: '#fff',
                    fontSize: '12px'
                  }}
                />
                <ReferenceLine y={thresholds.cpuCritical} stroke="#f43f5e" strokeDasharray="3 3" label={{ value: 'Critical Threshold', fill: '#fb7185', fontSize: 10 }} />
                <Area type="monotone" dataKey="cpu" name="CPU Usage %" stroke="#818cf8" strokeWidth={2} fillOpacity={1} fill="url(#cpuGrad)" isAnimationActive={false} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* 2. RAM Memory Allocation Chart */}
        <div className="glass-card" style={{ padding: '1.25rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <div style={{ padding: '6px', borderRadius: 'var(--radius-sm)', background: 'rgba(168,85,247,0.15)', color: '#c084fc' }}>
                <Database size={16} />
              </div>
              <div>
                <h3 style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                  Cluster Memory (RAM) Allocation
                </h3>
                <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Allocated: {(telemetry[telemetry.length - 1]?.memory * 0.64 || 42).toFixed(1)} GB of 64 GB</span>
              </div>
            </div>
            <span className="badge badge-purple" style={{ fontFamily: 'var(--font-mono)' }}>
              {telemetry[telemetry.length - 1]?.memory || 65}%
            </span>
          </div>

          <div style={{ width: '100%', height: '220px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={telemetry} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="memGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#a855f7" stopOpacity={0.45} />
                    <stop offset="95%" stopColor="#a855f7" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
                <XAxis dataKey="time" stroke="var(--text-muted)" fontSize={10} />
                <YAxis domain={[0, 100]} stroke="var(--text-muted)" fontSize={10} unit="%" />
                <Tooltip
                  contentStyle={{
                    background: 'rgba(15, 23, 42, 0.95)',
                    borderColor: 'rgba(255,255,255,0.1)',
                    borderRadius: '8px',
                    color: '#fff',
                    fontSize: '12px'
                  }}
                />
                <ReferenceLine y={thresholds.memoryCritical} stroke="#f43f5e" strokeDasharray="3 3" />
                <Area type="monotone" dataKey="memory" name="RAM Usage %" stroke="#c084fc" strokeWidth={2} fillOpacity={1} fill="url(#memGrad)" isAnimationActive={false} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* 3. Network Throughput Chart */}
        <div className="glass-card" style={{ padding: '1.25rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <div style={{ padding: '6px', borderRadius: 'var(--radius-sm)', background: 'rgba(6,182,212,0.15)', color: '#22d3ee' }}>
                <Wifi size={16} />
              </div>
              <div>
                <h3 style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                  Network Bandwidth (Gbps)
                </h3>
                <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Ingress & Egress Multi-Cloud Pipe</span>
              </div>
            </div>
            <span className="badge badge-cyan" style={{ fontFamily: 'var(--font-mono)' }}>
              {telemetry[telemetry.length - 1]?.network || 1.8} Gbps
            </span>
          </div>

          <div style={{ width: '100%', height: '220px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={telemetry} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="netGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.45} />
                    <stop offset="95%" stopColor="#06b6d4" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
                <XAxis dataKey="time" stroke="var(--text-muted)" fontSize={10} />
                <YAxis domain={[0, 6]} stroke="var(--text-muted)" fontSize={10} unit="G" />
                <Tooltip
                  contentStyle={{
                    background: 'rgba(15, 23, 42, 0.95)',
                    borderColor: 'rgba(255,255,255,0.1)',
                    borderRadius: '8px',
                    color: '#fff',
                    fontSize: '12px'
                  }}
                />
                <Area type="monotone" dataKey="network" name="Network (Gbps)" stroke="#22d3ee" strokeWidth={2} fillOpacity={1} fill="url(#netGrad)" isAnimationActive={false} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* 4. Request Latency (ms) Chart */}
        <div className="glass-card" style={{ padding: '1.25rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <div style={{ padding: '6px', borderRadius: 'var(--radius-sm)', background: 'rgba(245,158,11,0.15)', color: '#fbbf24' }}>
                <Activity size={16} />
              </div>
              <div>
                <h3 style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                  P99 Edge Roundtrip Latency (RTT)
                </h3>
                <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Response time across regional gateways</span>
              </div>
            </div>
            <span className="badge badge-amber" style={{ fontFamily: 'var(--font-mono)' }}>
              {telemetry[telemetry.length - 1]?.latency || 32} ms
            </span>
          </div>

          <div style={{ width: '100%', height: '220px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={telemetry} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="latGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#f59e0b" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
                <XAxis dataKey="time" stroke="var(--text-muted)" fontSize={10} />
                <YAxis domain={[0, 150]} stroke="var(--text-muted)" fontSize={10} unit="ms" />
                <Tooltip
                  contentStyle={{
                    background: 'rgba(15, 23, 42, 0.95)',
                    borderColor: 'rgba(255,255,255,0.1)',
                    borderRadius: '8px',
                    color: '#fff',
                    fontSize: '12px'
                  }}
                />
                <Area type="monotone" dataKey="latency" name="Latency (ms)" stroke="#fbbf24" strokeWidth={2} fillOpacity={1} fill="url(#latGrad)" isAnimationActive={false} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Top Consuming Instances Breakdown Table */}
      <div className="glass-card" style={{ padding: '1.5rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <h2 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-primary)' }}>
              Top Resource-Consuming Compute Instances
            </h2>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
              Live telemetry rank by CPU & RAM footprint
            </div>
          </div>

          <div style={{ position: 'relative', minWidth: '240px' }}>
            <Search size={16} style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
            <input
              type="text"
              placeholder="Search instances..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="input-control"
              style={{ paddingLeft: '32px', height: '36px', fontSize: '0.85rem' }}
            >
            </input>
          </div>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table className="modern-table">
            <thead>
              <tr>
                <th>Service Name</th>
                <th>Type & Provider</th>
                <th>Status</th>
                <th>CPU Utilization</th>
                <th>RAM Allocation</th>
                <th>Network</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {sortedServices.map((srv) => (
                <tr key={srv.id}>
                  <td>
                    <div style={{ fontWeight: 700, color: 'var(--text-primary)' }}>{srv.name}</div>
                    <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>{srv.ip}</div>
                  </td>
                  <td>
                    <div style={{ fontSize: '0.825rem', color: 'var(--text-secondary)' }}>{srv.type}</div>
                    <span className={`badge ${srv.provider === 'AWS' ? 'badge-amber' : srv.provider === 'GCP' ? 'badge-cyan' : 'badge-indigo'}`} style={{ fontSize: '0.65rem' }}>
                      {srv.provider} • {srv.region.split(' ')[0]}
                    </span>
                  </td>
                  <td>
                    {srv.status === 'running' ? (
                      <span className="badge badge-emerald">
                        <span className="status-dot status-dot-emerald" /> Online
                      </span>
                    ) : (
                      <span className="badge badge-rose">
                        <span className="status-dot status-dot-rose" /> Offline
                      </span>
                    )}
                  </td>
                  <td style={{ minWidth: '140px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', marginBottom: '2px' }}>
                      <span style={{ color: srv.cpuUsage > 85 ? '#fb7185' : 'var(--text-secondary)', fontWeight: 600 }}>{srv.cpuUsage}%</span>
                    </div>
                    <div className="progress-bar-container" style={{ margin: 0 }}>
                      <div
                        className="progress-bar-fill"
                        style={{
                          width: `${srv.cpuUsage}%`,
                          background: srv.cpuUsage > 85 ? '#f43f5e' : srv.cpuUsage > 70 ? '#f59e0b' : '#6366f1'
                        }}
                      />
                    </div>
                  </td>
                  <td style={{ minWidth: '140px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', marginBottom: '2px' }}>
                      <span style={{ color: srv.ramUsage > 85 ? '#fb7185' : 'var(--text-secondary)', fontWeight: 600 }}>{srv.ramUsage}%</span>
                    </div>
                    <div className="progress-bar-container" style={{ margin: 0 }}>
                      <div
                        className="progress-bar-fill"
                        style={{
                          width: `${srv.ramUsage}%`,
                          background: srv.ramUsage > 85 ? '#f43f5e' : '#a855f7'
                        }}
                      />
                    </div>
                  </td>
                  <td>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem', color: '#fbbf24' }}>
                      {srv.networkIo} Mbps
                    </span>
                  </td>
                  <td>
                    <button
                      onClick={() => restartService(srv.id)}
                      disabled={srv.status !== 'running'}
                      className="btn btn-ghost btn-sm"
                      title="Quick Restart"
                    >
                      <RotateCw size={13} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
