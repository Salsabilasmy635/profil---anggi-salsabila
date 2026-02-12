// Smooth scroll with offset for fixed navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offset = 80;
            const targetPosition = target.offsetTop - offset;
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observe all elements with fade-in class
document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

// Active navigation link on scroll
window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= (sectionTop - 150)) {
            current = section.getAttribute('id');
        }
    });

    // Update active state for navigation links
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// Add scroll event for navbar background
let lastScroll = 0;
const navbar = document.querySelector('nav');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll <= 0) {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 10px rgba(168, 144, 128, 0.1)';
    }
    
    lastScroll = currentScroll;
});

// Add animation delay to skill categories
document.addEventListener('DOMContentLoaded', () => {
    const skillCategories = document.querySelectorAll('.skill-category');
    skillCategories.forEach((category, index) => {
        category.style.animationDelay = `${index * 0.2}s`;
    });

    // Add animation delay to project cards
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.15}s`;
    });

    // Add animation delay to hobby cards
    const hobbyCards = document.querySelectorAll('.hobby-card');
    hobbyCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
    });

    // Add animation delay to contact cards
    const contactCards = document.querySelectorAll('.contact-card');
    contactCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
    });
});

// Parallax effect for sections (optional enhancement)
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.container');
    
    parallaxElements.forEach((element, index) => {
        const speed = 0.05;
        const yPos = -(scrolled * speed);
        // Apply subtle parallax effect
        // element.style.transform = `translateY(${yPos}px)`;
    });
});

// Console welcome message
console.log('%c👋 Halo! Welcome to my portfolio!', 'color: #a89080; font-size: 20px; font-weight: bold;');
console.log('%cJika kamu tertarik untuk berkolaborasi, jangan ragu untuk menghubungi saya!', 'color: #6b6b6b; font-size: 14px;');

// ============================================
// HAMBURGER MENU TOGGLE
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    const menuIcon = document.getElementById('menu-icon');
    const navMenu = document.querySelector('.nav-menu');

    if (!menuIcon || !navMenu) {
        console.error('Menu icon atau nav menu tidak ditemukan!');
        return;
    }

    // Toggle menu saat hamburger diklik
    menuIcon.addEventListener('click', function(e) {
        e.stopPropagation(); // ← PENTING! Cegah event bubble
        navMenu.classList.toggle('active');
        menuIcon.classList.toggle('active');
        console.log('Menu status:', navMenu.classList.contains('active') ? 'TERBUKA' : 'TERTUTUP');
    });

    // Tutup menu saat link menu diklik
    const menuLinks = document.querySelectorAll('.nav-menu a');
    menuLinks.forEach(function(link) {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            menuIcon.classList.remove('active');
        });
    });

    // Tutup menu saat klik di luar menu (OPTIONAL - bisa dihapus dulu kalau masih error)
    document.addEventListener('click', function(e) {
        const isClickInsideMenu = navMenu.contains(e.target);
        const isClickOnIcon = menuIcon.contains(e.target);
        
        if (!isClickInsideMenu && !isClickOnIcon && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            menuIcon.classList.remove('active');
        }
    });
});

// ============================================
// MODERN FLOATING BACKGROUND + PARTICLES
// ============================================

function addFloatingBackground(sectionId) {
    const section = document.getElementById(sectionId);
    if (!section) return;

    section.style.position = "relative";
    section.style.overflow = "hidden";

    // =====================
    // Shapes besar
    // =====================
    const shapesContainer = document.createElement("div");
    shapesContainer.className = "floating-bg";
    shapesContainer.style.position = "absolute";
    shapesContainer.style.inset = "0";
    shapesContainer.style.zIndex = "-2"; // di belakang particles
    shapesContainer.style.pointerEvents = "none";

    const shapes = [
    { size: 420, color: "rgba(176, 137, 104, 0.45)", top: "10%", left: "5%" },      // ← UBAH DARI 0.35
    { size: 500, color: "rgba(127, 85, 57, 0.38)", bottom: "5%", right: "0%" },     // ← UBAH DARI 0.28
    { size: 300, color: "rgba(168, 144, 128, 0.40)", top: "50%", right: "15%" }     // ← UBAH DARI 0.30
];

    shapes.forEach((cfg, index) => {
        const shape = document.createElement("div");
        shape.style.position = "absolute";
        shape.style.width = cfg.size + "px";
        shape.style.height = cfg.size + "px";
        shape.style.borderRadius = "50%";
        shape.style.background = `radial-gradient(circle, ${cfg.color} 0%, transparent 70%)`;
        shape.style.filter = "blur(70px)";
        shape.style.opacity = "1";
        shape.style.transition = "transform 0.2s linear";

        if (cfg.top) shape.style.top = cfg.top;
        if (cfg.bottom) shape.style.bottom = cfg.bottom;
        if (cfg.left) shape.style.left = cfg.left;
        if (cfg.right) shape.style.right = cfg.right;

        shapesContainer.appendChild(shape);
        animateShape(shape, index);
    });

    section.appendChild(shapesContainer);

    // =====================
    // Particles kecil
    // =====================
    const particlesContainer = document.createElement("div");
    particlesContainer.className = "particles-container";
    particlesContainer.style.position = "absolute";
    particlesContainer.style.inset = "0";
    particlesContainer.style.pointerEvents = "none";
    particlesContainer.style.zIndex = "-1"; // di atas shapes, di belakang konten

    const particleCount = 10;
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement("div");
        const size = 10 + Math.random() * 6; // 2-8px
        particle.style.width = particle.style.height = size + "px";
        particle.style.position = "absolute";
        particle.style.borderRadius = "50%";
        particle.style.backgroundColor = `rgba(168, 144, 128, ${0.2 + Math.random() * 0.5})`;
        particle.style.top = Math.random() * 100 + "%";
        particle.style.left = Math.random() * 100 + "%";
        particle.style.setProperty('--randX', Math.random());

        particlesContainer.appendChild(particle);
        animateParticle(particle);
    }

    section.insertBefore(particlesContainer, section.firstChild);
}

// =====================
// Shape animation
// =====================
function animateShape(shape, index) {
    let t = Math.random() * 100; // random start
    const speed = 0.001 + index * 0.0005;
    const amplitude = 60 + index * 20;

    function animate() {
        t += speed;
        const x = Math.sin(t) * amplitude;
        const y = Math.cos(t * 0.8) * amplitude;
        const rotate = Math.sin(t * 0.5) * 8;
        shape.style.transform = `translate(${x}px, ${y}px) rotate(${rotate}deg)`;
        requestAnimationFrame(animate);
    }

    animate();
}

// =====================
// Particle animation (CSS-based)
function animateParticle(particle) {
    let t = Math.random() * 100; // random start
    const speed = 0.001 + Math.random() * 0.001; // lambat
    const amplitudeY = 10 + Math.random() * 5;   // naik-turun ±10-15px
    const amplitudeX = 2 + Math.random() * 3;    // horizontal minor ±2-5px

    function animate() {
        t += speed;
        const y = Math.sin(t) * amplitudeY;
        const x = Math.sin(t * 25) * amplitudeX; // horizontal lebih lembut
        particle.style.transform = `translate(${x}px, ${y}px)`;
        requestAnimationFrame(animate);
    }

    animate();
}

// =====================
// Activate all sections
// =====================
document.addEventListener("DOMContentLoaded", () => {
    const sections = ["about", "skills", "projects", "education", "hobbies", "contact"];
    sections.forEach(id => addFloatingBackground(id));
    console.log("✨ Modern floating + particles active!");
});

