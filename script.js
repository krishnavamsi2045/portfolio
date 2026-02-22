// ================= LOADING TERMINAL TYPING (HACKER STYLE) =================
document.addEventListener("DOMContentLoaded", () => {

    const loader = document.getElementById("loading");
    const typedText = document.getElementById("typed-text");

    const command = "cd ~/vamsis-portfolio && access_granted";
    let i = 0;

    function typeTerminal() {
        if (i < command.length) {
            typedText.textContent += command.charAt(i);
            i++;
            setTimeout(typeTerminal, 40); // typing speed
        } else {
            // Hide loader smoothly
            setTimeout(() => {
                loader.style.opacity = "0";
                loader.style.transition = "opacity 0.6s ease";
                setTimeout(() => {
                    loader.style.display = "none";
                    startAnimations();
                }, 600);
            }, 800);
        }
    }

    typeTerminal();

    // ================= MAIN ANIMATIONS =================
    function startAnimations() {

        // HERO TEXT ANIMATION
        const heroTitle = document.querySelector(".hero-title");
        const heroSubtitle = document.querySelector(".hero-subtitle");
        const buttons = document.querySelector(".cta-buttons");

        heroTitle.style.opacity = "0";
        heroTitle.style.transform = "translateY(40px)";

        heroSubtitle.style.opacity = "0";
        heroSubtitle.style.transform = "translateY(40px)";

        buttons.style.opacity = "0";
        buttons.style.transform = "translateY(40px)";

        setTimeout(() => {
            heroTitle.style.transition = "all 1s ease";
            heroTitle.style.opacity = "1";
            heroTitle.style.transform = "translateY(0)";
        }, 200);

        setTimeout(() => {
            heroSubtitle.style.transition = "all 1s ease";
            heroSubtitle.style.opacity = "1";
            heroSubtitle.style.transform = "translateY(0)";
        }, 600);

        setTimeout(() => {
            buttons.style.transition = "all 1s ease";
            buttons.style.opacity = "1";
            buttons.style.transform = "translateY(0)";
        }, 1000);


        // ================= SCROLL FADE-IN ANIMATION =================
        const sections = document.querySelectorAll(".section, .skill-card, .project-card");

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = "1";
                    entry.target.style.transform = "translateY(0)";
                }
            });
        }, {
            threshold: 0.2
        });

        sections.forEach(sec => {
            sec.style.opacity = "0";
            sec.style.transform = "translateY(50px)";
            sec.style.transition = "all 0.8s ease";
            observer.observe(sec);
        });


        // ================= NAVBAR SCROLL EFFECT =================
        const navbar = document.querySelector(".navbar");

        window.addEventListener("scroll", () => {
            if (window.scrollY > 50) {
                navbar.style.background = "rgba(2,6,23,0.95)";
                navbar.style.boxShadow = "0 0 20px rgba(14,165,233,0.2)";
            } else {
                navbar.style.background = "rgba(2,6,23,0.7)";
                navbar.style.boxShadow = "none";
            }
        });


        // ================= SMOOTH SCROLL =================
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener("click", function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute("href"));
                if (target) {
                    target.scrollIntoView({
                        behavior: "smooth"
                    });
                }
            });
        });


        // ================= SKILL CARD GLOW (HACKER EFFECT) =================
        const cards = document.querySelectorAll(".skill-card");

        cards.forEach(card => {
            card.addEventListener("mouseenter", () => {
                card.style.boxShadow = "0 0 30px rgba(56,189,248,0.6)";
                card.style.transform = "translateY(-12px) scale(1.02)";
            });

            card.addEventListener("mouseleave", () => {
                card.style.boxShadow = "0 0 10px rgba(56,189,248,0.2)";
                card.style.transform = "translateY(0) scale(1)";
            });
        });

    }

});
