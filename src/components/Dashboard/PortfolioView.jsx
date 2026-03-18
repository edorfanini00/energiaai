import React, { useState } from 'react';
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Cell } from 'recharts';
import { ArrowUpRight, Bell, Filter, Plus } from 'lucide-react';

const mockLineData = [
    { val: 10 }, { val: 40 }, { val: 20 }, { val: 50 }, { val: 30 }, { val: 70 }, { val: 90 }
];

const mockBarData = [
    { month: 'Jan', value: 45 }, { month: 'Feb', value: 38 },
    { month: 'Mar', value: 25 }, { month: 'Apr', value: 35 },
    { month: 'May', value: 55, striped: true }, { month: 'Jun', value: 35 },
    { month: 'Jul', value: 20 }
];

const PortfolioView = () => {
    const [activeMonth, setActiveMonth] = useState(0);

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>

            {/* Top Row: Solar Image & Month Summary */}
            <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '2rem', height: '320px' }}>

                {/* Top Left: Solar Array Card */}
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Overview</h2>
                    <div className="glass-card" style={{ padding: 0, position: 'relative', overflow: 'hidden', height: '100%' }}>

                        {/* The Generated Solar Grid Background */}
                        <img
                            src="/solar-grid.png"
                            alt="Solar Array"
                            style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.8 }}
                        />

                        {/* Address Overlay */}
                        <div style={{ position: 'absolute', top: '1.5rem', left: '1.5rem', fontSize: '0.85rem', color: 'var(--text-secondary)', fontWeight: 500, letterSpacing: '0.05em' }}>
                            450 FASHION AVE, NY, USA
                        </div>

                        {/* Yellow Arrow Button Overlay */}
                        <div style={{ position: 'absolute', top: '3.5rem', left: '1.5rem', background: 'var(--accent-yellow)', width: '32px', height: '32px', borderRadius: '4px', display: 'flex', justifyContent: 'center', alignItems: 'center', color: '#000', cursor: 'pointer' }}>
                            <ArrowUpRight size={18} strokeWidth={2.5} />
                        </div>

                        {/* Mini Chart Overlay (Right Side) */}
                        <div style={{ position: 'absolute', right: '1.5rem', top: '50%', transform: 'translateY(-50%)', width: '250px', height: '120px', background: 'rgba(255,255,255,0.05)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', padding: '1rem' }}>
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={mockLineData}>
                                    <defs>
                                        <linearGradient id="colorYellow" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="var(--accent-yellow)" stopOpacity={0.8} />
                                            <stop offset="95%" stopColor="var(--accent-yellow)" stopOpacity={0} />
                                        </linearGradient>
                                    </defs>
                                    <Tooltip contentStyle={{ display: 'none' }} cursor={false} />
                                    <Area type="natural" dataKey="val" stroke="var(--accent-yellow)" strokeWidth={2} fillOpacity={1} fill="url(#colorYellow)" />
                                </AreaChart>
                            </ResponsiveContainer>
                            <div style={{ position: 'absolute', bottom: '0.5rem', right: '1rem', fontSize: '0.65rem', color: 'var(--text-secondary)' }}>Good<br /><span style={{ fontSize: '0.85rem', color: 'var(--text-primary)', fontWeight: 500 }}>100%</span></div>
                            <div style={{ position: 'absolute', bottom: '0.5rem', left: '1rem', fontSize: '0.65rem', color: 'var(--text-secondary)' }}><br /><span style={{ fontSize: '0.85rem', color: 'var(--text-primary)', fontWeight: 500 }}>0%</span></div>
                        </div>

                    </div>
                </div>

                {/* Top Right: Monthly Summary */}
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', marginTop: '0.5rem' }}>
                        <h2 style={{ fontSize: '1.25rem', color: 'var(--text-primary)', fontWeight: 500 }}>01.06.2025 - 01.06.2025</h2>
                        <div style={{ background: 'var(--bg-input)', padding: '0.5rem', borderRadius: '50%', cursor: 'pointer' }}><Filter size={16} color="var(--text-secondary)" /></div>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem', height: '140px' }}>
                        {[0, 1, 2, 3].map((i) => (
                            <div
                                key={i}
                                onClick={() => setActiveMonth(i)}
                                style={{
                                    background: i === activeMonth ? 'rgba(245, 211, 74, 0.05)' : 'var(--bg-card)',
                                    border: i === activeMonth ? '1px solid var(--accent-yellow)' : '1px solid var(--border-light)',
                                    borderRadius: '16px',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    gap: '0.75rem',
                                    cursor: 'pointer',
                                    transition: 'all 0.2s ease'
                                }}
                            >
                                <div style={{ fontSize: '1rem', fontWeight: 500, color: i === activeMonth ? 'var(--accent-yellow)' : 'var(--text-secondary)' }}>Jun</div>
                                <Bell size={18} color="var(--text-primary)" />
                                <div style={{ fontSize: '0.9rem', color: i === activeMonth ? 'var(--accent-yellow)' : 'var(--text-secondary)' }}>180 kwh</div>
                            </div>
                        ))}
                    </div>

                    <div style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', "alignItems": "center" }}>
                            <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Min/Max Used</span>
                            <span style={{ fontSize: '0.9rem', color: 'var(--text-primary)' }}>August 180 kwh / July 301 kwh</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', "alignItems": "center" }}>
                            <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Total Used</span>
                            <span style={{ fontSize: '0.9rem', color: 'var(--text-primary)' }}>318 kwh</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Middle Row: Charts */}
            <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '2rem', height: '350px' }}>

                {/* Left: Energy Produced Bar Chart */}
                <div className="glass-card">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                        <h3 style={{ fontSize: '1.1rem', fontWeight: 500 }}>Energy Produced</h3>
                        <select style={{ background: 'var(--bg-input)', border: '1px solid var(--border-light)', color: 'var(--text-secondary)', padding: '0.4rem 0.8rem', borderRadius: '8px', fontSize: '0.85rem', outline: 'none' }}>
                            <option>Monthly</option>
                            <option>Weekly</option>
                        </select>
                    </div>

                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={mockBarData} margin={{ top: 10, right: 10, bottom: 0, left: -20 }}>
                            <defs>
                                <pattern id="diagonalStripes" width="8" height="8" patternTransform="rotate(45)" patternUnits="userSpaceOnUse">
                                    <rect width="8" height="8" fill="var(--bg-card)"></rect>
                                    <line x1="0" y1="0" x2="0" y2="8" stroke="var(--accent-yellow)" strokeWidth="4"></line>
                                </pattern>
                                {/* Custom active glow effect for striped bar */}
                                <filter id="glow">
                                    <feGaussianBlur stdDeviation="2.5" result="coloredBlur" />
                                    <feMerge>
                                        <feMergeNode in="coloredBlur" />
                                        <feMergeNode in="SourceGraphic" />
                                    </feMerge>
                                </filter>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} />
                            <XAxis dataKey="month" axisLine={false} tickLine={false} dy={10} />
                            <YAxis axisLine={false} tickLine={false} tickFormatter={(val) => `${val}%`} />
                            <Tooltip cursor={{ fill: 'rgba(255,255,255,0.02)' }} contentStyle={{ background: 'var(--bg-input)', border: 'none', borderRadius: '8px', color: 'white' }} />

                            <Bar dataKey="value" radius={[12, 12, 12, 12]} barSize={16}>
                                {mockBarData.map((entry, index) => (
                                    <Cell
                                        key={`cell-${index}`}
                                        fill={entry.striped ? "url(#diagonalStripes)" : "var(--accent-yellow)"}
                                        style={entry.striped ? { filter: 'url(#glow)' } : {}}
                                    />
                                ))}
                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>
                </div>

                {/* Right: Home Energy Consumption Details */}
                <div className="glass-card">
                    <h3 style={{ fontSize: '1.1rem', fontWeight: 500, marginBottom: '1.5rem' }}>Home Energy Consumption</h3>

                    {/* Stacked Progress Bar */}
                    <div style={{ display: 'flex', width: '100%', height: '16px', borderRadius: '16px', overflow: 'hidden', gap: '4px', marginBottom: '2rem' }}>
                        <div style={{ width: '40%', height: '100%', background: 'var(--accent-yellow)', borderRadius: '16px' }}></div>
                        <div style={{ width: '30%', height: '100%', background: 'var(--accent-purple)', borderRadius: '16px' }}></div>
                        <div style={{ width: '23%', height: '100%', background: 'var(--accent-orange)', borderRadius: '16px' }}></div>
                        <div style={{ width: '7%', height: '100%', background: 'var(--accent-blue)', borderRadius: '16px' }}></div>
                    </div>

                    {/* List items */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                        {[
                            { color: 'var(--accent-yellow)', label: 'Maximal Used', pct: '40%', val: '1.10 kw' },
                            { color: 'var(--accent-purple)', label: 'Meter Energy', pct: '30%', val: '2.358 kwh' },
                            { color: 'var(--accent-orange)', label: 'Unity Motor Uptime', pct: '23%', val: '75d 4h 25m' },
                            { color: 'var(--accent-blue)', label: 'UPS Input Voltage', pct: '15%', val: '280.6 V' },
                        ].map(item => (
                            <div key={item.label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                    <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: item.color }}></span>
                                    <span style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>{item.label} - {item.pct}</span>
                                </div>
                                <span style={{ color: 'var(--text-primary)', fontSize: '0.9rem', fontWeight: 500 }}>{item.val}</span>
                            </div>
                        ))}
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '0.5rem' }}>
                            <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginLeft: '1.25rem' }}>Standard</span>
                            <span style={{ color: 'var(--text-primary)', fontSize: '0.9rem', fontWeight: 500 }}>15.5 p/kwh</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginLeft: '1.25rem' }}>Meter Energy</span>
                            <span style={{ color: 'var(--text-primary)', fontSize: '0.9rem', fontWeight: 500 }}>$2,55</span>
                        </div>
                    </div>
                </div>

            </div>

            {/* Bottom Table: Courses With A Teacher */}
            <div className="glass-card" style={{ padding: '2rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                    <h3 style={{ fontSize: '1.25rem', fontWeight: 500 }}>Courses With A Teacher</h3>
                    <button style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'var(--bg-input)', border: '1px solid var(--border-light)', color: 'var(--text-primary)', display: 'flex', justifyContent: 'center', alignItems: 'center', cursor: 'pointer' }}>
                        <Plus size={16} />
                    </button>
                </div>

                <div style={{ width: '100%' }}>
                    {/* Table Header */}
                    <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 2fr 1fr 1fr', padding: '1rem', color: 'var(--text-muted)', fontSize: '0.85rem', borderBottom: '1px solid var(--border-light)' }}>
                        <div>Mentor</div>
                        <div>Course title</div>
                        <div>Status</div>
                        <div style={{ textAlign: 'right' }}>Lessons Progress</div>
                    </div>

                    {/* Table Row */}
                    <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 2fr 1fr 1fr', padding: '1.25rem 1rem', alignItems: 'center', background: 'var(--bg-input)', borderRadius: '12px', marginTop: '0.5rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                            <img src="https://i.pravatar.cc/150?img=47" alt="Mentor" style={{ width: '32px', height: '32px', borderRadius: '50%' }} />
                            <span style={{ color: 'var(--text-primary)', fontWeight: 500 }}>Esther Howard</span>
                        </div>
                        <div style={{ color: 'var(--text-secondary)' }}>Technical English for Beginners</div>
                        <div>
                            <span className="status-pill yellow">Beginner</span>
                        </div>
                        <div style={{ textAlign: 'right' }}>
                            <span style={{ padding: '0.4rem 0.8rem', background: 'var(--accent-yellow)', color: '#000', borderRadius: '8px', fontSize: '0.85rem', fontWeight: 600 }}>94%</span>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default PortfolioView;
