// sidebar.js
document.addEventListener('DOMContentLoaded', () => {
    const pageKey = window.location.pathname; 
    const progressBar = document.getElementById('main-progress');
    const checkboxes = document.querySelectorAll('.topic-check');

    // 1. Storage Logic
    const saveProgress = () => {
        const state = {};
        checkboxes.forEach(cb => state[cb.dataset.target] = cb.checked);
        localStorage.setItem(pageKey, JSON.stringify(state));
        updateProgressBar();
    };

    const loadProgress = () => {
        const saved = JSON.parse(localStorage.getItem(pageKey) || '{}');
        checkboxes.forEach(cb => {
            if (saved[cb.dataset.target]) cb.checked = true;
        });
        updateProgressBar();
    };

    const updateProgressBar = () => {
        if (!progressBar) return;
        const total = checkboxes.length;
        const checked = document.querySelectorAll('.topic-check:checked').length;
        progressBar.style.width = total > 0 ? `${(checked / total) * 100}%` : '0%';
    };

    // 2. Intersection Observer (The "Auto-Check" feature)
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.id;
                const cb = document.querySelector(`.topic-check[data-target="${id}"]`);
                if (cb && !cb.checked) {
                    cb.checked = true;
                    saveProgress();
                }
            }
        });
    }, { rootMargin: '0px 0px -85% 0px' }); // Triggers when section hits the top

    // 3. Initialization
    checkboxes.forEach(cb => {
        const targetSection = document.getElementById(cb.dataset.target);
        if (targetSection) observer.observe(targetSection);
        cb.addEventListener('change', saveProgress);
    });

    // 4. Mobile Toggle Logic (Generic)
    document.querySelectorAll('[data-toggle="sidebar"]').forEach(btn => {
        btn.addEventListener('click', () => {
            document.getElementById('study-sidebar').classList.toggle('active');
        });
    });

    // Add this inside your DOMContentLoaded block in sidebar.js
    const closeBtn = document.getElementById('close-sidebar');
    const sidebar = document.getElementById('study-sidebar');

    if (closeBtn && sidebar) {
        closeBtn.addEventListener('click', () => {
            // This removes the 'active' class that shows the mobile overlay
            sidebar.classList.remove('active');
        });
    }

    // Also, close the sidebar when a link is clicked on mobile
    const links = document.querySelectorAll('#bookmark-list a');
    links.forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth < 992) {
                sidebar.classList.remove('active');
            }
        });
    });

    loadProgress();
});