import { useState, useEffect } from 'react';
import { userAPI } from '../api/api';
import { FiUsers, FiMail, FiPhone, FiMapPin, FiShield, FiCheck, FiX } from 'react-icons/fi';

function AllUsers() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filterRole, setFilterRole] = useState('ALL');
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        loadUsers();
    }, []);

    const loadUsers = async () => {
        try {
            setLoading(true);
            const response = await userAPI.getAll();
            setUsers(response.data.data || []);
        } catch (error) {
            console.error('Error loading users:', error);
        } finally {
            setLoading(false);
        }
    };

    const getRoleBadge = (role) => {
        const badges = {
            ADMIN: { bg: 'bg-purple', text: '👑 Admin' },
            POLITICIAN: { bg: 'bg-blue', text: '🏛️ Politician' },
            CITIZEN: { bg: 'bg-green', text: '👤 Citizen' },
            MODERATOR: { bg: 'bg-orange', text: '🛡️ Moderator' }
        };
        return badges[role] || { bg: 'bg-gray', text: role };
    };

    const filteredUsers = users.filter(user => {
        const roleMatch = filterRole === 'ALL' || user.role === filterRole;
        const searchMatch = user.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          user.email.toLowerCase().includes(searchTerm.toLowerCase());
        return roleMatch && searchMatch;
    });

    const stats = {
        total: users.length,
        admin: users.filter(u => u.role === 'ADMIN').length,
        citizen: users.filter(u => u.role === 'CITIZEN').length,
        politician: users.filter(u => u.role === 'POLITICIAN').length,
        moderator: users.filter(u => u.role === 'MODERATOR').length,
    };

    return (
        <div className="page-container">
            {/* Header */}
            <div className="page-header">
                <div>
                    <h1 className="page-title"><FiUsers /> All Users</h1>
                    <p className="page-description">View and manage all registered users in the system</p>
                </div>
            </div>

            {/* Statistics Cards */}
            <div className="stats-grid">
                <div className="stat-card">
                    <div className="stat-icon primary"><FiUsers /></div>
                    <div className="stat-value">{stats.total}</div>
                    <div className="stat-label">Total Users</div>
                </div>
                <div className="stat-card">
                    <div className="stat-icon purple"><span>👑</span></div>
                    <div className="stat-value">{stats.admin}</div>
                    <div className="stat-label">Admins</div>
                </div>
                <div className="stat-card">
                    <div className="stat-icon cyan"><span>🏛️</span></div>
                    <div className="stat-value">{stats.politician}</div>
                    <div className="stat-label">Politicians</div>
                </div>
                <div className="stat-card">
                    <div className="stat-icon emerald"><span>👤</span></div>
                    <div className="stat-value">{stats.citizen}</div>
                    <div className="stat-label">Citizens</div>
                </div>
                <div className="stat-card">
                    <div className="stat-icon amber"><span>🛡️</span></div>
                    <div className="stat-value">{stats.moderator}</div>
                    <div className="stat-label">Moderators</div>
                </div>
            </div>

            {/* Filters */}
            <div className="card">
                <div className="card-header">
                    <h2 className="card-title">Filter & Search</h2>
                </div>
                <div className="filter-group">
                    <input
                        type="text"
                        placeholder="Search by name or email..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="form-input"
                    />
                    <select
                        value={filterRole}
                        onChange={(e) => setFilterRole(e.target.value)}
                        className="form-input"
                    >
                        <option value="ALL">All Roles</option>
                        <option value="ADMIN">Admin</option>
                        <option value="POLITICIAN">Politician</option>
                        <option value="CITIZEN">Citizen</option>
                        <option value="MODERATOR">Moderator</option>
                    </select>
                </div>
            </div>

            {/* Users List */}
            <div className="card">
                <div className="card-header">
                    <h2 className="card-title">Registered Users ({filteredUsers.length})</h2>
                </div>

                {loading ? (
                    <div className="loading-state">
                        <div className="spinner"></div>
                        <p>Loading users...</p>
                    </div>
                ) : filteredUsers.length === 0 ? (
                    <div className="empty-state">
                        <FiUsers className="empty-icon" />
                        <p>No users found</p>
                    </div>
                ) : (
                    <div className="users-grid">
                        {filteredUsers.map((user) => {
                            const badge = getRoleBadge(user.role);
                            return (
                                <div key={user.id} className="user-card">
                                    <div className="user-card-header">
                                        <div className={`role-badge ${badge.bg}`}>
                                            {badge.text}
                                        </div>
                                        <div className="status-badge">
                                            {user.enabled ? (
                                                <>
                                                    <FiCheck className="icon-green" /> Active
                                                </>
                                            ) : (
                                                <>
                                                    <FiX className="icon-red" /> Inactive
                                                </>
                                            )}
                                        </div>
                                    </div>

                                    <h3 className="user-name">{user.fullName}</h3>

                                    <div className="user-info">
                                        <div className="info-item">
                                            <FiMail /> {user.email}
                                        </div>
                                        {user.phone && (
                                            <div className="info-item">
                                                <FiPhone /> {user.phone}
                                            </div>
                                        )}
                                        {user.constituency && (
                                            <div className="info-item">
                                                <FiMapPin /> {user.constituency}
                                            </div>
                                        )}
                                        <div className="info-item text-muted">
                                            ID: {user.id}
                                        </div>
                                    </div>

                                    <div className="user-meta">
                                        <small>Member Since: {new Date(user.createdAt).toLocaleDateString()}</small>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>

            {/* Table View (Optional) */}
            <div className="card" style={{ marginTop: '2rem' }}>
                <div className="card-header">
                    <h2 className="card-title">Detailed View</h2>
                </div>
                <div className="table-responsive">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Phone</th>
                                <th>Role</th>
                                <th>Constituency</th>
                                <th>Status</th>
                                <th>Joined</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredUsers.map((user) => (
                                <tr key={user.id}>
                                    <td>{user.id}</td>
                                    <td>{user.fullName}</td>
                                    <td>{user.email}</td>
                                    <td>{user.phone || '-'}</td>
                                    <td><span className={`badge badge-${user.role.toLowerCase()}`}>{user.role}</span></td>
                                    <td>{user.constituency || '-'}</td>
                                    <td>
                                        {user.enabled ? (
                                            <span className="badge badge-success">Active</span>
                                        ) : (
                                            <span className="badge badge-danger">Inactive</span>
                                        )}
                                    </td>
                                    <td>{new Date(user.createdAt).toLocaleDateString()}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default AllUsers;
