// src/components/Sidebar.jsx
import React from 'react';
import { Link } from 'react-router-dom'; // Pastikan Anda sudah install react-router-dom

const Sidebar = () => {
    return (
        <div className="w-64 bg-gray-800 text-white flex flex-col h-full fixed inset-0 lg:relative">
            <div className="flex items-center justify-center h-16 bg-gray-900">
                <h2 className="text-xl font-bold">My Website</h2>
            </div>
            <nav className="flex flex-col mt-4">
                <Link to="/" className="px-4 py-2 hover:bg-gray-700">Home</Link>
                <Link to="/about" className="px-4 py-2 hover:bg-gray-700">About</Link>
                <Link to="/services" className="px-4 py-2 hover:bg-gray-700">Services</Link>
                <Link to="/contact" className="px-4 py-2 hover:bg-gray-700">Contact</Link>
            </nav>
        </div>
    );
};

export default Sidebar;
