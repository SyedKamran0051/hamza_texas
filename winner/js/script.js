// Smooth scrolling for navigation links
document.addEventListener('DOMContentLoaded', function() {
    // Add animation classes to elements
    addAnimationClasses();
    
    // Initialize scroll animations
    initScrollAnimations();
    
    // Initialize header scroll effect
    initHeaderScroll();
    
    // Initialize mobile menu
    initMobileMenu();
    
    // Smooth scrolling for navigation links
    initSmoothScroll();
    
    // Contact form submission
    initContactForm();
    
    // Initialize parallax effect
    initParallax();
});

// Add animation classes to elements
function addAnimationClasses() {
    // Hero section animations
    const heroTitle = document.querySelector('.hero h1');
    const heroText = document.querySelector('.hero p');
    const heroBtn = document.querySelector('.hero .btn');
    
    if (heroTitle) heroTitle.classList.add('fade-in');
    if (heroText) heroText.classList.add('fade-in', 'delay-300');
    if (heroBtn) heroBtn.classList.add('fade-in', 'delay-600');
    
    // Add animation classes to location cards
    const locationCards = document.querySelectorAll('.location-card');
    locationCards.forEach((card, index) => {
        card.classList.add('fade-in');
        card.style.animationDelay = `${0.2 * index}s`;
    });
    
    // Add animation classes to value cards
    const valueCards = document.querySelectorAll('.value-card');
    valueCards.forEach((card, index) => {
        card.classList.add(index % 2 === 0 ? 'slide-in-left' : 'slide-in-right');
        card.style.animationDelay = `${0.2 * index}s`;
    });
    
    // Add animation classes to menu items
    const menuItems = document.querySelectorAll('.menu-item');
    menuItems.forEach((item, index) => {
        item.classList.add('fade-in');
        item.style.animationDelay = `${0.15 * index}s`;
    });
    
    // Add animation classes to community initiatives
    const initiatives = document.querySelectorAll('.initiative');
    initiatives.forEach((initiative, index) => {
        initiative.classList.add('fade-in');
        initiative.style.animationDelay = `${0.2 * index}s`;
    });
    
    // Add animation to app promo
    const appScreenshot = document.querySelector('.app-screenshot');
    if (appScreenshot) {
        appScreenshot.classList.add('slide-in-left');
    }
    
    const appLinks = document.querySelector('.app-links');
    if (appLinks) {
        appLinks.classList.add('slide-in-right', 'delay-300');
    }
}

// Initialize scroll animations
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right');
    
    // Initial check for elements in viewport
    checkElementsInViewport(animatedElements);
    
    // Check on scroll
    window.addEventListener('scroll', function() {
        checkElementsInViewport(animatedElements);
    });
}

// Check if elements are in viewport and animate them
function checkElementsInViewport(elements) {
    elements.forEach(element => {
        const elementPosition = element.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.2;
        
        if (elementPosition < screenPosition) {
            element.classList.add('animate');
        }
    });
}

// Initialize header scroll effect
function initHeaderScroll() {
    const header = document.querySelector('header');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
}

// Initialize mobile menu
function initMobileMenu() {
    // Add mobile menu button to header
    const header = document.querySelector('header .container');
    const nav = document.querySelector('nav');
    
    if (!document.querySelector('.mobile-menu-btn')) {
        const mobileMenuBtn = document.createElement('button');
        mobileMenuBtn.className = 'mobile-menu-btn';
        mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
        header.appendChild(mobileMenuBtn);
        
        // Add close button to nav
        const closeMenuBtn = document.createElement('button');
        closeMenuBtn.className = 'close-menu';
        closeMenuBtn.innerHTML = '<i class="fas fa-times"></i>';
        nav.appendChild(closeMenuBtn);
        
        // Add overlay
        const overlay = document.createElement('div');
        overlay.className = 'overlay';
        document.body.appendChild(overlay);
        
        // Open mobile menu
        mobileMenuBtn.addEventListener('click', function() {
            nav.classList.add('active');
            overlay.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
        
        // Close mobile menu
        function closeMenu() {
            nav.classList.remove('active');
            overlay.classList.remove('active');
            document.body.style.overflow = '';
        }
        
        closeMenuBtn.addEventListener('click', closeMenu);
        overlay.addEventListener('click', closeMenu);
        
        // Close menu when clicking on nav links
        const navLinks = document.querySelectorAll('nav a');
        navLinks.forEach(link => {
            link.addEventListener('click', closeMenu);
        });
    }
}

// Initialize smooth scroll
function initSmoothScroll() {
    const navLinks = document.querySelectorAll('header nav a, .footer-links a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Only apply to links that point to an ID on the page
            const targetId = this.getAttribute('href');
            if (targetId.startsWith('#') && targetId.length > 1) {
                e.preventDefault();
                
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    const headerHeight = document.querySelector('header').offsetHeight;
                    const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                    
                    // Update active state in navigation
                    document.querySelectorAll('header nav a').forEach(navLink => {
                        navLink.classList.remove('active');
                    });
                    this.classList.add('active');
                }
            }
        });
    });
    
    // Update active nav link on scroll
    window.addEventListener('scroll', function() {
        let current = '';
        const sections = document.querySelectorAll('section');
        const headerHeight = document.querySelector('header').offsetHeight;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - headerHeight - 100;
            const sectionHeight = section.clientHeight;
            
            if (pageYOffset >= sectionTop && pageYOffset < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            const href = link.getAttribute('href');
            if (href === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
}

// Initialize contact form
function initContactForm() {
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;
            
            // Simple validation
            if (!name || !email || !message) {
                alert('Please fill in all fields');
                return;
            }
            
            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                alert('Please enter a valid email address');
                return;
            }
            
            // In a real application, you would send this data to a server
            // For now, just show a success message
            const formContainer = contactForm.parentElement;
            
            // Create success message
            const successMessage = document.createElement('div');
            successMessage.className = 'success-message fade-in animate';
            successMessage.innerHTML = `
                <i class="fas fa-check-circle"></i>
                <h3>Thank you for your message!</h3>
                <p>We will get back to you soon.</p>
            `;
            
            // Hide form and show success message
            contactForm.style.display = 'none';
            formContainer.appendChild(successMessage);
            
            // Reset form
            contactForm.reset();
        });
    }
}

// Initialize parallax effect
function initParallax() {
    const hero = document.querySelector('.hero');
    
    window.addEventListener('scroll', function() {
        const scrollPosition = window.pageYOffset;
        if (hero && scrollPosition < hero.offsetHeight) {
            hero.style.backgroundPositionY = `${scrollPosition * 0.5}px`;
        }
    });
}

// Trigger animations on initial load
window.addEventListener('load', function() {
    // Trigger animations for elements already in viewport
    const animatedElements = document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right');
    checkElementsInViewport(animatedElements);
    
    // Animate hero section immediately
    const heroElements = document.querySelectorAll('.hero h1, .hero p, .hero .btn');
    heroElements.forEach(el => {
        el.classList.add('animate');
    });
});
