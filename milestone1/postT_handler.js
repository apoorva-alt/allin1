"use strict";
exports.__esModule = true;
exports.post_handler = void 0;
// const fs = require('fs');
var fs = require("fs");
var records = fs.readFileSync('db.json', 'utf8');
var postBookDetailHandler = function (req, res) {
    var data = JSON.parse(records)["books"];
    req.on('data', function (chunk) {
        data.push(JSON.parse(chunk.toString('utf8')));
    });
    req.on('end', function () {
        res.end(JSON.stringify(data));
        // console.log(typeof data);
        // fs.writeFileSync('db2.json', JSON.stringify(data));
    });
};
var postNotFoundHandler = function (req, res) {
    res.end("NOT FOUND : " + req.url);
};
var post_handler = function (req, res) {
    console.log("Handling " + req.method + " method");
    if (req.url === '/books') {
        return postBookDetailHandler(req, res);
    }
    else
        return postNotFoundHandler(req, res);
};
exports.post_handler = post_handler;
// module.exports.post_handler = post_handler;
