import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useCloudData } from '../context/CloudDataContext';
import {
  Cloud,
  Play,
  Pause,
  Zap,
  Plus,
  Sun,
  Moon,
  LogOut,
  User,
  Shield,
  Search,
  Filter,
  Layers,
  Menu
} from 'lucide-react';
import { QuickActionsModal } from './QuickActionsModal';

export const Navbar = ({ onToggleSidebar }) => {
  const { user, logout, theme, toggleTheme } = useAuth();
  const {
    isLiveStreaming,
    setIsLiveStreaming,
    selectedProviderFilter,
    setSelectedProviderFilter,
    triggerSimulatedLoadSpike
  } = useCloudData();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);

  return (
    <>
      <header
        style={{
          height: '70px',
          background: 'var(--bg-card)',
          backdropFilter: 'blur(16px)',
          borderBottom: '1px solid var(--border-subtle)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 1.75rem',
          position: 'sticky',
          top: 0,
          zIndex: 900
        }}
      >
        {/* Left Side: Mobile Toggle & Brand */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <button
            onClick={onToggleSidebar}
            className="btn btn-ghost btn-sm mobile-menu-btn"
            style={{ display: 'none', padding: '6px' }}
          >
            <Menu size={20} />
          </button>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div
              style={{
                width: '38px',
                height: '38px',
                borderRadius: 'var(--radius-md)',
                background: 'var(--primary-gradient)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#fff',
                boxShadow: 'var(--shadow-glow-indigo)'
              }}
            >
              <Cloud size={22} />
            </div>
            <div>
              <div style={{ fontWeight: 800, fontSize: '1.05rem', letterSpacing: '-0.02em', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span>SmartCloud</span>
                <span style={{ fontSize: '0.7rem', padding: '2px 6px', background: 'rgba(99,102,241,0.2)', color: '#a5b4fc', borderRadius: '4px', fontWeight: 600 }}>
                  MONITOR v2.4
                </span>
              </div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                College Project Telemetry Suite
              </div>
            </div>
          </div>
        </div>

        {/* Center: Live Ticker & Provider Filter */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          {/* Live Telemetry Ticker Toggle */}
          <button
            onClick={() => setIsLiveStreaming(!isLiveStreaming)}
            className="btn btn-secondary btn-sm"
            style={{
              borderColor: isLiveStreaming ? 'rgba(16,185,129,0.3)' : 'rgba(255,255,255,0.1)',
              background: isLiveStreaming ? 'rgba(16,185,129,0.08)' : 'rgba(30,41,59,0.5)'
            }}
            title={isLiveStreaming ? 'Click to Pause Live Telemetry' : 'Click to Resume Live Stream'}
          >
            <span
              className={`status-dot ${isLiveStreaming ? 'status-dot-emerald' : 'status-dot-amber'}`}
            />
            <span style={{ fontSize: '0.8rem', fontWeight: 600, color: isLiveStreaming ? '#34d399' : '#fbbf24' }}>
              {isLiveStreaming ? 'LIVE STREAM' : 'PAUSED'}
            </span>
            {isLiveStreaming ? <Pause size={13} style={{ marginLeft: 2 }} /> : <Play size={13} style={{ marginLeft: 2 }} />}
          </button>

          {/* Provider Filter */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <select
              value={selectedProviderFilter}
              onChange={(e) => setSelectedProviderFilter(e.target.value)}
              className="input-control"
              style={{
                padding: '0.35rem 0.75rem',
                fontSize: '0.8rem',
                width: 'auto',
                minWidth: '130px',
                height: '34px'
              }}
            >
              <option value="All Providers">🌐 All Clouds</option>
              <option value="AWS">🟧 AWS Cloud</option>
              <option value="GCP">🟦 Google Cloud</option>
              <option value="Azure">🔷 MS Azure</option>
            </select>
          </div>
        </div>

        {/* Right Side: Chaos Spike Button, Quick Deploy, Theme & Profile */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
          {/* Chaos / Spike Load Simulation Button */}
          <button
            onClick={triggerSimulatedLoadSpike}
            className="btn btn-rose btn-sm"
            style={{ height: '34px' }}
            title="Inject simulated load spike (High traffic alert demo)"
          >
            <Zap size={14} />
            <span className="hide-mobile">Simulate Spike</span>
          </button>

          {/* Provision Modal Trigger */}
          <button
            onClick={() => setIsModalOpen(true)}
            className="btn btn-primary btn-sm"
            style={{ height: '34px' }}
          >
            <Plus size={15} />
            <span className="hide-mobile">Deploy Node</span>
          </button>

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="btn btn-ghost btn-sm"
            style={{ padding: '7px', borderRadius: 'var(--radius-md)' }}
            title="Toggle Light/Dark Theme"
          >
            {theme === 'dark' ? <Sun size={18} color="#fbbf24" /> : <Moon size={18} color="#6366f1" />}
          </button>

          {/* User Profile dropdown */}
          <div style={{ position: 'relative' }}>
            <button
              onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.6rem',
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid var(--border-subtle)',
                borderRadius: 'var(--radius-full)',
                padding: '4px 10px 4px 4px',
                cursor: 'pointer',
                color: 'var(--text-primary)'
              }}
            >
              <img
                src={user?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=256'}
                alt="Avatar"
                style={{ width: '28px', height: '28px', borderRadius: '50%', objectFit: 'cover' }}
              />
              <span style={{ fontSize: '0.825rem', fontWeight: 600 }} className="hide-mobile">
                {user?.name?.split(' ')[0] || 'Admin'}
              </span>
            </button>

            {isProfileDropdownOpen && (
              <div
                className="glass-card"
                style={{
                  position: 'absolute',
                  right: 0,
                  top: '44px',
                  width: '240px',
                  padding: '1rem',
                  boxShadow: 'var(--shadow-lg)',
                  zIndex: 999,
                  background: 'var(--bg-card-solid)'
                }}
              >
                <div style={{ borderBottom: '1px solid var(--border-subtle)', paddingBottom: '0.75rem', marginBottom: '0.75rem' }}>
                  <div style={{ fontWeight: 700, fontSize: '0.9rem', color: 'var(--text-primary)' }}>
                    {user?.name || 'DevOps Lead'}
                  </div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                    {user?.email || 'admin@smartcloud.io'}
                  </div>
                  <div style={{ display: 'inline-flex', marginTop: '0.4rem' }}>
                    <span className="badge badge-indigo" style={{ fontSize: '0.65rem' }}>
                      <Shield size={10} /> {user?.role || 'Admin'}
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => {
                    setIsProfileDropdownOpen(false);
                    logout();
                  }}
                  className="btn btn-ghost btn-sm"
                  style={{ width: '100%', justifyContent: 'flex-start', color: '#fb7185' }}
                >
                  <LogOut size={15} /> Sign Out
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Modal */}
      <QuickActionsModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

      <style>{`
        @media (max-width: 768px) {
          .mobile-menu-btn { display: inline-flex !important; }
          .hide-mobile { display: none !important; }
        }
      `}</style>
    </>
  );
};
