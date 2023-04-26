async function findAllUtilitiesSearch() {
    var url = 'http://'+urlFirst+'/api/public/utilities';
    const response = await fetch(url, {
        method: 'GET',
        headers: new Headers({
        })
    });
    var listutility = await response.json();
    var main = '';
    for (i = 0; i < listutility.length; i++) {
        main += '<li>'+
            '<label class="containers">'+
            '<div class="lb"><i class="'+listutility[i].icon+'"></i>'+listutility[i].name+'</div>'+
            '<input value="'+listutility[i].id+'" type="checkbox" class="toilet">'+
            '<span class="checkmark"></span>'+
            '</label>'+
            '</li>';
    }
    document.getElementById("list-tienich-search").innerHTML = main
}

async function findAllTypeRoomSearch() {
    var url = 'http://'+urlFirst+'/api/public/typeRooms';
    const response = await fetch(url, {
        method: 'GET',
        headers: new Headers({

        })
    });
    var listtype = await response.json();
    var main = '';
    for (i = 0; i < listtype.length; i++) {
        main += '<li>'+
            '<label class="containers">'+
            '<div class="lb">'+listtype[i].name+'</div>'+
            '<input value='+listtype[i].id+' type="checkbox" class="typeroom">'+
            '<span class="checkmark"></span>'+
            '</label>'+
            '</li>';
    }
    document.getElementById("list-loaiphong-search").innerHTML = main
}

async function loadAddressSearch() {
    var urladd = 'http://'+urlFirst+'/api/public/province';
    const response = await fetch(urladd, {
        method: 'GET',
        headers: new Headers({
        })
    });
    var province = await response.json();
    var tinh = document.getElementById("tinh");
    for (i = 0; i < province.length; i++) {
        var option = document.createElement("option");
        option.text = province[i].name;
        option.value = province[i].id;
        tinh.add(option);
    }
}

var size = 3;
var page = 0;
async function loadRoomSearch(pages) {
    const res = await fetch('http://'+urlFirst+'/api/public/roomIndexPage?page='+pages+'&size='+size, {
        method: 'GET',
        headers: new Headers({
        })
    })
    var listRoom = await res.json();
    var main = ''
    var totalPage = listRoom.totalPages
    if(Number(totalPage)-1 == Number(page)){
        document.getElementById("view-more").innerHTML = ''
    }
    for(i=0; i<listRoom.content.length; i++){
        const resp = await fetch('http://'+urlFirst+'/api/public/imageByRoom?id=' + listRoom.content[i].id, { method: 'GET' })
        var image = await resp.json();
        var linksImage;
        for (j = 0; j < image.length; j++) {
            linksImage = image[0].link
            break
        }
        main += '<div id="listRoomIndex">'+
            '<div class="row single-room">'+
            '<div class="col-md-4">'+
            '<a href="detail?id='+listRoom.content[i].id+'"><img id="image-room" src="'+linksImage+'"></a>'+
            '</div>'+
            '<div class="col-md-8">'+
            '<h5><a href="detail?id='+listRoom.content[i].id+'">'+listRoom.content[i].title+'</a></h5>'+
            '<div class="row">'+
            '<div class="col-md-8">'+
            '<span class="type-room"><i class="fa fa-home"></i> '+listRoom.content[i].typeRoom.name+'</span><br>'+
            '<span class="type-room"><i class="fa fa-user"></i>'+listRoom.content[i].sex+'</span><br>'+
            '<span class="type-room"> <i class="fa fa-area-chart"></i>Area:: '+listRoom.content[i].area+'m2</span><br>'+
            '<span class="type-room"><i class="fa fa-location-arrow"></i>'+listRoom.content[i].detailAddress+', '+listRoom.content[i].address.name+','+listRoom.content[i].address.town.name+','+listRoom.content[i].address.town.province.name+'</span>'+
            '<br><span class="type-room"><i class="fa fa-clock"></i> '+ listRoom.content[i].createdDate.split("T")[0]+'</span>'+
            '</div>'+
            '<div class="col-md-4">'+
            '<h2 class="price">'+listRoom.content[i].price+'</h2>'+
            '<p class="price">$/Pernight</p>'+
            '</div>'+
            '</div>'+
            '</div>'+
            '</div>'+
            '<hr>'
    }
    document.getElementById("result-list-room-search").innerHTML += main
}

