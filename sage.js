/**
 * sage.js - Global Navigation and UI Logic
 * Included on every page of sagecode.pro
 */

document.addEventListener("DOMContentLoaded", function () {
    initDynamicHeader();
});

function initDynamicHeader() {
    const header = document.getElementById('dynamic-header');
    if (!header) return;

    const path = window.location.pathname;
    const isHome = path === "/" || path.endsWith("index.html") || path === "";

    // Generate Header Content
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

    // Only add breadcrumbs row if we are NOT on the index page
    if (!isHome) {
        headerHTML += `
            <div class="row mt-1">
                <div class="col">
                    <nav class="breadcrumb-nav">${generateBreadcrumbs()}</nav>
                </div>
            </div>`;
    }

    header.innerHTML = headerHTML;

    // Attach Hamburger Toggle
    const btn = document.getElementById('hamburger-btn');
    const menu = document.getElementById('nav-menu');
    if (btn && menu) {
        btn.addEventListener('click', () => menu.classList.toggle('active'));
    }
}

function generateBreadcrumbs() {
    const pathArray = window.location.pathname.split('/').filter(p => p);
    let html = `<a href="/">Laboratory</a>`;
    let currentPath = "";

    pathArray.forEach((segment, index) => {
        currentPath += `/${segment}`;
        let name = segment.replace(/-/g, ' ');
        html += ` <span class="sep">/</span> ` + (index === pathArray.length - 1 
            ? `<span class="current">${name}</span>` 
            : `<a href="${currentPath}">${name}</a>`);
    });
    return html;
}