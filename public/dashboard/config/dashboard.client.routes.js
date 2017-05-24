angular.module('dashboard').config(['$routeProvider',
	function($routeProvider) {
		$routeProvider.
			when('/dashboard', {
				templateUrl: 'dashboard/views/dashboard.client.view.html'
			}).
			otherwise({
				redirectTo: '/'
			});
	}
]);
