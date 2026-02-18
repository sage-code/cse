/**
 * sage.js - Global Logic
 */

document.addEventListener("DOMContentLoaded", function () {
    initDynamicHeader();
});

function initDynamicHeader() {
    const header = document.getElementById('dynamic-header');
    if (!header) return;

    // 1. Top Row: Logo (Left) and Menu (Right)
    let headerHTML = `
        <div class="row align-items-center g-0">
            <div class="col ps-0">
                <a href="/">
                    <img src="/images/sage-logo.svg" alt="Sage-Code" height="50" style="display: block;">
                </a>
            </div>
            <div class="col-auto pe-0">
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
    // Wrapping generateBreadcrumbs in a try/catch or ensuring it exists
    headerHTML += `
        <div class="row mt-2 g-0">
            <div class="col ps-0">
                <nav class="breadcrumb-nav">${generateBreadcrumbs()}</nav>
            </div>
        </div>`;

    header.innerHTML = headerHTML;

    // Re-attach Hamburger Event
    const btn = document.getElementById('hamburger-btn');
    const menu = document.getElementById('nav-menu');
    if (btn && menu) {
        btn.addEventListener('click', () => {
            menu.classList.toggle('active');
        });
    }
}

// THIS FUNCTION MUST BE PRESENT
function generateBreadcrumbs() {
    try {
        const path = window.location.pathname;
        // Clean segments: remove empty strings and "index.html"
        const pathArray = path.split('/').filter(p => p && p !== "index.html");
        
        // Permanent Home Anchor
        let html = `<a href="/"><i class="bi bi-house-door"></i> HOME</a>`;
        
        let currentPath = "";
        pathArray.forEach((segment, index) => {
            currentPath += `/${segment}`;
            let name = segment.replace(/-/g, ' ').toUpperCase();
            
            html += ` <span class="sep">/</span> `;
            
            if (index === pathArray.length - 1) {
                html += `<span class="current">${name}</span>`;
            } else {
                html += `<a href="${currentPath}">${name}</a>`;
            }
        });

        return html;
    } catch (e) {
        console.error("Breadcrumb error:", e);
        return `<a href="/"><i class="bi bi-house-door"></i> HOME</a>`;
    }
}