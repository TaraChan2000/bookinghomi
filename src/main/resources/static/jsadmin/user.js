var listuser = null
async function getUserNotAdmin() {
    var token = localStorage.getItem("token");
    var url = 'http://' + urlFirst + '/api/admin/getUserNotAdmin';
    const response = await fetch(url, {
        method: 'GET',
        headers: new Headers({
            'Authorization': 'Bearer ' + token
        })
    });
    listuser = await response.json();
    var main = '';

    for (i = 0; i < listuser.content.length; i++) {
        main += '<tr>' +
            '<td><img class="avatar_user" src="' + listuser.content[i].avatar + '"> </td >' +
            '<td>' + listuser.content[i].username + '</td>' +
            '<td>' + listuser.content[i].email + '</td>'
        if (Number(listuser.content[i].actived === Number(1))) {
            main += '<td><Button class="btn-success" onclick="activeOrUnactive(' + listuser.content[i].id + ')">Lock</Button></td>' +
                '<td><i class="fas fa-user"></td>';
        }
        else {
            main += '<td><Button class="btn-danger" onclick="activeOrUnactive(' + listuser.content[i].id + ')">Unlock</Button></td>' +
                '<td><i class="fas fa-user-lock" ></td>';
        }
        '</tr > ';
    }
    document.getElementById("listUser").innerHTML = main
    document.getElementById("totalUserA").innerHTML = listuser.content.length
    const datatablesSimple = document.getElementById('datatablesSimple');
    $('#example').DataTable();
}

async function loadByType() {
    var main = ''
    var num = 0;
    var values = document.getElementById("typeUser").value
    for (i = 0; i < listuser.content.length; i++) {
        if (values == -1 || values == 0) {
            main += '<tr>' +
                '<td><img class="avatar_user" src="' + listuser.content[i].avatar + '"> </td >' +
                '<td>' + listuser.content[i].username + '</td>' +
                '<td>' + listuser.content[i].username + '</td>' +
                '<td>' + listuser.content[i].email + '</td>' +
                '<td>' + listuser.content[i].money + '</td>'
            if (Number(listuser.content[i].actived === Number(1))) {
                main += '<td><Button class="btn-success" onclick="activeOrUnactive(' + listuser.content[i].id + ')">Lock</Button></td>' +
                    '<td><i class="fas fa-user"></td>';
            }
            else {
                main += '<td><Button class="btn-danger" onclick="activeOrUnactive(' + listuser.content[i].id + ')">Unlock</Button></td>' +
                    '<td><i class="fas fa-user-lock"></td>';
            }
            '</tr > ';
            ++num
        }

        else if (values == 1) {
            if (listuser.content[i].actived == 0) {
                main += '<tr>' +
                    '<td><img class="avatar_user" src="' + listuser.content[i].avatar + '"> </td >' +
                    '<td>' + listuser.content[i].username + '</td>' +
                    '<td>' + listuser.content[i].username + '</td>' +
                    '<td>' + listuser.content[i].email + '</td>' +
                    '<td>' + listuser.content[i].money + '</td>'
                if (Number(listuser.content[i].actived === Number(1))) {
                    main += '<td><Button class="btn-success" onclick="activeOrUnactive(' + listuser.content[i].id + ')">Lock</Button></td>' +
                        '<td><i class="fas fa-user"></td>';
                }
                else {
                    main += '<td><Button class="btn-danger" onclick="activeOrUnactive(' + listuser.content[i].id + ')">Unlock</Button></td>' +
                        '<td><i class="fas fa-user-lock"></td>';
                }
                '</tr > ';
                ++num
            }
        }
    }
    document.getElementById("listUser").innerHTML = main
    document.getElementById("totalUserA").innerHTML = num
    const datatablesSimple = document.getElementById('datatablesSimple');
    $('#example').DataTable();
}

async function activeOrUnactive(iduser) {
    var token = localStorage.getItem("token");
    var url = 'http://' + urlFirst + '/api/admin/activeUser?id=' + iduser;
    const response = await fetch(url, {
        method: 'POST',
        headers: new Headers({
            'Authorization': 'Bearer ' + token
        })
    });
    if (response.status < 300) {
        alert("Account locked successfully");
        getUserNotAdmin();
    }
    else {
        alert("Account lockout failed")
    }
}