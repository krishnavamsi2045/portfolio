// HACKER TERMINAL INTRO
const lines = [
    "Booting secure system...",
    "Connecting to encrypted server...",
    "Access granted...",
    "Loading Mandala Krishna Vamsi Portfolio..."
];

const textElement = document.getElementById("terminal-text");
const intro = document.getElementById("intro");
const main = document.getElementById("main");
const sound = document.getElementById("typeSound");

let lineIndex = 0;
let charIndex = 0;

function typeLine() {
    if (lineIndex < lines.length) {
        if (charIndex < lines[lineIndex].length) {
            textElement.textContent += lines[lineIndex].charAt(charIndex);
            charIndex++;
            sound.currentTime = 0;
            sound.play();
            setTimeout(typeLine, 35);
        } else {
            textElement.textContent += "\n";
            lineIndex++;
            charIndex = 0;
            setTimeout(typeLine, 500);
        }
    } else {
        setTimeout(() => {
            intro.style.display = "none";
            main.style.display = "block";
        }, 1000);
    }
}

window.onload = () => {
    main.style.display = "none";
    typeLine();
};

// MATRIX RAIN EFFECT
const canvas = document.getElementById("matrix");
const ctx = canvas.getContext("2d");

canvas.height = window.innerHeight;
canvas.width = window.innerWidth;

const letters = "01";
const matrix = letters.split("");

const fontSize = 14;
const columns = canvas.width / fontSize;
const drops = [];

for (let x = 0; x < columns; x++)
    drops[x] = 1;

function draw() {
    ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "#00ffcc";
    ctx.font = fontSize + "px monospace";

    for (let i = 0; i < drops.length; i++) {
        const text = matrix[Math.floor(Math.random() * matrix.length)];
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975)
            drops[i] = 0;

        drops[i]++;
    }
}

setInterval(draw, 33);
