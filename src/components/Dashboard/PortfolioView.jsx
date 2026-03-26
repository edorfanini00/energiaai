import React, { useState } from 'react';
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, ComposedChart, Line, Cell, LineChart } from 'recharts';
import { LayoutList, Share2, Calendar, Edit2, ChevronDown, Zap, DollarSign, TrendingDown, Gauge, Leaf, BarChart3, X, TrendingUp, Flame, Maximize2 } from 'lucide-react';

/* ─── Mock Data ─── */

// Energy Usage Trend data keyed by period
const trendDataByPeriod = {
    '24h': Array.from({ length: 24 }).map((_, i) => ({ label: `${i}:00`, elec: Math.floor(Math.random() * 80 + 40), gas: Math.floor(Math.random() * 60 + 30), total: 0 })),
    '7d': [
        { label: 'Mon', elec: 900, gas: 750, total: 1650 },
        { label: 'Tue', elec: 1050, gas: 880, total: 1930 },
        { label: 'Wed', elec: 980, gas: 820, total: 1800 },
        { label: 'Thu', elec: 1120, gas: 950, total: 2070 },
        { label: 'Fri', elec: 870, gas: 710, total: 1580 },
        { label: 'Sat', elec: 1200, gas: 1050, total: 2250 },
        { label: 'Sun', elec: 1080, gas: 900, total: 1980 },
    ],
    '1m': Array.from({ length: 30 }).map((_, i) => ({ label: `${i + 1}`, elec: Math.floor(Math.random() * 300 + 400), gas: Math.floor(Math.random() * 200 + 300), total: 0 })),
    'ytd': [
        { label: 'Jan', elec: 1000, gas: 900, total: 1900 }, { label: 'Feb', elec: 1200, gas: 1100, total: 2300 }, { label: 'Mar', elec: 900, gas: 700, total: 1600 },
        { label: 'Apr', elec: 1600, gas: 1400, total: 3000 }, { label: 'May', elec: 1100, gas: 1000, total: 2100 }, { label: 'Jun', elec: 1300, gas: 1100, total: 2400 },
        { label: 'Jul', elec: 1500, gas: 1300, total: 2800 }, { label: 'Aug', elec: 1450, gas: 1250, total: 2700 }, { label: 'Sep', elec: 1250, gas: 1100, total: 2350 },
        { label: 'Oct', elec: 1400, gas: 1200, total: 2600 }, { label: 'Nov', elec: 1550, gas: 1450, total: 3000 }, { label: 'Dec', elec: 1800, gas: 1600, total: 3400 }
    ],
    'custom': [],
};

Object.values(trendDataByPeriod).forEach(arr => {
    arr.forEach(d => { if(d.total === 0) d.total = d.elec + d.gas; });
});

// Dense emissions breakdown keyed by period (for modal visualization)
const emissionsDataByPeriod = {
    '24h': Array.from({ length: 24 }).map((_, i) => ({ month: `${i}:00`, emissions: (Math.random() * 2 + 0.5).toFixed(1), reduced: (Math.random() * 0.5 + 0.1).toFixed(1) })),
    '7d': [
        { month: 'Mon', emissions: 3.2, reduced: 0.8 }, { month: 'Tue', emissions: 2.9, reduced: 0.9 }, { month: 'Wed', emissions: 3.5, reduced: 0.7 },
        { month: 'Thu', emissions: 3.0, reduced: 1.1 }, { month: 'Fri', emissions: 2.7, reduced: 1.2 }, { month: 'Sat', emissions: 2.1, reduced: 0.5 }, { month: 'Sun', emissions: 1.9, reduced: 0.4 }
    ],
    '1m': Array.from({ length: 30 }).map((_, i) => ({ month: `${i + 1}`, emissions: (Math.random() * 3 + 1).toFixed(1), reduced: (Math.random() * 1 + 0.2).toFixed(1) })),
    'ytd': [
        { month: 'Jan', emissions: 3.8, reduced: 0.9 }, { month: 'Feb', emissions: 3.5, reduced: 1.1 }, { month: 'Mar', emissions: 4.0, reduced: 0.8 },
        { month: 'Apr', emissions: 3.1, reduced: 1.3 }, { month: 'May', emissions: 2.9, reduced: 1.5 }, { month: 'Jun', emissions: 4.2, reduced: 0.7 },
        { month: 'Jul', emissions: 4.5, reduced: 1.0 }, { month: 'Aug', emissions: 4.8, reduced: 1.2 }, { month: 'Sep', emissions: 3.9, reduced: 0.8 },
        { month: 'Oct', emissions: 3.4, reduced: 0.9 }, { month: 'Nov', emissions: 3.2, reduced: 1.4 }, { month: 'Dec', emissions: 3.6, reduced: 1.6 }
    ],
    'custom': []
};

