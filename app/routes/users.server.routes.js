var users = require('../../app/controllers/users.server.controller'),
	passport = require('passport');

module.exports = function(app) {

	// Views
	app.route('/signup')
		.get(users.renderSignUp)
		.post(users.signup);

	app.route('/signin')
		.get(users.renderSignIn)
		.post(passport.authenticate('local', {
			successRedirect: '/#!/dashboard',
			failureRedirect: '/signin',
			failureFlash: true
		}));

	app.get('/signout', users.signout);

	// start the FB auth process
	app.get('/oauth/facebook', passport.authenticate('facebook', {
		failureRedirect: '/signin'
	}));

	// finish the FB auth process
	app.get('/oauth/facebook/callback', passport.authenticate('facebook', {
		failureRedirect: '/signin',
		successRedirect: '/#!/dashboard'
	}));

	// API
	app.route('/users')
		.post(users.create)
		.get(users.list);

	app.route('/users/:userId')
		.get(users.read)
		.put(users.update)
		.delete(users.delete);

	app.param('userId', users.userById);
};
