document.addEventListener("DOMContentLoaded", function() {
    const text = `Welcome to Sage-Code Laboratory.
Where you can Study for free at your own pace.
Using our resources.
Professional mentor available (42-day free trial).
No ads, no distractions, pure learning.
Professional premium services for VIP members.`;

    const container = document.getElementById("typewriter");
    const actions = document.getElementById("hero-actions");
    let i = 0;

    function typeWriter() {
        if (i < text.length) {
            container.innerHTML += text.charAt(i);
            i++;
            setTimeout(typeWriter, 40); // Speed of typing in milliseconds
        } else {
            // Show buttons once typing is done
            actions.classList.add("opacity-100");
        }
    }

    typeWriter();
});