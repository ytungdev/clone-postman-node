const path = require('path');
const express = require("express");
var cors = require('cors')

const axios = require('axios');

const app = express();

const corsOptions = {
    origin: true,
    credentials: true,            //access-control-allow-credentials:true
    optionSuccessStatus: 200
}
app.use(cors(corsOptions));

// For post request
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(3000, () => {
    console.log("Application started and Listening on port 3000");
});

app.get("/", (req, res) => {
    //   res.send("Hello world!");
    res.sendFile(path.join(__dirname, '/index.html'));
});


app.post("/proxy", (req, res) => {
    const url = req.body.url;
    const method = req.body.method;
    const param = req.body.param;
    console.log(method, url, param);


    let result = {
        status:0,
        req:{},
        res:{},
        err:{}
    }

    axios.interceptors.request.use(request => {
        // console.log(request)
        let {
            transitional,
            adapter,
            transformRequest,
            transformResponse,
            data,
            ...headers
        } = request;
        result.req = {
            headers:headers,
            data:data
        }
        return request
    });

    axios({
        method: method,
        url: url,
        data: param,
        params: param
    }).then(function (response) {
        // console.log(response.data)
        result.res = {
            data:response.data,
            status:response.status,
            statusText:response.statusText,
            headers:response.headers
        };
        result.status = 1;
        res.send(result);
    }, (error) => {
        result.err = error;
        res.send(result);
    });

});

app.get("/test", (req, res) => {
    //   res.send("Hello world!");
    // const queryString = window.location.search;
    url = req.originalUrl;
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify({ url: url }));
});

app.post("/test", (req, res) => {
    //   res.send("Hello world!");
    // const queryString = window.location.search;
    url = req.originalUrl;
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify({ url: url }));
});

