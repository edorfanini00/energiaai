import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, AlertTriangle, CheckCircle2, Clock, Zap, DollarSign, Leaf, TrendingUp, ExternalLink, Mail } from 'lucide-react';

const systemsInfo = {
    hvac: { name: 'HVAC System', description: 'Heating, Ventilation, and Air Conditioning', efficiency: '94%', runtime: '4,320 hrs', lastMaint: '2024-09-15', nextMaint: '2025-03-15' },
    lighting: { name: 'Lighting System', description: 'Smart LED and Zone Control', efficiency: '98%', runtime: '5,100 hrs', lastMaint: '2024-10-01', nextMaint: '2025-04-01' },
    security: { name: 'Security System', description: 'Access Control & Surveillance', efficiency: '99%', runtime: '8,760 hrs', lastMaint: '2024-11-20', nextMaint: '2025-05-20' },
    water: { name: 'Water System', description: 'Plumbing & Water Management', efficiency: '85%', runtime: '3,200 hrs', lastMaint: '2024-06-10', nextMaint: '2024-12-10' },
};

const alerts = [
    { type: 'warning', message: 'High energy usage detected — 23% above baseline', time: '2 hours ago' },
    { type: 'info', message: 'Scheduled maintenance in 14 days', time: '1 day ago' },
    { type: 'warning', message: 'Extreme weather advisory — increased cooling demand expected', time: '3 days ago' },
];

const upgrades = [
    { name: 'Variable Speed Drive Retrofit', initialCost: '$12,500', annualSavings: '$4,200', roi: '3.0 years', carbonReduction: '2.1t/yr' },
    { name: 'Smart Thermostat Network', initialCost: '$8,000', annualSavings: '$2,800', roi: '2.9 years', carbonReduction: '1.4t/yr' },
    { name: 'Heat Recovery Ventilation', initialCost: '$18,000', annualSavings: '$6,100', roi: '3.0 years', carbonReduction: '3.8t/yr' },
];

