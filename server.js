//Import Express package
const express = require('express');

//Initialise express framework
const app = express();

//Serving static files from public folder
app.use(express.static('public'));

//Serve index file for the root path
app.get('/', function(req, res) {
    res.sendFile(__dirname + '/public/index.html')
   })

//Starting server, listen for incoming traffic, log message to the console
let server = app.listen(8888, function(){
    console.log("App server is running on port 8888");
   });


