/**
 * Custom Slider & Filter functionality for Projects
 */

document.addEventListener('DOMContentLoaded', () => {
    const track = document.querySelector('.projects-track');
    const cards = document.querySelectorAll('.project-card');
    const nextBtn = document.querySelector('.next-btn');
    const prevBtn = document.querySelector('.prev-btn');
    const filterButtons = document.querySelectorAll('.filter-btn');
    
    if (!track) return;

    let currentIndex = 0;
    let visibleCards = Array.from(cards);

    function updateSlider() {
        // Hide all cards first
        cards.forEach(card => card.style.display = 'none');
        
        // Show only visible cards
        visibleCards.forEach(card => card.style.display = 'flex');

        // Translate track
        track.style.transform = `translateX(-${currentIndex * 100}%)`;

        // Update buttons state
        if (prevBtn) prevBtn.disabled = currentIndex === 0;
        if (nextBtn) nextBtn.disabled = currentIndex >= visibleCards.length - 1;
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            if (currentIndex < visibleCards.length - 1) {
                currentIndex++;
                updateSlider();
            }
        });
    }

    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            if (currentIndex > 0) {
                currentIndex--;
                updateSlider();
            }
        });
    }

    // Filter Logic
    filterButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            filterButtons.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            const filterValue = this.getAttribute('data-filter');
            
            if (filterValue === 'all') {
                visibleCards = Array.from(cards);
            } else {
                visibleCards = Array.from(cards).filter(card => card.classList.contains(filterValue));
            }
            
            // Reset to first slide of filtered results
            currentIndex = 0;
            updateSlider();
        });
    });

    // All Posters Gallery Modal
    const galleryModal = document.getElementById('gallery-modal');
    const viewAllBtn = document.getElementById('view-all-posters-btn');
    const closeGalleryBtn = document.getElementById('close-gallery-modal');

    if (galleryModal && viewAllBtn) {
        viewAllBtn.addEventListener('click', () => {
            galleryModal.classList.add('active');
            document.body.style.overflow = 'hidden';
        });

        const closeGallery = () => {
            galleryModal.classList.remove('active');
            if (!document.getElementById('creative-modal').classList.contains('active')) {
                document.body.style.overflow = '';
            }
        };

        if (closeGalleryBtn) closeGalleryBtn.addEventListener('click', closeGallery);

        galleryModal.addEventListener('click', (e) => {
            if (e.target === galleryModal) closeGallery();
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && galleryModal.classList.contains('active') && !document.getElementById('creative-modal').classList.contains('active')) {
                closeGallery();
            }
        });
    }

    // Creative Works Lightbox Modal with Zoom
    const creativeModal = document.getElementById('creative-modal');
    const closeCreativeModalBtn = document.getElementById('close-creative-modal');
    const viewCreativeBtns = document.querySelectorAll('.view-creative-btn');
    const modalImg = document.getElementById('modal-creative-img');
    const imgWrap = document.getElementById('lightbox-img-wrap');

    let currentZoom = 1;
    const minZoom = 0.5;
    const maxZoom = 4;

    function applyZoom() {
        if (modalImg) {
            modalImg.style.transform = `scale(${currentZoom})`;
            if (imgWrap) {
                imgWrap.style.cursor = currentZoom > 1 ? 'grab' : 'default';
            }
        }
    }

    function resetZoom() {
        currentZoom = 1;
        applyZoom();
    }

    if (creativeModal && modalImg) {
        // Zoom buttons
        const zoomInBtn = document.getElementById('zoom-in-btn');
        const zoomOutBtn = document.getElementById('zoom-out-btn');
        const zoomResetBtn = document.getElementById('zoom-reset-btn');

        if (zoomInBtn) zoomInBtn.addEventListener('click', () => { currentZoom = Math.min(maxZoom, currentZoom + 0.5); applyZoom(); });
        if (zoomOutBtn) zoomOutBtn.addEventListener('click', () => { currentZoom = Math.max(minZoom, currentZoom - 0.5); applyZoom(); });
        if (zoomResetBtn) zoomResetBtn.addEventListener('click', resetZoom);

        // Mousewheel zoom
        if (imgWrap) {
            imgWrap.addEventListener('wheel', (e) => {
                e.preventDefault();
                if (e.deltaY < 0) {
                    currentZoom = Math.min(maxZoom, currentZoom + 0.25);
                } else {
                    currentZoom = Math.max(minZoom, currentZoom - 0.25);
                }
                applyZoom();
            });

            // Drag to pan when zoomed
            let isDragging = false;
            let startX, startY, scrollLeft, scrollTop;

            imgWrap.addEventListener('mousedown', (e) => {
                if (currentZoom <= 1) return;
                isDragging = true;
                imgWrap.style.cursor = 'grabbing';
                startX = e.pageX - imgWrap.offsetLeft;
                startY = e.pageY - imgWrap.offsetTop;
                scrollLeft = imgWrap.scrollLeft;
                scrollTop = imgWrap.scrollTop;
            });

            imgWrap.addEventListener('mouseleave', () => { isDragging = false; if (currentZoom > 1) imgWrap.style.cursor = 'grab'; });
            imgWrap.addEventListener('mouseup', () => { isDragging = false; if (currentZoom > 1) imgWrap.style.cursor = 'grab'; });

            imgWrap.addEventListener('mousemove', (e) => {
                if (!isDragging) return;
                e.preventDefault();
                const x = e.pageX - imgWrap.offsetLeft;
                const y = e.pageY - imgWrap.offsetTop;
                const walkX = (x - startX) * 1.5;
                const walkY = (y - startY) * 1.5;
                imgWrap.scrollLeft = scrollLeft - walkX;
                imgWrap.scrollTop = scrollTop - walkY;
            });
        }

        viewCreativeBtns.forEach(btn => {
            btn.addEventListener('click', function(e) {
                e.preventDefault();
                const title = this.getAttribute('data-title');
                const tools = this.getAttribute('data-tools');
                const img = this.getAttribute('data-img');

                document.getElementById('modal-creative-title').textContent = title;
                modalImg.src = img;
                resetZoom();
                
                // Render tools
                const toolsContainer = document.getElementById('modal-creative-tools');
                if (toolsContainer) {
                    toolsContainer.innerHTML = '';
                    if (tools) {
                        tools.split(',').forEach(t => {
                            const span = document.createElement('span');
                            span.textContent = t.trim();
                            toolsContainer.appendChild(span);
                        });
                    }
                }

                creativeModal.classList.add('active');
                document.body.style.overflow = 'hidden';
            });
        });

        const closeCreativeModal = () => {
            creativeModal.classList.remove('active');
            resetZoom();
            if (!galleryModal || !galleryModal.classList.contains('active')) {
                document.body.style.overflow = '';
            }
        };

        if (closeCreativeModalBtn) {
            closeCreativeModalBtn.addEventListener('click', closeCreativeModal);
        }

        creativeModal.addEventListener('click', function(e) {
            if (e.target === creativeModal) {
                closeCreativeModal();
            }
        });

        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && creativeModal.classList.contains('active')) {
                closeCreativeModal();
            }
        });
    }

    // Initialize
    updateSlider();
});
