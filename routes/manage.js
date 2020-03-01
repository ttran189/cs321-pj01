const express = require('express');
const router = express.Router();
var emailValidator = require('email-validator');
const nodemailer = require('nodemailer');
const {
	ensureAuthenticated
} = require('../config/auth');


// DEVELOPMENT MODE
const DEVMODE = require('../config/global').DEVMODE;

/* ProfessorEmail model */
const ProfessorEmail = require('../models/ProfessorEmail');

/* User model */
const User = require('../models/User');

/* Class model */
const ClassModel = require('../models/ClassModel');

/* GET scheduler page. */
if (!DEVMODE) {
	router.get('/', ensureAuthenticated, (req, res, next) => {
		if (req.user.verified == true && req.user.role == "admin") {
			res.render('manage', {
				title: 'Manager',
				name: req.user.name
			})
		} else {
			res.redirect('user/login');
		}
	});
} else {
	router.get('/', (req, res) => {
		res.render('manage')
	})
}


router.post('/addProfessors', (req, res) => {
	const {
		list
	} = req.body;

	const arr = list.split(/[\r\n]+/);

	arr.forEach(element => {
		if (emailValidator.validate(element)) {
			ProfessorEmail.findOne({
					email: element
				})
				.then(professor => {
					if (!professor) {
						let newProfessorEmail = new ProfessorEmail({
							email: element
						});
						newProfessorEmail.save();
						console.log("Saved a new professor.");
					}
				})
		}
	});

	res.send("Added Ok");
});

router.post('/deleteProfessors', (req, res) => {
	const {
		list
	} = req.body;

	const arr = list.split(/[\r\n]+/);

	arr.forEach(element => {
		if (emailValidator.validate(element)) {
			ProfessorEmail.findOneAndDelete({
				email: element
			}, (err, data) => {
				console.log(data);
			})
		}
	});

	res.send("Deleted Ok");
});

router.post('/promoteUsers', (req, res) => {
	const {
		list
	} = req.body;

	const arr = list.split(/[\r\n]+/);

	arr.forEach(element => {
		if (emailValidator.validate(element)) {
			User.findOneAndUpdate({
				email: element
			}, {
				role: "professor"
			}, (err, data) => {
				console.log(data);
			})
		}
	});

	res.send("Promoted Ok");
});

router.post('/disgraceUsers', (req, res) => {
	const {
		list
	} = req.body;

	const arr = list.split(/[\r\n]+/);

	arr.forEach(element => {
		if (emailValidator.validate(element)) {
			User.findOneAndUpdate({
				email: element
			}, {
				role: "student"
			}, (err, data) => {
				console.log(data);
			})
		}
	});

	res.send("Disgraced Ok");
});

router.get('/viewProfessors', (req, res) => {
	ProfessorEmail.find({}, {
		_id: 0,
		email: 1
	}).lean().exec((err, data) => {
		res.send(JSON.stringify(data));
	});
});

router.get('/viewUsers', (req, res) => {
	User.find({}, {
		_id: 0,
		email: 1
	}).lean().exec((err, data) => {
		res.send(JSON.stringify(data));
	});
});

router.get('/viewUnverifiedUsers', (req, res) => {
	User.find({
		verified: false
	}, {
		_id: 0,
		email: 1
	}).lean().exec((err, data) => {
		res.send(JSON.stringify(data));
	});
});

router.get('/viewProfUsers', (req, res) => {
	User.find({
		role: "professor"
	}, {
		_id: 0,
		email: 1
	}).lean().exec((err, data) => {
		res.send(JSON.stringify(data));
	});
});

router.get('/viewStudUsers', (req, res) => {
	User.find({
		role: "student"
	}, {
		_id: 0,
		email: 1
	}).lean().exec((err, data) => {
		res.send(JSON.stringify(data));
	});
});

router.post('/activateUsers', (req, res) => {
	const {
		list
	} = req.body;

	const arr = list.split(/[\r\n]+/);

	arr.forEach(element => {
		if (emailValidator.validate(element)) {
			User.findOneAndUpdate({
				email: element
			}, {
				verified: true
			}, (err, data) => {
				console.log(data);
			})
		}
	});

	res.send("Activated Ok");
});

router.post('/sendActivationCode', (req, res) => {
	const {
		list
	} = req.body;

	const arr = list.split(/[\r\n]+/);

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

	arr.forEach(element => {
		if (emailValidator.validate(element)) {
			User.findOne({
				email: element
			}).then(user => {
				if (user) {
					message.to = user.email;
					if (user.code)
						message.text += user.code;
					transporter.sendMail(message, (mailErr, data) => {
						if (mailErr)
							console.log(mailErr);
						else
							console.log(data);
					});
				}
			})
		}
	});

	res.send("Send Ok");
});

router.post('/addClasses', (req, res) => {
	const {
		list
	} = req.body;

	const arr = list.split(/[\r\n]+/);

	arr.forEach(element => {
		ClassModel.findOne({
				code: element
			})
			.then(classFound => {
				if (!classFound) {
					let newClass = new ClassModel({
						code: element
					});
					newClass.save();
					console.log("Saved a new class.");
				}
			})
	});

	res.send("Added Ok");
});

router.post('/deleteClasses', (req, res) => {
	const {
		list
	} = req.body;

	const arr = list.split(/[\r\n]+/);

	arr.forEach(element => {
		ClassModel.findOneAndDelete({
			code: element
		}, (err, data) => {
			console.log(data);
		})
	});

	res.send("Deleted Ok");
});

router.get('/viewClasses', (req, res) => {
	ClassModel.find({}, {
		_id: 0,
		code: 1
	}).lean().exec((err, data) => {
		res.send(JSON.stringify(data));
	});
});

module.exports = router;