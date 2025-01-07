import React, { useState, useEffect } from 'react';
import { auth, db } from '../../config/firebase/FireConfig';
import { doc, getDoc } from 'firebase/firestore';

const AdminDashboard = () => {
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        const fetchUserData = async () => {
            const userId = auth.currentUser?.uid;
            if (userId) {
                const userDoc = await getDoc(doc(db, "users", userId));
                if (userDoc.exists()) {
                    setUserData(userDoc.data());
                }
            }
        };

        fetchUserData();
    }, []);

    if (!userData) {
        return <div>Loading...</div>;
    }

    return (
        <div className="container mt-4">
            <h1>Welcome, {userData.name}!</h1>
            <p>Email: {userData.email}</p>
        </div>
    );
};

export default AdminDashboard;
