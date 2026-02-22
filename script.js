document.addEventListener("DOMContentLoaded", () => {

    const loader = document.getElementById("loading");

    // Create terminal structure
    loader.innerHTML = `
        <div class="terminal-text">
            <span class="prompt">bash$ </span>
            <span id="typed-text"></span>
            <span class="terminal-cursor"></span>
        </div>
    `;

    const typedText = document.getElementById("typed-text");

    // 👇 YOUR NAME HERE (will type like hacker)
    const command = "cd ~/vamsis-portfolio";
    let index = 0;

    // REAL TYPING EFFECT (character by character)
    function typeEffect() {
        if (index < command.length) {
            typedText.textContent += command.charAt(index);
            index++;
            setTimeout(typeEffect, 60); // typing speed (lower = faster)
        } else {
            // Hide loader after typing completes
            setTimeout(() => {
                loader.style.transition = "opacity 0.6s ease";
                loader.style.opacity = "0";

                setTimeout(() => {
                    loader.style.display = "none";
                }, 600);
            }, 1000);
        }
    }

    // Start typing
    typeEffect();

    // ===== HERO ANIMATION (SAFE & SMOOTH) =====
    const heroTitle = document.getElementById("hero-title");
    const heroSubtitle = document.getElementById("hero-subtitle");

    if (heroTitle && heroSubtitle) {
        heroTitle.style.opacity = "0";
        heroTitle.style.transform = "translateY(40px)";
        heroSubtitle.style.opacity = "0";
        heroSubtitle.style.transform = "translateY(40px)";

        setTimeout(() => {
            heroTitle.style.transition = "all 1s ease";
            heroTitle.style.opacity = "1";
            heroTitle.style.transform = "translateY(0)";
        }, 500);

        setTimeout(() => {
            heroSubtitle.style.transition = "all 1s ease";
            heroSubtitle.style.opacity = "1";
            heroSubtitle.style.transform = "translateY(0)";
        }, 900);
    }

    // ===== PARTICLES (ONLY IF EXISTS) =====
    if (document.getElementById("particles-js") && typeof particlesJS !== "undefined") {
        particlesJS("particles-js", {
            particles: {
                number: { value: 60 },
                color: { value: "#00ff9c" },
                size: { value: 3 },
                move: { speed: 2 }
            }
        });
    }

});
