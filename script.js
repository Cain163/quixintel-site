// Navigation functionality
const navbar = document.querySelector('.navbar');
const navLinks = document.querySelectorAll('.nav-link');
const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
const navMenu = document.querySelector('.nav-menu');

// Constants
const NAVBAR_HEIGHT_DESKTOP = 120;
const NAVBAR_HEIGHT_MOBILE = 80;
const SCROLL_THRESHOLD = 50;

// Debounce utility
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Hide navbar on scroll down, show on scroll up
let lastScrollTop = 0;
let isNavbarHidden = false;

window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;

    // Don't hide if near top of page
    if (scrollTop < SCROLL_THRESHOLD) {
        if (isNavbarHidden) {
            navbar.classList.remove('nav-hidden');
            isNavbarHidden = false;
        }
        lastScrollTop = scrollTop;
        return;
    }

    // Determine scroll direction
    if (scrollTop > lastScrollTop && !isNavbarHidden) {
        // Scrolling DOWN - hide navbar
        navbar.classList.add('nav-hidden');
        isNavbarHidden = true;
    } else if (scrollTop < lastScrollTop && isNavbarHidden) {
        // Scrolling UP - show navbar
        navbar.classList.remove('nav-hidden');
        isNavbarHidden = false;
    }

    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
}, { passive: true });

// Close mobile menu when scrolling
window.addEventListener('scroll', () => {
    if (window.innerWidth <= 768 && navMenu.classList.contains('active')) {
        closeMobileMenu();
    }
}, { passive: true });

// Mobile menu toggle with ARIA and CSS classes
mobileMenuToggle?.addEventListener('click', () => {
    const isOpen = navMenu.classList.toggle('active');
    navbar.classList.toggle('nav-menu-open');
    mobileMenuToggle.classList.toggle('active');
    mobileMenuToggle.setAttribute('aria-expanded', isOpen);
});

// Close menu function
function closeMobileMenu() {
    navMenu.classList.remove('active');
    navbar.classList.remove('nav-menu-open');
    mobileMenuToggle?.classList.remove('active');
    mobileMenuToggle?.setAttribute('aria-expanded', 'false');
}

// Close menu on Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navMenu.classList.contains('active')) {
        closeMobileMenu();
    }
});

// Close menu when clicking backdrop
navbar?.addEventListener('click', (e) => {
    if (e.target === navbar && navbar.classList.contains('nav-menu-open')) {
        closeMobileMenu();
    }
});

// Smooth scrolling for navigation links
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);

        if (targetSection) {
            const navbarHeight = window.innerWidth <= 768 ? NAVBAR_HEIGHT_MOBILE : NAVBAR_HEIGHT_DESKTOP;
            const offsetTop = targetSection.offsetTop - navbarHeight;

            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });

            // Close mobile menu
            closeMobileMenu();
        }
    });
});

// Active navigation link on scroll
const sections = document.querySelectorAll('section');

function updateActiveNavLink() {
    const scrollPosition = window.scrollY + 100;

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');

        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

// Debounce active nav link updates
const debouncedUpdateActiveNavLink = debounce(updateActiveNavLink, 100);
window.addEventListener('scroll', debouncedUpdateActiveNavLink, { passive: true });

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in-up');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe elements for animation
const animateElements = document.querySelectorAll(
    '.service-card, .feature-item, .tech-category, .stat-card, .about-text, .contact-info, .contact-form'
);

animateElements.forEach(el => {
    observer.observe(el);
});

// Contact form handling
const contactForm = document.querySelector('.contact-form');

contactForm?.addEventListener('submit', (e) => {
    e.preventDefault();

    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        organization: document.getElementById('organization').value,
        message: document.getElementById('message').value
    };

    // Show success message (in production, this would send to a backend)
    alert('Thank you for your message! Our team will contact you shortly.');

    // Reset form
    contactForm.reset();

    // In production, you would send the form data to your backend:
    // fetch('/api/contact', {
    //     method: 'POST',
    //     headers: {
    //         'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify(formData)
    // })
    // .then(response => response.json())
    // .then(data => {
    //     alert('Thank you for your message! Our team will contact you shortly.');
    //     contactForm.reset();
    // })
    // .catch(error => {
    //     alert('There was an error sending your message. Please try again.');
    // });
});

