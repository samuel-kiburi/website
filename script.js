// Shopping Cart Data
let cart = JSON.parse(localStorage.getItem('shopZoneCart')) || [];
let products = [
    // Electronics (15 products)
    { id: 1, name: "Studio Headphones", price: 3299, category: "electronics", image: 'akg.JPEG', description: "Immersive sound with active noise cancellation." },
    { id: 2, name: "Smart Fitness Watch", price: 12999, category: "electronics", image: "https://picsum.photos/id/2/150/150", description: "Track your health and fitness goals with style." },
    { id: 3, name: "Waterproof Party Speaker", price: 4999, category: "electronics", image: "https://picsum.photos/id/3/150/150", description: "Big sound for any occasion, with RGB lights." },
    { id: 4, name: "OLED Smart TV", price: 69999, category: "electronics", image: "https://picsum.photos/id/4/150/150", description: "Stunning 65-inch OLED display with smart features." },
    { id: 5, name: "Gaming Ultrabook", price: 79999, category: "electronics", image: "https://picsum.photos/id/5/150/150", description: "Lightweight and powerful for professionals on the go." },
    { id: 6, name: "Wireless Mechanical Keyboard", price: 5599, category: "electronics", image: "https://picsum.photos/id/6/150/150", description: "Mechanical keyboard with customizable RGB lighting." },
    { id: 7, name: "Vertical Ergonomic Mouse", price: 2499, category: "electronics", image: "https://picsum.photos/id/7/150/150", description: "Designed for comfort and precision." },
    { id: 8, name: "Thunderbolt Docking Station", price: 2999, category: "electronics", image: "https://picsum.photos/id/8/150/150", description: "Expand your connectivity with this versatile adapter." },
    { id: 9, name: "Solar Power Bank", price: 2999, category: "electronics", image: "https://picsum.photos/id/9/150/150", description: "Charge your devices anywhere, anytime with solar power." },
    { id: 10, name: "4K Action Camera", price: 8999, category: "electronics", image: "https://picsum.photos/id/10/150/150", description: "Capture smooth, professional-quality videos of your adventures." },
    { id: 11, name: "Racing Drone", price: 34999, category: "electronics", image: "https://picsum.photos/id/11/150/150", description: "Experience high-speed FPV drone racing." },
    { id: 12, name: "Augmented Reality Glasses", price: 21999, category: "electronics", image: "https://picsum.photos/id/12/150/150", description: "Overlay digital information onto the real world." },
    { id: 13, name: "Compact Mirrorless Camera", price: 45999, category: "electronics", image: "https://picsum.photos/id/13/150/150", description: "Unleash your creativity with this powerful compact camera." },
    { id: 14, name: "Smart Reusable Notebook", price: 11999, category: "electronics", image: "https://picsum.photos/id/14/150/150", description: "Digitize your notes and reuse the pages." },
    { id: 15, name: "Smart Doorbell", price: 7999, category: "electronics", image: "https://picsum.photos/id/15/150/150", description: "See and speak to visitors from anywhere." },

    // Fashion (15 products)
    { id: 26, name: "Vintage Band T-Shirt", price: 1299, category: "fashion", image: "https://picsum.photos/id/26/150/150", description: "Express yourself with this unique graphic tee." },
    { id: 27, name: "High-Top Canvas Sneakers", price: 5599, category: "fashion", image: "https://picsum.photos/id/27/150/150", description: "The perfect blend of comfort and street style." },
    { id: 28, name: "Relaxed Fit Jeans", price: 3299, category: "fashion", image: "https://picsum.photos/id/28/150/150", description: "A modern take on a timeless classic." },
    { id: 29, name: "Denim Trucker Jacket", price: 7999, category: "fashion", image: "https://picsum.photos/id/29/150/150", description: "Add an edge to your look with this biker jacket." },
    { id: 30, name: "Linen Summer Dress", price: 3499, category: "fashion", image: "https://picsum.photos/id/30/150/150", description: "Effortlessly elegant for any occasion." },
    { id: 31, name: "Oxford Button-Down Shirt", price: 2499, category: "fashion", image: "https://picsum.photos/id/31/150/150", description: "Stay cool and stylish in this breathable shirt." },
    { id: 32, name: "Slim-Fit Chinos", price: 3199, category: "fashion", image: "https://picsum.photos/id/32/150/150", description: "Sharp and versatile for work or weekend." },
    { id: 33, "name": "Merino Wool Scarf", "price": 1899, "category": "fashion", "image": "https://picsum.photos/id/33/150/150", "description": "Luxuriously soft and warm." },
    { id: 34, "name": "Round Frame Sunglasses", "price": 2199, "category": "fashion", "image": "https://picsum.photos/id/34/150/150", "description": "Classic style with modern lens technology." },
    { id: 35, "name": "Woven Fabric Belt", "price": 1499, "category": "fashion", "image": "https://picsum.photos/id/35/150/150", "description": "A casual and stylish belt for any outfit." },
    { id: 36, "name": "Leather Hiking Boots", "price": 5999, "category": "fashion", "image": "https://picsum.photos/id/36/150/150", "description": "A timeless addition to any wardrobe." },
    { id: 37, "name": "Zip-Up Hoodie", "price": 3499, "category": "fashion", "image": "https://picsum.photos/id/37/150/150", "description": "The ultimate in comfort and casual style." },
    { id: 38, "name": "Long-Sleeve Polo", "price": 1999, "category": "fashion", "image": "https://picsum.photos/id/38/150/150", "description": "Moisture-wicking fabric to keep you cool." },
    { id: 39, "name": "Leather Messenger Bag", "price": 2899, "category": "fashion", "image": "https://picsum.photos/id/39/150/150", "description": "Sleek and functional for your daily commute." },
    { id: 40, "name": "Digital Sports Watch", "price": 8999, "category": "fashion", "image": "https://picsum.photos/id/40/150/150", "description": "Understated elegance for the modern individual." }
];

