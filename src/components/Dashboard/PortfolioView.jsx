import React from 'react';
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, ComposedChart, Line, Cell, ReferenceLine } from 'recharts';
import { LayoutList, Share2, Calendar, Edit2, ChevronDown, Bell } from 'lucide-react';

const mockSalesData = [
    { year: '2017', bg: 15, value: 20 },
    { year: '2018', bg: 20, value: 15 },
    { year: '2019', bg: 25, value: 35 },
    { year: '2020', bg: 18, value: 18 },
    { year: '2021', bg: 20, value: 25 },
    { year: '2022', bg: 16, value: 20 },
];

const mockMgmtData = [
    { month: 'Jan', val: 50, type: 'white' },
    { month: 'Feb', val: 70, type: 'striped' },
    { month: 'Mar', val: 40, type: 'white' },
    { month: 'Apr', val: 60, type: 'green' },
    { month: 'May', val: 65, type: 'striped' },
];

const CustomDot = (props) => {
    const { cx, cy } = props;
    return (
        <g>
            <line x1={cx} y1={cy} x2={cx} y2={230} stroke="var(--border-light)" strokeDasharray="3 3" />
            <circle cx={cx} cy={cy} r={4} stroke="#000" strokeWidth={2} fill="var(--accent-green)" />
        </g>
    );
};

