// Main JavaScript file for Mobin Engineer's Website

// Product data for dynamic generation
const products = [
    {
        id: 'screw-barrel',
        name: 'Screw Barrel',
        description: 'High-precision screw barrels manufactured to exact specifications for optimal injection molding performance. Available in various sizes and materials.',
        icon: 'fas fa-screwdriver'
    },
    {
        id: 'dc-attachment',
        name: 'DC Attachment',
        description: 'Durable DC attachments designed for reliable connection and efficient power transmission in injection molding systems.',
        icon: 'fas fa-plug'
    },
    {
        id: 'ring',
        name: 'Ring',
        description: 'Precision-engineered rings and seals for injection molding machines, ensuring optimal sealing and performance under high pressure.',
        icon: 'fas fa-circle'
    },
    {
        id: 'plunger',
        name: 'Plunger',
        description: 'Heavy-duty plungers manufactured to withstand high-pressure injection molding operations with consistent performance.',
        icon: 'fas fa-piston'
    },
    {
        id: 'drive-shaft',
        name: 'Drive Shaft',
        description: 'Robust drive shafts engineered for smooth power transmission and long-lasting performance in demanding industrial applications.',
        icon: 'fas fa-cog'
    },
    {
        id: 'custom-parts',
        name: 'Custom Parts',
        description: 'Bespoke manufacturing services for custom injection molding components based on your technical drawings and specifications.',
        icon: 'fas fa-drafting-compass'
    }
];

// DOM Elements
let currentPage = 'home';
let mobileMenuOpen = false;

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    initializeNavigation();
    generateProductGrid();
    initializeForms();
    initializeScrollEffects();
    
    // Show home page by default
    showPage('home');
    
    console.log('Mobin Engineers website initialized successfully');
});

// Navigation Functions
function initializeNavigation() {
    const mobileMenu = document.getElementById('mobile-menu');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Mobile menu toggle
    mobileMenu.addEventListener('click', function() {
        toggleMobileMenu();
    });
    
    // Navigation link clicks
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const page = this.getAttribute('data-page');
            showPage(page);
            
            // Close mobile menu if open
            if (mobileMenuOpen) {
                toggleMobileMenu();
            }
        });
    });
    
    // Navbar scroll effect
    window.addEventListener('scroll', function() {
        const navbar = document.getElementById('navbar');
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
}

function toggleMobileMenu() {
    const mobileMenu = document.getElementById('mobile-menu');
    const navMenu = document.getElementById('nav-menu');
    
    mobileMenuOpen = !mobileMenuOpen;
    
    if (mobileMenuOpen) {
        mobileMenu.classList.add('active');
        navMenu.classList.add('active');
        document.body.style.overflow = 'hidden';
    } else {
        mobileMenu.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.style.overflow = '';
    }
}

function showPage(pageId) {
    // Hide all pages
    const pages = document.querySelectorAll('.page');
    pages.forEach(page => {
        page.classList.remove('active');
    });
    
    // Show selected page
    const targetPage = document.getElementById(pageId);
    if (targetPage) {
        targetPage.classList.add('active');
        currentPage = pageId;
        
        // Update navigation active state
        updateNavActiveState(pageId);
        
        // Scroll to top
        window.scrollTo({ top: 0, behavior: 'smooth' });
        
        // Update page title
        updatePageTitle(pageId);
    }
}

function updateNavActiveState(activePageId) {
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('data-page') === activePageId) {
            link.classList.add('active');
        }
    });
}

function updatePageTitle(pageId) {
    const titles = {
        'home': 'Mobin Engineers - Precision Injection Molding Spare Parts',
        'about': 'About Us - Mobin Engineers',
        'spares': 'Spare Parts - Mobin Engineers',
        'contact': 'Contact Us - Mobin Engineers'
    };
    
    document.title = titles[pageId] || titles['home'];
}

