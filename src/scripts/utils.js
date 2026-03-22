// Utility Functions

/**
 * Theme Management
 */
export class ThemeManager {
  constructor() {
    this.themeToggle = document.getElementById('theme-toggle');
    this.currentTheme = this.getStoredTheme() || this.getPreferredTheme();

    this.init();
  }

  init() {
    this.setTheme(this.currentTheme);
    this.themeToggle.addEventListener('click', () => this.toggleTheme());
  }

  getStoredTheme() {
    return localStorage.getItem('theme');
  }

  getPreferredTheme() {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
      return 'light';
    }
    return 'dark';
  }

  setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    this.currentTheme = theme;
  }

  toggleTheme() {
    const newTheme = this.currentTheme === 'dark' ? 'light' : 'dark';
    this.setTheme(newTheme);
  }
}

/**
 * Mobile Menu Management
 */
export class MobileMenu {
  constructor() {
    this.mobileToggle = document.getElementById('mobile-toggle');
    this.navMenu = document.getElementById('nav-menu');

    this.init();
  }

  init() {
    if (this.mobileToggle && this.navMenu) {
      this.mobileToggle.addEventListener('click', () => this.toggle());
    }
  }

  toggle() {
    this.mobileToggle.classList.toggle('active');
    this.navMenu.classList.toggle('active');
  }

  close() {
    this.mobileToggle.classList.remove('active');
    this.navMenu.classList.remove('active');
  }
}

/**
 * Skills Filter
 */
export class SkillsFilter {
  constructor() {
    this.filterButtons = document.querySelectorAll('.filter-btn');
    this.skillCards = document.querySelectorAll('.skill-card');

    this.init();
  }

  init() {
    this.filterButtons.forEach(btn => {
      btn.addEventListener('click', () => this.filter(btn));
    });
  }

  filter(button) {
    const category = button.getAttribute('data-category');

    // Update active button
    this.filterButtons.forEach(btn => btn.classList.remove('active'));
    button.classList.add('active');

    // Filter cards
    this.skillCards.forEach(card => {
      const cardCategory = card.getAttribute('data-category');

      if (category === 'all' || cardCategory === category) {
        card.classList.remove('hidden');
        // Re-trigger animation
        card.classList.remove('visible');
        setTimeout(() => card.classList.add('visible'), 10);
      } else {
        card.classList.add('hidden');
      }
    });
  }
}

/**
 * Lazy Image Loading
 */
export class LazyImageLoader {
  constructor() {
    this.images = document.querySelectorAll('img[data-src]');
    this.init();
  }

  init() {
    if ('IntersectionObserver' in window) {
      const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.getAttribute('data-src');
            img.removeAttribute('data-src');
            img.classList.add('loaded');
            observer.unobserve(img);
          }
        });
      });

      this.images.forEach(img => imageObserver.observe(img));
    } else {
      // Fallback for browsers without IntersectionObserver
      this.images.forEach(img => {
        img.src = img.getAttribute('data-src');
        img.removeAttribute('data-src');
      });
    }
  }
}

/**
 * Performance Monitoring
 */
export class PerformanceMonitor {
  static logMetrics() {
    if ('performance' in window && 'PerformanceObserver' in window) {
      // Log Core Web Vitals
      const observer = new PerformanceObserver((list) => {
        list.getEntries().forEach((entry) => {
          console.log(`${entry.name}: ${entry.value.toFixed(2)}ms`);
        });
      });

      try {
        observer.observe({ entryTypes: ['paint', 'largest-contentful-paint', 'first-input'] });
      } catch (e) {
        // Some browsers may not support all metrics
        console.log('Performance monitoring not fully supported');
      }

      // Log load time
      window.addEventListener('load', () => {
        const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
        console.log(`Page Load Time: ${loadTime}ms`);
      });
    }
  }
}

/**
 * Accessibility Helpers
 */
export class AccessibilityHelpers {
  static setupFocusTrap() {
    // Add visible focus indicators
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Tab') {
        document.body.classList.add('keyboard-nav');
      }
    });

    document.addEventListener('mousedown', () => {
      document.body.classList.remove('keyboard-nav');
    });
  }

  static setupSkipToContent() {
    const skipLink = document.createElement('a');
    skipLink.href = '#main';
    skipLink.textContent = 'Skip to main content';
    skipLink.className = 'skip-to-content';
    skipLink.style.cssText = `
      position: absolute;
      top: -40px;
      left: 0;
      background: var(--color-accent-primary);
      color: white;
      padding: 8px 16px;
      text-decoration: none;
      z-index: 10000;
      transition: top 0.3s;
    `;

    skipLink.addEventListener('focus', () => {
      skipLink.style.top = '0';
    });

    skipLink.addEventListener('blur', () => {
      skipLink.style.top = '-40px';
    });

    document.body.insertBefore(skipLink, document.body.firstChild);
  }
}

/**
 * Debug Mode
 */
export class Debug {
  static log(message, data = null) {
    if (import.meta.env.DEV) {
      if (data) {
        console.log(`[CV Page] ${message}`, data);
      } else {
        console.log(`[CV Page] ${message}`);
      }
    }
  }

  static error(message, error = null) {
    console.error(`[CV Page Error] ${message}`, error);
  }
}
