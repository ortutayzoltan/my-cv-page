// GSAP Animations
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

export class Animations {
  constructor() {
    this.init();
  }

  init() {
    this.heroAnimations();
    this.typingEffect();
    this.counterAnimations();
    this.languageBars();
    this.skillBars();
    this.timelineAnimations();
    this.educationAnimations();
    this.skillCardAnimations();
  }

  heroAnimations() {
    const timeline = gsap.timeline({ defaults: { ease: 'power3.out' } });

    timeline
      .from('.hero-title', {
        y: 50,
        opacity: 0,
        duration: 1,
        delay: 0.3
      })
      .from('.hero-subtitle', {
        y: 30,
        opacity: 0,
        duration: 0.8
      }, '-=0.5')
      .from('.hero-description', {
        y: 20,
        opacity: 0,
        duration: 0.8
      }, '-=0.4')
      .from('.hero-cta .btn', {
        y: 20,
        opacity: 0,
        duration: 0.6,
        stagger: 0.2
      }, '-=0.4')
      .from('.scroll-indicator', {
        opacity: 0,
        duration: 0.6
      }, '-=0.2');
  }

  typingEffect() {
    const texts = [
      'Cloud-Oriented Software Engineer',
      'ELK Stack Specialist',
      'Kubernetes Expert',
      'Monitoring Solutions Architect'
    ];

    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    const typedElement = document.getElementById('typed-text');

    const type = () => {
      const currentText = texts[textIndex];

      if (isDeleting) {
        typedElement.textContent = currentText.substring(0, charIndex - 1);
        charIndex--;
      } else {
        typedElement.textContent = currentText.substring(0, charIndex + 1);
        charIndex++;
      }

      let typeSpeed = isDeleting ? 50 : 100;

      if (!isDeleting && charIndex === currentText.length) {
        typeSpeed = 2000;
        isDeleting = true;
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        textIndex = (textIndex + 1) % texts.length;
        typeSpeed = 500;
      }

      setTimeout(type, typeSpeed);
    };

    type();
  }

  counterAnimations() {
    const counters = document.querySelectorAll('.stat-number');

    counters.forEach(counter => {
      const target = parseInt(counter.getAttribute('data-target'));

      ScrollTrigger.create({
        trigger: counter,
        start: 'top 80%',
        onEnter: () => {
          gsap.to(counter, {
            innerHTML: target,
            duration: 2,
            snap: { innerHTML: 1 },
            ease: 'power1.inOut',
            onUpdate: function() {
              counter.innerHTML = Math.ceil(counter.innerHTML);
            }
          });
        },
        once: true
      });
    });
  }

  languageBars() {
    const bars = document.querySelectorAll('.language-progress');

    bars.forEach(bar => {
      const level = parseInt(bar.getAttribute('data-level'));

      ScrollTrigger.create({
        trigger: bar,
        start: 'top 80%',
        onEnter: () => {
          gsap.to(bar, {
            width: `${level}%`,
            duration: 1.5,
            ease: 'power2.out'
          });
        },
        once: true
      });
    });
  }

  skillBars() {
    const bars = document.querySelectorAll('.skill-bar');

    bars.forEach(bar => {
      const level = parseInt(bar.getAttribute('data-level'));

      ScrollTrigger.create({
        trigger: bar,
        start: 'top 80%',
        onEnter: () => {
          gsap.to(bar, {
            width: `${level}%`,
            duration: 1.5,
            ease: 'power2.out',
            delay: Math.random() * 0.3
          });
        },
        once: true
      });
    });
  }

  timelineAnimations() {
    const items = document.querySelectorAll('.timeline-item');

    items.forEach((item, index) => {
      ScrollTrigger.create({
        trigger: item,
        start: 'top 85%',
        onEnter: () => {
          item.classList.add('visible');
        },
        once: true
      });
    });
  }

  educationAnimations() {
    const cards = document.querySelectorAll('.edu-card');

    cards.forEach((card, index) => {
      ScrollTrigger.create({
        trigger: card,
        start: 'top 85%',
        onEnter: () => {
          card.classList.add('visible');
        },
        once: true
      });
    });
  }

  skillCardAnimations() {
    const cards = document.querySelectorAll('.skill-card');

    cards.forEach((card, index) => {
      ScrollTrigger.create({
        trigger: card,
        start: 'top 85%',
        onEnter: () => {
          card.classList.add('visible');
        },
        once: true
      });
    });
  }

  // Smooth scroll to section
  scrollToSection(selector) {
    gsap.to(window, {
      duration: 1,
      scrollTo: {
        y: selector,
        offsetY: 80
      },
      ease: 'power2.inOut'
    });
  }
}
