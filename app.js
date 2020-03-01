const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const logger = require('morgan');
const mongoose = require('mongoose');
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport');

const indexRouter = require('./routes/index');
const userRouter = require('./routes/user');
const manageRouter = require('./routes/manage');
const scheduleRouter = require('./routes/schedule');

const app = express();

// PP config
require('./config/passport')(passport);

// Mongo DB config
const db = require('./config/keys').MongoURI;

// Connect to Mongo
mongoose.connect(db, {
		useNewUrlParser: true
	})
	.then(() => console.log('DB connected!'))
	.catch(err => console.log(err))


// View engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());

// Body Parse
app.use(express.urlencoded({
	extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Session
app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true,
}));

// Passport
app.use(passport.initialize());
app.use(passport.session());

// Flash connection
app.use(flash());

// Global vars
app.use((req, res, next) => {
	res.locals.success_msg = req.flash('success_msg');
	res.locals.error_msg = req.flash('error_msg');
	res.locals.error = req.flash('error');
	next();
});
global.globalStr

// Routing
app.use('/', indexRouter);
app.use('/user', userRouter);
app.use('/manage', manageRouter);
app.use('/scheduler', scheduleRouter);

// Catch 404 and forward to error handler
app.use(function (req, res, next) {
	next(createError(404));
});

// Error handler
app.use(function (err, req, res, next) {
	// set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = req.app.get('env') === 'development' ? err : {};

	// render the error page
	res.status(err.status || 500);
	res.render('error');
});

// app.set('port', process.env.PORT || 3000);
// var server = app.listen(app.get('port'), function() {
//   console.log('Express server listening on port ' + server.address().port);
// });

module.exports = app;