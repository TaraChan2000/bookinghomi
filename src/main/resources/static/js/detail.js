async function loadDetailRoom() {
    var id = window.location.search.split('=')[1];
    var url = 'http://' + urlFirst + '/api/public/detailRoomForUser?id=' + id
    const res = await fetch(url, {
        method: 'GET',
        headers: new Headers({
        })
    })
    room = await res.json();
    console.log(room)
    document.getElementById("description").innerHTML = room.description
    document.getElementById("room-title").innerHTML = room.title
    document.getElementById("price-detail").innerHTML = formatmoney(room.price)+'<span>/Pernight</span>'
    document.getElementById("area-detail").innerHTML = room.area +'m2'
    document.getElementById("area-detail").innerHTML = room.area +'m2'
    document.getElementById("max-detail").innerHTML = 'Max persion: '+room.quantity
    document.getElementById("name-owner").innerHTML = '<a href="profile?id='+room.user.id+'">'+room.user.username+'</a>'
    document.getElementById("phone").innerHTML = room.user.phone
    document.getElementById("chatlink").href = 'chat?id='+room.user.id
    if(room.quantityRoom > 0){
        document.getElementById("status").innerHTML = '<span style="color:green;">Still</span>'
    }
    else{
        document.getElementById("status").innerHTML = '<span style="color:green;">Still</span>'
    }

    var main = ''
    for(i=0; i<room.utilities.length; i++){
        main += room.utilities[i].name +', '
    }
    document.getElementById("service-detail").innerHTML = main

    const resp = await fetch('http://'+urlFirst+'/api/public/imageByRoom?id=' + room.id, { method: 'GET' })
    var listImage = await resp.json();
    var mainimg = ''
    for(i=0; i<listImage.length; i++){
        if(i==0){
            mainimg += ' <div class="carousel-item active"><img style="height:500px;width:100%" class="d-block w-100" src="'+listImage[i].link+'" alt="First slide"></div>'
        }
        else{
            mainimg += ' <div class="carousel-item"><img style="height:500px;width:100%" class="d-block w-100" src="'+listImage[i].link+'" alt="First slide"></div>'
        }
    }
    document.getElementById("listimg-detail").innerHTML = mainimg

}

async function loadSchedule() {
    var id = window.location.search.split('=')[1];
    var url = 'http://' + urlFirst + '/api/public/requestByRoom?id=' + id
    const res = await fetch(url, {
        method: 'GET',
        headers: new Headers({
        })
    })
    schedule = await res.json();
    var main = ''
    for(i=0; i<schedule.length; i++){
        main += ' <tr>'+
            '<td>'+schedule[i].fromDate+'</td>'+
            '<td>'+schedule[i].toDate+'</td>'+
            '<td>'+dayOfWeek(new Date(schedule[i].fromDate).getDay())+'</td>'+
            '</tr>'
    }
    document.getElementById("listSchedule").innerHTML = main
    $('#example').DataTable();
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

async function addOrder() {
    var id = window.location.search.split('=')[1];
    var url = 'http://' + urlFirst + '/api/user/AddrequestByUser';
    var token = localStorage.getItem("token");
    if(token === null){
        alert("Please login to perform this function");
        return;
    }
    var fromdate = document.getElementById("fromdate").value
    var todate = document.getElementById("todate").value

    var request = {
        "fromDate":fromdate,
        "toDate":todate,
        "room":{
            "id":id
        }
    }
    const resp = await fetch(url, {
        method: 'POST',
        headers: new Headers({
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json',
        }),
        body: JSON.stringify(request)
    })
    const stt = await resp.text();
    if(resp.status < 300){
        if(stt == '0'){
            swal({
                    title: "Notification",
                    text: "booking request sent successfully!",
                    type: "success"
                },
                function(){
                    window.location.reload()
                });
        }
        if(stt == '1'){
            swal({
                    title: "Notification",
                    text: "already booked during this time!",
                    type: "warning"
                },
                function(){
                    return;
                });
        }
    }
    else{
        swal({
                title: "Notification",
                text: "booking request sent error!",
                type: "error"
            },
            function(){
            });
    }
}

function formatmoney(money) {
    var USD = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    });
    return USD.format(money);
}