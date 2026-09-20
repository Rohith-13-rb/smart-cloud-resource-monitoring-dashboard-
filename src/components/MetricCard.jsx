import React from 'react';
import { ArrowUpRight, ArrowDownRight, Minus } from 'lucide-react';

export const MetricCard = ({
  title,
  value,
  unit = '%',
  icon: Icon,
  colorScheme = 'indigo', // indigo, cyan, emerald, amber, rose, purple
  trend = 0,
  trendLabel = 'vs last period',
  progress = null,
  subtitle,
  onClick
}) => {
  // Determine gradient color mapping
  const schemeStyles = {
    indigo: {
      bg: 'rgba(99, 102, 241, 0.12)',
      border: 'rgba(99, 102, 241, 0.25)',
      color: '#818cf8',
      bar: 'linear-gradient(90deg, #6366f1, #818cf8)'
    },
    cyan: {
      bg: 'rgba(6, 182, 212, 0.12)',
      border: 'rgba(6, 182, 212, 0.25)',
      color: '#22d3ee',
      bar: 'linear-gradient(90deg, #06b6d4, #22d3ee)'
    },
    emerald: {
      bg: 'rgba(16, 185, 129, 0.12)',
      border: 'rgba(16, 185, 129, 0.25)',
      color: '#34d399',
      bar: 'linear-gradient(90deg, #10b981, #34d399)'
    },
    amber: {
      bg: 'rgba(245, 158, 11, 0.12)',
      border: 'rgba(245, 158, 11, 0.25)',
      color: '#fbbf24',
      bar: 'linear-gradient(90deg, #f59e0b, #fbbf24)'
    },
    rose: {
      bg: 'rgba(244, 63, 94, 0.12)',
      border: 'rgba(244, 63, 94, 0.25)',
      color: '#fb7185',
      bar: 'linear-gradient(90deg, #f43f5e, #fb7185)'
    },
    purple: {
      bg: 'rgba(168, 85, 247, 0.12)',
      border: 'rgba(168, 85, 247, 0.25)',
      color: '#c084fc',
      bar: 'linear-gradient(90deg, #a855f7, #c084fc)'
    }
  }[colorScheme] || {
    bg: 'rgba(99, 102, 241, 0.12)',
    border: 'rgba(99, 102, 241, 0.25)',
    color: '#818cf8',
    bar: 'linear-gradient(90deg, #6366f1, #818cf8)'
  };

  const progressVal = progress !== null ? progress : (typeof value === 'number' ? value : null);

  return (
    <div
      className={`glass-card ${onClick ? 'glass-card-interactive' : ''}`}
      onClick={onClick}
      style={{
        borderLeft: `3px solid ${schemeStyles.color}`
      }}
    >
      <div className="metric-card-content">
        <div className="metric-header">
          <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-secondary)' }}>
            {title}
          </span>
          {Icon && (
            <div
              className="metric-icon-box"
              style={{
                background: schemeStyles.bg,
                border: `1px solid ${schemeStyles.border}`,
                color: schemeStyles.color
              }}
            >
              <Icon size={20} />
            </div>
          )}
        </div>

        <div className="metric-value-row">
          <span className="metric-value" style={{ color: schemeStyles.color }}>
            {value}
          </span>
          {unit && <span className="metric-unit">{unit}</span>}
        </div>

        {progressVal !== null && (
          <div className="progress-bar-container">
            <div
              className="progress-bar-fill"
              style={{
                width: `${Math.min(100, Math.max(0, progressVal))}%`,
                background:
                  progressVal > 88
                    ? 'linear-gradient(90deg, #f43f5e, #e11d48)'
                    : progressVal > 75
                    ? 'linear-gradient(90deg, #f59e0b, #fbbf24)'
                    : schemeStyles.bar
              }}
            />
          </div>
        )}

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '0.4rem' }}>
          {subtitle && (
            <span style={{ fontSize: '0.775rem', color: 'var(--text-muted)' }}>
              {subtitle}
            </span>
          )}
          {trend !== 0 && (
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.2rem',
                fontSize: '0.75rem',
                fontWeight: 600,
                color: trend > 0 ? (title.includes('Cost') || title.includes('CPU') || title.includes('RAM') ? '#fb7185' : '#34d399') : '#34d399'
              }}
            >
              {trend > 0 ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
              <span>{Math.abs(trend)}% {trendLabel}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
