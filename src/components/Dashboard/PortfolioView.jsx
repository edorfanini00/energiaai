import React, { useState } from 'react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { Zap, DollarSign, TrendingDown, Gauge, Leaf, BarChart3, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const buildings = [
    { id: 1, name: 'North Tower', address: '450 Fashion Ave, NY', consumption: '12,450 kWh', cost: '$4,230', savings: '$890', efficiency: 92, carbon: '3.2t', reduced: '0.8t', trend: [{ m: 'Jan', v: 120 }, { m: 'Feb', v: 135 }, { m: 'Mar', v: 110 }, { m: 'Apr', v: 145 }, { m: 'May', v: 130 }, { m: 'Jun', v: 155 }] },
    { id: 2, name: 'South Center', address: '220 Park Blvd, LA', consumption: '9,870 kWh', cost: '$3,150', savings: '$1,200', efficiency: 88, carbon: '2.8t', reduced: '1.1t', trend: [{ m: 'Jan', v: 90 }, { m: 'Feb', v: 105 }, { m: 'Mar', v: 85 }, { m: 'Apr', v: 115 }, { m: 'May', v: 100 }, { m: 'Jun', v: 125 }] },
    { id: 3, name: 'West Complex', address: '88 Market St, SF', consumption: '15,320 kWh', cost: '$5,680', savings: '$450', efficiency: 76, carbon: '4.5t', reduced: '0.3t', trend: [{ m: 'Jan', v: 150 }, { m: 'Feb', v: 160 }, { m: 'Mar', v: 155 }, { m: 'Apr', v: 170 }, { m: 'May', v: 165 }, { m: 'Jun', v: 180 }] },
    { id: 4, name: 'East Wing', address: '12 Harbor Dr, Miami', consumption: '8,210 kWh', cost: '$2,890', savings: '$1,560', efficiency: 95, carbon: '2.1t', reduced: '1.4t', trend: [{ m: 'Jan', v: 80 }, { m: 'Feb', v: 75 }, { m: 'Mar', v: 70 }, { m: 'Apr', v: 85 }, { m: 'May', v: 78 }, { m: 'Jun', v: 82 }] },
];

const totals = {
    consumption: '45,850 kWh',
    cost: '$15,950',
    savings: '$4,100',
    efficiency: '88%',
    carbon: '12.6t / mo',
    reduced: '3.6t',
};

const kpiItems = [
    { label: 'Total Consumption', value: totals.consumption, icon: Zap, color: 'var(--accent-green)' },
    { label: 'Total Energy Cost', value: totals.cost, icon: DollarSign, color: '#ef4444' },
    { label: 'Total Savings', value: totals.savings, icon: TrendingDown, color: '#22d3ee' },
    { label: 'Efficiency Rating', value: totals.efficiency, icon: Gauge, color: 'var(--accent-green)' },
    { label: 'Carbon Emissions', value: totals.carbon, icon: Leaf, color: '#f97316' },
    { label: 'Emissions Reduced', value: totals.reduced, icon: BarChart3, color: '#a78bfa' },
];

const PortfolioView = () => {
    const [trendBuilding, setTrendBuilding] = useState(null);
    const navigate = useNavigate();

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', paddingBottom: '2rem' }}>

            {/* KPI Summary Row */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: '1rem' }}>
                {kpiItems.map((kpi) => (
                    <div key={kpi.label} className="glass-card" style={{ padding: '1.25rem', gap: '0.75rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            <kpi.icon size={18} color={kpi.color} />
                        </div>
                        <div style={{ fontSize: '1.5rem', fontWeight: 600, letterSpacing: '-0.02em' }}>{kpi.value}</div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '-0.25rem' }}>{kpi.label}</div>
                    </div>
                ))}
            </div>

            {/* Building Cards */}
            <h2 style={{ fontSize: '1.25rem', fontWeight: 500, marginTop: '0.5rem' }}>All Buildings</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1.25rem' }}>
                {buildings.map((b) => (
                    <div
                        key={b.id}
                        className="glass-card"
                        style={{ padding: '1.5rem', cursor: 'pointer', transition: 'border-color 0.2s', border: '1px solid var(--border-light)' }}
                        onClick={() => setTrendBuilding(b)}
                        onMouseEnter={(e) => e.currentTarget.style.borderColor = 'var(--accent-green)'}
                        onMouseLeave={(e) => e.currentTarget.style.borderColor = 'var(--border-light)'}
                    >
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                            <div>
                                <h3 style={{ fontSize: '1.1rem', fontWeight: 500, marginBottom: '0.25rem' }}>{b.name}</h3>
                                <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{b.address}</span>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: b.efficiency >= 85 ? 'var(--accent-green)' : '#ef4444' }}></div>
                                <span style={{ fontSize: '0.85rem', color: b.efficiency >= 85 ? 'var(--accent-green)' : '#ef4444', fontWeight: 600 }}>{b.efficiency}%</span>
                            </div>
                        </div>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem' }}>
                            <div>
                                <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginBottom: '0.25rem' }}>Consumption</div>
                                <div style={{ fontSize: '0.95rem', fontWeight: 500 }}>{b.consumption}</div>
                            </div>
                            <div>
                                <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginBottom: '0.25rem' }}>Cost</div>
                                <div style={{ fontSize: '0.95rem', fontWeight: 500 }}>{b.cost}</div>
                            </div>
                            <div>
                                <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginBottom: '0.25rem' }}>Savings</div>
                                <div style={{ fontSize: '0.95rem', fontWeight: 500, color: '#22d3ee' }}>{b.savings}</div>
                            </div>
                            <div>
                                <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginBottom: '0.25rem' }}>Carbon</div>
                                <div style={{ fontSize: '0.95rem', fontWeight: 500 }}>{b.carbon}</div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Trend Popup Modal */}
            {trendBuilding && (
                <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.7)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }} onClick={() => setTrendBuilding(null)}>
                    <div className="glass-card" style={{ width: '600px', padding: '2rem', position: 'relative' }} onClick={(e) => e.stopPropagation()}>
                        <button onClick={() => setTrendBuilding(null)} style={{ position: 'absolute', top: '1rem', right: '1rem', background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer' }}>
                            <X size={20} />
                        </button>
                        <h3 style={{ fontSize: '1.25rem', fontWeight: 500, marginBottom: '0.25rem' }}>{trendBuilding.name}</h3>
                        <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '1.5rem' }}>Live trend data — last 6 months</p>
                        <div style={{ height: '250px' }}>
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={trendBuilding.trend} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                                    <defs>
                                        <linearGradient id="trendGreen" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="var(--accent-green)" stopOpacity={0.4} />
                                            <stop offset="95%" stopColor="var(--accent-green)" stopOpacity={0} />
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                                    <XAxis dataKey="m" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: 'var(--text-secondary)' }} />
                                    <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: 'var(--text-secondary)' }} />
                                    <Tooltip contentStyle={{ background: 'var(--bg-input)', border: 'none', borderRadius: '8px', color: '#fff' }} />
                                    <Area type="monotone" dataKey="v" stroke="var(--accent-green)" strokeWidth={2} fill="url(#trendGreen)" />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '1rem' }}>
                            <button
                                onClick={() => { setTrendBuilding(null); navigate(`/building/${trendBuilding.id}`); }}
                                style={{ background: 'var(--accent-green)', color: '#000', border: 'none', padding: '0.6rem 1.5rem', borderRadius: '8px', fontWeight: 600, cursor: 'pointer', fontSize: '0.9rem' }}
                            >
                                View Building →
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PortfolioView;
