const listFile = [];
function loadInit() {
    $('input#choosefile').change(function () {
        var files = $(this)[0].files;
        if (files.length + listFile.length < 3) {
            alert("hãy chọn ít nhất 3 ảnh ");
        }
    });
    document.querySelector('#choosefile').addEventListener("change", previewImages);
    function previewImages() {
        var files = $(this)[0].files;
        for (i = 0; i < files.length; i++) {
            listFile.push(files[i]);
        }

        var preview = document.querySelector('#preview');

        if (this.files) {
            [].forEach.call(this.files, readAndPreview);
        }

        function readAndPreview(file) {

            if (!/\.(jpe?g|png|gif)$/i.test(file.name)) {
                return alert(file.name + " is not an image");
            }

            var reader = new FileReader();

            reader.addEventListener("load", function () {
                document.getElementById("chon-anhs").className = 'col-sm-4';
                document.getElementById("chon-anhs").style.height = '100px';
                document.getElementById("chon-anhs").style.marginTop = '5px';
                document.getElementById("choose-image").style.height = '100px';
                document.getElementById("numimage").innerHTML = '';
                document.getElementById("camera").style.fontSize = '20px';
                document.getElementById("camera").style.marginTop = '40px';
                document.getElementById("camera").className = 'fas fa-plus';
                var image = new Image();
                image.height = 100;
                image.icon
                image.marginTop = '100px';
                image.title = file.name;
                image.src = this.result;
                image.className = 'col-md-4 image-upload';
                
                preview.appendChild(image);

            });

            reader.readAsDataURL(file);

        }

    }

}



async function findAllUtilities() {
    var url = 'http://'+urlFirst+':8080/api/public/utilities';
    const response = await fetch(url, {
        method: 'GET',
        headers: new Headers({

        })
    });
    var listutility = await response.json();
    var main = '<div class="col-md-12">' +
        '<h5 class="title-tienich">Tiện ích</h5>' +
        '</div>';
    for (i = 0; i < listutility.length; i++) {
        main += '<div class="col-md-3">' +
            '<label class="containers"><div class="lb"><i class="' + listutility[i].icon + '"></i>' + listutility[i].name + '</div>' +
            '<input type="checkbox" value="' + listutility[i].id + '" class="bike">' +
            '<span class="checkmark"></span>' +
            '</label>' +
            '</div>';
    }
    document.getElementById("listUtility").innerHTML = main
}

async function findAllTypeRoom() {
    var url = 'http://'+urlFirst+':8080/api/public/typeRooms';
    const response = await fetch(url, {
        method: 'GET',
        headers: new Headers({

        })
    });
    var listtype = await response.json();
    var main = '';
    for (i = 0; i < listtype.length; i++) {
        main += '<option value="' + listtype[i].id + '">' + listtype[i].name + '</option>';
    }
    document.getElementById("loaiphong").innerHTML = main
}

async function loadAddress() {
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

    for (i = 0; i < province.length; i++) {
        var option = document.createElement("option");
        option.text = province[i].name;
        option.value = i;
        tinh.add(option);
    }

    tinh.onchange = function () {
        huyen.innerHTML = '';
        for (i = 0; i < province.length; i++) {
            if (Number(i) === Number(tinh.value)) {
                for (j = 0; j < province[i].towns.length; j++) {
                    var option = document.createElement("option");
                    option.text = province[i].towns[j].name;
                    option.value = j;
                    huyen.add(option);
                }
            }
        }
    }

    huyen.onchange = function () {
        xa.innerHTML = '';
        for (i = 0; i < province.length; i++) {
            if (Number(i) === Number(tinh.value)) {
                for (j = 0; j < province[i].towns.length; j++) {
                    if (Number(j) === Number(huyen.value)) {
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



async function uploadImage() {
    alert(listFile.length)
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
        console.log(linkimage);
        listLink.push(linkimage)
    }
    for (i = 0; i < listLink.length; i++) {
        console.log(listLink[i])
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

    var room = {
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
        "deleted": 0,
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

    const res = await fetch('http://'+urlFirst+':8080/api/user/rooms', {
        method: 'POST',
        headers: new Headers({
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json',
        }),
        body: JSON.stringify(room)
    })
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

        alert("upload phòng thành công! đang đợi admin duyệt")
    }

    else if (res.status >= 300) {
        alert("đăng phòng thất bại")
    }

    document.getElementById("loading_uploadroom").style.width = '0%'
}
