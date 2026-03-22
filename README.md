# Zoltan Zsolt Ortutay - Professional CV Landing Page

A state-of-the-art personal landing page showcasing my experience as a Cloud-Oriented Software Engineer. Built with modern web technologies for optimal performance and visual impact.

## ✨ Features

- **3D Particle Background**: Interactive Three.js particle cloud that responds to mouse movement and scroll
- **Smooth Animations**: GSAP-powered scroll animations and section reveals
- **Dark/Light Mode**: Seamless theme switching with system preference detection
- **Fully Responsive**: Mobile-first design that works on all devices
- **Performance Optimized**: Lighthouse score 90+ on all metrics
- **SEO Optimized**: Semantic HTML, meta tags, and structured data
- **Accessibility**: WCAG 2.1 AA compliant with keyboard navigation

## 🛠️ Tech Stack

- **Core**: Vanilla JavaScript (ES6+), HTML5, CSS3
- **3D Graphics**: Three.js
- **Animations**: GSAP with ScrollTrigger
- **Build Tool**: Vite 6
- **Styling**: Modern CSS with CSS Custom Properties
- **Icons**: SVG icons

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and npm

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 📁 Project Structure

```
my-cv-page/
├── src/
│   ├── index.html              # Main HTML file
│   ├── styles/
│   │   ├── reset.css           # CSS reset
│   │   ├── variables.css       # Design system variables
│   │   ├── global.css          # Global styles
│   │   ├── sections.css        # Section-specific styles
│   │   └── animations.css      # Keyframe animations
│   ├── scripts/
│   │   ├── main.js             # Application entry point
│   │   ├── background.js       # Three.js 3D background
│   │   ├── animations.js       # GSAP animations
│   │   ├── scroll.js           # Scroll effects
│   │   └── utils.js            # Utility functions
│   └── assets/
│       └── images/
│           └── profile-pic.jpg # Profile picture
├── public/
│   └── favicon.svg             # Site favicon
├── dist/                       # Production build (generated)
├── old/                        # Archived old version
├── package.json
├── vite.config.js
└── README.md
```

## 🎨 Design System

### Color Palette

**Dark Theme (Default)**:
- Primary: `#8b5cf6` (Purple)
- Secondary: `#ec4899` (Pink)
- Accent: `#06b6d4` (Cyan)
- Background: `#0a0e1a` (Deep Navy)

**Light Theme**:
- Automatically adapts colors for light mode

### Typography

- Font Family: Inter (Google Fonts)
- Fluid typography using `clamp()`
- Font weights: 400, 500, 600, 700, 800, 900

## 🔧 Configuration

### Vite Configuration

The project uses Vite with the following optimizations:
- Code splitting for Three.js and GSAP
- esbuild minification
- CSS minification
- Asset optimization

### Theme Customization

Edit `src/styles/variables.css` to customize:
- Colors and gradients
- Typography scale
- Spacing system
- Border radius
- Transitions

## 📊 Performance

### Build Output

- **HTML**: ~24 KB (gzipped: ~4.7 KB)
- **CSS**: ~21 KB (gzipped: ~4.4 KB)
- **JavaScript**: ~595 KB (gzipped: ~168 KB)
  - Main bundle: ~60 KB
  - GSAP: ~70 KB
  - Three.js: ~465 KB (lazy loaded on desktop only)

### Optimizations

- Lazy loading of images
- Three.js background disabled on mobile devices
- Intersection Observer for scroll animations
- Debounced scroll and resize handlers
- Prefers-reduced-motion support

## ♿ Accessibility

- Semantic HTML5 elements
- ARIA labels and landmarks
- Keyboard navigation support
- Focus indicators
- Skip to content link
- Screen reader friendly
- Color contrast compliance (WCAG AA)

## 🌐 Browser Support

- Chrome/Edge (latest 2 versions)
- Firefox (latest 2 versions)
- Safari (latest 2 versions)
- Mobile browsers (iOS Safari, Chrome Android)

## 📝 Content Updates

To update your CV content:

1. Edit the HTML directly in `src/index.html`
2. Update profile picture in `src/assets/images/`
3. Rebuild the project: `npm run build`

## 🚢 Deployment

### GitHub Pages

```bash
# Build the project
npm run build

# The dist/ folder contains the production build
# Deploy the contents of dist/ to GitHub Pages
```

### Vercel/Netlify

Simply connect your repository and set:
- Build command: `npm run build`
- Output directory: `dist`

## 📄 License

This project is open source and available for personal use.

## 👤 Author

**Zoltan Zsolt Ortutay**
- Cloud-Oriented Software Engineer
- Currently at Ericsson, Stockholm
- Specialized in ELK Stack, Kubernetes, and monitoring solutions

## 🙏 Acknowledgments

- Built with modern web standards and best practices
- Inspired by state-of-the-art portfolio designs
- Uses open source libraries: Three.js, GSAP

---

**Built with ❤️ using Three.js, GSAP & Vanilla JavaScript**
