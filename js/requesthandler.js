const fs = require('fs'); //don't need fs for this'
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const ObjectID = require('mongodb').ObjectID;

const url = 'mongodb://localhost:27017/cpm';

createCollection("users"); //you don't need to create new tables, those are one time things
createCollection("conferences"); //you don't need to create new tables, those are one time things


module.exports = {
    new_user : function createCollection(users){
    MongoClient.connect(url, (err,db) => { 
        if(err) throw err;
         
        let coll1 = db.collection(users); //tab this in
            
        coll1.insertOne({ 
        "Name" : ,
        "Password" : ,
        "Email" : ,
        "Address" : ,
        "Number" : ,
        "Events" : []
                    }).then((res) =>{
                    console.log("Users added: ", res); 
                }); //why are we inserting an empty object? the object you want to insert is given to you, it's user (called in the function)
            
            db.close();
        });
    },      
    
    new_conference : function createCollection(conferences){
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





