document.addEventListener("DOMContentLoaded", () => {

const loader = document.getElementById("loading");

loader.innerHTML = `
<div class="terminal-text">
<span>bash$ cd ~/vamsi-portfolio</span>
<span class="terminal-cursor"></span>
</div>
`;

setTimeout(() => {
    loader.style.opacity = "0";
    setTimeout(() => loader.style.display = "none", 500);
}, 2000);

// GSAP Animations (SAFE)
const heroTitle = document.getElementById("hero-title");
const heroSubtitle = document.getElementById("hero-subtitle");

gsap.to(heroTitle, {opacity:1, y:0, duration:1});
gsap.to(heroSubtitle, {opacity:1, y:0, duration:1, delay:0.5});

// Particles Background
particlesJS("particles-js", {
particles: {
number: { value: 60 },
color: { value: "#00ff9c" },
size: { value: 3 },
move: { speed: 2 }
}
});

});