// Building Map mock data keyed by period
const mapBuildingsByPeriod = {
    '24h': [
        { id: 'north', name: 'North Tower', status: 'Optimal', energy: '4.2k' },
        { id: 'south', name: 'South Center', status: 'Warning', energy: '5.1k' },
        { id: 'west', name: 'West Complex', status: 'Optimal', energy: '3.8k' },
        { id: 'east', name: 'East Wing', status: 'Optimal', energy: '3.3k' }
    ],
    '7d': [
        { id: 'north', name: 'North Tower', status: 'Optimal', energy: '29.5k' },
        { id: 'south', name: 'South Center', status: 'Warning', energy: '36.2k' },
        { id: 'west', name: 'West Complex', status: 'Optimal', energy: '27.1k' },
        { id: 'east', name: 'East Wing', status: 'Optimal', energy: '23.4k' }
    ],
    '1m': [
        { id: 'north', name: 'North Tower', status: 'Optimal', energy: '124k' },
        { id: 'south', name: 'South Center', status: 'Warning', energy: '158k' },
        { id: 'west', name: 'West Complex', status: 'Optimal', energy: '115k' },
        { id: 'east', name: 'East Wing', status: 'Optimal', energy: '98k' }
    ],
    'ytd': [
        { id: 'north', name: 'North Tower', status: 'Optimal', energy: '1.4M' },
        { id: 'south', name: 'South Center', status: 'Warning', energy: '1.8M' },
        { id: 'west', name: 'West Complex', status: 'Optimal', energy: '1.3M' },
        { id: 'east', name: 'East Wing', status: 'Optimal', energy: '1.1M' }
    ],
    'custom': [
        { id: 'north', name: 'North Tower', status: '—', energy: '—' },
        { id: 'south', name: 'South Center', status: '—', energy: '—' },
        { id: 'west', name: 'West Complex', status: '—', energy: '—' },
        { id: 'east', name: 'East Wing', status: '—', energy: '—' }
    ]
};

const mapCoordinates = {
    'west':  { top: '38%', left: '12%' },
    'south': { top: '65%', left: '42%' },
    'north': { top: '25%', left: '68%' },
    'east':  { top: '40%', left: '85%' }
};

// Dense savings breakdown keyed by period (for modal visualization)
const savingsBreakdownByPeriod = {
    '24h': Array.from({ length: 24 }).map((_, i) => ({ month: `${i}:00`, val: Math.floor(Math.random() * 50) + 10 })),
    '7d': [
        { month: 'Mon', val: 420 }, { month: 'Tue', val: 560 }, { month: 'Wed', val: 380 }, 
        { month: 'Thu', val: 620 }, { month: 'Fri', val: 710 }, { month: 'Sat', val: 230 }, { month: 'Sun', val: 190 }
    ],
    '1m': Array.from({ length: 30 }).map((_, i) => ({ month: `${i + 1}`, val: Math.floor(Math.random() * 300) + 100 })),
    'ytd': [
        { month: 'Jan', val: 820 }, { month: 'Feb', val: 1100 }, { month: 'Mar', val: 650 }, 
        { month: 'Apr', val: 1350 }, { month: 'May', val: 1560 }, { month: 'Jun', val: 950 },
        { month: 'Jul', val: 1200 }, { month: 'Aug', val: 1400 }, { month: 'Sep', val: 1150 },
        { month: 'Oct', val: 980 }, { month: 'Nov', val: 1600 }, { month: 'Dec', val: 1800 }
    ],
    'custom': []
};

// Consumption arc data keyed by period
const arcDataByPeriod = {
    '24h': { elec: 128, gas: 142 },
    '7d':  { elec: 890, gas: 980 },
    '1m':  { elec: 3820, gas: 4260 },
    'ytd': { elec: 21550, gas: 24300 },
    'custom': { elec: 0, gas: 0 },
};

