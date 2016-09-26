const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const ObjectID = require('mongodb').ObjectID;

const url = 'mongodb://localhost:27017/cpm';

module.exports = {
    new_user : function(user){
        MongoClient.connect(url, (err,db) => { 
            if(err) throw err;
            
            let coll1 = db.collection("users"); 
                
            coll1.insertOne(user).then((res) =>{
                console.log("User added: ", res); 
            }); 
            db.close();
        });
    },      
    

    new_conference : function(conference){
        MongoClient.connect(url, (err,db) => {
        if(err) throw err;
        
        let coll2 = db.collection("conferences");

        coll2.insertOne(conference).then((res) =>{
            console.log("Conference added: ", res); 
        });
        
        db.close();
    });
}
}
