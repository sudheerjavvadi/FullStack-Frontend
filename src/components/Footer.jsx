import { Link } from 'react-router-dom';
import { FiMail, FiInstagram, FiFacebook, FiLinkedin } from 'react-icons/fi';

function Footer() {
    return (
        <footer className="footer-panel mt-14 border-t border-white/10 bg-black/80 text-slate-300 backdrop-blur-xl">
            <div className="mx-auto flex max-w-[1400px] flex-col gap-10 px-4 py-10 sm:px-6 lg:px-8 lg:flex-row lg:items-start lg:justify-between">
                <div className="max-w-xl space-y-4">
                    <div className="flex items-center gap-4">
                        <div className="flex h-14 w-14 items-center justify-center rounded-3xl bg-white/10 text-lg font-semibold text-white shadow-glow">
                            CC
                        </div>
                        <div>
                            <p className="text-base font-semibold text-white">Citizen Connect</p>
                            <p className="text-sm text-slate-400">A modern civic engagement platform for citizens, moderators, and representatives.</p>
                        </div>
                    </div>
                    <p className="max-w-md text-sm leading-7 text-slate-400">
                        Citizen Connect empowers communities to report issues, share feedback, and collaborate with elected officials in a transparent, minimalist interface.
                    </p>
                </div>

                <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-2">
                    <div className="space-y-4">
                        <p className="text-sm uppercase tracking-[0.24em] text-slate-500">Resources</p>
                        <div className="space-y-3 text-sm text-slate-300">
                            <Link to="/about-us" className="block transition hover:text-white">About Us</Link>
                            <Link to="/contact-us" className="block transition hover:text-white">Contact Us</Link>
                            <Link to="/accessibility" className="block transition hover:text-white">Accessibility statement</Link>
                            <Link to="/privacy-policy" className="block transition hover:text-white">Privacy policy</Link>
                            <Link to="/terms-of-service" className="block transition hover:text-white">Terms of service</Link>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <p className="text-sm uppercase tracking-[0.24em] text-slate-500">Connect</p>
                        <div className="flex flex-wrap gap-3">
                            <a href="mailto:support@citizenconnect.app" className="footer-social-button" aria-label="Email">
                                <FiMail className="h-5 w-5" />
                            </a>
                            <a href="https://instagram.com" target="_blank" rel="noreferrer" className="footer-social-button" aria-label="Instagram">
                                <FiInstagram className="h-5 w-5" />
                            </a>
                            <a href="https://facebook.com" target="_blank" rel="noreferrer" className="footer-social-button" aria-label="Facebook">
                                <FiFacebook className="h-5 w-5" />
                            </a>
                            <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="footer-social-button" aria-label="LinkedIn">
                                <FiLinkedin className="h-5 w-5" />
                            </a>
                        </div>
                        <p className="text-xs text-slate-500">Citizen Connect © 2026. Designed for secure, transparent community reporting.</p>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
