import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, Map, Building2, Zap, TrendingUp, FileText, Settings, HelpCircle, ChevronRight, Cloud, Eye, Info } from 'lucide-react';

const Sidebar = () => {
    return (
        <aside className="sidebar">
            {/* Brand */}
            <div className="sidebar-brand">
                <img src="/energia-logo.png" alt="Energia AI" style={{ height: '36px', width: 'auto', filter: 'brightness(0) invert(1)' }} />
            </div>

            {/* Main Menu */}
            <div className="sidebar-header-text" style={{ marginTop: '1.5rem' }}>Dashboard</div>
            <nav className="nav-menu" style={{ flex: 1 }}>
                <NavLink to="/" end className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
                    <Home size={18} className="nav-icon" /> Home
                </NavLink>
                <NavLink to="/buildings" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`} style={{ justifyContent: 'space-between' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
                        <Map size={18} className="nav-icon" /> Buildings
                    </div>
                    <ChevronRight size={16} className="nav-icon" />
                </NavLink>
                <NavLink to="/building/1" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
                    <Building2 size={18} className="nav-icon" /> Building Detail
                </NavLink>
                <NavLink to="/energy" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
                    <Zap size={18} className="nav-icon" /> Energy
                </NavLink>
                <div className="nav-item">
                    <TrendingUp size={18} className="nav-icon" /> Upgrades
                </div>
                <div className="nav-item">
                    <FileText size={18} className="nav-icon" /> Reports
                </div>
            </nav>

            {/* Bottom */}
            <nav className="nav-menu" style={{ marginBottom: '0.5rem' }}>
                <div className="nav-item">
                    <Settings size={18} className="nav-icon" /> Settings
                </div>
                <div className="nav-item">
                    <HelpCircle size={18} className="nav-icon" /> Help & support
                </div>
            </nav>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0 1.5rem', marginBottom: '0.5rem', color: 'var(--text-secondary)', fontSize: '0.85rem', fontWeight: 500 }}>
                <Info size={14} /> Automated imports
            </div>

            <div className="bottom-widget-card">
                <div className="bottom-widget-icon" style={{ borderColor: 'rgba(255,255,255,0.1)', color: 'var(--text-primary)' }}>
                    <Cloud size={18} />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <span style={{ fontSize: '0.9rem', color: 'var(--text-primary)', fontWeight: 500 }}>Salesforce</span>
                    <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>last sync yesterday</span>
                </div>
            </div>

            <div className="bottom-widget-card">
                <div className="bottom-widget-icon">
                    <Eye size={18} />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <span style={{ fontSize: '0.9rem', color: 'var(--text-primary)', fontWeight: 500 }}>Viewers</span>
                    <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>last sync yesterday</span>
                </div>
            </div>
        </aside>
    );
};

export default Sidebar;