// Product Grid Generation
function generateProductGrid() {
    const productsGrid = document.getElementById('products-grid');
    if (!productsGrid) return;
    
    productsGrid.innerHTML = '';
    
    products.forEach(product => {
        const productCard = createProductCard(product);
        productsGrid.appendChild(productCard);
    });
}

function createProductCard(product) {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.setAttribute('data-product-id', product.id);
    
    card.innerHTML = `
        <div class="product-image">
            <i class="${product.icon}"></i>
        </div>
        <div class="product-content">
            <h3>${product.name}</h3>
            <p>${product.description}</p>
            <button class="btn btn-primary" onclick="requestQuote('${product.id}', '${product.name}')">
                Request Quote
            </button>
        </div>
    `;
    
    return card;
}

// Quote Modal Functions
function requestQuote(productId, productName) {
    const modal = document.getElementById('quote-modal');
    const productInput = document.getElementById('quote-product');
    
    productInput.value = productName;
    modal.style.display = 'block';
    
    // Focus on first input
    setTimeout(() => {
        document.getElementById('quote-name').focus();
    }, 100);
    
    // Prevent body scroll
    document.body.style.overflow = 'hidden';
}

function closeQuoteModal() {
    const modal = document.getElementById('quote-modal');
    modal.style.display = 'none';
    document.body.style.overflow = '';
    
    // Reset form
    document.getElementById('quote-form').reset();
}

// Form Handling
function initializeForms() {
    const contactForm = document.getElementById('contact-form');
    const quoteForm = document.getElementById('quote-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', handleContactForm);
    }
    
    if (quoteForm) {
        quoteForm.addEventListener('submit', handleQuoteForm);
    }
    
    // Close modal when clicking outside
    window.addEventListener('click', function(event) {
        const modal = document.getElementById('quote-modal');
        if (event.target === modal) {
            closeQuoteModal();
        }
        
        const successMessage = document.getElementById('success-message');
        if (event.target === successMessage) {
            closeSuccessMessage();
        }
    });
}

function handleContactForm(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);
    
    // Basic validation
    if (!validateContactForm(data)) {
        return;
    }
    
    // Simulate form submission
    console.log('Contact form submitted:', data);
    
    // Show success message
    showSuccessMessage('Thank you for contacting Mobin Engineers. We\'ll get back to you within 24 hours.');
    
    // Reset form
    e.target.reset();
    
    // TODO: Replace with actual backend integration
    // Example: submitToBackend('/api/contact', data);
}

function handleQuoteForm(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);
    
    // Basic validation
    if (!validateQuoteForm(data)) {
        return;
    }
    
    // Simulate form submission
    console.log('Quote form submitted:', data);
    
    // Close modal and show success message
    closeQuoteModal();
    showSuccessMessage('Your quote request has been submitted successfully. We\'ll prepare a detailed quote and contact you within 24 hours.');
    
    // Reset form
    e.target.reset();
    
    // TODO: Replace with actual backend integration
    // Example: submitToBackend('/api/quote', data);
}

function validateContactForm(data) {
    const errors = [];
    
    if (!data.name || data.name.trim().length < 2) {
        errors.push('Please enter a valid name');
    }
    
    if (!data.email || !isValidEmail(data.email)) {
        errors.push('Please enter a valid email address');
    }
    
    if (!data.message || data.message.trim().length < 10) {
        errors.push('Please enter a message with at least 10 characters');
    }
    
    if (data.phone && !isValidPhone(data.phone)) {
        errors.push('Please enter a valid phone number');
    }
    
    if (errors.length > 0) {
        alert('Please correct the following errors:\n\n' + errors.join('\n'));
        return false;
    }
    
    return true;
}

