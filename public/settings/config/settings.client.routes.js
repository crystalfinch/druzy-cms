angular.module('settings').config(['$routeProvider',
	function($routeProvider) {
		$routeProvider.
			when('/settings', {
				templateUrl: 'settings/views/settings.client.view.html'
			}).
			otherwise({
				redirectTo: '/'
			});
	}
]);
