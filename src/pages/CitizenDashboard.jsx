import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchMyIssues } from '../store/slices/issueSlice';
import { fetchUpdates } from '../store/slices/updateSlice';
import {
    FiFileText, FiCheckCircle, FiClock, FiAlertCircle,
    FiPlus, FiBell, FiStar, FiMessageSquare
} from 'react-icons/fi';

function CitizenDashboard() {
    const { user } = useSelector((state) => state.auth);
    const { issues, loading } = useSelector((state) => state.issues);
    const { updates } = useSelector((state) => state.updates);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchMyIssues());
        dispatch(fetchUpdates());
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
        open: issues.filter(i => i.status === 'OPEN').length,
        inProgress: issues.filter(i => i.status === 'IN_PROGRESS').length,
        resolved: issues.filter(i => i.status === 'RESOLVED').length
    };

    const getInitials = (name) => {
        if (!name) return 'U';
        return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
    };

    return (
        <div className="page-container">
            {/* Welcome Header */}
            <div className="dashboard-header">
                <div className="dashboard-welcome">
                    <div className="user-avatar-large">
                        {getInitials(user?.fullName)}
                    </div>
                    <div>
                        <h1 className="page-title">Welcome, {user?.fullName}!</h1>
                        <p className="page-description">
                            Report issues, track progress, and stay connected with your representatives.
                        </p>
                    </div>
                </div>
                <Link to="/issues/create" className="btn btn-primary btn-lg">
                    <FiPlus /> Report New Issue
                </Link>
            </div>

            {/* Stats Cards */}
            <div className="stats-grid">
                <div className="stat-card">
                    <div className="stat-icon primary"><FiFileText /></div>
                    <div className="stat-value">{issueStats.total}</div>
                    <div className="stat-label">Total Issues</div>
                </div>
                <div className="stat-card">
                    <div className="stat-icon cyan"><FiAlertCircle /></div>
                    <div className="stat-value">{issueStats.open}</div>
                    <div className="stat-label">Open</div>
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
            </div>

            <div className="dashboard-grid">
                {/* My Issues Section */}
                <div className="col-8">
                    <div className="card">
                        <div className="card-header">
                            <h2 className="card-title">
                                <FiFileText style={{ marginRight: '0.5rem' }} />
                                My Reported Issues
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
                                    </Link>
                                ))}
                            </div>
                        ) : (
                            <div className="empty-state">
                                <div className="empty-state-icon">📋</div>
                                <h3 className="empty-state-title">No issues reported yet</h3>
                                <p className="empty-state-description">
                                    Have a concern in your area? Report it and get help from your representatives.
                                </p>
                                <Link to="/issues/create" className="btn btn-primary">
                                    Report Your First Issue
                                </Link>
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
                            <Link to="/issues/create" className="quick-action-btn">
                                <FiPlus /> Report Issue
                            </Link>
                            <Link to="/politicians" className="quick-action-btn">
                                <FiStar /> Rate Politicians
                            </Link>
                            <Link to="/feedback" className="quick-action-btn">
                                <FiMessageSquare /> My Feedback
                            </Link>
                        </div>
                    </div>

                    {/* Recent Updates */}
                    <div className="card">
                        <div className="card-header">
                            <h2 className="card-title">
                                <FiBell style={{ marginRight: '0.5rem' }} />
                                Latest Updates
                            </h2>
                        </div>

                        {updates.length > 0 ? (
                            <div>
                                {updates.slice(0, 4).map((update) => (
                                    <div key={update.id} className="update-item">
                                        <h4 className="update-title">{update.title}</h4>
                                        <p className="update-meta">
                                            by {update.politicianName} • {new Date(update.createdAt).toLocaleDateString()}
                                        </p>
                                    </div>
                                ))}
                                <Link to="/updates" className="btn btn-secondary" style={{ width: '100%', marginTop: '1rem' }}>
                                    View All Updates
                                </Link>
                            </div>
                        ) : (
                            <p className="text-muted">No updates from politicians yet</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CitizenDashboard;
