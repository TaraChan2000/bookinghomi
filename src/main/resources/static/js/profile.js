function isEmail(email) {
    return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);
}

function isPhone(number) {
    return /(84|0[3|5|7|8|9])+([0-9]{8})\b/.test(number);
}
var linkimage = null;
async function loadAccountUpdate() {
    var user;
    var token = localStorage.getItem("token");
    if (token === null) {
        window.location.replace("login")
    }
    else {
        const res = await fetch('http://'+urlFirst+'/api/userlogged', {
            method: 'POST',
            headers: new Headers({
                'Authorization': 'Bearer ' + token
            })
        })
        user = await res.json();
    }
    linkimage = user.avatar
    console.log(user)
    document.getElementById("avatar").src = user.avatar
    document.getElementById("phone").value = user.phone
    document.getElementById("email").value = user.email
    loadAddressUpdateUser(user.village.town.province.id, user.village.town.id, user.village.id)
}

async function loadAccount() {
    var id = window.location.search.split('=')[1];
    var user;
    var token = localStorage.getItem("token");
    if (id == null) {
        if (token === null) {
            window.location.replace("login.html")
        }
        else {
            const res = await fetch('http://'+urlFirst+'/api/userlogged', {
                method: 'POST',
                headers: new Headers({
                    'Authorization': 'Bearer ' + token,
                    'Content-Type': 'application/json'
                })
            })
            user = await res.json();

        }
    }
    else {
        const res = await fetch('http://'+urlFirst+'/api/public/findUserById?id=' + id, {
            method: 'GET',
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        })
        if (res.status > 300) {
            alert("not found this user!")
            window.location.replace("/")
        }
        user = await res.json();
    }

    document.getElementById("avatar_profile").src = user.avatar
    document.getElementById("tieudeten").innerHTML = 'Profile of ' + user.username
    document.getElementById("ngaythamgia").innerHTML = user.created_date.split("T")[0]
    document.getElementById("diachi").innerHTML = user.village.name + ' - ' + user.village.town.name + ' - ' + user.village.town.province.name
}


async function loadRoomProfile(){
    var id = window.location.search.split('=')[1];
    var token = localStorage.getItem("token");
    var listRoom;
    if (id == null) {
        const res = await fetch('http://'+urlFirst+'/api/user/roomOfMyProfile', {
            method: 'GET',
            headers: new Headers({
                'Authorization': 'Bearer ' + token
            })
        })
        listRoom = await res.json();
    }
    else{
        const res = await fetch('http://'+urlFirst+'/api/public/roomOfProfileUser?id='+id, {
            method: 'GET',
            headers: new Headers({
            })
        })
        listRoom = await res.json();
    }
    var main = '';
    if(listRoom.length < 1){
        document.getElementById("list-post-full").innerHTML = main
        document.getElementById("list-post-profile").innerHTML = '<svg fill="#ccc" width="100" height="100" id="Layer_1" xmlns="http://www.w3.org/2000/svg" viewBox="15.6 37.6 80 50"><path class="st0" d="M85.6 52.8s-5.1-7-13.2-6.6c-8.3-11.4-14.7-1.4-14.7-1.4-.6-.4-1.4-.6-2.2-.6-.8 0-1.5.2-2.2.6 0 0-6.4-10-14.7 1.4-8.1-.4-13.2 6.6-13.2 6.6-4.9 3-8.2 8.4-8.2 14.5 0 9.4 7.6 17 17 17 8.5 0 15.6-6.3 16.8-14.5 0 0 1.3 1.7 4.1 1.7s4.6-1.7 4.6-1.7C60.9 78 68 84.2 76.5 84.2c9.4 0 17-7.6 17-17 .3-6-3-11.4-7.9-14.4zM33.9 79.5c-6.4 0-11.6-5.2-11.6-11.6 0-6.4 5.2-11.6 11.6-11.6s11.6 5.2 11.6 11.6c.1 6.4-5.2 11.6-11.6 11.6zm42.9 0c-6.4 0-11.7-5.2-11.7-11.6 0-6.4 5.2-11.6 11.7-11.6 6.4 0 11.6 5.2 11.6 11.6 0 6.4-5.2 11.6-11.6 11.6z"></path><path class="st0" d="M26.9 66.9c-.4-1-.6-2-.7-3-1.2 2.1-1.5 4.7-.6 7.1 1.6 4.3 6.5 6.5 10.8 4.9.9-.3 1.7-.8 2.4-1.4-5 .4-10-2.5-11.9-7.6zM70.7 66.9c-.4-1-.6-2-.7-3-1.2 2.1-1.5 4.7-.6 7.1 1.6 4.3 6.5 6.5 10.8 4.9.9-.3 1.7-.8 2.4-1.4-5 .4-10-2.5-11.9-7.6z"></path></svg><div class="title-none"><p>This person has no personal posts yet</p></div>'
    }
    for(i=0; i<listRoom.length; i++){
        main += '<div class="col-md-12 signle-room-search">'+
            '<div class="row">'+
            '<div class="col-md-2">'+
            '<a href="detail.html?id='+listRoom[i].id+'"><img class="image-search" src="'+listRoom[i].banner+'"></a>'+
            '</div>'+
            '<div class="col-md-7 detail-search">'+
            '<h5><a href="detail.html?id='+listRoom[i].id+'">'+listRoom[i].title+'</a></h5>'+
            '<p>Address<i class="fa fa-map-marker iconmap"></i>: '+listRoom[i].address.name+','+listRoom[i].address.town.name+','+listRoom[i].address.town.province.name+'</p>'+
            '<p>Street: '+listRoom[i].detailAddress+'</p>'+
            '<p>Price: '+listRoom[i].price+'.đ/PreNight</p>'+
            '<p> <i class="fa fa-clock"></i>'+listRoom[i].createdDate.split(".")[0]+'</p>'+
            '</div>'+
            '</div>'+
            '</div>'
    }
    document.getElementById("list-post-full").innerHTML = main
    document.getElementById("numberTin").innerHTML = ' - '+listRoom.length +' Rooms'
}

