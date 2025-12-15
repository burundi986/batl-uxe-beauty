        // Tab Switching
        const tabs = document.querySelectorAll('.auth-tab');
        const forms = document.querySelectorAll('.auth-form');
        const loginForm = document.getElementById('loginForm');
        const registerForm = document.getElementById('registerForm');

        // Switch to Register
        document.getElementById('switchToRegister').addEventListener('click', (e) => {
            e.preventDefault();
            tabs.forEach(tab => tab.classList.remove('active'));
            tabs[1].classList.add('active');
            forms.forEach(form => form.classList.remove('active'));
            registerForm.classList.add('active');
        });

        // Switch to Login
        document.getElementById('switchToLogin').addEventListener('click', (e) => {
            e.preventDefault();
            tabs.forEach(tab => tab.classList.remove('active'));
            tabs[0].classList.add('active');
            forms.forEach(form => form.classList.remove('active'));
            loginForm.classList.add('active');
        });

        // Tab click events
        tabs.forEach(tab => {
            tab.addEventListener('click', () => {
                const tabId = tab.getAttribute('data-tab');
                
                tabs.forEach(t => t.classList.remove('active'));
                tab.classList.add('active');
                
                forms.forEach(form => form.classList.remove('active'));
                document.getElementById(`${tabId}Form`).classList.add('active');
            });
        });

        // Show/Hide messages
        function showMessage(elementId, message, type = 'error') {
            const element = document.getElementById(elementId);
            element.textContent = message;
            element.className = type === 'error' ? 'error-message show' : 'success-message show';
            
            setTimeout(() => {
                element.classList.remove('show');
            }, 5000);
        }

        // Login Form Submission
        document.getElementById('loginForm').addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const email = document.getElementById('loginEmail').value;
            const password = document.getElementById('loginPassword').value;
            const loginBtn = document.getElementById('loginBtn');
            
            // Show loading state
            const originalText = loginBtn.innerHTML;
            loginBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i><span>Logging in...</span>';
            loginBtn.disabled = true;
            
            try {
                const response = await ApiService.loginUser({
                    email: email,
                    password: password
                });
                
                showMessage('loginSuccess', 'Login successful! Redirecting...', 'success');
                
                // Store user data if available
                if (response.user) {
                    localStorage.setItem('user_data', JSON.stringify(response.user));
                }
                
                // Redirect to home page after successful login
                setTimeout(() => {
                    window.location.href = 'index.html';
                }, 1500);
                
            } catch (error) {
                showMessage('loginError', error.message || 'Login failed. Please try again.');
            } finally {
                // Restore button state
                loginBtn.innerHTML = originalText;
                loginBtn.disabled = false;
            }
        });

        // Register Form Submission
        document.getElementById('registerForm').addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const name = document.getElementById('registerName').value;
            const email = document.getElementById('registerEmail').value;
            const password = document.getElementById('registerPassword').value;
            const confirmPassword = document.getElementById('registerConfirmPassword').value;
            const phone = document.getElementById('registerPhone').value;
            const registerBtn = document.getElementById('registerBtn');
            
            // Validation
            if (password !== confirmPassword) {
                showMessage('registerError', 'Passwords do not match!');
                return;
            }
            
            if (password.length < 6) {
                showMessage('registerError', 'Password must be at least 6 characters long!');
                return;
            }
            
            // Show loading state
            const originalText = registerBtn.innerHTML;
            registerBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i><span>Creating Account...</span>';
            registerBtn.disabled = true;
            
            try {
                const userData = {
                    name: name,
                    email: email,
                    password: password,
                    phone: phone,
                    // Add any additional fields your API requires
                };
                
                await ApiService.registerUser(userData);
                
                showMessage('registerSuccess', 'Registration successful! You are being logged in...', 'success');
                
                // The API service will automatically login after registration
                setTimeout(() => {
                    window.location.href = 'index.html';
                }, 1500);
                
            } catch (error) {
                showMessage('registerError', error.message || 'Registration failed. Please try again.');
            } finally {
                // Restore button state
                registerBtn.innerHTML = originalText;
                registerBtn.disabled = false;
            }
        });

        // Check if user is already logged in
        document.addEventListener('DOMContentLoaded', () => {
            if (AuthService.isLoggedIn()) {
                // User is already logged in, redirect to home
                window.location.href = 'index.html';
            }
        });
        // Authentication System
class AuthSystem {
    constructor() {
        this.currentUser = null;
        this.users = JSON.parse(localStorage.getItem('batluxeUsers')) || [];
        this.init();
    }

