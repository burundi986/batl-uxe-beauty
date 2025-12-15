        // Mobile Navigation Toggle
        const hamburger = document.querySelector('.hamburger');
        const navLinks = document.querySelector('.nav-links');

        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });

        // Filter Orders Functionality
        const statusFilter = document.getElementById('status-filter');
        const timeFilter = document.getElementById('time-filter');
        const orderSearch = document.getElementById('order-search');
        const ordersList = document.getElementById('orders-list');
        const orderCards = document.querySelectorAll('.order-card');
        const emptyState = document.getElementById('empty-state');
        const resetFiltersBtn = document.getElementById('reset-filters');

        function filterOrders() {
            const statusValue = statusFilter.value;
            const searchValue = orderSearch.value.toLowerCase();
            let visibleCount = 0;

            orderCards.forEach(card => {
                const status = card.getAttribute('data-status');
                const orderId = card.querySelector('.order-info h4').textContent.toLowerCase();
                const orderItems = card.querySelectorAll('.item-name');
                let itemText = '';
                
                orderItems.forEach(item => {
                    itemText += item.textContent.toLowerCase() + ' ';
                });

                const matchesStatus = statusValue === 'all' || status === statusValue;
                const matchesSearch = searchValue === '' || 
                    orderId.includes(searchValue) || 
                    itemText.includes(searchValue);

                if (matchesStatus && matchesSearch) {
                    card.style.display = 'block';
                    visibleCount++;
                } else {
                    card.style.display = 'none';
                }
            });

            // Show/hide empty state
            if (visibleCount === 0) {
                emptyState.style.display = 'block';
            } else {
                emptyState.style.display = 'none';
            }
        }

        // Event Listeners for filters
        statusFilter.addEventListener('change', filterOrders);
        timeFilter.addEventListener('change', filterOrders);
        orderSearch.addEventListener('input', filterOrders);

        // Reset filters
        resetFiltersBtn.addEventListener('click', () => {
            statusFilter.value = 'all';
            timeFilter.value = 'all';
            orderSearch.value = '';
            filterOrders();
        });

        // Action Buttons Functionality
        document.addEventListener('click', (e) => {
            if (e.target.closest('.btn')) {
                const button = e.target.closest('.btn');
                const card = button.closest('.order-card');
                const orderId = card.querySelector('.order-info h4').textContent;
                
                if (button.textContent.includes('Track Order')) {
                    alert(`Tracking order: ${orderId}\n\nIn a real application, this would show detailed tracking information.`);
                } else if (button.textContent.includes('Cancel Order')) {
                    if (confirm(`Are you sure you want to cancel ${orderId}?`)) {
                        card.querySelector('.order-status').className = 'order-status status-cancelled';
                        card.querySelector('.order-status').textContent = 'Cancelled';
                        alert(`Order ${orderId} has been cancelled.`);
                    }
                } else if (button.textContent.includes('Return Item')) {
                    alert(`Initiating return for ${orderId}\n\nIn a real application, this would open a return form.`);
                } else if (button.textContent.includes('Reorder')) {
                    alert(`Adding items from ${orderId} to cart\n\nIn a real application, this would add all items to cart.`);
                } else if (button.textContent.includes('Write Review')) {
                    alert(`Opening review form for ${orderId}\n\nIn a real application, this would open a review submission form.`);
                } else if (button.textContent.includes('View Details')) {
                    alert(`Viewing details for ${orderId}\n\nIn a real application, this would show order details in a modal or separate page.`);
                } else if (button.textContent.includes('Buy Again')) {
                    alert(`Adding item to cart\n\nIn a real application, this would add the item to cart.`);
                }
            }
        });

        // Update order dates to current year
        function updateOrderDates() {
            const currentYear = new Date().getFullYear();
            const orderIds = document.querySelectorAll('.order-info h4');
            
            orderIds.forEach(idElement => {
                idElement.textContent = idElement.textContent.replace(/BLX-202[0-9]/g, `BLX-${currentYear}`);
            });
            
            const orderDates = document.querySelectorAll('.order-meta span');
            orderDates.forEach(dateElement => {
                if (dateElement.textContent.includes('202')) {
                    dateElement.textContent = dateElement.textContent.replace(/202[0-9]/g, currentYear);
                }
            });
        }

        // Initialize on page load
        document.addEventListener('DOMContentLoaded', () => {
            updateOrderDates();
            
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
        // Load orders
async function loadOrders() {
    try {
        const orders = await ApiService.getOrders();
        displayOrders(orders);
    } catch (error) {
        ApiService.handleError(error);
    }
}

// Cancel order
async function cancelOrder(orderId) {
    if (!confirm('Are you sure you want to cancel this order?')) {
        return;
    }
    
    try {
        await ApiService.cancelOrder(orderId);
        showNotification('Order cancelled successfully');
        loadOrders(); // Refresh orders
    } catch (error) {
        ApiService.handleError(error);
    }
}