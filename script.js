// SAFE HACKER INTRO (NO BLACK SCREEN BUG)
const lines = [
    "Booting secure system...",
    "Initializing cybersecurity modules...",
    "Access Granted...",
    "Welcome Mandala Krishna Vamsi Portfolio"
];

const textElement = document.getElementById("terminal-text");
const intro = document.getElementById("intro");
const main = document.getElementById("main");

let lineIndex = 0;
let charIndex = 0;

function typeLine() {
    if (!textElement) {
        // If intro not found, show main directly (failsafe)
        showMain();
        return;
    }

    if (lineIndex < lines.length) {
        if (charIndex < lines[lineIndex].length) {
            textElement.textContent += lines[lineIndex].charAt(charIndex);
            charIndex++;
            setTimeout(typeLine, 40);
        } else {
            textElement.textContent += "\n";
            lineIndex++;
            charIndex = 0;
            setTimeout(typeLine, 600);
        }
    } else {
        setTimeout(showMain, 1200);
    }
}

function showMain() {
    if (intro) intro.style.display = "none";
    if (main) main.style.display = "block";
}

// MATRIX BACKGROUND (SAFE)
const canvas = document.getElementById("matrix");

if (canvas) {
    const ctx = canvas.getContext("2d");
    canvas.height = window.innerHeight;
    canvas.width = window.innerWidth;

    const letters = "01";
    const matrix = letters.split("");
    const fontSize = 14;
    const columns = canvas.width / fontSize;
    const drops = [];

    for (let x = 0; x < columns; x++) drops[x] = 1;

    function draw() {
        ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.fillStyle = "#00ffcc";
        ctx.font = fontSize + "px monospace";

        for (let i = 0; i < drops.length; i++) {
            const text = matrix[Math.floor(Math.random() * matrix.length)];
            ctx.fillText(text, i * fontSize, drops[i] * fontSize);

            if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                drops[i] = 0;
            }
            drops[i]++;
        }
    }

    setInterval(draw, 35);
}

// START AFTER PAGE LOAD
window.addEventListener("load", () => {
    if (main) main.style.display = "none";
    typeLine();

    // Failsafe: if anything breaks, show site after 5 sec
    setTimeout(showMain, 5000);
});
