//imports
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const ObjectID = require('mongodb').ObjectID;

const url = 'mongodb://localhost:27017/cpm'; //points to the database we'll be using to read/write too

let login = function(creds){
    MongoClient.connect(url, (err,db) => { 
        if(err) throw err;
        let coll = db.collection("users"); //pre-defined collection users
        //inserts new user into the collection "users" one by one   
        coll.findOne({googleID : creds.googleID}).then((res) =>{
            return res;
        }); 
        db.close();
    });
}

let addEvent = function(conf){
    //{userid: ___, confname:____, etc}
    MongoClient.connect(url, (err, db) => {
        if(err) throw err;
        let coll = db.collection("conferences");
        coll.insertOne(conf).then((res) => {
            return res; //{ackowneldged: true, objectid: "some id"}
        });
        db.close();
    });
}

let getEvent = function(confid){
    MongoClient.connect(url, (err, db) => {
        if(err) throw err;
        let coll = db.collection("conferences");
        coll.findOne({"_id": ObjectID(confid)}).then((res)=>{
            return res; //return doc
        })
        db.close();
    });
}

let addUser = function(user){
    MongoClient.connect(url, (err, db) => {
        if(err) throw err;
        let coll = db.collection("users");
        coll.insertOne(user).then((res)=>{
            return res; //return {acknowledged: true, objectid: "some id"}
        });
    });
}

let updateEvent = function(conf){
    MongoClient.connect(url, (err, db) => {
        if(err) throw err;
        let coll = db.collection("conferences");
        coll.updateOne({"_id" : ObjectID(conf.id)},conf).then((res)=>{
            return res; //return {ackowledged, etc}
        });
    });
}

let updateUser = function(usr){
    MongoClient.connect(url, (err, db) => {
        if(err) throw err;
        let coll = db.collection("users");
        coll.updateOne({"_id" : ObjectID(usr.id)}, usr).then((res)=>{
            return res; //return {ackowledged, etc}
        });
    });
}

let joinEvent = function(joinreq){
    /*{
        userid: ____,
        usergroup: "",
        confid: ____
    }*/

    MongoClient.connect(url, (err, db) => {
        if(err) throw err;
        let coll = db.collection("conferences");
        
    });
}

let leaveEvent = function(leavereq){
    /*{
        userid: ____,
        usergroup: "",
        confid: ____
    }*/

    MongoClient.connect(url, (err, db) => {
        if(err) throw err;
        let coll = db.collection("conferences");
        
    });
}


module.exports = {
    login : login,
    addEvent : addEvent,
    getEvent : getEvent,
    addUser : addUser,
    updateEvent : updateEvent,
    updateUser : updateUser,
    joinEvent : joinEvent,
    leaveEvent : leaveEvent
}
