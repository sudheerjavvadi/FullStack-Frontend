import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { userAPI, issueAPI } from '../api/api';
import { toast } from 'react-toastify';
import { FiUsers, FiFileText, FiShield, FiUserCheck, FiTrash2, FiEdit } from 'react-icons/fi';

function AdminDashboard() {
    const { user } = useSelector((state) => state.auth);
    const [users, setUsers] = useState([]);
    const [stats, setStats] = useState({ users: {}, issues: {} });
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('overview');

    useEffect(() => {
        if (user?.role === 'ADMIN') {
            fetchData();
        }
    }, [user]);

    const fetchData = async () => {
        try {
            const [usersRes, userStatsRes, issueStatsRes] = await Promise.all([
                userAPI.getAll(),
                userAPI.getStats(),
                issueAPI.getStats()
            ]);
            setUsers(usersRes.data.data);
            setStats({
                users: userStatsRes.data.data,
                issues: issueStatsRes.data.data
            });
        } catch (error) {
            toast.error('Failed to fetch data');
        } finally {
            setLoading(false);
        }
    };

    const handleRoleChange = async (userId, newRole) => {
        try {
            await userAPI.updateRole(userId, newRole);
            setUsers(users.map(u => u.id === userId ? { ...u, role: newRole } : u));
            toast.success('Role updated successfully');
        } catch (error) {
            toast.error('Failed to update role');
        }
    };

    const handleToggleStatus = async (userId) => {
        try {
            await userAPI.toggleStatus(userId);
            setUsers(users.map(u => u.id === userId ? { ...u, enabled: !u.enabled } : u));
            toast.success('User status updated');
        } catch (error) {
            toast.error('Failed to update status');
        }
    };

    const handleDeleteUser = async (userId) => {
        if (!window.confirm('Are you sure you want to delete this user?')) return;

        try {
            await userAPI.delete(userId);
            setUsers(users.filter(u => u.id !== userId));
            toast.success('User deleted');
        } catch (error) {
            toast.error('Failed to delete user');
        }
    };

    if (user?.role !== 'ADMIN' && user?.role !== 'MODERATOR') {
        return <Navigate to="/dashboard" />;
    }

    if (loading) {
        return (
            <div className="loading-container" style={{ minHeight: '60vh' }}>
                <div className="spinner"></div>
            </div>
        );
    }

    const getRoleBadge = (role) => {
        const badges = {
            ADMIN: 'badge-admin',
            POLITICIAN: 'badge-politician',
            CITIZEN: 'badge-citizen',
            MODERATOR: 'badge-moderator'
        };
        return badges[role] || 'badge-citizen';
    };

    return (
        <div className="page-container bg-black">
            <div className="page-header bg-black">
                <h1 className="page-title">Admin Dashboard</h1>
                <p className="page-description">Manage users and monitor platform activity.</p>
            </div>

            {/* Stats Cards */}
            <div className="stats-grid">
                <div className="stat-card">
                    <div className="stat-icon primary"><FiUsers /></div>
                    <div className="stat-value">{stats.users.totalCitizens || 0}</div>
                    <div className="stat-label">Citizens</div>
                </div>
                <div className="stat-card">
                    <div className="stat-icon cyan"><FiUserCheck /></div>
                    <div className="stat-value">{stats.users.totalPoliticians || 0}</div>
                    <div className="stat-label">Politicians</div>
                </div>
                <div className="stat-card">
                    <div className="stat-icon amber"><FiShield /></div>
                    <div className="stat-value">{stats.users.totalModerators || 0}</div>
                    <div className="stat-label">Moderators</div>
                </div>
                <div className="stat-card">
                    <div className="stat-icon emerald"><FiFileText /></div>
                    <div className="stat-value">
                        {(stats.issues.open || 0) + (stats.issues.inProgress || 0) +
                            (stats.issues.resolved || 0) + (stats.issues.closed || 0)}
                    </div>
                    <div className="stat-label">Total Issues</div>
                </div>
            </div>

            {/* Tabs */}
            <div className="flex gap-md mb-lg">
                <button
                    className={`btn ${activeTab === 'overview' ? 'btn-primary' : 'btn-secondary'}`}
                    onClick={() => setActiveTab('overview')}
                >
                    Overview
                </button>
                <button
                    className={`btn ${activeTab === 'users' ? 'btn-primary' : 'btn-secondary'}`}
                    onClick={() => setActiveTab('users')}
                >
                    Manage Users
                </button>
            </div>

            {/* Users Table */}
            {activeTab === 'users' && (
                <div className="card">
                    <h2 className="card-title mb-lg">All Users</h2>
                    <div className="table-container">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Role</th>
                                    <th>Status</th>
                                    <th>Joined</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.map((u) => (
                                    <tr key={u.id}>
                                        <td>{u.fullName}</td>
                                        <td>{u.email}</td>
                                        <td>
                                            <select
                                                value={u.role}
                                                onChange={(e) => handleRoleChange(u.id, e.target.value)}
                                                className="form-select"
                                                style={{ width: 'auto', padding: '0.25rem 0.5rem', fontSize: '0.75rem' }}
                                                disabled={u.id === user.id}
                                            >
                                                <option value="CITIZEN">Citizen</option>
                                                <option value="POLITICIAN">Politician</option>
                                                <option value="MODERATOR">Moderator</option>
                                                <option value="ADMIN">Admin</option>
                                            </select>
                                        </td>
                                        <td>
                                            <span className={`badge ${u.enabled ? 'badge-resolved' : 'badge-closed'}`}>
                                                {u.enabled ? 'Active' : 'Disabled'}
                                            </span>
                                        </td>
                                        <td>{new Date(u.createdAt).toLocaleDateString()}</td>
                                        <td>
                                            <div className="flex gap-sm">
                                                <button
                                                    className="btn btn-secondary btn-sm"
                                                    onClick={() => handleToggleStatus(u.id)}
                                                    disabled={u.id === user.id}
                                                >
                                                    {u.enabled ? 'Disable' : 'Enable'}
                                                </button>
                                                <button
                                                    className="btn btn-danger btn-sm"
                                                    onClick={() => handleDeleteUser(u.id)}
                                                    disabled={u.id === user.id}
                                                >
                                                    <FiTrash2 />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {activeTab === 'overview' && (
                <div className="card">
                    <h2 className="card-title mb-lg">Issue Statistics</h2>
                    <div className="stats-grid">
                        <div className="stat-card">
                            <div className="stat-value text-warning">{stats.issues.open || 0}</div>
                            <div className="stat-label">Open</div>
                        </div>
                        <div className="stat-card">
                            <div className="stat-value" style={{ color: 'var(--accent-amber)' }}>
                                {stats.issues.inProgress || 0}
                            </div>
                            <div className="stat-label">In Progress</div>
                        </div>
                        <div className="stat-card">
                            <div className="stat-value text-success">{stats.issues.resolved || 0}</div>
                            <div className="stat-label">Resolved</div>
                        </div>
                        <div className="stat-card">
                            <div className="stat-value text-muted">{stats.issues.closed || 0}</div>
                            <div className="stat-label">Closed</div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default AdminDashboard;
