// src/components/ProductDetail.jsx
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { db } from '../config/firebase/FireConfig.js';
import { doc, getDoc } from 'firebase/firestore';

const ProductDetail = () => {
    const { id } = useParams(); // Mengambil ID produk dari URL
    const [product, setProduct] = useState(null);

    useEffect(() => {
        // Fetch data produk berdasarkan ID
        const fetchProduct = async () => {
            try {
                const docRef = doc(db, 'items', id);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    setProduct(docSnap.data());
                } else {
                    console.log('Product not found');
                }
            } catch (error) {
                console.error('Error fetching product details:', error);
            }
        };

        fetchProduct(); // Memanggil fungsi fetchProduct saat component mount
    }, [id]);

    return (
        <div className="container py-5">
            {product ? (
                <div className="row">
                    {/* Gambar produk */}
                    <div className="col-12 col-md-6">
                        <div className="card shadow-lg" style={{ borderRadius: '15px', overflow: 'hidden', backgroundColor: 'transparent' }}>
                            <img
                                src={product.imgUrl}
                                alt={product.name}
                                className="card-img-top img-fluid"
                                style={{
                                    objectFit: 'contain',
                                    maxHeight: '400px',
                                    width: '100%',
                                    borderRadius: '15px 15px 0 0'
                                }}
                            />
                        </div>
                    </div>

                    {/* Deskripsi dan tombol */}
                    <div className="col-12 col-md-6 mt-4 mt-md-0">
                        <div className="card p-4 shadow-sm border-light rounded">
                            <h3 className="mb-3">{product.name}</h3>
                            <p className="text-success">{product.harga}</p>
                            <hr />
                            <p className="text-muted" style={{ textAlign: 'justify' }}>{product.description}</p>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="d-flex justify-content-center">
                    <div className="spinner-border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProductDetail;
