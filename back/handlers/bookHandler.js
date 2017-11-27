'use strict';

var gbooks = require('google-books-search');
var Book = require('../models/book');

function BookHandler() { 
    
    this.getBooks = function(req, res) {
        Book.find((err, books) => {
            if (err) res.status(500).send(err);

            res.json(books);
        });
    };
    
    this.searchBooks = function(req, res){
        gbooks.search(req.body.title, function(err, results) {
            if (err) res.status(500).send(err);
            
            res.json(results);
        });
    };
    
    this.addBook = function(req, res) {
        console.log("req.body => ", req.body);

        var newBook = new Book(req.body);

        newBook.save((err, book) => {
            if (err) res.status(500).send(err);

            //console.log("Saved book: ", book);
            res.json(book);
        });
    };
    
}

module.exports = BookHandler;