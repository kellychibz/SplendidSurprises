import { formatPrice } from '../utils/helpers.js';

export class ProductCustomizer {
    constructor(container, id) {
        this.container = container;
        this.id = id;
        this.state = {
            material: 'walnut',
            size: 'medium',
            personalization: '',
            font: 'modern'
        };
        this.prices = {
            material: { walnut: 0, maple: 10, cherry: 15, acrylic: 20 },
            size: { small: 0, medium: 15, large: 30 },
            basePrice: 45
        };
        
        this.init();
    }

    init() {
        this.bindEvents();
        this.updatePreview();
        this.updatePrice();
    }

    bindEvents() {
        // Material selection
        this.container.querySelectorAll('[data-material]').forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.state.material = e.target.dataset.material;
                this.updatePreview();
                this.updatePrice();
            });
        });

        // Size selection
        this.container.querySelectorAll('[data-size]').forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.state.size = e.target.dataset.size;
                this.updatePreview();
                this.updatePrice();
            });
        });

        // Personalization input
        const personalizationInput = this.container.querySelector('[data-personalization]');
        if (personalizationInput) {
            personalizationInput.addEventListener('input', (e) => {
                this.state.personalization = e.target.value;
                this.updatePreview();
            });
        }

        // Font selection
        const fontSelect = this.container.querySelector('[data-font]');
        if (fontSelect) {
            fontSelect.addEventListener('change', (e) => {
                this.state.font = e.target.value;
                this.updatePreview();
            });
        }
    }

    updatePreview() {
        const preview = this.container.querySelector('[data-preview]');
        if (preview) {
            // Update preview with current state
            preview.style.fontFamily = this.getFontFamily(this.state.font);
            const textElement = preview.querySelector('[data-preview-text]');
            if (textElement) {
                textElement.textContent = this.state.personalization || 'Your Text Here';
            }
        }
    }

    updatePrice() {
        const priceElement = this.container.querySelector('[data-price]');
        if (priceElement) {
            const total = this.calculateTotal();
            priceElement.textContent = formatPrice(total);
        }
    }

    calculateTotal() {
        const materialPrice = this.prices.material[this.state.material] || 0;
        const sizePrice = this.prices.size[this.state.size] || 0;
        return this.prices.basePrice + materialPrice + sizePrice;
    }

    getFontFamily(font) {
        const fonts = {
            modern: '"Inter", sans-serif',
            classic: '"Playfair Display", serif',
            script: '"Brush Script MT", cursive'
        };
        return fonts[font] || fonts.modern;
    }

    getState() {
        return { ...this.state, total: this.calculateTotal() };
    }
}