async function loadMoreRoomSearch() {
    ++page
    loadRoomSearch(page)
}

async function loadMoreRoomSearchFull() {
    ++page
    searchFull(page)
}

async function searchFull(pages){
    if(pages == 0){
        document.getElementById("result-list-room-search").innerHTML = ''
        page = 0;
    }
    var url = 'http://'+urlFirst+'/api/public/search';
    var listUtilities = []
    var listUtility = document.getElementsByClassName("toilet");
    for (i = 0; i < listUtility.length; i++) {
        if (listUtility[i].checked == true) {
            var u = {
                "id": listUtility[i].value
            }
            listUtilities.push(u)
        }
    }

    var listTypes = []
    var listType = document.getElementsByClassName("typeroom");
    for (i = 0; i < listType.length; i++) {
        if (listType[i].checked == true) {
            var u = {
                "id": listType[i].value
            }
            listTypes.push(u)
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

    var xa = document.getElementById("xa").value
    var smallPrice = $('#sl2').val().split(",")[0];
    var lagerPrice = $('#sl2').val().split(",")[1];
    var searchDto = null
    if(xa == -1){
        searchDto = {
            "priceSmall":smallPrice,
            "priceLarge":lagerPrice,
            "sex":gioitinhs,
            "utilities":listUtilities,
            "typeRooms":listTypes
        }
    }
    else{
        searchDto = {
            "village":{
                "id":xa
            },
            "priceSmall":smallPrice,
            "priceLarge":lagerPrice,
            "sex":gioitinhs,
            "utilities":listUtilities,
            "typeRooms":listTypes
        }
    }
    console.log(searchDto)
    const response = await fetch(url, {
        method: 'POST',
        headers: new Headers({
            'Content-Type': 'application/json'
        }),
        body: JSON.stringify(searchDto)
    });
    var listRoom = await response.json();
    if(pages == 0){
        document.getElementById("number-room").innerHTML = '(There were '+listRoom.length +' results found)'
    }
    console.log(listRoom)
    if(listRoom.length > 0){
        document.getElementById("xemthemsearch").innerHTML = '<p id="view-more" onclick="loadMoreRoomSearchFull()">View More Result</p>'
    }
    var main = ''
    if(pages*size <= listRoom.length){
        var offset = pages * size
        var chan = offset + size;
        if(chan >= listRoom.length){
            chan = listRoom.length
        }
        for(i=offset; i< chan; i++){
            const resp = await fetch('http://'+urlFirst+'/api/public/imageByRoom?id=' + listRoom[i].id, { method: 'GET' })
            var image = await resp.json();
            var linksImage;
            for (j = 0; j < image.length; j++) {
                linksImage = image[0].link
                break
            }
            main += '<div id="listRoomIndex">'+
                '<div class="row single-room">'+
                '<div class="col-md-4">'+
                '<a href="detail?id='+listRoom[i].id+'"><img id="image-room" src="'+linksImage+'"></a>'+
                '</div>'+
                '<div class="col-md-8">'+
                '<h5><a href="detail?id='+listRoom[i].id+'">'+listRoom[i].title+'</a></h5>'+
                '<div class="row">'+
                '<div class="col-md-8">'+
                '<span class="type-room"><i class="fa fa-home"></i> '+listRoom[i].typeRoom.name+'</span><br>'+
                '<span class="type-room"><i class="fa fa-user"></i>'+listRoom[i].sex+'</span><br>'+
                '<span class="type-room"> <i class="fa fa-area-chart"></i>Area: '+listRoom[i].area+'m2</span><br>'+
                '<span class="type-room"><i class="fa fa-location-arrow"></i>'+listRoom[i].detailAddress+', '+listRoom[i].address.name+','+listRoom[i].address.town.name+','+listRoom[i].address.town.province.name+'</span>'+
                '<br><span class="type-room"><i class="fa fa-clock"></i> '+ listRoom[i].createdDate.split("T")[0]+'</span>'+
                '</div>'+
                '<div class="col-md-4">'+
                '<h2 class="price">'+listRoom[i].price +'</h2>'+
                '<p class="price">$/Pernight</p>'+
                '</div>'+
                '</div>'+
                '</div>'+
                '</div>'+
                '<hr>'
        }
    }
    else{
        alert("Out of results")
    }
    document.getElementById("result-list-room-search").innerHTML += main
}

