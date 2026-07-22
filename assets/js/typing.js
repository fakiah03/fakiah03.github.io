/**
 * Typed.js configuration for Hero Section
 */

document.addEventListener('DOMContentLoaded', () => {
    const typedTextElement = document.querySelector('.typed-text');
    
    if (typedTextElement) {
        new Typed('.typed-text', {
            strings: [
                'Software Developer',
                'Full Stack Developer',
                'PHP Developer',
                'Laravel Developer',
                'Problem Solver'
            ],
            typeSpeed: 60,
            backSpeed: 40,
            backDelay: 1500,
            loop: true,
            showCursor: false // Custom cursor is handled in CSS/HTML
        });
    }
});
