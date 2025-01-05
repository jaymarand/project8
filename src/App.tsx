import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { supabase } from './supabaseClient';
import Navigation from './components/Navigation';
import Login from './pages/Login';

// Lazy load pages for better performance
const DriverManagement = React.lazy(() => import('./pages/DriverManagement'));
const ParLevelsPage = React.lazy(() => import('./pages/ParLevelsPage'));
const ContainerLogsPage = React.lazy(() => import('./pages/ContainerLogsPage'));
const DispatchDashboard = React.lazy(() => import('./pages/DispatchDashboard'));
const StorePage = React.lazy(() => import('./pages/StorePage'));

// Simple storage helper
const storage = {
  saveUser: (user: any) => {
    const userInfo = {
      id: user.id,
      email: user.email,
      name: user.user_metadata?.name || ''
    };
    localStorage.setItem('user', JSON.stringify(userInfo));
  },
  getUser: () => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  },
  clearUser: () => {
    localStorage.removeItem('user');
  }
};

export default function App() {
  const [user, setUser] = useState(storage.getUser());

  useEffect(() => {
    // Check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        storage.saveUser(session.user);
        setUser(session.user);
      }
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        storage.saveUser(session.user);
        setUser(session.user);
      } else {
        storage.clearUser();
        setUser(null);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  if (!user) {
    return <Login />;
  }

  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <div className="container mx-auto px-4 py-8">
          <React.Suspense fallback={
            <div className="flex items-center justify-center h-32">
              <div className="text-gray-500">Loading...</div>
            </div>
          }>
            <Routes>
              <Route path="/dispatch" element={<DispatchDashboard />} />
              <Route path="/driver-management" element={<DriverManagement />} />
              <Route path="/drivers" element={<DriverManagement />} />
              <Route path="/par-levels" element={<ParLevelsPage />} />
              <Route path="/store" element={<StorePage />} />
              <Route path="/container-logs" element={<ContainerLogsPage />} />
              <Route path="*" element={<Navigate to="/dispatch" />} />
            </Routes>
          </React.Suspense>
        </div>
      </div>
    </Router>
  );
}
