var mongoose = require('mongoose');

var bookSchema = mongoose.Schema({
    
    googleId: String,
    title: String,
    link: String,
    thumbnail: String,
    author: String,
    publisher: String,
    date: String,
    pages: Number,
    owner: String,
    ownerName: String
    
});

bookSchema.index({ googleId: 1, owner: 1}, { unique: true });

module.exports = mongoose.model('Book', bookSchema);