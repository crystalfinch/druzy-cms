angular.module('settings').factory('Settings', ['$resource', function($resource) {
	return $resource('api/settings/:settingId', {
		settingId: '@_id'
	}, {
		update: {
			method: 'PUT'
		}
	});
}]);
