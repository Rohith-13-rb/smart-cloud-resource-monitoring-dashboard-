import React, { useState } from 'react';
import { useCloudData } from '../context/CloudDataContext';
import { AlertSeverityBadge, AlertStatusBadge } from '../components/AlertBadge';
import {
  AlertTriangle,
  AlertCircle,
  Info,
  CheckCircle2,
  Zap,
  Trash2,
  Filter,
  ArrowRight,
  ShieldAlert,
  Search,
  CheckCheck
} from 'lucide-react';

export const Alerts = ({ setActivePage }) => {
  const {
    alerts,
    acknowledgeAlert,
    resolveAlert,
    clearAllResolvedAlerts,
    triggerSimulatedLoadSpike
  } = useCloudData();

  const [statusFilter, setStatusFilter] = useState('all'); // 'all', 'active', 'acknowledged', 'resolved'
  const [severityFilter, setSeverityFilter] = useState('all'); // 'all', 'critical', 'warning', 'info'
  const [searchQuery, setSearchQuery] = useState('');

  // Counts
  const criticalCount = alerts.filter(a => a.severity === 'critical' && a.status !== 'resolved').length;
  const warningCount = alerts.filter(a => a.severity === 'warning' && a.status !== 'resolved').length;
  const infoCount = alerts.filter(a => a.severity === 'info' && a.status !== 'resolved').length;
  const resolvedCount = alerts.filter(a => a.status === 'resolved').length;

  const filteredAlerts = alerts.filter((alt) => {
    const matchesStatus =
      statusFilter === 'all' || alt.status === statusFilter;
    const matchesSeverity =
      severityFilter === 'all' || alt.severity === severityFilter;
    const matchesSearch =
      alt.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      alt.service.toLowerCase().includes(searchQuery.toLowerCase()) ||
      alt.message.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesStatus && matchesSeverity && matchesSearch;
  });

  return (
    <div className="page-wrapper">
      {/* Page Header */}
      <div className="page-header">
        <div>
          <h1 className="page-title">
            <AlertTriangle size={28} color="#f43f5e" />
            Incidents, Alarms & Root Cause Analysis
          </h1>
          <p className="page-subtitle">
            Autonomous threshold violation detection, incident triage, and automated remediation workflows.
          </p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
          <button
            onClick={triggerSimulatedLoadSpike}
            className="btn btn-rose btn-sm"
          >
            <Zap size={14} /> Inject Test Incident
          </button>

          {resolvedCount > 0 && (
            <button
              onClick={clearAllResolvedAlerts}
              className="btn btn-secondary btn-sm"
            >
              <Trash2 size={14} /> Archive Resolved ({resolvedCount})
            </button>
          )}
        </div>
      </div>

      {/* Metric Cards Row */}
      <div className="grid-cols-4" style={{ marginBottom: '1.5rem' }}>
        <div
          className="glass-card glass-card-interactive"
          onClick={() => { setStatusFilter('active'); setSeverityFilter('critical'); }}
          style={{ padding: '1rem 1.25rem', borderLeft: '4px solid #f43f5e' }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-secondary)' }}>Critical Incidents</span>
            <AlertCircle size={18} color="#fb7185" />
          </div>
          <div style={{ fontSize: '1.75rem', fontWeight: 800, color: '#fb7185', fontFamily: 'var(--font-mono)', margin: '0.4rem 0' }}>
            {criticalCount}
          </div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Requires urgent engineer triage</div>
        </div>

        <div
          className="glass-card glass-card-interactive"
          onClick={() => { setStatusFilter('active'); setSeverityFilter('warning'); }}
          style={{ padding: '1rem 1.25rem', borderLeft: '4px solid #f59e0b' }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-secondary)' }}>Warning Thresholds</span>
            <AlertTriangle size={18} color="#fbbf24" />
          </div>
          <div style={{ fontSize: '1.75rem', fontWeight: 800, color: '#fbbf24', fontFamily: 'var(--font-mono)', margin: '0.4rem 0' }}>
            {warningCount}
          </div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Approaching capacity limits</div>
        </div>

        <div
          className="glass-card glass-card-interactive"
          onClick={() => { setStatusFilter('all'); setSeverityFilter('info'); }}
          style={{ padding: '1rem 1.25rem', borderLeft: '4px solid #06b6d4' }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-secondary)' }}>Info Notices</span>
            <Info size={18} color="#38bdf8" />
          </div>
          <div style={{ fontSize: '1.75rem', fontWeight: 800, color: '#38bdf8', fontFamily: 'var(--font-mono)', margin: '0.4rem 0' }}>
            {infoCount}
          </div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Routine maintenance / autoscaling</div>
        </div>

        <div
          className="glass-card glass-card-interactive"
          onClick={() => { setStatusFilter('resolved'); setSeverityFilter('all'); }}
          style={{ padding: '1rem 1.25rem', borderLeft: '4px solid #10b981' }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-secondary)' }}>Resolved History</span>
            <CheckCircle2 size={18} color="#34d399" />
          </div>
          <div style={{ fontSize: '1.75rem', fontWeight: 800, color: '#34d399', fontFamily: 'var(--font-mono)', margin: '0.4rem 0' }}>
            {resolvedCount}
          </div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Closed within SLA targets</div>
        </div>
      </div>

      {/* Filters Bar */}
      <div
        className="glass-card"
        style={{
          padding: '1rem 1.25rem',
          marginBottom: '1.5rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: '1rem',
          flexWrap: 'wrap'
        }}
      >
        <div style={{ position: 'relative', flex: 1, minWidth: '220px' }}>
          <Search size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
          <input
            type="text"
            placeholder="Search alerts by service or title..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="input-control"
            style={{ paddingLeft: '36px', height: '36px', fontSize: '0.85rem' }}
          />
        </div>

        {/* Status Tabs */}
        <div style={{ display: 'flex', gap: '0.35rem' }}>
          {[
            { id: 'all', label: 'All Incidents' },
            { id: 'active', label: 'Active' },
            { id: 'acknowledged', label: 'In Progress' },
            { id: 'resolved', label: 'Resolved' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setStatusFilter(tab.id)}
              className="btn btn-sm"
              style={{
                fontSize: '0.775rem',
                background: statusFilter === tab.id ? 'var(--primary)' : 'rgba(255,255,255,0.05)',
                color: statusFilter === tab.id ? '#ffffff' : 'var(--text-secondary)',
                border: '1px solid var(--border-subtle)'
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Severity Selector */}
        <select
          value={severityFilter}
          onChange={(e) => setSeverityFilter(e.target.value)}
          className="input-control"
          style={{ height: '36px', fontSize: '0.8rem', width: 'auto' }}
        >
          <option value="all">All Severities</option>
          <option value="critical">Critical Only</option>
          <option value="warning">Warning Only</option>
          <option value="info">Info Only</option>
        </select>
      </div>

      {/* Alerts List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {filteredAlerts.length === 0 ? (
          <div className="glass-card" style={{ padding: '3rem', textAlign: 'center' }}>
            <CheckCircle2 size={36} color="#34d399" style={{ margin: '0 auto 0.75rem auto' }} />
            <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-primary)' }}>
              All Systems Healthy
            </h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
              No incidents match your current filter criteria.
            </p>
          </div>
        ) : (
          filteredAlerts.map((alt) => {
            const isResolved = alt.status === 'resolved';
            const isAcknowledged = alt.status === 'acknowledged';

            return (
              <div
                key={alt.id}
                className="glass-card"
                style={{
                  padding: '1.25rem 1.5rem',
                  borderColor: alt.status === 'active' ? 'rgba(244, 63, 94, 0.3)' : 'var(--border-subtle)',
                  background: alt.status === 'active' ? 'rgba(244, 63, 94, 0.04)' : 'var(--bg-card)'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '1rem', flexWrap: 'wrap' }}>
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.85rem' }}>
                    <div style={{ marginTop: '2px' }}>
                      <AlertSeverityBadge severity={alt.severity} />
                    </div>
                    <div>
                      <h3 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.25rem' }}>
                        {alt.title}
                      </h3>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', fontSize: '0.775rem', color: 'var(--text-muted)' }}>
                        <span>Target: <strong style={{ color: 'var(--text-secondary)' }}>{alt.service}</strong></span>
                        <span>•</span>
                        <span>Provider: <strong>{alt.provider}</strong></span>
                        <span>•</span>
                        <span>Timestamp: {alt.timestamp}</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <AlertStatusBadge status={alt.status} />
                  </div>
                </div>

                <div
                  style={{
                    margin: '1rem 0',
                    padding: '0.85rem 1rem',
                    borderRadius: 'var(--radius-md)',
                    background: 'rgba(0,0,0,0.2)',
                    fontSize: '0.85rem',
                    color: 'var(--text-secondary)',
                    lineHeight: 1.5
                  }}
                >
                  {alt.message}
                </div>

                {/* Actions Footer */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid var(--border-subtle)', paddingTop: '0.85rem' }}>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                    Incident ID: <span style={{ fontFamily: 'var(--font-mono)' }}>{alt.id}</span>
                  </div>

                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    {!isResolved && !isAcknowledged && (
                      <button
                        onClick={() => acknowledgeAlert(alt.id)}
                        className="btn btn-secondary btn-sm"
                      >
                        Acknowledge
                      </button>
                    )}

                    {!isResolved && (
                      <button
                        onClick={() => resolveAlert(alt.id)}
                        className="btn btn-emerald btn-sm"
                      >
                        <CheckCheck size={14} /> Resolve Incident
                      </button>
                    )}

                    {isResolved && (
                      <span style={{ fontSize: '0.8rem', color: '#34d399', display: 'flex', alignItems: 'center', gap: '4px', fontWeight: 600 }}>
                        <CheckCircle2 size={14} /> Closed
                      </span>
                    )}
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
