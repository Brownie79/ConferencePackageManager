module.exports = {
    new_user ; function(user_obj){
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
    MongoClient.connect(url, (err,db) => {
        if(err) throw err;
        
        db.createCollection(Users);
        let coll = db.collection(Users);
        fs.readFile(Users.JSON, (err, file)=>{
            if(err) throw err;
            data = JSON.parse(file); /
            coll.insertOne(data).then((res) =>{
                console.log("Users added: ", res); 
            });
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
