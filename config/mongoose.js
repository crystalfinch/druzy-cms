var config = require('./config'), // NOTE: the config FOLDER, not config.js
	mongoose = require('mongoose');

module.exports = function() {
	var db = mongoose.connect(config.db);

	require('../app/models/user.server.model');
	require('../app/models/post.server.model');

	return db;
};
