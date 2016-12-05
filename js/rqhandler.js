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
                console.log("Login Response: ", res);
                //if google id not found, then make a new user
                if(!res){
                    let user = {
                        "googleID" : creds.googleID, 
                        "name" : "", 
                        "email" : "", 
                        "conferences" : "" 
                    }
                    //console.log("adding user: ", user)
                    coll.insertOne(user, function(err, doc){
                        if(err){
                            console.log("error insering doc: ", err);
                            db.close();
                            reject(err);
                        } 
                        console.log('user added: ', doc.ops[0])
                        db.close();
                        resolve(doc.ops[0]);
                    });
                } else {
                    console.log("login successful: ", res)
                    db.close();
                    resolve(res);
                }
            }); 
        });
    });
}

let loginAngular = function(creds){
    return new Promise((resolve,reject) => {
        MongoClient.connect(url, (err,db) => { 
            if(err) {
                console.log("error");
                reject(err);
            }
            let coll = db.collection("users"); //pre-defined collection users
            //inserts new user into the collection "users" one by one   
            //console.log("Creds: ", creds.googleID);
            coll.findOne({email : creds.email}).then((res) =>{
                console.log("Login Response: ", res);
                //if google id not found, then make a new user
                if(!res){
                    //console.log("adding user: ", user)
                    coll.insertOne(creds, function(err, doc){
                        if(err){
                            console.log("error insering doc: ", err);
                            db.close();
                            reject(err);
                        } 
                        //console.log('user added: ', doc.ops[0])
                        db.close();
                        resolve(doc.ops[0]);
                    });
                } else {
                    //console.log("login successful: ", res)
                    resolve(res);
                    db.close();
                }
            }); 
        });
    });
}

let addEvent = function(conf){
    //{userid: ___, confname:____, etc}
    //MAKE SURE USERID ALREADY IN ATTENDING FOR CONFERENCE
    return new Promise(function(resolve, reject){
        MongoClient.connect(url, (err, db) => {
            if(err) reject(err);

            //update admin with having added conference
            let usersColl = db.collection("users");
            //add conference
            let confColl = db.collection("conferences");
            conf["attendees"] = conf.organizer;

            confColl.insert(conf, function(err, doc){ //adds the conference
                console.log("added conf: ", doc);
                let docID = doc.insertedIds[0];
                let adminID = conf.organizer;
                usersColl.find({"email" : conf.organizer}, (err, user) => {
                    if(err) reject(err);
                    let attending = user.conferences;
                    if(attending === ""){
                        attending = docID;
                    } else {
                        attending = attending + "," + docID;
                    }
                    //attending.push(docID); //user is attending this conf
                    usersColl.update({ "email" : conf.email} , { $set: { "conferences" : attending } }); 
                    console.log('conf added')
                    resolve({"eventID":doc.ops[0]._id});
                });    
            });
            db.close();
        });
    });
}

//needs to have .then cause find() is promise
let getEventById = function(confid){
    return new Promise(function(resolve,reject){
        MongoClient.connect(url, (err, db) => {
            if(err) reject(err);
            let coll = db.collection("conferences");
            coll.findOne({"_id": ObjectID(confid)}, function(err, doc){
                console.log('returning event ' , res)           
                db.close();
                resolve(res); //return doc
            });
        });
    })
}

let getEventByName = function(confName){
    return new Promise(function(resolve, reject){
        MongoClient.connect(url, (err,db) => {
            if(err) reject(err);
            let confColl = db.collection("conferences");
            /*
            confColl.find({eventName: confName}).then(function(docs){
                console.log('returning docs by name: ', docs);
                db.close();
                resolve(docs);
            })
            */
            /**/
            confColl.findOne({eventName: confName}, function(err, docs){
                if(err) reject(err);
                //if(!docs) resolve({"success":false});
                console.log('returning events by name', docs);
                db.close();
                resolve(docs);
            });
            
        });
    });
}

let getAllEvents = function(){
    return new Promise(function(resolve, reject){
        MongoClient.connect(url, (err, db) => {
            if(err) reject(err);
            let confColl = db.collection("conferences");
            confColl.find().toArray().then(function(docs){
                console.log(docs);
                resolve(docs);
                db.close();
            })
            /*confColl.find({}, function(err, res){
                let docs = []
                res.each(function(err, doc) {
                    docs.push(doc);
                });
                console.log('returning all events:', docs);
                db.close();
                resolve(res);
            });    */
        });
    });
}

let joinEvent = function(joinreq){
    /*{
        userEmail: ____,
        confID: ____
    }*/

    return new Promise(function(resolve, reject){
        MongoClient.connect(url, (err, db) => {
            if(err) throw err;
            let confColl = db.collection("conferences");
            let userColl = db.collection("users");
            
            //add user to conf's attendees
            confColl.find({"_id":ObjectID(joinreq.confID)}, function(err, conf){
                console.log("conf attendees: ", conf.attendees);
                if(err) reject(err);
                conf.attendees = conf.attendees + "," + joinreq.userEmail;
                confColl.update({"_id":ObjectID(joinreq.confID)}, 
                    {$set: {"attendees": conf.attendees}});
            });

            //add conf to user's atttending
            userColl.find({"email":joinreq.userEmail, function(err, user){
                if(err){
                    console.log(err);
                    reject(err);
                } 
                console.log("user conferences: " , user.conferences);
                if(user.conferences == ""){
                    user.conferences = joinreq.confID;
                } else {
                    user.conferences = user.conferences + "," + joinreq.confID;
                }
                userColl.update({"email":joinreq.userEmail}, 
                    { $set: {conferences: user.conferences}}, function(){
                        resolve({success: "true"});
                        db.close();       
                    });     
            }});
        });
    });
    
}

let leaveEvent = function(joinreq){
    /*{
        userEmail: ____,
        confID: ____
    }*/

    return new Promise(function(resolve, reject){
        MongoClient.connect(url, (err, db) => {
            if(err) throw err;
            let confColl = db.collection("conferences");
            let userColl = db.collection("users");


            //remove user from conf's attendees
            confColl.find({"_id":ObjectID(joinreq.confID)}, function(err, conf){
                if(err) reject(err);

                //can't remove user if organizing
                if(conf.organizer == joinreq.userEmail){
                    console.log("can't remove organizer");
                    db.close();
                    return;
                }


                let attendees = conf.attendees.split(",");
                attendees.splice(attendees.indexOf(joinreq.userEmail), 1);
                let nAttendees = "";
                for(let a in attendees){
                    nAttendees = nAttendees + "," + a;
                }
                confColl.update({"_id":ObjectID(joinreq.confID)}, 
                    {$set: {"attendees": nAttendees}});
            });

            //remove conf from user's atttending
            userColl.find({"email":joinreq.userEmail, function(err, user){
                if(err) reject(err);
                let usrconf = user.conferences.split(",");
                usrconf.splice(usrconf.indexOf(joinreq.confID),1);
                let nconf = "";
                for(let c of usrconf){
                    nconf = nconf + "," + c;
                }
                userColl.update({"email":joinreq.userEmail}, 
                { $set: {conferences: nconf}}, function(){
                    resolve({success: 'true'});
                    db.close();
                });            
            }});
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

module.exports = {
    login : login,
    addEvent : addEvent,
    getEventById : getEventById,
    getEventByName : getEventByName,
    getAllEvents : getAllEvents,
    updateEvent : updateEvent,
    updateUser : updateUser,
    joinEvent : joinEvent,
    leaveEvent : leaveEvent,
    loginAngular: loginAngular
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