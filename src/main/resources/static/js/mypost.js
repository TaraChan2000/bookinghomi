async function loadRoomThanhCong() {
    var token = localStorage.getItem("token");
    var listRoom;

    // tin thành công
    const res = await fetch('http://'+urlFirst+':8080/api/user/roomOfMyProfile', {
        method: 'GET',
        headers: new Headers({
            'Authorization': 'Bearer ' + token
        })
    })
    listRoom = await res.json();
    var main = '';
    for (i = 0; i < listRoom.length; i++) {
        const resp = await fetch('http://'+urlFirst+':8080/api/public/imageByRoom?id=' + listRoom[i].id, { method: 'GET' })
        var image = await resp.json();
        var links;
        for (j = 0; j < image.length; j++) {
            links = image[0].link
            break
        }
        main += '<div class="col-md-12 signle-room-search">' +
            '<div class="row">' +
            '<div class="col-md-3">' +
            '<a href="detail?id=' + listRoom[i].id + '"><img class="image-search" src="' + links + '"></a>' +
            '</div>' +
            '<div class="col-md-7 detail-search">' +
            '<h5><a href="detail?id=' + listRoom[i].id + '">' + listRoom[i].title + '</a></h5>' +
            '<p>Địa chỉ<i class="fa fa-map-marker iconmap"></i>: ' + listRoom[i].address.name + ',' + listRoom[i].address.town.name + ',' + listRoom[i].address.town.province.name + '</p>' +
            '<p>Đường: ' + listRoom[i].detailAddress + '</p>' +
            '<p>Giá: ' + listRoom[i].price + 'đ/tháng</p>' +
            '</div>' +
            '<div class="col-md-2 connect">' +
            '<button onclick="deleteOrRestore(' + listRoom[i].id + ')" class="btn btn-outline-danger btn-mypost"><i class="fa fa-trash"></i>Xóa tin</button>' +
            '<button class="btn btn-warning btn-mypost"><i class="fa fa-edit"></i><a style="color:#fff" href="updateRoom?id='+listRoom[i].id+'">sửa tin</a></button>' +
            '</div>' +
            '</div>' +
            '</div>'
    }
    document.getElementById("now").innerHTML = main
}


async function loadRoomChuaDuyet() {
    var token = localStorage.getItem("token");
    var listRoom;

    // tin chưa duyệt
    const res = await fetch('http://'+urlFirst+':8080/api/user/roomNotActiveOfMyProfile', {
        method: 'GET',
        headers: new Headers({
            'Authorization': 'Bearer ' + token
        })
    })
    listRoom = await res.json();
    var main = '';
    for (i = 0; i < listRoom.length; i++) {
        const resp = await fetch('http://'+urlFirst+':8080/api/public/imageByRoom?id=' + listRoom[i].id, { method: 'GET' })
        var image = await resp.json();
        var links;
        for (j = 0; j < image.length; j++) {
            links = image[0].link
            break
        }
        main += '<div class="col-md-12 signle-room-search">' +
            '<div class="row">' +
            '<div class="col-md-3">' +
            '<a href="detail?id=' + listRoom[i].id + '"><img class="image-search" src="' + links + '"></a>' +
            '</div>' +
            '<div class="col-md-7 detail-search">' +
            '<h5><a href="detail?id=' + listRoom[i].id + '">' + listRoom[i].title + '</a></h5>' +
            '<p>Địa chỉ<i class="fa fa-map-marker iconmap"></i>: ' + listRoom[i].address.name + ',' + listRoom[i].address.town.name + ',' + listRoom[i].address.town.province.name + '</p>' +
            '<p>Đường: ' + listRoom[i].detailAddress + '</p>' +
            '<p>Giá: ' + listRoom[i].price + 'đ/tháng</p>' +
            '</div>' +
            '<div class="col-md-2 connect">' +
            '<button class="btn btn-warning btn-mypost"><i class="fa fa-edit"></i><a style="color:#fff" href="updateRoom?id='+listRoom[i].id+'">sửa tin</a></button>' +
            '</div>' +
            '</div>' +
            '</div>'
    }
    document.getElementById("deny").innerHTML = main
}

