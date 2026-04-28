import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { login, clearError } from '../store/slices/authSlice';
import { toast } from 'react-toastify';
import { FiMail, FiLock, FiLogIn, FiAlertCircle } from 'react-icons/fi';

function Login() {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [showSlowServerWarning, setShowSlowServerWarning] = useState(false);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { loading, error } = useSelector((state) => state.auth);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        if (error) dispatch(clearError());
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setShowSlowServerWarning(false);

        // Show warning if it takes more than 5 seconds
        const warningTimer = setTimeout(() => {
            setShowSlowServerWarning(true);
            toast.info('Server is waking up... This may take up to 30 seconds on first login.');
        }, 5000);

        try {
            await dispatch(login(formData)).unwrap();
            clearTimeout(warningTimer);
            setShowSlowServerWarning(false);
            toast.success('Login successful! Welcome back.');
            navigate('/dashboard');
        } catch (err) {
            clearTimeout(warningTimer);
            setShowSlowServerWarning(false);
            
            // Better error messages
            if (err?.code === 'ECONNABORTED' || err?.message?.includes('timeout')) {
                toast.error('Request timed out. Please check your connection and try again.');
            } else if (err?.response?.status === 503) {
                toast.error('Server is temporarily unavailable. Please try again in a moment.');
            } else {
                toast.error(err || 'Login failed. Please check your credentials.');
            }
        }
    };

    return (
        <div
            className="page-container"
            style={{
                maxWidth: '520px',
                margin: '0 auto',
                minHeight: 'calc(100vh - 88px)',
                padding: '2.5rem 1.5rem',
                display: 'flex',
                alignItems: 'center',
            }}
        >
            <div
                className="card"
                style={{
                    width: '100%',
                    padding: '2.5rem',
                    background: 'rgba(15, 15, 35, 0.92)',
                    border: '1px solid rgba(255,255,255,0.08)',
                }}
            >
                <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                    <p style={{ fontSize: '0.75rem', letterSpacing: '0.3em', textTransform: 'uppercase', color: 'rgba(148, 163, 184, 0.85)' }}>
                        CitizenConnect
                    </p>
                    <h1 style={{ marginTop: '1rem', fontSize: '2.75rem', fontWeight: 700 }}>Sign in to continue</h1>
                    <p style={{ marginTop: '1rem', color: 'rgba(148, 163, 184, 0.95)', lineHeight: 1.75 }}>
                        Access your dashboard, report issues, and stay connected with your community.
                    </p>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label className="form-label">
                            <FiMail style={{ marginRight: '0.5rem' }} /> Email Address
                        </label>
                        <input
                            type="email"
                            name="email"
                            className="form-input"
                            placeholder="Enter your email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label className="form-label">
                            <FiLock style={{ marginRight: '0.5rem' }} /> Password
                        </label>
                        <input
                            type="password"
                            name="password"
                            className="form-input"
                            placeholder="Enter your password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    {error && <p className="form-error">{error}</p>}

                    {showSlowServerWarning && (
                        <div style={{
                            padding: '1rem',
                            marginBottom: '1.25rem',
                            background: 'rgba(248, 113, 113, 0.1)',
                            border: '1px solid rgba(248, 113, 113, 0.3)',
                            borderRadius: '0.5rem',
                            color: '#fca5a5',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.75rem',
                            fontSize: '0.875rem'
                        }}>
                            <FiAlertCircle size={18} />
                            <span>Server is cold-starting. Please be patient...</span>
                        </div>
                    )}

                    <button type="submit" className="btn btn-primary btn-lg" disabled={loading} style={{ width: '100%' }}>
                        {loading ? (
                            <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
                                <span
                                    style={{
                                        display: 'inline-block',
                                        width: '1rem',
                                        height: '1rem',
                                        border: '2px solid rgba(255,255,255,0.3)',
                                        borderTop: '2px solid #ffffff',
                                        borderRadius: '50%',
                                        animation: 'spin 1s linear infinite'
                                    }}
                                />
                                Signing in...
                            </span>
                        ) : (
                            <><FiLogIn /> Sign In</>
                        )}
                    </button>
                    <style>{`
                        @keyframes spin {
                            to { transform: rotate(360deg); }
                        }
                    `}</style>
                </form>

                <div style={{ marginTop: '1.75rem', textAlign: 'center', color: 'rgba(148, 163, 184, 0.95)', fontSize: '0.95rem' }}>
                    <p>
                        Don't have an account?{' '}
                        <Link to="/register" style={{ color: '#ffffff', textDecoration: 'underline' }}>
                            Register here
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Login;
