/**
 * home.js - Home Page Specific Features
 * Included ONLY on the main index page
 */

document.addEventListener("DOMContentLoaded", function () {
    const container = document.getElementById("typewriter");
    const actions = document.getElementById("hero-actions");

    // Guard to prevent double execution
    if (container && !container.dataset.started) {
        container.dataset.started = "true";
        container.innerHTML = ""; // Clear initial state

        const text = `Study for free at your own pace.
With comprehensive open-source roadmaps.
Optional 42-day free trial mentorship.
For those who wish to reinvent themselves!`;

        let i = 0;

        function typeWriter() {
            if (i < text.length) {
                if (text.charAt(i) === "\n") {
                    container.innerHTML += "<br>";
                } else {
                    container.innerHTML += text.charAt(i);
                }
                i++;
                // Speed logic: slower on periods, faster on letters
                let speed = text.charAt(i - 1) === "." ? 400 : 45;
                setTimeout(typeWriter, speed);
            } else if (actions) {
                actions.classList.remove("opacity-0");
                actions.classList.add("opacity-100");
            }
        }
        
        // Start after a slight delay for font loading
        setTimeout(typeWriter, 800);
    }
});