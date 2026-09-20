import React from 'react';
import { useCloudData } from '../context/CloudDataContext';
import {
  LayoutDashboard,
  Activity,
  Server,
  AlertTriangle,
  FileBarChart2,
  Settings,
  ShieldCheck,
  ChevronRight,
  Sparkles,
  CloudLightning
} from 'lucide-react';

export const Sidebar = ({ activePage, setActivePage, isOpen, onClose }) => {
  const { alerts, runningServicesCount, totalServicesCount } = useCloudData();

  const activeAlertsCount = alerts.filter(a => a.status === 'active').length;

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'monitoring', label: 'Resource Monitoring', icon: Activity },
    { id: 'services', label: 'Cloud Services', icon: Server, badge: `${runningServicesCount}/${totalServicesCount}` },
    { id: 'alerts', label: 'Incidents & Alerts', icon: AlertTriangle, alertBadge: activeAlertsCount },
    { id: 'reports', label: 'Analytics & Reports', icon: FileBarChart2 },
    { id: 'settings', label: 'System Settings', icon: Settings }
  ];

  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && (
        <div
          onClick={onClose}
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0,0,0,0.6)',
            zIndex: 950,
            backdropFilter: 'blur(4px)'
          }}
          className="sidebar-backdrop"
        />
      )}

      <aside
        className={`sidebar-container ${isOpen ? 'sidebar-open' : ''}`}
        style={{
          width: 'var(--sidebar-width)',
          background: 'var(--bg-secondary)',
          borderRight: '1px solid var(--border-subtle)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '1.5rem 1rem',
          flexShrink: 0,
          zIndex: 960,
          transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
        }}
      >
        {/* Navigation list */}
        <div>
          <div style={{ padding: '0 0.75rem 1.25rem 0.75rem', borderBottom: '1px solid var(--border-subtle)', marginBottom: '1rem' }}>
            <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
              Cloud Infrastructure
            </span>
          </div>

          <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activePage === item.id;

              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActivePage(item.id);
                    if (onClose) onClose();
                  }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '0.75rem 0.9rem',
                    borderRadius: 'var(--radius-md)',
                    border: 'none',
                    background: isActive ? 'var(--primary-gradient)' : 'transparent',
                    color: isActive ? '#ffffff' : 'var(--text-secondary)',
                    fontWeight: isActive ? 700 : 500,
                    fontSize: '0.88rem',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    boxShadow: isActive ? 'var(--shadow-glow-indigo)' : 'none',
                    textAlign: 'left'
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.background = 'rgba(255,255,255,0.05)';
                      e.currentTarget.style.color = 'var(--text-primary)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.background = 'transparent';
                      e.currentTarget.style.color = 'var(--text-secondary)';
                    }
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <Icon size={18} color={isActive ? '#ffffff' : 'inherit'} />
                    <span>{item.label}</span>
                  </div>

                  {item.alertBadge > 0 && (
                    <span
                      style={{
                        background: isActive ? '#ffffff' : '#f43f5e',
                        color: isActive ? '#f43f5e' : '#ffffff',
                        fontSize: '0.7rem',
                        fontWeight: 800,
                        padding: '2px 7px',
                        borderRadius: 'var(--radius-full)',
                        minWidth: '20px',
                        textAlign: 'center',
                        boxShadow: '0 0 10px rgba(244, 63, 94, 0.4)'
                      }}
                    >
                      {item.alertBadge}
                    </span>
                  )}

                  {item.badge && !item.alertBadge && (
                    <span
                      style={{
                        background: isActive ? 'rgba(255,255,255,0.25)' : 'rgba(255,255,255,0.08)',
                        color: isActive ? '#ffffff' : 'var(--text-muted)',
                        fontSize: '0.7rem',
                        fontWeight: 600,
                        padding: '2px 6px',
                        borderRadius: '4px'
                      }}
                    >
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Bottom health card */}
        <div>
          <div
            className="glass-card"
            style={{
              padding: '1rem',
              background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.08) 0%, rgba(6, 182, 212, 0.08) 100%)',
              borderColor: 'rgba(16, 185, 129, 0.25)'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.4rem' }}>
              <ShieldCheck size={16} color="#34d399" />
              <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#34d399' }}>
                System SLA: 99.98%
              </span>
            </div>
            <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', lineHeight: 1.4 }}>
              Multi-Region High Availability clusters active.
            </p>
            <div style={{ marginTop: '0.6rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.7rem', color: 'var(--text-muted)' }}>
              <span>Live Nodes</span>
              <strong style={{ color: 'var(--text-primary)' }}>{runningServicesCount} Online</strong>
            </div>
          </div>

          <div style={{ marginTop: '1rem', padding: '0 0.5rem', textAlign: 'center', fontSize: '0.72rem', color: 'var(--text-muted)' }}>
            College Project • 2026
          </div>
        </div>
      </aside>

      <style>{`
        @media (max-width: 900px) {
          .sidebar-container {
            position: fixed;
            top: 70px;
            bottom: 0;
            left: 0;
            transform: translateX(-100%);
          }
          .sidebar-open {
            transform: translateX(0);
          }
        }
      `}</style>
    </>
  );
};
