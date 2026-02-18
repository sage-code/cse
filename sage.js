function initDynamicHeader() {
    const header = document.getElementById('dynamic-header');
    if (!header) return;

    // Use g-0 to remove row gutters
    let headerHTML = `
        <div class="row align-items-center g-0">
            <div class="col-auto">
                <a href="/">
                    <img src="/images/sage-logo.svg" alt="Sage-Code" height="50">
                </a>
            </div>
            <div class="col text-end">
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
        </div>
        <div class="row g-0">
            <div class="col">
                <nav class="breadcrumb-nav">${generateBreadcrumbs()}</nav>
            </div>
        </div>`;

    header.innerHTML = headerHTML;

    // Hamburger Event
    const btn = document.getElementById('hamburger-btn');
    const menu = document.getElementById('nav-menu');
    if (btn && menu) {
        btn.addEventListener('click', () => menu.classList.toggle('active'));
    }
}