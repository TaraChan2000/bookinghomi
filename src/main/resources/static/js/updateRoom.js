var room = null
var listImageRoom = null;
async function loadDetailRoomUpdate() {
    var token = localStorage.getItem("token");
    var id = window.location.search.split('=')[1];
    var url = 'http://' + urlFirst + ':8080/api/public/detailRoomForAll?id=' + id
    const res = await fetch(url, {
        method: 'GET',
        headers: new Headers({
        })
    })
    room = await res.json();

    const resps = await fetch('http://'+urlFirst+':8080/api/userlogged', {
        method: 'POST',
        headers: new Headers({
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json'
        })
    })
    var user = await resps.json();
    if(user.id != room.user.id){
        alert("bạn không đủ quyền!")
        window.location.replace("http://www.w3schools.com");
        return
    }
    console.log(room)
    var radios = document.getElementsByName('sex');
    var gioitinhs;
    for (var i = 0, length = radios.length; i < length; i++) {
        if (radios[i].value == room.sex) {
            radios[i].checked = true
            break;
        }
    }
    for(i=0; i<room.utilities.length; i++){

    }
    var listUtility = document.getElementsByClassName("bike");
    for (i = 0; i < listUtility.length; i++) {
        for(j=0; j<room.utilities.length; j++){
            if(listUtility[i].value == room.utilities[j].id){
                listUtility[i].checked = true
            }
        }
    }

    document.getElementById("tieude").value = room.title
    document.getElementById("loaiphong").value = room.typeRoom.id
    document.getElementById("succhua").value = room.quantity
    document.getElementById("dientich").value = room.area
    document.getElementById("giathue").value = room.price
    document.getElementById("datcoc").value = room.deposit
    document.getElementById("tiendien").value = room.electricity
    document.getElementById("tiennuoc").value = room.water
    document.getElementById("wifi").value = room.wifi
    loadAddressUpdate(room.address.town.province.id, room.address.town.id, room.address.id)
    document.getElementById("tenduong").value = room.detailAddress
    document.getElementById("mota").value = room.description


    // load anh
    const resp = await fetch('http://'+urlFirst+':8080/api/public/imageByRoom?id=' + room.id, { method: 'GET' })
    var listImageRoom = await resp.json();
    var mains = '<div class="col-md-12"><p>Ảnh phòng đã đăng</p></div>'
    for(i=0; i<listImageRoom.length; i++){
        mains += '<div class="col-md-4" style="margin-top: 10px">'+
            '<img src="'+listImageRoom[i].link+'" style="width: 100%;height: 100px;">'+
            '<button onclick="deleteImage('+listImageRoom[i].id+')" class="btn-danger col-md-12">xóa</button>'+
            '</div>'
    }
    document.getElementById("listImageUpdate").innerHTML = mains
}

async function deleteImage(idImage){
    var token = localStorage.getItem("token");
    if (window.confirm('Bạn muốn xóa ảnh này? ảnh được xóa sẽ không thể khôi phục')) {
        var urlAccount = 'http://'+urlFirst+':8080/api/user/deleteImageRoom?id='+idImage;
        const response = await fetch(urlAccount, {
            method: 'GET',
            headers: new Headers({
                'Authorization': 'Bearer ' + token
            })
        });
        if(response.status<300){
            alert("đã xóa ảnh");
            location.reload()
        }
    }
}

