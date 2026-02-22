// HACKER TYPING LOADER (NO ERRORS)
document.addEventListener("DOMContentLoaded", function () {

    const text = "cd ~/vamsis-portfolio && access granted";
    const typedText = document.getElementById("typed-text");
    const loader = document.getElementById("loading");

    let index = 0;

    function typeEffect() {
        if (index < text.length) {
            typedText.textContent += text.charAt(index);
            index++;
            setTimeout(typeEffect, 60);
        } else {
            setTimeout(() => {
                loader.style.opacity = "0";
                loader.style.transition = "opacity 0.8s ease";
                setTimeout(() => {
                    loader.style.display = "none";
                }, 800);
            }, 1200);
        }
    }

    // Start typing
    setTimeout(typeEffect, 500);
});