// Initialize page
document.addEventListener('DOMContentLoaded', function() {
    updateCartCount();
    if (window.location.pathname.includes('products.html')) {
        displayProducts();
    }
    if (window.location.pathname.includes('cart.html')) {
        displayCart();
    }
    if (window.location.pathname.includes('checkout.html')) {
        displayOrderSummary();
    }
    if (window.location.pathname.includes('home.html')) {
        displayFeaturedProducts();
    }
});

// Update cart count in navigation
function updateCartCount() {
    const cartCountElements = document.querySelectorAll('#cart-count');
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCountElements.forEach(element => {
        element.textContent = totalItems;
    });
}

// Display featured products on home page
function displayFeaturedProducts() {
    const featuredGrid = document.getElementById('featuredProductsGrid');
    if (!featuredGrid) return;

    featuredGrid.innerHTML = '';

    // Display the first 4 products as featured
    const featuredProducts = products.slice(0, 4);

    featuredProducts.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.innerHTML = `
            <div class="product-image"><img src="${product.image}" alt="${product.name}"></div>
            <div class="product-info">
                <div class="product-title">${product.name}</div>
                <div class="product-price">KSh ${product.price.toLocaleString()}</div>
                <button onclick="addToCart(${product.id})" class="btn btn-primary" style="width: 100%;">Add to Cart</button>
            </div>
        `;
        featuredGrid.appendChild(productCard);
    });
}

// Display products on products page
function displayProducts() {
    const productsGrid = document.getElementById('productsGrid');
    if (!productsGrid) return;

    productsGrid.innerHTML = '';

    products.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.innerHTML = `
            <div class="product-image"><img src="${product.image}" alt="${product.name}"></div>
            <div class="product-info">
                <div class="product-title">${product.name}</div>
                <div class="product-price">KSh ${product.price.toLocaleString()}</div>
                <div class="product-description">${product.description}</div>
                <button onclick="addToCart(${product.id})" class="btn btn-primary" style="width: 100%;">Add to Cart</button>
            </div>
        `;
        productsGrid.appendChild(productCard);
    });
}

// Add item to cart
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    const existingItem = cart.find(item => item.id === productId);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            quantity: 1
        });
    }

    saveCart();
    updateCartCount();
    showNotification(`${product.name} added to cart!`);
}

