// Admin Dashboard Functionality
document.addEventListener('DOMContentLoaded', function () {
    // Demo Data
    const demoProducts = [
        {
            id: 1,
            name: "Lush Lips Gloss - Pink Sparkle",
            category: "Lip Gloss",
            price: 18.99,
            stock: 45,
            status: "active",
            image: "https://images.unsplash.com/photo-1586495777744-4413f21062fa?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
        },
        {
            id: 2,
            name: "BatLuxe Feline Lashes",
            category: "Lashes",
            price: 24.99,
            stock: 32,
            status: "active",
            image: "https://images.unsplash.com/photo-1586495777744-4413f21062fa?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
        },
        {
            id: 3,
            name: "Precision Lip Liner - Nude",
            category: "Lip Liner",
            price: 14.99,
            stock: 0,
            status: "inactive",
            image: "https://images.unsplash.com/photo-1586495777744-4413f21062fa?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
        },
        {
            id: 4,
            name: "Velvet Matte Lipstick - Ruby",
            category: "Lip Matte",
            price: 22.99,
            stock: 28,
            status: "active",
            image: "https://images.unsplash.com/photo-1586495777744-4413f21062fa?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
        },
        {
            id: 5,
            name: "Luxury Press-on Nails - French Tip",
            category: "Press on Nails",
            price: 29.99,
            stock: 15,
            status: "active",
            image: "https://images.unsplash.com/photo-1586495777744-4413f21062fa?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
        }
    ];

    const demoOrders = [
        {
            id: "BLX-001",
            customer: "Sarah Johnson",
            email: "sarah@example.com",
            date: "2024-01-15",
            items: [
                { name: "Lush Lips Gloss - Pink Sparkle", quantity: 2, price: 18.99 },
                { name: "BatLuxe Feline Lashes", quantity: 1, price: 24.99 }
            ],
            total: 62.97,
            status: "delivered"
        },
        {
            id: "BLX-002",
            customer: "Emma Wilson",
            email: "emma@example.com",
            date: "2024-01-14",
            items: [
                { name: "Velvet Matte Lipstick - Ruby", quantity: 1, price: 22.99 }
            ],
            total: 27.98,
            status: "processing"
        },
        {
            id: "BLX-003",
            customer: "Lisa Brown",
            email: "lisa@example.com",
            date: "2024-01-13",
            items: [
                { name: "Luxury Press-on Nails - French Tip", quantity: 3, price: 29.99 },
                { name: "Precision Lip Liner - Nude", quantity: 1, price: 14.99 }
            ],
            total: 104.96,
            status: "shipped"
        },
        {
            id: "BLX-004",
            customer: "Michelle Davis",
            email: "michelle@example.com",
            date: "2024-01-12",
            items: [
                { name: "Lush Lips Gloss Set - 5 Colors", quantity: 1, price: 79.99 }
            ],
            total: 84.99,
            status: "pending"
        }
    ];

    const demoCustomers = [
        {
            id: 1,
            name: "Sarah Johnson",
            email: "sarah@example.com",
            phone: "+44 7123 456789",
            joinDate: "2023-11-15",
            totalOrders: 5,
            totalSpent: 245.50,
            avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80"
        },
        {
            id: 2,
            name: "Emma Wilson",
            email: "emma@example.com",
            phone: "+44 7123 987654",
            joinDate: "2023-12-10",
            totalOrders: 3,
            totalSpent: 120.75,
            avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80"
        },
        {
            id: 3,
            name: "Lisa Brown",
            email: "lisa@example.com",
            phone: "+44 7123 654321",
            joinDate: "2024-01-05",
            totalOrders: 2,
            totalSpent: 180.25,
            avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80"
        },
        {
            id: 4,
            name: "Michelle Davis",
            email: "michelle@example.com",
            phone: "+44 7123 123456",
            joinDate: "2024-01-12",
            totalOrders: 1,
            totalSpent: 84.99,
            avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80"
        }
    ];

    // Load stored or demo data
    let products = JSON.parse(localStorage.getItem('batluxe_admin_products')) || demoProducts;
    let orders = JSON.parse(localStorage.getItem('batluxe_admin_orders')) || demoOrders;
    let customers = JSON.parse(localStorage.getItem('batluxe_admin_customers')) || demoCustomers;

    const pageTitles = {
        dashboard: 'Dashboard Overview',
        products: 'All Products',
        'add-product': 'Add New Product',
        orders: 'All Orders',
        customers: 'All Customers',
        settings: 'Settings'
    };

    initDashboard();

    function initDashboard() {
        setupEventListeners();
        updateCounts();
        loadDashboardStats();
        loadRecentOrders();
        loadProducts();
        loadOrders();
        loadCustomers();
    }

    function setupEventListeners() {
        document.querySelectorAll('.menu-item').forEach(item => {
            item.addEventListener('click', function (e) {
                e.preventDefault();
                const section = this.dataset.section;

                document.querySelectorAll('.menu-item').forEach(i => i.classList.remove('active'));
                this.classList.add('active');

                showSection(section);
            });
        });

        const productForm = document.getElementById('productForm');
        if (productForm) {
            productForm.addEventListener('submit', handleProductSubmit);
        }

        const resetBtn = document.getElementById('resetForm');
        if (resetBtn) resetBtn.addEventListener('click', resetProductForm);

        const imageUpload = document.getElementById('imageUpload');
        const imageInput = document.getElementById('imageInput');
        if (imageUpload && imageInput) {
            imageUpload.addEventListener('click', () => imageInput.click());
            imageInput.addEventListener('change', handleImageUpload);
        }

        const addNewBtn = document.getElementById('addNewProductBtn');
        if (addNewBtn) addNewBtn.addEventListener('click', () => showSection('add-product'));

        const refreshBtn = document.getElementById('refreshProducts');
        if (refreshBtn) refreshBtn.addEventListener('click', loadProducts);

        const orderFilter = document.getElementById('orderFilter');
        if (orderFilter) orderFilter.addEventListener('change', loadOrders);

        const viewAllOrdersBtn = document.getElementById('viewAllOrders');
        if (viewAllOrdersBtn) {
            viewAllOrdersBtn.addEventListener('click', () => {
                showSection('orders');
                document.querySelector('.menu-item[data-section="orders"]').classList.add('active');
                document.querySelector('.menu-item[data-section="dashboard"]').classList.remove('active');
            });
        }

        const exportBtn = document.getElementById('exportCustomers');
        if (exportBtn) exportBtn.addEventListener('click', exportCustomers);

        document.querySelectorAll('.close-modal').forEach(btn => {
            btn.addEventListener('click', () => {
                document.querySelectorAll('.modal').forEach(m => m.classList.remove('active'));
            });
        });

        const confirmDeleteBtn = document.getElementById('confirmDelete');
        if (confirmDeleteBtn) confirmDeleteBtn.addEventListener('click', confirmDeleteProduct);

        document.querySelectorAll('.modal').forEach(m => {
            m.addEventListener('click', e => {
                if (e.target === m) m.classList.remove('active');
            });
        });
    }

    function showSection(section) {
        document.querySelectorAll('.content-section').forEach(s => s.classList.remove('active'));

        const selected = document.getElementById(section);
        if (selected) {
            selected.classList.add('active');

            const title = document.getElementById('pageTitle');
            if (title && pageTitles[section]) title.textContent = pageTitles[section];

            if (section === 'products') loadProducts();
            if (section === 'orders') loadOrders();
            if (section === 'customers') loadCustomers();
            if (section === 'dashboard') loadRecentOrders();
        }
    }

    function updateCounts() {
        const p = document.getElementById('productCount');
        const o = document.getElementById('orderCount');
        const c = document.getElementById('customerCount');

        if (p) p.textContent = products.length;
        if (o) o.textContent = orders.length;
        if (c) c.textContent = customers.length;
    }

    function loadDashboardStats() {
        const pendingOrders = orders.filter(o => o.status === 'pending').length;
        const today = new Date().toISOString().split('T')[0];
        const revenueToday = orders
            .filter(o => o.date === today)
            .reduce((sum, o) => sum + o.total, 0);

        const cards = document.querySelectorAll('.stat-card h3');
        if (cards.length >= 4) {
            cards[0].textContent = pendingOrders;
            cards[1].textContent = products.length;
            cards[2].textContent = customers.length;
            cards[3].textContent = `£${revenueToday.toFixed(2)}`;
        }
    }

    function loadRecentOrders() {
        const ordersList = document.querySelector('#dashboard .orders-list');
        if (!ordersList) return;

        const recentOrders = orders.slice(-3);

        if (recentOrders.length === 0) {
            ordersList.innerHTML = `
                <div class="empty-state">
                    <i class="fas fa-shopping-cart"></i>
                    <p>No recent orders</p>
                </div>
            `;
            return;
        }

        ordersList.innerHTML = recentOrders
            .map(order => `
                <div class="order-card">
                    <div class="order-header">
                        <div>
                            <h4 class="order-id">${order.id}</h4>
                            <p class="order-date">${formatDate(order.date)}</p>
                        </div>
                        <span class="order-status status-${order.status}">
                            ${order.status.toUpperCase()}
                        </span>
                    </div>

                    <div class="order-customer">
                        <h4>${order.customer}</h4>
                        <p>${order.email}</p>
                    </div>

                    <div class="order-details">
                        <div class="order-items">
                            ${order.items
                                .map(
                                    i => `
                                    <div class="order-item">
                                        <span>${i.name} × ${i.quantity}</span>
                                    </div>
                                `
                                )
                                .join('')}
                        </div>
                        <div class="order-total">£${order.total.toFixed(2)}</div>
                    </div>

                    <div class="order-actions">
                        <button class="btn btn-outline" onclick="viewOrderDetails('${order.id}')">
                            <i class="fas fa-eye"></i> View
                        </button>
                    </div>
                </div>
            `)
            .join('');
    }

    function loadProducts() {
        const tbody = document.getElementById('productsTableBody');
        if (!tbody) return;

        if (products.length === 0) {
            tbody.innerHTML = `
                <tr>
                    <td colspan="6" style="text-align: center; padding: 40px;">
                        <div class="empty-state">
                            <i class="fas fa-box"></i>
                            <p>No products found</p>
                        </div>
                    </td>
                </tr>`;
            return;
        }

        tbody.innerHTML = products
            .map(
                product => `
                <tr>
                    <td>
                        <div style="display: flex; align-items: center; gap: 10px;">
                            <img src="${product.image}" class="product-image">
                            <span>${product.name}</span>
                        </div>
                    </td>
                    <td>${product.category}</td>
                    <td>£${product.price.toFixed(2)}</td>
                    <td>${product.stock}</td>
                    <td>
                        <span class="status-badge ${
                            product.stock > 0 ? 'status-active' : 'status-inactive'
                        }">
                            ${product.stock > 0 ? 'In Stock' : 'Out of Stock'}
                        </span>
                    </td>
                    <td>
                        <div class="actions-cell">
                            <button class="action-btn edit-btn" onclick="editProduct(${product.id})">
                                <i class="fas fa-edit"></i>
                            </button>
                            <button class="action-btn delete-btn" onclick="deleteProduct(${product.id}, '${product.name}')">
                                <i class="fas fa-trash"></i>
                            </button>
                        </div>
                    </td>
                </tr>`
            )
            .join('');
    }

    function loadOrders() {
        const ordersList = document.getElementById('ordersList');
        if (!ordersList) return;

        const filter = document.getElementById('orderFilter')?.value || 'all';
        const filtered =
            filter === 'all' ? orders : orders.filter(o => o.status === filter);

        if (filtered.length === 0) {
            ordersList.innerHTML = `
                <div class="empty-state">
                    <i class="fas fa-shopping-cart"></i>
                    <p>No orders found</p>
                </div>`;
            return;
        }

        ordersList.innerHTML = filtered
            .map(
                order => `
                <div class="order-card">
                    <div class="order-header">
                        <div>
                            <h4 class="order-id">${order.id}</h4>
                            <p class="order-date">${formatDate(order.date)}</p>
                        </div>
                        <span class="order-status status-${order.status}">
                            ${order.status.toUpperCase()}
                        </span>
                    </div>

                    <div class="order-customer">
                        <h4>${order.customer}</h4>
                        <p>${order.email}</p>
                    </div>

                    <div class="order-details">
                        <div class="order-items">
                            ${order.items
                                .map(
                                    item => `
                                    <div class="order-item">
                                        <span>${item.name} × ${item.quantity}</span>
                                    </div>
                                `
                                )
                                .join('')}
                        </div>
                        <div class="order-total">£${order.total.toFixed(2)}</div>
                    </div>

                    <div class="order-actions">
                        <button class="btn btn-outline" onclick="viewOrderDetails('${order.id}')">
                            <i class="fas fa-eye"></i> View Details
                        </button>

                        <select class="form-control" onchange="updateOrderStatus('${order.id}', this.value)">
                            <option value="pending" ${order.status === 'pending' ? 'selected' : ''}>Pending</option>
                            <option value="processing" ${order.status === 'processing' ? 'selected' : ''}>Processing</option>
                            <option value="shipped" ${order.status === 'shipped' ? 'selected' : ''}>Shipped</option>
                            <option value="delivered" ${order.status === 'delivered' ? 'selected' : ''}>Delivered</option>
                        </select>
                    </div>
                </div>`
            )
            .join('');
    }

    function loadCustomers() {
        const customersGrid = document.getElementById('customersGrid');
        if (!customersGrid) return;

        if (customers.length === 0) {
            customersGrid.innerHTML = `
                <div class="empty-state" style="grid-column: 1 / -1;">
                    <i class="fas fa-users"></i>
                    <p>No customers found</p>
                </div>`;
            return;
        }

        customersGrid.innerHTML = customers
            .map(
                customer => `
                <div class="customer-card">
                    <div class="customer-header">
                        <img src="${customer.avatar}" class="customer-avatar">
                        <div class="customer-info">
                            <h4>${customer.name}</h4>
                            <p>${customer.email}</p>
                            <small>Joined ${formatDate(customer.joinDate)}</small>
                        </div>
                    </div>

                    <div class="customer-stats">
                        <div class="customer-stat">
                            <h5>${customer.totalOrders}</h5>
                            <p>Orders</p>
                        </div>
                        <div class="customer-stat">
                            <h5>£${customer.totalSpent.toFixed(2)}</h5>
                            <p>Total Spent</p>
                        </div>
                        <div class="customer-stat">
                            <h5>£${(customer.totalSpent / customer.totalOrders || 0).toFixed(2)}</h5>
                            <p>Avg. Order</p>
                        </div>
                    </div>

                    <div class="customer-actions">
                        <button class="btn btn-outline" onclick="viewCustomer(${customer.id})">
                            <i class="fas fa-eye"></i> View
                        </button>
                        <button class="btn btn-outline">
                            <i class="fas fa-envelope"></i> Message
                        </button>
                    </div>
                </div>`
            )
            .join('');
    }

    function handleProductSubmit(e) {
        e.preventDefault();

        const name = document.getElementById('productName').value;
        const category = document.getElementById('productCategory').value;
        const price = parseFloat(document.getElementById('productPrice').value);
        const stock = parseInt(document.getElementById('productStock').value);
        const description = document.getElementById('productDescription').value;

        const newProduct = {
            id: Date.now(),
            name,
            category,
            price,
            stock,
            description,
            status: stock > 0 ? 'active' : 'inactive',
            image:
                "https://images.unsplash.com/photo-1586495777744-4413f21062fa?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
        };

        products.push(newProduct);
        localStorage.setItem('batluxe_admin_products', JSON.stringify(products));

        alert('Product added successfully!');
        resetProductForm();
        updateCounts();
        showSection('products');
    }

    function resetProductForm() {
        const form = document.getElementById('productForm');
        if (form) form.reset();

        const preview = document.getElementById('imagePreview');
        if (preview) preview.innerHTML = '';
    }

    function handleImageUpload(e) {
        const files = [...e.target.files];
        const preview = document.getElementById('imagePreview');
        preview.innerHTML = '';

        files.slice(0, 5).forEach(file => {
            const reader = new FileReader();
            reader.onload = evt => {
                const img = document.createElement('img');
                img.src = evt.target.result;
                img.style.width = '80px';
                img.style.height = '80px';
                img.style.objectFit = 'cover';
                img.style.borderRadius = '4px';
                img.style.marginRight = '10px';
                img.style.marginBottom = '10px';
                preview.appendChild(img);
            };
            reader.readAsDataURL(file);
        });
    }

    // Global Exposed Functions
    window.deleteProduct = function (id, name) {
        const modal = document.getElementById('deleteModal');
        const nameEl = document.getElementById('deleteProductName');
        if (nameEl) nameEl.textContent = name;

        modal.dataset.productId = id;
        modal.classList.add('active');
    };

    function confirmDeleteProduct() {
        const id = parseInt(document.getElementById('deleteModal').dataset.productId);

        products = products.filter(p => p.id !== id);
        localStorage.setItem('batluxe_admin_products', JSON.stringify(products));

        document.getElementById('deleteModal').classList.remove('active');
        loadProducts();
        updateCounts();

        alert('Product deleted successfully!');
    }

    window.editProduct = function (id) {
        const p = products.find(p => p.id === id);
        if (!p) return;

        document.getElementById('productName').value = p.name;
        document.getElementById('productCategory').value = p.category;
        document.getElementById('productPrice').value = p.price;
        document.getElementById('productStock').value = p.stock;
        document.getElementById('productDescription').value = p.description || '';

        showSection('add-product');

        const submitBtn = document.querySelector('#productForm button[type="submit"]');
        submitBtn.innerHTML = '<i class="fas fa-save"></i> Update Product';

        submitBtn.onclick = function (e) {
            e.preventDefault();
            updateProduct(id);
        };
    };

    function updateProduct(id) {
        const index = products.findIndex(p => p.id === id);
        if (index === -1) return;

        products[index].name = document.getElementById('productName').value;
        products[index].category = document.getElementById('productCategory').value;
        products[index].price = parseFloat(document.getElementById('productPrice').value);
        products[index].stock = parseInt(document.getElementById('productStock').value);
        products[index].description = document.getElementById('productDescription').value;
        products[index].status = products[index].stock > 0 ? 'active' : 'inactive';

        localStorage.setItem('batluxe_admin_products', JSON.stringify(products));

        alert('Product updated successfully!');
        resetProductForm();
        showSection('products');
    }

    window.viewOrderDetails = function (orderId) {
        const order = orders.find(o => o.id === orderId);
        if (!order) return;

        const modal = document.getElementById('orderModal');
        const details = document.getElementById('orderDetails');

        details.innerHTML = `
            <div class="order-details-modal">
                <div class="detail-row"><strong>Order ID:</strong> ${order.id}</div>
                <div class="detail-row"><strong>Customer:</strong> ${order.customer}</div>
                <div class="detail-row"><strong>Email:</strong> ${order.email}</div>
                <div class="detail-row"><strong>Date:</strong> ${formatDate(order.date)}</div>
                <div class="detail-row">
                    <strong>Status:</strong>
                    <span class="order-status status-${order.status}">
                        ${order.status.toUpperCase()}
                    </span>
                </div>

                <h4 style="margin-top: 20px;">Order Items</h4>

                ${order.items
                    .map(
                        item => `
                    <div class="order-item-detail">
                        <strong>${item.name}</strong>
                        <div>Quantity: ${item.quantity}</div>
                        <div>Price: £${item.price.toFixed(2)}</div>
                        <div>Subtotal: £${(item.price * item.quantity).toFixed(2)}</div>
                    </div>`
                    )
                    .join('')}

                <div class="detail-row total" style="margin-top: 20px; border-top: 2px solid #ddd; padding-top: 10px;">
                    <strong>Total Amount:</strong> £${order.total.toFixed(2)}
                </div>
            </div>
        `;

        modal.classList.add('active');
    };

    window.updateOrderStatus = function (orderId, status) {
        const index = orders.findIndex(o => o.id === orderId);
        if (index !== -1) {
            orders[index].status = status;
            localStorage.setItem('batluxe_admin_orders', JSON.stringify(orders));

            if (document.getElementById('orders').classList.contains('active')) loadOrders();
            if (document.getElementById('dashboard').classList.contains('active')) loadRecentOrders();

            alert('Order status updated!');
        }
    };

    function exportCustomers() {
        alert('Exporting customer data... (CSV download in real app)');
    }

    window.viewCustomer = function (id) {
        const c = customers.find(x => x.id === id);
        if (!c) return;

        alert(
            `Customer Details:\n\nName: ${c.name}\nEmail: ${c.email}\nPhone: ${c.phone}\nTotal Orders: ${c.totalOrders}\nTotal Spent: £${c.totalSpent.toFixed(2)}`
        );
    };

    function formatDate(dateString) {
        const d = new Date(dateString);
        return d.toLocaleDateString('en-GB', {
            day: '2-digit',
            month: 'short',
            year: 'numeric'
        });
    }
});
const searchInput = document.getElementById("searchInput");
const products = document.querySelectorAll(".product");

function getProductName(product) {
    // Finds text inside <h3>, <p>, <span>, etc.
    const title = product.querySelector("h3, h2, .title, .product-name");
    return title ? title.textContent.trim().toLowerCase() : "";
}

searchInput.addEventListener("input", () => {
    const query = searchInput.value.toLowerCase();

    products.forEach(product => {
        const name = getProductName(product);

        if (name.includes(query)) {
            product.style.display = "block";
        } else {
            product.style.display = "none";
        }
    });
});
