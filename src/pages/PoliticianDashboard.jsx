import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchAssignedIssues } from '../store/slices/issueSlice';
import { fetchMyUpdates } from '../store/slices/updateSlice';
import {
    FiFileText, FiCheckCircle, FiClock, FiAlertCircle,
    FiPlus, FiEdit, FiStar, FiMessageSquare, FiUsers
} from 'react-icons/fi';

function PoliticianDashboard() {
    const { user } = useSelector((state) => state.auth);
    const { issues, loading } = useSelector((state) => state.issues);
    const { updates } = useSelector((state) => state.updates);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchAssignedIssues());
        dispatch(fetchMyUpdates());
    }, [dispatch]);

    const getStatusBadge = (status) => {
        const badges = {
            OPEN: 'badge-open',
            IN_PROGRESS: 'badge-in-progress',
            RESOLVED: 'badge-resolved',
            CLOSED: 'badge-closed'
        };
        return badges[status] || 'badge-open';
    };

    const issueStats = {
        total: issues.length,
        pending: issues.filter(i => i.status === 'OPEN').length,
        inProgress: issues.filter(i => i.status === 'IN_PROGRESS').length,
        resolved: issues.filter(i => i.status === 'RESOLVED').length
    };

    return (
        <div className="page-container">
            {/* Welcome Header */}
            <div className="dashboard-header">
                <div className="dashboard-welcome">
                    <div className="welcome-icon politician-icon">🏛️</div>
                    <div>
                        <h1 className="page-title">Welcome, {user?.fullName}!</h1>
                        <p className="page-description">
                            Respond to citizen concerns, post updates, and engage with your constituency.
                        </p>
                        {user?.constituency && (
                            <span className="badge badge-politician" style={{ marginTop: '0.5rem' }}>
                                📍 {user.constituency}
                            </span>
                        )}
                    </div>
                </div>
                <div className="header-actions">
                    <Link to="/updates/create" className="btn btn-primary btn-lg">
                        <FiPlus /> Post Update
                    </Link>
                </div>
            </div>

            {/* Stats Cards */}
            <div className="stats-grid">
                <div className="stat-card urgent">
                    <div className="stat-icon rose"><FiAlertCircle /></div>
                    <div className="stat-value">{issueStats.pending}</div>
                    <div className="stat-label">Awaiting Response</div>
                </div>
                <div className="stat-card">
                    <div className="stat-icon amber"><FiClock /></div>
                    <div className="stat-value">{issueStats.inProgress}</div>
                    <div className="stat-label">In Progress</div>
                </div>
                <div className="stat-card">
                    <div className="stat-icon emerald"><FiCheckCircle /></div>
                    <div className="stat-value">{issueStats.resolved}</div>
                    <div className="stat-label">Resolved</div>
                </div>
                <div className="stat-card">
                    <div className="stat-icon primary"><FiEdit /></div>
                    <div className="stat-value">{updates?.length || 0}</div>
                    <div className="stat-label">Updates Posted</div>
                </div>
            </div>

            <div className="dashboard-grid">
                {/* Assigned Issues */}
                <div className="col-8">
                    <div className="card">
                        <div className="card-header">
                            <h2 className="card-title">
                                <FiFileText style={{ marginRight: '0.5rem' }} />
                                Assigned Issues
                            </h2>
                            <Link to="/issues" className="btn btn-secondary btn-sm">View All</Link>
                        </div>

                        {loading ? (
                            <div className="loading-container">
                                <div className="spinner"></div>
                            </div>
                        ) : issues.length > 0 ? (
                            <div>
                                {issues.slice(0, 5).map((issue) => (
                                    <Link to={`/issues/${issue.id}`} key={issue.id} className="issue-card">
                                        <div className="issue-header">
                                            <div>
                                                <h3 className="issue-title">{issue.title}</h3>
                                                <div className="issue-meta">
                                                    <span>From: {issue.citizenName}</span>
                                                    <span>•</span>
                                                    <span>{issue.category}</span>
                                                    <span>•</span>
                                                    <span>{new Date(issue.createdAt).toLocaleDateString()}</span>
                                                </div>
                                            </div>
                                            <span className={`badge ${getStatusBadge(issue.status)}`}>
                                                {issue.status.replace('_', ' ')}
                                            </span>
                                        </div>
                                        <p className="issue-description">
                                            {issue.description?.length > 120
                                                ? issue.description.substring(0, 120) + '...'
                                                : issue.description}
                                        </p>
                                        {issue.status === 'OPEN' && (
                                            <div className="issue-footer">
                                                <span className="text-warning">⚠️ Needs your response</span>
                                            </div>
                                        )}
                                    </Link>
                                ))}
                            </div>
                        ) : (
                            <div className="empty-state">
                                <div className="empty-state-icon">✅</div>
                                <h3 className="empty-state-title">No pending issues</h3>
                                <p className="empty-state-description">
                                    Great job! You're all caught up with citizen concerns.
                                </p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Sidebar */}
                <div className="col-4">
                    {/* Quick Actions */}
                    <div className="card" style={{ marginBottom: '1.5rem' }}>
                        <h3 className="card-title" style={{ marginBottom: '1rem' }}>Quick Actions</h3>
                        <div className="quick-actions">
                            <Link to="/updates/create" className="quick-action-btn">
                                <FiPlus /> Post Update
                            </Link>
                            <Link to="/issues" className="quick-action-btn">
                                <FiFileText /> Pending Issues
                            </Link>
                            <Link to="/feedback" className="quick-action-btn">
                                <FiStar /> View Feedback
                            </Link>
                        </div>
                    </div>

                    {/* My Updates */}
                    <div className="card">
                        <div className="card-header">
                            <h2 className="card-title">
                                <FiMessageSquare style={{ marginRight: '0.5rem' }} />
                                My Recent Updates
                            </h2>
                        </div>

                        {updates && updates.length > 0 ? (
                            <div>
                                {updates.slice(0, 3).map((update) => (
                                    <div key={update.id} className="update-item">
                                        <h4 className="update-title">{update.title}</h4>
                                        <p className="update-meta">
                                            {new Date(update.createdAt).toLocaleDateString()}
                                            {update.viewCount && ` • ${update.viewCount} views`}
                                        </p>
                                    </div>
                                ))}
                                <Link to="/updates" className="btn btn-secondary" style={{ width: '100%', marginTop: '1rem' }}>
                                    Manage Updates
                                </Link>
                            </div>
                        ) : (
                            <div className="empty-state-sm">
                                <p className="text-muted">No updates posted yet</p>
                                <Link to="/updates/create" className="btn btn-primary btn-sm" style={{ marginTop: '0.5rem' }}>
                                    Post Your First Update
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PoliticianDashboard;
