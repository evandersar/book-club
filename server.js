'use strict';

var express = require('express');
var mongoose = require('mongoose');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var passport = require('passport');
//var jwt = require('jwt-simple');

var routes = require('./back/index.js');
//var config = require('./back/config/database'); // get db config file
//var User = require('./back/models/user'); // get the mongoose model

var app = express();
require('dotenv').config();

mongoose.connect(process.env.MONGO_URI, { useMongoClient: true }); // connect to our database
mongoose.Promise = global.Promise;

app.use(morgan('dev')); // log every request to the console

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: true
}));

// Use the passport package in our application
app.use(passport.initialize());

app.use('/public', express.static(process.cwd() + '/public'));
app.use('/front', express.static(process.cwd() + '/front'));

routes(app);

var port = process.env.PORT || 8080;
app.listen(port, function() {
	console.log('Node.js listening on port ' + port + '...');
});
