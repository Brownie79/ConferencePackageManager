//imports
    const fs = require('fs'); // file-system access for reading/writing to disk
    const MongoClient = require('mongodb').MongoClient;
    const assert = require('assert');
    const ObjectID = require('mongodb').ObjectID;

    const url = 'mongodb://loScalhost:27017/cpm'; //points to the database we'll be using to read/write too

/*
    Sample Data files are in sampledata/filename.json
    run as node reset.js    
    1. Clear all existing data in the tables
    2. Add users
    3. Add conferences

*/

//main
cleardb();
createCollection("users");
createCollection("conferences");

function cleardb(){
    MongoClient.connect(url, (err,db) => {
        if(err) throw err;

        //gets the names of all the collections in the database, and deletes all records
        db.getCollectionNames().forEach(function(collection_name){
                db[collection_name].remove();
            });

        db.close();
    });
}

function createCollection(colname){
    MongoClient.connect(url, (err,db) => {
        if(err) throw err;
        //create the collection in the db
        db.createCollection(colname);
        let coll = db.collection(colname);
        //load documents into the collection
        fs.readFile(colname+".json", (err, file)=>{
            if(err) throw err;
            data = JSON.parse(file); //list of objects
            //adding many documents to the database using a promise instead of callback
            coll.insertMany(data).then((res) =>{
                console.log("Docs added: ", res); //number of docs added
            });
        });
        db.close();
    });
}