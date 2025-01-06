import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Register from './Auth/Register';
import Login from './Auth/Login';
import Dashboard from './components/Dashboard';
import ProductDetail from './components/ProductDetail';

const App = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(true); // Sidebar terbuka secara default pada desktop

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen); // Toggle sidebar hanya pada mobile
  };

  return (
    <Router>
      <div className="d-flex">
        <Sidebar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

        {/* Konten utama */}
        <div
          className="container"
          style={{
            marginLeft: isSidebarOpen ? '250px' : '0', // Mengubah margin kiri sesuai status sidebar
            transition: 'margin-left 0.3s', // Animasi transisi saat sidebar terbuka/tertutup
          }}
        >
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/product/:id" element={<ProductDetail />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
