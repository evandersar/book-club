'use strict';

var gbooks = require('google-books-search');
//var Book = require('./models/book');

function BookHandler() { 
    
    this.getBooks = function(req, res) {
        /*Book.find((err, books) => {
            if (err) res.status(500).send(err);

            res.json(books);
        });*/
        
        gbooks.search("You Don't Know JS", function(err, results) {
            if (err) res.status(500).send(err);
            
            res.json(results);
        });
        
    };
    
}

module.exports = BookHandler;