// Efficiency data keyed by period
const efficiencyByPeriod = {
    '24h': { score: 91, buildings: [{ label: 'North Tower', pct: 94 }, { label: 'South Center', pct: 90 }, { label: 'West Complex', pct: 82 }, { label: 'East Wing', pct: 97 }] },
    '7d':  { score: 89, buildings: [{ label: 'North Tower', pct: 93 }, { label: 'South Center', pct: 89 }, { label: 'West Complex', pct: 78 }, { label: 'East Wing', pct: 96 }] },
    '1m':  { score: 87, buildings: [{ label: 'North Tower', pct: 91 }, { label: 'South Center', pct: 87 }, { label: 'West Complex', pct: 75 }, { label: 'East Wing', pct: 94 }] },
    'ytd': { score: 88, buildings: [{ label: 'North Tower', pct: 92 }, { label: 'South Center', pct: 88 }, { label: 'West Complex', pct: 76 }, { label: 'East Wing', pct: 95 }] },
    'custom': { score: 0, buildings: [{ label: 'North Tower', pct: 0 }, { label: 'South Center', pct: 0 }, { label: 'West Complex', pct: 0 }, { label: 'East Wing', pct: 0 }] },
};

// Energy savings total keyed by period
const savingsTotalByPeriod = {
    '24h': '$340',
    '7d': '$2,370',
    '1m': '$5,480',
    'ytd': '$4,100',
    'custom': '—',
};

const CustomTrendTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
        const data = payload[0].payload;
        return (
            <div style={{ background: 'rgba(30, 30, 35, 0.9)', backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)', border: '1px solid rgba(255, 255, 255, 0.15)', padding: '1rem', borderRadius: '12px', color: '#fff', boxShadow: '0 12px 40px rgba(0, 0, 0, 0.5)' }}>
                <p style={{ margin: '0 0 0.75rem 0', fontSize: '0.85rem', color: 'rgba(255,255,255,0.7)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{label}</p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem' }}>
                        <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><div style={{ width: 8, height: 8, borderRadius: '50%', background: 'rgba(255,255,255,0.9)' }} />Electricity</span>
                        <span style={{ fontWeight: 500, marginLeft: '2rem' }}>{data.elec.toLocaleString()} kWh</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem' }}>
                        <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><div style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--accent-green)' }} />Gas</span>
                        <span style={{ fontWeight: 500, marginLeft: '2rem' }}>{data.gas.toLocaleString()} kWh</span>
                    </div>
                    <div style={{ paddingTop: '0.6rem', borderTop: '1px solid rgba(255,255,255,0.15)', marginTop: '0.2rem', display: 'flex', justifyContent: 'space-between', fontSize: '1rem', fontWeight: 600 }}>
                        <span>Total Sum</span>
                        <span>{data.total.toLocaleString()} kWh</span>
                    </div>
                </div>
            </div>
        );
    }
    return null;
};

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
        color: '#eab308',
        sparkData: sparkSavings,
        sparkColor: '#eab308',
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
        label: 'COMFORT RATING',
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

/* ─── Unique Card Visualizations ─── */
const ProportionBar = ({ splits }) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', width: '100%', marginTop: '0.25rem' }}>
        {splits.map((s) => (
            <div key={s.label} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span style={{ fontSize: '0.6rem', color: 'var(--text-muted)', width: '28px', flexShrink: 0 }}>{s.label.slice(0, 4)}</span>
                <div style={{ flex: 1, height: '6px', background: 'rgba(255,255,255,0.06)', borderRadius: '3px', overflow: 'hidden' }}>
                    <div style={{ width: s.pct + '%', height: '100%', background: `linear-gradient(90deg, ${s.color}, ${s.color}88)`, borderRadius: '3px', transition: 'width 0.8s ease' }} />
                </div>
                <span style={{ fontSize: '0.6rem', color: 'var(--text-secondary)', width: '30px', textAlign: 'right' }}>{s.pct}%</span>
            </div>
        ))}
    </div>
);

