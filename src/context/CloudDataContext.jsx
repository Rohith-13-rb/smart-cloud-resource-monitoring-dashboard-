import React, { createContext, useContext, useState, useEffect, useRef, useCallback } from 'react';

const CloudDataContext = createContext();

const INITIAL_SERVICES = [
  {
    id: 'srv-001',
    name: 'api-gateway-prod',
    type: 'Compute / Load Balancer',
    provider: 'AWS',
    region: 'us-east-1 (N. Virginia)',
    zone: 'us-east-1a',
    status: 'running',
    cpuUsage: 48,
    ramUsage: 62,
    diskUsage: 35,
    networkIo: 840, // Mbps
    uptime: '42 days 14 hrs',
    costPerHour: 0.192,
    instances: 4,
    ip: '52.94.218.41'
  },
  {
    id: 'srv-002',
    name: 'k8s-worker-cluster-01',
    type: 'Kubernetes Cluster',
    provider: 'GCP',
    region: 'europe-west1 (Belgium)',
    zone: 'europe-west1-b',
    status: 'running',
    cpuUsage: 76,
    ramUsage: 84,
    diskUsage: 68,
    networkIo: 1250,
    uptime: '18 days 6 hrs',
    costPerHour: 0.480,
    instances: 8,
    ip: '35.205.112.89'
  },
  {
    id: 'srv-003',
    name: 'auth-microservice-node',
    type: 'Compute Instance',
    provider: 'AWS',
    region: 'us-east-1 (N. Virginia)',
    zone: 'us-east-1b',
    status: 'running',
    cpuUsage: 32,
    ramUsage: 45,
    diskUsage: 22,
    networkIo: 310,
    uptime: '89 days 2 hrs',
    costPerHour: 0.096,
    instances: 2,
    ip: '54.162.88.19'
  },
  {
    id: 'srv-004',
    name: 'postgres-primary-db',
    type: 'Managed Database',
    provider: 'Azure',
    region: 'eastus (Virginia)',
    zone: 'eastus-1',
    status: 'running',
    cpuUsage: 64,
    ramUsage: 78,
    diskUsage: 82,
    networkIo: 560,
    uptime: '124 days 21 hrs',
    costPerHour: 0.650,
    instances: 1,
    ip: '20.42.10.15'
  },
  {
    id: 'srv-005',
    name: 'redis-cache-cluster',
    type: 'In-Memory Cache',
    provider: 'AWS',
    region: 'us-east-1 (N. Virginia)',
    zone: 'us-east-1c',
    status: 'running',
    cpuUsage: 22,
    ramUsage: 71,
    diskUsage: 14,
    networkIo: 920,
    uptime: '65 days 11 hrs',
    costPerHour: 0.120,
    instances: 3,
    ip: '52.70.142.33'
  },
  {
    id: 'srv-006',
    name: 'ai-inference-gpu-node',
    type: 'GPU Compute / ML',
    provider: 'GCP',
    region: 'us-central1 (Iowa)',
    zone: 'us-central1-a',
    status: 'running',
    cpuUsage: 89,
    ramUsage: 91,
    diskUsage: 45,
    networkIo: 1680,
    uptime: '4 days 19 hrs',
    costPerHour: 1.450,
    instances: 2,
    ip: '34.68.210.77'
  },
  {
    id: 'srv-007',
    name: 's3-telemetry-lake',
    type: 'Object Storage Bucket',
    provider: 'AWS',
    region: 'us-west-2 (Oregon)',
    zone: 'us-west-2a',
    status: 'running',
    cpuUsage: 15,
    ramUsage: 25,
    diskUsage: 74,
    networkIo: 430,
    uptime: '310 days 0 hrs',
    costPerHour: 0.055,
    instances: 1,
    ip: 's3.us-west-2.amazonaws.com'
  },
  {
    id: 'srv-008',
    name: 'payment-webhook-pipeline',
    type: 'Serverless Functions',
    provider: 'AWS',
    region: 'us-east-1 (N. Virginia)',
    zone: 'us-east-1a',
    status: 'stopped',
    cpuUsage: 0,
    ramUsage: 0,
    diskUsage: 10,
    networkIo: 0,
    uptime: '0 hrs (Offline)',
    costPerHour: 0.00,
    instances: 0,
    ip: '10.0.4.192'
  }
];

