
// ============================================
// WEB FORM FUNCTIONALITY - v3.0.0
// ============================================
let currentFormStep = 1;
let webFormData = {
    competitors: [],
    pricing: []
};

// Form Toggle
function toggleFormWeb() {
    const formContent = document.getElementById('formContent');
    const header = document.querySelector('.form-header');
    formContent.classList.toggle('collapsed');
    header.classList.toggle('collapsed');
}

// Navigation
function nextFormStep() {
    if (!validateFormStep(currentFormStep)) {
        return;
    }
    
    if (currentFormStep < 4) {
        saveFormStepData(currentFormStep);
        
        document.getElementById(`formStep${currentFormStep}`).classList.remove('active');
        const currentStepEl = document.querySelector(`.step-item[data-step="${currentFormStep}"]`);
        if (currentStepEl) {
            currentStepEl.classList.remove('active');
            currentStepEl.classList.add('completed');
        }
        
        currentFormStep++;
        
        document.getElementById(`formStep${currentFormStep}`).classList.add('active');
        const nextStepEl = document.querySelector(`.step-item[data-step="${currentFormStep}"]`);
        if (nextStepEl) {
            nextStepEl.classList.add('active');
        }
        
        // Update buttons visibility
        updateButtonsVisibility();
        
        if (currentFormStep === 3) {
            generateFormPricingSection();
        } else if (currentFormStep === 4) {
            generateFormReviewSection();
        }
        
        // Scroll to form section
        document.querySelector('.main-form-section')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}

function prevFormStep() {
    if (currentFormStep > 1) {
        document.getElementById(`formStep${currentFormStep}`).classList.remove('active');
        const currentStepEl = document.querySelector(`.step-item[data-step="${currentFormStep}"]`);
        if (currentStepEl) {
            currentStepEl.classList.remove('active');
        }
        
        currentFormStep--;
        
        document.getElementById(`formStep${currentFormStep}`).classList.add('active');
        const prevStepEl = document.querySelector(`.step-item[data-step="${currentFormStep}"]`);
        if (prevStepEl) {
            prevStepEl.classList.remove('completed');
            prevStepEl.classList.add('active');
        }
        
        // Update buttons visibility
        updateButtonsVisibility();
        
        // Scroll to form section
        document.querySelector('.main-form-section')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}

function updateFormProgressBar() {
    // Progress bar no longer needed with new design
    // Kept for backward compatibility
}

function updateButtonsVisibility() {
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const submitBtn = document.getElementById('submitBtn');
    
    console.log('Updating buttons for step:', currentFormStep);
    
    if (prevBtn && nextBtn && submitBtn) {
        if (currentFormStep === 1) {
            prevBtn.style.display = 'none';
            nextBtn.style.display = 'inline-flex';
            submitBtn.style.display = 'none';
        } else if (currentFormStep === 4) {
            prevBtn.style.display = 'inline-flex';
            nextBtn.style.display = 'none';
            submitBtn.style.display = 'inline-flex';
        } else {
            prevBtn.style.display = 'inline-flex';
            nextBtn.style.display = 'inline-flex';
            submitBtn.style.display = 'none';
        }
    } else {
        console.error('Buttons not found:', { prevBtn, nextBtn, submitBtn });
    }
}

// Validation
function validateFormStep(step) {
    if (step === 1) {
        const hotelName = document.getElementById('formHotelName').value.trim();
        const platform = document.getElementById('formPlatform').value;
        const roomType = document.getElementById('formRoomType').value;
        const analysisPeriod = document.getElementById('formAnalysisPeriod').value;
        const startDate = document.getElementById('formStartDate').value;
        const rating = document.getElementById('formRating').value;
        const reviews = document.getElementById('formReviews').value;
        
        if (!hotelName || !platform || !roomType || !analysisPeriod || !startDate || !rating || !reviews) {
            showNotification('Please fill in all required fields', 'error');
            return false;
        }
        
        if (rating < 0 || rating > 10) {
            showNotification('Rating must be between 0 and 10', 'error');
            return false;
        }
        
        if (reviews < 1) {
            showNotification('Number of reviews must be at least 1', 'error');
            return false;
        }
        
        return true;
    }
    
    if (step === 2) {
        const competitors = document.querySelectorAll('.competitor-card');
        
        if (competitors.length === 0) {
            showNotification('Please add at least 1 competitor', 'error');
            return false;
        }
        
        for (let i = 0; i < competitors.length; i++) {
            const card = competitors[i];
            const name = card.querySelector('.comp-name').value.trim();
            const rating = card.querySelector('.comp-rating').value;
            const reviews = card.querySelector('.comp-reviews').value;
            
            if (!name || !rating || !reviews) {
                showNotification(`Please fill in all fields for Competitor ${i + 1}`, 'error');
                return false;
            }
            
            if (rating < 0 || rating > 10) {
                showNotification(`Rating for Competitor ${i + 1} must be between 0 and 10`, 'error');
                return false;
            }
            
            if (reviews < 1) {
                showNotification(`Number of reviews for Competitor ${i + 1} must be at least 1`, 'error');
                return false;
            }
        }
        
        return true;
    }
    
    if (step === 3) {
        console.log('Validating step 3...');
        console.log('webFormData:', webFormData);
        
        const analysisPeriod = webFormData.analysisPeriod;
        const pricingCards = document.querySelectorAll('.pricing-card');
        
        console.log('analysisPeriod:', analysisPeriod);
        console.log('pricingCards found:', pricingCards.length);
        
        if (pricingCards.length === 0) {
            showNotification('No pricing cards found. Please go back and try again.', 'error');
            return false;
        }
        
        // CRITICAL FIX: Only validate cards that should exist
        // 1 main hotel + competitors from step 2
        const expectedCards = 1 + (webFormData.competitors?.length || 0);
        console.log('Expected cards:', expectedCards, '(1 main hotel +', webFormData.competitors?.length || 0, 'competitors)');
        
        let allHotelsHavePrices = true;
        let hotelsMissingPrices = [];
        
        // Only validate the first expectedCards (ignore any extra empty cards)
        for (let i = 0; i < Math.min(expectedCards, pricingCards.length); i++) {
            const card = pricingCards[i];
            const hotelName = card.querySelector('.pricing-hotel-name')?.textContent.replace('YOUR HOTEL: ', '').trim() || `Hotel ${i + 1}`;
            const inputs = card.querySelectorAll('.price-input');
            const filledPrices = Array.from(inputs).filter(input => {
                const value = input.value.trim();
                return value !== '' && !isNaN(parseFloat(value)) && parseFloat(value) > 0;
            });
            
            console.log(`${hotelName}: ${filledPrices.length} prices filled out of ${inputs.length}`);
            
            // Validaciones específicas por periodo
            if (analysisPeriod === 'full_week' && filledPrices.length < 3) {
                allHotelsHavePrices = false;
                hotelsMissingPrices.push(`${hotelName} (needs at least 3 days, has ${filledPrices.length})`);
            } else if (analysisPeriod === 'single_day' && filledPrices.length < 1) {
                allHotelsHavePrices = false;
                hotelsMissingPrices.push(`${hotelName} (needs 1 day, has ${filledPrices.length})`);
            } else if (analysisPeriod === 'weekend' && filledPrices.length < 2) {
                allHotelsHavePrices = false;
                hotelsMissingPrices.push(`${hotelName} (needs 2 days, has ${filledPrices.length})`);
            }
        }
        
        if (!allHotelsHavePrices) {
            console.error('Missing prices for:', hotelsMissingPrices);
            showNotification(`Please fill prices for: ${hotelsMissingPrices[0]}`, 'error');
            return false;
        }
        
        console.log('Step 3 validation passed!');
        return true;
    }
    
    return true;
}

// Save Step Data
function saveFormStepData(step) {
    if (step === 1) {
        webFormData.hotelName = document.getElementById('formHotelName').value.trim();
        webFormData.platform = document.getElementById('formPlatform').value;
        webFormData.roomType = document.getElementById('formRoomType').value;
        webFormData.analysisPeriod = document.getElementById('formAnalysisPeriod').value;
        webFormData.startDate = document.getElementById('formStartDate').value;
        webFormData.rating = parseFloat(document.getElementById('formRating').value);
        webFormData.reviews = parseInt(document.getElementById('formReviews').value);
    }
    
    if (step === 2) {
        webFormData.competitors = [];
        const competitors = document.querySelectorAll('.competitor-card');
        
        competitors.forEach(card => {
            webFormData.competitors.push({
                name: card.querySelector('.comp-name').value.trim(),
                rating: parseFloat(card.querySelector('.comp-rating').value),
                reviews: parseInt(card.querySelector('.comp-reviews').value)
            });
        });
    }
    
    if (step === 3) {
        console.log('Saving step 3 data...');
        
        const pricingCards = document.querySelectorAll('.pricing-card');
        webFormData.pricing = [];
        
        // CRITICAL FIX: Only save cards that should exist
        const expectedCards = 1 + (webFormData.competitors?.length || 0);
        console.log('Saving data for', expectedCards, 'cards');
        
        // Only process the first expectedCards (ignore any extra empty cards)
        for (let i = 0; i < Math.min(expectedCards, pricingCards.length); i++) {
            const card = pricingCards[i];
            
            // Safely get elements with null checks
            const nameEl = card.querySelector('.pricing-hotel-name');
            const breakfastEl = card.querySelector('.breakfast-checkbox input');
            
            if (!nameEl) {
                console.warn(`Card ${i} missing name element, skipping`);
                continue;
            }
            
            const hotelData = {
                name: nameEl.textContent.replace('YOUR HOTEL: ', '').trim(),
                includesBreakfast: breakfastEl ? breakfastEl.checked : false,
                prices: {}
            };
            
            const priceInputs = card.querySelectorAll('.price-input');
            priceInputs.forEach(input => {
                const day = input.dataset.day;
                const value = input.value.trim();
                hotelData.prices[day] = value ? parseFloat(value) : null;
            });
            
            webFormData.pricing.push(hotelData);
            console.log('Saved:', hotelData.name);
        }
        
        console.log('Step 3 data saved:', webFormData.pricing);
    }
}

// Competitors
let formCompetitorCount = 0;

function addFormCompetitor() {
    if (formCompetitorCount >= 8) {
        showNotification('Maximum 8 competitors allowed', 'error');
        return;
    }
    
    formCompetitorCount++;
    
    const container = document.getElementById('formCompetitorsContainer');
    const card = document.createElement('div');
    card.className = 'competitor-card';
    card.innerHTML = `
        <div class="competitor-header">
            <span class="competitor-number">Competitor ${formCompetitorCount}</span>
            <button type="button" class="remove-competitor" onclick="removeFormCompetitor(this)">Remove</button>
        </div>
        <div class="form-grid">
            <div class="form-group">
                <label>Hotel Name <span class="required">*</span></label>
                <input type="text" class="comp-name" placeholder="e.g., Royal Suites" required>
            </div>
            <div class="form-group">
                <label>Rating (0-10) <span class="required">*</span></label>
                <input type="number" class="comp-rating" min="0" max="10" step="0.1" placeholder="8.2" required>
            </div>
            <div class="form-group">
                <label>Number of Reviews <span class="required">*</span></label>
                <input type="number" class="comp-reviews" min="1" placeholder="180" required>
            </div>
        </div>
    `;
    
    container.appendChild(card);
}

function removeFormCompetitor(button) {
    if (document.querySelectorAll('.competitor-card').length <= 1) {
        showNotification('You must have at least 1 competitor', 'error');
        return;
    }
    
    button.closest('.competitor-card').remove();
    
    // Renumber competitors
    const competitors = document.querySelectorAll('.competitor-card');
    competitors.forEach((card, index) => {
        card.querySelector('.competitor-number').textContent = `Competitor ${index + 1}`;
    });
    
    formCompetitorCount = competitors.length;
}

// Initialize form on page load
document.addEventListener('DOMContentLoaded', function() {
    if (document.getElementById('formCompetitorsContainer')) {
        addFormCompetitor();
    }
    
    // Initialize button visibility
    updateButtonsVisibility();
});

// Pricing Section
function handleFormPeriodChange() {
    const period = document.getElementById('formAnalysisPeriod').value;
    const helper = document.getElementById('formPeriodHelper');
    
    if (period === 'full_week') {
        helper.textContent = 'Select the Monday that starts your analysis week. You must fill at least 3 days.';
    } else if (period === 'single_day') {
        helper.textContent = 'Select the specific date you want to analyze for all hotels.';
    } else if (period === 'weekend') {
        helper.textContent = 'Select the weekend (Saturday-Sunday) you want to analyze.';
    }
}

function generateFormPricingSection() {
    console.log('Generating pricing section...');
    console.log('webFormData:', webFormData);
    
    const container = document.getElementById('formPricingContainer');
    if (!container) {
        console.error('formPricingContainer not found!');
        showNotification('Error: Pricing container not found', 'error');
        return;
    }
    
    container.innerHTML = '<p style="text-align: center; color: #666; padding: 2rem;">Loading pricing section...</p>';
    
    try {
        const period = webFormData.analysisPeriod;
        const startDate = new Date(webFormData.startDate);
        
        console.log('Period:', period);
        console.log('Start Date:', startDate);
        
        let days = [];
        const descElement = document.getElementById('formPricingDescription');
        
        if (period === 'full_week') {
            days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
            if (descElement) descElement.textContent = 'Enter prices for at least 3 days of the week';
        } else if (period === 'single_day') {
            const dayName = startDate.toLocaleDateString('en-US', { weekday: 'long' });
            days = [dayName];
            if (descElement) descElement.textContent = 'Enter price for the selected day';
        } else if (period === 'weekend') {
            days = ['Saturday', 'Sunday'];
            if (descElement) descElement.textContent = 'Enter prices for both Saturday and Sunday';
        }
        
        console.log('Days:', days);
        console.log('Creating cards for:', webFormData.hotelName, 'and', webFormData.competitors.length, 'competitors');
        
        // Clear loading message
        container.innerHTML = '';
        
        // Your hotel
        createFormPricingCard(webFormData.hotelName, days, true);
        
        // Competitors
        webFormData.competitors.forEach(comp => {
            createFormPricingCard(comp.name, days, false);
        });
        
        console.log('Pricing section generated successfully');
    } catch (error) {
        console.error('Error generating pricing section:', error);
        container.innerHTML = `
            <div style="background: #fee; border: 2px solid #f88; border-radius: 8px; padding: 2rem; text-align: center;">
                <h3 style="color: #c00; margin-bottom: 1rem;">Error Loading Pricing Section</h3>
                <p style="color: #666; margin-bottom: 1rem;">${error.message}</p>
                <p style="color: #666; font-size: 0.9rem;">Please check the browser console for more details.</p>
            </div>
        `;
        showNotification('Error generating pricing section. Check console.', 'error');
    }
}

function createFormPricingCard(hotelName, days, isMain) {
    console.log('Creating pricing card for:', hotelName, 'isMain:', isMain);
    
    const container = document.getElementById('formPricingContainer');
    if (!container) {
        console.error('formPricingContainer not found in createFormPricingCard!');
        return;
    }
    
    const card = document.createElement('div');
    card.className = 'pricing-card';
    
    let daysHTML = '';
    days.forEach(day => {
        daysHTML += `
            <div class="price-input-group">
                <label>${day}</label>
                <input type="number" class="price-input" data-day="${day}" min="0.01" step="0.01" placeholder="€120">
            </div>
        `;
    });
    
    card.innerHTML = `
        <div class="pricing-hotel-name ${isMain ? 'main-hotel' : ''}">
            ${isMain ? 'YOUR HOTEL: ' : ''}${hotelName}
        </div>
        <div class="breakfast-checkbox">
            <input type="checkbox" id="breakfast-${hotelName.replace(/\s+/g, '-')}">
            <label for="breakfast-${hotelName.replace(/\s+/g, '-')}">
                Includes Breakfast?
                <span class="optional-badge">OPTIONAL</span>
            </label>
        </div>
        <div class="pricing-grid">
            ${daysHTML}
        </div>
    `;
    
    container.appendChild(card);
    console.log('Card created and appended for:', hotelName);
}

// Review Section
function generateFormReviewSection() {
    const container = document.getElementById('formReviewContainer');
    
    let competitorsList = webFormData.competitors.map(c => c.name).join(', ');
    
    let periodText = '';
    if (webFormData.analysisPeriod === 'full_week') {
        periodText = 'Full Week (Monday-Sunday)';
    } else if (webFormData.analysisPeriod === 'single_day') {
        periodText = 'Single Day';
    } else if (webFormData.analysisPeriod === 'weekend') {
        periodText = 'Weekend (Saturday-Sunday)';
    }
    
    let roomTypeText = '';
    if (webFormData.roomType === 'single') {
        roomTypeText = 'Single Room only';
    } else if (webFormData.roomType === 'double') {
        roomTypeText = 'Double Room only';
    } else if (webFormData.roomType === 'both') {
        roomTypeText = 'Both (Single + Double)';
    }
    
    container.innerHTML = `
        <div class="review-item">
            <h4>Basic Information</h4>
            <p><strong>Your Hotel:</strong> ${webFormData.hotelName}</p>
            <p><strong>Platform:</strong> ${webFormData.platform}</p>
            <p><strong>Room Type:</strong> ${roomTypeText}</p>
            <p><strong>Your Rating:</strong> ${webFormData.rating}/10</p>
            <p><strong>Your Reviews:</strong> ${webFormData.reviews}</p>
        </div>
        
        <div class="review-item">
            <h4>Analysis Configuration</h4>
            <p><strong>Period:</strong> ${periodText}</p>
            <p><strong>Start Date:</strong> ${webFormData.startDate}</p>
        </div>
        
        <div class="review-item">
            <h4>Competitors (${webFormData.competitors.length})</h4>
            <p>${competitorsList}</p>
        </div>
    `;
}

// Submit - Convert to uploadedData and generate analysis DIRECTLY from form
function submitWebFormAnalysis() {
    // Save step 3 data
    saveFormStepData(3);
    
    // Convert webFormData to uploadedData structure
    uploadedData = convertWebFormToUploadedData(webFormData);
    
    console.log('Generated uploadedData:', uploadedData);
    console.log('Form data:', webFormData);
    
    // Collapse form
    toggleFormWeb();
    
    // Show success notification
    showNotification('✨ Generating your analysis...', 'success');
    
    // Generate analysis directly without showing Configure Analysis
    generateAnalysisFromForm();
}

// Convert webFormData to uploadedData structure (same as parseExcel generates)
function convertWebFormToUploadedData(formData) {
    const platformInfo = detectPlatform(formData.platform);
    
    const data = {
        platform: formData.platform,
        platformInfo: platformInfo,
        single: [],
        double: []
    };
    
    // Process single room data
    if (formData.roomType === 'single' || formData.roomType === 'both') {
        // Add main hotel
        const mainHotelPricing = formData.pricing.find(p => p.name === formData.hotelName);
        data.single.push({
            name: formData.hotelName,
            isMain: true,
            rating: formData.rating,
            reviews: formData.reviews,
            includesBreakfast: mainHotelPricing ? mainHotelPricing.includesBreakfast : false,
            prices: mainHotelPricing ? mainHotelPricing.prices : {}
        });
        
        // Add competitors
        formData.competitors.forEach(comp => {
            const compPricing = formData.pricing.find(p => p.name === comp.name);
            data.single.push({
                name: comp.name,
                isMain: false,
                rating: comp.rating,
                reviews: comp.reviews,
                includesBreakfast: compPricing ? compPricing.includesBreakfast : false,
                prices: compPricing ? compPricing.prices : {}
            });
        });
    }
    
    // Process double room data (if both selected, use same data for now)
    if (formData.roomType === 'double' || formData.roomType === 'both') {
        // Add main hotel
        const mainHotelPricing = formData.pricing.find(p => p.name === formData.hotelName);
        data.double.push({
            name: formData.hotelName,
            isMain: true,
            rating: formData.rating,
            reviews: formData.reviews,
            includesBreakfast: mainHotelPricing ? mainHotelPricing.includesBreakfast : false,
            prices: mainHotelPricing ? mainHotelPricing.prices : {}
        });
        
        // Add competitors
        formData.competitors.forEach(comp => {
            const compPricing = formData.pricing.find(p => p.name === comp.name);
            data.double.push({
                name: comp.name,
                isMain: false,
                rating: comp.rating,
                reviews: comp.reviews,
                includesBreakfast: compPricing ? compPricing.includesBreakfast : false,
                prices: compPricing ? compPricing.prices : {}
            });
        });
    }
    
    return data;
}

// Generate analysis directly from form data (no Configure Analysis step)
function generateAnalysisFromForm() {
    if (!uploadedData || !webFormData) {
        showNotification('Error: Form data not found', 'error');
        return;
    }
    
    // Clear previous charts
    document.getElementById('chartsContainer').innerHTML = '';
    if (typeof charts !== 'undefined' && charts.length > 0) {
        charts.forEach(chart => chart.destroy());
        charts = [];
    }
    
    // Determine which room types to analyze based on form
    const analyzeSingle = webFormData.roomType === 'single' || webFormData.roomType === 'both';
    const analyzeDouble = webFormData.roomType === 'double' || webFormData.roomType === 'both';
    
    // Determine which days to analyze based on form period
    let daysToAnalyze = [];
    if (webFormData.analysisPeriod === 'full_week') {
        daysToAnalyze = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    } else if (webFormData.analysisPeriod === 'single_day') {
        // Get the day of week from startDate
        const date = new Date(webFormData.startDate);
        const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        daysToAnalyze = [dayNames[date.getDay()]];
    } else if (webFormData.analysisPeriod === 'weekend') {
        daysToAnalyze = ['Saturday', 'Sunday'];
    }
    
    console.log('Analyzing room types:', { single: analyzeSingle, double: analyzeDouble });
    console.log('Analyzing days:', daysToAnalyze);
    
    // Small delay for better UX
    setTimeout(() => {
        // Generate charts using the existing createChart function from app.js
        if (analyzeSingle && uploadedData.single && uploadedData.single.length > 0) {
            daysToAnalyze.forEach(day => {
                createChart(uploadedData.single, 'Single', day);
            });
        }
        
        if (analyzeDouble && uploadedData.double && uploadedData.double.length > 0) {
            daysToAnalyze.forEach(day => {
                createChart(uploadedData.double, 'Double', day);
            });
        }
        
        // Show AI analysis button
        document.getElementById('aiAnalysisSection').classList.remove('hidden');
        
        // Smooth scroll to charts
        setTimeout(() => {
            document.getElementById('chartsContainer').scrollIntoView({ 
                behavior: 'smooth', 
                block: 'start' 
            });
        }, 300);
        
        // Success notification
        showNotification('✅ Analysis generated successfully!', 'success');
    }, 500);
}

// Notification system
function showNotification(message, type = 'info') {
    // Remove existing notification if any
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    // Add to body
    document.body.appendChild(notification);
    
    // Remove after 4 seconds
    setTimeout(() => {
        notification.style.opacity = '0';
        setTimeout(() => notification.remove(), 300);
    }, 4000);
}
