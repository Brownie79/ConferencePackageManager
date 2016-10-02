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
            
            let coll1 = db.collection("users"); //pre-defined collection users

            //inserts new user into the collection "users" one by one   
            coll1.insertOne(user).then((res) =>{
                console.log("User added: ", res); //displays the doc added
            }); 
            db.close();
        });
    },      
    

    new_conference : function(conference){
        MongoClient.connect(url, (err,db) => {
        if(err) throw err;
        
        let coll2 = db.collection("conferences"); //pre-defined collection conferences

        //inserts new conference into the collection "conferences" one by one 
        coll2.insertOne(conference).then((res) =>{
            console.log("Conference added: ", res); //displays the doc added
        });
        
        db.close();
    });
   },

      search_user: function(user){
       MongoClient.connect(url, (err,db) => {
        if(err) throw err;
        
        let coll3 = db.collection("users"); //pre-defined collection users

        //finds the logged-in user in the collection "users" and returns a cursor to it
        coll3.findOne(user).then((res) =>{
            console.log("User Found: ", res); //displays the doc found
        });
      }
    }
}
