'use strict';

var path = process.cwd();

module.exports = function(app) {

	app.use(function(req, res) {
		res.sendFile(path + '/public/index.html');
	});

};