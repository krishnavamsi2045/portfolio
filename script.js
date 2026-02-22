// ERROR-FREE HACKER INTRO (AUTO LOAD)
const text = [
  "Initializing System...",
  "Accessing Portfolio...",
  "Loading Mandala Krishna Vamsi...",
  "Welcome to Cybersecurity Portfolio..."
];

let line = 0;
let char = 0;
const speed = 40;
const typingElement = document.getElementById("typingText");

function typeEffect() {
  if (line < text.length) {
    if (char < text[line].length) {
      typingElement.innerHTML += text[line].charAt(char);
      char++;
      setTimeout(typeEffect, speed);
    } else {
      typingElement.innerHTML += "<br>";
      line++;
      char = 0;
      setTimeout(typeEffect, 300);
    }
  } else {
    // FIX: Hide intro after typing (prevents black screen)
    setTimeout(() => {
      document.getElementById("intro").style.display = "none";
      document.getElementById("mainContent").style.display = "block";
    }, 1000);
  }
}

// Start typing when page loads
window.onload = () => {
  typeEffect();
};