const MiniDonut = ({ segments, size = 44 }) => {
    const r = 16, c = 2 * Math.PI * r;
    let offset = 0;
    return (
        <svg width={size} height={size} viewBox="0 0 44 44" style={{ flexShrink: 0 }}>
            <circle cx="22" cy="22" r={r} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="5" />
            {segments.map((seg, i) => {
                const dash = (seg.pct / 100) * c;
                const el = <circle key={i} cx="22" cy="22" r={r} fill="none" stroke={seg.color} strokeWidth="5" strokeDasharray={`${dash} ${c - dash}`} strokeDashoffset={-offset} transform="rotate(-90 22 22)" style={{ transition: 'all 0.8s ease' }} />;
                offset += dash;
                return el;
            })}
        </svg>
    );
};

const GrowthBars = ({ data, color }) => (
    <div style={{ display: 'flex', alignItems: 'flex-end', gap: '3px', height: '32px' }}>
        {data.map((d, i) => (
            <div key={i} style={{ flex: 1, background: `linear-gradient(to top, ${color}22, ${color})`, borderRadius: '2px', height: `${d.pct}%`, transition: 'height 0.5s ease', minWidth: '4px', opacity: 0.5 + (i / data.length) * 0.5 }} />
        ))}
    </div>
);

const StackedBar = ({ elecPct, gasPct }) => (
    <div style={{ width: '100%', marginTop: '0.25rem' }}>
        <div style={{ display: 'flex', height: '8px', borderRadius: '4px', overflow: 'hidden', background: 'rgba(255,255,255,0.06)' }}>
            <div style={{ width: elecPct + '%', background: 'linear-gradient(90deg, #a78bfa, #a78bfa88)', transition: 'width 0.8s' }} />
            <div style={{ width: gasPct + '%', background: 'linear-gradient(90deg, #f97316, #f9731688)', transition: 'width 0.8s' }} />
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '0.25rem' }}>
            <span style={{ fontSize: '0.55rem', color: '#a78bfa' }}>Elec {elecPct}%</span>
            <span style={{ fontSize: '0.55rem', color: '#f97316' }}>Gas {gasPct}%</span>
        </div>
    </div>
);

const ImpactMeter = ({ value, max, color }) => {
    const pct = Math.min((value / max) * 100, 100);
    return (
        <div style={{ width: '100%', marginTop: '0.25rem' }}>
            <div style={{ position: 'relative', height: '8px', borderRadius: '4px', background: 'rgba(255,255,255,0.06)', overflow: 'hidden' }}>
                <div style={{ width: pct + '%', height: '100%', borderRadius: '4px', background: `linear-gradient(90deg, ${color}44, ${color})`, transition: 'width 0.8s', boxShadow: `0 0 8px ${color}44` }} />
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '0.2rem' }}>
                <span style={{ fontSize: '0.55rem', color: 'var(--text-muted)' }}>0t</span>
                <span style={{ fontSize: '0.55rem', color, fontWeight: 600 }}>{value}t saved</span>
                <span style={{ fontSize: '0.55rem', color: 'var(--text-muted)' }}>{max}t goal</span>
            </div>
        </div>
    );
};

const savingsGrowth = [
    { pct: 25 }, { pct: 38 }, { pct: 52 }, { pct: 62 }, { pct: 71 }, { pct: 80 }, { pct: 88 }, { pct: 95 }, { pct: 100 }
];

/* ═══════════════════════════════════════════
   PortfolioView Component
   ═══════════════════════════════════════════ */
