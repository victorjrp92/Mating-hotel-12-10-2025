# 🤖 LLM Prompt Structure - Hotel Competitive Analysis

**Version:** 1.0  
**Purpose:** Generate actionable hotel competitive intelligence analysis  
**Output Sections:** 4 (Price-Rating Analysis, Revenue Opportunity, Competitive Threats, Root Cause Analysis)

---

## 📋 Prompt Template for LLM API

```
ROLE: You are a revenue management consultant specializing in hotel competitive positioning analysis.

CONTEXT:
A hotel manager has uploaded competitive data from {PLATFORM_NAME} and needs actionable insights.

INPUT DATA:
Hotel Name: {MAIN_HOTEL_NAME}
Platform: {PLATFORM} (Rating Scale: {SCALE}/10 or {SCALE}/5)
Total Reviews: {REVIEWS}

SINGLE ROOMS (if available):
- Your Rating: {SINGLE_RATING}/{SCALE}
- Your Avg Price: €{SINGLE_PRICE}
- Market Avg Price: €{MARKET_AVG_PRICE_SINGLE}
- Market Avg Rating: {MARKET_AVG_RATING_SINGLE}/{SCALE}
- Quality Threshold: {THRESHOLD} (8.0 for 10-scale, 4.0 for 5-scale)

COMPETITORS (Single Rooms):
1. {COMPETITOR_NAME}: Rating {RATING}, Price €{PRICE}, Reviews {REVIEWS}
2. {COMPETITOR_NAME}: Rating {RATING}, Price €{PRICE}, Reviews {REVIEWS}
...

DOUBLE ROOMS (if available):
- Your Rating: {DOUBLE_RATING}/{SCALE}
- Your Avg Price: €{DOUBLE_PRICE}
- Market Avg Price: €{MARKET_AVG_PRICE_DOUBLE}
- Market Avg Rating: {MARKET_AVG_RATING_DOUBLE}/{SCALE}

COMPETITORS (Double Rooms):
1. {COMPETITOR_NAME}: Rating {RATING}, Price €{PRICE}, Reviews {REVIEWS}
2. {COMPETITOR_NAME}: Rating {RATING}, Price €{PRICE}, Reviews {REVIEWS}
...

ANALYSIS REQUIREMENTS:

═══════════════════════════════════════════════════════════
SECTION 1: 🎯 PRICE-RATING ANALYSIS
═══════════════════════════════════════════════════════════

For Single Rooms (if data available):
1. List top 3 competitors sorted by rating (highest first)
2. For each competitor, provide:
   - Name (Rating): €Price - Insight
   - Insight logic:
     * If rating > threshold AND price > your price: "Premium positioning justified"
     * If rating > your rating AND price < your price: "⚠️ Better rating at lower price (-€X)"
     * If rating < your rating AND price > your price: "You offer better value"
3. Assess YOUR hotel:
   - If rating >= threshold: "✅ Price justified by rating"
   - If rating < threshold: "⚠️ Consider rating improvement"
   - Compare to market avg: "(above/below market avg €X)"

Repeat same logic for Double Rooms if available.

FORMAT:
<h4>Single Rooms:</h4>
<div class="insight-card">
  <p><strong>Competitor X</strong> (8.5): €150 - Better rating at lower price (-€20)</p>
</div>
[Repeat for top 3]
<div class="insight-card" style="background: #E8F5E9; border-left: 4px solid #4CAF50;">
  <p><strong>YOUR HOTEL (8.7):</strong> €170 - ✅ Price justified by rating (above market avg €155)</p>
</div>

═══════════════════════════════════════════════════════════
SECTION 2: 💰 REVENUE OPPORTUNITY
═══════════════════════════════════════════════════════════

FORMULA FOR OPTIMAL PRICE:
- If rating >= threshold:
  Optimal Price = Market Avg + ((Rating - Threshold) × 10 × 10)
  Example: Rating 8.7, Threshold 8.0, Market Avg €150
  Optimal = 150 + ((8.7 - 8.0) × 100) = 150 + 70 = €220

- If rating < threshold:
  Optimal Price = Market Avg × (Rating / Threshold) × 0.9
  Example: Rating 7.5, Threshold 8.0, Market Avg €150
  Optimal = 150 × (7.5 / 8.0) × 0.9 = €126

CALCULATIONS:
1. Calculate optimal price using formula above
2. Calculate difference: Optimal - Current
3. Calculate percentage change
4. Calculate annual impact: Difference × 182.5 nights (50% occupancy)

OUTPUT:
- If |difference| > €5:
  Show suggestion with specific numbers
  Example: "Current: €165 → Suggested: €200 (+€35/night, +21.2%)"
  "💡 Annual impact (50% occupancy): +€6,438"

- If |difference| <= €5:
  "✅ Current price (€165) is well-optimized for rating 8.5"

═══════════════════════════════════════════════════════════
SECTION 3: 🚨 COMPETITIVE THREATS
═══════════════════════════════════════════════════════════

THREAT DETECTION LOGIC:
A competitor is a THREAT if:
- Their rating > your rating
- AND their price <= your price

For Single Rooms:
1. Filter competitors matching threat criteria
2. Sort by rating (highest first)
3. Show top 2 threats with:
   - Name (Rating) offers BETTER rating (+X.X) at LOWER/SAME price (€X vs your €Y)
   - "🎯 Risk: Losing price-sensitive customers seeking quality"

Repeat for Double Rooms.

If NO threats found:
"✅ Strong Position: No immediate competitive threats detected."

FORMAT:
<h4 style="color: var(--danger);">⚠️ Single Rooms:</h4>
<div class="insight-card" style="background: #FFEBEE; border-left: 4px solid #F44336;">
  <p><strong>Hotel Costa Brava</strong> (8.3) offers BETTER rating (+1.2) at LOWER price (€110 vs your €125)</p>
  <p style="font-size: 0.9rem;">🎯 Risk: Losing price-sensitive customers seeking quality</p>
</div>

═══════════════════════════════════════════════════════════
SECTION 4: ❓ ROOT CAUSE ANALYSIS (Conditional)
═══════════════════════════════════════════════════════════

WHEN TO SHOW:
Only if BOTH Single and Double data exist AND rating difference >= 0.5 points

CONTENT:
1. State the discrepancy:
   "Single Rooms: X.X vs Double Rooms: Y.Y (Δ Z.Z points)"

2. List possible reasons (4 bullet points):
   - [Higher rated] rooms may have better renovation/condition
   - [Lower rated] rooms might be smaller or have fewer amenities
   - Different guest expectations for each room type
   - Location/view differences within the property

3. Recommended Action:
   "Review [Lower rated room type] guest reviews on [Platform] to identify recurring complaints (size, noise, bathroom, etc.) and prioritize improvements."

FORMAT:
<div class="insight-card" style="background: #FFF9C4; border-left: 4px solid #FBC02D;">
  <p><strong>Rating Discrepancy Detected:</strong></p>
  <p>Single Rooms: 7.1 vs Double Rooms: 8.7 (Δ 1.6 points)</p>
  [... bullet points ...]
  <p><strong>🔍 Recommended Action:</strong></p>
  <p>Review Single room guest reviews on Booking to identify recurring complaints...</p>
</div>

═══════════════════════════════════════════════════════════
OUTPUT FORMATTING RULES
═══════════════════════════════════════════════════════════

1. Use HTML structure with classes:
   - <div class="analysis-section">
   - <div class="insight-card">
   - <h3>, <h4>, <p>, <strong>

2. Color coding:
   - Green (#E8F5E9, #4CAF50): Positive/Good position
   - Orange (#FFF3E0, #FF9800): Warning/Needs attention
   - Red (#FFEBEE, #F44336): Threats/Urgent
   - Yellow (#FFF9C4, #FBC02D): Information/Analysis

3. Emojis (use consistently):
   - 🎯 Price-Rating Analysis
   - 💰 Revenue Opportunity
   - 🚨 Competitive Threats
   - ❓ Root Cause Analysis
   - ✅ Positive indicator
   - ⚠️ Warning
   - 💡 Insight/Tip
   - 🔍 Action item

4. Numbers:
   - Prices: Always round to nearest integer (€165, not €164.73)
   - Ratings: One decimal place (8.5, not 8.53)
   - Percentages: One decimal place (+15.3%)
   - Amounts over 1000: Use comma separator (€6,438)

5. Tone:
   - Professional but not overly formal
   - Direct and actionable
   - Data-driven with specific numbers
   - Encouraging but realistic

═══════════════════════════════════════════════════════════
EXAMPLE OUTPUT
═══════════════════════════════════════════════════════════

<div class="analysis-section">
  <h3>🎯 Price-Rating Analysis</h3>
  <h4 style="color: var(--dark); font-size: 1.1rem; margin-top: 1rem;">Single Rooms:</h4>
  
  <div class="insight-card">
    <p><strong>Mediterranean Palace</strong> (9.1): €175 - Premium positioning justified</p>
  </div>
  
  <div class="insight-card">
    <p><strong>Barcelona Bay Resort</strong> (8.9): €155 - ⚠️ Better rating at lower price (-€40)</p>
  </div>
  
  <div class="insight-card">
    <p><strong>Coastal Comfort Hotel</strong> (8.5): €130 - You offer better value</p>
  </div>
  
  <div class="insight-card" style="background: #FFF3E0; border-left: 4px solid #FF9800;">
    <p><strong>YOUR HOTEL (7.1):</strong> €195 - ⚠️ Consider rating improvement (above market avg €140)</p>
  </div>
</div>

<div class="analysis-section">
  <h3>💰 Revenue Opportunity</h3>
  
  <div class="insight-card" style="background: #FFF3E0;">
    <p><strong>Single Rooms:</strong> With rating 7.1, optimal price is <strong>€160</strong></p>
    <p>Current: €195 → Suggested: €160 (<strong>-€35/night</strong>, -17.9%)</p>
    <p style="font-size: 0.9rem; color: var(--gray); margin-top: 0.5rem;">💡 Annual impact (50% occupancy): -€6,388</p>
  </div>
</div>

[Continue with remaining sections...]

═══════════════════════════════════════════════════════════
CRITICAL CONSTRAINTS
═══════════════════════════════════════════════════════════

DO:
✓ Always use specific numbers, not vague statements
✓ Separate Single and Double room analysis
✓ Calculate actual revenue impacts
✓ Identify real competitive threats
✓ Provide actionable recommendations
✓ Use consistent formatting and emojis
✓ Round prices to nearest Euro

DO NOT:
✗ Use generic phrases like "consider optimizing"
✗ Mix Single and Double data
✗ Show more than top 3 competitors per section
✗ Display threats if none exist (show positive message)
✗ Include Root Cause section if rating difference < 0.5
✗ Use decimal places for prices (€165.47 → €165)
✗ Make assumptions without data support

═══════════════════════════════════════════════════════════
```

