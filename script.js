document.addEventListener('DOMContentLoaded', () => {
    // 1. Scroll Reveal Animations
    const reveals = document.querySelectorAll('.reveal');
    const revealOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target); // Only animate once
            }
        });
    }, revealOptions);

    reveals.forEach(reveal => {
        revealObserver.observe(reveal);
    });

    // 2. Number Counter Animations
    const counters = document.querySelectorAll('.counter-value');
    let counted = false;

    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !counted) {
                counted = true;
                counters.forEach(counter => {
                    const target = parseFloat(counter.getAttribute('data-target'));
                    const suffix = counter.getAttribute('data-suffix') || '';
                    const duration = 2000; // 2 seconds
                    const start = 0;
                    let startTime = null;

                    function animation(currentTime) {
                        if (startTime === null) startTime = currentTime;
                        const timeElapsed = currentTime - startTime;
                        const run = easeOutQuad(timeElapsed, start, target, duration);
                        
                        // Handle decimals
                        if (target % 1 !== 0) {
                            counter.innerText = run.toFixed(1) + suffix;
                        } else {
                            counter.innerText = Math.floor(run) + suffix;
                        }
                        
                        if (timeElapsed < duration) {
                            requestAnimationFrame(animation);
                        } else {
                            counter.innerText = target + suffix;
                        }
                    }
                    requestAnimationFrame(animation);
                });
            }
        });
    }, { threshold: 0.5 });

    if (counters.length > 0) {
        // Observe the parent container of the stats
        counterObserver.observe(document.querySelector('.hero-stats'));
    }

    // Easing function
    function easeOutQuad(t, b, c, d) {
        t /= d;
        return -c * t * (t - 2) + b;
    }

    // 3. Contact Form Simulation
    const contactForm = document.getElementById('contact-form-sim');
    const formSuccess = document.getElementById('form-success');
    
    if (contactForm && formSuccess) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Hide the actual form inputs
            const formInputs = contactForm.querySelectorAll('.form-row, .form-group, .btn');
            formInputs.forEach(el => el.style.display = 'none');
            
            // Show a spinner container inside the form
            const spinner = document.createElement('div');
            spinner.className = 'form-spinner';
            spinner.style.display = 'block';
            contactForm.appendChild(spinner);
            
            // Simulate network request
            setTimeout(() => {
                spinner.style.display = 'none';
                contactForm.style.display = 'none';
                formSuccess.style.display = 'block';
            }, 1500);
        });
    }

    // Mobile nav logic is already inline, but we can manage it here if needed in the future.
});
