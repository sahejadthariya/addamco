// AddamCo Interactive JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all interactive features
    initNavigation();
    initScrollAnimations();
    initServiceCards();
    initContactForm();
    initFloatingCards();
    initParticleEffect();
    initExploreButton();
    initHeroCounters();
    
    // Initialize new interactive service showcase
    initServiceShowcase();
});

// Interactive Service Showcase functionality
function initServiceShowcase() {
    const showcaseItems = document.querySelectorAll('.showcase-item');
    const controlButtons = document.querySelectorAll('.control-btn');
    let currentService = 'brand';
    let autoRotateInterval = null;

    function switchService(targetService) {
        if (currentService === targetService) return;

        // Hide current service
        const currentItem = document.querySelector(`[data-service="${currentService}"]`);
        const currentControl = document.querySelector(`[data-target="${currentService}"]`);
        if (currentItem) {
            currentItem.classList.remove('active');
            currentControl.classList.remove('active');
        }

        // Show new service
        const newItem = document.querySelector(`[data-service="${targetService}"]`);
        const newControl = document.querySelector(`[data-target="${targetService}"]`);
        if (newItem) {
            newItem.classList.add('active');
            newControl.classList.add('active');
            currentService = targetService;
            trigger3DEffect(newItem);
        }
    }

    function trigger3DEffect(element) {
        element.style.transform = 'scale(0.9) rotateY(10deg)';
        element.style.opacity = '0';
        setTimeout(() => {
            element.style.transform = 'scale(1) rotateY(0deg)';
            element.style.opacity = '1';
        }, 100);
    }

    function startAutoRotate() {
        const services = ['brand', 'content', 'ai'];
        let index = 0;
        autoRotateInterval = setInterval(() => {
            index = (index + 1) % services.length;
            switchService(services[index]);
        }, 5000);
    }

    function resetAutoRotate() {
        clearInterval(autoRotateInterval);
        startAutoRotate();
    }

    // Bind control button events
    controlButtons.forEach(button => {
        button.addEventListener('click', function() {
            const target = this.getAttribute('data-target');
            switchService(target);
            resetAutoRotate();
        });
    });

    // Initialize 3D hover effects
    const showcaseContainer = document.querySelector('.showcase-container');
    if (showcaseContainer) {
        showcaseContainer.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = (e.clientX - rect.left) / rect.width;
            const y = (e.clientY - rect.top) / rect.height;
            const rotateX = (y - 0.5) * 10;
            const rotateY = (x - 0.5) * 10;
            this.style.transform = `perspective(1000px) rotateX(${-rotateX}deg) rotateY(${rotateY}deg)`;
        });

        showcaseContainer.addEventListener('mouseleave', function() {
            this.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
        });
    }

    // Start auto-rotation
    startAutoRotate();
}

// Navigation functionality
function initNavigation() {
    const navbar = document.querySelector('.navbar');
    const navLinks = document.querySelectorAll('.nav-link');
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const logoTexts = document.querySelectorAll('.logo-text');

    // Smooth scrolling for hash navigation links; allow normal links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            const isHash = href && href.startsWith('#');
            if (!isHash) return; // let browser handle full-page navigation

            e.preventDefault();
            const targetSection = document.querySelector(href);
            if (targetSection) {
                targetSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                // Close mobile menu if open
                navMenu.classList.remove('active');
                if (hamburger) hamburger.classList.remove('active');
            }
        });
    });

    // Mobile menu toggle
    if (hamburger) {
        hamburger.addEventListener('click', function() {
            this.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }

    function navigateHome() {
        const path = window.location.pathname || '';
        const onIndex = path.endsWith('/') || path.endsWith('index.html') || path === '';
        if (onIndex) {
            const target = document.getElementById('home');
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            } else {
                window.location.hash = '#home';
            }
        } else {
            window.location.href = 'index.html#home';
        }
    }
    if (logoTexts && logoTexts.length) {
        logoTexts.forEach(el => {
            if (el.tagName !== 'BUTTON' && el.tagName !== 'A') {
                el.setAttribute('role', 'link');
                el.setAttribute('tabindex', '0');
                el.style.cursor = 'pointer';
            }
            el.addEventListener('click', function() {
                navigateHome();
            });
            el.addEventListener('keydown', function(e) {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    navigateHome();
                }
            });
        });
    }

    // Navbar background on scroll
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            navbar.style.background = 'rgba(10, 10, 10, 0.98)';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 212, 255, 0.1)';
        } else {
            navbar.style.background = 'rgba(10, 10, 10, 0.95)';
            navbar.style.boxShadow = 'none';
        }
    });
}

