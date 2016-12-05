// import statements
//packages
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const rqhandler = require('./js/rqhandler');

//middleware to allow requests from other websites
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});


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

function writeResponse(res, data) {
    res.writeHead(200, {
        'Content-Type': 'text/json',
        'Content-Length': data.length
    });
    res.write(data);
    //console.log("response: ", data)
    res.end();
    //console.log("response: " , res)
}

app.get('/', (req, res) => {
    res.write("Conference Package Manger running on Port 4870");
    res.end();
})

//working as intended
app.post('/login', (req, res) => {
    console.log("login: ", req.body);
    //req.body = {user; name, password: pass}
    //res.body = json
    //console.log(req.body);
    rqhandler.login(req.body).then(function (data) {
        //console.log(data)
        writeResponse(res, JSON.stringify(data));
    });
});

app.post('/loginAng', (req,res) => {
    //console.log("angular login: ", req.body)
    rqhandler.loginAngular(req.body).then(function(data){
        console.log(data);
        writeResponse(res, JSON.stringify(data));
    });
})

app.post('/addevent', (req, res) => {
    console.log("addevent: ", req.body);
    rqhandler.addEvent(req.body).then(function (data) {
        writeResponse(res, JSON.stringify(data));
    });
});

app.post('/getEventById', (req, res) =>{
    console.log("getEventById: ", req.body);
    rqhandler.getEventById(req.body.eventID).then(function(data){
        writeResponse(res, JSON.stringify(data));
    });
});

app.post('/getEventByName', (req, res) =>{
    console.log("getEventByName: ", req.body);
    rqhandler.getEventByName(req.body.eventName).then(function(data){
        writeResponse(res, JSON.stringify(data));
    });
});

app.post('/getAllEvents', (req,res) => {
    console.log("get all events: ", req.body);
    rqhandler.getAllEvents().then(function(data){
        writeResponse(res, JSON.stringify(data));
    });
});

app.post('/joinEvent', (req, res) => {
    console.log("joinevent: ", req.body);
    rqhandler.joinEvent(req.body).then(function (data) {
        writeResponse(res, JSON.stringify(data));
    });
});

app.post('/leaveEvent', (req, res) => {
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

//app.post('updateconf')

/*//Request handlers
app.get('/test', (req, res) => {
    response = "Server returned response sucessfully!";
    res.writeHead(200, {
        'Content-Type': "text/html",
        'Content-Length': response.length
    });
    res.write(response);
    res.end();
});
*/

//deprecated
/*app.post('/adduser', (req, res) => {
    console.log(req.body);
    rqhandler.addUser(req.body).then(function(data){
        writeResponse(res, JSON.stringify(data));
    });
});*/

/*app.post('/conference', (req, res) => {
    //req.body = {id: objectid}
    console.log(req.body);
    rqhandler.getEvent(req.body).then(function (data) {
        writeResponse(res, JSON.stringify(data));
    });
});
*/