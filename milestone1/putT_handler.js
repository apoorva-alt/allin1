"use strict";
exports.__esModule = true;
exports.put_handler = void 0;
// const fs = require('fs');
var fs = require("fs");
var records = fs.readFileSync('db.json', 'utf8');
var putBookListtHandler = function (req, res) {
    var data = JSON.parse(records)["books"];
    req.on('data', function (chunk) {
        data = JSON.parse(chunk.toString('utf8'));
    });
    req.on('end', function () {
        res.end(JSON.stringify(data));
    });
};
var putBookDetailHandler = function (req, res) {
    var _a;
    var parts = (_a = req.url) === null || _a === void 0 ? void 0 : _a.split('/');
    var data = JSON.parse(records)["books"];
    // console.log("in put idx handler");
    req.on('data', function (chunk) {
        var change = JSON.parse(chunk.toString());
        for (var i = 0; i < records.length; i++) {
            if (i === (+parts[parts.length - 1] - 1)) {
                data[i] = change;
            }
        }
    });
    req.on('end', function () {
        res.end(JSON.stringify(data));
    });
};
var putNotFoundHandler = function (req, res) {
    res.end("Not Found: " + req.url);
};
var put_handler = function (req, res) {
    console.log("Handling " + req.method + " method");
    if (req.url === '/books')
        return putBookListtHandler(req, res);
    else if (req.url && req.url.length > 1 && req.url.indexOf('/books') === 0)
        return putBookDetailHandler(req, res);
    else
        return putNotFoundHandler(req, res);
};
exports.put_handler = put_handler;
// module.exports.put_handler = put_handler;
