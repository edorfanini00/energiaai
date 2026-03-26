import React, { useState } from 'react';
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, ComposedChart, Line, Cell, LineChart } from 'recharts';
import { LayoutList, Share2, Calendar, Edit2, ChevronDown, Zap, DollarSign, TrendingDown, Gauge, Leaf, BarChart3, X, TrendingUp, Flame } from 'lucide-react';

/* ─── Mock Data ─── */
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

/* ─── KPI Card Sparkline Data ─── */
const sparkConsumption = [
    { v: 42 }, { v: 44 }, { v: 41 }, { v: 46 }, { v: 43 }, { v: 45 }, { v: 45.8 }
];
const sparkCost = [
    { v: 14.2 }, { v: 15.1 }, { v: 13.8 }, { v: 16.2 }, { v: 14.9 }, { v: 15.5 }, { v: 15.95 }
];
const sparkSavings = [
    { v: 18 }, { v: 22 }, { v: 28 }, { v: 31 }, { v: 36 }, { v: 39 }, { v: 41 }
];
const sparkEmissions = [
    { v: 14 }, { v: 13.5 }, { v: 12.8 }, { v: 13.2 }, { v: 12.2 }, { v: 12.6 }
];
const sparkReduced = [
    { v: 1.2 }, { v: 1.8 }, { v: 2.3 }, { v: 2.9 }, { v: 3.2 }, { v: 3.6 }
];
const sparkEfficiency = [
    { v: 78 }, { v: 80 }, { v: 82 }, { v: 84 }, { v: 86 }, { v: 88 }
];

/* ─── Trend Modal Historical Data ─── */
const trendHistory = {
    consumption: [
        { month: 'Jul', elec: 38200, gas: 4100 }, { month: 'Aug', elec: 40100, gas: 4300 },
        { month: 'Sep', elec: 36800, gas: 3800 }, { month: 'Oct', elec: 35500, gas: 3600 },
        { month: 'Nov', elec: 37200, gas: 4000 }, { month: 'Dec', elec: 39800, gas: 4400 },
        { month: 'Jan', elec: 41200, gas: 4650 }, { month: 'Feb', elec: 39500, gas: 4200 },
        { month: 'Mar', elec: 42800, gas: 4800 }, { month: 'Apr', elec: 38200, gas: 4100 },
        { month: 'May', elec: 36500, gas: 3900 }, { month: 'Jun', elec: 40300, gas: 4550 },
    ],
    cost: [
        { month: 'Jul', elec: 8200, gas: 4100 }, { month: 'Aug', elec: 8900, gas: 4500 },
        { month: 'Sep', elec: 7800, gas: 3800 }, { month: 'Oct', elec: 7500, gas: 3600 },
        { month: 'Nov', elec: 7900, gas: 4000 }, { month: 'Dec', elec: 8600, gas: 4400 },
        { month: 'Jan', elec: 9200, gas: 4700 }, { month: 'Feb', elec: 8800, gas: 4300 },
        { month: 'Mar', elec: 9600, gas: 4900 }, { month: 'Apr', elec: 8400, gas: 4100 },
        { month: 'May', elec: 8100, gas: 3900 }, { month: 'Jun', elec: 9050, gas: 4550 },
    ],
    savings: [
        { month: 'Jul', val: 1200 }, { month: 'Aug', val: 1800 },
        { month: 'Sep', val: 2400 }, { month: 'Oct', val: 3100 },
        { month: 'Nov', val: 3900 }, { month: 'Dec', val: 4800 },
        { month: 'Jan', val: 5900 }, { month: 'Feb', val: 7200 },
        { month: 'Mar', val: 8800 }, { month: 'Apr', val: 10500 },
        { month: 'May', val: 12800 }, { month: 'Jun', val: 15200 },
    ],
    emissions: [
        { month: 'Jul', elec: 9.2, gas: 4.8 }, { month: 'Aug', elec: 9.8, gas: 5.1 },
        { month: 'Sep', elec: 8.6, gas: 4.4 }, { month: 'Oct', elec: 8.2, gas: 4.2 },
        { month: 'Nov', elec: 8.8, gas: 4.5 }, { month: 'Dec', elec: 9.5, gas: 4.9 },
        { month: 'Jan', elec: 5.2, gas: 2.8 }, { month: 'Feb', elec: 4.8, gas: 2.5 },
        { month: 'Mar', elec: 5.5, gas: 2.9 }, { month: 'Apr', elec: 4.5, gas: 2.3 },
        { month: 'May', elec: 4.2, gas: 2.1 }, { month: 'Jun', elec: 5.4, gas: 2.8 },
    ],
    reduced: [
        { month: 'Jul', val: 0.4 }, { month: 'Aug', val: 0.6 },
        { month: 'Sep', val: 0.9 }, { month: 'Oct', val: 1.2 },
        { month: 'Nov', val: 1.5 }, { month: 'Dec', val: 1.9 },
        { month: 'Jan', val: 2.2 }, { month: 'Feb', val: 2.5 },
        { month: 'Mar', val: 2.9 }, { month: 'Apr', val: 3.1 },
        { month: 'May', val: 3.4 }, { month: 'Jun', val: 3.6 },
    ],
    efficiency: [
        { month: 'Jul', val: 72 }, { month: 'Aug', val: 74 },
        { month: 'Sep', val: 76 }, { month: 'Oct', val: 78 },
        { month: 'Nov', val: 80 }, { month: 'Dec', val: 82 },
        { month: 'Jan', val: 83 }, { month: 'Feb', val: 84 },
        { month: 'Mar', val: 85 }, { month: 'Apr', val: 86 },
        { month: 'May', val: 87 }, { month: 'Jun', val: 88 },
    ],
};

