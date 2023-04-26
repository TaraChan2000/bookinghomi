var token = localStorage.getItem("token");
var loginmenu = '<li><a href="login">Login</a></li>'
if(token != null){
    loginmenu = '<li><a href="#">Account</a>'+
        '<ul class="dropdown">'+
        '<li><a href="myPost">My Account</a></li>'+
        '<li><a href="myaccount">Update Account</a></li>'+
        '<li><a href="myrequest">My reservation request</a></li>'+
        '<li><a href="userrequest">Reservation request</a></li>'+
        '<li><a onclick="logout()">Log out</a></li>'+
        '</ul>'+
        '</li>'
}
var main =
    '<div id="preloder">'+
    '<div class="loader"></div>'+
    '</div>'+

    '<div class="offcanvas-menu-overlay"></div>'+
    '<div class="canvas-open">'+
    '<i class="icon_menu"></i>'+
    '</div>'+
    '<div class="offcanvas-menu-wrapper">'+
    '<div class="canvas-close">'+
    '<i class="icon_close"></i>'+
    '</div>'+
    '<div class="search-icon  search-switch">'+
    '<i class="icon_search"></i>'+
    '</div>'+
    '<div class="header-configure-area">'+
    '<a href="upload" class="bk-btn">Upload Room Now</a>'+
    '</div>'+
    '<nav class="mainmenu mobile-menu">'+
    '<ul>'+
    '<li class=""><a href="/">Home</a></li>'+
    '<li><a href="search">Rooms</a></li>'+
    '<li><a href="chat">Chat</a></li>'+
    loginmenu+
    '</ul>'+
    '</nav>'+
    '<div id="mobile-menu-wrap"></div>'+
    '<div class="top-social">'+
    '<a href="#"><i class="fa fa-facebook"></i></a>'+
    '<a href="#"><i class="fa fa-twitter"></i></a>'+
    '<a href="#"><i class="fa fa-tripadvisor"></i></a>'+
    '<a href="#"><i class="fa fa-instagram"></i></a>'+
    '</div>'+
    '<ul class="top-widget">'+
    '</ul>'+
    '</div>'+

    '<header class="header-section">'+
    '<div class="top-nav">'+
    '<div class="container">'+
    '<div class="row">'+
    '<div class="col-lg-6">'+
    '<ul class="tn-left">'+
    '</ul>'+
    '</div>'+
    '<div class="col-lg-6">'+
    '<div class="tn-right">'+
    '<div class="top-social">'+
    '<a href="#"><i style="color: #000" class=""></i></a>'+
    '<a href="#"><i style="color: #000" class=""></i></a>'+
    '<a href="#"><i style="color: #000" class=""></i></a>'+
    '<a href="#"><i style="color: #000" class=""></i></a>'+
    '</div>'+
    '<a href="upload" class="bk-btn">Upload Room Now</a>'+
    '</div>'+
    '</div>'+
    '</div>'+
    '</div>'+
    '</div>'+
    '<div class="menu-item">'+
    '<div class="container">'+
    '<div class="row">'+
    '<div class="col-lg-2">'+
    '<div class="logo">'+
    '<a href="/">'+
    '<img class="logo-menu" src="../image/logo.png" alt="">'+
    '</a>'+
    '</div>'+
    '</div>'+
    '<div class="col-lg-10">'+
    '<div class="nav-menu">'+
    '<nav class="mainmenu">'+
    '<ul>'+
    '<li><a href="/">Home</a></li>'+
    '<li><a href="search">Rooms</a></li>'+
    '<li><a href="chat">Chat</a></li>'+
    ''+loginmenu+''+
    '</ul>'+
    '</nav>'+
    '</div>'+
    '</div>'+
    '</div>'+
    '</div>'+
    '</div>'+
    '</div>'+
    '</header>'+
    '<div class="search-model">'+
    '<div class="h-100 d-flex align-items-center justify-content-center">'+
    '<div class="search-close-switch"><i class="fa fa-close"></i></div>'+
    '<form class="search-model-form">'+
    '<input type="text" id="search-input" placeholder="Search here.....">'+
    '</form>'+
    '</div>'+
    '</div>'
