document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initNavigation();
    initAnimations();
    initStatCounter();
    initFAQToggle();
    initContactForm();
    initSmoothScroll();
});

// Mobile Navigation Toggle
function initNavigation() {
    // Create hamburger menu for mobile if it doesn't exist
    if (!document.querySelector('.mobile-toggle')) {
        const nav = document.querySelector('nav');
        const mobileToggle = document.createElement('div');
        mobileToggle.className = 'mobile-toggle';
        mobileToggle.innerHTML = '<span></span><span></span><span></span>';
        nav.appendChild(mobileToggle);
        
        // Toggle mobile navigation
        mobileToggle.addEventListener('click', function() {
            const navMenu = document.querySelector('nav ul');
            navMenu.classList.toggle('active');
            this.classList.toggle('active');
        });
    }
    
    // Close mobile menu when clicking on a nav link
    const navLinks = document.querySelectorAll('nav ul li a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            const navMenu = document.querySelector('nav ul');
            const mobileToggle = document.querySelector('.mobile-toggle');
            if (navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                mobileToggle.classList.remove('active');
            }
        });
    });
}

// Animations for scrolling elements
function initAnimations() {
    // Detect elements that should be animated when they come into view
    const animatedElements = document.querySelectorAll('.features-grid, .services-grid, .courses-grid, .testimonial-grid, .news-grid, .about-content');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.2
    });
    
    animatedElements.forEach(element => {
        observer.observe(element);
    });
}

// Counter animation for statistics
function initStatCounter() {
    const statNumbers = document.querySelectorAll('.stat-number');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const countTo = parseInt(target.getAttribute('data-count'));
                let count = 0;
                const time = 2000;
                const step = time / countTo;
                
                const counter = setInterval(() => {
                    count += 1;
                    target.innerText = count;
                    
                    if (count >= countTo) {
                        clearInterval(counter);
                    }
                }, step);
                
                observer.unobserve(target);
            }
        });
    }, {
        threshold: 0.5
    });
    
    statNumbers.forEach(stat => {
        observer.observe(stat);
    });
}

// FAQ accordion functionality
function initFAQToggle() {
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    faqQuestions.forEach(question => {
        question.addEventListener('click', function() {
            // Toggle active class on the question
            this.classList.toggle('active');
            
            // Toggle the visibility of the answer
            const answer = this.nextElementSibling;
            if (answer.style.maxHeight) {
                answer.style.maxHeight = null;
            } else {
                answer.style.maxHeight = answer.scrollHeight + 'px';
            }
        });
    });
}

// Contact form validation and submission
function initContactForm() {
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(event) {
            event.preventDefault();
            
            // Get form values
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const subject = document.getElementById('subject').value.trim();
            const message = document.getElementById('message').value.trim();
            
            // Basic validation
            if (name === '' || email === '' || subject === '' || message === '') {
                showFormAlert('Please fill in all fields', 'error');
                return;
            }
            
            // Email validation
            if (!isValidEmail(email)) {
                showFormAlert('Please enter a valid email address', 'error');
                return;
            }
            
            // Simulate form submission (replace with actual form submission)
            const submitButton = contactForm.querySelector('.submit-btn');
            const originalText = submitButton.textContent;
            submitButton.textContent = 'Sending...';
            submitButton.disabled = true;
            
            // Simulate API call with timeout
            setTimeout(() => {
                // Reset form after successful submission
                contactForm.reset();
                submitButton.disabled = false;
                submitButton.textContent = originalText;
                showFormAlert('Message sent successfully! We\'ll get back to you soon.', 'success');
            }, 1500);
        });
    }
    
    // Function to validate email format
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    // Show form submission feedback
    function showFormAlert(message, type) {
        // Remove existing alert if any
        const existingAlert = document.querySelector('.form-alert');
        if (existingAlert) {
            existingAlert.remove();
        }
        
        // Create new alert
        const alert = document.createElement('div');
        alert.className = `form-alert ${type}`;
        alert.textContent = message;
        
        // Add alert to form
        contactForm.appendChild(alert);
        
        // Remove alert after 5 seconds
        setTimeout(() => {
            alert.classList.add('fade-out');
            setTimeout(() => {
                alert.remove();
            }, 500);
        }, 5000);
    }
}

// Smooth scrolling for anchor links
function initSmoothScroll() {
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // Calculate header height for offset
                const headerHeight = document.querySelector('nav').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Add a sticky navigation effect when scrolling
window.addEventListener('scroll', function() {
    const nav = document.querySelector('nav');
    if (window.scrollY > 100) {
        nav.classList.add('sticky');
    } else {
        nav.classList.remove('sticky');
    }
});

// Add hover effects for cards
function initCardHoverEffects() {
    const cards = document.querySelectorAll('.feature-card, .service-card, .course-card, .news-card, .testimonial-card');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.classList.add('hover');
        });
        
        card.addEventListener('mouseleave', function() {
            this.classList.remove('hover');
        });
    });
}
initCardHoverEffects();