function validateQuoteForm(data) {
    const errors = [];
    
    if (!data.name || data.name.trim().length < 2) {
        errors.push('Please enter a valid name');
    }
    
    if (!data.email || !isValidEmail(data.email)) {
        errors.push('Please enter a valid email address');
    }
    
    if (data.phone && !isValidPhone(data.phone)) {
        errors.push('Please enter a valid phone number');
    }
    
    if (errors.length > 0) {
        alert('Please correct the following errors:\n\n' + errors.join('\n'));
        return false;
    }
    
    return true;
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function isValidPhone(phone) {
    const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
    const cleanPhone = phone.replace(/[\s\-\(\)]/g, '');
    return phoneRegex.test(cleanPhone) && cleanPhone.length >= 10;
}

// Success Message Functions
function showSuccessMessage(message) {
    const successMessage = document.getElementById('success-message');
    const messageText = successMessage.querySelector('p');
    
    if (messageText) {
        messageText.textContent = message;
    }
    
    successMessage.style.display = 'block';
    document.body.style.overflow = 'hidden';
    
    // Auto-close after 5 seconds
    setTimeout(() => {
        closeSuccessMessage();
    }, 5000);
}

function closeSuccessMessage() {
    const successMessage = document.getElementById('success-message');
    successMessage.style.display = 'none';
    document.body.style.overflow = '';
}

// Scroll Effects and Animations
function initializeScrollEffects() {
    // Intersection Observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animateElements = document.querySelectorAll('.service-card, .industry-item, .team-member, .capability-item, .product-card');
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// Utility Functions
function smoothScrollTo(elementId) {
    const element = document.getElementById(elementId);
    if (element) {
        element.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Keyboard Navigation Support
document.addEventListener('keydown', function(e) {
    // Close modals with Escape key
    if (e.key === 'Escape') {
        const quoteModal = document.getElementById('quote-modal');
        const successMessage = document.getElementById('success-message');
        
        if (quoteModal.style.display === 'block') {
            closeQuoteModal();
        }
        
        if (successMessage.style.display === 'block') {
            closeSuccessMessage();
        }
        
        if (mobileMenuOpen) {
            toggleMobileMenu();
        }
    }
});

// Performance Optimization
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

// Lazy Loading for Images (if implemented)
function initializeLazyLoading() {
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        const lazyImages = document.querySelectorAll('img[data-src]');
        lazyImages.forEach(img => imageObserver.observe(img));
    }
}

// Error Handling
window.addEventListener('error', function(e) {
    console.error('JavaScript Error:', e.error);
    // In production, you might want to send this to an error tracking service
});

// Accessibility Improvements
// function initializeAccessibility() {
//     // Skip to main content link
//     const skipLink = document.createElement('a');
//     skipLink.href = '#main';
//     skipLink.textContent = 'Skip to main content';
//     skipLink.className = 'skip-link';
//     skipLink.style.cssText = `
//         position: absolute;
//         top: -40px;
//         left: 6px;
//         background: var(--primary-color);
//         color: white;
//         padding: 8px;
//         text-decoration: none;
//         border-radius: 4px;
//         z-index: 9999;
//         transition: top 0.3s;
//     `;
    
//     skipLink.addEventListener('focus', () => {
//         skipLink.style.top = '6px';
//     });
    
//     skipLink.addEventListener('blur', () => {
//         skipLink.style.top = '-40px';
//     });
    
//     document.body.insertBefore(skipLink, document.body.firstChild);
    
//     // Add main landmark
//     const main = document.querySelector('main');
//     if (main) {
//         main.id = 'main';
//     }
// }

// Initialize accessibility features
document.addEventListener('DOMContentLoaded', initializeAccessibility);

// Export functions for testing (if needed)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        showPage,
        requestQuote,
        validateContactForm,
        validateQuoteForm,
        isValidEmail,
        isValidPhone
    };
}

// Service Worker Registration (for PWA features if needed)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        // Uncomment to register service worker
        // navigator.serviceWorker.register('/sw.js')
        //     .then(registration => console.log('SW registered'))
        //     .catch(error => console.log('SW registration failed'));
    });
}


console.log('Mobin Engineers website scripts loaded successfully');