    init() {
        this.checkAuthState();
        this.setupEventListeners();
    }

    setupEventListeners() {
        // Login form
        const loginForm = document.getElementById('loginForm');
        if (loginForm) {
            loginForm.addEventListener('submit', (e) => this.handleLogin(e));
            
            // Toggle password visibility
            const toggleBtn = document.getElementById('toggleLoginPassword');
            if (toggleBtn) {
                toggleBtn.addEventListener('click', () => this.togglePassword('loginPassword', toggleBtn));
            }
        }

        // Signup form
        const signupForm = document.getElementById('signupForm');
        if (signupForm) {
            signupForm.addEventListener('submit', (e) => this.handleSignup(e));
            
            // Toggle password visibility
            const toggleBtn = document.getElementById('toggleSignupPassword');
            if (toggleBtn) {
                toggleBtn.addEventListener('click', () => this.togglePassword('signupPassword', toggleBtn));
            }

            // Password strength checker
            const passwordInput = document.getElementById('signupPassword');
            if (passwordInput) {
                passwordInput.addEventListener('input', (e) => this.checkPasswordStrength(e.target.value));
            }
        }

        // Update header for logged in users
        this.updateHeader();
    }

    togglePassword(inputId, button) {
        const input = document.getElementById(inputId);
        const icon = button.querySelector('i');
        
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

    checkPasswordStrength(password) {
        const requirements = {
            lengthReq: password.length >= 8,
            uppercaseReq: /[A-Z]/.test(password),
            lowercaseReq: /[a-z]/.test(password),
            numberReq: /\d/.test(password)
        };

        Object.keys(requirements).forEach(req => {
            const element = document.getElementById(req);
            if (element) {
                if (requirements[req]) {
                    element.classList.add('valid');
                } else {
                    element.classList.remove('valid');
                }
            }
        });

        return Object.values(requirements).every(v => v);
    }

    validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    async handleLogin(e) {
        e.preventDefault();
        
        const email = document.getElementById('loginEmail').value.trim();
        const password = document.getElementById('loginPassword').value;
        const rememberMe = document.getElementById('rememberMe')?.checked;

        // Clear previous errors
        this.clearErrors(['emailError', 'passwordError']);

        let isValid = true;

        // Validate email
        if (!email) {
            this.showError('emailError', 'Email is required');
            isValid = false;
        } else if (!this.validateEmail(email)) {
            this.showError('emailError', 'Please enter a valid email');
            isValid = false;
        }

        // Validate password
        if (!password) {
            this.showError('passwordError', 'Password is required');
            isValid = false;
        }

        if (!isValid) return;

        // Find user
        const user = this.users.find(u => u.email === email && u.password === password);
        
        if (user) {
            this.currentUser = user;
            
            // Store session
            if (rememberMe) {
                localStorage.setItem('batluxeCurrentUser', JSON.stringify(user));
            } else {
                sessionStorage.setItem('batluxeCurrentUser', JSON.stringify(user));
            }

            this.showNotification('Login successful! Redirecting...', 'success');
            
            // Redirect to home page after delay
            setTimeout(() => {
                window.location.href = 'index.html';
            }, 1500);
        } else {
            this.showError('passwordError', 'Invalid email or password');
        }
    }

    async handleSignup(e) {
        e.preventDefault();
        
        const name = document.getElementById('signupName').value.trim();
        const email = document.getElementById('signupEmail').value.trim();
        const password = document.getElementById('signupPassword').value;
        const confirmPassword = document.getElementById('confirmPassword').value;
        const acceptTerms = document.getElementById('acceptTerms').checked;

        // Clear previous errors
        this.clearErrors(['nameError', 'signupEmailError', 'confirmPasswordError']);

        let isValid = true;

        // Validate name
        if (!name) {
            this.showError('nameError', 'Full name is required');
            isValid = false;
        }

        // Validate email
        if (!email) {
            this.showError('signupEmailError', 'Email is required');
            isValid = false;
        } else if (!this.validateEmail(email)) {
            this.showError('signupEmailError', 'Please enter a valid email');
            isValid = false;
        } else if (this.users.find(u => u.email === email)) {
            this.showError('signupEmailError', 'Email already registered');
            isValid = false;
        }

        // Validate password
        if (!this.checkPasswordStrength(password)) {
            isValid = false;
        }

        // Validate confirm password
        if (password !== confirmPassword) {
            this.showError('confirmPasswordError', 'Passwords do not match');
            isValid = false;
        }

        // Validate terms
        if (!acceptTerms) {
            isValid = false;
            alert('Please accept the Terms & Conditions');
        }

        if (!isValid) return;

        // Create new user
        const newUser = {
            id: Date.now().toString(),
            name: name,
            email: email,
            password: password,
            createdAt: new Date().toISOString(),
            cart: []
        };

        this.users.push(newUser);
        localStorage.setItem('batluxeUsers', JSON.stringify(this.users));

        // Auto login
        this.currentUser = newUser;
        sessionStorage.setItem('batluxeCurrentUser', JSON.stringify(newUser));

        this.showNotification('Account created successfully! Redirecting...', 'success');
        
        // Redirect to home page after delay
        setTimeout(() => {
            window.location.href = 'index.html';
        }, 1500);
    }

    checkAuthState() {
        // Check localStorage first (remember me), then sessionStorage
        const storedUser = localStorage.getItem('batluxeCurrentUser') || 
                          sessionStorage.getItem('batluxeCurrentUser');
        
        if (storedUser) {
            this.currentUser = JSON.parse(storedUser);
        }
    }

    logout() {
        this.currentUser = null;
        localStorage.removeItem('batluxeCurrentUser');
        sessionStorage.removeItem('batluxeCurrentUser');
        window.location.href = 'index.html';
    }

    updateHeader() {
        const navIcons = document.querySelector('.nav-icons');
        if (!navIcons) return;

        // Remove existing user menu if present
        const existingMenu = document.querySelector('.user-menu');
        if (existingMenu) {
            existingMenu.remove();
        }

        if (this.currentUser) {
            // Create user menu for logged in users
            const userMenu = document.createElement('div');
            userMenu.className = 'user-menu';
            userMenu.innerHTML = `
                <a href="#" class="user-welcome">
                    <i class="fas fa-user-circle"></i>
                    <span>Hi, ${this.currentUser.name.split(' ')[0]}</span>
                    <i class="fas fa-chevron-down"></i>
                </a>
                <div class="user-dropdown">
                    <div class="user-greeting">Welcome, ${this.currentUser.name}</div>
                    <a href="PROFILE.html"><i class="fas fa-user"></i> My Profile</a>
                    <a href="#" class="my-orders"><i class="fas fa-shopping-bag"></i> My Orders</a>
                    <a href="#" class="my-wishlist"><i class="fas fa-heart"></i> Wishlist</a>
                    <div class="divider"></div>
                    <a href="#" class="logout-btn"><i class="fas fa-sign-out-alt"></i> Logout</a>
                </div>
            `;

            // Find and replace the user icon
            const userIcon = navIcons.querySelector('a[href="PROFILE.html"]');
            if (userIcon) {
                userIcon.replaceWith(userMenu);
            } else {
                // Insert at the beginning of nav-icons
                navIcons.insertBefore(userMenu, navIcons.firstChild);
            }

            // Add dropdown toggle functionality
            const userWelcome = userMenu.querySelector('.user-welcome');
            const dropdown = userMenu.querySelector('.user-dropdown');

            userWelcome.addEventListener('click', (e) => {
                e.preventDefault();
                dropdown.classList.toggle('active');
            });

            // Close dropdown when clicking outside
            document.addEventListener('click', (e) => {
                if (!userMenu.contains(e.target)) {
                    dropdown.classList.remove('active');
                }
            });

            // Logout functionality
            const logoutBtn = userMenu.querySelector('.logout-btn');
            if (logoutBtn) {
                logoutBtn.addEventListener('click', (e) => {
                    e.preventDefault();
                    this.logout();
                });
            }
        } else {
            // For non-logged in users, ensure there's a login link
            const existingUserLink = navIcons.querySelector('a[href="PROFILE.html"]');
            if (existingUserLink) {
                existingUserLink.href = 'login.html';
            }
        }
    }

    showError(elementId, message) {
        const element = document.getElementById(elementId);
        if (element) {
            element.textContent = message;
        }
    }

    clearErrors(elementIds) {
        elementIds.forEach(id => {
            const element = document.getElementById(id);
            if (element) {
                element.textContent = '';
            }
        });
    }

    showNotification(message, type = 'success') {
        const notification = document.getElementById('notification');
        if (notification) {
            notification.textContent = message;
            notification.className = `notification ${type}`;
            notification.style.display = 'block';
            
            setTimeout(() => {
                notification.style.display = 'none';
            }, 3000);
        }
    }

    isLoggedIn() {
        return this.currentUser !== null;
    }

    getUser() {
        return this.currentUser;
    }
}

// Initialize auth system when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.auth = new AuthSystem();
});
