import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Edit2, Sun } from 'lucide-react';

const Header = () => {
    const location = useLocation();

    return (
        <header className="header-grid">
            {/* Brand */}
            <div className="brand">
                <img src="/energia-logo.png" alt="Energia AI Logo" style={{ height: '32px', width: 'auto' }} />
            </div>

            {/* Main Navigation Pill */}
            <div className="header-center">
                <div className="group-pill">
                    <NavLink to="/" className={({ isActive }) => `btn-pill ${isActive || location.pathname === '/' ? 'active' : ''}`}>
                        Dashboard
                    </NavLink>
                    <NavLink to="/building" className={({ isActive }) => `btn-pill ${isActive ? 'active' : ''}`}>
                        Chart
                    </NavLink>
                    <NavLink to="/energy" className={({ isActive }) => `btn-pill ${isActive ? 'active' : ''}`}>
                        Totals
                    </NavLink>
                </div>
            </div>

            {/* Right Actions */}
            <div className="header-right">
                <div className="avatar-stack">
                    {[1, 2, 3].map((i, idx) => (
                        <div key={i} className="avatar" style={{ zIndex: 3 - idx }}>
                            {i === 3 ? '+3' : `U${i}`}
                        </div>
                    ))}
                </div>

                <button className="btn-icon-circle"><Edit2 size={16} /></button>
                <div style={{ width: '1px', height: '24px', background: 'var(--border-light)', margin: '0 0.5rem' }}></div>
                <span className="link-text">Other services ▾</span>
                <button className="btn-solid" style={{ marginLeft: '1rem' }}>Add New Solar</button>
            </div>
        </header>
    );
};

export default Header;
