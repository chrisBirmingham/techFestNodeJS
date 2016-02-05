//Node JS inbuilt library to parse reqest urls
var url = require("url");
//Node JS inbuild library to perform tasks on files
var fs = require("fs");
//User build library to parse request POST data
var formidable = require("formidable");

/**
 * Function to that calls the fs library to read a file
 */
function staticFile(pathname, res){
    /**
     * Function that attempts to read a file and on finishing calls the function
     * given to it as its final parameter
     */
    fs.readFile("./www" + pathname, function(err, data){
        if(err){
            res.writeHead(404, {"Content-Type" : "text/html"});
            res.end("<h1>404 Not Found</h1>");
        } else {
            res.writeHead(200);
            res.end(data);
        }
    });
}

/**
 * Function to get query data from the url. Checks if it is undefined
 */
function getHello(url, res){
    //Line to tell node js to add extra checks. If something is undefined
    //instead of failing silently it will kill the program and tell you where
    //the undefined element is.
    "use strict";
    var name = url.query["name"];
    var text = "";
    //By default if a variable does not have a value it will be undefined
    if(name === undefined){
        text = "No name given";
    } else {
        text = "Hello there " + name;
    }
    res.writeHead(200);
    res.end(text);
}

function getRequest(req, res){
    var askedUrl = url.parse(req.url, true);
    var pathname = askedUrl.pathname;
    if(pathname === "/getHello"){
        getHello(askedUrl, res);
    } else {
        staticFile(pathname, res);
    }
}

/**
 * Function that uses formidable to get the post data from a request
 */
function postHello(req, res){
    var form = new formidable.IncomingForm();
    form.parse(req, function(err, fields, files){
        res.writeHead(200);
        res.end("Hello there " + fields["name"]);
    });
}

function postRequest(req, res){
     var askedUrl = url.parse(req.url, true);
    var pathname = askedUrl.pathname;
    if(pathname === "/postHello"){
        postHello(req, res);
    } else {
        res.writeHead(404, {"Content-Type" : "text/html"});
        res.end("<h1>404 Not Found</h1>");
    }
}

function route(req, res){
    switch(req.method){
        case "GET":
            getRequest(req, res);
            break;
        case "POST":
            postRequest(req, res);
            break;
        default:
            res.writeHead(405, {"Content-Type" : "text/html"});
            res.end("<h1>Method not allowed</h1>");
    }
}

/**
 * Exports an object with the member variable route has the route function as
 * its value so other scripts can call the function
 */
module.exports = {
    route : route
};
