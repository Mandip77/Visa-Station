document.addEventListener("DOMContentLoaded", function () {
    // Navbar color change on scroll
    window.addEventListener("scroll", function () {
        const navbar = document.querySelector(".navbar");
        if (window.scrollY > 50) {
            navbar.classList.add("scrolled");
        } else {
            navbar.classList.remove("scrolled");
        }
    });

    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll("nav a");
    navLinks.forEach((link) => {
        link.addEventListener("click", function (e) {
            e.preventDefault();
            const targetId = this.getAttribute("href").substring(1);
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 50,
                    behavior: "smooth",
                });
            }
        });
    });

    // Modal functionality for country details
    const countryCards = document.querySelectorAll(".countries-section .card");
    countryCards.forEach((card) => {
        card.addEventListener("click", function () {
            const modalId = this.querySelector("button").getAttribute("data-bs-target");
            const modal = document.querySelector(modalId);
            if (modal) {
                const modalInstance = new bootstrap.Modal(modal);
                modalInstance.show();
            }
        });
    });

    // Ensure config.js is loaded before initializing EmailJS
    if (typeof EMAILJS_USER_ID !== "undefined") {
        emailjs.init(EMAILJS_USER_ID);
    } else {
        console.error("EmailJS User ID is not defined. Check your config.js file.");
    }

    // Form validation and submission
    const form = document.querySelector("#contactForm");
    form.addEventListener("submit", function (e) {
        e.preventDefault();

        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const phone = document.getElementById("phone").value.trim();
        const destination = document.getElementById("destination").value.trim();
        const message = document.getElementById("message").value.trim();

        if (name === "" || email === "" || phone === "" || destination === "" || message === "") {
            alert("Please fill in all fields.");
            return;
        }

        const templateParams = {
            from_name: name,
            from_email: email,
            phone: phone,
            destination: destination,
            message: message,
        };

        if (typeof EMAILJS_SERVICE_ID !== "undefined" && typeof EMAILJS_TEMPLATE_ID !== "undefined") {
            emailjs
                .send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, templateParams)
                .then(function (response) {
                    alert("Thank you for your inquiry! We will get back to you soon.");
                    form.reset();
                })
                .catch(function (error) {
                    alert("Failed to send your inquiry. Please try again later.");
                    console.error("EmailJS Error:", error);
                });
        } else {
            console.error("EmailJS Service ID or Template ID is missing. Check your config.js file.");
        }
    });
});
