// ===========================
// GLOBAL VARIABLES
// ===========================
let scrollTimeout;

// ===========================
// DOM CONTENT LOADED
// ===========================
document.addEventListener('DOMContentLoaded', () => {
  initPreloader();
  initNavigation();
  initScrollAnimations();
  initStatCounters();
  initSkillBars();
});

// ===========================
// PRELOADER
// ===========================
function initPreloader() {
  const preloader = document.getElementById('preloader');
  const mainContent = document.getElementById('main-content');
  const letters = document.querySelectorAll('.neon-text span');
  
  if (!preloader || !mainContent) return;
  
  // Animate letters
  letters.forEach((letter, index) => {
    setTimeout(() => {
      letter.classList.add('active');
    }, index * 150);
  });
  
  // Hide preloader and show content
  setTimeout(() => {
    preloader.classList.add('hidden');
    setTimeout(() => {
      preloader.style.display = 'none';
      mainContent.classList.add('visible');
      document.body.style.overflow = 'auto';
    }, 1000);
  }, letters.length * 150 + 1000);
}

// ===========================
// NAVIGATION
// ===========================
function initNavigation() {
  const navbar = document.querySelector('.navbar');
  const menuToggle = document.getElementById('menu-toggle');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');
  
  if (!navbar) return;
  
  // Scroll effect on navbar
  let lastScroll = 0;
  window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    // Add scrolled class for shadow effect
    if (currentScroll > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
  });
  
  // Mobile menu toggle
  if (menuToggle && navMenu) {
    menuToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      menuToggle.classList.toggle('active');
      navMenu.classList.toggle('active');
      document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : 'auto';
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
      if (!navMenu.contains(e.target) && !menuToggle.contains(e.target)) {
        menuToggle.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.style.overflow = 'auto';
      }
    });
    
    // Close menu when clicking nav links
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        menuToggle.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.style.overflow = 'auto';
      });
    });
  }
  
  // Smooth scroll for anchor links
  navLinks.forEach(link => {
    if (link.getAttribute('href').startsWith('#')) {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
          const navbarHeight = navbar.offsetHeight;
          const targetPosition = targetSection.offsetTop - navbarHeight;
          
          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
          });
        }
      });
    }
  });
}

// ===========================
// SCROLL ANIMATIONS
// ===========================
function initScrollAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        
        // Animate skill bars when visible
        if (entry.target.classList.contains('skill-card')) {
          const progressBar = entry.target.querySelector('.skill-progress');
          if (progressBar) {
            const progress = progressBar.getAttribute('data-progress');
            progressBar.style.setProperty('--progress-width', `${progress}%`);
          }
        }
      }
    });
  }, observerOptions);
  
  // Observe fade-in elements
  const fadeElements = document.querySelectorAll('.fade-in');
  fadeElements.forEach(el => observer.observe(el));
  
  // Observe skill cards
  const skillCards = document.querySelectorAll('.skill-card');
  skillCards.forEach(card => observer.observe(card));
}

// ===========================
// STAT COUNTERS
// ===========================
function initStatCounters() {
  const statNumbers = document.querySelectorAll('.stat-number');
  
  if (statNumbers.length === 0) return;
  
  const observerOptions = {
    threshold: 0.5
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const target = entry.target;
        const finalValue = parseInt(target.getAttribute('data-count'));
        animateCounter(target, 0, finalValue, 2000);
        observer.unobserve(target);
      }
    });
  }, observerOptions);
  
  statNumbers.forEach(stat => observer.observe(stat));
}

function animateCounter(element, start, end, duration) {
  const startTime = performance.now();
  
  function update(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    
    // Easing function (ease-out)
    const easeOutQuart = 1 - Math.pow(1 - progress, 4);
    const current = Math.floor(start + (end - start) * easeOutQuart);
    
    element.textContent = current + (end > 10 ? '+' : '');
    
    if (progress < 1) {
      requestAnimationFrame(update);
    } else {
      element.textContent = end + (end > 10 ? '+' : '');
    }
  }
  
  requestAnimationFrame(update);
}