/* ─── KPI Card Definitions ─── */
const kpiCards = [
    {
        id: 'consumption',
        label: 'TOTAL ENERGY CONSUMPTION',
        mainValue: '45,850',
        mainUnit: 'kWh + therms YTD',
        splits: [
            { label: 'Electricity', value: '40,300 kWh', color: 'var(--accent-green)' },
            { label: 'Gas', value: '5,550 therms', color: '#f97316' },
        ],
        trend: -4.2,
        icon: Zap,
        color: 'var(--accent-green)',
        sparkData: sparkConsumption,
        sparkColor: 'var(--accent-green)',
    },
    {
        id: 'cost',
        label: 'TOTAL ENERGY COST',
        mainValue: '$15,950',
        mainUnit: 'YTD',
        splits: [
            { label: 'Electricity', value: '$9,050', color: 'var(--accent-green)' },
            { label: 'Gas', value: '$6,900', color: '#f97316' },
        ],
        trend: -2.8,
        icon: DollarSign,
        color: '#ef4444',
        sparkData: sparkCost,
        sparkColor: '#ef4444',
    },
    {
        id: 'savings',
        label: 'TOTAL ENERGY SAVINGS',
        mainValue: '$15,200',
        mainUnit: 'since implementation',
        splits: [],
        trend: 18.5,
        icon: TrendingDown,
        color: '#22d3ee',
        sparkData: sparkSavings,
        sparkColor: '#22d3ee',
    },
    {
        id: 'emissions',
        label: 'TOTAL CARBON EMISSIONS',
        mainValue: '12.6',
        mainUnit: 'tons CO₂ YTD',
        splits: [
            { label: 'Electricity', value: '8.2t', color: '#a78bfa' },
            { label: 'Gas', value: '4.4t', color: '#f97316' },
        ],
        trend: -6.1,
        icon: Leaf,
        color: '#f97316',
        sparkData: sparkEmissions,
        sparkColor: '#f97316',
    },
    {
        id: 'reduced',
        label: 'TOTAL EMISSIONS REDUCED',
        mainValue: '3.6',
        mainUnit: 'tons CO₂ saved',
        splits: [],
        trend: 22.3,
        icon: BarChart3,
        color: '#a78bfa',
        sparkData: sparkReduced,
        sparkColor: '#a78bfa',
    },
    {
        id: 'efficiency',
        label: 'EFFICIENCY RATING',
        mainValue: '88',
        mainUnit: 'portfolio score (0–100)',
        splits: [],
        trend: 5.4,
        icon: Gauge,
        color: 'var(--accent-green)',
        sparkData: sparkEfficiency,
        sparkColor: 'var(--accent-green)',
        isScore: true,
    },
];

