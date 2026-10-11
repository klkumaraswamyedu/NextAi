import React, { useEffect, useState } from 'react';
import { Sparkles, GraduationCap, Building2, Bookmark, Activity } from 'lucide-react';
import { api } from '../../services/api';

export const Navbar = ({ activeTab, setActiveTab }) => {
  const [healthStatus, setHealthStatus] = useState('checking');

  useEffect(() => {
    let isMounted = true;
    api.getHealth()
      .then((data) => {
        if (isMounted) setHealthStatus(data.success ? 'online' : 'error');
      })
      .catch(() => {
        if (isMounted) setHealthStatus('offline');
      });

    return () => { isMounted = false; };
  }, []);

  const navItems = [
    { id: 'home', label: 'Services Portal', icon: Sparkles },
    { id: 'student', label: 'Student Opportunities', icon: GraduationCap },
    { id: 'government', label: 'Government Schemes', icon: Building2 },
    { id: 'saved', label: 'Saved Items', icon: Bookmark }
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-800 bg-slate-950/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand */}
        <div
          onClick={() => setActiveTab('home')}
          className="flex items-center gap-3 cursor-pointer group"
        >
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-cyan-400 flex items-center justify-center shadow-lg shadow-indigo-500/20 group-hover:scale-105 transition-transform">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-base tracking-tight text-white">NextStep</span>
              <span className="text-xs font-bold uppercase tracking-wider bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 px-1.5 py-0.5 rounded">AI</span>
            </div>
            <p className="text-[10px] text-slate-400 tracking-wide hidden sm:block">Web Intelligence & Grounded Validation</p>
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav className="flex items-center gap-1 sm:gap-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  isActive
                    ? 'bg-indigo-600/20 text-indigo-300 border border-indigo-500/30 shadow-sm'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900 border border-transparent'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-indigo-400' : 'text-slate-400'}`} />
                <span className="hidden md:inline">{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* System Status Pill */}
        <div className="flex items-center gap-2">
          <div
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-medium bg-slate-900 border border-slate-800"
            title="Backend Server Health State"
          >
            <span
              className={`w-2 h-2 rounded-full ${
                healthStatus === 'online'
                  ? 'bg-emerald-400 animate-pulse'
                  : healthStatus === 'checking'
                  ? 'bg-amber-400'
                  : 'bg-rose-400'
              }`}
            />
            <span className="text-slate-400 hidden lg:inline">API:</span>
            <span
              className={
                healthStatus === 'online'
                  ? 'text-emerald-400'
                  : healthStatus === 'checking'
                  ? 'text-amber-400'
                  : 'text-rose-400'
              }
            >
              {healthStatus.toUpperCase()}
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};
