import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { FiArrowRight, FiMessageSquare, FiBell, FiCheckCircle, FiUsers } from 'react-icons/fi';

function Home() {
    const { isAuthenticated } = useSelector((state) => state.auth);

    const features = [
        {
            icon: <FiMessageSquare style={{ fontSize: '1.5rem' }} />,
            title: 'Report Issues',
            description: 'Submit evidence-backed reports with attachments and transparent tracking.',
        },
        {
            icon: <FiBell style={{ fontSize: '1.5rem' }} />,
            title: 'Stay Updated',
            description: 'Receive official status updates and issue resolutions in real time.',
        },
        {
            icon: <FiCheckCircle style={{ fontSize: '1.5rem' }} />,
            title: 'Give Feedback',
            description: 'Share your voice and rate leadership with a modern civic workflow.',
        },
        {
            icon: <FiUsers style={{ fontSize: '1.5rem' }} />,
            title: 'Engage the Community',
            description: 'Connect with local representatives and collaborate on meaningful issues.',
        },
    ];

    return (
        <div
            className="page-container"
            style={{
                maxWidth: '1200px',
                margin: '0 auto',
                minHeight: 'calc(100vh - 88px)',
                padding: '2.5rem 1.5rem',
                display: 'grid',
                gap: '2rem',
            }}
        >
            <section className="card" style={{ padding: '2.5rem', background: 'rgba(15, 15, 35, 0.92)' }}>
                <div
                    style={{
                        display: 'grid',
                        gap: '2rem',
                        gridTemplateColumns: '1fr 0.9fr',
                        alignItems: 'center',
                    }}
                >
                    <div>
                        <p style={{ fontSize: '0.75rem', letterSpacing: '0.35em', textTransform: 'uppercase', color: 'rgba(148, 163, 184, 0.85)' }}>
                            Nothing UI · Voice for citizens
                        </p>
                        <h1 style={{ marginTop: '1rem', fontSize: '3rem', lineHeight: 1.05, maxWidth: '680px' }}>
                            A cleaner civic platform for issue reporting, updates, and trust.
                        </h1>
                        <p style={{ marginTop: '1rem', color: 'rgba(148, 163, 184, 0.95)', maxWidth: '720px', lineHeight: 1.8 }}>
                            CitizenConnect now uses a minimal monochrome experience so citizens and politicians can focus on what matters: solving local challenges together.
                        </p>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', marginTop: '1.75rem' }}>
                            <Link to={isAuthenticated ? '/dashboard' : '/register'} className="btn btn-primary" style={{ minWidth: '180px' }}>
                                {isAuthenticated ? 'Go to Dashboard' : 'Get Started'}
                                <FiArrowRight />
                            </Link>
                            <Link
                                to={isAuthenticated ? '/issues/create' : '/login'}
                                className="btn btn-secondary"
                                style={{ minWidth: '180px' }}
                            >
                                {isAuthenticated ? 'Report an Issue' : 'Sign In'}
                            </Link>
                        </div>
                    </div>

                    <div
                        style={{
                            borderRadius: '28px',
                            border: '1px solid rgba(255,255,255,0.08)',
                            background: 'rgba(255,255,255,0.05)',
                            padding: '1.75rem',
                        }}
                    >
                        <p style={{ fontSize: '0.85rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: 'rgba(148, 163, 184, 0.85)' }}>
                            Quick tour
                        </p>
                        <div style={{ marginTop: '1.5rem', display: 'grid', gap: '1rem' }}>
                            {features.slice(0, 2).map((feature) => (
                                <div
                                    key={feature.title}
                                    style={{
                                        display: 'flex',
                                        alignItems: 'flex-start',
                                        gap: '1rem',
                                        borderRadius: '24px',
                                        border: '1px solid rgba(255,255,255,0.08)',
                                        background: 'rgba(255,255,255,0.05)',
                                        padding: '1rem',
                                    }}
                                >
                                    <div style={{ width: '48px', height: '48px', borderRadius: '18px', display: 'grid', placeItems: 'center', background: 'rgba(255,255,255,0.1)', color: 'white' }}>
                                        {feature.icon}
                                    </div>
                                    <div>
                                        <h3 style={{ margin: 0, fontSize: '1rem', fontWeight: 700 }}>{feature.title}</h3>
                                        <p style={{ marginTop: '0.5rem', color: 'rgba(148, 163, 184, 0.95)' }}>{feature.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            <section style={{ display: 'grid', gap: '1.5rem', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))' }}>
                {features.map((feature) => (
                    <div
                        key={feature.title}
                        style={{
                            borderRadius: '32px',
                            border: '1px solid rgba(255,255,255,0.08)',
                            background: 'rgba(255,255,255,0.05)',
                            padding: '1.75rem',
                        }}
                    >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                            <div style={{ width: '56px', height: '56px', borderRadius: '24px', display: 'grid', placeItems: 'center', background: 'rgba(255,255,255,0.1)', color: 'white' }}>
                                {feature.icon}
                            </div>
                            <div>
                                <h3 style={{ margin: 0, fontSize: '1.25rem', fontWeight: 700 }}>{feature.title}</h3>
                                <p style={{ marginTop: '0.5rem', color: 'rgba(148, 163, 184, 0.95)' }}>{feature.description}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </section>

            <section className="card" style={{ padding: '2.5rem', background: 'rgba(15, 15, 35, 0.92)' }}>
                <div style={{ display: 'grid', gap: '1rem', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))' }}>
                    {[
                        { label: 'Active Citizens', value: '10,000+' },
                        { label: 'Politicians', value: '500+' },
                        { label: 'Issues Resolved', value: '25,000+' },
                        { label: 'Satisfaction Rate', value: '98%' },
                    ].map((stat) => (
                        <div
                            key={stat.label}
                            style={{
                                borderRadius: '28px',
                                border: '1px solid rgba(255,255,255,0.08)',
                                background: 'rgba(255,255,255,0.05)',
                                padding: '1.5rem',
                                textAlign: 'center',
                            }}
                        >
                            <div style={{ fontSize: '2rem', fontWeight: 700, color: 'white' }}>{stat.value}</div>
                            <p style={{ marginTop: '0.75rem', color: 'rgba(148, 163, 184, 0.95)' }}>{stat.label}</p>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
}

export default Home;
