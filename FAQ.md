# Mariting 2.0 - Frequently Asked Questions (FAQ)

## 📚 General Questions

### What is Mariting?
Mariting is a competitive intelligence platform designed specifically for hotels. It helps you understand your market position by visualizing how your pricing and ratings compare to competitors through interactive scatter plot charts.

### Who should use Mariting?
- **Hotel Managers:** Make data-driven pricing decisions
- **Revenue Managers:** Optimize pricing strategies
- **Marketing Teams:** Understand competitive positioning
- **Hotel Owners:** Track performance vs. competition
- **Consultants:** Analyze multiple properties

### Is Mariting free to use?
Yes! Mariting 2.0 is completely free. All processing happens in your browser - no servers, no subscriptions, no hidden costs.

### Do I need to install anything?
No installation required! Simply open the `index.html` file in any modern web browser (Chrome, Firefox, Safari, or Edge).

### Does my data go to any server?
No! All data processing happens entirely in your browser. Your competitor data never leaves your computer, ensuring complete privacy and security.

### Can I use it offline?
After the first load (which downloads the chart library), Mariting works completely offline. Perfect for hotels with limited internet connectivity.

---

## 📊 Data & Templates

### What file formats are supported?
Mariting supports:
- **CSV** (Comma Separated Values) - Recommended
- **XLSX** (Excel 2007+)
- **XLS** (Legacy Excel)

CSV is recommended for best compatibility and smallest file size.

### How do I download the template?
1. Open Mariting in your browser
2. Select your language (EN/ES/DE)
3. Click "Download Template" button
4. Choose your language version
5. Save the CSV file

### Can I create my own template?
Yes! As long as you follow these rules:
- Include `Platform:` field in first few rows
- Mark your hotel with brackets: `[Your Hotel Name]`
- Include sections: `SINGLE ROOMS` and `DOUBLE ROOMS`
- Columns: Hotel Name, Rating, Mon-Sun, Reviews Num

### How many competitors can I add?
- **Minimum:** 1 competitor (plus your hotel)
- **Maximum:** 7 competitors
- **Recommended:** 5-6 competitors for best insights

### What if I only have data for one day?
That's perfectly fine! You only need data for ONE day minimum. Just fill that day's column for all hotels and leave others blank.

### Can I use different room types?
Yes! You can analyze:
- Only Single rooms
- Only Double rooms
- Both Single and Double rooms

Just fill the sections you want to analyze.

### What currency should I use?
Use any currency you prefer (€, $, £, etc.), but **use the same currency** for all hotels in your analysis. The app will strip currency symbols and process the numbers.

---

## 🎯 Platform & Ratings

### Which platforms are supported?
Mariting supports any booking platform:
- **10-point scale:** Booking.com, Trivago
- **5-point scale:** Airbnb, Expedia, Google Hotels, TripAdvisor
- **Custom platforms:** Any platform you specify

### How do I know which rating scale to use?
Check the platform's rating display:
- If ratings show as "8.5/10" or "9.2/10" → Use 1-10 scale
- If ratings show as "4.5 stars" or "4.8★" → Use 1-5 scale

### Can I mix platforms in one analysis?
No. Each analysis should use ONE platform only. If you want to compare across platforms, create separate analyses for each.

### What's the "Confidence Threshold"?
The confidence threshold is the rating above which customers feel confident booking:
- **8.0** for 10-point scales (Booking, Trivago)
- **4.0** for 5-point scales (Airbnb, Expedia, etc.)

Below these thresholds, customers hesitate to book regardless of price.

### Why is the threshold 8.0 and not 7.0?
Research shows that on 10-point scales, customer booking behavior changes significantly at 8.0. Hotels below 8.0 experience booking resistance even at lower prices.

---

## 📈 Analysis & Charts

### How do I interpret the quadrants?

**🏆 Top Right (Premium):**
- High rating + High price
- Strong position, justified pricing
- Action: Maintain quality

**💎 Top Left (Value Leader):**
- High rating + Low price
- Underpriced for quality
- Action: Consider price increases

**⚠️ Bottom Right (Overpriced):**
- Low rating + High price
- Poor value perception
- Action: Improve rating OR reduce price

**💰 Bottom Left (Budget):**
- Low rating + Low price
- Budget segment positioning
- Action: Decide strategy (stay budget or improve)

### What do the bubble sizes mean?
Bubble size represents the number of reviews:
- **Larger bubbles** = More reviews = More credibility
- **Smaller bubbles** = Fewer reviews = Less credibility

Review count is crucial for booking decisions.

### Why is my hotel shown in blue?
Your main hotel (marked with brackets in the template) is always shown in blue to make it easy to spot. Competitors are shown in pink.