async function loadRoomDaXoa() {
    var token = localStorage.getItem("token");
    var listRoom;

    // tin đã xóa
    const res = await fetch('http://'+urlFirst+':8080/api/user/roomDeletedOfMyProfile', {
        method: 'GET',
        headers: new Headers({
            'Authorization': 'Bearer ' + token
        })
    })
    listRoom = await res.json();
    var main = '';
    for (i = 0; i < listRoom.length; i++) {
        const resp = await fetch('http://'+urlFirst+':8080/api/public/imageByRoom?id=' + listRoom[i].id, { method: 'GET' })
        var image = await resp.json();
        var links;
        for (j = 0; j < image.length; j++) {
            links = image[0].link
            break
        }
        main += '<div class="col-md-12 signle-room-search">' +
            '<div class="row">' +
            '<div class="col-md-3">' +
            '<a href="detail?id=' + listRoom[i].id + '"><img class="image-search" src="' + links + '"></a>' +
            '</div>' +
            '<div class="col-md-7 detail-search">' +
            '<h5><a href="detail?id=' + listRoom[i].id + '">' + listRoom[i].title + '</a></h5>' +
            '<p>Địa chỉ<i class="fa fa-map-marker iconmap"></i>: ' + listRoom[i].address.name + ',' + listRoom[i].address.town.name + ',' + listRoom[i].address.town.province.name + '</p>' +
            '<p>Đường: ' + listRoom[i].detailAddress + '</p>' +
            '<p>Giá: ' + listRoom[i].price + 'đ/tháng</p>' +
            '</div>' +
            '<div class="col-md-2 connect">' +
            '<button onclick="deleteOrRestore(' + listRoom[i].id + ')" class="btn btn-outline-danger btn-mypost"><i class="fa fa-trash"></i>Khôi phục</button>' +
            '<button class="btn btn-warning btn-mypost"><i class="fa fa-edit"></i><a style="color:#fff" href="updateRoom?id='+listRoom[i].id+'">sửa tin</a></button>' +
            '</div>' +
            '</div>' +
            '</div>'
    }
    document.getElementById("remove").innerHTML = main
}

async function deleteOrRestore(id) {
    var token = localStorage.getItem("token");

    const res = await fetch('http://'+urlFirst+':8080/api/user/deleteOrRestore?id=' + id, {
        method: 'POST',
        headers: new Headers({
            'Authorization': 'Bearer ' + token
        })
    })
    location.reload()
}

async function loadUser() {
    var token = localStorage.getItem("token");
    var urlAccount = 'http://'+urlFirst+':8080/api/userlogged';
    const res = await fetch(urlAccount, {
        method: 'POST',
        headers: new Headers({
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json'
        })
    });
    var account = await res.json();
    document.getElementById("infor-name").innerHTML = account.username
    document.getElementById("avatar-profile-post").src = account.avatar
    document.getElementById("soduhientai").innerHTML = account.money + '.đ'
}

async function loadCountRoom() {
    var token = localStorage.getItem("token");
    var urlAccount = 'http://'+urlFirst+':8080/api/user/countRoomProfile';
    const res = await fetch(urlAccount, {
        method: 'GET',
        headers: new Headers({
            'Authorization': 'Bearer ' + token
        })
    });
    var map = await res.json();
    document.getElementById("num_danghienthi").innerHTML = '(' + map.daduyet + ')'
    document.getElementById("count_chuaduyet").innerHTML = '(' + map.chuaduyet + ')'
    document.getElementById("count_daxoa").innerHTML = '(' + map.daxoa + ')'
}

async function loadPayLevel() {
    var url = 'http://'+urlFirst+':8080/api/public/paylevel';
    const res = await fetch(url, {
        method: 'GET',
        headers: new Headers({
        })
    });
    var paylevel = await res.json();
    var main = '';
    var checks = ''
    for (i = 0; i < paylevel.length; i++) {
        if (i == 0) {
            checks = 'checked="checked"'
        }
        else {
            checks = ''
        }
        main += '<label class="containerfull">' + paylevel[i].amount + ' <img src="image/naptiennull.png" class="naptiennull">' +
            '<input value="' + paylevel[i].amount + '" type="radio" ' + checks + ' name="money">' +
            '<span class="checkmarks"></span>' +
            '</label>'
    }

    document.getElementById("listPaylevel").innerHTML = main
}

async function initPayment() {
    // var currentUrl = document.URL
    var currentUrl = 'http://'+urlFirst+':8080/returnPaymentUrl'
    var amount = document.querySelector('input[name="money"]:checked').value;
    if (window.confirm('Bạn muốn nạp mức tiền này?')) {
        var token = localStorage.getItem("token");
        var url = 'http://'+urlFirst+':8080/api/user/urlpayment';
        var payment = {
            "amount":amount,
            "content":"nạp tiền vào tài khoản",
            "returnUrl":currentUrl,
            "notifyUrl":currentUrl
        }
        const res = await fetch(url, {
            method: 'POST',
            headers: new Headers({
                'Authorization': 'Bearer ' + token, 
                'Content-Type': 'application/json'
            }),
            body: JSON.stringify(payment)
        });
        var urlReturn = await res.json(); 
        window.open(urlReturn.url, '_blank');
    }
   
}