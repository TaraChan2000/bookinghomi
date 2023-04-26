function isEmail(email) {
    return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);
}

function isPhone(number) {
    return /(84|0[3|5|7|8|9])+([0-9]{8})\b/.test(number);
}
async function regis() {

    var linkimage = 'https://e7.pngegg.com/pngimages/178/595/png-clipart-user-profile-computer-icons-login-user-avatars-monochrome-black.png';

    var url = 'http://'+urlFirst+'/api/register'
    var username = document.getElementById("username").value
    var email = document.getElementById("email").value
    var phone = document.getElementById("phone").value
    var langKey = 'en'
    var password = document.getElementById("password").value

    if(password === "" && email === "" && username === ""){
        alert("Data cannot be left blank")
        return;
    }
    if(username === "" ){
        alert("Username can't be left blank")
        return;
    }
    if(email === "" ){
        alert("Email can't be left blank")
        return;
    }
    if(password === "" ){
        alert("Password can't be left blank")
        return;
    }
    if(!isEmail(email)) {
    alert('Erroneous email format!');
        return;
    }
    if(!isPhone(phone)) {
        alert('Erroneous phone format!');
        return;
    }
    if(password.length < 6 ){
        alert("Password must include at least 5 characters!")
        return;
    }
    var user = {
        "username": username,
        "email": email,
        "phone": phone,
        "langKey": langKey,
        "avatar": linkimage,
        "password": password,
        "authorities": [
            "ROLE_USER"
        ]
    }
    const res = await fetch(url, {
        method: 'POST',
        headers: new Headers({
            'Content-Type': 'application/json'
        }),
        body: JSON.stringify(user)
    });
    var result = await res.text();
    console.log(result)
    if (result === '1') {
        alert("email already exist")
    }
    else if (result === '2') {
        alert("username already exist")
    }
    else if (result === '0') {
        swal({
                title: "Notification",
                text: "Register account successful!",
                type: "success"
            },
            function(){
                window.location.replace('login')
            });
    }
}