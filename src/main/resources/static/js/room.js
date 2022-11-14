var size = 3;
var page = 0;
async function loadRoomIndex(pages) {
    const res = await fetch('http://'+urlFirst+':8080/api/public/roomIndexPage?page='+pages+'&size='+size, {
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
        const resp = await fetch('http://'+urlFirst+':8080/api/public/imageByRoom?id=' + listRoom.content[i].id, { method: 'GET' })
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
                                    '<span class="type-room"> <i class="fa fa-area-chart"></i>diện tích: '+listRoom.content[i].area+'m2</span><br>'+
                                    '<span class="type-room"><i class="fa fa-location-arrow"></i>'+listRoom.content[i].detailAddress+', '+listRoom.content[i].address.name+','+listRoom.content[i].address.town.name+','+listRoom.content[i].address.town.province.name+'</span>'+
                                    '<br><span class="type-room"><i class="fa fa-clock"></i> '+ listRoom.content[i].createdDate.split("T")[0]+'</span>'+
                                '</div>'+
                                '<div class="col-md-4">'+
                                    '<h2 class="price">'+listRoom.content[i].price / 1000000+'</h2>'+
                                    '<p class="price">tr/phòng</p>'+
                                '</div>'+
                            '</div>'+
                       '</div>'+
                    '</div>'+
                   '<hr>'
    }
    document.getElementById("listRoomIndex").innerHTML += main
}

async function loadMoreRoomIndex() {
    ++page
    loadRoomIndex(page)
}
