// src/components/page/Dashboard.jsx
import React, { useEffect, useState } from 'react';
import { db } from '../../config/firebase/FireConfig.js'; // Import Firebase config
import { collection, getDocs } from 'firebase/firestore';

const Content = () => {
    const [items, setItems] = useState([]);

    useEffect(() => {
        // Mengambil data dari Firestore
        const fetchItems = async () => {
            try {
                const itemsCollection = collection(db, 'items');
                const itemsSnapshot = await getDocs(itemsCollection);
                const itemsList = itemsSnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data(),
                }));
                setItems(itemsList);
            } catch (error) {
                console.error("Error fetching items:", error);
            }
        };

        fetchItems();
    }, []);

    return (
        <div className="flex-1 p-8 bg-gray-50">
            <h1 className="text-3xl font-bold text-center mb-6">Welcome to My Website</h1>
            <p className="text-center text-gray-600 mb-6">Here are some of the items we offer:</p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {items.map(item => (
                    <div key={item.id} className="bg-white shadow-lg rounded-lg overflow-hidden transform transition-all hover:scale-105 hover:shadow-2xl">
                        <img src={item.imgUrl} alt={item.name} className="w-full h-48 object-cover rounded-t-lg" />
                        <div className="p-4">
                            <h3 className="text-xl font-semibold">{item.name}</h3>
                            <p className="text-gray-600 mt-2">{item.description}</p>
                            <p className="text-lg font-bold mt-4 text-blue-600">Rp {item.harga}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Content;
