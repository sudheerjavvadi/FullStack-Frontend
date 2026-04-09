import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { userAPI } from '../api/api';
import { FiMapPin, FiMail, FiArrowLeft } from 'react-icons/fi';

function PoliticianProfile() {
    const { id } = useParams();
    const [politician, setPolitician] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPolitician = async () => {
            try {
                const response = await userAPI.getById(id);
                setPolitician(response.data.data);
            } catch (error) {
                console.error('Unable to load politician profile', error);
            } finally {
                setLoading(false);
            }
        };

        fetchPolitician();
    }, [id]);

    if (loading) {
        return (
            <div className="page-container">
                <div className="loading-container">
                    <div className="spinner"></div>
                </div>
            </div>
        );
    }

    if (!politician) {
        return (
            <div className="page-container">
                <div className="card">
                    <div className="empty-state">
                        <div className="empty-state-icon">⚠️</div>
                        <h3 className="empty-state-title">Politician not found</h3>
                        <p className="empty-state-description">We could not find that representative. Please go back and try another profile.</p>
                        <Link to="/politicians" className="btn btn-primary mt-6 inline-flex items-center gap-2">
                            <FiArrowLeft /> Back to representatives
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="page-container">
            <div className="page-header">
                <h1 className="page-title">{politician.fullName}</h1>
                <p className="page-description">Detailed profile for your local representative.</p>
            </div>

            <div className="rounded-[32px] border border-white/10 bg-black/70 p-8 shadow-glow backdrop-blur-xl">
                <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
                    <div>
                        <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Politician profile</p>
                        <h2 className="mt-3 text-3xl font-semibold text-white">{politician.fullName}</h2>
                        <p className="mt-2 text-slate-400">Constituency: {politician.constituency || 'Not listed'}</p>
                    </div>
                    <div className="flex items-center gap-3 rounded-[24px] bg-white/5 p-4">
                        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white/10 text-2xl font-bold text-white">
                            {politician.fullName?.split(' ').map((n) => n[0]).join('').slice(0, 2).toUpperCase()}
                        </div>
                        <div>
                            <p className="text-sm uppercase tracking-[0.3em] text-slate-500">Role</p>
                            <p className="text-lg font-semibold text-white">Politician</p>
                        </div>
                    </div>
                </div>

                <div className="mt-8 grid gap-6 lg:grid-cols-2">
                    <div className="rounded-[28px] bg-white/5 p-6">
                        <h3 className="text-xl font-semibold text-white">Contact Details</h3>
                        <div className="mt-6 space-y-4 text-slate-300">
                            {politician.email && (
                                <p className="flex items-center gap-3">
                                    <FiMail className="text-lg text-slate-400" /> {politician.email}
                                </p>
                            )}
                            {politician.constituency && (
                                <p className="flex items-center gap-3">
                                    <FiMapPin className="text-lg text-slate-400" /> {politician.constituency}
                                </p>
                            )}
                            <p className="text-sm text-slate-400">Status: {politician.status || 'Active'}</p>
                        </div>
                    </div>
                    <div className="rounded-[28px] bg-white/5 p-6">
                        <h3 className="text-xl font-semibold text-white">About</h3>
                        <p className="mt-4 text-slate-300">
                            {politician.bio || 'This representative is committed to improving local transparency and community services.'}
                        </p>
                    </div>
                </div>

                <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <Link to="/politicians" className="btn btn-outline inline-flex items-center gap-2">
                        <FiArrowLeft /> Back to representatives
                    </Link>
                    <Link to="/profile" className="btn btn-primary inline-flex items-center gap-2">
                        View my profile
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default PoliticianProfile;
