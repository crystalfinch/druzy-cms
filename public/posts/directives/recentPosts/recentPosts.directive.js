angular.module('posts').directive('recentPosts', function() {
	return {
		restrict: 'E',
		templateUrl: '/posts/directives/recentPosts/recentPosts.template.html'
	};
});