const SystemView = () => {
    const { id, systemId } = useParams();
    const navigate = useNavigate();
    const system = systemsInfo[systemId] || systemsInfo.hvac;

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', paddingBottom: '2rem' }}>

            {/* Back Button */}
            <button
                onClick={() => navigate(`/building/${id}`)}
                style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-secondary)', background: 'none', border: 'none', cursor: 'pointer', fontSize: '0.9rem', fontWeight: 500, paddingBottom: '0.5rem' }}
            >
                <ArrowLeft size={18} /> Back to Building
            </button>

            {/* System Overview */}
            <div className="glass-card" style={{ padding: '2rem' }}>
                <h2 style={{ fontSize: '1.5rem', fontWeight: 500, marginBottom: '0.25rem' }}>{system.name}</h2>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '1.5rem' }}>{system.description}</p>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.5rem' }}>
                    {[
                        { label: 'Efficiency', value: system.efficiency },
                        { label: 'Runtime', value: system.runtime },
                        { label: 'Last Maintenance', value: system.lastMaint },
                        { label: 'Next Maintenance', value: system.nextMaint },
                    ].map((m) => (
                        <div key={m.label}>
                            <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginBottom: '0.3rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{m.label}</div>
                            <div style={{ fontSize: '1.1rem', fontWeight: 500 }}>{m.value}</div>
                        </div>
                    ))}
                </div>
            </div>

            {/* BAS-style System Map */}
            <div className="glass-card" style={{ padding: '1.5rem' }}>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 500, marginBottom: '1.25rem' }}>System Map (BAS View)</h3>
                <svg viewBox="0 0 600 200" width="100%" height="200" style={{ borderRadius: '8px' }}>
                    {/* Main bus line */}
                    <line x1={50} y1={100} x2={550} y2={100} stroke="rgba(255,255,255,0.1)" strokeWidth={3} />

                    {/* Nodes */}
                    {[
                        { x: 100, label: 'AHU-1', status: 'ok' },
                        { x: 200, label: 'Chiller', status: 'ok' },
                        { x: 300, label: 'Boiler', status: 'warning' },
                        { x: 400, label: 'Fan Coil', status: 'ok' },
                        { x: 500, label: 'Controls', status: 'ok' },
                    ].map((node) => (
                        <g key={node.label}>
                            <line x1={node.x} y1={60} x2={node.x} y2={100} stroke="rgba(255,255,255,0.08)" strokeWidth={2} />
                            <rect x={node.x - 35} y={30} width={70} height={30} rx={6} fill={node.status === 'ok' ? 'rgba(74,222,128,0.1)' : 'rgba(239,68,68,0.1)'} stroke={node.status === 'ok' ? 'var(--accent-green)' : '#ef4444'} strokeWidth={1} />
                            <text x={node.x} y={50} textAnchor="middle" fill="var(--text-primary)" fontSize="9" fontWeight="500">{node.label}</text>
                            <circle cx={node.x} cy={100} r={5} fill={node.status === 'ok' ? '#4ade80' : '#ef4444'} stroke="#000" strokeWidth={2} />
                            {/* Status label below */}
                            <text x={node.x} y={130} textAnchor="middle" fill={node.status === 'ok' ? 'var(--accent-green)' : '#ef4444'} fontSize="8">{node.status === 'ok' ? 'Running' : 'Alert'}</text>
                        </g>
                    ))}

                    {/* Data flow arrows */}
                    {[150, 250, 350, 450].map((x) => (
                        <polygon key={x} points={`${x - 4},96 ${x + 4},100 ${x - 4},104`} fill="rgba(255,255,255,0.15)" />
                    ))}
                </svg>
            </div>

            {/* Recent Alerts */}
            <div className="glass-card" style={{ padding: '1.5rem' }}>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 500, marginBottom: '1.25rem' }}>Recent Alerts</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                    {alerts.map((alert, i) => (
                        <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1rem', background: alert.type === 'warning' ? 'rgba(239,68,68,0.06)' : 'rgba(74,222,128,0.06)', borderRadius: '10px', border: `1px solid ${alert.type === 'warning' ? 'rgba(239,68,68,0.15)' : 'rgba(74,222,128,0.15)'}` }}>
                            {alert.type === 'warning' ? <AlertTriangle size={18} color="#ef4444" /> : <Clock size={18} color="var(--accent-green)" />}
                            <div style={{ flex: 1 }}>
                                <div style={{ fontSize: '0.9rem', fontWeight: 500 }}>{alert.message}</div>
                            </div>
                            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', flexShrink: 0 }}>{alert.time}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Performance Upgrades */}
            <div className="glass-card" style={{ padding: '1.5rem' }}>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 500, marginBottom: '1.25rem' }}>Performance Upgrades</h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.25rem' }}>
                    {upgrades.map((u) => (
                        <div key={u.name} style={{ background: 'var(--bg-input)', borderRadius: '10px', padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                            <h4 style={{ fontSize: '0.95rem', fontWeight: 500, marginBottom: '0.25rem' }}>{u.name}</h4>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem', fontSize: '0.8rem' }}>
                                <div>
                                    <div style={{ color: 'var(--text-muted)', marginBottom: '0.2rem' }}>Initial Cost</div>
                                    <div style={{ fontWeight: 500 }}>{u.initialCost}</div>
                                </div>
                                <div>
                                    <div style={{ color: 'var(--text-muted)', marginBottom: '0.2rem' }}>Annual Savings</div>
                                    <div style={{ fontWeight: 500, color: 'var(--accent-green)' }}>{u.annualSavings}</div>
                                </div>
                                <div>
                                    <div style={{ color: 'var(--text-muted)', marginBottom: '0.2rem' }}>ROI</div>
                                    <div style={{ fontWeight: 500 }}>{u.roi}</div>
                                </div>
                                <div>
                                    <div style={{ color: 'var(--text-muted)', marginBottom: '0.2rem' }}>Carbon Reduction</div>
                                    <div style={{ fontWeight: 500 }}>{u.carbonReduction}</div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Financial Analysis & Actions */}
            <div className="glass-card" style={{ padding: '1.5rem' }}>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 500, marginBottom: '1.25rem' }}>Financial Analysis</h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.25rem' }}>
                    <div style={{ background: 'var(--bg-input)', borderRadius: '10px', padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                        <DollarSign size={20} color="var(--accent-green)" />
                        <h4 style={{ fontSize: '0.95rem', fontWeight: 500 }}>View Financial Analysis</h4>
                        <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', lineHeight: 1.4 }}>Compare current system costs to upgrade projections. See ROI timelines and annual savings.</p>
                        <button style={{ marginTop: 'auto', background: 'var(--accent-green)', color: '#000', border: 'none', padding: '0.5rem 1rem', borderRadius: '8px', fontWeight: 600, cursor: 'pointer', fontSize: '0.8rem' }}>View Analysis</button>
                    </div>
                    <div style={{ background: 'var(--bg-input)', borderRadius: '10px', padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                        <ExternalLink size={20} color="#22d3ee" />
                        <h4 style={{ fontSize: '0.95rem', fontWeight: 500 }}>Learn More</h4>
                        <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', lineHeight: 1.4 }}>Visit the vendor website to explore new system options and current market pricing.</p>
                        <button style={{ marginTop: 'auto', background: 'rgba(34,211,238,0.15)', color: '#22d3ee', border: 'none', padding: '0.5rem 1rem', borderRadius: '8px', fontWeight: 600, cursor: 'pointer', fontSize: '0.8rem' }}>Visit Website</button>
                    </div>
                    <div style={{ background: 'var(--bg-input)', borderRadius: '10px', padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                        <Mail size={20} color="#a78bfa" />
                        <h4 style={{ fontSize: '0.95rem', fontWeight: 500 }}>Request a Quote</h4>
                        <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', lineHeight: 1.4 }}>Reach out to the vendor directly to get a customized quote for your building.</p>
                        <button style={{ marginTop: 'auto', background: 'rgba(167,139,250,0.15)', color: '#a78bfa', border: 'none', padding: '0.5rem 1rem', borderRadius: '8px', fontWeight: 600, cursor: 'pointer', fontSize: '0.8rem' }}>Request Quote</button>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default SystemView;
