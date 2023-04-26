var userUpdate = null;
async function loadUserUpdate() {
    var token = localStorage.getItem("token");
    const res = await fetch('http://' + urlFirst + '/api/userlogged', {
        method: 'POST',
        headers: new Headers({
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json'
        })
    })
    userUpdate = await res.json();
    console.log(userUpdate)
    document.getElementById("email").value = userUpdate.email
    document.getElementById("phone").value = userUpdate.phone
    document.getElementById("img-preview").src = userUpdate.avatar

    loadAddressUserUpdate(userUpdate.village.town.province.id, userUpdate.village.town.id, userUpdate.village.id)
}


async function updateUser(){
    document.getElementById("img_loading").style.width = '50%';
    var token = localStorage.getItem("token");
    var url = 'http://'+urlFirst+'/api/updateUser'
    var email = document.getElementById("email").value
    var phone = document.getElementById("phone").value
    var village = document.getElementById("xa").value


    //upload image
    var uploadimg = 'http://'+urlFirst+'/api/public/upload';
    const filePath = document.getElementById('file')
    var linkimage = userUpdate.avatar
    if(filePath.files.length != 0){
        const formData = new FormData()
        formData.append("file", filePath.files[0])
        const response = await fetch(uploadimg, {
            method: 'POST',
            headers: new Headers({

            }),
            body: formData
        });
        linkimage = await response.text();
    }

    var users = {
        "id":userUpdate.id,
        "email":email,
        "phone":phone,
        "village": {
            "id": village
        },
        "avatar":linkimage
    }
    const resp = await fetch(url, {
        method: 'POST',
        headers: new Headers({
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json',
        }),
        body: JSON.stringify(users)
    });
    var result = await resp.text();
    if(result === '0' || resp.status > 300){
        alert("update error")
    }
    else if(result === '1' || resp.status < 300){
        alert("update successful")
    }
    document.getElementById("img_loading").style.width = '0%';
}

async function loadAddressUserUpdate(idtinh, idhuyen, idxa) {

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