var mongoose = require('mongoose'),
	Setting = mongoose.model('Setting');

var getErrorMessage = function(err) {
	if (err.errors) {
		for (var errName in err.errors) {
			if (err.errors[errName].message) {
				return err.errors[errName].message;
			}
		}
	} else {
		return 'Unknown server error.';
	}
};

exports.create = function(req, res) {
	var setting = new Setting({
		name: req.body.name,
		value: req.body.value,
		input: req.body.input
	});

	setting.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: getErrorMessage(err)
			});
		} else {
			res.json(setting);
		}
	});
};

exports.list = function(req, res) {
	Setting.find().exec(function(err, posts){
		if (err) {
			return res.status(400).send({
				message: getErrorMessage(err)
			});
		} else {
			res.json(posts);
		}
	});
};

exports.read = function(req, res) {
	res.json(req.setting);
};

exports.settingById = function(req, res, next, id) {
	Setting.findById(id).exec(function(err, setting) {
		if (err) {
			return next(err);
		}
		if (!setting) {
			return next(new Error('Failed to load setting ' + name));
		}
		req.setting = setting;
		next();
	});
};

exports.update = function(req, res) {
	/*
	var setting = req.setting;
	setting.name = req.body.name;
	setting.value = req.body.value;
	setting.input= req.body.input;

	setting.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: getErrorMessage(err)
			});
		} else {
			res.json(setting);
		}
	});
	*/
};
