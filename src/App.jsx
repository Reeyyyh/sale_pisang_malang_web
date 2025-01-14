import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Register from './Auth/Register';
import Login from './Auth/Login';
import Dashboard from './components/Dashboard';
import ProductDetail from './components/ProductDetail';

import ClientDashboard from './Client/page/ClientDashboard';
import AdminDashboard from './Admin/page/AdminDashboard';

const App = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false); // Sidebar tertutup default pada mobile
  const [isMobile, setIsMobile] = useState(false); // Status untuk mengecek apakah perangkat mobile
  const [isDashboard, setIsDashboard] = useState(false); // Status untuk menampilkan tombol hamburger

  const handleResize = () => {
    const mobileView = window.innerWidth <= 550;
    setIsMobile(mobileView); // Tentukan batas lebar layar untuk mobile

    if (!mobileView) {
      setSidebarOpen(true); // Jika perangkat bukan mobile, pastikan sidebar terbuka
    }
  };

  useEffect(() => {
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen); // Toggle sidebar hanya pada mobile
  };

  useEffect(() => {
    if (isMobile) {
      setSidebarOpen(false); // Sidebar tertutup pada perangkat mobile secara default
    }
  }, [isMobile]);

  return (
    <Router>
      <div className="d-flex">
        <Sidebar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

        {/* Konten utama */}
        <div
          className="container"
          style={{
            marginLeft: isSidebarOpen && !isMobile ? '250px' : '0', // Margin kiri hanya berubah jika sidebar terbuka
            transition: 'margin-left 0.3s', // Transisi untuk margin saat sidebar dibuka/tertutup
          }}
        >
          <Routes>
            <Route path="/" element={<Dashboard setIsDashboard={setIsDashboard} />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/client-dashboard" element={<ClientDashboard />} />
            <Route path="/admin-dashboard" element={<AdminDashboard />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
