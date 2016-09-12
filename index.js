// import statements
    //packages
    const express = require('express');
    const app = express();


//port listener
app.listen(80, (err) => {
    if(err) {4870
        return console.log("Cannot listen on port 4870 because, ", err);
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