import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import {
  Cloud,
  Lock,
  Mail,
  Zap,
  ShieldCheck,
  Activity,
  Server,
  Sparkles,
  ArrowRight,
  Eye,
  EyeOff
} from 'lucide-react';

export const Login = () => {
  const { login, demoLogin } = useAuth();
  const [email, setEmail] = useState('admin@smartcloud.io');
  const [password, setPassword] = useState('demo1234');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      setTimeout(() => {
        login(email, password);
      }, 400);
    } catch (err) {
      setError(err.message || 'Login failed. Please check credentials.');
      setLoading(false);
    }
  };

  const handleDemoLogin = () => {
    setLoading(true);
    setTimeout(() => {
      demoLogin();
    }, 400);
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1.5rem',
        position: 'relative'
      }}
    >
      <div
        className="glass-card"
        style={{
          width: '100%',
          maxWidth: '1020px',
          display: 'grid',
          gridTemplateColumns: '1.1fr 1fr',
          borderRadius: 'var(--radius-xl)',
          overflow: 'hidden',
          boxShadow: 'var(--shadow-lg), var(--shadow-glow-indigo)',
          border: '1px solid rgba(255, 255, 255, 0.12)'
        }}
      >
        {/* Left Side: Presentation Info */}
        <div
          style={{
            background: 'linear-gradient(135deg, #0f172a 0%, #1e1b4b 50%, #090d16 100%)',
            padding: '3rem 2.5rem',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            borderRight: '1px solid var(--border-subtle)',
            position: 'relative'
          }}
        >
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
              <div
                style={{
                  width: '46px',
                  height: '46px',
                  borderRadius: 'var(--radius-md)',
                  background: 'var(--primary-gradient)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#fff',
                  boxShadow: 'var(--shadow-glow-indigo)'
                }}
              >
                <Cloud size={26} />
              </div>
              <div>
                <h1 style={{ fontSize: '1.35rem', fontWeight: 800, color: '#fff', letterSpacing: '-0.02em' }}>
                  Smart Cloud
                </h1>
                <div style={{ fontSize: '0.75rem', color: '#a5b4fc', fontWeight: 600 }}>
                  RESOURCE MONITORING DASHBOARD
                </div>
              </div>
            </div>

            <h2 style={{ fontSize: '1.75rem', fontWeight: 800, lineHeight: 1.25, marginBottom: '1rem', color: '#f8fafc' }}>
              Intelligent Multi-Cloud Telemetry & Infrastructure SRE
            </h2>

            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.6, marginBottom: '2rem' }}>
              A real-time cloud resource observatory designed for college evaluation. Monitor compute instances, memory load, disk IOPS, dynamic alert triggers, and automated SLA reporting.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: '#e2e8f0', fontSize: '0.85rem' }}>
                <div style={{ padding: '6px', borderRadius: '50%', background: 'rgba(99,102,241,0.2)', color: '#818cf8' }}>
                  <Activity size={16} />
                </div>
                <span>Live rolling telemetry with interactive tick controls</span>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: '#e2e8f0', fontSize: '0.85rem' }}>
                <div style={{ padding: '6px', borderRadius: '50%', background: 'rgba(6,182,212,0.2)', color: '#22d3ee' }}>
                  <Server size={16} />
                </div>
                <span>AWS, GCP & Azure simulated compute instances & microservices</span>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: '#e2e8f0', fontSize: '0.85rem' }}>
                <div style={{ padding: '6px', borderRadius: '50%', background: 'rgba(16,185,129,0.2)', color: '#34d399' }}>
                  <ShieldCheck size={16} />
                </div>
                <span>Incident triage, alert acknowledgment & chaos load testing</span>
              </div>
            </div>
          </div>

          <div style={{ marginTop: '2.5rem', paddingTop: '1.25rem', borderTop: '1px solid rgba(255,255,255,0.08)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Cloud Computing Project</span>
            <span className="badge badge-emerald" style={{ fontSize: '0.7rem' }}>SLA 99.98% Active</span>
          </div>
        </div>

        {/* Right Side: Login Form */}
        <div style={{ padding: '3rem 2.5rem', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <div style={{ marginBottom: '1.75rem' }}>
            <h3 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '0.35rem' }}>
              Sign In to Console
            </h3>
            <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
              Enter your credentials or use the 1-Click Demo Guest button.
            </p>
          </div>

          {error && (
            <div
              style={{
                background: 'rgba(244, 63, 94, 0.12)',
                border: '1px solid rgba(244, 63, 94, 0.3)',
                padding: '0.75rem 1rem',
                borderRadius: 'var(--radius-md)',
                color: '#fb7185',
                fontSize: '0.85rem',
                marginBottom: '1.25rem'
              }}
            >
              {error}
            </div>
          )}

          {/* 1-Click Demo Login Banner */}
          <button
            type="button"
            onClick={handleDemoLogin}
            disabled={loading}
            className="btn btn-primary btn-lg"
            style={{
              width: '100%',
              marginBottom: '1.5rem',
              background: 'linear-gradient(135deg, #06b6d4 0%, #3b82f6 50%, #6366f1 100%)',
              fontWeight: 700,
              fontSize: '0.95rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem'
            }}
          >
            <Zap size={18} />
            <span>⚡ 1-Click Demo Login (College Demo)</span>
          </button>

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '1rem',
              margin: '0.5rem 0 1.5rem 0',
              color: 'var(--text-muted)',
              fontSize: '0.75rem'
            }}
          >
            <div style={{ flex: 1, height: '1px', background: 'var(--border-subtle)' }} />
            <span>OR SIGN IN WITH CREDENTIALS</span>
            <div style={{ flex: 1, height: '1px', background: 'var(--border-subtle)' }} />
          </div>

          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: '1.25rem' }}>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '0.4rem' }}>
                Email Address
              </label>
              <div style={{ position: 'relative' }}>
                <Mail size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@smartcloud.io"
                  className="input-control"
                  style={{ paddingLeft: '38px' }}
                  required
                />
              </div>
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '0.4rem' }}>
                Password
              </label>
              <div style={{ position: 'relative' }}>
                <Lock size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="input-control"
                  style={{ paddingLeft: '38px', paddingRight: '38px' }}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{
                    position: 'absolute',
                    right: '12px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    background: 'transparent',
                    border: 'none',
                    color: 'var(--text-muted)',
                    cursor: 'pointer'
                  }}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn btn-secondary"
              style={{ width: '100%', padding: '0.75rem', fontWeight: 600 }}
            >
              <span>{loading ? 'Authenticating...' : 'Sign In as Cloud Engineer'}</span>
              <ArrowRight size={16} />
            </button>
          </form>

          <div style={{ marginTop: '1.5rem', textAlign: 'center', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
            Demo User: <strong>admin@smartcloud.io</strong> • Pass: <strong>demo1234</strong>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 860px) {
          .glass-card {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
};
