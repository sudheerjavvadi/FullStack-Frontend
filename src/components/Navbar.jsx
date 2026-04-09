import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../store/slices/authSlice';
import { FiLogOut, FiBell, FiMenu, FiX } from 'react-icons/fi';
import { useState, useEffect } from 'react';

function Navbar() {
    const { isAuthenticated, user } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
    const [sidebarOpen, setSidebarOpen] = useState(false);

    // Define constants before useEffect
    const getInitials = (name) => {
        if (!name) return 'U';
        return name.split(' ').map((part) => part[0]).join('').slice(0, 2).toUpperCase();
    };

    const initials = getInitials(user?.fullName);
    const isOnProtectedPage = isAuthenticated && (
        location.pathname.startsWith('/dashboard') || 
        location.pathname.startsWith('/moderation') ||
        location.pathname.startsWith('/admin') ||
        location.pathname.startsWith('/issues') || 
        location.pathname.startsWith('/feedback') ||
        location.pathname.startsWith('/profile') ||
        location.pathname.startsWith('/settings') ||
        location.pathname.startsWith('/admin-panel')
    );
    const isOnPageWithSidebar = isOnProtectedPage || 
        location.pathname.startsWith('/politicians') || 
        location.pathname.startsWith('/updates');

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 768);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Close sidebar when route changes or when moving away from sidebar pages
    useEffect(() => {
        setSidebarOpen(false);
        // Clear global state when moving to pages without sidebar
        if (!isOnPageWithSidebar && window.navbarSidebarState) {
            window.navbarSidebarState.setSidebarOpen(false);
        }
    }, [location.pathname, isOnPageWithSidebar]);

    // Store sidebar state globally for DashboardLayout to access
    useEffect(() => {
        window.navbarSidebarState = { sidebarOpen, setSidebarOpen };
    }, [sidebarOpen]);

    const handleLogout = () => {
        dispatch(logout());
        navigate('/');
    };

    return (
        <header className="sticky top-0 z-50 border-b border-white/10 bg-black/90 backdrop-blur-xl shadow-[0_10px_70px_rgba(0,0,0,0.35)]">
            <div className="px-4 py-3 sm:px-6 lg:px-8">
                <div className="mx-auto flex max-w-[1400px] items-center justify-between gap-4">
                    {/* Left Section: Logo/Menu + Title */}
                    <div className="flex items-center gap-3 md:gap-4 min-w-0">
                        {isOnPageWithSidebar && (
                            <button
                                onClick={() => setSidebarOpen(!sidebarOpen)}
                                className="inline-flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-[24px] border border-white/10 bg-white/5 text-slate-300 transition hover:border-white/20 hover:bg-white/10"
                            >
                                {sidebarOpen ? <FiX className="text-xl" /> : <FiMenu className="text-xl" />}
                            </button>
                        )}
                        <Link to="/" className="flex items-center gap-2 text-white no-underline md:gap-3 min-w-0">
                            <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-[24px] border border-white/10 bg-white/5 text-lg font-semibold text-white md:h-11 md:w-11">
                                CC
                            </div>
                            {!isOnProtectedPage && (
                                <div className="hidden sm:block">
                                    <p className="text-xs uppercase tracking-[0.3em] text-slate-500">CitizenConnect</p>
                                </div>
                            )}
                            {isOnProtectedPage && (
                                <div className="min-w-0">
                                    <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Welcome back</p>
                                    <h1 className="text-lg font-semibold text-white truncate md:text-2xl">{user?.fullName}</h1>
                                </div>
                            )}
                        </Link>
                    </div>

                    {/* Center Section: Navigation (Public pages without sidebar only) */}
                    {!isOnPageWithSidebar && !isAuthenticated && (
                        <nav className="hidden items-center gap-3 md:flex">
                            <Link to="/" className="rounded-[24px] border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-200 transition hover:border-white/20 hover:bg-white/10">
                                Home
                            </Link>
                            <Link to="/updates" className="rounded-[24px] border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-200 transition hover:border-white/20 hover:bg-white/10">
                                Updates
                            </Link>
                            <Link to="/politicians" className="rounded-[24px] border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-200 transition hover:border-white/20 hover:bg-white/10">
                                Politicians
                            </Link>
                        </nav>
                    )}

                    {/* Right Section: Actions */}
                    <div className="flex items-center gap-2 sm:gap-3">
                        {isAuthenticated && (
                            <>
                                <button className="inline-flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-[24px] border border-white/10 bg-white/5 text-slate-200 transition hover:border-white/20 hover:bg-white/10">
                                    <FiBell />
                                </button>
                                <div className="hidden items-center gap-3 rounded-[24px] border border-white/10 bg-white/5 px-4 py-2 sm:flex">
                                    <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-3xl bg-white/10 text-sm font-semibold text-white">
                                        {initials}
                                    </div>
                                    <div className="hidden sm:block">
                                        <p className="text-sm font-semibold text-white">{user?.fullName}</p>
                                        <p className="text-xs uppercase tracking-[0.2em] text-slate-500">{isOnProtectedPage ? 'Active account' : user?.role}</p>
                                    </div>
                                </div>
                                <button
                                    onClick={handleLogout}
                                    className="rounded-[24px] border border-white/10 bg-white/5 px-3 py-2 text-sm text-slate-200 transition hover:border-white/20 hover:bg-white/10 sm:px-4 flex-shrink-0"
                                >
                                    <FiLogOut className="inline-block" />
                                    {!isMobile && <span className="ml-2">Logout</span>}
                                </button>
                            </>
                        )}
                        {!isAuthenticated && (
                            <>
                                <Link to="/login" className="rounded-[24px] border border-white/10 bg-white/5 px-3 py-2 text-sm text-slate-200 transition hover:border-white/20 hover:bg-white/10 sm:px-4">
                                    Login
                                </Link>
                                <Link to="/register" className="rounded-[24px] border border-white/10 bg-white/5 px-3 py-2 text-sm text-white transition hover:border-white/20 hover:bg-white/10 sm:px-4">
                                    Register
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            </div>

            {/* Overlay for sidebar */}
            {sidebarOpen && isOnProtectedPage && (
                <div
                    className="fixed inset-0 top-[80px] z-30 bg-black/60"
                    onClick={() => setSidebarOpen(false)}
                />
            )}
        </header>
    );
}

export default Navbar;
