// Scroll Effects and Intersection Observer
export class ScrollEffects {
  constructor() {
    this.nav = document.getElementById('nav');
    this.navLinks = document.querySelectorAll('.nav-link');
    this.sections = document.querySelectorAll('.section');

    this.init();
  }

  init() {
    this.setupScrollObserver();
    this.setupNavScroll();
    this.setupSmoothScroll();
    this.setupScrollIndicator();
  }

  setupScrollObserver() {
    const options = {
      root: null,
      rootMargin: '-20% 0px -80% 0px',
      threshold: 0
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('id');
          this.setActiveNav(id);
        }
      });
    }, options);

    // Observe all sections
    this.sections.forEach(section => {
      observer.observe(section);
    });
  }

  setupNavScroll() {
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
      const currentScroll = window.pageYOffset;

      // Add backdrop blur when scrolling
      if (currentScroll > 100) {
        this.nav.classList.add('scrolled');
      } else {
        this.nav.classList.remove('scrolled');
      }

      lastScroll = currentScroll;
    });
  }

  setupSmoothScroll() {
    this.navLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const target = document.querySelector(targetId);

        if (target) {
          const offsetTop = target.offsetTop - 80;
          window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
          });

          // Close mobile menu if open
          const mobileMenu = document.getElementById('nav-menu');
          const mobileToggle = document.getElementById('mobile-toggle');
          if (mobileMenu.classList.contains('active')) {
            mobileMenu.classList.remove('active');
            mobileToggle.classList.remove('active');
          }
        }
      });
    });
  }

  setupScrollIndicator() {
    const scrollIndicator = document.querySelector('.scroll-indicator');

    if (scrollIndicator) {
      scrollIndicator.addEventListener('click', () => {
        const aboutSection = document.getElementById('about');
        if (aboutSection) {
          const offsetTop = aboutSection.offsetTop - 80;
          window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
          });
        }
      });
    }
  }

  setActiveNav(id) {
    // Remove active class from all nav links
    this.navLinks.forEach(link => {
      link.classList.remove('active');
    });

    // Add active class to current section's nav link
    const activeLink = document.querySelector(`.nav-link[href="#${id}"]`);
    if (activeLink) {
      activeLink.classList.add('active');
    }
  }
}
