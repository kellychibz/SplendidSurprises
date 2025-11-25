// Main JavaScript file
import { ProductCustomizer } from './components/product-customizer.js';
import { ImageGallery } from './components/image-gallery.js';
import { CartManager } from './components/cart-manager.js';
import { initAnimations } from './utils/animations.js';

class SplendidSurprises {
    constructor() {
        this.init();
    }

    init() {
        // Initialize all components
        this.initHeader();
        this.initMobileMenu();
        this.initScrollEffects();
        this.initComponents();
        this.initAnimations();
        
        console.log('Splendid Surprises website initialized');
    }

    initHeader() {
        const header = document.getElementById('header');
        let lastScrollY = window.scrollY;

        window.addEventListener('scroll', () => {
            if (window.scrollY > 100) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }

            // Hide header on scroll down, show on scroll up
            if (window.scrollY > lastScrollY && window.scrollY > 200) {
                header.style.transform = 'translateY(-100%)';
            } else {
                header.style.transform = 'translateY(0)';
            }

            lastScrollY = window.scrollY;
        });
    }

    initMobileMenu() {
        const mobileMenuBtn = document.getElementById('mobileMenuBtn');
        const navLinks = document.getElementById('navLinks');

        if (mobileMenuBtn && navLinks) {
            mobileMenuBtn.addEventListener('click', () => {
                navLinks.classList.toggle('active');
                mobileMenuBtn.textContent = navLinks.classList.contains('active') ? '✕' : '☰';
            });

            // Close mobile menu when clicking on a link
            navLinks.querySelectorAll('a').forEach(link => {
                link.addEventListener('click', () => {
                    navLinks.classList.remove('active');
                    mobileMenuBtn.textContent = '☰';
                });
            });

            // Close mobile menu when clicking outside
            document.addEventListener('click', (e) => {
                if (!navLinks.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
                    navLinks.classList.remove('active');
                    mobileMenuBtn.textContent = '☰';
                }
            });
        }
    }

    initScrollEffects() {
        // Add intersection observer for fade-in animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('fade-in-visible');
                }
            });
        }, observerOptions);

        // Observe elements with fade-in class
        document.querySelectorAll('.fade-in').forEach(el => {
            observer.observe(el);
        });
    }

    initComponents() {
        // Initialize product customizers
        const customizers = document.querySelectorAll('[data-customizer]');
        customizers.forEach((container, index) => {
            new ProductCustomizer(container, `customizer-${index}`);
        });

        // Initialize image galleries
        const galleries = document.querySelectorAll('[data-gallery]');
        galleries.forEach((container, index) => {
            new ImageGallery(container, `gallery-${index}`);
        });

        // Initialize cart manager
        this.cartManager = new CartManager();
    }

    initAnimations() {
        initAnimations();
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new SplendidSurprises();
});

// Export for potential module usage
export default SplendidSurprises;