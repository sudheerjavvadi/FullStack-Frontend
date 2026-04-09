import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { commentAPI } from '../api/api';
import {
    FiFlag, FiCheckCircle, FiAlertTriangle, FiMessageSquare,
    FiShield, FiTrash2, FiCheck, FiX
} from 'react-icons/fi';

function ModeratorDashboard() {
    const { user } = useSelector((state) => state.auth);
    const [flaggedComments, setFlaggedComments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [stats, setStats] = useState({ flagged: 0, reviewed: 0, removed: 0 });

    useEffect(() => {
        loadFlaggedComments();
    }, []);

    const loadFlaggedComments = async () => {
        try {
            setLoading(true);
            const response = await commentAPI.getFlagged();
            setFlaggedComments(response.data.data || []);
            setStats(prev => ({ ...prev, flagged: response.data.data?.length || 0 }));
        } catch (error) {
            console.error('Error loading flagged comments:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleUnflag = async (commentId) => {
        try {
            await commentAPI.unflag(commentId);
            setFlaggedComments(prev => prev.filter(c => c.id !== commentId));
            setStats(prev => ({ ...prev, reviewed: prev.reviewed + 1, flagged: prev.flagged - 1 }));
        } catch (error) {
            console.error('Error unflagging comment:', error);
        }
    };

    const handleDelete = async (commentId) => {
        if (!window.confirm('Are you sure you want to delete this comment?')) return;
        try {
            await commentAPI.delete(commentId);
            setFlaggedComments(prev => prev.filter(c => c.id !== commentId));
            setStats(prev => ({ ...prev, removed: prev.removed + 1, flagged: prev.flagged - 1 }));
        } catch (error) {
            console.error('Error deleting comment:', error);
        }
    };

    return (
        <div className="page-container">
            {/* Welcome Header */}
            <div className="dashboard-header">
                <div className="dashboard-welcome">
                    <div className="moderator-avatar">
                        <FiShield size={28} />
                    </div>
                    <div>
                        <h1 className="page-title">Moderator Dashboard</h1>
                        <p className="page-description">
                            Monitor interactions, ensure respectful communication, and resolve conflicts.
                        </p>
                    </div>
                </div>
            </div>

            {/* Stats Cards */}
            <div className="stats-grid">
                <div className="stat-card">
                    <div className="stat-icon rose"><FiFlag /></div>
                    <div className="stat-value">{stats.flagged}</div>
                    <div className="stat-label">Flagged Comments</div>
                </div>
                <div className="stat-card">
                    <div className="stat-icon emerald"><FiCheckCircle /></div>
                    <div className="stat-value">{stats.reviewed}</div>
                    <div className="stat-label">Reviewed Today</div>
                </div>
                <div className="stat-card">
                    <div className="stat-icon amber"><FiTrash2 /></div>
                    <div className="stat-value">{stats.removed}</div>
                    <div className="stat-label">Removed</div>
                </div>
                <div className="stat-card">
                    <div className="stat-icon primary"><FiShield /></div>
                    <div className="stat-value">Active</div>
                    <div className="stat-label">Status</div>
                </div>
            </div>

            {/* Flagged Comments Queue */}
            <div className="card">
                <div className="card-header">
                    <h2 className="card-title">
                        <FiAlertTriangle style={{ marginRight: '0.5rem', color: 'var(--accent-amber)' }} />
                        Flagged Comments - Review Queue
                    </h2>
                    <button onClick={loadFlaggedComments} className="btn btn-secondary btn-sm">
                        Refresh
                    </button>
                </div>

                {loading ? (
                    <div className="loading-container">
                        <div className="spinner"></div>
                    </div>
                ) : flaggedComments.length > 0 ? (
                    <div className="moderation-queue">
                        {flaggedComments.map((comment) => (
                            <div key={comment.id} className="moderation-item">
                                <div className="moderation-content">
                                    <div className="moderation-header">
                                        <span className="moderation-author">
                                            <strong>{comment.authorName}</strong>
                                        </span>
                                        <span className="moderation-date">
                                            {new Date(comment.createdAt).toLocaleDateString()}
                                        </span>
                                    </div>
                                    <p className="moderation-text">{comment.content}</p>
                                    {comment.flagReason && (
                                        <div className="flag-reason">
                                            <FiFlag /> Reason: {comment.flagReason}
                                        </div>
                                    )}
                                    <div className="moderation-context">
                                        <span>Issue: {comment.issueTitle || `#${comment.issueId}`}</span>
                                    </div>
                                </div>
                                <div className="moderation-actions">
                                    <button
                                        onClick={() => handleUnflag(comment.id)}
                                        className="btn btn-success btn-sm"
                                        title="Approve - Remove flag"
                                    >
                                        <FiCheck /> Approve
                                    </button>
                                    <button
                                        onClick={() => handleDelete(comment.id)}
                                        className="btn btn-danger btn-sm"
                                        title="Delete comment"
                                    >
                                        <FiTrash2 /> Remove
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="empty-state">
                        <div className="empty-state-icon">✅</div>
                        <h3 className="empty-state-title">All Clear!</h3>
                        <p className="empty-state-description">
                            No flagged comments to review. Great job keeping the community respectful!
                        </p>
                    </div>
                )}
            </div>

            {/* Moderation Guidelines */}
            <div className="card" style={{ marginTop: '1.5rem' }}>
                <h3 className="card-title" style={{ marginBottom: '1rem' }}>
                    <FiMessageSquare style={{ marginRight: '0.5rem' }} />
                    Moderation Guidelines
                </h3>
                <div className="guidelines-grid">
                    <div className="guideline-item">
                        <div className="guideline-icon approve">✓</div>
                        <div>
                            <strong>Approve</strong>
                            <p>If the comment is appropriate and was incorrectly flagged</p>
                        </div>
                    </div>
                    <div className="guideline-item">
                        <div className="guideline-icon remove">✗</div>
                        <div>
                            <strong>Remove</strong>
                            <p>If the comment violates community guidelines or is disrespectful</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ModeratorDashboard;
