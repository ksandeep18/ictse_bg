// Custom JavaScript for ICTSSE 2026 Conference Website

document.addEventListener('DOMContentLoaded', function() {
    
    // Initialize smooth scrolling for navigation links
    initSmoothScrolling();
    
    // Initialize navbar scroll effects
    initNavbarScrollEffects();
    
    // Initialize scroll animations
    initScrollAnimations();
    
    // Initialize contact form
    initContactForm();
    
    // Initialize carousel auto-play controls
    initCarouselControls();
    
    // Initialize tooltips and popovers if needed
    initBootstrapComponents();
    
    // Initialize responsive behavior
    initResponsiveBehavior();
    
    // Initialize countdown timer
    initCountdownTimer();
});

/**
 * Initialize smooth scrolling for navigation links
 */
function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const navbar = document.querySelector('.navbar');
                const navbarHeight = navbar ? navbar.offsetHeight : 0;
                const targetPosition = targetSection.offsetTop - navbarHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                const navbarCollapse = document.querySelector('.navbar-collapse');
                if (navbarCollapse && navbarCollapse.classList.contains('show')) {
                    const navbarToggler = document.querySelector('.navbar-toggler');
                    if (navbarToggler) {
                        navbarToggler.click();
                    }
                }
                
                // Update active nav link
                updateActiveNavLink(this);
            }
        });
    });
}

/**
 * Update active navigation link
 */
function updateActiveNavLink(clickedLink) {
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
    
    navLinks.forEach(link => {
        link.classList.remove('active');
    });
    
    clickedLink.classList.add('active');
}

/**
 * Initialize navbar scroll effects
 */
function initNavbarScrollEffects() {
    const navbar = document.querySelector('.navbar');
    
    if (!navbar) return;
    
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Add/remove shadow based on scroll position
        if (scrollTop > 10) {
            navbar.classList.add('shadow');
        } else {
            navbar.classList.remove('shadow');
        }
        
        // Update active nav link based on scroll position
        updateActiveNavOnScroll();
        
        lastScrollTop = scrollTop;
    });
}

/**
 * Update active nav link based on scroll position
 */
