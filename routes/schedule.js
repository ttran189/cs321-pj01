const express = require('express');
const router = express.Router();

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
                    })
                    
                    let nSession1 = new Session({
                        class: new ClassModel({
                            code: "CS TMP1"
                        }),
                        slots: [1,2,3,4,5]
                    });
                    let nSession2 = new Session({
                        class: new ClassModel({
                            code: "CS TMP2"
                        }),
                        slots: [6,7,8,9,10]
                    });
                    let nSession3 = new Session({
                        class: new ClassModel({
                            code: "CS TMP3"
                        }),
                        slots: [11,12,13,14,15]
                    });
                    // console.log(nSession1);
                    // console.log(nSession2);
                    // console.log(nSession3);
                    let nWeek = new WeeklySchedule();
                    nWeek.monday.push(nSession1);
                    nWeek.monday.push(nSession2);
                    nWeek.monday.push(nSession3);
                    console.log(nWeek);
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

module.exports = router;