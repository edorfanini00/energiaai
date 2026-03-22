import React from 'react';
import { useNavigate } from 'react-router-dom';
import { AlertTriangle, MapPin } from 'lucide-react';

const buildings = [
    { id: 1, name: 'North Tower', address: '450 Fashion Ave, NY', occupancy: '78%', efficiency: '92%', hasFault: false, x: 140, y: 90 },
    { id: 2, name: 'South Center', address: '220 Park Blvd, LA', occupancy: '65%', efficiency: '88%', hasFault: false, x: 80, y: 200 },
    { id: 3, name: 'West Complex', address: '88 Market St, SF', occupancy: '82%', efficiency: '76%', hasFault: true, x: 60, y: 120 },
    { id: 4, name: 'East Wing', address: '12 Harbor Dr, Miami', occupancy: '55%', efficiency: '95%', hasFault: false, x: 200, y: 220 },
    { id: 5, name: 'Central Hub', address: '500 Main St, Chicago', occupancy: '90%', efficiency: '81%', hasFault: true, x: 160, y: 160 },
];

const BuildingsMapView = () => {
    const navigate = useNavigate();

    return (
        <div style={{ display: 'flex', gap: '1.5rem', height: 'calc(100vh - 140px)', paddingBottom: '1rem' }}>

            {/* Left Panel — Building List */}
            <div style={{ width: '340px', flexShrink: 0, display: 'flex', flexDirection: 'column', gap: '0.75rem', overflowY: 'auto', paddingRight: '0.5rem' }}>
                <h2 style={{ fontSize: '1.25rem', fontWeight: 500, marginBottom: '0.5rem' }}>Buildings</h2>
                {buildings.map((b) => (
                    <div
                        key={b.id}
                        className="glass-card"
                        style={{ padding: '1.25rem', cursor: 'pointer', border: '1px solid var(--border-light)', transition: 'border-color 0.2s' }}
                        onClick={() => navigate(`/building/${b.id}`)}
                        onMouseEnter={(e) => e.currentTarget.style.borderColor = 'var(--accent-green)'}
                        onMouseLeave={(e) => e.currentTarget.style.borderColor = 'var(--border-light)'}
                    >
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                            <h4 style={{ fontSize: '1rem', fontWeight: 500, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                {b.name}
                                {b.hasFault && (
                                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.25rem', background: 'rgba(239,68,68,0.15)', color: '#ef4444', padding: '0.15rem 0.5rem', borderRadius: '6px', fontSize: '0.7rem', fontWeight: 600 }}>
                                        <AlertTriangle size={12} /> Alarm
                                    </span>
                                )}
                            </h4>
                            <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>{b.efficiency} eff.</span>
                        </div>
                        <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>{b.address}</div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem' }}>
                            <span style={{ color: 'var(--text-secondary)' }}>Occupancy</span>
                            <span style={{ color: 'var(--text-primary)', fontWeight: 500 }}>{b.occupancy}</span>
                        </div>
                    </div>
                ))}
            </div>

            {/* Right Panel — Map */}
            <div className="glass-card" style={{ flex: 1, padding: '1.5rem', position: 'relative', overflow: 'hidden' }}>
                <h3 style={{ fontSize: '1rem', fontWeight: 500, marginBottom: '1rem', color: 'var(--text-secondary)' }}>Building Map</h3>

                <svg viewBox="0 0 300 300" width="100%" height="100%" style={{ position: 'absolute', inset: 0, padding: '3rem' }}>
                    {/* Grid lines */}
                    {Array.from({ length: 8 }).map((_, i) => (
                        <g key={i}>
                            <line x1={0} y1={i * 42} x2={300} y2={i * 42} stroke="rgba(255,255,255,0.03)" />
                            <line x1={i * 42} y1={0} x2={i * 42} y2={300} stroke="rgba(255,255,255,0.03)" />
                        </g>
                    ))}
                    {/* Roads */}
                    <rect x={90} y={0} width={4} height={300} fill="rgba(255,255,255,0.04)" rx={2} />
                    <rect x={190} y={0} width={4} height={300} fill="rgba(255,255,255,0.04)" rx={2} />
                    <rect x={0} y={140} width={300} height={4} fill="rgba(255,255,255,0.04)" rx={2} />
                    <rect x={0} y={240} width={300} height={4} fill="rgba(255,255,255,0.04)" rx={2} />
                    {/* City blocks */}
                    <rect x={10} y={10} width={70} height={60} fill="rgba(255,255,255,0.02)" rx={4} />
                    <rect x={100} y={10} width={80} height={60} fill="rgba(255,255,255,0.02)" rx={4} />
                    <rect x={200} y={10} width={90} height={60} fill="rgba(255,255,255,0.02)" rx={4} />
                    <rect x={10} y={80} width={70} height={50} fill="rgba(255,255,255,0.02)" rx={4} />
                    <rect x={100} y={80} width={80} height={50} fill="rgba(255,255,255,0.02)" rx={4} />
                    <rect x={200} y={80} width={90} height={50} fill="rgba(255,255,255,0.02)" rx={4} />
                    <rect x={10} y={150} width={70} height={80} fill="rgba(255,255,255,0.02)" rx={4} />
                    <rect x={100} y={150} width={80} height={80} fill="rgba(255,255,255,0.02)" rx={4} />
                    <rect x={200} y={150} width={90} height={80} fill="rgba(255,255,255,0.02)" rx={4} />
                    <rect x={10} y={250} width={280} height={40} fill="rgba(255,255,255,0.02)" rx={4} />

                    {/* Building Pins */}
                    {buildings.map((b) => (
                        <g key={b.id} style={{ cursor: 'pointer' }} onClick={() => navigate(`/building/${b.id}`)}>
                            <circle cx={b.x} cy={b.y} r={18} fill={b.hasFault ? 'rgba(239,68,68,0.2)' : 'rgba(74,222,128,0.15)'} />
                            <circle cx={b.x} cy={b.y} r={8} fill={b.hasFault ? '#ef4444' : '#4ade80'} stroke="#000" strokeWidth={2} />
                            <text x={b.x} y={b.y - 24} textAnchor="middle" fill="var(--text-primary)" fontSize="8" fontWeight="500">{b.name}</text>
                        </g>
                    ))}
                </svg>
            </div>

        </div>
    );
};

export default BuildingsMapView;
