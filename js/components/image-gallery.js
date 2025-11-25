export class ImageGallery {
    constructor(container, id) {
        this.container = container;
        this.id = id;
        this.currentFilter = 'all';
        this.init();
    }

    init() {
        this.bindEvents();
        this.filterImages('all');
    }

    bindEvents() {
        // Filter buttons
        this.container.querySelectorAll('[data-filter]').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const filter = e.target.dataset.filter;
                this.filterImages(filter);
                
                // Update active state
                this.container.querySelectorAll('[data-filter]').forEach(b => {
                    b.classList.remove('active');
                });
                e.target.classList.add('active');
            });
        });

        // Image click for lightbox
        this.container.querySelectorAll('.gallery-item').forEach(item => {
            item.addEventListener('click', (e) => {
                this.openLightbox(item);
            });
        });
    }

    filterImages(filter) {
        this.currentFilter = filter;
        const items = this.container.querySelectorAll('.gallery-item');
        
        items.forEach(item => {
            if (filter === 'all' || item.dataset.category === filter) {
                item.style.display = 'block';
                setTimeout(() => item.style.opacity = '1', 50);
            } else {
                item.style.opacity = '0';
                setTimeout(() => item.style.display = 'none', 300);
            }
        });
    }

    openLightbox(item) {
        // Create lightbox
        const lightbox = document.createElement('div');
        lightbox.className = 'lightbox';
        lightbox.innerHTML = `
            <div class="lightbox-content">
                <img src="${item.querySelector('img').src}" alt="${item.querySelector('img').alt}">
                <button class="lightbox-close">&times;</button>
                <div class="lightbox-caption">
                    ${item.querySelector('.gallery-overlay')?.innerHTML || ''}
                </div>
            </div>
        `;

        // Add to page
        document.body.appendChild(lightbox);

        // Close lightbox
        const closeBtn = lightbox.querySelector('.lightbox-close');
        closeBtn.addEventListener('click', () => {
            document.body.removeChild(lightbox);
        });

        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) {
                document.body.removeChild(lightbox);
            }
        });
    }
}