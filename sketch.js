// Particle system
let particles = [];
let handpose;
let video;
let hands = [];
let handDetected = false;
let smoothMouseX = 0;
let smoothMouseY = 0;

// Colors
const colors = {
    primary: '#6366f1',
    secondary: '#8b5cf6',
    accent: '#ec4899',
    dark: '#1e1b4b',
    light: '#f8fafc'
};

function setup() {
    let canvas = createCanvas(windowWidth, windowHeight);
    canvas.parent('canvas-container');

    // Initialize particles
    for (let i = 0; i < 80; i++) {
        particles.push(new Particle());
    }

    // Try to setup webcam for hand tracking (optional feature)
    try {
        video = createCapture(VIDEO);
        video.size(320, 240);
        video.hide();

        // Load handpose model
        handpose = ml5.handpose(video, modelReady);
        handpose.on('hand', gotHands);
    } catch (e) {
        console.log('Camera access not available - hand tracking disabled');
    }
}

function modelReady() {
    console.log('Hand tracking model ready! Wave your hand to interact.');
}

function gotHands(results) {
    hands = results;

    if (hands.length > 0) {
        if (!handDetected) {
            handDetected = true;
            showHandIndicator();
        }
    } else {
        if (handDetected) {
            handDetected = false;
            hideHandIndicator();
        }
    }
}

function draw() {
    // Create gradient background
    setGradient(0, 0, width, height);

    // Smooth mouse movement
    smoothMouseX = lerp(smoothMouseX, mouseX, 0.1);
    smoothMouseY = lerp(smoothMouseY, mouseY, 0.1);

    // Update and display particles
    for (let particle of particles) {
        particle.update(smoothMouseX, smoothMouseY);
        particle.display();
    }

    // Draw connections between nearby particles
    drawConnections();

    // If hand is detected, draw hand tracking visualization
    if (hands.length > 0) {
        drawHandTracking();
    }
}

function setGradient(x, y, w, h) {
    noFill();
    for (let i = y; i <= y + h; i += 2) {
        let inter = map(i, y, y + h, 0, 1);
        let c = lerpColor(color(colors.dark), color('#0f172a'), inter);
        stroke(c);
        line(x, i, x + w, i);
    }
}

function drawConnections() {
    for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
            let d = dist(particles[i].x, particles[i].y, particles[j].x, particles[j].y);
            if (d < 150) {
                let alpha = map(d, 0, 150, 100, 0);
                stroke(255, 255, 255, alpha);
                strokeWeight(1);
                line(particles[i].x, particles[i].y, particles[j].x, particles[j].y);
            }
        }
    }
}

function drawHandTracking() {
    let hand = hands[0];

    // Draw hand keypoints
    for (let i = 0; i < hand.landmarks.length; i++) {
        let [x, y] = hand.landmarks[i];
        fill(colors.accent);
        noStroke();
        circle(x, y, 10);
    }

    // Use index finger tip for interaction
    if (hand.landmarks.length > 8) {
        let indexTip = hand.landmarks[8];
        let [handX, handY] = indexTip;

        // Map hand position to screen
        let mappedX = map(handX, 0, video.width, width, 0);
        let mappedY = map(handY, 0, video.height, 0, height);

        // Highlight particles near hand
        for (let particle of particles) {
            let d = dist(mappedX, mappedY, particle.x, particle.y);
            if (d < 100) {
                particle.highlight = true;
            }
        }

        // Check if hand is over navigation buttons
        checkHandNavigation(mappedX, mappedY);
    }
}

function checkHandNavigation(x, y) {
    // This would check if hand is hovering over nav buttons
    // Implementation would require getting button positions from DOM
}

function showHandIndicator() {
    let indicator = document.getElementById('hand-indicator');
    if (indicator) {
        indicator.classList.remove('hidden');
        setTimeout(() => {
            indicator.classList.add('hidden');
        }, 3000);
    }
}

function hideHandIndicator() {
    // Hand tracking lost
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}

// Particle class
class Particle {
    constructor() {
        this.x = random(width);
        this.y = random(height);
        this.vx = random(-0.5, 0.5);
        this.vy = random(-0.5, 0.5);
        this.size = random(2, 5);
        this.highlight = false;
        this.hue = random(360);
    }

