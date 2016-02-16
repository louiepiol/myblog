(function() {

	'use strict';

	angular
		.module('blogApp')
		.controller('NavController', function ($scope, $state, $location, Auth) {
			$scope.currentUser = Auth.currentAuthor() ? Auth.currentAuthor() : null;
		});
})();