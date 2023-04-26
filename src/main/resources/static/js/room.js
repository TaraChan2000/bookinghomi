var size = 3;
var page = 0;
async function loadRoomIndex(pages) {
    const res = await fetch('http://'+urlFirst+'/api/public/roomIndexPage?page='+pages+'&size='+size, {
        method: 'GET',
        headers: new Headers({
        })
    })
    var listRoom = await res.json();
    console.log(listRoom)
    var main = ''
    var totalPage = listRoom.totalPages
    if(Number(totalPage)-1 == Number(page)){
        document.getElementById("view-more").innerHTML = ''
    }
    for(i=0; i<listRoom.content.length; i++){
        main += '<div class="col-lg-4 col-md-6">'+
            '<div class="room-item">'+
            '<img class="banner-index" src="'+listRoom.content[i].banner+'" alt="">'+
            '<div class="ri-text">'+
            '<h4 class="title-index">'+listRoom.content[i].title+'</h4>'+
            '<h3>'+formatmoney(listRoom.content[i].price)+'<span>/Pernight</span></h3>'+
            '<table>'+
            '<tbody>'+
            '<tr><td>Type:</td>'+
            '<td>'+listRoom.content[i].typeRoom.name+'</td>'+
            '</tr>'+
            '<tr>'+
            '<td class="r-o">Area:</td>'+
            '<td>'+listRoom.content[i].area+' m2</td>'+
            '</tr>'+
            '<tr>'+
            '<td class="r-o">Capacity:</td>'+
            '<td>Max persion '+listRoom.content[i].quantity+'</td>'+
            '</tr>'+
            '<tr>'+
            '<td class="r-o">Addres:</td>'+
            '<td>'+listRoom.content[i].address.town.name+', '+listRoom.content[i].address.town.province.name+'</td>'+
            '</tr>'+
            '<tr>'+
            '<td class="r-o">gender:</td>'+
            '<td>'+listRoom.content[i].sex+'</td>'+
            '</tr>'+
            '</tbody>'+
            '</table>'+
            '<a href="detail?id='+listRoom.content[i].id+'" class="primary-btn">More Details</a>'+
            '</div>'+
            '</div>'+
            '</div>'
    }
    document.getElementById("listRoomIndex").innerHTML += main
}

async function loadMoreRoomIndex() {
    ++page
    loadRoomIndex(page)
}


function formatmoney(money) {
    var USD = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    });
    return USD.format(money);
}