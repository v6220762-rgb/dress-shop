// Product Data
const products = [
    {
        id: 1,
        name: "Women's Designer Silk Saree",
        category: "women",
        price: 2499,
        originalPrice: 4999,
        discount: "50% OFF",
        rating: 4.8,
        image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&q=80&w=600"
    },
    {
        id: 2,
        name: "Men's Traditional Kurta",
        category: "men",
        price: 1499,
        originalPrice: 2999,
        discount: "50% OFF",
        rating: 4.6,
        image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&q=80&w=600"
    },
    {
        id: 3,
        name: "Women's Anarkali Dress",
        category: "women",
        price: 2199,
        originalPrice: 3999,
        discount: "45% OFF",
        rating: 4.9,
        image: "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&q=80&w=600"
    },
    {
        id: 4,
        name: "Men's Ethnic Jacket Set",
        category: "men",
        price: 2799,
        originalPrice: 4999,
        discount: "44% OFF",
        rating: 4.7,
        image: "https://images.unsplash.com/photo-1598033129183-c4f50c736f10?auto=format&fit=crop&q=80&w=600"
    },
    {
        id: 5,
        name: "Kids' Festive Lehenga",
        category: "kids",
        price: 1299,
        originalPrice: 2499,
        discount: "48% OFF",
        rating: 4.9,
        image: "https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8?auto=format&fit=crop&q=80&w=600"
    },
    {
        id: 6,
        name: "Women's Party Wear Gown",
        category: "women",
        price: 1999,
        originalPrice: 3999,
        discount: "50% OFF",
        rating: 4.5,
        image: "https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&q=80&w=600"
    },
    {
        id: 7,
        name: "Men's Cotton Kurta",
        category: "men",
        price: 999,
        originalPrice: 1999,
        discount: "50% OFF",
        rating: 4.4,
        image: "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&q=80&w=600"
    },
    {
        id: 8,
        name: "Kids' Traditional Kurta Set",
        category: "kids",
        price: 899,
        originalPrice: 1599,
        discount: "44% OFF",
        rating: 4.8,
        image: "https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?auto=format&fit=crop&q=80&w=600"
    },
    {
        id: 9,
        name: "Gold-Plated Festive Jhumkas",
        category: "accessories",
        price: 499,
        originalPrice: 999,
        discount: "50% OFF",
        rating: 4.9,
        image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&q=80&w=600"
    },
    {
        id: 10,
        name: "Embroidered Ethnic Potli Bag",
        category: "accessories",
        price: 699,
        originalPrice: 1299,
        discount: "46% OFF",
        rating: 4.7,
        image: "https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&q=80&w=600"
    }
];

// State Management
let cart = JSON.parse(localStorage.getItem('aura_cart')) || [];
let wishlist = JSON.parse(localStorage.getItem('aura_wishlist')) || [];

// DOM Elements
const hamburger = document.getElementById('hamburger');
const mobileNav = document.getElementById('mobileNav');
const productsGrid = document.getElementById('productsGrid');
const tabBtns = document.querySelectorAll('.tab-btn');
const filterBtns = document.querySelectorAll('.filter-btn');
const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');

const cartCount = document.getElementById('cartCount');
const cartBagCount = document.getElementById('cartBagCount');
const wishlistCount = document.getElementById('wishlistCount');
const wishlistBagCount = document.getElementById('wishlistBagCount');

const cartDrawer = document.getElementById('cartDrawer');
const cartOverlay = document.getElementById('cartOverlay');
const cartToggleBtn = document.querySelector('.cart-toggle-btn');
const closeCart = document.getElementById('closeCart');
const cartItemsContainer = document.getElementById('cartItemsContainer');
const cartTotalPrice = document.getElementById('cartTotalPrice');
const checkoutBtn = document.getElementById('checkoutBtn');

const wishlistDrawer = document.getElementById('wishlistDrawer');
const wishlistOverlay = document.getElementById('wishlistOverlay');
const wishlistToggleBtn = document.querySelector('.wishlist-toggle-btn');
const closeWishlist = document.getElementById('closeWishlist');
const wishlistItemsContainer = document.getElementById('wishlistItemsContainer');

const backToTop = document.getElementById('backToTop');
const newsletterForm = document.getElementById('newsletterForm');
const newsletterEmail = document.getElementById('newsletterEmail');
const newsletterMessage = document.getElementById('newsletterMessage');

// Initialize Website
document.addEventListener('DOMContentLoaded', () => {
    displayProducts(products);
    updateCartUI();
    updateWishlistUI();
    initCountdown();
});

// Mobile Navigation Toggle
hamburger.addEventListener('click', () => {
    mobileNav.classList.toggle('active');
});

