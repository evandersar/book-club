'use strict';
var jwt = require('jwt-simple');

var config = require('../config/database'); // get db config file
var User = require('../models/user');

function UserHandler() {

    this.signup = function(req, res) {
        console.log('signing up');
        if (!req.body.name || !req.body.password) {
            res.json({ success: false, msg: 'Please pass name and password.' });
        }
        else {
            var newUser = new User({
                name: req.body.name,
                password: req.body.password
            });
            // save the user
            newUser.save(function(err) {
                if (err) {
                    console.log("err => ", err);

                    return res.json({ success: false, msg: 'Username already exists.' });
                }
                res.json({ success: true, msg: 'Successful created new user. Now you can log in using your credentials' });
            });
        }
    };

    this.authenticate = function(req, res) {
        console.log("req.body => ", req.body);
        User.findOne({
            name: req.body.name
        }, function(err, user) {
            if (err) throw err;

            if (!user) {
                res.send({ success: false, msg: 'Authentication failed. User not found.' });
            }
            else {
                // check if password matches
                user.comparePassword(req.body.password, function(err, isMatch) {
                    if (isMatch && !err) {
                        // if user is found and password is right create a token
                        var token = jwt.encode(user, config.secret);
                        // return the information including token as JSON
                        res.json({ success: true, token: 'JWT ' + token });
                    }
                    else {
                        res.send({ success: false, msg: 'Authentication failed. Wrong Name or Password.' });
                    }
                });
            }
        });
    };

    this.userinfo = function(req, res) {
        var token = getToken(req.headers);
        if (token) {
            var decoded = jwt.decode(token, config.secret);
            User.findOne({
                name: decoded.name
            }, function(err, user) {
                if (err) throw err;

                if (!user) {
                    return res.status(403).send({ success: false, msg: 'Authentication failed. User not found.' });
                }
                else {
                    res.json({ success: true, user: user });
                }
            });
        }
        else {
            return res.status(403).send({ success: false, msg: 'No token provided.' });
        }
    };

    this.bookRequest = function(req, res) {
        console.log('req.body => ', req.body);
        console.log('req.params.id => ', req.params.id);
        var token = getToken(req.headers);
        if (token) {
            User.findOneAndUpdate({
                    _id: req.params.id,
                    'tradeOut.bookId': { $ne: req.body.bookId }
                }, { $push: { "tradeOut": req.body } }, { new: true },
                (err, doc) => {
                    console.log("err => ", err);
                    console.log("doc => ", doc);
                    if (err) return res.status(500).send(err);
                    //res.json(doc);
                    
                    if (doc) {
                        User.findOneAndUpdate({
                                name: req.body.ownerName
                            }, {
                                $push: {
                                    "tradeIn": {
                                        bookId: req.body.bookId,
                                        status: req.body.status,
                                        title: req.body.title,
                                        author: req.body.author,
                                        clientName: doc.name
                                    }
                                }
                            }, { new: true },
                            (err, doc) => {
                                console.log("err => ", err);
                                console.log("doc => ", doc);
                                if (err) return res.status(500).send(err);

                                res.json(doc);
                            });
                    }
                    else{
                        res.json(doc);
                    }
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

module.exports = UserHandler;
