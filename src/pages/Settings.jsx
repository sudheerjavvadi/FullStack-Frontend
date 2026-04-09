import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

function Settings() {
    const { user } = useSelector((state) => state.auth);

    if (user?.role !== 'ADMIN') {
        return <Navigate to="/dashboard" />;
    }

    return (
        <div className="page-container">
            <div className="space-y-8">
                <div className="rounded-[32px] border border-white/10 bg-white/5 p-8 shadow-glow backdrop-blur-xl">
                    <h1 className="text-4xl font-semibold text-white">System Settings</h1>
                    <p className="mt-4 text-slate-400">Manage platform configuration and preferences.</p>
                </div>

                <div className="grid gap-6 lg:grid-cols-2">
                    <div className="rounded-[28px] border border-white/10 bg-black/70 p-8 shadow-lg">
                        <h2 className="text-xl font-semibold text-white">General Settings</h2>
                        <div className="mt-6 space-y-4">
                            <div>
                                <label className="block text-sm text-slate-300 mb-2">Platform Name</label>
                                <input type="text" placeholder="Citizen Connect" className="w-full rounded-[16px] border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-slate-500 transition focus:border-white/20 focus:outline-none" />
                            </div>
                            <div>
                                <label className="block text-sm text-slate-300 mb-2">Support Email</label>
                                <input type="email" placeholder="support@citizenconnect.app" className="w-full rounded-[16px] border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-slate-500 transition focus:border-white/20 focus:outline-none" />
                            </div>
                        </div>
                    </div>

                    <div className="rounded-[28px] border border-white/10 bg-black/70 p-8 shadow-lg">
                        <h2 className="text-xl font-semibold text-white">Security</h2>
                        <div className="mt-6 space-y-4">
                            <div className="flex items-center justify-between">
                                <span className="text-sm text-slate-300">Two-factor authentication</span>
                                <input type="checkbox" className="rounded-md w-5 h-5 cursor-pointer" />
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-sm text-slate-300">Email verification required</span>
                                <input type="checkbox" defaultChecked className="rounded-md w-5 h-5 cursor-pointer" />
                            </div>
                        </div>
                    </div>

                    <div className="rounded-[28px] border border-white/10 bg-black/70 p-8 shadow-lg">
                        <h2 className="text-xl font-semibold text-white">Content Moderation</h2>
                        <div className="mt-6 space-y-4">
                            <div>
                                <label className="block text-sm text-slate-300 mb-2">Max file upload size (MB)</label>
                                <input type="number" placeholder="50" className="w-full rounded-[16px] border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-slate-500 transition focus:border-white/20 focus:outline-none" />
                            </div>
                        </div>
                    </div>

                    <div className="rounded-[28px] border border-white/10 bg-black/70 p-8 shadow-lg">
                        <h2 className="text-xl font-semibold text-white">Notifications</h2>
                        <div className="mt-6 space-y-4">
                            <div className="flex items-center justify-between">
                                <span className="text-sm text-slate-300">Email notifications</span>
                                <input type="checkbox" defaultChecked className="rounded-md w-5 h-5 cursor-pointer" />
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-sm text-slate-300">Issue status updates</span>
                                <input type="checkbox" defaultChecked className="rounded-md w-5 h-5 cursor-pointer" />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex gap-3">
                    <button className="rounded-[24px] border border-white/10 bg-white/5 px-6 py-3 text-sm font-semibold text-white transition hover:border-white/20 hover:bg-white/10">
                        Cancel
                    </button>
                    <button className="rounded-[24px] bg-white/10 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/20">
                        Save Settings
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Settings;
