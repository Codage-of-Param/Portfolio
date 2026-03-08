/* =========================================================================
   SCRIPT.JS - Interactivity for Param Chotaliya's Portfolio
   ========================================================================= */

/* --- Theme Switcher --- */
const themeToggleBtn = document.getElementById('theme-toggle');
const body = document.body;
const themes = ['dark-theme', 'light-theme', 'blue-theme'];
let currentThemeIndex = 0; // Assume starting with dark-theme

if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
        // Remove current theme
        if (themes[currentThemeIndex] !== 'dark-theme') {
            body.classList.remove(themes[currentThemeIndex]);
        }
        
        // Cycle to next theme
        currentThemeIndex = (currentThemeIndex + 1) % themes.length;
        
        // Add new theme
        if (themes[currentThemeIndex] !== 'dark-theme') {
            body.classList.add(themes[currentThemeIndex]);
        }
        
        // Ensure dark-theme is applied properly if it's the base active one
        if (themes[currentThemeIndex] === 'dark-theme') {
             body.className = "dark-theme"; 
        }
    });
}

/* --- Mobile Nav Toggle --- */
const navMenu = document.getElementById('nav-menu');
const navToggle = document.getElementById('nav-toggle');
const navClose = document.getElementById('nav-close');

if (navToggle) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.add('show-menu');
    });
}

if (navClose) {
    navClose.addEventListener('click', () => {
        navMenu.classList.remove('show-menu');
    });
}

/* Remove Menu on Nav Link Click */
const navLinks = document.querySelectorAll('.nav-link');

function linkAction() {
    navMenu.classList.remove('show-menu');
}
navLinks.forEach(n => n.addEventListener('click', linkAction));


/* --- Change Background Header --- */
function scrollHeader() {
    const header = document.getElementById('header');
    if (this.scrollY >= 50) {
        header.classList.add('scroll-header');
    } else {
        header.classList.remove('scroll-header');
    }
}
window.addEventListener('scroll', scrollHeader);


/* --- Scroll Up Visibility --- */
function scrollUp() {
    const scrollUp = document.getElementById('scroll-up');
    if (this.scrollY >= 350) {
        scrollUp.classList.add('show-scroll');
    } else {
        scrollUp.classList.remove('show-scroll');
    }
}
window.addEventListener('scroll', scrollUp);


/* --- Active Link on Scroll Section --- */
const sections = document.querySelectorAll('section[id]');

function scrollActive() {
    const scrollY = window.pageYOffset;

    sections.forEach(current => {
        const sectionHeight = current.offsetHeight;
        const sectionTop = current.offsetTop - 100;
        const sectionId = current.getAttribute('id');

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            document.querySelector('.nav-menu a[href*=' + sectionId + ']').classList.add('active-link');
        } else {
            document.querySelector('.nav-menu a[href*=' + sectionId + ']').classList.remove('active-link');
        }
    });
}
window.addEventListener('scroll', scrollActive);


/* --- Typing Effect (Hero Section) --- */
const typingText = document.querySelector('.typing-text');
const words = ["Data Science", "AI-ML Engineer"];
let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingDelay = 150;

function type() {
    if (!typingText) return;

    const currentWord = words[wordIndex];
    if (isDeleting) {
        typingText.textContent = currentWord.substring(0, charIndex - 1);
        charIndex--;
        typingDelay = 50; // Faster when deleting
    } else {
        typingText.textContent = currentWord.substring(0, charIndex + 1);
        charIndex++;
        typingDelay = 150; // Normal typing speed
    }

    if (!isDeleting && charIndex === currentWord.length) {
        isDeleting = true;
        typingDelay = 1500; // Pause at end of word
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        wordIndex = (wordIndex + 1) % words.length;
        typingDelay = 500; // Pause before new word
    }

    setTimeout(type, typingDelay);
}

document.addEventListener("DOMContentLoaded", () => {
    if(words.length) setTimeout(type, 1000);
});


/* --- Scroll Reveal Animation --- */
const sr = ScrollReveal({
    origin: 'top',
    distance: '60px',
    duration: 2500,
    delay: 400,
    // reset: true /* Uncomment to repeat animations */
});

sr.reveal(`.home-data, .section-title, .section-subtitle`);
sr.reveal(`.home-visual`, {delay: 500, origin: 'bottom'});
sr.reveal(`.about-img`, {origin: 'left'});
sr.reveal(`.about-data, .skills-content`, {origin: 'right'});
sr.reveal(`.project-card, .contact-card`, {interval: 100});
sr.reveal(`.contact-form-container`, {origin: 'right', delay: 200});

