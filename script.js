// Mobile menu toggle
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const navbar = document.getElementById('navbar');

mobileMenuBtn.addEventListener('click', () => {
    navbar.classList.toggle('active');
});

// Search functionality
const searchBar = document.getElementById('search-bar');
const searchButton = document.getElementById('search-button');

searchButton.addEventListener('click', () => {
    const searchTerm = searchBar.value.trim().toLowerCase();
    // Implement search functionality here
    console.log(`Searching for: ${searchTerm}`);
    // You would typically send this to your backend or filter products client-side
});

// Add to cart functionality
const addToCartButtons = document.querySelectorAll('.add-to-cart');

addToCartButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        const product = e.target.closest('.product-card');
        const productName = product.querySelector('h3').textContent;
        const productPrice = product.querySelector('.price').textContent;
        
        addToCart(productName, productPrice);
    });
});

function addToCart(name, price) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.push({ name, price });
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    console.log(`Added to cart: ${name} - ${price}`);
}

function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartLink = document.querySelector('a[href="cart.html"]');
    cartLink.textContent = `Cart (${cart.length})`;
}

// Initialize cart count on page load
updateCartCount();

// Form validation
const forms = document.querySelectorAll('form');

forms.forEach(form => {
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        if (validateForm(form)) {
            console.log('Form submitted successfully');
            // You would typically send this data to your backend
            form.reset();
        }
    });
});

function validateForm(form) {
    let isValid = true;
    const inputs = form.querySelectorAll('input, textarea');

    inputs.forEach(input => {
        if (input.hasAttribute('required') && !input.value.trim()) {
            isValid = false;
            showError(input, 'This field is required');
        } else if (input.type === 'email' && !isValidEmail(input.value)) {
            isValid = false;
            showError(input, 'Please enter a valid email address');
        } else {
            clearError(input);
        }
    });

    return isValid;
}

function showError(input, message) {
    const errorElement = input.nextElementSibling;
    if (errorElement && errorElement.classList.contains('error-message')) {
        errorElement.textContent = message;
    } else {
        const error = document.createElement('div');
        error.className = 'error-message';
        error.textContent = message;
        input.parentNode.insertBefore(error, input.nextSibling);
    }
    input.classList.add('error');
}

function clearError(input) {
    const errorElement = input.nextElementSibling;
    if (errorElement && errorElement.classList.contains('error-message')) {
        errorElement.remove();
    }
    input.classList.remove('error');
}

function isValidEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Cart page functionality
if (window.location.pathname.includes('cart.html')) {
    displayCartItems();
}

function displayCartItems() {
    const cartItemsContainer = document.getElementById('cart-items');
    const cart = JSON.parse(localStorage.getItem('cart')) || [];

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p>Your cart is empty.</p>';
        return;
    }

    let cartHTML = '';
    let total = 0;

    cart.forEach((item, index) => {
        const itemTotal = parseFloat(item.price.replace('$', ''));
        total += itemTotal;
        cartHTML += `
            <div class="cart-item">
                <span>${item.name}</span>
                <span>${item.price}</span>
                <button onclick="removeFromCart(${index})">Remove</button>
            </div>
        `;
    });

    cartItemsContainer.innerHTML = cartHTML;
    document.getElementById('subtotal').textContent = `$${total.toFixed(2)}`;
    // You would calculate shipping and tax here
    document.getElementById('total').textContent = `$${total.toFixed(2)}`;
}

function removeFromCart(index) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    displayCartItems();
    updateCartCount();
}

// Checkout button
const checkoutButton = document.getElementById('checkout-button');
if (checkoutButton) {
    checkoutButton.addEventListener('click', () => {
        console.log('Proceeding to checkout');
        // Implement checkout logic here
    });
}
