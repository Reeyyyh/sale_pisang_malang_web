import React, { useState, useEffect } from 'react';
import { auth, db } from '../../config/firebase/FireConfig';
import { doc, getDoc, addDoc, updateDoc, collection } from 'firebase/firestore';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AdminDashboard = () => {
    const [userData, setUserData] = useState(null);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [image, setImage] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchUserData = async () => {
            const userId = auth.currentUser?.uid;
            if (userId) {
                const userDoc = await getDoc(doc(db, 'users', userId));
                if (userDoc.exists()) {
                    setUserData(userDoc.data());
                }
            }
        };

        fetchUserData();
    }, []);

    const handleImageChange = (event) => {
        if (event.target.files && event.target.files[0]) {
            setImage(event.target.files[0]);
        }
    };

    const uploadToCloudinary = async (file) => {
        const cloudName = 'dsdqizkji'; // Ganti dengan nama Cloudinary Anda
        const uploadPreset = 'salepisang'; // Ganti dengan preset Cloudinary Anda

        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', uploadPreset);

        const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
            method: 'POST',
            body: formData,
        });

        const data = await response.json();
        if (response.ok) {
            return data.secure_url; // URL gambar di Cloudinary
        } else {
            throw new Error('Failed to upload image to Cloudinary');
        }
    };

    const handleUpload = async () => {
        setLoading(true);
        try {
            let imgUrl = 'https://via.placeholder.com/150?text=No+Image';

            // Validasi harga (pastikan berupa angka)
            if (isNaN(price) || price.trim() === '') {
                toast.error('Please enter a valid number for price');
                setLoading(false);
                return;
            }

            // Jika ada gambar, unggah ke Cloudinary
            if (image) {
                imgUrl = await uploadToCloudinary(image);
            }

            // Tambahkan data ke Firestore dan dapatkan referensi dokumen
            const docRef = await addDoc(collection(db, 'items'), {
                name,
                description,
                harga: String(price), // Simpan harga sebagai string untuk konsistensi
                imgUrl,
            });

            // Perbarui dokumen dengan field `id`
            await updateDoc(docRef, { id: docRef.id });

            // Reset form
            setName('');
            setDescription('');
            setPrice('');
            setImage(null);

            toast.success('Item added successfully!');
        } catch (error) {
            console.error('Error uploading item:', error.message);
            toast.error('Failed to upload item');
        } finally {
            setLoading(false);
        }
    };

    if (!userData) {
        return <div>Loading...</div>;
    }

    return (
        <div className="container mt-4 text-center">
            <ToastContainer position="top-right" autoClose={3000} />
            <h1>Welcome, {userData.name}!</h1>
            <p>Email: {userData.email}</p>

            <h2 className="mt-5">Add Item</h2>
            <div className="card p-4 shadow mt-3">
                <div className="form-group mt-3">
                    <label>Item Name</label>
                    <input
                        type="text"
                        className="form-control"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <div className="form-group mt-3">
                    <label>Description</label>
                    <textarea
                        className="form-control"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </div>
                <div className="form-group mt-3">
                    <label>Price</label>
                    <input
                        type="text"
                        className="form-control"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                    />
                </div>
                <div className="form-group mt-3">
                    <label>Image</label>
                    <input
                        type="file"
                        className="form-control"
                        onChange={handleImageChange}
                    />
                </div>
                <button
                    className="btn btn-warning text-white fw-bold mt-4"
                    onClick={handleUpload}
                    disabled={loading}
                >
                    {loading ? 'Uploading...' : 'Add Item'}
                </button>
            </div>
        </div>
    );
};

export default AdminDashboard;
