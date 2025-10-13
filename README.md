# 🏨 Mariting - Hotel Competitive Intelligence Platform

**Version 2.2.1** - Modern Hotel Benchmarking Platform with AI-Powered Analysis

![Mariting](Logo/M.png)

---

## 📊 What is Mariting?

Mariting is a powerful web-based platform that helps hotels analyze their competitive position in the market. Compare your hotel's pricing, ratings, and reviews against competitors across multiple booking platforms.

### ✨ Key Features

- 📈 **Visual Competition Analysis** - See your position vs competitors in intuitive scatter plots
- 📅 **Day-by-Day Analysis** - Analyze pricing patterns across different days of the week
- 🛏️ **Room Type Comparison** - Compare single and double room pricing separately or together
- 🤖 **AI Strategic Analysis** - Get AI-powered insights and recommendations
- 🌍 **Multi-language Support** - Available in English, Spanish, and German
- 📱 **Mobile Responsive** - Access your analysis from any device
- 📊 **Multiple Platforms** - Support for Booking.com, Airbnb, Expedia, Google Hotels, TripAdvisor, and Trivago

---

## 🚀 Quick Start

### 1. Download Template
Click "Download Template" and choose your language (EN/ES/DE)

### 2. Fill Your Data
- Enter your hotel name in brackets: `[Your Hotel Name]`
- Add competitor hotels
- Fill in ratings (use platform's scale: 1-10 for Booking, 1-5 for Airbnb)
- Add prices for at least one day (use same date for all hotels)
- Include number of reviews

### 3. Upload & Analyze
- Upload your completed CSV or Excel file
- Select room types (Single/Double)
- Choose days to analyze
- Generate your competitive analysis

---

## 📁 Project Structure

```
Mariting Beta 3/
├── index.html          # Main application
├── app.js              # Core functionality
├── Logo/               # Platform logos
│   ├── M.png
│   └── Plataformas/
├── template_en.csv     # English template
├── template_es.csv     # Spanish template
├── template_de.csv     # German template
└── demo_*.csv/xlsx     # Demo files
```

---

## 🎯 Supported Platforms

| Platform | Rating Scale | Logo |
|----------|--------------|------|
| Booking.com | 1-10 | ✅ |
| Airbnb | 1-5 | ✅ |
| Expedia | 1-5 | ✅ |
| Google Hotels | 1-5 | ✅ |
| TripAdvisor | 1-5 | ✅ |
| Trivago | 1-10 | ✅ |

---

## 💡 How It Works

### Data Analysis
1. **Upload** your CSV/Excel with hotel data
2. **Automatic Detection** of platform and rating scale
3. **Adaptive Charts** that adjust to your data range
4. **Crosshair Analysis** showing average price and quality threshold

### Customer Perception Matrix

The platform analyzes your position in 6 categories:

- 🌟 **Premium** - High quality, premium pricing
- 💎 **Value Leader** - High quality, competitive pricing
- ⚠️ **Overpriced** - Below quality threshold, high pricing
- 💰 **Budget** - Aligned pricing and quality for budget segment
- 🔸 **Needs Attention** - Low reviews, high pricing
- 🔹 **Emerging Budget** - Low reviews, competitive pricing

---

## 🛠️ Technologies Used

- **Chart.js** - Dynamic, responsive charts
- **PapaParse** - CSV parsing
- **SheetJS (XLSX)** - Excel file support
- **Pure JavaScript** - No frameworks, lightweight and fast
- **Responsive Design** - Works on all devices

---

## 📋 Requirements

- Modern web browser (Chrome, Firefox, Safari, Edge)
- No installation required
- Works offline (after first load)

---

## 🌐 Multi-language Support

### Available Languages:
- 🇬🇧 **English** (EN)
- 🇪🇸 **Español** (ES)
- 🇩🇪 **Deutsch** (DE)

Language preference is automatically saved.

---

## 📊 Chart Features

### Adaptive Scaling
- Charts automatically adjust to your data range
- No fixed scales - works with any price range
- Quality threshold adapts to platform (7.9 for 10-scale, 3.9 for 5-scale)

### Visual Elements
- **Bubble Size** - Represents number of reviews
- **Colors** - Your hotel (purple), competitors (pink)
- **Crosshairs** - Average price (vertical) and quality threshold (horizontal)
- **Transparent Background** - Professional export-ready charts

---

## 🎨 Design Highlights

- Clean, modern interface
- Turquoise accent color (#14b8a6)
- Card-based layout
- Smooth animations
- Professional gradients

---

## 📱 Responsive Breakpoints

- **Desktop**: Full layout (1024px+)
- **Tablet**: Adapted layout (768px - 1023px)
- **Mobile**: Stacked layout (<768px)

---

## 🔧 Configuration

### Platform Detection
The system automatically detects the platform from your CSV and applies:
- Correct rating scale (1-10 or 1-5)
- Platform logo
- Appropriate quality thresholds

### CSV Template Format
```csv
Platform:,Booking.com
SINGLE ROOMS PRICING ANALYSIS
Hotel Name,Rating,Monday,Tuesday,...,Reviews Num
[Your Hotel],8.5,€85,€85,...,465
Competitor 1,7.8,€75,€75,...,234
```

---

## 📈 Version History

### v2.2.1 (Current)
- ✅ Templates CSV funcionales (EN, ES, DE)
- ✅ Demo chart with 4 animated positions
- ✅ Menu repositioned (right side)
- ✅ Complete AI analysis
- ✅ Adaptive charts
- ✅ 2x3 footer layout
- ✅ Clean, tested code

### v2.2
- Transparent chart backgrounds
- Enhanced visual design

### v2.1
- Multi-language support
- Improved UI/UX

---

## 🤝 Contributing

This is a proprietary project. For inquiries, contact: support@mariting.com

---

## 📄 License

© 2025 Mariting. All rights reserved.

---

## 📧 Contact

**Email**: support@mariting.com  
**GitHub**: https://github.com/victorjrp92/Mating-hotel-12-10-2025

---

## 🙏 Acknowledgments

Built with ❤️ for the hospitality industry.

---

**⭐ Star this repo if you find it useful!**
