import React from 'react';
import { NavLink } from 'react-router-dom';
import { Grid, MapPin, TrendingUp, AlertCircle, Settings, HelpCircle, Layers } from 'lucide-react';

const Sidebar = () => {
    return (
        <aside className="sidebar">
            <div className="sidebar-brand">
                <img src="/energia-logo.png" alt="Energia AI" style={{ height: '36px', width: 'auto', filter: 'brightness(0) invert(1)' }} />
            </div>

            <nav className="nav-menu" style={{ flex: 1, marginTop: '1rem' }}>
                <NavLink to="/" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
                    <Grid size={18} /> Overview
                </NavLink>
                <NavLink to="/building" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
                    <MapPin size={18} /> My Objects
                </NavLink>
                <NavLink to="/energy" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
                    <TrendingUp size={18} /> Upgrades
                </NavLink>
                <div className="nav-item">
                    <AlertCircle size={18} /> Reports
                </div>
            </nav>

            <nav className="nav-menu" style={{ marginBottom: '1rem' }}>
                <div className="nav-item">
                    <Settings size={18} /> Settings
                </div>
                <div className="nav-item">
                    <HelpCircle size={18} /> Help & support
                </div>
            </nav>
        </aside>
    );
};

export default Sidebar;