// Save cart to localStorage
function saveCart() {
    localStorage.setItem('shopZoneCart', JSON.stringify(cart));
}

// Display cart items
function displayCart() {
    const cartItems = document.getElementById('cartItems');
    const emptyCart = document.getElementById('emptyCart');
    const cartSummary = document.getElementById('cartSummary');

    if (!cartItems || !emptyCart || !cartSummary) return;

    if (cart.length === 0) {
        cartItems.style.display = 'none';
        emptyCart.style.display = 'block';
        cartSummary.style.display = 'none';
        return;
    }

    cartItems.innerHTML = '';
    let subtotal = 0;

    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        subtotal += itemTotal;

        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.innerHTML = `
            <div class="cart-item-info">
                <div class="cart-item-title">${item.name}</div>
                <div class="cart-item-price">KSh ${item.price.toLocaleString()}</div>
            </div>
            <div class="cart-item-controls">
                <button onclick="updateQuantity(${item.id}, ${item.quantity - 1})" class="quantity-btn">-</button>
                <span style="margin: 0 1rem; font-weight: bold;">${item.quantity}</span>
                <button onclick="updateQuantity(${item.id}, ${item.quantity + 1})" class="quantity-btn">+</button>
                <button onclick="removeFromCart(${item.id})" class="remove-btn">Remove</button>
            </div>
        `;
        cartItems.appendChild(cartItem);
    });

    const shipping = subtotal > 5000 ? 0 : 299;
    const total = subtotal + shipping;

    document.getElementById('subtotal').textContent = `KSh ${subtotal.toLocaleString()}`;
    document.getElementById('shipping').textContent = shipping === 0 ? 'Free' : `KSh ${shipping.toLocaleString()}`;
    document.getElementById('total').textContent = `KSh ${total.toLocaleString()}`;

    cartItems.style.display = 'block';
    emptyCart.style.display = 'none';
    cartSummary.style.display = 'block';
}

// Update item quantity in cart
function updateQuantity(productId, newQuantity) {
    if (newQuantity <= 0) {
        removeFromCart(productId);
        return;
    }

    const item = cart.find(item => item.id === productId);
    if (item) {
        item.quantity = newQuantity;
        saveCart();
        displayCart();
        updateCartCount();
    }
}

// Remove item from cart
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    saveCart();
    displayCart();
    updateCartCount();
    showNotification('Item removed from cart');
}

// Display order summary on checkout
function displayOrderSummary() {
    const orderItems = document.getElementById('orderItems');
    const finalTotal = document.getElementById('finalTotal');
    const amountInput = document.getElementById('amount');

    if (!orderItems || !finalTotal || !amountInput) return;

    if (cart.length === 0) {
        window.location.href = 'cart.html';
        return;
    }

    let subtotal = 0;
    orderItems.innerHTML = '';

    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        subtotal += itemTotal;

        const orderItem = document.createElement('div');
        orderItem.style.cssText = 'display: flex; justify-content: space-between; align-items: center; margin: 0.5rem 0;';
        orderItem.innerHTML = `
            <span style="display: flex; align-items: center;">
                ${item.name} (x${item.quantity})</span>
            <span>KSh ${itemTotal.toLocaleString()}</span>
        `;
        orderItems.appendChild(orderItem);
    });

    const shipping = subtotal > 5000 ? 0 : 299;
    const total = subtotal + shipping;

    finalTotal.textContent = `KSh ${total.toLocaleString()}`;
    amountInput.value = `KSh ${total.toLocaleString()}`;
}

// Search and filter products
function applyFiltersAndSearch() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    const category = document.getElementById('categoryFilter').value;

    let filteredProducts = products;

    // Apply category filter first
    if (category) {
        filteredProducts = filteredProducts.filter(product => product.category === category);
    }

    // Then apply search term filter on the result
    if (searchTerm) {
        filteredProducts = filteredProducts.filter(product =>
            product.name.toLowerCase().includes(searchTerm) ||
            product.description.toLowerCase().includes(searchTerm)
        );
    }

    displayFilteredProducts(filteredProducts);
}

