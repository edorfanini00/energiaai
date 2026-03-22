import React, { useState } from 'react';
import { LineChart, Line, BarChart, Bar, AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend } from 'recharts';
import { Zap, Activity, Plus } from 'lucide-react';

const buildingsList = ['North Tower', 'South Center', 'West Complex', 'East Wing'];

const mockDemandData = [
    { time: '00:00', b1: 120, b2: 90 }, { time: '04:00', b1: 110, b2: 85 },
    { time: '08:00', b1: 450, b2: 320 }, { time: '12:00', b1: 600, b2: 480 },
    { time: '16:00', b1: 580, b2: 450 }, { time: '20:00', b1: 200, b2: 150 },
];

const costBreakdown = [
    { period: 'Mon', electricity: 280, gas: 95 }, { period: 'Tue', electricity: 310, gas: 102 },
    { period: 'Wed', electricity: 265, gas: 88 }, { period: 'Thu', electricity: 290, gas: 98 },
    { period: 'Fri', electricity: 340, gas: 115 }, { period: 'Sat', electricity: 180, gas: 60 },
    { period: 'Sun', electricity: 150, gas: 52 },
];

const savingsData = [
    { period: 'Jan', elecSavings: 320, gasSavings: 110 }, { period: 'Feb', elecSavings: 290, gasSavings: 95 },
    { period: 'Mar', elecSavings: 410, gasSavings: 140 }, { period: 'Apr', elecSavings: 380, gasSavings: 125 },
    { period: 'May', elecSavings: 450, gasSavings: 160 }, { period: 'Jun', elecSavings: 520, gasSavings: 180 },
];

const historyData = [
    { month: 'Jul', current: 4200, historical: 4800 }, { month: 'Aug', current: 4500, historical: 5100 },
    { month: 'Sep', current: 3800, historical: 4600 }, { month: 'Oct', current: 3200, historical: 4200 },
    { month: 'Nov', current: 2800, historical: 3800 }, { month: 'Dec', current: 3100, historical: 4000 },
];

