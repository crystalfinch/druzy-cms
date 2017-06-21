var users = require('../../app/controllers/users.server.controller'),
	settings = require('../../app/controllers/settings.server.controller');

module.exports = function(app) {
	app.route('/api/settings')
		.get(settings.list)
		.post(settings.create); // NOTE: Need users.requiresLogin first

	app.route('/api/settings/:settingId')
		.get(settings.read)
		.put(settings.update); // NOTE: Need users.requiresLogin, posts.hasAuthorization first

	app.param('settingId', settings.settingById);

};
