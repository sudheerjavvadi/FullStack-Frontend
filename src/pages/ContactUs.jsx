function ContactUs() {
    return (
        <div className="page-container mx-auto max-w-6xl space-y-8 px-4 py-10 sm:px-6 lg:px-8">
            <div className="rounded-[32px] border border-white/10 bg-white/5 p-8 shadow-glow backdrop-blur-xl">
                <p className="text-xs uppercase tracking-[0.4em] text-slate-500">Contact Citizen Connect</p>
                <h1 className="mt-4 text-4xl font-semibold text-white">Let’s keep the community moving forward.</h1>
                <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-300">
                    Have a question, a suggestion, or need help with the platform? Reach out to the Citizen Connect team and we’ll respond as soon as possible.
                </p>
            </div>
            <div className="grid gap-6 lg:grid-cols-2">
                <div className="rounded-[28px] border border-white/10 bg-black/70 p-8 shadow-lg">
                    <h2 className="text-xl font-semibold text-white">General inquiries</h2>
                    <p className="mt-4 text-slate-300">Email us at <a href="mailto:support@citizenconnect.app" className="text-slate-100 underline">support@citizenconnect.app</a></p>
                    <p className="mt-4 text-sm leading-7 text-slate-400">For accessibility support, partnership requests, or technical issues, our team is here to help.</p>
                </div>
                <div className="rounded-[28px] border border-white/10 bg-black/70 p-8 shadow-lg">
                    <h2 className="text-xl font-semibold text-white">Office</h2>
                    <p className="mt-4 text-slate-300">Citizen Connect</p>
                    <p className="mt-2 text-sm leading-7 text-slate-400">123 Community Lane<br />City Center, CA 90210</p>
                    <p className="mt-4 text-sm leading-7 text-slate-400">Open for inquiries Monday–Friday, 09:00–18:00.</p>
                </div>
            </div>
        </div>
    );
}

export default ContactUs;
