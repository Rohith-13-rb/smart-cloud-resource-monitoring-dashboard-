import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useCloudData } from '../context/CloudDataContext';
import {
  Settings as SettingsIcon,
  User,
  Bell,
  Sliders,
  Shield,
  Save,
  RotateCcw,
  CheckCircle2,
  Cpu,
  Database,
  Cloud,
  Mail,
  MessageSquare,
  Zap
} from 'lucide-react';

export const Settings = () => {
  const { user, updateProfile, theme, toggleTheme } = useAuth();
  const {
    thresholds,
    setThresholds,
    notificationConfig,
    setNotificationConfig,
    refreshInterval,
    setRefreshInterval,
    addToast
  } = useCloudData();

  // Local Form state for user profile
  const [profileName, setProfileName] = useState(user?.name || 'Rohith R.');
  const [profileEmail, setProfileEmail] = useState(user?.email || 'admin@smartcloud.io');
  const [profileRole, setProfileRole] = useState(user?.role || 'Principal Cloud Architect');
  const [profileDepartment, setProfileDepartment] = useState(user?.department || 'Cloud Infrastructure & SRE');

  // Local state for thresholds
  const [localThresholds, setLocalThresholds] = useState({ ...thresholds });
  const [localNotifications, setLocalNotifications] = useState({ ...notificationConfig });
  const [localInterval, setLocalInterval] = useState(refreshInterval);

  const handleSaveProfile = (e) => {
    e.preventDefault();
    updateProfile({
      name: profileName,
      email: profileEmail,
      role: profileRole,
      department: profileDepartment
    });
    addToast('Profile Updated', 'Cloud Engineer profile saved successfully.', 'success');
  };

  const handleSaveSystemConfig = (e) => {
    e.preventDefault();
    setThresholds(localThresholds);
    setNotificationConfig(localNotifications);
    setRefreshInterval(Number(localInterval));
    addToast('Configuration Applied', 'Monitoring thresholds and notification channels updated.', 'success');
  };

  const handleResetDefaults = () => {
    const defaultThresholds = {
      cpuWarning: 75,
      cpuCritical: 90,
      memoryWarning: 80,
      memoryCritical: 90,
      storageWarning: 80,
      storageCritical: 90,
      latencyWarningMs: 80
    };
    const defaultNotifs = {
      emailAlerts: true,
      slackWebhook: true,
      smsAlerts: false,
      autoHealDegraded: true
    };
    setLocalThresholds(defaultThresholds);
    setLocalNotifications(defaultNotifs);
    setLocalInterval(3000);
    setThresholds(defaultThresholds);
    setNotificationConfig(defaultNotifs);
    setRefreshInterval(3000);
    addToast('Defaults Restored', 'Thresholds reset to factory baseline values.', 'info');
  };

  return (
    <div className="page-wrapper">
      {/* Page Header */}
      <div className="page-header">
        <div>
          <h1 className="page-title">
            <SettingsIcon size={28} color="#a855f7" />
            System Preferences & Alert Policies
          </h1>
          <p className="page-subtitle">
            Configure telemetry polling frequencies, threshold triggers, SRE notification webhooks, and admin profile.
          </p>
        </div>

        <button onClick={handleResetDefaults} className="btn btn-secondary btn-sm">
          <RotateCcw size={14} /> Reset Defaults
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: '1.5rem' }}>
        {/* Left Column: User Profile & Preferences */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {/* Admin Profile Card */}
          <div className="glass-card" style={{ padding: '1.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1.25rem' }}>
              <div style={{ padding: '6px', borderRadius: 'var(--radius-sm)', background: 'rgba(99,102,241,0.15)', color: '#818cf8' }}>
                <User size={18} />
              </div>
              <h2 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                Cloud Engineer Profile
              </h2>
            </div>

            <form onSubmit={handleSaveProfile}>
              <div style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '0.4rem' }}>
                  Full Name
                </label>
                <input
                  type="text"
                  value={profileName}
                  onChange={(e) => setProfileName(e.target.value)}
                  className="input-control"
                  required
                />
              </div>

              <div style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '0.4rem' }}>
                  Email Address
                </label>
                <input
                  type="email"
                  value={profileEmail}
                  onChange={(e) => setProfileEmail(e.target.value)}
                  className="input-control"
                  required
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '0.4rem' }}>
                    Role / Title
                  </label>
                  <input
                    type="text"
                    value={profileRole}
                    onChange={(e) => setProfileRole(e.target.value)}
                    className="input-control"
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '0.4rem' }}>
                    Department
                  </label>
                  <input
                    type="text"
                    value={profileDepartment}
                    onChange={(e) => setProfileDepartment(e.target.value)}
                    className="input-control"
                  />
                </div>
              </div>

              <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
                <Save size={15} /> Save Profile Changes
              </button>
            </form>
          </div>

          {/* Theme & Display Mode */}
          <div className="glass-card" style={{ padding: '1.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1rem' }}>
              <div style={{ padding: '6px', borderRadius: 'var(--radius-sm)', background: 'rgba(6,182,212,0.15)', color: '#22d3ee' }}>
                <Zap size={18} />
              </div>
              <h2 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                Interface & Theme Preferences
              </h2>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.75rem 0', borderBottom: '1px solid var(--border-subtle)' }}>
              <div>
                <div style={{ fontWeight: 600, fontSize: '0.875rem', color: 'var(--text-primary)' }}>
                  Visual Theme
                </div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                  Switch between Dark Cyber Cloud and High-Contrast Light
                </div>
              </div>
              <button onClick={toggleTheme} className="btn btn-secondary btn-sm">
                {theme === 'dark' ? '🌙 Dark Active' : '☀️ Light Active'}
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: Thresholds & Notification Policies */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div className="glass-card" style={{ padding: '1.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1.25rem' }}>
              <div style={{ padding: '6px', borderRadius: 'var(--radius-sm)', background: 'rgba(244,63,94,0.15)', color: '#fb7185' }}>
                <Sliders size={18} />
              </div>
              <h2 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                Dynamic Alarm Thresholds
              </h2>
            </div>

            <form onSubmit={handleSaveSystemConfig}>
              {/* CPU Warning Slider */}
              <div style={{ marginBottom: '1.25rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.35rem', fontSize: '0.825rem' }}>
                  <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>CPU Warning Threshold</span>
                  <span style={{ fontFamily: 'var(--font-mono)', color: '#fbbf24', fontWeight: 700 }}>{localThresholds.cpuWarning}%</span>
                </div>
                <input
                  type="range"
                  min="50"
                  max="95"
                  value={localThresholds.cpuWarning}
                  onChange={(e) => setLocalThresholds({ ...localThresholds, cpuWarning: Number(e.target.value) })}
                />
              </div>

              {/* CPU Critical Slider */}
              <div style={{ marginBottom: '1.25rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.35rem', fontSize: '0.825rem' }}>
                  <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>CPU Critical Trigger Threshold</span>
                  <span style={{ fontFamily: 'var(--font-mono)', color: '#fb7185', fontWeight: 700 }}>{localThresholds.cpuCritical}%</span>
                </div>
                <input
                  type="range"
                  min="70"
                  max="99"
                  value={localThresholds.cpuCritical}
                  onChange={(e) => setLocalThresholds({ ...localThresholds, cpuCritical: Number(e.target.value) })}
                />
              </div>

              {/* Memory Critical Slider */}
              <div style={{ marginBottom: '1.25rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.35rem', fontSize: '0.825rem' }}>
                  <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>Memory (RAM) Critical Threshold</span>
                  <span style={{ fontFamily: 'var(--font-mono)', color: '#c084fc', fontWeight: 700 }}>{localThresholds.memoryCritical}%</span>
                </div>
                <input
                  type="range"
                  min="60"
                  max="98"
                  value={localThresholds.memoryCritical}
                  onChange={(e) => setLocalThresholds({ ...localThresholds, memoryCritical: Number(e.target.value) })}
                />
              </div>

              {/* Latency Threshold */}
              <div style={{ marginBottom: '1.5rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.35rem', fontSize: '0.825rem' }}>
                  <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>Max Latency Alert Threshold</span>
                  <span style={{ fontFamily: 'var(--font-mono)', color: '#38bdf8', fontWeight: 700 }}>{localThresholds.latencyWarningMs} ms</span>
                </div>
                <input
                  type="range"
                  min="30"
                  max="250"
                  value={localThresholds.latencyWarningMs}
                  onChange={(e) => setLocalThresholds({ ...localThresholds, latencyWarningMs: Number(e.target.value) })}
                />
              </div>

              {/* Notification Toggles */}
              <div style={{ borderTop: '1px solid var(--border-subtle)', paddingTop: '1rem', marginBottom: '1.5rem' }}>
                <h3 style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <Bell size={16} color="#fbbf24" /> Notification Channels
                </h3>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  <label style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer' }}>
                    <span style={{ fontSize: '0.825rem', color: 'var(--text-secondary)' }}>Send Email on Critical Threshold</span>
                    <label className="switch">
                      <input
                        type="checkbox"
                        checked={localNotifications.emailAlerts}
                        onChange={(e) => setLocalNotifications({ ...localNotifications, emailAlerts: e.target.checked })}
                      />
                      <span className="slider" />
                    </label>
                  </label>

                  <label style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer' }}>
                    <span style={{ fontSize: '0.825rem', color: 'var(--text-secondary)' }}>Dispatch Slack Webhook Incident</span>
                    <label className="switch">
                      <input
                        type="checkbox"
                        checked={localNotifications.slackWebhook}
                        onChange={(e) => setLocalNotifications({ ...localNotifications, slackWebhook: e.target.checked })}
                      />
                      <span className="slider" />
                    </label>
                  </label>

                  <label style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer' }}>
                    <span style={{ fontSize: '0.825rem', color: 'var(--text-secondary)' }}>Autonomous Self-Healing on Degraded Nodes</span>
                    <label className="switch">
                      <input
                        type="checkbox"
                        checked={localNotifications.autoHealDegraded}
                        onChange={(e) => setLocalNotifications({ ...localNotifications, autoHealDegraded: e.target.checked })}
                      />
                      <span className="slider" />
                    </label>
                  </label>
                </div>
              </div>

              <button type="submit" className="btn btn-emerald" style={{ width: '100%' }}>
                <Save size={15} /> Apply System Thresholds & Policies
              </button>
            </form>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          div[style*="grid-template-columns: 1fr 1.2fr"] {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
};