async function loadAddressUpdateUser(idtinh, idhuyen, idxa) {
    var urladd = 'http://'+urlFirst+'/api/public/province';
    const response = await fetch(urladd, {
        method: 'GET',
        headers: new Headers({

        })
    });
    var province = await response.json();

    var tinh = document.getElementById("tinh");
    var huyen = document.getElementById("huyen");
    var xa = document.getElementById("xa");

    var pro = null
    console.log(province)
    for (i = 0; i < province.length; i++) {
        var option = document.createElement("option");
        option.text = province[i].name;
        option.value = province[i].id;
        tinh.add(option);
        if(province[i].id == idtinh){
            pro = province[i]
        }
    }
    document.getElementById("tinh").value = idtinh

    huyen.innerHTML = '';
    var urlahuyen = 'http://'+urlFirst+'/api/public/town?id='+idtinh;
    const res = await fetch(urlahuyen, {
        method: 'GET',
        headers: new Headers({
        })
    });
    var town = await res.json();
    for (i = 0; i < town.length; i++) {
        var option = document.createElement("option");
        option.text = town[i].name;
        option.value = town[i].id;
        huyen.add(option);
    }
    document.getElementById("huyen").value = idhuyen

    xa.innerHTML = '';
    var urlxa = 'http://'+urlFirst+'/api/public/village?id='+idhuyen;
    const resp = await fetch(urlxa, {
        method: 'GET',
        headers: new Headers({
        })
    });
    var village = await resp.json();
    for (i = 0; i < village.length; i++) {
        var option = document.createElement("option");
        option.text = village[i].name;
        option.value = village[i].id;
        xa.add(option);
    }
    document.getElementById("xa").value = idxa
}


async function updateUser(){
    var uploadimg = 'http://'+urlFirst+'/api/public/upload';
    const filePath = document.getElementById('file')
    const formData = new FormData()
    formData.append("file", filePath.files[0])
    const response = await fetch(uploadimg, {
        method: 'POST',
        headers: new Headers({

        }),
        body: formData
    });
    if(response.status < 300){
        linkimage = await response.text();
    }
    var phone = document.getElementById("phone").value
    var email = document.getElementById("email").value;
    var xa = document.getElementById("xa").value;
    if(email === "" && phone === ""){
        alert("Data cannot be left blank")
        return;
    }
    if(!isPhone(phone)) {
        alert('Erroneous phone format!');
        return;
    }
    if(!isEmail(email)) {
        alert('Erroneous email format!');
        return;
    }

    if(email === "" ){
        alert("Email can't be left blank!")
        return;
    }
    if(phone === "" ){
        alert("Phone can't be left blank!")
        return;
    }

    var user = {
        "email":email,
        "phone":phone,
        "avatar":linkimage,
        "village":{
            "id":xa
        }
    }
    var url = 'http://'+urlFirst+'/api/user/updateUser';
    const res = await fetch(url, {
        method: 'POST',
        headers: new Headers({
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        }),
        body: JSON.stringify(user)
    });
    if(res.status < 300){
        swal({
                title: "Notification",
                text: "Update information success!",
                type: "success"
            },
            function(){
                window.location.reload()
            });
    }
    else{
        swal({
                title: "Notification",
                text: "Update information error!",
                type: "error"
            },
            function(){
                window.location.reload()
            });
    }
}

async function changePassWord(){
    var token = localStorage.getItem("token");
    var old = document.getElementById("oldpass").value
    var newP = document.getElementById("newpass").value;
    var reNew = document.getElementById("renewpass").value;

    if(old == "" && newP == "" && reNew == ""){
        alert("Data cannot be left blank !");
        return;
    }
    if(old .length < 6 || newP .length < 6 || reNew .length < 6){
        alert("Password must include at least 5 characters!")
        return;
    }
    if(newP != reNew){
        alert("password does not match !");
        return;
    }
    if(reNew == "") {
        alert("Confirm password cannot be left blank!");
        return;
    }
    var url = 'http://'+urlFirst+'/api/user/updatePasswordUser?old='+old+"&new="+newP;
    const response = await fetch(url, {
        method: 'POST',
        headers: new Headers({
            'Authorization': 'Bearer ' + token
        })
    });
    if (response.status < 300) {
        swal({
                title: "Notification!",
                text: "Change password successful",
                type: "success"
            },
            function(){
                window.location.reload()
            });
    }
    else {
        swal({
                title: "Notification!",
                text: "Change password failed, invalid password",
                type: "error"
            },
            function(){ });
    }
}