// Scroll animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                
                // Special animations for different elements
                if (entry.target.classList.contains('service-card')) {
                    animateServiceCard(entry.target);
                } else if (entry.target.classList.contains('stat-item')) {
                    animateCounter(entry.target);
                } else if (entry.target.classList.contains('timeline-item')) {
                    animateTimeline(entry.target);
                }
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animateElements = document.querySelectorAll(
        '.service-card, .stat-item, .timeline-item, .contact-info, .contact-form'
    );
    
    animateElements.forEach(el => observer.observe(el));
}

// Service cards animation
function initServiceCards() {
    const serviceCards = document.querySelectorAll('.service-card');
    
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-15px) scale(1.02)';
            this.style.boxShadow = '0 25px 50px rgba(0, 212, 255, 0.15)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = 'none';
        });
    });

    // Service buttons
    const serviceButtons = document.querySelectorAll('.service-btn');
    serviceButtons.forEach(btn => {
        btn.addEventListener('click', function(e) {
            const card = this.closest('.service-card');
            const serviceType = card.getAttribute('data-service');
            
            // Create ripple effect
            createRippleEffect(this, e);
            
            // Scroll to contact form with service pre-selected
            setTimeout(() => {
                document.querySelector('#contact').scrollIntoView({
                    behavior: 'smooth'
                });
                
                // Pre-select service in form
                const serviceSelect = document.getElementById('service');
                if (serviceSelect) {
                    serviceSelect.value = serviceType;
                    serviceSelect.style.borderColor = 'var(--primary-color)';
                }
            }, 300);
        });
    });
}

// Floating cards animation
function initFloatingCards() {
    const floatingCards = document.querySelectorAll('.floating-card');
    
    floatingCards.forEach((card, index) => {
        // Add random floating animation
        card.style.animationDelay = `${index * 0.5}s`;
        
        card.addEventListener('mouseenter', function() {
            this.style.animationPlayState = 'paused';
            this.style.transform = 'scale(1.1)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.animationPlayState = 'running';
            this.style.transform = 'scale(1)';
        });
    });
}

// Contact form functionality
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const data = Object.fromEntries(formData);
            
            // Simulate form submission
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            
            // Show loading state
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;
            
            const endpoint = this.getAttribute('data-endpoint') || '/api/contact';
            fetch(endpoint, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            })
            .then(async (res) => {
                const isJson = res.headers.get('content-type')?.includes('application/json');
                const payload = isJson ? await res.json() : null;
                if (!res.ok) {
                    const msg = payload?.message || 'Failed to send message.';
                    throw new Error(msg);
                }
                showNotification('Message sent successfully! We\'ll get back to you soon.', 'success');
                this.reset();
                this.style.animation = 'successPulse 0.6s ease-out';
                setTimeout(() => { this.style.animation = ''; }, 600);
            })
            .catch((err) => {
                showNotification(err.message || 'Network error. Please try again.', 'error');
            })
            .finally(() => {
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            });
        });
    }
}

