import React, { useState, useEffect } from 'react';
import { db } from '../config/firebase/FireConfig.js';
import { collection, getDocs } from 'firebase/firestore';
import { Card, Col, Row, Spin, Button } from 'antd';
import { Link } from 'react-router-dom';

const Dashboard = () => {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);

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

    return (
        <div className="container py-4">
            <h2 className="text-center mb-4">Welcome to Sale Pisang Malang</h2>
            {loading ? (
                <div className="text-center">
                    <Spin size="large" />
                </div>
            ) : (
                <Row gutter={[16, 16]}>
                    {items.length > 0 ? (
                        items.map((item) => (
                            <Col xs={24} sm={12} md={8} lg={6} key={item.id}>
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