// Counter animation for stats
function animateCounter(element, target, duration = 2000) {
    const start = 0;
    const increment = target / (duration / 16);
    let current = start;

    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current);
        }
    }, 16);
}

// Observe stat cards for counter animation
const statObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statNumber = entry.target.querySelector('.stat-number');
            const text = statNumber.textContent;

            // Only animate if it's a number
            if (!isNaN(text) && text.trim() !== '') {
                const target = parseInt(text);
                animateCounter(statNumber, target);
            }

            statObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.stat-card').forEach(card => {
    statObserver.observe(card);
});

// Parallax effect for hero background
window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;
    const heroBackground = document.querySelector('.hero-background');

    if (heroBackground && scrolled < window.innerHeight) {
        heroBackground.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// Add smooth reveal effect to sections
const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
});

// Initialize sections with opacity 0
sections.forEach(section => {
    if (section.id !== 'home') {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        sectionObserver.observe(section);
    }
});

// Add loading state
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// Utility function to check if element is in viewport
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// Add hover effect to service cards
const serviceCards = document.querySelectorAll('.service-card');

serviceCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) scale(1.02)';
    });

    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Prevent default behavior for demo links
document.querySelectorAll('a[href="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
    });
});

// Add typing effect to hero subtitle
function typeWriter(element, text, speed = 50) {
    let i = 0;
    element.textContent = '';

    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }

    type();
}

// Particle system for hero section
class ParticleSystem {
    constructor(container) {
        this.container = container;
        this.particles = [];
        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext('2d');
        this.canvas.className = 'particle-canvas';
        this.container.appendChild(this.canvas);

        this.resize();
        window.addEventListener('resize', () => this.resize());

        this.createParticles();
        this.animate();
    }

    resize() {
        this.canvas.width = this.container.offsetWidth;
        this.canvas.height = this.container.offsetHeight;
    }

    createParticles() {
        const particleCount = Math.floor((this.canvas.width * this.canvas.height) / 15000);
        for (let i = 0; i < particleCount; i++) {
            this.particles.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                radius: Math.random() * 2 + 1,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5,
                opacity: Math.random() * 0.5 + 0.2
            });
        }
    }

    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.particles.forEach((particle, index) => {
            particle.x += particle.vx;
            particle.y += particle.vy;

            if (particle.x < 0 || particle.x > this.canvas.width) particle.vx *= -1;
            if (particle.y < 0 || particle.y > this.canvas.height) particle.vy *= -1;

            this.ctx.beginPath();
            this.ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
            this.ctx.fillStyle = `rgba(37, 99, 235, ${particle.opacity})`;
            this.ctx.fill();

            // Draw connections
            for (let j = index + 1; j < this.particles.length; j++) {
                const other = this.particles[j];
                const dx = particle.x - other.x;
                const dy = particle.y - other.y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < 100) {
                    this.ctx.beginPath();
                    this.ctx.strokeStyle = `rgba(6, 182, 212, ${0.2 * (1 - distance / 100)})`;
                    this.ctx.lineWidth = 1;
                    this.ctx.moveTo(particle.x, particle.y);
                    this.ctx.lineTo(other.x, other.y);
                    this.ctx.stroke();
                }
            }
        });

        requestAnimationFrame(() => this.animate());
    }
}

// Button ripple effect
function createRipple(event) {
    const button = event.currentTarget;
    const ripple = document.createElement('span');
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;

    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    ripple.className = 'ripple';

    button.style.position = 'relative';
    button.style.overflow = 'hidden';
    button.appendChild(ripple);

    setTimeout(() => ripple.remove(), 600);
}

// Staggered animation for cards
function staggerAnimation(elements, delay = 100) {
    elements.forEach((el, index) => {
        setTimeout(() => {
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
        }, index * delay);
    });
}

