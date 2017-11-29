'use strict';
var jwt = require('jwt-simple');
var gbooks = require('google-books-search');

var config = require('../config/database'); // get db config file
var User = require('../models/user');
var Book = require('../models/book');


function BookHandler() {

    this.getBooks = function(req, res) {
        Book.find((err, books) => {
            if (err) res.status(500).send(err);

            res.json(books);
        });
    };

    this.searchBooks = function(req, res) {
        var token = getToken(req.headers);
        if (token) {
            gbooks.search(req.body.title, function(err, results) {
                if (err) res.status(500).send(err);

                res.json(results);
            });
        }
        else {
            return res.status(403).send({ success: false, msg: 'No token provided.' });
        }
    };

    this.addBook = function(req, res) {
        //console.log("req.body => ", req.body);
        var token = getToken(req.headers);
        if (token) {
            var decoded = jwt.decode(token, config.secret);
            var newBook = new Book(req.body);

            newBook.owner = decoded._id;
            newBook.save((err, book) => {
                if (err) res.status(500).send(err);

                //console.log("Saved book: ", book);
                res.json(book);
            });
        }
        else {
            return res.status(403).send({ success: false, msg: 'No token provided.' });
        }
    };

    this.getMyBooks = function(req, res) {
        var token = getToken(req.headers);
        if (token) {
            var decoded = jwt.decode(token, config.secret);
            Book.find({ owner: decoded._id }, (err, books) => {
                if (err) res.status(500).send(err);

                res.json(books);
            });
        }
        else {
            return res.status(403).send({ success: false, msg: 'No token provided.' });
        }
    };

    this.removeBook = function(req, res) {
        var token = getToken(req.headers);
        if (token) {
            var bookId = req.params.id;
            Book.findByIdAndRemove(bookId, (err, doc) => {
                if (err) res.status(500).send(err);

                res.json({ id: doc._id });
            });
        }
        else {
            return res.status(403).send({ success: false, msg: 'No token provided.' });
        }
    };

    var getToken = function(headers) {
        if (headers && headers.authorization) {
            var parted = headers.authorization.split(' ');
            if (parted.length === 2) {
                return parted[1];
            }
            else {
                return null;
            }
        }
        else {
            return null;
        }
    };

}

module.exports = BookHandler;
