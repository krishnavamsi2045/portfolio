const text = "cd ~/vamsis-portfolio && access granted";
const typingElement = document.getElementById("typing");
const loader = document.getElementById("loader");

let i = 0;

function typeWriter() {
  if (i < text.length) {
    typingElement.innerHTML += text.charAt(i);
    i++;
    setTimeout(typeWriter, 50);
  } else {
    setTimeout(() => {
      loader.style.display = "none";
    }, 1000);
  }
}

window.onload = typeWriter;
