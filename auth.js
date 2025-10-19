// ============================================
// AUTHENTICATION MANAGEMENT
// ============================================

const AUTH_STATE_KEY = 'mariting_auth_state';
const SESSION_ID_KEY = 'mariting_session_id';

// Authentication state management
const authManager = {
    // Current user state
    currentUser: null,
    
    // Initialize authentication
    init() {
        // Check if Supabase is enabled
        if (typeof ENABLE_SUPABASE === 'undefined' || !ENABLE_SUPABASE) {
            console.log('Authentication system is disabled');
            return;
        }
        
        // Generate or retrieve session ID for A/B testing
        if (!sessionStorage.getItem(SESSION_ID_KEY)) {
            sessionStorage.setItem(SESSION_ID_KEY, this.generateSessionId());
        }
        
        // Check for existing auth state
        this.loadAuthState();
        
        // Listen for auth state changes from Supabase
        if (window.supabaseClient) {
            window.supabaseClient.auth.onAuthStateChange((event, session) => {
                console.log('Auth state changed:', event);
                if (event === 'SIGNED_IN' && session) {
                    this.handleSignIn(session.user);
                } else if (event === 'SIGNED_OUT') {
                    this.handleSignOut();
                }
            });
        }
        
        // Check URL for magic link confirmation
        this.checkMagicLinkConfirmation();
    },
    
    // Generate unique session ID for tracking
    generateSessionId() {
        return 'session_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    },
    
    // Get current session ID
    getSessionId() {
        return sessionStorage.getItem(SESSION_ID_KEY);
    },
    
    // Load auth state from localStorage
    loadAuthState() {
        const savedState = localStorage.getItem(AUTH_STATE_KEY);
        if (savedState) {
            try {
                this.currentUser = JSON.parse(savedState);
                this.updateUIAuthState();
            } catch (error) {
                console.error('Error loading auth state:', error);
                localStorage.removeItem(AUTH_STATE_KEY);
            }
        }
    },
    
    // Save auth state to localStorage
    saveAuthState(user) {
        if (user) {
            localStorage.setItem(AUTH_STATE_KEY, JSON.stringify(user));
        } else {
            localStorage.removeItem(AUTH_STATE_KEY);
        }
    },
    
    // Check if URL contains magic link confirmation
    async checkMagicLinkConfirmation() {
        // Check if we're coming back from email verification
        const urlParams = new URLSearchParams(window.location.search);
        const isEmailConfirmed = urlParams.get('email_confirmed') === 'true';
        
        if (isEmailConfirmed || window.location.hash.includes('access_token')) {
            console.log('Email verification detected');
            
            // Get the session from Supabase
            if (window.supabaseClient) {
                const { data: { session }, error } = await window.supabaseClient.auth.getSession();
                if (session && !error) {
                    await this.handleEmailVerification(session.user);
                }
            }
        }
    },
    
    // Handle successful email verification
    async handleEmailVerification(user) {
        console.log('Email verified for:', user.email);
        
        // Update user in database
        if (window.maritingDB) {
            await window.maritingDB.verifyUserEmail(user.email);
        }
        
        // Update local state
        this.currentUser = {
            email: user.email,
            verified: true,
            hasUsedFreeAnalysis: false,
            signedInAt: new Date().toISOString()
        };
        
        this.saveAuthState(this.currentUser);
        this.updateUIAuthState();
        
        // Show success message
        if (window.showNotification) {
            window.showNotification('Email verified successfully! Your free AI analysis is ready.', 'success');
        }
        
        // Clean URL
        window.history.replaceState({}, document.title, window.location.pathname);
        
        // Auto-trigger AI analysis if data is loaded
        if (window.uploadedData) {
            setTimeout(() => {
                if (window.openAIAnalysis) {
                    window.openAIAnalysis();
                }
            }, 1500);
        }
    },
    
    // Handle sign in
    handleSignIn(user) {
        console.log('User signed in:', user.email);
        
        this.currentUser = {
            email: user.email,
            verified: true,
            hasUsedFreeAnalysis: false,
            signedInAt: new Date().toISOString()
        };
        
        this.saveAuthState(this.currentUser);
        this.updateUIAuthState();
    },
    
    // Handle sign out
    handleSignOut() {
        console.log('User signed out');
        this.currentUser = null;
        this.saveAuthState(null);
        this.updateUIAuthState();
    },
    
    // Send magic link
    async sendMagicLink(email) {
        if (!window.supabaseClient) {
            console.error('Supabase not initialized');
            return { error: 'Authentication service not available' };
        }
        
        try {
            const { error } = await window.supabaseClient.auth.signInWithOtp({
                email: email,
                options: {
                    emailRedirectTo: window.location.origin + window.location.pathname + '?email_confirmed=true'
                }
            });
            
            if (error) throw error;
            return { success: true };
        } catch (error) {
            console.error('Error sending magic link:', error);
            return { error: error.message };
        }
    },
    
    // Check if user is authenticated
    isAuthenticated() {
        // If Supabase is disabled, return false (no auth required)
        if (typeof ENABLE_SUPABASE === 'undefined' || !ENABLE_SUPABASE) {
            return false;
        }
        return this.currentUser !== null && this.currentUser.verified === true;
    },
    
    // Check if user has remaining AI analyses
    async checkAIAnalysisCredits() {
        // If Supabase is disabled, always return unlimited credits
        if (typeof ENABLE_SUPABASE === 'undefined' || !ENABLE_SUPABASE) {
            return { hasCredits: true, credits: 999, needsAuth: false };
        }
        
        if (!this.isAuthenticated()) {
            return { hasCredits: false, needsAuth: true };
        }
        
        if (window.maritingDB) {
            const result = await window.maritingDB.checkUserAnalysisCredits(this.currentUser.email);
            if (!result.error) {
                return { 
                    hasCredits: result.credits > 0, 
                    credits: result.credits,
                    needsAuth: false 
                };
            }
        }
        
        // If we can't check, assume they have their free credit if not used
        return { 
            hasCredits: !this.currentUser.hasUsedFreeAnalysis, 
            credits: this.currentUser.hasUsedFreeAnalysis ? 0 : 1,
            needsAuth: false 
        };
    },
    
    // Mark free analysis as used
    markFreeAnalysisUsed() {
        if (this.currentUser) {
            this.currentUser.hasUsedFreeAnalysis = true;
            this.saveAuthState(this.currentUser);
        }
    },
    
    // Update UI based on auth state
    updateUIAuthState() {
        // Add or remove authenticated class from body
        if (this.isAuthenticated()) {
            document.body.classList.add('user-authenticated');
        } else {
            document.body.classList.remove('user-authenticated');
        }
        
        // Update any auth indicators in UI
        const authIndicator = document.getElementById('authIndicator');
        if (authIndicator) {
            if (this.isAuthenticated()) {
                authIndicator.innerHTML = `
                    <span style="color: var(--success); font-weight: 600;">
                        ✅ Verified Account
                    </span>
                `;
                authIndicator.style.display = 'block';
            } else {
                authIndicator.style.display = 'none';
            }
        }
    },
    
    // Get current user email
    getUserEmail() {
        return this.currentUser?.email || null;
    },
    
    // Sign out
    async signOut() {
        if (window.supabaseClient) {
            await window.supabaseClient.auth.signOut();
        }
        this.handleSignOut();
    }
};

// Export for use
if (typeof window !== 'undefined') {
    window.authManager = authManager;
}