const PortfolioView = () => {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>

            {/* Tool Bar Row */}
            <div className="toolbar-row">
                <div className="toolbar-links">
                    <div className="toolbar-item active">
                        <LayoutList size={16} /> Overview
                    </div>
                    <div className="toolbar-item">
                        <Share2 size={16} /> PPC
                    </div>
                    <div className="toolbar-item">
                        <Calendar size={16} /> Year to year
                    </div>
                    <div className="toolbar-item">
                        <Edit2 size={16} /> Customize
                    </div>
                </div>
                <div className="date-pill">
                    <Calendar size={14} /> 30 Days - 21 Oct 2024 <ChevronDown size={14} />
                </div>
            </div>

            {/* Top Cards Row */}
            <div style={{ display: 'grid', gridTemplateColumns: 'minmax(300px, 1fr) minmax(500px, 1.5fr)', gap: '1.5rem', height: '360px' }}>

                {/* Top Spend Card */}
                <div className="glass-card" style={{ position: 'relative', overflow: 'hidden' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                        <h2 style={{ fontSize: '1.5rem', fontWeight: 400 }}>Top Spend</h2>
                        {/* Mini Gauge SVG */}
                        <svg width="40" height="40" viewBox="0 0 36 36">
                            <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="4" />
                            <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="var(--accent-green)" strokeWidth="4" strokeDasharray="75, 100" />
                        </svg>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '2rem', zIndex: 2 }}>
                        <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Total</span>
                        <span style={{ fontSize: '2.5rem', fontWeight: 500, letterSpacing: '-0.02em', marginTop: '0.25rem' }}>5,388</span>
                    </div>

                    {/* Large Arc SVG positioned at bottom */}
                    <div style={{ position: 'absolute', bottom: '-4rem', left: '50%', transform: 'translateX(-50%)', width: '280px', height: '280px' }}>
                        <svg viewBox="0 0 100 100" width="100%" height="100%">
                            {/* Background Path */}
                            <path d="M 15,80 A 40,40 0 1,1 85,80" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="16" strokeLinecap="round" />
                            {/* Foreground Path (Yellow/White) */}
                            <path d="M 15,80 A 40,40 0 0,1 85,80" fill="none" stroke="var(--text-primary)" strokeWidth="16" strokeLinecap="round" strokeDasharray="140 200" />
                            {/* Optional yellow highlight on right edge */}
                            <path d="M 72.8,45 A 40,40 0 0,1 85,80" fill="none" stroke="var(--accent-green)" strokeWidth="16" strokeLinecap="round" />
                        </svg>
                        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', textAlign: 'center', marginTop: '3rem' }}>
                            <div style={{ fontSize: '1rem', fontWeight: 600 }}>$2,981</div>
                            <div style={{ fontSize: '0.65rem', color: 'var(--text-secondary)' }}>BGT7621701RQ</div>
                        </div>
                    </div>
                </div>

                {/* Sales Statistic Card */}
                <div className="glass-card">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                        <h2 style={{ fontSize: '1.5rem', fontWeight: 400 }}>Sales statistic</h2>
                        <div style={{ background: 'var(--bg-card-hover)', padding: '0.5rem 1rem', borderRadius: '16px', fontSize: '0.85rem', color: 'var(--text-secondary)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            Annual <ChevronDown size={14} />
                        </div>
                    </div>

                    <ResponsiveContainer width="100%" height="100%">
                        <ComposedChart data={mockSalesData} margin={{ top: 20, right: 20, left: -20, bottom: 0 }}>
                            <defs>
                                <linearGradient id="colorGreen" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="var(--accent-green)" stopOpacity={0.4} />
                                    <stop offset="95%" stopColor="var(--accent-green)" stopOpacity={0} />
                                </linearGradient>
                                <linearGradient id="colorBar" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="0%" stopColor="rgba(255,255,255,0.15)" />
                                    <stop offset="100%" stopColor="rgba(255,255,255,0.02)" />
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} />
                            <XAxis dataKey="year" axisLine={false} tickLine={false} dy={10} tick={{ fontSize: 11, fill: 'var(--text-secondary)' }} />
                            <YAxis axisLine={false} tickLine={false} tickFormatter={(v) => v === 0 ? '0' : `${Math.round(v / 10)}M`} tick={{ fontSize: 11, fill: 'var(--text-secondary)' }} />
                            <Tooltip cursor={false} contentStyle={{ background: 'var(--bg-input)', border: 'none', borderRadius: '8px', color: '#fff' }} />

                            <Bar dataKey="bg" fill="url(#colorBar)" barSize={24} radius={[2, 2, 0, 0]} />
                            <Area type="monotone" dataKey="value" stroke="var(--accent-green)" strokeWidth={2} fillOpacity={1} fill="url(#colorGreen)" />
                            <Line type="monotone" dataKey="value" stroke="none" dot={<CustomDot />} activeDot={{ r: 6, fill: '#fff' }} />
                        </ComposedChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* Bottom Cards Row */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem', height: '220px' }}>

                {/* Schedule Card */}
                <div className="glass-card" style={{ padding: '1.5rem', overflowY: 'auto' }}>
                    <h3 style={{ fontSize: '1.25rem', fontWeight: 400, marginBottom: '1.5rem' }}>Schedule</h3>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                        {[
                            { t: '09:30', title: 'Design Review', sub: 'Team organization' },
                            { t: '10:30', title: 'Meeting', sub: 'Product solution' },
                            { t: '11:00', title: 'Discussion', sub: 'Development team' },
                            { t: '11:30', title: 'Interview', sub: 'New candidate' }
                        ].map((item, idx) => (
                            <div key={idx} style={{ display: 'flex', gap: '1.5rem', padding: '0.85rem 0', borderBottom: idx === 3 ? 'none' : '1px solid rgba(255,255,255,0.05)' }}>
                                <div style={{ color: 'var(--accent-green)', fontSize: '1rem', fontWeight: 500 }}>{item.t}</div>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                                    <span style={{ fontSize: '0.9rem', color: 'var(--text-primary)', fontWeight: 500 }}>{item.title}</span>
                                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{item.sub}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Active Buyers Card */}
                <div className="glass-card" style={{ position: 'relative' }}>
                    <h3 style={{ fontSize: '1.25rem', fontWeight: 400, marginBottom: '1rem' }}>Active Buyers</h3>
                    <div style={{ fontSize: '2rem', fontWeight: 500, letterSpacing: '-0.02em' }}>10.8k</div>

                    <div style={{ position: 'absolute', right: '1.5rem', top: '4rem', display: 'flex', flexDirection: 'column', gap: '1.25rem', width: '120px' }}>
                        <div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '0.5rem' }}>
                                <span style={{ color: 'var(--text-secondary)' }}>THAI</span>
                                <span style={{ color: 'var(--text-primary)', fontWeight: 600 }}>50%</span>
                            </div>
                            <div style={{ width: '100%', height: '2px', background: 'rgba(255,255,255,0.1)' }}>
                                <div style={{ width: '50%', height: '100%', background: 'var(--text-primary)' }}></div>
                            </div>
                        </div>
                        <div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '0.5rem' }}>
                                <span style={{ color: 'var(--text-secondary)' }}>AFR</span>
                                <span style={{ color: 'var(--text-primary)', fontWeight: 600 }}>30%</span>
                            </div>
                            <div style={{ width: '100%', height: '2px', background: 'rgba(255,255,255,0.1)' }}>
                                <div style={{ width: '30%', height: '100%', background: 'var(--text-primary)' }}></div>
                            </div>
                        </div>
                    </div>

                    {/* Dotted Map Simulation */}
                    <svg style={{ position: 'absolute', bottom: '1rem', left: '1rem', width: '180px', height: '80px', opacity: 0.6 }} viewBox="0 0 100 50">
                        {Array.from({ length: 15 }).map((_, r) =>
                            Array.from({ length: 30 }).map((_, c) => {
                                const x = c * 3 + 4;
                                const y = r * 3 + 4;
                                const isLand = Math.sin(x * 0.1) * Math.cos(y * 0.1) > 0.1 || (x > 60 && y < 30) || (x < 30 && y < 40);
                                if (!isLand) return null;
                                return <circle key={`${r}-${c}`} cx={x} cy={y} r="0.75" fill="var(--text-secondary)" />;
                            })
                        )}
                    </svg>
                </div>

                {/* Management Card */}
                <div className="glass-card">
                    <h3 style={{ fontSize: '1.25rem', fontWeight: 400, marginBottom: '1rem' }}>Management</h3>
                    <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.5rem', marginBottom: '1.5rem' }}>
                        <span style={{ fontSize: '2rem', fontWeight: 500, letterSpacing: '-0.02em' }}>40-189</span>
                        <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>bpm</span>
                    </div>

                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={mockMgmtData} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
                            <defs>
                                <pattern id="diagStripe" width="6" height="6" patternTransform="rotate(45)" patternUnits="userSpaceOnUse">
                                    <rect width="6" height="6" fill="rgba(255,255,255,0.05)" />
                                    <line x1="0" y1="0" x2="0" y2="6" stroke="rgba(255,255,255,0.2)" strokeWidth="2" />
                                </pattern>
                            </defs>
                            <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: 'var(--text-secondary)' }} dy={5} />
                            <Tooltip cursor={{ fill: 'rgba(255,255,255,0.02)' }} contentStyle={{ background: 'var(--bg-input)', border: 'none', borderRadius: '8px' }} />
                            <Bar dataKey="val" radius={[10, 10, 10, 10]} barSize={20}>
                                {mockMgmtData.map((entry, index) => {
                                    let fill = "var(--text-primary)";
                                    if (entry.type === 'yellow') fill = "var(--accent-green)";
                                    if (entry.type === 'striped') fill = "url(#diagStripe)";
                                    return <Cell key={`cell-${index}`} fill={fill} />;
                                })}
                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>
                </div>

            </div>
        </div>
    );
};

export default PortfolioView;
