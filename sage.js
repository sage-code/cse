function initDynamicHeader() {
    const header = document.getElementById('dynamic-header');
    if (!header) return;

    // 1. Top Row: Logo (Left) and Menu (Right)
    // ps-0 on the first col ensures the logo hits the left container boundary
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
    // ps-0 here keeps the House icon aligned vertically with the logo above
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
        btn.addEventListener('click', () => menu.classList.toggle('active'));
    }
}