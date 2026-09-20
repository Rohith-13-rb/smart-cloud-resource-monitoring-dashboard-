import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

const DEMO_USER = {
  id: 'usr_cloud_01',
  name: 'Rohith R.',
  email: 'admin@smartcloud.io',
  role: 'Principal Cloud Architect',
  department: 'Cloud Infrastructure & SRE',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=256',
  preferredProvider: 'Hybrid (AWS/GCP/Azure)',
  loginTime: new Date().toLocaleTimeString(),
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('cloud_dashboard_user');
    return saved ? JSON.parse(saved) : null;
  });

  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('cloud_theme') || 'dark';
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem('cloud_dashboard_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('cloud_dashboard_user');
    }
  }, [user]);

  useEffect(() => {
    localStorage.setItem('cloud_theme', theme);
    if (theme === 'light') {
      document.documentElement.classList.add('light-theme');
    } else {
      document.documentElement.classList.remove('light-theme');
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
  };

  const login = (email, password) => {
    // Simple frontend validation for project demo
    if (!email || !password) {
      throw new Error('Please provide both email and password.');
    }
    const newUser = {
      ...DEMO_USER,
      email: email,
      name: email.split('@')[0].toUpperCase() + ' (Cloud Admin)',
      loginTime: new Date().toLocaleTimeString(),
    };
    setUser(newUser);
    return newUser;
  };

  const demoLogin = () => {
    setUser({ ...DEMO_USER, loginTime: new Date().toLocaleTimeString() });
    return DEMO_USER;
  };

  const logout = () => {
    setUser(null);
  };

  const updateProfile = (updatedFields) => {
    setUser(prev => {
      const updated = { ...prev, ...updatedFields };
      return updated;
    });
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        theme,
        toggleTheme,
        login,
        demoLogin,
        logout,
        updateProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