const PortfolioView = () => {
    const [isBuildingOpen, setIsBuildingOpen] = useState(false);
    const [selectedBuilding, setSelectedBuilding] = useState('All Buildings');
    const [activeModal, setActiveModal] = useState(null);
    const [savingsPeriod, setSavingsPeriod] = useState('ytd');
    const [showCalendar, setShowCalendar] = useState(false);
    const [customStart, setCustomStart] = useState('');
    const [customEnd, setCustomEnd] = useState('');
    const [hoveredArc, setHoveredArc] = useState(null);
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    const [activeMapBuilding, setActiveMapBuilding] = useState(null);

    const handleArcMouseMove = (e) => {
        setMousePos({ x: e.clientX, y: e.clientY });
    };

    // Map bindings
    const activeBuildingList = mapBuildingsByPeriod[savingsPeriod];

    // Pull period-synced data
    const arcData = arcDataByPeriod[savingsPeriod];
    const elecVal = arcData.elec;
    const gasVal = arcData.gas;
    const totalEnergy = elecVal + gasVal;
    const elecPct = elecVal / totalEnergy;
    
    // SVG arc from PI to 0. Intersection angle in radians:
    const intersectionAngle = Math.PI * (1 - elecPct);
    const intX = 120 + 80 * Math.cos(intersectionAngle);
    const intY = 120 - 80 * Math.sin(intersectionAngle);

    const activeTrendData = trendDataByPeriod[savingsPeriod];
    const activeEmissionsData = emissionsDataByPeriod[savingsPeriod];
    const activeSavingsBreakdown = savingsBreakdownByPeriod[savingsPeriod];
    const activeEfficiency = efficiencyByPeriod[savingsPeriod];
    const activeSavingsTotal = savingsTotalByPeriod[savingsPeriod];

    // Compute generic Emission string for modal header manually
    const emissionsTotalStrByPeriod = {
        '24h': '16.4',
        '7d': '45.1',
        '1m': '182.5',
        'ytd': '685.2',
        'custom': '—'
    };
    const activeEmissionsTotal = emissionsTotalStrByPeriod[savingsPeriod];

    const buildingOptions = ['All Buildings', 'North Tower', 'South Center', 'West Complex', 'East Wing'];
    const savingsPeriods = [
        { key: '24h', label: '24 Hours' },
        { key: '7d', label: '7 Days' },
        { key: '1m', label: '1 Month' },
        { key: 'ytd', label: 'YTD' },
    ];

    const savingsDataByPeriod = {
        '24h': { elec: '128', gas: '42', money: '$340', elecTrend: -2.1, gasTrend: -3.4, moneyTrend: 5.8, elecUnit: 'kWh saved', gasUnit: 'therms saved', moneyUnit: 'saved' },
        '7d':  { elec: '890', gas: '295', money: '$2,370', elecTrend: -3.5, gasTrend: -4.1, moneyTrend: 8.2, elecUnit: 'kWh saved', gasUnit: 'therms saved', moneyUnit: 'saved' },
        '1m':  { elec: '3,820', gas: '1,260', money: '$5,480', elecTrend: -5.2, gasTrend: -6.8, moneyTrend: 12.4, elecUnit: 'kWh saved', gasUnit: 'therms saved', moneyUnit: 'saved' },
        'ytd': { elec: '12,450', gas: '4,180', money: '$15,200', elecTrend: -4.2, gasTrend: -5.9, moneyTrend: 18.5, elecUnit: 'kWh saved', gasUnit: 'therms saved', moneyUnit: 'saved' },
        'custom': { elec: '—', gas: '—', money: '—', elecTrend: 0, gasTrend: 0, moneyTrend: 0, elecUnit: 'kWh saved', gasUnit: 'therms saved', moneyUnit: 'saved' },
    };
    const sd = savingsDataByPeriod[savingsPeriod];
    const savingsCards = [
        { label: 'ELECTRICITY SAVINGS', value: sd.elec, unit: sd.elecUnit, trend: sd.elecTrend, accentColor: 'var(--accent-green)' },
        { label: 'GAS SAVINGS', value: sd.gas, unit: sd.gasUnit, trend: sd.gasTrend, accentColor: '#f97316' },
        { label: 'MONETARY SAVINGS', value: sd.money, unit: sd.moneyUnit, trend: sd.moneyTrend, accentColor: '#eab308' },
    ];

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>



            {/* ═══ Section 1 — Savings Cards with Period Selector ═══ */}
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '-0.5rem' }}>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                    {savingsPeriods.map((p) => (
                        <button
                            key={p.key}
                            onClick={() => { setSavingsPeriod(p.key); setShowCalendar(false); }}
                            style={{
                                padding: '0.45rem 1rem', borderRadius: '8px', fontSize: '0.8rem', fontWeight: 500,
                                border: '1px solid', cursor: 'pointer', transition: 'all 0.2s',
                                background: savingsPeriod === p.key ? 'rgba(255,255,255,0.08)' : 'transparent',
                                borderColor: savingsPeriod === p.key ? 'var(--accent-green)' : 'var(--border-light)',
                                color: savingsPeriod === p.key ? 'var(--accent-green)' : 'var(--text-secondary)',
                            }}
                        >
                            {p.label}
                        </button>
                    ))}
                    <div style={{ position: 'relative' }}>
                    <button
                        onClick={() => setShowCalendar(!showCalendar)}
                        style={{
                            padding: '0.45rem 1rem', borderRadius: '8px', fontSize: '0.8rem', fontWeight: 500,
                            border: '1px solid', cursor: 'pointer', transition: 'all 0.2s', display: 'flex', alignItems: 'center', gap: '0.4rem',
                            background: savingsPeriod === 'custom' ? 'rgba(255,255,255,0.08)' : 'transparent',
                            borderColor: savingsPeriod === 'custom' ? 'var(--accent-green)' : 'var(--border-light)',
                            color: savingsPeriod === 'custom' ? 'var(--accent-green)' : 'var(--text-secondary)',
                        }}
                    >
                        <Calendar size={14} /> Custom Range
                    </button>
                    {showCalendar && (
                        <div className="glass-card" style={{ position: 'absolute', top: 'calc(100% + 0.5rem)', right: 0, padding: '1rem', zIndex: 60, border: '1px solid var(--border-light)', minWidth: '260px', gap: '0.75rem' }}>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                <label style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Start Date</label>
                                <input type="date" value={customStart} onChange={(e) => setCustomStart(e.target.value)} style={{ background: 'var(--bg-input)', border: '1px solid var(--border-light)', borderRadius: '6px', padding: '0.5rem', color: 'var(--text-primary)', fontSize: '0.85rem', colorScheme: 'dark' }} />
                                <label style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>End Date</label>
                                <input type="date" value={customEnd} onChange={(e) => setCustomEnd(e.target.value)} style={{ background: 'var(--bg-input)', border: '1px solid var(--border-light)', borderRadius: '6px', padding: '0.5rem', color: 'var(--text-primary)', fontSize: '0.85rem', colorScheme: 'dark' }} />
                                <button onClick={() => { setSavingsPeriod('custom'); setShowCalendar(false); }} style={{ marginTop: '0.25rem', padding: '0.5rem', borderRadius: '6px', background: 'var(--accent-green)', color: '#000', fontWeight: 600, fontSize: '0.8rem', border: 'none', cursor: 'pointer' }}>Apply</button>
                            </div>
                        </div>
                    )}
                    </div>
                </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem' }}>
                {savingsCards.map((card) => (
                    <div
                        key={card.label}
                        className="glass-card"
                        onClick={() => {
                            if (card.label === 'MONETARY SAVINGS') {
                                setActiveModal('savings');
                            }
                        }}
                        style={{
                            padding: '1.5rem 1.75rem',
                            position: 'relative',
                            overflow: 'hidden',
                            border: '1px solid transparent',
                            transition: 'border-color 0.25s, box-shadow 0.25s, transform 0.2s',
                            cursor: card.label === 'MONETARY SAVINGS' ? 'pointer' : 'default',
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.borderColor = 'var(--border-light)';
                            e.currentTarget.style.boxShadow = `0 0 24px ${card.accentColor}15`;
                            e.currentTarget.style.transform = 'translateY(-2px)';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.borderColor = 'transparent';
                            e.currentTarget.style.boxShadow = 'none';
                            e.currentTarget.style.transform = 'none';
                        }}
                    >
                        <div style={{ position: 'absolute', top: '-30px', left: '-30px', width: '90px', height: '90px', borderRadius: '50%', background: card.accentColor, opacity: 0.06, filter: 'blur(24px)', pointerEvents: 'none' }} />
                        <span style={{ fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--text-muted)', fontWeight: 600 }}>{card.label}</span>
                        <div style={{ fontSize: '2.4rem', fontWeight: 700, letterSpacing: '-0.03em', lineHeight: 1, marginTop: '0.6rem' }}>{card.value}</div>
                        <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>{card.unit}</span>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', marginTop: '0.6rem' }}>
                            <span style={{ fontSize: '0.75rem', fontWeight: 600, color: card.trend > 0 ? 'var(--accent-green)' : card.trend < 0 ? 'var(--accent-green)' : 'var(--text-muted)' }}>
                                {card.trend > 0 ? '+' : ''}{card.trend}%
                            </span>
                            <span style={{ fontSize: '0.65rem', color: 'var(--text-muted)' }}>vs prior period</span>
                        </div>
                    </div>
                ))}
            </div>

            {/* Interactive Portfolio Map & Building Registry */}
            <div style={{ display: 'grid', gridTemplateColumns: 'minmax(280px, 320px) 1fr', gap: '1.5rem', height: '440px' }}>
                {/* Building Registry (Left) */}
                <div className="glass-card" style={{ padding: '0', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
                    <div style={{ padding: '1.5rem 1.5rem 1rem 1.5rem', borderBottom: '1px solid var(--border-light)' }}>
                        <h2 style={{ fontSize: '1.25rem', fontWeight: 400 }}>Portfolio Registry</h2>
                    </div>
                    <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column' }}>
                        {activeBuildingList.map((b) => (
                            <div 
                                key={b.id}
                                onMouseEnter={() => setActiveMapBuilding(b.id)}
                                onMouseLeave={() => setActiveMapBuilding(null)}
                                style={{ 
                                    padding: '1.25rem 1.5rem', 
                                    borderBottom: '1px solid var(--border-light)', 
                                    cursor: 'pointer',
                                    background: activeMapBuilding === b.id ? 'rgba(255,255,255,0.04)' : 'transparent',
                                    transition: 'background 0.2s',
                                    display: 'flex', justifyContent: 'space-between', alignItems: 'center'
                                }}
                            >
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                                    <span style={{ fontSize: '1rem', fontWeight: 500, color: activeMapBuilding === b.id ? '#fff' : 'var(--text-primary)' }}>{b.name}</span>
                                    <span style={{ fontSize: '0.75rem', color: b.status === 'Warning' ? '#ef4444' : 'var(--accent-green)', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                                        <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: b.status === 'Warning' ? '#ef4444' : 'var(--accent-green)' }}></div>
                                        {b.status}
                                    </span>
                                </div>
                                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '0.2rem' }}>
                                    <span style={{ fontSize: '1.1rem', fontWeight: 600 }}>{b.energy}</span>
                                    <span style={{ fontSize: '0.65rem', color: 'var(--text-muted)' }}>kWh</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Interactive SVG Map (Right) */}
                <div className="glass-card" style={{ position: 'relative', overflow: 'hidden', padding: '1.5rem', display: 'flex', alignItems: 'center', justifyItems: 'center' }}>
                    
                    <div style={{ position: 'absolute', top: '1.5rem', left: '1.5rem', zIndex: 10 }}>
                        <h2 style={{ fontSize: '1.25rem', fontWeight: 400 }}>Live Footprint</h2>
                        <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Real-time location telemetry</span>
                    </div>

                    <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: 0.15 }}>
                        {/* Generic Vector representation of a landmass map */}
                        <svg viewBox="0 0 1000 600" style={{ width: '90%', height: '90%', filter: 'blur(1px)' }}>
                            <path d="M150,200 Q200,100 350,120 T600,150 T800,100 T900,250 T850,450 T700,550 T500,500 T400,550 T200,500 T100,350 Z" fill="none" stroke="#fff" strokeWidth="8" strokeDasharray="16 16" />
                            <path d="M250,250 Q300,180 400,200 T600,220 T750,180 T800,300 T750,400 T600,450 T500,420 T400,480 T300,400 T200,300 Z" fill="rgba(255,255,255,0.05)" />
                        </svg>
                    </div>

                    {/* Overlay Dots */}
                    {activeBuildingList.map((b) => (
                        <div 
                            key={`map-dot-${b.id}`}
                            onMouseEnter={() => setActiveMapBuilding(b.id)}
                            onMouseLeave={() => setActiveMapBuilding(null)}
                            style={{
                                position: 'absolute',
                                top: mapCoordinates[b.id].top,
                                left: mapCoordinates[b.id].left,
                                width: '16px', height: '16px',
                                borderRadius: '50%',
                                background: b.status === 'Warning' ? '#ef4444' : 'var(--accent-green)',
                                cursor: 'pointer',
                                transform: activeMapBuilding === b.id ? 'translate(-50%, -50%) scale(1.5)' : 'translate(-50%, -50%) scale(1)',
                                transition: 'transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                                zIndex: activeMapBuilding === b.id ? 20 : 10,
                                boxShadow: activeMapBuilding === b.id 
                                    ? `0 0 24px 8px ${b.status === 'Warning' ? 'rgba(239,68,68,0.4)' : 'rgba(52,199,89,0.4)'}` 
                                    : 'none'
                            }}
                        >
                            {/* Inner Dot Pulse Ring */}
                            <div className="pulse-ring" style={{
                                position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
                                width: '100%', height: '100%', borderRadius: '50%',
                                background: 'transparent',
                                border: `2px solid ${b.status === 'Warning' ? '#ef4444' : 'var(--accent-green)'}`,
                                animation: 'pulse-ring 2s infinite cubic-bezier(0.215, 0.61, 0.355, 1)'
                            }} />

                            {/* Label Tag showing strictly on hover */}
                            {activeMapBuilding === b.id && (
                                <div style={{
                                    position: 'absolute', top: '-35px', left: '50%', transform: 'translateX(-50%)',
                                    background: 'var(--bg-input)', border: '1px solid var(--border-light)',
                                    padding: '4px 8px', borderRadius: '4px', fontSize: '0.7rem', fontWeight: 600,
                                    color: '#fff', whiteSpace: 'nowrap', pointerEvents: 'none'
                                }}>
                                    {b.name}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>


            {/* Savings Modal */}
            {activeModal === 'savings' && (
                <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.8)', zIndex: 99999, display: 'flex', alignItems: 'center', justifyContent: 'center', backdropFilter: 'blur(8px)', WebkitBackdropFilter: 'blur(8px)' }}>
                    <div className="glass-card" style={{ padding: '2.5rem', width: '90%', maxWidth: '800px', height: '500px', position: 'relative', display: 'flex', flexDirection: 'column', animation: 'modalSlideIn 0.25s ease-out' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                            <div>
                                <h3 style={{ fontSize: '1.5rem', fontWeight: 400, marginBottom: '0.5rem' }}>Energy Savings Breakdown</h3>
                                <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.75rem', marginBottom: '2rem' }}>
                                    <span style={{ fontSize: '3rem', fontWeight: 500, letterSpacing: '-0.02em', color: '#eab308' }}>{activeSavingsTotal}</span>
                                    <span style={{ fontSize: '1.1rem', color: 'var(--text-muted)' }}>total saved this period</span>
                                </div>
                            </div>
                            <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.2rem', alignItems: 'center' }}>
                                {savingsPeriods.map((p) => (
                                    <button
                                        key={`modal-sav-${p.key}`}
                                        onClick={() => setSavingsPeriod(p.key)}
                                        style={{
                                            padding: '0.45rem 1rem', borderRadius: '8px', fontSize: '0.8rem', fontWeight: 500,
                                            border: '1px solid', cursor: 'pointer', transition: 'all 0.2s',
                                            background: savingsPeriod === p.key ? 'rgba(255,255,255,0.08)' : 'transparent',
                                            borderColor: savingsPeriod === p.key ? 'var(--accent-green)' : 'var(--border-light)',
                                            color: savingsPeriod === p.key ? 'var(--accent-green)' : 'var(--text-secondary)',
                                        }}
                                    >
                                        {p.label}
                                    </button>
                                ))}
                                <button onClick={() => setActiveModal(null)} style={{ background: 'transparent', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', marginLeft: '1rem', display: 'flex', alignItems: 'center', transition: 'color 0.2s' }} onMouseEnter={(e) => e.currentTarget.style.color = '#fff'} onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-secondary)'}>
                                    <X size={24} />
                                </button>
                            </div>
                        </div>

                        <div style={{ flex: 1, position: 'relative' }}>
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={activeSavingsBreakdown} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
                                    <defs>
                                        <linearGradient id="solidGreenGrad" x1="0" y1="1" x2="0" y2="0">
                                            <stop offset="0%" stopColor="var(--accent-green)" stopOpacity={0.1}/>
                                            <stop offset="100%" stopColor="var(--accent-green)" stopOpacity={1}/>
                                        </linearGradient>
                                    </defs>
                                    <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 13, fill: 'var(--text-secondary)' }} dy={10} />
                                    <Tooltip cursor={{ fill: 'rgba(255,255,255,0.02)' }} contentStyle={{ background: 'var(--bg-input)', border: 'none', borderRadius: '12px', fontSize: '1.1rem' }} formatter={(v) => [`$${v}`]} />
                                    <Bar dataKey="val" fill="url(#solidGreenGrad)" radius={[6, 6, 0, 0]} />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </div>
            )}


        </div >
    );
};

export default PortfolioView;
