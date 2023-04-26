var room = null
var listImageRoom = null;
async function loadDetailRoomUpdate() {
    var token = localStorage.getItem("token");
    var id = window.location.search.split('=')[1];
    var url = 'http://' + urlFirst + '/api/public/detailRoomForAll?id=' + id
    const res = await fetch(url, {
        method: 'GET',
        headers: new Headers({
        })
    })
    room = await res.json();
    const resps = await fetch('http://'+urlFirst+'/api/userlogged', {
        method: 'POST',
        headers: new Headers({
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json'
        })
    })
    var user = await resps.json();
    if(user.id != room.user.id){
        alert("Access denied!")
        window.location.replace("trang-chu");
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
    document.getElementById("slphong").value = room.quantityRoom
    banners = room.banner
    document.getElementById("bannerupload").src = room.banner
    loadAddressUpdate(room.address.town.province.id, room.address.town.id, room.address.id)
    document.getElementById("tenduong").value = room.detailAddress
    tinyMCE.get('editor').setContent(room.description)


    // load anh
    const resp = await fetch('http://'+urlFirst+'/api/public/imageByRoom?id=' + room.id, { method: 'GET' })
    var listImageRoom = await resp.json();
    var mains = '<div class="col-md-12"><p>Room photo posted</p></div>'
    for(i=0; i<listImageRoom.length; i++){
        mains += '<div class="col-md-4" style="margin-top: 10px">'+
            '<img src="'+listImageRoom[i].link+'" style="width: 100%;height: 100px;">'+
            '<button onclick="deleteImage('+listImageRoom[i].id+')" class="btn-danger col-md-12">Delete</button>'+
            '</div>'
    }
    document.getElementById("listImageUpdate").innerHTML = mains
}

async function deleteImage(idImage){
    var token = localStorage.getItem("token");
    if (window.confirm('Do you want to delete this image? Deleted photos cannot be recovered')) {
        var urlAccount = 'http://'+urlFirst+'/api/user/deleteImageRoom?id='+idImage;
        const response = await fetch(urlAccount, {
            method: 'GET',
            headers: new Headers({
                'Authorization': 'Bearer ' + token
            })
        });
        if(response.status<300){
            alert("delete image successful");
            location.reload()
        }
    }
}
var banners =  ''
async function uploadRoom() {

    var token = localStorage.getItem("token");

    var urlAccount = 'http://'+urlFirst+'/api/userlogged';
    const response = await fetch(urlAccount, {
        method: 'POST',
        headers: new Headers({
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json'
        })
    });
    var account = await response.json();

    document.getElementById("loading_uploadroom").style.width = '30%'
    const listLink = []
    var urlUpload = 'http://'+urlFirst+'/api/public/upload';
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

    const filePath = document.getElementById('bannerimg')
    const formDatas = new FormData()
    formDatas.append("file", filePath.files[0]);
    const resp = await fetch(urlUpload, {
        method: 'POST',
        headers: new Headers({
        }),
        body: formDatas
    });
    if(resp.status < 300){
        banners = await resp.text();
    }

    var loaiphong = document.getElementById("loaiphong").value
    var succhua = document.getElementById("succhua").value
    var gioitinh = gioitinhs
    var dientich = document.getElementById("dientich").value
    var giathue = document.getElementById("giathue").value
    var tenduong = document.getElementById("tenduong").value
    var slphong = document.getElementById("slphong").value
    var tieude = document.getElementById("tieude").value
    var mota = tinyMCE.get('editor').getContent()
    var xa = document.getElementById("xa").value

    if(tieude === "" || dientich === "" || succhua === "" || giathue === ""){
        alert("Title can't be left blank")
        return;
    }
    if(tieude === "" ){
        alert("Title can't be left blank")
        return;
    }
    if(dientich === "" ){
        alert("Area can't be left blank")
        return;
    }
    if(succhua === "" ){
        alert("Capacity can't be left blank")
        return;
    }
    if(giathue === "" ){
        alert("Price can't be left blank")
        return;
    }
    if(slphong === "" ){
        alert("Quantity room can't be left blank")
        return;
    }
    if(succhua < 0 ){
        alert("Capacity is invalid!")
        return;
    }
    if(dientich < 0 ){
        alert("Area is invalid!")
        return;
    }
    if(giathue < 0 ){
        alert("Price is invalid!")
        return;
    }
    var rooms = {
        "id": room.id,
        "title": tieude,
        "price": giathue,
        "sex": gioitinh,
        "quantity": succhua,
        "area": dientich,
        "description": mota,
        "quantityRoom": slphong,
        "deleted": 0,
        "banner":banners,
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

    const res = await fetch('http://'+urlFirst+'/api/user/updaterooms', {
        method: 'POST',
        headers: new Headers({
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json',
        }),
        body: JSON.stringify(rooms)
    })
    if(res.status == 500){
        alert("Access denied")
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
            const resp = await fetch('http://'+urlFirst+'/api/user/roomImage', {
                method: 'POST',
                headers: new Headers({
                    'Authorization': 'Bearer ' + token,
                    'Content-Type': 'application/json',
                }),
                body: JSON.stringify(roomImage)
            })
        }

        swal({
            title: "Notification",
            text: "Update successful!",
            type: "success"
        },
        function(){
            window.location.replace("myPost")
        });
    }

    else if (res.status >= 300) {
        swal({
            title: "Notification",
            text: "Update error",
            type: "error"
        },
        function(){
            // window.location.reload();
        });
    }

    document.getElementById("loading_uploadroom").style.width = '0%'
}



async function loadAddressUpdate(idtinh, idhuyen, idxa) {
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