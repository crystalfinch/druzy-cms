module.exports = {
	db: process.env.DB_URL,
	sessionSecret: process.env.SESSION_SECRET,
	facebook: {
		clientID: process.env.FACEBOOK_APPID,
		clientSecret: process.env.FACEBOOK_APPSECRET,
		callbackURL: process.env.FACEBOOK_CBURL // will be passed to the Facebook OAuth service, which will redirect to this URL after the authentication process is over
	}
};
