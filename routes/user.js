const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');
const emailValidator = require('email-validator');
const nodemailer = require('nodemailer');

/* Mail Transponder */
let testAccount = nodemailer.createTestAccount();
let transporter = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    secure: false, // true for 465, false for other ports
    auth: {
      user: "761741038d90ae",
      pass: "e257eced98cafd"
    }
});
const message = {
    from: 'system@gmulive.gmu',
    to: '', 
    subject: 'Activation',
    text: 'Activation Code: '
};


/* User model */
const User = require('../models/User');

/* ProfessorEmail model */
const ProfessorEmail = require('../models/ProfessorEmail');

/* GET users listing. */
router.get('/', function (req, res, next) {
	res.send('respond with a resource');
});

/* GET login page. */
router.get('/login', function (req, res, next) {
	if (req.user)
		res.redirect('/dashboard');
	else {
		res.render('login', {
			title: 'Login'
		});
	}
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

	// Email Validation
	if (!emailValidator.validate(email)) {
		errors.push({
			msg: "Email is not valid."
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
					var low = 10000;
					var high = 99999;
					var code = Math.floor(Math.random() * (high - low + 1) + low);

					message.to = email;
					message.text = message.text + code;

					const newUser = new User({
						name: name,
						email: email,
						password: password1,
						activation: code
					});

					bcrypt.genSalt(10, (err, salt) =>
						bcrypt.hash(newUser.password, salt, (err, hash) => {
							if (err) console.log(err);

							newUser.password = hash;

							ProfessorEmail.findOne({
									email: newUser.email
								})
								.then(p => {
									if (p)
										newUser.role = "professor";
									else
										newUser.role = "student";
								});

							newUser.save()
								.then(user => {
									
									transporter.sendMail(message, (mailErr, data) => {
										if(mailErr)
											console.log(mailErr);
										else
											console.log(data);
									});

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