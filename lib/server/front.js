var http = require('http');
var static = require('node-static');
var fs = require('fs');
var _ = require('lodash');
var gzip = require('../utils/gzip');
var col = require('../utils/color');
var init = require('../');
var config = require('../config');
var fileServer = new static.Server('./', config.front.server);


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
}).listen(config.front.port, function(){
  col.logInit('g', 'c', 'server:front', ' listening on port ' + config.front.port)
});

//gzip('./app/data/templates.json')


init()
