const express = require('express');
const router = express.Router();
const {
	ensureAuthenticated
} = require('../config/auth');

const DEVMODE = require('../config/global').DEVMODE;

const FRONTEND_SETTINGS = require('../config/global').FRONTEND_SETTINGS;

const User = require('../models/User');

const ClassModel = require('../models/ClassModel');

router.get('/', function (req, res, next) {
	User.find().lean().exec((err, data) => {
		res.render('home', {
			title: 'Home',
			users: data
		})
	});
});

router.get('/globalOptions', function (req, res, next) {
	res.send(FRONTEND_SETTINGS);
});

/* GET dashboard page. */
router.get('/dashboard', ensureAuthenticated, (req, res, next) =>
	res.render('dashboard', {
		title: 'Dashboard',
		name: req.user.name
	}));


module.exports = router;