function updateActiveNavOnScroll() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
    
    let currentSectionId = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.clientHeight;
        
        if (window.pageYOffset >= sectionTop && window.pageYOffset < sectionTop + sectionHeight) {
            currentSectionId = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSectionId}`) {
            link.classList.add('active');
        }
    });
}

/**
 * Initialize scroll animations
 */
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('.card, .timeline-item');
    
    const observer = new IntersectionObserver((entries) => {
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
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

/**
 * Initialize contact form
 */
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    
    if (!contactForm) return;
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const phone = document.getElementById('phone').value;
        const subject = document.getElementById('subject').value;
        const message = document.getElementById('message').value;
        
        // Basic validation
        if (!validateContactForm(name, email, subject, message)) {
            return;
        }
        
        // Show loading state
        const submitBtn = this.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i>Sending...';
        submitBtn.disabled = true;
        
        // Simulate form submission (replace with actual API call)
        setTimeout(() => {
            showSuccessMessage();
            contactForm.reset();
            
            // Reset button
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        }, 2000);
    });
}

/**
 * Validate contact form
 */
function validateContactForm(name, email, subject, message) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (!name.trim()) {
        showErrorMessage('Please enter your name.');
        return false;
    }
    
    if (!email.trim() || !emailRegex.test(email)) {
        showErrorMessage('Please enter a valid email address.');
        return false;
    }
    
    if (!subject.trim()) {
        showErrorMessage('Please select a subject.');
        return false;
    }
    
    if (!message.trim() || message.length < 10) {
        showErrorMessage('Please enter a message of at least 10 characters.');
        return false;
    }
    
    return true;
}

/**
 * Show success message
 */
function showSuccessMessage() {
    const alertHtml = `
        <div class="alert alert-success alert-dismissible fade show" role="alert">
            <i class="fas fa-check-circle me-2"></i>
            <strong>Success!</strong> Your message has been sent successfully. We will get back to you soon.
            <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
        </div>
    `;
    
    const contactForm = document.getElementById('contactForm');
    contactForm.insertAdjacentHTML('beforebegin', alertHtml);
    
    // Auto-remove alert after 5 seconds
    setTimeout(() => {
        const alert = document.querySelector('.alert-success');
        if (alert) {
            alert.remove();
        }
    }, 5000);
}

/**
 * Show error message
 */
function showErrorMessage(message) {
    const alertHtml = `
        <div class="alert alert-danger alert-dismissible fade show" role="alert">
            <i class="fas fa-exclamation-circle me-2"></i>
            <strong>Error!</strong> ${message}
            <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
        </div>
    `;
    
    const contactForm = document.getElementById('contactForm');
    contactForm.insertAdjacentHTML('beforebegin', alertHtml);
    
    // Auto-remove alert after 5 seconds
    setTimeout(() => {
        const alert = document.querySelector('.alert-danger');
        if (alert) {
            alert.remove();
        }
    }, 5000);
}

/**
 * Initialize carousel controls
 */
function initCarouselControls() {
    const carousel = document.getElementById('heroCarousel');
    
    if (!carousel) return;
    
    // Pause carousel on hover
    carousel.addEventListener('mouseenter', function() {
        const carouselInstance = bootstrap.Carousel.getInstance(this);
        if (carouselInstance) {
            carouselInstance.pause();
        }
    });
    
    // Resume carousel when mouse leaves
    carousel.addEventListener('mouseleave', function() {
        const carouselInstance = bootstrap.Carousel.getInstance(this);
        if (carouselInstance) {
            carouselInstance.cycle();
        }
    });
}

/**
 * Initialize Bootstrap components
 */
function initBootstrapComponents() {
    // Initialize tooltips
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.map(function(tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });
    
    // Initialize popovers
    const popoverTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'));
    popoverTriggerList.map(function(popoverTriggerEl) {
        return new bootstrap.Popover(popoverTriggerEl);
    });
}

/**
 * Initialize responsive behavior
 */
function initResponsiveBehavior() {
    // Handle window resize
    window.addEventListener('resize', function() {
        // Update carousel height on mobile
        updateCarouselHeight();
        
        // Close mobile menu on resize to desktop
        if (window.innerWidth > 992) {
            const navbarCollapse = document.querySelector('.navbar-collapse');
            if (navbarCollapse && navbarCollapse.classList.contains('show')) {
                const navbarToggler = document.querySelector('.navbar-toggler');
                if (navbarToggler) {
                    navbarToggler.click();
                }
            }
        }
    });
    
    // Initial carousel height update
    updateCarouselHeight();
}

/**
 * Update carousel height for mobile devices
 */
function updateCarouselHeight() {
    const carousel = document.querySelector('.carousel');
    const carouselItems = document.querySelectorAll('.carousel-item');
    
    if (!carousel || !carouselItems.length) return;
    
    if (window.innerWidth < 768) {
        const viewportHeight = window.innerHeight;
        const navbarHeight = document.querySelector('.navbar')?.offsetHeight || 0;
        const minHeight = Math.max(500, viewportHeight - navbarHeight);
        
        carousel.style.height = `${minHeight}px`;
        carouselItems.forEach(item => {
            item.style.height = `${minHeight}px`;
        });
    } else {
        carousel.style.height = '100vh';
        carouselItems.forEach(item => {
            item.style.height = '100vh';
        });
    }
}

/**
 * Add loading animation to buttons
 */
function addButtonLoading(button, loadingText = 'Loading...') {
    const originalText = button.innerHTML;
    button.innerHTML = `<i class="fas fa-spinner fa-spin me-2"></i>${loadingText}`;
    button.disabled = true;
    
    return function() {
        button.innerHTML = originalText;
        button.disabled = false;
    };
}

/**
 * Utility function to debounce events
 */
function debounce(func, wait, immediate) {
    let timeout;
    return function executedFunction() {
        const context = this;
        const args = arguments;
        const later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
}

/**
 * Initialize registration button functionality
 */
document.querySelectorAll('.btn:contains("Register Now")').forEach(button => {
    button.addEventListener('click', function(e) {
        e.preventDefault();
        
        // Show registration modal or redirect to registration page
        const alertHtml = `
            <div class="alert alert-info alert-dismissible fade show" role="alert">
                <i class="fas fa-info-circle me-2"></i>
                <strong>Registration:</strong> Registration will open soon. Please check back later or contact us for more information.
                <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
            </div>
        `;
        
        document.body.insertAdjacentHTML('afterbegin', alertHtml);
        
        // Auto-remove alert after 5 seconds
        setTimeout(() => {
            const alert = document.querySelector('.alert-info');
            if (alert) {
                alert.remove();
            }
        }, 5000);
    });
});

/**
 * Add scroll-to-top functionality
 */
function addScrollToTop() {
    const scrollBtn = document.createElement('button');
    scrollBtn.innerHTML = '<i class="fas fa-chevron-up"></i>';
    scrollBtn.className = 'btn btn-primary scroll-to-top';
    scrollBtn.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        display: none;
        z-index: 1000;
        border: none;
        box-shadow: 0 2px 10px rgba(0,0,0,0.2);
    `;
    
    document.body.appendChild(scrollBtn);
    
    // Show/hide based on scroll position
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            scrollBtn.style.display = 'block';
        } else {
            scrollBtn.style.display = 'none';
        }
    });
    
    // Scroll to top on click
    scrollBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Initialize scroll-to-top button
