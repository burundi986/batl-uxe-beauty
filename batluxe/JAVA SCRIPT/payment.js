document.addEventListener('DOMContentLoaded', function() {
    // Get cart items from localStorage
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    const orderSummary = document.querySelector('.summary-items');
    const subtotalElement = document.querySelector('#subtotal-value');
    const taxElement = document.querySelector('#tax-value');
    const totalElement = document.querySelector('#order-total');
    const payButton = document.querySelector('#pay-amount');
    
    // Clear existing static items
    orderSummary.innerHTML = '';
    
    let subtotal = 0;
    
    if (cartItems.length === 0) {
        orderSummary.innerHTML = `
            <div class="empty-cart-message">
                <p>Your cart is empty</p>
                <a href="shop.html" class="btn">Continue Shopping</a>
            </div>
        `;
    } else {
        // Generate cart items HTML
        cartItems.forEach(item => {
            const itemTotal = item.price * item.quantity;
            subtotal += itemTotal;
            
            const itemElement = document.createElement('div');
            itemElement.className = 'summary-item';
            itemElement.innerHTML = `
                <div class="item-image">
                    <img src="${item.image}" alt="${item.name}" onerror="this.src='https://images.unsplash.com/photo-1583494939362-4c6b63b29e76?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80'">
                </div>
                <div class="item-info">
                    <div class="item-name">${item.name}</div>
                    <div class="item-details">Quantity: ${item.quantity}</div>
                </div>
                <div class="item-price">£${itemTotal.toFixed(2)}</div>
            `;
            orderSummary.appendChild(itemElement);
        });
    }
    
    // Calculate totals
    const shipping = 0.00;
    const tax = subtotal * 0.2; // 20% VAT
    const total = subtotal + tax;
    
    // Update display
    if (subtotalElement) subtotalElement.textContent = `£${subtotal.toFixed(2)}`;
    if (taxElement) taxElement.textContent = `£${tax.toFixed(2)}`;
    if (totalElement) totalElement.textContent = `£${total.toFixed(2)}`;
    if (payButton) payButton.textContent = `Pay £${total.toFixed(2)}`;
    
    // Update the payment button amount
    const paymentButton = document.querySelector('.payment-button span');
    if (paymentButton) {
        paymentButton.textContent = `Pay £${total.toFixed(2)}`;
    }
    
    // Payment method selection
    const paymentOptions = document.querySelectorAll('.payment-option');
    paymentOptions.forEach(option => {
        option.addEventListener('click', function() {
            paymentOptions.forEach(opt => opt.classList.remove('selected'));
            this.classList.add('selected');
        });
    });
    
    // Same as shipping toggle
    const sameAsShipping = document.getElementById('same-as-shipping');
    const billingForm = document.getElementById('billing-address-form');
    
    if (sameAsShipping && billingForm) {
        sameAsShipping.addEventListener('change', function() {
            billingForm.style.display = this.checked ? 'none' : 'block';
        });
    }
    
    // Card number formatting
    const cardNumber = document.getElementById('card-number');
    if (cardNumber) {
        cardNumber.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
            let formatted = value.match(/.{1,4}/g)?.join(' ') || '';
            e.target.value = formatted.substring(0, 19);
            
            // Update card preview
            const preview = document.getElementById('card-number-preview');
            if (preview) {
                preview.textContent = formatted || '•••• •••• •••• ••••';
            }
        });
    }
    
    // Card holder name preview
    const cardHolder = document.getElementById('card-holder');
    if (cardHolder) {
        cardHolder.addEventListener('input', function(e) {
            const preview = document.getElementById('card-holder-preview');
            if (preview) {
                preview.textContent = e.target.value || 'YOUR NAME';
            }
        });
    }
    
    // Expiry date formatting
    const cardExpiry = document.getElementById('card-expiry');
    if (cardExpiry) {
        cardExpiry.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\s+/g, '');
            if (value.length >= 2 && !value.includes('/')) {
                value = value.substring(0, 2) + '/' + value.substring(2);
            }
            e.target.value = value.substring(0, 5);
            
            const preview = document.getElementById('card-expiry-preview');
            if (preview) {
                preview.textContent = value || 'MM/YY';
            }
        });
    }
    
    // Apply promo code
    const applyPromo = document.getElementById('apply-promo');
    if (applyPromo) {
        applyPromo.addEventListener('click', function() {
            const promoCode = document.getElementById('promo-code').value;
            alert(`Promo code "${promoCode}" applied!`); // Replace with actual promo logic
        });
    }
    
    // Pay now button
    const payNowButton = document.getElementById('pay-now');
    if (payNowButton) {
        payNowButton.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Validate form
            if (!validatePaymentForm()) return;
            
            // Show success modal
            const successModal = document.getElementById('success-modal');
            if (successModal) {
                successModal.style.display = 'flex';
                
                // Clear cart after successful payment
                setTimeout(() => {
                    localStorage.removeItem('cartItems');
                }, 1000);
            }
        });
    }
    
    // Function to validate payment form
    function validatePaymentForm() {
        const selectedMethod = document.querySelector('.payment-option.selected').dataset.method;
        
        if (selectedMethod === 'card') {
            const cardNumber = document.getElementById('card-number').value;
            const cardHolder = document.getElementById('card-holder').value;
            const cardExpiry = document.getElementById('card-expiry').value;
            const cardCvc = document.getElementById('card-cvc').value;
            
            if (!cardNumber || cardNumber.replace(/\s/g, '').length < 16) {
                alert('Please enter a valid card number');
                return false;
            }
            
            if (!cardHolder) {
                alert('Please enter card holder name');
                return false;
            }
            
            if (!cardExpiry || !/^\d{2}\/\d{2}$/.test(cardExpiry)) {
                alert('Please enter a valid expiry date (MM/YY)');
                return false;
            }
            
            if (!cardCvc || cardCvc.length < 3) {
                alert('Please enter a valid CVC');
                return false;
            }
        }
        
        return true;
    }
});



