const listFile = [];
function loadInit() {
    $('input#choosefile').change(function () {
        var files = $(this)[0].files;
        if (files.length + listFile.length < 3) {
            alert("Please select 3 or more photos");
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
    var url = 'http://'+urlFirst+'/api/public/utilities';
    const response = await fetch(url, {
        method: 'GET',
        headers: new Headers({

        })
    });
    var listutility = await response.json();
    var main = '<div class="col-md-12">' +
        '<h5 class="title-tienich">Utilities</h5>' +
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
    var url = 'http://'+urlFirst+'/api/public/typeRooms';
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
    var urladd = 'http://'+urlFirst+'/api/public/province';
    const response = await fetch(urladd, {
        method: 'GET',
        headers: new Headers({

        })
    });
    var province = await response.json();
    var tinh = document.getElementById("tinh");
    tinh.innerHTML = ''
    for (i = 0; i < province.length; i++) {
        var option = document.createElement("option");
        option.text = province[i].name;
        option.value = province[i].id;
        tinh.add(option);
    }
}

async function uploadImage() {
    // alert(listFile.length)
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
        console.log(linkimage);
        listLink.push(linkimage)
    }
    for (i = 0; i < listLink.length; i++) {
        console.log(listLink[i])
    }
}

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
        alert("Data can't be left blank!")
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
    var room = {
        "title": tieude,
        "price": giathue,
        "sex": gioitinh,
        "quantity": succhua,
        "area": dientich,
        "description": mota,
        "quantityRoom": slphong,
        "deleted": 0,
        "banner":listLink[0],
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

    const res = await fetch('http://'+urlFirst+'/api/user/rooms', {
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
            const resp = await fetch('http://'+urlFirst+'/api/user/roomImage', {
                method: 'POST',
                headers: new Headers({
                    'Authorization': 'Bearer ' + token,
                    'Content-Type': 'application/json',
                }),
                body: JSON.stringify(roomImage)
            })
        }

        alert("upload success! waiting  admin confirm")
        window.location.replace("myPost")
    }

    else if (res.status >= 300) {
        alert("upload room error")
    }

    document.getElementById("loading_uploadroom").style.width = '0%'
}