// Enhanced form interactions
function enhanceFormFields() {
    const formGroups = document.querySelectorAll('.form-group');

    formGroups.forEach(group => {
        const input = group.querySelector('input, textarea');
        const label = group.querySelector('label');

        if (input && label) {
            input.addEventListener('focus', () => {
                label.style.color = 'var(--primary-color)';
                label.style.transform = 'translateY(-2px)';
            });

            input.addEventListener('blur', () => {
                if (!input.value) {
                    label.style.color = '';
                    label.style.transform = '';
                }
            });
        }
    });
}

// Animated counter with easing
function easeOutQuad(t) {
    return t * (2 - t);
}

function animateCounterSmooth(element, target, duration = 2000) {
    const start = 0;
    const startTime = performance.now();

    function update(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const eased = easeOutQuad(progress);
        const current = Math.floor(start + (target - start) * eased);

        element.textContent = current;

        if (progress < 1) {
            requestAnimationFrame(update);
        } else {
            element.textContent = target;
        }
    }

    requestAnimationFrame(update);
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    console.log('Quix website loaded successfully');

    // Initialize particle system
    const heroBackground = document.querySelector('.hero-background');
    if (heroBackground) {
        new ParticleSystem(heroBackground);
    }

    // Add ripple effect to all buttons
    document.querySelectorAll('.btn').forEach(btn => {
        btn.addEventListener('click', createRipple);
    });

    // Enhance form fields
    enhanceFormFields();

    // Staggered animation for service cards
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });

    const serviceObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const cards = Array.from(serviceCards);
                staggerAnimation(cards, 100);
                serviceObserver.disconnect();
            }
        });
    }, { threshold: 0.1 });

    const servicesSection = document.querySelector('.services-grid');
    if (servicesSection) {
        serviceObserver.observe(servicesSection);
    }

    // Staggered animation for feature items
    const featureItems = document.querySelectorAll('.feature-item');
    featureItems.forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateX(-30px)';
        item.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });

    const featureObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const items = Array.from(featureItems);
                staggerAnimation(items, 80);
                featureObserver.disconnect();
            }
        });
    }, { threshold: 0.1 });

    const featuresSection = document.querySelector('.features-content');
    if (featuresSection) {
        featureObserver.observe(featuresSection);
    }

    // Tech visualization network
    const techVizCanvas = document.querySelector('.tech-viz-canvas');
    if (techVizCanvas) {
        initTechVisualization(techVizCanvas);
    }

    // Animate tech list items when in view
    const techObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const items = entry.target.querySelectorAll('.tech-list li');
                items.forEach((item, index) => {
                    setTimeout(() => {
                        item.style.opacity = '1';
                    }, index * 100);
                });
            }
        });
    }, { threshold: 0.3 });

    document.querySelectorAll('.tech-category').forEach(category => {
        techObserver.observe(category);
    });
});

