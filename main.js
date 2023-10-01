const path = require('path');
const express = require("express");
var cors = require('cors')
const JSONtoHTML=  require('./objToHTML.js');

const app = express();

const corsOptions ={
    origin:true, 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200
}
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.listen(3000, () => {
    console.log("Application started and Listening on port 3000");
});

app.get("/", (req, res) => {
    //   res.send("Hello world!");
    res.sendFile(path.join(__dirname, '/index.html'));
});

app.post("/req", (req, res) => {
    //   res.send("Hello world!");
    const url = req.body.url;
    const method = req.body.method;
    const param = req.body.param;
    console.log(req)
    const result = {
        'url': url,
        'method': method,
        'param': param
    }
    res.send(result);
});


app.get("/test", (req, res) => {
    //   res.send("Hello world!");
    // const queryString = window.location.search;
    url = req.originalUrl
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify({ url: url }));
});


