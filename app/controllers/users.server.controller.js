var User = require('mongoose').model('User'),
	passport = require('passport');

var getErrorMessage = function(err) {
	var message = '';

	if (err.code) { // MongoDB indexing error
		// NOTE: UPDATE THIS, CHECK ERROR CODES FOR CHANGES
		switch (err.code) {
			case 11000:
			case 11001:
				message: 'Username already exists.';
				break;
			default:
				message: 'Something went wrong.';
		}
	} else {
		// Mongoose validation error
		for (var errName in err.errors) {
			if (err.errors[errName].message) {
				message = err.errors[errName].message;
			}
		}
	}
	return message;
};

exports.renderSignIn = function(req, res, next) {
	if (!req.user) {
		res.render('signin', {
			title: 'Sign In',
			messages: req.flash('error') || req.flash('info')
		});
	} else {
		// send to Home
		return res.redirect('/');
	}
};

exports.renderSignUp = function(req, res, next) {
	if (!req.user) {
		res.render('signup', {
			title: 'Sign Up',
			messages: req.flash('error') || req.flash('info')
		});
	} else {
		// send to Home
		return res.redirect('/');
	}
};

exports.signup = function(req, res, next) {
	if (!req.user) {
		var user = new User(req.body);
		var message = null;

		user.provider = 'local';

		user.save(function(err) {
			if (err) {
				var message = getErrorMessage(err);

				req.flash('error', message);
				return res.redirect('/signup');
			}
			req.login(user, function(err) { // passport method: creates user session
				if (err) {
					return next(err);
				}

				// req.user should be populated:
				//console.log("\n\t***req.user***\n",req.user);

				// send to Dashboard
				return res.redirect('/#!/dashboard');
			});
		});
	} else {
		// send to Home
		return res.redirect('/');
	}
};

// NOTE: No signin() method! Passport provides an authentication method,
// passport.authenticate(), which is used directly in the routing definition.

// for Facebook Strategy
exports.saveOAuthUserProfile = function(req, profile, done) {
	User.findOne({
		provider: profile.provider,
		providerId: profile.providerId
	}, function(err, user) {
		if (err) {
			return done(err);
		} else {
			if (!user) {
				var possibleUsername = profile.username || ((profile.email) ? profile.email.split('@')[0] : '');

				User.findUniqueUsername(possibleUsername, null, function(availableUsername) {
					profile.username = availableUsername;

					user = new User(profile);

					user.save(function(err) {
						if (err) {
							var message = _this.getErrorMessage(err);

							req.flash('error', message);
							return res.redirect('/signup');
						}

						return done(err, user);
					});
				});
			} else {
				return done(err, user);
			}
		}
	});
};

exports.signout = function(req, res) {
	req.logout(); // passport method
	// send to Home
	res.redirect('/');
}

exports.create = function(req, res, next) {
	var user = new User(req.body); // instantiate new user

	user.save(function(err) { // save to mongo
		if (err) {
			return next(err); // pass the error to next middleware
		} else {
			res.json(user);
		}
	});
};

exports.list = function(req, res, next) {
	User.find({}, function(err, users) {
		if (err) {
			return next(err);
		} else {
			res.json(users);
		}
	});
};

exports.read = function(req, res) { // no next() because this is meant to be used at the end
	res.json(req.user);
};

exports.userById = function(req, res, next, id) {
	User.findOne({
		_id: req.params.id
	}, function(err, user) {
		if (err) {
			return next(err);
		} else {
			req.user = user;
			next();
		}
	});
};

exports.update = function(req, res, next) {
	User.findByIdAndUpdate(req.user.id, req.body, function(err, user) {
		if (err) {
			return next(err);
		} else {
			res.json(user);
		}
	});
};

exports.delete = function(req, res, next) {
	req.user.remove(function(err) {
		if (err) {
			return next(err);
		} else {
			res.json(req.user);
		}
	});
};

exports.requiresLogin = function(req, res, next) {
	if (!req.isAuthenticated()) { // isAuthenticated() is from passport
		return res.status(401).send({
			message: 'User is not logged in.'
		});
	}

	next();
};
