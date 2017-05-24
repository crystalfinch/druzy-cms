var mongoose = require('mongoose'),
	Post = mongoose.model('Post');


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
	var post = new Post(req.body);
	post.creator = req.user;

	post.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: getErrorMessage(err)
			});
		} else {
			res.json(post);
		}
	});
};

exports.list = function(req, res) {
	Post.find().sort('-created').populate('creator', 'firstName lastName fullName').exec(function(err, posts){
		if (err) {
			return res.status(400).send({
				message: getErrorMessage(err)
			});
		} else {
			res.json(posts);
		}
	});
};

exports.postByID = function(req, res, next, id) {
	Post.findById(id).populate('creator', 'firstName lastName fullName').exec(function(err, post) {
		if (err) {
			return next(err);
		}
		if (!post) {
			return next(new Error('Failed to load post ' + id));
		}
		req.post = post;
		next();
	});
};

exports.read = function(req, res) {
	res.json(req.post);
};

// this method assumes the post has already been obtained by postByID
exports.update = function(req, res) {
	var post = req.post;

	post.title = req.body.title;
	post.content = req.body.content;

	post.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: getErrorMessage(err)
			});
		} else {
			res.json(post);
		}
	});
};

exports.delete = function(req, res) {
	var post = req.post;

	post.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: getErrorMessage(err)
			});
		} else {
			res.json(post);
		}
	});
};

exports.hasAuthorization = function(req, res, next) {
	if (req.post.creator.id !== req.user.id) {
		return res.status(403).send({
			message: 'User is not authorized.'
		});
	}

	next();
};