/* ─── Mini Sparkline Component ─── */
const MiniSparkline = ({ data, color, height = 32, width = 80 }) => (
    <ResponsiveContainer width={width} height={height}>
        <AreaChart data={data} margin={{ top: 2, right: 2, left: 2, bottom: 2 }}>
            <defs>
                <linearGradient id={`spark-${color.replace(/[^a-z0-9]/gi, '')}`} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor={color} stopOpacity={0.4} />
                    <stop offset="100%" stopColor={color} stopOpacity={0} />
                </linearGradient>
            </defs>
            <Area
                type="monotone"
                dataKey="v"
                stroke={color}
                strokeWidth={1.5}
                fill={`url(#spark-${color.replace(/[^a-z0-9]/gi, '')})`}
                dot={false}
                isAnimationActive={false}
            />
        </AreaChart>
    </ResponsiveContainer>
);

/* ─── Trend Modal Component ─── */
const TrendModal = ({ card, onClose }) => {
    const data = trendHistory[card.id];
    const hasElecGas = data?.[0]?.elec !== undefined;

    return (
        <div style={{
            position: 'fixed', inset: 0, zIndex: 1000,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            background: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(8px)',
        }} onClick={onClose}>
            <div
                className="glass-card"
                onClick={(e) => e.stopPropagation()}
                style={{
                    width: '680px', maxWidth: '92vw', padding: '2rem',
                    border: '1px solid var(--border-light)',
                    boxShadow: '0 24px 80px rgba(0,0,0,0.6)',
                    animation: 'modalSlideIn 0.25s ease-out',
                }}
            >
                {/* Header */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem' }}>
                    <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.25rem' }}>
                            <card.icon size={20} color={card.color} />
                            <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--text-secondary)', fontWeight: 600 }}>
                                {card.label}
                            </span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.5rem' }}>
                            <span style={{ fontSize: '2rem', fontWeight: 600, letterSpacing: '-0.03em' }}>
                                {card.mainValue}
                            </span>
                            <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                                {card.mainUnit}
                            </span>
                        </div>
                    </div>
                    <button
                        onClick={onClose}
                        style={{
                            background: 'rgba(255,255,255,0.06)', border: 'none', borderRadius: '50%',
                            width: '32px', height: '32px', display: 'flex', alignItems: 'center',
                            justifyContent: 'center', cursor: 'pointer', color: 'var(--text-secondary)',
                            transition: '0.2s',
                        }}
                        onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.12)'; e.currentTarget.style.color = '#fff'; }}
                        onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.06)'; e.currentTarget.style.color = 'var(--text-secondary)'; }}
                    >
                        <X size={16} />
                    </button>
                </div>

                {/* Chart */}
                <div style={{ height: '300px', width: '100%' }}>
                    <ResponsiveContainer width="100%" height="100%">
                        {hasElecGas ? (
                            <ComposedChart data={data} margin={{ top: 10, right: 10, left: -10, bottom: 5 }}>
                                <defs>
                                    <linearGradient id="modalGradA" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="var(--accent-green)" stopOpacity={0.3} />
                                        <stop offset="95%" stopColor="var(--accent-green)" stopOpacity={0} />
                                    </linearGradient>
                                    <linearGradient id="modalGradB" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#f97316" stopOpacity={0.3} />
                                        <stop offset="95%" stopColor="#f97316" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                                <XAxis dataKey="month" axisLine={false} tickLine={false} dy={10} tick={{ fontSize: 11, fill: 'var(--text-secondary)' }} />
                                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: 'var(--text-secondary)' }} tickFormatter={(v) => v >= 1000 ? `${(v / 1000).toFixed(0)}k` : v} />
                                <Tooltip
                                    cursor={false}
                                    contentStyle={{ background: 'var(--bg-input)', border: '1px solid var(--border-light)', borderRadius: '10px', color: '#fff', boxShadow: '0 8px 32px rgba(0,0,0,0.4)' }}
                                />
                                <Area type="monotone" dataKey="elec" name="Electricity" stroke="var(--accent-green)" strokeWidth={2} fill="url(#modalGradA)" dot={{ r: 3, fill: 'var(--accent-green)', stroke: '#000', strokeWidth: 1 }} />
                                <Area type="monotone" dataKey="gas" name="Gas" stroke="#f97316" strokeWidth={2} fill="url(#modalGradB)" dot={{ r: 3, fill: '#f97316', stroke: '#000', strokeWidth: 1 }} />
                            </ComposedChart>
                        ) : (
                            <AreaChart data={data} margin={{ top: 10, right: 10, left: -10, bottom: 5 }}>
                                <defs>
                                    <linearGradient id="modalGradSingle" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor={card.color} stopOpacity={0.35} />
                                        <stop offset="95%" stopColor={card.color} stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                                <XAxis dataKey="month" axisLine={false} tickLine={false} dy={10} tick={{ fontSize: 11, fill: 'var(--text-secondary)' }} />
                                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: 'var(--text-secondary)' }} tickFormatter={(v) => v >= 1000 ? `$${(v / 1000).toFixed(0)}k` : v} />
                                <Tooltip
                                    cursor={false}
                                    contentStyle={{ background: 'var(--bg-input)', border: '1px solid var(--border-light)', borderRadius: '10px', color: '#fff', boxShadow: '0 8px 32px rgba(0,0,0,0.4)' }}
                                    formatter={(v) => [card.id === 'savings' ? `$${v.toLocaleString()}` : v, card.label]}
                                />
                                <Area type="monotone" dataKey="val" name={card.label} stroke={card.color} strokeWidth={2.5} fill="url(#modalGradSingle)" dot={{ r: 3, fill: card.color, stroke: '#000', strokeWidth: 1 }} activeDot={{ r: 6, fill: '#fff', stroke: card.color, strokeWidth: 2 }} />
                            </AreaChart>
                        )}
                    </ResponsiveContainer>
                </div>

                {/* Legend row for split cards */}
                {hasElecGas && (
                    <div style={{ display: 'flex', gap: '1.5rem', marginTop: '1rem', paddingTop: '0.75rem', borderTop: '1px solid var(--border-light)' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                            <div style={{ width: 10, height: 10, borderRadius: '50%', background: 'var(--accent-green)' }} />
                            <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Electricity</span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                            <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#f97316' }} />
                            <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Gas</span>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

/* ─── Efficiency Score Ring ─── */
const ScoreRing = ({ score, color }) => {
    const radius = 18;
    const circumference = 2 * Math.PI * radius;
    const dashOffset = circumference - (score / 100) * circumference;
    return (
        <svg width="48" height="48" viewBox="0 0 48 48" style={{ flexShrink: 0 }}>
            <circle cx="24" cy="24" r={radius} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="4" />
            <circle cx="24" cy="24" r={radius} fill="none" stroke={color} strokeWidth="4"
                strokeDasharray={circumference} strokeDashoffset={dashOffset}
                strokeLinecap="round" transform="rotate(-90 24 24)"
                style={{ transition: 'stroke-dashoffset 0.8s ease' }}
            />
            <text x="24" y="24" textAnchor="middle" dominantBaseline="central"
                style={{ fontSize: '12px', fontWeight: 700, fill: '#fff' }}>
                {score}
            </text>
        </svg>
    );
};

/* ═══════════════════════════════════════════
   PortfolioView Component
   ═══════════════════════════════════════════ */
const PortfolioView = () => {
    const [isDateOpen, setIsDateOpen] = useState(false);
    const [dateRange, setDateRange] = useState('30 Days');
    const [activeModal, setActiveModal] = useState(null);

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

            {/* ═══ Section 1 — KPI Overview Cards (2 rows × 3) ═══ */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem' }}>
                {kpiCards.map((kpi) => (
                    <div
                        key={kpi.id}
                        className="glass-card kpi-card-hover"
                        onClick={() => setActiveModal(kpi)}
                        style={{
                            padding: '1.25rem 1.4rem',
                            gap: '0.6rem',
                            cursor: 'pointer',
                            position: 'relative',
                            overflow: 'hidden',
                            border: '1px solid transparent',
                            transition: 'border-color 0.25s, box-shadow 0.25s, transform 0.2s',
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.borderColor = 'var(--border-light)';
                            e.currentTarget.style.boxShadow = `0 0 24px ${kpi.color}15`;
                            e.currentTarget.style.transform = 'translateY(-2px)';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.borderColor = 'transparent';
                            e.currentTarget.style.boxShadow = 'none';
                            e.currentTarget.style.transform = 'none';
                        }}
                    >
                        {/* Subtle gradient glow in top-left */}
                        <div style={{
                            position: 'absolute', top: '-30px', left: '-30px',
                            width: '90px', height: '90px', borderRadius: '50%',
                            background: kpi.color, opacity: 0.06, filter: 'blur(24px)', pointerEvents: 'none',
                        }} />

                        {/* Row 1: Icon + Label + Sparkline */}
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                <div style={{
                                    width: 32, height: 32, borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    background: `${kpi.color}14`,
                                }}>
                                    <kpi.icon size={16} color={kpi.color} />
                                </div>
                                <span style={{ fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--text-muted)', fontWeight: 600, lineHeight: 1.2, maxWidth: '120px' }}>
                                    {kpi.label}
                                </span>
                            </div>
                            <MiniSparkline data={kpi.sparkData} color={kpi.sparkColor} />
                        </div>

                        {/* Row 2: Main Value */}
                        <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.4rem', marginTop: '0.15rem' }}>
                            {kpi.isScore ? (
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                    <ScoreRing score={Number(kpi.mainValue)} color={kpi.color} />
                                    <div>
                                        <div style={{ fontSize: '1.6rem', fontWeight: 700, letterSpacing: '-0.03em', lineHeight: 1 }}>{kpi.mainValue}</div>
                                        <div style={{ fontSize: '0.65rem', color: 'var(--text-muted)', marginTop: '0.15rem' }}>{kpi.mainUnit}</div>
                                    </div>
                                </div>
                            ) : (
                                <>
                                    <span style={{ fontSize: '1.6rem', fontWeight: 700, letterSpacing: '-0.03em', lineHeight: 1 }}>
                                        {kpi.mainValue}
                                    </span>
                                    <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>
                                        {kpi.mainUnit}
                                    </span>
                                </>
                            )}
                        </div>

                        {/* Row 3: Splits (if any) */}
                        {kpi.splits.length > 0 && (
                            <div style={{ display: 'flex', gap: '1rem', marginTop: '0.15rem' }}>
                                {kpi.splits.map((s) => (
                                    <div key={s.label} style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                                        <div style={{ width: 6, height: 6, borderRadius: '50%', background: s.color, flexShrink: 0 }} />
                                        <span style={{ fontSize: '0.7rem', color: 'var(--text-secondary)' }}>
                                            {s.label}: <span style={{ color: 'var(--text-primary)', fontWeight: 500 }}>{s.value}</span>
                                        </span>
                                    </div>
                                ))}
                            </div>
                        )}

                        {/* Row 4: Trend % */}
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', marginTop: '0.1rem' }}>
                            {kpi.trend > 0 ? (
                                <TrendingUp size={12} color="var(--accent-green)" />
                            ) : (
                                <TrendingDown size={12} color={kpi.id === 'cost' || kpi.id === 'emissions' ? 'var(--accent-green)' : '#ef4444'} />
                            )}
                            <span style={{
                                fontSize: '0.72rem', fontWeight: 600,
                                color: (kpi.trend > 0 && (kpi.id === 'savings' || kpi.id === 'reduced' || kpi.id === 'efficiency'))
                                    || (kpi.trend < 0 && (kpi.id === 'cost' || kpi.id === 'emissions' || kpi.id === 'consumption'))
                                    ? 'var(--accent-green)' : '#ef4444',
                            }}>
                                {kpi.trend > 0 ? '+' : ''}{kpi.trend}%
                            </span>
                            <span style={{ fontSize: '0.65rem', color: 'var(--text-muted)' }}>vs last year</span>
                        </div>
                    </div>
                ))}
            </div>

            {/* ═══ Trend Modal ═══ */}
            {activeModal && <TrendModal card={activeModal} onClose={() => setActiveModal(null)} />}

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