// Display Products
function displayProducts(productsToDisplay) {
    if (productsToDisplay.length === 0) {
        productsGrid.innerHTML = `
            <div class="empty-state" style="grid-column: 1 / -1;">
                <i class="fa-solid fa-face-sad-tear"></i>
                <p>No festive products found matching your search.</p>
            </div>
        `;
        return;
    }

    productsGrid.innerHTML = productsToDisplay.map(product => {
        const isWishlisted = wishlist.some(item => item.id === product.id);
        return `
            <div class="product-card" data-category="${product.category}">
                <div class="product-image-container">
                    <span class="discount-tag">${product.discount}</span>
                    <button class="wishlist-btn ${isWishlisted ? 'active' : ''}" onclick="toggleWishlist(${product.id})">
                        <i class="${isWishlisted ? 'fa-solid' : 'fa-regular'} fa-heart"></i>
                    </button>
                    <img src="${product.image}" alt="${product.name}" loading="lazy">
                </div>
                <div class="product-details">
                    <div>
                        <span class="product-category">${product.category}</span>
                        <h3 class="product-title">${product.name}</h3>
                        <div class="product-rating">
                            ${getStarRating(product.rating)} <span>(${product.rating})</span>
                        </div>
                    </div>
                    <div>
                        <div class="product-pricing">
                            <span class="current-price">₹${product.price.toLocaleString()}</span>
                            <span class="original-price">₹${product.originalPrice.toLocaleString()}</span>
                        </div>
                        <button class="add-to-cart-btn" onclick="addToCart(${product.id})">
                            <i class="fa-solid fa-bag-shopping"></i> Add to Bag
                        </button>
                    </div>
                </div>
            </div>
        `;
    }).join('');
}

// Star Rating Generator
function getStarRating(rating) {
    let stars = '';
    for (let i = 1; i <= 5; i++) {
        if (i <= Math.floor(rating)) {
            stars += '<i class="fa-solid fa-star"></i>';
        } else if (i === Math.ceil(rating) && rating % 1 !== 0) {
            stars += '<i class="fa-solid fa-star-half-stroke"></i>';
        } else {
            stars += '<i class="fa-regular fa-star"></i>';
        }
    }
    return stars;
}

// Category Filtering (Tabs)
tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        tabBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const filter = btn.getAttribute('data-filter');
        if (filter === 'all') {
            displayProducts(products);
        } else {
            const filtered = products.filter(p => p.category === filter);
            displayProducts(filtered);
        }
    });
});

// Category Cards Filter Integration
filterBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const filter = btn.getAttribute('data-filter');
        const trendingSection = document.getElementById('trending');
        trendingSection.scrollIntoView({ behavior: 'smooth' });
        
        tabBtns.forEach(b => {
            if (b.getAttribute('data-filter') === filter) {
                b.click();
            }
        });
    });
});

// Search Functionality
function handleSearch() {
    const query = searchInput.value.toLowerCase().trim();
    if (!query) {
        displayProducts(products);
        return;
    }
    const filtered = products.filter(p => 
        p.name.toLowerCase().includes(query) || 
        p.category.toLowerCase().includes(query)
    );
    displayProducts(filtered);
    document.getElementById('trending').scrollIntoView({ behavior: 'smooth' });
}

searchBtn.addEventListener('click', handleSearch);
searchInput.addEventListener('keyup', (e) => {
    if (e.key === 'Enter') {
        handleSearch();
    }
});

// Add to Cart
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const existingItem = cart.find(item => item.id === productId);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }

    saveCart();
    updateCartUI();
    showToast(`${product.name} added to cart!`);
}

// Update Cart UI & LocalStorage
function saveCart() {
    localStorage.setItem('aura_cart', JSON.stringify(cart));
}

function updateCartUI() {
    const totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalCount;
    cartBagCount.textContent = totalCount;

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = `
            <div class="empty-state">
                <i class="fa-solid fa-bag-shopping"></i>
                <p>Your shopping bag is empty.</p>
            </div>
        `;
        cartTotalPrice.textContent = '₹0';
        return;
    }

    cartItemsContainer.innerHTML = cart.map(item => `
        <div class="cart-item">
            <img src="${item.image}" alt="${item.name}">
            <div class="cart-item-details">
                <h4 class="cart-item-title">${item.name}</h4>
                <div class="cart-item-price">₹${item.price.toLocaleString()}</div>
                <div class="quantity-controls">
                    <button class="qty-btn" onclick="updateQuantity(${item.id}, -1)">-</button>
                    <span>${item.quantity}</span>
                    <button class="qty-btn" onclick="updateQuantity(${item.id}, 1)">+</button>
                </div>
            </div>
            <button class="remove-item" onclick="removeFromCart(${item.id})"><i class="fa-solid fa-trash-can"></i></button>
        </div>
    `).join('');

    const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    cartTotalPrice.textContent = `₹${totalPrice.toLocaleString()}`;
}

function updateQuantity(productId, change) {
    const item = cart.find(i => i.id === productId);
    if (item) {
        item.quantity += change;
        if (item.quantity <= 0) {
            cart = cart.filter(i => i.id !== productId);
        }
        saveCart();
        updateCartUI();
    }
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    saveCart();
    updateCartUI();
}

// Wishlist Functionality
function toggleWishlist(productId) {
    const product = products.find(p => p.id === productId);
    const index = wishlist.findIndex(item => item.id === productId);

    if (index > -1) {
        wishlist.splice(index, 1);
        showToast(`${product.name} removed from wishlist.`);
    } else {
        wishlist.push(product);
        showToast(`${product.name} added to wishlist!`);
    }

    localStorage.setItem('aura_wishlist', JSON.stringify(wishlist));
    updateWishlistUI();
    displayProducts(products);
}

