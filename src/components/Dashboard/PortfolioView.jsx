import React, { useState } from 'react';
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, ComposedChart, Line, Cell } from 'recharts';
import { LayoutList, Share2, Calendar, Edit2, ChevronDown, Zap, DollarSign, TrendingDown, Gauge, Leaf, BarChart3 } from 'lucide-react';

const monthlyConsumption = [
    { month: 'Jan', usage: 12400, bg: 15 },
    { month: 'Feb', usage: 11800, bg: 18 },
    { month: 'Mar', usage: 13200, bg: 20 },
    { month: 'Apr', usage: 10500, bg: 14 },
    { month: 'May', usage: 9800, bg: 12 },
    { month: 'Jun', usage: 14100, bg: 22 },
];

const emissionsData = [
    { month: 'Jan', emissions: 3.8, reduced: 0.9 },
    { month: 'Feb', emissions: 3.5, reduced: 1.1 },
    { month: 'Mar', emissions: 4.0, reduced: 0.8 },
    { month: 'Apr', emissions: 3.1, reduced: 1.3 },
    { month: 'May', emissions: 2.9, reduced: 1.5 },
    { month: 'Jun', emissions: 4.2, reduced: 0.7 },
];

const savingsBreakdown = [
    { month: 'Jan', val: 820, type: 'green' },
    { month: 'Feb', val: 1100, type: 'white' },
    { month: 'Mar', val: 650, type: 'striped' },
    { month: 'Apr', val: 1350, type: 'green' },
    { month: 'May', val: 1560, type: 'green' },
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

const kpiCards = [
    { label: 'Total Energy Consumption', value: '45,850 kWh', sub: 'Across all buildings', icon: Zap, color: 'var(--accent-green)' },
    { label: 'Total Energy Cost', value: '$15,950', sub: 'This billing period', icon: DollarSign, color: '#ef4444' },
    { label: 'Total Energy Savings', value: '$4,100', sub: 'vs. last period', icon: TrendingDown, color: '#22d3ee' },
    { label: 'Efficiency Rating', value: '88%', sub: 'Portfolio average', icon: Gauge, color: 'var(--accent-green)' },
    { label: 'Carbon Emissions', value: '12.6t', sub: 'This month', icon: Leaf, color: '#f97316' },
    { label: 'Emissions Reduced', value: '3.6t', sub: 'Through optimizations', icon: BarChart3, color: '#a78bfa' },
];

const PortfolioView = () => {
    const [isDateOpen, setIsDateOpen] = useState(false);
    const [dateRange, setDateRange] = useState('30 Days');

    const dateOptions = ['Today', 'Past 7 Days', '30 Days', 'This Month', 'Past Year', 'All Time'];

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
                <div style={{ position: 'relative' }}>
                    <div
                        className="date-pill"
                        style={{ cursor: 'pointer', userSelect: 'none' }}
                        onClick={() => setIsDateOpen(!isDateOpen)}
                    >
                        <Calendar size={14} /> {dateRange} <ChevronDown size={14} style={{ transform: isDateOpen ? 'rotate(180deg)' : 'none', transition: '0.2s' }} />
                    </div>

                    {isDateOpen && (
                        <div className="glass-card" style={{ position: 'absolute', top: 'calc(100% + 0.5rem)', right: 0, padding: '0.5rem', display: 'flex', flexDirection: 'column', gap: '0.25rem', zIndex: 50, minWidth: '160px', border: '1px solid var(--border-light)' }}>
                            {dateOptions.map(opt => (
                                <div
                                    key={opt}
                                    onClick={() => { setDateRange(opt); setIsDateOpen(false); }}
                                    style={{ padding: '0.5rem 0.75rem', borderRadius: '6px', fontSize: '0.85rem', cursor: 'pointer', color: dateRange === opt ? 'var(--accent-green)' : 'var(--text-primary)', background: dateRange === opt ? 'rgba(255,255,255,0.05)' : 'transparent', fontWeight: dateRange === opt ? 500 : 400, transition: '0.2s' }}
                                    onMouseEnter={(e) => { if (dateRange !== opt) e.currentTarget.style.background = 'rgba(255,255,255,0.05)' }}
                                    onMouseLeave={(e) => { if (dateRange !== opt) e.currentTarget.style.background = 'transparent' }}
                                >
                                    {opt}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* KPI Summary Row — 6 Cards */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: '1rem' }}>
                {kpiCards.map((kpi) => (
                    <div key={kpi.label} className="glass-card" style={{ padding: '1.25rem', gap: '0.5rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            <kpi.icon size={18} color={kpi.color} />
                            {/* Mini circular indicator */}
                            <svg width="28" height="28" viewBox="0 0 36 36">
                                <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="3" />
                                <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke={kpi.color} strokeWidth="3" strokeDasharray="75, 100" />
                            </svg>
                        </div>
                        <div style={{ fontSize: '1.5rem', fontWeight: 600, letterSpacing: '-0.02em' }}>{kpi.value}</div>
                        <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>{kpi.label}</div>
                        <div style={{ fontSize: '0.65rem', color: 'var(--text-secondary)', marginTop: '-0.1rem' }}>{kpi.sub}</div>
                    </div>
                ))}
            </div>

            {/* Main Charts Row */}
            <div style={{ display: 'grid', gridTemplateColumns: 'minmax(300px, 1fr) minmax(500px, 1.5fr)', gap: '1.5rem', height: '360px' }}>

                {/* Total Consumption Gauge */}
                <div className="glass-card" style={{ position: 'relative', overflow: 'hidden' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                        <h2 style={{ fontSize: '1.5rem', fontWeight: 400 }}>Consumption</h2>
                        <svg width="40" height="40" viewBox="0 0 36 36">
                            <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="4" />
                            <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="var(--accent-green)" strokeWidth="4" strokeDasharray="88, 100" />
                        </svg>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '2rem', zIndex: 2 }}>
                        <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Total kWh</span>
                        <span style={{ fontSize: '2.5rem', fontWeight: 500, letterSpacing: '-0.02em', marginTop: '0.25rem' }}>45,850</span>
                    </div>

                    {/* Large Arc */}
                    <div style={{ position: 'absolute', bottom: '-4rem', left: '50%', transform: 'translateX(-50%)', width: '280px', height: '280px' }}>
                        <svg viewBox="0 0 100 100" width="100%" height="100%">
                            <path d="M 15,80 A 40,40 0 1,1 85,80" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="16" strokeLinecap="round" />
                            <path d="M 15,80 A 40,40 0 0,1 85,80" fill="none" stroke="var(--text-primary)" strokeWidth="16" strokeLinecap="round" strokeDasharray="140 200" />
                            <path d="M 72.8,45 A 40,40 0 0,1 85,80" fill="none" stroke="var(--accent-green)" strokeWidth="16" strokeLinecap="round" />
                        </svg>
                        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', textAlign: 'center', marginTop: '3rem' }}>
                            <div style={{ fontSize: '1rem', fontWeight: 600 }}>88% Eff.</div>
                            <div style={{ fontSize: '0.65rem', color: 'var(--text-secondary)' }}>Portfolio Rating</div>
                        </div>
                    </div>
                </div>

                {/* Monthly Consumption Chart */}
                <div className="glass-card">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                        <h2 style={{ fontSize: '1.5rem', fontWeight: 400 }}>Energy Usage Trend</h2>
                        <div style={{ background: 'var(--bg-card-hover)', padding: '0.5rem 1rem', borderRadius: '16px', fontSize: '0.85rem', color: 'var(--text-secondary)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            Monthly <ChevronDown size={14} />
                        </div>
                    </div>

                    <ResponsiveContainer width="100%" height="100%">
                        <ComposedChart data={monthlyConsumption} margin={{ top: 20, right: 20, left: -10, bottom: 0 }}>
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
                            <XAxis dataKey="month" axisLine={false} tickLine={false} dy={10} tick={{ fontSize: 11, fill: 'var(--text-secondary)' }} />
                            <YAxis axisLine={false} tickLine={false} tickFormatter={(v) => v === 0 ? '0' : `${(v / 1000).toFixed(0)}k`} tick={{ fontSize: 11, fill: 'var(--text-secondary)' }} />
                            <Tooltip cursor={false} contentStyle={{ background: 'var(--bg-input)', border: 'none', borderRadius: '8px', color: '#fff' }} formatter={(v) => [`${v.toLocaleString()} kWh`]} />

                            <Bar dataKey="bg" fill="url(#colorBar)" barSize={24} radius={[2, 2, 0, 0]} />
                            <Area type="monotone" dataKey="usage" stroke="var(--accent-green)" strokeWidth={2} fillOpacity={1} fill="url(#colorGreen)" />
                            <Line type="monotone" dataKey="usage" stroke="none" dot={<CustomDot />} activeDot={{ r: 6, fill: '#fff' }} />
                        </ComposedChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* Bottom Cards Row */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem', height: '240px' }}>

                {/* Carbon Emissions by Month */}
                <div className="glass-card" style={{ padding: '1.5rem' }}>
                    <h3 style={{ fontSize: '1.25rem', fontWeight: 400, marginBottom: '1.25rem' }}>Carbon Emissions</h3>
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={emissionsData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                            <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: 'var(--text-secondary)' }} dy={5} />
                            <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: 'var(--text-secondary)' }} tickFormatter={(v) => `${v}t`} />
                            <Tooltip contentStyle={{ background: 'var(--bg-input)', border: 'none', borderRadius: '8px', color: '#fff' }} />
                            <Bar dataKey="emissions" name="Emissions (t)" fill="#f97316" radius={[8, 8, 8, 8]} barSize={14} />
                            <Bar dataKey="reduced" name="Reduced (t)" fill="var(--accent-green)" radius={[8, 8, 8, 8]} barSize={14} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>

                {/* Efficiency & Savings Overview */}
                <div className="glass-card" style={{ position: 'relative', padding: '1.5rem' }}>
                    <h3 style={{ fontSize: '1.25rem', fontWeight: 400, marginBottom: '1rem' }}>Efficiency</h3>
                    <div style={{ fontSize: '2rem', fontWeight: 500, letterSpacing: '-0.02em' }}>88%</div>

                    <div style={{ position: 'absolute', right: '1.5rem', top: '4rem', display: 'flex', flexDirection: 'column', gap: '1.25rem', width: '130px' }}>
                        {[
                            { label: 'North Tower', pct: 92 },
                            { label: 'South Center', pct: 88 },
                            { label: 'West Complex', pct: 76 },
                            { label: 'East Wing', pct: 95 },
                        ].map((b) => (
                            <div key={b.label}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', marginBottom: '0.35rem' }}>
                                    <span style={{ color: 'var(--text-secondary)' }}>{b.label}</span>
                                    <span style={{ color: 'var(--text-primary)', fontWeight: 600 }}>{b.pct}%</span>
                                </div>
                                <div style={{ width: '100%', height: '3px', background: 'rgba(255,255,255,0.08)', borderRadius: '3px' }}>
                                    <div style={{ width: `${b.pct}%`, height: '100%', background: b.pct >= 85 ? 'var(--accent-green)' : '#f97316', borderRadius: '3px' }}></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Energy Savings Breakdown */}
                <div className="glass-card" style={{ padding: '1.5rem' }}>
                    <h3 style={{ fontSize: '1.25rem', fontWeight: 400, marginBottom: '1rem' }}>Energy Savings</h3>
                    <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.5rem', marginBottom: '1rem' }}>
                        <span style={{ fontSize: '2rem', fontWeight: 500, letterSpacing: '-0.02em' }}>$4,100</span>
                        <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>total</span>
                    </div>

                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={savingsBreakdown} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
                            <defs>
                                <pattern id="diagStripe" width="6" height="6" patternTransform="rotate(45)" patternUnits="userSpaceOnUse">
                                    <rect width="6" height="6" fill="rgba(255,255,255,0.05)" />
                                    <line x1="0" y1="0" x2="0" y2="6" stroke="rgba(255,255,255,0.2)" strokeWidth="2" />
                                </pattern>
                            </defs>
                            <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: 'var(--text-secondary)' }} dy={5} />
                            <Tooltip cursor={{ fill: 'rgba(255,255,255,0.02)' }} contentStyle={{ background: 'var(--bg-input)', border: 'none', borderRadius: '8px' }} formatter={(v) => [`$${v}`]} />
                            <Bar dataKey="val" radius={[10, 10, 10, 10]} barSize={20}>
                                {savingsBreakdown.map((entry, index) => {
                                    let fill = "var(--text-primary)";
                                    if (entry.type === 'green') fill = "var(--accent-green)";
                                    if (entry.type === 'striped') fill = "url(#diagStripe)";
                                    return <Cell key={`cell-${index}`} fill={fill} />;
                                })}
                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>
                </div>

            </div>
        </div >
    );
};

export default PortfolioView;
