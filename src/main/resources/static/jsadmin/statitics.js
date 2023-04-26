
async function loadTongPhong() {
    var token = localStorage.getItem("token");
    var url = 'http://' + urlFirst + '/api/admin/totalRoom'
    const res = await fetch(url, {
        method: 'GET',
        headers: new Headers({
            'Authorization': 'Bearer ' + token
        })
    })
    var totalRoom = await res.json();
    document.getElementById("tongphong").text = totalRoom[0]
    document.getElementById("tongphongdaxoa").text = 'Deleted: '+totalRoom[1]
}

async function loadTongUser() {
    var token = localStorage.getItem("token");
    var url = 'http://' + urlFirst + '/api/admin/totalUsers'
    const res = await fetch(url, {
        method: 'GET',
        headers: new Headers({
            'Authorization': 'Bearer ' + token
        })
    })
    var totalUser = await res.text();
    document.getElementById("tonguser").text = totalUser
}


async function loadAddressNumRoom() {
    var token = localStorage.getItem("token");
    var url = 'http://' + urlFirst + '/api/admin/addressAndNum'
    const res = await fetch(url, {
        method: 'GET',
        headers: new Headers({
            'Authorization': 'Bearer ' + token
        })
    })
    var listRoom = await res.json();
    var main = ''
    for(i=0; i<listRoom.length; i++){
        main += '<tr>'+
            '<td>'+listRoom[i].name+'</td>'+
            '<td>'+listRoom[i].total+'</td>'+
            '</tr>'
    }

    document.getElementById("listRoomInProvince").innerHTML = main
    const datatablesSimple = document.getElementById('datatablesSimple');
    $('#example').DataTable();
}



async function loadMoney() {
    var token = localStorage.getItem("token");
    var url = 'http://' + urlFirst + '/api/admin/calMoneySixMonth'
    const res = await fetch(url, {
        method: 'GET',
        headers: new Headers({
            'Authorization': 'Bearer ' + token
        })
    })
    var mon = await res.json();
    document.getElementById("tongtienthangnay").text = mon[0].split(",")[1]
    var thang = []
    var money = []
    var maxMoney = 0;
    for (i = mon.length - 1; i >= 0; i--) {
        thang.push('month: ' + mon[i].split(",")[0])
        money.push(mon[i].split(",")[1])
        if (Number(mon[i].split(",")[1]) > Number(maxMoney)) {
            maxMoney = Number(mon[i].split(",")[1]) + 50000;
        }
    }

    Chart.defaults.global.defaultFontFamily = '-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif';
    Chart.defaults.global.defaultFontColor = '#292b2c';

    // Area Chart Example
    var ctx = document.getElementById("myAreaChart");
    var myLineChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: thang,
            datasets: [{
                label: "Sessions",
                lineTension: 0.3,
                backgroundColor: "rgba(2,117,216,0.2)",
                borderColor: "rgba(2,117,216,1)",
                pointRadius: 5,
                pointBackgroundColor: "rgba(2,117,216,1)",
                pointBorderColor: "rgba(255,255,255,0.8)",
                pointHoverRadius: 5,
                pointHoverBackgroundColor: "rgba(2,117,216,1)",
                pointHitRadius: 50,
                pointBorderWidth: 2,
                data: money,
            }],
        },
        options: {
            scales: {
                xAxes: [{
                    time: {
                        unit: 'date'
                    },
                    gridLines: {
                        display: false
                    },
                    ticks: {
                        maxTicksLimit: 7
                    }
                }],
                yAxes: [{
                    ticks: {
                        min: 0,
                        max: maxMoney,
                        maxTicksLimit: 5
                    },
                    gridLines: {
                        color: "rgba(0, 0, 0, .125)",
                    }
                }],
            },
            legend: {
                display: false
            }
        }
    });

}

async function loadCharUser() {
    var token = localStorage.getItem("token");
    var url = 'http://' + urlFirst + '/api/admin/calUserSixMonth'
    const res = await fetch(url, {
        method: 'GET',
        headers: new Headers({
            'Authorization': 'Bearer ' + token
        })
    })
    var user = await res.json();
    console.log(user)
    var thang = []
    var num = []
    var maxNum = 0;
    for (i = user.length - 1; i >= 0; i--) {
        thang.push('month: ' + user[i].split(",")[0])
        num.push(user[i].split(",")[1])
        if (Number(user[i].split(",")[1]) > Number(maxNum)) {
            maxNum = Number(user[i].split(",")[1]) + 10;
        }
    }
    console.log(thang)
    console.log(num)

    // Set new default font family and font color to mimic Bootstrap's default styling
    Chart.defaults.global.defaultFontFamily = '-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif';
    Chart.defaults.global.defaultFontColor = '#292b2c';

// Bar Chart Example
    var ctx = document.getElementById("myBarChart");
    var myLineChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: thang,
            datasets: [{
                label: "Revenue",
                backgroundColor: "rgba(2,117,216,1)",
                borderColor: "rgba(2,117,216,1)",
                data: num,
            }],
        },
        options: {
            scales: {
                xAxes: [{
                    time: {
                        unit: 'month'
                    },
                    gridLines: {
                        display: false
                    },
                    ticks: {
                        maxTicksLimit: 6
                    }
                }],
                yAxes: [{
                    ticks: {
                        min: 0,
                        max: maxNum,
                        maxTicksLimit: 10
                    },
                    gridLines: {
                        display: true
                    }
                }],
            },
            legend: {
                display: false
            }
        }
    });

}

// Set new default font family and font color to mimic Bootstrap's default styling