document.getElementById("menu").innerHTML = main


var footer = '<div class="container">'+
    '<div class="footer-text">'+
    '<div class="row">'+
    '<div class="col-lg-4">'+
    '<div class="ft-about">'+
    '<div class="logo">'+
    '<a href="#">'+
    '<img src="../images/footer-logo.png" alt="">'+
    '</a>'+
    '</div>'+
    '<p>We inspire and reach millions of travelers</p>'+
    '<div class="fa-social">'+
    '<a href="#"><i class="fa fa-facebook"></i></a>'+
    '<a href="#"><i class="fa fa-twitter"></i></a>'+
    '<a href="#"><i class="fa fa-tripadvisor"></i></a>'+
    '<a href="#"><i class="fa fa-instagram"></i></a>'+
    '<a href="#"><i class="fa fa-youtube-play"></i></a>'+
    '</div>'+
    '</div>'+
    '</div>'+
    '<div class="col-lg-3 offset-lg-1">'+
    '<div class="ft-contact">'+
    '<h6>Contact Us</h6>'+
    '<ul>'+
    '<li>(+84) 559662466</li>'+
    '<li>tarachan010920@gmail.com</li>'+
    '<li>Xuan Khanh Ward, Ninh Kieu District Can Tho City</li>'+
    '</ul>'+
    '</div>'+
    '</div>'+
    '<div class="col-lg-3 offset-lg-1">'+
    '<div class="ft-newslatter">'+
    '<h6>New latest</h6>'+
    '<p>Get the latest updates and offers.</p>'+
    '<form action="#" class="fn-form">'+
    '<input type="text" placeholder="Email">'+
    '<button type="submit"><i class="fa fa-send"></i></button>'+
    '</form>'+
    '</div>'+
    ' </div>'+
    '</div>'+
    '</div>'+
    '</div>'+
    '<div class="copyright-option">'+
    '<div class="container">'+
    '<div class="row">'+
    '<div class="col-lg-7">'+
    '<ul>'+
    '<li><a href="#">Contact</a></li>'+
    '<li><a href="#">Terms of use</a></li>'+
    '<li><a href="#">Privacy</a></li>'+
    '<li><a href="#">Environmental Policy</a></li>'+
    '</ul>'+
    '</div>'+
    '<div class="col-lg-5">'+
    '<div class="co-text"><p>'+
    'Copyright &copy;<script>document.write(new Date().getFullYear());</script> All rights reserved | Homi Hotel <i class="fa fa-heart" aria-hidden="true"></i> by <a href="https://colorlib.com" target="_blank">Tara Chan</a></p></div>'+
    '</div>'+
    '</div>'+
    '</div>'+
    '</div>  <button onclick="openForm()" class="open-button"><i class="fa fa-comment"></i> Chat</button>'+
    '<div class="chat-popup" id="myForm">' +
    '          <button onclick="changeChatAdmin()" class="btn-success">Chat Admin</button>' +
    '          <i class="fa fa-close" onclick="closeForm()"></i><br>' +
    '          <button onclick="changeChat()" class="btn-primary">Open Page Chat</button>' +
    '    </div>'
document.getElementById("footer").innerHTML = footer
function openForm() {
    window.location.replace('chat')
    // document.getElementById("myForm").style.display = "block";
}

function closeForm() {
    window.location.replace('chat')
}
function changeChat(){
    window.location.replace('chat')
}
function changeChatAdmin(){
    window.location.replace('chat?id=1')
}

async function logout(){
    localStorage.removeItem("token");
    window.location.replace("login?logout=t")
    await new Promise(r => setTimeout(r, 3000));
    window.location.replace("trang-chu")
}