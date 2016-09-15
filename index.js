// import statements
    //packages
    const express = require('express');
    const app = express();


//port listener
app.listen(4870, (err) => {
    if(err) {
        return console.log("Cannot listen on port 4870 because, ", err);
    } else {
        console.log("Server running on 162.243.86.227:4870");
    }
});

//Request handlers
app.get('/test', (req, res) => {
    response = "Server returned response sucessfully!";
    res.writeHead(200, {
        'Content-Type': "text/html",
        'Content-Length' : response.length
    });
    res.write(response);
    res.end();
});

//this comment for a commit