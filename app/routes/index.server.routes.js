module.exports = function(app) { // app = express instance defined in /config/express.js
	var index = require('../controllers/index.server.controller');
	app.get('/', index.render);
};
