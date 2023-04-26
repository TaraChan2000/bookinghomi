async function login() {
    var url = 'http://'+urlFirst+'/api/authenticate'
    var username = document.getElementById("username").value
    var password = document.getElementById("password").value
    if(password === "" && username === ""){
        alert("Enter Username and password, please!")
        return;
    }
    if(username === "" ){
        alert("Enter Username, please!")
        return;
    }
    if(password === "" ){
        alert("Enter Password, please!")
        return;
    }
    var user = {
        "username": username,
        "password": password
    }
    console.log(user)
    const response = await fetch(url, {
        method: 'POST',
        headers: new Headers({
            'Content-Type': 'application/json'
        }),
        body: JSON.stringify(user)
    });
    var token = await response.text();


    if(response.status > 300){
        alert("invalid username or password")
    }
    if(response.status < 300){

        window.localStorage.setItem('token', token);

        var urlAccount = 'http://'+urlFirst+'/api/userlogged';
        const res = await fetch(urlAccount, {
            method: 'POST',
            headers: new Headers({
                'Authorization': 'Bearer '+token,
                'Content-Type': 'application/json'
            })
        });

        var account = await res.json();
        window.localStorage.setItem('username', account.username);
        window.localStorage.setItem('myavatar', account.avatar);
        console.log(account)
        var check = 0;
        for(i=0; i<account.authorities.length; i++){
            if(account.authorities[i].name === 'ROLE_ADMIN'){
                check = 1;
            }
        }
        if(check === 0){
            window.location.replace("trang-chu")
        }
        if(check === 1){
            window.location.replace("admin/trang-chu")
        }
    }
}

async function checkRegisKey(){
    var url = 'http://'+urlFirst+'/api/confirm-regis?key='
    var key = document.getElementById("key").value
    url = url + key;
    const res = await fetch(url, {
        method: 'POST',
        headers: new Headers({

        })
    });
    if(res.status > 300){
        alert("Authentication failed!")
    }
    else{
        alert("Successful authentication!")
        window.location.replace("login")
    }
}
function isEmail(email) {
    return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);
}
async function sendRequestForgotPassword(){
    var url = 'http://'+urlFirst+'/api/resetpass'
    var email = document.getElementById("email").value
    if(!isEmail(email)) {
        alert('Erroneous email format!');
        return;
    }
    const res = await fetch(url, {
        method: 'POST',
        headers: new Headers({
        }),
        body:email
    });
    if(res.status > 300){
        swal({
                title: "Notification",
                text: "Email already exist!",
                type: "error"
            },
            function(){
                window.location.reload();
            });
    }
    else{
        swal({
                title: "Notification",
                text: "Check your email take new password",
                type: "success"
            },
            function(){
                window.location.replace(login)
            });
    }

}

async function checkKeyForget(){
    var url = 'http://'+urlFirst+'/api/resetpass-finish'
    var key = document.getElementById("key").value
    var newPassword = document.getElementById("password").value
    var access = {
        "key":key,
        "newPassword":newPassword
    }
    const response = await fetch(url, {
        method: 'POST',
        headers: new Headers({
            'Content-Type': 'application/json'
        }),
        body: JSON.stringify(access)
    });

    if(response.status >300){
        alert("!")
    }
    else{
        alert("success!")
        window.location.replace("login")
    }
}

function logoutAdmin(){
    localStorage.removeItem("token");
    window.location.replace("../login")
}

async function logout(){
    localStorage.removeItem("token");
    window.location.replace("login?logout=t")
    await new Promise(r => setTimeout(r, 3000));
    window.location.replace("trang-chu")
}

async function checkLogout(){
    var t = window.location.search.split('=')[1];
    if (t != null) {
        await new Promise(r => setTimeout(r, 500));
        window.location.replace("trang-chu")
    }
}