document.addEventListener("DOMContentLoaded", () => {
    // Préchargeur
    const preloader = document.getElementById("preloader");

    window.addEventListener("load", () => {
        setTimeout(() => {
            preloader.style.opacity = "0";
            setTimeout(() => {
                preloader.style.display = "none";
            }, 500);
        }, 1000); // Attendre 1 seconde minimum
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

    // Gestion de la navbar active et du bouton "Retour en haut"
    const navLinks = document.querySelectorAll(".navbar-menu a");
    const sections = document.querySelectorAll("section");

    const handleScroll = () => {
        // Animation des paragraphes
        elements.forEach((element) => {
            if (isInViewport(element)) {
                element.classList.add("visible");
            } else {
                element.classList.remove("visible");
            }
        });

        // Afficher/masquer le bouton "Retour en haut"
        if (window.scrollY > 300) {
            scrollTopButton.classList.add("visible");
        } else {
            scrollTopButton.classList.remove("visible");
        }

        // Mettre à jour la navbar selon la section visible
        let current = "";
        sections.forEach((section) => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            if (window.scrollY >= sectionTop - 50 && window.scrollY < sectionTop + sectionHeight - 50) {
                current = section.getAttribute("id");
            }
        });

        navLinks.forEach((link) => {
            link.classList.remove("active");
            if (link.getAttribute("href").substring(1) === current) {
                link.classList.add("active");
            }
        });
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    // Toggle du menu Navbar (mobile) avec navigation
    const toggleButton = document.querySelector(".navbar-toggle");
    const menu = document.querySelector(".navbar-menu");

    if (!toggleButton || !menu) {
        console.error("Erreur : Vérifie les classes .navbar-toggle et .navbar-menu dans ton HTML.");
    } else {
        toggleButton.addEventListener("click", () => {
            menu.classList.toggle("active");
        });

        navLinks.forEach(link => {
            link.addEventListener("click", (e) => {
                e.preventDefault();
                const targetId = link.getAttribute("href").substring(1);
                const targetSection = document.getElementById(targetId);

                if (targetSection) {
                    targetSection.scrollIntoView({ behavior: "smooth" });
                }

                if (menu.classList.contains("active")) {
                    menu.classList.remove("active");
                }
            });
        });
    }

    // Bouton "Retour en haut" - Compatible toutes versions
    if (scrollTopButton) {
        scrollTopButton.addEventListener("click", (e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: "smooth" });
        });

        // Ajout d’un événement tactile pour mobile
        scrollTopButton.addEventListener("touchstart", (e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: "smooth" });
        });
    }

    // Sélection des éléments pour la lightbox
    const projectItems = document.querySelectorAll(".project-item");
    const lightbox = document.querySelector(".lightbox");
    const lightboxImg = document.getElementById("lightbox-img");
    const closeLightbox = document.querySelector(".close-lightbox");
    let scrollPosition = 0;

    projectItems.forEach((item) => {
        item.addEventListener("click", (e) => {
            e.preventDefault();
            scrollPosition = window.scrollY;
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
        window.scrollTo(0, scrollPosition);
    });

    lightbox.addEventListener("click", (e) => {
        if (e.target === lightbox) {
            lightbox.classList.remove("active");
            document.body.style.overflow = "auto";
            document.body.style.position = "";
            document.body.style.width = "";
            window.scrollTo(0, scrollPosition);
        }
    });
    // Swipe pour navigation mobile
    let touchstartY = 0;
    let touchendY = 0;
    let currentSection = 0;

    document.addEventListener("touchstart", (e) => {
        touchstartY = e.changedTouches[0].screenY;
    });

    if (sections.length === 0) return;

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
            e.preventDefault();
            const formData = {
                name: contactForm.querySelector('input[name="name"]').value,
                email: contactForm.querySelector('input[name="email"]').value,
                message: contactForm.querySelector('textarea[name="message"]').value,
            };

            try {
                const response = await fetch('https://my-portfolio-lc0s.onrender.com/send-email', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(formData),
                });

                const result = await response.json();
                if (response.ok) {
                    alert('Email envoyé avec succès !');
                    contactForm.reset(); // Réinitialise le formulaire
                } else {
                    alert(`Erreur : ${result.message || 'Échec de l\'envoi'}`);
                }
            } catch (error) {
                console.error('Erreur réseau :', error);
                alert('Une erreur réseau est survenue.');
            }
        });
    }
});
