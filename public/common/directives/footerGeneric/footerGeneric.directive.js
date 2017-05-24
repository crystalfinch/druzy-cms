(function() {
	angular
		.module('druzy')
		.directive('footerGeneric', footerGeneric);

	function footerGeneric() {
		return {
			restrict: 'E',
			templateUrl: 'common/directives/footerGeneric/footerGeneric.template.html'
		};
	};

})();
