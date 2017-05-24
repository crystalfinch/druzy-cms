exports.render = function(req, res) {

	// Session Stuff
	if (req.session.lastVisit) {
		console.log("lastVisit:",req.session.lastVisit);
	}
	req.session.lastVisit = new Date();

	// index.ejs Template
	res.render('index', {
		title: '{Blog Title}',
		user: JSON.stringify(req.user)
	}, function(err, html) {
		if (err) {
			console.log(err);
			return;
		}
		res.send(html);
	});
};
