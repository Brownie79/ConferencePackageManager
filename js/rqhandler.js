//imports
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const ObjectID = require('mongodb').ObjectID;

const url = 'mongodb://localhost:27017/cpm'; //points to the database we'll be using to read/write too

let login = function(creds){
    return new Promise((resolve,reject) => {
        MongoClient.connect(url, (err,db) => { 
            if(err) {
                console.log("error");
                reject(err);
            }
            let coll = db.collection("users"); //pre-defined collection users
            //inserts new user into the collection "users" one by one   
            //console.log("Creds: ", creds.googleID);
            coll.findOne({googleID : creds.googleID}).then((res) =>{
                //console.log(res);
                console.log("login successful: ", res)
                resolve(res);
            }); 
            db.close();
        });
    });
}

let addEvent = function(conf){
    //{userid: ___, confname:____, etc}
    return new Promise(function(resolve, reject){
        MongoClient.connect(url, (err, db) => {
            if(err) reject(err);

            //update admin with having added conference
            let c2 = db.collection("users");

            //add conference
            let coll = db.collection("conferences");
            coll.insert(conf, function(err, doc){
                console.log(doc);
                let docID = doc._id;
                let adminID = conf.organizer;
                let col2 = db.collection("users");
                c2.find({"googleID" : conf.organizer}, (err, user) => {
                    if(err) reject(err);
                    let attending = user.conferences;
                    attending.push(docID);
                    col2.update({ "googleID" : conf.organizer} , { $set: { "conferences" : attending  } }); 
                    console.log('conf added')
                });    
            })
            db.close();
        });
    });
}

let getEvent = function(confid){
    return new Promise(function(resolve,reject){
        MongoClient.connect(url, (err, db) => {
            if(err) reject(err);
            let coll = db.collection("conferences");
            coll.findOne({"_id": ObjectID(confid)}).then((res)=>{
                console.log('returning event ' , res)
                resolve(res); //return doc
            })
            db.close();
        });
    })
}

let addUser = function(user){
    return new Promise(function(resolve,reject){
        MongoClient.connect(url, (err, db) => {
            if(err) reject(err);
            let coll = db.collection("users");
            coll.insertOne(user).then((res)=>{
                console.log('user added ', res)
                resolve(res); //return {acknowledged: true, objectid: "some id"}
            });
        });
    })
}

let updateEvent = function(conf){
    return new Promise(function(resolve,reject){
        MongoClient.connect(url, (err, db) => {
            if(err) reject(err);
            let coll = db.collection("conferences");
            coll.updateOne({"_id" : ObjectID(conf.id)},conf).then((res)=>{
                resolve(res); //return {ackowledged, etc}
            });
        });
    })
}

let updateUser = function(usr){
    return new Promise(function(resolve, reject){
        MongoClient.connect(url, (err, db) => {
            if(err) throw err;
            let coll = db.collection("users");
            coll.updateOne({"googleID" : ObjectID(usr.id)}, usr).then((res)=>{
                return res; //return {ackowledged, etc}
            });
        });
    })
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
