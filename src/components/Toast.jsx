import React from 'react';
import { useCloudData } from '../context/CloudDataContext';
import { CheckCircle2, AlertTriangle, AlertCircle, Info, X } from 'lucide-react';

export const ToastContainer = () => {
  const { toasts, removeToast } = useCloudData();

  if (!toasts || toasts.length === 0) return null;

  return (
    <div
      style={{
        position: 'fixed',
        bottom: '24px',
        right: '24px',
        zIndex: 9999,
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
        maxWidth: '400px',
        width: '100%',
        pointerEvents: 'none'
      }}
    >
      {toasts.map(toast => {
        const getIcon = () => {
          switch (toast.type) {
            case 'success':
              return <CheckCircle2 size={18} color="#34d399" />;
            case 'warning':
              return <AlertTriangle size={18} color="#fbbf24" />;
            case 'error':
              return <AlertCircle size={18} color="#fb7185" />;
            case 'info':
            default:
              return <Info size={18} color="#38bdf8" />;
          }
        };

        const getBorderColor = () => {
          switch (toast.type) {
            case 'success': return 'rgba(16, 185, 129, 0.4)';
            case 'warning': return 'rgba(245, 158, 11, 0.4)';
            case 'error': return 'rgba(244, 63, 94, 0.4)';
            case 'info':
            default: return 'rgba(6, 182, 212, 0.4)';
          }
        };

        return (
          <div
            key={toast.id}
            className="glass-card"
            style={{
              padding: '12px 16px',
              borderLeft: `4px solid ${toast.type === 'success' ? '#10b981' : toast.type === 'error' ? '#f43f5e' : toast.type === 'warning' ? '#f59e0b' : '#06b6d4'}`,
              borderColor: getBorderColor(),
              display: 'flex',
              alignItems: 'flex-start',
              gap: '12px',
              boxShadow: '0 8px 30px rgba(0,0,0,0.5)',
              pointerEvents: 'auto',
              animation: 'slideUp 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
            }}
          >
            <div style={{ marginTop: '2px' }}>{getIcon()}</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 700, fontSize: '0.875rem', color: 'var(--text-primary)' }}>
                {toast.title}
              </div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '2px' }}>
                {toast.message}
              </div>
            </div>
            <button
              onClick={() => removeToast(toast.id)}
              style={{
                background: 'transparent',
                border: 'none',
                color: 'var(--text-muted)',
                cursor: 'pointer',
                padding: '2px'
              }}
            >
              <X size={14} />
            </button>
          </div>
        );
      })}
    </div>
  );
};
