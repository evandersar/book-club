'use strict';

var path = process.cwd();
var BookHandler = require(path + '/back/bookHandler.js');

module.exports = function(app) {
	
	var bookHandler = new BookHandler();
	
	app.route('/api/items')
		.post(bookHandler.searchBooks)
		.get(bookHandler.getBooks);

	app.use(function(req, res) {
		res.sendFile(path + '/public/index.html');
	});

};