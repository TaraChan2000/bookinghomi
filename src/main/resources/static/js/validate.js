function checkInputRegis(){
    var username = document.getElementById("username").value
    var email = document.getElementById("email").value
    var phone = document.getElementById("phone").value
    var password = document.getElementById("password").value
    var village = document.getElementById("xa").value
    const filePath = document.getElementById('file')

    if(username.length < 6){
        alert("the length of the username must be greater than 5")
        return false
    }
    if(phone == ''){
        alert("Phone number can not be left blank\n")
        return false
    }
    if(password.length < 6){
        alert("the length of the password must be greater than 5")
        return false
    }
    if(email == ''){
        alert("email can not be left blank")
        return false
    }
    if(village === '-1'){
        alert("address can not be left blank")
        return false
    }
    if(filePath.files.length === 0){
        alert("please choose your avatar")
        return false
    }
    return true
}
