'use strict';

var path = process.cwd();
var passport = require('passport');

var BookHandler = require(path + '/back/handlers/bookHandler.js');
var UserHandler = require(path + '/back/handlers/userHandler.js');

module.exports = function(app) {

	var bookHandler = new BookHandler();
	var userHandler = new UserHandler();

	app.route('/api/signup')
		.post(userHandler.signup);
		
	app.route('/api/authenticate')
		.post(userHandler.authenticate);
		
	app.route('/api/memberinfo')
		.get(userHandler.memberinfo, passport.authenticate('jwt', { session: false}) );

	app.route('/api/items')
		.post(bookHandler.searchBooks)
		.get(bookHandler.getBooks);
		
	app.route('/api/myitems')
		.post(bookHandler.addBook);

	app.use(function(req, res) {
		res.sendFile(path + '/public/index.html');
	});

};
