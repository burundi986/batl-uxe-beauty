// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });
}

// Dashboard Navigation
const menuItems = document.querySelectorAll('.menu-item');
const contentSections = document.querySelectorAll('.content-section');

menuItems.forEach(item => {
    item.addEventListener('click', () => {
        // Remove active class from all menu items and sections
        menuItems.forEach(i => i.classList.remove('active'));
        contentSections.forEach(section => section.classList.remove('active'));
        
        // Add active class to clicked menu item
        item.classList.add('active');
        
        // Show corresponding content section
        const target = item.getAttribute('data-target');
        const targetElement = document.getElementById(target);
        if (targetElement) {
            targetElement.classList.add('active');
        }
    });
});

// Remove from wishlist functionality
const removeWishlistButtons = document.querySelectorAll('.wishlist-actions .btn-outline');
removeWishlistButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        e.preventDefault();
        const wishlistItem = button.closest('.wishlist-item');
        if (wishlistItem) {
            wishlistItem.style.opacity = '0';
            setTimeout(() => {
                wishlistItem.remove();
            }, 300);
        }
    });
});

// Remove address functionality
const removeAddressButtons = document.querySelectorAll('.address-actions .btn-outline');
removeAddressButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        e.preventDefault();
        const addressCard = button.closest('.address-card');
        if (addressCard) {
            if (!addressCard.classList.contains('default')) {
                addressCard.style.opacity = '0';
                setTimeout(() => {
                    addressCard.remove();
                }, 300);
            } else {
                alert('Cannot remove default address. Please set another address as default first.');
            }
        }
    });
});

// Settings form submission
const settingsForm = document.querySelector('.settings-form');
if (settingsForm) {
    settingsForm.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Your account settings have been updated successfully!');
    });
}

// Password visibility toggle
const passwordToggles = document.querySelectorAll('.password-toggle');
passwordToggles.forEach(toggle => {
    toggle.addEventListener('click', function() {
        const input = this.parentElement.querySelector('input');
        const icon = this.querySelector('i');
        
        if (input && icon) {
            if (input.type === 'password') {
                input.type = 'text';
                icon.classList.remove('fa-eye');
                icon.classList.add('fa-eye-slash');
            } else {
                input.type = 'password';
                icon.classList.remove('fa-eye-slash');
                icon.classList.add('fa-eye');
            }
        }
    });
});

// Account form validation and submission
const accountForm = document.getElementById('accountSettingsForm');
if (accountForm) {
    accountForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Basic validation
        const newPassword = document.getElementById('newPassword')?.value;
        const confirmPassword = document.getElementById('confirmPassword')?.value;
        
        if (newPassword && confirmPassword && newPassword !== confirmPassword) {
            alert('New password and confirm password do not match.');
            return;
        }
        
        // Additional validations can be added here
        
        // In a real application, you would send this data to the server
        alert('Account settings updated successfully!');
    });
}

// Add address button functionality
const addAddressBtn = document.getElementById('addAddressBtn');
if (addAddressBtn) {
    addAddressBtn.addEventListener('click', function(e) {
        e.preventDefault();
        // This could open a modal or redirect to an address form page
        alert('Address form would open here. In a real application, this would show a modal with an address form.');
    });
}

// Update order dates and IDs to current year
function updateOrderDates() {
    const currentYear = new Date().getFullYear();
    
    // Update order dates
    const orderDates = document.querySelectorAll('.order-date');
    orderDates.forEach(dateElement => {
        if (dateElement.textContent) {
            dateElement.textContent = dateElement.textContent.replace(/202[0-9]/g, currentYear);
        }
    });
    
    // Update order IDs
    const orderIds = document.querySelectorAll('.order-id');
    orderIds.forEach(idElement => {
        if (idElement.textContent) {
            idElement.textContent = idElement.textContent.replace(/BLX-202[0-9]/g, `BLX-${currentYear}`);
        }
    });
}

// Currency formatter - convert $ to £
function formatCurrency() {
    const elements = document.querySelectorAll('body *');
    elements.forEach(element => {
        if (element.childNodes.length === 1 && element.childNodes[0].nodeType === 3) {
            // Text node only
            const text = element.textContent;
            if (text.includes('$')) {
                element.textContent = text.replace(/\$/g, '£');
            }
        }
    });
}

// Mutation Observer for dynamically added content
const currencyObserver = new MutationObserver(function(mutations) {
    mutations.forEach(function(mutation) {
        if (mutation.addedNodes.length) {
            mutation.addedNodes.forEach(function(node) {
                if (node.nodeType === 1) { // Element node
                    // Check for currency symbols in new elements
                    const textNodes = node.querySelectorAll('*');
                    textNodes.forEach(function(element) {
                        if (element.textContent && element.textContent.includes('$')) {
                            element.textContent = element.textContent.replace(/\$/g, '£');
                        }
                    });
                }
            });
        }
    });
});

// Initialize when DOM is fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Run once on page load
    updateOrderDates();
    formatCurrency();
    
    // Start observing for dynamically added content
    currencyObserver.observe(document.body, {
        childList: true,
        subtree: true
    });
});

// Optional: Close mobile menu when clicking on a menu item
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        if (navLinks && navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
        }
    });
});

// Optional: Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (hamburger && navLinks && navLinks.classList.contains('active') &&
        !hamburger.contains(e.target) && !navLinks.contains(e.target)) {
        navLinks.classList.remove('active');
    }
});