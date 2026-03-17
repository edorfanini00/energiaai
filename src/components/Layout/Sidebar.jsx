import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Building2, Zap, Settings, HelpCircle, Activity } from 'lucide-react';

const Sidebar = () => {
    return (
        <div className="glass-panel" style={{ width: '250px', display: 'flex', flexDirection: 'column', padding: '2rem 1rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0 1rem', marginBottom: '3rem' }}>
                <Activity size={28} color="var(--accent-primary)" />
                <h2 style={{ fontSize: '1.25rem', fontWeight: 700, margin: 0 }}>WindFarm</h2>
            </div>

            <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', flex: 1 }}>
                <SidebarLink to="/" icon={<LayoutDashboard size={20} />} label="Portfolio" />
                <SidebarLink to="/building" icon={<Building2 size={20} />} label="Building" />
                <SidebarLink to="/energy" icon={<Zap size={20} />} label="Energy" />
            </nav>

            <div style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <SidebarLink to="/settings" icon={<Settings size={20} />} label="Settings" />
                <SidebarLink to="/help" icon={<HelpCircle size={20} />} label="Help" />
            </div>
        </div>
    );
};

const SidebarLink = ({ to, icon, label }) => {
    return (
        <NavLink
            to={to}
            style={({ isActive }) => ({
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                padding: '0.875rem 1rem',
                borderRadius: '12px',
                textDecoration: 'none',
                color: isActive ? 'var(--text-main)' : 'var(--text-muted)',
                background: isActive ? 'rgba(255,255,255,0.6)' : 'transparent',
                fontWeight: isActive ? 600 : 500,
                transition: 'all 0.2s',
            })}
        >
            {icon}
            <span>{label}</span>
        </NavLink>
    );
};

export default Sidebar;
