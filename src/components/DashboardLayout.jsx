import { useState, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Sidebar from './Sidebar';

function DashboardLayout() {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const location = useLocation();

    // Close sidebar when route changes
    useEffect(() => {
        setSidebarOpen(false);
    }, [location.pathname]);

    // Sync with Navbar's sidebar state
    useEffect(() => {
        const checkSidebarState = () => {
            if (window.navbarSidebarState) {
                setSidebarOpen(window.navbarSidebarState.sidebarOpen);
            }
        };
        
        const interval = setInterval(checkSidebarState, 50);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="min-h-screen bg-black text-slate-100 pt-16">
            {/* Sidebar wrapper - positioned below navbar */}
            <div className={`fixed inset-y-0 left-0 top-16 z-40 w-[280px] overflow-y-auto transition-transform duration-300 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                <Sidebar closeSidebar={() => {
                    if (window.navbarSidebarState) {
                        window.navbarSidebarState.setSidebarOpen(false);
                    }
                }} />
            </div>

            {/* Main content */}
            <main className="min-h-[calc(100vh-72px)] bg-black px-4 py-5 sm:px-6 sm:py-6 lg:px-8 lg:py-8">
                <Outlet />
            </main>
        </div>
    );
}

export default DashboardLayout;