/* --- Three.js 3D Background --- */
const canvas = document.querySelector('#bg-canvas');
if (canvas && typeof THREE !== 'undefined') {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true, antialias: true });

    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.position.setZ(30);

    // Create Neural Network Mesh Group
    const networkGroup = new THREE.Group();
    scene.add(networkGroup);

    // Create Particles representing Neurons/Nodes scattered vertically
    const particlesCount = 120; // Reduced from 300
    const positions = new Float32Array(particlesCount * 3);
    const particlePoints = [];

    // Spread network vertically to give the effect of traveling through it
    const verticalSpread = 300;

    for(let i = 0; i < particlesCount; i++) {
        const x = (Math.random() - 0.5) * 120; // Spread horizontally
        const y = (Math.random() - 0.5) * verticalSpread; // Spread vertically
        const z = (Math.random() - 0.5) * 80;
        
        positions[i * 3] = x;
        positions[i * 3 + 1] = y;
        positions[i * 3 + 2] = z;
        
        particlePoints.push(new THREE.Vector3(x, y, z));
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    const material = new THREE.PointsMaterial({
        size: 0.4,
        color: 0x00d2ff, // Cyan nodes
        transparent: true,
        opacity: 0.6, // Reduced opacity
        blending: THREE.AdditiveBlending
    });

    const particlesMesh = new THREE.Points(geometry, material);
    networkGroup.add(particlesMesh);

    // Lines connecting close nodes removed as requested.

    // Add some floating "Data Blocks" / Tensors (AI Context)
    const shapeGeometry = new THREE.BoxGeometry(2, 2, 2);
    const shapeMaterial = new THREE.MeshBasicMaterial({ 
        color: 0x00d2ff, // Cyan
        wireframe: true,
        transparent: true,
        opacity: 0.2
    });

    const shapes = [];
    for(let i=0; i<3; i++) { // Reduced from 8
        const shape = new THREE.Mesh(shapeGeometry, shapeMaterial);
        shape.position.set(
            (Math.random() - 0.5) * 80,
            (Math.random() - 0.5) * 80,
            (Math.random() - 0.5) * 30 - 15
        );
        const scale = Math.random() * 2 + 0.5;
        shape.scale.set(scale, scale, scale);
        networkGroup.add(shape);
        shapes.push({
            mesh: shape,
            rotSpeedX: Math.random() * 0.005,
            rotSpeedY: Math.random() * 0.005
        });
    }

    // Mouse Interactivity
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;
    let currentScrollY = window.scrollY;
    
    const windowHalfX = window.innerWidth / 2;
    const windowHalfY = window.innerHeight / 2;

    document.addEventListener('mousemove', (event) => {
        mouseX = (event.clientX - windowHalfX);
        mouseY = (event.clientY - windowHalfY);
    });
    
    window.addEventListener('scroll', () => {
        currentScrollY = window.scrollY;
    });

    // Resize handler
    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });

    // Animation Loop
    const clock = new THREE.Clock();

    function animate() {
        requestAnimationFrame(animate);
        const elapsedTime = clock.getElapsedTime();

        // Rotate Neural Network system slowly & smoothly oscillate
        networkGroup.rotation.y = Math.sin(elapsedTime * 0.1) * 0.1;
        networkGroup.rotation.x = Math.cos(elapsedTime * 0.1) * 0.05;

        // Move network up as we scroll down to simulate traveling down through the sections/layers
        const maxScroll = Math.max(1, document.body.scrollHeight - window.innerHeight);
        const scrollFraction = currentScrollY / maxScroll;
        const travelDistance = 150; // The total vertical distance we travel
        const targetNetworkY = scrollFraction * travelDistance; 

        networkGroup.position.y += (targetNetworkY - networkGroup.position.y) * 0.05;

        // Subtle parallax effect based on mouse mapped to target speeds
        targetX = mouseX * 0.001;
        targetY = mouseY * 0.001;
        
        // Smooth camera movement using lerp
        camera.position.x += (targetX * 10 - camera.position.x) * 0.02;
        camera.position.y += (-targetY * 10 - camera.position.y) * 0.02;
        camera.lookAt(scene.position);

        // Rotate shapes independently
        shapes.forEach(obj => {
            obj.mesh.rotation.x += obj.rotSpeedX;
            obj.mesh.rotation.y += obj.rotSpeedY;
        });

        renderer.render(scene, camera);
    }

    animate();
}
