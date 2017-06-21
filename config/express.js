var config = require('./config'),
	express = require('express'),
	morgan = require('morgan'),
	compress = require('compression'),
	bodyParser = require('body-parser'),
	methodOverride = require('method-override'),
	session = require('express-session'),
	flash = require('connect-flash'),
	passport = require('passport');

module.exports = function() {
	var app = express();

	// Enviro Checker
	if (process.env.NODE_ENV === 'development') {
		app.use(morgan('dev'));
	} else if (process.env.NODE_ENV === 'production') {
		app.use(compress());
	}

	// External Middleware
	app.use(bodyParser.urlencoded({
		extended: true
	}));
	app.use(bodyParser.json());
	app.use(methodOverride());

	// Express Sessions
	app.use(session({
		saveUninitialized: true,
		resave: true,
		secret: config.sessionSecret
	}));

	// Pretty JSON
	app.set('json spaces', 2);

	// Views Setup
	app.set('views', './app/views');
	app.set('view engine', 'ejs');

	// Connect-Flash
	app.use(flash());
	
	// Passport
	app.use(passport.initialize());
	app.use(passport.session());

	// Routes
	require('../app/routes/index.server.routes.js')(app); // passing in the Express instance
	require('../app/routes/users.server.routes.js')(app); // passing in the Express instance
	require('../app/routes/settings.server.routes.js')(app); // passing in the Express instance
	require('../app/routes/posts.server.routes.js')(app); // passing in the Express instance

	// Static Assets
	// Must be placed after the routes!
	app.use(express.static('./public'));

	return app;
}
