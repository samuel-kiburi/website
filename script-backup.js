// Shopping Cart Data
let cart = JSON.parse(localStorage.getItem('techtrendsZoneCart')) || [];
let products = [
    {
        id: 1,
        name: "Wireless Bluetooth Headphones",
        price: 2999,
        category: "electronics",
        image: "🎧",
        description: "High-quality wireless headphones with noise cancellation"
    },
    {
        id: 2,
        name: "Smart Watch Series X",
        price: 15999,
        category: "electronics",
        image: "⌚",
        description: "Advanced smartwatch with health monitoring features"
    },
    {
        id: 3,
        name: "Cotton T-Shirt",
        price: 899,
        category: "fashion",
        image: "👕",
        description: "Comfortable 100% cotton t-shirt in multiple colors"
    },
    {
        id: 4,
        name: "Running Sneakers",
        price: 4599,
        category: "fashion",
        image: "👟",
        description: "Lightweight running shoes with superior comfort"
    },
    {
        id: 5,
        name: "Coffee Maker Deluxe",
        price: 8999,
        category: "home",
        image: "☕",
        description: "Programmable coffee maker with thermal carafe"
    },
    {
        id: 6,
        name: "Yoga Mat Premium",
        price: 2499,
        category: "sports",
        image: "🧘",
        description: "Non-slip premium yoga mat for all fitness levels"
    },
    {
        id: 7,
        name: "Bluetooth Speaker",
        price: 3499,
        category: "electronics",
        image: "🔊",
        description: "Portable Bluetooth speaker with 360° sound"
    },
    {
        id: 8,
        name: "Denim Jeans",
        price: 2299,
        category: "fashion",
        image: "👖",
        description: "Classic fit denim jeans in dark wash"
    }
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
});

// Update cart count in navigation
function updateCartCount() {
    const cartCountElements = document.querySelectorAll('#cart-count');
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCountElements.forEach(element => {
        element.textContent = totalItems;
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
            <div class="product-image">${product.image}</div>
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
    localStorage.setItem('techtrendsZoneCart', JSON.stringify(cart));
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
            <div class="cart-item-image">${item.image}</div>
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
        orderItem.style.cssText = 'display: flex; justify-content: space-between; margin: 0.5rem 0;';
        orderItem.innerHTML = `
            <span>${item.name} (x${item.quantity})</span>
            <span>KSh ${itemTotal.toLocaleString()}</span>
        `;
        orderItems.appendChild(orderItem);
    });

    const shipping = subtotal > 5000 ? 0 : 299;
    const total = subtotal + shipping;

    finalTotal.textContent = `KSh ${total.toLocaleString()}`;
    amountInput.value = `KSh ${total.toLocaleString()}`;
}

// Search products
function searchProducts() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    const productsGrid = document.getElementById('productsGrid');

    if (!productsGrid) return;

    const filteredProducts = products.filter(product =>
        product.name.toLowerCase().includes(searchTerm) ||
        product.description.toLowerCase().includes(searchTerm)
    );

    displayFilteredProducts(filteredProducts);
}

// Filter products by category
function filterProducts() {
    const category = document.getElementById('categoryFilter').value;
    const productsGrid = document.getElementById('productsGrid');

    if (!productsGrid) return;

    let filteredProducts = products;

    if (category) {
        filteredProducts = products.filter(product => product.category === category);
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
            <div class="product-image">${product.image}</div>
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
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    const phone = document.getElementById('phone').value;

    if (password !== confirmPassword) {
        alert('Passwords do not match!');
        return false;
    }

    if (password.length < 6) {
        alert('Password must be at least 6 characters long!');
        return false;
    }

    if (!phone.match(/^0[17][0-9]{8}$/)) {
        alert('Please enter a valid phone number (0712345678 or 0112345678)');
        return false;
    }

    alert('Registration successful! You can now login.');
    return true;
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
        alert('Order completed successfully!\n\nThank you for shopping with TECHTRENDS ZONE.\nYour order will be processed and you will receive a confirmation message.');
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
