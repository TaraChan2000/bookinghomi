var listRoom = null
async function loadAllRoom() {
    var token = localStorage.getItem("token");
    const res = await fetch('http://'+urlFirst+'/api/admin/getAllRoom', {
        method: 'GET',
        headers: new Headers({
            'Authorization': 'Bearer ' + token
        })
    })
    listRoom = await res.json();
    var main = '';
    var buttonDuyet;
    for (i = 0; i < listRoom.length; i++) {
        var links = listRoom[i].banner;
        if(listRoom[i].actived == 0){
            buttonDuyet = '<button class="btn-danger" onclick="duyet('+listRoom[i].id+')">Confirm</button>'
        }
        else if(listRoom[i].actived == 1){
            buttonDuyet = '<button class="btn-success" onclick="duyet('+listRoom[i].id+')">Unconfirm</button>'
        }
        main += '<tr>'+
            '<td><img class="imgroom_admin" src="'+links+'" ></td>'+
            '<td>'+listRoom[i].user.username+'</td>'+
            '<td>'+formatmoney(listRoom[i].price)+'</td>'+
            '<td>'+listRoom[i].title+'</td>'+
            '<td>'+listRoom[i].detailAddress+','+listRoom[i].address.name+','+listRoom[i].address.town.name+'</td>'+
            '<td>'+listRoom[i].area+' m2</td>'+
            '<td>'+listRoom[i].createdDate+'</td>'+
            '<td>'+buttonDuyet+'</td>'+
            '<td><a href="../detail?id='+listRoom[i].id+'"><i class="fa fa-info-circle" style="font-size:24px"></i> </a></td>'+
            '</tr>'
        // console.log(image)
    }
    document.getElementById("listRoom").innerHTML = main;
    document.getElementById("totalRoomA").innerHTML = listRoom.length;
    const datatablesSimple = document.getElementById('datatablesSimple');
    $('#example').DataTable();
}
function formatmoney(money) {
    var VND = new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND',
    });
    return VND.format(money);
}
async function filterByTypeRoom(){
    var main = '';
    var buttonDuyet;
    var values = document.getElementById("filterTypeRoom").value
    var num = 0;
    for (i = 0; i < listRoom.length; i++) {
        var links = listRoom[i].banner;;
        if(listRoom[i].actived == 0){
            buttonDuyet = '<button class="btn-danger" onclick="duyet('+listRoom[i].id+')">Confirm</button>'
        }
        else if(listRoom[i].actived == 1){
            buttonDuyet = '<button class="btn-success" onclick="duyet('+listRoom[i].id+')">Unconfirm</button>'
        }
        if(values == 0){
            main += '<tr>'+
                '<td><img class="imgroom_admin" src="'+links+'" ></td>'+
                '<td>'+listRoom[i].user.username+'</td>'+
                '<td>'+formatmoney(listRoom[i].price)+'</td>'+
                '<td>'+listRoom[i].title+'</td>'+
                '<td>'+listRoom[i].detailAddress+','+listRoom[i].address.name+','+listRoom[i].address.town.name+'</td>'+
                '<td>'+listRoom[i].area+' m2</td>'+
                '<td>'+listRoom[i].createdDate+'</td>'+
                '<td>'+buttonDuyet+'</td>'+
                '<td><a href="../detail?id='+listRoom[i].id+'"> <i class="fa fa-info-circle" style="font-size:24px"></i></a></td>'+
                '</tr>'
            ++num
        }
        else if(values == 1){
            if(listRoom[i].actived == 0 && listRoom[i].deleted == 0){
                main += '<tr>'+
                    '<td><img class="imgroom_admin" src="'+links+'" ></td>'+
                    '<td>'+listRoom[i].user.username+'</td>'+
                    '<td>'+listRoom[i].user.money+'</td>'+
                    '<td>'+listRoom[i].title+'</td>'+
                    '<td>'+listRoom[i].detailAddress+','+listRoom[i].address.name+','+listRoom[i].address.town.name+'</td>'+
                    '<td>'+listRoom[i].price+'</td>'+
                    '<td>'+listRoom[i].area+' m2</td>'+
                    '<td>'+listRoom[i].createdDate+'</td>'+
                    '<td>'+buttonDuyet+'</td>'+
                    '<td><a href="../detail.html?id='+listRoom[i].id+'"> <i class="fa fa-info-circle" style="font-size:24px"></i></a></td>'+
                    '</tr>'
                ++num
            }
        }
    }
    document.getElementById("listRoom").innerHTML = main;
    document.getElementById("totalRoomA").innerHTML = num
    const datatablesSimple = document.getElementById('datatablesSimple');
    $('#example').DataTable();
}


