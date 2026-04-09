function AboutUs() {
    return (
        <div className="page-container mx-auto max-w-6xl space-y-8 px-4 py-10 sm:px-6 lg:px-8">
            <div className="rounded-[32px] border border-white/10 bg-white/5 p-8 shadow-glow backdrop-blur-xl">
                <p className="text-xs uppercase tracking-[0.4em] text-slate-500">About Citizen Connect</p>
                <h1 className="mt-4 text-4xl font-semibold text-white">Reimagining civic participation for every citizen.</h1>
                <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-300">
                    Citizen Connect is a sleek, modern platform designed to help citizens report issues, track progress, and communicate with stakeholders in a transparent, minimal interface.
                    Our goal is to make local government engagement intuitive, fast, and accessible for all community members.
                </p>
            </div>
            <div className="grid gap-6 lg:grid-cols-3">
                <div className="rounded-[28px] border border-white/10 bg-black/70 p-6 text-slate-300 shadow-lg">
                    <h2 className="text-xl font-semibold text-white">Built for clarity</h2>
                    <p className="mt-4 text-sm leading-7">Minimal navigation, thoughtful layouts, and clear issue workflows keep the experience focused and efficient.</p>
                </div>
                <div className="rounded-[28px] border border-white/10 bg-black/70 p-6 text-slate-300 shadow-lg">
                    <h2 className="text-xl font-semibold text-white">Secure collaboration</h2>
                    <p className="mt-4 text-sm leading-7">Users can submit issues, moderators can review reports, and decision-makers can stay informed.</p>
                </div>
                <div className="rounded-[28px] border border-white/10 bg-black/70 p-6 text-slate-300 shadow-lg">
                    <h2 className="text-xl font-semibold text-white">Community-first design</h2>
                    <p className="mt-4 text-sm leading-7">Every feature is crafted to reduce friction and make civic engagement more approachable.</p>
                </div>
            </div>
        </div>
    );
}

export default AboutUs;
