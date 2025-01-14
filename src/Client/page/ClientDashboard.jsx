import React, { useState, useEffect } from 'react';
import { auth, db } from '../../config/firebase/FireConfig';
import { doc, getDoc, collection, getDocs } from 'firebase/firestore';

const ClientDashboard = () => {
    const [userData, setUserData] = useState(null);
    const [favorites, setFavorites] = useState([]);  // Untuk menyimpan daftar favorit

    useEffect(() => {
        const fetchUserData = async () => {
            const userId = auth.currentUser?.uid;
            if (userId) {
                // Ambil data pengguna
                const userDoc = await getDoc(doc(db, "users", userId));
                if (userDoc.exists()) {
                    setUserData(userDoc.data());
                }

                // Ambil data favorit dari koleksi 'favorites'
                const favoritesRef = collection(db, "users", userId, "favorites");
                const favoritesSnapshot = await getDocs(favoritesRef);
                const favoritesList = favoritesSnapshot.docs.map(doc => doc.data()); // Ambil data item favorit
                setFavorites(favoritesList);
            }
        };

        fetchUserData();
    }, []);

    if (!userData) {
        return <div>Loading...</div>;
    }

    return (
        <div className="container mt-4">
            <h1 className="mb-4 text-center">Welcome, {userData.name}!</h1>
            <p className="text-center">Email: {userData.email}</p>

            <h2 className="mt-5">Your Favorite Items:</h2>
            {favorites.length === 0 ? (
                <p>You have no favorite items.</p>
            ) : (
                <div className="row">
                    {favorites.map((favorite, index) => (
                        <div className="col-md-4 mb-4" key={index}>
                            <div className="card shadow-sm h-100">
                                <img 
                                    src={favorite.itemImageUrl} 
                                    className="card-img-top" 
                                    alt={favorite.itemName} 
                                    style={{ objectFit: 'cover', height: '200px' }}
                                />
                                <div className="card-body">
                                    <h5 className="card-title">{favorite.itemName}</h5>
                                    <p className="card-text">Price: <strong>${favorite.itemPrice}</strong></p>
                                </div>
                                <div className="card-footer text-center">
                                    <button className="btn btn-primary">Add to Cart</button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ClientDashboard;
