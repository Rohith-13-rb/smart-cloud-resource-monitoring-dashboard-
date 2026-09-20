import React from 'react';
import { AlertCircle, AlertTriangle, Info, CheckCircle2 } from 'lucide-react';

export const AlertSeverityBadge = ({ severity }) => {
  switch (severity?.toLowerCase()) {
    case 'critical':
      return (
        <span className="badge badge-rose">
          <AlertCircle size={13} />
          Critical
        </span>
      );
    case 'warning':
      return (
        <span className="badge badge-amber">
          <AlertTriangle size={13} />
          Warning
        </span>
      );
    case 'info':
    default:
      return (
        <span className="badge badge-cyan">
          <Info size={13} />
          Info
        </span>
      );
  }
};

export const AlertStatusBadge = ({ status }) => {
  switch (status?.toLowerCase()) {
    case 'active':
      return (
        <span className="badge badge-rose" style={{ animation: 'pulse 2s infinite' }}>
          <span className="status-dot status-dot-rose" style={{ width: 6, height: 6 }} />
          Active
        </span>
      );
    case 'acknowledged':
      return (
        <span className="badge badge-amber">
          <span className="status-dot status-dot-amber" style={{ width: 6, height: 6 }} />
          In Progress
        </span>
      );
    case 'resolved':
    default:
      return (
        <span className="badge badge-emerald">
          <CheckCircle2 size={13} />
          Resolved
        </span>
      );
  }
};
