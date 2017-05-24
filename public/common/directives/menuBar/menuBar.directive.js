(function() {
	angular
		.module('druzy')
		.directive('menuBar', function() {
			return {
				restrict: 'E',
				templateUrl: '/common/directives/menuBar/menuBar.template.html',
				link: function(scope, elem, attrs, controller) {
					// Menu Toggle
					$('.toggle.button').on('click', function() {
						$('body').toggleClass('menu-open');
					});
				}
			};
		});

})();
