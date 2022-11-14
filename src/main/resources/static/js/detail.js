async function loadDetailRoom() {
    var id = window.location.search.split('=')[1];
    var url = 'http://' + urlFirst + ':8080/api/public/detailRoomForUser?id=' + id
    const res = await fetch(url, {
        method: 'GET',
        headers: new Headers({
        })
    })
    room = await res.json();
    console.log(room)
    document.getElementById("title-name-detail").innerHTML = room.title
    document.getElementById("tinh-detail").innerHTML = room.address.town.province.name
    document.getElementById("huyen-detail").innerHTML = room.address.town.name
    document.getElementById("xa-detail").innerHTML = ' >'+ room.address.name
    document.getElementById("giaphong-detail").innerHTML = room.price+'.đ'
    document.getElementById("area-detail").innerHTML = room.area+' mét vuông'
    document.getElementById("datcoc-detail").innerHTML = room.deposit+'.đ'
    document.getElementById("succhua").innerHTML = room.quantity+ ' '+room.sex
    document.getElementById("electricity").innerHTML = room.electricity+ '/số'
    document.getElementById("water").innerHTML = room.water+ '/khối'
    document.getElementById("wifi").innerHTML = room.wifi+ '/tháng'
    document.getElementById("diachicuthe").innerHTML = room.detailAddress+', '+room.address.name+', '+room.address.town.name+', '+room.address.town.province.name
    document.getElementById("img_avatar_detail").src = room.user.avatar
    document.getElementById("user-chuphong").innerHTML = room.user.username + ' Sđt: '+room.user.phone
    document.getElementById("user-chuphong").href = 'profile?id='+room.user.id
    document.getElementById("ngaydang-detail").innerHTML = 'Ngày đăng: '+ room.censorshipDate.split("T")[0]
    document.getElementById("succhuavua").innerHTML = room.quantity+' nguời'
    document.getElementById("succhuachat").innerHTML = Number(room.quantity + 1) +' nguời'
    document.getElementById("motachitiet").innerHTML = room.description
    document.getElementById("linkchat").href = 'chat?id='+room.user.id
    var main = ''
    for(i=0; i<room.utilities.length; i++){
        main += '<div class="col-sm-3">'+
                    '<li>'+
                        '<i class="'+room.utilities[i].icon+'"></i> '+room.utilities[i].name+''+
                    '</li>'+
                '</div>'
    }
    document.getElementById("list-tienich_detail-row").innerHTML = main

    const resp = await fetch('http://'+urlFirst+':8080/api/public/imageByRoom?id=' + room.id, { method: 'GET' })
    var listImage = await resp.json();
    console.log(listImage)
    document.getElementById("anh-con-lai").innerHTML = '+' +Number(listImage.length-1)
    for(i=0; i<listImage.length; i++){
        if(i==0){
            document.getElementById("img_0").src = listImage[i].link
        }
        if(i==1){
            document.getElementById("img_2").src = listImage[i].link
        }
    }
}