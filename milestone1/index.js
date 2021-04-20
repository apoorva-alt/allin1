"use strict";
// const http = require('http');
// const {get_handler} = require('./get_handler');
// const {post_handler} = require('./post_handler');
// const {put_handler} = require('./put_handler');
// const {delete_handler} = require('./delete_handler');
exports.__esModule = true;
var http = require("http");
var getT_handler_js_1 = require("./getT_handler.js");
var postT_handler_js_1 = require("./postT_handler.js");
var putT_handler_js_1 = require("./putT_handler.js");
var deleteT_handler_js_1 = require("./deleteT_handler.js");
var notFoundHandler = function (req, res) {
    res.end("Not Found method in current Applicartion : " + req.method);
};
var request_handler = function (req, res) {
    console.log("Received " + req.method + " " + req.url);
    if (req.method === 'GET') {
        return getT_handler_js_1.get_handler(req, res);
    }
    else if (req.method === 'POST') {
        // console.log('here')
        return postT_handler_js_1.post_handler(req, res);
    }
    else if (req.method === 'PUT') {
        // console.log('In PUT');
        return putT_handler_js_1.put_handler(req, res);
    }
    else if (req.method === 'DELETE') {
        return deleteT_handler_js_1.delete_handler(req, res);
    }
    else {
        return notFoundHandler(req, res);
    }
};
var server = http.createServer(request_handler);
server.on('error', function (err) { return console.log('Error Starting Server', err.message); });
var port = 5000;
server.listen(port, function () {
    console.log("Server listening on port " + port);
});
