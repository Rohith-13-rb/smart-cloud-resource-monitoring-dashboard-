import React, { useState } from 'react';
import { useCloudData } from '../context/CloudDataContext';
import { X, Plus, Zap, RefreshCw, Server, Database, ShieldAlert, Cpu } from 'lucide-react';

export const QuickActionsModal = ({ isOpen, onClose }) => {
  const {
    services,
    addToast,
    triggerSimulatedLoadSpike,
    selectedProviderFilter
  } = useCloudData();

  const [activeTab, setActiveTab] = useState('add'); // 'add', 'simulate', 'tools'
  const [newServiceName, setNewServiceName] = useState('');
  const [newServiceType, setNewServiceType] = useState('Compute Instance');
  const [newServiceProvider, setNewServiceProvider] = useState('AWS');
  const [newServiceRegion, setNewServiceRegion] = useState('us-east-1 (N. Virginia)');
  const [newServiceInstances, setNewServiceInstances] = useState(2);

  if (!isOpen) return null;

  const handleCreateService = (e) => {
    e.preventDefault();
    if (!newServiceName.trim()) {
      addToast('Validation Error', 'Please enter a valid service identifier.', 'warning');
      return;
    }

    const created = {
      id: 'srv-' + Date.now().toString().slice(-4),
      name: newServiceName.toLowerCase().replace(/\s+/g, '-'),
      type: newServiceType,
      provider: newServiceProvider,
      region: newServiceRegion,
      zone: `${newServiceRegion.split(' ')[0]}-a`,
      status: 'running',
      cpuUsage: Math.floor(25 + Math.random() * 30),
      ramUsage: Math.floor(35 + Math.random() * 30),
      diskUsage: 20,
      networkIo: Math.floor(100 + Math.random() * 500),
      uptime: 'Just provisioned',
      costPerHour: 0.145,
      instances: parseInt(newServiceInstances, 10),
      ip: `10.0.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`
    };

    services.push(created);
    addToast('Service Provisioned', `Provisioned '${created.name}' on ${created.provider} successfully!`, 'success');
    setNewServiceName('');
    onClose();
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        {/* Modal Header */}
        <div style={{ padding: '1.25rem 1.5rem', borderBottom: '1px solid var(--border-subtle)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <div style={{ padding: '6px', borderRadius: 'var(--radius-sm)', background: 'var(--primary-gradient)', color: '#fff' }}>
              <Zap size={18} />
            </div>
            <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--text-primary)' }}>
              Cloud Operations Center
            </h3>
          </div>
          <button
            onClick={onClose}
            className="btn btn-ghost btn-sm"
            style={{ padding: '6px', borderRadius: '50%' }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Modal Tabs */}
        <div style={{ display: 'flex', borderBottom: '1px solid var(--border-subtle)', background: 'rgba(0,0,0,0.2)' }}>
          <button
            onClick={() => setActiveTab('add')}
            style={{
              flex: 1,
              padding: '0.75rem',
              background: activeTab === 'add' ? 'rgba(99,102,241,0.15)' : 'transparent',
              border: 'none',
              borderBottom: activeTab === 'add' ? '2px solid var(--primary)' : '2px solid transparent',
              color: activeTab === 'add' ? 'var(--primary-light)' : 'var(--text-secondary)',
              fontWeight: 600,
              fontSize: '0.85rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.4rem'
            }}
          >
            <Plus size={15} /> Provision Service
          </button>
          <button
            onClick={() => setActiveTab('simulate')}
            style={{
              flex: 1,
              padding: '0.75rem',
              background: activeTab === 'simulate' ? 'rgba(244,63,94,0.15)' : 'transparent',
              border: 'none',
              borderBottom: activeTab === 'simulate' ? '2px solid var(--rose)' : '2px solid transparent',
              color: activeTab === 'simulate' ? '#fb7185' : 'var(--text-secondary)',
              fontWeight: 600,
              fontSize: '0.85rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.4rem'
            }}
          >
            <ShieldAlert size={15} /> Chaos Simulation
          </button>
        </div>

        {/* Modal Body */}
        <div style={{ padding: '1.5rem' }}>
          {activeTab === 'add' ? (
            <form onSubmit={handleCreateService}>
              <div style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.4rem', color: 'var(--text-secondary)' }}>
                  Service / Node Name
                </label>
                <input
                  type="text"
                  placeholder="e.g. payment-worker-v2, search-elastic-node"
                  value={newServiceName}
                  onChange={(e) => setNewServiceName(e.target.value)}
                  className="input-control"
                  required
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.4rem', color: 'var(--text-secondary)' }}>
                    Service Type
                  </label>
                  <select
                    value={newServiceType}
                    onChange={(e) => setNewServiceType(e.target.value)}
                    className="input-control"
                  >
                    <option value="Compute Instance">Compute Instance (VM)</option>
                    <option value="Kubernetes Cluster">Kubernetes Pod Cluster</option>
                    <option value="Managed Database">PostgreSQL / SQL Managed</option>
                    <option value="In-Memory Cache">Redis / Memcached</option>
                    <option value="Serverless Functions">Serverless / Lambda</option>
                    <option value="Object Storage">S3 / Cloud Storage</option>
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.4rem', color: 'var(--text-secondary)' }}>
                    Cloud Provider
                  </label>
                  <select
                    value={newServiceProvider}
                    onChange={(e) => setNewServiceProvider(e.target.value)}
                    className="input-control"
                  >
                    <option value="AWS">Amazon Web Services (AWS)</option>
                    <option value="GCP">Google Cloud Platform (GCP)</option>
                    <option value="Azure">Microsoft Azure</option>
                  </select>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.4rem', color: 'var(--text-secondary)' }}>
                    Target Region
                  </label>
                  <select
                    value={newServiceRegion}
                    onChange={(e) => setNewServiceRegion(e.target.value)}
                    className="input-control"
                  >
                    <option value="us-east-1 (N. Virginia)">us-east-1 (N. Virginia)</option>
                    <option value="us-west-2 (Oregon)">us-west-2 (Oregon)</option>
                    <option value="europe-west1 (Belgium)">europe-west1 (Belgium)</option>
                    <option value="ap-south-1 (Mumbai)">ap-south-1 (Mumbai)</option>
                    <option value="eastus (Virginia)">eastus (Azure)</option>
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.4rem', color: 'var(--text-secondary)' }}>
                    Initial Node Count
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="12"
                    value={newServiceInstances}
                    onChange={(e) => setNewServiceInstances(e.target.value)}
                    className="input-control"
                  />
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem' }}>
                <button type="button" onClick={onClose} className="btn btn-secondary">
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  <Plus size={16} /> Deploy Cloud Service
                </button>
              </div>
            </form>
          ) : (
            <div>
              <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '1.25rem' }}>
                Chaos testing helps evaluate how your alert rules and monitoring widgets react to simulated real-world failures and massive traffic spikes.
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div
                  className="glass-card"
                  style={{
                    padding: '1rem',
                    borderColor: 'rgba(244, 63, 94, 0.3)',
                    background: 'rgba(244, 63, 94, 0.05)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '1rem'
                  }}
                >
                  <div>
                    <div style={{ fontWeight: 700, color: '#fb7185', fontSize: '0.925rem' }}>
                      Traffic Surge Spike (300% Load)
                    </div>
                    <div style={{ fontSize: '0.775rem', color: 'var(--text-muted)' }}>
                      Trips CPU & RAM beyond 90%, generates critical incident alert.
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      triggerSimulatedLoadSpike();
                      onClose();
                    }}
                    className="btn btn-rose btn-sm"
                  >
                    <Zap size={14} /> Inject Spike
                  </button>
                </div>

                <div
                  className="glass-card"
                  style={{
                    padding: '1rem',
                    borderColor: 'rgba(6, 182, 212, 0.3)',
                    background: 'rgba(6, 182, 212, 0.05)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '1rem'
                  }}
                >
                  <div>
                    <div style={{ fontWeight: 700, color: '#38bdf8', fontSize: '0.925rem' }}>
                      Purge Memory Cache (Redis Cluster)
                    </div>
                    <div style={{ fontSize: '0.775rem', color: 'var(--text-muted)' }}>
                      Simulates cache invalidation and drops cache memory usage.
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      addToast('Cache Purged', 'Redis in-memory cache flushed clean.', 'info');
                      onClose();
                    }}
                    className="btn btn-cyan btn-sm"
                  >
                    <RefreshCw size={14} /> Flush Cache
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
