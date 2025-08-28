// Portfolio Website JavaScript
// Main functionality for navigation, animations, and interactions

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initMobileMenu();
    initSmoothScrolling();
    initScrollEffects();
    initSkillBarsAnimation();
    initBackToTopButton();
    initContactForm();
    initQualificationTabs();
    initTypingAnimation();
});

// Mobile Menu Functionality
function initMobileMenu() {
    const menuToggle = document.getElementById('menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (menuToggle && mobileMenu) {
        menuToggle.addEventListener('click', function() {
            mobileMenu.classList.toggle('hidden');
            
            // Toggle menu icon
            const icon = this.querySelector('i');
            if (mobileMenu.classList.contains('hidden')) {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            } else {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            }
        });
        
        // Close mobile menu when clicking on a link
        const mobileLinks = mobileMenu.querySelectorAll('a');
        mobileLinks.forEach(link => {
            link.addEventListener('click', function() {
                mobileMenu.classList.add('hidden');
                const icon = menuToggle.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            });
        });
    }
}

// Smooth Scrolling Navigation
function initSmoothScrolling() {
    // Handle all anchor links with smooth scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const headerOffset = 80; // Account for fixed navbar
                const elementPosition = targetElement.offsetTop;
                const offsetPosition = elementPosition - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                const mobileMenu = document.getElementById('mobile-menu');
                if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
                    mobileMenu.classList.add('hidden');
                    const menuToggle = document.getElementById('menu-toggle');
                    if (menuToggle) {
                        const icon = menuToggle.querySelector('i');
                        icon.classList.remove('fa-times');
                        icon.classList.add('fa-bars');
                    }
                }
                
                // Update active navigation link
                updateActiveNavLink(targetId);
            }
        });
    });
}

// Update Active Navigation Link
function updateActiveNavLink(targetId) {
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === targetId) {
            link.classList.add('active');
        }
    });
}

// Scroll Effects (Active Link Updates and Back to Top)
function initScrollEffects() {
    let ticking = false;
    
    function updateOnScroll() {
        const scrollPosition = window.scrollY;
        
        // Update active navigation link based on scroll position
        updateActiveNavOnScroll(scrollPosition);
        
        // Handle back to top button visibility
        updateBackToTopButton(scrollPosition);
        
        ticking = false;
    }
    
    window.addEventListener('scroll', function() {
        if (!ticking) {
            requestAnimationFrame(updateOnScroll);
            ticking = true;
        }
    });
}

// Update Active Navigation on Scroll
function updateActiveNavOnScroll(scrollPosition) {
    const sections = document.querySelectorAll('section[id]');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            document.querySelectorAll('.nav-link').forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

// Back to Top Button
function initBackToTopButton() {
    const backToTopButton = document.getElementById('back-to-top');
    
    if (backToTopButton) {
        backToTopButton.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
}

// Update Back to Top Button Visibility
function updateBackToTopButton(scrollPosition) {
    const backToTopButton = document.getElementById('back-to-top');
    
    if (backToTopButton) {
        if (scrollPosition > 300) {
            backToTopButton.classList.remove('hidden');
        } else {
            backToTopButton.classList.add('hidden');
        }
    }
}

// Skill Bars Animation
function initSkillBarsAnimation() {
    let hasAnimated = false;
    
    const animateSkillBars = function() {
        if (hasAnimated) return;
        
        const skillsSection = document.getElementById('skills');
        const skillBars = document.querySelectorAll('.skill-progress');
        
        if (!skillsSection || !skillBars.length) return;
        
        const skillsSectionTop = skillsSection.offsetTop;
        const windowHeight = window.innerHeight;
        const scrollPosition = window.scrollY;
        
        if (scrollPosition > skillsSectionTop - windowHeight + 200) {
            skillBars.forEach((bar, index) => {
                const targetWidth = bar.getAttribute('data-width') || bar.style.width;
                
                // Set initial width to 0
                bar.style.width = '0';
                
                // Animate to target width with delay
                setTimeout(() => {
                    bar.style.width = targetWidth;
                }, index * 200);
            });
            
            hasAnimated = true;
            // Remove the event listener after animation
            window.removeEventListener('scroll', animateSkillBars);
        }
    };
    
    // Store original widths as data attributes
    document.querySelectorAll('.skill-progress').forEach(bar => {
        const originalWidth = bar.style.width;
        bar.setAttribute('data-width', originalWidth);
    });
    
    window.addEventListener('scroll', animateSkillBars);
}

// Contact Form Handling
function initContactForm() {
    const contactForm = document.querySelector('#contact form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const name = formData.get('name') || document.getElementById('name')?.value;
            const email = formData.get('email') || document.getElementById('email')?.value;
            const subject = formData.get('subject') || document.getElementById('subject')?.value;
            const message = formData.get('message') || document.getElementById('message')?.value;
            
            // Basic validation
            if (!name || !email || !subject || !message) {
                showNotification('Please fill in all fields.', 'error');
                return;
            }
            
            if (!isValidEmail(email)) {
                showNotification('Please enter a valid email address.', 'error');
                return;
            }
            
            // Show loading state
            const submitButton = this.querySelector('button[type="submit"]');
            const originalText = submitButton.innerHTML;
            submitButton.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i>Sending...';
            submitButton.disabled = true;
            
            // Simulate form submission (replace with actual form handling)
            setTimeout(() => {
                showNotification('Thank you! Your message has been sent successfully.', 'success');
                this.reset();
                submitButton.innerHTML = originalText;
                submitButton.disabled = false;
            }, 2000);
        });
    }
}

