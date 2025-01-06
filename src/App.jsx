// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';  // Import Sidebar
import Dashboard from './components/page/Dashboard';  // Halaman Dashboard
import Product from './components/page/Product';  // Halaman Product

const App = () => {
  return (
    <Router>
      <div className="flex h-screen">
        {/* Sidebar */}
        <Sidebar />

        {/* Main Content */}
        <div className="flex-1 ml-64 p-4">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/about" element={<Product />} />
            {/* Tambahkan halaman lainnya jika perlu */}
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
