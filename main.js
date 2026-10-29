/* =========================================================
   FRESHNEST FOODS - MAIN JAVASCRIPT
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =========================================================
       1. MOBILE NAVIGATION
       ========================================================= */

    const menuBtn = document.getElementById("menuBtn");
    const navigation = document.querySelector(".navigations");

    if (menuBtn && navigation) {
        menuBtn.addEventListener("click", () => {
            navigation.classList.toggle("active");

            const icon = menuBtn.querySelector("i");

            if (navigation.classList.contains("active")) {
                icon.classList.remove("fa-bars");
                icon.classList.add("fa-xmark");
            } else {
                icon.classList.remove("fa-xmark");
                icon.classList.add("fa-bars");
            }
        });

        // Close mobile menu when a link is clicked
        navigation.querySelectorAll("a").forEach(link => {
            link.addEventListener("click", () => {
                navigation.classList.remove("active");

                const icon = menuBtn.querySelector("i");

                icon.classList.remove("fa-xmark");
                icon.classList.add("fa-bars");
            });
        });
    }


    /* =========================================================
       2. STICKY HEADER EFFECT
       ========================================================= */

    const header = document.querySelector(".heading");

    function updateHeader() {
        if (!header) return;

        if (window.scrollY > 50) {
            header.classList.add("scrolled");
        } else {
            header.classList.remove("scrolled");
        }
    }

    window.addEventListener("scroll", updateHeader);

    updateHeader();


    /* =========================================================
       3. SMOOTH SCROLLING
       ========================================================= */

    document.querySelectorAll('a[href^="#"]').forEach(link => {

        link.addEventListener("click", function (event) {

            const targetId = this.getAttribute("href");

            if (!targetId || targetId === "#") return;

            const target = document.querySelector(targetId);

            if (!target) return;

            event.preventDefault();

            target.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

        });

    });


    /* =========================================================
       4. ACTIVE NAVIGATION LINK
       ========================================================= */

    const sections = document.querySelectorAll("section[id]");
    const navLinks = document.querySelectorAll(".nav-link");

    function updateActiveNavigation() {

        let currentSection = "";

        sections.forEach(section => {

            const sectionTop = section.offsetTop - 150;
            const sectionHeight = section.offsetHeight;

            if (
                window.scrollY >= sectionTop &&
                window.scrollY < sectionTop + sectionHeight
            ) {
                currentSection = section.getAttribute("id");
            }

        });

        navLinks.forEach(link => {

            link.classList.remove("active");

            const href = link.getAttribute("href");

            if (href === `#${currentSection}`) {
                link.classList.add("active");
            }

        });
    }

    window.addEventListener("scroll", updateActiveNavigation);

    updateActiveNavigation();


    /* =========================================================
       5. SCROLL REVEAL ANIMATION
       ========================================================= */

    const revealElements = document.querySelectorAll(
        ".menu-grid article, .why-us, .about, .popular article, .contact-card, .hours-card, .contact-cta"
    );

    revealElements.forEach(element => {
        element.classList.add("reveal");
    });

    const revealObserver = new IntersectionObserver(
        (entries, observer) => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.classList.add("visible");

                    observer.unobserve(entry.target);

                }

            });

        },
        {
            threshold: 0.15
        }
    );

    revealElements.forEach(element => {
        revealObserver.observe(element);
    });


    /* =========================================================
       6. BACK TO TOP BUTTON
       ========================================================= */

    const backToTop = document.createElement("button");

    backToTop.className = "back-to-top";
    backToTop.setAttribute("aria-label", "Back to top");
    backToTop.innerHTML = '<i class="fa-solid fa-arrow-up"></i>';

    document.body.appendChild(backToTop);

    window.addEventListener("scroll", () => {

        if (window.scrollY > 500) {
            backToTop.classList.add("show");
        } else {
            backToTop.classList.remove("show");
        }

    });

    backToTop.addEventListener("click", () => {

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    });


    /* =========================================================
       7. PLACE ORDER BUTTONS
       ========================================================= */

    const orderButtons = document.querySelectorAll(
        ".order, .hero-btn, .choice a, .special-link, .image-block article a"
    );

    orderButtons.forEach(button => {

        button.addEventListener("click", function (event) {

            const text = this.textContent.trim().toLowerCase();

            // Don't interfere with "View Menu"
            if (text.includes("view menu")) {
                return;
            }

            event.preventDefault();

            const whatsappNumber = "2348001234567";

            let productName = "FreshNest Foods";

            const card = this.closest("article");

            if (card) {

                const productTitle = card.querySelector("h3");

                if (productTitle) {
                    productName = productTitle.textContent.trim();
                }

            }

            const message = `Hello FreshNest Foods! I would like to place an order for ${productName}.`;

            const whatsappURL =
                `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;

            window.open(whatsappURL, "_blank");

        });

    });


    /* =========================================================
       8. DYNAMIC FOOTER YEAR
       ========================================================= */

    const currentYear = document.getElementById("current-year");

    if (currentYear) {
        currentYear.textContent = new Date().getFullYear();
    }


    /* =========================================================
       9. IMAGE LOADING EFFECT
       ========================================================= */

    const images = document.querySelectorAll("img");

    images.forEach(image => {

        image.addEventListener("load", () => {
            image.classList.add("loaded");
        });

    });


    /* =========================================================
       10. PREVENT BROKEN IMAGE LAYOUTS
       ========================================================= */

    images.forEach(image => {

        image.addEventListener("error", () => {

            image.style.opacity = "0.5";

            console.warn(
                `FreshNest image could not be loaded: ${image.src}`
            );

        });

    });

});