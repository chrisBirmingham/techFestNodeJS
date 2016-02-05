var express = require("express");
var app = express();

/**
 * Tells express to server all files in the www folder
 * If it finds index.html it will serve that file on a / request
 */
app.use(express.static("./www/"));

/**
 * On a get request for the url /hello send hello
 */
app.get("/hello", function(req, res){
    res.send("Hello");
});

/**
 * Function to respond to all types of requests and urls with a 404 if the other
 * routes/static links are not found
 */
app.all("*", function(req, res){
   res.status(404);
   res.send("Not found");
});


/**
 * Tells express to listen on a specific port
 */
app.listen(8888, function(){
    console.log("Imma runnin");
});
