var mainApplicationModuleName = 'druzy';

var mainApplicationModule = angular.module(mainApplicationModuleName, ['ngResource', 'ngRoute', 'users', 'dashboard', 'posts', 'blog']);

angular.element(document).ready(function() {
	angular.bootstrap(document, [mainApplicationModuleName]);
});
