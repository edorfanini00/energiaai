import React, { useState } from 'react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend } from 'recharts';
import { Zap, Activity } from 'lucide-react';

const mockDemandData = [
    { time: '00:00', b1: 120, b2: 90 }, { time: '04:00', b1: 110, b2: 85 },
    { time: '08:00', b1: 450, b2: 320 }, { time: '12:00', b1: 600, b2: 480 },
    { time: '16:00', b1: 580, b2: 450 }, { time: '20:00', b1: 200, b2: 150 },
];

const EnergyDashboard = () => {
    const [activeTimeframe, setActiveTimeframe] = useState('week');
    const [activeHistoryTab, setActiveHistoryTab] = useState('historical');

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', paddingBottom: '3rem' }}>

            {/* Compare Selector */}
            <div className="card" style={{ flexDirection: 'row', gap: '1.5rem', alignItems: 'center', padding: '1.5rem 2rem' }}>
                <h3 style={{ margin: 0, fontSize: '1.1rem', fontWeight: 600 }}>Compare Buildings:</h3>
                <select style={{ padding: '0.6rem 1.2rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-light)', background: 'var(--bg-page)', fontSize: '1rem', outline: 'none', cursor: 'pointer' }}>
                    <option>North Tower</option>
                    <option>West Complex</option>
                </select>
                <span style={{ color: 'var(--text-secondary)', fontWeight: 500 }}>vs</span>
                <select style={{ padding: '0.6rem 1.2rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-light)', background: 'var(--bg-page)', fontSize: '1rem', outline: 'none', cursor: 'pointer' }}>
                    <option>South Center</option>
                    <option>East Wing</option>
                </select>
            </div>

            {/* Live Demand Graph */}
            <div className="card">
                <h3 style={{ margin: '0 0 1.5rem 0', display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '1.25rem' }}>
                    <div className="card-icon" style={{ background: '#FCF9EE' }}><Activity size={16} color="var(--accent-yellow)" /></div> Live Energy Demand (kW)
                </h3>
                <div style={{ height: '350px', width: '100%' }}>
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={mockDemandData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border-light)" />
                            <XAxis dataKey="time" axisLine={false} tickLine={false} dy={10} />
                            <YAxis axisLine={false} tickLine={false} />
                            <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', background: 'var(--text-primary)', color: 'white' }} />
                            <Legend wrapperStyle={{ paddingTop: '1rem' }} />
                            <Line type="monotone" dataKey="b1" name="North Tower" stroke="var(--accent-yellow)" strokeWidth={3} dot={{ r: 4, fill: '#fff' }} activeDot={{ r: 6 }} />
                            <Line type="monotone" dataKey="b2" name="South Center" stroke="var(--accent-blue)" strokeWidth={3} dot={{ r: 4, fill: '#fff' }} activeDot={{ r: 6 }} />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* Cost Breakdown */}
            <div className="card">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                    <h3 style={{ margin: 0, display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '1.25rem' }}>
                        <div className="card-icon" style={{ background: '#FCF9EE' }}><Zap size={16} color="var(--accent-yellow)" /></div> Utilities Breakdown
                    </h3>
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

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.5rem' }}>
                    {[
                        { title: 'Electricity Cost', val: '$12,450' },
                        { title: 'Gas Cost', val: '$3,200' },
                        { title: 'Elec. Savings', val: '$1,200' },
                        { title: 'Gas Savings', val: '$450' }
                    ].map(c => (
                        <div key={c.title} style={{ padding: '1.5rem', background: 'var(--bg-page)', borderRadius: 'var(--radius-sm)' }}>
                            <div className="card-title">{c.title}</div>
                            <div className="card-value">{c.val}</div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Historical Data */}
            <div className="card" style={{ paddingBottom: '2rem' }}>
                <div className="group-pill" style={{ margin: '0 0 2rem 0', alignSelf: 'flex-start' }}>
                    <button className={`btn-pill ${activeHistoryTab === 'historical' ? 'active' : ''}`} onClick={() => setActiveHistoryTab('historical')}>Historical</button>
                    <button className={`btn-pill ${activeHistoryTab === 'projected' ? 'active' : ''}`} onClick={() => setActiveHistoryTab('projected')}>Projected</button>
                    <button className={`btn-pill ${activeHistoryTab === 'benchmarks' ? 'active' : ''}`} onClick={() => setActiveHistoryTab('benchmarks')}>Benchmarks</button>
                    <button className={`btn-pill ${activeHistoryTab === 'anomalies' ? 'active' : ''}`} onClick={() => setActiveHistoryTab('anomalies')}>Anomalies</button>
                </div>

                <div style={{ height: '350px', width: '100%' }}>
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={mockDemandData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border-light)" />
                            <XAxis dataKey="time" axisLine={false} tickLine={false} dy={10} />
                            <YAxis axisLine={false} tickLine={false} />
                            <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', background: 'var(--text-primary)', color: 'white' }} cursor={{ fill: 'rgba(0,0,0,0.02)' }} />
                            <Legend wrapperStyle={{ paddingTop: '1rem' }} />
                            <Bar dataKey="b1" name="Usage (kWh)" fill="var(--accent-blue)" radius={[4, 4, 0, 0]} barSize={40} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
};

export default EnergyDashboard;
