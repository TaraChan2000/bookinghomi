function loadMenu() {
    var main = '<nav class="sb-sidenav accordion sb-sidenav-dark" id="sidenavAccordion">' +
        '<div class="sb-sidenav-menu" >' +
        '<div class="nav">' +
        '<a class="nav-link" href="trang-chu">' +
        '<div class="sb-nav-link-icon"><i class="fas fa-tachometer-alt"></i></div>' +
        'Dashboroad' +
        '</a>' +
        '<div class="sb-sidenav-menu-heading">manager</div>' +
        '<a class="nav-link" href="user">' +
        '<div class="sb-nav-link-icon"><i class="fas fa-chart-area"></i></div>' +
        'User Management' +
        '</a>' +
        '<a class="nav-link" href="room">' +
        '<div class="sb-nav-link-icon"><i class="fas fa-hotel"></i></div>' +
        'Room Management' +
        '</a>' +
        '<a class="nav-link" href="utilities">' +
        '<div class="sb-nav-link-icon"><i class="fas fa-wifi"></i></div>' +
        'Utilities Management' +
        '</a>' +
        '</div>' +
        '</div >' +
        '</nav>';
    document.getElementById("layoutSidenav_nav").innerHTML = main
}