const INITIAL_ALERTS = [
  {
    id: 'alt-101',
    severity: 'critical',
    title: 'High GPU & Memory Utilization Spike',
    service: 'ai-inference-gpu-node',
    provider: 'GCP',
    message: 'Memory threshold exceeded 90% (Current: 91.4%) on Iowa inference node.',
    timestamp: '2 mins ago',
    rawTime: new Date(Date.now() - 2 * 60000).toISOString(),
    status: 'active'
  },
  {
    id: 'alt-102',
    severity: 'warning',
    title: 'High Database Disk Allocation',
    service: 'postgres-primary-db',
    provider: 'Azure',
    message: 'PostgreSQL storage volume is at 82% capacity. Auto-scaling threshold is 85%.',
    timestamp: '14 mins ago',
    rawTime: new Date(Date.now() - 14 * 60000).toISOString(),
    status: 'active'
  },
  {
    id: 'alt-103',
    severity: 'info',
    title: 'Service Maintenance Completed',
    service: 'k8s-worker-cluster-01',
    provider: 'GCP',
    message: 'Node pool kernel security patch applied cleanly. All 8 pods healthy.',
    timestamp: '1 hr ago',
    rawTime: new Date(Date.now() - 60 * 60000).toISOString(),
    status: 'resolved'
  },
  {
    id: 'alt-104',
    severity: 'warning',
    title: 'Service Stopped by DevOps Policy',
    service: 'payment-webhook-pipeline',
    provider: 'AWS',
    message: 'Staging pipeline stopped during scheduled maintenance window.',
    timestamp: '3 hrs ago',
    rawTime: new Date(Date.now() - 180 * 60000).toISOString(),
    status: 'resolved'
  }
];

// Generate initial 20 points of timeline data
const generateInitialTelemetry = () => {
  const points = [];
  const now = Date.now();
  for (let i = 19; i >= 0; i--) {
    const t = new Date(now - i * 3000);
    const timeStr = t.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    points.push({
      time: timeStr,
      cpu: Math.floor(45 + Math.sin(i * 0.5) * 15 + Math.random() * 8),
      memory: Math.floor(62 + Math.cos(i * 0.4) * 8 + Math.random() * 5),
      storage: Math.floor(54 + Math.sin(i * 0.1) * 3),
      network: parseFloat((1.4 + Math.sin(i * 0.7) * 0.5 + Math.random() * 0.3).toFixed(2)),
      latency: Math.floor(28 + Math.random() * 12)
    });
  }
  return points;
};