async function uploadRoom() {

    var token = localStorage.getItem("token");

    var urlAccount = 'http://'+urlFirst+':8080/api/userlogged';
    const response = await fetch(urlAccount, {
        method: 'POST',
        headers: new Headers({
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json'
        })
    });
    var account = await response.json();
    if(account.numOfFree == 0 && account.money < 5000){
        alert("số lượt miễn phí đã hết, hãy nạp thêm tiền")
        return
    }

    document.getElementById("loading_uploadroom").style.width = '30%'
    const listLink = []
    var urlUpload = 'http://'+urlFirst+':8080/api/public/upload';
    for (i = 0; i < listFile.length; i++) {
        const formData = new FormData()
        formData.append("file", listFile[i]);
        const response = await fetch(urlUpload, {
            method: 'POST',
            headers: new Headers({

            }),
            body: formData
        });
        var linkimage = await response.text();
        listLink.push(linkimage)
    }

    for (i = 0; i < listLink.length; i++) {
        console.log(listLink[i])
    }
    var listUtilities = []
    var listUtility = document.getElementsByClassName("bike");
    for (i = 0; i < listUtility.length; i++) {
        if (listUtility[i].checked == true) {
            var u = {
                "id": listUtility[i].value
            }
            listUtilities.push(u)
        }
    }
    var radios = document.getElementsByName('sex');
    var gioitinhs;
    for (var i = 0, length = radios.length; i < length; i++) {
        if (radios[i].checked) {
            gioitinhs = radios[i].value
            break;
        }
    }

    var loaiphong = document.getElementById("loaiphong").value
    var succhua = document.getElementById("succhua").value
    var gioitinh = gioitinhs
    var dientich = document.getElementById("dientich").value
    var giathue = document.getElementById("giathue").value
    var datcoc = document.getElementById("datcoc").value
    var tiendien = document.getElementById("tiendien").value
    var tiennuoc = document.getElementById("tiennuoc").value
    var wifi = document.getElementById("wifi").value
    var tenduong = document.getElementById("tenduong").value
    var tieude = document.getElementById("tieude").value
    var mota = document.getElementById("mota").value
    var xa = document.getElementById("xa").value

    var rooms = {
        "id": room.id,
        "title": tieude,
        "price": giathue,
        "sex": gioitinh,
        "quantity": succhua,
        "deposit": datcoc,
        "area": dientich,
        "description": mota,
        "electricity": tiendien,
        "water": tiennuoc,
        "wifi": wifi,
        "actived":room.actived,
        "deleted": room.deleted,
        "roomStatus": {
            "id": 1
        },
        "address": {
            "id": xa
        },
        "detailAddress": tenduong,
        "typeRoom": {
            "id": loaiphong
        },
        "utilities": listUtilities
    }

    const res = await fetch('http://'+urlFirst+':8080/api/user/updaterooms', {
        method: 'POST',
        headers: new Headers({
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json',
        }),
        body: JSON.stringify(rooms)
    })
    if(res.status == 500){
        alert("bạn không đủ quyền update")
        document.getElementById("loading_uploadroom").style.width = '0%'
        return
    }
    var roomResult = await res.json();
    console.log(roomResult)
    if (res.status < 300) {
        for (i = 0; i < listLink.length; i++) {
            var roomImage = {
                "link": listLink[i],
                "room": {
                    "id": roomResult.id
                }
            }
            const resp = await fetch('http://'+urlFirst+':8080/api/user/roomImage', {
                method: 'POST',
                headers: new Headers({
                    'Authorization': 'Bearer ' + token,
                    'Content-Type': 'application/json',
                }),
                body: JSON.stringify(roomImage)
            })
        }

        alert("update phòng thành công!")
    }

    else if (res.status >= 300) {
        alert("update phòng thất bại")
    }

    document.getElementById("loading_uploadroom").style.width = '0%'
}












async function loadAddressUpdate(idtinh, idhuyen, idxa) {
    var urladd = 'http://'+urlFirst+':8080/api/public/province';
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

    var hu = null
    for(i=0; i< pro.towns.length; i++){
        var option = document.createElement("option");
        option.text = pro.towns[i].name;
        option.value = pro.towns[i].id;
        huyen.add(option);
        if(pro.towns[i].id == idhuyen){
            hu = pro.towns[i]
        }
    }
    document.getElementById("huyen").value = idhuyen

    for(i=0; i<hu.villages.length; i++){
        var option = document.createElement("option");
        option.text = hu.villages[i].name;
        option.value = hu.villages[i].id;
        xa.add(option);
    }
    document.getElementById("xa").value = idxa

    tinh.onchange = function () {
        huyen.innerHTML = '';
        for (i = 0; i < province.length; i++) {
            if (Number(province[i].id) === Number(tinh.value)) {
                for (j = 0; j < province[i].towns.length; j++) {
                    var option = document.createElement("option");
                    option.text = province[i].towns[j].name;
                    option.value = province[i].towns[j].id;
                    huyen.add(option);
                }
            }
        }
    }

    huyen.onchange = function () {
        xa.innerHTML = '';
        for (i = 0; i < province.length; i++) {
            if (Number(province[i].id) === Number(tinh.value)) {
                for (j = 0; j < province[i].towns.length; j++) {
                    if (Number(province[i].towns[j].id) === Number(huyen.value)) {
                        console.log(province[i].towns[j])
                        for (k = 0; k < province[i].towns[j].villages.length; k++) {
                            var option = document.createElement("option");
                            option.text = province[i].towns[j].villages[k].name;
                            option.value = province[i].towns[j].villages[k].id;
                            xa.add(option);
                        }
                    }
                }
            }
        }
    }

}