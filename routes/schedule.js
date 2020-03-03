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

/* Class model */
const WeeklySchedule = require('../models/WeeklySchedule');

/* Class model */
const Session = require('../models/Session');

if (DEVMODE) {
	/* If in devlepoment mode. */
	router.get('/setup', function (req, res, next) {
		console.log("Debugging Mode");
		let testProfEmail = "prof@test.com";
		let responde1 = null;
		let responde2 = null;
		User.findOne({
				email: testProfEmail
			})
			.then(user => {
				if (user)
					responde1 = user;
				else
					responde2 = null;

				ClassModel.find({}, {
					_id: 0,
					code: 1
				}).lean().exec((err, data) => {
					if (data)
						responde2 = data;
					else
						responde2 = null;

					res.render('setupSchedule', {
						title: 'Schedule Set Up',
						user: responde1,
						classModel: responde2
					});


				});
			});
	});
} else {
	/* If user is logged in, and is a professor or admin. */
	router.get('/setup', ensureAuthenticated, (req, res, next) => {
		if (req.user.verified == true && (req.user.role == "professor" || req.user.role == "admin")) {
			res.render('setupSchedule', {
				title: 'Schedule Set Up',
				name: req.user.name
			})
		} else {
			res.redirect('user/login');
		}
	});
}

router.post('/update', ensureAuthenticated, (req, res, next) => {
	if (req.user.verified == true && (req.user.role == "professor" || req.user.role == "admin")) {
		const {
			schedule,
			count
		} = req.body;

		const query = {
			email: req.user.email
		};
		const updatingData = {
			"$set": {
				"schedule": schedule,
				"scheduleCount": count
			}
		}
		const options = {
			returnNewDocument: true
		}

		// User.findOneAndUpdate({
		// 	email: req.user.email
		// }, {
		// 	schedule: schedule,
		// 	scheduleCount: count
		// }, (err, data) => {
		// 	if (err === null)
		// 		res.send("Updated successfully.");
		// 	else
		// 		res.send("Update failed!");
		// });
		User.findOneAndUpdate(query, updatingData, options)
			.then(updatedDocument => {
				if (updatedDocument)
					res.send("Updated successfully: ${updatedDocument}");
				else
					res.send("Update failed!");
			})
	} else {
		res.send("Access is required to update database.");
	}
});

module.exports = router;