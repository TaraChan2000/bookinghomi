async function findAllUtilities() {
    var token = localStorage.getItem("token");
    var url = 'http://'+urlFirst+'/api/public/utilities';
    const response = await fetch(url, {
        method: 'GET',
        headers: new Headers({
            'Authorization': 'Bearer ' + token
        })
    });
    var listutility = await response.json();
    var main = '';
    for (i = 0; i < listutility.length; i++) {
        main += '<tr>' +
            '<td>' + listutility[i].id + '</td>' +
            '<td>' + listutility[i].createdDate + '</td>' +
            '<td><i class="' + listutility[i].icon + '"></td>' +
            '<td>' + listutility[i].name + '</td>' +
            '<td><a href="addUtilies?id=' + listutility[i].id + '"><i class="fa fa-edit"></a></td>' +
            '<td><i class="fa fa-trash" onclick="deleteUtilities(' + listutility[i].id + ')"></td>' +
            '</tr>';
    }
    document.getElementById("listtienich").innerHTML = main
    const datatablesSimple = document.getElementById('datatablesSimple');
    $('#example').DataTable();
}

async function loadAnUtilities() {
    var id = window.location.search.split('=')[1];
    if (id != null) {
        var token = localStorage.getItem("token");
        var url = 'http://'+urlFirst+'/api/public/getUtilitiesById?id=' + id;
        const response = await fetch(url, {
            method: 'GET',
            headers: new Headers({
                'Authorization': 'Bearer ' + token
            })
        });
        if (response.status > 400) {
            alert("kThis utilities is not available")
            window.location.replace("utilities")
        }
        var utility = await response.json();
        document.getElementById("tentienich").value = utility.name
        document.getElementById("tenicon").value = utility.icon
        const datatablesSimple = document.getElementById('datatablesSimple');
        $('#example').DataTable();
    }
}

async function saveUtilities() {
    var id = window.location.search.split('=')[1];

    var token = localStorage.getItem("token");
    var url = 'http://'+urlFirst+'/api/admin/utilitis';

    var tentienich = document.getElementById("tentienich").value
    var tenicon = document.getElementById("tenicon").value

    if(tentienich === "" && tenicon === ""){
        alert("Data cannot be left blank")
        return;
    }
    if(tentienich === "" ){
        alert("Utility name can't be left blank")
        return;
    }
    if(tenicon === "" ){
        alert("Icon code can't be left blank")
        return;
    }
    var utility = null
    if (id == null) {
        utility = {
            "name": tentienich,
            "icon": tenicon
        }
    }
    else {
        utility = {
            "id": id,
            "name": tentienich,
            "icon": tenicon
        }

    }

    const response = await fetch(url, {
        method: 'POST',
        headers: new Headers({
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json'
        }),
        body: JSON.stringify(utility)
    });
    if (response.status < 300) {
        alert("Add/Edit utility successfully!")
        window.location.replace("utilities")
    }
    else {
        alert("Add/Edit utility failed!")
    }
}

async function deleteUtilities(id) {
    var token = localStorage.getItem("token");
    var url = 'http://'+urlFirst+'/api/admin/deleteUtilitiesById?id=' + id;
    const response = await fetch(url, {
        method: 'GET',
        headers: new Headers({
            'Authorization': 'Bearer ' + token
        })
    });
    console.log(response.status)
    if (response.status < 300) {
        alert("Delete successfully!");
        window.location.replace("utilities")
    }
    else {
        alert("Delete utility failed!")
    }
}