export const CloudDataProvider = ({ children }) => {
  const [services, setServices] = useState(INITIAL_SERVICES);
  const [alerts, setAlerts] = useState(INITIAL_ALERTS);
  const [telemetry, setTelemetry] = useState(generateInitialTelemetry);
  const [isLiveStreaming, setIsLiveStreaming] = useState(true);
  const [refreshInterval, setRefreshInterval] = useState(3000); // 3 sec
  const [selectedProviderFilter, setSelectedProviderFilter] = useState('All Providers');
  const [selectedRegionFilter, setSelectedRegionFilter] = useState('All Regions');
  const [toasts, setToasts] = useState([]);
  
  // Custom Alert Thresholds in Settings
  const [thresholds, setThresholds] = useState({
    cpuWarning: 75,
    cpuCritical: 90,
    memoryWarning: 80,
    memoryCritical: 90,
    storageWarning: 80,
    storageCritical: 90,
    latencyWarningMs: 80
  });

  const [notificationConfig, setNotificationConfig] = useState({
    emailAlerts: true,
    slackWebhook: true,
    smsAlerts: false,
    autoHealDegraded: true
  });

  // Toast Helper
  const addToast = useCallback((title, message, type = 'info') => {
    const id = 'toast_' + Date.now() + '_' + Math.random().toString(36).substr(2, 4);
    setToasts(prev => [...prev, { id, title, message, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 4500);
  }, []);

  const removeToast = useCallback((id) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  }, []);

  // Compute Aggregate Metrics
  const runningServicesCount = services.filter(s => s.status === 'running').length;
  const totalServicesCount = services.length;
  const stoppedServicesCount = services.filter(s => s.status === 'stopped').length;
  
  const currentCpu = telemetry.length ? telemetry[telemetry.length - 1].cpu : 50;
  const currentMemory = telemetry.length ? telemetry[telemetry.length - 1].memory : 65;
  const currentStorage = telemetry.length ? telemetry[telemetry.length - 1].storage : 54;
  const currentNetwork = telemetry.length ? telemetry[telemetry.length - 1].network : 1.8;
  const currentLatency = telemetry.length ? telemetry[telemetry.length - 1].latency : 32;

  const totalMonthlyCost = services.reduce((acc, s) => {
    return acc + (s.status === 'running' ? s.costPerHour * 730 : 0);
  }, 0).toFixed(2);

  // Live Stream Simulation Effect
  useEffect(() => {
    if (!isLiveStreaming) return;

    const interval = setInterval(() => {
      const now = new Date();
      const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });

      // Generate realistic noise & fluctuations
      setTelemetry(prev => {
        const last = prev[prev.length - 1] || { cpu: 50, memory: 65, storage: 54, network: 1.8, latency: 30 };
        
        let cpuDelta = (Math.random() - 0.48) * 6;
        let newCpu = Math.max(15, Math.min(96, Math.round(last.cpu + cpuDelta)));

        let memDelta = (Math.random() - 0.48) * 3;
        let newMem = Math.max(25, Math.min(95, Math.round(last.memory + memDelta)));

        let netDelta = (Math.random() - 0.5) * 0.3;
        let newNet = Math.max(0.4, Math.min(4.8, parseFloat((last.network + netDelta).toFixed(2))));

        let newLatency = Math.max(14, Math.min(120, Math.round(28 + (newCpu > 80 ? 25 : 0) + Math.random() * 10)));

        const newPoint = {
          time: timeStr,
          cpu: newCpu,
          memory: newMem,
          storage: last.storage,
          network: newNet,
          latency: newLatency
        };

        const updated = [...prev.slice(1), newPoint];
        return updated;
      });

      // Slightly fluctuate individual service usages
      setServices(prev => prev.map(srv => {
        if (srv.status !== 'running') return srv;
        const cpuDrift = (Math.random() - 0.5) * 4;
        const ramDrift = (Math.random() - 0.5) * 2;
        return {
          ...srv,
          cpuUsage: Math.max(5, Math.min(99, Math.round(srv.cpuUsage + cpuDrift))),
          ramUsage: Math.max(10, Math.min(98, Math.round(srv.ramUsage + ramDrift))),
          networkIo: Math.max(50, Math.min(2500, Math.round(srv.networkIo + (Math.random() - 0.5) * 60)))
        };
      }));

    }, refreshInterval);

    return () => clearInterval(interval);
  }, [isLiveStreaming, refreshInterval]);

  // Service Management Actions
  const toggleServiceStatus = (serviceId) => {
    setServices(prev => prev.map(srv => {
      if (srv.id === serviceId) {
        const newStatus = srv.status === 'running' ? 'stopped' : 'running';
        const actionText = newStatus === 'running' ? 'started' : 'stopped';
        
        addToast(
          `Service ${actionText.toUpperCase()}`,
          `Service '${srv.name}' was successfully ${actionText}.`,
          newStatus === 'running' ? 'success' : 'warning'
        );

        // If stopped, add alert
        if (newStatus === 'stopped') {
          const newAlert = {
            id: 'alt_' + Date.now(),
            severity: 'warning',
            title: `Service Stopped: ${srv.name}`,
            service: srv.name,
            provider: srv.provider,
            message: `Instance was manually shut down by administrator.`,
            timestamp: 'Just now',
            rawTime: new Date().toISOString(),
            status: 'active'
          };
          setAlerts(a => [newAlert, ...a]);
        }

        return {
          ...srv,
          status: newStatus,
          cpuUsage: newStatus === 'running' ? Math.floor(25 + Math.random() * 30) : 0,
          ramUsage: newStatus === 'running' ? Math.floor(35 + Math.random() * 30) : 0,
          networkIo: newStatus === 'running' ? Math.floor(200 + Math.random() * 400) : 0,
        };
      }
      return srv;
    }));
  };

  const restartService = (serviceId) => {
    const target = services.find(s => s.id === serviceId);
    if (!target) return;

    addToast('Restarting Service', `Initiating rolling restart for '${target.name}'...`, 'info');

    // Simulate temporary stopping then restarting
    setServices(prev => prev.map(s => s.id === serviceId ? { ...s, status: 'restarting' } : s));

    setTimeout(() => {
      setServices(prev => prev.map(s => {
        if (s.id === serviceId) {
          return {
            ...s,
            status: 'running',
            cpuUsage: Math.floor(30 + Math.random() * 25),
            ramUsage: Math.floor(40 + Math.random() * 20),
            uptime: '0 days 0 hrs (Just Restarted)'
          };
        }
        return s;
      }));
      addToast('Restart Complete', `Service '${target.name}' is healthy and running.`, 'success');
    }, 1500);
  };

  const scaleService = (serviceId, delta) => {
    setServices(prev => prev.map(s => {
      if (s.id === serviceId) {
        const newCount = Math.max(1, Math.min(16, s.instances + delta));
        addToast(
          'Instance Scaled',
          `Scaled '${s.name}' to ${newCount} instances (${s.provider}).`,
          'info'
        );
        return { ...s, instances: newCount };
      }
      return s;
    }));
  };

  // Alert Management Actions
  const acknowledgeAlert = (alertId) => {
    setAlerts(prev => prev.map(alt => {
      if (alt.id === alertId) {
        addToast('Alert Acknowledged', `Incident ${alt.id} assigned to DevOps on-call.`, 'info');
        return { ...alt, status: 'acknowledged' };
      }
      return alt;
    }));
  };

  const resolveAlert = (alertId) => {
    setAlerts(prev => prev.map(alt => {
      if (alt.id === alertId) {
        addToast('Alert Resolved', `Incident ${alt.id} marked as resolved.`, 'success');
        return { ...alt, status: 'resolved' };
      }
      return alt;
    }));
  };

  const clearAllResolvedAlerts = () => {
    setAlerts(prev => prev.filter(a => a.status !== 'resolved'));
    addToast('Alerts Cleared', 'Archived resolved alert history.', 'info');
  };

  // Simulation: Trigger Load Spike (High impact for college presentation)
  const triggerSimulatedLoadSpike = () => {
    addToast('🚨 Peak Spike Injected', 'Simulating 300% high traffic surge across all clusters...', 'error');
    
    setTelemetry(prev => {
      const now = new Date();
      return [...prev.slice(1), {
        time: now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
        cpu: 94,
        memory: 92,
        storage: 56,
        network: 4.85,
        latency: 145
      }];
    });

    setServices(prev => prev.map(s => {
      if (s.status === 'running') {
        return {
          ...s,
          cpuUsage: Math.min(98, s.cpuUsage + 35),
          ramUsage: Math.min(96, s.ramUsage + 25),
          networkIo: Math.round(s.networkIo * 2.2)
        };
      }
      return s;
    }));

    const spikeAlert = {
      id: 'alt_' + Date.now(),
      severity: 'critical',
      title: '🚨 CRITICAL: Global Resource Threshold Breached',
      service: 'Fleet-Wide',
      provider: 'Multi-Cloud',
      message: 'Sudden DDoS/Traffic surge detected! Fleet CPU at 94%, latency elevated to 145ms.',
      timestamp: 'Just now',
      rawTime: new Date().toISOString(),
      status: 'active'
    };

    setAlerts(prev => [spikeAlert, ...prev]);
  };

  return (
    <CloudDataContext.Provider
      value={{
        services,
        alerts,
        telemetry,
        isLiveStreaming,
        setIsLiveStreaming,
        refreshInterval,
        setRefreshInterval,
        selectedProviderFilter,
        setSelectedProviderFilter,
        selectedRegionFilter,
        setSelectedRegionFilter,
        toasts,
        addToast,
        removeToast,
        thresholds,
        setThresholds,
        notificationConfig,
        setNotificationConfig,
        // Aggregates
        runningServicesCount,
        totalServicesCount,
        stoppedServicesCount,
        currentCpu,
        currentMemory,
        currentStorage,
        currentNetwork,
        currentLatency,
        totalMonthlyCost,
        // Actions
        toggleServiceStatus,
        restartService,
        scaleService,
        acknowledgeAlert,
        resolveAlert,
        clearAllResolvedAlerts,
        triggerSimulatedLoadSpike
      }}
    >
      {children}
    </CloudDataContext.Provider>
  );
};

export const useCloudData = () => {
  const context = useContext(CloudDataContext);
  if (!context) {
    throw new Error('useCloudData must be used within a CloudDataProvider');
  }
  return context;
};
