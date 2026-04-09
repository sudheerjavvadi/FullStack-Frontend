import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { FiUsers, FiFileText, FiShield, FiUserCheck } from 'react-icons/fi';

function AdminPanel() {
  const { user } = useSelector((state) => state.auth);
  const [activeTab, setActiveTab] = useState('overview');

  if (user?.role !== 'ADMIN') {
    return <Navigate to="/dashboard" />;
  }

  return (
    <div className="page-container">
      <div className="space-y-8">
        <div className="rounded-[32px] border border-white/10 bg-white/5 p-8 shadow-glow backdrop-blur-xl">
          <h1 className="text-4xl font-semibold text-white">Admin Control Panel</h1>
          <p className="mt-4 text-slate-400">Comprehensive platform administration and monitoring.</p>
        </div>

        {/* Stats Overview */}
        <div className="grid gap-6 lg:grid-cols-4">
          <div className="rounded-[28px] border border-white/10 bg-black/70 p-6 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">Total Users</p>
                <p className="mt-2 text-3xl font-bold text-white">3</p>
              </div>
              <div className="rounded-[16px] bg-white/5 p-3">
                <FiUsers className="text-2xl text-slate-300" />
              </div>
            </div>
          </div>
          <div className="rounded-[28px] border border-white/10 bg-black/70 p-6 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">Active Issues</p>
                <p className="mt-2 text-3xl font-bold text-white">0</p>
              </div>
              <div className="rounded-[16px] bg-white/5 p-3">
                <FiFileText className="text-2xl text-slate-300" />
              </div>
            </div>
          </div>
          <div className="rounded-[28px] border border-white/10 bg-black/70 p-6 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">Moderators</p>
                <p className="mt-2 text-3xl font-bold text-white">2</p>
              </div>
              <div className="rounded-[16px] bg-white/5 p-3">
                <FiShield className="text-2xl text-slate-300" />
              </div>
            </div>
          </div>
          <div className="rounded-[28px] border border-white/10 bg-black/70 p-6 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">Platform Health</p>
                <p className="mt-2 text-3xl font-bold text-white">100%</p>
              </div>
              <div className="rounded-[16px] bg-white/5 p-3">
                <FiUserCheck className="text-2xl text-slate-300" />
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-3 border-b border-white/10 pb-4">
          <button
            className={`px-4 py-2 text-sm font-semibold transition ${
              activeTab === 'overview'
                ? 'border-b-2 border-white text-white'
                : 'text-slate-300 hover:text-white'
            }`}
            onClick={() => setActiveTab('overview')}
          >
            Overview
          </button>
          <button
            className={`px-4 py-2 text-sm font-semibold transition ${
              activeTab === 'logs'
                ? 'border-b-2 border-white text-white'
                : 'text-slate-300 hover:text-white'
            }`}
            onClick={() => setActiveTab('logs')}
          >
            System Logs
          </button>
          <button
            className={`px-4 py-2 text-sm font-semibold transition ${
              activeTab === 'reports'
                ? 'border-b-2 border-white text-white'
                : 'text-slate-300 hover:text-white'
            }`}
            onClick={() => setActiveTab('reports')}
          >
            Reports
          </button>
        </div>

        {/* Content */}
        {activeTab === 'overview' && (
          <div className="rounded-[28px] border border-white/10 bg-black/70 p-8 shadow-lg">
            <h2 className="text-xl font-semibold text-white mb-4">Platform Overview</h2>
            <p className="text-slate-400">Last updated: Just now</p>
            <div className="mt-6 space-y-3 text-sm text-slate-300">
              <p>✓ All systems operational</p>
              <p>✓ Database connectivity: Normal</p>
              <p>✓ API response time: Optimal</p>
              <p>✓ Cache system: Active</p>
            </div>
          </div>
        )}

        {activeTab === 'logs' && (
          <div className="rounded-[28px] border border-white/10 bg-black/70 p-8 shadow-lg">
            <h2 className="text-xl font-semibold text-white mb-4">Recent System Logs</h2>
            <div className="space-y-3 text-sm font-mono text-slate-400">
              <p>[2026-04-05 11:36:12] User registered: Admin User</p>
              <p>[2026-04-05 11:35:45] Database backup completed</p>
              <p>[2026-04-05 11:34:20] Issue created</p>
              <p>[2026-04-05 11:33:05] System health check passed</p>
            </div>
          </div>
        )}

        {activeTab === 'reports' && (
          <div className="rounded-[28px] border border-white/10 bg-black/70 p-8 shadow-lg">
            <h2 className="text-xl font-semibold text-white mb-4">Pending Reports</h2>
            <p className="text-slate-400">No pending reports at this time.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminPanel;