// Display filtered products
function displayFilteredProducts(filteredProducts) {
    const productsGrid = document.getElementById('productsGrid');
    if (!productsGrid) return;

    productsGrid.innerHTML = '';

    if (filteredProducts.length === 0) {
        productsGrid.innerHTML = '<div style="text-align: center; padding: 3rem; grid-column: 1 / -1;"><h3>No products found</h3><p>Try adjusting your search or filter criteria</p></div>';
        return;
    }

    filteredProducts.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.innerHTML = `
            <div class="product-image"><img src="${product.image}" alt="${product.name}"></div>
            <div class="product-info">
                <div class="product-title">${product.name}</div>
                <div class="product-price">KSh ${product.price.toLocaleString()}</div>
                <div class="product-description">${product.description}</div>
                <button onclick="addToCart(${product.id})" class="btn btn-primary" style="width: 100%;">Add to Cart</button>
            </div>
        `;
        productsGrid.appendChild(productCard);
    });
}

// Form validation functions
function validateRegistration() {
    // Clear previous errors
    document.getElementById('phoneError').textContent = '';
    document.getElementById('passwordError').textContent = '';
    document.getElementById('confirmPasswordError').textContent = '';
    document.getElementById('termsError').textContent = '';

    let isValid = true;

    const phone = document.getElementById('phone').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    const terms = document.getElementById('terms').checked;

    // Phone validation
    if (!phone.match(/^0[17][0-9]{8}$/)) {
        document.getElementById('phoneError').textContent = 'Please enter a valid phone number (e.g., 0712345678).';
        isValid = false;
    }

    // Password length validation
    if (password.length < 6) {
        document.getElementById('passwordError').textContent = 'Password must be at least 6 characters long.';
        isValid = false;
    }

    // Password match validation
    if (password !== confirmPassword) {
        document.getElementById('confirmPasswordError').textContent = 'Passwords do not match.';
        isValid = false;
    }

    // Terms and conditions validation
    if (!terms) {
        document.getElementById('termsError').textContent = 'You must agree to the terms and conditions.';
        isValid = false;
    }

    if (isValid) {
        showNotification('Registration successful! You can now login.');
        // In a real app, you would redirect or automatically log in the user.
        // For this demo, we'll just clear the form.
        document.getElementById('registrationForm').reset();
    }
    
    // Prevent form submission to stop page reload
    return false; 
}

function validateLogin() {
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;

    // Simple validation for demo
    if (email && password) {
        alert('Login successful! Redirecting to products...');
        window.location.href = 'products.html';
        return false;
    } else {
        alert('Please enter both email and password!');
        return false;
    }
}

// M-Pesa payment processing
function processMpesaPayment() {
    const phone = document.getElementById('mpesaPhone').value;
    const amount = document.getElementById('amount').value;

    if (!phone.match(/^0[17][0-9]{8}$/)) {
        alert('Please enter a valid M-Pesa phone number!');
        return false;
    }

    // Simulate M-Pesa payment process
    alert(`Processing M-Pesa payment of ${amount} to ${phone}...\n\nIn a real implementation, this would:\n1. Generate STK push\n2. Send to customer's phone\n3. Wait for confirmation\n4. Process payment`);

    return false; // Prevent form submission for demo
}

// Complete order
function completeOrder() {
    const shippingForm = document.getElementById('shippingForm');
    const mpesaForm = document.getElementById('mpesaForm');

    if (shippingForm.checkValidity() && mpesaForm.checkValidity()) {
        alert('Order completed successfully!\n\nThank you for shopping with ShopZone.\nYour order will be processed and you will receive a confirmation message.');
        // Clear cart after successful order
        cart = [];
        saveCart();
        updateCartCount();
    } else {
        alert('Please fill in all required fields!');
    }
}

// Show notification
function showNotification(message) {
    // Create notification element
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background-color: #28a745;
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 5px;
        box-shadow: 0 5px 15px rgba(0,0,0,0.2);
        z-index: 1000;
        animation: slideIn 0.3s ease;
    `;
    notification.textContent = message;

    document.body.appendChild(notification);

    // Remove notification after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    @keyframes slideOut {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
`;
document.head.appendChild(style);
