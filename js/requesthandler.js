//imports
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const ObjectID = require('mongodb').ObjectID;

const url = 'mongodb://localhost:27017/cpm'; //points to the database we'll be using to read/write too

//exports
module.exports = {
    new_user : function(user){
        MongoClient.connect(url, (err,db) => { 
            if(err) throw err;
            
            let coll = db.collection("users"); //pre-defined collection users

            //inserts new user into the collection "users" one by one   
            coll.insertOne(user).then((res) =>{
                console.log("User added: ", res); //displays the doc added
            }); 
            db.close();
        });
    },      
    

    new_conference : function(conference){
        MongoClient.connect(url, (err,db) => {
        if(err) throw err;
        
        let coll = db.collection("conferences"); //pre-defined collection conferences

        //inserts new conference into the collection "conferences" one by one 
        coll.insertOne(conference).then((res) =>{
            console.log("Conference added: ", res); //displays the doc added
        });
        
        db.close();
    });
    },

      search_user: function(user){
       MongoClient.connect(url, (err,db) => {
        if(err) throw err;
        
        let coll = db.collection("users"); //pre-defined collection users

        //finds the logged-in user in the collection "users" and returns a cursor to it
        coll.findOne( { username: user.username} ).then((res) =>{
            console.log("User Found: ", res); //displays the doc found
        });
      }
    },

      search_conference: function(conference){
       MongoClient.connect(url, (err,db) => {
        if(err) throw err;
        
        let coll = db.collection("conferences"); //pre-defined collection users

        //finds the event in the collection "conferences" and returns a cursor to it
        coll.findOne( { eventID: conference.objectID()} ).then((res) =>{
            console.log("Conference Found: ", res); //displays the doc found
        });
      }
    }
}
