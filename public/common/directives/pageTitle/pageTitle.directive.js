(function() {
	angular
		.module('druzy')
		.directive('pageTitle', pageTitle);

	function pageTitle() {
		return {
			restrict: 'E',
			transclude: true,
			templateUrl: 'common/directives/pageTitle/pageTitle.template.html',
			link: function(scope, elem, attr) {
				scope.headingText = attr.headingtext;
				scope.subHeadingText = attr.subheadingtext;
				scope.hasButton = attr.hasbutton;
			}
		};
	};

})();
