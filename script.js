
// Add your JavaScript functions here

var cart = [];

function initializePage() {
    updateCartCount();
}

function addToCart(productName, price, quantity) {
    var existingProduct = cart.find(p => p.name === productName);

    if (existingProduct) {
        existingProduct.quantity += quantity;
    } else {
        cart.push({ name: productName, price: price, quantity: quantity });
    }

    updateCartCount();
    displayCartDetails();
}

function buyNow(productName, price) {
    addToCart(productName, price, 1);
}

function updateCartCount() {
    var cartCountElement = document.getElementById('cart-count');
    cartCountElement.innerText = cart.reduce((total, product) => total + product.quantity, 0);
}

function displayCartDetails() {
    var cartDetailsElement = document.getElementById('cart-details');
    var cartTotalElement = document.getElementById('cart-total-modal');
    var total = 0;

    cartDetailsElement.innerHTML = '';

    cart.forEach(function (product) {
        var itemDetails = document.createElement('p');
        itemDetails.textContent = `${product.name} x ${product.quantity} - $${(product.price * product.quantity).toFixed(2)}`;
        cartDetailsElement.appendChild(itemDetails);
        total += product.price * product.quantity;
    });

    cartTotalElement.innerText = 'Total: $' + total.toFixed(2);

    // Show/hide place order button based on cart items
    var placeOrderButton = document.querySelector('.order-confirm-button');
    placeOrderButton.style.display = cart.length > 0 ? 'block' : 'none';
}

function openCart() {
    var cartModal = document.getElementById('cart-modal');
    cartModal.style.display = 'flex';
    displayCartDetails();
}

function closeCart() {
    var cartModal = document.getElementById('cart-modal');
    cartModal.style.display = 'none';
}

function showShoppingForm() {
    // Check if the cart is not empty before showing the shopping form
    if (cart.length > 0) {
        var shoppingForm = document.getElementById('shopping-form');
        shoppingForm.style.display = 'flex';
    }
}

function closeShoppingForm() {
    var shoppingForm = document.getElementById('shopping-form');
    shoppingForm.style.display = 'none';
}

function toggleCardDetails() {
    var paymentMethod = document.getElementById('payment').value;
    var cardDetails = document.getElementById('card-details');

    if (paymentMethod === 'card') {
        cardDetails.style.display = 'block';
    } else {
        cardDetails.style.display = 'none';
    }
}

function confirmOrder() {
    var deliveryDate = calculateDeliveryDate();
    var trackingAddress = generateTrackingAddress();

    document.getElementById('delivery-date').innerText = deliveryDate;
    document.getElementById('tracking-address').innerText = trackingAddress;

    var shoppingForm = document.getElementById('shopping-form');
    shoppingForm.style.display = 'none';

    var cartModal = document.getElementById('cart-modal');
    cartModal.style.display = 'none';

    var orderConfirmationModal = document.getElementById('order-confirmation-modal');
    orderConfirmationModal.style.display = 'flex';

    // Clear the cart after confirming the order
    cart = [];
    updateCartCount();
}

function closeOrderConfirmation() {
    var orderConfirmationModal = document.getElementById('order-confirmation-modal');
    orderConfirmationModal.style.display = 'none';
}

function calculateDeliveryDate() {
    var currentDate = new Date();
    var deliveryDate = new Date(currentDate.setDate(currentDate.getDate() + 3));
    var options = { year: 'numeric', month: 'long', day: 'numeric' };
    return deliveryDate.toLocaleDateString('en-US', options);
}

function generateTrackingAddress() {
    return Math.floor(Math.random() * 1000000);
}

initializePage();
