import { Routes, Route, Navigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';

// Components
import Navbar from './components/Navbar';
import DashboardLayout from './components/DashboardLayout';
import PrivateRoute from './components/PrivateRoute';

// Pages
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Issues from './pages/Issues';
import IssueDetail from './pages/IssueDetail';
import CreateIssue from './pages/CreateIssue';
import Updates from './pages/Updates';
import CreateUpdate from './pages/CreateUpdate';
import Politicians from './pages/Politicians';
import PoliticianProfile from './pages/PoliticianProfile';
import Moderation from './pages/Moderation';
import Feedback from './pages/Feedback';
import Profile from './pages/Profile';
import AdminDashboard from './pages/AdminDashboard';
import AllUsers from './pages/AllUsers';
import AboutUs from './pages/AboutUs';
import ContactUs from './pages/ContactUs';
import Accessibility from './pages/Accessibility';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfService from './pages/TermsOfService';
import Settings from './pages/Settings';
import AdminPanel from './pages/AdminPanel';
import Footer from './components/Footer';
import { fetchCurrentUser } from './store/slices/authSlice';

function App() {
    const { isAuthenticated, token } = useSelector((state) => state.auth);
    const dispatch = useDispatch();

    // Validate token against the server on every app load.
    // This ensures an expired or revoked token is caught early
    // rather than waiting for the first protected API call to fail.
    useEffect(() => {
        if (token) {
            dispatch(fetchCurrentUser());
        }
    }, [dispatch, token]);

    return (
        <div className="app-container min-h-screen bg-black text-white">
            <Navbar />
            <main className="main-content">
                <Routes>
                {/* Public Routes */}
                <Route path="/" element={isAuthenticated ? <Navigate to="/dashboard" /> : <Home />} />
                <Route
                    path="/login"
                    element={isAuthenticated ? <Navigate to="/dashboard" /> : <Login />}
                />
                <Route
                    path="/register"
                    element={isAuthenticated ? <Navigate to="/dashboard" /> : <Register />}
                />
                <Route path="/about-us" element={<AboutUs />} />
                <Route path="/contact-us" element={<ContactUs />} />
                <Route path="/accessibility" element={<Accessibility />} />
                <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                <Route path="/terms-of-service" element={<TermsOfService />} />
                <Route element={<DashboardLayout />}>
                    <Route path="/updates" element={<Updates />} />
                    <Route path="/politicians" element={<Politicians />} />
                    <Route path="/politicians/:id" element={<PoliticianProfile />} />
                </Route>


                {/* Protected Routes */}
                <Route element={<PrivateRoute />}>
                    <Route element={<DashboardLayout />}>
                        <Route path="/dashboard" element={<Dashboard />} />
                        <Route path="/issues" element={<Issues />} />
                        <Route path="/issues/:id" element={<IssueDetail />} />
                        <Route path="/issues/create" element={<CreateIssue />} />
                        <Route path="/feedback" element={<Feedback />} />
                        <Route path="/profile" element={<Profile />} />
                        <Route path="/updates/create" element={<CreateUpdate />} />
                        <Route path="/admin" element={<AdminDashboard />} />
                        <Route path="/admin-panel" element={<AdminPanel />} />
                        <Route path="/settings" element={<Settings />} />
                        <Route path="/users" element={<AllUsers />} />
                    </Route>
                </Route>
                <Route element={<PrivateRoute allowedRoles={['MODERATOR']} />}>
                    <Route element={<DashboardLayout />}>
                        <Route path="/moderation" element={<Moderation />} />
                    </Route>
                </Route>

                {/* 404 */}
                <Route path="*" element={<Navigate to="/" />} />
                </Routes>
            </main>
            <Footer />
        </div>
    );
}

export default App;