// Mobile Navigation Toggle
        const hamburger = document.querySelector('.hamburger');
        const navLinks = document.querySelector('.nav-links');

        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });

        // Close mobile menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!hamburger.contains(e.target) && !navLinks.contains(e.target)) {
                navLinks.classList.remove('active');
            }
        });

        // Close mobile menu when clicking on a link
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
            });
        });

        // Payment Method Selection
        const paymentOptions = document.querySelectorAll('.payment-option');
        const cardForm = document.getElementById('card-form');
        const payNowButton = document.getElementById('pay-now');

        paymentOptions.forEach(option => {
            option.addEventListener('click', () => {
                // Remove selected class from all options
                paymentOptions.forEach(opt => opt.classList.remove('selected'));
                
                // Add selected class to clicked option
                option.classList.add('selected');
                
                // Get payment method
                const method = option.getAttribute('data-method');
                
                // Update payment button text
                const paymentMethodNames = {
                    'card': 'Credit/Debit Card',
                    'paypal': 'PayPal',
                    'applepay': 'Apple Pay',
                    'googlepay': 'Google Pay'
                };
                
                payNowButton.innerHTML = `<i class="fas fa-lock"></i><span>Pay with ${paymentMethodNames[method]}</span>`;
                
                // Show/hide card form based on selection
                if (method === 'card') {
                    cardForm.style.display = 'block';
                } else {
                    cardForm.style.display = 'none';
                }
            });
        });

        // Card Input Formatting
        const cardNumberInput = document.getElementById('card-number');
        const cardHolderInput = document.getElementById('card-holder');
        const cardExpiryInput = document.getElementById('card-expiry');
        const cardCVCInput = document.getElementById('card-cvc');
        
        const cardNumberPreview = document.getElementById('card-number-preview');
        const cardHolderPreview = document.getElementById('card-holder-preview');
        const cardExpiryPreview = document.getElementById('card-expiry-preview');

        // Format card number (add spaces every 4 digits)
        cardNumberInput.addEventListener('input', (e) => {
            let value = e.target.value.replace(/\D/g, '');
            value = value.substring(0, 16);
            let formatted = value.replace(/(\d{4})/g, '$1 ').trim();
            e.target.value = formatted;
            
            // Update preview
            if (value) {
                const masked = '•••• '.repeat(3) + value.substring(12);
                cardNumberPreview.textContent = masked.substring(0, 19);
            } else {
                cardNumberPreview.textContent = '•••• •••• •••• ••••';
            }
        });

        // Update card holder preview
        cardHolderInput.addEventListener('input', (e) => {
            const value = e.target.value.toUpperCase() || 'YOUR NAME';
            cardHolderPreview.textContent = value;
        });

        // Format expiry date
        cardExpiryInput.addEventListener('input', (e) => {
            let value = e.target.value.replace(/\D/g, '');
            if (value.length >= 2) {
                value = value.substring(0, 2) + '/' + value.substring(2, 4);
            }
            e.target.value = value.substring(0, 5);
            
            // Update preview
            if (value) {
                cardExpiryPreview.textContent = value.substring(0, 5) || 'MM/YY';
            } else {
                cardExpiryPreview.textContent = 'MM/YY';
            }
        });

        // Format CVC (only numbers)
        cardCVCInput.addEventListener('input', (e) => {
            e.target.value = e.target.value.replace(/\D/g, '').substring(0, 4);
        });

        // Billing Address Toggle
        const sameAsShippingCheckbox = document.getElementById('same-as-shipping');
        const billingAddressForm = document.getElementById('billing-address-form');

        sameAsShippingCheckbox.addEventListener('change', (e) => {
            if (e.target.checked) {
                billingAddressForm.style.display = 'none';
            } else {
                billingAddressForm.style.display = 'block';
            }
        });

        // Promo Code Application
        const promoCodeInput = document.getElementById('promo-code');
        const applyPromoButton = document.getElementById('apply-promo');
        const orderTotalElement = document.getElementById('order-total');
        
        // Available promo codes
        const promoCodes = {
            'WELCOME10': 0.10,  // 10% off
            'LUXE20': 0.20,     // 20% off
            'FREESHIP': 'free-shipping',
            'BATLUXE25': 0.25   // 25% off
        };

        let currentDiscount = 0;
        let originalTotal = 118.75;

        applyPromoButton.addEventListener('click', () => {
            const promoCode = promoCodeInput.value.toUpperCase();
            
            if (promoCodes[promoCode]) {
                if (promoCodes[promoCode] === 'free-shipping') {
                    // Free shipping logic would go here
                    alert('Free shipping applied! Shipping cost has been removed.');
                    // In a real app, you would recalculate totals
                } else {
                    const discount = promoCodes[promoCode];
                    currentDiscount = discount;
                    const discountAmount = originalTotal * discount;
                    const newTotal = originalTotal - discountAmount;
                    
                    orderTotalElement.textContent = `£${newTotal.toFixed(2)}`;
                    payNowButton.innerHTML = `<i class="fas fa-lock"></i><span>Pay £${newTotal.toFixed(2)}</span>`;
                    
                    // Update button text
                    const paymentButtonSpan = payNowButton.querySelector('span');
                    paymentButtonSpan.textContent = `Pay £${newTotal.toFixed(2)}`;
                    
                    alert(`Promo code applied! You saved £${discountAmount.toFixed(2)}`);
                    
                    // Disable promo code input
                    promoCodeInput.disabled = true;
                    applyPromoButton.disabled = true;
                    applyPromoButton.textContent = 'Applied';
                }
            } else {
                alert('Invalid promo code. Please try again.');
            }
        });

        // Payment Validation
        function validatePayment() {
            const selectedMethod = document.querySelector('.payment-option.selected').getAttribute('data-method');
            
            if (selectedMethod === 'card') {
                // Validate card details
                const cardNumber = cardNumberInput.value.replace(/\s/g, '');
                const cardHolder = cardHolderInput.value.trim();
                const cardExpiry = cardExpiryInput.value;
                const cardCVC = cardCVCInput.value;
                
                if (cardNumber.length !== 16) {
                    alert('Please enter a valid 16-digit card number');
                    return false;
                }
                
                if (!cardHolder) {
                    alert('Please enter the card holder name');
                    return false;
                }
                
                if (!cardExpiry || !/^\d{2}\/\d{2}$/.test(cardExpiry)) {
                    alert('Please enter a valid expiry date (MM/YY)');
                    return false;
                }
                
                const [month, year] = cardExpiry.split('/').map(num => parseInt(num));
                const currentYear = new Date().getFullYear() % 100;
                const currentMonth = new Date().getMonth() + 1;
                
                if (month < 1 || month > 12) {
                    alert('Invalid month in expiry date');
                    return false;
                }
                
                if (year < currentYear || (year === currentYear && month < currentMonth)) {
                    alert('Card has expired');
                    return false;
                }
                
                if (!cardCVC || cardCVC.length < 3) {
                    alert('Please enter a valid CVC code');
                    return false;
                }
            }
            
            return true;
        }

        // Process Payment
        payNowButton.addEventListener('click', () => {
            if (!validatePayment()) {
                return;
            }
            
            // Disable button and show loading
            payNowButton.disabled = true;
            payNowButton.classList.add('disabled');
            payNowButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i><span>Processing...</span>';
            
            // Simulate payment processing
            setTimeout(() => {
                // Show success modal
                document.getElementById('success-modal').style.display = 'flex';
                
                // Reset button after delay
                setTimeout(() => {
                    payNowButton.disabled = false;
                    payNowButton.classList.remove('disabled');
                    payNowButton.innerHTML = '<i class="fas fa-lock"></i><span>Pay Now</span>';
                }, 2000);
            }, 2000);
        });

        // Close modal when clicking outside
        const modal = document.getElementById('success-modal');
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.style.display = 'none';
            }
        });

        // Form auto-fill for demo (optional)
        document.addEventListener('DOMContentLoaded', () => {
            // Auto-fill demo data (remove in production)
            if (window.location.search.includes('demo=true')) {
                cardNumberInput.value = '4242 4242 4242 4242';
                cardHolderInput.value = 'Basit Yusuf';
                cardExpiryInput.value = '12/28';
                cardCVCInput.value = '123';
                
                // Trigger preview updates
                cardNumberInput.dispatchEvent(new Event('input'));
                cardHolderInput.dispatchEvent(new Event('input'));
                cardExpiryInput.dispatchEvent(new Event('input'));
            }
        });

        // Currency formatting (in case any $ symbols appear)
        document.addEventListener('DOMContentLoaded', () => {
            const elements = document.querySelectorAll('body *');
            elements.forEach(element => {
                if (element.childNodes.length === 1 && element.childNodes[0].nodeType === 3) {
                    const text = element.textContent;
                    if (text.includes('$')) {
                        element.textContent = text.replace(/\$/g, '£');
                    }
                }
            });
        });
    
