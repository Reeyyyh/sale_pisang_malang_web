import { db } from './firebase/config.js';
import { collection, getDocs } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-firestore.js";

// Function to fetch items from Firestore
async function fetchItems() {
    const loadingElement = document.getElementById("loading");  // Ambil elemen loading
    const itemList = document.getElementById("item-list");

    try {
        // Tampilkan elemen loading saat data sedang diambil
        loadingElement.style.display = "flex"; // Show loading spinner
        console.log('Loading spinner displayed');

        // Ambil data dari Firestore
        const querySnapshot = await getDocs(collection(db, "items"));

        // Loop melalui hasil query dan tampilkan item
        querySnapshot.forEach((doc) => {
            const itemData = doc.data();
            const itemCard = `
                <div class="col-12 col-md-4 mb-4">
                    <div class="card">
                        <div class="card-body">
                            <h5 class="card-title">${itemData.name}</h5>
                            <p class="card-text">Description: ${itemData.description}</p>
                            <p class="card-text">Price: ${itemData.harga}</p>
                            <!-- Add cart icon -->
                            <button class="btn btn-primary">
                                <i class="fas fa-shopping-cart"></i> Add to Cart
                            </button>
                        </div>
                    </div>
                </div>
            `;
            itemList.innerHTML += itemCard; // Add each item to the DOM
        });
    } catch (error) {
        // Tampilkan error jika terjadi masalah saat fetching
        loadingElement.innerHTML = `<p>Failed to load data. Please try again later.</p>`;
    } finally {
        console.log('Finally block executed');
            loadingElement.remove();
    }
}

document.addEventListener("DOMContentLoaded", function() {
    fetchItems();  // Fetch and display items once the page is ready
});
