//imports
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const ObjectID = require('mongodb').ObjectID;

const url = 'mongodb://localhost:27017/cpm'; //points to the database we'll be using to read/write too


export function login(creds){
    MongoClient.connect(url, (err,db) => { 
        if(err) throw err;
        let coll = db.collection("users"); //pre-defined collection users
        //inserts new user into the collection "users" one by one   
        coll.findOne({username : creds.username, password: creds.password}).then((res) =>{
            return res;
        }); 
        db.close();
    });
}

export function addEvent(conf){
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

export function getEvent(confid){
    MongoClient.connect(url, (err, db) => {
        if(err) throw err;
        let coll = db.collection("conferences");
        coll.findOne({"_id": ObjectID(confid)}).then((res)=>{
            return res; //return doc
        })
        db.close();
    });
}

export function addUser(user){
    MongoClient.connect(url, (err, db) => {
        if(err) throw err;
        let coll = db.collection("users");
        coll.insertOne(user).then((res)=>{
            return res; //return {acknowledged: true, objectid: "some id"}
        });
    });
}

export function updateEvent(conf){
    MongoClient.connect(url, (err, db) => {
        if(err) throw err;
        let coll = db.collection("conferences");
        coll.updateOne({"_id" : ObjectID(conf.id)},conf).then((res)=>{
            return res; //return {ackowledged, etc}
        });
    });
}

export function updateUser(usr){
    MongoClient.connect(url, (err, db) => {
        if(err) throw err;
        let coll = db.collection("users");
        coll.updateOne({"_id" : ObjectID(usr.id)}, usr).then((res)=>{
            return res; //return {ackowledged, etc}
        });
    });
}

export function joinEvent(joinreq){
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

export function leaveEvent(leavereq){
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