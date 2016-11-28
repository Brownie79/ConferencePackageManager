//imports
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const ObjectID = require('mongodb').ObjectID;

const url = 'mongodb://localhost:27017/cpm'; //points to the database we'll be using to read/write too

/*
1. Login Existing: GoogleID matches one in DB, return userinfo
2. Login New: GoogleID doesn't exist, create and return new user
*/
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
                //if google id not found, then make a new user
                if(!res){
                    let user = {
                        "googleID" : creds.googleID, 
                        "name" : "", 
                        "email" : "", 
                        "conferences" : [] 
                    }
                    coll.insertOne(user).then((res)=>{
                        console.log('user added ', user)
                        //resolve(res); //return {acknowledged: true, objectid: "some id"}
                        resolve(user);
                    });
                } else {
                    console.log("login successful: ", res)
                    resolve(res);
                }
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
            let usersColl = db.collection("users");
            //add conference
            let confColl = db.collection("conferences");

            confColl.insert(conf, function(err, doc){ //adds the conference
                console.log(doc);
                let docID = doc._id;
                let adminID = conf.organizer;
                usersColl.find({"googleID" : conf.organizer}, (err, user) => {
                    if(err) reject(err);
                    let attending = user.conferences;
                    attending.push(docID); //user is attending this conf
                    usersColl.update({ "googleID" : conf.organizer} , { $set: { "conferences" : attending } }); 
                    console.log('conf added')
                });    
            });
            db.close();
        });
    });
}

let getEventById = function(confid){
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

let getEventByName = function(confName){
    return new Promise(function(resolve, reject){
        MongoClient.connect(url, (err,db) => {
            if(err) reject(err);
            let confColl = db.collection("conferences");
            confColl.find({"name": confName}).then((res)=>{
                console.log('returning events by name', res)
                resolve(res);
            })
        })
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

/*let addUser = function(user){
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
}*/