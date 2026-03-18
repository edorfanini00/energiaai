import React from 'react';
import { Search, Bell } from 'lucide-react';

const Header = () => {
    return (
        <header className="top-header">
            {/* Left: Search Bar */}
            <div className="search-bar">
                <Search size={16} color="var(--text-muted)" />
                <input
                    type="text"
                    placeholder="Search..."
                    className="search-input"
                />
            </div>

            {/* Right Actions */}
            <div className="header-actions">
                <button className="icon-button">
                    <Bell size={18} />
                </button>
                <img
                    src="https://i.pravatar.cc/150?img=11"
                    alt="User Avatar"
                    className="user-avatar"
                />
            </div>
        </header>
    );
};

export default Header;
