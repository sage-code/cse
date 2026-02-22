// sidebar.js
document.addEventListener('DOMContentLoaded', () => {
    const pageKey = window.location.pathname; 
    const progressBar = document.getElementById('main-progress');
    const checkboxes = document.querySelectorAll('.topic-check');
    const sidebar = document.getElementById('study-sidebar');
    const openBtn = document.getElementById('open-sidebar');
    const closeBtn = document.getElementById('close-sidebar');

    // --- 1. Progress & Storage ---
    const updateProgressBar = () => {
        if (!progressBar) return;
        const total = checkboxes.length;
        const checked = document.querySelectorAll('.topic-check:checked').length;
        progressBar.style.width = total > 0 ? `${(checked / total) * 100}%` : '0%';
    };

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

    // --- 2. Auto-Check on Scroll ---
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
    }, { rootMargin: '0px 0px -85% 0px' });

    // --- 3. Interaction & Mobile Toggle ---
    
    // Open Sidebar
    if (openBtn && sidebar) {
        openBtn.addEventListener('click', () => {
            sidebar.classList.add('active');
        });
    }

    // Close Sidebar
    if (closeBtn && sidebar) {
        closeBtn.addEventListener('click', () => {
            sidebar.classList.remove('active');
        });
    }

    // Close when clicking a link on mobile
    document.querySelectorAll('#bookmark-list a').forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth < 992 && sidebar) {
                sidebar.classList.remove('active');
            }
        });
    });

    // Initialize Checkboxes & Observers
    checkboxes.forEach(cb => {
        const targetSection = document.getElementById(cb.dataset.target);
        if (targetSection) observer.observe(targetSection);
        cb.addEventListener('change', saveProgress);
    });

    loadProgress();
});