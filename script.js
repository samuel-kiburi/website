// Shopping Cart Data
let cart = JSON.parse(localStorage.getItem('techtrendsZoneCart')) || [];
let products = [
 // Electronics (15 products)
 { id: 1, name: "Studio Headphones", price: 3299, category: "electronics", image: 'akg.JPEG', description: "Immersive sound with active noise cancellation." },
 { id: 2, name: "Smart Fitness Watch", price: 12999, category: "electronics", image: "aka.JPEG", description: "Track your health and fitness goals with style." },
 { id: 3, name: "Waterproof Party Speaker", price: 4999, category: "electronics", image: "akb.JPEG", description: "Big sound for any occasion, with RGB lights." },
 { id: 4, name: "OLED Smart TV", price: 69999, category: "electronics", image: "akc.JPEG", description: "Stunning 65-inch OLED display with smart features." },
 { id: 5, name: "Gaming Ultrabook", price: 79999, category: "electronics", image: "akd.JPEG", description: "Lightweight and powerful for professionals on the go." },
 { id: 6, name: "Wireless Mechanical Keyboard", price: 5599, category: "electronics", image: "ake.JPEG", description: "Mechanical keyboard with customizable RGB lighting." },
 { id: 7, name: "Vertical Ergonomic Mouse", price: 2499, category: "electronics", image: "akf.JPEG", description: "Designed for comfort and precision." },
 { id: 8, name: "Thunderbolt Docking Station", price: 2999, category: "electronics", image: "akh.JPEG", description: "Expand your connectivity with this versatile adapter." },
 { id: 9, name: "Solar Power Bank", price: 2999, category: "electronics", image: "aki.JPEG", description: "Charge your devices anywhere, anytime with solar power." },
 { id: 10, name: "4K Action Camera", price: 8999, category: "electronics", image: "akj.JPEG", description: "Capture smooth, professional-quality videos of your adventures." },
 { id: 11, name: "Racing Drone", price: 34999, category: "electronics", image: "akk.JPEG", description: "Experience high-speed FPV drone racing." },
 { id: 12, name: "Augmented Reality Glasses", price: 21999, category: "electronics", image: "akl.JPEG", description: "Overlay digital information onto the real world." },
 { id: 13, name: "Compact Mirrorless Camera", price: 45999, category: "electronics", image: "akm.JPEG", description: "Unleash your creativity with this powerful compact camera." },
 { id: 14, "name": "Smart Reusable Notebook", "price": 11999, "category": "electronics", "image": "akn.JPEG", "description": "Digitize your notes and reuse the pages." },
 { id: 15, name: "Smart Doorbell", price: 7999, category: "electronics", image: "ako.JPEG", description: "See and speak to visitors from anywhere." },

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
        // On the home page, if a user is logged in, they should be able to log out.
        // For this demo, we'll just clear the login status on visiting home.
        // In a real app, you'd have a dedicated logout button.
        if (localStorage.getItem('isLoggedIn')) {
            // localStorage.removeItem('isLoggedIn'); 
        }
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
            <div class="cart-item-image"><img src="${item.image}" alt="${item.name}" style="width: 100%; height: 100%; object-fit: cover;"></div>
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

    // Check if user is logged in before displaying checkout
    if (localStorage.getItem('isLoggedIn') !== 'true') {
        alert('You must be logged in to proceed to checkout.');
        window.location.href = 'login.html';
        return;
    }

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
                <img src="${item.image}" alt="${item.name}" style="width: 40px; height: 40px; object-fit: cover; margin-right: 10px; border-radius: 4px;">
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
        // Set a flag in localStorage to indicate the user is logged in
        localStorage.setItem('isLoggedIn', 'true');

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
