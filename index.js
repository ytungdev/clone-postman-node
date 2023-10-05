
var paraRow = 1;
var formMethod = '';

function post_this() {
    formMethod = "POST";
    console.log(formMethod);
    sendReq();
}
function get_this() {
    formMethod = "GET";
    console.log(formMethod);
    sendReq();
}

function paraAddRow() {
    paraRow += 1;
    console.log(paraRow);

    var rowStr = '';
    rowStr += `<tr id="row${paraRow}"><th scope="row">${paraRow}</th>`;
    rowStr += `<td><input type="text" class="form-control" id="k${paraRow}" placeholder="key ${paraRow}"`
    rowStr += ` onchange="activateRow(${paraRow})"></td>`;
    rowStr += `<td><input type="text" class="form-control" id="v${paraRow}" placeholder="value ${paraRow}"`;
    rowStr += ` onchange="activateRow(${paraRow})"></td>`;
    rowStr += `<td><button class="btn btn-secondary" onclick="deactivateRow(${paraRow})">`;
    rowStr += `↻</button></td>`;
    rowStr += '</tr>';
    $("#paraBody").append(rowStr);
}
function activateRow(n) {
    var kN = $(`#k${n}`)
    var vN = $(`#v${n}`)
    if (kN.val() && vN.val()) {
        kN.attr('name', `k[]`);
        vN.attr('name', `v[]`);
    }
}
function deactivateRow(n) {
    var kN = $(`#k${n}`)
    var vN = $(`#v${n}`)
    kN.val('');
    kN.removeAttr('name');
    vN.val('');
    vN.removeAttr('name');
}

function sendReq() {
    const indent = 4;
    var form = $('#reqForm');
    var url = $('#urlInp').val();
    if (formMethod != '' && url) {
        var keys = $('input[name="k[]"]').map(function () {
            return this.value;
        }).get();

        var vals = $('input[name="v[]"]').map(function () {
            return this.value;
        }).get();

        var data = {}
        data["url"] = url;
        data["method"] = formMethod == 'GET' ? 'get' : 'post';
        data["param"] = {};
        for (let i in keys) {
            data["param"][keys[i]] = vals[i]
        }
        console.log(data)


        axios({
            method: 'post',
            url: '../proxy',
            data: data,
            headers: {
                'Access-Control-Allow-Origin': '*',
                // 'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Safari/537.36'
            }
        }).then((proxyRes) => {
            console.log('proxyRes');
            console.log(proxyRes);

            // display REQ
            let req = proxyRes.data.req;
            $('#reqHeader').html(JSON.stringify(req.headers, null, indent));
            $('#reqBody').html(JSON.stringify(req.data, null, indent));

            // display RES
            if (proxyRes.data.status == 1) {
                let res = proxyRes.data.res;
                $('#resStatus').html(`${res.status} - ${res.statusText}`);
                $('#resHeader').html(JSON.stringify(res.headers, null, indent));
                $('#resBody').html(JSON.stringify(res.data, null, indent));
            } else {
                // display ERR
                let err = proxyRes.data.err;
                $('#resStatus').html(err.code);
                $('#resHeader').html('');
                $('#resBody').html(err.message);

            }
        }, (error) => {
            console.log(error);
            $('#resStatus').html(error.code);
            $('#resHeader').html('');
            $('#resBody').html(error.message);
        }
        );
    }

};

const test_cases = [
    {
        url: 'https://api.nationalize.io/',
        data: [['name', 'Elon']],
        method: 'get'
    },
    {
        url: 'https://pokeapi.co/api/v2/pokemon',
        data: [['limit', '10']],
        method: 'get'
    },
    {
        url: 'http://localhost:3000/test/',
        data: [['k1', 'v1']],
        method: 'get'
    },
    {
        url: 'http://127.0.0.1:5001/api',
        data: [['k1', 'v1']],
        method: 'post'
    },
];

function testing() {

    let n = Math.floor(Math.random() * test_cases.length);
    let test_case = test_cases[n]

    $('#urlInp').val(test_case.url);
    let data = test_case.data
    for (let i in data) {
        let row = parseInt(i) + 1
        // if (paraRow < row){
        //     $('#addRow').click();
        // }
        // cannot reset extra column
        $(`#k${row}`).val(data[i][0]).change();
        $(`#v${row}`).val(data[i][1]).change();
    }
    $(`#${test_case.method}`).click();
}
