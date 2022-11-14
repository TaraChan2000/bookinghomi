async function loadAccount() {
    var id = window.location.search.split('=')[1];
    var user;
    var token = localStorage.getItem("token");
    if (id == null) {
        if (token === null) {
            window.location.replace("login")
        }
        else {
            const res = await fetch('http://'+urlFirst+':8080/api/userlogged', {
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
        const res = await fetch('http://'+urlFirst+':8080/api/public/findUserById?id=' + id, {
            method: 'GET',
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        })
        if (res.status > 300) {
            alert("không tìm thấy người dùng này!")
            window.location.replace("index.html")
        }
        user = await res.json();
        document.getElementById("div_btn_theodoi").innerHTML = '<button onclick="follow(' + id + ')" id="btn-theodoi" class="btn-warning fllow"><i class="fa fa-plus"></i>Theo dõi</button>'


        const resp = await fetch('http://'+urlFirst+':8080/api/user/followOfMe', {
            method: 'GET',
            headers: new Headers({
                'Authorization': 'Bearer ' + token,
                'Content-Type': 'application/json'
            })
        })

        var listFollow = await resp.json();
        for(i=0; i<listFollow.length; i++){
            if(Number(listFollow[i].me.id) === Number(id)){
                document.getElementById("div_btn_theodoi").innerHTML = '<button onclick="unfollow(' + listFollow[i].id + ')" id="btn-theodoi" class="btn-warning fllow"><i class="fa fa-check"></i>Hủy theo dõi</button>'
            }
        }
    }

    document.getElementById("avatar_profile").src = user.avatar
    document.getElementById("username_profile").innerHTML = user.username
    document.getElementById("tieudeten").innerHTML = 'Trang cá nhân của ' + user.username
    document.getElementById("ngaythamgia").innerHTML = user.created_date.split("T")[0]
    document.getElementById("diachi").innerHTML = user.village.name + ' - ' + user.village.town.name + ' - ' + user.village.town.province.name
}

async function dangtheodoi() {
    var id = window.location.search.split('=')[1];
    var token = localStorage.getItem("token");
    var theodois;
    var duoctheodois;
    if (id == null) {
        const res = await fetch('http://'+urlFirst+':8080/api/user/followMe', {
            method: 'GET',
            headers: new Headers({
                'Authorization': 'Bearer ' + token
            })
        })
        const resp = await fetch('http://'+urlFirst+':8080/api/user/followOfMe', {
            method: 'GET',
            headers: new Headers({
                'Authorization': 'Bearer ' + token
            })
        })

        duoctheodois = await res.json();
        theodois = await resp.json();
    }
    else{
        const res = await fetch('http://'+urlFirst+':8080/api/public/followOfAnotherPeople?id='+id, {
            method: 'GET',
            headers: new Headers({
            })
        })
        const resp = await fetch('http://'+urlFirst+':8080/api/public/followOfAnother?id='+id, {
            method: 'GET',
            headers: new Headers({
            })
        })

        duoctheodois = await res.json();
        theodois = await resp.json();
    }
    document.getElementById("duoctheodois").innerHTML = 'Có '+duoctheodois.length+' người theo dõi'
    document.getElementById("theodois").innerHTML = 'Đang theo dõi '+theodois.length+' người'

    var tdoi = '';
    var dtheodoi = '';
    for(i=0; i<theodois.length; i++){
        tdoi += '<li>'+
                    '<div>'+
                        '<div class="div_img_theodoi"><img src="'+theodois[i].me.avatar+'" class="img_theodoi"></div>'+
                        '<p class="username_theodoi"><a href="profile?id='+theodois[i].me.id+'">'+theodois[i].me.username+'</a></p>'+
                    '</div>'+
                '</li>'
    }
    for(i=0; i<duoctheodois.length; i++){
        dtheodoi += '<li>'+
                    '<div>'+
                        '<div class="div_img_theodoi"><img src="'+duoctheodois[i].followers.avatar+'" class="img_theodoi"></div>'+
                        '<p class="username_theodoi"><a href="profile?id='+duoctheodois[i].followers.id+'">'+duoctheodois[i].followers.username+'</a></p>'+
                    '</div>'+
                '</li>'
    }
    document.getElementById("ul_theodoi_profile").innerHTML = tdoi
    document.getElementById("ul_duoctheodoi_profile").innerHTML = dtheodoi
}

async function loadRoomProfile(){
    var id = window.location.search.split('=')[1];
    var token = localStorage.getItem("token");
    var listRoom;
    if (id == null) {
        const res = await fetch('http://'+urlFirst+':8080/api/user/roomOfMyProfile', {
            method: 'GET',
            headers: new Headers({
                'Authorization': 'Bearer ' + token
            })
        })
        listRoom = await res.json();
    }
    else{
        const res = await fetch('http://'+urlFirst+':8080/api/public/roomOfProfileUser?id='+id, {
            method: 'GET',
            headers: new Headers({
            })
        })
        listRoom = await res.json();
    }
    var main = '';
    if(listRoom.length < 1){
        document.getElementById("list-post-full").innerHTML = main
        document.getElementById("list-post-profile").innerHTML = '<svg fill="#ccc" width="100" height="100" id="Layer_1" xmlns="http://www.w3.org/2000/svg" viewBox="15.6 37.6 80 50"><path class="st0" d="M85.6 52.8s-5.1-7-13.2-6.6c-8.3-11.4-14.7-1.4-14.7-1.4-.6-.4-1.4-.6-2.2-.6-.8 0-1.5.2-2.2.6 0 0-6.4-10-14.7 1.4-8.1-.4-13.2 6.6-13.2 6.6-4.9 3-8.2 8.4-8.2 14.5 0 9.4 7.6 17 17 17 8.5 0 15.6-6.3 16.8-14.5 0 0 1.3 1.7 4.1 1.7s4.6-1.7 4.6-1.7C60.9 78 68 84.2 76.5 84.2c9.4 0 17-7.6 17-17 .3-6-3-11.4-7.9-14.4zM33.9 79.5c-6.4 0-11.6-5.2-11.6-11.6 0-6.4 5.2-11.6 11.6-11.6s11.6 5.2 11.6 11.6c.1 6.4-5.2 11.6-11.6 11.6zm42.9 0c-6.4 0-11.7-5.2-11.7-11.6 0-6.4 5.2-11.6 11.7-11.6 6.4 0 11.6 5.2 11.6 11.6 0 6.4-5.2 11.6-11.6 11.6z"></path><path class="st0" d="M26.9 66.9c-.4-1-.6-2-.7-3-1.2 2.1-1.5 4.7-.6 7.1 1.6 4.3 6.5 6.5 10.8 4.9.9-.3 1.7-.8 2.4-1.4-5 .4-10-2.5-11.9-7.6zM70.7 66.9c-.4-1-.6-2-.7-3-1.2 2.1-1.5 4.7-.6 7.1 1.6 4.3 6.5 6.5 10.8 4.9.9-.3 1.7-.8 2.4-1.4-5 .4-10-2.5-11.9-7.6z"></path></svg><div class="title-none"><p>Người này chưa có tin đăng cá nhân nào</p></div>'
    }
    for(i=0; i<listRoom.length; i++){
        const resp = await fetch('http://'+urlFirst+':8080/api/public/imageByRoom?id=' + listRoom[i].id, {method: 'GET'})
        var image = await resp.json();
        main += '<div class="col-md-12 signle-room-search">'+
                    '<div class="row">'+
                        '<div class="col-md-2">'+
                            '<a href="detail?id='+listRoom[i].id+'"><img class="image-search" src="'+image[0].link+'"></a>'+
                        '</div>'+
                        '<div class="col-md-7 detail-search">'+
                            '<h5><a href="detail?id='+listRoom[i].id+'">'+listRoom[i].title+'</a></h5>'+
                            '<p>Địa chỉ<i class="fa fa-map-marker iconmap"></i>: '+listRoom[i].address.name+','+listRoom[i].address.town.name+','+listRoom[i].address.town.province.name+'</p>'+
                            '<p>Đường: '+listRoom[i].detailAddress+'</p>'+
                            '<p>Giá: '+listRoom[i].price+'.đ/tháng</p>'+
                            '<p> <i class="fa fa-clock"></i>'+listRoom[i].createdDate.split(".")[0]+'</p>'+
                        '</div>'+
                    '</div>'+
                '</div>'
    }
    document.getElementById("list-post-full").innerHTML = main
    document.getElementById("numberTin").innerHTML = ' - '+listRoom.length +' tin'
}