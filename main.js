document.addEventListener('DOMContentLoaded', function() {
    // Navbar color change on scroll
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('nav a');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            window.scrollTo({
                top: targetElement.offsetTop - 50,
                behavior: 'smooth'
            });
        });
    });

    // Modal functionality for country details
    const countryCards = document.querySelectorAll('.countries-section .card');
    const modal = document.querySelector('.modal');
    const modalContent = document.querySelector('.modal-content');
    const closeModal = document.querySelector('.close-modal');

    countryCards.forEach(card => {
        card.addEventListener('click', function() {
            const countryDetails = this.querySelector('.country-details').innerHTML;
            modalContent.innerHTML = countryDetails;
            modal.style.display = 'block';
        });
    });

    closeModal.addEventListener('click', function() {
        modal.style.display = 'none';
    });

    window.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });

    // Form validation and submission
    const form = document.querySelector('#contactForm');
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const phone = document.getElementById('phone').value.trim();
        const destination = document.getElementById('destination').value.trim();
        const message = document.getElementById('message').value.trim();

        if (name === '' || email === '' || phone === '' || destination === '' || message === '') {
            alert('Please fill in all fields.');
        } else {
            // Send email using EmailJS
            emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, {
                name: name,
                email: email,
                phone: phone,
                destination: destination,
                message: message
            }).then(function(response) {
                alert('Thank you for your inquiry! We will get back to you soon.');
                form.reset();
            }, function(error) {
                alert('Failed to send your inquiry. Please try again later.');
            });
        }
    });
});