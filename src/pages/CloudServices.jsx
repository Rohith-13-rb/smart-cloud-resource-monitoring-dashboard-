import React, { useState } from 'react';
import { useCloudData } from '../context/CloudDataContext';
import { ServiceCard } from '../components/ServiceCard';
import { QuickActionsModal } from '../components/QuickActionsModal';
import {
  Server,
  Plus,
  Search,
  Filter,
  CheckCircle2,
  AlertTriangle,
  Play,
  Square,
  Layers,
  HardDrive,
  Cpu,
  Database,
  Cloud
} from 'lucide-react';

export const CloudServices = () => {
  const {
    services,
    runningServicesCount,
    stoppedServicesCount,
    toggleServiceStatus,
    restartService,
    scaleService,
    totalMonthlyCost
  } = useCloudData();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [selectedProvider, setSelectedProvider] = useState('All');
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Filtering logic
  const filteredServices = services.filter((srv) => {
    const matchesSearch =
      srv.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      srv.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
      srv.region.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory =
      selectedCategory === 'All' ||
      (selectedCategory === 'Compute' && srv.type.includes('Compute')) ||
      (selectedCategory === 'Kubernetes' && srv.type.includes('Kubernetes')) ||
      (selectedCategory === 'Databases' && (srv.type.includes('Database') || srv.type.includes('Cache'))) ||
      (selectedCategory === 'Storage' && srv.type.includes('Storage')) ||
      (selectedCategory === 'Serverless' && srv.type.includes('Serverless'));

    const matchesStatus =
      selectedStatus === 'All' ||
      (selectedStatus === 'Running' && srv.status === 'running') ||
      (selectedStatus === 'Stopped' && srv.status === 'stopped');

    const matchesProvider =
      selectedProvider === 'All' || srv.provider === selectedProvider;

    return matchesSearch && matchesCategory && matchesStatus && matchesProvider;
  });

  return (
    <div className="page-wrapper">
      {/* Page Header */}
      <div className="page-header">
        <div>
          <h1 className="page-title">
            <Server size={28} color="#6366f1" />
            Cloud Services & Compute Fleet
          </h1>
          <p className="page-subtitle">
            Manage, scale, start, stop, and restart simulated multi-cloud nodes across AWS, GCP, and Azure.
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="btn btn-primary"
        >
          <Plus size={16} /> Deploy New Service
        </button>
      </div>

      {/* Summary Stat Bar */}
      <div className="grid-cols-4" style={{ marginBottom: '1.5rem' }}>
        <div className="glass-card" style={{ padding: '1rem 1.25rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{ padding: '10px', borderRadius: 'var(--radius-md)', background: 'rgba(99,102,241,0.12)', color: '#818cf8' }}>
            <Layers size={22} />
          </div>
          <div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Total Services</div>
            <div style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-primary)', fontFamily: 'var(--font-mono)' }}>
              {services.length} Nodes
            </div>
          </div>
        </div>

        <div className="glass-card" style={{ padding: '1rem 1.25rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{ padding: '10px', borderRadius: 'var(--radius-md)', background: 'rgba(16,185,129,0.12)', color: '#34d399' }}>
            <CheckCircle2 size={22} />
          </div>
          <div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Active & Healthy</div>
            <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#34d399', fontFamily: 'var(--font-mono)' }}>
              {runningServicesCount} Running
            </div>
          </div>
        </div>

        <div className="glass-card" style={{ padding: '1rem 1.25rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{ padding: '10px', borderRadius: 'var(--radius-md)', background: 'rgba(244,63,94,0.12)', color: '#fb7185' }}>
            <AlertTriangle size={22} />
          </div>
          <div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Offline / Stopped</div>
            <div style={{ fontSize: '1.25rem', fontWeight: 800, color: stoppedServicesCount > 0 ? '#fb7185' : 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
              {stoppedServicesCount} Stopped
            </div>
          </div>
        </div>

        <div className="glass-card" style={{ padding: '1rem 1.25rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{ padding: '10px', borderRadius: 'var(--radius-md)', background: 'rgba(245,158,11,0.12)', color: '#fbbf24' }}>
            <Cloud size={22} />
          </div>
          <div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Total Fleet Spend</div>
            <div style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-primary)', fontFamily: 'var(--font-mono)' }}>
              ${totalMonthlyCost}/mo
            </div>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
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
        {/* Search */}
        <div style={{ position: 'relative', flex: '1', minWidth: '220px' }}>
          <Search size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
          <input
            type="text"
            placeholder="Search by name, region, or provider..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="input-control"
            style={{ paddingLeft: '36px', height: '38px', fontSize: '0.85rem' }}
          />
        </div>

        {/* Category Pills */}
        <div style={{ display: 'flex', gap: '0.35rem', overflowX: 'auto', padding: '2px' }}>
          {['All', 'Compute', 'Kubernetes', 'Databases', 'Storage', 'Serverless'].map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className="btn btn-sm"
              style={{
                fontSize: '0.775rem',
                background: selectedCategory === cat ? 'var(--primary)' : 'rgba(255,255,255,0.05)',
                color: selectedCategory === cat ? '#ffffff' : 'var(--text-secondary)',
                border: '1px solid var(--border-subtle)'
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Status & Provider Selects */}
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="input-control"
            style={{ height: '38px', fontSize: '0.8rem', width: 'auto' }}
          >
            <option value="All">All Statuses</option>
            <option value="Running">Running</option>
            <option value="Stopped">Stopped</option>
          </select>

          <select
            value={selectedProvider}
            onChange={(e) => setSelectedProvider(e.target.value)}
            className="input-control"
            style={{ height: '38px', fontSize: '0.8rem', width: 'auto' }}
          >
            <option value="All">All Providers</option>
            <option value="AWS">AWS Cloud</option>
            <option value="GCP">Google Cloud</option>
            <option value="Azure">Azure</option>
          </select>
        </div>
      </div>

      {/* Services Grid */}
      {filteredServices.length === 0 ? (
        <div
          className="glass-card"
          style={{
            padding: '3rem',
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.75rem'
          }}
        >
          <Server size={36} color="var(--text-muted)" />
          <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-primary)' }}>
            No Cloud Services Found
          </h3>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', maxWidth: '400px' }}>
            No services matched your current search filters. Try adjusting your query or deploy a new service.
          </p>
          <button onClick={() => { setSearchQuery(''); setSelectedCategory('All'); setSelectedStatus('All'); setSelectedProvider('All'); }} className="btn btn-secondary btn-sm">
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid-cols-2">
          {filteredServices.map((srv) => (
            <ServiceCard
              key={srv.id}
              service={srv}
              onToggleStatus={toggleServiceStatus}
              onRestart={restartService}
              onScale={scaleService}
            />
          ))}
        </div>
      )}

      {/* Provision Modal */}
      <QuickActionsModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
};
