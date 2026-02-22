const roles = [
"Cybersecurity Student",
"Ethical Hacker",
"SOC Analyst Aspirant",
"Penetration Tester",
"Web Security Learner"
];

let i = 0;
let j = 0;
let currentRole = "";
let isDeleting = false;
const typingElement = document.getElementById("typing");

function typeEffect() {
currentRole = roles[i];

if (!isDeleting) {
typingElement.textContent = currentRole.substring(0, j++);
if (j > currentRole.length) {
isDeleting = true;
setTimeout(typeEffect, 1000);
return;
}
} else {
typingElement.textContent = currentRole.substring(0, j--);
if (j < 0) {
isDeleting = false;
i = (i + 1) % roles.length;
}
}
setTimeout(typeEffect, isDeleting ? 50 : 100);
}

typeEffect();

/* MATRIX HACKER BACKGROUND */
const canvas = document.getElementById("matrix");
const ctx = canvas.getContext("2d");

canvas.height = window.innerHeight;
canvas.width = window.innerWidth;

const letters = "01HACKERMATRIXCYBERSECURITY";
const fontSize = 14;
const columns = canvas.width / fontSize;
const drops = Array(Math.floor(columns)).fill(1);

function drawMatrix() {
ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
ctx.fillRect(0, 0, canvas.width, canvas.height);

ctx.fillStyle = "#00ff9c";
ctx.font = fontSize + "px monospace";

for (let i = 0; i < drops.length; i++) {
const text = letters[Math.floor(Math.random() * letters.length)];
ctx.fillText(text, i * fontSize, drops[i] * fontSize);

```
if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
  drops[i] = 0;
}
drops[i]++;
```

}
}

setInterval(drawMatrix, 33);
