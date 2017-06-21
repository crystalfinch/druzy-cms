angular.module('settings').controller('SettingsController', ['$scope', 'Settings',
	function($scope, Settings) {

		$scope.find = function() {
			$scope.settings = Settings.query();
		};

	}
]);
