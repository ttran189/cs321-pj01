const express = require('express');
const router = express.Router();
const {
  ensureAuthenticated
} = require('../config/auth');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', {
    title: 'Home'
  });
});

/* GET dashboard page. */
router.get('/dashboard', ensureAuthenticated, (req, res, next) =>
  res.render('dashboard', {
    title: 'Dashboard',
    name: req.user.name
  }));

module.exports = router;