// ===========================
// SKILL BARS ANIMATION
// ===========================
function initSkillBars() {
  const skillCards = document.querySelectorAll('.skill-card');
  
  if (skillCards.length === 0) return;
  
  skillCards.forEach(card => {
    const progressBar = card.querySelector('.skill-progress');
    if (progressBar) {
      const progress = progressBar.getAttribute('data-progress');
      progressBar.style.width = '0%';
      
      // Set CSS custom property for animation
      card.style.setProperty('--progress-width', `${progress}%`);
    }
  });
}

// ===========================
// SMOOTH SCROLL BEHAVIOR
// ===========================
function smoothScroll() {
  const links = document.querySelectorAll('a[href^="#"]');
  
  links.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        const navbar = document.querySelector('.navbar');
        const navbarHeight = navbar ? navbar.offsetHeight : 0;
        const targetPosition = targetElement.offsetTop - navbarHeight;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
}

// ===========================
// MOUSE PARALLAX EFFECT (Optional)
// ===========================
function initParallax() {
  const heroImage = document.querySelector('.hero-image');
  
  if (!heroImage) return;
  
  document.addEventListener('mousemove', (e) => {
    const mouseX = e.clientX / window.innerWidth;
    const mouseY = e.clientY / window.innerHeight;
    
    const moveX = (mouseX - 0.5) * 20;
    const moveY = (mouseY - 0.5) * 20;
    
    heroImage.style.transform = `translate(${moveX}px, ${moveY}px)`;
  });
}

// ===========================
// PAGE TRANSITION (Optional)
// ===========================
function initPageTransitions() {
  const links = document.querySelectorAll('a:not([href^="#"]):not([target="_blank"])');
  
  links.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const href = this.getAttribute('href');
      
      document.body.style.opacity = '0';
      document.body.style.transition = 'opacity 0.5s ease';
      
      setTimeout(() => {
        window.location.href = href;
      }, 500);
    });
  });
}

// ===========================
// UTILITY FUNCTIONS
// ===========================

// Throttle function for scroll events
function throttle(func, wait) {
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

// Debounce function for resize events
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

// Check if element is in viewport
function isInViewport(element) {
  const rect = element.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}

// ===========================
// PERFORMANCE OPTIMIZATIONS
// ===========================

// Lazy load images
function initLazyLoading() {
  const images = document.querySelectorAll('img[data-src]');
  
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.removeAttribute('data-src');
        observer.unobserve(img);
      }
    });
  });
  
  images.forEach(img => imageObserver.observe(img));
}

// ===========================
// ACCESSIBILITY
// ===========================

// Handle keyboard navigation
document.addEventListener('keydown', (e) => {
  // Close mobile menu on Escape
  if (e.key === 'Escape') {
    const menuToggle = document.getElementById('menu-toggle');
    const navMenu = document.getElementById('nav-menu');
    
    if (menuToggle && navMenu && navMenu.classList.contains('active')) {
      menuToggle.classList.remove('active');
      navMenu.classList.remove('active');
      document.body.style.overflow = 'auto';
    }
  }
});

// Focus trap for mobile menu
function trapFocus(element) {
  const focusableElements = element.querySelectorAll(
    'a[href], button, textarea, input, select, [tabindex]:not([tabindex="-1"])'
  );
  
  const firstFocusable = focusableElements[0];
  const lastFocusable = focusableElements[focusableElements.length - 1];
  
  element.addEventListener('keydown', (e) => {
    if (e.key !== 'Tab') return;
    
    if (e.shiftKey) {
      if (document.activeElement === firstFocusable) {
        lastFocusable.focus();
        e.preventDefault();
      }
    } else {
      if (document.activeElement === lastFocusable) {
        firstFocusable.focus();
        e.preventDefault();
      }
    }
  });
}

// ===========================
// BROWSER COMPATIBILITY
// ===========================

// Check for reduced motion preference
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (prefersReducedMotion) {
  // Disable animations
  document.documentElement.style.setProperty('--transition-fast', '0s');
  document.documentElement.style.setProperty('--transition-normal', '0s');
  document.documentElement.style.setProperty('--transition-slow', '0s');
}

// ===========================
// CONSOLE MESSAGE
// ===========================
console.log('%c🚀 Relize Portfolio', 'font-size: 20px; font-weight: bold; color: #ff0077;');
console.log('%cBuilt with ❤️ by Relize', 'font-size: 14px; color: #ff4e7f;');
console.log('%cInterested in working together? Let\'s connect!', 'font-size: 12px; color: #a0a0a0;');
