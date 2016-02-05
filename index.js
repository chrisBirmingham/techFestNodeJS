//Node JS inbuilt library for setting up socket listeners
var http = require("http");
var router = require("./router");

function main(){
    /**
     * Function to start listening on a specific port and call a given function
     * each time a connection is made
     */
    http.createServer(function(req, res){
        //req is an object representation for a request from a client
        //res is an object representation for responding to a client request
        router.route(req, res);
    }).listen(8888);
    console.log("Server started on port 8888");
}

/**
 * Check to see if this script is the one called by Node and if so call the main
 * function
 */
if(require.main === module){
    main();
}
