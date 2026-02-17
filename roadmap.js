document.addEventListener('DOMContentLoaded', () => {
    // 1. Find the table and identify the course
    const roadmapTable = document.querySelector('[data-sage-roadmap]');
    if (!roadmapTable) return;

    const courseId = roadmapTable.getAttribute('data-sage-roadmap');
    const storageKey = `sage_progress_${courseId}`;
    const checkboxes = roadmapTable.querySelectorAll('.topic-check');
    const progressBar = document.getElementById('roadmap-progress');

    // 2. Load saved data
    const savedProgress = JSON.parse(localStorage.getItem(storageKey)) || {};

    // 3. Apply saved state and set up listeners
    checkboxes.forEach(check => {
        const row = check.closest('tr');
        const topicId = row.getAttribute('data-topic');

        if (savedProgress[topicId]) {
            check.checked = true;
            row.classList.add('table-active'); 
        }

        check.addEventListener('change', () => {
            savedProgress[topicId] = check.checked;
            localStorage.setItem(storageKey, JSON.stringify(savedProgress));
            
            if (check.checked) {
                row.classList.add('table-active');
            } else {
                row.classList.remove('table-active');
            }
            updateUI();
        });
    });

    function updateUI() {
        if (!progressBar) return;
        const total = checkboxes.length;
        const completed = roadmapTable.querySelectorAll('.topic-check:checked').length;
        const percent = Math.round((completed / total) * 100);
        
        progressBar.style.width = percent + '%';
        progressBar.textContent = percent + '% Complete';
    }

    updateUI(); // Run once on load
});