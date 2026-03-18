import React from 'react';
import { Bell } from 'lucide-react';

const Header = () => {
    return (
        <header className="top-header">
            <h1 className="header-title">Summary Details</h1>

            <div className="header-actions">
                <button className="icon-button has-notification">
                    <Bell size={20} color="var(--text-primary)" strokeWidth={1.5} />
                </button>
            </div>
        </header>
    );
};

export default Header;
