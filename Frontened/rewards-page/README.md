# EcoBin Rewards Page 🌱

A highly attractive and interactive rewards page for the EcoBin e-waste recycling platform.

## Features ✨

### 🎯 Interactive Elements
- **Dynamic Stats Cards** - Animated cards showing recycling statistics
- **Progress Tracking** - Visual progress bar with level system
- **Tab Navigation** - Switch between Rewards, Achievements, and Leaderboard
- **Reward Redemption** - Interactive reward cards with redemption functionality
- **Animated Counters** - Smooth number animations for points and stats
- **Hover Effects** - Premium micro-interactions on all interactive elements

### 🎨 Design Features
- **Modern Gradients** - Vibrant orange-to-yellow gradient header
- **Glassmorphism** - Frosted glass effect on points display
- **Smooth Animations** - Fade-in, slide-down, and scale animations
- **Responsive Layout** - Works perfectly on all screen sizes
- **Premium Typography** - Using Inter font for modern aesthetics

### 📊 Sections

1. **Navigation Bar**
   - Logo with EcoBin branding
   - Quick access buttons (Find Bin, Scan, Rewards, Dashboard)
   - Admin and Profile buttons

2. **Rewards Header**
   - Eye-catching orange gradient background
   - Total points display with trophy icon
   - Glassmorphic design elements

3. **Stats Grid**
   - Items Recycled (47)
   - CO2 Saved (23.5 kg)
   - Leaderboard Rank (#156)
   - Current Streak (12 days)

4. **Progress Section**
   - Current level badge (Level 8 - Eco Enthusiast)
   - Animated progress bar (70% complete)
   - Points needed for next level

5. **Tabs System**
   - **Rewards Tab**: Grid of redeemable rewards
   - **Achievements Tab**: Unlockable achievements with progress
   - **Leaderboard Tab**: Top users and your ranking

6. **Footer**
   - Company information
   - Quick links and resources
   - Contact information

## How to Use 🚀

1. **Open the page**: Simply open `index.html` in any modern web browser
2. **Explore tabs**: Click on different tabs to see Rewards, Achievements, and Leaderboard
3. **Redeem rewards**: Click "Redeem Now" on any available reward
4. **Interactive elements**: Hover over cards to see smooth animations

## Reward Categories 🎁

- **Discount** - Percentage off on products (500 pts)
- **Product** - Physical eco-friendly items (800-1000 pts)
- **Impact** - Environmental actions like planting trees (300 pts)
- **Voucher** - Shopping vouchers (1500 pts)
- **Special** - Premium memberships (2000 pts)

## Technologies Used 💻

- **HTML5** - Semantic structure
- **CSS3** - Modern styling with gradients, animations, and flexbox/grid
- **Vanilla JavaScript** - Interactive functionality without dependencies
- **Google Fonts** - Inter font family

## Key Interactive Features 🎮

### Reward Redemption
- Click "Redeem Now" to redeem a reward
- Modal popup confirms redemption
- Points automatically deducted
- Error handling for insufficient points

### Tab Switching
- Smooth transitions between tabs
- Active state highlighting
- Content fade-in animations

### Animations
- Stats cards fade in on page load
- Progress bar fills automatically
- Points counter animates from 0 to 1,250
- Hover effects on all interactive elements

## Color Scheme 🎨

- **Primary Green**: `#10b981` - Eco-friendly theme
- **Orange Gradient**: `#f59e0b` to `#f97316` - Vibrant accents
- **Background**: `#f9fafb` - Clean, modern look
- **Text**: `#111827` - High contrast for readability

## Browser Compatibility 🌐

Works perfectly on:
- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Opera (latest)

## File Structure 📁

```
rewards-page/
├── index.html      # Main HTML structure
├── styles.css      # All styling and animations
├── script.js       # Interactive functionality
└── README.md       # This file
```

## Customization 🛠️

### Change Points
Edit the `totalPoints` value in `script.js`:
```javascript
const targetPoints = 1250; // Change this value
```

### Add More Rewards
Add to the `rewardsData` array in `script.js`:
```javascript
{ category: 'Product', title: 'Your Reward', points: 500, available: true }
```

### Modify Colors
Update CSS variables in `styles.css`:
```css
:root {
    --primary-green: #10b981;
    --orange-gradient: linear-gradient(135deg, #f59e0b 0%, #f97316 100%);
}
```

## Performance ⚡

- **No external dependencies** - Fast loading
- **Optimized animations** - Smooth 60fps
- **Lazy loading** - Content loads as needed
- **Minimal JavaScript** - Under 10KB

## Credits 👏

Designed and developed based on the EcoBin platform design.
Made with ❤️ for a greener future.

---

**Enjoy your rewards page! 🎉**
