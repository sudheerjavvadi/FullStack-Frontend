import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

function Moderation() {
    const { user } = useSelector((state) => state.auth);

    if (user?.role !== 'MODERATOR') {
        return <Navigate to="/dashboard" />;
    }

    return (
        <div className="page-container">
            <div className="page-header">
                <h1 className="page-title">Moderation Zone</h1>
                <p className="page-description">Review flagged content, manage reports, and keep the community safe.</p>
            </div>

            <div className="grid gap-6 lg:grid-cols-2">
                <div className="rounded-[28px] border border-white/10 bg-black/70 p-6 shadow-glow backdrop-blur-xl">
                    <h2 className="text-xl font-semibold text-white">Pending Reviews</h2>
                    <p className="mt-3 text-slate-400">Monitor flagged comments, issue responses, and suspicious activity.</p>
                    <div className="mt-6 space-y-4">
                        <div className="rounded-[24px] bg-white/5 p-4 text-slate-300">
                            <p className="font-semibold text-white">Flagged comments</p>
                            <p className="mt-2 text-sm text-slate-400">Review user-reported comments before they are removed.</p>
                        </div>
                        <div className="rounded-[24px] bg-white/5 p-4 text-slate-300">
                            <p className="font-semibold text-white">Issue reports</p>
                            <p className="mt-2 text-sm text-slate-400">Check issue quality, user attachments, and content policy.</p>
                        </div>
                        <div className="rounded-[24px] bg-white/5 p-4 text-slate-300">
                            <p className="font-semibold text-white">Moderator actions</p>
                            <p className="mt-2 text-sm text-slate-400">Approve, reject, or escalate items that need admin review.</p>
                        </div>
                    </div>
                </div>

                <div className="rounded-[28px] border border-white/10 bg-black/70 p-6 shadow-glow backdrop-blur-xl">
                    <h2 className="text-xl font-semibold text-white">Moderation Metrics</h2>
                    <div className="mt-6 grid gap-4 sm:grid-cols-2">
                        <div className="rounded-[24px] bg-white/5 p-4">
                            <p className="text-sm text-slate-400">Open Reports</p>
                            <p className="mt-2 text-3xl font-bold text-white">12</p>
                        </div>
                        <div className="rounded-[24px] bg-white/5 p-4">
                            <p className="text-sm text-slate-400">Pending Flags</p>
                            <p className="mt-2 text-3xl font-bold text-white">5</p>
                        </div>
                        <div className="rounded-[24px] bg-white/5 p-4">
                            <p className="text-sm text-slate-400">Resolved Today</p>
                            <p className="mt-2 text-3xl font-bold text-white">7</p>
                        </div>
                        <div className="rounded-[24px] bg-white/5 p-4">
                            <p className="text-sm text-slate-400">Escalations</p>
                            <p className="mt-2 text-3xl font-bold text-white">1</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Moderation;
