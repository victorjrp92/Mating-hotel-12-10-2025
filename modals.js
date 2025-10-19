// ============================================
// MODAL MANAGEMENT
// ============================================

const modalManager = {
    // Modal elements
    preCheckInModal: null,
    registrationModal: null,
    upgradeModal: null,
    
    // Form state
    isSubmitting: false,
    
    // Initialize modals
    init() {
        // Create modal containers if they don't exist
        this.createModalStructure();
        
        // Add event listeners
        this.attachEventListeners();
    },
    
    // Create modal HTML structure
    createModalStructure() {
        // Check if modals already exist
        if (document.getElementById('preCheckInModal')) {
            return;
        }
        
        // Create modal container
        const modalContainer = document.createElement('div');
        modalContainer.innerHTML = `
            <!-- Pre-Check-In Modal (A/B Test) -->
            <div id="preCheckInModal" class="modal-overlay">
                <div class="modal-content pre-checkin-modal">
                    <button class="modal-close" onclick="modalManager.closePreCheckIn()">&times;</button>
                    <div id="preCheckInContent"></div>
                </div>
            </div>
            
            <!-- Registration Form Modal -->
            <div id="registrationModal" class="modal-overlay">
                <div class="modal-content registration-modal">
                    <button class="modal-close" onclick="modalManager.closeRegistration()">&times;</button>
                    <h2 class="modal-title">Complete Your Registration</h2>
                    <p class="modal-subtitle">Get instant access to your AI strategic analysis</p>
                    
                    <form id="registrationForm" class="registration-form">
                        <div class="form-group">
                            <label for="fullName">Full Name</label>
                            <input type="text" id="fullName" name="fullName" required 
                                   placeholder="John Smith" autocomplete="name">
                        </div>
                        
                        <div class="form-group">
                            <label for="email">Business Email</label>
                            <input type="email" id="email" name="email" required 
                                   placeholder="john@hotelexample.com" autocomplete="email">
                        </div>
                        
                        <div class="form-group">
                            <label for="companyName">Hotel/Company Name</label>
                            <input type="text" id="companyName" name="companyName" required 
                                   placeholder="Grand Hotel Example" autocomplete="organization">
                        </div>
                        
                        <div class="form-group">
                            <label for="employeeCount">Number of Employees</label>
                            <select id="employeeCount" name="employeeCount" required>
                                <option value="">Select range</option>
                                <option value="1-10">1-10</option>
                                <option value="11-50">11-50</option>
                                <option value="51-200">51-200</option>
                                <option value="201-500">201-500</option>
                                <option value="500+">500+</option>
                            </select>
                        </div>
                        
                        <button type="submit" class="btn-primary submit-btn" id="submitBtn">
                            <span class="btn-text">Get My Free Analysis</span>
                            <span class="btn-loader" style="display: none;">Processing...</span>
                        </button>
                        
                        <p class="form-disclaimer">
                            We'll send you a verification link. No credit card required.
                        </p>
                    </form>
                </div>
            </div>
            
            <!-- Email Sent Confirmation Modal -->
            <div id="emailSentModal" class="modal-overlay">
                <div class="modal-content email-sent-modal">
                    <div class="success-icon">✓</div>
                    <h2 class="modal-title">Check Your Email</h2>
                    <p class="modal-text">
                        We've sent a verification link to <strong id="sentEmailAddress"></strong>
                    </p>
                    <p class="modal-text">
                        Click the link in your email to verify your account and access your free AI analysis.
                    </p>
                    <button class="btn-primary" onclick="modalManager.closeEmailSent()">
                        Got it
                    </button>
                    <p class="modal-note">
                        Can't find the email? Check your spam folder or 
                        <a href="#" onclick="modalManager.resendEmail(); return false;">resend verification</a>
                    </p>
                </div>
            </div>
            
            <!-- Upgrade Modal -->
            <div id="upgradeModal" class="modal-overlay">
                <div class="modal-content upgrade-modal">
                    <button class="modal-close" onclick="modalManager.closeUpgrade()">&times;</button>
                    <div class="upgrade-icon">★</div>
                    <h2 class="modal-title">Upgrade to Premium</h2>
                    <p class="modal-subtitle">You've used your free AI analysis</p>
                    
                    <div class="premium-benefits">
                        <h3>Premium Benefits:</h3>
                        <ul class="benefits-list">
                            <li>Unlimited AI strategic analyses</li>
                            <li>Weekly competitive intelligence reports</li>
                            <li>Price optimization recommendations</li>
                            <li>Competitor price tracking alerts</li>
                            <li>Revenue forecasting tools</li>
                            <li>Priority support</li>
                        </ul>
                    </div>
                    
                    <div class="pricing-options">
                        <div class="pricing-card">
                            <h4>Monthly</h4>
                            <div class="price">€49/month</div>
                            <button class="btn-secondary" disabled>
                                Coming Soon
                            </button>
                        </div>
                        <div class="pricing-card featured">
                            <div class="badge">Best Value</div>
                            <h4>Annual</h4>
                            <div class="price">€399/year</div>
                            <div class="savings">Save €189</div>
                            <button class="btn-primary" disabled>
                                Coming Soon
                            </button>
                        </div>
                    </div>
                    
                    <p class="modal-note">
                        Premium plans will be available soon. 
                        <a href="mailto:support@mariting.com">Contact us</a> for early access.
                    </p>
                </div>
            </div>
        `;
        
        document.body.appendChild(modalContainer);
        
        // Store references
        this.preCheckInModal = document.getElementById('preCheckInModal');
        this.registrationModal = document.getElementById('registrationModal');
        this.upgradeModal = document.getElementById('upgradeModal');
    },
    
    // Attach event listeners
    attachEventListeners() {
        // Registration form submit
        const form = document.getElementById('registrationForm');
        if (form) {
            form.addEventListener('submit', (e) => this.handleRegistrationSubmit(e));
        }
        
        // Close modals on backdrop click
        document.querySelectorAll('.modal-overlay').forEach(modal => {
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    this.closeAll();
                }
            });
        });
        
        // Close on ESC key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.closeAll();
            }
        });
    },
    
    // Show pre-check-in modal with A/B test content
    showPreCheckIn() {
        // Get A/B test content
        const modalHTML = window.abTestManager.getModalHTML();
        document.getElementById('preCheckInContent').innerHTML = modalHTML;
        
        // Track impression
        window.abTestManager.trackImpression();
        
        // Show modal
        this.preCheckInModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    },
    
    // Show registration form
    showRegistrationForm() {
        this.closePreCheckIn();
        this.registrationModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    },
    
    // Show email sent confirmation
    showEmailSent(email) {
        document.getElementById('sentEmailAddress').textContent = email;
        this.closeAll();
        document.getElementById('emailSentModal').classList.add('active');
        document.body.style.overflow = 'hidden';
    },
    
    // Show upgrade modal
    showUpgrade() {
        this.upgradeModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    },
    
    // Handle registration form submission
    async handleRegistrationSubmit(e) {
        e.preventDefault();
        
        if (this.isSubmitting) return;
        this.isSubmitting = true;
        
        // Get form data
        const formData = {
            fullName: document.getElementById('fullName').value.trim(),
            email: document.getElementById('email').value.trim(),
            companyName: document.getElementById('companyName').value.trim(),
            employeeCount: document.getElementById('employeeCount').value,
            abVariant: window.abTestManager.getVariant()
        };
        
        // Show loading state
        const submitBtn = document.getElementById('submitBtn');
        submitBtn.disabled = true;
        submitBtn.querySelector('.btn-text').style.display = 'none';
        submitBtn.querySelector('.btn-loader').style.display = 'inline';
        
        try {
            // Track conversion
            await window.abTestManager.trackConversion();
            
            // Create user in database
            if (window.maritingDB) {
                const result = await window.maritingDB.createUser(formData);
                if (result.error) {
                    throw new Error(result.error);
                }
            }
            
            // Send magic link
            if (window.authManager) {
                const result = await window.authManager.sendMagicLink(formData.email);
                if (result.error) {
                    throw new Error(result.error);
                }
            }
            
            // Show success modal
            this.showEmailSent(formData.email);
            
            // Reset form
            document.getElementById('registrationForm').reset();
            
        } catch (error) {
            console.error('Registration error:', error);
            if (window.showNotification) {
                window.showNotification(
                    error.message.includes('already registered') 
                        ? 'This email is already registered. Please check your inbox for the verification link.'
                        : 'An error occurred. Please try again.',
                    'error'
                );
            }
        } finally {
            // Reset button state
            submitBtn.disabled = false;
            submitBtn.querySelector('.btn-text').style.display = 'inline';
            submitBtn.querySelector('.btn-loader').style.display = 'none';
            this.isSubmitting = false;
        }
    },
    
    // Resend verification email
    async resendEmail() {
        const email = document.getElementById('sentEmailAddress').textContent;
        if (email && window.authManager) {
            const result = await window.authManager.sendMagicLink(email);
            if (!result.error) {
                if (window.showNotification) {
                    window.showNotification('Verification email resent successfully', 'success');
                }
            }
        }
    },
    
    // Close functions
    closePreCheckIn() {
        if (this.preCheckInModal) {
            this.preCheckInModal.classList.remove('active');
        }
        document.body.style.overflow = '';
    },
    
    closeRegistration() {
        if (this.registrationModal) {
            this.registrationModal.classList.remove('active');
        }
        document.body.style.overflow = '';
    },
    
    closeEmailSent() {
        document.getElementById('emailSentModal').classList.remove('active');
        document.body.style.overflow = '';
    },
    
    closeUpgrade() {
        if (this.upgradeModal) {
            this.upgradeModal.classList.remove('active');
        }
        document.body.style.overflow = '';
    },
    
    closeAll() {
        document.querySelectorAll('.modal-overlay').forEach(modal => {
            modal.classList.remove('active');
        });
        document.body.style.overflow = '';
    }
};

// Export for use
if (typeof window !== 'undefined') {
    window.modalManager = modalManager;
}
