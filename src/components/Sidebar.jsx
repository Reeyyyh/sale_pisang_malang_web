import React from 'react';
import { NavLink } from 'react-router-dom';
import './css/sidebar.css'; // Impor file CSS custom

const MySidebar = ({ isSidebarOpen }) => {
    return (
        <div className={`sidebar ${isSidebarOpen ? 'open' : 'closed'}`} style={{ height: '100vh' }}>
            {/* Welcome Text */}
            <div className="welcome-text text-center my-4">
                <h3>Welcome</h3>
            </div>

            <nav className="navbar navbar-expand-lg navbar-dark bg-dark flex-column" style={{ height: '100vh' }}>
                <div className="container-fluid">
                    <div className="collapse navbar-collapse" id="navbarScroll">
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
                                    <li><a className="dropdown-item" href="#">Instagram</a></li>
                                    <li><a className="dropdown-item" href="#">Shopee</a></li>
                                    <li><a className="dropdown-item" href="#">TokoPedia</a></li>
                                    <li><a className="dropdown-item" href="#">TikTok</a></li>
                                </ul>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    );
};

export default MySidebar;
