import React, { useState, useEffect } from 'react';
import { db } from '../config/firebase/FireConfig.js';
import { collection, getDocs } from 'firebase/firestore';
import { Card, Col, Row, Spin, Button } from 'antd';
import { Link } from 'react-router-dom';
import Sidebar from './Sidebar'; // Import Sidebar Component

const Dashboard = () => {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false); // State untuk kontrol sidebar

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
        <div className="container py-4">
            {/* Menampilkan Sidebar */}
            <Sidebar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

            <h2 className="text-center mb-4">Welcome to Sale Pisang Malang</h2>

            {/* Tombol Hamburger untuk mobile */}
            <div className="hamburger-btn" onClick={toggleSidebar}>
                <Button icon={isSidebarOpen ? 'close' : 'menu'} shape="circle" />
            </div>

            {loading ? (
                <div className="text-center">
                    <Spin size="large" />
                </div>
            ) : (
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
                                        <Button type="primary" block className="mt-2">
                                            View Details
                                        </Button>
                                    </Link>
                                </Card>
                            </Col>
                        ))
                    ) : (
                        <p className="text-center">No items available</p>
                    )}
                </Row>
            )}
        </div>
    );
};

export default Dashboard;
