// HACKER TERMINAL LOADING (FIXED FOR VAMSI)
document.addEventListener('DOMContentLoaded', () => {
    const loadingContainer = document.getElementById('loading');

    // Terminal UI
    loadingContainer.innerHTML = `
        <div class="terminal-text">
            <span style="color:#00ff9c;">vamsi@cybersec</span>:~$ 
            <span id="typed-command"></span>
            <span class="terminal-cursor"></span>
        </div>
    `;

    const typedCommand = document.getElementById('typed-command');

    // 🔥 YOUR NAME HERE (EDITABLE)
    const text = "cd ~/vamsi-portfolio";

    let index = 0;

    function typeEffect() {
        if (index < text.length) {
            typedCommand.textContent += text.charAt(index);
            index++;
            setTimeout(typeEffect, 70);
        } else {
            // Fade out loading screen
            setTimeout(() => {
                loadingContainer.style.opacity = "0";
                setTimeout(() => {
                    loadingContainer.style.display = "none";
                }, 600);
            }, 800);
        }
    }

    setTimeout(typeEffect, 500);
});
