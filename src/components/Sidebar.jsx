import React from 'react';
import { NavLink } from 'react-router-dom';
import './css/sidebar.css';

const Sidebar = ({ isSidebarOpen, toggleSidebar }) => {
    return (
        <div className={`sidebar ${isSidebarOpen ? 'open' : 'closed'}`}>
            {/* Tombol untuk membuka/menutup Sidebar di tampilan mobile */}
            <button className="btn btn-light d-lg-none" onClick={toggleSidebar}>
                <i className="bi bi-list"></i> {/* Icon hamburger */}
            </button>

            {/* Konten sidebar (menu items) */}
            <div className={`menu-items ${isSidebarOpen ? 'show' : ''}`}>
                <div className="welcome-text text-center my-4">
                    <h3>Welcome</h3>
                </div>

                <nav className="navbar navbar-expand-lg navbar-dark bg-dark flex-column">
                    <div className="container-fluid">
                        <div className={`collapse navbar-collapse ${isSidebarOpen ? 'show' : ''}`}>
                            <ul className="navbar-nav flex-column w-100">
                                {/* Dashboard Menu Item */}
                                <li className="nav-item">
                                    <NavLink
                                        to="/"
                                        className={({ isActive }) => isActive ? "nav-link active-menu-item" : "nav-link"}
                                    >
                                        Dashboard
                                    </NavLink>
                                </li>

                                {/* Login Menu Item */}
                                <li className="nav-item">
                                    <NavLink
                                        to="/login"
                                        className={({ isActive }) => isActive ? "nav-link active-menu-item" : "nav-link"}
                                    >
                                        Login
                                    </NavLink>
                                </li>

                                {/* Register Menu Item */}
                                <li className="nav-item">
                                    <NavLink
                                        to="/register"
                                        className={({ isActive }) => isActive ? "nav-link active-menu-item" : "nav-link"}
                                    >
                                        Register
                                    </NavLink>
                                </li>

                                {/* SubMenu for Social Media */}
                                <li className="nav-item dropdown">
                                    <a
                                        className="nav-link dropdown-toggle"
                                        href="#"
                                        id="social-media-dropdown"
                                        role="button"
                                        data-bs-toggle="dropdown"
                                        aria-expanded="false"
                                    >
                                        Our Social Media
                                    </a>
                                    <ul className="dropdown-menu" aria-labelledby="social-media-dropdown">
                                        <li>
                                            <a
                                                className="dropdown-item"
                                                href="https://www.instagram.com/salepisangmalang?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
                                                target="_blank"
                                                rel="noopener noreferrer"
                                            >
                                                Instagram
                                            </a>
                                        </li>
                                        <li>
                                            <a
                                                className="dropdown-item"
                                                href="https://id.shp.ee/LEsbUh8"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                            >
                                                Shopee
                                            </a>
                                        </li>
                                        <li>
                                            <a
                                                className="dropdown-item"
                                                href="https://tokopedia.link/qrlQbxnhOOb"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                            >
                                                TokoPedia
                                            </a>
                                        </li>
                                        <li>
                                            <a
                                                className="dropdown-item"
                                                href="https://www.tiktok.com/@salepisangmalang"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                            >
                                                TikTok
                                            </a>
                                        </li>
                                    </ul>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
            </div>
        </div>
    );
};

export default Sidebar;
