var express = require('express');
var router = express.Router();
var bcrypt = require('bcryptjs');
var passport = require('passport');

/* User model */
const User = require('../models/User');

/* GET users listing. */
router.get('/', function (req, res, next) {
	res.send('respond with a resource');
});

/* GET login page. */
router.get('/login', function (req, res, next) {
	res.render('login', {
		title: 'Login'
	});
});

/* GET register page. */
router.get('/register', function (req, res, next) {
	res.render('register', {
		title: 'Register'
	});
});

/* POST register handle */
router.post('/register', (req, res) => {
	const {
		name,
		email,
		password1,
		password2
	} = req.body;

	let errors = [];

	// Empty Validation
	if (!name || !email || !password1 || !password2) {
		errors.push({
			msg: "All fields are required."
		});
	}

	// Password Matching
	if (password1 !== password2) {
		errors.push({
			msg: "Passwords do not match."
		});
	}

	// Password Strength
	if (password1.length < 6) {
		errors.push({
			msg: "Password must be at least 6 characters."
		});
	}

	if (errors.length > 0) {
		res.render("register", {
			errors,
			name,
			email,
			password1,
			password2
		});
		console.log(errors);
	} else {
		User.findOne({
				email: email
			})
			.then(user => {
				if (user) {
					errors.push({
						msg: "This email already registered."
					});
					res.render('register', {
						errors,
						name,
						email,
						password1,
						password2
					})
					console.log(errors);
				} else {
					const newUser = new User({
						name: name,
						email: email,
						password: password1
					});

					bcrypt.genSalt(10, (err, salt) =>
						bcrypt.hash(newUser.password, salt, (err, hash) => {
							if (err) console.log(err);

							newUser.password = hash;

							newUser.save()
								.then(user => {
									req.flash('success_msg', 'You are registered successfully.');
									res.redirect("/user/login");
								})
								.catch(err => console.log(err));
						}))
				}
			});
	}
});

/* Loged in successfully */
router.post('/login', (req, res, next) => {
	passport.authenticate('local', {
		successRedirect: '/dashboard',
		failureRedirect: '/user/login',
		failureFlash: true
	})(req, res, next);
});

/* Logout */
router.get('/logout', (req, res) => {
	req.logout();
	req.flash('success_msg', 'Logged out.');
	res.redirect('/user/login');
});

module.exports = router;