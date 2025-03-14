document.addEventListener('DOMContentLoaded', () => {
    // Blob animation setup
    const canvas = document.getElementById('blob-canvas');
    const ctx = canvas.getContext('2d');

    // Set canvas size
    const setCanvasSize = () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    };
    setCanvasSize();
    window.addEventListener('resize', setCanvasSize);

    // Blob properties
    let blob = {
        x: canvas.width / 2,
        y: canvas.height / 2,
        radius: 200,
        color: '#9B6B9B', // Updated color
        targetX: canvas.width / 2,
        targetY: canvas.height / 2
    };

    // Update blob position based on mouse movement
    document.addEventListener('mousemove', (e) => {
        blob.targetX = e.clientX;
        blob.targetY = e.clientY;
    });

    // Animation function
    function animate() {
        // Clear canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Smooth movement
        blob.x += (blob.targetX - blob.x) * 0.1;
        blob.y += (blob.targetY - blob.y) * 0.1;

        // Draw dissolved blob
        const gradient = ctx.createRadialGradient(
            blob.x, blob.y, 0,
            blob.x, blob.y, blob.radius
        );
        // Update the gradient colors
        gradient.addColorStop(0, 'rgba(155, 107, 155, 0.36)');
        gradient.addColorStop(1, 'rgba(155, 107, 155, 0)');

        ctx.beginPath();
        ctx.fillStyle = gradient;
        ctx.arc(blob.x, blob.y, blob.radius, 0, Math.PI * 2);
        ctx.fill();

        requestAnimationFrame(animate);
    }

    // Start animation
    animate();

    // Smooth scrolling for navigation links
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            window.scrollTo({
                top: targetSection.offsetTop - 40,
                behavior: 'smooth'
            });
        });
    });

    // Intersection Observer for section highlighting
    const sections = document.querySelectorAll('.section');
    const navLinks = document.querySelectorAll('.nav-link');

    const observerOptions = {
        root: null,
        rootMargin: '-50% 0px',
        threshold: 0
    };

    const observerCallback = (entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Remove active class from all links
                navLinks.forEach(link => link.classList.remove('active'));
                
                // Add active class to corresponding link
                const activeId = entry.target.getAttribute('id');
                const activeLink = document.querySelector(`.nav-link[href="#${activeId}"]`);
                if (activeLink) {
                    activeLink.classList.add('active');
                }
            }
        });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    sections.forEach(section => observer.observe(section));
});