addScrollToTop();

/**
 * Handle print functionality
 */
function initPrintStyles() {
    // Add print button functionality if needed
    const printButtons = document.querySelectorAll('.btn-print');
    
    printButtons.forEach(button => {
        button.addEventListener('click', function() {
            window.print();
        });
    });
}

// Initialize print functionality
initPrintStyles();

/**
 * Performance optimization - Lazy load images
 */
function initLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
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
    
    images.forEach(img => imageObserver.observe(img));
}

// Initialize lazy loading
initLazyLoading();

/**
 * Initialize countdown timer
 */
function initCountdownTimer() {
    // Set the target date for countdown (Jan 22, 2026)
    const targetDate = new Date('2026-01-22T23:59:59').getTime();
    const daysEl = document.getElementById('days');
    const hoursEl = document.getElementById('hours');
    const minutesEl = document.getElementById('minutes');
    const secondsEl = document.getElementById('seconds');

    function updateCountdown() {
        const now = new Date().getTime();
        const timeLeft = targetDate - now;

        if (timeLeft > 0) {
            const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
            const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

            if (daysEl && hoursEl && minutesEl && secondsEl) {
                daysEl.textContent = days.toString().padStart(2, '0');
                hoursEl.textContent = hours.toString().padStart(2, '0');
                minutesEl.textContent = minutes.toString().padStart(2, '0');
                secondsEl.textContent = seconds.toString().padStart(2, '0');
            }
        } else {
            if (daysEl && hoursEl && minutesEl && secondsEl) {
                daysEl.textContent = '00';
                hoursEl.textContent = '00';
                minutesEl.textContent = '00';
                secondsEl.textContent = '00';
            }
        }
    }

    updateCountdown();
    setInterval(updateCountdown, 1000);
}



// Add error handling for failed resource loads
window.addEventListener('error', function(e) {
    console.warn('Resource failed to load:', e.target.src || e.target.href);
}, true);

// Service Worker registration for offline functionality (optional)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        // Uncomment to register service worker
        // navigator.serviceWorker.register('/sw.js')
        //     .then(function(registration) {
        //         console.log('SW registered: ', registration);
        //     })
        //     .catch(function(registrationError) {
        //         console.log('SW registration failed: ', registrationError);
        //     });
    });
}
