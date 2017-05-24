(function() {
	angular
		.module('druzy')
		.directive('navigation', [ '$location', function($location) {
			return {
				restrict: 'E',
				templateUrl: '/common/directives/navigation/navigation.template.html',
				link: function(scope, elem, attrs, controller) {
					scope.isActive = function(linkPath) {
						return linkPath === $location.path();
					};
				}
			};
		}]);

})();
