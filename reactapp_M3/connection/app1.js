"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var body_parser_1 = __importDefault(require("body-parser"));
var express_1 = __importDefault(require("express"));
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var jwt = jsonwebtoken_1.default;
var cors = require('cors');
var port = 5000;
var app = express_1.default();
var mongoose = require('mongoose');
var refreshTokens = [];
// const Book= require('./book');
var book_1 = require("./book");
var dbURI = "mongodb://localhost/first";
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(function (_result) { return console.log('Connected Successfully to DataBase'); })
    .catch(function (err) { return console.log(err); });
// app.use(function(req, res, next){
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Allow-Control-Allow-Methods", "GET,POST, DELETE, PUT");
//     res.header("Acess-Control-Allow-Headers", "Origin,X-Requested-With, Content-Type,Accept");
//     next();
// })
app.use(cors());
app.use(body_parser_1.default.json());
app.post("/register", function (req, res) {
    // const username = req.body.username;
    // const password = req.body.password;
    // const newuser = 
    var user = new book_1.User({
        username: req.body.username,
        password: req.body.password
    });
    console.log(user);
    console.log(req.body);
    user.save();
    jwt.sign(user, 'pangong', { expiresIn: '1h' });
    res.send(user);
});
app.post("/login", function (req, res) {
    // console.log('going in');
    var username = req.body.username;
    var password = req.body.password;
    // console.log(username, password)
    // const user = {username, password}
    book_1.User.findOne({ username: username, password: password })
        .then(function (user) {
        var accessToken = jwt.sign({ username: user.username }, 'pangnong', { expiresIn: '20m' });
        var refreshToken = jwt.sign({ username: user.username }, 'pangnong');
        refreshTokens.push(refreshToken);
        console.log('user', user.username);
        res.json({ accessToken: accessToken, refreshToken: refreshToken, user: user });
    })
        .catch(function (err) {
        res.send('Error Occurend check username and password' + err.name);
    });
});
app.post('/logout', function (req, res) {
    var token = req.body.token;
    // refreshToken = refreshTokens.filter(token => t !== token)
});
app.get("/books", function (_req, res) {
    // console.log('herer');
    book_1.Book.find()
        .then(function (result) {
        res.json(result.filter(function (ress) { return ress.Mail === _req.body.Mail; }));
    })
        .catch(function (error) { return console.log(error); });
});
app.get("/bookDetails/:id", function (req, res) {
    var id = req.params.id;
    console.log(id);
    book_1.Book.findById(id)
        .then(function (result) {
        res.send(result);
    })
        .catch(function (error) { return console.log(error); });
});
app.delete("/books/:id", function (req, res) {
    var id = req.params.id;
    book_1.Book.deleteOne({ _id: id })
        .then(function () {
        res.status(200).json({
            message: 'Books deleted'
        });
    })
        .catch(function (error) { return console.log(error); });
});
app.get('/books/price/:min/:max', function (req, res) {
    var min = req.params.min;
    var max = req.params.max;
    book_1.Book.find({ $and: [{ 'price': { $gte: min } }, { 'price': { $lte: max } }] })
        .then(function (result) {
        console.log("here", result);
        res.send(result);
    })
        .catch(function (error) { return console.log(error); });
});
app.post('/books', function (req, res) {
    var book = new book_1.Book(req.body);
    book.save();
    res.send(book);
});
app.put('/books/:id', function (req, res) {
    var book = new book_1.Book({
        _id: req.params.id,
        title: req.body.title,
        author: req.body.author,
        price: req.body.price,
        rating: req.body.rating,
    });
    book_1.Book.update({ _id: req.params.id }, book)
        .then(function () {
        res.status(201).json({
            message: 'Book updated successfully'
        });
    }).catch(function (error) { return console.log(error); });
});
function authenticationTokens(req, res, next) {
    var authHeader = req.headers['authorization'];
    var token = authHeader && authHeader.split(" ")[1];
    if (token == null)
        return res.sendStatus(401);
    jwt.verify(token, 'pangong', function (err, user) {
        if (err)
            return res.status(403).send('Something Went Wrong' + err.name);
        req.user = user;
        next();
    });
}
app.listen(port, function () {
    console.log("Server Started at port " + port);
});
