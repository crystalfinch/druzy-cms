require('dotenv').config(); // gets enviro vars from .env file

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var mongoose = require('./config/mongoose'), // place first so other config files have access to models
	express = require('./config/express'), // app instance
	passport = require('./config/passport');

var db = mongoose();
var app = express();
var passport = passport();

app.listen(3000);
module.exports = app;

console.log('Server running at http://localhost:3000');
