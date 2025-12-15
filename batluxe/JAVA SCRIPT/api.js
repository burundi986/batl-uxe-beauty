// api-service.js

const API_BASE_URL = 'https://beauty-ecommerceapp-production.up.railway.app';

// Authentication Token Management
class AuthService {
    static getToken() {
        return localStorage.getItem('auth_token');
    }

    static setToken(token) {
        localStorage.setItem('auth_token', token);
    }

    static removeToken() {
        localStorage.removeItem('auth_token');
    }

    static isLoggedIn() {
        return !!this.getToken();
    }

    static getAuthHeaders() {
        const token = this.getToken();
        return {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        };
    }
}

// API Service Class
class ApiService {
    // User Registration
    static async registerUser(userData) {
        try {
            const response = await fetch(`${API_BASE_URL}/signup`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userData)
            });
            
            const data = await response.json();
            
            if (response.ok) {
                // Auto-login after registration
                const loginResponse = await this.loginUser({
                    email: userData.email,
                    password: userData.password
                });
                
                return loginResponse;
            }
            
            throw new Error(data.message || 'Registration failed');
        } catch (error) {
            throw error;
        }
    }

    // User Login
    static async loginUser(credentials) {
        try {
            const response = await fetch(`${API_BASE_URL}/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(credentials)
            });
            
            const data = await response.json();
            
            if (response.ok) {
                AuthService.setToken(data.token || data.access_token);
                return data;
            }
            
            throw new Error(data.message || 'Login failed');
        } catch (error) {
            throw error;
        }
    }

    // User Logout
    static logoutUser() {
        AuthService.removeToken();
        window.location.href = 'auth.html';
    }

    // Get Current User Profile
    static async getCurrentUser() {
        try {
            const response = await fetch(`${API_BASE_URL}/admin/users`, {
                method: 'GET',
                headers: AuthService.getAuthHeaders()
            });
            
            const data = await response.json();
            
            if (response.ok) {
                // Assuming API returns current user in the response
                // You might need to adjust based on your API response structure
                return data.user || data;
            }
            
            throw new Error(data.message || 'Failed to fetch user');
        } catch (error) {
            throw error;
        }
    }

    // Get All Products
    static async getProducts() {
        try {
            const response = await fetch(`${API_BASE_URL}/products`, {
                method: 'GET'
            });
            
            const data = await response.json();
            
            if (response.ok) {
                return data;
            }
            
            throw new Error(data.message || 'Failed to fetch products');
        } catch (error) {
            throw error;
        }
    }

    // Get Single Product
    static async getProductById(productId) {
        try {
            const response = await fetch(`${API_BASE_URL}/products/${productId}`, {
                method: 'GET'
            });
            
            const data = await response.json();
            
            if (response.ok) {
                return data;
            }
            
            throw new Error(data.message || 'Failed to fetch product');
        } catch (error) {
            throw error;
        }
    }

    // Cart Operations
    static async getCart() {
        try {
            const response = await fetch(`${API_BASE_URL}/cart`, {
                method: 'GET',
                headers: AuthService.getAuthHeaders()
            });
            
            const data = await response.json();
            
            if (response.ok) {
                return data;
            }
            
            throw new Error(data.message || 'Failed to fetch cart');
        } catch (error) {
            throw error;
        }
    }

    static async addToCart(productId, quantity = 1) {
        try {
            const response = await fetch(`${API_BASE_URL}/cart`, {
                method: 'POST',
                headers: AuthService.getAuthHeaders(),
                body: JSON.stringify({
                    productId,
                    quantity
                })
            });
            
            const data = await response.json();
            
            if (response.ok) {
                return data;
            }
            
            throw new Error(data.message || 'Failed to add to cart');
        } catch (error) {
            throw error;
        }
    }

    static async updateCartItem(cartItemId, quantity) {
        try {
            const response = await fetch(`${API_BASE_URL}/cart/${cartItemId}`, {
                method: 'PUT',
                headers: AuthService.getAuthHeaders(),
                body: JSON.stringify({ quantity })
            });
            
            const data = await response.json();
            
            if (response.ok) {
                return data;
            }
            
            throw new Error(data.message || 'Failed to update cart');
        } catch (error) {
            throw error;
        }
    }

    static async removeFromCart(cartItemId) {
        try {
            const response = await fetch(`${API_BASE_URL}/cart/${cartItemId}`, {
                method: 'DELETE',
                headers: AuthService.getAuthHeaders()
            });
            
            const data = await response.json();
            
            if (response.ok) {
                return data;
            }
            
            throw new Error(data.message || 'Failed to remove from cart');
        } catch (error) {
            throw error;
        }
    }

    static async clearCart() {
        try {
            const response = await fetch(`${API_BASE_URL}/cart`, {
                method: 'DELETE',
                headers: AuthService.getAuthHeaders()
            });
            
            const data = await response.json();
            
            if (response.ok) {
                return data;
            }
            
            throw new Error(data.message || 'Failed to clear cart');
        } catch (error) {
            throw error;
        }
    }

    // Wishlist Operations
    static async getWishlist() {
        try {
            const response = await fetch(`${API_BASE_URL}/wishlist`, {
                method: 'GET',
                headers: AuthService.getAuthHeaders()
            });
            
            const data = await response.json();
            
            if (response.ok) {
                return data;
            }
            
            throw new Error(data.message || 'Failed to fetch wishlist');
        } catch (error) {
            throw error;
        }
    }

    static async addToWishlist(productId) {
        try {
            const response = await fetch(`${API_BASE_URL}/wishlist`, {
                method: 'POST',
                headers: AuthService.getAuthHeaders(),
                body: JSON.stringify({ productId })
            });
            
            const data = await response.json();
            
            if (response.ok) {
                return data;
            }
            
            throw new Error(data.message || 'Failed to add to wishlist');
        } catch (error) {
            throw error;
        }
    }

    static async removeFromWishlist(wishlistItemId) {
        try {
            const response = await fetch(`${API_BASE_URL}/wishlist/${wishlistItemId}`, {
                method: 'DELETE',
                headers: AuthService.getAuthHeaders()
            });
            
            const data = await response.json();
            
            if (response.ok) {
                return data;
            }
            
            throw new Error(data.message || 'Failed to remove from wishlist');
        } catch (error) {
            throw error;
        }
    }

    // Order Operations
    static async createOrder(orderData) {
        try {
            const response = await fetch(`${API_BASE_URL}/orders`, {
                method: 'POST',
                headers: AuthService.getAuthHeaders(),
                body: JSON.stringify(orderData)
            });
            
            const data = await response.json();
            
            if (response.ok) {
                return data;
            }
            
            throw new Error(data.message || 'Failed to create order');
        } catch (error) {
            throw error;
        }
    }

    static async getOrders() {
        try {
            const response = await fetch(`${API_BASE_URL}/orders`, {
                method: 'GET',
                headers: AuthService.getAuthHeaders()
            });
            
            const data = await response.json();
            
            if (response.ok) {
                return data;
            }
            
            throw new Error(data.message || 'Failed to fetch orders');
        } catch (error) {
            throw error;
        }
    }

    static async getOrderById(orderId) {
        try {
            const response = await fetch(`${API_BASE_URL}/orders/${orderId}`, {
                method: 'GET',
                headers: AuthService.getAuthHeaders()
            });
            
            const data = await response.json();
            
            if (response.ok) {
                return data;
            }
            
            throw new Error(data.message || 'Failed to fetch order');
        } catch (error) {
            throw error;
        }
    }

    static async cancelOrder(orderId) {
        try {
            const response = await fetch(`${API_BASE_URL}/orders/${orderId}/cancel`, {
                method: 'PUT',
                headers: AuthService.getAuthHeaders()
            });
            
            const data = await response.json();
            
            if (response.ok) {
                return data;
            }
            
            throw new Error(data.message || 'Failed to cancel order');
        } catch (error) {
            throw error;
        }
    }

    // Review Operations
    static async createReview(reviewData) {
        try {
            const response = await fetch(`${API_BASE_URL}/reviews`, {
                method: 'POST',
                headers: AuthService.getAuthHeaders(),
                body: JSON.stringify(reviewData)
            });
            
            const data = await response.json();
            
            if (response.ok) {
                return data;
            }
            
            throw new Error(data.message || 'Failed to create review');
        } catch (error) {
            throw error;
        }
    }

    static async getReviews(productId) {
        try {
            const response = await fetch(`${API_BASE_URL}/reviews/${productId}`, {
                method: 'GET'
            });
            
            const data = await response.json();
            
            if (response.ok) {
                return data;
            }
            
            throw new Error(data.message || 'Failed to fetch reviews');
        } catch (error) {
            throw error;
        }
    }

    static async updateReview(reviewId, reviewData) {
        try {
            const response = await fetch(`${API_BASE_URL}/reviews/${reviewId}`, {
                method: 'PUT',
                headers: AuthService.getAuthHeaders(),
                body: JSON.stringify(reviewData)
            });
            
            const data = await response.json();
            
            if (response.ok) {
                return data;
            }
            
            throw new Error(data.message || 'Failed to update review');
        } catch (error) {
            throw error;
        }
    }

    static async deleteReview(reviewId) {
        try {
            const response = await fetch(`${API_BASE_URL}/reviews/${reviewId}`, {
                method: 'DELETE',
                headers: AuthService.getAuthHeaders()
            });
            
            const data = await response.json();
            
            if (response.ok) {
                return data;
            }
            
            throw new Error(data.message || 'Failed to delete review');
        } catch (error) {
            throw error;
        }
    }

    // Payment Operations
    static async initializePayment(orderId) {
        try {
            const response = await fetch(`${API_BASE_URL}/orders/${orderId}/pay`, {
                method: 'POST',
                headers: AuthService.getAuthHeaders()
            });
            
            const data = await response.json();
            
            if (response.ok) {
                return data;
            }
            
            throw new Error(data.message || 'Failed to initialize payment');
        } catch (error) {
            throw error;
        }
    }

    // Utility function for handling errors
    static handleError(error) {
        console.error('API Error:', error);
        
        // Show user-friendly error message
        const errorMessage = error.message || 'Something went wrong. Please try again.';
        
        // You can implement toast notifications or alert dialogs here
        alert(errorMessage);
        
        // If token is invalid or expired, redirect to login
        if (error.message.includes('token') || error.message.includes('unauthorized')) {
            AuthService.removeToken();
            window.location.href = 'auth.html';
        }
    }
}

// Initialize the service
window.ApiService = ApiService;
window.AuthService = AuthService;