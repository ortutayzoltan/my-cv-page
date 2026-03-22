// Three.js 3D Particle Background
import * as THREE from 'three';

export class ParticleBackground {
  constructor() {
    this.canvas = document.getElementById('bg-canvas');
    this.scene = null;
    this.camera = null;
    this.renderer = null;
    this.particles = null;
    this.particleCount = 1000;
    this.mouse = { x: 0, y: 0 };
    this.targetMouse = { x: 0, y: 0 };

    this.init();
    this.addEventListeners();
    this.animate();
  }

  init() {
    // Scene setup
    this.scene = new THREE.Scene();

    // Camera setup
    this.camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    this.camera.position.z = 50;

    // Renderer setup
    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvas,
      alpha: true,
      antialias: true
    });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Create particles
    this.createParticles();

    // Create connections
    this.createConnections();
  }

  createParticles() {
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(this.particleCount * 3);
    const velocities = [];

    for (let i = 0; i < this.particleCount; i++) {
      const i3 = i * 3;
      positions[i3] = (Math.random() - 0.5) * 100;
      positions[i3 + 1] = (Math.random() - 0.5) * 100;
      positions[i3 + 2] = (Math.random() - 0.5) * 100;

      velocities.push({
        x: (Math.random() - 0.5) * 0.02,
        y: (Math.random() - 0.5) * 0.02,
        z: (Math.random() - 0.5) * 0.02
      });
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    // Particle material with gradient
    const material = new THREE.PointsMaterial({
      size: 0.5,
      color: 0x8b5cf6,
      transparent: true,
      opacity: 0.6,
      sizeAttenuation: true,
      blending: THREE.AdditiveBlending
    });

    this.particles = new THREE.Points(geometry, material);
    this.particles.userData.velocities = velocities;
    this.scene.add(this.particles);
  }

  createConnections() {
    // Create lines to connect nearby particles (cloud-like network)
    const geometry = new THREE.BufferGeometry();
    const material = new THREE.LineBasicMaterial({
      color: 0x8b5cf6,
      transparent: true,
      opacity: 0.1,
      blending: THREE.AdditiveBlending
    });

    this.connections = new THREE.LineSegments(geometry, material);
    this.scene.add(this.connections);
  }

  updateConnections() {
    const positions = this.particles.geometry.attributes.position.array;
    const linePositions = [];
    const maxDistance = 15;

    // Only check a subset of particles for performance
    const step = 5;
    for (let i = 0; i < this.particleCount; i += step) {
      const i3 = i * 3;
      const x1 = positions[i3];
      const y1 = positions[i3 + 1];
      const z1 = positions[i3 + 2];

      for (let j = i + step; j < this.particleCount; j += step) {
        const j3 = j * 3;
        const x2 = positions[j3];
        const y2 = positions[j3 + 1];
        const z2 = positions[j3 + 2];

        const dx = x1 - x2;
        const dy = y1 - y2;
        const dz = z1 - z2;
        const distance = Math.sqrt(dx * dx + dy * dy + dz * dz);

        if (distance < maxDistance) {
          linePositions.push(x1, y1, z1);
          linePositions.push(x2, y2, z2);
        }
      }
    }

    this.connections.geometry.setAttribute(
      'position',
      new THREE.Float32BufferAttribute(linePositions, 3)
    );
  }

  addEventListeners() {
    window.addEventListener('resize', () => this.onResize());
    window.addEventListener('mousemove', (e) => this.onMouseMove(e));
    window.addEventListener('scroll', () => this.onScroll());
  }

  onResize() {
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
  }

  onMouseMove(event) {
    this.targetMouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    this.targetMouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
  }

  onScroll() {
    const scrollY = window.scrollY;
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    const scrollProgress = scrollY / maxScroll;

    // Rotate scene based on scroll
    this.particles.rotation.y = scrollProgress * Math.PI * 2;
  }

  animate() {
    requestAnimationFrame(() => this.animate());

    // Smooth mouse follow
    this.mouse.x += (this.targetMouse.x - this.mouse.x) * 0.05;
    this.mouse.y += (this.targetMouse.y - this.mouse.y) * 0.05;

    // Rotate particles based on mouse
    this.particles.rotation.x = this.mouse.y * 0.2;
    this.particles.rotation.y += 0.001;

    // Update particle positions
    const positions = this.particles.geometry.attributes.position.array;
    const velocities = this.particles.userData.velocities;

    for (let i = 0; i < this.particleCount; i++) {
      const i3 = i * 3;

      // Update positions with velocity
      positions[i3] += velocities[i].x;
      positions[i3 + 1] += velocities[i].y;
      positions[i3 + 2] += velocities[i].z;

      // Boundary check - wrap around
      if (Math.abs(positions[i3]) > 50) velocities[i].x *= -1;
      if (Math.abs(positions[i3 + 1]) > 50) velocities[i].y *= -1;
      if (Math.abs(positions[i3 + 2]) > 50) velocities[i].z *= -1;
    }

    this.particles.geometry.attributes.position.needsUpdate = true;

    // Update connections every few frames for performance
    if (Math.random() > 0.95) {
      this.updateConnections();
    }

    // Render
    this.renderer.render(this.scene, this.camera);
  }

  destroy() {
    window.removeEventListener('resize', () => this.onResize());
    window.removeEventListener('mousemove', (e) => this.onMouseMove(e));
    window.removeEventListener('scroll', () => this.onScroll());

    if (this.particles) {
      this.particles.geometry.dispose();
      this.particles.material.dispose();
    }

    if (this.connections) {
      this.connections.geometry.dispose();
      this.connections.material.dispose();
    }

    if (this.renderer) {
      this.renderer.dispose();
    }
  }
}
