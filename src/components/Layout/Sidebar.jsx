import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, LayoutGrid, MessageSquare, Box, PlusSquare, List, ChevronRight, Cloud, Eye, Info, Building2 } from 'lucide-react';

const Sidebar = () => {
    return (
        <aside className="sidebar">
            {/* Brand */}
            <div className="sidebar-brand">
                <img src="/energia-logo.png" alt="Energia AI" className="sidebar-logo" />
            </div>

            {/* Main Menu */}
            <div className="sidebar-header-text" style={{ marginTop: '1.5rem' }}>Dashboard</div>
            <nav className="nav-menu" style={{ flex: 1 }}>
                <NavLink to="/" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
                    <Home size={18} className="nav-icon" /> Home
                </NavLink>
                <NavLink to="/" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`} style={{ justifyContent: 'space-between' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
                        <LayoutGrid size={18} className="nav-icon" /> Portfolio Overview
                    </div>
                </NavLink>
                <NavLink to="/building" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
                    <Building2 size={18} className="nav-icon" /> Building Analytics
                </NavLink>
                <div className="nav-item">
                    <MessageSquare size={18} className="nav-icon" /> Discussions
                </div>
                <div className="nav-item">
                    <Box size={18} className="nav-icon" /> Products
                </div>
                <div className="nav-item">
                    <PlusSquare size={18} className="nav-icon" /> Add Product
                </div>
                <div className="nav-item">
                    <List size={18} className="nav-icon" /> Product Lists
                </div>
            </nav>

            {/* Bottom Integrations */}
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
