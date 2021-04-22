"use strict";
exports.__esModule = true;
exports.get_handler = void 0;
var fs = require("fs");
// const fs = require('fs');
var records;
fs.readFile('db.json', 'utf8', function (err, data) {
    if (err)
        console.log("Erroe whilw loading data");
    else
        records = data;
});
var getHomeRouteHandler = function (req, res) {
    res.end("Welocome to my server");
};
var getBookListHandler = function (req, res) {
    if (records)
        res.end(records);
    else
        res.end("Data Not Found");
};
var getBookDetailHandler = function (req, res) {
    var _a;
    var parts = (_a = req.url) === null || _a === void 0 ? void 0 : _a.split('/');
    var data = JSON.parse(records);
    console.log("Record Index: " + +parts[parts.length - 1]);
    res.end(JSON.stringify(data['books'][+parts[parts.length - 1] - 1]));
};
var getNotFoundHandler = function (req, res) {
    res.end("NOT FOUND : " + req.url);
};
var searchSpecific = function (searchString) {
    var data = JSON.parse(records)["books"];
    if (searchString.has('_id')) {
        for (var i = 0; i < data.length; i++) {
            if (data[i]._id == searchString.get('_id'))
                return JSON.stringify(data[i]);
        }
    }
    else if (searchString.has('title')) {
        var dummy = [];
        for (var i = 0; i < data.length; i++) {
            if (data[i].title.includes(searchString.get('title')))
                dummy.push(data[i]);
        }
        return JSON.stringify(dummy);
    }
    else if (searchString.has('author')) {
        var dummy = [];
        for (var i = 0; i < data.length; i++) {
            if (data[i].author.includes(searchString.get('author')))
                dummy.get(data[i]);
        }
        return JSON.stringify(dummy);
    }
    else if (searchString.has('price')) {
        var dummy = [];
        for (var i = 0; i < data.length; i++) {
            if (data[i].price === searchString.get('price'))
                dummy.push(data[i]);
        }
        return JSON.stringify(dummy);
    }
    else if (searchString.has('votes')) {
        var dummy = [];
        for (var i = 0; i < data.length; i++) {
            if (data[i].votes === searchString.get('votes'))
                dummy.push(data[i]);
        }
        return JSON.stringify(dummy);
    }
    else if (searchString.has('min') && searchString.has('max')) {
        var dummy = [];
        for (var i = 0; i < data.length; i++) {
            if (data[i].price >= searchString.get('min') && data[i].price <= searchString.get('max'))
                dummy.push(data[i]);
        }
        return JSON.stringify(dummy);
    }
    else if (searchString.has('text')) {
        var dummy = [];
        for (var i = 0; i < dummy.length; i++) {
            if (JSON.stringify(data[i]).includes(searchString.get('text')))
                dummy.push(data[i]);
        }
        return JSON.stringify(dummy);
    }
    else
        return "Invalid Search String";
};
var getSearchHandler = function (req, res) {
    var _a;
    // console.log(req.url.substring(7));
    var searchString = new URLSearchParams((_a = req.url) === null || _a === void 0 ? void 0 : _a.substring(7));
    console.log(searchString);
    res.end(searchSpecific(searchString));
};
var get_handler = function (req, res) {
    console.log("Handling " + req.method + " method");
    if (req.url === '/')
        return getHomeRouteHandler(req, res);
    else if (req.url === '/books')
        return getBookListHandler(req, res);
    else if (req.url && req.url.length > 1 && req.url.indexOf('/books') === 0) {
        if (req.url.indexOf('/?') === 6)
            return getSearchHandler(req, res);
        else {
            // console.log('here actually');
            return getBookDetailHandler(req, res);
        }
    }
    else
        return getNotFoundHandler(req, res);
};
exports.get_handler = get_handler;
