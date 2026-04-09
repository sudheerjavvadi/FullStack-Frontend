import { Link, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
    FiHome,
    FiFileText,
    FiUsers,
    FiShield,
    FiMessageSquare,
    FiPieChart,
    FiSettings,
    FiLogOut,
} from 'react-icons/fi';
import { logout } from '../store/slices/authSlice';

function Sidebar({ closeSidebar }) {
    const location = useLocation();
    const { user, isAuthenticated } = useSelector((state) => state.auth);
    const dispatch = useDispatch();

    const isActive = (path) => location.pathname === path;

    // Links for all users (including non-authenticated on public pages)
    const publicLinks = [
        { icon: FiHome, label: 'Home', path: '/' },
        { icon: FiFileText, label: 'Updates', path: '/updates' },
        { icon: FiUsers, label: 'Politicians', path: '/politicians' },
    ];

    // Links for authenticated users
    const authenticatedLinks = [
        { icon: FiHome, label: 'Dashboard', path: '/dashboard' },
        { icon: FiFileText, label: 'Issues', path: '/issues' },
        { icon: FiMessageSquare, label: 'Feedback', path: '/feedback' },
        { icon: FiUsers, label: 'Politicians', path: '/politicians' },
    ];

    const roleLinks = {
        ADMIN: [
            { icon: FiShield, label: 'Admin Panel', path: '/admin-panel' },
            { icon: FiSettings, label: 'Settings', path: '/settings' },
        ],
        POLITICIAN: [
            { icon: FiPieChart, label: 'Post Update', path: '/updates/create' },
        ],
        CITIZEN: [
            { icon: FiFileText, label: 'Report Issue', path: '/issues/create' },
        ],
        MODERATOR: [
            { icon: FiShield, label: 'Moderation', path: '/moderation' },
        ],
    };

    return (
        <aside className="fixed inset-x-0 top-0 z-20 border-b border-white/10 bg-black/90 pb-4 backdrop-blur-xl text-slate-100 lg:static lg:inset-auto lg:h-screen lg:w-[280px] lg:border-r lg:border-b-0 lg:bg-black/95">
            <div className="flex flex-col gap-6 px-4 py-5 lg:px-5">
                {isAuthenticated ? (
                    <div className="rounded-[28px] border border-white/10 bg-white/5 p-4 shadow-[0_0_40px_rgba(255,255,255,0.04)]">
                        <div className="flex items-center gap-3">
                            <div className="flex h-12 w-12 items-center justify-center rounded-3xl bg-white/10 text-lg font-semibold text-white">
                                {user?.fullName?.split(' ').map((part) => part[0]).join('').slice(0, 2)}
                            </div>
                            <div>
                                <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Signed in as</p>
                                <p className="font-semibold text-white">{user?.fullName}</p>
                                <p className="text-[11px] uppercase tracking-[0.32em] text-slate-500">{user?.role}</p>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="rounded-[28px] border border-white/10 bg-white/5 p-4 shadow-[0_0_40px_rgba(255,255,255,0.04)]">
                        <p className="text-sm font-semibold text-white">CitizenConnect</p>
                        <p className="text-xs text-slate-400 mt-1">Engage with your representatives</p>
                    </div>
                )}

                <div className="space-y-3">
                    {(isAuthenticated ? authenticatedLinks : publicLinks).map((item) => {
                        const Icon = item.icon;
                        return (
                            <Link
                                key={item.path}
                                to={item.path}
                                onClick={closeSidebar}
                                className={`flex items-center gap-3 rounded-[24px] border px-4 py-3 text-sm transition duration-200 ${isActive(item.path) ? 'border-white/20 bg-white/10 text-white shadow-[0_0_40px_rgba(255,255,255,0.08)]' : 'border-white/10 text-slate-300 hover:border-white/20 hover:bg-white/5 hover:text-white'}`}
                            >
                                <Icon className="text-lg" />
                                <span>{item.label}</span>
                            </Link>
                        );
                    })}
                </div>

                {isAuthenticated && (
                    <div className="space-y-3">
                        {roleLinks[user?.role]?.map((item) => {
                            const Icon = item.icon;
                            return (
                                <Link
                                    key={item.path}
                                    to={item.path}
                                    onClick={closeSidebar}
                                    className={`flex items-center gap-3 rounded-[24px] border px-4 py-3 text-sm transition duration-200 ${isActive(item.path) ? 'border-white/20 bg-white/10 text-white shadow-[0_0_40px_rgba(255,255,255,0.08)]' : 'border-white/10 text-slate-300 hover:border-white/20 hover:bg-white/5 hover:text-white'}`}
                                >
                                    <Icon className="text-lg" />
                                    <span>{item.label}</span>
                                </Link>
                            );
                        })}
                    </div>
                )}

                {isAuthenticated && (
                    <button
                        type="button"
                        onClick={() => {
                            dispatch(logout());
                            closeSidebar();
                        }}
                        className="mt-auto flex items-center justify-center gap-2 rounded-[24px] border border-white/10 bg-white/5 px-4 py-3 text-sm uppercase tracking-[0.25em] text-slate-300 transition hover:border-white/20 hover:bg-white/10 hover:text-white"
                    >
                        <FiLogOut className="text-base" />
                        Sign out
                    </button>
                )}
            </div>
        </aside>
    );
}

export default Sidebar;