    update(mx, my) {
        // Move particle
        this.x += this.vx;
        this.y += this.vy;

        // Bounce off edges
        if (this.x < 0 || this.x > width) this.vx *= -1;
        if (this.y < 0 || this.y > height) this.vy *= -1;

        // Mouse interaction
        let d = dist(mx, my, this.x, this.y);
        if (d < 100) {
            let angle = atan2(this.y - my, this.x - mx);
            this.vx += cos(angle) * 0.1;
            this.vy += sin(angle) * 0.1;
        }

        // Damping
        this.vx *= 0.99;
        this.vy *= 0.99;

        // Limit speed
        let speed = sqrt(this.vx * this.vx + this.vy * this.vy);
        if (speed > 2) {
            this.vx = (this.vx / speed) * 2;
            this.vy = (this.vy / speed) * 2;
        }

        // Reset highlight
        this.highlight = false;
    }

    display() {
        if (this.highlight) {
            fill(colors.accent);
            noStroke();
            circle(this.x, this.y, this.size * 3);
        } else {
            fill(255, 255, 255, 150);
            noStroke();
            circle(this.x, this.y, this.size);
        }
    }
}

// Navigation function
let currentSection = 'about';

function showSection(sectionName) {
    // Hide all sections
    const sections = document.querySelectorAll('.content-section');
    sections.forEach(section => {
        section.classList.remove('active');
    });

    // Show selected section with animation
    const selectedSection = document.getElementById(sectionName + '-section');
    if (selectedSection) {
        setTimeout(() => {
            selectedSection.classList.add('active');
        }, 300);
    }

    // Update button states
    const buttons = document.querySelectorAll('.nav-btn');
    buttons.forEach(btn => {
        btn.classList.remove('active');
        if (btn.dataset.section === sectionName) {
            btn.classList.add('active');
        }
    });

    currentSection = sectionName;

    // Add particle burst effect
    createBurst(random(width), random(height));
}

function createBurst(x, y) {
    for (let i = 0; i < 10; i++) {
        let angle = random(TWO_PI);
        let speed = random(2, 5);
        let p = new Particle();
        p.x = x;
        p.y = y;
        p.vx = cos(angle) * speed;
        p.vy = sin(angle) * speed;
        particles.push(p);
    }

    // Remove extra particles
    if (particles.length > 150) {
        particles.splice(0, particles.length - 150);
    }
}

// Mouse interaction
function mousePressed() {
    createBurst(mouseX, mouseY);
}

// Add floating animation to cards
document.addEventListener('DOMContentLoaded', () => {
    // Set first button as active
    const firstBtn = document.querySelector('.nav-btn[data-section="about"]');
    if (firstBtn) {
        firstBtn.classList.add('active');
    }

    // Add hover effects to skill tags
    const skillTags = document.querySelectorAll('.skill-tag');
    skillTags.forEach((tag, index) => {
        tag.style.animationDelay = `${index * 0.1}s`;

        tag.addEventListener('mouseenter', () => {
            tag.style.transform = 'translateY(-10px) scale(1.1)';
        });

        tag.addEventListener('mouseleave', () => {
            tag.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Add stagger animation to experience items
    const experienceItems = document.querySelectorAll('.experience-item');
    experienceItems.forEach((item, index) => {
        item.style.animationDelay = `${index * 0.2}s`;
    });

    // Add animation to course cards
    const courseCards = document.querySelectorAll('.course-card');
    courseCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
    });

    // Typing effect for title
    const typingText = document.querySelector('.typing-text');
    if (typingText) {
        const text = typingText.textContent;
        typingText.textContent = '';
        let i = 0;

        function typeWriter() {
            if (i < text.length) {
                typingText.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            }
        }

        setTimeout(typeWriter, 500);
    }

    // Glitch effect on hover
    const glitchTitle = document.querySelector('.glitch');
    if (glitchTitle) {
        glitchTitle.addEventListener('mouseenter', () => {
            glitchTitle.classList.add('glitch-active');
        });

        glitchTitle.addEventListener('mouseleave', () => {
            glitchTitle.classList.remove('glitch-active');
        });
    }

    // Smooth scroll behavior
    document.documentElement.style.scrollBehavior = 'smooth';

    // Add parallax effect to profile picture
    const profilePic = document.getElementById('profile-pic');
    if (profilePic) {
        document.addEventListener('mousemove', (e) => {
            const x = (e.clientX - window.innerWidth / 2) / 50;
            const y = (e.clientY - window.innerHeight / 2) / 50;
            profilePic.style.transform = `translate(${x}px, ${y}px) scale(1.05)`;
        });
    }
});

// Add some fun interactions
function keyPressed() {
    // Easter egg: Press 'E' for explosion effect
    if (key === 'e' || key === 'E') {
        for (let i = 0; i < 50; i++) {
            createBurst(random(width), random(height));
        }
    }

    // Press numbers 1-5 to navigate sections
    const sections = ['about', 'experience', 'skills', 'education', 'contact'];
    const num = parseInt(key);
    if (num >= 1 && num <= 5) {
        showSection(sections[num - 1]);
    }
}