### What do the crosshair lines represent?
- **Vertical line:** Average price of all hotels analyzed
- **Horizontal line:** Confidence threshold rating

These lines divide the chart into the four strategic quadrants.

### Can I download the charts?
Yes! Each chart has a "Download" button that saves it as a PNG image. Perfect for presentations and reports.

### How many charts will be generated?
It depends on your selections:
- **All days selected:** 7 charts per room type
- **Specific day:** 1 chart per room type
- **Both room types:** Charts for both Single and Double

Maximum: 14 charts (7 days × 2 room types)

---

## 🤖 AI Analysis

### What is the AI Analysis feature?
After generating your charts, click "AI Strategic Analysis" to get:
- Your current market position assessment
- Comparison to market averages
- Strategic recommendations
- Revenue optimization suggestions

### Is the AI analysis accurate?
The AI analysis provides strategic insights based on your data and industry benchmarks. Use it as a guide, not as the sole decision-maker. Always consider your unique situation.

### Can I export the AI analysis?
Currently, you can copy the text from the AI analysis modal. PDF export is planned for a future update.

### Does the AI analysis cost extra?
No, it's included free with Mariting 2.0.

---

## 🌍 Languages

### Which languages are available?
- 🇺🇸 **English**
- 🇪🇸 **Spanish** (Español)
- 🇩🇪 **German** (Deutsch)

### Can I switch languages?
Yes! Click any language button in the top-right corner to switch instantly. Your preference is saved automatically.

### Are the templates available in all languages?
Yes! Download templates in:
- `template_en.csv` - English
- `template_es.csv` - Spanish
- `template_de.csv` - German

### Will more languages be added?
We're considering French, Italian, and Portuguese. Contact us if you need a specific language.

---

## 🔧 Technical Issues

### The file won't upload
**Try these solutions:**
1. Check file format is CSV or XLSX
2. Ensure file isn't open in Excel
3. Try re-saving the file
4. Download a fresh template
5. Try CSV instead of XLSX
6. Check file isn't corrupted

### No charts appear after clicking "Generate"
**Common causes:**
1. **No prices:** Ensure at least one day has prices
2. **Missing brackets:** Your hotel must be marked with `[Name]`
3. **Invalid ratings:** Must be 1-10 or 1-5 range
4. **No competitors:** Need at least 1 competitor

**Solution:** Check the demo files to see correct format.

### Charts look wrong or distorted
**Possible issues:**
1. **Mixed currencies:** Use same currency for all
2. **Different dates:** All prices must be from same date
3. **Wrong rating scale:** Check platform's scale
4. **Data entry errors:** Verify numbers are correct

### The page is slow or freezing
**Optimization tips:**
1. Close other browser tabs
2. Use Chrome or Firefox for best performance
3. Analyze fewer days at once
4. Reduce number of competitors
5. Clear browser cache

### Browser compatibility issues
**Minimum requirements:**
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

**Not supported:**
- Internet Explorer (discontinued)
- Very old mobile browsers

### Can't see the language selector
Check that you're viewing the page in a sufficiently wide browser window. On very narrow screens, some elements may stack vertically.

---

## 💼 Business Questions

### How often should I update my analysis?
**Recommended frequency:**
- **Weekly:** If in very competitive market
- **Bi-weekly:** For most hotels
- **Monthly:** Minimum recommended
- **Quarterly:** For stable markets

Regular analysis helps spot trends early.

### Should I share my analysis?
**Share with:**
- Your revenue team
- Hotel management
- Marketing team
- Ownership (quarterly)

**Don't share publicly:**
- Competitor data is sensitive
- Keep strategic insights internal

### Can I analyze multiple properties?
Yes! Create separate analyses for each property. Save each with a descriptive filename (e.g., `downtown_hotel_jan2025.csv`).

### How do I compare my property over time?
1. Save each month's analysis file
2. Save generated charts with date
3. Compare charts side-by-side
4. Track movement between quadrants
5. Monitor rating and price trends

### What if I don't know my competitors?
**How to identify competitors:**
1. Check your city on Booking.com
2. Filter by similar rating (+/- 1 point)
3. Check distance (same area)
4. Similar price range (+/- 20%)
5. Similar property type
6. Guest reviews mention them

### Can I use this for Airbnb properties?
Absolutely! Mariting works great for:
- Traditional hotels
- Airbnb listings
- Vacation rentals
- Bed & Breakfasts
- Hostels
- Boutique hotels
- Any accommodation with online reviews

---

## 📱 Mobile & Devices

### Does Mariting work on mobile?
Yes! Mariting is fully responsive and works on:
- Smartphones (iOS, Android)
- Tablets (iPad, Android tablets)
- Desktop computers
- Laptops

