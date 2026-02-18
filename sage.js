document.addEventListener("DOMContentLoaded", function () {
    initDynamicHeader();
});

function initDynamicHeader() {
    const header = document.getElementById('dynamic-header');
    if (!header) return;

    // 1. Top Row: Logo and Menu
    let headerHTML = `
        <div class="row align-items-center">
            <div class="col">
                <a href="/"><img src="/images/sage-logo.svg" alt="Sage-Code" height="50"></a>
            </div>
            <div class="col-auto">
                <nav class="main-nav">
                    <div class="hamburger" id="hamburger-btn">
                        <span></span><span></span><span></span>
                    </div>
                    <ul class="nav-links" id="nav-menu">
                        <li><a href="/engineering">Engineering</a></li>
                        <li><a href="/programming">Programming</a></li>
                        <li><a href="/projects">Projects</a></li>
                        <li><a href="/community">Community</a></li>
                    </ul>
                </nav>
            </div>
        </div>`;

    // 2. Permanent Breadcrumb Row
    headerHTML += `
        <div class="row mt-1">
            <div class="col">
                <nav class="breadcrumb-nav">${generateBreadcrumbs()}</nav>
            </div>
        </div>`;

    header.innerHTML = headerHTML;

    // Hamburger Toggle Event
    const btn = document.getElementById('hamburger-btn');
    const menu = document.getElementById('nav-menu');
    if (btn && menu) {
        btn.addEventListener('click', () => menu.classList.toggle('active'));
    }
}

function generateBreadcrumbs() {
    const path = window.location.pathname;
    const pathArray = path.split('/').filter(p => p && p !== "index.html");
    
    // Always start with the House icon and Laboratory text
    let html = `<a href="/"><i class="bi bi-house-door"></i> Home</a>`;
    
    let currentPath = "";
    pathArray.forEach((segment, index) => {
        currentPath += `/${segment}`;
        let name = segment.replace(/-/g, ' ');
        
        // Add separator
        html += ` <span class="sep">/</span> `;
        
        // If last segment, make it a span, otherwise a link
        if (index === pathArray.length - 1) {
            html += `<span class="current">${name}</span>`;
        } else {
            html += `<a href="${currentPath}">${name}</a>`;
        }
    });

    return html;
}