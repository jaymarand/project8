import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { supabase } from '../supabaseClient';

export default function Navigation() {
  const location = useLocation();
  
  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  const isActive = (path: string) => location.pathname === path;

  const navItems = [
    { path: '/dispatch', label: 'Dispatch' },
    { path: '/driver-management', label: 'Driver Management' },
    { path: '/drivers', label: 'Drivers' },
    { path: '/par-levels', label: 'Par Levels' },
    { path: '/store', label: 'Store' },
    { path: '/container-logs', label: 'Container Logs' }
  ];

  return (
    <nav className="bg-white shadow">
      <div className="container mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex space-x-4 items-center overflow-x-auto">
            {navItems.map(({ path, label }) => (
              <Link
                key={path}
                to={path}
                className={`px-3 py-2 rounded-md text-sm font-medium whitespace-nowrap ${
                  isActive(path)
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-700 hover:bg-blue-50'
                }`}
              >
                {label}
              </Link>
            ))}
          </div>
          <div className="flex items-center">
            <button
              onClick={handleLogout}
              className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-red-50 hover:text-red-600"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
