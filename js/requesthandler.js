const fs = require('fs');
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const ObjectID = require('mongodb').ObjectID;

const url = 'mongodb://localhost:27017/cpm';

createCollection("users");
createCollection("conferences");


module.exports = {
    new_user : function createCollection(users){
    MongoClient.connect(url, (err,db) => { 
        if(err) throw err;
         
    let coll1 = db.collection(users); 
        
    coll1.insertOne({
    "Name" : ,
 	"Password" : ,
 	"Email" : ,
 	"Address" : ,
    "Number" : ,
    "Events" : []
                }).then((res) =>{
                console.log("Users added: ", res); 
            }); 
        
        db.close();
    });
}      
  	
    },
    
    new_conference ; function createCollection(conferences){
    MongoClient.connect(url, (err,db) => {
        if(err) throw err;
        
        let coll2 = db.collection(conferences);

    coll2.insertOne({ 
    "Event_name" : ,
 	"Location" : ,
 	"Date" : ,
 	"Schedule" : }).then((res) =>{
                console.log("Conferences added: ", res); 
            });
        
        db.close();
    });
}