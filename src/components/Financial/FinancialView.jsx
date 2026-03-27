import React, { useState } from 'react';
import { DollarSign, Calculator, TrendingUp, Calendar } from 'lucide-react';
import { AreaChart, Area, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const budgetData = [
    { month: 'Jan', actual: 375000, projected: null },
    { month: 'Feb', actual: 360000, projected: null },
    { month: 'Mar', actual: 390000, projected: null },
    { month: 'Apr', actual: 380000, projected: null },
    { month: 'May', actual: 400000, projected: 400000 },
    { month: 'Jun', actual: null, projected: 385000 },
    { month: 'Jul', actual: null, projected: 395000 },
    { month: 'Aug', actual: null, projected: 380000 },
    { month: 'Sep', actual: null, projected: 370000 },
    { month: 'Oct', actual: null, projected: 365000 },
    { month: 'Nov', actual: null, projected: 360000 },
    { month: 'Dec', actual: null, projected: 355000 },
];

const roiData = [
    { month: 'Jan', investment: 60000, returns: 0 },
    { month: 'Feb', investment: 60000, returns: 10000 },
    { month: 'Mar', investment: 60000, returns: 25000 },
    { month: 'Apr', investment: 60000, returns: 45000 },
    { month: 'May', investment: 60000, returns: 70000 },
    { month: 'Jun', investment: 60000, returns: 95000 },
    { month: 'Jul', investment: 60000, returns: 125000 },
    { month: 'Aug', investment: 60000, returns: 160000 },
    { month: 'Sep', investment: 60000, returns: 195000 },
    { month: 'Oct', investment: 60000, returns: 235000 },
    { month: 'Nov', investment: 60000, returns: 280000 },
    { month: 'Dec', investment: 60000, returns: 330000 },
];

const FinancialView = () => {
    const [activePeriod, setActivePeriod] = useState('Month');

    const kpis = [
        {
            title: 'Total Costs',
            value: '$12,500',
            trend: '-8.2%',
            isPositive: false,
            icon: DollarSign,
            color: '#ec4899', // pink-500
            subtitle: 'Implementation & License',
        },
        {
            title: 'Projected Savings',
            value: '$42,500',
            trend: '+15.3%',
            isPositive: true,
            icon: Calculator,
            color: '#10b981', // emerald-500
            subtitle: 'Energy & Maintenance',
        },
        {
            title: 'ROI %',
            value: '18.5%',
            trend: '+2.3%',
            isPositive: true,
            icon: TrendingUp,
            color: '#3b82f6', // blue-500
            subtitle: 'Return on Investment',
        }
    ];

    return (
        <div style={{ padding: '2rem', maxWidth: '1400px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                    <h1 style={{ fontSize: '2rem', fontWeight: 600, margin: 0 }}>Financial Overview</h1>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', marginTop: '0.25rem' }}>Track solution costs, energy savings, and performance returns.</p>
                </div>
                
                {/* Period Selector */}
                <div style={{ display: 'flex', gap: '0.5rem', background: 'rgba(255,255,255,0.03)', padding: '4px', borderRadius: '12px', border: '1px solid var(--border-light)' }}>
                    {['Day', 'Week', 'Month', 'Year'].map(p => (
                        <button
                            key={p}
                            onClick={() => setActivePeriod(p)}
                            style={{
                                padding: '0.5rem 1.25rem',
                                borderRadius: '8px',
                                border: 'none',
                                background: activePeriod === p ? 'var(--accent-green)' : 'transparent',
                                color: activePeriod === p ? '#000' : 'var(--text-secondary)',
                                fontWeight: activePeriod === p ? 600 : 500,
                                fontSize: '0.85rem',
                                cursor: 'pointer',
                                transition: 'all 0.2s'
                            }}
                        >
                            {p}
                        </button>
                    ))}
                    <button style={{ padding: '0.5rem 1rem', borderRadius: '8px', border: 'none', background: 'transparent', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '0.4rem', cursor: 'pointer' }}>
                        <Calendar size={14} /> Custom
                    </button>
                </div>
            </div>

            {/* KPI Cards Row */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem' }}>
                {kpis.map((kpi, idx) => {
                    const Icon = kpi.icon;
                    return (
                        <div key={idx} className="glass-card" style={{ padding: '1.75rem', display: 'flex', flexDirection: 'column', position: 'relative', overflow: 'hidden' }}>
                            <div style={{ position: 'absolute', top: '-20px', right: '-20px', width: '100px', height: '100px', background: kpi.color, opacity: 0.05, borderRadius: '50%', filter: 'blur(20px)' }} />
                            
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                                    <span style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', fontWeight: 500 }}>{kpi.title}</span>
                                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{kpi.subtitle}</span>
                                </div>
                                <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: `${kpi.color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: kpi.color }}>
                                    <Icon size={20} />
                                </div>
                            </div>
                            
                            <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.75rem', marginTop: '1.25rem' }}>
                                <span style={{ fontSize: '2.5rem', fontWeight: 700, letterSpacing: '-0.03em' }}>{kpi.value}</span>
                                <span style={{ 
                                    padding: '0.25rem 0.6rem', 
                                    borderRadius: '20px', 
                                    fontSize: '0.75rem', 
                                    fontWeight: 600,
                                    background: kpi.isPositive ? 'rgba(16, 185, 129, 0.1)' : 'rgba(236, 72, 153, 0.1)',
                                    color: kpi.isPositive ? '#10b981' : '#ec4899'
                                }}>
                                    {kpi.trend}
                                </span>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Charts Row */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '2rem' }}>
                
                {/* Budget Forecast */}
                <div className="glass-card" style={{ padding: '2rem' }}>
                    <div style={{ marginBottom: '1.5rem' }}>
                        <h3 style={{ fontSize: '1.25rem', fontWeight: 500, margin: 0 }}>Budget Forecast</h3>
                        <div style={{ display: 'flex', gap: '1.5rem', marginTop: '0.75rem' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                <div style={{ width: '16px', height: '4px', background: '#3b82f6', borderRadius: '2px' }} />
                                <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Actual Costs</span>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                <div style={{ width: '16px', height: '4px', borderTop: '2px dashed #ec4899' }} />
                                <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Projected Costs</span>
                            </div>
                        </div>
                    </div>
                    
                    <div style={{ height: '350px', width: '100%' }}>
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={budgetData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                                <defs>
                                    <linearGradient id="colorActual" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                                        <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border-light)" />
                                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: 'var(--text-muted)', fontSize: 12 }} dy={10} />
                                <YAxis axisLine={false} tickLine={false} tick={{ fill: 'var(--text-muted)', fontSize: 12 }} dx={-10} tickFormatter={v => v.toLocaleString()} />
                                <Tooltip 
                                    contentStyle={{ background: '#111827', border: '1px solid var(--border-light)', borderRadius: '8px', color: '#fff' }}
                                    formatter={(value) => `$${value.toLocaleString()}`}
                                />
                                <Area type="monotone" dataKey="actual" stroke="#3b82f6" strokeWidth={3} fillOpacity={1} fill="url(#colorActual)" activeDot={{ r: 6, strokeWidth: 0, fill: '#3b82f6' }} />
                                <Line type="monotone" dataKey="projected" stroke="#ec4899" strokeWidth={3} strokeDasharray="5 5" dot={{ r: 4, fill: '#ec4899', strokeWidth: 0 }} activeDot={{ r: 6, strokeWidth: 0, fill: '#ec4899' }} />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* ROI Metrics */}
                <div className="glass-card" style={{ padding: '2rem' }}>
                    <div style={{ marginBottom: '1.5rem' }}>
                        <h3 style={{ fontSize: '1.25rem', fontWeight: 500, margin: 0 }}>ROI Metrics</h3>
                        <div style={{ display: 'flex', gap: '1.5rem', marginTop: '0.75rem' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                <div style={{ width: '16px', height: '4px', background: '#ec4899', borderRadius: '2px' }} />
                                <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Investment</span>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                <div style={{ width: '16px', height: '4px', background: '#3b82f6', borderRadius: '2px' }} />
                                <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Returns</span>
                            </div>
                        </div>
                    </div>
                    
                    <div style={{ height: '350px', width: '100%' }}>
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={roiData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border-light)" />
                                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: 'var(--text-muted)', fontSize: 12 }} dy={10} />
                                <YAxis axisLine={false} tickLine={false} tick={{ fill: 'var(--text-muted)', fontSize: 12 }} dx={-10} tickFormatter={v => v.toLocaleString()} />
                                <Tooltip 
                                    contentStyle={{ background: '#111827', border: '1px solid var(--border-light)', borderRadius: '8px', color: '#fff' }}
                                    formatter={(value) => `$${value.toLocaleString()}`}
                                />
                                <Line type="stepAfter" dataKey="investment" stroke="#ec4899" strokeWidth={3} dot={false} activeDot={false} />
                                <Line type="monotone" dataKey="returns" stroke="#3b82f6" strokeWidth={3} dot={{ r: 4, fill: '#3b82f6', strokeWidth: 0 }} activeDot={{ r: 6, strokeWidth: 0, fill: '#3b82f6' }} />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default FinancialView;
