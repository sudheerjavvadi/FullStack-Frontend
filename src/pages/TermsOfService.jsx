function TermsOfService() {
    return (
        <div className="page-container mx-auto max-w-6xl space-y-8 px-4 py-10 sm:px-6 lg:px-8">
            <div className="rounded-[32px] border border-white/10 bg-white/5 p-8 shadow-glow backdrop-blur-xl">
                <p className="text-xs uppercase tracking-[0.4em] text-slate-500">Terms of Service</p>
                <h1 className="mt-4 text-4xl font-semibold text-white">Use the platform responsibly.</h1>
                <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-300">
                    By using Citizen Connect, you agree to submit truthful reports, respect other users, and follow the guidelines for constructive civic engagement.
                </p>
            </div>
            <div className="space-y-6 rounded-[28px] border border-white/10 bg-black/70 p-8 text-slate-300 shadow-lg">
                <div>
                    <h2 className="text-xl font-semibold text-white">User conduct</h2>
                    <p className="mt-4 text-sm leading-7 text-slate-400">Users should submit genuine issue reports and avoid abusive or defamatory content.</p>
                </div>
                <div>
                    <h2 className="text-xl font-semibold text-white">Platform usage</h2>
                    <p className="mt-4 text-sm leading-7 text-slate-400">Citizen Connect is provided as a community resource. We may update the service and terms at any time.</p>
                </div>
            </div>
        </div>
    );
}

export default TermsOfService;
