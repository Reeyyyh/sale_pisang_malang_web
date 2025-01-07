import React, { useState, useEffect } from 'react';
import { db } from '../config/firebase/FireConfig.js';
import { collection, getDocs } from 'firebase/firestore';
import { Card, Col, Row, Spin, Button } from 'antd';
import { Link } from 'react-router-dom';
import Sidebar from './Sidebar';
import './css/Dashboard.css';

const Dashboard = ({ setIsDashboard }) => {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false); // State untuk kontrol sidebar
    const [isMobile, setIsMobile] = useState(false); // State untuk mengecek apakah perangkat mobile

    // Mengatur tampilan berdasarkan lebar layar
    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 550); // Jika lebar layar <= 991px, anggap perangkat mobile
        };

        handleResize(); // Panggil untuk pertama kali
        window.addEventListener('resize', handleResize); // Setiap kali ukuran layar berubah

        return () => window.removeEventListener('resize', handleResize); // Hapus event listener saat komponen unmount
    }, []);

    useEffect(() => {
        setIsDashboard(true); // Set status sidebar hanya untuk halaman dashboard
        return () => {
            setIsDashboard(false); // Set status false ketika meninggalkan dashboard
        };
    }, [setIsDashboard]);

    useEffect(() => {
        const fetchItems = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, 'items'));
                const itemsData = querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data(),
                }));
                setItems(itemsData);
            } catch (error) {
                console.error('Error fetching items:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchItems();
    }, []);

    // Fungsi untuk toggle sidebar
    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    return (
        <div className="container py-4 d-flex flex-column min-vh-100">
            {/* Menampilkan Sidebar */}
            <Sidebar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

            <h2 className="text-center mb-4 bg-warning rounded text-light p-1">
                Welcome to Sale Pisang Malang
            </h2>

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

            {loading ? (
                <div className="text-center flex-grow-1 d-flex align-items-center justify-content-center">
                    <Spin size="large" />
                </div>
            ) : (
                <div className="flex-grow-1">
                    <Row gutter={[16, 16]}>
                        {items.length > 0 ? (
                            items.map((item) => (
                                <Col
                                    xs={24}  // Full width on extra small screens
                                    sm={12}  // 2 items per row on small screens
                                    md={8}   // 3 items per row on medium screens
                                    lg={6}   // 4 items per row on large screens
                                    key={item.id}
                                >
                                    <Card
                                        hoverable
                                        cover={
                                            <img
                                                alt={item.name}
                                                src={item.imgUrl}
                                                style={{ height: '200px', objectFit: 'cover' }}
                                            />
                                        }
                                    >
                                        <Card.Meta title={item.name} description={`Price: ${item.harga}`} />
                                        <Link to={`product/${item.id}`}>
                                            <Button type="primary bg-warning" block className="mt-2 fw-bold text-white">
                                                View Details
                                            </Button>
                                        </Link>
                                    </Card>
                                </Col>
                            ))
                        ) : (
                            <div className="text-center no-items-message">
                                <p>No items available</p>
                            </div>
                        )}
                    </Row>
                </div>
            )}

            {/* Footer dengan alamat */}
            <footer className="text-center mt-4 bg-warning rounded-1 text-white fw-bold">
                <p>
                    <a
                        href="https://www.google.com/maps?q=-7.937119,112.647417"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-white"
                    >
                        <i className="fas fa-map-marker-alt text-danger"></i> Jl. Plaosan Bar. No.39, Purwodadi, Kec. Blimbing, Kota Malang, Jawa Timur 65126
                    </a>
                </p>
            </footer>
        </div>
    );
};

export default Dashboard;
