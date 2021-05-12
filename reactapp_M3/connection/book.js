"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = exports.Book = void 0;
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        requaired: true
    }
});
var bookSchema = new Schema({
    title: {
        type: String,
        // required : true
    },
    author: {
        type: String,
        // required : true
    },
    price: {
        type: Number,
        // required : true
    },
    rating: {
        type: Number,
        // required : true
    },
    cover: {
        type: String,
    }
}, { timestamps: true }); //passing a constructor here
//craeting a mode based on tht  object
var Book = mongoose.model('books', bookSchema);
exports.Book = Book;
var User = mongoose.model('users', userSchema);
exports.User = User;
