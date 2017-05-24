var app = require('../../server.js'),
	should = require('should'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	Post = mongoose.model('Post');

var user, post;

describe('Post Model Unit Tests:', function() {
	beforeEach(function(done) {
		user = new User({
			firstName: 'Full',
			lastName: 'Name',
			displayName: 'Full Name',
			email: 'test@test.com',
			username: 'username',
			password: 'password'
		});

		user.save(function() {
			post = new Post({
				title: 'Post Title',
				content: 'Post Content',
				user: user
			});

			done();
		});
	});

	describe('Testing the save method', function() {
		it('Should be able to save without problems', function() {
			post.save(function(err) {
				should.not.exist(err);
			});
		});

		it('Should not be able to save a post without a title', function() {
			post.title = '';
			post.save(function(err) {
				should.exist(err);
			});
		});
	});

	afterEach(function(done) {
		Post.remove(function() {
			User.remove(function() {
				done();
			});
		});
	});
});
