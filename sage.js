/**
 * sage.js - Global Logic for sagecode.pro
 * Handles the Dynamic Header and Alignment
 */

document.addEventListener("DOMContentLoaded", function () {
    initDynamicHeader();
});

function initDynamicHeader() {
    const header = document.getElementById('dynamic-header');
    if (!header) return;

    // justify-content-between pushes the two columns to the opposite edges
    let headerHTML = `
        <div class="row align-items-center g-0 justify-content-between">
            <div class="col-auto ps-0">
                <a href="https://sagecode.pro">
                    <img src="https://sagecode.pro/images/sage-logo.svg" alt="Sage-Code" height="50" style="display: block;">
                </a>
            </div>
            
            <div class="col-auto pe-0">
                <nav class="main-nav">
                    <div class="hamburger" id="hamburger-btn">
                        <span></span><span></span><span></span>
                    </div>
                    <ul class="nav-links" id="nav-menu">
                        <li><a href="https://sagecode.pro/engineering">Engineering</a></li>
                        <li><a href="https://sagecode.pro/programming">Programming</a></li>
                        <li><a href="https://sagecode.pro/projects">Projects</a></li>
                        <li><a href="https://sagecode.pro/community">Community</a></li>
                    </ul>
                </nav>
            </div>
        </div>
        
        <div class="row g-0 mt-2">
            <div class="col ps-0">
                <nav class="breadcrumb-nav">${generateBreadcrumbs()}</nav>
            </div>
        </div>`;


    header.innerHTML = headerHTML;

    const btn = document.getElementById('hamburger-btn');
    const menu = document.getElementById('nav-menu');
    if (btn && menu) {
        btn.addEventListener('click', () => menu.classList.toggle('active'));
    }
}

/**
 * Generates the breadcrumb path automatically
 * Fixed for cross-domain support between sagecode.pro and savecode.vip
 */
function generateBreadcrumbs() {
    try {
        const MAIN_HUB = "https://sagecode.pro";
        const path = window.location.pathname;
        const pathArray = path.split('/').filter(p => p && p !== "index.html");
        
        // 1. Permanent Absolute Home Link
        let html = `<a href="${MAIN_HUB}"><i class="bi bi-house-door"></i> HOME</a>`;
        
        // 2. Determine the Base URL for middle segments
        // If we are on VIP, middle segments should ideally point back to the PRO hub 
        // UNLESS the specific sub-folder exists on the VIP site.
        let currentPath = MAIN_HUB; 

        pathArray.forEach((segment, index) => {
            currentPath += `/${segment}`;
            let name = segment.replace(/-/g, ' ').toUpperCase();
            
            html += ` <span class="sep">/</span> `;
            
            if (index === pathArray.length - 1) {
                // Final segment is just text
                html += `<span class="current">${name}</span>`;
            } else {
                // Middle segments point back to the main hub
                html += `<a href="${currentPath}">${name}</a>`;
            }
        });

        return html;
    } catch (e) {
        console.error("Breadcrumb error:", e);
        return `<a href="https://sagecode.pro"><i class="bi bi-house-door"></i> HOME</a>`;
    }
}