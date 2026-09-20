import React from 'react';
import {
  Server,
  Play,
  Square,
  RotateCw,
  Plus,
  Minus,
  Globe,
  HardDrive,
  Cpu,
  Layers,
  Activity,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';

export const ServiceCard = ({
  service,
  onToggleStatus,
  onRestart,
  onScale
}) => {
  const isRunning = service.status === 'running';
  const isRestarting = service.status === 'restarting';

  // Provider styles
  const getProviderBadge = (provider) => {
    switch (provider) {
      case 'AWS':
        return <span className="badge badge-amber">AWS</span>;
      case 'GCP':
        return <span className="badge badge-cyan">GCP</span>;
      case 'Azure':
        return <span className="badge badge-indigo">Azure</span>;
      default:
        return <span className="badge badge-purple">{provider}</span>;
    }
  };

  return (
    <div
      className="glass-card"
      style={{
        padding: '1.25rem',
        opacity: isRunning ? 1 : 0.75,
        borderColor: isRunning ? 'rgba(255, 255, 255, 0.1)' : 'rgba(244, 63, 94, 0.3)'
      }}
    >
      {/* Top row */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.35rem' }}>
            <span style={{ fontWeight: 700, fontSize: '1rem', color: 'var(--text-primary)' }}>
              {service.name}
            </span>
            {getProviderBadge(service.provider)}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.775rem', color: 'var(--text-muted)' }}>
            <Globe size={12} />
            <span>{service.region}</span>
            <span>•</span>
            <span>{service.type}</span>
          </div>
        </div>

        {/* Status Pill */}
        <div>
          {isRestarting ? (
            <span className="badge badge-indigo" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.3rem' }}>
              <RotateCw size={12} style={{ animation: 'spin 1s linear infinite' }} />
              Restarting
            </span>
          ) : isRunning ? (
            <span className="badge badge-emerald">
              <span className="status-dot status-dot-emerald" />
              Running
            </span>
          ) : (
            <span className="badge badge-rose">
              <span className="status-dot status-dot-rose" />
              Stopped
            </span>
          )}
        </div>
      </div>

      {/* Metrics Row */}
      <div
        style={{
          background: 'rgba(0,0,0,0.2)',
          borderRadius: 'var(--radius-md)',
          padding: '0.75rem',
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '0.5rem',
          textAlign: 'center',
          marginBottom: '1rem'
        }}
      >
        <div>
          <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginBottom: '0.15rem' }}>CPU</div>
          <div style={{ fontSize: '0.9rem', fontWeight: 700, fontFamily: 'var(--font-mono)', color: service.cpuUsage > 85 ? '#fb7185' : '#38bdf8' }}>
            {service.cpuUsage}%
          </div>
        </div>

        <div>
          <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginBottom: '0.15rem' }}>RAM</div>
          <div style={{ fontSize: '0.9rem', fontWeight: 700, fontFamily: 'var(--font-mono)', color: service.ramUsage > 85 ? '#fb7185' : '#a855f7' }}>
            {service.ramUsage}%
          </div>
        </div>

        <div>
          <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginBottom: '0.15rem' }}>Storage</div>
          <div style={{ fontSize: '0.9rem', fontWeight: 700, fontFamily: 'var(--font-mono)', color: '#34d399' }}>
            {service.diskUsage}%
          </div>
        </div>

        <div>
          <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginBottom: '0.15rem' }}>Net I/O</div>
          <div style={{ fontSize: '0.85rem', fontWeight: 700, fontFamily: 'var(--font-mono)', color: '#fbbf24' }}>
            {service.networkIo}M
          </div>
        </div>
      </div>

      {/* Instance scale and cost */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          fontSize: '0.8rem',
          marginBottom: '1rem',
          color: 'var(--text-secondary)'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
          <Layers size={14} />
          <span>Instances: <strong>{service.instances}</strong></span>
          <div style={{ display: 'inline-flex', gap: '0.2rem', marginLeft: '0.4rem' }}>
            <button
              onClick={() => onScale(service.id, -1)}
              disabled={service.instances <= 1 || !isRunning}
              className="btn btn-secondary btn-sm"
              style={{ padding: '2px 6px', height: 22 }}
              title="Scale Down"
            >
              <Minus size={11} />
            </button>
            <button
              onClick={() => onScale(service.id, 1)}
              disabled={service.instances >= 16 || !isRunning}
              className="btn btn-secondary btn-sm"
              style={{ padding: '2px 6px', height: 22 }}
              title="Scale Up"
            >
              <Plus size={11} />
            </button>
          </div>
        </div>

        <div>
          <span style={{ color: 'var(--text-muted)' }}>Est. Cost: </span>
          <strong style={{ color: 'var(--text-primary)' }}>
            ${(service.costPerHour * 730 * (service.instances || 1)).toFixed(2)}/mo
          </strong>
        </div>
      </div>

      {/* Action buttons */}
      <div style={{ display: 'flex', gap: '0.5rem', borderTop: '1px solid var(--border-subtle)', paddingTop: '0.85rem' }}>
        {isRunning ? (
          <button
            onClick={() => onToggleStatus(service.id)}
            className="btn btn-rose btn-sm"
            style={{ flex: 1 }}
            disabled={isRestarting}
          >
            <Square size={13} fill="currentColor" />
            Stop Service
          </button>
        ) : (
          <button
            onClick={() => onToggleStatus(service.id)}
            className="btn btn-emerald btn-sm"
            style={{ flex: 1 }}
          >
            <Play size={13} fill="currentColor" />
            Start Service
          </button>
        )}

        <button
          onClick={() => onRestart(service.id)}
          className="btn btn-secondary btn-sm"
          disabled={!isRunning || isRestarting}
          title="Rolling Restart"
        >
          <RotateCw size={13} />
          Restart
        </button>
      </div>
    </div>
  );
};