// Tech network visualization
function initTechVisualization(canvas) {
    const ctx = canvas.getContext('2d');
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    const nodes = [
        { x: canvas.width * 0.5, y: canvas.height * 0.5, label: 'AI Core', size: 8 },
        { x: canvas.width * 0.2, y: canvas.height * 0.3, label: 'NLP', size: 6 },
        { x: canvas.width * 0.8, y: canvas.height * 0.3, label: 'ML', size: 6 },
        { x: canvas.width * 0.3, y: canvas.height * 0.7, label: 'Data', size: 6 },
        { x: canvas.width * 0.7, y: canvas.height * 0.7, label: 'API', size: 6 },
        { x: canvas.width * 0.15, y: canvas.height * 0.6, label: 'Stream', size: 5 },
        { x: canvas.width * 0.85, y: canvas.height * 0.6, label: 'Cloud', size: 5 },
        { x: canvas.width * 0.5, y: canvas.height * 0.15, label: 'Analytics', size: 5 },
    ];

    const connections = [
        [0, 1], [0, 2], [0, 3], [0, 4], [1, 5], [2, 6], [3, 5], [4, 6], [0, 7]
    ];

    let animationFrame = 0;

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        animationFrame++;

        // Draw connections
        connections.forEach(([start, end]) => {
            const node1 = nodes[start];
            const node2 = nodes[end];

            const gradient = ctx.createLinearGradient(node1.x, node1.y, node2.x, node2.y);
            gradient.addColorStop(0, 'rgba(37, 99, 235, 0.3)');
            gradient.addColorStop(0.5, 'rgba(6, 182, 212, 0.5)');
            gradient.addColorStop(1, 'rgba(37, 99, 235, 0.3)');

            ctx.beginPath();
            ctx.strokeStyle = gradient;
            ctx.lineWidth = 2;
            ctx.moveTo(node1.x, node1.y);
            ctx.lineTo(node2.x, node2.y);
            ctx.stroke();

            // Animated pulse along connection
            const pulseProgress = (animationFrame % 100) / 100;
            const pulseX = node1.x + (node2.x - node1.x) * pulseProgress;
            const pulseY = node1.y + (node2.y - node1.y) * pulseProgress;

            ctx.beginPath();
            ctx.arc(pulseX, pulseY, 3, 0, Math.PI * 2);
            ctx.fillStyle = 'rgba(6, 182, 212, 0.8)';
            ctx.fill();
        });

        // Draw nodes
        nodes.forEach((node, index) => {
            const pulse = Math.sin(animationFrame * 0.05 + index) * 0.3 + 1;

            // Outer glow
            const gradient = ctx.createRadialGradient(node.x, node.y, 0, node.x, node.y, node.size * pulse * 2);
            gradient.addColorStop(0, 'rgba(37, 99, 235, 0.4)');
            gradient.addColorStop(1, 'rgba(37, 99, 235, 0)');

            ctx.beginPath();
            ctx.arc(node.x, node.y, node.size * pulse * 2, 0, Math.PI * 2);
            ctx.fillStyle = gradient;
            ctx.fill();

            // Node circle
            ctx.beginPath();
            ctx.arc(node.x, node.y, node.size * pulse, 0, Math.PI * 2);
            ctx.fillStyle = '#2563eb';
            ctx.fill();
            ctx.strokeStyle = '#06b6d4';
            ctx.lineWidth = 2;
            ctx.stroke();

            // Label
            ctx.fillStyle = '#ffffff';
            ctx.font = '12px Inter, sans-serif';
            ctx.textAlign = 'center';
            ctx.fillText(node.label, node.x, node.y - node.size * 2);
        });

        requestAnimationFrame(animate);
    }

    animate();

    // Resize handler
    window.addEventListener('resize', () => {
        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;

        // Recalculate node positions
        nodes[0] = { x: canvas.width * 0.5, y: canvas.height * 0.5, label: 'AI Core', size: 8 };
        nodes[1] = { x: canvas.width * 0.2, y: canvas.height * 0.3, label: 'NLP', size: 6 };
        nodes[2] = { x: canvas.width * 0.8, y: canvas.height * 0.3, label: 'ML', size: 6 };
        nodes[3] = { x: canvas.width * 0.3, y: canvas.height * 0.7, label: 'Data', size: 6 };
        nodes[4] = { x: canvas.width * 0.7, y: canvas.height * 0.7, label: 'API', size: 6 };
        nodes[5] = { x: canvas.width * 0.15, y: canvas.height * 0.6, label: 'Stream', size: 5 };
        nodes[6] = { x: canvas.width * 0.85, y: canvas.height * 0.6, label: 'Cloud', size: 5 };
        nodes[7] = { x: canvas.width * 0.5, y: canvas.height * 0.15, label: 'Analytics', size: 5 };
    });
}

// Handle window resize for responsive adjustments
let resizeTimer;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        // Close mobile menu on resize to desktop
        if (window.innerWidth > 768) {
            navMenu.classList.remove('active');
            const spans = mobileMenuToggle?.querySelectorAll('span');
            if (spans) {
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        }
    }, 250);
});
