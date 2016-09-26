module.exports = {
    new_user : function(user_obj){        //// These are not objects, these functions. as in the functions you have below should go here in this space. 
  	"user_id" : ObjectId(" "),
 	"Name" : ,
 	"Password" : ,
 	"Email" : ,
 	"Address" : ,
     "Number" : ,
     "Events" : []
    },
    new_conference : function(conference_obj){
    "Event_name" : ObjectId(" "),
 	"Location" : ,
 	"Date" : ,
 	"Schedule" :    
    }
}

function createCollection(Users){
    MongoClient.connect(url, (err,db) => { //you have to import MongoClient (see reset.js for imports)
        if(err) throw err;
        
        db.createCollection(Users); // why are we creating a new collection? you should be INSERTing into an existing collection, not creation new ones
        let coll = db.collection(Users); //this line is correct
        fs.readFile(Users.JSON, (err, file)=>{ //what is "Users.JSON"? that variable doesn't exist (nor needs too) for this
            if(err) throw err;
            data = JSON.parse(file); // you don't need to parse anything, user_obj and conference_obj are going to be json objects already
            coll.insertOne(data).then((res) =>{
                console.log("Users added: ", res); 
            }); //this is correct
        });
        db.close();
    });
}

function createCollection(Conferences){
    MongoClient.connect(url, (err,db) => {
        if(err) throw err;
        
        db.createCollection(Conferences);
        let coll = db.collection(Conferences);
        fs.readFile(conferences.JSON, (err, file)=>{
            if(err) throw err;
            data = JSON.parse(file); /
            coll.insertOne(data).then((res) =>{
                console.log("Conferences added: ", res); 
            });
        });
        db.close();
    });
}
