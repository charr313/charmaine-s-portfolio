document.addEventListener('DOMContentLoaded', () => { // wait for the page to load before running this script

    // make smooth scrolling for nav links
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault(); // stop default jumpy scroll behavior
            const targetId = link.getAttribute('href'); // get target section id
            const targetSection = document.querySelector(targetId); // find the section
            window.scrollTo({
                top: targetSection.offsetTop - 40, // scroll to it (minus 40px for spacing)
                behavior: 'smooth' // smooth scrolling effect
            });
        });
    });

    const sections = document.querySelectorAll('.section'); // get all sections
    const navLinks = document.querySelectorAll('.nav-link'); // get all nav links

    const observerOptions = {
        root: null, // observe the whole viewport
        rootMargin: '-50% 0px', // trigger when section is 50% in view
        threshold: 0 // as soon as it enters, trigger
    };

    // function to update active link based on section in view
    const observerCallback = (entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) { // check if section is in view
                navLinks.forEach(link => link.classList.remove('active')); // remove active from all
                
                const activeId = entry.target.getAttribute('id'); // get id of the section
                const activeLink = document.querySelector(`.nav-link[href="#${activeId}"]`); // find matching nav link
                if (activeLink) {
                    activeLink.classList.add('active'); // add active class to correct link
                }
            }
        });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions); // create observer
    sections.forEach(section => observer.observe(section)); // observe all sections
});

const carousel = document.querySelector('.carousel');
const images = document.querySelectorAll('.carousel-item');
const prev = document.querySelector('.prev');
const next = document.querySelector('.next');
const dotsContainer = document.querySelector('.dots');
const paginationArrows = document.querySelector('.pagination-arrows');

let index = 0;
let isAnimating = false;
const totalImages = images.length;
let autoSlideTimeout;

let startX = 0;
let currentX = 0;
let isDragging = false;

// Prevent pagination arrows from interfering with touch events
paginationArrows.addEventListener('touchstart', (e) => e.stopPropagation());
paginationArrows.addEventListener('touchmove', (e) => e.stopPropagation());
paginationArrows.addEventListener('touchend', (e) => e.stopPropagation());

// Create dots
const dots = Array.from({ length: totalImages }, (_, i) => {
    const dot = document.createElement('span');
    dot.classList.add('dot');
    dot.dataset.index = i;
    dot.addEventListener('click', () => {
        moveTo(i);
        resetAutoSlide();
    });
    dotsContainer.appendChild(dot);
    return dot;
});

function updateCarousel() {
    const imageWidth = images[0].clientWidth;
    carousel.style.transition = 'transform 0.3s ease-in-out';
    carousel.style.transform = translateX(-${index * imageWidth}px);
    updateDots();
}

function moveTo(i) {
    if (isAnimating) return;
    index = i;
    updateCarousel();
}

function updateDots() {
    dots.forEach(dot => dot.classList.remove('active'));
    dots[index].classList.add('active');
}

prev.addEventListener('click', () => {
    if (isAnimating) return;
    isAnimating = true;
    index = (index - 1 + totalImages) % totalImages;
    updateCarousel();
    resetAutoSlide();
});

next.addEventListener('click', () => {
    if (isAnimating) return;
    isAnimating = true;
    index = (index + 1) % totalImages;
    updateCarousel();
    resetAutoSlide();
});

// Reset isAnimating after animation
carousel.addEventListener('transitionend', () => {
    isAnimating = false;
});

// Auto slide function
function autoSlide() {
    autoSlideTimeout = setTimeout(() => {
        next.click();
    }, 5000);
}

function resetAutoSlide() {
    clearTimeout(autoSlideTimeout);
    autoSlide();
}

// Initialize dots and start auto-slide
updateDots();
autoSlide();