// Email Validation
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Notification System
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-message">${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#3b82f6'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 0.5rem;
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
        z-index: 9999;
        max-width: 300px;
        animation: slideInRight 0.3s ease-out;
    `;
    
    // Add close functionality
    const closeButton = notification.querySelector('.notification-close');
    closeButton.addEventListener('click', () => {
        notification.style.animation = 'slideOutRight 0.3s ease-out';
        setTimeout(() => notification.remove(), 300);
    });
    
    // Add to document
    document.body.appendChild(notification);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.animation = 'slideOutRight 0.3s ease-out';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

// Intersection Observer for Animations
function initIntersectionObserver() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
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
    document.querySelectorAll('.card-hover, .timeline-item, .project-card').forEach(el => {
        observer.observe(el);
    });
}

// Keyboard Navigation Support
document.addEventListener('keydown', function(e) {
    // Escape key closes mobile menu
    if (e.key === 'Escape') {
        const mobileMenu = document.getElementById('mobile-menu');
        const menuToggle = document.getElementById('menu-toggle');
        
        if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
            mobileMenu.classList.add('hidden');
            if (menuToggle) {
                const icon = menuToggle.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        }
    }
});

// Add CSS animations for notifications
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
    
    .notification-content {
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 1rem;
    }
    
    .notification-close {
        background: none;
        border: none;
        color: white;
        font-size: 1.2rem;
        cursor: pointer;
        padding: 0;
        line-height: 1;
    }
    
    .notification-close:hover {
        opacity: 0.8;
    }
    
    /* Typing Animation Styles */
    .typing-text .cursor {
        display: inline-block;
        animation: blink 1s infinite;
        font-weight: normal;
        color: #0ea5e9;
    }
    
    @keyframes blink {
        0%, 50% {
            opacity: 1;
        }
        51%, 100% {
            opacity: 0;
        }
    }
    
    .typing-text {
        display: inline-block;
        min-height: 1.2em;
    }
`;
document.head.appendChild(style);

// Initialize Intersection Observer when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initIntersectionObserver);
} else {
    initIntersectionObserver();
}

// Qualification Tabs Functionality
function initQualificationTabs() {
    const educationTab = document.getElementById('education-tab');
    const awardsTab = document.getElementById('awards-tab');
    const educationContent = document.getElementById('education-content');
    const awardsContent = document.getElementById('awards-content');
    
    if (educationTab && awardsTab && educationContent && awardsContent) {
        // Education tab click handler
        educationTab.addEventListener('click', function() {
            // Update tab active state
            educationTab.classList.add('active');
            awardsTab.classList.remove('active');
            
            // Update content visibility
            educationContent.classList.remove('hidden');
            awardsContent.classList.add('hidden');
        });
        
        // Awards tab click handler
        awardsTab.addEventListener('click', function() {
            // Update tab active state
            awardsTab.classList.add('active');
            educationTab.classList.remove('active');
            
            // Update content visibility
            awardsContent.classList.remove('hidden');
            educationContent.classList.add('hidden');
        });
    }
}

// Dynamic Typing Animation
function initTypingAnimation() {
    const heroTitle = document.querySelector('#home h1');
    if (!heroTitle) return;
    
    // Store original text
    const originalText = "Hi, I'm ";
    const nameText = "Sushil Kumar";
    const fullText = originalText + nameText;
    
    // Clear the text first
    heroTitle.innerHTML = '';
    
    // Create spans for different parts
    const staticPart = document.createElement('span');
    staticPart.textContent = originalText;
    
    const dynamicPart = document.createElement('span');
    dynamicPart.className = 'gradient-text typing-text';
    dynamicPart.innerHTML = '<span class="cursor">|</span>';
    
    heroTitle.appendChild(staticPart);
    heroTitle.appendChild(dynamicPart);
    
    let charIndex = 0;
    const typingSpeed = 150;
    const pauseDuration = 2000;
    const deletingSpeed = 100;
    
    function typeText() {
        if (charIndex < nameText.length) {
            const currentText = nameText.substring(0, charIndex + 1);
            dynamicPart.innerHTML = currentText + '<span class="cursor">|</span>';
            charIndex++;
            setTimeout(typeText, typingSpeed);
        } else {
            // Pause, then start deleting
            setTimeout(deleteText, pauseDuration);
        }
    }
    
    function deleteText() {
        if (charIndex > 0) {
            charIndex--;
            const currentText = nameText.substring(0, charIndex);
            dynamicPart.innerHTML = currentText + '<span class="cursor">|</span>';
            setTimeout(deleteText, deletingSpeed);
        } else {
            // Pause, then start typing again
            setTimeout(typeText, 500);
        }
    }
    
    // Start the animation after a short delay
    setTimeout(typeText, 1000);
}

// Export functions for potential external use
window.PortfolioJS = {
    updateActiveNavLink,
    showNotification,
    isValidEmail
};