// Particle effect for hero section
function initParticleEffect() {
    const hero = document.querySelector('.hero');
    if (!hero) return;
    
    const particleCount = 50;
    const particles = [];
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.cssText = `
            position: absolute;
            width: 2px;
            height: 2px;
            background: var(--primary-color);
            border-radius: 50%;
            opacity: ${Math.random() * 0.5};
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            animation: particleFloat ${5 + Math.random() * 10}s infinite linear;
        `;
        
        hero.appendChild(particle);
        particles.push(particle);
    }
    
    // Add particle animation CSS
    const style = document.createElement('style');
    style.textContent = `
        @keyframes particleFloat {
            0% { transform: translateY(0px) rotate(0deg); }
            100% { transform: translateY(-100vh) rotate(360deg); }
        }
        
        @keyframes successPulse {
            0% { transform: scale(1); }
            50% { transform: scale(1.02); }
            100% { transform: scale(1); }
        }
        
        .animate-in {
            animation: fadeInUp 0.8s ease-out;
        }
        
        .notification {
            position: fixed;
            top: 100px;
            right: 20px;
            padding: 1rem 2rem;
            border-radius: 10px;
            color: white;
            font-weight: 600;
            z-index: 10000;
            transform: translateX(400px);
            transition: transform 0.3s ease;
        }
        
        .notification.success {
            background: var(--gradient-2);
        }
        
        .notification.error {
            background: linear-gradient(135deg, #ff4757 0%, #ff3838 100%);
        }
        
        .notification.show {
            transform: translateX(0);
        }
    `;
    document.head.appendChild(style);
}

// Utility functions
function animateServiceCard(card) {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    
    setTimeout(() => {
        card.style.transition = 'all 0.6s ease-out';
        card.style.opacity = '1';
        card.style.transform = 'translateY(0)';
    }, 100);
}

function animateCounter(statItem) {
    const numberElement = statItem.querySelector('.stat-number');
    if (!numberElement) return;

    // Prevent re-animation
    if (numberElement.dataset.animated === 'true') return;

    // Determine target and suffix
    const targetAttr = numberElement.getAttribute('data-target');
    const suffixAttr = numberElement.getAttribute('data-suffix') || '';
    const targetText = numberElement.textContent;
    const numericValue = targetAttr ? parseInt(targetAttr, 10) : parseInt(targetText.replace(/\D/g, ''), 10);

    if (!isNaN(numericValue) && numericValue >= 0) {
        let current = 0;
        const steps = 50;
        const increment = Math.max(1, Math.ceil(numericValue / steps));
        const timer = setInterval(() => {
            current += increment;
            if (current >= numericValue) {
                numberElement.textContent = `${numericValue}${suffixAttr}`;
                numberElement.dataset.animated = 'true';
                clearInterval(timer);
            } else {
                numberElement.textContent = `${Math.floor(current)}${suffixAttr}`;
            }
        }, 30);
    }
}

function animateTimeline(timelineItem) {
    timelineItem.style.opacity = '0';
    timelineItem.style.transform = 'translateX(-30px)';
    
    setTimeout(() => {
        timelineItem.style.transition = 'all 0.6s ease-out';
        timelineItem.style.opacity = '1';
        timelineItem.style.transform = 'translateX(0)';
    }, 200);
}

function createRippleEffect(button, event) {
    const ripple = document.createElement('span');
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;
    
    ripple.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        left: ${x}px;
        top: ${y}px;
        background: rgba(255, 255, 255, 0.3);
        border-radius: 50%;
        transform: scale(0);
        animation: ripple 0.6s linear;
        pointer-events: none;
    `;
    
    button.style.position = 'relative';
    button.style.overflow = 'hidden';
    button.appendChild(ripple);
    
    setTimeout(() => {
        ripple.remove();
    }, 600);
}

function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);
    
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// Add ripple animation CSS
const rippleStyle = document.createElement('style');
rippleStyle.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(rippleStyle);
// Explore button smooth scroll
function initExploreButton() {
    const exploreBtn = document.getElementById('exploreBtn');
    if (exploreBtn) {
        exploreBtn.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.getElementById('services');
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    }
}

// Theme toggle
function initThemeToggle() { /* removed */ }

// Deterministic hero counters from data-target
function initHeroCounters() {
    const counters = document.querySelectorAll('.hero .stat-number[data-target]');
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-target'), 10);
        if (!isNaN(target)) {
            let current = 0;
            const duration = 1200; // ms
            const start = performance.now();
            function step(now) {
                const progress = Math.min((now - start) / duration, 1);
                const value = Math.floor(progress * target);
                counter.textContent = value.toString();
                if (progress < 1) requestAnimationFrame(step);
            }
            requestAnimationFrame(step);
        }
    });
}