### Is there a mobile app?
Not yet, but the web version works perfectly on mobile browsers. Mobile apps (iOS/Android) are in our roadmap.

### Can I use it on iPad?
Yes! iPad Safari works perfectly. The large screen provides an excellent experience for viewing charts.

### Touch gestures supported?
Yes! On touch devices:
- Tap to interact
- Pinch to zoom on charts
- Swipe to scroll
- Long-press for tooltips

---

## 🔐 Privacy & Security

### Is my data secure?
Yes! Your data never leaves your device. Everything is processed in your browser, ensuring complete privacy.

### Do you store my files?
No. We don't have any servers to store files on. When you close Mariting, your data is gone.

### Can I use it for confidential data?
Yes! Since everything happens locally, you can safely analyze confidential competitor information.

### Are there any cookies or tracking?
No cookies, no tracking, no analytics. We only store your language preference locally.

### Can I use it at my hotel?
Yes! No internet connection required after first load. Safe to use on hotel networks.

---

## 🆘 Support

### How do I get help?
1. **Check this FAQ** - Most questions answered here
2. **Read README.md** - Comprehensive documentation
3. **Try demo files** - See correct format
4. **Email support:** support@mariting.com

### How do I report a bug?
Email us at support@mariting.com with:
- Description of the issue
- Browser and version
- Steps to reproduce
- Screenshots if possible
- Your data file (if comfortable sharing)

### How do I request a feature?
We love feature requests! Email support@mariting.com with:
- Description of desired feature
- Your use case
- How it would help you
- Priority level (nice-to-have vs. critical)

### Is there a user community?
Not yet, but we're considering creating one. Would you be interested? Let us know!

---

## 🎓 Learning Resources

### Where can I learn about revenue management?
**Recommended resources:**
- Cornell Hotel School online courses
- Revenue management books
- Industry webinars
- Hotel tech blogs
- LinkedIn Learning courses

### What's the best pricing strategy?
It depends on your goals:
- **Premium:** High quality, high price, maintain rating 8.5+
- **Value:** High quality, competitive price, build volume
- **Budget:** Efficiency focus, lower price, manage expectations
- **Dynamic:** Adjust based on demand, day, season

### How do I improve my rating?
**Key actions:**
1. Address negative review themes
2. Improve service quality
3. Manage expectations clearly
4. Respond to all reviews
5. Train staff thoroughly
6. Fix operational issues
7. Upgrade amenities
8. Enhance guest experience

### How do I get more reviews?
**Review generation tips:**
1. Ask at checkout
2. Send follow-up emails
3. Make it easy (direct links)
4. Respond to existing reviews
5. Incentivize (legally)
6. Train staff to request
7. Use multiple platforms
8. Monitor and respond quickly

---

## 🚀 Updates & Roadmap

### How do I know when there's an update?
Check the version number in the footer or README.md. Major updates will include new features and improvements.

### What's coming next?
**Planned features:**
- PDF report generation
- Historical tracking
- Email reports
- API integration
- Mobile apps
- Team collaboration
- Custom branding

### Can I suggest features?
Absolutely! We prioritize based on user needs. Email your suggestions to support@mariting.com

### Will Mariting always be free?
The core features will always be free. We may introduce premium features in the future, but the essential functionality will remain free.

---

## 📖 Additional Resources

### Demo Files
- `demo_barcelona_booking.csv` - Booking.com example
- `demo_lisbon_airbnb.csv` - Airbnb example

### Documentation
- `README.md` - Complete guide
- `BEST_PRACTICES.md` - Strategy guide
- `CHANGELOG.md` - Version history
- `quick-start.html` - Interactive guide

### Templates
- `template_en.csv` - English
- `template_es.csv` - Spanish
- `template_de.csv` - German

---

## 💡 Pro Tips

### Tip 1: Start Simple
Don't try to analyze everything at once. Start with:
- One platform (Booking or Airbnb)
- One specific day (Saturday)
- 3-4 key competitors
- Single room type

### Tip 2: Be Consistent
Use the same day of week and competitors for monthly comparisons. This reveals true trends.

### Tip 3: Act on Insights
Analysis without action is wasted. Set specific goals and track progress monthly.

### Tip 4: Consider Context
Market conditions change. Events, seasons, and economic factors affect pricing. Consider these in your analysis.

### Tip 5: Combine with Other Data
Merge Mariting insights with your:
- Occupancy rates
- Revenue data
- Guest feedback
- Booking patterns
- Seasonal trends

---

**Still have questions?**

📧 Email: support@mariting.com

We typically respond within 24-48 hours.

---

© 2025 Mariting. All rights reserved.

*Last updated: January 2025 - Version 2.0*
