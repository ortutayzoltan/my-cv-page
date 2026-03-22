// Main Entry Point
import { ParticleBackground } from './background.js';
import { Animations } from './animations.js';
import { ScrollEffects } from './scroll.js';
import {
  ThemeManager,
  MobileMenu,
  SkillsFilter,
  LazyImageLoader,
  PerformanceMonitor,
  AccessibilityHelpers,
  Debug
} from './utils.js';

class App {
  constructor() {
    this.particleBackground = null;
    this.animations = null;
    this.scrollEffects = null;
    this.themeManager = null;
    this.mobileMenu = null;
    this.skillsFilter = null;

    this.init();
  }

  async init() {
    Debug.log('Initializing CV Landing Page');

    // Wait for DOM to be fully loaded
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => this.setup());
    } else {
      this.setup();
    }
  }

  setup() {
    try {
      Debug.log('Setting up components');

      // Initialize accessibility helpers first
      AccessibilityHelpers.setupFocusTrap();
      AccessibilityHelpers.setupSkipToContent();

      // Initialize theme manager
      this.themeManager = new ThemeManager();
      Debug.log('Theme manager initialized');

      // Initialize mobile menu
      this.mobileMenu = new MobileMenu();
      Debug.log('Mobile menu initialized');

      // Initialize particle background (Three.js)
      // Check if device supports WebGL and has enough power
      if (this.isWebGLAvailable() && !this.isMobileDevice()) {
        this.particleBackground = new ParticleBackground();
        Debug.log('Particle background initialized');
      } else {
        Debug.log('Particle background skipped (mobile or no WebGL)');
        // Add fallback gradient
        document.body.style.background = 'linear-gradient(180deg, #0a0e1a 0%, #1a1f35 100%)';
      }

      // Initialize GSAP animations
      this.animations = new Animations();
      Debug.log('Animations initialized');

      // Initialize scroll effects
      this.scrollEffects = new ScrollEffects();
      Debug.log('Scroll effects initialized');

      // Initialize skills filter
      this.skillsFilter = new SkillsFilter();
      Debug.log('Skills filter initialized');

      // Initialize lazy image loading
      new LazyImageLoader();
      Debug.log('Lazy image loader initialized');

      // Setup performance monitoring in development
      if (import.meta.env.DEV) {
        PerformanceMonitor.logMetrics();
      }

      // Add loaded class to body for CSS transitions
      document.body.classList.add('loaded');

      Debug.log('App initialization complete');

      // Easter egg in console
      this.showConsoleMessage();

    } catch (error) {
      Debug.error('Error during app initialization', error);
    }
  }

  isWebGLAvailable() {
    try {
      const canvas = document.createElement('canvas');
      return !!(
        window.WebGLRenderingContext &&
        (canvas.getContext('webgl') || canvas.getContext('experimental-webgl'))
      );
    } catch (e) {
      return false;
    }
  }

  isMobileDevice() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  }

  showConsoleMessage() {
    const styles = [
      'color: #8b5cf6',
      'font-size: 20px',
      'font-weight: bold',
      'padding: 10px'
    ].join(';');

    console.log('%c👋 Hello, Developer!', styles);
    console.log('%cInterested in the code? Check out the repository:', 'color: #06b6d4; font-size: 14px;');
    console.log('%chttps://github.com/ortutayzoltan/my-cv-page', 'color: #ec4899; font-size: 12px;');
    console.log('%cBuilt with: Three.js, GSAP, Vanilla JavaScript', 'color: #10b981; font-size: 12px;');
  }

  destroy() {
    Debug.log('Destroying app');

    if (this.particleBackground) {
      this.particleBackground.destroy();
    }
  }
}

// Initialize app
const app = new App();

// Cleanup on page unload
window.addEventListener('beforeunload', () => {
  app.destroy();
});

// Export for debugging
if (import.meta.env.DEV) {
  window.app = app;
}
