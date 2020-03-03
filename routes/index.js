const express = require('express');
const router = express.Router();
const {
	ensureAuthenticated
} = require('../config/auth');

// DEVELOPMENT MODE
const DEVMODE = require('../config/global').DEVMODE;

/* User model */
const User = require('../models/User');

/* Class model */
const ClassModel = require('../models/ClassModel');

router.get('/', function (req, res, next) {
	User.find().lean().exec((err, data) => {
		console.log(data);
		res.render('home', {
			title: 'Home',
			users: data
		})
	});
});

/* GET dashboard page. */
router.get('/dashboard', ensureAuthenticated, (req, res, next) =>
	res.render('dashboard', {
		title: 'Dashboard',
		name: req.user.name
	}));


module.exports = router;