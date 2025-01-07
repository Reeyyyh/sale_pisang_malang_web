import React, { useState, useEffect } from 'react';
import { auth } from '../config/firebase/FireConfig.js';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Sidebar from '../components/Sidebar.jsx'; // Import Sidebar Component
import { Button } from 'antd'; // Import Button from antd

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isSidebarOpen, setIsSidebarOpen] = useState(false); // State untuk kontrol sidebar
    const [isMobile, setIsMobile] = useState(false); // State untuk mengecek apakah perangkat mobile
    const navigate = useNavigate();

    // Mengatur tampilan berdasarkan lebar layar
    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 550); // Jika lebar layar <= 550px, anggap perangkat mobile
        };

        handleResize(); // Panggil untuk pertama kali
        window.addEventListener('resize', handleResize); // Setiap kali ukuran layar berubah

        return () => window.removeEventListener('resize', handleResize); // Hapus event listener saat komponen unmount
    }, []);

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            await signInWithEmailAndPassword(auth, email, password);
            toast.success('Login berhasil!');
            setTimeout(() => navigate('/'), 2000);
        } catch (error) {
            toast.error('Error logging in: ' + error.message);
        }
    };

    // Fungsi untuk toggle sidebar
    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    return (
        <div className="container d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
            {/* Menampilkan Sidebar */}
            <Sidebar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

            {/* Tombol Hamburger hanya tampil jika perangkat mobile */}
            {isMobile && (
                <div
                    onClick={toggleSidebar}
                    style={{
                        position: 'fixed',
                        top: '20px',
                        right: '20px', // Pindahkan tombol ke kanan
                        zIndex: 1000,  // Pastikan tombol di atas elemen lainnya
                    }}
                >
                    <Button
                        className="btn btn-lg"
                        style={{
                            padding: '20px',
                            backgroundColor: 'transparent',
                            border: '1px solid transparent',  // Atur border agar tidak berubah saat hover
                        }}
                        onMouseEnter={(e) => e.preventDefault()} // Menghentikan perubahan saat hover
                        onMouseLeave={(e) => e.preventDefault()} // Menghentikan perubahan saat hover berakhir
                    >
                        {/* Ikon Hamburger (tampilan menu) */}
                        {isSidebarOpen ? (
                            <i className="fas fa-times" style={{ fontSize: '30px', color: 'black' }}></i>
                        ) : (
                            <i className="fas fa-bars" style={{ fontSize: '30px', color: 'black' }}></i>
                        )}
                    </Button>
                </div>
            )}

            <div className="card shadow-lg p-4" style={{ width: '400px' }}>
                <h2 className="text-center mb-4">Login</h2>
                <form onSubmit={handleLogin}>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email</label>
                        <input
                            type="email"
                            className="form-control"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input
                            type="password"
                            className="form-control"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className="btn btn-warning text-white fw-bold w-100">Login</button>
                </form>
                <div className="mt-3 text-center">
                    <p>Don't have an account? <a href="/register">Register</a></p>
                </div>
            </div>
            {/* ToastContainer dengan posisi tengah atas */}
            <ToastContainer position="top-center" autoClose={3000} />
        </div>
    );
};

export default Login;
