var http = require('http');
var static = require('node-static');
var fs = require('fs');
var _ = require('lodash');
var fileServer = new static.Server('./');
var init = require('./lib');

http.createServer(function (request, response) {
    request.addListener('end', function () {
        fileServer.serve(request, response, function (err, result) {
            if (err) { // There was an error serving the file
                console.error("Error serving " + request.url + " - " + err.message);

                // Respond to the client
                response.writeHead(err.status, err.headers);
                response.end();
            }
        });
    }).resume();
}).listen(8080);

init()
