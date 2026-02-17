/**
 * Sage-Code Roadmap Engine
 * Persistent progress tracking via LocalStorage
 */
document.addEventListener('DOMContentLoaded', () => {
    // 1. Configuration: Look for a table with the "data-sage-roadmap" attribute
    const roadmapTable = document.querySelector('[data-sage-roadmap]');
    if (!roadmapTable) return;

    const courseId = roadmapTable.getAttribute('data-sage-roadmap'); // e.g., "cse-basics"
    const storageKey = `sage_progress_${courseId}`;
    const checkboxes = roadmapTable.querySelectorAll('.topic-check');
    const progressBar = document.querySelector('#roadmap-progress');

    // 2. Load State
    const savedState = JSON.parse(localStorage.getItem(storageKey)) || {};

    // 3. Initialize UI
    checkboxes.forEach(check => {
        const row = check.closest('tr');
        const topicId = row.getAttribute('data-topic');

        // Restore state
        if (savedState[topicId]) {
            check.checked = true;
            row.classList.add('table-active');
            row.style.opacity = '0.7';
        }

        // Handle clicks
        check.addEventListener('change', () => {
            savedState[topicId] = check.checked;
            localStorage.setItem(storageKey, JSON.stringify(savedState));
            
            // Visual feedback
            if (check.checked) {
                row.classList.add('table-active');
                row.style.opacity = '0.7';
            } else {
                row.classList.remove('table-active');
                row.style.opacity = '1';
            }
            updateProgress();
        });
    });

    function updateProgress() {
        if (!progressBar) return;
        const total = checkboxes.length;
        const completed = roadmapTable.querySelectorAll('.topic-check:checked').length;
        const percent = total > 0 ? Math.round((completed / total) * 100) : 0;
        
        progressBar.style.width = `${percent}%`;
        progressBar.textContent = `${percent}% Completed`;
        progressBar.setAttribute('aria-valuenow', percent);
    }

    updateProgress();
});