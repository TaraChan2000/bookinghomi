var token = localStorage.getItem("token");
function formatmoney(money) {
    var VND = new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND',
    });
    return VND.format(money);
}
async function loadRequestSuccess() {
    var url = 'http://'+urlFirst+'/api/user/requestByUserNotOnwer?type='
    const res = await fetch(url+'1', {
        method: 'GET',
        headers: new Headers({
            'Authorization': 'Bearer ' + token
        })
    })
    var list = await res.json();
    var main = ''
    for(i=0; i< list.length; i++){
        main += '<tr>'+
            '<td>'+Number(i+1)+'</td>'+
            '<td><img src="'+list[i].room.banner+'" style="width: 130px;"></td>'+
            '<td>'+list[i].fromDate+'</td>'+
            '<td>'+list[i].toDate+'</td>'+
            '<td>'+list[i].createdDate+'</td>'+
            '<td><a href="detail?id='+list[i].room.id+'">'+list[i].room.title+'</a></td>'+
            '<td>'+formatmoney(list[i].room.price)+'</td>'+
            '</tr>';
    }
    document.getElementById("listSchedule").innerHTML = main
    document.getElementById("countdaduyet").innerText = '('+list.length+')'
    $('#example').DataTable();
}


async function loadRequestWaiting() {
    var url = 'http://'+urlFirst+'/api/user/requestByUserNotOnwer?type='
    const res = await fetch(url+'0', {
        method: 'GET',
        headers: new Headers({
            'Authorization': 'Bearer ' + token
        })
    })
    var list = await res.json();
    console.log(list)
    var main = ''
    for(i=0; i< list.length; i++){
        main += '<tr>'+
            '<td>'+Number(i+1)+'</td>'+
            '<td><img src="'+list[i].room.banner+'" style="width: 130px;"></td>'+
            '<td>'+list[i].fromDate+'</td>'+
            '<td>'+list[i].toDate+'</td>'+
            '<td>'+list[i].createdDate+'</td>'+
            '<td><a href="detail?id='+list[i].room.id+'">'+list[i].room.title+'</a></td>'+
            '<td>'+formatmoney(list[i].room.price)+'</td>'+
            '<td><button class="btn btn-danger" onclick="huy('+list[i].id+')">Delete</button></td>'+
            '</tr>';
    }
    document.getElementById("listSchedulewait").innerHTML = main
    document.getElementById("countdangcho").innerText = '('+list.length+')'
    $('#examples').DataTable();
}



async function huy(id) {
    var url = 'http://'+urlFirst+'/api/user/deleteRequest?id='+id
    const res = await fetch(url, {
        method: 'POST',
        headers: new Headers({
            'Authorization': 'Bearer ' + token
        })
    })
    if(res.status < 300){
        swal({
                title: "Notification",
                text: "Delete successful!",
                type: "success"
            },
            function(){
                window.location.reload()
            });
    }

}



function dayOfWeek(num){
    if(num == 0){
        return 'Sunday'
    }
    if(num == 1){
        return 'Monday '
    }
    if(num == 2){
        return 'Tuesday '
    }
    if(num == 3){
        return 'Wednesday '
    }
    if(num == 4){
        return 'Thursday '
    }
    if(num == 5){
        return 'Friday '
    }
    if(num == 6){
        return 'Saturday '
    }
}


async function loadRequestSuccessByOwner() {
    var url = 'http://'+urlFirst+'/api/user/requestByUserOnwer?type='
    const res = await fetch(url+'1', {
        method: 'GET',
        headers: new Headers({
            'Authorization': 'Bearer ' + token
        })
    })
    var list = await res.json();
    var main = ''
    for(i=0; i< list.length; i++){
        main += '<tr>'+
            '<td>'+Number(i+1)+'</td>'+
            '<td><img src="'+list[i].room.banner+'" style="width: 130px;"></td>'+
            '<td>'+list[i].fromDate+'</td>'+
            '<td>'+list[i].toDate+'</td>'+
            '<td>'+list[i].createdDate+'</td>'+
            '<td><a href="detail?id='+list[i].room.id+'">'+list[i].room.title+'</a></td>'+
            '<td><a href="profile?id='+list[i].userReques.id+'">'+list[i].userReques.username+'</a></td>'+
            '<td>'+formatmoney(list[i].room.price)+'</td>'+
            '<td><button class="btn btn-danger" onclick="huyOwner('+list[i].id+')">Delete</button></td>'+
            '</tr>';
    }
    document.getElementById("listSchedulesuccess").innerHTML = main
    document.getElementById("countdaduyetowner").innerText = '('+list.length+')'
    $('#example').DataTable();
}

async function loadRequestWaitingByOwner() {
    var url = 'http://'+urlFirst+'/api/user/requestByUserOnwer?type='
    const res = await fetch(url+'0', {
        method: 'GET',
        headers: new Headers({
            'Authorization': 'Bearer ' + token
        })
    })
    var list = await res.json();
    console.log(list)
    var main = ''
    for(i=0; i< list.length; i++){
        main += '<tr>'+
            '<td>'+Number(i+1)+'</td>'+
            '<td><img src="'+list[i].room.banner+'" style="width: 130px;"></td>'+
            '<td>'+list[i].fromDate+'</td>'+
            '<td>'+list[i].toDate+'</td>'+
            '<td>'+list[i].createdDate+'</td>'+
            '<td><a href="detail?id='+list[i].room.id+'">'+list[i].room.title+'</a></td>'+
            '<td><a href="profile?id='+list[i].userReques.id+'">'+list[i].userReques.username+'</a></td>'+
            '<td>'+formatmoney(list[i].room.price)+'</td>'+
            '<td><button class="btn btn-danger" onclick="huyOwner('+list[i].id+')">Delete</button></td>'+
            '<td><button class="btn btn-success" onclick="confirm('+list[i].id+')">Confirm</button></td>'+
            '</tr>';
    }
    document.getElementById("listSchedulewaitOwner").innerHTML = main
    document.getElementById("countdangchoowner").innerText = '('+list.length+')'
    $('#examples').DataTable();
}

async function huyOwner(id) {
    var url = 'http://'+urlFirst+'/api/user/deleteRequestByOwner?id='+id
    const res = await fetch(url, {
        method: 'POST',
        headers: new Headers({
            'Authorization': 'Bearer ' + token
        })
    })
    if(res.status < 300){
        swal({
                title: "Notification",
                text: "Delete successful!",
                type: "success"
            },
            function(){
                window.location.reload()
            });
    }
}

async function confirm(id) {
    var url = 'http://'+urlFirst+'/api/user/Acceptrequest?id='+id
    const res = await fetch(url, {
        method: 'POST',
        headers: new Headers({
            'Authorization': 'Bearer ' + token
        })
    })
    if(res.status < 300){
        swal({
                title: "Notification",
                text: "Confirm request successful!",
                type: "success"
            },
            function(){
                window.location.reload()
            });
    }

}