const EnergyDashboard = () => {
    const [selectedBuildings, setSelectedBuildings] = useState([buildingsList[0], buildingsList[1]]);
    const [costTimeframe, setCostTimeframe] = useState('day');
    const [chartTab, setChartTab] = useState('current');

    const tabStyle = (tab) => ({
        background: chartTab === tab ? 'var(--bg-input)' : 'transparent',
        color: chartTab === tab ? 'var(--accent-green)' : 'var(--text-secondary)',
        border: 'none',
        padding: '0.5rem 1rem',
        borderRadius: '8px',
        cursor: 'pointer',
        fontWeight: 500,
        fontSize: '0.85rem',
    });

    const tfStyle = (tf) => ({
        background: costTimeframe === tf ? 'var(--accent-green)' : 'transparent',
        color: costTimeframe === tf ? '#000' : 'var(--text-secondary)',
        border: 'none',
        padding: '0.35rem 0.7rem',
        borderRadius: '6px',
        cursor: 'pointer',
        fontSize: '0.8rem',
        fontWeight: 500,
    });

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', paddingBottom: '2rem' }}>

            {/* Building Selector */}
            <div className="glass-card" style={{ flexDirection: 'row', gap: '1rem', alignItems: 'center', padding: '1.25rem 1.5rem', flexWrap: 'wrap' }}>
                <Zap size={18} color="var(--accent-green)" />
                <h3 style={{ margin: 0, fontSize: '1rem', fontWeight: 500 }}>Compare Buildings:</h3>
                {selectedBuildings.map((b, i) => (
                    <React.Fragment key={i}>
                        {i > 0 && <span style={{ color: 'var(--text-muted)', fontWeight: 500 }}>vs</span>}
                        <select
                            value={b}
                            onChange={(e) => {
                                const next = [...selectedBuildings];
                                next[i] = e.target.value;
                                setSelectedBuildings(next);
                            }}
                            style={{ padding: '0.5rem 1rem', borderRadius: '8px', border: '1px solid var(--border-light)', background: 'var(--bg-input)', color: 'var(--text-primary)', fontSize: '0.9rem', outline: 'none', cursor: 'pointer' }}
                        >
                            {buildingsList.map((bl) => <option key={bl} value={bl}>{bl}</option>)}
                        </select>
                    </React.Fragment>
                ))}
                {selectedBuildings.length < 4 && (
                    <button
                        onClick={() => setSelectedBuildings([...selectedBuildings, buildingsList[selectedBuildings.length]])}
                        style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', background: 'rgba(74,222,128,0.1)', color: 'var(--accent-green)', border: 'none', padding: '0.5rem 0.75rem', borderRadius: '8px', cursor: 'pointer', fontSize: '0.8rem', fontWeight: 500 }}
                    >
                        <Plus size={14} /> Add
                    </button>
                )}
            </div>

            {/* Live Demand Graph */}
            <div className="glass-card" style={{ padding: '1.5rem' }}>
                <h3 style={{ margin: '0 0 1.25rem 0', display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '1.1rem', fontWeight: 500 }}>
                    <Activity size={18} color="var(--accent-green)" /> Live Energy Demand (kW)
                </h3>
                <div style={{ height: '300px' }}>
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={mockDemandData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} />
                            <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: 'var(--text-secondary)' }} />
                            <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: 'var(--text-secondary)' }} />
                            <Tooltip contentStyle={{ background: 'var(--bg-input)', border: 'none', borderRadius: '8px', color: '#fff' }} />
                            <Legend wrapperStyle={{ paddingTop: '0.75rem' }} />
                            <Line type="monotone" dataKey="b1" name={selectedBuildings[0]} stroke="var(--accent-green)" strokeWidth={2.5} dot={{ r: 3, fill: '#000' }} />
                            <Line type="monotone" dataKey="b2" name={selectedBuildings[1] || 'Building 2'} stroke="#3b82f6" strokeWidth={2.5} dot={{ r: 3, fill: '#000' }} />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* Cost Breakdown */}
            <div className="glass-card" style={{ padding: '1.5rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
                    <h3 style={{ fontSize: '1.1rem', fontWeight: 500 }}>Cost Breakdown by Energy Type</h3>
                    <div style={{ display: 'flex', gap: '0.25rem' }}>
                        {['day', 'week', 'month', 'year'].map((tf) => (
                            <button key={tf} style={tfStyle(tf)} onClick={() => setCostTimeframe(tf)}>{tf.charAt(0).toUpperCase() + tf.slice(1)}</button>
                        ))}
                    </div>
                </div>
                <div style={{ height: '260px' }}>
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={costBreakdown} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} />
                            <XAxis dataKey="period" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: 'var(--text-secondary)' }} />
                            <YAxis axisLine={false} tickLine={false} tickFormatter={(v) => `$${v}`} tick={{ fontSize: 11, fill: 'var(--text-secondary)' }} />
                            <Tooltip contentStyle={{ background: 'var(--bg-input)', border: 'none', borderRadius: '8px', color: '#fff' }} />
                            <Legend wrapperStyle={{ paddingTop: '0.75rem' }} />
                            <Bar dataKey="electricity" name="Electricity ($)" fill="var(--accent-green)" radius={[6, 6, 0, 0]} barSize={18} />
                            <Bar dataKey="gas" name="Gas ($)" fill="#f97316" radius={[6, 6, 0, 0]} barSize={18} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* Savings */}
            <div className="glass-card" style={{ padding: '1.5rem' }}>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 500, marginBottom: '1.25rem' }}>Savings by Energy Type</h3>
                <div style={{ height: '260px' }}>
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={savingsData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                            <defs>
                                <linearGradient id="savingsElec" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="var(--accent-green)" stopOpacity={0.3} />
                                    <stop offset="95%" stopColor="var(--accent-green)" stopOpacity={0} />
                                </linearGradient>
                                <linearGradient id="savingsGas" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#f97316" stopOpacity={0.3} />
                                    <stop offset="95%" stopColor="#f97316" stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} />
                            <XAxis dataKey="period" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: 'var(--text-secondary)' }} />
                            <YAxis axisLine={false} tickLine={false} tickFormatter={(v) => `$${v}`} tick={{ fontSize: 11, fill: 'var(--text-secondary)' }} />
                            <Tooltip contentStyle={{ background: 'var(--bg-input)', border: 'none', borderRadius: '8px', color: '#fff' }} />
                            <Legend wrapperStyle={{ paddingTop: '0.75rem' }} />
                            <Area type="monotone" dataKey="elecSavings" name="Electricity Savings" stroke="var(--accent-green)" strokeWidth={2} fill="url(#savingsElec)" />
                            <Area type="monotone" dataKey="gasSavings" name="Gas Savings" stroke="#f97316" strokeWidth={2} fill="url(#savingsGas)" />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* Tabbed Chart — 4 Tabs */}
            <div className="glass-card" style={{ padding: '1.5rem' }}>
                <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.25rem', borderBottom: '1px solid var(--border-light)', paddingBottom: '0.75rem' }}>
                    <button style={tabStyle('current')} onClick={() => setChartTab('current')}>Current Energy</button>
                    <button style={tabStyle('historical')} onClick={() => setChartTab('historical')}>Historical</button>
                    <button style={tabStyle('projected')} onClick={() => setChartTab('projected')}>Projected</button>
                    <button style={tabStyle('benchmarks')} onClick={() => setChartTab('benchmarks')}>Benchmarks</button>
                </div>

                <div style={{ height: '280px' }}>
                    <ResponsiveContainer width="100%" height="100%">
                        {chartTab === 'current' || chartTab === 'projected' ? (
                            <BarChart data={costBreakdown} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                                <XAxis dataKey="period" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: 'var(--text-secondary)' }} />
                                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: 'var(--text-secondary)' }} />
                                <Tooltip contentStyle={{ background: 'var(--bg-input)', border: 'none', borderRadius: '8px', color: '#fff' }} />
                                <Bar dataKey="electricity" name="Usage (kWh)" fill={chartTab === 'current' ? 'var(--accent-green)' : '#a78bfa'} radius={[6, 6, 0, 0]} barSize={24} />
                            </BarChart>
                        ) : (
                            <LineChart data={historyData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: 'var(--text-secondary)' }} />
                                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: 'var(--text-secondary)' }} />
                                <Tooltip contentStyle={{ background: 'var(--bg-input)', border: 'none', borderRadius: '8px', color: '#fff' }} />
                                <Legend wrapperStyle={{ paddingTop: '0.75rem' }} />
                                <Line type="monotone" dataKey="current" name={chartTab === 'historical' ? 'Current Year' : 'This Building'} stroke="var(--accent-green)" strokeWidth={2.5} dot={{ r: 3 }} />
                                <Line type="monotone" dataKey="historical" name={chartTab === 'historical' ? 'Previous Year' : 'Industry Avg'} stroke="#ef4444" strokeWidth={2} strokeDasharray="5 5" dot={{ r: 3 }} />
                            </LineChart>
                        )}
                    </ResponsiveContainer>
                </div>
            </div>

        </div>
    );
};

export default EnergyDashboard;
