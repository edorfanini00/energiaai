import React, { useState } from 'react';
import { AreaChart, Area, XAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { Thermometer, Users, Lightbulb, Wind, Settings2, ShieldCheck, Droplet } from 'lucide-react';

const mockEnergyData = [
    { name: 'Mon', usage: 4000 }, { name: 'Tue', usage: 3000 },
    { name: 'Wed', usage: 2000 }, { name: 'Thu', usage: 2780 },
    { name: 'Fri', usage: 1890 }, { name: 'Sat', usage: 2390 },
    { name: 'Sun', usage: 3490 },
];

const BuildingDashboard = () => {
    const [activeTab, setActiveTab] = useState('overview');
    const [activeTimeframe, setActiveTimeframe] = useState('week');

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', paddingBottom: '3rem' }}>

            {/* Building Selector */}
            <div className="glass-card" style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: '1.5rem 2rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <span style={{ fontWeight: 600, color: 'var(--text-secondary)' }}>Selected Building:</span>
                    <select style={{
                        padding: '0.5rem 1rem',
                        borderRadius: 'var(--radius-sm)',
                        border: '1px solid var(--border-light)',
                        background: 'var(--bg-input)',
                        fontSize: '1rem',
                        fontWeight: 500,
                        outline: 'none',
                        cursor: 'pointer',
                        color: 'var(--text-primary)'
                    }}>
                        <option>North Tower</option>
                        <option>West Complex</option>
                        <option>South Center</option>
                    </select>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(52, 199, 89, 0.1)', color: '#34C759', padding: '0.5rem 1rem', borderRadius: 'var(--radius-full)', fontSize: '0.85rem', fontWeight: 600 }}>
                    <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#34C759' }}></span> System Active
                </div>
            </div>

            {/* Main Detail Box */}
            <div className="glass-card" style={{ padding: 0, overflow: 'hidden' }}>
                <div style={{ padding: '1.5rem', borderBottom: '1px solid var(--border-light)', display: 'flex', gap: '0.5rem' }}>
                    <button style={{ background: activeTab === 'overview' ? 'var(--bg-input)' : 'transparent', color: activeTab === 'overview' ? 'var(--accent-green)' : 'var(--text-secondary)', border: 'none', padding: '0.5rem 1rem', borderRadius: 'var(--radius-full)', cursor: 'pointer' }} onClick={() => setActiveTab('overview')}>Overview</button>
                    <button style={{ background: activeTab === 'environment' ? 'var(--bg-input)' : 'transparent', color: activeTab === 'environment' ? 'var(--accent-green)' : 'var(--text-secondary)', border: 'none', padding: '0.5rem 1rem', borderRadius: 'var(--radius-full)', cursor: 'pointer' }} onClick={() => setActiveTab('environment')}>Environment</button>
                    <button style={{ background: activeTab === 'systems' ? 'var(--bg-input)' : 'transparent', color: activeTab === 'systems' ? 'var(--accent-green)' : 'var(--text-secondary)', border: 'none', padding: '0.5rem 1rem', borderRadius: 'var(--radius-full)', cursor: 'pointer' }} onClick={() => setActiveTab('systems')}>Systems</button>
                </div>

                <div style={{ padding: '2rem' }}>
                    {activeTab === 'overview' && (
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '2rem' }}>
                            <div><div className="card-subtitle" style={{ marginBottom: '0.5rem' }}>Name</div><div style={{ fontSize: '1rem', fontWeight: 500 }}>North Tower</div></div>
                            <div><div className="card-subtitle" style={{ marginBottom: '0.5rem' }}>Address</div><div style={{ fontSize: '1rem', fontWeight: 500 }}>123 Market St, SF</div></div>
                            <div><div className="card-subtitle" style={{ marginBottom: '0.5rem' }}>Building ID</div><div style={{ fontSize: '1rem', fontWeight: 500 }}>BBLD-4921</div></div>
                            <div><div className="card-subtitle" style={{ marginBottom: '0.5rem' }}>Size</div><div style={{ fontSize: '1rem', fontWeight: 500 }}>145,000 sq ft</div></div>
                        </div>
                    )}

                    {activeTab === 'environment' && (
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                            <div style={{ background: 'var(--bg-input)', padding: '1.5rem', borderRadius: '12px' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}><Thermometer size={16} color="var(--accent-green)" /><span className="card-title" style={{ margin: 0 }}>Temperature</span></div>
                                <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>72°F <span style={{ fontSize: '0.85rem', color: '#34C759', background: 'rgba(52, 199, 89, 0.1)', padding: '2px 8px', borderRadius: '12px', verticalAlign: 'middle' }}>Optimal</span></div>
                                <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Range: 68°F - 74°F | Trend: Stable</div>
                            </div>

                            <div style={{ background: 'var(--bg-input)', padding: '1.5rem', borderRadius: '12px' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}><Users size={16} color="var(--accent-blue)" /><span className="card-title" style={{ margin: 0 }}>Occupancy</span></div>
                                <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>High</div>
                                <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Current: 1,245 / 1,500 max | Peak: 2:00 PM</div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'systems' && (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            {[
                                { name: 'HVAC', i: <Settings2 size={16} />, status: 'Operational', eff: '92%', color: 'var(--accent-blue)' },
                                { name: 'Lighting', i: <Lightbulb size={16} />, status: 'Operational', eff: '98%', color: 'var(--accent-green)' },
                                { name: 'Water', i: <Droplet size={16} />, status: 'Warning', eff: '75%', color: '#ef4444' },
                            ].map(sys => (
                                <div key={sys.name} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1.25rem', background: 'var(--bg-input)', borderRadius: 'var(--radius-sm)' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', width: '200px' }}>
                                        <div style={{ color: sys.color }}>{sys.i}</div>
                                        <strong style={{ fontSize: '1rem' }}>{sys.name}</strong>
                                    </div>
                                    <div style={{ width: '100px' }}>
                                        <span style={{ fontSize: '0.75rem', background: sys.status === 'Warning' ? 'rgba(239, 68, 68, 0.1)' : 'rgba(52, 199, 89, 0.1)', color: sys.status === 'Warning' ? '#ef4444' : '#34C759', padding: '4px 10px', borderRadius: '12px', fontWeight: 600 }}>{sys.status}</span>
                                    </div>
                                    <div style={{ width: '150px', fontSize: '0.85rem', fontWeight: 500 }}>Efficiency: {sys.eff}</div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* Analytics Component */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <h2 style={{ fontSize: '1.5rem', margin: 0 }}>Analytics</h2>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                    {['Day', 'Week', 'Month', 'Year'].map(t => (
                        <button key={t}
                            onClick={() => setActiveTimeframe(t.toLowerCase())}
                            style={{ background: activeTimeframe === t.toLowerCase() ? 'var(--bg-input)' : 'transparent', color: activeTimeframe === t.toLowerCase() ? 'var(--text-primary)' : 'var(--text-secondary)', border: 'none', padding: '0.5rem 1rem', borderRadius: 'var(--radius-full)', cursor: 'pointer' }}
                        >
                            {t}
                        </button>
                    ))}
                </div>
            </div>

            <div className="glass-card">
                <div style={{ height: '300px', width: '100%' }}>
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={mockEnergyData}>
                            <defs>
                                <linearGradient id="colorUsage" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="var(--accent-green)" stopOpacity={0.4} />
                                    <stop offset="95%" stopColor="var(--accent-green)" stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <XAxis dataKey="name" axisLine={false} tickLine={false} dy={10} />
                            <Tooltip cursor={false} contentStyle={{ borderRadius: '12px', border: 'none', background: 'var(--bg-input)', color: 'white', fontSize: '0.85rem' }} />
                            <Area type="monotone" dataKey="usage" stroke="var(--accent-green)" strokeWidth={3} fillOpacity={1} fill="url(#colorUsage)" />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
};

export default BuildingDashboard;
