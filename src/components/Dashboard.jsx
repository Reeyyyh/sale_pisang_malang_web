// src/components/Dashboard.jsx
import React, { useState, useEffect } from 'react';
import { db } from '../config/firebase/FireConfig.js';
import { collection, getDocs } from 'firebase/firestore';
import { Link } from 'react-router-dom';

const Dashboard = () => {
    const [items, setItems] = useState([]); // State untuk menyimpan data items
    const [loading, setLoading] = useState(true); // State untuk indikator loading

    useEffect(() => {
        // Fungsi untuk mengambil data dari Firestore
        const fetchItems = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, 'items')); // Mengambil koleksi 'items' dari Firestore
                const itemsData = querySnapshot.docs.map(doc => ({
                    id: doc.id, // Menyimpan ID dokumen
                    ...doc.data(), // Menyimpan data lainnya (name, imgUrl, harga, description)
                }));
                setItems(itemsData); // Menyimpan data ke state
            } catch (error) {
                console.error('Error fetching items:', error);
            } finally {
                setLoading(false); // Mengubah loading menjadi false setelah data selesai diambil
            }
        };

        fetchItems(); // Memanggil fungsi fetchItems saat component mount
    }, []);

    return (
        <div className="container py-4">
            <h2 className="text-center mb-4">Welcome to Sale Pisang Malang</h2>

            {loading ? (
                <div className="d-flex justify-content-center">
                    <div className="spinner-border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>
            ) : (
                <div className="row">
                    {items.length > 0 ? (
                        items.map((item) => (
                            <div key={item.id} className="col-12 col-md-4 mb-4">
                                <div className="card shadow-sm border-light rounded">
                                    <img 
                                        src={item.imgUrl} 
                                        alt={item.name} 
                                        className="card-img-top" 
                                        style={{ height: '200px', objectFit: 'cover' }} 
                                    />
                                    <div className="card-body">
                                        <h5 className="card-title" style={{
                                            whiteSpace: 'nowrap',
                                            overflow: 'hidden',
                                            textOverflow: 'ellipsis'
                                        }}>
                                            {item.name}
                                        </h5>
                                        <p className="card-text text-muted">{item.harga}</p>
                                    </div>
                                    <div className="card-footer text-center">
                                        <Link to={`product/${item.id}`} className="btn btn-primary w-100">
                                            View Details
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="text-center">No items available</p>
                    )}
                </div>
            )}
        </div>
    );
};

export default Dashboard;
