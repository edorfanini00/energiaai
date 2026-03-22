import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { Thermometer, Users, Lightbulb, Wind, Settings2, ShieldCheck, Droplet, ChevronDown, AlertTriangle, CheckCircle2, Clock, ArrowRight } from 'lucide-react';

const buildingsData = {
    1: { name: 'North Tower', address: '450 Fashion Ave, NY', buildingId: 'BLD-NT-001', size: '45,000 sqft', hours: '06:00 - 22:00', type: 'Commercial Office', occupancy: 78 },
    2: { name: 'South Center', address: '220 Park Blvd, LA', buildingId: 'BLD-SC-002', size: '32,000 sqft', hours: '07:00 - 21:00', type: 'Mixed Use', occupancy: 65 },
    3: { name: 'West Complex', address: '88 Market St, SF', buildingId: 'BLD-WC-003', size: '58,000 sqft', hours: '24/7', type: 'Industrial', occupancy: 82 },
    4: { name: 'East Wing', address: '12 Harbor Dr, Miami', buildingId: 'BLD-EW-004', size: '28,000 sqft', hours: '08:00 - 20:00', type: 'Residential Complex', occupancy: 55 },
};

const envData = {
    temperature: { current: 22.5, optimal: true, min: 19, max: 25, trend: [{ t: '6AM', v: 20 }, { t: '9AM', v: 21 }, { t: '12PM', v: 23 }, { t: '3PM', v: 24 }, { t: '6PM', v: 22 }, { t: '9PM', v: 21 }] },
    occupancy: { level: 'Medium', current: 245, max: 400, peakTime: '10:00 AM - 2:00 PM' },
    lighting: { efficient: true, usage: 72, activeZones: 18, totalZones: 25 },
    airQuality: { rating: 'Good', co2: 68, pm25: 12.4 },
};

const systemsList = [
    { id: 'hvac', name: 'HVAC', icon: Thermometer, operational: true, efficiency: '94%', lastMaint: '2024-09-15', nextMaint: '2025-03-15', runtime: '4,320 hrs', alerts: 0 },
    { id: 'lighting', name: 'Lighting', icon: Lightbulb, operational: true, efficiency: '98%', lastMaint: '2024-10-01', nextMaint: '2025-04-01', runtime: '5,100 hrs', alerts: 1 },
    { id: 'security', name: 'Security', icon: ShieldCheck, operational: true, efficiency: '99%', lastMaint: '2024-11-20', nextMaint: '2025-05-20', runtime: '8,760 hrs', alerts: 0 },
    { id: 'water', name: 'Water', icon: Droplet, operational: false, efficiency: '85%', lastMaint: '2024-06-10', nextMaint: '2024-12-10', runtime: '3,200 hrs', alerts: 2 },
];

const analyticsData = [
    { period: 'Mon', usage: 420, cost: 145, savings: 32 },
    { period: 'Tue', usage: 380, cost: 130, savings: 45 },
    { period: 'Wed', usage: 450, cost: 155, savings: 28 },
    { period: 'Thu', usage: 400, cost: 140, savings: 38 },
    { period: 'Fri', usage: 360, cost: 125, savings: 52 },
    { period: 'Sat', usage: 200, cost: 70, savings: 80 },
    { period: 'Sun', usage: 180, cost: 62, savings: 85 },
];

const Badge = ({ good, label }) => (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem', padding: '0.25rem 0.75rem', borderRadius: '6px', fontSize: '0.75rem', fontWeight: 600, background: good ? 'rgba(74,222,128,0.12)' : 'rgba(239,68,68,0.12)', color: good ? 'var(--accent-green)' : '#ef4444' }}>
        {good ? <CheckCircle2 size={12} /> : <AlertTriangle size={12} />} {label}
    </span>
);

const BuildingDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const building = buildingsData[id] || buildingsData[1];
    const [activeTab, setActiveTab] = useState('overview');
    const [analyticsTimeframe, setAnalyticsTimeframe] = useState('week');
    const [expandedSystem, setExpandedSystem] = useState(null);

    const tabStyle = (tab) => ({
        background: activeTab === tab ? 'var(--bg-input)' : 'transparent',
        color: activeTab === tab ? 'var(--accent-green)' : 'var(--text-secondary)',
        border: 'none',
        padding: '0.6rem 1.25rem',
        borderRadius: '8px',
        cursor: 'pointer',
        fontWeight: 500,
        fontSize: '0.9rem',
        transition: 'all 0.2s',
    });

    const tfStyle = (tf) => ({
        background: analyticsTimeframe === tf ? 'var(--accent-green)' : 'transparent',
        color: analyticsTimeframe === tf ? '#000' : 'var(--text-secondary)',
        border: 'none',
        padding: '0.4rem 0.8rem',
        borderRadius: '6px',
        cursor: 'pointer',
        fontSize: '0.8rem',
        fontWeight: 500,
    });

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', paddingBottom: '2rem' }}>

            {/* Building Selector */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <select
                    value={id}
                    onChange={(e) => navigate(`/building/${e.target.value}`)}
                    style={{ padding: '0.6rem 1.2rem', borderRadius: '8px', border: '1px solid var(--border-light)', background: 'var(--bg-input)', color: 'var(--text-primary)', fontSize: '1rem', outline: 'none', cursor: 'pointer' }}
                >
                    {Object.entries(buildingsData).map(([bid, bd]) => (
                        <option key={bid} value={bid}>{bd.name}</option>
                    ))}
                </select>
            </div>

            {/* Tab Switcher */}
            <div className="glass-card" style={{ flexDirection: 'row', gap: '0.5rem', padding: '0.5rem' }}>
                <button style={tabStyle('overview')} onClick={() => setActiveTab('overview')}>Overview</button>
                <button style={tabStyle('environment')} onClick={() => setActiveTab('environment')}>Environment</button>
                <button style={tabStyle('systems')} onClick={() => setActiveTab('systems')}>Systems</button>
            </div>

            {/* =============== OVERVIEW TAB =============== */}
            {activeTab === 'overview' && (
                <div className="glass-card" style={{ padding: '2rem' }}>
                    <h2 style={{ fontSize: '1.5rem', fontWeight: 500, marginBottom: '1.5rem' }}>{building.name}</h2>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1.5rem' }}>
                        {[
                            { label: 'Address', value: building.address },
                            { label: 'Building ID', value: building.buildingId },
                            { label: 'Size', value: building.size },
                            { label: 'Operating Hours', value: building.hours },
                            { label: 'Type', value: building.type },
                            { label: 'Current Occupancy', value: `${building.occupancy}%` },
                        ].map((item) => (
                            <div key={item.label}>
                                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '0.35rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{item.label}</div>
                                <div style={{ fontSize: '1.05rem', fontWeight: 500 }}>{item.value}</div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* =============== ENVIRONMENT TAB =============== */}
            {activeTab === 'environment' && (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1.25rem' }}>

                    {/* Temperature */}
                    <div className="glass-card" style={{ padding: '1.5rem' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                            <h3 style={{ fontSize: '1rem', fontWeight: 500, display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Thermometer size={16} color="var(--accent-green)" /> Temperature</h3>
                            <Badge good={envData.temperature.optimal} label={envData.temperature.optimal ? 'Optimal' : 'Not Optimal'} />
                        </div>
                        <div style={{ fontSize: '2rem', fontWeight: 600 }}>{envData.temperature.current}°C</div>
                        <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>Range: {envData.temperature.min}°C - {envData.temperature.max}°C</div>
                        <div style={{ height: '120px' }}>
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={envData.temperature.trend} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
                                    <defs>
                                        <linearGradient id="tempGrad" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="var(--accent-green)" stopOpacity={0.3} />
                                            <stop offset="95%" stopColor="var(--accent-green)" stopOpacity={0} />
                                        </linearGradient>
                                    </defs>
                                    <XAxis dataKey="t" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: 'var(--text-muted)' }} />
                                    <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: 'var(--text-muted)' }} domain={[18, 26]} />
                                    <Area type="monotone" dataKey="v" stroke="var(--accent-green)" strokeWidth={2} fill="url(#tempGrad)" />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    {/* Occupancy */}
                    <div className="glass-card" style={{ padding: '1.5rem' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                            <h3 style={{ fontSize: '1rem', fontWeight: 500, display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Users size={16} color="#22d3ee" /> Occupancy</h3>
                            <Badge good={envData.occupancy.level !== 'High'} label={envData.occupancy.level} />
                        </div>
                        <div style={{ fontSize: '2rem', fontWeight: 600 }}>{envData.occupancy.current} <span style={{ fontSize: '1rem', color: 'var(--text-muted)', fontWeight: 400 }}>/ {envData.occupancy.max}</span></div>
                        <div style={{ width: '100%', height: '8px', background: 'rgba(255,255,255,0.06)', borderRadius: '8px', marginTop: '0.75rem', marginBottom: '0.75rem' }}>
                            <div style={{ width: `${(envData.occupancy.current / envData.occupancy.max) * 100}%`, height: '100%', background: '#22d3ee', borderRadius: '8px' }}></div>
                        </div>
                        <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Peak time: {envData.occupancy.peakTime}</div>
                    </div>

                    {/* Lighting */}
                    <div className="glass-card" style={{ padding: '1.5rem' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                            <h3 style={{ fontSize: '1rem', fontWeight: 500, display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Lightbulb size={16} color="#fde047" /> Lighting</h3>
                            <Badge good={envData.lighting.efficient} label={envData.lighting.efficient ? 'Efficient' : 'Not Efficient'} />
                        </div>
                        <div style={{ fontSize: '2rem', fontWeight: 600 }}>{envData.lighting.usage}%</div>
                        <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>Current Usage</div>
                        <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Active Zones: <span style={{ color: 'var(--text-primary)', fontWeight: 500 }}>{envData.lighting.activeZones} / {envData.lighting.totalZones}</span></div>
                    </div>

                    {/* Air Quality */}
                    <div className="glass-card" style={{ padding: '1.5rem' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                            <h3 style={{ fontSize: '1rem', fontWeight: 500, display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Wind size={16} color="#a78bfa" /> Air Quality</h3>
                            <Badge good={['Good', 'Excellent'].includes(envData.airQuality.rating)} label={envData.airQuality.rating} />
                        </div>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginTop: '0.5rem' }}>
                            <div>
                                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '0.25rem' }}>CO₂ Score</div>
                                <div style={{ fontSize: '1.75rem', fontWeight: 600 }}>{envData.airQuality.co2}<span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>/100</span></div>
                            </div>
                            <div>
                                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '0.25rem' }}>PM2.5</div>
                                <div style={{ fontSize: '1.75rem', fontWeight: 600 }}>{envData.airQuality.pm25}<span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}> µg/m³</span></div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* =============== SYSTEMS TAB =============== */}
            {activeTab === 'systems' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>

                    {/* Systems List */}
                    <div className="glass-card" style={{ padding: '1.5rem' }}>
                        <h3 style={{ fontSize: '1.1rem', fontWeight: 500, marginBottom: '1.25rem' }}>Systems</h3>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                            {systemsList.map((sys) => (
                                <div key={sys.id}>
                                    <div
                                        style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem', background: 'var(--bg-input)', borderRadius: '10px', cursor: 'pointer', border: expandedSystem === sys.id ? '1px solid var(--accent-green)' : '1px solid transparent', transition: 'border-color 0.2s' }}
                                        onClick={() => setExpandedSystem(expandedSystem === sys.id ? null : sys.id)}
                                    >
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                            <sys.icon size={18} color={sys.operational ? 'var(--accent-green)' : '#ef4444'} />
                                            <span style={{ fontWeight: 500 }}>{sys.name}</span>
                                            <Badge good={sys.operational} label={sys.operational ? 'Operational' : 'Down'} />
                                            {sys.alerts > 0 && <span style={{ background: 'rgba(239,68,68,0.15)', color: '#ef4444', padding: '0.15rem 0.5rem', borderRadius: '6px', fontSize: '0.7rem', fontWeight: 600 }}>{sys.alerts} alert{sys.alerts > 1 ? 's' : ''}</span>}
                                        </div>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                                            <span>Eff: <span style={{ color: 'var(--text-primary)', fontWeight: 500 }}>{sys.efficiency}</span></span>
                                            <span>Last Maint: <span style={{ color: 'var(--text-primary)', fontWeight: 500 }}>{sys.lastMaint}</span></span>
                                            <ChevronDown size={16} style={{ transform: expandedSystem === sys.id ? 'rotate(180deg)' : 'none', transition: '0.2s' }} />
                                        </div>
                                    </div>

                                    {/* Expanded Detail */}
                                    {expandedSystem === sys.id && (
                                        <div style={{ padding: '1.25rem', background: 'rgba(255,255,255,0.02)', borderRadius: '0 0 10px 10px', marginTop: '-2px', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem' }}>
                                            <div>
                                                <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginBottom: '0.25rem' }}>Last Maintenance</div>
                                                <div style={{ fontSize: '0.9rem', fontWeight: 500 }}>{sys.lastMaint}</div>
                                            </div>
                                            <div>
                                                <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginBottom: '0.25rem' }}>Next Maintenance</div>
                                                <div style={{ fontSize: '0.9rem', fontWeight: 500 }}>{sys.nextMaint}</div>
                                            </div>
                                            <div>
                                                <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginBottom: '0.25rem' }}>Runtime</div>
                                                <div style={{ fontSize: '0.9rem', fontWeight: 500 }}>{sys.runtime}</div>
                                            </div>
                                            <div style={{ display: 'flex', alignItems: 'flex-end' }}>
                                                <button
                                                    onClick={() => navigate(`/building/${id}/system/${sys.id}`)}
                                                    style={{ background: 'var(--accent-green)', color: '#000', border: 'none', padding: '0.5rem 1rem', borderRadius: '8px', fontWeight: 600, cursor: 'pointer', fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '0.35rem' }}
                                                >
                                                    View System <ArrowRight size={14} />
                                                </button>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Analytics Panel */}
                    <div className="glass-card" style={{ padding: '1.5rem' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                            <h3 style={{ fontSize: '1.1rem', fontWeight: 500 }}>Building Analytics</h3>
                            <div style={{ display: 'flex', gap: '0.25rem' }}>
                                {['day', 'week', 'month', 'year'].map((tf) => (
                                    <button key={tf} style={tfStyle(tf)} onClick={() => setAnalyticsTimeframe(tf)}>{tf.charAt(0).toUpperCase() + tf.slice(1)}</button>
                                ))}
                            </div>
                        </div>

                        {/* KPI Row */}
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: '1rem', marginBottom: '1.5rem' }}>
                            {[
                                { label: 'Energy Usage', value: '2,390 kWh' },
                                { label: 'Energy Cost', value: '$827' },
                                { label: 'Energy Savings', value: '$360' },
                                { label: 'Emissions', value: '1.2t CO₂' },
                                { label: 'Efficiency', value: '92%' },
                                { label: 'Comfort', value: '87%' },
                            ].map((m) => (
                                <div key={m.label} style={{ textAlign: 'center' }}>
                                    <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginBottom: '0.3rem' }}>{m.label}</div>
                                    <div style={{ fontSize: '1.1rem', fontWeight: 600 }}>{m.value}</div>
                                </div>
                            ))}
                        </div>

                        {/* Analytics Chart */}
                        <div style={{ height: '220px' }}>
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={analyticsData} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                                    <XAxis dataKey="period" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: 'var(--text-secondary)' }} />
                                    <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: 'var(--text-secondary)' }} />
                                    <Tooltip contentStyle={{ background: 'var(--bg-input)', border: 'none', borderRadius: '8px', color: '#fff' }} />
                                    <Bar dataKey="usage" fill="var(--accent-green)" radius={[6, 6, 0, 0]} barSize={20} name="Usage (kWh)" />
                                    <Bar dataKey="savings" fill="rgba(74,222,128,0.3)" radius={[6, 6, 0, 0]} barSize={20} name="Savings ($)" />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    {/* Building Status */}
                    <div className="glass-card" style={{ padding: '1.5rem' }}>
                        <h3 style={{ fontSize: '1.1rem', fontWeight: 500, marginBottom: '1.25rem' }}>Building Status</h3>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem' }}>
                            {[
                                { label: 'Temperature', value: '22.5°C', sub: 'Optimal', good: true },
                                { label: 'Occupancy', value: '78%', sub: 'Medium', good: true },
                                { label: 'Lighting', value: '72%', sub: '18/25 zones active', good: true },
                                { label: 'Time of Day', value: '2:30 PM', sub: 'Peak hours', good: true },
                                { label: 'Air Quality', value: '68/100', sub: 'Good', good: true },
                                { label: 'Efficiency', value: '92%', sub: 'Above target', good: true },
                            ].map((s) => (
                                <div key={s.label} style={{ background: 'var(--bg-input)', borderRadius: '10px', padding: '1rem' }}>
                                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '0.35rem' }}>{s.label}</div>
                                    <div style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '0.25rem' }}>{s.value}</div>
                                    <Badge good={s.good} label={s.sub} />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* System Health */}
                    <div className="glass-card" style={{ padding: '1.5rem' }}>
                        <h3 style={{ fontSize: '1.1rem', fontWeight: 500, marginBottom: '1.25rem' }}>System Health</h3>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem' }}>
                            {systemsList.map((sys) => (
                                <div key={sys.id} style={{ background: 'var(--bg-input)', borderRadius: '10px', padding: '1rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                        <sys.icon size={16} color={sys.operational ? 'var(--accent-green)' : '#ef4444'} />
                                        <span style={{ fontWeight: 500, fontSize: '0.9rem' }}>{sys.name}</span>
                                    </div>
                                    <div style={{ width: '100%', height: '6px', background: 'rgba(255,255,255,0.06)', borderRadius: '6px' }}>
                                        <div style={{ width: sys.efficiency, height: '100%', background: sys.operational ? 'var(--accent-green)' : '#ef4444', borderRadius: '6px' }}></div>
                                    </div>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                                        <span>{sys.operational ? 'Healthy' : 'Needs Attention'}</span>
                                        <span>{sys.efficiency}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                </div>
            )}
        </div>
    );
};

export default BuildingDetail;
