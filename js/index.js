document.addEventListener("DOMContentLoaded", () => {
    // Préchargeur
    const preloader = document.getElementById("preloader");
    window.addEventListener("load", () => {
        preloader.style.opacity = "0";
        setTimeout(() => {
            preloader.style.display = "none";
        }, 500);
    });

    // Particules (Particles.js)
    particlesJS("particles-js", {
        particles: {
            number: { value: 100, density: { enable: true, value_area: 800 } },
            color: { value: "#ff69b4" },
            shape: { type: "circle" },
            opacity: { value: 0.5, random: true },
            size: { value: 3, random: true },
            move: { enable: true, speed: 2, direction: "none", random: true },
            line_linked: { enable: false }
        },
        interactivity: {
            detect_on: "canvas",
            events: { onhover: { enable: true, mode: "repulse" }, onclick: { enable: true, mode: "push" } },
            modes: { repulse: { distance: 100, duration: 0.4 }, push: { particles_nb: 4 } }
        },
        retina_detect: true
    });

    // Animation au défilement
    const elements = document.querySelectorAll(".paragraphe");
    const scrollTopButton = document.querySelector(".scroll-top");

    const isInViewport = (element) => {
        const rect = element.getBoundingClientRect();
        return rect.top >= 0 && rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.8;
    };

    const handleScroll = () => {
        elements.forEach((element) => {
            if (isInViewport(element)) {
                element.classList.add("visible");
            } else {
                element.classList.remove("visible");
            }
        });

        if (window.scrollY > 300) {
            scrollTopButton.classList.add("visible");
        } else {
            scrollTopButton.classList.remove("visible");
        }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    // Toggle du menu Navbar (mobile)
    const toggleButton = document.querySelector(".navbar-toggle");
    const menu = document.querySelector(".navbar-menu");

    toggleButton.addEventListener("click", () => {
        menu.classList.toggle("active");
    });

    // Bouton "Retour en haut"
    scrollTopButton.addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    });

    // Lightbox pour les projets
    const projectItems = document.querySelectorAll(".project-item");
    const lightbox = document.querySelector(".lightbox");
    const lightboxImg = document.getElementById("lightbox-img");
    const closeLightbox = document.querySelector(".close-lightbox");

    projectItems.forEach((item) => {
        item.addEventListener("click", (e) => {
            e.preventDefault();
            const imgSrc = item.getAttribute("data-image");
            lightboxImg.src = imgSrc;
            lightbox.classList.add("active");
            document.body.style.overflow = "hidden";
            document.body.style.position = "fixed";
            document.body.style.width = "100%";
        });
    });

    closeLightbox.addEventListener("click", () => {
        lightbox.classList.remove("active");
        document.body.style.overflow = "auto";
        document.body.style.position = "";
        document.body.style.width = "";
    });

    lightbox.addEventListener("click", (e) => {
        if (e.target === lightbox) {
            lightbox.classList.remove("active");
            document.body.style.overflow = "auto";
            document.body.style.position = "";
            document.body.style.width = "";
        }
    });

    // Swipe pour navigation mobile
    let touchstartY = 0;
    let touchendY = 0;
    const sections = document.querySelectorAll("section");
    let currentSection = 0;

    document.addEventListener("touchstart", (e) => {
        touchstartY = e.changedTouches[0].screenY;
    });

    document.addEventListener("touchend", (e) => {
        touchendY = e.changedTouches[0].screenY;
        handleSwipe();
    });

    function handleSwipe() {
        if (touchendY < touchstartY - 50 && currentSection < sections.length - 1) {
            currentSection++;
            sections[currentSection].scrollIntoView({ behavior: "smooth" });
        } else if (touchendY > touchstartY + 50 && currentSection > 0) {
            currentSection--;
            sections[currentSection].scrollIntoView({ behavior: "smooth" });
        }
    }

    // Gestion du formulaire de contact
    const contactForm = document.querySelector(".contact-form");
    if (contactForm) {
        contactForm.addEventListener("submit", async (e) => {
            e.preventDefault(); // Empêche le rechargement de la page

            const formData = {
                name: contactForm.querySelector('input[name="name"]').value,
                email: contactForm.querySelector('input[name="email"]').value,
                message: contactForm.querySelector('textarea[name="message"]').value,
            };

            try {
                const response = await fetch('http://localhost:3001/send-email', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formData),
                });

                if (response.ok) {
                    alert('Email envoyé avec succès !');
                    contactForm.reset(); // Réinitialise le formulaire
                } else {
                    alert('Erreur lors de l\'envoi de l\'email.');
                }
            } catch (error) {
                console.error('Erreur:', error);
                alert('Une erreur est survenue.');
            }
        });
    }
});