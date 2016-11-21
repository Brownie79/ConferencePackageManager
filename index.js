// import statements
//packages
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const rqhandler = require('./js/rqhandler');

//middleware for parsing
app.use(bodyParser.json({
    type: 'application/json'
})); //all res.body & req.body is now a json obj

//port listener
app.listen(4870, (err) => {
    if (err) {
        return console.log("Cannot listen on port 4870 because, ", err);
    } else {
        console.log("Server running on 162.243.86.227:4870");
    }
});

//Request handlers
app.get('/test', (req, res) => {
    response = "Server returned response sucessfully!";
    res.writeHead(200, {
        'Content-Type': "text/html",
        'Content-Length': response.length
    });
    res.write(response);
    res.end();
});

app.post('/login', (req, res) => {
    console.log(req.body);
    //req.body = {user; name, password: pass}
    //res.body = json
    //console.log(req.body);
    rqhandler.login(req.body).then(function (data) {
        writeResponse(res, JSON.stringify(data));
    });
});

app.post('/conference', (req, res) => {
    //req.body = {id: objectid}
    console.log(req.body);
    rqhandler.getEvent(req.body).then(function (data) {
        writeResponse(res, JSON.stringify(data));
    });
});

//deprecated
/*app.post('/adduser', (req, res) => {
    console.log(req.body);
    rqhandler.addUser(req.body).then(function(data){
        writeResponse(res, JSON.stringify(data));
    });
});*/

app.post('/addconference', (req, res) => {
    console.log(req.body);
    rqhandler.addEvent(req.body).then(function (data) {
        writeResponse(res, JSON.stringify(data));
    });
});

app.post('/joinevent', (req, res) => {
    console.log(req.body);
    rqhandler.joinEvent(req.body).then(function (data) {
        writeResponse(res, JSON.stringify(data));
    });
});

app.post('/leaveevent', (req, res) => {
    console.log(req.body);
    rqhandler.leaveEvent(req.body).then(function (data) {
        writeResponse(res, JSON.stringify(data));
    });
});

app.post('/updateuser', (req, res) => {
    console.log('update user ', req.body);
    rqhandler.updateUser(req.body).then(function (data) {
        writeResponse(res, JSON.stringify(data));
    });
});

function writeResponse(res, data) {
    res.writeHead(200, {
        'Content-Type': 'text/json',
        'Content-Length': data.length
    });
    res.write(data);
    res.end();
    //console.log("response: " , res)
}