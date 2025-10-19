// ============================================
// A/B TESTING MANAGEMENT
// ============================================

const AB_VARIANT_KEY = 'mariting_ab_variant';

const abTestManager = {
    // Current variant
    currentVariant: null,
    
    // Variant content - Professional, no colorful emojis
    variants: {
        A: {
            headline: '847 Hotels Already Discovered This',
            subheadline: 'Your analysis is ready. In 2 minutes, you\'ll know:',
            benefits: [
                'Exact price you should charge (€X/night adjustment)',
                'Which competitor is stealing your customers',
                '3 actionable moves for THIS WEEK'
            ],
            socialProof: 'Join hotel managers getting €8-15K more per year.',
            cta: 'Show Me My Strategy',
            badge: 'Your first strategic analysis: FREE'
        },
        B: {
            headline: 'Are You Pricing Blind or Pricing Smart?',
            problemList: [
                'Losing bookings to lower-rated competitors',
                'Leaving €200+ per week on the table',
                'Missing the sweet spot between price and rating'
            ],
            solutionList: [
                'Know your EXACT optimal price',
                'Spot threats before they hurt you',
                'Get 3 actions to implement TODAY'
            ],
            cta: 'Get My Free Analysis',
            badge: 'Your personalized AI analysis: FREE (one time only)',
            testimonial: '"This analysis paid for itself in one weekend" - Hotel Manager, Barcelona'
        }
    },
    
    // Initialize A/B test
    init() {
        // Check if user already has a variant assigned
        const savedVariant = sessionStorage.getItem(AB_VARIANT_KEY);
        if (savedVariant && (savedVariant === 'A' || savedVariant === 'B')) {
            this.currentVariant = savedVariant;
        } else {
            // Randomly assign variant (50/50 split)
            this.currentVariant = Math.random() < 0.5 ? 'A' : 'B';
            sessionStorage.setItem(AB_VARIANT_KEY, this.currentVariant);
        }
        
        console.log('A/B Test Variant:', this.currentVariant);
    },
    
    // Get current variant
    getVariant() {
        if (!this.currentVariant) {
            this.init();
        }
        return this.currentVariant;
    },
    
    // Get variant content
    getVariantContent() {
        const variant = this.getVariant();
        return this.variants[variant];
    },
    
    // Track impression (when modal is shown)
    async trackImpression() {
        const sessionId = window.authManager?.getSessionId();
        const variant = this.getVariant();
        
        if (sessionId && window.maritingDB) {
            await window.maritingDB.trackABTestImpression(sessionId, variant);
        }
        
        // Also track locally for quick access
        const impressionData = {
            variant: variant,
            timestamp: new Date().toISOString(),
            sessionId: sessionId
        };
        
        // Store in sessionStorage for this session
        sessionStorage.setItem('mariting_ab_impression', JSON.stringify(impressionData));
    },
    
    // Track conversion (when form is submitted)
    async trackConversion() {
        const sessionId = window.authManager?.getSessionId();
        
        if (sessionId && window.maritingDB) {
            await window.maritingDB.trackABTestConversion(sessionId);
        }
        
        // Also track locally
        const conversionData = {
            variant: this.getVariant(),
            timestamp: new Date().toISOString(),
            sessionId: sessionId
        };
        
        sessionStorage.setItem('mariting_ab_conversion', JSON.stringify(conversionData));
    },
    
    // Generate HTML for variant A (Social Proof)
    generateVariantA(content) {
        return `
            <div class="modal-header-number">847</div>
            <h2 class="modal-title">${content.headline}</h2>
            
            <p class="modal-subtitle">${content.subheadline}</p>
            
            <div class="benefits-list">
                ${content.benefits.map(benefit => `
                    <div class="benefit-item">
                        <span class="benefit-icon">→</span>
                        <span>${benefit}</span>
                    </div>
                `).join('')}
            </div>
            
            <p class="social-proof">${content.socialProof}</p>
            
            <div class="badge-container">
                <span class="free-badge">${content.badge}</span>
            </div>
            
            <button class="btn-primary modal-cta" onclick="modalManager.showRegistrationForm()">
                ${content.cta} →
            </button>
        `;
    },
    
    // Generate HTML for variant B (Problem-Solution)
    generateVariantB(content) {
        return `
            <h2 class="modal-title">${content.headline}</h2>
            
            <div class="problem-section">
                <p class="section-label">Right now, you could be:</p>
                <div class="problem-list">
                    ${content.problemList.map(problem => `
                        <div class="problem-item">
                            <span class="problem-icon">×</span>
                            <span>${problem}</span>
                        </div>
                    `).join('')}
                </div>
            </div>
            
            <div class="or-divider">Or...</div>
            
            <div class="solution-section">
                <div class="solution-list">
                    ${content.solutionList.map(solution => `
                        <div class="solution-item">
                            <span class="solution-icon">→</span>
                            <span>${solution}</span>
                        </div>
                    `).join('')}
                </div>
            </div>
            
            <div class="badge-container">
                <span class="free-badge">${content.badge}</span>
            </div>
            
            <button class="btn-primary modal-cta" onclick="modalManager.showRegistrationForm()">
                ${content.cta} →
            </button>
            
            <div class="testimonial">
                <p>${content.testimonial}</p>
            </div>
        `;
    },
    
    // Get modal HTML for current variant
    getModalHTML() {
        const variant = this.getVariant();
        const content = this.getVariantContent();
        
        if (variant === 'A') {
            return this.generateVariantA(content);
        } else {
            return this.generateVariantB(content);
        }
    }
};

// Export for use
if (typeof window !== 'undefined') {
    window.abTestManager = abTestManager;
}
