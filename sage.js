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
        const isVIP = window.location.hostname.includes('sagecode.vip');
        
        const path = window.location.pathname;
        // Filter out empty strings and index.html
        const pathArray = path.split('/').filter(p => p && !p.includes("index.html"));
        
        // 1. Permanent Absolute Home Link
        let html = `<a href="${MAIN_HUB}"><i class="bi bi-house-door"></i> HOME</a>`;
        
        // 2. The VIP Hack: Inject "COMMUNITY / VIP" if on the vip domain
        if (isVIP) {
            html += ` <span class="sep">/</span> <a href="${MAIN_HUB}/community">COMMUNITY</a>`;
            html += ` <span class="sep">/</span> <a href="${MAIN_HUB}/community/vip">VIP</a>`;
        }

        let currentPath = MAIN_HUB; 

        pathArray.forEach((segment, index) => {
            // Remove .html extension for the display name
            let name = segment.replace('.html', '').replace(/-/g, ' ').toUpperCase();
            
            // If on VIP, the pathing for middle segments needs to point to the virtual subfolder
            if (isVIP) {
                currentPath = `${MAIN_HUB}/community/vip/${segment}`;
            } else {
                currentPath += `/${segment}`;
            }
            
            html += ` <span class="sep">/</span> `;
            
            if (index === pathArray.length - 1) {
                // Final segment is the current page title
                html += `<span class="current">${name}</span>`;
            } else {
                // Middle segments (if any exist inside the VIP repo subfolders)
                html += `<a href="${currentPath}">${name}</a>`;
            }
        });

        return html;
    } catch (e) {
        console.error("Breadcrumb error:", e);
        return `<a href="https://sagecode.pro"><i class="bi bi-house-door"></i> HOME</a>`;
    }
}