function Accessibility() {
    return (
        <div className="page-container mx-auto max-w-6xl space-y-8 px-4 py-10 sm:px-6 lg:px-8">
            <div className="rounded-[32px] border border-white/10 bg-white/5 p-8 shadow-glow backdrop-blur-xl">
                <p className="text-xs uppercase tracking-[0.4em] text-slate-500">Accessibility</p>
                <h1 className="mt-4 text-4xl font-semibold text-white">A platform designed to be inclusive.</h1>
                <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-300">
                    Citizen Connect is committed to making civic participation accessible for everyone. We aim for readable typography, strong contrast, and intuitive navigation across the platform.
                </p>
            </div>
            <div className="space-y-6 rounded-[28px] border border-white/10 bg-black/70 p-8 text-slate-300 shadow-lg">
                <div>
                    <h2 className="text-xl font-semibold text-white">Key accessibility principles</h2>
                    <ul className="mt-4 list-disc space-y-3 pl-5 text-sm leading-7 text-slate-400">
                        <li>High contrast dark theme for readability.</li>
                        <li>Clear visual hierarchy with large headings and controls.</li>
                        <li>Keyboard-friendly navigation and interactive controls.</li>
                        <li>Descriptive labels for form fields and buttons.</li>
                    </ul>
                </div>
                <div>
                    <h2 className="text-xl font-semibold text-white">What we are improving</h2>
                    <p className="mt-4 text-sm leading-7 text-slate-400">We continue to improve the platform by adding support for screen readers, accessible forms, and a consistent experience across devices.</p>
                </div>
            </div>
        </div>
    );
}

export default Accessibility;
