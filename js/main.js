// Import Firebase configuration dari config.js
import { db } from './firebase/config.js';
import { collection, getDocs } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-firestore.js";

// Fungsi untuk mengambil data produk dari Firestore
async function fetchProducts() {
    const productsCol = collection(db, 'items');  // Ganti dengan nama koleksi yang sesuai
    const productSnapshot = await getDocs(productsCol);
    const productsList = productSnapshot.docs.map(doc => doc.data());
    console.log('Data Produk:', productsList); // Log data produk
    return productsList;
}

// Fungsi untuk memilih 3 produk secara acak
function getRandomProducts(products, count = 3) {
    const shuffled = products.sort(() => 0.5 - Math.random());  // Mengacak urutan produk
    return shuffled.slice(0, count);  // Mengambil 3 produk pertama setelah diacak
}

// Fungsi untuk menampilkan produk di halaman
async function displayFeaturedProducts() {
    // Tampilkan loading spinner
    const loading = document.getElementById('loading');
    loading.style.display = 'block'; // Tampilkan spinner loading

    try {
        const products = await fetchProducts();  // Ambil semua produk
        const randomProducts = getRandomProducts(products);  // Pilih 3 produk acak

        const productContainer = document.querySelector('.featured-products .row');
        productContainer.innerHTML = '';  // Clear kontainer sebelum menambahkan produk baru

        randomProducts.forEach(product => {
            const productCard = document.createElement('div');
            productCard.classList.add('col-md-4', 'mb-4');
            productCard.innerHTML = `
            <div class="card">
                <div class="card-body">
                    <h5 class="card-title">${product.name}</h5>
                    <p class="card-text">${product.description}</p>
                    <a href="#" class="btn btn-primary">Beli Sekarang</a>
                </div>
            </div>
            `;
            productContainer.appendChild(productCard);
        });

        // Sembunyikan loading spinner setelah produk ditampilkan
        loading.style.display = 'none';
    } catch (error) {
        console.error('Error fetching products:', error);
        loading.innerHTML = 'Terjadi kesalahan dalam memuat data produk.';
    }
}

// Panggil fungsi untuk menampilkan produk unggulan
displayFeaturedProducts();