async function loadRoomByDate(){
    var num = 0;
    var start = document.getElementById("startRoomDate").value
    var end = document.getElementById("endRoomDate").value
    if(start != ''){
        document.getElementById("endRoomDate").disabled = false

        document.getElementById('endRoomDate').setAttribute('min', start);
        if(start > end){
            document.getElementById("endRoomDate").value = start
        }
    }
    else if(start== ''){
        document.getElementById("endRoomDate").disabled = true
    }

    if(start != '' && end != '' && start <= end){
        var main = '';
        var buttonDuyet;
        var values = document.getElementById("filterTypeRoom").value
        for (i = 0; i < listRoom.length; i++) {
            var links = listRoom[i].banner;;
            if(listRoom[i].actived == 0){
                buttonDuyet = '<button class="btn-danger" onclick="duyet('+listRoom[i].id+')">Confirm</button>'
            }
            else if(listRoom[i].actived == 1){
                buttonDuyet = '<button class="btn-success" onclick="duyet('+listRoom[i].id+')">Unconfirm</button>'
            }
            if(values == 0 || values == -1){
                if(listRoom[i].createdDate >= start && listRoom[i].createdDate <= end){
                    main += '<tr>'+
                        '<td><img class="imgroom_admin" src="'+links+'" ></td>'+
                        '<td>'+listRoom[i].user.username+'</td>'+
                        '<td>'+formatmoney(listRoom[i].price)+'</td>'+
                        '<td>'+listRoom[i].title+'</td>'+
                        '<td>'+listRoom[i].detailAddress+','+listRoom[i].address.name+','+listRoom[i].address.town.name+'</td>'+
                        '<td>'+listRoom[i].area+' m2</td>'+
                        '<td>'+listRoom[i].createdDate+'</td>'+
                        '<td>'+buttonDuyet+'</td>'+
                        '<td><a href="../detail?id='+listRoom[i].id+'"> <i class="fa fa-info-circle" style="font-size:24px"></i></a></td>'+
                        '</tr>'
                    ++num;
                }
            }
            else{
                if(listRoom[i].actived == 0 && listRoom[i].deleted == 0){
                    if(listRoom[i].createdDate >= start && listRoom[i].createdDate <= end){
                        main += '<tr>'+
                            '<td><img class="imgroom_admin" src="'+links+'" ></td>'+
                            '<td>'+listRoom[i].user.username+'</td>'+
                            '<td>'+formatmoney(listRoom[i].price)+'</td>'+
                            '<td>'+listRoom[i].title+'</td>'+
                            '<td>'+listRoom[i].detailAddress+','+listRoom[i].address.name+','+listRoom[i].address.town.name+'</td>'+
                            '<td>'+listRoom[i].area+' m2</td>'+
                            '<td>'+listRoom[i].createdDate+'</td>'+
                            '<td>'+buttonDuyet+'</td>'+
                            '<td><a href="../detail?id='+listRoom[i].id+'"> <i class="fa fa-info-circle" style="font-size:24px"></i></a></td>'+
                            '</tr>'
                        ++num
                    }
                }
            }
        }
        document.getElementById("listRoom").innerHTML = main;
        document.getElementById("totalRoomA").innerHTML = num;
        const datatablesSimple = document.getElementById('datatablesSimple');
        $('#example').DataTable();
    }

}

async function duyet(id){
    var token = localStorage.getItem("token");
    const res = await fetch('http://'+urlFirst+'/api/admin/activeOrUnactiveRoom?id='+id, {
        method: 'GET',
        headers: new Headers({
            'Authorization': 'Bearer ' + token
        })
    })
    if(res.status < 300){
        alert("Successful!")
        location.reload();
    }
}