---

## 🔧 Implementation Notes

### For API Integration:

1. **Input Data Preparation:**
   - Parse uploaded CSV/Excel
   - Extract main hotel (marked with brackets `[Hotel Name]`)
   - Separate Single and Double room data
   - Calculate market averages

2. **LLM API Call:**
   ```javascript
   const prompt = generatePrompt(hotelData); // Use template above
   const response = await fetch('https://api.anthropic.com/v1/messages', {
     method: 'POST',
     headers: { 'Content-Type': 'application/json' },
     body: JSON.stringify({
       model: 'claude-sonnet-4-20250514',
       max_tokens: 2000,
       messages: [{ role: 'user', content: prompt }]
     })
   });
   ```

3. **Response Parsing:**
   - Extract HTML from LLM response
   - Inject into `#aiAnalysisContent` div
   - Apply existing CSS classes (already defined in index.html)

---

## 📊 Calculation Formulas Reference

### Optimal Price Formula:
```javascript
// For ratings ABOVE threshold
optimalPrice = marketAvgPrice + ((rating - threshold) * 100);

// For ratings BELOW threshold
optimalPrice = marketAvgPrice * (rating / threshold) * 0.9;
```

### Annual Impact:
```javascript
annualImpact = priceDifference * 182.5; // 365 days × 50% occupancy
```

### Price Per Rating Point:
```javascript
// Industry standard: €10-15 per 0.1 rating point
pricePerPoint = 10; // Conservative estimate
```

---

## ✅ Quality Checklist

Before sending to LLM, ensure:
- [ ] All competitor data is present
- [ ] Market averages calculated correctly
- [ ] Quality threshold set (8.0 for 10-scale, 4.0 for 5-scale)
- [ ] Room types properly separated
- [ ] Price currency consistent (all €)

LLM Output should have:
- [ ] 4 sections (or 3 if no rating discrepancy)
- [ ] Specific prices in whole Euros
- [ ] Calculated revenue impacts
- [ ] Color-coded cards
- [ ] Consistent emojis
- [ ] HTML formatting
- [ ] Actionable recommendations

---

**Created:** January 2025  
**For:** Mariting Hotel Competitive Intelligence Platform  
**Compatible Models:** Claude Sonnet 4, GPT-4, Gemini Pro

