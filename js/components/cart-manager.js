import { formatPrice } from '../utils/helpers.js';

export class CartManager {
    constructor() {
        this.cart = this.loadCart();
        this.init();
    }

    init() {
        this.updateCartDisplay();
        this.bindEvents();
    }

    bindEvents() {
        // Add to cart buttons
        document.addEventListener('click', (e) => {
            if (e.target.matches('[data-add-to-cart]')) {
                const productElement = e.target.closest('[data-product]');
                if (productElement) {
                    this.addToCart({
                        id: productElement.dataset.productId,
                        name: productElement.dataset.productName,
                        price: parseFloat(productElement.dataset.productPrice),
                        image: productElement.dataset.productImage,
                        personalization: productElement.dataset.productPersonalization || ''
                    });
                }
            }
        });
    }

    addToCart(product) {
        const existingItem = this.cart.find(item => item.id === product.id && item.personalization === product.personalization);
        
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            this.cart.push({
                ...product,
                quantity: 1
            });
        }

        this.saveCart();
        this.updateCartDisplay();
        this.showAddToCartAnimation();
    }

    removeFromCart(productId, personalization = '') {
        this.cart = this.cart.filter(item => 
            !(item.id === productId && item.personalization === personalization)
        );
        this.saveCart();
        this.updateCartDisplay();
    }

    updateQuantity(productId, personalization, newQuantity) {
        const item = this.cart.find(item => 
            item.id === productId && item.personalization === personalization
        );
        
        if (item) {
            if (newQuantity <= 0) {
                this.removeFromCart(productId, personalization);
            } else {
                item.quantity = newQuantity;
                this.saveCart();
                this.updateCartDisplay();
            }
        }
    }

    getTotal() {
        return this.cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    }

    getItemCount() {
        return this.cart.reduce((count, item) => count + item.quantity, 0);
    }

    updateCartDisplay() {
        const cartCount = document.querySelector('[data-cart-count]');
        const cartTotal = document.querySelector('[data-cart-total]');
        
        if (cartCount) {
            cartCount.textContent = this.getItemCount();
            cartCount.style.display = this.getItemCount() > 0 ? 'flex' : 'none';
        }
        
        if (cartTotal) {
            cartTotal.textContent = formatPrice(this.getTotal());
        }
    }

    showAddToCartAnimation() {
        // Create and show animation
        const animation = document.createElement('div');
        animation.className = 'add-to-cart-animation';
        animation.textContent = 'Added to cart!';
        document.body.appendChild(animation);

        setTimeout(() => {
            document.body.removeChild(animation);
        }, 2000);
    }

    loadCart() {
        try {
            return JSON.parse(localStorage.getItem('splendid-cart')) || [];
        } catch {
            return [];
        }
    }

    saveCart() {
        localStorage.setItem('splendid-cart', JSON.stringify(this.cart));
    }

    clearCart() {
        this.cart = [];
        this.saveCart();
        this.updateCartDisplay();
    }
}