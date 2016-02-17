(function() {

	'use strict';

	angular
		.module('blogApp')
		.controller('UserListController', UserController);

	function UserController($http, $scope, $state, Auth, API) {
		$scope.users = {};
		$scope.currentUser = Auth.currentAuthor() ? Auth.currentAuthor() : null;
		$scope.posts = {};
		$scope.getUsers = function(id) {
			// This request will hit the index method in the AuthenticateController
			// on the Laravel side and will return the list of users
			$http.get(API.apiUrl() + 'users').success(function(users) {
				$scope.users = users;
			}).error(function(error) {
				alert(error);
			});
		};
		$scope.getUsers();
		$scope.new = function() {
			$state.go('user-form');
		};
	}
	
})();