import React, { useState } from 'react';
import { AreaChart, Area, XAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { Thermometer, Users, Lightbulb, Wind, Settings2, ShieldCheck, Droplet, Activity } from 'lucide-react';

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
            <div className="card" style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: '1.5rem 2rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <span style={{ fontWeight: 600, color: 'var(--text-secondary)' }}>Selected Building:</span>
                    <select style={{
                        padding: '0.5rem 1rem',
                        borderRadius: 'var(--radius-sm)',
                        border: '1px solid var(--border-light)',
                        background: 'var(--bg-page)',
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

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: '#E8F5E9', color: '#2E7D32', padding: '0.5rem 1rem', borderRadius: 'var(--radius-full)', fontSize: '0.85rem', fontWeight: 600 }}>
                    <span className="dot dot-green"></span> System Active
                </div>
            </div>

            {/* Main Detail Box */}
            <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
                <div style={{ padding: '1.5rem', borderBottom: '1px solid var(--border-light)' }}>
                    <div className="group-pill">
                        <button className={`btn-pill ${activeTab === 'overview' ? 'active' : ''}`} onClick={() => setActiveTab('overview')}>Overview</button>
                        <button className={`btn-pill ${activeTab === 'environment' ? 'active' : ''}`} onClick={() => setActiveTab('environment')}>Environment</button>
                        <button className={`btn-pill ${activeTab === 'systems' ? 'active' : ''}`} onClick={() => setActiveTab('systems')}>Systems</button>
                    </div>
                </div>

                <div style={{ padding: '2rem' }}>
                    {activeTab === 'overview' && (
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '2rem' }}>
                            <div><div className="card-title">Name</div><div style={{ fontSize: '1rem', fontWeight: 500 }}>North Tower</div></div>
                            <div><div className="card-title">Address</div><div style={{ fontSize: '1rem', fontWeight: 500 }}>123 Market St, SF</div></div>
                            <div><div className="card-title">Building ID</div><div style={{ fontSize: '1rem', fontWeight: 500 }}>BBLD-4921</div></div>
                            <div><div className="card-title">Size</div><div style={{ fontSize: '1rem', fontWeight: 500 }}>145,000 sq ft</div></div>
                            <div><div className="card-title">Operating Hours</div><div style={{ fontSize: '1rem', fontWeight: 500 }}>6:00 AM - 10:00 PM</div></div>
                            <div><div className="card-title">Type</div><div style={{ fontSize: '1rem', fontWeight: 500 }}>Commercial Office</div></div>
                            <div><div className="card-title">Current Occupancy</div><div style={{ fontSize: '1rem', fontWeight: 500, color: '#34C759' }}>85% (Optimal)</div></div>
                        </div>
                    )}

                    {activeTab === 'environment' && (
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                            <div className="card" style={{ boxShadow: 'none', background: 'var(--bg-page)' }}>
                                <div className="card-header"><div className="card-icon" style={{ background: '#fff' }}><Thermometer size={14} color="var(--accent-yellow)" /></div><div className="card-title" style={{ marginTop: '0.35rem' }}>Temperature</div></div>
                                <div className="card-value" style={{ marginBottom: '0.5rem' }}>72°F <span style={{ fontSize: '0.85rem', color: '#2E7D32', background: '#E8F5E9', padding: '2px 8px', borderRadius: '12px', verticalAlign: 'middle' }}>Optimal</span></div>
                                <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Range: 68°F - 74°F | Trend: Stable</div>
                            </div>

                            <div className="card" style={{ boxShadow: 'none', background: 'var(--bg-page)' }}>
                                <div className="card-header"><div className="card-icon" style={{ background: '#fff' }}><Users size={14} color="var(--accent-blue)" /></div><div className="card-title" style={{ marginTop: '0.35rem' }}>Occupancy</div></div>
                                <div className="card-value" style={{ marginBottom: '0.5rem' }}>High</div>
                                <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Current: 1,245 / 1,500 max | Peak: 2:00 PM</div>
                            </div>

                            <div className="card" style={{ boxShadow: 'none', background: 'var(--bg-page)' }}>
                                <div className="card-header"><div className="card-icon" style={{ background: '#fff' }}><Lightbulb size={14} color="#80776D" /></div><div className="card-title" style={{ marginTop: '0.35rem' }}>Lighting</div></div>
                                <div className="card-value" style={{ marginBottom: '0.5rem' }}>Efficient <span style={{ fontSize: '1rem', color: 'var(--text-secondary)', fontWeight: 400 }}>(45% Usage)</span></div>
                                <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Active Zones: Lobby, Floors 2-5, Cafe</div>
                            </div>

                            <div className="card" style={{ boxShadow: 'none', background: 'var(--bg-page)' }}>
                                <div className="card-header"><div className="card-icon" style={{ background: '#fff' }}><Wind size={14} color="#34C759" /></div><div className="card-title" style={{ marginTop: '0.35rem' }}>Air Quality</div></div>
                                <div className="card-value" style={{ marginBottom: '0.5rem' }}>Excellent <span style={{ fontSize: '1rem', color: 'var(--text-secondary)', fontWeight: 400 }}>(Score: 95)</span></div>
                                <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>CO2: 400ppm | PM2.5: 12 µg/m³</div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'systems' && (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            {[
                                { name: 'HVAC', i: <Settings2 size={16} />, status: 'Operational', eff: '92%', maint: '2 days ago', color: 'var(--accent-blue)' },
                                { name: 'Lighting', i: <Lightbulb size={16} />, status: 'Operational', eff: '98%', maint: '1 month ago', color: 'var(--accent-yellow)' },
                                { name: 'Security', i: <ShieldCheck size={16} />, status: 'Operational', eff: '100%', maint: '1 week ago', color: '#80776D' },
                                { name: 'Water', i: <Droplet size={16} />, status: 'Warning', eff: '75%', maint: '6 months ago', color: '#FF3B30' },
                            ].map(sys => (
                                <div key={sys.name} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1.25rem', background: 'var(--bg-page)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-light)' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', width: '200px' }}>
                                        <div className="card-icon" style={{ background: '#fff', color: sys.color }}>{sys.i}</div>
                                        <strong style={{ fontSize: '1rem' }}>{sys.name}</strong>
                                    </div>
                                    <div style={{ width: '100px' }}>
                                        <span style={{ fontSize: '0.75rem', background: sys.status === 'Warning' ? '#FFEBEE' : '#E8F5E9', color: sys.status === 'Warning' ? '#C62828' : '#2E7D32', padding: '4px 10px', borderRadius: '12px', fontWeight: 600 }}>{sys.status}</span>
                                    </div>
                                    <div style={{ width: '150px', fontSize: '0.85rem', fontWeight: 500 }}>Efficiency: {sys.eff}</div>
                                    <div style={{ width: '200px', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Last Maint: {sys.maint}</div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* Analytics Component */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <h2 style={{ fontSize: '1.5rem', margin: 0 }}>Analytics</h2>
                <div className="group-pill">
                    {['Day', 'Week', 'Month', 'Year'].map(t => (
                        <button key={t}
                            onClick={() => setActiveTimeframe(t.toLowerCase())}
                            className={`btn-pill ${activeTimeframe === t.toLowerCase() ? 'active' : ''}`}
                        >
                            {t}
                        </button>
                    ))}
                </div>
            </div>

            <div className="card">
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.5rem', marginBottom: '2rem' }}>
                    {[
                        { l: 'Energy Usage', v: '24,000 kWh' },
                        { l: 'Energy Cost', v: '$3,450' },
                        { l: 'Savings', v: '$450' },
                        { l: 'Emissions', v: '12 Tons' }
                    ].map(s => (
                        <div key={s.l} style={{ padding: '1.5rem', background: 'var(--bg-page)', borderRadius: 'var(--radius-sm)' }}>
                            <div className="card-title">{s.l}</div>
                            <div className="card-value">{s.v}</div>
                        </div>
                    ))}
                </div>

                <div style={{ height: '300px', width: '100%' }}>
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={mockEnergyData}>
                            <defs>
                                <linearGradient id="colorUsage" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="var(--accent-yellow)" stopOpacity={0.4} />
                                    <stop offset="95%" stopColor="var(--accent-yellow)" stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <XAxis dataKey="name" axisLine={false} tickLine={false} dy={10} />
                            <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', background: 'var(--text-primary)', color: 'white', fontSize: '0.85rem' }} />
                            <Area type="monotone" dataKey="usage" stroke="var(--accent-yellow)" strokeWidth={3} fillOpacity={1} fill="url(#colorUsage)" />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* System Health Dropdowns */}
            <h2 style={{ fontSize: '1.5rem', margin: '1rem 0 0 0' }}>System Health</h2>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
                <div className="card">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                            <div className="card-icon" style={{ background: '#F0F4F8' }}><Settings2 size={16} color="var(--accent-blue)" /></div>
                            <strong style={{ fontSize: '1.1rem' }}>HVAC Details</strong>
                        </div>
                        <button className="btn-solid" style={{ padding: '0.4rem 1rem' }}>View System</button>
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                        <div style={{ padding: '1rem', background: 'var(--bg-page)', borderRadius: 'var(--radius-sm)' }}><div className="card-title">Efficiency</div><div style={{ fontWeight: 500 }}>92% (Optimal)</div></div>
                        <div style={{ padding: '1rem', background: 'var(--bg-page)', borderRadius: 'var(--radius-sm)' }}><div className="card-title">Run Time</div><div style={{ fontWeight: 500 }}>142 Hours</div></div>
                        <div style={{ padding: '1rem', background: 'var(--bg-page)', borderRadius: 'var(--radius-sm)' }}><div className="card-title">Next Maint</div><div style={{ fontWeight: 500 }}>Oct 15th, 2026</div></div>
                        <div style={{ padding: '1rem', background: 'var(--bg-page)', borderRadius: 'var(--radius-sm)' }}><div className="card-title">Alerts</div><div style={{ fontWeight: 500 }}>None</div></div>
                    </div>
                </div>

                <div className="card">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                            <div className="card-icon" style={{ background: '#FCF9EE' }}><Lightbulb size={16} color="var(--accent-yellow)" /></div>
                            <strong style={{ fontSize: '1.1rem' }}>Lighting Details</strong>
                        </div>
                        <button className="btn-solid" style={{ padding: '0.4rem 1rem' }}>View System</button>
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                        <div style={{ padding: '1rem', background: 'var(--bg-page)', borderRadius: 'var(--radius-sm)' }}><div className="card-title">Efficiency</div><div style={{ fontWeight: 500 }}>98% (Optimal)</div></div>
                        <div style={{ padding: '1rem', background: 'var(--bg-page)', borderRadius: 'var(--radius-sm)' }}><div className="card-title">Run Time</div><div style={{ fontWeight: 500 }}>85 Hours</div></div>
                        <div style={{ padding: '1rem', background: 'var(--bg-page)', borderRadius: 'var(--radius-sm)' }}><div className="card-title">Next Maint</div><div style={{ fontWeight: 500 }}>Nov 1st, 2026</div></div>
                        <div style={{ padding: '1rem', background: '#FFF3F3', borderRadius: 'var(--radius-sm)', color: '#D32F2F' }}><div className="card-title" style={{ color: '#D32F2F' }}>Alerts</div><div style={{ fontWeight: 600 }}>Zone 4 Fault</div></div>
                    </div>
                </div>
            </div>

            {/* Upgrades */}
            <h2 style={{ fontSize: '1.5rem', margin: '1rem 0 0 0' }}>Performance Upgrades</h2>
            <div className="card" style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: '2rem' }}>
                <div>
                    <h3 style={{ margin: '0 0 1rem 0', fontSize: '1.25rem' }}>Smart HVAC Controller Retrofit</h3>
                    <div style={{ display: 'flex', gap: '2rem' }}>
                        <div><div className="card-title">Initial Cost</div><div style={{ fontWeight: 600 }}>$12,500</div></div>
                        <div><div className="card-title">Annual Savings</div><div style={{ fontWeight: 600, color: '#34C759' }}>$4,200</div></div>
                        <div><div className="card-title">ROI</div><div style={{ fontWeight: 600 }}>3.0 Years</div></div>
                        <div><div className="card-title">Carbon Reduce</div><div style={{ fontWeight: 600 }}>15 Tons/yr</div></div>
                    </div>
                </div>
                <div style={{ display: 'flex', gap: '1rem' }}>
                    <button style={{ background: 'transparent', border: '1px solid var(--border-light)', color: 'var(--text-primary)', padding: '0.75rem 1.5rem', borderRadius: 'var(--radius-full)', cursor: 'pointer', fontWeight: 500 }}>View Analysis</button>
                    <button className="btn-solid" style={{ background: 'var(--accent-yellow)', color: '#1A1A1A' }}>Request Quote</button>
                </div>
            </div>
        </div>
    );
};

export default BuildingDashboard;
