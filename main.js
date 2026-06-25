// ── NAVBAR TOGGLE (MOBILE) ──
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');

if (navToggle && navLinks) {
  navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('active');
    navLinks.classList.toggle('active');
  });

  // Close nav on link click
  document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
      navToggle.classList.remove('active');
      navLinks.classList.remove('active');
    });
  });
}

// ── NAVBAR SCROLL ACTION ──
window.addEventListener('scroll', () => {
  const navbar = document.getElementById('navbar');
  if (navbar) {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }
});

// ── TYPED.JS ANIMATION ──
if (document.getElementById('heroTyped')) {
  new Typed('#heroTyped', {
    strings: [
      'Full-Stack Web Applications.',
      'Firebase-backed Android Apps.',
      'MERN Stack Solutions.',
      'RESTful APIs & UI/UX.'
    ],
    typeSpeed: 60,
    backSpeed: 40,
    backDelay: 2000,
    loop: true
  });
}

// ── THREE.JS HERO BACKGROUND ──
const canvas = document.getElementById('heroCanvas');
if (canvas) {
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  const renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true, antialias: true });
  
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  // Particles Setup
  const particlesGeometry = new THREE.BufferGeometry();
  const particlesCount = 800;
  const posArray = new Float32Array(particlesCount * 3);

  for (let i = 0; i < particlesCount * 3; i++) {
    posArray[i] = (Math.random() - 0.5) * 8;
  }

  particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));

  // Material
  const particlesMaterial = new THREE.PointsMaterial({
    size: 0.015,
    color: '#06b6d4',
    transparent: true,
    opacity: 0.8,
    blending: THREE.AdditiveBlending
  });

  // Mesh
  const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
  scene.add(particlesMesh);

  camera.position.z = 3;

  // Mouse interactivity
  let mouseX = 0;
  let mouseY = 0;

  window.addEventListener('mousemove', (e) => {
    mouseX = (e.clientX / window.innerWidth) - 0.5;
    mouseY = (e.clientY / window.innerHeight) - 0.5;
  });

  // Resize handler
  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });

  // Animation Loop
  const clock = new THREE.Clock();
  const tick = () => {
    const elapsedTime = clock.getElapsedTime();

    particlesMesh.rotation.y = elapsedTime * 0.05;
    particlesMesh.rotation.x = elapsedTime * 0.02;

    // Smooth particle reaction to mouse movements
    particlesMesh.position.x += (mouseX * 0.5 - particlesMesh.position.x) * 0.05;
    particlesMesh.position.y += (-mouseY * 0.5 - particlesMesh.position.y) * 0.05;

    renderer.render(scene, camera);
    window.requestAnimationFrame(tick);
  };
  tick();
}

// ── VANILLA TILT INITIATION ──
if (typeof VanillaTilt !== 'undefined') {
  VanillaTilt.init(document.querySelectorAll(".tilt-card, .stat-card, .timeline-card, .project-card, .skill-group, .cert-card, .contact-item"), {
    max: 12,
    speed: 500,
    glare: true,
    "max-glare": 0.15,
  });
}

// ── GSAP & SCROLLTRIGGER REVEALS ──
if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);

  // Home Intro Animations
  gsap.from('.hero-badge', { opacity: 0, y: 30, duration: 1, ease: 'power4.out', delay: 0.2 });
  gsap.from('.hero-greeting', { opacity: 0, y: 30, duration: 1, ease: 'power4.out', delay: 0.4 });
  gsap.from('.hero-name', { opacity: 0, y: 30, duration: 1, ease: 'power4.out', delay: 0.6 });
  gsap.from('.hero-last', { opacity: 0, y: 30, duration: 1, ease: 'power4.out', delay: 0.8 });
  gsap.from('.hero-typed-wrapper', { opacity: 0, y: 30, duration: 1, ease: 'power4.out', delay: 1.0 });
  gsap.from('.hero-desc', { opacity: 0, y: 30, duration: 1, ease: 'power4.out', delay: 1.2 });
  gsap.from('.hero-actions', { opacity: 0, y: 30, duration: 1, ease: 'power4.out', delay: 1.4 });
  gsap.from('.hero-socials', { opacity: 0, y: 30, duration: 1, ease: 'power4.out', delay: 1.6 });
  gsap.from('.hero-3d-element', { opacity: 0, scale: 0.8, duration: 1.5, ease: 'power4.out', delay: 1.0 });

  // Scroll Reveal elements
  gsap.utils.toArray('.reveal-up').forEach((elem) => {
    gsap.fromTo(elem, 
      { opacity: 0, y: 50 },
      { 
        opacity: 1, 
        y: 0, 
        duration: 1, 
        ease: 'power3.out',
        scrollTrigger: {
          trigger: elem,
          start: 'top 85%',
          toggleActions: 'play none none none'
        }
      }
    );
  });

  gsap.utils.toArray('.reveal-left').forEach((elem) => {
    gsap.fromTo(elem, 
      { opacity: 0, x: -50 },
      { 
        opacity: 1, 
        x: 0, 
        duration: 1, 
        ease: 'power3.out',
        scrollTrigger: {
          trigger: elem,
          start: 'top 85%',
          toggleActions: 'play none none none'
        }
      }
    );
  });

  gsap.utils.toArray('.reveal-right').forEach((elem) => {
    gsap.fromTo(elem, 
      { opacity: 0, x: 50 },
      { 
        opacity: 1, 
        x: 0, 
        duration: 1, 
        ease: 'power3.out',
        scrollTrigger: {
          trigger: elem,
          start: 'top 85%',
          toggleActions: 'play none none none'
        }
      }
    );
  });

  // Trigger counters count-up animation when in view
  ScrollTrigger.create({
    trigger: '.about-stats',
    start: 'top 80%',
    onEnter: () => {
      document.querySelectorAll('.stat-num').forEach(counter => {
        const target = +counter.getAttribute('data-count');
        const updateCount = () => {
          const current = +counter.innerText;
          const increment = Math.ceil(target / 30);
          if (current < target) {
            counter.innerText = Math.min(current + increment, target);
            setTimeout(updateCount, 40);
          } else {
            counter.innerText = target + "+";
          }
        };
        updateCount();
      });
    }
  });
} else {
  // Fallback if GSAP is not loaded/blocked
  document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right').forEach(el => {
    el.style.opacity = '1';
  });
}

// ── CONTACT FORM HANDLING ──
const contactForm = document.getElementById('contactForm');
const formSuccess = document.getElementById('formSuccess');

if (contactForm && formSuccess) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Simulate API call
    const sendBtn = document.getElementById('sendMessageBtn');
    if (sendBtn) {
      sendBtn.disabled = true;
      sendBtn.querySelector('span').innerText = 'Sending...';
    }

    setTimeout(() => {
      formSuccess.classList.add('show');
      contactForm.reset();
      if (sendBtn) {
        sendBtn.disabled = false;
        sendBtn.querySelector('span').innerText = 'Send Message';
      }
      setTimeout(() => {
        formSuccess.classList.remove('show');
      }, 5000);
    }, 1500);
  });
}
