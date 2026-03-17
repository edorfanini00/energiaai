import React, { useState } from 'react';
import { ComposedChart, Line, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, PieChart, Pie, Cell, AreaChart, Area } from 'recharts';
import { User, FileText, Lightbulb, Battery, Settings2, Sun } from 'lucide-react';

const mockChartData = [
    { time: '14:00', pv: 4000, grid: 2400, load: 3000 },
    { time: '16:00', pv: 3000, grid: 1398, load: 2000 },
    { time: '18:00', pv: 2000, grid: 4800, load: 2780 },
    { time: '20:00', pv: 2780, grid: 3908, load: 1890 },
    { time: '22:00', pv: 1890, grid: 4800, load: 2390 },
    { time: '00:00', pv: 2390, grid: 3800, load: 3490 },
    { time: '02:00', pv: 3490, grid: 4300, load: 3200 },
];

const mockSparkData = [
    { val: 10 }, { val: 20 }, { val: 15 }, { val: 35 }, { val: 25 }, { val: 40 }, { val: 30 }
];

const PortfolioView = () => {
    const [baseTimeframe, setBaseTimeframe] = useState('Week');

    const CustomTooltip = ({ active, payload, label }) => {
        if (active && payload && payload.length) {
            return (
                <div className="custom-tooltip">
                    {payload.map((p, idx) => (
                        <div key={idx} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem', marginBottom: '0.25rem' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                <span className={`dot ${idx === 0 ? 'dot-green' : 'dot-red'}`}></span>
                                <span style={{ fontWeight: 600 }}>{((p.value / 6000) * 100).toFixed(1)}%</span>
                            </div>
                            <span style={{ color: 'rgba(255,255,255,0.6)' }}>{idx === 0 ? 'High' : 'Low'}</span>
                        </div>
                    ))}
                </div>
            );
        }
        return null;
    };

    return (
        <div className="dashboard-grid">

            {/* Left Column */}
            <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                <div className="overview-header">
                    <h1 className="overview-title">Here's Your Current<br />Energy Overview</h1>
                    <p className="overview-subtitle">Your current sales summary and activity</p>
                </div>

                <div className="building-image-container">
                    <img src="/building.png" alt="Commercial Building" className="building-image" />
                </div>

                <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'flex-end', marginTop: '-3rem', position: 'relative', zIndex: 10 }}>
                    <div className="group-pill" style={{ marginBottom: '1.5rem' }}>
                        {['Week', 'Month', 'Year'].map(t => (
                            <button
                                key={t}
                                onClick={() => setBaseTimeframe(t)}
                                className={`btn-pill ${baseTimeframe === t ? 'active' : ''}`}
                            >
                                {t}
                            </button>
                        ))}
                    </div>

                    <div className="card" style={{ flex: 1 }}>
                        <div className="card-header">
                            <div className="card-icon" style={{ color: 'var(--accent-yellow)', background: '#FCF9EE' }}>
                                <Sun size={16} />
                            </div>
                            <div>
                                <div style={{ color: 'var(--text-primary)', fontWeight: 600, fontSize: '0.9rem' }}>Solar PV <span style={{ color: 'var(--text-secondary)', fontWeight: 400, fontSize: '0.75rem', marginLeft: '0.25rem' }}>22.0KWh</span></div>
                                <div className="card-title" style={{ textTransform: 'none' }}>Propensity health score</div>
                            </div>
                        </div>
                        <div className="value-pill">
                            <div className="value-pill-main">164.1 kwh</div>
                            <div className="value-pill-sub">7 days</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Right Column */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', height: '100%' }}>

                {/* Top Mini Widgets */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem' }}>
                    <div className="card" style={{ padding: '1.25rem' }}>
                        <div className="card-header">
                            <div className="card-icon" style={{ background: '#F5F5F5' }}>
                                <User size={14} color="var(--text-secondary)" />
                            </div>
                            <div className="card-title">Local Power</div>
                        </div>
                        <div className="card-value">356</div>
                    </div>
                    <div className="card" style={{ padding: '1.25rem' }}>
                        <div className="card-header">
                            <div className="card-icon" style={{ background: '#FCF9EE' }}>
                                <FileText size={14} color="var(--accent-yellow)" />
                            </div>
                            <div className="card-title">Grid Power</div>
                        </div>
                        <div className="card-value">284</div>
                    </div>
                    <div className="card" style={{ padding: '1.25rem' }}>
                        <div className="card-header">
                            <div className="card-icon" style={{ background: '#F5F5F5' }}>
                                <Lightbulb size={14} color="var(--text-secondary)" />
                            </div>
                            <div className="card-title">PV Power</div>
                        </div>
                        <div className="card-value">89</div>
                    </div>
                </div>

                {/* Main Chart Card */}
                <div className="card" style={{ padding: '1.5rem 1.5rem 1rem 0', flex: 1, minHeight: '320px' }}>
                    <ResponsiveContainer width="100%" height="100%">
                        <ComposedChart data={mockChartData} margin={{ top: 20, right: 20, bottom: 0, left: 0 }}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} />
                            <XAxis dataKey="time" axisLine={false} tickLine={false} dy={10} />
                            <YAxis axisLine={false} tickLine={false} tickFormatter={(val) => `${val / 1000}K`} dx={-10} />
                            <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(0,0,0,0.02)' }} />

                            <Bar dataKey="pv" barSize={10} fill="#F0C440" radius={[4, 4, 0, 0]} />
                            <Bar dataKey="grid" barSize={10} fill="#EBEBEB" radius={[4, 4, 0, 0]} />
                            <Line type="monotone" dataKey="load" stroke="#1A1A1A" strokeWidth={2} dot={{ r: 4, fill: '#fff', stroke: '#1A1A1A', strokeWidth: 2 }} activeDot={{ r: 6 }} />
                        </ComposedChart>
                    </ResponsiveContainer>
                </div>

                {/* Bottom Widgets */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.6fr', gap: '1.5rem', height: '220px' }}>

                    <div className="card">
                        <div className="card-header" style={{ marginBottom: 0 }}>
                            <div className="card-icon" style={{ background: '#F0F4F8' }}>
                                <Battery size={14} color="#8FA2AD" />
                            </div>
                            <div>
                                <div style={{ color: 'var(--text-primary)', fontWeight: 600, fontSize: '0.9rem' }}>Battery <span style={{ color: 'var(--text-secondary)', fontWeight: 400, fontSize: '0.75rem', marginLeft: '0.25rem' }}>75</span></div>
                                <div className="card-title" style={{ textTransform: 'none' }}>Propensity health score</div>
                            </div>
                        </div>

                        <div style={{ flex: 1, position: 'relative', marginTop: '-1rem' }}>
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={[{ value: 20 }, { value: 80 }]}
                                        cx="50%" cy="100%"
                                        startAngle={180} endAngle={0}
                                        innerRadius="75%" outerRadius="100%"
                                        stroke="none"
                                        dataKey="value"
                                    >
                                        <Cell fill="#D0BFA5" />
                                        <Cell fill="#F5F5F5" />
                                    </Pie>
                                </PieChart>
                            </ResponsiveContainer>
                            <div style={{ position: 'absolute', bottom: '15%', left: '0', width: '100%', textAlign: 'center' }}>
                                <div style={{ fontSize: '2rem', fontWeight: 600, color: 'var(--text-primary)', lineHeight: 1 }}>20%</div>
                                <div style={{ fontSize: '0.7rem', color: 'var(--text-secondary)' }}>Investment opportunities</div>
                            </div>
                        </div>
                    </div>

                    <div className="card">
                        <div className="card-header" style={{ marginBottom: '1rem' }}>
                            <div className="card-icon" style={{ background: '#F0F4F8' }}>
                                <Settings2 size={14} color="#8FA2AD" />
                            </div>
                            <div>
                                <div style={{ color: 'var(--text-primary)', fontWeight: 600, fontSize: '0.9rem' }}>Inverter <span style={{ color: 'var(--text-secondary)', fontWeight: 400, fontSize: '0.75rem', marginLeft: '0.25rem' }}>22.0KWh</span></div>
                                <div className="card-title" style={{ textTransform: 'none' }}>Propensity health score</div>
                            </div>
                        </div>

                        <div style={{ flex: 1, position: 'relative' }}>
                            <div style={{ position: 'absolute', left: '46%', top: '20%', width: '30px', height: '100%', background: 'var(--accent-yellow)', borderRadius: '8px', zIndex: 0, opacity: 0.8 }}></div>

                            <ResponsiveContainer width="100%" height="100%" style={{ zIndex: 1, position: 'relative' }}>
                                <AreaChart data={mockSparkData}>
                                    <defs>
                                        <linearGradient id="colorSpark" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#8FA2AD" stopOpacity={0.3} />
                                            <stop offset="95%" stopColor="#8FA2AD" stopOpacity={0} />
                                        </linearGradient>
                                    </defs>
                                    <Tooltip cursor={false} contentStyle={{ display: 'none' }} />
                                    <Area type="natural" dataKey="val" stroke="#8FA2AD" strokeWidth={2} fillOpacity={1} fill="url(#colorSpark)" />
                                </AreaChart>
                            </ResponsiveContainer>

                            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0 1rem', fontSize: '0.75rem', color: 'var(--text-secondary)', margin: '0.25rem 0', position: 'relative', zIndex: 1 }}>
                                <span>1st</span><span>2nd</span><span>3rd</span><span style={{ color: '#1A1A1A', fontWeight: 600 }}>4th</span><span>5th</span><span>6th</span><span>7th</span>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default PortfolioView;
