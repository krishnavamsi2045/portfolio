const canvas = document.createElement("canvas");
document.body.appendChild(canvas);
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const letters = "01CYBERSECURITYHACKER";
const fontSize = 14;
const columns = canvas.width / fontSize;
const drops = Array(Math.floor(columns)).fill(1);

function drawMatrix() {
ctx.fillStyle = "rgba(2,6,23,0.08)";
ctx.fillRect(0, 0, canvas.width, canvas.height);

```
ctx.fillStyle = "#00ffcc";
ctx.font = fontSize + "px monospace";

for (let i = 0; i < drops.length; i++) {
    const text = letters[Math.floor(Math.random() * letters.length)];
    ctx.fillText(text, i * fontSize, drops[i] * fontSize);

    if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
        drops[i] = 0;
    }
    drops[i]++;
}
```

}
setInterval(drawMatrix, 35);

// Typing Effect
const roles = [
"Cybersecurity Student",
"Ethical Hacking Learner",
"SOC Analyst Aspirant",
"Network Security Enthusiast"
];

let i = 0, j = 0, isDeleting = false;
const typing = document.getElementById("typing");

function typeEffect() {
const current = roles[i];
if (!isDeleting) {
typing.textContent = current.substring(0, j++);
if (j > current.length) {
isDeleting = true;
setTimeout(typeEffect, 1000);
return;
}
} else {
typing.textContent = current.substring(0, j--);
if (j < 0) {
isDeleting = false;
i = (i + 1) % roles.length;
}
}
setTimeout(typeEffect, isDeleting ? 50 : 100);
}
document.addEventListener("DOMContentLoaded", typeEffect);
