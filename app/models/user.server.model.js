var mongoose = require('mongoose'),
	crypto = require('crypto'),
	Schema = mongoose.Schema;

var UserSchema = new Schema({
	firstName: String,
	lastName: String,
	email: {
		type: String,
		match: [/.+\@.+\..+/, "Please provide a valid email address."]
	},
	username: {
		type: String,
		unique: true,
		required: "Username is required.",
		trim: true
	},
	password: {
		type: String,
		validate: [
			function(password) {
				return password && password.length > 6;
			}, "Password needs to be more than 6 characters."
		]
	},
	salt: {
		type: String
	},
	provider: {
		type: String,
		required: "Provider is required."
	},
	providerId: String,
	providerData: {},
	created: {
		type: Date,
		default: Date.now
	}
	/*website: {
		type: String,
		get: function(url) {
			if (!url) {
				return url;
			} else {
				if (url.indexOf('http://') !== 0 && url.indexOf('https://') !== 0) {
					url = 'http://' + url;
				} else {
					return url;
				}
			}
		}
	},*/
	/*role: {
		type: String,
		enum: ['Admin', 'Owner', 'User']
	}*/
});

UserSchema.virtual('fullName').get(function() {
	return this.firstName + ' ' + this.lastName;
}).set(function(fullName) {
	var splitName = fullName.split(' ');
	this.firstName = splitName[0] || '';
	this.lastName = splitName[1] || '';
});

UserSchema.pre('save', function(next) {
	if (this.password) {
		// generate the salt...
		this.salt = new Buffer(crypto.randomBytes(16).toString('base64'), 'base64');
		// ...so the salt can be used in the hash
		this.password = this.hashPassword(this.password);
	}
	next();
});

UserSchema.methods.hashPassword = function(password) {
	return crypto.pbkdf2Sync(password, this.salt, 10000, 64, 'sha1').toString('base64');
};

UserSchema.methods.authenticate = function(password) {
	return this.password === this.hashPassword(password);
};

// find an available unique username for new users
UserSchema.statics.findUniqueUsername = function(username, suffix, callback) {
	var _this = this;
	var possibleUsername = username + (suffix || '');

	_this.findOne({
		username: possibleUsername
	}, function(err, user) {
		if (!err) {
			if (!user) {
				callback(possibleUsername);
			} else {
				return _this.findUniqueUsername(username, (suffix || 0) + 1, callback);
			}
		} else {
			callback(null);
		}
	});
};

UserSchema.set('toJSON', {
	getters: true,
	virtuals: true
});

/*UserSchema.statics.findOneByUsername = function(username, callback) {
	this.findOne({ username: new RegExp(username, 'i') }, callback);
};*/

mongoose.model('User', UserSchema);