function updateWishlistUI() {
    wishlistCount.textContent = wishlist.length;
    wishlistBagCount.textContent = wishlist.length;

    if (wishlist.length === 0) {
        wishlistItemsContainer.innerHTML = `
            <div class="empty-state">
                <i class="fa-regular fa-heart"></i>
                <p>Your wishlist is empty.</p>
            </div>
        `;
        return;
    }

    wishlistItemsContainer.innerHTML = wishlist.map(item => `
        <div class="cart-item">
            <img src="${item.image}" alt="${item.name}">
            <div class="cart-item-details">
                <h4 class="cart-item-title">${item.name}</h4>
                <div class="cart-item-price">₹${item.price.toLocaleString()}</div>
            </div>
            <button class="add-to-cart-btn" style="padding: 6px 12px; font-size: 0.8rem;" onclick="moveToCart(${item.id})">Move to Bag</button>
            <button class="remove-item" onclick="toggleWishlist(${item.id})"><i class="fa-solid fa-trash-can"></i></button>
        </div>
    `).join('');
}

function moveToCart(productId) {
    addToCart(productId);
    toggleWishlist(productId);
}

// Side Drawers Toggle
cartToggleBtn.addEventListener('click', () => {
    cartDrawer.classList.add('active');
    cartOverlay.classList.add('active');
});

closeCart.addEventListener('click', () => {
    cartDrawer.classList.remove('active');
    cartOverlay.classList.remove('active');
});

cartOverlay.addEventListener('click', () => {
    cartDrawer.classList.remove('active');
    wishlistDrawer.classList.remove('active');
    cartOverlay.classList.remove('active');
    wishlistOverlay.classList.remove('active');
});

wishlistToggleBtn.addEventListener('click', () => {
    wishlistDrawer.classList.add('active');
    wishlistOverlay.classList.add('active');
});

closeWishlist.addEventListener('click', () => {
    wishlistDrawer.classList.remove('active');
    wishlistOverlay.classList.remove('active');
});

// Checkout Simulation
checkoutBtn.addEventListener('click', () => {
    if (cart.length === 0) {
        alert('Your shopping bag is empty!');
        return;
    }
    alert('🎉 Thank you for shopping with AURA FASHION! Your Diwali order has been successfully placed.');
    cart = [];
    saveCart();
    updateCartUI();
    cartDrawer.classList.remove('active');
    cartOverlay.classList.remove('active');
});

// Toast Notification Helper
function showToast(message) {
    const toast = document.createElement('div');
    toast.textContent = message;
    toast.style.position = 'fixed';
    toast.style.bottom = '30px';
    toast.style.left = '50%';
    toast.style.transform = 'translateX(-50%)';
    toast.style.backgroundColor = 'var(--primary-dark)';
    toast.style.color = 'var(--gold)';
    toast.style.padding = '12px 24px';
    toast.style.borderRadius = '30px';
    toast.style.boxShadow = '0 5px 20px rgba(0,0,0,0.3)';
    toast.style.zIndex = '3000';
    toast.style.fontWeight = '600';
    toast.style.fontSize = '0.95rem';
    toast.style.border = '1px solid var(--gold)';

    document.body.appendChild(toast);
    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transition = 'opacity 0.5s ease';
        setTimeout(() => toast.remove(), 500);
    }, 2500);
}

// Diwali Countdown Timer (Target: November 8, 2026)
function initCountdown() {
    const targetDate = new Date('November 8, 2026 23:59:59').getTime();

    const timer = setInterval(() => {
        const now = new Date().getTime();
        const distance = targetDate - now;

        if (distance < 0) {
            clearInterval(timer);
            document.getElementById('days').textContent = '00';
            document.getElementById('hours').textContent = '00';
            document.getElementById('minutes').textContent = '00';
            document.getElementById('seconds').textContent = '00';
            document.getElementById('countdownMessage').textContent = '✨ Diwali Mega Sale Has Concluded! Thank You! ✨';
            return;
        }

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        document.getElementById('days').textContent = String(days).padStart(2, '0');
        document.getElementById('hours').textContent = String(hours).padStart(2, '0');
        document.getElementById('minutes').textContent = String(minutes).padStart(2, '0');
        document.getElementById('seconds').textContent = String(seconds).padStart(2, '0');
    }, 1000);
}

// Newsletter Email Validation
newsletterForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = newsletterEmail.value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (emailRegex.test(email)) {
        newsletterMessage.style.color = 'var(--gold)';
        newsletterMessage.textContent = '🎉 Thank you for subscribing! Check your inbox for your 10% off code.';
        newsletterEmail.value = '';
    } else {
        newsletterMessage.style.color = '#ff6b6b';
        newsletterMessage.textContent = '⚠️ Please enter a valid email address.';
    }
});

// Back to Top Button
window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
        backToTop.classList.add('active');
    } else {
        backToTop.classList.remove('active');
    }
});

backToTop.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});