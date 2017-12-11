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

	app.route('/api/userinfo')
		.get(userHandler.userinfo, passport.authenticate('jwt', { session: false }))
		.put(userHandler.updateUser, passport.authenticate('jwt', { session: false }));
		
	app.route('/api/user')
		.post(userHandler.changeStatus, passport.authenticate('jwt', { session: false }));
		
	app.route('/api/user/:id')
		.put(userHandler.bookRequest, passport.authenticate('jwt', { session: false }));

	app.route('/api/items')
		.post(bookHandler.searchBooks, passport.authenticate('jwt', { session: false }))
		.get(bookHandler.getBooks);

	app.route('/api/items/:id')
		.delete(bookHandler.removeBook, passport.authenticate('jwt', { session: false }));

	app.route('/api/myitems')
		.get(bookHandler.getMyBooks, passport.authenticate('jwt', { session: false }))
		.post(bookHandler.addBook, passport.authenticate('jwt', { session: false }));

	app.use(function(req, res) {
		res.sendFile(path + '/public/index.html');
	});

};
