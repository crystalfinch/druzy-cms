angular.module('blog').config(['$routeProvider', function($routeProvider) {
	$routeProvider.
		when('/', {
			templateUrl: 'blog/views/blog.client.view.html'
		});
}]);
