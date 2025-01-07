import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav style={{ backgroundColor: '#f0ad4e', padding: '10px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ color: 'white', fontWeight: 'bold' }}>App Name</div>
                <div>
                    <Link to="/" style={{ color: 'white', marginLeft: '20px' }}>Home</Link>
                    <Link to="/login" style={{ color: 'white', marginLeft: '20px' }}>Login</Link>
                    <Link to="/register" style={{ color: 'white', marginLeft: '20px' }}>Register</Link>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
