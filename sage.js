document.addEventListener("DOMContentLoaded", function() {
const text = "Study for free at your own pace.\n" +
             "With comprehensive open-source roadmaps.\n" +
             "42-day free trial mentorship available.\n" +
             "Zero ads, no tracking, pure focus!";

    const container = document.getElementById("typewriter");
    const actions = document.getElementById("hero-actions");
    let i = 0;

    function typeWriter() {
        if (i < text.length) {
            if (text.charAt(i) === "\n") {
                container.innerHTML += "<br>";
            } else {
                container.innerHTML += text.charAt(i);
            }
            i++;
            // Slightly varied speed for a more "human" writing feel
            let speed = text.charAt(i-1) === "." ? 400 : 45; 
            setTimeout(typeWriter, speed);
        } else {
            actions.classList.remove("opacity-0");
            actions.classList.add("opacity-100");
        }
    }

    // Delay start until the font is likely loaded and user has looked at the board
    setTimeout(typeWriter, 800);
});