/**
 * Sage-Code Logic: Handles Hero CTA state and Privacy-friendly tracking
 */
document.addEventListener("DOMContentLoaded", function() {
    const ctaBtn = document.getElementById('cta-main');
    
    if (ctaBtn) {
        // 1. Check if the user has a 'returning' flag in their local browser storage
        const isReturning = localStorage.getItem('returning_student');

        if (isReturning) {
            // Update the button for a returning user
            ctaBtn.innerText = "CONTINUE STUDY";
            ctaBtn.classList.replace('btn-primary', 'btn-success');
            // Change destination to where they left off, or a general 'learning' hub
            // ctaBtn.setAttribute('href', '/engineering/dashboard.html'); 
        }

        // 2. Mark as returning when they click the button
        ctaBtn.addEventListener('click', function() {
            localStorage.setItem('returning_student', 'true');
        });
    }
});