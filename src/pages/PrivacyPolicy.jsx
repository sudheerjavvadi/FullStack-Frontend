function PrivacyPolicy() {
    return (
        <div className="page-container mx-auto max-w-6xl space-y-8 px-4 py-10 sm:px-6 lg:px-8">
            <div className="rounded-[32px] border border-white/10 bg-white/5 p-8 shadow-glow backdrop-blur-xl">
                <p className="text-xs uppercase tracking-[0.4em] text-slate-500">Privacy</p>
                <h1 className="mt-4 text-4xl font-semibold text-white">Your privacy is a core value.</h1>
                <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-300">
                    Citizen Connect collects only the information needed to provide a secure and efficient citizen reporting experience. We do not sell personal data and we protect your information with industry-standard security practices.
                </p>
            </div>
            <div className="space-y-6 rounded-[28px] border border-white/10 bg-black/70 p-8 text-slate-300 shadow-lg">
                <div>
                    <h2 className="text-xl font-semibold text-white">What we collect</h2>
                    <p className="mt-4 text-sm leading-7 text-slate-400">We store user profile details, issue reports, feedback submissions, and files uploaded for issue documentation.</p>
                </div>
                <div>
                    <h2 className="text-xl font-semibold text-white">How we use data</h2>
                    <p className="mt-4 text-sm leading-7 text-slate-400">Data is used to authenticate users, manage issue workflows, and support communication between citizens and representatives.</p>
                </div>
            </div>
        </div>
    );
}

export default PrivacyPolicy;
