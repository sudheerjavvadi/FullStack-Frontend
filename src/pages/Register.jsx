import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { register, clearError } from '../store/slices/authSlice';
import { toast } from 'react-toastify';
import { FiUser, FiMail, FiLock, FiPhone, FiMapPin, FiUserPlus } from 'react-icons/fi';

function Register() {
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        password: '',
        confirmPassword: '',
        phone: '',
        constituency: ''
    });

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { loading, error } = useSelector((state) => state.auth);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        if (error) dispatch(clearError());
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (formData.password !== formData.confirmPassword) {
            toast.error('Passwords do not match');
            return;
        }

        if (formData.password.length < 6) {
            toast.error('Password must be at least 6 characters');
            return;
        }

        try {
            await dispatch(register({
                fullName: formData.fullName,
                email: formData.email,
                password: formData.password,
                phone: formData.phone,
                constituency: formData.constituency,
            })).unwrap();

            toast.success('Registration successful! Please login.');
            navigate('/login');
        } catch (err) {
            toast.error(err || 'Registration failed. Please try again.');
        }
    };

    return (
        <div
            className="page-container"
            style={{
                maxWidth: '640px',
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
                    <h1 style={{ marginTop: '1rem', fontSize: '2.75rem', fontWeight: 700 }}>Create your citizen account</h1>
                    <p style={{ marginTop: '1rem', color: 'rgba(148, 163, 184, 0.95)', lineHeight: 1.75 }}>
                        Register with your local details and start reporting issues with evidence attachments.
                    </p>
                </div>

                <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '1.5rem' }}>
                    <div style={{ display: 'grid', gap: '1.5rem', gridTemplateColumns: '1fr 1fr' }}>
                        <div className="form-group">
                            <label className="form-label">
                                <FiUser style={{ marginRight: '0.5rem' }} /> Full Name
                            </label>
                            <input
                                type="text"
                                name="fullName"
                                className="form-input"
                                placeholder="Enter your full name"
                                value={formData.fullName}
                                onChange={handleChange}
                                required
                            />
                        </div>
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
                    </div>

                    <div style={{ display: 'grid', gap: '1.5rem', gridTemplateColumns: '1fr 1fr' }}>
                        <div className="form-group">
                            <label className="form-label">
                                <FiLock style={{ marginRight: '0.5rem' }} /> Password
                            </label>
                            <input
                                type="password"
                                name="password"
                                className="form-input"
                                placeholder="Create password"
                                value={formData.password}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label className="form-label">
                                <FiLock style={{ marginRight: '0.5rem' }} /> Confirm Password
                            </label>
                            <input
                                type="password"
                                name="confirmPassword"
                                className="form-input"
                                placeholder="Confirm password"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </div>

                    <div style={{ display: 'grid', gap: '1.5rem', gridTemplateColumns: '1fr 1fr' }}>
                        <div className="form-group">
                            <label className="form-label">
                                <FiPhone style={{ marginRight: '0.5rem' }} /> Phone Number
                            </label>
                            <input
                                type="tel"
                                name="phone"
                                className="form-input"
                                placeholder="Optional"
                                value={formData.phone}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="form-group">
                            <label className="form-label">
                                <FiMapPin style={{ marginRight: '0.5rem' }} /> Constituency
                            </label>
                            <input
                                type="text"
                                name="constituency"
                                className="form-input"
                                placeholder="Optional"
                                value={formData.constituency}
                                onChange={handleChange}
                            />
                        </div>
                    </div>

                    {error && <p className="form-error">{error}</p>}

                    <button type="submit" className="btn btn-primary btn-lg" disabled={loading} style={{ width: '100%' }}>
                        {loading ? 'Creating account...' : <><FiUserPlus /> Create Account</>}
                    </button>
                </form>

                <div style={{ marginTop: '1.75rem', textAlign: 'center', color: 'rgba(148, 163, 184, 0.95)', fontSize: '0.95rem' }}>
                    <p>
                        Already have an account?{' '}
                        <Link to="/login" style={{ color: '#ffffff', textDecoration: 'underline' }}>
                            Sign in here
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Register;
