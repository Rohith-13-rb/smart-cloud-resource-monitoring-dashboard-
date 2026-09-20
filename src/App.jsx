import React, { useState } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { CloudDataProvider } from './context/CloudDataContext';
import { Navbar } from './components/Navbar';
import { Sidebar } from './components/Sidebar';
import { ToastContainer } from './components/Toast';

import { Login } from './pages/Login';
import { Dashboard } from './pages/Dashboard';
import { ResourceMonitoring } from './pages/ResourceMonitoring';
import { CloudServices } from './pages/CloudServices';
import { Alerts } from './pages/Alerts';
import { Reports } from './pages/Reports';
import { Settings } from './pages/Settings';

const AppContent = () => {
  const { isAuthenticated } = useAuth();
  const [activePage, setActivePage] = useState('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  if (!isAuthenticated) {
    return <Login />;
  }

  const renderActivePage = () => {
    switch (activePage) {
      case 'dashboard':
        return <Dashboard setActivePage={setActivePage} />;
      case 'monitoring':
        return <ResourceMonitoring />;
      case 'services':
        return <CloudServices />;
      case 'alerts':
        return <Alerts setActivePage={setActivePage} />;
      case 'reports':
        return <Reports />;
      case 'settings':
        return <Settings />;
      default:
        return <Dashboard setActivePage={setActivePage} />;
    }
  };

  return (
    <div className="app-container">
      <Sidebar
        activePage={activePage}
        setActivePage={setActivePage}
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />

      <div className="main-content">
        <Navbar onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
        {renderActivePage()}
      </div>

      <ToastContainer />
    </div>
  );
};

export function App() {
  return (
    <AuthProvider>
      <CloudDataProvider>
        <AppContent />
      </CloudDataProvider>
    </AuthProvider>
  );
}

export default App;
