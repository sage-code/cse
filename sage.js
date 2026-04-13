/**
 * sage.js - Global Logic for sagecode.org
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
            <div class="col-auto ps-0 p-0 m-0">
                <a href="https://sagecode.org">
                    <img src="https://sagecode.org/images/sage-logo.svg" alt="Sage-Code" height="50" style="display: block;">
                </a>
            </div>
            
            <div class="col-auto pe-0">     
                <nav class="main-nav">
                    <div class="hamburger" id="hamburger-btn">
                        <span></span><span></span><span></span>
                    </div>
                    <ul class="nav-links" id="nav-menu">
                        <li><a href="https://sagecode.org/engineering">Engineering</a></li>
                        <li><a href="https://sagecode.org/programming">Programming</a></li>
                        <li><a href="https://sagecode.org/projects">Projects</a></li>
                        <li><a href="https://sagecode.org/community">Community</a></li>
                    </ul>
                </nav>
            </div>
        </div>
        
        <div class="row g-0 mt-0 p-0">
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
 * Fixed for cross-domain support between sagecode.org and savecode.vip
 */
function generateBreadcrumbs() {
    try {
        const MAIN_HUB = "https://sagecode.org";
        const VIP_HUB = "https://sagecode.vip";
        const isVIP = window.location.hostname.includes('sagecode.vip');
        
        const path = window.location.pathname;
        const pathArray = path.split('/').filter(p => p && !p.includes("index.html"));
        
        // 1. Permanent Home Link
        let html = `<a href="${MAIN_HUB}"><i class="bi bi-house-door"></i> HOME</a>`;
        
        // 2. Inject Virtual Path for VIP pages
        if (isVIP) {
            // Community link points to .pro
            html += ` <span class="sep">/</span> <a href="${MAIN_HUB}/community">COMMUNITY</a>`;
            // VIP link points to the root of .vip (since /vip folder doesn't exist on .pro)
            html += ` <span class="sep">/</span> <a href="${VIP_HUB}">VIP</a>`;
        }

        // 3. Process current site's segments
        let currentPath = isVIP ? VIP_HUB : MAIN_HUB; 

        pathArray.forEach((segment, index) => {
            // Remove extension and format text
            let name = segment.replace('.html', '').replace(/-/g, ' ').toUpperCase();
            
            // Special handling for topic.html - extract topic parameter
            const isTopicPage = segment.includes('topic.html') || segment === 'topic';
            let topicId = null;
            if (isTopicPage) {
                const params = new URLSearchParams(window.location.search);
                topicId = params.get('topic');
                if (topicId) {
                    name = topicId.replace(/-/g, ' ').toUpperCase();
                }
            }
            
            // Build the URL based on which domain we are currently on
            currentPath += `/${segment}`;
            
            html += ` <span class="sep">/</span> `;
            
            if (index === pathArray.length - 1) {
                // If on topic.html, make the topic name clickable to reload the page
                if (isTopicPage && topicId) {
                    const topicUrl = `${currentPath}?topic=${topicId}`;
                    html += `<a href="${topicUrl}">${name}</a>`;
                } else {
                    html += `<span class="current">${name}</span>`;
                }
            } else {
                html += `<a href="${currentPath}">${name}</a>`;
            }
        });

        return html;
    } catch (e) {
        console.error("Breadcrumb error:", e);
        return `<a href="https://sagecode.org"><i class="bi bi-house-door"></i> HOME</a>`;
    }
}