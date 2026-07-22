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

    // Initialize
    updateSlider();
});
