import React, { useState } from 'react';
import { Bell, Calendar, Moon, Sun, Plus, Check } from 'lucide-react';

const upcomingDates = [
    { title: 'HVAC Annual Maintenance', type: 'Maintenance', priority: 'High', date: 'March 14, 2024', desc: 'Complete system inspection and maintenance for all HVAC units' },
    { title: 'Energy Compliance Report', type: 'Report', priority: 'Medium', date: 'March 31, 2024', desc: 'Submit annual energy consumption report to regulatory authorities' },
    { title: 'Building Safety Inspection', type: 'Inspection', priority: 'High', date: 'March 29, 2024', desc: 'Annual safety inspection by city authorities' },
    { title: 'Carbon Credits Filing', type: 'Deadline', priority: 'Medium', date: 'May 14, 2024', desc: 'Submit documentation for carbon credits program' },
];

const Header = () => {
    const [isDark, setIsDark] = useState(true);
    const [isCalendarOpen, setIsCalendarOpen] = useState(false);

    const toggleTheme = () => {
        if (isDark) {
            document.body.classList.add('light-theme');
        } else {
            document.body.classList.remove('light-theme');
        }
        setIsDark(!isDark);
    };

    // Reusable pill component for priority
    const PriorityPill = ({ priority }) => (
        <span style={{
            fontSize: '0.65rem', fontWeight: 600, padding: '0.2rem 0.5rem', borderRadius: '4px',
            background: priority === 'High' ? 'rgba(239,68,68,0.15)' : 'rgba(59,130,246,0.15)',
            color: priority === 'High' ? '#ef4444' : '#3b82f6'
        }}>
            {priority}
        </span>
    );

    return (
        <header className="top-header" style={{ position: 'relative', overflow: 'visible' }}>
            <h1 className="header-title">Portfolio Overview</h1>

            <div className="header-actions" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>

                {/* Theme Toggle */}
                <button
                    className="icon-button"
                    onClick={toggleTheme}
                    style={{ color: isDark ? '#fde047' : 'var(--text-primary)' }}
                >
                    {isDark ? <Moon size={20} /> : <Sun size={20} />}
                </button>

                {/* Calendar Dropdown Wrapper */}
                <div style={{ position: 'relative' }}>
                    <button
                        className="icon-button"
                        onClick={() => setIsCalendarOpen(!isCalendarOpen)}
                        style={{ position: 'relative', border: isCalendarOpen ? '1px solid var(--accent-green)' : '1px solid transparent' }}
                    >
                        <Calendar size={20} color="var(--text-primary)" />
                        {/* Blue dot indicator */}
                        <span style={{ position: 'absolute', top: '6px', right: '6px', width: '6px', height: '6px', background: '#3b82f6', borderRadius: '50%', border: '1px solid #000' }}></span>
                    </button>

                    {/* Calendar Popup */}
                    {isCalendarOpen && (
                        <div className="glass-card" style={{
                            position: 'absolute', top: 'calc(100% + 10px)', right: 0, width: '400px',
                            zIndex: 100, padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '1rem',
                            boxShadow: '0 10px 40px rgba(0,0,0,0.5)', border: '1px solid var(--border-light)'
                        }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <h3 style={{ fontSize: '1.1rem', fontWeight: 500 }}>Upcoming Important Dates</h3>
                                <button style={{ background: 'rgba(255,255,255,0.05)', border: 'none', width: '28px', height: '28px', borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-primary)', cursor: 'pointer' }}>
                                    <Plus size={16} color="#3b82f6" />
                                </button>
                            </div>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', maxHeight: '400px', overflowY: 'auto', paddingRight: '0.5rem' }}>
                                {upcomingDates.map((item, idx) => (
                                    <div key={idx} style={{ background: 'var(--bg-input)', borderRadius: '10px', padding: '1rem', border: '1px solid transparent' }} onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--border-light)'} onMouseLeave={e => e.currentTarget.style.borderColor = 'transparent'}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.25rem' }}>
                                            <h4 style={{ fontSize: '0.95rem', fontWeight: 500, margin: 0 }}>{item.title}</h4>
                                            <PriorityPill priority={item.priority} />
                                        </div>
                                        <div style={{ fontSize: '0.75rem', color: '#3b82f6', marginBottom: '0.5rem', fontWeight: 500 }}>{item.type}</div>
                                        <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '0.25rem' }}>{item.date}</div>
                                        <p style={{ fontSize: '0.8rem', color: 'var(--text-primary)', margin: 0, lineHeight: 1.4 }}>{item.desc}</p>
                                    </div>
                                ))}
                            </div>

                            <button style={{
                                width: '100%', padding: '0.75rem', borderRadius: '8px', border: 'none',
                                background: 'rgba(59,130,246,0.1)', color: '#3b82f6', fontWeight: 600,
                                fontSize: '0.9rem', cursor: 'pointer', marginTop: '0.5rem'
                            }}>
                                View Full Calendar
                            </button>
                        </div>
                    )}
                </div>

                {/* Notifications */}
                <button className="icon-button has-notification">
                    <Bell size={20} color="var(--text-primary)" />
                </button>

                {/* User Avatar */}
                <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'linear-gradient(135deg, var(--accent-green), #047857)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#000', fontWeight: 600, fontSize: '0.9rem', marginLeft: '0.5rem', cursor: 'pointer', boxShadow: '0 0 0 2px rgba(255,255,255,0.1)' }}>
                    ED
                </div>
            </div>
        </header>
    );
};

export default Header;
