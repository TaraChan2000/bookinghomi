async function regis() {

    //loading
    document.getElementById("img_loading").style.width = '50%';

    //upload image
    var uploadimg = 'http://'+urlFirst+':8080/api/public/upload';
    const filePath = document.getElementById('file')
    const formData = new FormData()
    formData.append("file", filePath.files[0])
    const response = await fetch(uploadimg, {
        method: 'POST',
        headers: new Headers({

        }),
        body: formData
    });
    var linkimage = await response.text();



    var url = 'http://'+urlFirst+':8080/api/register'
    var username = document.getElementById("username").value
    var firstName = document.getElementById("first").value
    var lastName = document.getElementById("last").value
    var email = document.getElementById("email").value
    var phone = document.getElementById("phone").value
    var langKey = 'en'
    var password = document.getElementById("password").value
    var village = document.getElementById("xa").value
    var user = {
        "username": username,
        "firstName": firstName,
        "lastName": lastName,
        "email": email,
        "phone": phone,
        "langKey": langKey,
        "avatar": linkimage,
        "password": password,
        "village": {
            "id": village
        },
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
        alert("email đã tồn tại")
    }
    else if (result === '2') {
        alert("username đã tồn tại")
    }
    else if (result === '0') {
        alert("đăng ký thành công! hãy check email của bạn")
        window.location.replace("keyactive")
    }
    document.getElementById("img_loading").style.width = '0%';
}