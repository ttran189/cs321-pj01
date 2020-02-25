const express = require('express');
const router = express.Router();
var emailValidator = require('email-validator');

/* ProfessorEmail model */
const ProfessorEmail = require('../models/ProfessorEmail');

/* ProfessorEmail model */
const User = require('../models/User');

/* GET Manager Functions. */
router.get('/', function (req, res, next) {
    res.render('manage');
});

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
            User.findOneAndUpdate({email: element}, {role : "professor"}, (err, data) => {
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
            User.findOneAndUpdate({email: element}, {role : "student"}, (err, data) => {
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

module.exports = router;