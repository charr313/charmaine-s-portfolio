document.addEventListener('DOMContentLoaded', () => { // wait for the page to load before running this script
    const canvas = document.getElementById('blob-canvas'); // grab the canvas from the html
    const ctx = canvas.getContext('2d'); // get the 2d drawing context for the canvas

    // function to make the canvas as big as the window
    const setCanvasSize = () => {
        canvas.width = window.innerWidth; // set width to match window
        canvas.height = window.innerHeight; // set height to match window
    };
    setCanvasSize(); // call it once to set size on page load
    window.addEventListener('resize', setCanvasSize); // update canvas size when window resizes

    let blob = { // set blob properties
        x: canvas.width / 2, // start in the center of the screen (x-axis)
        y: canvas.height / 2, // start in the center of the screen (y-axis)
        radius: 200, // size of the blob, can change if uw
        targetX: canvas.width / 2, // where it wants to go (starts centered)
        targetY: canvas.height / 2 // same as above, but for y-axis
    };

    // make the blob follow the cursor
    document.addEventListener('mousemove', (e) => { // listen for mouse movement and set e to the position of the mouse
        blob.targetX = e.clientX; // update target x to mouse x
        blob.targetY = e.clientY; // update target y to mouse y
    });

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height); // wipe canvas clean every frame

        // smooth movement by moving 10% towards target each frame
        blob.x += (blob.targetX - blob.x) * 0.075;
        blob.y += (blob.targetY - blob.y) * 0.075;

        // create a gradient so the blob looks fancy
        const gradient = ctx.createRadialGradient(
            blob.x, blob.y, 0, // start of gradient (center)
            blob.x, blob.y, blob.radius // end of gradient (edge of blob)
        );
        gradient.addColorStop(0, 'rgba(255, 0, 255, 0.27)'); // inner color
        gradient.addColorStop(1, 'rgba(155, 107, 155, 0)'); // outer color

        // draw the blob (a big circle with the gradient fill)
        ctx.beginPath();
        ctx.fillStyle = gradient; // use the gradient for fill
        ctx.arc(blob.x, blob.y, blob.radius, 0, Math.PI * 2); // draw circle
        ctx.fill();

        requestAnimationFrame(animate); // loop the animation forever
    }

    animate(); // start the animation

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
