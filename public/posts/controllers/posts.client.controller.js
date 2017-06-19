angular.module('posts').controller('PostsController', ['$scope', '$routeParams', '$location', 'Authentication', 'Posts', function($scope, $routeParams, $location, Authentication, Posts) {
	// apply Authentication to $scope so views can use it too
	$scope.authentication = Authentication;

	$scope.create = function() {
		// use the title and content form fields from the view that called create()
		var post = new Posts({
			title: this.title,
			content: this.content
		});

		post.$save(function(response) {
			$location.path('posts/' + response._id);
		}, function(errorResponse) {
			$scope.error = errorResponse.data.message;
		});
	};

	$scope.find = function() {
		$scope.posts = Posts.query();
	};

	$scope.findOne = function() {
		$scope.post = Posts.get({
			postId: $routeParams.postId
		});
	};

	$scope.update = function() {
		$scope.post.$update(function() {
			$location.path('posts/' + $scope.post._id);
		}, function(errorResponse) {
			$scope.error = errorResponse.data.message;
		});
	};

	$scope.delete = function() {
		console.log("$scope.post",$scope.post);
		if ($scope.post) {
			$scope.post.$remove(function() {
				for (var i in $scope.post) {
					if ($scope.posts[i] === post) {
						$scope.posts.splice(i, 1);
					}
				}
			});
		} else {
			// do nothing
		}
		$location.path('posts');
	};

	// Table sorting
	$scope.propertyName = 'post.title';
	$scope.reverse = false;
	$scope.sortBy = function(propertyName) {
		$scope.reverse = ($scope.propertyName === propertyName) ? !$scope.reverse : false;
		$scope.propertyName = propertyName;
	};

}]);