// Testimonial carousel/slider (if you have multiple testimonials)
function initTestimonialSlider() {
    const testimonials = document.querySelectorAll('.testimonial-card');
    let currentSlide = 0;
    
    // Don't initialize if there are fewer than 2 testimonials
    if (testimonials.length < 2) return;
    
    // Create navigation dots
    const dotsContainer = document.createElement('div');
    dotsContainer.className = 'testimonial-dots';
    
    testimonials.forEach((_, index) => {
        const dot = document.createElement('span');
        dot.className = 'testimonial-dot';
        if (index === 0) dot.classList.add('active');
        
        dot.addEventListener('click', () => {
            goToSlide(index);
        });
        
        dotsContainer.appendChild(dot);
    });
    
    const testimonialsSection = document.querySelector('.testimonials');
    testimonialsSection.appendChild(dotsContainer);
    
    // Create prev/next buttons
    const prevButton = document.createElement('button');
    prevButton.className = 'testimonial-nav prev';
    prevButton.innerHTML = '&lt;';
    prevButton.addEventListener('click', () => {
        goToSlide(currentSlide - 1);
    });
    
    const nextButton = document.createElement('button');
    nextButton.className = 'testimonial-nav next';
    nextButton.innerHTML = '&gt;';
    nextButton.addEventListener('click', () => {
        goToSlide(currentSlide + 1);
    });
    
    testimonialsSection.appendChild(prevButton);
    testimonialsSection.appendChild(nextButton);
    
    // Show testimonial at specific index
    function goToSlide(index) {
        // Handle wrapping around
        if (index < 0) {
            index = testimonials.length - 1;
        } else if (index >= testimonials.length) {
            index = 0;
        }
        
        // Update current slide tracker
        currentSlide = index;
        
        // Update testimonial visibility
        testimonials.forEach((testimonial, i) => {
            testimonial.style.transform = `translateX(${100 * (i - index)}%)`;
        });
        
        // Update active dot
        const dots = document.querySelectorAll('.testimonial-dot');
        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === index);
        });
    }
    
    // Auto-advance slides
    const interval = setInterval(() => {
        goToSlide(currentSlide + 1);
    }, 5000);
    
    // Stop auto-advance on hover
    testimonialsSection.addEventListener('mouseenter', () => {
        clearInterval(interval);
    });
}
initTestimonialSlider();

// Theme toggler (light/dark mode) - Optional feature
function initThemeToggler() {
    // Check for saved theme preference or use device preference
    const savedTheme = localStorage.getItem('vortextech-theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    // Set initial theme
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
        document.body.classList.add('dark-theme');
    }
    
    // Create theme toggle button
    const themeToggle = document.createElement('button');
    themeToggle.className = 'theme-toggle';
    themeToggle.innerHTML = document.body.classList.contains('dark-theme') ? '☀️' : '🌙';
    
    // Add to navigation
    const nav = document.querySelector('nav');
    nav.appendChild(themeToggle);
    
    // Toggle theme on click
    themeToggle.addEventListener('click', function() {
        document.body.classList.toggle('dark-theme');
        
        // Update button icon
        this.innerHTML = document.body.classList.contains('dark-theme') ? '☀️' : '🌙';
        
        // Save preference
        localStorage.setItem('vortextech-theme', 
            document.body.classList.contains('dark-theme') ? 'dark' : 'light'
        );
    });
}
// Uncomment below line if you want to implement theme switching
// initThemeToggler();

// Get modal container and buttons
const modalContainer = document.getElementById('modal-container');
const signinBtn = document.getElementById('signin-btn');
const loginBtn = document.getElementById('login-btn');
const signinForm = document.getElementById('signin-form');
const loginForm = document.getElementById('login-form');

// Show modal container when sign in/log in button is clicked
signinBtn.addEventListener('click', () => {
  modalContainer.style.display = 'block';
  signinForm.style.display = 'block';
  loginForm.style.display = 'none';
});

loginBtn.addEventListener('click', () => {
  modalContainer.style.display = 'block';
  signinForm.style.display = 'none';
  loginForm.style.display = 'block';
});

// Hide modal container when clicked outside
modalContainer.addEventListener('click', (e) => {
  if (e.target === modalContainer) {
    modalContainer.style.display = 'none';
  }
});

// Get all FAQ questions
const faqQuestions = document.querySelectorAll('.faq-question');

// Add event listener to each FAQ question
faqQuestions.forEach((question) => {
  question.addEventListener('click', () => {
    // Toggle the answer
    question.nextElementSibling.classList.toggle('show');
  });
});

