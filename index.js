// import statements
    //packages
    const express = require('express');
    const app = express();
    const bodyParser = require('body-parser');
    const rqhandler = require('./js/rqhandler');

//middleware for parsing
app.use(bodyParser.json({ type: 'application/*+json' }))); //all res.body & req.body is now a json obj

//port listener
app.listen(4870, (err) => {
    if(err) {
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
        'Content-Length' : response.length
    });
    res.write(response);
    res.end();
});

app.get('/login', (req, res) =>{
    //req.body = {user; name, password: pass}
    //res.body = json
    let usr = JSON.stringify(rqhandler.login(req.body));
    writeResponse(res, usr);
});

app.get('/conference', (req, res) => {
    //req.body = {id: objectid}
    let conf = JSON.stringify(rqhandler.getEvent(req.body));
    writeResponse(res, conf);
});

app.post('/adduser', (req, res) => {
    let userid = JSON.stringify(rqhandler.addUser(req.body));
    writeResponse(res, userid);
});

app.post('/addconference', (req, res) => {
    let confid = JSON.stringify(rqhandler.addEvent(req.body));
    writeResponse(res, confid);
});

app.post('/joinevent', (req, res) => {
    let success = JSON.stringify(rqhandler.joinEvent(req.body));
    writeResponse(res, success);
});

app.post('/leaveevent', (req, res) => {
    let success = JSON.stringify(rqhandler.leaveEvent(req.body));
    writeResponse(res, success);
});

function writeResponse(res, data){
    res.writeHead(200, {
        'Content-Type': 'text/json',
        'Content-Length' : data.length
    });
    res.write(data);
    res.end();
}