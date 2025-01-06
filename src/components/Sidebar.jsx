import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import './css/Sidebar.css';

const Sidebar = ({ isSidebarOpen, toggleSidebar }) => {
    return (
        <div>
            {/* Button hamburger untuk mobile */}
            <button
                className="navbar-toggler d-lg-none"
                type="button"
                onClick={toggleSidebar}
                aria-expanded={isSidebarOpen}
            >
                <span className="navbar-toggler-icon"></span>
            </button>

            {/* Sidebar */}
            <div
                className={`d-flex flex-column p-3 bg-dark text-white sidebar ${isSidebarOpen ? 'sidebar-open' : ''}`}
                style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: '250px',
                    height: '100vh',
                    overflowY: 'auto',
                    zIndex: '1000',
                    transition: 'transform 0.3s ease-in-out',
                    transform: isSidebarOpen ? 'translateX(0)' : 'translateX(-250px)',
                }}
            >
                <h4 className="text-center mb-4">Welcome</h4>
                <div className="list-group">
                    <NavLink
                        to="/"
                        className={({ isActive }) =>
                            `list-group-item list-group-item-action bg-transparent border-0 text-white hover-bg-primary ${isActive ? 'bg-primary' : ''}`
                        }
                    >
                        Dashboard
                    </NavLink>
                    <NavLink
                        to="/login"
                        className={({ isActive }) =>
                            `list-group-item list-group-item-action bg-transparent border-0 text-white hover-bg-primary ${isActive ? 'bg-primary' : ''}`
                        }
                    >
                        Login
                    </NavLink>
                    <NavLink
                        to="/register"
                        className={({ isActive }) =>
                            `list-group-item list-group-item-action bg-transparent border-0 text-white hover-bg-primary ${isActive ? 'bg-primary' : ''}`
                        }
                    >
                        Register
                    </NavLink>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
