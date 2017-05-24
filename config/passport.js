var passport = require('passport'),
	mongoose = require('mongoose');

module.exports = function() {
	var User = mongoose.model('User');

	// Saves the user's id to the session
	passport.serializeUser(function(user, done) {
		done(null, user.id);
	});

	// Looks up the user with the id stored in the session
	passport.deserializeUser(function(id, done) {
		User.findOne({
			_id: id
		}, '-password -salt', function(err, user) {
			done(err, user);
		});
	});

	require('./strategies/local.js')();
	//require('./strategies/facebook.js')();
};
