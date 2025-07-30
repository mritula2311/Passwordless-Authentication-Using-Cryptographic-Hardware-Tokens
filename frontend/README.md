# ResumeAI Landing Page

A responsive, conversion-optimized, trust-building landing page built with React and Tailwind CSS.

## 🚀 Features

- **Responsive Design**: Mobile-first approach with seamless adaptation across all devices
- **Modern UI/UX**: Clean, professional design with smooth animations and interactions
- **Conversion Optimized**: Strategic placement of CTAs and trust signals
- **Accessibility**: WCAG compliant with semantic HTML and proper contrast ratios
- **Performance**: Optimized build with lazy loading and efficient bundling

## 📐 Page Structure

### Navigation Bar (Sticky)
- Brand logo positioned on the left
- Navigation links and CTA button on the right
- Responsive hamburger menu with slide-in navigation for mobile devices

### Hero Section
- Bold headline: "Craft Perfect Resumes with AI in Seconds"
- Compelling subheading with value proposition
- Two prominent CTAs: "Start Free Trial" and "Watch Demo"
- Animated SVG illustration with floating elements
- Trust indicators (user avatars and ratings)

### Features Section
- Title: "Smart Tools That Work for You"
- Three feature cards:
  - ✍️ **AI Resumes**: Smart keyword optimization and ATS-friendly formatting
  - 🧠 **Personalization**: Experience-based suggestions and skills analysis
  - 📨 **Cover Letter Assistant**: Personalized tone matching and templates

### Testimonials
- Three customer reviews with photos, names, ratings, and quotes
- Grid layout on desktop, carousel on mobile
- Trust badges from major companies (Google, Microsoft, Apple, etc.)

### Call-to-Action Banner
- Title: "Ready to Land Your Next Job?"
- Compelling subtitle with statistics
- Bold CTA button with hover animations
- Trust indicators and benefits list

### Footer
- Left: © 2025 ResumeAI branding with contact information
- Right: Links for About, Contact, Privacy, and social media
- Newsletter signup form
- Back-to-top button

## 🛠 Tech Stack

- **Framework**: React 18 (functional components with hooks)
- **Styling**: Tailwind CSS with custom configuration
- **Animations**: AOS (Animate On Scroll) library
- **Icons**: React Icons (Feather Icons)
- **Build Tool**: Create React App with optimized production build

## 🚀 Getting Started

### Prerequisites
- Node.js 14.x or later
- npm or yarn package manager

### Installation

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

4. Open your browser and visit `http://localhost:3000`

### Building for Production

Create an optimized production build:
```bash
npm run build
```

The build artifacts will be stored in the `build/` directory.

### Serving the Production Build

To serve the production build locally:
```bash
npx serve -s build -l 3000
```

## 📱 Responsive Design

The landing page is fully responsive with breakpoints for:
- **Mobile**: 375px - 768px (hamburger menu, stacked layout)
- **Tablet**: 768px - 1024px (adapted grid layouts)
- **Desktop**: 1024px+ (full grid layouts, hover effects)

### Mobile Features
- Hamburger navigation menu
- Testimonial carousel with touch controls
- Optimized button sizes and spacing
- Simplified layouts without loss of functionality

## 🎨 Customization

### Colors
The color scheme can be customized in `tailwind.config.js`:
- Primary: Blue gradient (#3B82F6 to #2563EB)
- Secondary: Gray scale (#64748B to #0F172A)
- Accent: Yellow/Orange for CTAs

### Animations
Animations are configured using:
- **AOS**: Scroll-triggered animations with customizable duration and easing
- **Custom CSS**: Hover effects, transitions, and micro-interactions
- **Tailwind utilities**: Built-in animation classes

## 🔧 Development

### Project Structure
```
frontend/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── Navbar.js
│   │   ├── Hero.js
│   │   ├── Features.js
│   │   ├── Testimonials.js
│   │   ├── CTA.js
│   │   └── Footer.js
│   ├── App.js
│   ├── index.js
│   └── index.css
├── package.json
├── tailwind.config.js
└── postcss.config.js
```

### Adding New Components
1. Create a new file in `src/components/`
2. Import and use the component in `App.js`
3. Follow the existing pattern for styling and responsiveness

## 📊 Performance

The production build includes:
- Code splitting and lazy loading
- CSS optimization and purging
- Image optimization
- Gzip compression
- Minimal bundle size (~60KB gzipped)

## 🌐 Browser Support

- Chrome 67+
- Firefox 60+
- Safari 14+
- Edge 18+

## 📄 License

This project is part of the Passwordless Authentication repository and follows the same license terms.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test responsiveness across devices
5. Submit a pull request

---

**Built with ❤️ using React and Tailwind CSS**